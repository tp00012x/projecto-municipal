/**
 * Regenerates favicons from the official Partido Morado asset
 * (public/branding/partido-morado-favicon.jpg).
 * Run: node scripts/generate-favicons.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(root, "public");
const appDir = path.join(root, "src/app");
const source = path.join(publicDir, "branding/partido-morado-favicon.jpg");
const PURPLE = { r: 91, g: 16, b: 139 };

function createIco(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const parts = [header];
  let offset = 6 + count * 16;

  for (const { size, png } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    parts.push(entry);
    offset += png.length;
  }

  for (const { png } of pngBuffers) parts.push(png);
  return Buffer.concat(parts);
}

/** Top portion of the official asset: purple M block without wordmark. */
async function extractMSymbol() {
  const trimmed = await sharp(source).trim({ threshold: 18 }).toBuffer();
  const { width, height } = await sharp(trimmed).metadata();
  if (!width || !height) throw new Error("Could not read logo dimensions");

  const iconHeight = Math.round(height * 0.62);
  const squareSide = Math.max(width, iconHeight);
  const bottomPad = squareSide - iconHeight;

  return sharp(trimmed)
    .extract({ left: 0, top: 0, width, height: iconHeight })
    .extend({
      top: 0,
      bottom: bottomPad,
      left: 0,
      right: Math.max(0, squareSide - width),
      background: PURPLE,
    })
    .png()
    .toBuffer();
}

async function buildSymbolSquare(size) {
  const symbol = await extractMSymbol();
  return sharp(symbol)
    .resize(size, size, { fit: "cover", position: "centre" })
    .ensureAlpha()
    .png()
    .toBuffer();
}

if (!fs.existsSync(source)) {
  console.error("Missing source:", source);
  process.exit(1);
}

const master512 = await buildSymbolSquare(512);
await sharp(master512).toFile(path.join(publicDir, "icon-512.png"));
await sharp(master512).resize(192, 192).toFile(path.join(publicDir, "icon-192.png"));
await sharp(master512)
  .resize(180, 180)
  .toFile(path.join(publicDir, "apple-touch-icon.png"));
await sharp(master512)
  .resize(32, 32)
  .toFile(path.join(publicDir, "favicon-32x32.png"));
await sharp(master512)
  .resize(16, 16)
  .toFile(path.join(publicDir, "favicon-16x16.png"));

const icoSizes = [16, 32, 48];
const pngBuffers = [];
for (const size of icoSizes) {
  pngBuffers.push({
    size,
    png: await sharp(master512).resize(size, size).ensureAlpha().png().toBuffer(),
  });
}

const faviconIco = createIco(pngBuffers);
fs.writeFileSync(path.join(publicDir, "favicon.ico"), faviconIco);

await sharp(master512).png().toFile(path.join(appDir, "icon.png"));
await sharp(master512)
  .resize(180, 180)
  .png()
  .toFile(path.join(appDir, "apple-icon.png"));

console.log("Favicons generated from official Partido Morado asset");
