// Generates og-image, apple-touch-icon, favicon and the small nav logo from public/logo.png.
import sharp from 'sharp';
import { site } from '../src/config/site.ts';

const logoB64 = (await sharp('public/logo.png').resize(176, 176).png().toBuffer()).toString('base64');

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#f5f8f8"/>
<rect x="60" y="60" width="1080" height="510" rx="28" fill="#ffffff" stroke="#dce5e5" stroke-width="2"/>
<image href="data:image/png;base64,${logoB64}" x="104" y="96" width="88" height="88"/>
<text x="210" y="152" font-family="Manrope, Helvetica, Arial, sans-serif" font-size="44" font-weight="800" fill="#0e1e1f">${site.name}</text>
<text x="110" y="330" font-family="Manrope, Helvetica, Arial, sans-serif" font-size="78" font-weight="800" letter-spacing="-2" fill="#0e1e1f">Every taka collected.</text>
<text x="110" y="420" font-family="Manrope, Helvetica, Arial, sans-serif" font-size="78" font-weight="800" letter-spacing="-2" fill="#0f766e">Every taka accounted for.</text>
<text x="110" y="500" font-family="Manrope, Helvetica, Arial, sans-serif" font-size="30" font-weight="500" fill="#4f6567">Offline-first donations and expenses for community committees</text>
</svg>`;

await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile('public/og-image.png');
await sharp('public/logo.png').resize(180, 180).flatten({ background: '#ffffff' }).png().toFile('public/apple-touch-icon.png');
await sharp('public/logo.png').resize(64, 64).png().toFile('public/favicon.png');
await sharp('public/logo.png').resize(96, 96).png().toFile('public/logo-nav.png');
console.log('images written');
