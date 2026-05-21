(function () {
  var LUMINANCE_THRESHOLD = 0.45;
  var canvas;
  var ctx;

  function getCanvasContext() {
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      ctx = canvas.getContext('2d', { willReadFrequently: true });
    }
    return ctx;
  }

  function parseOpaqueRgb(cssColor) {
    if (!cssColor || cssColor === 'transparent') {
      return null;
    }

    var match = cssColor.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
    );
    if (!match) {
      return null;
    }

    var alpha = match[4] !== undefined ? Number(match[4]) : 1;
    if (alpha <= 0) {
      return null;
    }

    return {
      r: Number(match[1]),
      g: Number(match[2]),
      b: Number(match[3]),
    };
  }

  function relativeLuminance(r, g, b) {
    function channel(c) {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    }
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
  }

  function sampleImageAt(img, clientX, clientY) {
    if (!img.complete || !img.naturalWidth) {
      return null;
    }

    var rect = img.getBoundingClientRect();
    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      return null;
    }

    var sampleX =
      ((clientX - rect.left) / rect.width) * img.naturalWidth;
    var sampleY =
      ((clientY - rect.top) / rect.height) * img.naturalHeight;

    try {
      var context = getCanvasContext();
      context.drawImage(img, sampleX, sampleY, 1, 1, 0, 0, 1, 1);
      var data = context.getImageData(0, 0, 1, 1).data;
      return relativeLuminance(data[0], data[1], data[2]);
    } catch (error) {
      return null;
    }
  }

  function shouldSkipBackdropElement(el) {
    return (
      el.closest('.home-header') ||
      el.classList.contains('sticky-note')
    );
  }

  function luminanceFromBackgroundChain(el) {
    var node = el;
    while (node && node.nodeType === 1) {
      var rgb = parseOpaqueRgb(getComputedStyle(node).backgroundColor);
      if (rgb) {
        return relativeLuminance(rgb.r, rgb.g, rgb.b);
      }
      node = node.parentElement;
    }
    return 1;
  }

  function backdropLuminanceAt(x, y) {
    var stack = document.elementsFromPoint(x, y);
    var i;
    var el;
    var lum;
    var backgroundCandidate = null;

    for (i = 0; i < stack.length; i += 1) {
      el = stack[i];
      if (shouldSkipBackdropElement(el)) {
        continue;
      }

      if (el.classList.contains('home-gallery-image')) {
        lum = sampleImageAt(el, x, y);
        if (lum !== null) {
          return lum;
        }
      }
    }

    for (i = 0; i < stack.length; i += 1) {
      el = stack[i];
      if (shouldSkipBackdropElement(el)) {
        continue;
      }

      if (el.tagName === 'IMG') {
        lum = sampleImageAt(el, x, y);
        if (lum !== null) {
          return lum;
        }
        continue;
      }

      if (!backgroundCandidate) {
        backgroundCandidate = el;
      }
    }

    if (backgroundCandidate) {
      return luminanceFromBackgroundChain(backgroundCandidate);
    }

    return 1;
  }

  function contrastColor(lum) {
    return lum < LUMINANCE_THRESHOLD ? '#ffffff' : '#000000';
  }

  function updateLinks() {
    var links = document.querySelectorAll('.home-header-nav a');
    links.forEach(function (link) {
      var rect = link.getBoundingClientRect();
      var x = rect.left + rect.width / 2;
      var y = rect.top + rect.height / 2;
      var lum = backdropLuminanceAt(x, y);
      link.style.color = contrastColor(lum);
    });
  }

  var scheduled = false;
  function scheduleUpdate() {
    if (scheduled) {
      return;
    }
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      updateLinks();
    });
  }

  function init() {
    var links = document.querySelectorAll('.home-header-nav a');
    if (!links.length) {
      return;
    }

    updateLinks();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('load', scheduleUpdate);

    document.querySelectorAll('.home-gallery-image').forEach(function (img) {
      if (!img.complete) {
        img.addEventListener('load', scheduleUpdate);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
