-- Auto Execution Engine v0.45 — REWRITE Draft Storage
--
-- Stores LLM-generated rewrite drafts in 'pending_review' status.
-- No filesystem write. Approval/rejection happens via UI handler that
-- updates `status` (mirrors the v0.8 patch approval pipeline).
--
-- This table is independent from `seo_execution_logs`:
--   - seo_execution_logs  → INJECT/FIX patches (HTML edits, deterministic)
--   - seo_rewrite_drafts  → REWRITE drafts (full LLM output, generative)

create table if not exists public.seo_rewrite_drafts (
  id              uuid          primary key default gen_random_uuid(),
  page_path       text          not null,
  entity_key      text          null,
  action_type     text          null,
  prompt          text          not null,
  draft_content   text          null,
  status          text          not null default 'pending_review',
  error           text          null,
  created_at      timestamptz   not null default now(),
  updated_at      timestamptz   not null default now()
);

create index if not exists seo_rewrite_drafts_page_path_idx
  on public.seo_rewrite_drafts (page_path);

create index if not exists seo_rewrite_drafts_status_idx
  on public.seo_rewrite_drafts (status);

create index if not exists seo_rewrite_drafts_created_at_idx
  on public.seo_rewrite_drafts (created_at desc);

-- RLS disabled to match other internal SEO tables (seo_execution_logs etc.)
alter table public.seo_rewrite_drafts disable row level security;
