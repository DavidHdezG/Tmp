# Importar Schema al CMS (Directus)

Guía para replicar el schema de colecciones (`artists`, `events`) en cualquier instancia de Directus deployeada.

---

## Requisitos

- La instancia de Directus corriendo y accesible (ej. `https://acla-cms.bifrostcode.com`)
- Un token de API con rol **Administrator** (Settings → API Access → Create Token)
- El archivo `snapshot.json` exportado desde una instancia de Directus con el schema correcto

---

## Exportar el schema (desde una instancia con el schema)

Desde el Admin UI: **Settings → Data Model → ⋯ → Export Schema**

O via API:
```bash
curl -s https://TU_DIRECTUS_URL/schema/snapshot \
  -H "Authorization: Bearer TU_TOKEN" \
  -o snapshot.json
```

---

## Importar el schema (a una instancia nueva)

El proceso usa dos endpoints de la API de Directus: `/schema/diff` y `/schema/apply`.

### Paso 1 — Extraer el contenido del snapshot

El archivo exportado viene envuelto en `{"data": {...}}`. Hay que extraer el objeto interno:

```bash
node -e "const d=require('./snapshot.json');process.stdout.write(JSON.stringify(d.data))" > schema-data.json
```

### Paso 2 — Calcular el diff

Compara el snapshot contra el schema actual de la instancia destino:

```bash
curl -s -X POST https://TU_DIRECTUS_URL/schema/diff \
  -H "Authorization: Bearer TU_TOKEN" \
  -H "Content-Type: application/json" \
  -d @schema-data.json \
  -o schema-diff.json
```

### Paso 3 — Extraer el diff para aplicar

El endpoint `/schema/apply` requiere el objeto `data` de la respuesta anterior (que incluye el `hash`):

```bash
node -e "const d=require('./schema-diff.json');process.stdout.write(JSON.stringify(d.data))" > schema-apply.json
```

### Paso 4 — Aplicar el schema

```bash
curl -s -X POST https://TU_DIRECTUS_URL/schema/apply \
  -H "Authorization: Bearer TU_TOKEN" \
  -H "Content-Type: application/json" \
  -d @schema-apply.json
```

Una respuesta vacía o `{}` indica éxito.

### Paso 5 — Verificar

```bash
curl -s https://TU_DIRECTUS_URL/collections \
  -H "Authorization: Bearer TU_TOKEN" \
  -o collections.json

node -e "const d=require('./collections.json');console.log(d.data.map(c=>c.collection).filter(c=>!c.startsWith('directus_')).join(', '))"
```

Debe mostrar: `artists, events`

### Limpieza

```bash
rm schema-data.json schema-diff.json schema-apply.json collections.json
```

---

## Script completo (one-liner)

```bash
node -e "const d=require('./snapshot.json');process.stdout.write(JSON.stringify(d.data))" > schema-data.json && \
curl -s -X POST https://TU_DIRECTUS_URL/schema/diff \
  -H "Authorization: Bearer TU_TOKEN" \
  -H "Content-Type: application/json" \
  -d @schema-data.json \
  -o schema-diff.json && \
node -e "const d=require('./schema-diff.json');process.stdout.write(JSON.stringify(d.data))" > schema-apply.json && \
curl -s -X POST https://TU_DIRECTUS_URL/schema/apply \
  -H "Authorization: Bearer TU_TOKEN" \
  -H "Content-Type: application/json" \
  -d @schema-apply.json && \
echo "Schema aplicado correctamente"
```

---

## Colecciones del proyecto

| Colección | Campos |
|-----------|--------|
| `artists` | `id`, `status`, `name`, `type`, `bio`, `photo` (imagen), `website` |
| `events`  | `id`, `status`, `title`, `date`, `time`, `location`, `description`, `image` (imagen) |

---

## Permisos de lectura pública

Después de importar el schema, configurar permisos para que Astro pueda leer sin autenticación:

**Settings → Access Control → Public role:**
- `artists` → habilitar **Read**
- `events` → habilitar **Read**
- `directus_files` → habilitar **Read** (para que las imágenes sean accesibles)
