(function () {
  var NOTE_WIDTH = 290;
  var MIN_TOP = 80;
  var note = document.getElementById('sticky-note');

  if (!note) {
    return;
  }

  var dragging = false;
  var offsetX = 0;
  var offsetY = 0;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function getPageOffset() {
    return {
      x: window.pageXOffset || document.documentElement.scrollLeft || 0,
      y: window.pageYOffset || document.documentElement.scrollTop || 0,
    };
  }

  function getPageSize() {
    return {
      width: Math.max(
        document.documentElement.scrollWidth,
        document.body.scrollWidth
      ),
      height: Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      ),
    };
  }

  function getRailOrigin() {
    var rail = note.closest('.home-layout-rail');
    var scroll = getPageOffset();

    if (!rail) {
      return { x: 0, y: scroll.y };
    }

    var rect = rail.getBoundingClientRect();
    return {
      x: rect.left + scroll.x,
      y: rect.top + scroll.y,
    };
  }

  function getNoteSize() {
    var rect = note.getBoundingClientRect();
    return {
      width: rect.width || NOTE_WIDTH,
      height: rect.height || Math.round((NOTE_WIDTH * 580) / 600),
    };
  }

  function hasSideBySideColumns() {
    var gallery = document.querySelector('.home-gallery');
    var content = document.querySelector('.home-content');

    if (!gallery || !content) {
      return false;
    }

    return (
      gallery.getBoundingClientRect().left >=
      content.getBoundingClientRect().right - 2
    );
  }

  function getBounds() {
    var size = getNoteSize();
    var page = getPageSize();
    var scroll = getPageOffset();
    var maxX = Math.max(0, page.width - size.width);
    var maxY = Math.max(0, page.height - size.height);
    var minX = 0;
    var boundsMaxX = maxX;

    if (hasSideBySideColumns()) {
      var gallery = document.querySelector('.home-gallery');
      var galleryRect = gallery.getBoundingClientRect();
      minX = galleryRect.left + scroll.x;
      boundsMaxX = galleryRect.right + scroll.x - size.width;
    } else {
      minX = Math.min(Math.floor(page.width / 2), maxX);
      boundsMaxX = maxX;
    }

    minX = Math.max(0, minX);
    boundsMaxX = Math.min(maxX, Math.max(minX, boundsMaxX));

    return {
      minX: minX,
      maxX: boundsMaxX,
      minY: Math.min(MIN_TOP, maxY),
      maxY: maxY,
    };
  }

  function getSpawnBounds() {
    var bounds = getBounds();
    var size = getNoteSize();
    var scroll = getPageOffset();
    var viewportHeight = window.innerHeight;
    var minX = bounds.minX;
    var maxX = bounds.maxX;
    var foldTop = scroll.y + viewportHeight;
    var maxSpawnY = scroll.y + 2 * viewportHeight - size.height;
    var spawnMinY = foldTop;
    var spawnMaxY = Math.min(bounds.maxY, maxSpawnY);

    if (hasSideBySideColumns()) {
      var gallery = document.querySelector('.home-gallery');
      var galleryRect = gallery.getBoundingClientRect();
      minX = Math.max(bounds.minX, galleryRect.left + scroll.x);
      maxX = Math.min(bounds.maxX, galleryRect.right + scroll.x - size.width);
      spawnMinY = Math.max(foldTop, galleryRect.top + scroll.y);
      spawnMaxY = Math.min(
        spawnMaxY,
        galleryRect.bottom + scroll.y - size.height
      );
    }

    spawnMaxY = Math.max(spawnMinY, spawnMaxY);

    return {
      minX: minX,
      maxX: Math.max(minX, maxX),
      minY: spawnMinY,
      maxY: spawnMaxY,
    };
  }

  function setNotePagePosition(pageLeft, pageTop) {
    var origin = getRailOrigin();

    note.style.right = 'auto';
    note.style.bottom = 'auto';
    note.style.left = pageLeft - origin.x + 'px';
    note.style.top = pageTop - origin.y + 'px';
  }

  function getNotePagePosition() {
    var rect = note.getBoundingClientRect();
    var scroll = getPageOffset();

    return {
      left: rect.left + scroll.x,
      top: rect.top + scroll.y,
    };
  }

  function placeRandomly() {
    var spawn = getSpawnBounds();
    var xRange = spawn.maxX - spawn.minX;
    var yRange = spawn.maxY - spawn.minY;

    setNotePagePosition(
      Math.round(spawn.minX + Math.random() * xRange),
      Math.round(spawn.minY + Math.random() * yRange)
    );
  }

  function revealNote() {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        note.classList.add('is-visible');
      });
    });
  }

  function placeAndReveal() {
    note.classList.remove('is-visible');
    placeRandomly();
    revealNote();
  }

  function clampToPage() {
    var bounds = getBounds();
    var position = getNotePagePosition();

    setNotePagePosition(
      clamp(position.left, bounds.minX, bounds.maxX),
      clamp(position.top, bounds.minY, bounds.maxY)
    );
  }

  function setPosition(clientX, clientY) {
    var bounds = getBounds();
    var scroll = getPageOffset();

    setNotePagePosition(
      clamp(clientX - offsetX + scroll.x, bounds.minX, bounds.maxX),
      clamp(clientY - offsetY + scroll.y, bounds.minY, bounds.maxY)
    );
  }

  function onMove(event) {
    if (!dragging) {
      return;
    }

    setPosition(event.clientX, event.clientY);
  }

  function onEnd() {
    if (!dragging) {
      return;
    }

    dragging = false;
    note.classList.remove('is-dragging');
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerup', onEnd);
    document.removeEventListener('pointercancel', onEnd);
  }

  function onStart(event) {
    if (event.button !== undefined && event.button !== 0) {
      return;
    }

    event.preventDefault();

    dragging = true;
    note.classList.add('is-dragging');

    var position = getNotePagePosition();
    offsetX = event.clientX + getPageOffset().x - position.left;
    offsetY = event.clientY + getPageOffset().y - position.top;

    setNotePagePosition(position.left, position.top);

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onEnd);
    document.addEventListener('pointercancel', onEnd);
  }

  note.addEventListener('pointerdown', onStart);
  window.addEventListener('resize', clampToPage);

  if (document.readyState === 'complete') {
    placeAndReveal();
  } else {
    window.addEventListener('load', placeAndReveal, { once: true });
  }
})();
