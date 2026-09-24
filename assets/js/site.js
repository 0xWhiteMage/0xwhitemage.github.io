(function () {
  'use strict';

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var root = document.documentElement;
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.more').forEach(function (more) {
    var btn = more.nextElementSibling;
    if (!btn || !btn.classList.contains('more-btn')) return;
    var nameEl = btn.querySelector('.row-name');
    var iconEl = btn.querySelector('.row-meta');
    var count = more.querySelectorAll('li').length;
    var expanded = false, anim = null;

    more.style.height = '0px';
    more.style.overflow = 'hidden';
    btn.hidden = false;

    function label() {
      nameEl.textContent = expanded ? 'Show less' : 'Show ' + count + ' more';
      if (iconEl) iconEl.textContent = expanded ? '\u2212' : '+';
    }
    label();

    btn.addEventListener('click', function () {
      expanded = !expanded;
      btn.setAttribute('aria-expanded', String(expanded));
      label();
      var h = more.scrollHeight;
      if (anim) anim.cancel();
      if (reduced) {
        more.style.height = expanded ? '' : '0px';
        return;
      }
      if (expanded) {
        anim = more.animate(
          [{ height: '0px' }, { height: h + 'px' }],
          { duration: 300, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
        );
        anim.onfinish = function () { more.style.height = ''; anim = null; };
      } else {
        anim = more.animate(
          [{ height: h + 'px' }, { height: '0px' }],
          { duration: 240, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
        );
        anim.onfinish = function () { more.style.height = '0px'; anim = null; };
      }
    });
  });

  var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  items.forEach(function (el) {
    var parent = el.parentElement;
    var siblings = parent ? Array.prototype.slice.call(parent.querySelectorAll(':scope > .reveal')) : [el];
    var i = Math.max(0, siblings.indexOf(el));
    el.style.setProperty('--d', Math.min(i * 55, 330) + 'ms');
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

  items.forEach(function (el) { io.observe(el); });
})();
