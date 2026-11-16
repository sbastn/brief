---
name: brief-components
description: Components of the Brief design system and the rules for using them. So far, typography (text roles), the button and the link. Use when styling text, or adding or choosing a button or a link, in a project that uses Brief.
---

# Brief components

Read `brief-foundations` first. Components are built from its tokens and follow its rule one: no raw values.

Each component has:

- a section below: when to use it, its variants, sizes and states, and what not to do;
- a stylesheet next to this file (`typography.css`, `button.css`, `link.css`), written with tokens only;
- a reference page in `reference/` that shows every variant, size and state.

`reference/index.html` lists every component, with a preview and a link to its page.

The class names in the stylesheets (`.b-button`, `.b-button--primary`) are one way to build the component. In React or another framework, keep the structure, the tokens and the rules, not necessarily the class names.

If you can run a browser, render the reference page next to your result before you call it done.

## Typography

Text roles: each sets size, weight, line height and color together, from the foundation tokens. Use a role instead of setting font sizes yourself.

Reference: `reference/typography.html`.

### Roles

| Role | Class | Use for |
|---|---|---|
| Title | `.b-title` | The page title. One per page. It names the object or the place: "Billing", "Your projects". |
| Heading | `.b-heading` | A section of the page. |
| Subheading | `.b-subheading` | A group inside a section, or a card title. |
| Body | `.b-body` | Sentences people read. Stops at `--measure`. |
| Small | `.b-small` | UI text next to controls: labels, table cells, menu items. |
| Caption | `.b-caption` | Hints, timestamps, secondary facts. Muted. |
| Eyebrow | `.b-eyebrow` | A short label above a title saying what kind of page or section it is: "Settings", "Invite your team". |

Inline, inside any role:

- `.b-mono` for values a person might copy: IDs, API keys, email addresses, file paths.
- `.b-code` for commands and code the person would type.
- `.b-strong` for the one phrase in a sentence that matters most. Not for whole sentences.
- `.b-numeric` for numbers that line up in columns or change in place.

Text color: `.b-muted` steps text back to supporting, `.b-subtle` to labels and metadata people scan past. Use the role's own color first.

### Rules

- **The element comes from structure, the role from the look.** A card title can be an `<h3>` with `.b-subheading`. Never pick a heading level for its size, and never skip levels to get a smaller one.
- **One title per page**, and every section that has a heading uses the same role for it.
- **Sentence case everywhere**, including titles, headings, buttons and eyebrows (the eyebrow is uppercase through CSS, not in the text).
- **Body copy stops at `--measure`.** Long lines are why settings pages feel tiring.
- **Don't invent sizes.** If no role fits, the text is probably doing two jobs; split it.
- **Space between roles** comes from `.b-stack-text` on the container: tight under an eyebrow and a heading, wider before a new heading. Don't add margins to roles one by one.

### Don't

- Don't use bold body text as a heading. Use a heading role.
- Don't use the eyebrow as a heading. It's a label; the heading still comes after it.
- Don't put a caption's information in a tooltip. If it's worth saying, it's worth showing.
- Don't make whole paragraphs muted to look calmer. Muted text is for what people can skip.

## Button

A button does something on this page: saves, deletes, opens a dialog. If it takes the person somewhere else, it's a link (see Link). A link may look like a button when it's the main way forward (`<a class="b-button">`), but it stays an `<a>`.

Reference: `reference/button.html`.

### Variants

| Variant | Use for |
|---|---|
| Primary (`--primary`) | The one action the view exists for. **One per view.** |
| Default | Every other action, including Cancel. |
| Ghost (`--ghost`) | Low-emphasis actions repeated in toolbars and lists, and dismiss actions. |
| Danger (`--danger`) | Confirming something destructive, inside the confirmation. Not the button that opens it. |

### Sizes

- **Medium** is the default.
- **Small** (`--sm`) in toolbars, dense rows, and next to small inputs.
- **Large** (`--lg`) at most once per page, for the one action a first-time visitor came for.

Buttons in the same row share a size.

### Labels

- A verb, plus the object when it isn't obvious: "Save changes", "New project", "Delete 3 projects".
- Sentence case. No trailing punctuation.
- Never "Submit", "OK", "Yes" or "Click here". The label should still make sense on its own, read out by a screen reader.
- The destructive confirmation repeats what will happen ("Delete 3 projects"), not "Confirm".

### Order

In a row of actions, the primary goes last (right in left-to-right layouts), with Cancel before it. In a toolbar, view actions go on the left and the primary on the far right.

### States

- **Hover, pressed, focus** come from the stylesheet. Never remove the focus ring.
- **Disabled**: avoid it. A disabled button doesn't say why. Prefer leaving it enabled and explaining on click (point at the field that's wrong). If you must disable it, say why next to it.
- **Busy** (`aria-busy="true"`): while the action runs. The label hides behind a spinner and the button keeps its width, so nothing around it moves. Don't also disable it; busy already blocks a second click.

### Don't

- Don't put two primary buttons in one view. If two actions feel equally important, the view is doing two jobs.
- Don't use danger to make a button stand out. It means "this destroys something".
- Don't make buttons full-width, except on narrow screens where a form's actions stack.
- Don't use an icon-only button until Brief has icons and the rules for them.

### Building it

- Use `<button type="button">`, or `type="submit"` for the button that submits a form. Never a `<div>` with a click handler.
- `[data-state]` in `button.css` only exists so reference pages can show states in a static render. Never set it in a product.

## Link

A link takes the person somewhere: another page, another part of this page, another site. If it does something here, it's a button.

Reference: `reference/link.html`.

### Variants

| Variant | Use for |
|---|---|
| Inline (`.b-link`) | A link inside a sentence. |
| Muted (`--muted`) | A link inside secondary text: hints, footers, metadata lines. It takes the surrounding color. |
| Standalone (`--standalone`) | A link on its own line, after a list or summary: "View all invoices →". |
| External (`--external`) | A link to another site. Combine it with the others: `b-link b-link--external`. |

### Rules

- **Inline links are always underlined.** Color alone doesn't mark a link for everyone. The underline is quiet at rest and full strength on hover and focus.
- **Standalone links have no underline at rest.** Their position already says they're links. End them with " →" when they lead to more of the same thing.
- **The link text says where it goes.** "check the activity log", not "click here" or "this page". It should make sense read on its own, as screen readers list links out of context.
- **External links open in the same tab** unless leaving would lose work in progress. If one opens a new tab, say so in the label or in visually hidden text ("opens in a new tab").
- **No visited style** in product UI. Visited colors help when reading content; in an app, they just make the same link look different.
- **A link can look like a button** when it's the main way forward (`<a class="b-button b-button--primary">`). It's still an `<a>`, and it still goes somewhere.

### States

Hover darkens the color and strengthens the underline. Pressed darkens it further. Focus draws the focus ring around the text. Never remove the focus ring.

### Don't

- Don't use a link to submit, save or delete. Those are buttons.
- Don't underline a standalone link at rest, or remove the underline from an inline one.
- Don't put more than a couple of links in one sentence. If everything is a link, nothing stands out.

### Building it

- Use `<a href>`. A link without a real destination is a button.
- `[data-state]` in `link.css` only exists so reference pages can show states in a static render. Never set it in a product.
