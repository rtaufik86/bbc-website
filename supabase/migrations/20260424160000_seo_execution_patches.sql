-- Auto Execution Engine v0.6 — HTML patch storage
-- Adds before/after HTML snapshots to execution logs so applied patches
-- can be reviewed, diffed, or re-applied manually. Only populated when
-- status = 'applied'; other statuses leave both columns null.

alter table seo_execution_logs
  add column if not exists original_html text,
  add column if not exists patched_html  text;
