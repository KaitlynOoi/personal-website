# personal-website

Kaitlyn Ooi's personal site — merges the old `dev-portfolio` and `film-portfolio`
repos into one, with a shared landing page and a blog. Plain HTML/CSS, no build
step, deploys straight to GitHub Pages.

Four sections: **Home**, **Engineering**, **Film**, **Blog**.

## Structure

```
index.html              landing page (about / hobbies / links to the 3 sections)
engineering/             engineering portfolio — one page, two grouped sections
  index.html               "Embedded Systems" + "Software Engineering" projects
film/                     film portfolio
  index.html
  assets/                 photos, covers, BTS strip
blog/                     essays & notes
  index.html
  posts/
    early-childhood-literacy-and-college-admission.html   first essay (Writ 150)
css/style.css            shared theme (beige palette, nav, footer, buttons, interactions)
js/interactions.js       scroll-reveal, back-to-top, scroll-spy nav highlighting
```

## Adding your own photos to the landing page

`index.html` has two polaroid-style photo frames in `.photo-cluster`. Each one
currently shows a placeholder icon inside a `.frame` div. To swap in a real photo:

1. Drop the image into `assets/photos/` (e.g. `assets/photos/photo-1.jpg`).
2. In `index.html`, replace the `<div class="placeholder-art">...</div>` inside
   the `.frame` you want to fill with:
   ```html
   <img src="assets/photos/photo-1.jpg" alt="...">
   ```

Keep photos reasonably sized (under ~500KB) so the page stays fast.

## Adding an engineering project

Each project is a `<article class="project-card reveal">` inside either the
`#embedded` or `#swe` grid in `engineering/index.html`. Duplicate the closest
existing card, update its title/description/tags/link, and renumber
`.card-number` if you want the count to stay sequential.

## Adding a blog post

1. Duplicate `blog/posts/early-childhood-literacy-and-college-admission.html`,
   rename it, and swap in the new title/byline/body (its `<article>` markup —
   `.post-meta`, `.byline`, `<p>` paragraphs — is the reusable template).
2. Add a row for it at the top of the list in `blog/index.html`:
   ```html
   <a class="post-row reveal" href="posts/your-new-post.html">
     <span class="post-row-main">
       <span class="post-row-title">Your Title</span>
       <span class="post-row-excerpt">One-line teaser.</span>
     </span>
     <span class="post-row-meta">Month Year</span>
   </a>
   ```

## Interactions

`js/interactions.js` is shared across pages and handles, purely progressively
(everything still works with JS off):

- **Scroll reveal** — any element with class `reveal` fades/slides in once it
  enters the viewport.
- **Back-to-top** — a `<button class="to-top">` (see `film/index.html` or the
  blog post) fades in after scrolling and smooth-scrolls back up.
- **Scroll-spy sub-nav** — links with `data-spy-link` (used in the film page's
  in-page nav) get an `.active` state as their matching section scrolls
  through view.

All of it respects `prefers-reduced-motion`.

## Running locally

No build step needed — just serve the folder:

```bash
python3 -m http.server 8000
```

then open `http://localhost:8000`.

## Deploying

Push to `main` and turn on GitHub Pages (Settings → Pages → Deploy from branch → `main` / root).
