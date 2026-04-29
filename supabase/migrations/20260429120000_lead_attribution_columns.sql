-- LEAD ATTRIBUTION COLUMNS
-- Denormalize attribution fields from leads.source_json into queryable columns
-- via Postgres generated columns. Single source of truth = source_json JSONB.
-- Reporting queries (CPL by source, close rate by campaign, etc.) use these
-- columns + indexes; raw nested data (first_touch, last_touch) stays in source_json.

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS utm_source     TEXT GENERATED ALWAYS AS (source_json->>'utm_source')     STORED,
  ADD COLUMN IF NOT EXISTS utm_medium     TEXT GENERATED ALWAYS AS (source_json->>'utm_medium')     STORED,
  ADD COLUMN IF NOT EXISTS utm_campaign   TEXT GENERATED ALWAYS AS (source_json->>'utm_campaign')   STORED,
  ADD COLUMN IF NOT EXISTS utm_content    TEXT GENERATED ALWAYS AS (source_json->>'utm_content')    STORED,
  ADD COLUMN IF NOT EXISTS utm_term       TEXT GENERATED ALWAYS AS (source_json->>'utm_term')       STORED,
  ADD COLUMN IF NOT EXISTS cta_placement  TEXT GENERATED ALWAYS AS (source_json->>'cta_placement')  STORED,
  ADD COLUMN IF NOT EXISTS cta_service    TEXT GENERATED ALWAYS AS (source_json->>'cta_service')    STORED,
  ADD COLUMN IF NOT EXISTS landing_page   TEXT GENERATED ALWAYS AS (source_json->>'landing_page')   STORED,
  ADD COLUMN IF NOT EXISTS referrer       TEXT GENERATED ALWAYS AS (source_json->>'referrer')       STORED,
  ADD COLUMN IF NOT EXISTS gclid          TEXT GENERATED ALWAYS AS (source_json->>'gclid')          STORED,
  ADD COLUMN IF NOT EXISTS fbclid         TEXT GENERATED ALWAYS AS (source_json->>'fbclid')         STORED;

CREATE INDEX IF NOT EXISTS idx_leads_utm_source     ON leads(org_id, utm_source)     WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_leads_utm_campaign   ON leads(org_id, utm_campaign)   WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_leads_cta_placement  ON leads(org_id, cta_placement)  WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_leads_landing_page   ON leads(org_id, landing_page)   WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_leads_cta_service    ON leads(org_id, cta_service)    WHERE deleted_at IS NULL;
