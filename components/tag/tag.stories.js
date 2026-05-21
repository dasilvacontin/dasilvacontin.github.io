const colorVariants = [
  { className: 'tag--gray', label: 'Gray' },
  { className: 'tag--brown', label: 'Brown' },
  { className: 'tag--yellow', label: 'Yellow' },
  { className: 'tag--blue', label: 'Blue' },
  { className: 'tag--purple', label: 'Purple' },
  { className: 'tag--pink', label: 'Pink' },
  { className: 'tag--green', label: 'Green' },
];

const entryVariants = [
  { className: 'tag--b2b', label: 'B2B' },
  { className: 'tag--b2c', label: 'B2C' },
  { className: 'tag--for-fun', label: 'For fun! 🥳' },
  { className: 'tag--internal', label: 'Internal' },
  { className: 'tag--external', label: 'External' },
  { className: 'tag--design-system', label: 'Design System' },
  { className: 'tag--feature', label: 'Feature' },
  { className: 'tag--sales-prototype', label: 'Sales Prototype' },
];

function renderTagList(variants) {
  const list = document.createElement('ul');
  list.className = 'tag-list';

  variants.forEach(({ className, label }) => {
    const item = document.createElement('li');
    const tag = document.createElement('span');
    tag.className = `tag ${className}`;
    tag.textContent = label;
    item.append(tag);
    list.append(item);
  });

  return list;
}

export default {
  title: 'Components/Tag',
};

export const ColorVariants = {
  render: () => renderTagList(colorVariants),
};

export const EntryTags = {
  render: () => renderTagList(entryVariants),
};
