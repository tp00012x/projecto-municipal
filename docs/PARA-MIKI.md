# Guía para Miki — GitHub sin saber programar

Esta página es para ti. No necesitas escribir código. Anthony (o Cursor con Anthony) se encargan de la parte técnica.

## Qué es este proyecto

La web de campaña **Pueblo Libre para todos**. Los cambios se suben a GitHub y Vercel los publica.

Repo: https://github.com/tp00012x/projecto-municipal

## Reglas de oro

1. **Nunca subas contraseñas** ni archivos que digan `.env`.
2. **No borres** carpetas raras (`src`, `node_modules`, etc.) aunque no las entiendas.
3. **No uses “Force push”** ni botones que digan “force” o “rebase” si no estás seguro.
4. Si algo se ve mal, **no paniques**: escribe a Anthony con una captura.

## Flujo simple (recomendado)

### Opción A — Tú pides, Anthony/Cursor lo hace

1. Dile qué quieres cambiar (texto, foto, propuesta).
2. Él abre un **Pull Request** (una propuesta de cambio).
3. Tú revisas en GitHub: pestaña **Files changed** / archivos cambiados.
4. Si se ve bien, Anthony hace **Merge** (unir a la web).

### Opción B — Tú editas texto en GitHub (avanzado, con cuidado)

Solo para textos, y mejor con ayuda la primera vez:

1. Entra al repo en GitHub.
2. Abre `src/data/propuestas.json` (propuestas) o pregunta antes de tocar otra cosa.
3. Usa el lápiz **Edit**.
4. Cambia solo el texto entre comillas.
5. Abajo elige **Create a new branch** y pon un nombre como `miki/cambio-propuesta-3`.
6. Abre el Pull Request.
7. Espera a que Anthony revise y haga merge.

Si el archivo se ve lleno de símbolos raros y no estás seguro, **para y avisa**.

## Dónde vive cada cosa (para pedir cambios)

| Quiero cambiar… | Dile a Anthony / Cursor |
|-----------------|-------------------------|
| Nombre, eslogan, correo | `site.ts` |
| Texto de propuestas | `propuestas.json` |
| Fotos del equipo | carpeta `public/gallery` |
| Video del inicio | solo versión web en `public/videos` |

## Palabras útiles

| Palabra | Significado simple |
|---------|-------------------|
| **Commit** | Guardar un cambio con un mensaje |
| **Branch** | Una copia de trabajo para no romper la web en vivo |
| **Pull Request (PR)** | Pedido de “miren este cambio antes de publicarlo” |
| **Merge** | Aceptar el PR y pasarlo a la web principal |
| **main** | La versión oficial que se publica |

## Si Vercel dice “Build Failed”

No intentes arreglarlo solo. Manda el enlace del error a Anthony.

## Contacto

Dudas de GitHub o de la web → Anthony.  
Contenido de campaña (qué decir) → tú decides; la implementación la hacemos contigo.
