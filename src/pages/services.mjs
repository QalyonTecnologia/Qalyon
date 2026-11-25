import { services } from '../content.mjs';
import { servicesCatalog, servicesHeroArtwork, serviceVisuals } from '../services-catalog.mjs';
import { close, escape, heading, icon, link, sectionTitle, servicePath } from '../components.mjs';

export const servicesPage = `
<section class="service-hero">
  <div class="wrap service-hero-inner">
    <div class="service-hero-copy">
      ${heading('Serviços digitais', 'Desenvolvimento sob medida para o seu negócio.',
        'Sites, portfólios, landing pages e sistemas web para apresentar seu trabalho e simplificar a rotina do seu negócio.')}
      <div class="actions"><a class="button" href="/contato/">Solicitar orçamento</a><a class="arrow-link" href="#solucoes">Explorar soluções</a></div>
    </div>
    ${servicesHeroArtwork}
  </div>
</section>
<section class="wrap section" id="solucoes">
  ${sectionTitle('Catálogo', 'Escolha pelo que você precisa resolver.')}
  ${servicesCatalog}
</section>
<section class="service-terms">
  <div class="wrap section compact">
    ${sectionTitle('Condições comerciais', 'Um projeto por vez, com escopo claro.')}
    <dl>
      <div><dt>Proposta sob consulta</dt><dd>O projeto é contratado de forma avulsa. A proposta descreve o escopo, as entregas, os prazos e as condições de pagamento.</dd></div>
      <div><dt>Domínio e hospedagem</dt><dd>Ficam em sua titularidade. A configuração e a publicação são alinhadas no escopo do projeto.</dd></div>
      <div><dt>Novas demandas</dt><dd>Melhorias e outras entregas podem receber orçamento próprio conforme a necessidade.</dd></div>
    </dl>
    <a class="button" href="/contato/">Solicitar orçamento</a>
  </div>
</section>`;

export const servicePage = service => {
  const visual = serviceVisuals[service.slug];
  return `
<div class="service-detail service-tile--${service.slug}">
  <section class="service-detail-hero">
    <div class="wrap">
      <a class="service-detail-back" href="/servicos/">Todos os serviços</a>
      <div class="service-detail-intro">
        <div class="service-detail-heading">
          ${heading('Serviços digitais', escape(service.title), escape(service.summary))}
          <div class="actions">
            <a class="button" href="/contato/?servico=${encodeURIComponent(service.slug)}">Solicitar orçamento</a>
            <a class="arrow-link" href="${visual.demo}">${visual.demoLabel}</a>
          </div>
        </div>
        <div class="service-detail-art service-tile-art" aria-hidden="true">${visual.artwork}</div>
      </div>
    </div>
  </section>
  <section class="wrap section service-detail-scope">
    <div class="service-detail-audience">
      <h2>Para quem serve</h2>
      <p>${escape(service.audience)}</p>
      ${service.slug === 'sites-institucionais' ? '<p id="portfolio-profissional">Quer destacar trabalhos e especialidades? <a href="/servicos/portfolio-profissional/">Conheça os portfólios profissionais</a>.</p>' : ''}
    </div>
    <div class="service-detail-deliverables">
      <h2>O que pode incluir</h2>
      <ul>${service.includes.map(item => `<li>${escape(item)}</li>`).join('')}</ul>
      <p>${escape(service.extra)}</p>
    </div>
  </section>
  <section class="wrap service-detail-contact">
    <div>
      ${sectionTitle('Orçamento', 'Vamos entender o que você precisa.')}
      <p>A contratação é avulsa e o preço é sob consulta. O domínio e a hospedagem ficam em sua titularidade.</p>
    </div>
    <a class="button" href="/contato/?servico=${encodeURIComponent(service.slug)}">Solicitar orçamento</a>
  </section>
</div>`;
};
