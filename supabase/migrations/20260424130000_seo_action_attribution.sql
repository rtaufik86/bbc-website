-- Action Attribution Engine v1.0
-- Links executed actions (FIX / REWRITE / INJECT) to their measured outcomes
-- so the Decision Engine can bias future action selection by historical
-- success rate. KILL is intentionally not tracked in v1.

create table if not exists seo_action_logs (
  id           uuid primary key default gen_random_uuid(),
  page         text not null,
  action_type  text not null,
  action_step  int,
  executed_at  timestamp default now()
);

create index if not exists idx_action_logs_page_time
  on seo_action_logs (page, executed_at desc);

create table if not exists seo_action_results (
  id              uuid primary key default gen_random_uuid(),
  page            text not null,
  action_type     text not null,
  result          text,
  position_delta  float,
  ctr_delta       float,
  recorded_at     timestamp default now()
);

create index if not exists idx_action_results_type_time
  on seo_action_results (action_type, recorded_at desc);
