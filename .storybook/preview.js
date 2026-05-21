import '../styles/tokens.css';
import '../styles/components.css';
import '../storybook/preview.css';
import '../js/cursor.js';

/** @type { import('@storybook/html-vite').Preview } */
const preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
