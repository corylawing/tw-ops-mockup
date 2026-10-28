# TW Ops mockup — project guide (for Claude Code)

Read this first. Keep it current.

## What this is
A static HTML mockup (no framework, no build step) of **TW Ops**, an operations hub for TW Orthodontics:
4 offices (Andalusia, Enterprise, Montgomery, Selma) and 3 launching (Wetumpka, Dothan, Troy).
Owners Dr. Wood and Dr. Turner; Director of Operations Savannah. Built by **Cory Lawing** (not a developer
by trade; keep answers short) from the "TW Ops Hub Map" PDF the doctors sent.

**It is a mockup.** Every page carries the yellow MOCKUP banner. Look and feel is a placeholder.
The deliverable that matters is the foundation design: `how-it-works.html` here and the Foundation
Plans page at https://claude.ai/artifact/VLj8XUKVRok4G7auMnYBA9 (Plan A clinic-grade ≈ $1,450/mo,
Plan B lighter build ≈ $45–80/mo; **Cory recommends Plan B**, with formal HIPAA readiness added when
the first patient-data app needs it).

## Rules that must survive any edit
- No real data. Names are `[NAME]`, dates `[DATE]`, counts `[n]` unless they came from the map's sample screens.
- **No patient information anywhere**, not even invented. TW Ops is counts only.
- Every page keeps: the MOCKUP banner, the View-as role switch, and `window.PAGE.hood` entries so the
  "Under the hood" drawer explains the infrastructure for that screen. Numbered markers are
  `<button class="uth" data-h="N"></button>` pointing at `hood[N]`.
- Roles and what they can open live in `NAV` in `assets/app.js` and mirror the map's "Who sees what" table.

## The foundation (what the mockup is explaining)
Google Workspace sign-in (2-step) → apps (TW Ops, Clinical Tools, future) → one foundation:
Postgres database with row-level security for the 5 roles, file vault (Drive + private storage),
night shift scheduled jobs (Cloud 9, OrthoAI, ADP, Dentira nightly; escalation), mailroom (Gmail 6:30 AM
briefs, Slack nudges), AI desk (Claude API server-side), key safe, audit log + backups, test copy (staging),
watchdog (monitoring), GitHub. Plan A = "true HIPAA compliance path"; Plan B = same protection, standard tiers.
Vendors named in the plans: Vercel (app host) + Supabase (database/files), both sign BAAs on self-serve
plans; Google Cloud is the acknowledged alternative.

## Hosting
GitHub Pages from `main`, root. Pushing to `main` publishes.
