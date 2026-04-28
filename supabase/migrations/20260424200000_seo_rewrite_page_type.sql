-- Auto Execution Engine v0.46 — page_type on rewrite drafts
--
-- Persists decision.pageType into the draft row so the Copy for GPT review
-- template can surface real page type (MONEY / WEAPON / HUB / SUPPORT) to
-- the side-channel reviewer instead of a generic "UNKNOWN" placeholder.
--
-- Idempotent: safe to re-run. Pre-existing rows leave page_type NULL —
-- legacy drafts continue to render UNKNOWN in the GPT template.

alter table public.seo_rewrite_drafts
  add column if not exists page_type text null;

create index if not exists seo_rewrite_drafts_page_type_idx
  on public.seo_rewrite_drafts(page_type);
