/* =====================================================================
   Rin Reaksmey — Portfolio script (vanilla JavaScript, no frameworks)
   Content lives in js/data.js (PORTFOLIO object). This file renders it
   and wires up every interaction.
   ===================================================================== */

"use strict";

/* ---------------------------------------------------------------------
   Helpers
   --------------------------------------------------------------------- */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Escape text before inserting it as HTML (prevents broken markup / XSS). */
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

/** Show a short notification at the bottom of the screen. */
let toastTimer;
function showToast(message, type = "success") {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 4500);
}

/* ---------------------------------------------------------------------
   Rendering: profile fields & social links
   --------------------------------------------------------------------- */
function renderProfileFields() {
  const { profile } = PORTFOLIO;

  $$("[data-field]").forEach((el) => {
    const value = profile[el.dataset.field];
    if (value) el.textContent = value;
  });

  $$('[data-href="mailto"]').forEach((el) => (el.href = `mailto:${profile.email}`));
  $$('[data-href="tel"]').forEach((el) => (el.href = `tel:${profile.phone.replace(/\s+/g, "")}`));

  const cvLink = $("#download-cv");
  if (cvLink) {
    cvLink.href = profile.cvFile;
    cvLink.setAttribute("download", profile.cvDownloadName);
  }

}

function renderSocials() {
  // Only show links that have a real URL — no fake/placeholder links.
  const html = PORTFOLIO.socials
    .filter((s) => s.url && s.url.trim() !== "")
    .map(
      (s) => `<li><a href="${escapeHTML(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(s.name)}" title="${escapeHTML(s.name)}">
                <i class="${escapeHTML(s.icon)}" aria-hidden="true"></i></a></li>`
    )
    .join("");
  $$("[data-socials]").forEach((list) => (list.innerHTML = html));
}

/* ---------------------------------------------------------------------
   Rendering: skills, soft skills, languages
   --------------------------------------------------------------------- */
function renderSkills() {
  $("#skills-grid").innerHTML = PORTFOLIO.skills
    .map(
      (group) => `
      <article class="card skill-card reveal">
        <div class="skill-card__head">
          <span class="icon-box"><i class="${escapeHTML(group.icon)}" aria-hidden="true"></i></span>
          <div><h3>${escapeHTML(group.category)}</h3><p>${group.items.length} skills</p></div>
        </div>
        ${group.items
          .map(
            (skill) => `
          <div class="skill">
            <div class="skill__top">
              <span class="skill__name"><i class="${escapeHTML(skill.icon)}" aria-hidden="true"></i>${escapeHTML(skill.name)}</span>
              <span class="skill__pct">${Number(skill.level)}%</span>
            </div>
            <div class="skill__bar" role="progressbar" aria-label="${escapeHTML(skill.name)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Number(skill.level)}">
              <div class="skill__fill" data-level="${Number(skill.level)}"></div>
            </div>
          </div>`
          )
          .join("")}
      </article>`
    )
    .join("");

  $("#soft-skills").innerHTML = PORTFOLIO.softSkills.map((s) => `<li class="chip">${escapeHTML(s)}</li>`).join("");
  $("#languages").innerHTML = PORTFOLIO.languages
    .map((l) => `<li><strong>${escapeHTML(l.name)}</strong><span>${escapeHTML(l.level)}</span></li>`)
    .join("");
}

/* ---------------------------------------------------------------------
   Rendering: services
   --------------------------------------------------------------------- */
function renderServices() {
  $("#services-grid").innerHTML = PORTFOLIO.services
    .map(
      (s) => `
      <article class="card service reveal">
        <span class="icon-box"><i class="${escapeHTML(s.icon)}" aria-hidden="true"></i></span>
        <h3>${escapeHTML(s.title)}</h3>
        <p>${escapeHTML(s.text)}</p>
      </article>`
    )
    .join("");
}

/* ---------------------------------------------------------------------
   Rendering + filtering: projects
   --------------------------------------------------------------------- */
