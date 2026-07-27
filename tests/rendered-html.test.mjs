import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

test("define la experiencia ciudadana neutral y atribuida", async () => {
  const [site, layout] = await Promise.all([
    readFile(new URL("../app/CampaignSite.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);
  const [identity, footer] = await Promise.all([
    readFile(new URL("../components/IdentitySection.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/Footer.tsx", import.meta.url), "utf8"),
  ]);
  const content = `${site}\n${layout}\n${identity}\n${footer}`;
  assert.match(content, /Pueblo Libre/i);
  assert.match(content, /23 propuestas/i);
  assert.match(content, /no\s+recomienda una opción electoral/i);
  assert.match(content, /Plan de Gobierno Municipal 2027/);
  assert.match(content, /Partido Morado/i);
  assert.match(content, /finalidad de identificación y\s+atribución/i);
  assert.doesNotMatch(content, /codex-preview/i);
  assert.doesNotMatch(content, /Vota por|marca la franja|elige a/i);
});

test("incluye las 23 fichas completas y consecutivas", async () => {
  const raw = await readFile(new URL("../data/propuestas.json", import.meta.url), "utf8");
  const proposals = JSON.parse(raw);
  assert.equal(proposals.length, 23);
  assert.deepEqual(
    proposals.map((proposal) => proposal.numero),
    Array.from({ length: 23 }, (_, index) => index + 1),
  );

  const required = [
    "id",
    "titulo",
    "categoria",
    "dimension",
    "diagnostico",
    "objetivo",
    "acciones",
    "metas",
    "viabilidad",
  ];
  for (const proposal of proposals) {
    for (const field of required) {
      assert.ok(
        Array.isArray(proposal[field])
          ? proposal[field].length > 0
          : String(proposal[field]).trim(),
        `Falta ${field} en propuesta ${proposal.numero}`,
      );
    }
  }
});

test("retiró el esqueleto inicial y agregó la tarjeta social", async () => {
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
  await access(new URL("../public/og-v2.jpg", import.meta.url));
  const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(packageJson, /portal-ciudadano-pueblo-libre/);
  await access(projectRoot);
});
