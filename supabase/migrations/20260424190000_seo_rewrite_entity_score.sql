-- Auto Execution Engine v0.8 — Entity Quality Score on Rewrite Drafts
--
-- Persists scoreEntityQuality() output alongside each rewrite draft. Lets
-- the operator filter / sort by quality before approving, and gives a
-- future automation gate (e.g. "auto-approve when score >= 90") objective
-- input. Computed server-side after successful Anthropic generation.

alter table public.seo_rewrite_drafts
  add column if not exists entity_score           integer null,
  add column if not exists entity_score_valid     boolean null,
  add column if not exists entity_score_breakdown jsonb   null;

create index if not exists seo_rewrite_drafts_entity_score_idx
  on public.seo_rewrite_drafts (entity_score);
