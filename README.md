# SEBASLW — Tech Premium Portfolio

Portafolio profesional de **Sebastián Felipe López Wilson** (Coordinador de Sistemas · Soporte TI, redes y desarrollo web).

Sitio estático hecho con HTML5, CSS3, Bootstrap 5.3, JavaScript vanilla, Google Fonts y Bootstrap Icons. No necesita compilación: se publica tal cual en GitHub Pages.

## Estructura

```text
portfolio-sebaslw/
├── index.html                 Página principal (todas las secciones)
├── assets/
│   ├── css/styles.css         Identidad visual SEBASLW
│   ├── js/config.js           ← DATOS EDITABLES: correo, teléfono, enlaces, categorías de repos
│   ├── js/main.js             Navegación, animaciones, botón volver arriba
│   ├── js/github.js           Galería conectada a la API pública de GitHub
│   ├── img/                   Foto, favicon, imagen Open Graph
│   │   ├── projects/          Capturas reales de proyectos (opcional)
│   │   └── certificates/      Imágenes de certificados (opcional, ver advertencia)
│   └── cv/CV_Sebastian_Lopez_Actualizado.pdf   Solo las 2 páginas del CV
├── favicon.ico
├── robots.txt
├── sitemap.xml
└── .nojekyll
```

## Editar datos

Todo lo que cambia con frecuencia está en `assets/js/config.js`:

| Qué | Dónde |
|---|---|
| Correo, ubicación | `contact.email`, `contact.location` |
| Mostrar teléfono | `contact.showPhone: true` (por defecto `false`) |
| GitHub, LinkedIn, ruta del CV | `links` |
| Categoría de cada repositorio | `github.categories` (`web`, `herramientas`, `aplicaciones`, `redes`) |
| Ocultar un repositorio | `github.hidden: ["nombre-del-repo"]` |
| Captura de un proyecto | `github.images: { "repo": "assets/img/projects/archivo.webp" }` |
| URL del sitio | `siteUrl` (además actualiza las etiquetas `canonical` y `og:` en `index.html`, `robots.txt` y `sitemap.xml`) |

Experiencia, formación y certificaciones están escritas directamente en `index.html` (mejor para SEO). Busca los comentarios `<!-- ============ SECCIÓN ============ -->`.

## Galería de GitHub

- Consulta `https://api.github.com/users/Sebaslw/repos` sin token.
- Muestra solo repositorios públicos propios (no forks).
- Guarda la respuesta 60 minutos en el navegador para no gastar el límite de 60 consultas/hora por IP.
- Si la API falla o se agota el límite: usa la última respuesta guardada; si no hay, usa la lista verificada de `config.js` (sin enlaces de demo) y un enlace al perfil.
- El botón **Demo** solo aparece si GitHub informa un `homepage` o GitHub Pages activo para ese repositorio.
- Los repositorios nuevos aparecen solos; clasifícalos en `github.categories`.

## Probar en tu computador

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
python -m http.server 8000
```

Luego visita `http://localhost:8000`. (Abrir `index.html` con doble clic también funciona, pero algunos navegadores limitan `fetch` en `file://`.)

## Publicar en GitHub Pages

### 1. Crear el repositorio
Recomendado: nombre **`Sebaslw.github.io`** (exactamente tu usuario + `.github.io`). Así el sitio queda en la raíz: `https://sebaslw.github.io/`.
Público, sin README inicial.

> Si usas otro nombre (por ejemplo `portfolio`), el sitio quedará en `https://sebaslw.github.io/portfolio/`. Todas las rutas son relativas, así que funciona igual; solo actualiza `siteUrl`, `canonical`, `og:url`, `og:image`, `robots.txt` y `sitemap.xml`.

### 2. Subir los archivos
**Desde la web:** en el repositorio → *Add file → Upload files* → arrastra **el contenido** de `portfolio-sebaslw/` (no la carpeta en sí; `index.html` debe quedar en la raíz) → *Commit changes*.

**Con Git:**
```bash
cd portfolio-sebaslw
git init
git add .
git commit -m "Portafolio SEBASLW"
git branch -M main
git remote add origin https://github.com/Sebaslw/Sebaslw.github.io.git
git push -u origin main
```

### 3. Configurar la rama de publicación y activar Pages
*Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save.*

### 4. Verificar la URL
Espera 1–3 minutos. La URL aparece arriba en *Settings → Pages* (“Your site is live at…”). La pestaña *Actions* muestra el progreso del despliegue.

### 5. HTTPS
En *Settings → Pages* marca **Enforce HTTPS** (en `github.io` viene activo).

### 6. Actualizar el sitio
Edita los archivos (en la web con el ícono del lápiz, o localmente y `git add . && git commit -m "..." && git push`). Pages se vuelve a publicar solo.

### 7. Dominio propio (futuro)
1. Compra el dominio (por ejemplo `sebaslw.dev`).
2. En *Settings → Pages → Custom domain* escribe el dominio y guarda (crea un archivo `CNAME`).
3. En el DNS de tu proveedor:
   - Registros **A** para `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Registro **CNAME** para `www` → `sebaslw.github.io`
4. Espera la propagación y activa **Enforce HTTPS**.
5. Actualiza `siteUrl`, etiquetas `canonical`/`og:`, `robots.txt` y `sitemap.xml` con el dominio nuevo.

## Privacidad

- El PDF publicado contiene **solo las 2 páginas del CV**. Los certificados del archivo original muestran tu número de documento y el certificado laboral muestra tu salario: no los publiques.
- Si agregas imágenes de certificados, difumina antes el número de cédula/T.I.
- El teléfono está oculto en la web hasta que pongas `showPhone: true`. Ten en cuenta que el CV en PDF sí lo incluye.

## Créditos técnicos
Bootstrap 5.3.3 y Bootstrap Icons 1.11.3 (jsDelivr, con integridad SRI en Bootstrap), fuentes Sora, Manrope y JetBrains Mono (Google Fonts).
