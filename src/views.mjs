import { services, products, projects } from './content.mjs';
import { productPath, projectPath, servicePath } from './components.mjs';
import { home } from './pages/home.mjs';
import { servicesPage, servicePage } from './pages/services.mjs';
import { productsPage, productPage } from './pages/products.mjs';
import { projectsPage, projectPage, portfolioPath, institutionalPath, landingPath, portfolioPage, institutionalPage, landingPage } from './pages/projects.mjs';
import { aboutPage } from './pages/about.mjs';
import { contactPage } from './pages/contact.mjs';
import { privacyPage, accessibilityPage, termsPage } from './pages/information.mjs';

const workAssets = {
  styles: ['work-gallery.css?v=4'],
  modules: ['work-gallery.js?v=3'],
};
const catalogAssets = { styles: ['project-catalog.css?v=4'], script: 'portfolio-filter.js' };

export const pages = [
  { path: '/', title: 'Qalyon — Software house, sites, sistemas e SaaS', description: 'Conheça a Qalyon, software house que cria SaaS próprios e desenvolve sites, landing pages, portfólios profissionais e sistemas web sob medida.', body: home, ...workAssets, modules: ['experience.js', 'ecosystem.js?v=4', ...workAssets.modules] },
  { path: '/servicos/', title: 'Serviços digitais — Qalyon', description: 'Sites institucionais, landing pages, portfólios profissionais e sistemas web. Entenda as soluções e solicite um orçamento.', body: servicesPage, styles: ['services-page.css?v=2'] },
  ...services.map(service => ({ path: servicePath(service), title: service.title + ' — Qalyon', description: service.summary, body: servicePage(service), styles: ['services-page.css?v=2', 'service-detail.css'] })),
  { path: '/produtos/', title: 'Produtos próprios — Qalyon', description: 'Conheça os produtos próprios da Qalyon, incluindo o Atlas, primeiro SaaS da empresa, em desenvolvimento.', body: productsPage, styles: ['products-page.css'] },
  ...products.map(product => ({ path: productPath(product), title: product.title + ' by Qalyon — Em desenvolvimento', description: product.summary, body: productPage(product), styles: ['products-page.css'] })),
  { path: '/projetos/', title: 'Projetos e demonstrações — Qalyon', description: 'Explore os trabalhos autorais da Qalyon, com exemplos de portfólio profissional, landing page e sistema web.', body: projectsPage, ...workAssets, styles: [...workAssets.styles, 'projects-page.css?v=2'] },
  { path: portfolioPath, title: 'Portfólios profissionais — Nossos trabalhos', description: 'Explore demonstrações de portfólios profissionais em Advocacia, Psicologia, Nutrição, Fisioterapia e Personal Trainer.', body: portfolioPage, ...catalogAssets },
  { path: institutionalPath, title: 'Sites institucionais — Nossos trabalhos', description: 'Explore sites institucionais demonstrativos por área de atuação.', body: institutionalPage, ...catalogAssets },
  { path: landingPath, title: 'Landing pages — Nossos trabalhos', description: 'Explore landing pages demonstrativas para gerar pedidos, agendamentos e solicitações de orçamento.', body: landingPage, ...catalogAssets },
  ...projects.map(project => ({ path: projectPath(project), title: project.title + ' — Demonstração Qalyon', description: project.summary, body: projectPage(project), styles: ['project-catalog.css?v=4'] })),
  { path: '/sobre/', title: 'Sobre a Qalyon — Software house', description: 'Entenda como a Qalyon cria produtos SaaS e desenvolve soluções digitais sob medida.', body: aboutPage, styles: ['about-page.css'] },
  { path: '/contato/', title: 'Solicitar orçamento — Qalyon', description: 'Prepare um briefing para seu projeto digital ou consulte o canal de atendimento da Qalyon.', body: contactPage, styles: ['contact-page.css?v=2'], script: 'contact.js' },
  { path: '/privacidade/', title: 'Aviso de privacidade — Qalyon', description: 'Saiba quais dados o site e os canais de atendimento da Qalyon tratam e como exercer seus direitos de privacidade.', body: privacyPage, styles: ['information-page.css'] },
  { path: '/acessibilidade/', title: 'Acessibilidade — Qalyon', description: 'Conheça os recursos de acessibilidade e como relatar uma barreira no site da Qalyon.', body: accessibilityPage, styles: ['information-page.css'] },
  { path: '/termos/', title: 'Informações de uso — Qalyon', description: 'Consulte informações sobre o uso do site institucional da Qalyon, seus projetos de demonstração e pedidos de orçamento.', body: termsPage, styles: ['information-page.css'] },
];
