# Larissa Lima — Nutricionista | Método Agapi

Landing page editorial com **nove seções**, animações suaves, navegação mobile e integração de contato configurável.

## Rodar localmente

Requisitos: **Node.js 18+**. Não há bibliotecas externas nem instalação necessária.

```bash
npm run dev
```

Abra `http://127.0.0.1:4173` no navegador.

## Testes e build

```bash
npm run lint
npm test
npm run build
```

Os arquivos prontos para a Vercel serão produzidos em `dist/`. O projeto é **HTML/CSS/JavaScript sem framework**, uma escolha deliberada: como o repositório conectado estava vazio, esta versão não exige instalação de dependências, funciona com hospedagem estática e é fácil de executar. Caso deseje preservar ou integrar uma versão Next.js já desenvolvida localmente, **não substitua automaticamente os arquivos anteriores**: compare-os primeiro.

## Publicação na Vercel

1. Envie esta pasta para um repositório GitHub ou faça upload como projeto.
2. Importe para Vercel, framework **Other**. `vercel.json` já configura o comando `npm run build` e diretório de saída `dist`.
3. Antes da publicação, valide os dados oficiais da Larissa e inclua as fotos, CRN e número de WhatsApp.
4. Não há envio de formulários, uso de cookies de análise ou armazenamento de dados pessoais neste projeto.

**Nenhuma publicação em produção foi realizada.**

## Configuração principal

Edite `js/config.js`:

- `whatsappNumber`: dígitos com DDI+DDD, sem símbolos. Enquanto vazio, os botões de contato levam ao Instagram confirmado no briefing; o texto do botão final muda automaticamente para "Conversar no Instagram".
- `whatsappMessage`: mensagem pré-preenchida.
- `crn`: registro confirmado da Larissa; se vazio, não é exibido.
- `profilePhoto`: caminho para a fotografia real autorizada, atualmente `images/larissa-lima.webp`. O site insere a foto automaticamente apenas na seção Sobre Larissa.
- `instagramUrl`: contato oficial.
- `siteUrl`: URL definitiva, para tag canonical e imagem Open Graph; o ideal é escrever essas URLs diretamente no HTML antes de lançar, pois alguns robôs sociais não executam JavaScript.

## Substituir fotografias

As quatro imagens de alimentos, em `images/`, foram **geradas por IA para este projeto**, e são ilustrativas. Não representam os pratos, pacientes ou trabalho real da nutricionista. A foto recebida foi otimizada e salva em `images/larissa-lima.webp`, configurada em `profilePhoto`. Use fotos otimizadas em `.webp` (preferência 1000–1400px de largura). Verifique enquadramentos em desktop e celular.

## Revisões obrigatórias antes do lançamento

- Aprovar os textos da biografia e a caracterização dos pilares do Método Agapi.
- Aprovar as etapas reais de atendimento (duração e frequência não foram inventadas).
- Informar WhatsApp oficial e CRN.
- A foto enviada já foi adicionada à seção Sobre; confirmar com a profissional se deseja usá-la também em outras áreas.
- Confirmar domínio e meta tags de compartilhamento.
- Somente adicionar depoimentos reais quando houver autorização expressa e conformidade com as regras aplicáveis. Atualmente há mensagem institucional, **sem avaliações fictícias**.
- Confirmar que o registro profissional e a publicidade estão adequados às normas do CFN/CRN.

## Organização

- `index.html` — seções e textos editáveis.
- `styles.css` — identidade, tipografia, layout e movimento.
- `js/config.js` — dados pessoais e contatos configuráveis.
- `js/site.js` — menu, scroll, reveal, foto, WhatsApp/Instagram.
- `images/` — fotografia editorial de alimentos.
- `tests/` — testes com `node:test`.
- `scripts/` — servidor local, validação e build.

O site usa fontes Google Fonts em tempo de execução, com fallback serif/sans; não há outras requisições de terceiros além dos links externos do Instagram/WhatsApp.

### Estado dos testes nesta entrega

As verificações de código, dez testes automatizados, build e respostas HTTP dos recursos locais passaram. **Não foi possível concluir uma inspeção visual com capturas de tela do Chromium neste ambiente**; revise os enquadramentos e a ausência de rolagem horizontal no navegador antes do lançamento.
