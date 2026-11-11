import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const root=process.cwd();
const html=readFileSync(join(root,'index.html'),'utf8');
const css=readFileSync(join(root,'styles.css'),'utf8');
const js=readFileSync(join(root,'js/site.js'),'utf8');
const configs=readFileSync(join(root,'js/config.js'),'utf8');
const ids=new Set([...html.matchAll(/\bid="([\w-]+)"/g)].map(x=>x[1]));
const missing=[...html.matchAll(/href="#([\w-]+)"/g)].map(x=>x[1]).filter(id=>!ids.has(id));
assert.deepEqual(missing,[],`Links internos quebrados: ${missing.join(', ')}`);
for(const [,filename] of html.matchAll(/\b(?:src|href)="\/?(images\/[^"?#]+|favicon\.svg|styles\.css|js\/[^"?#]+)"/g)){
 assert.ok(existsSync(join(root,filename)),`Arquivo ausente: ${filename}`);
}
for(const [,filename] of css.matchAll(/url\(['"]?\/?(images\/[^)'"?]+)['"]?\)/g)){
 assert.ok(existsSync(join(root,filename)),`Imagem CSS ausente: ${filename}`);
}
assert.match(css,/prefers-reduced-motion/);
assert.match(html,/lang="pt-BR"/);
assert.match(html,/name="description"/);
assert.match(js,/noopener noreferrer/);
assert.match(configs,/whatsappNumber: ''/);
assert.ok(!html.includes('Lorem ipsum'));
console.log('Verificações concluídas: links locais, imagens, SEO, acessibilidade e configurações.');
