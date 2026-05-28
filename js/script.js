/* =====================================================================
   BEYOND REALMS — script.js
   ▸ EDIT ONLY THE CONFIG BLOCK BELOW to go live. Nothing else needs touching.
   ===================================================================== */

const CONFIG = {
  /* CALENDLY -----------------------------------------------------------
     Beyond Realms uses a simple two-step flow:
       1) Client books a time here in Calendly (and enters their WhatsApp
          number so Smiti knows where to call).
       2) The Calendly CONFIRMATION page + email contains the Revolut
          payment link with a note to pay to confirm.
     >>> The Revolut link is added inside Calendly's settings, NOT here. <<<

     'calendlyUrl' is the general link used by the "Book a Session" /
     "Book via Calendly" buttons. 'calendlyLinks' are one event-type per
     session, used by each "Book Now" button. Create one Calendly event
     per session (with the correct duration) and paste its link below.
     Any session left as a REPLACE placeholder falls back to calendlyUrl. */
  calendlyUrl: "https://calendly.com/your-handle",

  calendlyLinks: {
    tarot15:   "https://calendly.com/your-handle/REPLACE_tarot-15min",
    tarot45:   "https://calendly.com/your-handle/REPLACE_tarot-45min",
    advanced:  "https://calendly.com/your-handle/REPLACE_advanced",
    crystal:   "https://calendly.com/your-handle/REPLACE_crystal",
    cleansing: "https://calendly.com/your-handle/REPLACE_cleansing"
  }
};

/* =====================================================================
   --- Implementation below: you generally won't need to edit this. ---
   ===================================================================== */
document.addEventListener("DOMContentLoaded", () => {

  /* current year in footer */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Open Calendly (general or a specific event) ---- */
  const openCalendly = (url) => {
    const target = url || CONFIG.calendlyUrl;
    if (window.Calendly && target) {
      Calendly.initPopupWidget({ url: target });
    } else {
      window.open(target, "_blank", "noopener");
    }
  };

  /* General "Book a Session" / "Book via Calendly" buttons */
  document.querySelectorAll("[data-calendly]").forEach(btn =>
    btn.addEventListener("click", () => openCalendly(CONFIG.calendlyUrl))
  );

  /* Per-session "Book Now" buttons → that session's Calendly event
     (falls back to the general link if not set yet). */
  document.querySelectorAll("[data-book]").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-book");
      let url = CONFIG.calendlyLinks[key];
      if (!url || url.includes("REPLACE")) url = CONFIG.calendlyUrl;
      openCalendly(url);
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
