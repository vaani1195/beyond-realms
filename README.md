# Beyond Realms — website

Static site (HTML + CSS + JS). No build step, no framework. Just open and go.

```
beyond-realms/
├── index.html
├── css/styles.css
├── js/script.js        ← the ONE file you edit to go live (CONFIG block at top)
├── assets/             ← drop hero.jpg / about.jpg here
└── README.md
```

## Run it locally (VS Code)
1. Open the `beyond-realms` folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` → **Open with Live Server**. It opens in your browser and auto-reloads on save.

To publish: upload the whole folder to any static host — Netlify (drag-and-drop the folder), Vercel, GitHub Pages, or your client's existing hosting.

---

## 1. Calendly (scheduling)
1. Create a free account at [calendly.com](https://calendly.com) and make an event type (e.g. "Intro Session").
2. Copy its public link, e.g. `https://calendly.com/beyondrealms/tarot`.
3. Open `js/script.js` and set:
   ```js
   calendlyUrl: "https://calendly.com/beyondrealms/tarot",
   ```
That's it — every "Book via Calendly" / "Book a Session" button now opens the Calendly popup. (The Calendly script + styles are already linked in `index.html`.)

> Want a *different* Calendly event per service? Tell me and I'll wire each "Book Now" button to its own link.

## 2. Stripe (payments) — easiest method: Payment Links
No server or coding needed.
1. In the [Stripe Dashboard](https://dashboard.stripe.com) → **Payments → Payment Links → + New**.
2. Create a product for each service with its price (Tarot £45, Numerology £55, Crystal £35, Bundle £99) and copy each link (looks like `https://buy.stripe.com/xxxx`).
3. Paste them into `js/script.js`:
   ```js
   stripeLinks: {
     tarot:      "https://buy.stripe.com/...",
     numerology: "https://buy.stripe.com/...",
     crystal:    "https://buy.stripe.com/...",
     bundle:     "https://buy.stripe.com/..."
   },
   ```
Use **test mode** keys/links first, then switch to **live** when ready.

### Alternative: Stripe Buy Button (embedded checkout)
If your client prefers the checkout to appear *inside* a card rather than redirecting:
1. Dashboard → **Payment Links → Buy Button**, create one, copy the snippet.
2. Replace a `<button data-pay="...">` with the snippet, e.g.:
   ```html
   <script async src="https://js.stripe.com/v3/buy-button.js"></script>
   <stripe-buy-button buy-button-id="buy_btn_XXXX" publishable-key="pk_live_XXXX"></stripe-buy-button>
   ```
Both methods are PCI-handled by Stripe — card details never touch this site.

> **Note:** your mockup said "Pay via Revolut" but you asked for Stripe, so the buttons say *Pay via Stripe*. To switch to Revolut instead, swap the `data-pay` links for Revolut payment links and rename the labels — say the word and I'll do it.

## 3. Real photos
The hero and portrait are currently elegant CSS placeholders so the layout looks finished without images. To use real photos:
1. Put your images in `assets/` (e.g. `hero.jpg`, `about.jpg`).
2. In `css/styles.css`, find the two lines marked `>>> REPLACE ... <<<`:
   - `.hero-photo` background → `url('../assets/hero.jpg') center/cover;`
   - `.about-photo` background → `url('../assets/about.jpg') center/cover;`

## 4. Quick content edits
- **Prices / service text** — in `index.html`, the `.card` blocks under *Services*.
- **Testimonials** — the `.quote` blocks in the *Reviews* section.
- **Social links** — footer `.socials` (`instagram.com/...`, `mailto:`, `wa.me/...`).

---
Built to be fully responsive (desktop / tablet / mobile) and accessible, with reduced-motion support for users who prefer less animation.
