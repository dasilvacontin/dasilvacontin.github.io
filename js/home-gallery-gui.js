(function () {
  var isLocal =
    location.hostname === 'localhost' ||
    location.hostname === '127.0.0.1' ||
    location.protocol === 'file:';

  if (!isLocal || typeof dat === 'undefined') {
    return;
  }

  var defaultMarginTop = 116;
  var marginTopStorageKey = 'home-gallery-margin-top';
  var guiVisibleStorageKey = 'home-gallery-gui-visible';

  var storedMarginTop = parseInt(localStorage.getItem(marginTopStorageKey), 10);
  var settings = {
    marginTop: Number.isFinite(storedMarginTop) ? storedMarginTop : defaultMarginTop,
  };

  function applyMarginTop(value) {
    document.documentElement.style.setProperty(
      '--home-gallery-margin-top',
      value + 'px'
    );
    localStorage.setItem(marginTopStorageKey, String(value));
  }

  applyMarginTop(settings.marginTop);

  var gui = new dat.GUI({ name: 'Home layout' });

  gui
    .add(settings, 'marginTop', 0, 800, 1)
    .name('Gallery margin top')
    .onChange(function (value) {
      applyMarginTop(value);
    });

  var guiHidden = localStorage.getItem(guiVisibleStorageKey) === 'false';

  function setGuiVisible(visible) {
    gui.domElement.style.display = visible ? '' : 'none';
    guiHidden = !visible;
    localStorage.setItem(guiVisibleStorageKey, String(visible));
  }

  setGuiVisible(!guiHidden);

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
