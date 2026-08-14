# Images

Drop your real photos in this folder, then swap the placeholder gradients for them:

- **Hero photo** (homepage): in `css/style.css`, find `.hero` and replace the placeholder comment with
  `background: url('../images/hero.jpg') center/cover no-repeat;`
- **Unit card covers** (homepage overview): in `css/style.css`, find `.unit-card-photo` and `.unit-card-photo.istok`.
- **Gallery photos** (Stan/Istok pages): in `css/style.css`, find `.gallery-item` and its `:nth-child(...)` rules,
  or simplest — add an inline style on each `<div class="gallery-item">` in `pages/stan.html` / `pages/istok.html`:
  `style="background: url('../images/stan-1.jpg') center/cover no-repeat;"`

Suggested naming: `hero.jpg`, `stan-cover.jpg`, `stan-1.jpg`...`stan-5.jpg`, `istok-cover.jpg`, `istok-1.jpg`...`istok-5.jpg`.
