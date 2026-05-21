import { createImageWithCaption } from './createImageWithCaption.js';

export default {
  title: 'Components/ImageWithCaption',
};

export const Default = {
  render: () => {
    const figure = createImageWithCaption({
      src: '/images/gallery-downhill-longboarding.jpg',
      alt: 'Downhill longboarder in a leather suit and pink helmet sliding on a mountain road',
      caption: 'Downhill longboarding',
      width: 1024,
      height: 889,
    });
    figure.style.maxWidth = '480px';
    return figure;
  },
};
