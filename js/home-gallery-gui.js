(function () {
  var isLocal =
    location.hostname === 'localhost' ||
    location.hostname === '127.0.0.1' ||
    location.protocol === 'file:';

  if (!isLocal || typeof dat === 'undefined') {
    return;
  }

  var navGuideOffsetStorageKey = 'home-nav-guide-offset';
  var guiVisibleStorageKey = 'home-gallery-gui-visible';

  var storedNavGuideOffset = parseInt(
    localStorage.getItem(navGuideOffsetStorageKey),
    10
  );
  var settings = {
    navGuideOffset: Number.isFinite(storedNavGuideOffset)
      ? storedNavGuideOffset
      : 0,
  };

  function getNavGuideLine() {
    var header = document.querySelector('.home-header');
    if (!header) {
      return null;
    }

    var guide = header.querySelector('.home-nav-dev-guide');
    if (!guide) {
      guide = document.createElement('span');
      guide.className = 'home-nav-dev-guide';
      guide.setAttribute('aria-hidden', 'true');
      header.appendChild(guide);
    }

    return guide;
  }

  function updateNavGuideLine() {
    var header = document.querySelector('.home-header');
    var nav = document.querySelector('.home-header-nav');
    var guide = getNavGuideLine();
    var links;
    var headerRect;
    var minTop = Infinity;
    var maxBottom = -Infinity;
    var i;
    var rect;

    if (!header || !nav || !guide) {
      return;
    }

    links = nav.querySelectorAll('a');
    if (!links.length) {
      return;
    }

    headerRect = header.getBoundingClientRect();

    for (i = 0; i < links.length; i += 1) {
      rect = links[i].getBoundingClientRect();
      minTop = Math.min(minTop, rect.top);
      maxBottom = Math.max(maxBottom, rect.bottom);
    }

    guide.style.top =
      (minTop + maxBottom) / 2 - headerRect.top + settings.navGuideOffset + 'px';
    guide.style.transform = 'translateY(-50%)';
  }

  function setNavGuideVisible(visible) {
    var header = document.querySelector('.home-header');

    if (!header) {
      return;
    }

    if (visible) {
      header.classList.add('is-dev-guide-visible');
      updateNavGuideLine();
    } else {
      header.classList.remove('is-dev-guide-visible');
    }
  }

  var gui = new dat.GUI({ name: 'Home layout' });

  gui
    .add(settings, 'navGuideOffset', -50, 50, 1)
    .name('Nav guide offset Y')
    .onChange(function (value) {
      localStorage.setItem(navGuideOffsetStorageKey, String(value));
      if (!guiHidden) {
        updateNavGuideLine();
      }
    });

  var guiHidden = localStorage.getItem(guiVisibleStorageKey) === 'false';

  function setGuiVisible(visible) {
    gui.domElement.style.display = visible ? '' : 'none';
    guiHidden = !visible;
    localStorage.setItem(guiVisibleStorageKey, String(visible));
    setNavGuideVisible(visible);
  }

  setGuiVisible(!guiHidden);

  window.addEventListener('resize', function () {
    if (!guiHidden) {
      updateNavGuideLine();
    }
  });

  window.addEventListener('load', function () {
    if (!guiHidden) {
      updateNavGuideLine();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'd' || event.metaKey || event.ctrlKey || event.altKey) {
      return;
    }

    var target = event.target;
    var tag = target && target.tagName;

    if (
      tag === 'INPUT' ||
      tag === 'TEXTAREA' ||
      (target && target.isContentEditable)
    ) {
      return;
    }

    event.preventDefault();
    setGuiVisible(guiHidden);
  });
})();
