// Apartmani Jadranka — rotating guest reviews (real Airbnb reviews).
//
// Builds a self-scrolling marquee of review cards from the REVIEWS list below
// (the list is duplicated once so the CSS animation can loop seamlessly).
// Each card's quote text lives in js/i18n.js under `<key>.quote` so it stays
// translatable the same way as everything else on the site. Long quotes are
// clamped with CSS; a "Read more" button (shown only when the text actually
// overflows) opens the full review in a modal.

(function () {
  var REVIEWS = [
    { name: 'Cindy', key: 'reviews.1' },
    { name: 'Ellen', key: 'reviews.2' },
    { name: 'Bjørnar', key: 'reviews.3' },
    { name: 'Chantal', key: 'reviews.4' },
    { name: 'Janos', key: 'reviews.5' },
    { name: 'Ingrid', key: 'reviews.6' },
    { name: 'Anna', key: 'reviews.7' },
    { name: 'Antun', key: 'reviews.8' },
    { name: 'Ildi', key: 'reviews.9' },
    { name: 'Kevin', key: 'reviews.10' }
  ];

  var modal, modalQuote, modalAuthor;

  function ensureModal() {
    if (modal) return;
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.hidden = true;
    modal.innerHTML =
      '<div class="modal-dialog review-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="review-modal-author">' +
        '<button type="button" class="modal-close" aria-label="Close">&times;</button>' +
        '<div class="review-stars" aria-hidden="true">★★★★★</div>' +
        '<blockquote class="review-quote review-modal-quote"></blockquote>' +
        '<p class="review-author"></p>' +
      '</div>';
    document.body.appendChild(modal);
    modalQuote = modal.querySelector('.review-modal-quote');
    modalAuthor = modal.querySelector('.review-author');

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) closeModal();
    });
  }

  function openModal(review, t) {
    ensureModal();
    modalQuote.textContent = t(review.key + '.quote');
    modalAuthor.textContent = '— ' + review.name;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    document.documentElement.classList.add('modal-open');
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    document.documentElement.classList.remove('modal-open');
  }

  function buildCard(review, t) {
    var card = document.createElement('article');
    card.className = 'review-card';
    card.tabIndex = 0;

    var stars = document.createElement('div');
    stars.className = 'review-stars';
    stars.setAttribute('aria-hidden', 'true');
    stars.textContent = '★★★★★';
    card.appendChild(stars);

    var quote = document.createElement('blockquote');
    quote.className = 'review-quote';
    quote.textContent = t(review.key + '.quote');
    card.appendChild(quote);

    var more = document.createElement('button');
    more.type = 'button';
    more.className = 'review-more';
    more.textContent = t('reviews.read_more');
    more.hidden = true;
    card.appendChild(more);

    var author = document.createElement('p');
    author.className = 'review-author';
    author.textContent = '— ' + review.name;
    card.appendChild(author);

    function open() { openModal(review, t); }
    more.addEventListener('click', function (e) { e.stopPropagation(); open(); });
    card.addEventListener('click', open);
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });

    return { card: card, quoteEl: quote, moreEl: more };
  }

  document.addEventListener('DOMContentLoaded', function () {
    var track = document.getElementById('reviews-track');
    if (!track) return;
    var t = window.Jadranka ? window.Jadranka.t : function (k) { return k; };

    var cards = [];
    [0, 1].forEach(function () {
      REVIEWS.forEach(function (review) {
        var built = buildCard(review, t);
        track.appendChild(built.card);
        cards.push(built);
      });
    });

    function checkOverflow() {
      cards.forEach(function (c) {
        c.moreEl.hidden = c.quoteEl.scrollHeight <= c.quoteEl.clientHeight + 2;
      });
    }
    // Fonts/layout need time to settle before measuring clamped height —
    // a single short delay isn't reliable, so check several times as the
    // page finishes loading, plus on resize.
    [100, 400, 1000].forEach(function (ms) { setTimeout(checkOverflow, ms); });
    window.addEventListener('load', checkOverflow);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { requestAnimationFrame(checkOverflow); });
    }
    window.addEventListener('resize', checkOverflow);

    document.addEventListener('jadranka:languagechange', function () {
      cards.forEach(function (c, i) {
        c.quoteEl.textContent = t(REVIEWS[i % REVIEWS.length].key + '.quote');
      });
      var moreLabel = t('reviews.read_more');
      cards.forEach(function (c) { c.moreEl.textContent = moreLabel; });
      checkOverflow();
    });

    var wrap = track.parentElement;
    ['mouseenter', 'touchstart', 'focusin'].forEach(function (evt) {
      wrap.addEventListener(evt, function () { track.classList.add('paused'); }, { passive: true });
    });
    ['mouseleave', 'touchend', 'focusout'].forEach(function (evt) {
      wrap.addEventListener(evt, function () { track.classList.remove('paused'); }, { passive: true });
    });
  });
})();
