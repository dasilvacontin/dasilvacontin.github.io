const nicoleQuote = {
  title: 'David is the most mission-driver designer I know.',
  paragraphs: [
    'Always reflecting on how our work drives value and how to push it further—never just ticking boxes.',
    'David challenges priorities, listens to contrary views, then backs the final call. He thinks through milestones and success metrics, supporting engineers to break large designs into smaller, easier-to-implement pieces.',
    'Well-organised, he delivers what he promises—or flags capacity issues long before they bite. His curiosity makes every problem-solving session energising, and he is probably the most resilient person at Emitwise: he proactively asks for feedback, listens when it’s offered, and is very receptive to it.',
  ],
  authorName: 'Nicole Pretorius',
  authorRole: 'Senior Product Manager @ Watershed',
};

export default {
  title: 'Components/Quote',
};

function createAuthorRole(roleText) {
  const role = document.createElement('p');
  role.className = 'quote-author-role';

  const atIndex = roleText.indexOf(' @ ');
  if (atIndex === -1) {
    const title = document.createElement('span');
    title.className = 'quote-author-title';
    title.textContent = roleText;
    role.append(title);
    return role;
  }

  const title = document.createElement('span');
  title.className = 'quote-author-title';
  title.textContent = roleText.slice(0, atIndex);
  role.append(title, roleText.slice(atIndex));

  return role;
}

function createQuote({ title, paragraphs, authorName, authorRole, attributionOnly = false }) {
  if (attributionOnly) {
    const attribution = document.createElement('figcaption');
    attribution.className = 'quote-attribution';

    const img = document.createElement('img');
    img.className = 'quote-avatar';
    img.src = '/images/quote-portrait.png';
    img.alt = `Portrait of ${authorName}`;
    img.width = 72;
    img.height = 88;

    const author = document.createElement('div');
    author.className = 'quote-author';

    const name = document.createElement('p');
    name.className = 'quote-author-name';
    name.textContent = authorName;

    author.append(name, createAuthorRole(authorRole));
    attribution.append(img, author);
    return attribution;
  }

  const block = document.createElement('figure');
  block.className = 'quote-block';
  block.style.maxWidth = '560px';

  if (title) {
    const titleEl = document.createElement('p');
    titleEl.className = 'quote-title';
    titleEl.textContent = title;
    block.append(titleEl);
  }

  const quote = document.createElement('blockquote');
  quote.className = 'quote';
  paragraphs.forEach((text) => {
    const p = document.createElement('p');
    p.textContent = text;
    quote.append(p);
  });

  const attribution = document.createElement('figcaption');
  attribution.className = 'quote-attribution';

  const img = document.createElement('img');
  img.className = 'quote-avatar';
  img.src = '/images/quote-portrait.png';
  img.alt = `Portrait of ${authorName}`;
  img.width = 72;
  img.height = 88;

  const author = document.createElement('div');
  author.className = 'quote-author';

  const name = document.createElement('p');
  name.className = 'quote-author-name';
  name.textContent = authorName;

  author.append(name, createAuthorRole(authorRole));
  attribution.append(img, author);
  block.append(quote, attribution);

  return block;
}

export const Default = {
  render: () => createQuote(nicoleQuote),
};

export const AttributionOnly = {
  render: () =>
    createQuote({
      ...nicoleQuote,
      attributionOnly: true,
    }),
};