function projectLinkButton(url, label, icon, emptyLabel) {
  if (url && url.trim() !== "") {
    return `<a href="${escapeHTML(url)}" class="btn btn--sm ${label === "Live Demo" ? "btn--primary" : "btn--ghost"}" target="_blank" rel="noopener noreferrer">
              <i class="${icon}" aria-hidden="true"></i> ${label}</a>`;
  }
  // No URL yet → honest, disabled button instead of a fake link.
  return `<span class="btn btn--sm btn--ghost" aria-disabled="true" title="${emptyLabel}">
            <i class="${icon}" aria-hidden="true"></i> ${emptyLabel}</span>`;
}

function renderProjects() {
  $("#projects-grid").innerHTML = PORTFOLIO.projects
    .map(
      (p) => `
      <article class="card project reveal" data-category="${escapeHTML(p.category)}">
        <div class="project__thumb">
          <img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.title)} preview" loading="lazy" width="860" height="540" />
          ${p.status ? `<span class="project__status">${escapeHTML(p.status)}</span>` : ""}
        </div>
        <div class="project__body">
          <h3 class="project__title">${escapeHTML(p.title)}</h3>
          <p class="project__desc">${escapeHTML(p.description)}</p>
          <ul class="project__tech" aria-label="Technologies used">${p.tech.map((t) => `<li>${escapeHTML(t)}</li>`).join("")}</ul>
          <div class="project__links">
            ${projectLinkButton(p.demo, "Live Demo", "fa-solid fa-arrow-up-right-from-square", "Demo soon")}
            ${projectLinkButton(p.github, "Source Code", "fa-brands fa-github", "Private repo")}
          </div>
        </div>
      </article>`
    )
    .join("");
}

function renderProjectFilters() {
  const container = $("#project-filters");
  container.innerHTML = PORTFOLIO.projectFilters
    .map(
      (f, i) => `<button type="button" class="filter-btn${i === 0 ? " active" : ""}" role="tab" aria-selected="${i === 0}" data-filter="${escapeHTML(f.key)}">${escapeHTML(f.label)}</button>`
    )
    .join("");

  container.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (!button) return;
    $$(".filter-btn", container).forEach((b) => {
      b.classList.toggle("active", b === button);
      b.setAttribute("aria-selected", b === button);
    });
    filterProjects(button.dataset.filter);
  });
}

function filterProjects(category) {
  $$(".project").forEach((card) => {
    const match = category === "all" || card.dataset.category === category;
    card.classList.toggle("is-hidden", !match);
    card.classList.remove("is-entering");
    if (match) {
      card.classList.add("visible"); // make sure revealed cards stay visible
      void card.offsetWidth; // restart the animation
      card.classList.add("is-entering");
    }
  });
}

/* ---------------------------------------------------------------------
   Rendering: education & experience timelines
   --------------------------------------------------------------------- */
function listBlock(label, items, extraClass = "") {
  if (!items || !items.length) return "";
  return `<h4 class="timeline__label">${label}</h4>
          <ul class="timeline__list ${extraClass}">${items.map((i) => `<li>${escapeHTML(i)}</li>`).join("")}</ul>`;
}

function renderTimeline(containerId, entries, mapper) {
  $(containerId).innerHTML = entries
    .map((entry) => {
      const e = mapper(entry);
      return `
      <article class="timeline__item reveal">
        <span class="timeline__dot" aria-hidden="true"></span>
        <div class="card">
          <div class="timeline__head">
            <h3 class="timeline__title">${escapeHTML(e.title)}</h3>
            <span class="timeline__period">${escapeHTML(e.period)}</span>
          </div>
          <p class="timeline__org"><i class="${e.icon}" aria-hidden="true"></i> ${escapeHTML(e.org)}</p>
          ${e.body}
        </div>
      </article>`;
    })
    .join("");
}

function renderEducationAndExperience() {
  renderTimeline("#education-timeline", PORTFOLIO.education, (ed) => ({
    title: ed.degree,
    org: ed.school,
    period: ed.period,
    icon: "fa-solid fa-building-columns",
    body:
      `<h4 class="timeline__label">Relevant Courses</h4>
       <ul class="chips">${ed.courses.map((c) => `<li class="chip">${escapeHTML(c)}</li>`).join("")}</ul>` +
      listBlock("Academic Achievements", ed.achievements, "timeline__list--trophy"),
  }));

  renderTimeline("#experience-timeline", PORTFOLIO.experience, (ex) => ({
    title: ex.role,
    org: ex.company,
    period: ex.period,
    icon: "fa-solid fa-briefcase",
    body:
      listBlock("Responsibilities", ex.responsibilities) +
      `<h4 class="timeline__label">Technologies</h4>
       <ul class="project__tech">${ex.tech.map((t) => `<li>${escapeHTML(t)}</li>`).join("")}</ul>` +
      listBlock("Achievements", ex.achievements, "timeline__list--trophy"),
  }));
}

