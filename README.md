# Funding Landing Page

Adaptive investor-deck landing page for **1DES**, an AI-driven trading platform.  
The site is a single-page experience that uses scroll-snapping “slides” to walk investors through the story: problem, product, traction, roadmap, team, and funding ask.

## Highlights
- Tailwind (CDN) + custom CSS tokens for the neon/teal visual identity, background imagery, and card system.
- Sticky top bar and fly-out “Deck Sections” drawer for quick navigation, plus keyboard + pager controls for the snap-scrolling slides.
- Progressive reveal animations via `IntersectionObserver`, with reduced-motion and hash-offset fallbacks for accessibility.
- Mobile-specific banner that nudges visitors toward viewing on desktop but gracefully dismisses with sessionStorage.
- Vanilla JS only (`scripts.js` ≈ 100 LOC) so the page is deployable on any static host with no build tooling.

## Quick Start
1. Clone/download this repo.
2. Open `index.html` in any modern browser (double-click or serve via an editor plugin such as VS Code “Live Server”) to preview the deck.
3. Edit the headline/content directly in `index.html`, adjust visuals in `styles.css`, and tweak interactivity inside `scripts.js`.

## Project Structure
```
index.html     # Slide markup + Tailwind config inline
styles.css     # Design tokens, slide layout, cards, buttons, pager, drawer
scripts.js     # Drawer, pager, keyboard nav, reveals, mobile banner, hash offset
1-bg.jpg ...   # Background hero images mapped via data-bg attribute
```

## Customization Tips
- Replace `1-bg.jpg`–`4-bg.jpg` with your imagery and keep the same filenames or update the selectors in `styles.css`.
- Update the WhatsApp CTA URL, contact info, or add live-demo links inside the cover section of `index.html`.
- Tailwind is injected from the CDN—extend the theme in the inline `tailwind.config` block if you need more tokens.

## Deployment
Because it’s static HTML/CSS/JS, you can host it anywhere (GitHub Pages, Netlify, Vercel, static S3 bucket, etc.).  
Upload the root folder, ensure the four background images are included, and point your domain or subdomain to the host.
