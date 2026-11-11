import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {join} from 'node:path';
const root=process.cwd();
const html=readFileSync(join(root,'index.html'),'utf8');
const css=readFileSync(join(root,'styles.css'),'utf8');
const js=readFileSync(join(root,'js/site.js'),'utf8');
const config=readFileSync(join(root,'js/config.js'),'utf8');
test('nove seções do briefing presentes',()=>{
 for(const label of ['HERO','FAIXA CONTÍNUA','SOBRE','MÉTODO','COMIDA','ATENDIMENTO','RELATOS','CONTATO','FOOTER']) assert.ok(html.includes(label),label);
});
test('âncoras do menu apontam para IDs reais',()=>{
 const ids=new Set([...html.matchAll(/\bid="([\w-]+)"/g)].map(x=>x[1]));
 for(const [,anchor] of html.matchAll(/href="#([\w-]+)"/g)) assert.ok(ids.has(anchor),anchor);
});
test('marquee contínuo com duas sequências equivalentes',()=>{
 const tracks=[...html.matchAll(/<div class="ticker-group">([\s\S]*?)<\/div>/g)].map(x=>x[1]);
 assert.equal(tracks.length,2);assert.equal(tracks[0],tracks[1]);
});
test('redução de movimento respeitada',()=>assert.match(css,/prefers-reduced-motion:reduce/));
test('sem depoimentos fictícios',()=>{
 assert.ok(html.includes('NUTRIÇÃO COM PROPÓSITO'));assert.ok(!html.includes('Maria, paciente'));
});
test('dados confidenciais não inventados',()=>{
 assert.match(config,/whatsappNumber: ''/);assert.match(config,/crn: ''/);
});
test('foto autorizada está vinculada apenas à seção Sobre',()=>{
 assert.match(config,/profilePhoto: 'images\/larissa-lima\.webp'/);
 assert.ok(existsSync(join(root,'images/larissa-lima.webp')));
 assert.doesNotMatch(js,/hero\.src = source/);
});
test('fallback de contato mantém navegação útil',()=>{
 assert.match(js,/https:\/\/wa\.me\//);assert.match(js,/instagramUrl/);assert.match(html,/data-contact-link/);
});
test('imagens locais presentes',()=>{
 for(const image of ['cafe-da-manha','frutas-granola','bowl-colorido','massa-caseira']) assert.ok(existsSync(join(root,`images/${image}.webp`)));
});
test('menu acessível a teclado e leitores de tela',()=>{
 assert.match(html,/aria-expanded="false"/);assert.match(js,/Escape/);assert.match(js,/menu\.inert/);
});
