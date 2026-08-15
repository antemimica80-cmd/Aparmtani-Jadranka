// Apartmani Jadranka — bilingual (HR/EN) text system.
// Add new UI text here as { hr: '...', en: '...' } under a dot-namespaced key,
// then reference it in HTML with data-i18n="that.key" (or data-i18n-placeholder
// for input placeholders). Everything else (toggle UI, persistence) is automatic.

(function () {
  var STORAGE_KEY = 'jadranka-lang';

  var DICT = {
    // --- Navigation ---
    'nav.home': { hr: 'Početna', en: 'Home' },
    'nav.stan': { hr: 'Stan', en: 'Stan' },
    'nav.istok': { hr: 'Istok', en: 'Istok' },
    'nav.contact': { hr: 'Kontakt', en: 'Contact' },

    // --- Homepage: Hero ---
    'home.hero.eyebrow': { hr: 'Mimice · Dalmatinska obala', en: 'Mimice · Dalmatian Coast' },
    'home.hero.subtitle': { hr: 'Obiteljski apartmani na Jadranu, nekoliko koraka od mora.', en: 'Family-run apartments on the Adriatic, steps from the sea.' },
    'home.hero.cta_explore': { hr: 'Istraži', en: 'Explore' },
    'home.hero.cta_check': { hr: 'Provjeri dostupnost', en: 'Check Availability' },

    // --- Homepage: Units overview ---
    'home.units.eyebrow': { hr: 'Naši apartmani', en: 'Our Apartments' },
    'home.units.title': { hr: 'Dva doma uz more', en: 'Two Homes by the Sea' },
    'home.units.subtitle': { hr: 'Samostalni apartmani, svaki sa svojim karakterom — oba na kratkoj šetnji od mora.', en: 'Independent, self-contained apartments — each with its own character, both a short walk from the water.' },
    'home.units.stan_desc': { hr: 'Prostran, sa panoramskim pogledom na more i velikom terasom — idealan za obitelji i manje grupe.', en: 'Spacious, with panoramic sea views and a large terrace — ideal for families and small groups.' },
    'home.units.stan_meta1': { hr: '4 gosta', en: 'Sleeps 4' },
    'home.units.stan_meta2': { hr: 'Terasa 50 m²', en: '50 m² Terrace' },
    'home.units.stan_link': { hr: 'Otkrijte Stan →', en: 'Discover Stan →' },
    'home.units.istok_desc': { hr: 'Naš najsunčaniji i najprostraniji apartman — jutarnje svjetlo i prostor za cijelu obitelj.', en: 'Our sunniest, most spacious unit — bright morning light and room for the whole family.' },
    'home.units.istok_meta1': { hr: '6 gostiju', en: 'Sleeps 6' },
    'home.units.istok_meta2': { hr: 'Balkon', en: 'Balcony' },
    'home.units.istok_link': { hr: 'Otkrijte Istok →', en: 'Discover Istok →' },

    // --- Homepage: Why stay ---
    'home.why.eyebrow': { hr: 'Iskustvo', en: 'The Experience' },
    'home.why.title': { hr: 'Zašto odsjesti kod nas', en: 'Why Stay With Us' },
    'home.why.f1_title': { hr: 'Pogled na more', en: 'Sea Views' },
    'home.why.f1_desc': { hr: 'Kratka šetnja do mora.', en: "A short walk to the water's edge." },
    'home.why.f2_title': { hr: 'Mirna lokacija', en: 'Quiet Location' },
    'home.why.f2_desc': { hr: 'Mirne Mimice, daleko od gužve.', en: 'Peaceful Mimice, away from the crowds.' },
    'home.why.f3_title': { hr: 'Samostalni smještaj', en: 'Self-Catering' },
    'home.why.f3_desc': { hr: 'Potpuno opremljene kuhinje, udobnost doma.', en: 'Fully equipped kitchens, home comforts.' },
    'home.why.f4_title': { hr: 'Domaće gostoprimstvo', en: 'Local Hospitality' },
    'home.why.f4_desc': { hr: 'Topla dobrodošlica obitelji koja poznaje obalu.', en: 'A warm welcome from a family that knows the coast.' },

    // --- Contact / inquiry (shared: home + unit pages link here) ---
    'contact.eyebrow': { hr: 'Kontaktirajte nas', en: 'Get in Touch' },
    'contact.title': { hr: 'Dostupnost i kontakt', en: 'Availability & Contact' },
    'contact.subtitle': { hr: 'Pošaljite nam datume i javit ćemo vam dostupnost i cijenu.', en: "Send us your dates and we'll get back to you with availability and rates." },
    'contact.form_name': { hr: 'Ime i prezime', en: 'Full Name' },
    'contact.form_name_ph': { hr: 'Vaše ime', en: 'Your name' },
    'contact.form_email': { hr: 'Email', en: 'Email' },
    'contact.form_checkin': { hr: 'Dolazak', en: 'Check-in' },
    'contact.form_checkout': { hr: 'Odlazak', en: 'Check-out' },
    'contact.form_unit': { hr: 'Koji apartman?', en: 'Which Apartment?' },
    'contact.form_unit_notsure': { hr: 'Nisam siguran/na', en: 'Not sure / either is fine' },
    'contact.form_message': { hr: 'Poruka', en: 'Message' },
    'contact.form_message_ph': { hr: 'Recite nam nešto o vašem boravku — broj gostiju, posebni zahtjevi, itd.', en: 'Tell us about your stay — number of guests, special requests, etc.' },
    'contact.form_submit': { hr: 'Pošalji upit', en: 'Send Inquiry' },
    'contact.direct': { hr: 'Izravan kontakt', en: 'Direct Contact' },
    'contact.label_email': { hr: 'Email', en: 'Email' },
    'contact.label_phone': { hr: 'Telefon', en: 'Phone' },
    'contact.label_location': { hr: 'Lokacija', en: 'Location' },
    'contact.also_find': { hr: 'Također nas pronađite na', en: 'Also Find Us On' },
    'contact.form_error': { hr: 'Molimo unesite ime, email i kratku poruku.', en: 'Please fill in your name, email, and a short message.' },
    'contact.form_success': { hr: 'Hvala, {name}! Vaš upit je zaprimljen — javit ćemo vam se uskoro putem emaila.', en: 'Thank you, {name}! Your inquiry has been noted — we will get back to you by email shortly.' },

    // --- Footer ---
    'footer.location': { hr: 'Mimice, Dalmatinska obala, Hrvatska', en: 'Mimice, Dalmatian Coast, Croatia' },
    'footer.rights': { hr: 'Sva prava pridržana.', en: 'All rights reserved.' },

    // --- Istok page ---
    'istok.breadcrumb': { hr: 'Početna', en: 'Home' },
    'istok.tagline': { hr: 'Naš najsunčaniji i najprostraniji apartman — prostora za cijelu obitelj.', en: 'Our sunniest, most spacious apartment — room for the whole family.' },
    'istok.gallery.living': { hr: 'Dnevni boravak', en: 'Living room' },
    'istok.gallery.bedroom': { hr: 'Spavaća soba', en: 'Bedroom' },
    'istok.gallery.kitchen': { hr: 'Kuhinja', en: 'Kitchen' },
    'istok.gallery.balcony': { hr: 'Balkon', en: 'Balcony' },
    'istok.gallery.bathroom': { hr: 'Kupaonica', en: 'Bathroom' },
    'istok.about_title': { hr: 'Svijetao, prostran, okrenut istoku', en: 'Bright, Spacious, East-Facing' },
    'istok.sleeps': { hr: 'Do 6 gostiju', en: 'Sleeps up to 6' },
    'istok.desc_p1': { hr: 'Nazvan po jutarnjem svjetlu koje ga ispunjava, Istok je naš veći apartman — dvije spavaće sobe, prostran dnevni boravak s blagovaonicom te balkon s pogledom na more u daljini.', en: 'Named for the morning light that fills it, Istok is our larger apartment — two bedrooms, a spacious living and dining area, and a balcony with a glimpse of the sea in the distance.' },
    'istok.desc_p2': { hr: 'Nalazi se tik uz Stan, dijeleći isti miran vrt i jednostavno parkiranje — idealno za zajedničku rezervaciju oba apartmana za veće grupe.', en: 'Sits just steps from Stan, sharing the same peaceful garden and easy parking — ideal for booking both units together for larger group getaways.' },
    'istok.amenities_heading': { hr: 'Sadržaji', en: 'Amenities' },
    'istok.am_kitchen': { hr: 'Potpuno opremljena kuhinja', en: 'Fully equipped kitchen' },
    'istok.am_wifi': { hr: 'Besplatan WiFi', en: 'Free WiFi' },
    'istok.am_parking': { hr: 'Privatni parking', en: 'Private parking' },
    'istok.am_ac': { hr: 'Klima uređaj', en: 'Air conditioning' },
    'istok.am_balcony': { hr: 'Balkon', en: 'Balcony' },
    'istok.am_washer': { hr: 'Perilica rublja', en: 'Washing machine' },
    'istok.am_tv': { hr: 'TV sa ravnim ekranom', en: 'Flat-screen TV' },
    'istok.am_linens': { hr: 'Posteljina i ručnici uključeni', en: 'Bed linens & towels included' },
    'istok.pricing_title': { hr: 'Cijene', en: 'Pricing' },
    'istok.pricing_desc': { hr: 'Cijene ovise o sezoni i duljini boravka. Kontaktirajte nas za personaliziranu ponudu i trenutnu dostupnost.', en: 'Rates vary by season and length of stay. Contact us for a personalized quote and current availability.' },
    'istok.pricing_cta': { hr: 'Kontaktirajte za cijene', en: 'Contact for Rates' },
    'istok.pricing_note': { hr: 'Bez naknada za rezervaciju — rezervirajte izravno kod naše obitelji.', en: 'No booking fees — reserve directly with our family.' },

    // --- Stan page ---
    'stan.breadcrumb': { hr: 'Početna', en: 'Home' },
    'stan.tagline': { hr: 'Panoramski pogled na more i prostrana terasa.', en: 'Panoramic sea views and a spacious terrace.' },
    'stan.gallery.living': { hr: 'Dnevni boravak', en: 'Living room' },
    'stan.gallery.bedroom': { hr: 'Spavaća soba', en: 'Bedroom' },
    'stan.gallery.kitchen': { hr: 'Kuhinja', en: 'Kitchen' },
    'stan.gallery.terrace': { hr: 'Terasa', en: 'Terrace' },
    'stan.gallery.bathroom': { hr: 'Kupaonica', en: 'Bathroom' },
    'stan.about_title': { hr: 'Prostor, tišina i pogled koji pamtite', en: "Space, Quiet, and a View You'll Remember" },
    'stan.sleeps': { hr: '4 gosta · 2 spavaće sobe · 2 kupaonice', en: '4 guests · 2 bedrooms · 2 bathrooms' },
    'stan.desc_p1': { hr: 'Smješten na drugom katu obiteljske kuće, prostrani stan od 90 m² nudi udobnost, privatnost i nezaboravan pogled. Velika terasa okrenuta jugozapadu (oko 50 m²) savršena je za objedovanje na otvorenom i uživanje u dalmatinskom suncu.', en: 'Set on the second floor of a family house, this spacious 90 m² apartment offers comfort, privacy, and an unforgettable view. The large southwest-facing terrace (about 50 m²) is perfect for outdoor dining and soaking up the Dalmatian sun.' },
    'stan.desc_p2': { hr: 'Stan ima dvije spavaće sobe — jednu s bračnim krevetom, dodatnim krevetom, privatnom kupaonicom i izlazom na terasu, te drugu okrenutu borovima za mirne i hladne noći — dvije kupaonice, potpuno opremljenu kuhinju i svijetli otvoreni dnevni boravak s pogledom na Jadransko more, otoke Brač i Hvar, poluotok Pelješac i planinu Biokovo. Nalazi se u mirnom području, samo 170 metara od mora.', en: 'The apartment has two bedrooms — one with a double bed, an extra bed, a private bathroom, and terrace access, and another facing the pine trees for quiet, cool nights — two bathrooms, a fully equipped kitchen, and a bright open living room looking out over the Adriatic Sea, the islands of Brač and Hvar, the Pelješac peninsula, and Mount Biokovo. Set in a quiet area, just 170 meters from the sea.' },
    'stan.amenities_heading': { hr: 'Sadržaji', en: 'Amenities' },

    'stan.cat.kitchen': { hr: 'Kuhinja', en: 'Kitchen' },
    'stan.cat.kitchen.1': { hr: 'Potpuno opremljena kuhinja', en: 'Fully equipped kitchen' },
    'stan.cat.kitchen.2': { hr: 'Perilica posuđa', en: 'Dishwasher' },
    'stan.cat.kitchen.3': { hr: 'Štednjak', en: 'Stove' },
    'stan.cat.kitchen.4': { hr: 'Pećnica', en: 'Oven' },
    'stan.cat.kitchen.5': { hr: 'Aparat za filter kavu', en: 'Coffee maker' },
    'stan.cat.kitchen.6': { hr: 'Hladnjak', en: 'Refrigerator' },
    'stan.cat.kitchen.7': { hr: 'Mikrovalna pećnica', en: 'Microwave' },
    'stan.cat.kitchen.8': { hr: 'Osnovni pribor za kuhanje', en: 'Basic cooking essentials' },

    'stan.cat.bathroom': { hr: 'Kupaonica', en: 'Bathroom' },
    'stan.cat.bathroom.1': { hr: 'Sušilo za kosu', en: 'Hair dryer' },
    'stan.cat.bathroom.2': { hr: 'Šampon', en: 'Shampoo' },
    'stan.cat.bathroom.3': { hr: 'Topla voda', en: 'Hot water' },

    'stan.cat.bedroom': { hr: 'Spavaća soba i rublje', en: 'Bedroom & Linens' },
    'stan.cat.bedroom.1': { hr: 'Perilica rublja', en: 'Washing machine' },
    'stan.cat.bedroom.2': { hr: 'Ručnici, posteljina, sapun, WC papir', en: 'Towels, bed linen, soap, toilet paper' },
    'stan.cat.bedroom.3': { hr: 'Vješalice', en: 'Hangers' },
    'stan.cat.bedroom.4': { hr: 'Dodatni jastuci i prekrivači', en: 'Extra pillows & blankets' },
    'stan.cat.bedroom.5': { hr: 'Glačalo', en: 'Iron' },

    'stan.cat.climate': { hr: 'Grijanje i hlađenje', en: 'Heating & Cooling' },
    'stan.cat.climate.1': { hr: 'Klima uređaj', en: 'Air conditioning' },
    'stan.cat.climate.2': { hr: 'Grijanje', en: 'Heating' },

    'stan.cat.entertainment': { hr: 'Zabava', en: 'Entertainment' },
    'stan.cat.entertainment.1': { hr: 'TV sa standardnim kabelskim paketom', en: 'TV with standard cable' },
    'stan.cat.entertainment.2': { hr: 'Knjige i igračke za djecu', en: 'Books and toys for children' },

    'stan.cat.internet': { hr: 'Internet', en: 'Internet' },
    'stan.cat.internet.1': { hr: 'Wi-Fi', en: 'Wi-Fi' },

    'stan.cat.outdoor': { hr: 'Vanjski sadržaji', en: 'Outdoor' },
    'stan.cat.outdoor.1': { hr: 'Terasa s pogledom na more', en: 'Terrace with sea view' },

    'stan.cat.location': { hr: 'Lokacija', en: 'Location' },
    'stan.cat.location.1': { hr: 'Pristup obližnjoj plaži (170 m)', en: 'Access to nearby beach (170 m)' },

    'stan.cat.other': { hr: 'Ostalo', en: 'Other' },
    'stan.cat.other.1': { hr: 'Besplatan parking u sklopu objekta', en: 'Free parking on premises' },
    'stan.cat.other.2': { hr: 'Moguće ostaviti prtljagu', en: 'Luggage drop-off allowed' },
    'stan.cat.other.3': { hr: 'Boravak 28+ dana moguć', en: 'Long-term stays allowed (28+ nights)' },
    'stan.cat.other.4': { hr: 'Samostalni dolazak (self check-in)', en: 'Self check-in' },
    'stan.cat.other.5': { hr: 'Osoblje dostupno 0-24', en: 'Staff available 24 hours' },

    // --- Stan: availability & pricing ---
    'stan.avail.cta': { hr: 'Provjeri dostupnost', en: 'Check Availability' },
    'stan.avail.eyebrow': { hr: 'Rezervacija', en: 'Booking' },
    'stan.avail.title': { hr: 'Dostupnost i cijene', en: 'Availability & Pricing' },
    'stan.avail.subtitle': { hr: 'Odaberite datume dolaska i odlaska da vidite cijenu i dostupnost.', en: 'Select your check-in and check-out dates to see pricing and availability.' },
    'stan.avail.legend_available': { hr: 'Dostupno', en: 'Available' },
    'stan.avail.legend_unavailable': { hr: 'Zauzeto', en: 'Unavailable' },
    'stan.avail.legend_selected': { hr: 'Odabrano', en: 'Selected' },
    'stan.avail.prev': { hr: 'Prethodni mjesec', en: 'Previous month' },
    'stan.avail.next': { hr: 'Sljedeći mjesec', en: 'Next month' },
    'stan.avail.prompt_checkin': { hr: 'Odaberite datum dolaska', en: 'Select a check-in date' },
    'stan.avail.prompt_checkout': { hr: 'Odaberite datum odlaska', en: 'Select a check-out date' },
    'stan.avail.nights': { hr: 'noćenja', en: 'nights' },
    'stan.avail.price_per_night': { hr: 'Cijena po noći', en: 'Price per night' },
    'stan.avail.total': { hr: 'Ukupno', en: 'Total' },
    'stan.avail.clear': { hr: 'Poništi odabir', en: 'Clear selection' },
    'stan.avail.unavailable_msg': { hr: 'Odabrani termin nije dostupan. Molimo odaberite druge datume.', en: 'Selected dates are not available. Please choose different dates.' },
    'stan.avail.updated': { hr: 'Kalendar se automatski ažurira s Airbnb-a. Zadnje ažuriranje:', en: 'Calendar syncs automatically from Airbnb. Last updated:' },
    'stan.avail.note': { hr: 'Cijene su okvirne; konačna cijena potvrđuje se prilikom rezervacije.', en: 'Prices are indicative; final price is confirmed at booking.' },
    'stan.avail.min_nights_msg': { hr: 'Za odabrani period minimalni boravak je {min} noćenja. Molimo odaberite dulji period.', en: 'For the selected period, the minimum stay is {min} nights. Please choose a longer period.' },

    'stan.avail.inquiry_title': { hr: 'Pošaljite upit za odabrane datume', en: 'Send an Inquiry for These Dates' },
    'stan.avail.form_adults': { hr: 'Broj odraslih', en: 'Number of adults' },
    'stan.avail.form_children': { hr: 'Broj djece', en: 'Number of children' },
    'stan.avail.form_phone': { hr: 'Telefon', en: 'Phone' },
    'stan.avail.form_phone_ph': { hr: 'Vaš broj telefona', en: 'Your phone number' },
    'stan.avail.form_message_ph': { hr: 'Napomene, posebni zahtjevi...', en: 'Notes, special requests...' },
    'stan.avail.form_error': { hr: 'Molimo unesite ime, email i telefon.', en: 'Please fill in your name, email, and phone.' },
    'stan.avail.email_subject': { hr: 'Upit za apartman Stan – {checkin} do {checkout}', en: 'Inquiry for Stan Apartment – {checkin} to {checkout}' },
    'stan.avail.email_label_name': { hr: 'Ime i prezime', en: 'Full name' },
    'stan.avail.email_label_email': { hr: 'Email', en: 'Email' },
    'stan.avail.email_label_phone': { hr: 'Telefon', en: 'Phone' },
    'stan.avail.email_label_checkin': { hr: 'Datum dolaska', en: 'Check-in date' },
    'stan.avail.email_label_checkout': { hr: 'Datum odlaska', en: 'Check-out date' },
    'stan.avail.email_label_nights': { hr: 'Broj noćenja', en: 'Number of nights' },
    'stan.avail.email_label_adults': { hr: 'Broj odraslih', en: 'Number of adults' },
    'stan.avail.email_label_children': { hr: 'Broj djece', en: 'Number of children' },
    'stan.avail.email_label_total': { hr: 'Ukupna cijena', en: 'Total price' },
    'stan.avail.email_label_message': { hr: 'Poruka', en: 'Message' },

    // --- Calendar month/weekday names ---
    'calendar.month.0': { hr: 'Siječanj', en: 'January' },
    'calendar.month.1': { hr: 'Veljača', en: 'February' },
    'calendar.month.2': { hr: 'Ožujak', en: 'March' },
    'calendar.month.3': { hr: 'Travanj', en: 'April' },
    'calendar.month.4': { hr: 'Svibanj', en: 'May' },
    'calendar.month.5': { hr: 'Lipanj', en: 'June' },
    'calendar.month.6': { hr: 'Srpanj', en: 'July' },
    'calendar.month.7': { hr: 'Kolovoz', en: 'August' },
    'calendar.month.8': { hr: 'Rujan', en: 'September' },
    'calendar.month.9': { hr: 'Listopad', en: 'October' },
    'calendar.month.10': { hr: 'Studeni', en: 'November' },
    'calendar.month.11': { hr: 'Prosinac', en: 'December' },
    'calendar.weekday.0': { hr: 'Pon', en: 'Mon' },
    'calendar.weekday.1': { hr: 'Uto', en: 'Tue' },
    'calendar.weekday.2': { hr: 'Sri', en: 'Wed' },
    'calendar.weekday.3': { hr: 'Čet', en: 'Thu' },
    'calendar.weekday.4': { hr: 'Pet', en: 'Fri' },
    'calendar.weekday.5': { hr: 'Sub', en: 'Sat' },
    'calendar.weekday.6': { hr: 'Ned', en: 'Sun' },

    // --- Season names (used by calendar.js pricing config) ---
    'season.low': { hr: 'niska sezona', en: 'low season' },
    'season.mid': { hr: 'srednja sezona', en: 'mid season' },
    'season.high': { hr: 'visoka sezona', en: 'high season' }
  };

  function getLang() {
    var stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'en' ? 'en' : 'hr';
  }

  function t(key, vars) {
    var entry = DICT[key];
    var text = entry ? (entry[getLang()] || entry.hr) : key;
    if (vars) {
      Object.keys(vars).forEach(function (v) {
        text = text.replace('{' + v + '}', vars[v]);
      });
    }
    return text;
  }

  function applyLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var entry = DICT[el.getAttribute('data-i18n')];
      if (entry) el.textContent = entry[lang] || entry.hr;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var entry = DICT[el.getAttribute('data-i18n-placeholder')];
      if (entry) el.setAttribute('placeholder', entry[lang] || entry.hr);
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach(function (el) {
      var entry = DICT[el.getAttribute('data-i18n-aria-label')];
      if (entry) el.setAttribute('aria-label', entry[lang] || entry.hr);
    });

    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang-btn') === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    document.dispatchEvent(new CustomEvent('jadranka:languagechange', { detail: { lang: lang } }));
  }

  function initLanguageToggle() {
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLanguage(btn.getAttribute('data-lang-btn'));
      });
    });
    applyLanguage(getLang());
  }

  window.Jadranka = {
    t: t,
    getLang: getLang,
    applyLanguage: applyLanguage
  };

  document.addEventListener('DOMContentLoaded', initLanguageToggle);
})();
