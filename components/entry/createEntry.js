function isSectionFootnoteText(text) {
  return text === 'Countless more' || text.startsWith('+ ');
}

export function createSectionFootnote(text) {
  const el = document.createElement('p');
  el.className = 'section-footnote';
  el.textContent = text;
  return el;
}

export function createEntry({ primary, leftMeta, rightMeta, tags = [] }) {
  const row = document.createElement('div');
  row.className = 'entry-row';

  const left = document.createElement('div');
  left.className = 'entry-left';

  if (tags.length) {
    const tagList = document.createElement('ul');
    tagList.className = 'tag-list';
    tags.forEach(({ className, label }) => {
      const item = document.createElement('li');
      const tag = document.createElement('span');
      tag.className = `tag ${className}`;
      tag.textContent = label;
      item.append(tag);
      tagList.append(item);
    });
    left.append(tagList);
  }

  if (primary) {
    const primaryEl = document.createElement('span');
    primaryEl.className = isSectionFootnoteText(primary) ? 'section-footnote' : 'entry';
    primaryEl.textContent = primary;
    left.append(primaryEl);
  }

  if (leftMeta) {
    const leftMetaEl = document.createElement('span');
    leftMetaEl.className = 'hero-context entry-metadata';
    leftMetaEl.textContent = leftMeta;
    left.append(leftMetaEl);
  }

  if (rightMeta) {
    const rightMetaEl = document.createElement('span');
    rightMetaEl.className = 'hero-context entry-metadata entry-right';
    rightMetaEl.textContent = rightMeta;
    row.append(left, rightMetaEl);
  } else {
    row.append(left);
  }

  return row;
}
