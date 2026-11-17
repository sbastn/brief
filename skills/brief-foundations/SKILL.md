---
name: brief-foundations
description: Foundations of the Brief design system — the tokens for color, type, space, radius, elevation and motion, the config knobs that set them, and light and dark themes. Use before writing or changing any UI styles in a project that uses Brief.
---

# Brief foundations

Brief is a design system written for agents. It has tokens (this skill) and components (`brief-components`), both plain CSS. There's no JavaScript package to install. Screens use Brief's components, and anything Brief doesn't have yet is built from its tokens, in whatever stack the project uses.

Read this skill before writing any UI styles.

## Setting up a project

Copy these stylesheets into the project and import them once, globally, in this order:

1. `tokens.css`
2. the project's config (see below)
3. the stylesheets of the components the project uses, from `brief-components`

Don't edit the copies. To change how Brief looks, change the config. To change Brief itself, change Brief.

## Two layers

1. **Tokens** (`tokens.css`): every color, length, radius, shadow, font and duration a screen may use. Import it once, globally.
2. **Knobs** (`--brief-*`, at the top of `tokens.css`): brand hue and chroma, neutral hue and chroma, base radius, density, base type size, and the two font stacks. Every token is derived from them.

A project restyles Brief with a **config file** that sets knobs and nothing else. `configs/default.css` is Brief's own config; copy it into your project and change the values. Never edit tokens to restyle. If a config needs more than knobs, Brief is missing a knob: say so.

## Rule one: no raw values

Never write a hex, `rgb()`, `oklch()`, `px`, `rem` or `ms` value in a screen's styles. Use a token. If no token fits, you're probably building something the system doesn't want. If you're sure it's needed, add the token to `tokens.css` and say why.

Why: a config change has to reach every screen. A raw value is a part of a screen that stops following the system.

Allowed exceptions: `0`, percentages, `fr`, unitless line heights and flex values, `100dvh` to fill the window, and media-query breakpoints (CSS can't read custom properties there).

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
| Widths | `--page-max` (page content), `--measure` (a column of text or a form), `--sidebar-width` (a side column) |
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

## Layout

Space tokens are for gaps and padding. Widths come from the layout tokens:

- `--page-max`: the widest the page's content gets. Center it; the page background fills the rest of the window.
- `--measure`: the widest a column of text or a form gets.
- `--sidebar-width`: a column beside the main content, such as navigation or a list of steps.

Anything narrower is a fraction of these (`calc(var(--measure) / 2)`), a percentage, or a grid track (`fr`, `minmax()`).

- **Never build a width or height by multiplying space tokens** (`calc(var(--space-16) * 12)`). Space scales with density, and a page shouldn't get narrower because a product is compact. The check rejects it.
- **Don't fix the height of a page region.** Content and padding set heights. A page that fills the window uses `min-height: 100dvh` on its outermost element.
- If a layout needs a width these don't give, build it from them and name it in your summary under "Missing from Brief".

## Motion

Use `--duration-fast` for hover and press feedback and `--duration-normal` for things that appear or move, both with `--ease`. `--duration-spin` is one turn of a loading spinner. `--duration-fast` and `--duration-normal` drop to zero under `prefers-reduced-motion`, so using the tokens respects that preference for free. Stop spinners yourself under the same preference.

## Before you finish

Run the check on the folders that hold the project's styles, and fix everything it reports:

```bash
node .claude/skills/brief-foundations/scripts/check.mjs src
```

Use the path where the project keeps its skills. The check reads CSS files, `style=""` in HTML and `style={{ }}` in JSX and TSX. It fails on any raw color, length or duration. It skips `tokens.css` and config files, which hold the only raw values allowed.

## Files

- `tokens.css`: knobs and tokens
- `configs/default.css`: Brief's default config
- `scripts/check.mjs`: the raw-value check
- `reference/layout.html`: the layout tokens and rules, rendered
