-- Auto Execution Engine v0.7 — Governance & Freeze Circuit Breaker
--
-- v0.7 extends the execution log with governance metadata:
--   - run_id: groups every log row belonging to one dispatcher pass
--   - mode:   'safe' (auto) or 'manual' (approved) — tells apart auto-runs
--             from operator-triggered single executions
--
-- Adds a freeze-state table so the circuit breaker can persist across tabs
-- and reloads. `frozen = true` means auto execution is globally paused.
-- A new row (frozen=false) releases the freeze — history is preserved so we
-- always know when/why a freeze happened and who released it.

-- 1. Extend execution log with run/mode metadata ------------------------------

alter table seo_execution_logs
  add column if not exists run_id text,
  add column if not exists mode   text;   -- 'safe' | 'manual'

create index if not exists idx_exec_logs_run
  on seo_execution_logs (run_id);

create index if not exists idx_exec_logs_mode_time
  on seo_execution_logs (mode, created_at desc);

-- 2. Freeze-state audit table -------------------------------------------------

create table if not exists seo_execution_freeze_state (
  id           uuid primary key default gen_random_uuid(),
  frozen       boolean not null,
  reason       text,              -- e.g. 'error_rate_exceeded', 'duplicate_injection_detected'
  run_id       text,              -- the run that triggered the freeze (null on manual release)
  triggered_at timestamp default now()
);

create index if not exists idx_freeze_state_time
  on seo_execution_freeze_state (triggered_at desc);

-- Internal tool only — no user data, anon key needs insert + read.
alter table seo_execution_freeze_state disable row level security;
