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
})();
