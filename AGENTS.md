# Brief

This repo is a design system written as agent skills. The skills are in `skills/`, one folder per skill, in the open `SKILL.md` format.

Building UI with Brief: read `skills/brief-foundations/SKILL.md` first, then `skills/brief-components/SKILL.md` for the components you use. Use tokens only.

Changing Brief:

- Rules go in `SKILL.md`, values go in `tokens.css`, and a component's reference page shows the result. Change them together.
- Run `npm run check` after changing any CSS. It fails on raw colors, lengths and durations outside `tokens.css` and the configs.
- A config file only sets `--brief-*` knobs. If a config needs more than knobs, the system is missing a knob.

## Agent skills

### Issue tracker

Issues live in GitHub Issues on `sbastn/brief` (via `gh`). See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
