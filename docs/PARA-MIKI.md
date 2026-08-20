# Guía para Miki — GitHub sin saber programar

Esta página es para ti. No necesitas escribir código. Anthony (o Cursor con Anthony) se encargan de la parte técnica.

## Canal único para pedir cambios

**Todo pedido de cambio de campaña = un Issue en GitHub.**

No mandes solo WhatsApp suelto sin link. Si hablas por chat, pega el link del Issue.

👉 Crear pedido: https://github.com/tp00012x/projecto-municipal/issues/new/choose

Elige una plantilla:

| Plantilla | Úsala cuando… |
|-----------|----------------|
| **Cambiar texto** | Eslogan, propuesta, contacto, párrafos |
| **Cambiar foto o video** | Galería, portada, video del inicio |
| **Otro pedido de cambio** | Botones, orden, algo que no encaje arriba |

Anthony (o Cursor) toma el Issue → hace el cambio → te manda un **Pull Request** con un link de **Preview** (Vercel) para que lo veas en el celular sin instalar nada.

## Reglas de oro

1. **Nunca subas contraseñas** ni archivos `.env`.
2. **No borres** carpetas raras (`src`, `node_modules`, etc.).
3. **No uses “Force push”** ni botones que digan force / rebase.
4. **No hagas Merge a `main`** si no estás 100% seguro — mejor avisa a Anthony.
5. Si algo se ve mal, **captura + link del Preview** a Anthony.

## Flujo simple (el que vamos a usar)

```text
1. Tú abres un Issue (plantilla)
2. Anthony/Cursor hace el cambio en una rama
3. Sale un Pull Request + Preview de Vercel
4. Tú revisas el Preview en el celular
5. Anthony hace Merge → queda en la web oficial
```

## Dominio oficial

Sitio canónico: **https://mickyruiz.com**

Anthony configura en Vercel:
1. Domains → `mickyruiz.com` (+ www si hace falta)
2. Env Production → `NEXT_PUBLIC_SITE_URL=https://mickyruiz.com`
3. Redeploy
4. Search Console → sitemap `https://mickyruiz.com/sitemap.xml`

Detalle técnico: `docs/SEO.md`.

### Cómo revisar un Preview

1. Entra al Pull Request en GitHub.
2. Busca el comentario de **Vercel** con un link tipo `…vercel.app`.
3. Ábrelo en el celular y en la computadora.
4. Comenta en el PR: “Se ve bien” o “Cambia X”.

## Si quieres editar texto tú mismo (avanzado)

Solo con ayuda la primera vez:

1. Repo: https://github.com/tp00012x/projecto-municipal  
2. Archivo típico: `src/data/propuestas.json`  
3. Lápiz **Edit** → cambia solo texto entre comillas.  
4. Elige **Create a new branch** (`miki/cambio-…`) → abre Pull Request.  
5. Espera review / merge de Anthony.

Si el archivo se ve lleno de símbolos raros → **para y abre un Issue**.

## Dónde vive cada cosa (para pedir cambios)

| Quiero cambiar… | Dile / usa plantilla |
|-----------------|----------------------|
| Nombre, eslogan, correo | Issue → Cambiar texto |
| Texto de propuestas | Issue → Cambiar texto (+ número) |
| Fotos del equipo | Issue → Cambiar foto |
| Video del inicio | Issue → Cambiar foto o video |

## Permisos (importante)

- En GitHub puedes tener permiso de **escribir** (proponer cambios).
- **No** necesitas (ni debes tener) acceso a Vercel Environment Variables ni a la base de datos.
- La rama `main` está protegida: los cambios entran por Pull Request.

## Palabras útiles

| Palabra | Significado simple |
|---------|-------------------|
| **Issue** | Pedido / ticket de cambio |
| **Commit** | Guardar un cambio con un mensaje |
| **Branch** | Copia de trabajo para no romper la web en vivo |
| **Pull Request (PR)** | “Miren este cambio antes de publicarlo” |
| **Preview** | Copia temporal de la web con tu cambio |
| **Merge** | Aceptar el PR y pasarlo a la web oficial |
| **main** | Versión oficial publicada |

## Si Vercel dice “Build Failed”

No lo arregles solo. Manda el link del error a Anthony.

## Contacto

- Cambios de web → **Issue en GitHub** (este repo)  
- Contenido de campaña (qué decir) → tú decides; la implementación la hacemos contigo
