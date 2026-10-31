// =========================================================
// 1. TYPING EFFECT
// =========================================================
const words = ["UI/UX Designer", "Web Developer", "Content Creator", "Lifelong Learner"];
const typingEl = document.getElementById("typing");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const word = words[wordIndex];

  if (!deleting) {
    charIndex++;
    typingEl.textContent = word.slice(0, charIndex);
    if (charIndex === word.length) {
      deleting = true;
      return setTimeout(type, 1300);
    }
  } else {
    charIndex--;
    typingEl.textContent = word.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(type, deleting ? 50 : 100);
}
type();


// =========================================================
// 2. FADE-IN ON SCROLL
// =========================================================
document.querySelectorAll(".cards .reveal").forEach((el, i) => {
  el.style.transitionDelay = i * 0.15 + "s";
});
document.querySelectorAll(".stats .reveal").forEach((el, i) => {
  el.style.transitionDelay = i * 0.12 + "s";
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));


// =========================================================
// 3. 3D TILT ON PROJECT CARDS
// =========================================================
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 14;
    const rotateX = (0.5 - y / rect.height) * 14;

    card.style.transform =
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    card.style.setProperty("--mx", x + "px");
    card.style.setProperty("--my", y + "px");
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});


// =========================================================
// 4. SKILL PILLS POP IN ONE BY ONE
// =========================================================
document.querySelectorAll(".skill-group .pills").forEach((group) => {
  group.querySelectorAll("span").forEach((pill, i) => {
    pill.style.setProperty("--i", i);
  });
});


// =========================================================
// 5. COUNT-UP NUMBERS
// =========================================================
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const target = Number(el.dataset.target);
    const duration = 1500;
    const startTime = performance.now();

    function tick(now) {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    countObserver.unobserve(el);
  });
}, { threshold: 0.6 });

document.querySelectorAll(".num").forEach((n) => countObserver.observe(n));


// =========================================================
// 6. COPY EMAIL BUTTON
// =========================================================
const copyBtn = document.getElementById("copyBtn");
const toast = document.getElementById("toast");

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("panditrohini207@gmail.com");
    toast.textContent = "Email copied! ✨";
  } catch (err) {
    toast.textContent = "Couldn't copy, please select it manually";
  }
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
});


// =========================================================
// 7. SPARKLE CURSOR TRAIL (only on devices with a mouse)
// =========================================================
if (window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const colors = ["#8b5cf6", "#ff6fb5", "#5eead4"];
  let lastTime = 0;

  document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastTime < 40) return;
    lastTime = now;

    const spark = document.createElement("div");
    spark.className = "spark";
    const color = colors[Math.floor(Math.random() * colors.length)];
    spark.style.background = color;
    spark.style.boxShadow = `0 0 12px ${color}, 0 0 24px ${color}`;
    spark.style.left = e.clientX - 5 + "px";
    spark.style.top = e.clientY - 5 + "px";
    spark.style.setProperty("--dx", (Math.random() - 0.5) * 60 + "px");
    spark.style.setProperty("--dy", Math.random() * 50 + 10 + "px");

    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 800);
  });
}


// =========================================================
// 8. DARK / LIGHT THEME TOGGLE
// =========================================================
const themeBtn = document.getElementById("themeBtn");
const root = document.documentElement;

function setTheme(theme) {
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
    themeBtn.textContent = "☀️";
  } else {
    root.removeAttribute("data-theme");
    themeBtn.textContent = "🌙";
  }
  try { localStorage.setItem("theme", theme); } catch (e) {}
}

let saved = "dark";
try { saved = localStorage.getItem("theme") || "dark"; } catch (e) {}
setTheme(saved);

themeBtn.addEventListener("click", () => {
  setTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light");
});


// =========================================================
// 9. LOADING SCREEN
// =========================================================
const loader = document.getElementById("loader");
const minTime = new Promise((resolve) => setTimeout(resolve, 1700));
const pageLoaded = new Promise((resolve) => window.addEventListener("load", resolve));

Promise.all([minTime, pageLoaded]).then(() => loader.classList.add("hide"));
setTimeout(() => loader.classList.add("hide"), 5000);   // safety: never get stuck


