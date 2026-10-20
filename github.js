/* SEBASLW — galería de proyectos conectada a la API pública de GitHub */
(function () {
  "use strict";
  const cfg = window.SITE_CONFIG || {};
  const gh = cfg.github || {};
  const labels = cfg.categoryLabels || {};
  const USER = gh.user || "Sebaslw";
  const API = "https://api.github.com/users/" + encodeURIComponent(USER) + "/repos?per_page=100&sort=pushed&type=owner";
  const CACHE_KEY = "sebaslw_repos_v1";
  const CACHE_MS = (gh.cacheMinutes || 60) * 60 * 1000;

  const grid = document.getElementById("repoGrid");
  const status = document.getElementById("repoStatus");
  if (!grid || !status) return;

  const ICONS = { web: "bi-globe2", herramientas: "bi-tools", aplicaciones: "bi-phone", redes: "bi-diagram-3" };
  const LANG_COLORS = { JavaScript: "#F1E05A", HTML: "#E34C26", CSS: "#563D7C", Python: "#3572A5", TypeScript: "#3178C6", PHP: "#4F5D95", Shell: "#89E051" };

  /* ---------- caché local (opcional, tolerante a fallos) ---------- */
  function readCache() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) { return null; }
  }
  function writeCache(data) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data: data })); } catch (e) { /* sin almacenamiento */ }
  }

  /* ---------- utilidades ---------- */
  function categorize(repo) {
    const map = gh.categories || {};
    if (map[repo.name]) return map[repo.name];
    const n = repo.name.toLowerCase();
    if (/(lab|ccna|cisco|red|network|packet)/.test(n)) return "redes";
    if (["HTML", "CSS", "JavaScript"].includes(repo.language)) return "web";
    return "herramientas";
  }

  function safeUrl(u) {
    try {
      const url = new URL(u);
      return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
    } catch (e) { return null; }
  }

  // Solo se muestra una demostración si GitHub la reporta (homepage o Pages activo).
  function demoUrl(repo) {
    if (repo.homepage && safeUrl(repo.homepage)) return safeUrl(repo.homepage);
    if (repo.has_pages) {
      const owner = (repo.owner && repo.owner.login ? repo.owner.login : USER).toLowerCase();
      if (repo.name.toLowerCase() === owner + ".github.io") return "https://" + owner + ".github.io/";
      return "https://" + owner + ".github.io/" + encodeURIComponent(repo.name) + "/";
    }
    return null;
  }

  function fmtDate(iso) {
    if (!iso) return null;
    try {
      return new Date(iso).toLocaleDateString("es-CO", { year: "numeric", month: "short", day: "numeric" });
    } catch (e) { return null; }
  }

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ---------- render ---------- */
  function card(repo) {
    const cat = categorize(repo);
    const col = el("div", "col-md-6 col-xl-4 repo-col reveal");
    col.dataset.category = cat;

    const art = el("article", "repo-card");
    const thumb = el("div", "repo-thumb");
    const img = (gh.images || {})[repo.name];
    if (img) {
      const im = el("img");
      im.src = img;
      im.alt = "Captura del proyecto " + repo.name;
      im.loading = "lazy";
      thumb.appendChild(im);
    } else {
      const ic = el("i", "bi " + (ICONS[cat] || "bi-folder2-open"));
      ic.setAttribute("aria-hidden", "true");
      thumb.appendChild(ic);
    }
    thumb.appendChild(el("span", "repo-cat", labels[cat] || cat));
    art.appendChild(thumb);

    const body = el("div", "repo-body");
    body.appendChild(el("h3", null, repo.name));
    const desc = (repo.description || "").trim();
    body.appendChild(el("p", "repo-desc" + (desc ? "" : " empty"), desc || "Sin descripción en el repositorio."));

    const meta = el("div", "repo-meta");
    if (repo.language) {
      const lang = el("span", "repo-tag");
      const dot = el("span", "lang-dot");
      dot.style.background = LANG_COLORS[repo.language] || "#9AA8BB";
      dot.setAttribute("aria-hidden", "true");
      lang.appendChild(dot);
      lang.appendChild(document.createTextNode(repo.language));
      meta.appendChild(lang);
    }
    const updated = fmtDate(repo.pushed_at || repo.updated_at);
    if (updated) meta.appendChild(el("span", "repo-tag", "Actualizado " + updated));
    if (meta.children.length) body.appendChild(meta);

    const actions = el("div", "repo-actions");
    const repoUrl = safeUrl(repo.html_url) || ("https://github.com/" + USER + "/" + encodeURIComponent(repo.name));
    const a1 = el("a");
    a1.href = repoUrl;
    a1.target = "_blank";
    a1.rel = "noopener noreferrer";
    a1.innerHTML = '<i class="bi bi-github" aria-hidden="true"></i> Código';
    a1.setAttribute("aria-label", "Ver el código de " + repo.name + " en GitHub (abre en una pestaña nueva)");
    actions.appendChild(a1);

    const demo = demoUrl(repo);
    if (demo) {
      const a2 = el("a", "demo");
      a2.href = demo;
      a2.target = "_blank";
      a2.rel = "noopener noreferrer";
      a2.innerHTML = '<i class="bi bi-box-arrow-up-right" aria-hidden="true"></i> Demo';
      a2.setAttribute("aria-label", "Abrir la demostración de " + repo.name + " (abre en una pestaña nueva)");
      actions.appendChild(a2);
    }
    body.appendChild(actions);
    art.appendChild(body);
    col.appendChild(art);
    return col;
  }

  function render(repos) {
    const hidden = gh.hidden || [];
    const list = repos.filter((r) => !r.fork && !r.private && !hidden.includes(r.name));
    grid.innerHTML = "";
    if (!list.length) {
      grid.appendChild(emptyState("No hay repositorios públicos para mostrar en este momento."));
    } else {
      list.forEach((r) => {
        const c = card(r);
        grid.appendChild(c);
        if (window.__observeReveal) window.__observeReveal(c); else c.classList.add("visible");
      });
    }
    grid.setAttribute("aria-busy", "false");
    applyFilter(currentFilter);
    return list.length;
  }

  function emptyState(msg) {
    const wrap = el("div", "col-12");
    const box = el("div", "empty-state");
    box.appendChild(el("p", "mb-2", msg));
    const a = el("a", "btn btn-ghost btn-sm");
    a.href = (cfg.links && cfg.links.github) || "https://github.com/" + USER;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.innerHTML = '<i class="bi bi-github" aria-hidden="true"></i> Ir al perfil de GitHub';
    box.appendChild(a);
    wrap.appendChild(box);
    return wrap;
  }

  function skeletons(n) {
    grid.innerHTML = "";
    for (let i = 0; i < n; i++) {
      const c = el("div", "col-md-6 col-xl-4");
      const s = el("div", "skeleton");
      s.setAttribute("aria-hidden", "true");
      c.appendChild(s);
      grid.appendChild(c);
    }
  }

  function setStatus(text, warn) {
    status.innerHTML = "";
    const span = el("span", warn ? "warn" : null, text);
    status.appendChild(span);
  }

  /* ---------- filtros ---------- */
  let currentFilter = "all";
  function applyFilter(f) {
    currentFilter = f;
    let visible = 0;
    grid.querySelectorAll(".repo-col").forEach((c) => {
      const show = f === "all" || c.dataset.category === f;
      c.classList.toggle("is-hidden", !show);
      if (show) visible++;
    });
    const old = grid.querySelector(".filter-empty");
    if (old) old.remove();
    if (grid.querySelector(".repo-col") && visible === 0) {
      const box = el("div", "col-12 filter-empty");
      box.appendChild(el("div", "empty-state", "Todavía no hay proyectos públicos en esta categoría."));
      grid.appendChild(box);
    }
  }
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      applyFilter(btn.dataset.filter);
    });
  });

  /* ---------- carga ---------- */
  async function load() {
    const cached = readCache();
    if (cached && Date.now() - cached.t < CACHE_MS) {
      const n = render(cached.data);
      setStatus(n + " repositorios públicos · datos de GitHub (caché reciente)");
      return;
    }

    skeletons(3);
    setStatus("Cargando repositorios desde GitHub…");

    try {
      const res = await fetch(API, { headers: { Accept: "application/vnd.github+json" } });
      if (!res.ok) {
        const limited = (res.status === 403 || res.status === 429) && res.headers.get("x-ratelimit-remaining") === "0";
        throw new Error(limited ? "rate" : "http_" + res.status);
      }
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("formato");
      const slim = data.map((r) => ({
        name: r.name, description: r.description, language: r.language, html_url: r.html_url,
        homepage: r.homepage, has_pages: r.has_pages, fork: r.fork, private: r.private,
        pushed_at: r.pushed_at, updated_at: r.updated_at, owner: { login: r.owner && r.owner.login }
      }));
      writeCache(slim);
      const n = render(slim);
      setStatus(n + " repositorios públicos · datos en vivo de GitHub");
    } catch (err) {
      if (cached && cached.data) {
        const n = render(cached.data);
        setStatus("GitHub no respondió; se muestran " + n + " repositorios guardados de una consulta anterior.", true);
        return;
      }
      const fb = gh.fallback || [];
      if (fb.length) {
        render(fb);
        setStatus(
          (err.message === "rate"
            ? "Se alcanzó el límite de consultas de la API de GitHub."
            : "No fue posible conectar con la API de GitHub.") +
            " Se muestra una lista verificada manualmente; los enlaces de demostración solo aparecen con datos en vivo.",
          true
        );
      } else {
        grid.innerHTML = "";
        grid.appendChild(emptyState("No fue posible cargar los repositorios en este momento."));
        grid.setAttribute("aria-busy", "false");
        setStatus("Error al consultar GitHub.", true);
      }
    }
  }

  load();
})();
