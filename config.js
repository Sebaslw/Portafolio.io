/**
 * CONFIGURACIÓN CENTRAL — SEBASLW Portfolio
 * ------------------------------------------------------------
 * Edita aquí tus datos de contacto, enlaces y la clasificación
 * de los repositorios. El resto del sitio lee estos valores.
 */
window.SITE_CONFIG = {
  name: "Sebastián Felipe López Wilson",
  brand: "SEBASLW",

  // URL definitiva del sitio (necesaria para Open Graph y sitemap).
  // Cámbiala si publicas en otra dirección o con dominio propio.
  siteUrl: "https://sebaslw.github.io/",

  contact: {
    email: "sebastianwilson03@hotmail.com",
    // El número aparece en tu CV. Solo se muestra si showPhone = true.
    phone: "+57 3175358547",
    phoneHref: "+573175358547",
    showPhone: false, // ← cambia a true solo si autorizas publicarlo
    location: "San Andrés Isla, Colombia"
  },

  links: {
    github: "https://github.com/Sebaslw",
    linkedin: "https://www.linkedin.com/in/sebasti%C3%A1n-felipe-l%C3%B3pez-wilson-652bb429a",
    cv: "CV_Sebastian_Lopez_Actualizado.pdf"
  },

  github: {
    user: "Sebaslw",
    cacheMinutes: 60,
    // Repositorios que no quieres mostrar (nombre exacto).
    hidden: [],
    // Categoría de cada repositorio. Los repos nuevos sin entrada se
    // clasifican automáticamente según su lenguaje.
    categories: {
      "desbord-it.guthub.io": "herramientas",
      "appfinanzas.github.io": "aplicaciones",
      "QR": "herramientas",
      "Laboratorio_CCNA_EIGRP-ASA": "redes"
    },
    // Captura real opcional por repositorio (ruta relativa).
    // Ej.: "appfinanzas.github.io": "assets/img/projects/appfinanzas.webp"
    images: {},
    // Respaldo si la API de GitHub no responde o se agota el límite.
    // Datos verificados en el perfil público el 20/10/2026.
    fallback: [
      { name: "desbord-it.guthub.io", description: "Mesa de Ayuda IT- COMPLETO", language: "JavaScript", html_url: "https://github.com/Sebaslw/desbord-it.guthub.io" },
      { name: "appfinanzas.github.io", description: "App de Finanzas- Pirfecional", language: "JavaScript", html_url: "https://github.com/Sebaslw/appfinanzas.github.io" },
      { name: "QR", description: "", language: "HTML", html_url: "https://github.com/Sebaslw/QR" },
      { name: "Laboratorio_CCNA_EIGRP-ASA", description: "Laboratorio CCNA CISCO", language: null, html_url: "https://github.com/Sebaslw/Laboratorio_CCNA_EIGRP-ASA" }
    ]
  },

  categoryLabels: {
    web: "Desarrollo web",
    herramientas: "Herramientas",
    aplicaciones: "Aplicaciones",
    redes: "Redes y laboratorios"
  }
};
