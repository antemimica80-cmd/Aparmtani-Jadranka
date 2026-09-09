# Images

Photos already wired in:

- `stan-cover.jpg` / `istok-cover.jpg` — the homepage unit cards (`css/style.css` →
  `.unit-card-photo` / `.unit-card-photo.istok`) and each unit page's featured gallery tile
  (first `.gallery-item` in `pages/stan.html` / `pages/istok.html`).
- `mimice-hero.jpg` — the homepage hero photo (`index.html` → `.hero-photo`, styled in
  `css/style.css`). To swap it for a different photo, just replace the file (keep the same
  name) or edit the `background-image` inline style on `.hero-photo` in `index.html`.

Drop more real photos in this folder, then swap the remaining placeholder gradients for them:

- **More gallery photos** (Stan/Istok pages): each unit page's gallery has 1 cover tile +
  8 more (2 photos each for living room, bedroom, kitchen, bathroom). Add an inline style on
  the matching `<div class="gallery-item">` tile in `pages/stan.html` / `pages/istok.html`:
  `style="background: url('../images/stan-living-1.jpg') center/cover no-repeat;"`

Suggested naming: `stan-living-1.jpg`, `stan-living-2.jpg`, `stan-bedroom-1.jpg`,
`stan-bedroom-2.jpg`, `stan-kitchen-1.jpg`, `stan-kitchen-2.jpg`, `stan-bathroom-1.jpg`,
`stan-bathroom-2.jpg` (same pattern with `istok-` for the Istok page).
