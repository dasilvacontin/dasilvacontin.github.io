const sizes = [1, 2, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 72, 80];

function renderSizeScale() {
  const list = document.createElement('div');
  list.style.display = 'flex';
  list.style.flexDirection = 'column';
  list.style.gap = '12px';
  list.style.maxWidth = '480px';

  sizes.forEach((value) => {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.gap = '16px';

    const label = document.createElement('div');
    label.style.fontFamily = 'monospace';
    label.style.fontSize = '12px';
    label.style.color = 'var(--color--text-secondary)';
    label.style.width = '96px';
    label.style.flexShrink = '0';
    label.textContent = `size--${value}`;

    const bar = document.createElement('div');
    bar.style.height = 'var(--size--16)';
    bar.style.width = `var(--size--${value})`;
    bar.style.minWidth = `var(--size--${value})`;
    bar.style.background = 'var(--color--accent)';
    bar.style.borderRadius = 'var(--size--2)';

    const valueLabel = document.createElement('div');
    valueLabel.style.fontFamily = 'monospace';
    valueLabel.style.fontSize = '12px';
    valueLabel.style.color = 'var(--color--text-primary)';
    valueLabel.textContent = `${value}px`;

    row.append(label, bar, valueLabel);
    list.append(row);
  });

  return list;
}

export default {
  title: 'Tokens/Sizes',
};

export const Scale = {
  render: () => renderSizeScale(),
};
