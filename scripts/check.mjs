import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';
import { pages } from '../src/views.mjs';
import { site } from '../src/content.mjs';
import { contentSecurityPolicy, referrerPolicy, securityHeaders } from '../src/security.mjs';

const preview = process.env.QALYON_PUBLIC_BUILD !== '1';
const origin = preview ? site.previewOrigin : process.env.QALYON_SITE_ORIGIN;
const titles = new Set();
const descriptions = new Set();
const files = new Map();

function read(path) {
  if (!files.has(path)) {
    files.set(path, readFile(join('dist', path, path.endsWith('/') ? 'index.html' : '')));
  }
  return files.get(path);
}

for (const page of pages) {
  const html = await read(page.path).then(file => file.toString('utf8'));
  const indexable = !preview && page.indexable !== false;
  assert.equal([...html.matchAll(/<h1\b[^>]*>/g)].length, 1, page.path);
  assert.ok(html.includes('lang="pt-BR"'), page.path);
  assert.ok(html.includes(`name="robots" content="${indexable ? 'index,follow' : 'noindex,nofollow'}"`), page.path);
  assert.equal(html.includes('rel="canonical"'), indexable, page.path);
  if (indexable) assert.ok(html.includes(`rel="canonical" href="${origin + page.path}"`), page.path);
  assert.ok(html.includes(`property="og:url" content="${origin + page.path}"`), page.path);
  assert.ok(html.includes(`content="${contentSecurityPolicy}"`), page.path);
  assert.ok(html.includes(`name="referrer" content="${referrerPolicy}"`), page.path);
  assert.ok(!titles.has(page.title), 'Título duplicado: ' + page.title);
  assert.ok(!descriptions.has(page.description), 'Descrição duplicada: ' + page.path);
  titles.add(page.title);
  descriptions.add(page.description);
  assert.match(html, /<meta name="description" content="[^"]+">/, page.path);
  assert.doesNotMatch(html, /<(?:script|img|link\b(?! rel="canonical"))\b[^>]*(?:src|href)="(?:https?:)?\/\//i, page.path);
  assert.doesNotMatch(html, /\b(?:href|src)="\s*(?:javascript|data|http):/i, page.path);

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(([, id]) => id);
  assert.equal(new Set(ids).size, ids.length, 'ID duplicado: ' + page.path);
  for (const [, id] of html.matchAll(/<label for="([^"]+)"/g)) assert.ok(ids.includes(id), 'Campo sem destino: ' + id);

  const references = [...html.matchAll(/(?:href|src)="([/#][^"]*)"|srcset="([^"]*)"/g)]
    .flatMap(([, path, srcset]) => path ? [path] : srcset.split(',').map(item => item.trim().split(' ')[0]));
  for (const reference of references) {
    const url = new URL(reference, origin + page.path);
    assert.equal(url.origin, origin, 'Recurso local com origem externa: ' + reference);
    const resource = await read(url.pathname);
    if (url.hash && url.pathname.endsWith('/')) {
      assert.ok(resource.includes(Buffer.from(` id="${decodeURIComponent(url.hash.slice(1))}"`)), 'Âncora inexistente: ' + reference);
    }
  }
  for (const [image] of html.matchAll(/<img\b[^>]*>/gs)) {
    assert.match(image, /\balt="[^"]*"/);
    assert.match(image, /\bwidth="\d+"/);
    assert.match(image, /\bheight="\d+"/);
  }
}

const home = (await read('/')).toString();
assert.ok(home.includes(site.slogan));
assert.doesNotMatch(home, /hero-\d|loop-\d/);
const hero = home.match(/<section class="hero-stage">[\s\S]*?<\/section>/)[0];
const heroImages = [...hero.matchAll(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/g)];
assert.deepEqual(heroImages.map(([, src]) => src), ['/assets/qalyon-symbol.webp']);
assert.match(home, /<canvas id="neural-canvas"/);
assert.doesNotMatch(home, /<video\b|\.mp4/);
await read('/assets/neural.js');

const form = (await read('/contato/')).toString();
assert.match(form, /<form id="quote-form" data-whatsapp-url="(?:https:\/\/wa\.me\/\d+)?" data-email-url="mailto:[^"?]+"/);
assert.match(form, /id="quote-review" type="submit" disabled/);
for (const id of ['name', 'reply', 'service', 'goal', 'deadline', 'reference']) {
  assert.ok(form.includes('<label for="' + id + '">'), 'Campo sem rótulo: ' + id);
}

const robots = (await read('/robots.txt')).toString();
const headers = (await read('/_headers')).toString();
for (const [name, value] of Object.entries(securityHeaders)) assert.ok(headers.includes(`${name}: ${value}`));
assert.equal(headers.includes('X-Robots-Tag: noindex, nofollow'), preview);
for (const path of ['/404.html', '/privacidade.html']) {
  const html = (await read(path)).toString();
  assert.match(html, /name="robots" content="noindex,nofollow"/, path);
  assert.doesNotMatch(html, /rel="canonical"/, path);
}
if (preview) {
  assert.match(robots, /Disallow: \/\n/);
  await assert.rejects(read('/sitemap.xml'), { code: 'ENOENT' });
} else {
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
  const sitemap = (await read('/sitemap.xml')).toString();
  const URLs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url);
  assert.deepEqual(URLs, pages.filter(page => page.indexable !== false).map(page => origin + page.path));
}

console.log(`${pages.length} rotas validadas: metadados, links, âncoras, imagens, formulários e segurança da saída estática.`);
for (const file of ['/index.html', '/assets/tokens.css', '/assets/styles.css', '/assets/contact.js']) {
  const data = await read(file);
  console.log(`${file}: ${data.length} bytes, ${gzipSync(data).length} bytes em gzip local`);
}
