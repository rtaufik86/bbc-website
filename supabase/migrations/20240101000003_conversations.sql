-- CONVERSATIONS & SHADOW LEADS SCHEMA

CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id),
  lead_id UUID REFERENCES leads(id),
  session_id TEXT NOT NULL UNIQUE,
  consented_at TIMESTAMP WITH TIME ZONE,
  language TEXT DEFAULT 'id',
  engagement_score INTEGER DEFAULT 0,
  duration_seconds INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  metadata_json JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_conversations_session ON conversations(session_id);
CREATE INDEX idx_conversations_lead ON conversations(lead_id) WHERE lead_id IS NOT NULL;
CREATE INDEX idx_conversations_cleanup ON conversations(org_id, created_at) WHERE lead_id IS NULL AND consented_at IS NULL;

CREATE TABLE conversation_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('user', 'assistant', 'system')),
  message TEXT NOT NULL,
  meta_json JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX idx_messages_conversation_time ON conversation_messages(conversation_id, created_at);

CREATE TABLE conversation_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) UNIQUE,
  summary TEXT NOT NULL,
  key_points TEXT[] DEFAULT '{}',
  intent TEXT,
  handover_ready BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- FUNCTIONS

CREATE OR REPLACE FUNCTION link_conversation_to_lead(
  p_session_id TEXT,
  p_lead_id UUID
) RETURNS BOOLEAN AS $$
DECLARE
  v_conv_id UUID;
BEGIN
  UPDATE conversations 
  SET lead_id = p_lead_id, updated_at = now()
  WHERE session_id = p_session_id
  RETURNING id INTO v_conv_id;
  
  IF v_conv_id IS NOT NULL THEN
    -- Create activity on lead
    INSERT INTO lead_activities (org_id, lead_id, type, title, description, created_by)
    SELECT org_id, p_lead_id, 'conversation_linked', 'Chat Conversation Linked', 'User had previous chat session ' || p_session_id, NULL
    FROM conversations WHERE id = v_conv_id;
    RETURN true;
  END IF;
  
  RETURN false;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION auto_cleanup_shadow_leads() RETURNS INTEGER AS $$
DECLARE
  v_count INTEGER;
BEGIN
  WITH deleted AS (
    DELETE FROM conversations
    WHERE lead_id IS NULL 
      AND consented_at IS NULL 
      AND created_at < (now() - INTERVAL '30 days')
    RETURNING id
  )
  SELECT COUNT(*) INTO v_count FROM deleted;
  
  RETURN v_count;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_engagement_score(p_conversation_id UUID) RETURNS INTEGER AS $$
DECLARE
  v_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO v_count
  FROM conversation_messages
  WHERE conversation_id = p_conversation_id AND role = 'user';
  
  UPDATE conversations SET engagement_score = v_count WHERE id = p_conversation_id;
  RETURN v_count;
END;
$$ LANGUAGE plpgsql;

-- TRIGGERS

CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Update engagement score on new message
CREATE OR REPLACE FUNCTION trigger_update_engagement() RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role = 'user' THEN
    PERFORM update_engagement_score(NEW.conversation_id);
  END IF;
  
  UPDATE conversations 
  SET last_message_at = NEW.created_at 
  WHERE id = NEW.conversation_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_message_insert
  AFTER INSERT ON conversation_messages
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_update_engagement();

ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_summaries ENABLE ROW LEVEL SECURITY;
