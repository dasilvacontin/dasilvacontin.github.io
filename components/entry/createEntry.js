function isSectionFootnoteText(text) {
  return text === 'Countless more' || text.startsWith('+ ');
}

export function createSectionFootnote(text) {
  const el = document.createElement('p');
  el.className = 'section-footnote';
  el.textContent = text;
  return el;
}

function createTagList(tags) {
  const tagList = document.createElement('span');
  tagList.className = 'tag-list';
  tagList.setAttribute('role', 'list');

  tags.forEach(({ className, label }) => {
    const tag = document.createElement('span');
    tag.className = `tag ${className}`;
    tag.setAttribute('role', 'listitem');
    tag.textContent = label;
    tagList.append(tag);
  });

  return tagList;
}

export function createEntry({ primary, leftMeta, rightMeta, tags = [] }) {
  const row = document.createElement('div');
  row.className = 'entry-row';

  const left = document.createElement('div');
  left.className = 'entry-left';

  if (primary) {
    const primaryEl = document.createElement('span');
    const isFootnote = isSectionFootnoteText(primary);
    primaryEl.className = isFootnote ? 'section-footnote' : 'entry';

    if (leftMeta && !isFootnote) {
      primaryEl.append(document.createTextNode(`${primary} `));
      const leftMetaEl = document.createElement('span');
      leftMetaEl.className = 'hero-context entry-metadata';
      leftMetaEl.textContent = leftMeta;
      primaryEl.append(leftMetaEl);
    } else {
      primaryEl.textContent = primary;
    }

    if (tags.length && !isFootnote) {
      primaryEl.append(document.createTextNode(' '));
      primaryEl.append(createTagList(tags));
    }

    left.append(primaryEl);
  }

  if (rightMeta) {
    const right = document.createElement('div');
    right.className = 'entry-right';
    const rightMetaEl = document.createElement('span');
    rightMetaEl.className = 'hero-context entry-metadata';
    rightMetaEl.textContent = rightMeta;
    right.append(rightMetaEl);
    row.append(left, right);
  } else {
    row.append(left);
  }

  return row;
}