// =========================================================
// 10. SCROLL PROGRESS BAR + BACK-TO-TOP
// =========================================================
const progress = document.getElementById("progress");
const toTop = document.getElementById("toTop");

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = pct + "%";
  toTop.classList.toggle("show", window.scrollY > 500);
});

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// =========================================================
// 11. PROJECT DETAILS POP-UP
// Edit the text, links and features here whenever you like
// =========================================================
const projects = {
  metrogo: {
    title: "MetroGo",
    sub: "Smart Metro Rail Management System",
    img: "images/metrogo.png",
    desc: "A full-stack web app inspired by Namma Metro that combines route planning, wallet-based ticket booking with scannable QR codes, and passenger safety in one place.",
    features: [
      "Search routes across the Purple and Green lines",
      "Fare checks and crowd predictions",
      "Wallet-based booking with scannable QR tickets",
      "Automatic refunds for fare corrections",
      "One-tap SOS emergency alert",
      "Personal dashboard with streaks, badges, and a monthly Wrapped recap",
      "Admin control room: bookings, emergencies, service alerts"
    ],
    tech: ["HTML", "CSS", "JavaScript", "React.js", "Node.js", "Express.js", "MongoDB", "JSON"],
    live: "",   // paste your live link here later
    code: "https://github.com/rohinip-dev"
  },
  brewtheory: {
    title: "BrewTheory Cafe",
    sub: "Smart Cafe Web Application",
    img: "images/brewtheory.png",
    desc: "A web-based application that automates cafe operations such as table booking, food ordering, and billing, with an admin panel for the cafe team.",
    features: [
      "View available tables and reserve seats",
      "Browse the menu and place food orders",
      "Easy online payments and billing",
      "Admin panel to manage menu items, bookings, and customer data"
    ],
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "MySQL", "JSON"],
    live: "",
    code: "https://github.com/rohinip-dev"
  },
  gallery: {
    title: "My Gallery",
    sub: "Retro 8-bit Photo Album",
    img: "images/gallery.png",
    desc: "A retro-style photo album that turns saving memories into a nostalgic 8-bit game experience. It helped me practice DOM manipulation, CSS theming with variables, and client-side data persistence.",
    features: [
      "Upload photos with custom captions as polaroid-style cards",
      "6 color themes: ocean, korean cream, forest, taro, autumn, japanese",
      "Custom pixel cursors and background music",
      "Typewriter title and floating sparkles",
      "Memories saved between visits with LocalStorage"
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    live: "",
    code: "https://github.com/rohinip-dev"
  }
};

const modal = document.getElementById("modal");
const mImg = document.getElementById("mImg");
const mTitle = document.getElementById("mTitle");
const mSub = document.getElementById("mSub");
const mDesc = document.getElementById("mDesc");
const mFeatures = document.getElementById("mFeatures");
const mTech = document.getElementById("mTech");
const mLive = document.getElementById("mLive");
const mCode = document.getElementById("mCode");
const modalClose = document.getElementById("modalClose");

let lastFocused = null;

function openModal(key) {
  const p = projects[key];
  if (!p) return;

  mImg.src = p.img;
  mImg.alt = p.title + " screenshot";
  mTitle.textContent = p.title;
  mSub.textContent = p.sub;
  mDesc.textContent = p.desc;

  mFeatures.innerHTML = "";
  p.features.forEach((f) => {
    const li = document.createElement("li");
    li.textContent = f;
    mFeatures.appendChild(li);
  });

  mTech.innerHTML = "";
  p.tech.forEach((t) => {
    const span = document.createElement("span");
    span.textContent = t;
    mTech.appendChild(span);
  });

  mLive.style.display = p.live ? "inline-block" : "none";
  mLive.href = p.live || "#";
  mCode.style.display = p.code ? "inline-block" : "none";
  mCode.href = p.code || "#";

  lastFocused = document.activeElement;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastFocused) lastFocused.focus();
}

document.querySelectorAll(".card-btn").forEach((btn) => {
  btn.addEventListener("click", () => openModal(btn.dataset.project));
});

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});

// =========================================================
// 12. DESIGN GALLERY + IMAGE VIEWER
// =========================================================
const gItems = Array.from(document.querySelectorAll(".g-item"));
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCaption = document.getElementById("lbCaption");
const lbClose = document.getElementById("lbClose");
const lbPrev = document.getElementById("lbPrev");
const lbNext = document.getElementById("lbNext");

let lbIndex = 0;

// stagger the gallery fade-in
gItems.forEach((el, i) => { el.style.transitionDelay = i * 0.1 + "s"; });

function showImage(i) {
  lbIndex = (i + gItems.length) % gItems.length;   // wraps around at both ends
  const item = gItems[lbIndex];
  lbImg.src = item.querySelector("img").src;
  lbImg.alt = item.querySelector("img").alt;
  lbCaption.textContent = item.dataset.caption || "";
}

function openLightbox(i) {
  showImage(i);
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

gItems.forEach((item, i) => item.addEventListener("click", () => openLightbox(i)));
lbClose.addEventListener("click", closeLightbox);
lbPrev.addEventListener("click", () => showImage(lbIndex - 1));
lbNext.addEventListener("click", () => showImage(lbIndex + 1));
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showImage(lbIndex - 1);
  if (e.key === "ArrowRight") showImage(lbIndex + 1);
});


