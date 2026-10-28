# TW Ops — mockup

A clickable mockup of **TW Ops**, the operations hub for TW Orthodontics (Dr. Wood, Dr. Turner, Savannah),
built from the TW Ops Hub map.

> **This is a mockup.** Sample data only, nothing real. The look and feel (colours, fonts, wording,
> layout, hub names) is a placeholder and is fully adjustable. What matters, and what is not a
> placeholder, is the **foundation underneath**: see [How it works](how-it-works.html) in the mockup
> and the Foundation Plans page (Plan A / Plan B, Plan B recommended).

## What it shows

- Command Center (Savannah's morning), the Selma office day with the huddle, the 6:30 AM brief,
  the Practice Calendar, People, Compliance, Scorecard, Operations, Owner's Desk.
- **View as** in the header switches role (Owner, Director of Ops, Office lead, Inventory coordinator,
  Team member). Hubs the role may not open are greyed out; opening one shows why.
- **Under the hood** (button bottom right, and the numbered circles on each screen) explains, line by
  line, which part of the foundation does the work in the real build.

## Run it

Open `index.html` in a browser. Static HTML, CSS and JS. No build step, no server, no accounts.

## Structure

```
index.html            Command Center
huddle.html           Office day · morning huddle · stations · checklist
brief.html            The 6:30 AM ops brief as an email
calendar.html         Practice Calendar · yearly events with reminders
people.html compliance.html scorecard.html operations.html owners.html
how-it-works.html     The foundation explained, with diagrams
assets/styles.css     Placeholder look and feel
assets/app.js         Banner, header, role switch, under-the-hood drawer
```
