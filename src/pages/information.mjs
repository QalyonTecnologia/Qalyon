import { escape, heading } from '../components.mjs';
import { contact } from '../content.mjs';

function informationPage(label, title, description, sections) {
  return `<section class="information-hero"><div class="wrap information-width">
    ${heading(label, title, description)}
  </div></section>
  <div class="wrap information-width information-content">
    ${sections.map(([title, body]) => `<section class="information-section"><h2>${title}</h2>${body}</section>`).join('')}
  </div>`;
}

const privacyContact = `<a href="mailto:${escape(contact.email)}?subject=Privacidade%20Qalyon">Entrar em contato sobre privacidade</a>`;

export const privacyPage = informationPage('Privacidade', 'Aviso de privacidade',
  'Saiba como a Qalyon Tecnologia trata dados de visitantes e de quem entra em contato para pedir um orçamento.', [
    ['Quem responde pelo atendimento', `<p>A Qalyon Tecnologia é responsável pelo tratamento das solicitações recebidas em seus canais comerciais. Para exercer seus direitos ou pedir informações sobre o responsável, use o e-mail <a href="mailto:${escape(contact.email)}">${escape(contact.email)}</a>.</p>`],
    ['Briefing, e-mail e WhatsApp', '<p>O briefing é montado no seu navegador. Nome, contato, serviço de interesse e objetivo compõem o resumo. Você também pode incluir empresa, etapa do projeto, prazo e link de referência. O site não envia o formulário nem guarda uma cópia. Ao abrir o rascunho no WhatsApp, o resumo é disponibilizado ao serviço para preencher a conversa. Ao escolher o e-mail, o resumo é entregue ao seu aplicativo como rascunho. Você pode revisar a mensagem antes de enviá-la.</p><p>Quando recebemos uma mensagem, usamos o contato e as informações que você escolheu compartilhar para responder, entender o escopo e preparar uma proposta a seu pedido. Esse tratamento pode envolver procedimentos preliminares à contratação solicitados por você. Envie apenas o necessário e evite incluir senhas, documentos ou dados sensíveis no briefing.</p>'],
    ['Hospedagem, serviços externos e armazenamento', '<p>A hospedagem e os mecanismos de acesso e segurança podem tratar dados técnicos como endereço IP, dados do navegador e registros de acesso. A infraestrutura pode usar cookies próprios para autenticação e segurança. O código do site não instala cookies de publicidade ou de análise de navegação. A preferência de movimento é armazenada somente durante a sessão da aba.</p><p>E-mail e WhatsApp são serviços de terceiros e aplicam suas próprias políticas. Por conta da infraestrutura desses serviços e da hospedagem, o processamento pode ocorrer fora do Brasil. Os links para demonstrações externas abrem páginas que podem ter regras próprias.</p>'],
    ['Por quanto tempo usamos os dados', '<p>As solicitações recebidas são mantidas pelo período necessário para conduzir o atendimento ou a negociação. Se houver contratação, os registros pertinentes podem ser mantidos para executar o contrato, atender obrigações legais ou exercer direitos. Cópias em serviços de terceiros também seguem as regras e configurações desses serviços.</p>'],
    ['Seus direitos', `<p>Nos termos da LGPD, você pode pedir confirmação de tratamento, acesso, correção e informações sobre compartilhamento. Conforme o caso, também pode solicitar anonimização, bloqueio ou exclusão, portabilidade, oposição ao tratamento ou revogação do consentimento quando essa for a base aplicável. Podemos pedir informações necessárias para confirmar sua identidade antes de atender à solicitação. Você também pode peticionar à ANPD.</p><p>${privacyContact}</p>`],
  ]);

export const accessibilityPage = informationPage('Acessibilidade', 'Acessibilidade do site',
  'Use os recursos de navegação e movimento do site ou fale com a Qalyon se encontrar uma barreira.', [
    ['Navegação por teclado', '<p>Use Tab para avançar entre controles, Shift + Tab para voltar e Enter para ativar links. No início de cada página, o link “Pular para o conteúdo” leva ao conteúdo principal. No briefing, use Escape para fechar a revisão e voltar aos campos.</p>'],
    ['Texto e movimento', '<p>Você pode ajustar o zoom pelo navegador. O site respeita a preferência de movimento reduzido do dispositivo e oferece o controle “Pausar movimento”.</p>'],
    ['Relate uma dificuldade', `<p>Envie a página em que encontrou a barreira e, se puder, informe o dispositivo, navegador e tecnologia assistiva usados. <a href="mailto:${escape(contact.email)}?subject=Acessibilidade%20Qalyon">Falar sobre acessibilidade</a>.</p>`],
  ]);

export const termsPage = informationPage('Uso do site', 'Informações de uso',
  'Conheça o propósito do site institucional, das demonstrações e do canal de orçamento.', [
    ['Orçamento e contratação', '<p>O site apresenta os serviços, os produtos em desenvolvimento e o portfólio da Qalyon. O briefing inicia uma conversa comercial. Escopo, preço, prazo, entregas e condições são apresentados na proposta. A contratação é formalizada após a aprovação das condições aplicáveis.</p>'],
    ['Projetos demonstrativos', '<p>As amostras identificadas como demonstrações ilustram possibilidades de design e desenvolvimento, inclusive com cenários fictícios. Ao seguir um link externo, você passa a navegar no endereço de destino.</p>'],
    ['Contato', '<p>Para dúvidas sobre um serviço ou uma demonstração, use a <a href="/contato/">página de contato</a>. Para informações sobre dados pessoais, consulte o <a href="/privacidade/">aviso de privacidade</a>.</p>'],
  ]);
