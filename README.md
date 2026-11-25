# Bincom assessment portfolio

A single-page portfolio for Njeze Peter Nnabuike, prepared for the Bincom Dev Center Mobile App Trainee recruitment assessment.

## Run locally

Open `index.html` in a browser. The site uses plain HTML, CSS, and JavaScript, with no install or build step. To test the CV download over HTTP, run `python -m http.server 8000` from this folder if you have Python, then open `http://localhost:8000`. Browsers can handle downloads differently when opening the page directly as a local file.

## Files and behavior

| Path | Purpose |
| --- | --- |
| `index.html` | Page sections, project and social links, résumé download, and gallery dialog |
| `css/style.css` | Theme variables, mobile-first Grid and Flexbox layouts, focus styles, and smooth scrolling |
| `js/script.js` | Menu toggle and dismissal, scroll-based active navigation, gallery controls, and copyright year |
| `assets/images/` | Existing portrait, project screenshots, and five supplied gallery photos optimized as WebP |
| `assets/documents/` | The original one-page résumé PDF copied from the reference portfolio |

The gallery uses a native dialog. Open a photo with Enter or a click, move through the photos with Left and Right or the Previous and Next buttons, and close it with Escape or Close. With JavaScript disabled, gallery links open the image files directly. The email button opens the visitor's configured mail app.

## Replace gallery photos

Copy each replacement into `assets/images/`. Find the corresponding gallery item in `index.html` and update both its link `href` and image `src`. Update the image's `alt`, `width`, and `height` to describe and match the new photo. The lightbox uses that same image and description automatically.

The site includes all five supplied photos. They are solo portraits, so confirm that the set includes both you and your friends, or swap in a photo with friends if needed before submission.

## Deploy to Vercel

1. Push this folder to its own Git repository, or include it as a subfolder in an assessment repository.
2. In Vercel, create a new project and import the repository.
3. Set the Root Directory to `bincom-portfolio` if the repository contains this folder. If the repository opens directly to `index.html`, use its root.
4. Choose the **Other** framework preset. Leave the Build Command blank and use the default Output Directory. No environment variables are required.
5. Deploy and check the public URL, the CV download, and both project links before submitting.

See the [Vercel build configuration guide](https://vercel.com/docs/builds/configure-a-build).
