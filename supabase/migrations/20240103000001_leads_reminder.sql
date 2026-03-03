-- Add last_reminder_sent column
ALTER TABLE leads 
ADD COLUMN last_reminder_sent TIMESTAMP WITH TIME ZONE;

-- Index for reminder queries
-- Only index leads that need reminders (new, not contacted, active)
CREATE INDEX idx_leads_reminder_check 
ON leads(stage, lead_score, last_contacted_at, last_reminder_sent) 
WHERE stage = 'new' AND last_contacted_at IS NULL AND deleted_at IS NULL;
