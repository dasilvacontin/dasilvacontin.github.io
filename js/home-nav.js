(function () {
  function init() {
    var signature = document.querySelector('.home-header .home-signature');
    var sentinel = document.getElementById('home-scroll-sentinel');

    if (!signature || !sentinel) {
      return;
    }

    function setHidden(hidden) {
      if (hidden) {
        signature.classList.add('is-hidden');
      } else {
        signature.classList.remove('is-hidden');
      }
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        setHidden(!entries[0].isIntersecting);
      }, { threshold: 0 });

      observer.observe(sentinel);
      return;
    }

    function onScroll() {
      var scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      setHidden(scrollY > 0);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
