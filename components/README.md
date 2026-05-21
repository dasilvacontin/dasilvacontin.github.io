# Components

HTML components for this site, developed and previewed in Storybook.

## Design system

- **Tokens:** [`styles/tokens.css`](../styles/tokens.css) — colors, sizes, typography variables (no classes)
- **Components:** [`styles/components.css`](../styles/components.css) — utility classes (`.hero-title`, `.tag`, etc.)

Jekyll loads both via `_includes/head.html`. Storybook imports them in `.storybook/preview.js`.

Apply a text style with a class, e.g. `<p class="hero-title">…</p>`.

### Quote

Markup reference: [`components/quote/quote.html`](quote/quote.html). Preview in Storybook under **Components → Quote**.

Classes: `quote-block`, `quote`, `quote-attribution`, `quote-avatar`, `quote-author`, `quote-author-name`, `quote-author-role`, `quote-author-title` (accent on job title only; `@ Company` stays primary).

### Tag

Markup reference: [`components/tag/tag.html`](tag/tag.html). Preview in Storybook under **Components → Tag**.

Base class: `tag`. Color variants: `tag--gray`, `tag--brown`, `tag--yellow`, `tag--blue`, `tag--purple`, `tag--pink`, `tag--green`. Entry variants: `tag--b2b`, `tag--b2c`, `tag--for-fun`, `tag--internal`, `tag--external`, `tag--design-system`, `tag--feature`, `tag--sales-prototype`. Wrap groups in `tag-list`.

### Entry (list row)

Markup reference: [`components/entry/entry.html`](entry/entry.html). Preview in Storybook under **Components → Entry**.

Layout: `entry-row` (flex, space-between), `entry-left`, `entry-right`. Content: `entry` (primary), `hero-context entry-metadata` (left/right meta), `tag` + entry tag variant inside `tag-list`. After a section list: `section-footnote` (secondary closing line, e.g. “Countless more”).

### Profile section

Markup reference: [`components/profile-section/profile-section.html`](profile-section/profile-section.html). Preview in Storybook under **Components → ProfileSection**.

Wraps `section-title` + `profile-section-entries` (8px gap after title and between `entry-row` items).

### Text content

Markup reference: [`components/text-content/text-content.html`](text-content/text-content.html). Preview in Storybook under **Components → TextContent**.

Prose blocks with a heading + body (e.g. TOOLS, AI CONCEPTS). Classes: `text-content`, `text-content-title` (body scale, semibold), `text-content-body` (body scale, regular). Can wrap `profile-section-entries` for titled lists (e.g. OTHER HIGHLIGHTED WORK).

## Add a component

1. Create a folder, e.g. `components/button/`
2. Add markup/CSS as needed
3. Add a story file, e.g. `button.stories.js`:

```js
export default {
  title: 'Components/Button',
};

export const Default = {
  render: () => {
    const el = document.createElement('button');
    el.className = 'my-button';
    el.textContent = 'Click me';
    return el;
  },
};
```

4. Run Storybook: `npm run storybook`

Stories are picked up from `components/**/*.stories.@(js|jsx|mjs|ts|tsx)`.
