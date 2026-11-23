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
  siteUrl: "https://sebaslw.github.io/Portafolio.io/",

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
    // pk-pentecostal.io se omite porque ya está en la sección destacada.
    hidden: ["Portafolio.io", "pk-pentecostal.io"],
    // Categoría de cada repositorio. Los repos nuevos sin entrada se
    // clasifican automáticamente según su lenguaje.
    categories: {
      "PK-PENTECOSTAL": "aplicaciones",
      "pk-pentecostal.io": "web",
      "desbord-it": "herramientas",
      "appfinanzas.github.io": "aplicaciones",
      "QR": "herramientas",
      "Laboratorio_CCNA_EIGRP-ASA": "redes"
    },
    // Captura real opcional por repositorio (ruta relativa).
    // Ej.: "appfinanzas.github.io": "assets/img/projects/appfinanzas.webp"
    images: {
      "PK-PENTECOSTAL": "assets/img/projects/pk-pentecostal-card.webp",
      "desbord-it": "assets/img/projects/desbord-it.webp",
      "appfinanzas.github.io": "assets/img/projects/appfinanzas.webp",
      "QR": "assets/img/projects/qr.webp",
      "Laboratorio_CCNA_EIGRP-ASA": "assets/img/projects/ccna-topologia.webp"
    },
    // Respaldo si la API de GitHub no responde o se agota el límite.
    // Datos verificados en el perfil público el 23/11/2026.
    fallback: [
      { name: "PK-PENTECOSTAL", description: "Software gratuito para iglesias: Biblia, canciones y rótulos para proyector y OBS Studio, con control desde el celular.", language: "JavaScript", html_url: "https://github.com/Sebaslw/PK-PENTECOSTAL" },
      { name: "desbord-it", description: "Help Desk IT multisede: tickets con deduplicación, clasificación, SLA, alertas, reportes y permisos. Demo 100% en el navegador (HTML, CSS y JavaScript).", language: "JavaScript", html_url: "https://github.com/Sebaslw/desbord-it" },
      { name: "appfinanzas.github.io", description: "App web de finanzas personales en pesos colombianos: ingresos, gastos, presupuestos, ahorro, deudas, gráficos y exportación a Excel, CSV y PDF.", language: "JavaScript", html_url: "https://github.com/Sebaslw/appfinanzas.github.io" },
      { name: "QR", description: "Generador de códigos QR para texto, enlaces y redes WiFi, con descarga de la imagen.", language: "CSS", html_url: "https://github.com/Sebaslw/QR" },
      { name: "Laboratorio_CCNA_EIGRP-ASA", description: "Laboratorio CCNA en Cisco Packet Tracer: enrutamiento EIGRP y firewall Cisco ASA, con informe técnico de arquitectura de red segura.", language: null, html_url: "https://github.com/Sebaslw/Laboratorio_CCNA_EIGRP-ASA" }
    ]
  },

  categoryLabels: {
    web: "Desarrollo web",
    herramientas: "Herramientas",
    aplicaciones: "Aplicaciones",
    redes: "Redes y laboratorios"
  }
};
