// Apartmani Jadranka — bilingual (HR/EN) text system.
// Add new UI text here as { hr: '...', en: '...' } under a dot-namespaced key,
// then reference it in HTML with data-i18n="that.key" (or data-i18n-placeholder
// for input placeholders). Everything else (toggle UI, persistence) is automatic.

(function () {
  var STORAGE_KEY = 'jadranka-lang';

  var DICT = {
    // --- Navigation ---
    // "Stan" / "Istok" are internal identifiers only (filenames, form values,
    // JSON keys) — guests always see one of the two guest-facing names below.
    // Short form: nav, breadcrumbs, small eyebrow labels. Full form
    // (*.display_name): page H1s, homepage unit cards, <title> tags, the
    // apartment picker, and the inquiry email subject.
    'nav.home': { hr: 'Početna', en: 'Home' },
    'nav.stan': { hr: 'Apartman s pogledom na jugozapad', en: 'South West View Apartment' },
    'nav.istok': { hr: 'Apartman s pogledom na jugoistok', en: 'South East View Apartment' },
    'nav.mimice': { hr: 'Mimice', en: 'Mimice' },
    'nav.things': { hr: 'U okolici', en: 'Nearby' },
    'nav.contact': { hr: 'Kontakt', en: 'Contact' },

    'stan.display_name': { hr: 'Apartman s panoramskim pogledom na more i prostranom terasom', en: 'Panoramic Sea View Apartment with Spacious Terrace' },
    'stan.title_tag': { hr: 'Apartman s panoramskim pogledom na more i prostranom terasom | Apartmani Jadranka', en: 'Panoramic Sea View Apartment with Spacious Terrace | Apartmani Jadranka' },
    'istok.display_name': { hr: 'Apartman s dvije spavaće sobe i prekrasnim pogledom na more', en: 'Two-Bedroom Apartment with Stunning Sea View' },
    'istok.title_tag': { hr: 'Apartman s dvije spavaće sobe i prekrasnim pogledom na more | Apartmani Jadranka', en: 'Two-Bedroom Apartment with Stunning Sea View | Apartmani Jadranka' },

    // --- Homepage: Hero ---
    'home.hero.eyebrow': { hr: 'Mimice · Dalmatinska obala', en: 'Mimice · Dalmatian Coast' },
    'home.hero.subtitle': { hr: 'Obiteljski apartmani na Jadranu, nekoliko koraka od mora.', en: 'Family-run apartments on the Adriatic, steps from the sea.' },

    // --- Homepage: Units overview ---
    'home.units.eyebrow': { hr: 'Naši apartmani', en: 'Our Apartments' },
    'home.units.title': { hr: 'Dva doma uz more', en: 'Two Homes by the Sea' },
    'home.units.subtitle': { hr: 'Samostalni apartmani, svaki sa svojim karakterom — oba na kratkoj šetnji od mora.', en: 'Independent, self-contained apartments — each with its own character, both a short walk from the water.' },
    'home.units.stan_desc': { hr: 'Prostran, sa panoramskim pogledom na more i velikom terasom — idealan za obitelji i manje grupe.', en: 'Spacious, with panoramic sea views and a large terrace — ideal for families and small groups.' },
    'home.units.stan_meta1': { hr: '4 gosta', en: 'Sleeps 4' },
    'home.units.stan_meta2': { hr: 'Terasa 50 m²', en: '50 m² Terrace' },
    'home.units.stan_link': { hr: 'Pogledajte detalje →', en: 'View Details →' },
    'home.units.istok_desc': { hr: 'Prostran i moderan apartman od 80 m² u srcu Mimica, na koracima od plaže.', en: 'A spacious, modern 80 m² apartment in the heart of Mimice, steps from the beach.' },
    'home.units.istok_meta1': { hr: '4 gosta', en: 'Sleeps 4' },
    'home.units.istok_meta2': { hr: 'Balkon', en: 'Balcony' },
    'home.units.istok_link': { hr: 'Pogledajte detalje →', en: 'View Details →' },

    // --- Homepage: Guest reviews (real Airbnb reviews, translated) ---
    'reviews.eyebrow': { hr: 'Recenzije gostiju', en: 'Guest Reviews' },
    'reviews.title': { hr: 'Što kažu naši gosti', en: 'What Our Guests Say' },
    'reviews.subtitle': { hr: '48 recenzija na Airbnbu — nekoliko naših omiljenih.', en: '48 reviews on Airbnb — a few of our favorites.' },
    'reviews.read_more': { hr: 'Pročitaj više', en: 'Read more' },
    'reviews.1.quote': { hr: 'Izvanredan pogled!!! Prekrasan stan smješten pored prekrasne male plaže.', en: 'Outstanding view!!! A beautiful apartment right next to a gorgeous little beach.' },
    'reviews.2.quote': { hr: 'Imali smo fantastičan boravak u stanu i u Mimicama. Pogled s balkona je zaista nevjerojatan; ovdje vam nikada neće dosaditi! Stan je također lijepo uređen, opremljen svim udobnostima i čist. Jadranka je vrlo draga domaćica i dala je sjajne savjete. Također nam se jako svidjelo selo Mimice. Na pješačkoj udaljenosti nalazi se mala luka s nekoliko restorana. Smatrali smo da je plaža Kutleša fantastično lijepa i preporučili bismo odlazak na nju s malom djecom! Bili smo vrlo sretni što smo daleko od vreve Makarske. Plaže su tamo prekrasne, ali tako strašno prepune (čak i u lipnju); često je nemoguće parkirati automobil ili plaćate puno za parkiranje. Skrenuli smo nekoliko puta desno i vratili se na prekrasnu plažu koja je bila na pješačkoj udaljenosti od apartmana! Toplo preporučujemo!', en: "We had a fantastic stay in the apartment and in Mimice. The view from the balcony is truly incredible — you'll never get bored here! The apartment is also beautifully decorated, well equipped, and clean. Jadranka is a lovely host and gave us great tips. We also really loved the village of Mimice. There's a small harbor with a few restaurants within walking distance. We found Kutleša beach fantastically beautiful and would recommend it for families with young children! We were very happy to be away from the hustle of Makarska — the beaches there are gorgeous but incredibly crowded (even in June); it's often impossible to park, or parking is very expensive. We turned off a few times and found our way back to a beautiful beach within walking distance of the apartment! Highly recommend!" },
    'reviews.3.quote': { hr: 'Vrlo lijep i moderan stan na pješačkoj udaljenosti od dvije različite lijepe plaže. Predivan pogled! Jadranka je bila profesionalna, prijateljski nastrojena i vrlo dobra domaćica.', en: 'Very nice and modern apartment within walking distance of two different beautiful beaches. Amazing view! Jadranka was professional, friendly, and a great host.' },
    'reviews.4.quote': { hr: 'Domaćin je bio iznimno susretljiv i uslužan. Jadranka je vrlo brzo odgovarala na pitanja. Pogled s terase bio je vrlo lijep i opuštajući. Apartman je bio vrlo lijepo i moderno uređen. U potpunosti preporučujemo!', en: 'The host was extremely welcoming and helpful. Jadranka responded to questions very quickly. The view from the terrace was beautiful and relaxing. The apartment was very nicely and modernly furnished. We fully recommend it!' },
    'reviews.5.quote': { hr: 'Gostoljubiv, čist dom, besprijekorno čist s prekrasnim pogledom. Jadranka je bila od velike pomoći. Željeli bismo tamo ostati duže.', en: 'Hospitable, clean home, spotless with a beautiful view. Jadranka was very helpful. We wished we could have stayed longer.' },
    'reviews.6.quote': { hr: 'Smještaj nam je savršeno odgovarao. Moj sin i njegova djevojka imali su zasebnu sobu s kupaonicom, što nam je jamčilo dovoljno privatnosti. Velika terasa je bila sjajna. Tamo smo provodili vrijeme uživajući u prekrasnom pogledu na more i okolno zelenilo. Kuhinja je bila iznenađujuće dobro opremljena, uključujući kvalitetne dodatke. Sobe su bile dovoljno velike, ukusno uređene i udobne te smo se vrlo brzo osjećali kao kod kuće. Prilično dobro opskrbljena trgovina bila je udaljena nekoliko stotina metara, što je bila prednost. Iako su na plaže u luci još uvijek bile u fazi izgradnje, obližnje plaže s prekrasnim krajolikom, ugodnim ulaskom u vodu i čistim morem bile su više nego odlična zamjena. Ako sljedeći put odlučimo provesti odmor u Mimicama, sigurno ćemo odabrati smještaj kod Jadranke, koja je bila vrlo ljubazna i pažljiva. Bili smo više nego zadovoljni.', en: "The accommodation suited us perfectly. My son and his girlfriend had a separate room with a bathroom, which gave us plenty of privacy. The large terrace was fantastic — we spent our time there enjoying the beautiful sea view and the greenery around. The kitchen was surprisingly well equipped, including quality extras. The rooms were spacious enough, tastefully decorated and comfortable, and we felt at home very quickly. A well-stocked shop was just a few hundred meters away, which was a real plus. Although the beaches by the harbor were still under construction, the nearby beaches — with beautiful scenery, easy water access, and clean sea — were more than a great substitute. If we decide to spend our next holiday in Mimice, we'll definitely book with Jadranka again, who was very kind and attentive. We were more than satisfied." },
    'reviews.7.quote': { hr: 'Jadrankin prekrasni apartman smješten je na vrhu sela i ima prostrani balkon s besprijekornim pogledom. Soba je čista i udobna. Jadranka je simpatična i susretljiva, došla nas je dočekati jednog vrućeg dana i dala nam mnogo preporuka za lokalne aktivnosti. Od stana je 5 minuta pješice do plaže, voda je sredinom svibnja bistra i svježa, blaženstvo je uživati u nježnim valovima i plivati s malim ribicama. Uživam u svakom trenutku svog boravka ovdje.', en: "Jadranka's beautiful apartment is located at the top of the village and has a spacious balcony with a flawless view. The room is clean and comfortable. Jadranka is kind and welcoming — she came to greet us on a hot day and gave us lots of recommendations for local activities. It's a 5-minute walk from the apartment to the beach; the water in mid-May is clear and fresh, and it's blissful to enjoy the gentle waves and swim alongside little fish. I'm enjoying every moment of my stay here." },
    'reviews.8.quote': { hr: 'Odlično smo se zabavili u ovom stanu, sve je izgledalo baš kao na fotografijama. Pogled s terase bio je predivan. Jadranka je bila vrlo ljubazna domaćica koja nam je dala mnogo savjeta o tome što raditi u okolici.', en: 'We had a great time in this apartment — everything looked just like in the photos. The view from the terrace was gorgeous. Jadranka was a very kind host who gave us lots of tips on what to do in the area.' },
    'reviews.9.quote': { hr: 'Udoban, prostran stan, poseban balkon, prekrasno okruženje i vrlo dobar, veseo i susretljiv domaćin, od kojeg smo dobili sve informacije za super odmor. Toplo preporučujem.', en: 'Comfortable, spacious apartment, a special balcony, beautiful surroundings, and a very good, cheerful, and helpful host, from whom we got all the information for a great holiday. Highly recommend.' },
    'reviews.10.quote': { hr: 'Stan je bio odličan, a plaža je udaljena 5 minuta. U selu postoji nekoliko manjih restorana, a Omiš je udaljen 20 minuta, a Split sat vremena. Restoran Konoba Tadići preporučuje se za zalazak sunca na planinama i udaljen je 20 minuta. Smještaj je odličan, a s balkona se pruža prekrasan pogled na zalazak sunca.', en: 'The apartment was excellent, and the beach is 5 minutes away. There are a few small restaurants in the village, Omiš is 20 minutes away, and Split about an hour. Konoba Tadići restaurant is recommended for a mountain sunset and is about 20 minutes away. The accommodation is excellent, and the balcony has a beautiful sunset view.' },

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

    // --- Gallery lightbox (shared: unit pages) ---
    'gallery.show_all': { hr: 'Prikaži sve fotografije', en: 'Show all photos' },

    // --- Contact / inquiry (shared: home + unit pages link here) ---
    'contact.eyebrow': { hr: 'Kontaktirajte nas', en: 'Get in Touch' },
    'contact.title': { hr: 'Poruka domaćinu', en: 'Message Your Host' },
    'contact.subtitle': { hr: 'Imate pitanja o svom boravku? Pošaljite nam poruku i odgovorit ćemo direktno na vaš email.', en: "Questions about your stay? Send us a message and we'll reply directly to your email." },
    'contact.host_name': { hr: 'Jadranka', en: 'Jadranka' },
    'contact.host_role': { hr: 'Vaš domaćin', en: 'Your Host' },
    'contact.host_blurb': { hr: 'Obiteljski vodimo apartmane Jadranka i rado ćemo odgovoriti na sva vaša pitanja o smještaju i dolasku.', en: 'We run Apartmani Jadranka as a family and are always happy to answer your questions about the apartments and your stay.' },
    'contact.message_host_cta': { hr: 'Poruka domaćinu', en: 'Message Host' },
    'contact.modal_title': { hr: 'Pošaljite poruku', en: 'Send a Message' },
    'contact.modal_close': { hr: 'Zatvori', en: 'Close' },
    'contact.form_name': { hr: 'Ime i prezime', en: 'Full Name' },
    'contact.form_name_ph': { hr: 'Vaše ime', en: 'Your name' },
    'contact.form_email': { hr: 'Email', en: 'Email' },
    'contact.form_message': { hr: 'Poruka', en: 'Message' },
    'contact.form_message_ph': { hr: 'Recite nam nešto o vašem boravku — broj gostiju, datumi, posebni zahtjevi, itd.', en: 'Tell us about your stay — number of guests, dates, special requests, etc.' },
    'contact.form_submit': { hr: 'Pošalji poruku', en: 'Send Message' },
    'contact.form_error': { hr: 'Molimo unesite ime, email i kratku poruku.', en: 'Please fill in your name, email, and a short message.' },
    'contact.form_sending': { hr: 'Slanje poruke…', en: 'Sending message…' },
    'contact.form_success': { hr: 'Hvala, {name}! Vaša poruka je poslana — javit ćemo vam se uskoro putem emaila.', en: 'Thank you, {name}! Your message has been sent — we will get back to you by email shortly.' },
    'contact.form_send_error': { hr: 'Nešto je pošlo po zlu. Pokušajte ponovno ili nam pišite izravno na email.', en: 'Something went wrong. Please try again or email us directly.' },
    'riviera.eyebrow': { hr: 'U okolici', en: 'Nearby' },
    'riviera.title': { hr: 'Aktivnosti u okolici Mimica', en: 'Things to Do Around Mimice' },
    'riviera.intro': { hr: 'Izleti, trgovine i restorani vrijedni posjeta — naše osobne preporuke iz okolice.', en: 'Excursions, shops, and restaurants worth the trip — our own recommendations from the area.' },
    'riviera.cat_excursions': { hr: 'Izleti', en: 'Excursions' },
    'riviera.cat_shops': { hr: 'Trgovine', en: 'Shops' },
    'riviera.cat_restaurants': { hr: 'Restorani', en: 'Restaurants' },
    'riviera.coming_soon': { hr: 'Naše preporuke uskoro stižu ovdje.', en: 'Our recommendations are coming here soon.' },

    'mimice.eyebrow': { hr: 'Upoznajte Mimice', en: 'Discover Mimice' },
    'mimice.title': { hr: 'Dobrodošli u Mimice', en: 'Welcome to Mimice' },
    'mimice.intro': { hr: 'Mimice su malo, autentično mjesto na dalmatinskoj obali — dom dviju najljepših plaža na ovom dijelu obale, Kutleše i Jute, s kristalno čistim tirkiznim morem i šljunčanim žalom uokvirenim borovom šumom. Prošećite do starog dijela sela, gdje se uske kamene uličice vijugaju između tradicionalnih kamenih kuća, za opušteniji tempo života tik uz more.', en: 'Mimice is a small, authentic village on the Dalmatian coast — home to two of the most beautiful beaches on this stretch of coastline, Kutleša and Juto, with crystal-clear turquoise water and pebble shores framed by pine forest. Wander up into the old village core, where narrow stone streets wind between traditional stone houses, for a slower pace of life just steps from the sea.' },
    'mimice.dist_omis': { hr: 'od Omiša', en: 'from Omiš' },
    'mimice.dist_split': { hr: 'od Splita', en: 'from Split' },
    'mimice.dist_makarska': { hr: 'od Makarske', en: 'from Makarska' },
    'mimice.gallery.1': { hr: 'Obala Mimica', en: 'Mimice Coastline' },
    'mimice.gallery.2': { hr: 'Uličica starog sela', en: 'Old Village Alley' },
    'mimice.gallery.3': { hr: 'Seoska luka', en: 'Village Harbour' },
    'mimice.gallery.4': { hr: 'Pogled na staro selo', en: 'View Over the Old Village' },
    'mimice.gallery.5': { hr: 'Mimice iz zraka', en: 'Mimice from Above' },
    'mimice.gallery.6': { hr: 'Uz plažu', en: 'Along the Beach' },
    'mimice.gallery.7': { hr: 'Ljetni dani na plaži', en: 'Summer Days at the Beach' },
    'mimice.gallery.8': { hr: 'Kristalno čisto more', en: 'Crystal-Clear Water' },
    'mimice.gallery.9': { hr: 'Mirna uvala', en: 'A Quiet Cove' },
    'mimice.gallery.10': { hr: 'Skriveni kutak obale', en: 'Hidden Corner of the Coast' },
    'mimice.gallery.11': { hr: 'Zalazak sunca uz more', en: 'Sunset by the Sea' },
    'mimice.gallery.12': { hr: 'Večer na Jadranu', en: 'Evening on the Adriatic' },
    'mimice.gallery.13': { hr: 'Mimice u sumrak', en: 'Mimice at Dusk' },
    'mimice.gallery.14': { hr: 'Mimice noću', en: 'Mimice by Night' },

    // --- Footer ---
    'footer.address': { hr: 'Prilaz Moru 6, 21318 Mimice, Hrvatska', en: 'Prilaz Moru 6, 21318 Mimice, Croatia' },
    'footer.rights': { hr: 'Sva prava pridržana.', en: 'All rights reserved.' },

    // --- Istok page ---
    'istok.breadcrumb': { hr: 'Početna', en: 'Home' },
    'istok.tagline': { hr: '80 m² udobnog prostora u srcu Mimica, na koracima od plaže.', en: '80 m² of comfortable space in the heart of Mimice, steps from the beach.' },
    'istok.gallery.living': { hr: 'Dnevni boravak', en: 'Living room' },
    'istok.gallery.bedroom1': { hr: 'Spavaća soba 1', en: 'Bedroom 1' },
    'istok.gallery.bedroom2': { hr: 'Spavaća soba 2', en: 'Bedroom 2' },
    'istok.gallery.kitchen': { hr: 'Kuhinja', en: 'Kitchen' },
    'istok.gallery.balcony': { hr: 'Balkon', en: 'Balcony' },
    'istok.gallery.bathroom1': { hr: 'Kupaonica 1', en: 'Bathroom 1' },
    'istok.gallery.bathroom2': { hr: 'Kupaonica 2', en: 'Bathroom 2' },
    'istok.gallery.exterior': { hr: 'Vanjski prostor', en: 'Outdoor area' },
    'istok.about_title': { hr: 'Prostran i moderan, u srcu Mimica', en: 'Spacious and Modern, in the Heart of Mimice' },
    'istok.sleeps': { hr: '4 gosta · 2 spavaće sobe · 2 kupaonice', en: '4 guests · 2 bedrooms · 2 bathrooms' },
    'istok.desc_p1': { hr: 'Smješten u srcu Mimica, samo 2-3 minute hoda od plaže, kafića i restorana, apartman se nalazi na drugom katu obiteljske kuće i nudi 80 m² udobnog i lijepo uređenog prostora — dvije udobne spavaće sobe, dvije moderne kupaonice, potpuno opremljenu kuhinju (hladnjak sa zamrzivačem, štednjak, pećnica, posuđe i pribor) i prostran dnevni boravak idealan za zajedničko opuštanje.', en: 'Located in the heart of Mimice, just a 2–3 minute walk from the beach, cafés, and restaurants, the apartment sits on the second floor of a family house and offers 80 m² of comfortable, well-designed living space — two cozy bedrooms, two modern bathrooms, a fully equipped kitchen (fridge with freezer, stove, oven, cookware, and utensils), and a spacious living area ideal for relaxing together.' },
    'istok.desc_p2': { hr: 'Uživajte na prekrasnom balkonu s fantastičnim pogledom, uz lagan hod do plaže — savršeno mjesto za usporavanje, opuštanje i bijeg od svakodnevnih obaveza. Nalazi se tik uz Stan, dijeleći isti miran vrt i jednostavno parkiranje — idealno za zajedničku rezervaciju oba apartmana za veće grupe.', en: 'Enjoy a beautiful balcony with a truly stunning view, and an easy walk to the beach — the perfect place to slow down, feel good, and leave everyday worries behind. Sits just steps from Stan, sharing the same peaceful garden and easy parking — ideal for booking both units together for larger group getaways.' },
    'istok.amenities_heading': { hr: 'Sadržaji', en: 'Amenities' },

    'istok.cat.scenic': { hr: 'Pogled', en: 'Scenic Views' },
    'istok.cat.scenic.1': { hr: 'Pogled na planinu', en: 'Mountain view' },
    'istok.cat.scenic.2': { hr: 'Pogled na more', en: 'Sea view' },

    'istok.cat.kitchen': { hr: 'Kuhinja i blagovanje', en: 'Kitchen & Dining' },
    'istok.cat.kitchen.1': { hr: 'Potpuno opremljena kuhinja', en: 'Fully equipped kitchen' },
    'istok.cat.kitchen.2': { hr: 'Hladnjak i zamrzivač', en: 'Refrigerator & freezer' },
    'istok.cat.kitchen.3': { hr: 'Mikrovalna pećnica', en: 'Microwave' },
    'istok.cat.kitchen.4': { hr: 'Osnovni pribor za kuhanje (lonci, tave, ulje, sol i papar)', en: 'Cooking basics (pots, pans, oil, salt & pepper)' },
    'istok.cat.kitchen.5': { hr: 'Posuđe i pribor za jelo', en: 'Dishes & silverware' },
    'istok.cat.kitchen.6': { hr: 'Perilica posuđa', en: 'Dishwasher' },
    'istok.cat.kitchen.7': { hr: 'Električni štednjak', en: 'Electric stove' },
    'istok.cat.kitchen.8': { hr: 'Pećnica', en: 'Oven' },
    'istok.cat.kitchen.9': { hr: 'Kuhalo za vodu', en: 'Hot water kettle' },
    'istok.cat.kitchen.10': { hr: 'Aparat za kavu (pour-over)', en: 'Coffee maker (pour-over)' },
    'istok.cat.kitchen.11': { hr: 'Čaše za vino', en: 'Wine glasses' },
    'istok.cat.kitchen.12': { hr: 'Toster', en: 'Toaster' },
    'istok.cat.kitchen.13': { hr: 'Blender', en: 'Blender' },
    'istok.cat.kitchen.14': { hr: 'Stol za blagovanje', en: 'Dining table' },
    'istok.cat.kitchen.15': { hr: 'Kava', en: 'Coffee' },

    'istok.cat.bathroom': { hr: 'Kupaonica', en: 'Bathroom' },
    'istok.cat.bathroom.1': { hr: 'Fen za kosu', en: 'Hair dryer' },
    'istok.cat.bathroom.2': { hr: 'Sredstva za čišćenje', en: 'Cleaning products' },
    'istok.cat.bathroom.3': { hr: 'Šampon', en: 'Shampoo' },
    'istok.cat.bathroom.4': { hr: 'Topla voda', en: 'Hot water' },

    'istok.cat.bedroom': { hr: 'Spavaća soba i rublje', en: 'Bedroom & Laundry' },
    'istok.cat.bedroom.1': { hr: 'Besplatna perilica rublja (u zgradi)', en: 'Free washer (in building)' },
    'istok.cat.bedroom.2': { hr: 'Ručnici, posteljina, sapun i toaletni papir', en: 'Towels, bed sheets, soap & toilet paper' },
    'istok.cat.bedroom.3': { hr: 'Vješalice', en: 'Hangers' },
    'istok.cat.bedroom.4': { hr: 'Pamučna posteljina', en: 'Cotton bed linens' },
    'istok.cat.bedroom.5': { hr: 'Dodatni jastuci i deke', en: 'Extra pillows & blankets' },
    'istok.cat.bedroom.6': { hr: 'Glačalo', en: 'Iron' },
    'istok.cat.bedroom.7': { hr: 'Sušilo za odjeću (stalak)', en: 'Drying rack for clothing' },

    'istok.cat.entertainment': { hr: 'Zabava', en: 'Entertainment' },
    'istok.cat.entertainment.1': { hr: 'HDTV', en: 'HDTV' },

    'istok.cat.climate': { hr: 'Grijanje i hlađenje', en: 'Heating & Cooling' },
    'istok.cat.climate.1': { hr: 'Centralna klimatizacija', en: 'Central air conditioning' },
    'istok.cat.climate.2': { hr: 'Prozorska klima jedinica', en: 'Window AC unit' },
    'istok.cat.climate.3': { hr: 'Grijanje', en: 'Heating' },

    'istok.cat.internet': { hr: 'Internet i radni prostor', en: 'Internet & Office' },
    'istok.cat.internet.1': { hr: 'Wi-Fi', en: 'Wi-Fi' },
    'istok.cat.internet.2': { hr: 'Prostor za rad', en: 'Dedicated workspace' },

    'istok.cat.outdoor': { hr: 'Vanjski prostor', en: 'Outdoor' },
    'istok.cat.outdoor.1': { hr: 'Privatna terasa ili balkon', en: 'Private patio or balcony' },
    'istok.cat.outdoor.2': { hr: 'Vanjski namještaj', en: 'Outdoor furniture' },

    'istok.cat.location': { hr: 'Lokacija', en: 'Location' },
    'istok.cat.location.1': { hr: 'Pristup plaži', en: 'Beach access' },
    'istok.cat.location.2': { hr: 'Zaseban ulaz', en: 'Private entrance' },

    'istok.cat.parking': { hr: 'Parking', en: 'Parking' },
    'istok.cat.parking.1': { hr: 'Besplatan parking na posjedu', en: 'Free parking on premises' },

    'istok.cat.services': { hr: 'Usluge', en: 'Services' },
    'istok.cat.services.1': { hr: 'Dopušteno ostavljanje prtljage', en: 'Luggage drop-off allowed' },
    'istok.cat.services.2': { hr: 'Dopušten dugotrajni boravak (28+ noćenja)', en: 'Long-term stays allowed (28+ nights)' },
    'istok.cat.services.3': { hr: 'Samostalni check-in', en: 'Self check-in' },
    'istok.cat.services.4': { hr: 'Osoblje dostupno 24 sata', en: 'Staff available 24 hours' },

    'istok.not_included_heading': { hr: 'Nije uključeno', en: 'Not Included' },
    'istok.not_included.1': { hr: 'Sušilica za rublje', en: 'Dryer' },
    'istok.not_included.2': { hr: 'Detektor dima', en: 'Smoke alarm' },
    'istok.not_included.3': { hr: 'Detektor ugljičnog monoksida', en: 'Carbon monoxide alarm' },
    'istok.pricing_title': { hr: 'Cijene', en: 'Pricing' },
    'istok.pricing_desc': { hr: 'Cijene ovise o sezoni i duljini boravka. Odaberite datume dolaska i odlaska da vidite točnu cijenu i dostupnost.', en: 'Rates vary by season and length of stay. Select your check-in and check-out dates to see the exact price and availability.' },
    'istok.pricing_cta': { hr: 'Kontaktirajte za cijene', en: 'Contact for Rates' },
    'istok.pricing_note': { hr: 'Bez naknada za rezervaciju — rezervirajte izravno kod naše obitelji.', en: 'No booking fees — reserve directly with our family.' },

    // --- Stan page ---
    'stan.breadcrumb': { hr: 'Početna', en: 'Home' },
    'stan.tagline': { hr: 'Panoramski pogled na more i prostrana terasa.', en: 'Panoramic sea views and a spacious terrace.' },
    'stan.gallery.living': { hr: 'Dnevni boravak', en: 'Living room' },
    'stan.gallery.bedroom1': { hr: 'Spavaća soba 1', en: 'Bedroom 1' },
    'stan.gallery.bedroom2': { hr: 'Spavaća soba 2', en: 'Bedroom 2' },
    'stan.gallery.kitchen': { hr: 'Kuhinja', en: 'Kitchen' },
    'stan.gallery.terrace': { hr: 'Terasa', en: 'Terrace' },
    'stan.gallery.bathroom1': { hr: 'Kupaonica 1', en: 'Bathroom 1' },
    'stan.gallery.bathroom2': { hr: 'Kupaonica 2', en: 'Bathroom 2' },
    'stan.gallery.exterior': { hr: 'Vanjski prostor', en: 'Outdoor area' },
    'stan.about_title': { hr: 'Prostor, tišina i pogled koji pamtite', en: "Space, Quiet, and a View You'll Remember" },
    'stan.sleeps': { hr: '4 gosta · 2 spavaće sobe · 2 kupaonice', en: '4 guests · 2 bedrooms · 2 bathrooms' },
    'stan.desc_p1': { hr: 'Smješten na drugom katu obiteljske kuće, prostrani stan od 90 m² nudi udobnost, privatnost i nezaboravan pogled. Velika terasa okrenuta jugozapadu (oko 50 m²), opremljena stolom za blagovanje i sjedećom garniturom za odmor, savršena je za objedovanje na otvorenom i uživanje u dalmatinskom suncu.', en: 'Set on the second floor of a family house, this spacious 90 m² apartment offers comfort, privacy, and unforgettable views. The large southwest-facing terrace (about 50 m²), furnished with a dining table and lounge seating, is perfect for outdoor dining, relaxing, and soaking up the Dalmatian sun.' },
    'stan.desc_p2': { hr: 'Stan ima dvije spavaće sobe — jednu s bračnim krevetom, dodatnim krevetom, privatnom kupaonicom i izlazom na terasu, te drugu okrenutu borovima za mirne i hladne noći — dvije kupaonice, potpuno opremljenu kuhinju i svijetli otvoreni dnevni boravak s pogledom na Jadransko more, otoke Brač i Hvar, poluotok Pelješac i planinu Biokovo. Nalazi se u mirnom području ispod glavne ceste, samo 170 metara od mora.', en: 'The apartment has two bedrooms — one with a double bed, an extra bed, a private bathroom, and terrace access, and another facing the pine trees for quiet, cool nights — two bathrooms, a fully equipped kitchen, and a bright, open living room looking out over the Adriatic Sea, the islands of Brač and Hvar, the Pelješac peninsula, and Mount Biokovo. Set in a peaceful area below the main road, just 170 meters from the sea.' },
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
    'stan.cat.location.2': { hr: 'Mirno područje ispod glavne ceste', en: 'Peaceful area below the main road' },

    'stan.cat.other': { hr: 'Ostalo', en: 'Other' },
    'stan.cat.other.1': { hr: 'Besplatan parking u sklopu objekta', en: 'Free parking on premises' },
    'stan.cat.other.2': { hr: 'Moguće ostaviti prtljagu', en: 'Luggage drop-off allowed' },
    'stan.cat.other.3': { hr: 'Boravak 28+ dana moguć', en: 'Long-term stays allowed (28+ nights)' },
    'stan.cat.other.4': { hr: 'Samostalni dolazak (self check-in)', en: 'Self check-in' },
    'stan.cat.other.5': { hr: 'Osoblje dostupno 0-24', en: 'Staff available 24 hours' },

    // --- Stan: availability & pricing ---
    'calendar.avail.cta': { hr: 'Provjeri dostupnost', en: 'Check Availability' },
    'calendar.avail.eyebrow': { hr: 'Rezervacija', en: 'Booking' },
    'calendar.avail.title': { hr: 'Dostupnost i cijene', en: 'Availability & Pricing' },
    'calendar.avail.subtitle': { hr: 'Odaberite datume dolaska i odlaska da vidite cijenu i dostupnost.', en: 'Select your check-in and check-out dates to see pricing and availability.' },
    'calendar.avail.legend_available': { hr: 'Dostupno', en: 'Available' },
    'calendar.avail.legend_unavailable': { hr: 'Zauzeto', en: 'Unavailable' },
    'calendar.avail.legend_selected': { hr: 'Odabrano', en: 'Selected' },
    'calendar.avail.prev': { hr: 'Prethodni mjesec', en: 'Previous month' },
    'calendar.avail.next': { hr: 'Sljedeći mjesec', en: 'Next month' },
    'calendar.avail.prompt_checkin': { hr: 'Odaberite datum dolaska', en: 'Select a check-in date' },
    'calendar.avail.prompt_checkout': { hr: 'Odaberite datum odlaska', en: 'Select a check-out date' },
    'calendar.avail.nights': { hr: 'noćenja', en: 'nights' },
    'calendar.avail.price_per_night': { hr: 'Cijena po noći', en: 'Price per night' },
    'calendar.avail.total': { hr: 'Ukupno', en: 'Total' },
    'calendar.avail.clear': { hr: 'Poništi odabir', en: 'Clear selection' },
    'calendar.avail.unavailable_msg': { hr: 'Odabrani termin nije dostupan. Molimo odaberite druge datume.', en: 'Selected dates are not available. Please choose different dates.' },
    'calendar.avail.updated': { hr: 'Kalendar se automatski ažurira s Airbnb-a. Zadnje ažuriranje:', en: 'Calendar syncs automatically from Airbnb. Last updated:' },
    'calendar.avail.note': { hr: 'Cijene su okvirne; konačna cijena potvrđuje se prilikom rezervacije.', en: 'Prices are indicative; final price is confirmed at booking.' },
    'calendar.avail.min_nights_msg': { hr: 'Za odabrani period minimalni boravak je {min} noćenja. Molimo odaberite dulji period.', en: 'For the selected period, the minimum stay is {min} nights. Please choose a longer period.' },

    'calendar.avail.inquiry_title': { hr: 'Pošaljite upit za odabrane datume', en: 'Send an Inquiry for These Dates' },
    'calendar.avail.form_adults': { hr: 'Broj odraslih', en: 'Number of adults' },
    'calendar.avail.form_children': { hr: 'Broj djece', en: 'Number of children' },
    'calendar.avail.form_phone': { hr: 'Telefon', en: 'Phone' },
    'calendar.avail.form_phone_ph': { hr: 'Vaš broj telefona', en: 'Your phone number' },
    'calendar.avail.form_message_ph': { hr: 'Napomene, posebni zahtjevi...', en: 'Notes, special requests...' },
    'calendar.avail.form_error': { hr: 'Molimo unesite ime, email i telefon.', en: 'Please fill in your name, email, and phone.' },
    'calendar.avail.email_subject': { hr: 'Upit za {unit} – {checkin} do {checkout}', en: 'Inquiry for {unit} – {checkin} to {checkout}' },
    'calendar.avail.email_label_name': { hr: 'Ime i prezime', en: 'Full name' },
    'calendar.avail.email_label_email': { hr: 'Email', en: 'Email' },
    'calendar.avail.email_label_phone': { hr: 'Telefon', en: 'Phone' },
    'calendar.avail.email_label_checkin': { hr: 'Datum dolaska', en: 'Check-in date' },
    'calendar.avail.email_label_checkout': { hr: 'Datum odlaska', en: 'Check-out date' },
    'calendar.avail.email_label_nights': { hr: 'Broj noćenja', en: 'Number of nights' },
    'calendar.avail.email_label_adults': { hr: 'Broj odraslih', en: 'Number of adults' },
    'calendar.avail.email_label_children': { hr: 'Broj djece', en: 'Number of children' },
    'calendar.avail.email_label_total': { hr: 'Ukupna cijena', en: 'Total price' },
    'calendar.avail.email_label_message': { hr: 'Poruka', en: 'Message' },

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
