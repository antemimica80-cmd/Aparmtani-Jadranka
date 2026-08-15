# Images

Photos already wired in:

- `stan-cover.jpg` / `istok-cover.jpg` — the homepage unit cards (`css/style.css` →
  `.unit-card-photo` / `.unit-card-photo.istok`) and each unit page's featured gallery tile
  (first `.gallery-item` in `pages/stan.html` / `pages/istok.html`).
- `mimice-hero.jpg` — the homepage hero photo (`index.html` → `.hero-photo`, styled in
  `css/style.css`). To swap it for a different photo, just replace the file (keep the same
  name) or edit the `background-image` inline style on `.hero-photo` in `index.html`.

Drop more real photos in this folder, then swap the remaining placeholder gradients for them:

- **More gallery photos** (Stan/Istok pages): add an inline style on the remaining
  `<div class="gallery-item">` tiles in `pages/stan.html` / `pages/istok.html`:
  `style="background: url('../images/stan-1.jpg') center/cover no-repeat;"`

Suggested naming: `stan-1.jpg`...`stan-4.jpg`, `istok-1.jpg`...`istok-4.jpg`.
