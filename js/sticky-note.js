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

  function getBounds() {
    var rect = note.getBoundingClientRect();
    var width = rect.width || NOTE_WIDTH;
    var height = rect.height || Math.round((NOTE_WIDTH * 580) / 600);
    var page = getPageSize();
    var maxX = Math.max(0, page.width - width);
    var maxY = Math.max(0, page.height - height);
    var minX = Math.min(Math.floor(page.width / 2), maxX);

    return {
      minX: minX,
      maxX: maxX,
      minY: Math.min(MIN_TOP, maxY),
      maxY: maxY,
    };
  }

  function setNotePosition(left, top) {
    note.style.right = 'auto';
    note.style.bottom = 'auto';
    note.style.left = left + 'px';
    note.style.top = top + 'px';
  }

  function getNotePagePosition() {
    var rect = note.getBoundingClientRect();
    var scroll = getPageOffset();

    return {
      left: rect.left + scroll.x,
      top: rect.top + scroll.y,
    };
  }

  function getSpawnBounds() {
    var bounds = getBounds();
    var rect = note.getBoundingClientRect();
    var height = rect.height || Math.round((NOTE_WIDTH * 580) / 600);
    var scroll = getPageOffset();
    var foldMaxY = scroll.y + window.innerHeight - height;
    var spawnMinY = Math.max(bounds.minY, scroll.y + MIN_TOP);
    var spawnMaxY = Math.min(bounds.maxY, foldMaxY);

    return {
      minX: bounds.minX,
      maxX: bounds.maxX,
      minY: Math.min(spawnMinY, spawnMaxY),
      maxY: Math.max(spawnMinY, spawnMaxY),
    };
  }

  function placeRandomly() {
    var spawn = getSpawnBounds();
    var xRange = spawn.maxX - spawn.minX;
    var yRange = spawn.maxY - spawn.minY;

    setNotePosition(
      Math.round(spawn.minX + Math.random() * xRange),
      Math.round(spawn.minY + Math.random() * yRange)
    );
  }

  function clampToPage() {
    var bounds = getBounds();
    var position = getNotePagePosition();

    setNotePosition(
      clamp(position.left, bounds.minX, bounds.maxX),
      clamp(position.top, bounds.minY, bounds.maxY)
    );
  }

  function setPosition(clientX, clientY) {
    var bounds = getBounds();
    var scroll = getPageOffset();

    setNotePosition(
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

    setNotePosition(position.left, position.top);

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onEnd);
    document.addEventListener('pointercancel', onEnd);
  }

  note.addEventListener('pointerdown', onStart);
  window.addEventListener('resize', clampToPage);

  requestAnimationFrame(placeRandomly);
})();
