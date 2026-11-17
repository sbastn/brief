# Brief

A design system made of agent skills. The skills are the system: rules an agent follows, with tokens and components in plain CSS. There's no JavaScript package, and agents write the UI in whatever stack the project uses.

So far Brief has its foundations (the tokens every value comes from, and the rules for using them) and its first components: typography, the button, the link, the field with its text input, the checkbox and radio, and the table.

## Skills

| Skill | For |
|---|---|
| `brief-foundations` | Tokens for color, type, space, radius, elevation and motion, and the config knobs that set them. |
| `brief-components` | Components and the rules for using them. So far: typography, button, link, field and text input, checkbox and radio, table. |

## How it works

- **Knobs** (`--brief-*`): a few values a project sets in one config file: brand hue, neutrals, radius, density, type size and fonts.
- **Tokens** (`tokens.css`): every color, length, radius, shadow and duration, derived from the knobs. Every color has a light and a dark value; the OS setting picks one, or `data-theme` on `<html>` forces it.
- **Rules** (`SKILL.md`): which token to use for what, and when to use each component, written for an agent to follow.
- **References** (`reference/*.html`): working HTML + CSS showing every variant and state. Open `skills/brief-components/reference/index.html` in a browser to see them all.

Brief has no brand of its own beyond its default config (`skills/brief-foundations/configs/default.css`). Products built with Brief bring their own config.

## Checking

```bash
npm run check
```

Fails if any CSS outside `tokens.css` and the configs holds a raw color, length or duration. The check ships with the skill (`skills/brief-foundations/scripts/check.mjs`), so projects that use Brief run it too.

## Using the skills in another project

1. Copy `skills/*` into `.claude/skills/` (Claude Code and Cursor) or `.agents/skills/` (Codex).
2. Add a config file that sets the `--brief-*` knobs, starting from `configs/default.css`.
3. Tell agents about Brief in the project's `AGENTS.md` or `CLAUDE.md`:

```markdown
This project uses the Brief design system. Its skills are in `.claude/skills/`: read `brief-foundations` first, then `brief-components`. The brand config is `src/brief.config.css`. Before you finish, run `node .claude/skills/brief-foundations/scripts/check.mjs src` and fix what it reports.
```
