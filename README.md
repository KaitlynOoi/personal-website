# personal-website

Kaitlyn Ooi's personal site — merges the old `dev-portfolio` and `film-portfolio`
repos into one, with a shared landing page and a blog. Plain HTML/CSS, no build
step, deploys straight to GitHub Pages.

## Structure

```
index.html              landing page (about / hobbies / links to the 3 sections)
engineering/             engineering & SWE portfolio
  index.html
  projects.html
film/                     film portfolio
  index.html
  assets/                 photos, covers, BTS strip
blog/                     essays & notes
  index.html
  posts/example-post.html  template for a new post
css/style.css            shared theme (beige palette, nav, footer, buttons)
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

## Adding a blog post

1. Duplicate `blog/posts/example-post.html`, rename it, and write the post.
2. Add a row for it at the top of the list in `blog/index.html`:
   ```html
   <a class="post-row" href="posts/your-new-post.html">
     <span class="post-row-title">Your Title</span>
     <span class="post-row-meta">Month Year</span>
   </a>
   ```

## Running locally

No build step needed — just serve the folder:

```bash
python3 -m http.server 8000
```

then open `http://localhost:8000`.

## Deploying

Push to `main` and turn on GitHub Pages (Settings → Pages → Deploy from branch → `main` / root).
