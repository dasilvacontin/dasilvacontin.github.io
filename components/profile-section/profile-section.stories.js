import { createEntry } from '../entry/createEntry.js';

const experienceEntries = [
  {
    tags: [{ className: 'tag--b2b', label: 'B2B' }],
    primary: '@ Green Project',
    rightMeta: '2026–Present',
  },
  {
    tags: [{ className: 'tag--b2b', label: 'B2B' }],
    primary: '@ Green Project',
    rightMeta: '2025–2026',
  },
  {
    primary: '@ Emitwise ',
    tags: [{ className: 'tag--b2b', label: 'B2B' }],
    rightMeta: '2022–2025',
  },
  {
    primary: '@ Emitwise ',
    tags: [{ className: 'tag--b2b', label: 'B2B' }],
    rightMeta: '2021–2022',
  },
  {
    tags: [{ className: 'tag--b2c', label: 'B2C' }],
    rightMeta: '2020',
  },
  {
    primary: '@ Sensa',
    tags: [{ className: 'tag--b2c', label: 'B2C' }],
    rightMeta: '2018–2020',
  },
  {
    primary: '@ the3million',
    rightMeta: '2019',
  },
  {
    primary: '@ Improbable',
    tags: [{ className: 'tag--b2b', label: 'B2B' }],
    rightMeta: '2017',
  },
  {
    primary: '@ Toggl',
    tags: [{ className: 'tag--b2b', label: 'B2B' }],
    rightMeta: '2015–2016',
  },
  {
    rightMeta: '2014–2015',
  },
  {
    primary: '@ Mocha.js',
  },
  {
    primary: '@ HackUPC',
    rightMeta: '201X–201Y',
  },
  {
    primary: '@ VGAFIB',
    rightMeta: '201X–201Y',
  },
  {
    primary: '@ Incubio',
    tags: [{ className: 'tag--b2c', label: 'B2C' }],
    rightMeta: '2013–2014',
  },
  {
    primary: '@ Infinitum',
    rightMeta: '2011–2013',
  },
];

function createProfileSection({ title, entries }) {
  const section = document.createElement('section');
  section.className = 'profile-section';
  section.style.maxWidth = '720px';

  const heading = document.createElement('h2');
  heading.className = 'section-title';
  heading.textContent = title;

  const list = document.createElement('div');
  list.className = 'profile-section-entries';

  entries.forEach((entry) => {
    list.append(createEntry(entry));
  });

  section.append(heading, list);

  return section;
}

export default {
  title: 'Components/ProfileSection',
};

export const Experience = {
  render: () =>
    createProfileSection({
      title: 'Experience',
      entries: experienceEntries,
    }),
};