// =========================================================
// 13. YOUTUBE VIDEO (loads only when clicked, keeps the site fast)
// =========================================================
const ytFacade = document.getElementById("ytFacade");
if (ytFacade) {
  const videoId = ytFacade.dataset.id;
  document.getElementById("ytThumb").src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  ytFacade.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
    iframe.title = "YouTube video player";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture";
    iframe.allowFullscreen = true;
    ytFacade.replaceWith(iframe);   // swap the picture for the real player
  });
}


// =========================================================
// 14. EASTER EGG: click the logo (or the footer message) 5 times
// =========================================================
let eggClicks = 0;
let eggTimer;

function confettiRain() {
  const colors = ["#8b5cf6", "#ff6fb5", "#5eead4", "#fdf8dc", "#ffd1e8"];
  for (let i = 0; i < 70; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    piece.style.setProperty("--x", (Math.random() - 0.5) * 200 + "px");
    piece.style.setProperty("--t", 2.5 + Math.random() * 2 + "s");
    piece.style.animationDelay = Math.random() * 0.6 + "s";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 5500);
  }
  toast.textContent = "You found the secret! 🎉💖";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

document.querySelectorAll(".logo, .footer .quote").forEach((el) => {
  el.addEventListener("click", () => {
    eggClicks++;
    clearTimeout(eggTimer);
    eggTimer = setTimeout(() => (eggClicks = 0), 1500);   // clicks must be quick
    if (eggClicks >= 5) {
      eggClicks = 0;
      confettiRain();
    }
  });
});

// =========================================================
// COLOR MOOD PICKER
// =========================================================
const paletteBtn = document.getElementById("paletteBtn");
const swatchBox = document.getElementById("swatches");
const swatches = document.querySelectorAll(".swatch");

function setMood(mood) {
  if (mood === "dreamy") {
    root.removeAttribute("data-mood");       // dreamy is the default look
  } else {
    root.setAttribute("data-mood", mood);
  }
  swatches.forEach((s) => s.setAttribute("aria-pressed", String(s.dataset.mood === mood)));
  try { localStorage.setItem("mood", mood); } catch (e) {}
}

let savedMood = "dreamy";
try { savedMood = localStorage.getItem("mood") || "dreamy"; } catch (e) {}
setMood(savedMood);

swatches.forEach((s) => s.addEventListener("click", () => setMood(s.dataset.mood)));

function togglePalette(open) {
  swatchBox.classList.toggle("open", open);
  paletteBtn.setAttribute("aria-expanded", String(open));
}
paletteBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  togglePalette(!swatchBox.classList.contains("open"));
});
document.addEventListener("click", (e) => {
  if (!swatchBox.contains(e.target)) togglePalette(false);   // click elsewhere closes it
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") togglePalette(false);
});


// =========================================================
// BACKGROUND MUSIC (only plays when the visitor clicks)
// =========================================================
const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");
bgm.volume = 0.3;   // soft, 30% volume

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

musicBtn.addEventListener("click", async () => {
  if (bgm.paused) {
    try {
      await bgm.play();
      musicBtn.classList.add("playing");
      musicBtn.setAttribute("aria-pressed", "true");
      musicBtn.setAttribute("aria-label", "Pause background music");
    } catch (err) {
      showToast("Couldn't play music. Check music.mp3 🎵");
    }
  } else {
    bgm.pause();
    musicBtn.classList.remove("playing");
    musicBtn.setAttribute("aria-pressed", "false");
    musicBtn.setAttribute("aria-label", "Play background music");
  }
});

// =========================================================
// CONTACT FORM (sends through Formspree, page does not reload)
// =========================================================
const contactForm = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // reminder if the form ID was never replaced
    if (contactForm.action.includes("YOUR_FORM_ID")) {
      formStatus.className = "form-status err";
      formStatus.textContent = "Add your Formspree form ID in index.html first.";
      return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = "Sending...";
    formStatus.className = "form-status";
    formStatus.textContent = "";

    try {
      const res = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" }
      });

      if (res.ok) {
        contactForm.reset();
        formStatus.className = "form-status ok";
        formStatus.textContent = "Thank you! Your message is on its way 💖";
        showToast("Message sent! 💌");
      } else {
        throw new Error("Server said no");
      }
    } catch (err) {
      formStatus.className = "form-status err";
      formStatus.textContent = "Oops, something went wrong. Please email me directly instead.";
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = "Send message ✉️";
    }
  });
}


// =========================================================
// MOBILE HAMBURGER MENU
// =========================================================
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  setMenu(!navLinks.classList.contains("open"));
});

navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 800) setMenu(false);
});