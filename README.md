# Brief

A design system made of agent skills. There's no component library: the skills are the system, and agents write the UI in whatever stack the project uses.

So far Brief has its foundations (the tokens every value comes from, and the rules for using them) and its first components: typography, the button and the link.

## Skills

| Skill | For |
|---|---|
| `brief-foundations` | Tokens for color, type, space, radius, elevation and motion, and the config knobs that set them. |
| `brief-components` | Components and the rules for using them. So far: typography, button, link. |

## How it works

- **Knobs** (`--brief-*`): a few values a project sets in one config file: brand hue, neutrals, radius, density, type size and fonts.
- **Tokens** (`tokens.css`): every color, length, radius, shadow and duration, derived from the knobs.
- **Rules** (`SKILL.md`): which token to use for what, and when to use each component, written for an agent to follow.
- **References** (`reference/*.html`): working HTML + CSS showing every variant and state. Open them in a browser.

Brief has no brand of its own beyond its default config (`skills/brief-foundations/configs/default.css`). Products built with Brief bring their own config.

## Checking

```bash
npm run check
```

Fails if any CSS outside `tokens.css` and the configs holds a raw color, length or duration.

## Using the skills in another project

Copy `skills/*` into `.claude/skills/` (Claude Code), `.codex/skills/` (Codex) or `.cursor/skills/` (Cursor). Then add a config file that sets the `--brief-*` knobs, starting from `configs/default.css`.
