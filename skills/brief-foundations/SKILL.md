---
name: brief-foundations
description: Foundations of the Brief design system — the tokens for color, type, space, radius, elevation and motion, the config knobs that set them, and light and dark themes. Use before writing or changing any UI styles in a project that uses Brief.
---

# Brief foundations

Brief is a design system written for agents. There is no component library to import. You write styles in whatever stack the project uses, with values taken from Brief's tokens.

Read this skill before writing any UI styles.

## Two layers

1. **Tokens** (`tokens.css`): every color, length, radius, shadow, font and duration a screen may use. Import it once, globally.
2. **Knobs** (`--brief-*`, at the top of `tokens.css`): brand hue and chroma, neutral hue and chroma, base radius, density, base type size, and the two font stacks. Every token is derived from them.

A project restyles Brief with a **config file** that sets knobs and nothing else. `configs/default.css` is Brief's own config; copy it into your project and change the values. Never edit tokens to restyle. If a config needs more than knobs, Brief is missing a knob: say so.

## Rule one: no raw values

Never write a hex, `rgb()`, `oklch()`, `px`, `rem` or `ms` value in a screen's styles. Use a token. If no token fits, you're probably building something the system doesn't want. If you're sure it's needed, add the token to `tokens.css` and say why.

Why: a config change has to reach every screen. A raw value is a part of a screen that stops following the system.

Allowed exceptions: `0`, percentages, unitless line heights and flex values, and media-query breakpoints (CSS can't read custom properties there).

## Tokens to reach for

| Need | Use |
|---|---|
| Page background / raised surfaces | `--surface-page` / `--surface` |
| Text, secondary, tertiary | `--text`, `--text-muted`, `--text-subtle` |
| Lines | `--border-subtle` (inside a surface), `--border` (around controls), `--border-strong` (hover) |
| The primary action | `--accent`, `--accent-hover`, `--accent-pressed`, `--text-on-accent` |
| Selected or recommended | `--surface-selected`, `--accent-soft`, `--accent-soft-border` |
| Links and accent-colored text | `--accent-text`, `--accent-text-hover`, `--accent-text-pressed` |
| Status | `--success`, `--warning`, `--danger`, `--info`, each with `-soft` and `-border` |
| Focus | `--focus-ring`, `--focus-width` |
| Space | `--space-0` … `--space-16` (a 4px grid scaled by density) |
| Control height | `--control-sm`, `--control-md` (default), `--control-lg` |
| Corners | `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full` |
| Elevation | `--shadow-1` (resting), `--shadow-2` (the main surface on a page), `--shadow-3` (floating), `--shadow-inset` (inside inputs) |
| Motion | `--duration-fast`, `--duration-normal`, `--duration-spin`, `--ease` |

Scale tokens (`--gray-*`, `--brand-*`) exist to build the semantic tokens above. Screens use semantic tokens.

## Light and dark

Every color token has a light and a dark value, written with `light-dark()` in `tokens.css`. Which one applies follows `color-scheme`:

- By default, the person's OS setting.
- `data-theme="light"` or `data-theme="dark"` on `<html>` forces one. Remove the attribute to follow the OS again.

Because screens only use tokens, they get dark mode for free. Rules:

- Never write a color for one theme only. If something looks wrong in dark, the token is wrong; fix it in `tokens.css` for both.
- Don't use `--accent` or `--accent-hover` for text. They're fills, and in dark mode they're too dark to read. Text uses `--accent-text*`.
- Check every new component in both themes before calling it done.

## Type

- Two families: `--font-sans` for UI, `--font-mono` for values a person might copy (identifiers, addresses, keys, code).
- Sizes: `--text-2xs` … `--text-2xl`, all derived from the base size knob. Weights: `--weight-regular`, `--weight-medium`, `--weight-semibold`.
- Line heights: `--leading-tight` for headings, `--leading-snug` for compact UI text, `--leading-normal` for body copy.
- Body copy stops at `--measure`.
- Screens don't set sizes from these tokens directly; they use the text roles in `brief-components` (title, heading, body, caption…).

## Density

`--brief-density` scales space and control heights together. 1 is the default, about 0.85 is compact, about 1.15 is roomy. Set it once in the config for the whole product. Don't fake density per screen with different space tokens.

## Motion

Use `--duration-fast` for hover and press feedback and `--duration-normal` for things that appear or move, both with `--ease`. `--duration-spin` is one turn of a loading spinner. `--duration-fast` and `--duration-normal` drop to zero under `prefers-reduced-motion`, so using the tokens respects that preference for free. Stop spinners yourself under the same preference.

## Files

- `tokens.css`: knobs and tokens
- `configs/default.css`: Brief's default config
