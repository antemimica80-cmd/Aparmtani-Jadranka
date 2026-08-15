# Images

- `stan-cover.jpg` / `istok-cover.jpg` — real cover photos, already wired in: the homepage unit
  cards (`css/style.css` → `.unit-card-photo` / `.unit-card-photo.istok`) and each unit page's
  featured gallery tile (first `.gallery-item` in `pages/stan.html` / `pages/istok.html`).

Drop more real photos in this folder, then swap the remaining placeholder gradients for them:

- **Hero photo** (homepage): in `css/style.css`, find `.hero` and replace the placeholder comment with
  `background: url('../images/hero.jpg') center/cover no-repeat;`
- **More gallery photos** (Stan/Istok pages): add an inline style on the remaining
  `<div class="gallery-item">` tiles in `pages/stan.html` / `pages/istok.html`:
  `style="background: url('../images/stan-1.jpg') center/cover no-repeat;"`

Suggested naming: `hero.jpg`, `stan-1.jpg`...`stan-4.jpg`, `istok-1.jpg`...`istok-4.jpg`.
