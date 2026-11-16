---
name: brief-components
description: Components of the Brief design system and the rules for using them. So far, the button. Use when adding, styling or choosing a button in a project that uses Brief.
---

# Brief components

Read `brief-foundations` first. Components are built from its tokens and follow its rule one: no raw values.

Each component has:

- a section below: when to use it, its variants, sizes and states, and what not to do;
- a stylesheet next to this file (`button.css`), written with tokens only;
- a reference page in `reference/` that shows every variant, size and state.

The class names in the stylesheets (`.b-button`, `.b-button--primary`) are one way to build the component. In React or another framework, keep the structure, the tokens and the rules, not necessarily the class names.

If you can run a browser, render the reference page next to your result before you call it done.

## Button

A button does something on this page: saves, deletes, opens a dialog. If it takes the person somewhere else, it's a link. A link may look like a button when it's the main way forward (`<a class="b-button">`), but it stays an `<a>`.

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

- A verb, plus the object when it isn't obvious: "Save changes", "Add record", "Delete 3 records".
- Sentence case. No trailing punctuation.
- Never "Submit", "OK", "Yes" or "Click here". The label should still make sense on its own, read out by a screen reader.
- The destructive confirmation repeats what will happen ("Delete 3 records"), not "Confirm".

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
