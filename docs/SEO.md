# SEO — checklist para rankear (Micky / Pueblo Libre)

Sin estos pasos de ops, el código SEO no indexa bien.

## 1. Dominio canónico (obligatorio)

### Vercel → Domain
Project → Settings → Domains → agregá:
- `mickyruiz.com`
- `www.mickyruiz.com` (redirect a apex, o al revés — elegí uno)

### Vercel → Environment Variables → Production

```text
NEXT_PUBLIC_SITE_URL=https://mickyruiz.com
```

Sin slash final. **Redeploy** después de guardar.

Mientras el dominio no esté Valid, podés usar el `.vercel.app` temporal, pero el canónico final debe ser `https://mickyruiz.com`.

## 2. Google Search Console

1. Entrá a https://search.google.com/search-console
2. Agregá la propiedad del dominio `mickyruiz.com` (DNS) o URL prefix `https://mickyruiz.com`
3. Verificá
4. Sitemaps → enviá: `https://mickyruiz.com/sitemap.xml`
5. Pedí indexación de la home y de 2–3 fichas `/propuestas/...`

## 3. Probar shares (WhatsApp / Facebook)

Después del deploy:

- https://www.opengraph.xyz/ → pegá `https://mickyruiz.com`
- Mandá un WhatsApp a vos mismo con el link (título + imagen 1200×630)

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
| Filtros shareables | `?categoria=&q=&orden=` en galería |
| Share nativo en fichas | `ProposalFichaChrome` |

## 6. No inventar

No agregues `sameAs` (Instagram/TikTok) ni dirección física en schema hasta tener URLs/NAP reales de campaña.
