-- Table to track all notifications sent
CREATE TABLE notification_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id),
  lead_id UUID REFERENCES leads(id),
  user_id UUID REFERENCES auth.users(id), -- Sales user
  
  -- Notification details
  channel TEXT NOT NULL CHECK (channel IN ('telegram', 'email', 'sms', 'whatsapp')),
  type TEXT NOT NULL, -- 'new_lead', 'updated_lead', 'reassigned', 'reminder'
  
  -- Result
  success BOOLEAN NOT NULL,
  error_message TEXT,
  
  -- Channel-specific data
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_notif_logs_lead ON notification_logs(lead_id, created_at DESC);
CREATE INDEX idx_notif_logs_user ON notification_logs(user_id, created_at DESC);
CREATE INDEX idx_notif_logs_channel ON notification_logs(channel, success, created_at DESC);

-- RLS
ALTER TABLE notification_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "notif_logs_select_org_members" ON notification_logs
  FOR SELECT USING (
    org_id IN (
      SELECT org_id FROM org_members WHERE user_id = auth.uid()
    )
  );

-- Analytics view
CREATE OR REPLACE VIEW notification_stats AS
SELECT 
  channel,
  type,
  DATE(created_at) as date,
  COUNT(*) as total_sent,
  SUM(CASE WHEN success THEN 1 ELSE 0 END) as successful,
  SUM(CASE WHEN NOT success THEN 1 ELSE 0 END) as failed,
  ROUND(
    100.0 * SUM(CASE WHEN success THEN 1 ELSE 0 END) / COUNT(*),
    2
  ) as success_rate
FROM notification_logs
GROUP BY channel, type, DATE(created_at)
ORDER BY date DESC, channel, type;
