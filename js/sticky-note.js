(function () {
  var NOTE_WIDTH = 290;
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

  function getBounds() {
    var rect = note.getBoundingClientRect();
    var width = rect.width || NOTE_WIDTH;
    var height = rect.height || Math.round((NOTE_WIDTH * 580) / 600);
    var maxX = Math.max(0, window.innerWidth - width);
    var maxY = Math.max(0, window.innerHeight - height);
    var minX = Math.min(Math.floor(window.innerWidth / 2), maxX);

    return { minX: minX, maxX: maxX, maxY: maxY };
  }

  function setNotePosition(left, top) {
    note.style.right = 'auto';
    note.style.bottom = 'auto';
    note.style.left = left + 'px';
    note.style.top = top + 'px';
  }

  function placeRandomly() {
    var bounds = getBounds();
    var xRange = bounds.maxX - bounds.minX;

    setNotePosition(
      Math.round(bounds.minX + Math.random() * xRange),
      Math.round(Math.random() * bounds.maxY)
    );
  }

  function clampToViewport() {
    var bounds = getBounds();
    var left = parseFloat(note.style.left);
    var top = parseFloat(note.style.top);

    if (!Number.isFinite(left)) {
      left = bounds.minX;
    }

    if (!Number.isFinite(top)) {
      top = 0;
    }

    setNotePosition(
      clamp(left, 0, bounds.maxX),
      clamp(top, 0, bounds.maxY)
    );
  }

  function setPosition(clientX, clientY) {
    var bounds = getBounds();

    setNotePosition(
      clamp(clientX - offsetX, 0, bounds.maxX),
      clamp(clientY - offsetY, 0, bounds.maxY)
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

    var rect = note.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;

    setNotePosition(rect.left, rect.top);

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onEnd);
    document.addEventListener('pointercancel', onEnd);
  }

  note.addEventListener('pointerdown', onStart);
  window.addEventListener('resize', clampToViewport);

  note.style.right = 'auto';
  note.style.bottom = 'auto';
  requestAnimationFrame(placeRandomly);
})();
