/* ==========================================================================
   Museumate Landing Page — JavaScript
   Progressive enhancement only. Site works fully without JS.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Mobile Navigation ---------- */
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('is-open');
      toggle.classList.toggle('is-active');
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close nav when a link is clicked
    var navLinks = links.querySelectorAll('.nav__link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Scroll-triggered Fade-in ---------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!prefersReducedMotion.matches && 'IntersectionObserver' in window) {
    var fadeElements = document.querySelectorAll('.fade-in');

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // If reduced motion or no IntersectionObserver, show everything immediately
    document.querySelectorAll('.fade-in').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var navHeight = document.getElementById('nav').offsetHeight;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
        });
      }
    });
  });
})();