# SEO — checklist para rankear (Micky / Pueblo Libre)

Sin estos pasos de ops, el código SEO no indexa bien.

## 1. URL canónica en Vercel (obligatorio)

Project → Settings → Environment Variables → Production:

```text
NEXT_PUBLIC_SITE_URL=https://TU-DOMINIO-FINAL
```

Ejemplos:

- Custom: `https://pueblolibre2030.pe`
- Mientras tanto: `https://projecto-municipal.vercel.app` (el dominio real del proyecto)

Sin slash final. Redeploy después de guardar.

## 2. Google Search Console

1. Entrá a https://search.google.com/search-console
2. Agregá la propiedad del dominio (o URL prefix = `NEXT_PUBLIC_SITE_URL`)
3. Verificá (DNS o meta tag / HTML file)
4. Sitemaps → enviá: `https://TU-DOMINIO/sitemap.xml`
5. Pedí indexación de la home y de 2–3 fichas `/propuestas/...`

## 3. Probar shares (WhatsApp / Facebook)

Después del deploy:

- https://www.opengraph.xyz/ → pegá la URL canónica
- Mandate un WhatsApp a vos mismo con el link (debería verse título + imagen 1200×630)

## 4. Bing (opcional, 5 min)

https://www.bing.com/webmasters → importar desde Google si ya verificaste GSC.

## 5. Qué hizo el código (para no re-pedirlo)

| Pieza | Dónde |
|-------|--------|
| Title / description candidato-first | `src/data/site.ts` → `siteSeo` |
| Canonical estable | `getSiteUrl()` en layout |
| JSON-LD Person + ItemList + FAQ | `src/lib/seo-schema.ts` |
| Fichas crawlables | `/propuestas/[slug]` + sitemap (1+24) |
| OG liviano | `/og.jpg` 1200×630 |
| H1 con Micky + Pueblo Libre | `Hero.tsx` |

## 6. No inventar

No agregues `sameAs` (Instagram/TikTok) ni dirección física en schema hasta tener URLs/NAP reales de campaña.
