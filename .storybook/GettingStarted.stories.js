export default {
  title: 'Getting started',
};

export const AddYourFirstComponent = () => {
  const el = document.createElement('div');
  el.style.maxWidth = '32em';
  el.style.lineHeight = '1.5';
  el.innerHTML = `
    <p>Add components under <code>components/</code> with a <code>*.stories.js</code> file.</p>
    <p>See <code>components/README.md</code> for an example.</p>
  `;
  return el;
};
