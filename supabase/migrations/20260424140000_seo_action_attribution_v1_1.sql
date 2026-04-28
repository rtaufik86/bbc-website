-- Action Attribution Engine v1.1
-- Adds context (page_type) + attribution weight columns on result rows.
-- Required by multi-action attribution (Batch 2) and segmented stats (Batch 4).

alter table seo_action_results
  add column if not exists page_type text,
  add column if not exists weight    float default 1;

create index if not exists idx_action_results_segment
  on seo_action_results (action_type, page_type);
