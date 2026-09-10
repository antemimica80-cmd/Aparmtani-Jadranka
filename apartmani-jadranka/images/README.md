# Images

Photos already wired in:

- `stan-cover.jpg` / `istok-cover.jpg` — the homepage unit cards (`css/style.css` →
  `.unit-card-photo` / `.unit-card-photo.istok`) and each unit page's featured gallery tile
  (first `.gallery-item` in `pages/stan.html` / `pages/istok.html`).
- `mimice-hero.jpg` — the homepage hero photo (`index.html` → `.hero-photo`, styled in
  `css/style.css`). To swap it for a different photo, just replace the file (keep the same
  name) or edit the `background-image` inline style on `.hero-photo` in `index.html`.

Istok's full 16-photo gallery is wired in (`istok-cover.jpg`, `istok-balcony-2.jpg`,
`istok-living-1/2.jpg`, `istok-bedroom1-1/2.jpg`, `istok-bedroom2-1/2.jpg`,
`istok-bathroom1-1/2.jpg`, `istok-bathroom2-1/2.jpg`, `istok-kitchen-1/2.jpg`,
`istok-exterior-1/2.jpg`), all resized/compressed from the owner's photoshoot (max 1800px,
~76% JPEG quality — keeps the gallery under ~3 MB total instead of the ~19 MB originals).

Stan's gallery still needs its remaining photos — drop them in this folder using the same
naming pattern (`stan-` instead of `istok-`, `stan-terrace-*` instead of `stan-balcony-*`)
and add an inline style on the matching `<div class="gallery-item">` tile in
`pages/stan.html`: `style="background: url('../images/stan-living-1.jpg') center/cover
no-repeat;"`. Resize new photos the same way before adding them (Pillow: resize so the
longest side is ~1800px, save as JPEG quality ~76) so the page doesn't ship multi-MB images.

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