/* ---------------------------------------------------------------------
   Page loader
   --------------------------------------------------------------------- */
function initLoader() {
  // The loader is also hidden by a small inline script in index.html,
  // so a slow font/CDN or a script error can never block the page.
  $("#loader")?.classList.add("hidden");
}

/* ---------------------------------------------------------------------
   Navigation: sticky header, hamburger menu, active link
   --------------------------------------------------------------------- */
function initNavigation() {
  const header = $("#header");
  const toggle = $("#nav-toggle");
  const menu = $("#nav-menu");

  const setMenu = (open) => {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("no-scroll", open);
  };

  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  $$(".nav__link").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
  document.addEventListener("click", (e) => {
    if (menu.classList.contains("open") && !menu.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
  });
  window.addEventListener("resize", () => window.innerWidth > 960 && setMenu(false));

  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 30);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initActiveLink() {
  const links = $$(".nav__link");
  const sections = links.map((l) => $(l.getAttribute("href"))).filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => {
          const active = l.getAttribute("href") === `#${entry.target.id}`;
          l.classList.toggle("active", active);
          active ? l.setAttribute("aria-current", "page") : l.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" } // a section is "active" when it crosses the middle of the screen
  );
  sections.forEach((s) => observer.observe(s));
}

/* ---------------------------------------------------------------------
   Typing animation
   --------------------------------------------------------------------- */
function initTyping() {
  const el = $("#typing");
  const words = PORTFOLIO.typingWords;
  if (!el || !words.length) return;
  if (prefersReducedMotion) { el.textContent = words[0]; return; }

  let wordIndex = 0, charIndex = 0, deleting = false;

  const tick = () => {
    const word = words[wordIndex];
    charIndex += deleting ? -1 : 1;
    el.textContent = word.slice(0, charIndex);

    let delay = deleting ? 45 : 95;
    if (!deleting && charIndex === word.length) { delay = 1700; deleting = true; }
    else if (deleting && charIndex === 0) { deleting = false; wordIndex = (wordIndex + 1) % words.length; delay = 350; }
    setTimeout(tick, delay);
  };
  el.textContent = "";
  setTimeout(tick, 600);
}

/* ---------------------------------------------------------------------
   Scroll reveal + skill bars + counters
   --------------------------------------------------------------------- */
function animateCounter(el) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3))) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("visible");
        $$(".skill__fill", el).forEach((bar) => (bar.style.width = `${bar.dataset.level}%`));
        $$("[data-count]", el).forEach(animateCounter);
        obs.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  $$(".reveal").forEach((el, i) => {
    // small stagger for elements inside the same grid
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    observer.observe(el);
  });
}

/* ---------------------------------------------------------------------
   Back to top button
   --------------------------------------------------------------------- */
function initBackToTop() {
  const button = $("#back-to-top");
  window.addEventListener("scroll", () => button.classList.toggle("show", window.scrollY > 600), { passive: true });
  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" }));
}

/* ---------------------------------------------------------------------
   Download CV
   --------------------------------------------------------------------- */
function initCvDownload() {
  const link = $("#download-cv");
  if (!link) return;
  link.addEventListener("click", () => showToast("Downloading CV…"));
}

/* ---------------------------------------------------------------------
   Contact form: validation + sending
   --------------------------------------------------------------------- */
const VALIDATORS = {
  name: (v) => (v.length < 2 ? "Please enter your full name (at least 2 characters)." : ""),
  email: (v) => (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "Please enter a valid email address." : ""),
  subject: (v) => (v.length < 3 ? "Please enter a subject (at least 3 characters)." : ""),
  message: (v) => (v.length < 10 ? "Your message should be at least 10 characters." : ""),
};

