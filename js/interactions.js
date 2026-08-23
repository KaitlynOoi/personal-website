(function () {
  'use strict';

  // Scroll-spy: highlight the matching in-page nav link as sections pass.
  // Used by the film page's Films/Scripts/Photography/Marketing/BTS sub-nav.
  var spyLinks = document.querySelectorAll('[data-spy-link]');
  if (spyLinks.length && 'IntersectionObserver' in window) {
    var spySections = [];
    spyLinks.forEach(function (link) {
      var id = link.getAttribute('href').replace('#', '');
      var section = document.getElementById(id);
      if (section) spySections.push({ link: link, section: section });
    });

    var spyIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var match = spySections.find(function (s) { return s.section === entry.target; });
        if (!match) return;
        if (entry.isIntersecting) {
          spyLinks.forEach(function (l) { l.classList.remove('active'); });
          match.link.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    spySections.forEach(function (s) { spyIO.observe(s.section); });
  }

  // BTS carousel (film page)
  document.querySelectorAll('.bts-carousel').forEach(function (carousel) {
    var track = carousel.querySelector('.bts-track');
    var slides = carousel.querySelectorAll('.bts-slide');
    var prevBtn = carousel.querySelector('.bts-arrow[data-dir="-1"]');
    var nextBtn = carousel.querySelector('.bts-arrow[data-dir="1"]');
    var currentEl = carousel.querySelector('.bts-current');
    var totalEl = carousel.querySelector('.bts-total');
    var total = slides.length;
    var index = 0;
    if (!track || !total) return;

    function pad(n) { return n < 10 ? '0' + n : String(n); }

    function render() {
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      if (currentEl) currentEl.textContent = pad(index + 1);
    }

    function go(dir) {
      index = (index + dir + total) % total;
      render();
    }

    if (totalEl) totalEl.textContent = pad(total);
    if (prevBtn) prevBtn.addEventListener('click', function () { go(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { go(1); });

    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    });

    render();
  });
})();
