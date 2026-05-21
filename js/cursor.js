(function () {
  var CURSOR_PATH_FILL =
    'M118.097 65.4466L81.4396 74L72.3011 110.307C69.4309 121.71 53.5739 122.609 49.4328 111.604L16.7961 24.8665C13.1583 15.1986 22.6235 5.75766 32.2821 9.42016L119.625 42.5401C130.705 46.7417 129.637 62.7539 118.097 65.4466Z';

  var CURSOR_PATH_STROKE =
    'M20.5401 23.458C18.115 17.0129 24.4245 10.719 30.8634 13.1602L118.207 46.2803C125.593 49.0815 124.881 59.7553 117.189 61.5508L80.5304 70.1045L78.1554 70.6592L77.5607 73.0234L68.422 109.33C66.5086 116.932 55.9377 117.532 53.1769 110.195L20.5401 23.458Z';

  var CURSOR_FILTER_DEFS =
    '<filter id="cursor-shadow" x="0" y="0.613025" width="143.372" height="142.766" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">' +
    '<feFlood flood-opacity="0" result="BackgroundImageFix"/>' +
    '<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>' +
    '<feOffset dy="8"/>' +
    '<feGaussianBlur stdDeviation="8"/>' +
    '<feComposite in2="hardAlpha" operator="out"/>' +
    '<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"/>' +
    '<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>' +
    '<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>' +
    '</filter>';

  var config = {
    size: 20,
    hotspotX: 3,
    hotspotY: 1,
    fill: '#000000',
  };

  function pickCursorFill() {
    return config.fill;
  }

  function buildCursorSvg(fill, pixelSize) {
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" width="' +
      pixelSize +
      '" height="' +
      pixelSize +
      '" viewBox="0 0 156.44 147.5" fill="none" shape-rendering="geometricPrecision">' +
      '<defs>' +
      CURSOR_FILTER_DEFS +
      '</defs>' +
      '<g filter="url(#cursor-shadow)">' +
      '<path d="' +
      CURSOR_PATH_FILL +
      '" fill="' +
      fill +
      '"/>' +
      '<path d="' +
      CURSOR_PATH_STROKE +
      '" stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round"/>' +
      '</g>' +
      '</svg>'
    );
  }

  function toDataUri(svg) {
    return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
  }

  function buildCursorValue(fill) {
    var size = config.size;
    var dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), 3);
    var hotspot = config.hotspotX + ' ' + config.hotspotY;
    var sources = [toDataUri(buildCursorSvg(fill, size)) + ' 1x'];

    if (dpr >= 2) {
      sources.push(toDataUri(buildCursorSvg(fill, size * 2)) + ' 2x');
    }

    if (dpr >= 3) {
      sources.push(toDataUri(buildCursorSvg(fill, size * 3)) + ' 3x');
    }

    if (sources.length === 1) {
      return toDataUri(buildCursorSvg(fill, size)) + ' ' + hotspot;
    }

    var set = sources.join(', ');
    var fallback = toDataUri(buildCursorSvg(fill, Math.round(size * dpr)));

    return (
      '-webkit-image-set(' +
      set +
      ') ' +
      hotspot +
      ', image-set(' +
      set +
      ') ' +
      hotspot +
      ', ' +
      fallback +
      ' ' +
      hotspot
    );
  }

  function applyCursor() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    var fill = pickCursorFill();
    var cursorValue = buildCursorValue(fill);

    document.documentElement.style.setProperty('--cursor-fill', fill);

    var existing = document.getElementById('custom-cursor');
    if (existing) {
      existing.remove();
    }

    var style = document.createElement('style');
    style.id = 'custom-cursor';
    style.textContent =
      '@media (hover: hover) and (pointer: fine) {' +
      'html, html *:not(#sticky-note):not(.sticky-note):not(.home-header-nav a) { cursor: ' +
      cursorValue +
      ', auto; }' +
      '.home-header-nav a { cursor: pointer; }' +
      '}';

    document.head.appendChild(style);
  }

  function init() {
    applyCursor();
  }

  window.siteCursor = {
    config: config,
    apply: applyCursor,
    init: init,
    logConfig: function () {
      console.log(
        'Cursor config — paste into js/cursor.js:\n' +
          JSON.stringify(
            {
              size: config.size,
              hotspotX: config.hotspotX,
              hotspotY: config.hotspotY,
            },
            null,
            2
          )
      );
    },
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
