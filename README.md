# Qalyon Institucional v2.13.0

Site estático em português do Brasil, gerado com Node.js. O catálogo apresenta os serviços da Qalyon, suas demonstrações e o estágio do Atlas. As cenas da home usam Canvas e OGL, com recursos hospedados no próprio site.

## Rodar e editar

Use Node.js 24, a versão usada no GitHub Actions.

```sh
npm ci
npm run build
npm run check
python3 -m http.server 8000 --directory dist
```

Abra `http://localhost:8000/`. Refaça o build depois de editar o código. O servidor local simples serve a saída estática e não aplica os cabeçalhos HTTP de `dist/_headers`.

| Quero mudar | Onde editar |
| --- | --- |
| Marca, menu, contatos, serviços e produtos | `src/content.mjs` |
| Registrar uma rota, título, descrição ou arquivos específicos | `src/views.mjs` |
| Cabeçalho, rodapé e metadados comuns | `src/layout.mjs` |
| Componentes HTML reutilizados pelas páginas | `src/components.mjs` |
| Home, Serviços, Produtos, Projetos, Sobre ou Contato | Arquivo da área em `src/pages/` |
| Privacidade, acessibilidade e informações de uso | `src/pages/information.mjs` |
| Conteúdo de catálogos e maquetes | `src/*-demos.mjs`, `src/services-catalog.mjs`, `src/work-gallery.mjs` |
| Paleta, layout global e estilo de cada página | `src/assets/tokens.css`, `src/assets/styles.css` e o CSS da rota |
| Formulário, filtros, movimento e cenas | `src/assets/*.js` e `src/scenes/` |
| Política de segurança, geração e validações | `src/security.mjs` e `scripts/` |

Use slugs estáveis para serviços e demonstrações. Atualize o menu somente se a rota precisar aparecer na navegação principal. Para imagens novas, prefira WebP e defina dimensões para evitar saltos de layout. Descreva imagens informativas no atributo `alt` e deixe o `alt` vazio para as decorativas.

## Prévia, produção e SEO

O build padrão é de prévia. As páginas emitem `noindex,nofollow`, a prévia não publica sitemap e o `robots.txt` bloqueia o rastreio. No Sites, o acesso exige autenticação pela configuração do projeto.

Quando o domínio oficial e a abertura pública estiverem definidos, gere a saída para esse domínio:

```sh
export QALYON_PUBLIC_BUILD=1
export QALYON_SITE_ORIGIN=https://seu-dominio-confirmado.example
npm run build
npm run check
```

O build de produção emite URLs canônicas, metadados sociais e sitemap do domínio informado. Essas variáveis não alteram o acesso do projeto, DNS ou o estado de publicação. No host definitivo, verifique a resposta HTTP de páginas válidas e inexistentes, os cabeçalhos efetivamente servidos e a disponibilidade do sitemap antes de enviá-lo aos buscadores.

Regere `dist/` a partir do mesmo código que será versionado e publique pelo projeto existente. Verifique um link de serviço com briefing pré-selecionado e a rota de privacidade após publicar. Se uma alteração causar regressão, restaure a última versão estável no host e corrija o código em um novo commit.

## Briefing, privacidade e segurança

O formulário monta e revisa o briefing localmente. O visitante escolhe copiar o texto, abrir o WhatsApp ou abrir o aplicativo de e-mail. A aplicação não recebe o formulário nem usa rastreadores. A preferência de movimento é armazenada em `sessionStorage`. Para incluir envio direto, analytics ou outra integração, reveja os dados transmitidos, a base legal, o aviso de privacidade e a política de segurança antes de publicar.

A política de conteúdo limita scripts, estilos, imagens e fontes a arquivos locais, bloqueia submissão HTML e proíbe objetos incorporados. `src/security.mjs` é a fonte comum para o HTML e `dist/_headers`. A restrição de enquadramento e os demais cabeçalhos HTTP dependem da configuração efetiva do host. Nunca coloque segredos em `src/` ou `dist/`.

O aviso usa o canal comercial atual para solicitações de privacidade. Antes do lançamento público, valide a identificação legal do responsável, as regras de retenção nos canais, o papel dos provedores e eventual transferência internacional. Se o site passar a ser meio de oferta ou contratação eletrônica de consumo, valide a identificação do fornecedor, condições, atendimento e direitos aplicáveis ao fluxo. Consulte a [LGPD](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm), a [Lei Brasileira de Inclusão](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm) e o [Decreto nº 7.962/2013](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/decreto/d7962.htm).

## Verificação e versionamento

Execute `npm run check` em cada modo de build. Ele verifica caminhos, âncoras, IDs, imagens, rótulos, metadados, sitemap e a política de segurança gerada. A auditoria `npm audit` consulta avisos conhecidos das dependências. O GitHub Actions repete essas verificações com acesso de leitura, sem gravar credenciais do Git no checkout.

No GitHub, confira a proteção de `master`, as permissões dos colaboradores e os recursos de alertas de dependências e de segredos disponíveis para a visibilidade do repositório. Essas configurações são administradas na plataforma. As alterações publicadas devem constar no `CHANGELOG.md`, em `package.json` e no lockfile com a mesma versão.