function validateField(input) {
  const error = VALIDATORS[input.id](input.value.trim());
  const group = input.closest(".form__group");
  group.classList.toggle("invalid", !!error);
  group.classList.toggle("valid", !error);
  $(".form__error", group).textContent = error;
  input.setAttribute("aria-invalid", !!error);
  return !error;
}

function isEmailJsConfigured() {
  const { publicKey, serviceId, templateId } = PORTFOLIO.emailjs || {};
  return Boolean(publicKey && serviceId && templateId);
}

/** Load the EmailJS SDK only when it's configured (keeps the page light). */
function loadEmailJs() {
  if (window.emailjs) return Promise.resolve(window.emailjs);
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = () => {
      window.emailjs.init({ publicKey: PORTFOLIO.emailjs.publicKey });
      resolve(window.emailjs);
    };
    script.onerror = () => reject(new Error("Could not load the email service."));
    document.head.appendChild(script);
  });
}

function setFormStatus(message, type) {
  const status = $("#form-status");
  status.textContent = message;
  status.className = `form__status ${type}`;
}

function initContactForm() {
  const form = $("#contact-form");
  const button = $("#submit-btn");
  const inputs = $$("input, textarea", form);

  inputs.forEach((input) => {
    input.addEventListener("blur", () => input.value && validateField(input));
    input.addEventListener("input", () => input.closest(".form__group").classList.contains("invalid") && validateField(input));
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setFormStatus("", "");

    const allValid = inputs.map(validateField).every(Boolean);
    if (!allValid) {
      setFormStatus("Please fix the highlighted fields and try again.", "error");
      $(".invalid input, .invalid textarea", form)?.focus();
      return;
    }

    const data = Object.fromEntries(inputs.map((i) => [i.id, i.value.trim()]));

    // Mode 2: no email service configured → open the visitor's email app (honest fallback).
    if (!isEmailJsConfigured()) {
      const body = `${data.message}\n\n— ${data.name} (${data.email})`;
      window.location.href = `mailto:${PORTFOLIO.profile.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
      setFormStatus("Your email app has opened with this message ready. Press Send there to deliver it.", "success");
      return;
    }

    // Mode 1: send directly via EmailJS.
    button.classList.add("is-loading");
    button.disabled = true;
    try {
      const emailjs = await loadEmailJs();
      await emailjs.send(PORTFOLIO.emailjs.serviceId, PORTFOLIO.emailjs.templateId, {
        from_name: data.name,
        reply_to: data.email,
        subject: data.subject,
        message: data.message,
      });
      form.reset();
      $$(".form__group", form).forEach((g) => g.classList.remove("valid", "invalid"));
      setFormStatus("Thank you! Your message was sent. I'll reply as soon as possible.", "success");
      showToast("Message sent successfully ✓");
    } catch (error) {
      console.error(error);
      setFormStatus(`Sorry, the message could not be sent. Please email me directly at ${PORTFOLIO.profile.email}.`, "error");
      showToast("Message failed to send", "error");
    } finally {
      button.classList.remove("is-loading");
      button.disabled = false;
    }
  });
}

/* ---------------------------------------------------------------------
   Start everything
   --------------------------------------------------------------------- */
function init() {
  if (typeof PORTFOLIO === "undefined") {
    // Usually a typo in js/data.js (missing comma, quote or bracket).
    const message = "js/data.js has an error (often a missing comma , or quote \"). Press F12 → Console to see the line number.";
    console.error(message);
    const banner = document.createElement("div");
    banner.className = "dev-error";
    banner.innerHTML = "<strong>⚠ Portfolio data error:</strong> <code>js/data.js</code> has a typo (often a missing comma <code>,</code> or quote <code>\"</code>). Press <strong>F12 → Console</strong> to see the line number.";
    document.body.appendChild(banner);
    return;
  }
  document.documentElement.classList.add("js-ready");
  // 1. Render content from data.js
  renderProfileFields();
  renderSocials();
  renderSkills();
  renderServices();
  renderProjectFilters();
  renderProjects();
  renderEducationAndExperience();

  // 2. Interactions
  initLoader();
  initNavigation();
  initActiveLink();
  initTyping();
  initScrollReveal();
  initBackToTop();
  initCvDownload();
  initContactForm();
}

document.addEventListener("DOMContentLoaded", init);
