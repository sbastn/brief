---
name: brief-components
description: Components of the Brief design system and the rules for using them. So far, typography (text roles), the button, the link, the field with its text input, and the checkbox and radio. Use when styling text, or adding a button, a link, a form field, a text input, a checkbox or a radio, in a project that uses Brief.
---

# Brief components

Read `brief-foundations` first. Components are built from its tokens and follow its rule one: no raw values.

Each component has:

- a section below: when to use it, its variants, sizes and states, and what not to do;
- a stylesheet next to this file (`typography.css`, `button.css`, `link.css`, `field.css`, `choice.css`), written with tokens only;
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

## Field and text input

A field is a label, an optional hint, an error when there is one, and the control, in that order. The text input (`.b-input`) is the first control; `<textarea class="b-input">` is the same control for longer text.

Reference: `reference/field.html`.

### Anatomy

1. **Label** (`.b-label`): always visible, above the control. Sentence case, no colon.
2. **Hint** (`.b-hint`): what to enter or why it's asked, when that isn't obvious. One sentence.
3. **Error** (`.b-error`): only after validation fails. It has its own mark, so it doesn't rely on red alone.
4. **Control** (`.b-input`).

Hint and error go **before** the control. They're read before typing, and autofill menus and phone keyboards can't cover them.

### Sizes and width

- **Medium** by default. **Small** (`--sm`) in toolbars and filters, next to small buttons. **Large** (`--lg`) for the one input a page is about.
- **Width hints at the answer.** Short (`--short`) for codes and numbers, medium (`--medium`) for postcodes and short names, full width for names, emails and anything open-ended.
- **Mono** (`--mono`) for values typed or copied exactly: codes, keys, IDs, URLs.

### Rules

- **Never use a placeholder as a label.** It disappears as soon as someone types. Use placeholders only for a format example, and only when the hint can't carry it.
- **Mark the optional fields, not the required ones:** "Message (optional)". Ask for less; if most fields are optional, the form is asking for too much.
- **Validate on submit,** then again as each invalid field changes. Never on every keystroke of a first attempt.
- **Error messages say what's wrong and how to fix it,** using the person's own input when it helps: "“alex@example” is missing its ending, like alex@example.com". Never "Invalid input".
- **Use the right input type** (`email`, `url`, `tel`, `search`), `autocomplete` and `inputmode`, so phones show the right keyboard and browsers can autofill.
- **Read-only, not disabled,** for values people need to see or copy but can't change. Disabled inputs can't be focused or copied, and they're hard to read.
- **Forms are one column** (`.b-form`, up to `--measure` wide), with actions at the end, primary last.

### States

Rest, hover, focus, filled, invalid (`aria-invalid="true"`), disabled and read-only all come from the stylesheet. Never remove the focus ring.

### Don't

- Don't put the label inside the input or beside it in a narrow column.
- Don't show an error before the person has tried to submit.
- Don't clear what they typed when validation fails.
- Don't split one answer across several inputs (a date in three boxes, a code in six) unless the platform needs it.

### Building it

- Connect the label with `<label for>` and the control's `id`.
- Point `aria-describedby` at the hint and the error, in that order, so screen readers read them after the label.
- Set `aria-invalid="true"` on the control while its error shows.
- `[data-state]` in `field.css` only exists so reference pages can show states in a static render. Never set it in a product.

## Checkbox and radio

Checkboxes pick any number of options, including none. Radios pick exactly one. Both are real `<input>` elements with the browser's look replaced (`.b-checkbox`, `.b-radio`), so keyboards, forms and screen readers work as usual.

Reference: `reference/choice.html`.

### Which one

- **One checkbox** for a single yes/no that's saved with the form: "Send an invite email now".
- **A checkbox group** when any number of options can apply: "Email me about: invoices, product updates".
- **Radios** for exactly one of two to five options. More than five needs a select, which Brief doesn't have yet.
- **Cards** (`.b-choice--card`) when each option needs a sentence to explain, or people compare them, like plans or methods. Up to four.
- Brief has no switch yet. A checkbox applies when the form is saved; don't use one to change something instantly.

### Anatomy

- An option is a `<label class="b-choice">` wrapping the control and its text, so the whole line is clickable. An optional `.b-choice__hint` goes under the text; on cards, `.b-choice__meta` sits on the right (a price, a duration).
- A group is a `<fieldset class="b-choices">`. Its `<legend class="b-label">` asks the question. A group error goes right after the legend, before the options, in `.b-choices__intro`.

### Rules

- **Labels say the positive.** "Email me about product updates", never "Don't email me about product updates".
- **Stack options vertically,** one per line, in a logical order (most common first, or a natural sequence). Never alphabetical for its own sake.
- **Pre-select a radio** when there's a safe default most people want. Leave all empty only when every choice has consequences the person must think about, and then require one.
- **Mixed** (indeterminate) is only for a "select all" checkbox when some of its items are selected. It's set from script (`el.indeterminate = true`).
- **Disabled options say why** in their hint: "Always on. We'll only email you if something needs action."
- **Errors name what to do:** "Choose a role for sam@example.com", not "This field is required".

### Don't

- Don't use radios for a yes/no. One checkbox is clearer.
- Don't use a single radio. It can't be unselected.
- Don't nest groups more than one level (a "select all" and its items).
- Don't put links inside an option's label. Clicking them toggles the option too.

### Building it

- `<input class="b-checkbox" type="checkbox">` and `<input class="b-radio" type="radio">` with a shared `name` per radio group.
- Wrap groups in `<fieldset>` with a `<legend>`. Put `aria-describedby` on the fieldset for its error, and `aria-invalid="true"` while it shows.
- `[data-state]` in `choice.css` only exists so reference pages can show states in a static render. Never set it in a product.

