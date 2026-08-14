// Apartmani Jadranka — shared site behavior
// Mobile nav toggle, scroll effects, and inquiry form handling (no backend yet).

document.addEventListener('DOMContentLoaded', function () {
  initNavToggle();
  initHeaderScroll();
  initScrollReveal();
  initInquiryForm();
});

function initNavToggle() {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initHeaderScroll() {
  var header = document.querySelector('.site-header');
  if (!header) return;

  function update() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initScrollReveal() {
  var targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(function (el) { observer.observe(el); });
}

function initInquiryForm() {
  var form = document.getElementById('inquiry-form');
  var status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var data = {
      name: form.elements['name'].value.trim(),
      email: form.elements['email'].value.trim(),
      checkin: form.elements['checkin'].value,
      checkout: form.elements['checkout'].value,
      unit: form.elements['unit'].value,
      message: form.elements['message'].value.trim()
    };

    if (!data.name || !data.email || !data.message) {
      showStatus(status, 'Please fill in your name, email, and a short message.', 'error');
      return;
    }

    // No backend is connected yet. The captured fields below are ready to be
    // sent to an email service (e.g. Formspree, EmailJS) or your booking
    // tool's API — replace this block with that call when ready.
    console.log('Inquiry captured:', data);

    showStatus(status, 'Thank you, ' + data.name + '! Your inquiry has been noted — we will get back to you by email shortly. (This form is not yet connected to email; see js/main.js.)', 'success');
    form.reset();
  });
}

function showStatus(el, message, type) {
  el.textContent = message;
  el.className = 'form-status visible ' + type;
}
