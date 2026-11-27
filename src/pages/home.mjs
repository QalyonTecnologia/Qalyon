import { site, services } from '../content.mjs';
import { escape, heading, link, quote, sectionTitle, servicePath } from '../components.mjs';
import { almeidaArtwork, almeidaCasePath } from './almeida-case.mjs';

export const home = `
<div class="precision-edition precision-home">
  <section class="precision-hero">
    <div class="precision-hero-art" aria-hidden="true">
      <img src="/assets/loop-1280.webp" srcset="/assets/loop-640.webp 640w, /assets/loop-1280.webp 1280w"
        sizes="(max-width: 760px) 100vw, 69vw" width="1280" height="720" fetchpriority="high" alt="">
    </div>
    <div class="wrap precision-hero-inner">
      <div class="precision-hero-copy">
        ${heading('Software house brasileira', site.slogan,
          'Desenvolvemos sites, landing pages, portfólios profissionais e sistemas sob medida. Também criamos nossos próprios produtos de software.')}
        <div class="actions">${quote()}${link('#nossos-trabalhos', 'Conhecer nosso trabalho')}</div>
      </div>
      <button type="button" id="motion-toggle" class="precision-motion" hidden>Pausar movimento</button>
    </div>
  </section>

  <section class="precision-featured" id="nossos-trabalhos"><div class="wrap">
    <div class="precision-section-heading">
      <div>${sectionTitle('Mostruário', 'Projetos selecionados.')}</div>
      ${link('/projetos/', 'Ver todos os projetos')}
    </div>
    <article class="precision-feature-card">
      <a class="precision-feature-art" href="${almeidaCasePath}" aria-label="Conhecer o projeto Almeida Torres Advocacia">${almeidaArtwork}</a>
      <div class="precision-feature-copy">
        <p class="label">Site institucional · Demonstração</p>
        <h3>Almeida Torres Advocacia</h3>
        <p>Uma identidade editorial para apresentar o escritório, suas áreas de atuação e o caminho até o primeiro atendimento.</p>
        ${link(almeidaCasePath, 'Ver projeto')}
      </div>
    </article>
  </div></section>

  <section class="wrap precision-services" id="ecossistema">
    <div>${sectionTitle('Serviços digitais', 'O que seu negócio precisa agora?')}</div>
    <ul class="precision-service-list">
      ${services.map(service => `<li><a href="${servicePath(service)}">
        <strong>${escape(service.title)}</strong>
        <span>${escape(service.summary)}</span>
      </a></li>`).join('')}
    </ul>
  </section>

  <section class="precision-product"><div class="wrap precision-product-inner">
    <div>${sectionTitle('Produto próprio · Em desenvolvimento', 'Atlas by Qalyon',
      'Do orçamento ao pagamento, cada etapa do serviço em um só lugar.')}
      ${link('/produtos/atlas/', 'Conhecer o Atlas')}
    </div>
    <ol class="precision-product-flow">
      <li>Orçamento</li><li>Agendamento</li><li>Execução</li><li>Pagamento</li>
    </ol>
  </div></section>

  <section class="wrap precision-process">
    ${sectionTitle('Como trabalhamos', 'Do escopo à entrega.')}
    <p>Começamos pelo que o projeto precisa resolver. A proposta define entregas, prazos e investimento. Você acompanha a construção e aprova a prévia antes da publicação.</p>
    ${link('/sobre/#nossa-atuacao', 'Conhecer a Qalyon')}
  </section>

  <section class="precision-contact"><div class="wrap precision-closing">
    <h2>O que você quer construir?</h2>
    ${quote()}
  </div></section>
</div>`;
