/* =====================================================================
   BEYOND REALMS — script.js
   ▸ EDIT ONLY THE CONFIG BLOCK BELOW to go live. Nothing else needs touching.
   ===================================================================== */

const CONFIG = {
  /* 1) CALENDLY ---------------------------------------------------------
     Paste your Calendly scheduling link. Create it at calendly.com.
     Every "Book via Calendly" / "Book a Session" button opens this popup. */
  calendlyUrl: "https://calendly.com/your-handle/intro-session",

  /* 2) STRIPE PAYMENT LINKS --------------------------------------------
     The simplest, no-server option. In your Stripe Dashboard go to
     Payments → Payment Links, create one product per service, then paste
     each link below. Each "Book Now" / "Pay via Stripe" button uses these.
     (See README.md for the alternative Stripe Buy Button method.) */
  stripeLinks: {
    tarot15:   "https://buy.stripe.com/REPLACE_tarot15",   // Tarot Reading 15 min — £23
    tarot45:   "https://buy.stripe.com/REPLACE_tarot45",   // Tarot Reading 45 min — £69
    advanced:  "https://buy.stripe.com/REPLACE_advanced",  // Advanced Guidance — £111
    crystal:   "https://buy.stripe.com/REPLACE_crystal",   // Crystal Guidance — £19
    cleansing: "https://buy.stripe.com/REPLACE_cleansing"  // Energy Cleansing & Cord Cutting — £23
  },

  /* If true, pay buttons open in a new tab; if false, same tab. */
  payInNewTab: true
};

/* =====================================================================
   --- Implementation below: you generally won't need to edit this. ---
   ===================================================================== */
document.addEventListener("DOMContentLoaded", () => {

  /* current year in footer */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Calendly buttons ---- */
  const openCalendly = () => {
    if (window.Calendly && CONFIG.calendlyUrl) {
      Calendly.initPopupWidget({ url: CONFIG.calendlyUrl });
    } else {
      window.open(CONFIG.calendlyUrl, "_blank", "noopener");
    }
  };
  document.querySelectorAll("[data-calendly]").forEach(btn =>
    btn.addEventListener("click", openCalendly)
  );

  /* ---- Stripe pay buttons ---- */
  document.querySelectorAll("[data-pay]").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-pay");
      const url = CONFIG.stripeLinks[key];
      if (!url || url.includes("REPLACE")) {
        alert("Payment link not set yet.\nAdd your Stripe Payment Link in js/script.js → CONFIG.stripeLinks." );
        return;
      }
      if (CONFIG.payInNewTab) window.open(url, "_blank", "noopener");
      else window.location.href = url;
    });
  });

  /* ---- Sticky header shadow ---- */
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile nav ---- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
    nav.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---- Scroll reveal ---- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  /* ---- Testimonials carousel ---- */
  const track = document.getElementById("carTrack");
  const dotsWrap = document.getElementById("carDots");
  if (track) {
    const slides = [...track.children];
    const perView = () => (window.innerWidth <= 760 ? 1 : window.innerWidth <= 980 ? 2 : 3);
    let index = 0;

    const pages = () => Math.max(1, slides.length - perView() + 1);

    const buildDots = () => {
      dotsWrap.innerHTML = "";
      for (let i = 0; i < pages(); i++) {
        const b = document.createElement("button");
        b.addEventListener("click", () => go(i));
        dotsWrap.appendChild(b);
      }
    };
    const go = (i) => {
      index = (i + pages()) % pages();
      const slideW = slides[0].getBoundingClientRect().width + 22; // width + gap
      track.scrollTo({ left: index * slideW, behavior: "smooth" });
      [...dotsWrap.children].forEach((d, n) => d.classList.toggle("active", n === index));
    };

    document.querySelector(".car-btn.next").addEventListener("click", () => go(index + 1));
    document.querySelector(".car-btn.prev").addEventListener("click", () => go(index - 1));

    buildDots(); go(0);

    let timer = setInterval(() => go(index + 1), 6000);
    track.addEventListener("pointerenter", () => clearInterval(timer));
    track.addEventListener("pointerleave", () => (timer = setInterval(() => go(index + 1), 6000)));
    window.addEventListener("resize", () => { buildDots(); go(0); });
  }
});
