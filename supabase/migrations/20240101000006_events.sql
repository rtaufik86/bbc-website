-- EVENTS & TRACKING SCHEMA

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  event_id TEXT NOT NULL, -- dedup_id
  event_time TIMESTAMP WITH TIME ZONE NOT NULL,
  user_data_json JSONB DEFAULT '{}', -- hashed PII
  custom_data_json JSONB DEFAULT '{}',
  source_url TEXT,
  action_source TEXT DEFAULT 'website',
  pixel_sent BOOLEAN DEFAULT false,
  capi_sent BOOLEAN DEFAULT false,
  capi_response_json JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Index for deduplication check
CREATE INDEX idx_events_dedup ON events(event_id, event_name);
CREATE INDEX idx_events_time ON events(event_time DESC);

-- Function to check dedup
CREATE OR REPLACE FUNCTION check_event_dedup(
  p_event_name TEXT,
  p_event_id TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  v_exists BOOLEAN;
BEGIN
  SELECT EXISTS(
    SELECT 1 FROM events 
    WHERE event_name = p_event_name 
      AND event_id = p_event_id
  ) INTO v_exists;
  
  RETURN v_exists;
END;
$$ LANGUAGE plpgsql;

-- Analytics Views (Day 3 Requirement)

CREATE OR REPLACE VIEW event_summary_daily AS
SELECT 
  date_trunc('day', event_time) as day,
  event_name,
  count(*) as total_events,
  count(*) FILTER (WHERE capi_sent = true) as capi_sent_count
FROM events
GROUP BY 1, 2
ORDER BY 1 DESC;

CREATE OR REPLACE VIEW event_funnel AS
SELECT
  count(*) FILTER (WHERE event_name = 'PageView') as page_views,
  count(*) FILTER (WHERE event_name = 'ViewContent') as view_content,
  count(*) FILTER (WHERE event_name = 'InitiateCheckout') as initiate_checkout, -- e.g. click lead form
  count(*) FILTER (WHERE event_name = 'Lead') as leads
FROM events
WHERE event_time > (now() - INTERVAL '30 days');

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Only service role can insert/read events generally
-- But we might allow public insert if we want client-side to log to DB? 
-- Usually CAPI is server-side, Pixel is client-side. We only store CAPI events here or all?
-- Prompt says "Events Table to store all signals". implied serverside.
-- Let's restrict to service role for now.
