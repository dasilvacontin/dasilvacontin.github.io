function renderSwatches(items) {
  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(140px, 1fr))';
  grid.style.gap = '16px';
  grid.style.maxWidth = '960px';

  items.forEach(({ name, var: token }) => {
    const card = document.createElement('div');
    card.style.border = '1px solid var(--color--secondary-gray)';
    card.style.borderRadius = '8px';
    card.style.overflow = 'hidden';

    const swatch = document.createElement('div');
    swatch.style.height = '80px';
    swatch.style.background = `var(${token})`;
    if (
      token === '--color--background' ||
      token === '--color--background-accent' ||
      token.startsWith('--color--text-')
    ) {
      swatch.style.boxShadow = 'inset 0 0 0 1px rgba(0, 0, 0, 0.08)';
    }

    const label = document.createElement('div');
    label.style.padding = '8px 10px';
    label.style.fontSize = '12px';
    label.style.fontFamily = 'monospace';
    label.style.color = 'var(--color--text-primary)';
    label.style.background = 'var(--color--background)';
    label.textContent = name;

    card.append(swatch, label);
    grid.append(card);
  });

  return grid;
}

export default {
  title: 'Tokens/Colors',
};

export const Base = () =>
  renderSwatches([
    { name: 'color--accent', var: '--color--accent' },
    { name: 'color--primary', var: '--color--primary' },
    { name: 'color--secondary', var: '--color--secondary' },
    { name: 'color--background', var: '--color--background' },
    { name: 'color--background-accent', var: '--color--background-accent' },
  ]);

export const Text = () =>
  renderSwatches([
    { name: 'color--text-primary', var: '--color--text-primary' },
    { name: 'color--text-secondary', var: '--color--text-secondary' },
    { name: 'color--text-accent', var: '--color--text-accent' },
    { name: 'color--text-link', var: '--color--text-link' },
    { name: 'color--tag-text', var: '--color--tag-text' },
    { name: 'color--hero-title-text', var: '--color--hero-title-text' },
    { name: 'color--hero-context-text', var: '--color--hero-context-text' },
    { name: 'color--photo-caption-text', var: '--color--photo-caption-text' },
    { name: 'color--quote-body-text', var: '--color--quote-body-text' },
    { name: 'color--entry-text', var: '--color--entry-text' },
    { name: 'color--quote-title-text', var: '--color--quote-title-text' },
    { name: 'color--quote-author-name-text', var: '--color--quote-author-name-text' },
    { name: 'color--quote-author-role-text', var: '--color--quote-author-role-text' },
    { name: 'color--quote-author-title-text', var: '--color--quote-author-title-text' },
    { name: 'color--section-title-text', var: '--color--section-title-text' },
  ]);

export const Secondary = () =>
  renderSwatches([
    { name: 'color--secondary-gray', var: '--color--secondary-gray' },
    { name: 'color--secondary-brown', var: '--color--secondary-brown' },
    { name: 'color--secondary-yellow', var: '--color--secondary-yellow' },
    { name: 'color--secondary-blue', var: '--color--secondary-blue' },
    { name: 'color--secondary-purple', var: '--color--secondary-purple' },
    { name: 'color--secondary-pink', var: '--color--secondary-pink' },
    { name: 'color--secondary-green', var: '--color--secondary-green' },
  ]);

export const TagBackgrounds = () =>
  renderSwatches([
    { name: 'color--tag-gray-background', var: '--color--tag-gray-background' },
    { name: 'color--tag-brown-background', var: '--color--tag-brown-background' },
    { name: 'color--tag-yellow-background', var: '--color--tag-yellow-background' },
    { name: 'color--tag-blue-background', var: '--color--tag-blue-background' },
    { name: 'color--tag-purple-background', var: '--color--tag-purple-background' },
    { name: 'color--tag-pink-background', var: '--color--tag-pink-background' },
    { name: 'color--tag-green-background', var: '--color--tag-green-background' },
  ]);
