# Rin Reaksmey — Web Developer Portfolio

A responsive, dark-theme personal portfolio built with **HTML5, CSS3 and vanilla JavaScript** (no frameworks, no build step).

## Folder structure

```
web-developer-portfolio/
├── index.html                  # Page structure (all sections)
├── css/
│   └── style.css               # All styles, theme variables at the top
├── js/
│   ├── data.js                 # ← YOUR CONTENT: skills, projects, education, links…
│   └── script.js               # Rendering + interactions (typing, filters, form…)
├── assets/
│   ├── images/
│   │   ├── profile.jpg         # Your photo
│   │   └── projects/           # Project thumbnails (SVG placeholders → replace with screenshots)
│   ├── icons/
│   │   └── favicon.svg
│   └── documents/
│       └── cv.pdf              # Your CV (used by "Download CV")
└── README.md
```

## Features

Sticky navbar with active-section highlighting · mobile hamburger menu · typing animation · scroll-reveal animations · animated skill bars and counters · project filtering · education & experience timelines · contact form with validation · Download CV · back-to-top button · page loader · SEO meta tags · keyboard-accessible and `prefers-reduced-motion` friendly.

## Run it locally (VS Code Live Server)

1. Unzip the folder and open it in **VS Code** (`File → Open Folder…`).
2. Install the **Live Server** extension (by Ritwick Dey) from the Extensions panel.
3. Right-click `index.html` → **Open with Live Server**.
4. The site opens at `http://127.0.0.1:5500`. It reloads automatically whenever you save a file.

> You can also just double-click `index.html`, but Live Server is recommended so everything behaves like a real website.

## Customize your information

Almost everything is in **`js/data.js`**. Search for `TODO` to find things you still need to fill in:

| What | Where |
|---|---|
| Name, email, phone, location, CV file | `profile` in `js/data.js` |
| LinkedIn, Facebook, Telegram links | `socials` in `js/data.js` (empty URL = hidden) |
| Skills and their levels (0–100) | `skills` in `js/data.js` |
| Services | `services` in `js/data.js` |
| Education / Experience | `education`, `experience` in `js/data.js` |
| Hero text and About Me paragraphs | `index.html` (sections `#home` and `#about`) |
| Colors / fonts | variables at the top of `css/style.css` (`--purple`, `--blue`, `--cyan`…) |
| Photo | replace `assets/images/profile.jpg` (square image works best) |
| CV | replace `assets/documents/cv.pdf` |

**Still to fill in:** LinkedIn URL, Facebook URL, study years (e.g. `2023 — 2027`), live demo / GitHub links for projects once they're public.

## Add, edit or remove a project

Open `js/data.js` and find `projects: [ … ]`.

- **Add:** copy one project object, paste it, and change the values:

```js
{
  title: "My New Project",
  category: "fullstack",           // "fullstack", "laravel" or "mobile"
  status: "Completed",
  image: "assets/images/projects/my-new-project.png",
  description: "One or two sentences about what it does.",
  tech: ["Laravel", "MySQL", "Bootstrap 5"],
  demo: "https://my-project.netlify.app",   // or "" if not deployed
  github: "https://github.com/meymeyIT/my-project", // or "" if private
},
```

- **Edit:** change the values. **Remove:** delete the whole `{ … },` block.
- **Screenshot:** save a 16:10 image (e.g. 1280×800, compressed `.webp`/`.jpg` under ~200 KB) in `assets/images/projects/`.
- **New filter category:** add `{ key: "api", label: "APIs" }` to `projectFilters` and use `category: "api"`.

Empty `demo` / `github` links show a disabled **"Demo soon" / "Private repo"** button. The site never shows a fake link.

## Enable real email delivery (EmailJS)

Without setup, the form validates input and then opens the visitor's own email app with the message pre-filled (it says so honestly). To have messages go straight to your inbox:

1. Create a free account at [emailjs.com](https://www.emailjs.com/).
2. **Email Services → Add Service** → Gmail → connect `rreaksmey236@gmail.com`. Copy the **Service ID**.
3. **Email Templates → Create** with these variables: `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, `{{message}}`. Set *Reply To* to `{{reply_to}}`. Copy the **Template ID**.
4. **Account → General** → copy your **Public Key**.
5. Paste the three values into `emailjs` at the bottom of `js/data.js`. Done. The form now shows a loading spinner and real success/error messages.

## Publish online

### Option A: GitHub Pages (free, `https://meymeyit.github.io/…`)
1. Create a new repository on GitHub, e.g. `portfolio` (or `meymeyIT.github.io` for the root URL).
2. Upload the files (or use Git):
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/meymeyIT/portfolio.git
   git push -u origin main
   ```
3. Repo **Settings → Pages** → *Source: Deploy from a branch* → `main` / `root` → **Save**.
4. After about a minute, your site is live at `https://meymeyit.github.io/portfolio/`.

### Option B: Netlify (drag & drop)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the whole `web-developer-portfolio` folder onto the page.
3. You get a live URL right away. Rename it under **Site configuration → Change site name** (e.g. `rin-reaksmey.netlify.app`).

After publishing, put the URL on your CV, LinkedIn and GitHub profile.

## Notes

- Icons (Font Awesome) are bundled in `assets/vendor/` so they work offline; fonts (Poppins, JetBrains Mono) load from Google Fonts.
- Tested at 1440px desktop and 390px mobile with no layout overflow and no JavaScript errors.
