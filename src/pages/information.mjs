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
    ['Responsável pelo tratamento', `<p>Vitor Manoel, que atua sob a marca Qalyon Tecnologia, é o controlador dos dados recebidos nos canais comerciais da Qalyon. Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento, use o e-mail <a href="mailto:${escape(contact.email)}">${escape(contact.email)}</a>.</p>`],
    ['Briefing, e-mail e WhatsApp', '<p>O briefing é montado no seu navegador. Nome, contato, serviço de interesse e objetivo compõem o resumo. Você também pode incluir empresa, etapa do projeto, prazo e link de referência. O site não envia o formulário nem guarda uma cópia. Ao abrir o rascunho no WhatsApp, o resumo é disponibilizado ao serviço para preencher a conversa. Ao escolher o e-mail, o resumo é entregue ao seu aplicativo como rascunho. Você pode revisar a mensagem antes de enviá-la.</p><p>Quando recebemos uma mensagem, usamos o contato e as informações que você escolheu compartilhar para responder, entender o escopo e preparar uma proposta a seu pedido. Esse tratamento pode envolver procedimentos preliminares à contratação solicitados por você. Envie apenas o necessário e evite incluir senhas, documentos ou dados sensíveis no briefing.</p>'],
    ['Hospedagem, serviços externos e armazenamento', '<p>A OpenAI, por meio do ChatGPT Sites, fornece a hospedagem e, quando o acesso é restrito, a autenticação. A infraestrutura pode tratar dados técnicos como endereço IP, dados do navegador e registros de acesso para operar e proteger o serviço. A infraestrutura pode usar cookies próprios para autenticação e segurança. O código do site não instala cookies de publicidade ou de análise de navegação. A preferência de movimento é armazenada somente durante a sessão da aba.</p><p>O Gmail e o WhatsApp Business viabilizam as conversas de atendimento. Esses provedores e a hospedagem podem processar dados fora do Brasil, conforme seus serviços e políticas. Consulte os avisos de privacidade da <a href="https://openai.com/pt-BR/policies/row-privacy-policy/">OpenAI</a>, do <a href="https://policies.google.com/privacy?hl=pt-BR">Google</a> e do <a href="https://www.whatsapp.com/legal/privacy-policy">WhatsApp</a>. Os links para demonstrações externas abrem páginas que podem ter regras próprias.</p>'],
    ['Por quanto tempo usamos os dados', '<p>Mantemos os contatos enquanto o atendimento ou a negociação estiver em andamento. Quando um pedido de orçamento é encerrado sem contratação, excluímos em até 90 dias os dados sob nosso controle no e-mail e no WhatsApp, salvo quando a conservação for necessária para cumprir obrigação legal ou exercer direitos. Em caso de contratação, mantemos os registros pertinentes pelo tempo necessário à execução do contrato e às obrigações ou aos prazos legais aplicáveis. Cópias mantidas pelos provedores seguem as regras e configurações de cada serviço.</p>'],
    ['Seus direitos', `<p>Nos termos da LGPD, você pode pedir confirmação de tratamento, acesso, correção e informações sobre compartilhamento. Conforme o caso, também pode solicitar anonimização, bloqueio ou exclusão, portabilidade, oposição ao tratamento ou revogação do consentimento quando essa for a base aplicável. Podemos pedir informações necessárias para confirmar sua identidade antes de atender à solicitação. Você também pode peticionar à ANPD.</p><p>${privacyContact}</p>`],
  ]);

export const accessibilityPage = informationPage('Acessibilidade', 'Acessibilidade do site',
  'Use os recursos de navegação e movimento do site ou fale com a Qalyon se encontrar uma barreira.', [
    ['Navegação por teclado', '<p>Use Tab para avançar entre controles, Shift + Tab para voltar e Enter para ativar links. No início de cada página, o link “Pular para o conteúdo” leva ao conteúdo principal. O atalho de acessibilidade fica no cabeçalho. No briefing, use Escape para fechar a revisão e voltar aos campos.</p>'],
    ['Texto e movimento', '<p>Você pode ajustar o zoom pelo navegador. O site respeita a preferência de movimento reduzido do dispositivo e oferece o controle “Pausar movimento”.</p>'],
    ['Relate uma dificuldade', `<p>Envie a página em que encontrou a barreira e, se puder, informe o dispositivo, navegador e tecnologia assistiva usados. <a href="mailto:${escape(contact.email)}?subject=Acessibilidade%20Qalyon">Falar sobre acessibilidade</a>.</p>`],
  ]);

export const termsPage = informationPage('Uso do site', 'Informações de uso',
  'Conheça o propósito do site institucional, das demonstrações e do canal de orçamento.', [
    ['Orçamento e contratação', '<p>O site apresenta os serviços, os produtos em desenvolvimento e o portfólio da Qalyon. O briefing inicia uma conversa comercial. Escopo, preço, prazo, entregas e condições são apresentados na proposta. A contratação é formalizada após a aprovação das condições aplicáveis.</p>'],
    ['Projetos demonstrativos', '<p>As amostras identificadas como demonstrações ilustram possibilidades de design e desenvolvimento, inclusive com cenários fictícios. Ao seguir um link externo, você passa a navegar no endereço de destino.</p>'],
    ['Contato', '<p>Para dúvidas sobre um serviço ou uma demonstração, use a <a href="/contato/">página de contato</a>. Para informações sobre dados pessoais, consulte o <a href="/privacidade/">aviso de privacidade</a>.</p>'],
  ]);
