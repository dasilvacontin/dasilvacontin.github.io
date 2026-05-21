import { createEntry } from './createEntry.js';

export default {
  title: 'Components/Entry',
};

export const Default = {
  render: () => {
    const row = createEntry({
      primary: 'Senior Product Designer',
      leftMeta: '@ Green Project Tech',
      rightMeta: '2026–Present',
      tags: [{ className: 'tag--b2b', label: 'B2B' }],
    });
    row.style.maxWidth = '720px';
    return row;
  },
};

export const MultipleTags = {
  render: () => {
    const row = createEntry({
      primary: 'Staff Product Designer',
      leftMeta: '@ Emitwise',
      rightMeta: '2023–2026',
      tags: [
        { className: 'tag--b2b', label: 'B2B' },
        { className: 'tag--feature', label: 'Feature' },
      ],
    });
    row.style.maxWidth = '720px';
    return row;
  },
};
