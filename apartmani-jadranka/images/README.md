# Images

Photos already wired in:

- `stan-cover.jpg` / `istok-cover.jpg` — the homepage unit cards (`css/style.css` →
  `.unit-card-photo` / `.unit-card-photo.istok`) and each unit page's featured gallery tile
  (first `.gallery-item` in `pages/stan.html` / `pages/istok.html`).
- `mimice-harbor.jpg`, `mimice-coast.jpg`, `mimice-cliffs.jpg`, `mimice-boats.jpg` — the
  homepage hero mosaic (`index.html` → `.hero-mosaic`, styled in `css/style.css`). To swap any
  tile for a different photo, just replace the file (keep the same name) or edit the
  `background-image` inline style on the matching `.hero-mosaic-tile` in `index.html`. To add a
  5th/6th tile, add another `.hero-mosaic-tile` div and a matching `:nth-child(n)` grid rule in
  `css/style.css`.

Drop more real photos in this folder, then swap the remaining placeholder gradients for them:

- **More gallery photos** (Stan/Istok pages): add an inline style on the remaining
  `<div class="gallery-item">` tiles in `pages/stan.html` / `pages/istok.html`:
  `style="background: url('../images/stan-1.jpg') center/cover no-repeat;"`

Suggested naming: `stan-1.jpg`...`stan-4.jpg`, `istok-1.jpg`...`istok-4.jpg`.
