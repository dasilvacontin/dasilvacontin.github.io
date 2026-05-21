export function createImageWithCaption({ src, alt, caption, width, height }) {
  const figure = document.createElement('figure');
  figure.className = 'image-with-caption';

  const img = document.createElement('img');
  img.className = 'image-with-caption__image home-gallery-image';
  img.src = src;
  img.alt = alt;
  img.width = width;
  img.height = height;
  img.loading = 'lazy';

  const figcaption = document.createElement('figcaption');
  figcaption.className = 'image-with-caption__caption';
  figcaption.textContent = caption;

  figure.append(img, figcaption);
  return figure;
}
