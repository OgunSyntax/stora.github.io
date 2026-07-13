# Stora landing page — static site

A plain HTML/CSS/JS landing page. No framework, no server, no build
tooling required to deploy — `index.html` is the finished, ready-to-host
file.

## Structure

```
stora-static/
├── index.html          ← the deployable page (generated — don't hand-edit)
├── css/landing.css      ← all styles
├── js/landing.js        ← video placeholder + nav scroll behavior
├── build.py             ← stitches src/partials/ into index.html
└── src/
    ├── shell.html        ← page skeleton with section markers
    └── partials/         ← one file per section, edit these
        ├── _nav.html
        ├── _hero.html
        ├── _how_it_works.html
        ├── _video.html
        ├── _features.html
        ├── _disclaimer.html
        └── _final_cta_footer.html
```

## Editing a section

1. Open the relevant file in `src/partials/` (e.g. `_hero.html` for the headline/CTA).
2. Make your change.
3. Re-run the build:
   ```bash
   python3 build.py
   ```
4. `index.html` is regenerated. Open it in a browser to check, then deploy.

Do **not** edit `index.html` directly — it gets overwritten every time
`build.py` runs.

## Adding the real setup video

Open `js/landing.js` and set:
```js
const VIDEO_EMBED_URL = 'https://www.youtube.com/embed/YOUR_VIDEO_ID';
```
No rebuild needed for this one — it's plain JS, just save and redeploy.

## Deploying

This is a static site — any of these work with zero configuration:

- **Netlify**: drag the `stora-static` folder onto app.netlify.com/drop, or connect the repo and set the publish directory to the folder containing `index.html`.
- **Vercel**: `vercel` CLI from inside this folder, or import the repo and leave the build command empty (no build step needed — just point it at this folder as the output directory).
- **GitHub Pages**: push this folder to a repo, enable Pages in repo settings, point it at the branch/folder containing `index.html`.

Once deployed, this page can point at `https://stora.qzz.io` (already
wired into the nav, hero, and footer buttons) as the running app.
