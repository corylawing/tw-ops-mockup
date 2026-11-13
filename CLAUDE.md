# TW Ops mockup — project guide (for Claude Code)

Read this first. Keep it current.

## What this is
A static HTML mockup (no framework, no build step) of **TW Ops**, an operations hub for TW Orthodontics:
4 offices (Andalusia, Enterprise, Montgomery, Selma) and 3 launching (Wetumpka, Dothan, Troy).
Owners Dr. Wood and Dr. Turner; Director of Operations Savannah. Built by **Cory Lawing** (not a developer
by trade; keep answers short) from the "TW Ops Hub Map" PDF the doctors sent.

**It is a mockup.** Every page carries the small "Mockup · sample data" pill. Layout and wording are adjustable; colours, logo and font are TW Orthodontics' own (see README).
The deliverable that matters is the foundation design: `how-it-works.html` here and the Foundation
Plans page at https://claude.ai/artifact/VLj8XUKVRok4G7auMnYBA9 (Plan A ≈ $1,450–1,600/mo,
Plan B ≈ $45–90/mo). **The doctors signed in November 2026 and chose Plan B on Render**, which they already use.

## Rules that must survive any edit
- No real data. Staff names (Kara Whitfield, Amber Nix, etc.) and all numbers are invented; keep them obviously fictional.
- **No patient information anywhere**, not even invented. TW Ops is counts only.
- **Nothing extra.** A screen may only show what is on the doctors' "TW Ops Hub Map" or what Cory has explicitly asked for (so far: Explain mode, How it works, sign-in screen, My profile with colour schemes, Find a person on People, the animated loading screen). Ideas beyond that are raised with Cory as suggestions, never built in. Use the map's own words (PTO, Nudge, Needs you today).
- **Look: "Friendly".** Large type (16px), rounded white surfaces on a tinted background, brand-blue banner on home screens, finger-sized buttons (46px), colour only for exceptions, no demo controls in the product chrome (they live in the floating mockup bar).
- **Loading screen.** `assets/splash.js` plays when the app is opened or refreshed, never on in-app navigation: eight crooked teeth with braces straighten into a smile (that is the loading bar), the braces come off with a sparkle, and the TW Orthodontics logo forms above, all on one centre line. It is drawn by one `render(t)` function. `?splash` replays it; `?splash=hold` freezes it and exposes `window.__tws.render(ms)` for stepping. Cory asked for it.
- **Role views on static pages.** `data-for="owners ops"` keeps an element for those roles only; `data-office="Selma"` hides other offices from an office lead. Both are applied in `assets/app.js`.
- **Focus first.** Every hub opens with what needs attention (`.attn` line, or the "Needs you today" list on the Command Center), each item with one action. Offices are sorted worst first. Colour is for exceptions only; on-track items stay quiet. Background numbers go in the side rail, not in equal-weight tiles.
- Every page keeps: the Mockup pill, the View-as role switch, and `window.PAGE.hood` entries so the
  "Under the hood" drawer explains the infrastructure for that screen. Numbered markers are
  `<button class="uth" data-h="N"></button>` pointing at `hood[N]`.
- Roles and what they can open live in `NAV` in `assets/app.js` and mirror the map's "Who sees what" table.

## The foundation (what the mockup is explaining)
Google Workspace sign-in (2-step) → apps (TW Ops, Clinical Tools, future) → one foundation:
Postgres database with row-level security for the 5 roles, file vault (Drive + private storage),
night shift scheduled jobs (Cloud 9, OrthoAI, ADP, Dentira nightly; escalation), mailroom (Gmail 6:30 AM
briefs, Slack nudges), AI desk (Claude API server-side), key safe, audit log + backups, test copy (staging),
watchdog (monitoring), GitHub. Plan A = "true HIPAA compliance path"; Plan B = same protection, standard tiers.
Vendors named in the plans: app host is the doctors' choice (Render, already in use, or Vercel) + Supabase
(database/files); all sign BAAs on self-serve plans; Google Cloud is the acknowledged alternative.

## Hosting
GitHub Pages from `main`, root. Pushing to `main` publishes.
