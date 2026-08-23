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

  // BTS marquee (film page): driven by JS with requestAnimationFrame and
  // real pixel measurements instead of a CSS % transform on a max-content
  // track. The CSS-only version could show a visible gap/seam in some
  // browsers when the halfway point didn't line up with the duplicated
  // content's actual pixel width.
  var btsTrack = document.querySelector('.bts-track');
  if (btsTrack && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var half = 0;
    function computeHalf() { half = btsTrack.scrollWidth / 2; }
    computeHalf();
    window.addEventListener('resize', computeHalf);

    var pos = 0;
    var speedPxPerSec = 45;
    var paused = false;
    var wrap = btsTrack.parentElement;
    wrap.addEventListener('mouseenter', function () { paused = true; });
    wrap.addEventListener('mouseleave', function () { paused = false; });

    var last = null;
    function step(ts) {
      if (last === null) last = ts;
      var dt = (ts - last) / 1000;
      last = ts;
      if (!paused && half > 0) {
        pos += speedPxPerSec * dt;
        if (pos >= half) pos -= half;
        btsTrack.style.transform = 'translateX(' + (-pos).toFixed(2) + 'px)';
      }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
})();
