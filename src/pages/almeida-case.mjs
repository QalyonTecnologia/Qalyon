import { heading, link, quote, sectionTitle } from '../components.mjs';

export const almeidaCasePath = '/projetos/almeida-torres/';
const demoUrl = 'https://qalyontecnologia.github.io/almeida-torres-advocacia/';

export const almeidaArtwork = `
<div class="almeida-artwork" aria-hidden="true">
  <div class="almeida-artwork-copy">
    <span>Almeida Torres <small>Advocacia</small></span>
    <strong>O Direito em perspectiva.</strong>
  </div>
  <img src="/assets/almeida-torres.webp" width="600" height="343" alt="" decoding="async">
</div>`;

const decisions = [
  ['Áreas de atuação com endereço próprio', 'O visitante encontra o assunto que trouxe até o escritório e pode ir direto à área de atuação correspondente.'],
  ['A equipe aparece no percurso', 'A apresentação do escritório e dos profissionais dá contexto a quem quer saber com quem irá conversar.'],
  ['Contato com contexto', 'As informações de atendimento têm um lugar próprio. O visitante pode consultá-las depois de conhecer o escritório e suas áreas.'],
];

export const almeidaCase = `
<div class="precision-edition almeida-case">
  <section class="wrap almeida-cover">
    <a class="precision-back" href="/projetos/">Todos os projetos</a>
    <div class="almeida-cover-heading">
      <div>${heading('Demonstração · Site institucional', 'Almeida Torres Advocacia')}</div>
      <p class="lead">Um site para um escritório fictício, pensado para ajudar o visitante a entender a atuação da equipe e chegar ao primeiro contato.</p>
    </div>
    <figure class="almeida-figure">
      ${almeidaArtwork}
      <figcaption>Composição visual da demonstração</figcaption>
    </figure>
  </section>

  <section class="almeida-story">
    <div class="wrap almeida-story-grid">
      <div>${sectionTitle('Objetivo', 'Orientar a primeira visita.')}</div>
      <p>Quem chega ao site de um escritório pode ter dúvidas sobre qual área atende seu caso, quem faz parte da equipe e como funciona o primeiro contato. O projeto organiza essas perguntas em percursos claros pela navegação.</p>
      <h2>Decisões do projeto</h2>
      <dl class="almeida-decisions">
        ${decisions.map(([title, description]) => `<div><dt>${title}</dt><dd>${description}</dd></div>`).join('')}
      </dl>
    </div>
  </section>

  <section class="wrap precision-closing">
    ${sectionTitle('Site institucional', 'Seu escritório pode ter um site com a sua identidade.')}
    <div class="actions">
      ${quote('sites-institucionais')}
      ${link(demoUrl, 'Abrir demonstração')}
      ${link('/servicos/sites-institucionais/', 'Conhecer o serviço')}
    </div>
  </section>
</div>`;
