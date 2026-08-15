// Apartmani Jadranka — availability calendar & seasonal pricing (Stan).
//
// Blocked dates come from ../data/availability-stan.json, which is refreshed
// daily by the "Sync Airbnb Calendar" GitHub Actions workflow (see
// .github/workflows/sync-airbnb-calendar.yml). This file only reads it.
//
// PRICING: Airbnb does not expose per-date rates via iCal, so seasonal prices
// are defined manually below. Edit PRICING_CONFIG to match your real rates —
// ranges use "MM-DD" (month-day) and are matched against every year.

(function () {
  var PRICING_CONFIG = {
    currency: '€',
    seasons: [
      { key: 'low', start: '01-01', end: '05-31', price: 70 },
      { key: 'mid', start: '06-01', end: '06-30', price: 100 },
      { key: 'high', start: '07-01', end: '08-31', price: 140 },
      { key: 'mid', start: '09-01', end: '09-30', price: 100 },
      { key: 'low', start: '10-01', end: '12-31', price: 70 }
    ],
    defaultPrice: 80
  };

  var state = {
    viewYear: null,
    viewMonth: null, // 0-11
    blocked: new Set(),
    lastUpdated: null,
    checkin: null,
    checkout: null
  };

  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function toISO(date) { return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()); }

  function seasonForDate(date) {
    var mmdd = pad(date.getMonth() + 1) + '-' + pad(date.getDate());
    for (var i = 0; i < PRICING_CONFIG.seasons.length; i++) {
      var s = PRICING_CONFIG.seasons[i];
      if (mmdd >= s.start && mmdd <= s.end) return s;
    }
    return null;
  }

  function priceForDate(date) {
    var s = seasonForDate(date);
    return s ? s.price : PRICING_CONFIG.defaultPrice;
  }

  function isPast(date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  }

  function isBlocked(date) {
    return state.blocked.has(toISO(date));
  }

  function hasBlockedInRange(start, end) {
    var d = new Date(start);
    d.setDate(d.getDate() + 1);
    while (d < end) {
      if (isBlocked(d)) return true;
      d.setDate(d.getDate() + 1);
    }
    return false;
  }

  function loadAvailability() {
    return fetch('../data/availability-stan.json', { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) throw new Error('availability-stan.json not found');
        return res.json();
      })
      .then(function (data) {
        state.blocked = new Set(data.blocked || []);
        state.lastUpdated = data.lastUpdated || null;
      })
      .catch(function (err) {
        state.blocked = new Set();
        state.lastUpdated = null;
        console.warn('Could not load availability-stan.json — showing calendar with no blocked dates.', err);
      });
  }

  function fmtDate(date) {
    var lang = window.Jadranka ? window.Jadranka.getLang() : 'hr';
    return date.toLocaleDateString(lang === 'hr' ? 'hr-HR' : 'en-GB');
  }

  function render() {
    renderCalendar();
    renderSummary();
  }

  function renderCalendar() {
    var t = window.Jadranka.t;
    var monthLabel = document.getElementById('calendar-month-label');
    var weekdaysEl = document.getElementById('calendar-weekdays');
    var daysEl = document.getElementById('calendar-days');
    var updatedEl = document.getElementById('calendar-updated');

    monthLabel.textContent = t('calendar.month.' + state.viewMonth) + ' ' + state.viewYear;

    weekdaysEl.innerHTML = '';
    for (var w = 0; w < 7; w++) {
      var wd = document.createElement('span');
      wd.textContent = t('calendar.weekday.' + w);
      weekdaysEl.appendChild(wd);
    }

    daysEl.innerHTML = '';
    var firstOfMonth = new Date(state.viewYear, state.viewMonth, 1);
    var startOffset = (firstOfMonth.getDay() + 6) % 7; // Monday-first
    var daysInMonth = new Date(state.viewYear, state.viewMonth + 1, 0).getDate();

    for (var i = 0; i < startOffset; i++) {
      var empty = document.createElement('span');
      empty.className = 'calendar-day empty';
      daysEl.appendChild(empty);
    }

    var _loop = function (day) {
      var date = new Date(state.viewYear, state.viewMonth, day);
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'calendar-day';
      btn.textContent = day;

      var past = isPast(date);
      var blocked = isBlocked(date);

      if (past || blocked) {
        btn.classList.add('unavailable');
        btn.disabled = true;
      } else {
        btn.addEventListener('click', function () { handleDayClick(date); });
      }

      if (state.checkin && toISO(date) === toISO(state.checkin)) btn.classList.add('selected');
      if (state.checkout && toISO(date) === toISO(state.checkout)) btn.classList.add('selected');
      if (state.checkin && state.checkout && date > state.checkin && date < state.checkout) btn.classList.add('in-range');

      daysEl.appendChild(btn);
    };

    for (var day = 1; day <= daysInMonth; day++) _loop(day);

    if (updatedEl) {
      if (state.lastUpdated) {
        updatedEl.textContent = t('stan.avail.updated') + ' ' + fmtDate(new Date(state.lastUpdated));
        updatedEl.style.display = '';
      } else {
        updatedEl.style.display = 'none';
      }
    }
  }

  function handleDayClick(date) {
    if (!state.checkin || state.checkout) {
      state.checkin = date;
      state.checkout = null;
    } else if (date <= state.checkin) {
      state.checkin = date;
      state.checkout = null;
    } else {
      state.checkout = date;
    }
    render();
  }

  function renderSummary() {
    var t = window.Jadranka.t;
    var content = document.getElementById('booking-summary-content');
    var clearBtn = document.getElementById('booking-clear');
    if (!content) return;

    if (!state.checkin) {
      content.innerHTML = '<p class="booking-prompt">' + t('stan.avail.prompt_checkin') + '</p>';
      clearBtn.style.display = 'none';
      return;
    }

    if (!state.checkout) {
      content.innerHTML = '<p class="booking-prompt">' + t('stan.avail.prompt_checkout') + '</p>';
      clearBtn.style.display = '';
      return;
    }

    if (hasBlockedInRange(state.checkin, state.checkout)) {
      content.innerHTML = '<p class="booking-prompt unavailable-msg">' + t('stan.avail.unavailable_msg') + '</p>';
      clearBtn.style.display = '';
      return;
    }

    var nights = Math.round((state.checkout - state.checkin) / 86400000);
    var total = 0;
    var d = new Date(state.checkin);
    for (var i = 0; i < nights; i++) {
      total += priceForDate(d);
      d.setDate(d.getDate() + 1);
    }
    var avgPerNight = Math.round(total / nights);

    content.innerHTML =
      '<div class="booking-dates">' + fmtDate(state.checkin) + ' &rarr; ' + fmtDate(state.checkout) + '</div>' +
      '<div class="booking-line"><span>' + nights + ' ' + t('stan.avail.nights') + '</span></div>' +
      '<div class="booking-line"><span>' + t('stan.avail.price_per_night') + '</span><span>' + PRICING_CONFIG.currency + avgPerNight + '</span></div>' +
      '<div class="booking-line total"><span>' + t('stan.avail.total') + '</span><span>' + PRICING_CONFIG.currency + total + '</span></div>';
    clearBtn.style.display = '';
  }

  function init() {
    var prevBtn = document.getElementById('calendar-prev');
    var nextBtn = document.getElementById('calendar-next');
    var clearBtn = document.getElementById('booking-clear');
    if (!prevBtn) return; // calendar not present on this page

    var today = new Date();
    state.viewYear = today.getFullYear();
    state.viewMonth = today.getMonth();

    prevBtn.addEventListener('click', function () {
      state.viewMonth--;
      if (state.viewMonth < 0) { state.viewMonth = 11; state.viewYear--; }
      render();
    });
    nextBtn.addEventListener('click', function () {
      state.viewMonth++;
      if (state.viewMonth > 11) { state.viewMonth = 0; state.viewYear++; }
      render();
    });
    clearBtn.addEventListener('click', function () {
      state.checkin = null;
      state.checkout = null;
      render();
    });

    document.addEventListener('jadranka:languagechange', render);

    loadAvailability().then(render);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
