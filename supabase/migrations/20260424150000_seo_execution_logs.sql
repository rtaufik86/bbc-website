-- Auto Execution Engine v0.5 — execution audit log
-- Records every safeExecute attempt (applied / skipped / failed) so the
-- system has a traceable log of what ran, what was blocked by guards, and
-- what actually landed on the page.

create table if not exists seo_execution_logs (
  id          uuid primary key default gen_random_uuid(),
  page        text not null,
  action_type text not null,
  status      text,   -- 'applied' | 'skipped' | 'failed'
  reason      text,
  created_at  timestamp default now()
);

create index if not exists idx_exec_logs_page_time
  on seo_execution_logs (page, created_at desc);

-- Internal tool only; no user data, anon key needs insert + read.
alter table seo_execution_logs disable row level security;
