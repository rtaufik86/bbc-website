-- Feedback Engine v1.3 — Historical performance snapshots
-- Captures per-page GSC metrics over time for 7d-vs-7d window comparison.

create table if not exists seo_performance_snapshots (
  id          uuid primary key default gen_random_uuid(),
  page        text not null,
  position    float,
  ctr         float,
  impressions int,
  created_at  timestamp default now()
);

create index if not exists idx_snapshots_page_time
  on seo_performance_snapshots (page, created_at desc);
