# SEO — Tareas Pendientes

> Auditado el 2026-04-23. Las mejoras técnicas (robots.txt, sitemap, schema, titles, preconnect) ya están implementadas en el código. Las tareas aquí requieren acciones externas o decisiones de contenido.

---

## Alta Prioridad

### 1. Registrar en Google Search Console
**Por qué:** Es la acción de mayor ROI inmediato. Sin GSC, no hay visibilidad de indexación, errores de crawl, ni performance por keyword.

**Pasos:**
1. Entrar a https://search.google.com/search-console
2. Agregar propiedad → URL prefix → `https://aclatx.org`
3. Verificar via HTML tag (pegar en `BaseLayout.astro` dentro de `<head>`) o via DNS record
4. Una vez verificado: ir a Sitemaps → ingresar `https://aclatx.org/sitemap.xml` → Submit
5. Revisar Coverage report en ~48h para detectar páginas con errores

---

### 2. Crear OG Image (Open Graph Image)
**Por qué:** La imagen OG actual es el logo negro sobre fondo blanco, muy pequeño. LinkedIn, Facebook y WhatsApp la muestran al compartir el link — una imagen mal diseñada reduce el CTR.

**Especificaciones:**
- Tamaño: **1200 × 630px**
- Debe incluir: logo ACLA, nombre completo, tagline corto ("Empowering Latino Arts in the Texas Panhandle"), colores de marca (naranja #ff8c3a)
- Guardar en: `public/og-image.jpg` (JPG optimizado, < 200KB)

**Implementación una vez lista:**
```astro
<!-- En BaseLayout.astro, cambiar el default de ogImage: -->
ogImage = '/og-image.jpg',
```

---

## Media Prioridad

### 3. Google Business Profile
**Por qué:** ACLA es una organización local en Amarillo, TX. GBP aparece en el Knowledge Panel de Google y en Google Maps — visibilidad gratuita crítica para ONGs locales.

**Pasos:**
1. Ir a https://business.google.com
2. Crear perfil: nombre "Amarillo Council for the Latino Arts", categoría "Non-profit organization"
3. Dirección: Amarillo, TX (usar dirección real si es pública)
4. Añadir fotos, horarios, descripción, y el link a aclatx.org
5. Verificar via postal o teléfono

---

### 4. Ampliar Meta Description — Artists Page
**Por qué:** La descripción actual es solo 93 caracteres. Google muestra hasta ~155 — espacio desperdiciado para persuadir al click.

**Actual (93 chars):**
> "Meet the talented Latino and non-Latino artists creating incredible work in Amarillo and the Texas Panhandle."

**Sugerida (148 chars):**
> "Discover talented Latino artists in Amarillo, Texas — dancers, musicians, muralists, and more. Supported by ACLA through scholarships and exhibitions."

**Archivo:** `src/pages/artists.astro` → prop `description` en `<BaseLayout>`

---

### 5. Ampliar Meta Description — About Page
**Actual:** usa el default del layout (genérico).

**Sugerida:**
> "Learn about the Amarillo Council for the Latino Arts — our mission to preserve Latino culture, support artists with scholarships, and build community through the arts in Texas."

**Archivo:** `src/pages/about.astro` → agregar prop `description` en `<BaseLayout>`

---

## Baja Prioridad (Largo Plazo)

### 6. Páginas individuales de artistas y eventos
**Por qué:** Actualmente `/events` y `/artists` son listas sin URLs individuales. Cada evento/artista con su propia URL (`/events/spring-festival`, `/artists/maria-gonzalez`) multiplica las páginas indexables y permite Event schema individual con fechas exactas.

**Requiere:**
- Agregar colecciones con slug en Directus
- Crear `src/pages/events/[slug].astro` y `src/pages/artists/[slug].astro`
- Actualizar `sitemap.xml` para incluirlas (o migrar a `@astrojs/sitemap` dinámico)

---

### 7. Bing Webmaster Tools
**Por qué:** Bing tiene ~6% de market share en EEUU — no es despreciable para una audiencia americana.

**Pasos:**
1. Ir a https://www.bing.com/webmasters
2. Importar desde Google Search Console (importa el sitemap automáticamente)
3. Verificar con meta tag

---

### 8. Actualizar sitemap.xml cuando se agreguen páginas individuales
**Archivo:** `public/sitemap.xml`

Cuando se creen páginas de artistas y eventos individuales, actualizar el sitemap o migrar a generación dinámica con un endpoint Astro en `src/pages/sitemap.xml.ts`.

---

## Referencia — Cambios ya implementados

| Qué | Archivo |
|-----|---------|
| `robots.txt` | `public/robots.txt` |
| `sitemap.xml` | `public/sitemap.xml` |
| Organization JSON-LD | `src/layouts/BaseLayout.astro` |
| Event JSON-LD (dinámico desde Directus) | `src/pages/events.astro` |
| `rel="preconnect"` Google Fonts | `src/layouts/BaseLayout.astro` |
| `og:locale`, `og:site_name`, `apple-touch-icon` | `src/layouts/BaseLayout.astro` |
| Titles con keywords + localización | Todas las páginas |
