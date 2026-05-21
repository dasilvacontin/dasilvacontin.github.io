const samples = [
  { className: null, label: 'body (default)', text: 'Body text at 16px regular, 150% line height.' },
  { className: 'hero-title', label: 'hero-title', text: 'Hero title' },
  { className: 'hero-context', label: 'hero-context', text: 'Hero context' },
  { className: 'photo-caption', label: 'photo-caption', text: 'Photo caption' },
  { className: 'quote', label: 'quote', text: 'Quote body' },
  { className: 'quote-title', label: 'quote-title', text: 'Quote title' },
  { className: 'quote-author-name', label: 'quote-author-name', text: 'Author name' },
  {
    className: 'quote-author-role',
    label: 'quote-author-role',
    text: null,
    html: '<span class="quote-author-title">Senior Product Manager</span> @ Watershed',
  },
  { className: 'section-title', label: 'section-title', text: 'Section title' },
  { className: 'tag', label: 'tag', text: 'Tag label' },
  { className: 'entry', label: 'entry', text: 'Entry text with 110% line height.' },
];

function renderTypeSamples() {
  const list = document.createElement('div');
  list.style.display = 'flex';
  list.style.flexDirection = 'column';
  list.style.gap = '24px';
  list.style.maxWidth = '640px';

  samples.forEach(({ className, label, text, html }) => {
    const row = document.createElement('div');
    row.style.borderBottom = '1px solid var(--color--secondary-gray)';
    row.style.paddingBottom = '24px';

    const meta = document.createElement('div');
    meta.style.fontFamily = 'monospace';
    meta.style.fontSize = '12px';
    meta.style.color = 'var(--color--text-secondary)';
    meta.style.marginBottom = '8px';
    meta.textContent = label;

    const sample = document.createElement('p');
    if (className) sample.className = className;
    sample.style.margin = '0';
    if (html) sample.innerHTML = html;
    else sample.textContent = text;

    row.append(meta, sample);
    list.append(row);
  });

  return list;
}

export default {
  title: 'Tokens/Typography',
};

export const FontStyles = {
  render: () => renderTypeSamples(),
};

export const FamilyAndBase = {
  render: () => {
    const block = document.createElement('div');
    block.style.maxWidth = '480px';

    const title = document.createElement('p');
    title.style.margin = '0 0 8px';
    title.innerHTML =
      '<strong>font-family:</strong> IBM Plex Sans<br><strong>body:</strong> 16px / 150% line height';

    const sample = document.createElement('p');
    sample.style.margin = '0';
    sample.textContent =
      'The quick brown fox jumps over the lazy dog. 0123456789';

    block.append(title, sample);
    return block;
  },
};
