# Images

Photos already wired in:

- `stan-cover.jpg` / `istok-cover.jpg` — the homepage unit cards (`css/style.css` →
  `.unit-card-photo` / `.unit-card-photo.istok`) and each unit page's featured gallery tile
  (first `.gallery-item` in `pages/stan.html` / `pages/istok.html`).
- `mimice-hero.jpg` — the homepage hero photo (`index.html` → `.hero-photo`, styled in
  `css/style.css`). To swap it for a different photo, just replace the file (keep the same
  name) or edit the `background-image` inline style on `.hero-photo` in `index.html`.

Drop more real photos in this folder, then swap the remaining placeholder gradients for them:

- **More gallery photos** (Stan/Istok pages): each unit page's gallery has 8 categories,
  2 photos each: terrace (Stan) / balcony (Istok), living room, bedroom 1, bedroom 2,
  bathroom 1, bathroom 2, kitchen, and outdoor area (garden/parking/exterior). Add an inline
  style on the matching `<div class="gallery-item">` tile in `pages/stan.html` /
  `pages/istok.html`: `style="background: url('../images/stan-living-1.jpg') center/cover
  no-repeat;"`

Suggested naming per apartment (16 photos total): `stan-terrace-1.jpg`, `stan-terrace-2.jpg`,
`stan-living-1.jpg`, `stan-living-2.jpg`, `stan-bedroom1-1.jpg`, `stan-bedroom1-2.jpg`,
`stan-bedroom2-1.jpg`, `stan-bedroom2-2.jpg`, `stan-bathroom1-1.jpg`, `stan-bathroom1-2.jpg`,
`stan-bathroom2-1.jpg`, `stan-bathroom2-2.jpg`, `stan-kitchen-1.jpg`, `stan-kitchen-2.jpg`,
`stan-exterior-1.jpg`, `stan-exterior-2.jpg` (same pattern with `istok-` and `istok-balcony-*`
instead of `istok-terrace-*` for the Istok page).

## Gallery preview + lightbox (js/gallery.js)

Visitors don't see all 16 tiles at once — `js/gallery.js` reads the full `.gallery-grid`
markup above (the source of truth), hides it, and builds an Airbnb-style compact preview
(1 large + 4 small photos) with a "Show all photos" button that opens a full-screen
lightbox to browse every photo with prev/next arrows, swipe, or the keyboard.

**Which 5 photos show in the compact preview** is controlled by the `gallery-featured`
class on 5 of the `.gallery-item` divs in `pages/stan.html` / `pages/istok.html`. To
change which photos represent the apartment, just move that class to different tiles
(keep exactly 5). Everything else — the other 11 photos — is still reachable once a
visitor clicks "Show all photos".
