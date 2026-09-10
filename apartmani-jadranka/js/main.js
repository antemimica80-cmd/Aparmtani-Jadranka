// Apartmani Jadranka — shared site behavior
// Mobile nav toggle, scroll effects, and the "Message Host" modal.

document.addEventListener('DOMContentLoaded', function () {
  initNavToggle();
  initHeaderScroll();
  initScrollReveal();
  initHostMessage();
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

// Web3Forms delivers the "Message Host" submissions straight to the owner's
// inbox with no backend of our own. Get a free access key at
// https://web3forms.com (just enter the inbox email you want messages sent
// to — no account needed) and paste it below.
var WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

function initHostMessage() {
  var openBtn = document.getElementById('message-host-btn');
  var modal = document.getElementById('host-message-modal');
  var closeBtn = document.getElementById('host-modal-close');
  var form = document.getElementById('host-message-form');
  var status = document.getElementById('host-message-status');
  if (!openBtn || !modal || !form || !status) return;

  function openModal() {
    modal.hidden = false;
    document.body.classList.add('modal-open');
    var firstField = form.elements['name'];
    if (firstField) firstField.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (event) {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var t = window.Jadranka ? window.Jadranka.t : function (key) { return key; };
    var data = {
      name: form.elements['name'].value.trim(),
      email: form.elements['email'].value.trim(),
      message: form.elements['message'].value.trim()
    };

    if (!data.name || !data.email || !data.message) {
      showStatus(status, t('contact.form_error'), 'error');
      return;
    }

    var submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    showStatus(status, t('contact.form_sending'), 'sending');

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: 'New message from Apartmani Jadranka website',
        from_name: data.name,
        name: data.name,
        email: data.email,
        message: data.message
      })
    })
      .then(function (response) { return response.json(); })
      .then(function (result) {
        if (submitBtn) submitBtn.disabled = false;
        if (result.success) {
          showStatus(status, t('contact.form_success', { name: data.name }), 'success');
          form.reset();
        } else {
          showStatus(status, t('contact.form_send_error'), 'error');
        }
      })
      .catch(function () {
        if (submitBtn) submitBtn.disabled = false;
        showStatus(status, t('contact.form_send_error'), 'error');
      });
  });
}

function showStatus(el, message, type) {
  el.textContent = message;
  el.className = 'form-status visible ' + type;
}
