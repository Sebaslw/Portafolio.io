/* SEBASLW — interacciones generales */
(function () {
  "use strict";
  const cfg = window.SITE_CONFIG || {};
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---- Enlaces y datos de contacto desde la configuración ---- */
  function applyConfig() {
    const links = cfg.links || {};
    $$("[data-link]").forEach((a) => {
      const url = links[a.dataset.link];
      if (url) a.href = url;
    });

    const c = cfg.contact || {};
    if (c.email) {
      $$("[data-email-link]").forEach((a) => (a.href = "mailto:" + c.email));
      $$("[data-email-text]").forEach((el) => (el.textContent = c.email));
    }
    $$("[data-location]").forEach((el) => (el.textContent = c.location || ""));

    const phoneItem = document.getElementById("phoneItem");
    const phoneLink = document.getElementById("phoneLink");
    if (phoneItem && phoneLink && c.showPhone && c.phone) {
      phoneLink.href = "tel:" + (c.phoneHref || c.phone.replace(/\s+/g, ""));
      phoneLink.textContent = c.phone;
      phoneItem.hidden = false;
    }

    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  }

  /* ---- Navbar al hacer scroll + botón volver arriba ---- */
  function scrollUi() {
    const nav = document.getElementById("mainNav");
    const toTop = document.getElementById("toTop");
    const onScroll = () => {
      const y = window.scrollY;
      if (nav) nav.classList.toggle("scrolled", y > 20);
      if (toTop) toTop.classList.toggle("show", y > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    if (toTop) {
      toTop.addEventListener("click", () => {
        window.scrollTo({ top: 0 });
        const brand = document.querySelector(".brand");
        if (brand) brand.focus({ preventScroll: true });
      });
    }
  }

  /* ---- Cerrar el menú móvil al elegir un enlace ---- */
  function mobileMenu() {
    const collapseEl = document.getElementById("navLinks");
    if (!collapseEl) return;
    $$("#navLinks a").forEach((a) =>
      a.addEventListener("click", () => {
        if (collapseEl.classList.contains("show") && window.bootstrap) {
          window.bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
        }
      })
    );
  }

  /* ---- Animaciones de aparición ---- */
  function reveal() {
    const items = $$(".reveal");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach((el) => io.observe(el));
    // Expuesto para elementos añadidos dinámicamente (galería GitHub)
    window.__observeReveal = (el) => io.observe(el);
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyConfig();
    scrollUi();
    mobileMenu();
    reveal();
  });
})();
