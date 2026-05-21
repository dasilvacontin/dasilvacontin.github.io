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

    return {
      maxX: Math.max(0, window.innerWidth - width),
      maxY: Math.max(0, window.innerHeight - height),
    };
  }

  function placeRandomly() {
    var bounds = getBounds();

    note.style.left = Math.round(Math.random() * bounds.maxX) + 'px';
    note.style.top = Math.round(Math.random() * bounds.maxY) + 'px';
  }

  function clampToViewport() {
    var bounds = getBounds();
    var left = parseFloat(note.style.left) || 0;
    var top = parseFloat(note.style.top) || 0;

    note.style.left = clamp(left, 0, bounds.maxX) + 'px';
    note.style.top = clamp(top, 0, bounds.maxY) + 'px';
  }

  function setPosition(clientX, clientY) {
    var bounds = getBounds();

    note.style.left = clamp(clientX - offsetX, 0, bounds.maxX) + 'px';
    note.style.top = clamp(clientY - offsetY, 0, bounds.maxY) + 'px';
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

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onEnd);
    document.addEventListener('pointercancel', onEnd);
  }

  note.addEventListener('pointerdown', onStart);
  window.addEventListener('resize', clampToViewport);

  requestAnimationFrame(placeRandomly);
})();
