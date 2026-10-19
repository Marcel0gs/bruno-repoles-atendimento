/* CRM de demonstração da Bruno Repolês Imóveis.
   Tudo aqui é dado fictício, menos os imóveis, que são os publicados no site deles.
   Nomes da equipe: trocar em EQUIPE quando ele passar os nomes reais. */

const EQUIPE = {
  bruno:   { nome: 'Bruno',       papel: 'Diretor, captação', cor: '#8f5c0c', sigla: 'BR' },
  carlos:  { nome: 'Carlos',      papel: 'Corretor',          cor: '#2f5d9e', sigla: 'CA' },
  juliana: { nome: 'Juliana',     papel: 'Corretora',         cor: '#9b4f8f', sigla: 'JU' },
  atend:   { nome: 'Atendimento', papel: 'Atendente',         cor: '#3d7a6a', sigla: 'AT' },
};
let rodizio = ['juliana', 'carlos'];
const foraRodizio = new Set();

const SITE = 'https://brunorepolesimoveis.com.br';
const IMOVEIS = {
  '317':   { tipo: 'Apartamento', bairro: 'Lucília', neg: 'Venda', preco: 380000, q: 3, s: 1, v: 1, url: '/imovel/apartamento-a-venda-no-bairro-lucilia-em-joao-monlevade-mg/317', procuras: 41, enviados: 28 },
  '179':   { tipo: 'Cobertura duplex', bairro: 'Mangabeiras', neg: 'Venda', preco: 750000, q: 3, s: 2, v: 2, url: '/imovel/apartamento-a-venda-no-bairro-mangabeiras-em-joao-monlevade-mg/179', procuras: 33, enviados: 19 },
  '196':   { tipo: 'Apartamento', bairro: 'Lucília', neg: 'Venda', preco: 360000, q: 3, s: 1, v: 2, url: '/imovel/apartamento-a-venda-no-bairro-lucilia-em-joao-monlevade-mg/196', procuras: 29, enviados: 22 },
  'al320': { tipo: 'Apartamento', bairro: 'Lucília', neg: 'Aluguel', preco: 1950, q: 3, s: 1, v: 1, url: '/imovel/apartamento-para-alugar-no-bairro-lucilia-em-joao-monlevade-mg/AL320', procuras: 27, enviados: 24 },
  '193':   { tipo: 'Casa', bairro: 'Satélite', neg: 'Venda', preco: 495000, q: 4, s: 0, v: 2, url: '/imovel/casa-a-venda-no-bairro-satelite-em-joao-monlevade-mg/193', procuras: 22, enviados: 15 },
  '198':   { tipo: 'Apartamento', bairro: 'Novo Horizonte', neg: 'Venda', preco: 530000, q: 3, s: 1, v: 1, url: '/imovel/apartamento-a-venda-no-bairro-novo-horizonte-em-joao-monlevade-mg/198', procuras: 18, enviados: 12 },
  '202':   { tipo: 'Casa', bairro: 'Lourdes', neg: 'Venda', preco: 529000, q: 3, s: 0, v: 1, url: '/imovel/casa-a-venda-no-bairro-lourdes-em-joao-monlevade-mg/202', procuras: 15, enviados: 10 },
  '230':   { tipo: 'Apartamento', bairro: 'Castelo', neg: 'Venda', preco: 370000, q: 2, s: 0, v: 1, url: '/imovel/apartamento-a-venda-no-bairro-castelo-em-joao-monlevade-mg/230', procuras: 14, enviados: 11 },
};
const img = ref => `../assets/img/imovel-${ref}.webp`;

const ETAPAS = [
  { id: 'novo',        nome: 'Novo contato',     cor: '#b9b6ae' },
  { id: 'qualificando',nome: 'Em qualificação',  cor: '#ebb455' },
  { id: 'qualificado', nome: 'Qualificado',      cor: '#d9962b' },
  { id: 'visita',      nome: 'Visita agendada',  cor: '#2f5d9e' },
  { id: 'proposta',    nome: 'Proposta',         cor: '#5b3fa0' },
  { id: 'fechado',     nome: 'Fechado',          cor: '#1b8a56' },
];

/* ---------- Leads e conversas (fictícios) ---------- */
const LEADS = [
  { id: 'mariana', nome: 'Mariana Couto', tel: '(31) 9 ••••-4821', origem: 'Anúncio no Instagram', neg: 'Compra', interesse: 'Apto 3 quartos no Lucília, até R$ 400 mil', valor: 380000, imovel: '317',
    etapa: 'visita', status: 'eq', resp: 'carlos', quando: '08:20', ordem: 96, naoLidas: 0,
    resumo: 'Quer apartamento de 3 quartos no Lucília pra morar, até R$ 400 mil. Vai financiar pela Caixa e já fez a simulação. Gostou dos refs. 317 e 196.',
    proximo: 'Visita sábado, 10h, com o Carlos',
    msgs: [
      { dia: 'Ontem' },
      { de: 'cli', h: '22:47', txt: 'Boa noite! Vi o anúncio do apartamento no Lucília. Ainda está disponível?' },
      { de: 'ia', h: '22:47', txt: 'Boa noite, Mariana! Está sim. É o apartamento de 3 quartos com suíte no Lucília, R$ 380 mil, com 1 vaga de garagem.' },
      { de: 'ia', h: '22:47', imovel: '317' },
      { de: 'ia', h: '22:48', txt: 'Você está buscando pra morar ou pra investir? E pensa em financiar?' },
      { de: 'cli', h: '22:49', txt: 'Pra morar. Vou financiar pela Caixa, já fiz a simulação' },
      { de: 'ia', h: '22:49', txt: 'Ótimo, com a simulação pronta tudo anda mais rápido. Tenho também esta opção no Lucília, com 2 vagas, por R$ 360 mil:' },
      { de: 'ia', h: '22:49', imovel: '196' },
      { de: 'cli', h: '22:50', txt: 'Gostei dos dois. Dá pra visitar no sábado?' },
      { de: 'ia', h: '22:50', txt: 'Dá sim! Sábado às 10h fica bom? Deixo a visita reservada e o Carlos, nosso corretor, te confirma amanhã cedo.' },
      { de: 'cli', h: '22:51', txt: 'Perfeito, 10h' },
      { de: 'sis', ic: 'user-check', txt: 'Visita pré-agendada: sábado, 10h. Conversa passada para Carlos com o resumo.' },
      { dia: 'Hoje' },
      { de: 'eq', quem: 'carlos', h: '08:14', txt: 'Bom dia, Mariana! Aqui é o Carlos. Visita confirmada pra sábado às 10h. Posso te mandar a localização do prédio?' },
      { de: 'cli', h: '08:20', txt: 'Pode sim, obrigada!' },
    ] },
  { id: 'rafael', nome: 'Rafael Lima', tel: '(31) 9 ••••-1077', origem: 'Site', neg: 'Aluguel', interesse: 'Apto 3 quartos no Lucília, até R$ 2 mil', valor: 1950, imovel: 'al320',
    etapa: 'visita', status: 'eq', resp: 'atend', quando: '07:12', ordem: 95, naoLidas: 1,
    resumo: 'Quer alugar apartamento de 3 quartos no Lucília, até R$ 2 mil. Pediu a lista de documentos. Quer visitar o AL320 hoje depois das 18h.',
    proximo: 'Confirmar visita hoje, depois das 18h',
    msgs: [
      { dia: 'Hoje' },
      { de: 'cli', h: '07:10', audio: '0:14', txt: 'Bom dia, tô procurando apartamento pra alugar no Lucília, três quartos, até uns dois mil reais. Tem alguma coisa?' },
      { de: 'ia', h: '07:10', audio: '0:09', txt: 'Bom dia, Rafael! Tenho sim: um apartamento de 3 quartos com suíte no Lucília, por R$ 1.950. Vou te mandar as fotos aqui.' },
      { de: 'ia', h: '07:10', imovel: 'al320' },
      { de: 'cli', h: '07:11', txt: 'Show. Quais documentos precisa?' },
      { de: 'ia', h: '07:11', txt: 'Pra alugar pedimos RG, CPF, comprovante de renda e de residência. A garantia pode ser seguro fiança ou caução. Quer agendar uma visita?' },
      { de: 'cli', h: '07:12', audio: '0:06', txt: 'Quero sim, pode ser hoje depois das 18h?' },
      { de: 'ia', h: '07:12', audio: '0:07', txt: 'Pode sim! Vou confirmar o horário com a equipe e já te retorno.' },
      { de: 'sis', ic: 'user-check', txt: 'Pedido de visita para hoje, depois das 18h. Conversa passada para o Atendimento.' },
    ] },
  { id: 'eduardo', nome: 'Eduardo Santos', tel: '(31) 9 ••••-3390', origem: 'Site', neg: 'Captação', interesse: 'Quer vender casa de 3 quartos no Carneirinhos', valor: 0, imovel: null,
    etapa: 'qualificado', status: 'eq', resp: 'bruno', quando: 'Ontem', ordem: 90, naoLidas: 0,
    resumo: 'Proprietário quer vender casa de 3 quartos no Carneirinhos, lote de 360 m². Captação: passada pro Bruno combinar a avaliação.',
    proximo: 'Bruno liga pra combinar a avaliação',
    msgs: [
      { dia: 'Ontem' },
      { de: 'cli', h: '16:05', txt: 'Boa tarde. Quero colocar minha casa à venda, vocês trabalham com isso?' },
      { de: 'ia', h: '16:05', txt: 'Boa tarde, Eduardo! Trabalhamos sim. Em qual bairro fica a casa e quantos quartos ela tem?' },
      { de: 'cli', h: '16:08', txt: 'No Carneirinhos, 3 quartos, lote de 360' },
      { de: 'ia', h: '16:08', txt: 'Obrigada! Vou passar pro Bruno, que cuida das avaliações. Ele te chama ainda hoje pra combinar uma visita.' },
      { de: 'sis', ic: 'house', txt: 'Captação de imóvel: conversa passada para Bruno com o resumo.' },
      { de: 'eq', quem: 'bruno', h: '16:40', txt: 'Eduardo, boa tarde! Aqui é o Bruno. Consigo passar aí amanhã às 9h pra avaliar a casa, pode ser?' },
    ] },
  { id: 'patricia', nome: 'Patrícia Alves', tel: '(31) 9 ••••-5512', origem: 'Portal', neg: 'Compra', interesse: 'Casa no Satélite', valor: 495000, imovel: '193',
    etapa: 'visita', status: 'eq', resp: 'juliana', quando: 'Ontem', ordem: 88, naoLidas: 0,
    resumo: 'Perguntou da casa do Satélite e parou de responder. Voltou depois do follow-up de 3 dias e marcou visita pra sexta, 15h.',
    proximo: 'Visita sexta, 15h, com a Juliana',
    msgs: [
      { dia: 'Quinta-feira' },
      { de: 'cli', h: '15:02', txt: 'Oi, a casa do Satélite ainda está à venda?' },
      { de: 'ia', h: '15:02', txt: 'Oi, Patrícia! Está sim. Casa de 4 quartos e 2 vagas no Satélite, por R$ 495 mil.' },
      { de: 'ia', h: '15:02', imovel: '193' },
      { de: 'ia', h: '15:03', txt: 'Você já tem uma faixa de valor em mente? Pensa em financiar?' },
      { dia: 'Ontem' },
      { de: 'ia', h: '10:00', fu: true, txt: 'Oi, Patrícia! Passando pra saber se ainda tem interesse na casa do Satélite. Se quiser, consigo uma visita essa semana.' },
      { de: 'cli', h: '10:41', txt: 'Oi! Tenho sim, só estava sem tempo. Consigo visitar sexta à tarde' },
      { de: 'ia', h: '10:41', txt: 'Ótimo! Sexta às 15h fica bom? Já deixo reservado e a Juliana te confirma.' },
      { de: 'cli', h: '10:43', txt: 'Fica sim' },
      { de: 'sis', ic: 'user-check', txt: 'Lead recuperado pelo follow-up. Visita sexta, 15h. Passado para Juliana.' },
    ] },
  { id: 'gustavo', nome: 'Gustavo Pereira', tel: '(31) 9 ••••-2268', origem: 'Site', neg: 'Compra', interesse: 'Casa no Lourdes', valor: 529000, imovel: '202',
    etapa: 'qualificando', status: 'ag', resp: null, quando: 'Ontem', ordem: 85, naoLidas: 0,
    resumo: 'Perguntou o valor da casa do Lourdes. Recebeu as fotos e a oferta de visita, ainda não respondeu.',
    proximo: 'Follow-up automático hoje, 10h',
    msgs: [
      { dia: 'Ontem' },
      { de: 'cli', h: '19:32', txt: 'Qual o valor da casa no Lourdes?' },
      { de: 'ia', h: '19:32', txt: 'Oi, Gustavo! Ela está por R$ 529 mil. São 3 quartos e 1 vaga de garagem:' },
      { de: 'ia', h: '19:32', imovel: '202' },
      { de: 'ia', h: '19:33', txt: 'Quer que eu agende uma visita pra você conhecer?' },
      { de: 'sis', ic: 'repeat', txt: 'Sem resposta. Follow-up agendado para amanhã, 10h.' },
    ] },
  { id: 'aline', nome: 'Aline Martins', tel: '(31) 9 ••••-6604', origem: 'Anúncio no Instagram', neg: 'Aluguel', interesse: 'Casa 3 quartos pra alugar', valor: 2200, imovel: null,
    etapa: 'novo', status: 'ia', resp: null, quando: 'Ontem', ordem: 84, naoLidas: 0,
    resumo: 'Procura casa de 3 quartos pra alugar. A assistente perguntou bairro e valor.',
    proximo: 'Esperando a resposta da cliente',
    msgs: [
      { dia: 'Ontem' },
      { de: 'cli', h: '23:12', txt: 'Boa noite, procuro casa pra alugar com 3 quartos' },
      { de: 'ia', h: '23:12', txt: 'Boa noite, Aline! Em qual bairro você prefere? E até quanto pensa em pagar de aluguel?' },
    ] },
  { id: 'marcos', nome: 'Marcos Vieira', tel: '(31) 9 ••••-0819', origem: 'Portal', neg: 'Aluguel', interesse: 'Kitnet pra alugar', valor: 900, imovel: null,
    etapa: 'novo', status: 'ia', resp: null, quando: 'Ontem', ordem: 83, naoLidas: 0,
    resumo: 'Procura kitnet pra alugar. Não tem no estoque: a assistente ofereceu avisar quando entrar.',
    proximo: 'Avisar quando entrar kitnet',
    msgs: [
      { dia: 'Ontem' },
      { de: 'cli', h: '23:58', txt: 'Vcs tem kitnet pra alugar?' },
      { de: 'ia', h: '23:58', txt: 'Oi, Marcos! Kitnet não tenho no momento. Posso te avisar assim que entrar uma? Me fala em qual região você procura.' },
    ] },
  { id: 'thiago', nome: 'Thiago Mendes', tel: '(31) 9 ••••-7745', origem: 'Anúncio no Instagram', neg: 'Compra', interesse: 'Cobertura no Mangabeiras', valor: 750000, imovel: '179',
    etapa: 'proposta', status: 'eq', resp: 'juliana', quando: 'Sábado', ordem: 80, naoLidas: 0,
    resumo: 'Quer a cobertura do Mangabeiras. Perguntou sobre permuta: assunto de negociação, passado pra Juliana.',
    proximo: 'Retorno do proprietário sobre a proposta',
    msgs: [
      { dia: 'Sábado' },
      { de: 'cli', h: '11:20', txt: 'A cobertura do Mangabeiras aceita permuta?' },
      { de: 'ia', h: '11:20', txt: 'Boa pergunta, Thiago. Condição de negociação quem vê é a corretora. Já passei pra Juliana, ela te chama em seguida.' },
      { de: 'sis', ic: 'user-check', txt: 'Pedido de negociação. Conversa passada para Juliana.' },
      { de: 'eq', quem: 'juliana', h: '11:34', txt: 'Oi, Thiago! Aqui é a Juliana. Levei sua proposta com permuta pro proprietário e te retorno até segunda.' },
    ] },
  { id: 'fernanda', nome: 'Fernanda Souza', tel: '(31) 9 ••••-3154', origem: 'Portal', neg: 'Compra', interesse: 'Apto 2 quartos no Castelo', valor: 370000, imovel: '230',
    etapa: 'visita', status: 'eq', resp: 'juliana', quando: 'Sexta', ordem: 78, naoLidas: 0,
    resumo: 'Procura apartamento de 2 quartos no Castelo. Visita marcada pra quarta, 17h.',
    proximo: 'Visita quarta, 17h, com a Juliana',
    msgs: [
      { dia: 'Sexta-feira' },
      { de: 'cli', h: '18:47', txt: 'Tem apartamento de 2 quartos no Castelo?' },
      { de: 'ia', h: '18:47', txt: 'Tenho, Fernanda! Este fica no Castelo, por R$ 370 mil, com 1 vaga:' },
      { de: 'ia', h: '18:47', imovel: '230' },
      { de: 'cli', h: '18:52', txt: 'Quero visitar' },
      { de: 'ia', h: '18:52', txt: 'Combinado! Quarta às 17h fica bom? A Juliana te confirma.' },
      { de: 'sis', ic: 'user-check', txt: 'Visita pré-agendada: quarta, 17h. Passado para Juliana.' },
    ] },
  { id: 'luciana', nome: 'Luciana Dias', tel: '(31) 9 ••••-9930', origem: 'Anúncio no Instagram', neg: 'Compra', interesse: '3 quartos com suíte, até R$ 550 mil', valor: 530000, imovel: '198',
    etapa: 'visita', status: 'eq', resp: 'carlos', quando: 'Sexta', ordem: 76, naoLidas: 0,
    resumo: 'Quer 3 quartos com suíte até R$ 550 mil. Gostou do apartamento do Novo Horizonte. Visita sábado, 11h30.',
    proximo: 'Visita sábado, 11h30, com o Carlos',
    msgs: [
      { dia: 'Sexta-feira' },
      { de: 'cli', h: '21:05', txt: 'Procuro 3 quartos com suíte até 550' },
      { de: 'ia', h: '21:05', txt: 'Oi, Luciana! Tenho este no Novo Horizonte: 3 quartos com suíte, por R$ 530 mil.' },
      { de: 'ia', h: '21:05', imovel: '198' },
      { de: 'cli', h: '21:09', txt: 'Lindo. Sábado de manhã dá?' },
      { de: 'ia', h: '21:09', txt: 'Dá sim! Sábado às 11h30. O Carlos te confirma amanhã.' },
      { de: 'sis', ic: 'user-check', txt: 'Visita pré-agendada: sábado, 11h30. Passado para Carlos.' },
    ] },
  { id: 'camila', nome: 'Camila Rocha', tel: '(31) 9 ••••-4417', origem: 'Portal', neg: 'Compra', interesse: 'Apartamento até R$ 300 mil, perto do centro', valor: 300000, imovel: null,
    etapa: 'qualificando', status: 'ia', resp: null, quando: 'Sexta', ordem: 74, naoLidas: 0,
    resumo: 'Procura apartamento até R$ 300 mil perto do centro. Vai usar FGTS.',
    proximo: 'Follow-up automático hoje, 14h30',
    msgs: [
      { dia: 'Sexta-feira' },
      { de: 'cli', h: '12:15', txt: 'Tem apartamento até 300 mil?' },
      { de: 'ia', h: '12:15', txt: 'Oi, Camila! Você prefere qual região? E vai usar financiamento ou FGTS?' },
      { de: 'cli', h: '12:20', txt: 'Perto do centro. Vou usar FGTS' },
      { de: 'ia', h: '12:20', txt: 'Anotado! Nessa faixa não tenho nada publicado agora perto do centro. Posso te avisar assim que entrar?' },
      { de: 'cli', h: '12:22', txt: 'Pode sim' },
    ] },
  { id: 'beatriz', nome: 'Beatriz Nunes', tel: '(31) 9 ••••-2083', origem: 'Indicação', neg: 'Compra', interesse: 'Apto no Lucília', valor: 360000, imovel: '196',
    etapa: 'proposta', status: 'eq', resp: 'carlos', quando: 'Quinta', ordem: 70, naoLidas: 0,
    resumo: 'Visitou o apartamento do Lucília (ref. 196) e fez proposta.',
    proximo: 'Carlos leva a proposta ao proprietário',
    msgs: [
      { dia: 'Quinta-feira' },
      { de: 'cli', h: '09:10', txt: 'Fiz a proposta do apartamento do Lucília, vocês receberam?' },
      { de: 'eq', quem: 'carlos', h: '09:16', txt: 'Recebi sim, Beatriz! Levei pro proprietário e te retorno até amanhã.' },
    ] },
  { id: 'rodrigo', nome: 'Rodrigo Alves', tel: '(31) 9 ••••-6128', origem: 'Instagram', neg: 'Compra', interesse: 'Apto no Novo Horizonte', valor: 530000, imovel: '198',
    etapa: 'fechado', status: 'fim', resp: 'carlos', quando: 'Qua', ordem: 60, naoLidas: 0,
    resumo: 'Comprou o apartamento do Novo Horizonte. Contrato assinado.',
    proximo: 'Pedir avaliação no Google',
    msgs: [
      { dia: 'Quarta-feira' },
      { de: 'cli', h: '17:40', txt: 'Contrato assinado! Obrigado pela atenção de vocês' },
      { de: 'eq', quem: 'carlos', h: '17:45', txt: 'Parabéns, Rodrigo! Foi um prazer. Qualquer coisa, estamos aqui.' },
    ] },
  { id: 'joana', nome: 'Joana Ribeiro', tel: '(31) 9 ••••-8851', origem: 'Indicação', neg: 'Compra', interesse: 'Casa no Cruzeiro Celeste', valor: 0, imovel: null,
    etapa: null, status: 'fim', resp: null, quando: 'Qua', ordem: 58, naoLidas: 0,
    resumo: 'Procurava casa no Cruzeiro Celeste. Respondeu ao follow-up dizendo que já fechou com outra imobiliária. Conversa encerrada sem insistir.',
    proximo: 'Nenhum: cliente disse não',
    msgs: [
      { dia: 'Segunda-feira' },
      { de: 'cli', h: '19:20', txt: 'Boa noite, vocês têm casa no Cruzeiro Celeste?' },
      { de: 'ia', h: '19:20', txt: 'Boa noite, Joana! No Cruzeiro Celeste não tenho casa publicada agora. Me fala quantos quartos você precisa que eu te aviso quando entrar.' },
      { dia: 'Quarta-feira' },
      { de: 'ia', h: '09:30', fu: true, txt: 'Oi, Joana! Ainda está procurando casa no Cruzeiro Celeste? Se me disser quantos quartos precisa, eu te aviso assim que entrar uma.' },
      { de: 'cli', h: '10:02', txt: 'Obrigada, mas já fechamos com outra imobiliária' },
      { de: 'ia', h: '10:02', txt: 'Entendi, Joana. Obrigada pelo retorno e boa sorte na casa nova!' },
      { de: 'sis', ic: 'ban', txt: 'Cliente disse não. Conversa encerrada e nenhum follow-up será enviado.' },
    ] },
];

/* Contatos novos que o botão "Simular" faz chegar */
const SIMULACOES = [
  { id: 'lucas', nome: 'Lucas Ferreira', tel: '(31) 9 ••••-2735', origem: 'Portal', neg: 'Compra', interesse: 'Cobertura no Mangabeiras', valor: 750000, imovel: '179', vai: 'juliana',
    resumo: 'Quer a cobertura do Mangabeiras (ref. 179) pra morar. Quer dar um apartamento como entrada, o que depende do proprietário. Visita pré-agendada: quinta, 17h30.',
    proximo: 'Visita quinta, 17h30',
    roteiro: [
      { de: 'cli', txt: 'Oi, boa noite. A cobertura do Mangabeiras ainda está disponível?' },
      { de: 'ia', txt: 'Boa noite, Lucas! Está sim. É a cobertura duplex no Mangabeiras, com 3 quartos, 2 suítes e 2 vagas, por R$ 750 mil.' },
      { de: 'ia', imovel: '179' },
      { de: 'ia', txt: 'Você procura pra morar? E pensa em financiar ou usar recurso próprio?' },
      { de: 'cli', audio: '0:07', txt: 'Pra morar. Tenho um apartamento pra dar de entrada, vocês aceitam?' },
      { de: 'ia', audio: '0:09', txt: 'Aceitar imóvel na negociação depende do proprietário, e quem vê isso com você é a nossa corretora. Quer marcar uma visita pra conhecer a cobertura?' },
      { de: 'cli', txt: 'Quero. Pode ser quinta depois das 17h?' },
      { de: 'ia', txt: 'Combinado! Deixei pré-agendado pra quinta às 17h30. A corretora te confirma amanhã cedo.' },
      { de: 'sis', ic: 'user-check', txt: 'Visita pré-agendada: quinta, 17h30. Conversa passada para {corretor} com o resumo.' },
    ] },
  { id: 'paula', nome: 'Paula Gomes', tel: '(31) 9 ••••-5049', origem: 'Anúncio no Instagram', neg: 'Aluguel', interesse: 'Apto 3 quartos no Lucília', valor: 1950, imovel: 'al320', vai: 'carlos',
    resumo: 'Quer alugar apartamento no Lucília a partir do mês que vem, pra 3 pessoas. Visita pré-agendada: amanhã, 14h.',
    proximo: 'Visita amanhã, 14h',
    roteiro: [
      { de: 'cli', txt: 'Oi! Vocês têm apartamento pra alugar no Lucília?' },
      { de: 'ia', txt: 'Oi, Paula! Tenho sim: 3 quartos com suíte e 1 vaga, por R$ 1.950 por mês.' },
      { de: 'ia', imovel: 'al320' },
      { de: 'ia', txt: 'Pra quando você precisa do imóvel? E quantas pessoas vão morar?' },
      { de: 'cli', txt: 'Pro mês que vem. Eu, meu marido e nossa filha' },
      { de: 'ia', txt: 'O apartamento atende bem vocês três. Quer visitar? Tenho horário amanhã às 9h ou às 14h.' },
      { de: 'cli', txt: '14h' },
      { de: 'ia', txt: 'Fechado, amanhã às 14h. O corretor te encontra lá e leva a lista de documentos da locação.' },
      { de: 'sis', ic: 'user-check', txt: 'Visita pré-agendada: amanhã, 14h. Conversa passada para {corretor} com o resumo.' },
    ] },
];
let simIndice = 0;
let simRodando = false;

/* ---------- Utilidades ---------- */
const $ = s => document.querySelector(s);
const ic = (n, c = '') => `<svg class="ic ${c}"><use href="#i-${n}"/></svg>`;
const brl = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const valorCurto = (l) => l.neg === 'Aluguel' ? brl(l.valor) + '/mês' : l.valor ? (l.valor >= 1e6 ? 'R$ ' + (l.valor / 1e6).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' mi' : 'R$ ' + Math.round(l.valor / 1000) + ' mil') : '';
const iniciais = n => n.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
const corLead = n => ['#6b6a72', '#7d6b55', '#5f6f7a', '#77657d', '#5e7464', '#80695e'][n.length % 6];
const espera = ms => new Promise(r => setTimeout(r, ms));
const agoraHora = () => { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };
function semente(s) { return function () { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

const dica = $('#dica');
function mostraDica(html, e) {
  dica.innerHTML = html; dica.classList.add('on');
  const x = Math.min(e.clientX + 14, innerWidth - dica.offsetWidth - 10);
  const y = Math.max(e.clientY - dica.offsetHeight - 12, 10);
  dica.style.left = x + 'px'; dica.style.top = y + 'px';
}
const escondeDica = () => dica.classList.remove('on');

function avisa(titulo, texto, icone = 'bell') {
  const el = document.createElement('div');
  el.className = 'aviso';
  el.innerHTML = `${ic(icone)}<div><b>${titulo}</b><small>${texto}</small></div>`;
  $('#avisos').appendChild(el);
  setTimeout(() => { el.classList.add('sai'); setTimeout(() => el.remove(), 300); }, 4600);
}

/* ---------- Navegação ---------- */
const TITULOS = { painel: 'Painel', conversas: 'Conversas', funil: 'Funil de vendas', followups: 'Follow-ups', imoveis: 'Imóveis', equipe: 'Equipe e rodízio', assistente: 'Regras da assistente' };
const renderizado = {};
function vai() {
  let v = location.hash.replace('#', '') || 'painel';
  if (!TITULOS[v]) v = 'painel';
  document.querySelectorAll('.vista').forEach(s => s.classList.toggle('ativa', s.id === 'v-' + v));
  document.querySelectorAll('[data-v]').forEach(a => a.classList.toggle('ativo', a.dataset.v === v));
  $('#titulo').textContent = TITULOS[v];
  if (!renderizado[v]) { RENDER[v](); renderizado[v] = true; }
  if (v === 'conversas' && !selecionada && innerWidth > 980) abreConversa(LEADS[0].id);
  window.scrollTo(0, 0);
}
addEventListener('hashchange', vai);

/* ---------- Painel ---------- */
const DIAS = (() => {
  const r = semente(7), out = [], hoje = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(hoje); d.setDate(hoje.getDate() - i);
    const sem = d.getDay();
    const base = sem === 0 ? 11 : sem === 6 ? 14 : 15;
    const total = Math.round(base + (r() - .5) * 8);
    const pFora = sem === 0 ? .78 : sem === 6 ? .55 : .28 + r() * .1;
    const fora = Math.round(total * pFora);
    out.push({ d, com: total - fora, fora });
  }
  return out;
})();
const TOTAL = DIAS.reduce((s, x) => s + x.com + x.fora, 0);
const FORA = DIAS.reduce((s, x) => s + x.fora, 0);
let contatosHoje = DIAS[29].com + DIAS[29].fora;

function renderKpis() {
  const k = [
    ['message-circle', 'Contatos em 30 dias', TOTAL, '+12% sobre o mês anterior'],
    ['bot', 'Respondidos pela assistente', '100%', 'nenhum contato sem resposta'],
    ['timer', 'Primeira resposta', '9 s', 'em média, 24 horas por dia'],
    ['moon', 'Chegaram fora do horário', FORA, Math.round(FORA / TOTAL * 100) + '% dos contatos', true],
    ['calendar-check', 'Visitas agendadas', 38, '+9 nesta semana'],
    ['user-check', 'Passados à equipe', 126, 'já qualificados'],
  ];
  $('#kpis').innerHTML = k.map(([i, r, n, v, neutro]) => `<div class="card kpi"><div class="rot">${ic(i)}${r}</div><div class="num">${n}</div><div class="var ${neutro ? 'neutro' : ''}">${neutro ? '' : ic('trending-up', 'ic-sm')}${v}</div></div>`).join('');
}

function renderDias() {
  const W = 680, H = 230, mL = 30, mB = 24, mT = 8, pw = W - mL - 4, ph = H - mB - mT;
  const max = Math.ceil(Math.max(...DIAS.map(x => x.com + x.fora)) / 5) * 5;
  const bw = pw / DIAS.length, gap = 3, w = bw - gap;
  const y = v => mT + ph - (v / max) * ph;
  let s = '';
  for (let g = 0; g <= max; g += max / 4) s += `<line x1="${mL}" x2="${W}" y1="${y(g)}" y2="${y(g)}" stroke="#ece9e2" stroke-width="1"/><text x="${mL - 6}" y="${y(g) + 4}" text-anchor="end">${g}</text>`;
  DIAS.forEach((x, i) => {
    const x0 = mL + i * bw + gap / 2;
    const yCom = y(x.com), yTop = y(x.com + x.fora);
    s += `<rect x="${x0}" y="${yCom}" width="${w}" height="${mT + ph - yCom}" fill="#2f5d9e"/>`;
    const h2 = Math.max(yCom - yTop - 2, 0), r = Math.min(4, w / 2, h2);
    s += `<path d="M${x0},${yCom - 2} V${yTop + r} Q${x0},${yTop} ${x0 + r},${yTop} H${x0 + w - r} Q${x0 + w},${yTop} ${x0 + w},${yTop + r} V${yCom - 2} Z" fill="#d9962b"/>`;
    if (i % 5 === 4 || i === 29) s += `<text x="${x0 + w / 2}" y="${H - 6}" text-anchor="middle">${i === 29 ? 'Hoje' : x.d.getDate() + '/' + (x.d.getMonth() + 1)}</text>`;
    s += `<rect class="hit" data-i="${i}" x="${mL + i * bw}" y="${mT}" width="${bw}" height="${ph}" fill="transparent"/>`;
  });
  $('#g-dias').innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Contatos por dia nos últimos 30 dias">${s}</svg>`;
  const nomes = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  $('#g-dias').querySelectorAll('.hit').forEach(h => {
    h.addEventListener('mousemove', e => { const x = DIAS[h.dataset.i]; mostraDica(`<b>${nomes[x.d.getDay()]}, ${x.d.getDate()}/${x.d.getMonth() + 1}</b><br>Horário comercial: ${x.com}<br>Fora do horário: ${x.fora}<br>Total: ${x.com + x.fora}`, e); });
    h.addEventListener('mouseleave', escondeDica);
  });
  $('#r-dias').innerHTML = `<span>Horário comercial: <b>${TOTAL - FORA}</b></span><span>Fora do horário: <b>${FORA}</b> (${Math.round(FORA / TOTAL * 100)}%)</span><span>Média: <b>${Math.round(TOTAL / 30)}</b> por dia</span>`;
}

function hbar(alvo, linhas, base) {
  const max = Math.max(...linhas.map(l => l[1]));
  alvo.innerHTML = linhas.map(([n, v, extra]) => `<div class="hbar-linha" data-n="${n}" data-v="${v}"><span class="nome">${n}</span><span class="trilho"><span class="barra" style="width:0" data-w="${v / max * 100}"></span></span><span class="val">${v}${extra ? `<small>${extra}</small>` : ''}</span></div>`).join('');
  void alvo.offsetWidth;
  setTimeout(() => alvo.querySelectorAll('.barra').forEach(b => b.style.width = b.dataset.w + '%'), 60);
  alvo.querySelectorAll('.hbar-linha').forEach(l => {
    l.addEventListener('mousemove', e => mostraDica(`<b>${l.dataset.n}</b><br>${l.dataset.v}${base ? ` de ${base} (${Math.round(l.dataset.v / base * 100)}%)` : ''}`, e));
    l.addEventListener('mouseleave', escondeDica);
  });
}

function renderFunil() {
  const q = Math.round(TOTAL * .45);
  const linhas = [['Contatos', TOTAL], ['Qualificados', q], ['Visitas agendadas', 38], ['Propostas', 11], ['Fechados', 4]];
  hbar($('#g-funil'), linhas.map(([n, v]) => [n, v, Math.round(v / TOTAL * 100) + '%']), TOTAL);
}

function renderOrigem() {
  const p = [['Anúncio Instagram/Facebook', .35], ['Portais', .27], ['Site', .19], ['Indicação', .11], ['Instagram (direct)', .08]];
  hbar($('#g-origem'), p.map(([n, f]) => [n, Math.round(TOTAL * f)]), TOTAL);
}

function renderCalor() {
  const horas = ['6h', '8h', '10h', '12h', '14h', '16h', '18h', '20h', '22h'];
  const dias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const r = semente(21);
  const util = [1, 4, 6, 7, 5, 6, 8, 7, 4], fds = [1, 3, 7, 6, 4, 4, 7, 9, 6];
  const m = dias.map((_, d) => horas.map((_, h) => Math.round((d < 5 ? util[h] : fds[h]) * (d === 6 ? 1.15 : 1) * (.8 + r() * .45))));
  const max = Math.max(...m.flat());
  const rampa = ['#f8ecd4', '#f0d29c', '#e3b25e', '#c98a28', '#8f5c0c'];
  let pico = { v: 0 };
  let s = '<span></span>' + horas.map(h => `<span class="rc">${h}</span>`).join('');
  m.forEach((linha, d) => {
    s += `<span class="rl">${dias[d]}</span>`;
    linha.forEach((v, h) => {
      if (v > pico.v) pico = { v, d, h };
      const c = rampa[Math.min(4, Math.floor(v / max * 4.999))];
      s += `<span class="cel" style="background:${c}" data-t="<b>${dias[d]}, ${horas[h]} às ${parseInt(horas[h]) + 2}h</b><br>${v} contatos no mês"></span>`;
    });
  });
  $('#g-calor').innerHTML = s;
  $('#g-calor').querySelectorAll('.cel').forEach(c => { c.addEventListener('mousemove', e => mostraDica(c.dataset.t, e)); c.addEventListener('mouseleave', escondeDica); });
  const nomes = ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo'];
  $('#r-calor').innerHTML = `Pico: <b style="color:var(--text)">${nomes[pico.d]}, ${horas[pico.h]} às ${parseInt(horas[pico.h]) + 2}h</b>`;
}

const FEED = [
  ['bot', '#fbf3e2', '#8f5c0c', 'Assistente respondeu <b>Rafael Lima</b> por áudio em 6 s', 'hoje, 07:10'],
  ['user-check', '#eaf0f9', '#2f5d9e', '<b>Mariana Couto</b> passada para Carlos com visita marcada', 'ontem, 22:51'],
  ['repeat', '#fbf3e2', '#8f5c0c', 'Follow-up trouxe <b>Patrícia Alves</b> de volta', 'ontem, 10:41'],
  ['house', '#e5f5ec', '#1b8a56', 'Captação: <b>Eduardo Santos</b> quer vender casa no Carneirinhos', 'ontem, 16:08'],
  ['ban', '#f1f0ec', '#6c6a72', '<b>Joana Ribeiro</b> disse não. Nenhum follow-up será enviado', 'quarta, 10:02'],
];
function itemFeed([i, bg, cor, t, q], novo) { return `<div class="feed-item ${novo ? 'novo' : ''}"><span class="bola" style="background:${bg};color:${cor}">${ic(i)}</span><div>${t}<small>${q}</small></div></div>`; }
function renderFeed() { $('#feed').innerHTML = FEED.slice(0, 5).map(f => itemFeed(f)).join(''); }
function addFeed(f) { FEED.unshift(f); if (renderizado.painel) $('#feed').innerHTML = FEED.slice(0, 5).map((x, i) => itemFeed(x, i === 0)).join(''); }

const VISITAS = [
  ['Rafael Lima', 'Hoje, 18h30', 'al320', 'atend'],
  ['Fernanda Souza', 'Quarta, 17h', '230', 'juliana'],
  ['Patrícia Alves', 'Sexta, 15h', '193', 'juliana'],
  ['Mariana Couto', 'Sábado, 10h', '317', 'carlos'],
  ['Luciana Dias', 'Sábado, 11h30', '198', 'carlos'],
];
function renderVisitas() {
  $('#visitas').innerHTML = VISITAS.map(([n, q, ref, r]) => { const im = IMOVEIS[ref], p = EQUIPE[r]; return `<div class="feed-item"><img src="${img(ref)}" alt="" style="width:44px;height:34px;object-fit:cover;border-radius:7px"><div><b>${n}</b> · ${im.tipo}, ${im.bairro}<small>${q} com ${p.nome}</small></div></div>`; }).join('');
}

function renderTopImoveis() {
  const lista = Object.entries(IMOVEIS).sort((a, b) => b[1].procuras - a[1].procuras).slice(0, 5);
  $('#top-imoveis').innerHTML = lista.map(([ref, m]) => `<div class="top-imovel"><img src="${img(ref)}" alt=""><div><b>${m.tipo}, ${m.bairro}</b><small>Ref. ${ref.toUpperCase()} · ${m.neg === 'Aluguel' ? brl(m.preco) + '/mês' : brl(m.preco)}</small></div><div class="n">${m.procuras}<small>pedidos</small></div></div>`).join('');
}

/* ---------- Conversas ---------- */
let selecionada = null, filtro = 'todas';
function chipStatus(l) {
  if (l.status === 'ia') return `<span class="chip chip-ia">${ic('bot')}Com a assistente</span>`;
  if (l.status === 'eq') return `<span class="chip chip-eq">${ic('user-check')}Com ${EQUIPE[l.resp].nome}</span>`;
  if (l.status === 'ag') return `<span class="chip chip-ag">${ic('clock-3')}Aguardando cliente</span>`;
  return `<span class="chip chip-fim">${ic('check')}Encerrada</span>`;
}
function previa(l) {
  const m = [...l.msgs].reverse().find(x => x.de && x.de !== 'sis');
  if (!m) return '';
  const quem = m.de === 'ia' ? 'Assistente: ' : m.de === 'eq' ? EQUIPE[m.quem].nome + ': ' : '';
  return quem + (m.audio ? 'Áudio (' + m.audio + ')' : m.imovel ? 'Imóvel ref. ' + m.imovel.toUpperCase() : m.txt);
}
function renderLista() {
  const ls = LEADS.filter(l => filtro === 'todas' || l.status === filtro).sort((a, b) => b.ordem - a.ordem);
  $('#convs').innerHTML = ls.map(l => `<button class="conv ${l.id === selecionada ? 'sel' : ''} ${l.nova ? 'nova' : ''}" data-id="${l.id}"><span class="avatar" style="background:${corLead(l.nome)}">${iniciais(l.nome)}</span><span class="meio"><span class="l1"><b>${l.nome}</b><time>${l.quando}</time></span><span class="prev" style="display:block">${previa(l)}</span>${chipStatus(l)}</span></button>`).join('') || '<p style="padding:20px;color:var(--muted);font-size:13px">Nenhuma conversa aqui.</p>';
  $('#convs').querySelectorAll('.conv').forEach(b => b.onclick = () => abreConversa(b.dataset.id));
  const abertas = LEADS.filter(l => l.status === 'ia').length;
  $('#cont-conv').textContent = abertas;
}

function htmlMsg(m) {
  if (m.dia) return `<div class="dia">${m.dia}</div>`;
  if (m.de === 'sis') return `<div class="msg sis">${ic(m.ic || 'info')}<span>${m.txt}</span></div>`;
  const out = m.de !== 'cli';
  const autor = m.de === 'ia' ? `<div class="autor ia">${ic('bot')}Assistente</div>` : m.de === 'eq' ? `<div class="autor eq">${ic('user')}${EQUIPE[m.quem].nome}</div>` : '';
  const hora = `<div class="hora">${m.h || ''}${out ? ic('check-check') : ''}</div>`;
  let corpo;
  if (m.imovel) {
    const im = IMOVEIS[m.imovel];
    corpo = `<a class="imovel-msg" href="${SITE + im.url}" target="_blank" rel="noopener" style="display:block;text-decoration:none;color:inherit"><img src="${img(m.imovel)}" alt=""><div><b>${im.tipo} no ${im.bairro}</b><small>${im.q} quartos${im.s ? ', ' + im.s + (im.s > 1 ? ' suítes' : ' suíte') : ''} · ${im.v} ${im.v > 1 ? 'vagas' : 'vaga'} · Ref. ${m.imovel.toUpperCase()}</small><small><b style="color:#111;display:inline">${im.neg === 'Aluguel' ? brl(im.preco) + '/mês' : brl(im.preco)}</b></small><span>${ic('link-2', 'ic-sm')}brunorepolesimoveis.com.br</span></div></a>`;
  } else if (m.audio) {
    const r = semente(m.txt.length), ondas = Array.from({ length: 28 }, () => `<i style="height:${4 + Math.round(r() * 18)}px;animation-delay:${(r() * .8).toFixed(2)}s"></i>`).join('');
    corpo = `<div class="audio" data-dur="${m.audio}"><button class="play" aria-label="Tocar áudio">${ic('play')}</button><span class="ondas">${ondas}</span><span class="dur">${m.audio}</span>${m.de === 'ia' ? '<span class="foto">BR</span>' : ''}</div><div class="transc"><b>${m.de === 'cli' ? 'Transcrição' : 'Texto falado'}:</b> ${m.txt}</div>`;
  } else {
    corpo = (m.fu ? `<div class="tag-fu">${ic('repeat', 'ic-sm')}Follow-up automático</div><br>` : '') + m.txt;
  }
  return `<div class="msg ${out ? 'out' : 'cli'}">${autor}${corpo}${hora}</div>`;
}

function ligaAudios(raiz) {
  raiz.querySelectorAll('.audio .play').forEach(b => b.onclick = () => {
    const a = b.closest('.audio'); if (a.classList.contains('tocando')) return;
    a.classList.add('tocando'); b.innerHTML = ic('pause');
    const seg = a.dataset.dur.split(':').reduce((m, s) => m * 60 + +s, 0);
    setTimeout(() => { a.classList.remove('tocando'); b.innerHTML = ic('play'); }, Math.min(seg, 6) * 1000);
  });
}

function abreConversa(id) {
  selecionada = id;
  const l = LEADS.find(x => x.id === id); if (!l) return;
  l.naoLidas = 0; l.nova = false;
  renderLista();
  const podeDigitar = l.status === 'eq' && l.resp === 'atend';
  $('#chat').innerHTML = `
    <div class="chat-topo">
      <button class="icone-btn btn-voltar-chat" aria-label="Voltar">${ic('chevron-left')}</button>
      <span class="avatar" style="background:${corLead(l.nome)}">${iniciais(l.nome)}</span>
      <div><b>${l.nome}</b><small>${l.tel} · ${l.origem}</small></div>
      <div class="acoes">${l.status === 'ia' || l.status === 'ag' ? `<button class="btn" id="assumir">${ic('hand', 'ic-sm')}<span>Assumir conversa</span></button>` : l.status === 'eq' ? `<button class="btn" id="devolver">${ic('bot', 'ic-sm')}<span>Devolver pra assistente</span></button>` : ''}<button class="icone-btn" id="ver-ficha" aria-label="Ficha do lead">${ic('info')}</button></div>
    </div>
    <div class="mensagens" id="mensagens">${l.msgs.map(htmlMsg).join('')}</div>
    ${l.status === 'ia' || l.status === 'ag' ? `<div class="aviso-ia">${ic('bot', 'ic-sm')}<span>A assistente está cuidando desta conversa.</span><button id="assumir2">Assumir</button></div>` : ''}
    <div class="chat-base"><input class="campo" id="campo" placeholder="${podeDigitar ? 'Escreva uma mensagem' : l.status === 'eq' ? 'Conversa com ' + EQUIPE[l.resp].nome : 'Assuma a conversa para escrever'}" ${podeDigitar ? '' : 'disabled'}><button class="icone-btn" id="enviar" aria-label="Enviar">${ic('send')}</button></div>`;
  const box = $('#mensagens'); box.scrollTop = box.scrollHeight;
  ligaAudios(box);
  const assumir = () => {
    l.status = 'eq'; l.resp = 'atend'; l.ordem = Math.max(...LEADS.map(x => x.ordem)) + 1; l.quando = agoraHora();
    l.msgs.push({ de: 'sis', ic: 'hand', txt: 'Atendimento assumiu a conversa. A assistente parou de responder aqui.' });
    abreConversa(id); $('#campo').focus();
  };
  if ($('#assumir')) $('#assumir').onclick = assumir;
  if ($('#assumir2')) $('#assumir2').onclick = assumir;
  if ($('#devolver')) $('#devolver').onclick = () => { l.status = 'ia'; l.resp = null; l.msgs.push({ de: 'sis', ic: 'bot', txt: 'Conversa devolvida para a assistente.' }); abreConversa(id); };
  const enviar = () => { const c = $('#campo'); if (!c.value.trim() || c.disabled) return; l.msgs.push({ de: 'eq', quem: 'atend', h: agoraHora(), txt: c.value.trim().replace(/</g, '&lt;') }); l.quando = agoraHora(); abreConversa(id); };
  $('#enviar').onclick = enviar;
  $('#campo').onkeydown = e => { if (e.key === 'Enter') enviar(); };
  $('#ver-ficha').onclick = () => $('#ficha').classList.toggle('aberta');
  $('.btn-voltar-chat').onclick = () => { $('#v-conversas').classList.remove('mostra-chat'); selecionada = null; renderLista(); };
  $('#v-conversas').classList.add('mostra-chat');
  renderFicha(l);
}

function renderFicha(l) {
  const et = ETAPAS.find(e => e.id === l.etapa);
  $('#ficha').innerHTML = `
    <div class="ficha-cab"><span class="avatar" style="background:${corLead(l.nome)}">${iniciais(l.nome)}</span><b>${l.nome}</b><small>${l.tel}</small><div style="margin-top:8px">${chipStatus(l)}</div></div>
    <h4>Resumo da assistente</h4>
    <div class="resumo-ia"><div class="t">${ic('sparkles')}Escrito pela assistente</div>${l.resumo}</div>
    <h4>O que procura</h4>
    <div class="dado"><span>Negócio</span><b>${l.neg}</b></div>
    <div class="dado"><span>Interesse</span><b>${l.interesse}</b></div>
    ${l.valor ? `<div class="dado"><span>Valor</span><b>${valorCurto(l)}</b></div>` : ''}
    ${l.imovel ? `<div class="dado"><span>Imóvel</span><b>Ref. ${l.imovel.toUpperCase()}</b></div>` : ''}
    <h4>Andamento</h4>
    <div class="dado"><span>Origem</span><b>${l.origem}</b></div>
    <div class="dado"><span>Etapa</span><b>${et ? et.nome : 'Encerrado'}</b></div>
    <div class="dado"><span>Responsável</span><b>${l.resp ? EQUIPE[l.resp].nome : 'Assistente'}</b></div>
    <div class="dado"><span>Próximo passo</span><b>${l.proximo}</b></div>
    ${innerWidth <= 1280 ? '<button class="btn" style="margin-top:16px;width:100%;justify-content:center" onclick="document.getElementById(\'ficha\').classList.remove(\'aberta\')">Fechar</button>' : ''}`;
}

function renderConversas() {
  renderLista();
  $('#filtros').querySelectorAll('button').forEach(b => b.onclick = () => { filtro = b.dataset.f; $('#filtros').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); renderLista(); });
}

/* ---------- Funil ---------- */
function renderKanban() {
  const ativos = LEADS.filter(l => l.etapa);
  const vgv = ativos.filter(l => l.neg === 'Compra' && l.etapa !== 'fechado').reduce((s, l) => s + l.valor, 0);
  $('#funil-total').innerHTML = `<b>${ativos.length}</b> leads no funil · Potencial em vendas: <b>${brl(vgv)}</b>`;
  $('#kanban').innerHTML = ETAPAS.map(e => {
    const cs = ativos.filter(l => l.etapa === e.id).sort((a, b) => b.ordem - a.ordem);
    return `<div class="coluna" data-e="${e.id}"><div class="col-cab"><i style="background:${e.cor}"></i><div>${e.nome}</div><span class="n">${cs.length}</span></div>${cs.map(l => `
      <div class="lead-card ${l.chegou ? 'chegou' : ''}" draggable="true" data-id="${l.id}"><b>${l.nome}</b><div class="int">${l.interesse}</div>
      <div class="pe">${l.valor ? `<span class="valor">${valorCurto(l)}</span>` : `<span class="chip chip-ok">${ic('house')}Captação</span>`}<span class="chip chip-ag" style="font-size:10.5px">${l.origem.replace('Anúncio no ', '')}</span>
      ${l.resp ? `<span class="avatar" style="background:${EQUIPE[l.resp].cor}" title="${EQUIPE[l.resp].nome}">${EQUIPE[l.resp].sigla}</span>` : `<span class="avatar" style="background:#d9962b" title="Assistente">${ic('bot', 'ic-sm')}</span>`}</div></div>`).join('')}</div>`;
  }).join('');
  ativos.forEach(l => l.chegou = false);
  let arrastado = null;
  $('#kanban').querySelectorAll('.lead-card').forEach(c => {
    c.ondragstart = () => { arrastado = c.dataset.id; c.classList.add('arrastando'); };
    c.ondragend = () => c.classList.remove('arrastando');
    c.onclick = () => { location.hash = 'conversas'; setTimeout(() => abreConversa(c.dataset.id), 0); };
  });
  $('#kanban').querySelectorAll('.coluna').forEach(col => {
    col.ondragover = e => { e.preventDefault(); col.classList.add('alvo'); };
    col.ondragleave = () => col.classList.remove('alvo');
    col.ondrop = e => {
      e.preventDefault(); col.classList.remove('alvo');
      const l = LEADS.find(x => x.id === arrastado); if (!l || l.etapa === col.dataset.e) return;
      l.etapa = col.dataset.e; l.chegou = true;
      const et = ETAPAS.find(x => x.id === l.etapa);
      renderKanban();
      avisa(`${l.nome} foi para ${et.nome}`, 'O painel e os relatórios já foram atualizados.', 'kanban');
      if (l.etapa === 'fechado') addFeed(['star', '#e5f5ec', '#1b8a56', `Negócio fechado com <b>${l.nome}</b>`, 'agora']);
    };
  });
}

/* ---------- Follow-ups ---------- */
const FOLLOWUPS = [
  { quando: 'Hoje', h: '10:00', lead: 'Gustavo Pereira', motivo: 'Não respondeu sobre a visita na casa do Lourdes', toque: '1º toque', msg: 'Oi, Gustavo! Ficou alguma dúvida sobre a casa do Lourdes? Se quiser, consigo uma visita amanhã no fim da tarde.', st: 'ag' },
  { quando: 'Hoje', h: '14:30', lead: 'Camila Rocha', motivo: 'Pediu aviso de apartamento até R$ 300 mil perto do centro', toque: '2º toque', msg: 'Oi, Camila! Ainda não entrou apartamento nessa faixa perto do centro. Se puder ampliar a região, tenho opções no Lucília. Quer ver?', st: 'ag' },
  { quando: 'Amanhã', h: '09:00', lead: 'Aline Martins', motivo: 'Não respondeu sobre bairro e valor', toque: '1º toque', msg: 'Oi, Aline! Pra te mandar as casas certas, me conta: qual bairro você prefere e até quanto pensa em pagar?', st: 'ag' },
  { quando: 'Amanhã', h: '11:00', lead: 'Fernanda Souza', motivo: 'Lembrete da visita de quarta, 17h', toque: 'Lembrete', msg: 'Oi, Fernanda! Passando pra confirmar a visita de amanhã, às 17h, no apartamento do Castelo. A Juliana te espera lá.', st: 'ag' },
  { quando: 'Sexta', h: '09:30', lead: 'Mariana Couto', motivo: 'Lembrete da visita de sábado, 10h', toque: 'Lembrete', msg: 'Oi, Mariana! Amanhã às 10h é a visita no Lucília com o Carlos. Tudo certo pra você?', st: 'ag' },
  { quando: 'Ontem', h: '10:00', lead: 'Patrícia Alves', motivo: 'Respondeu e marcou visita', toque: '2º toque', msg: 'Oi, Patrícia! Passando pra saber se ainda tem interesse na casa do Satélite. Se quiser, consigo uma visita essa semana.', st: 'ok' },
  { quando: 'Quarta', h: '09:30', lead: 'Joana Ribeiro', motivo: 'Disse que já fechou com outra imobiliária', toque: 'Encerrado', msg: 'Nenhum toque novo. Cliente disse não.', st: 'bad' },
];
function renderFollowups() {
  const k = [['repeat', 'Agendados', FOLLOWUPS.filter(f => f.st === 'ag').length, 'próximos 7 dias'], ['send', 'Enviados no mês', 64, 'só em horário comercial'], ['message-circle', 'Responderam', 27, '42% dos enviados'], ['calendar-check', 'Visitas que vieram de follow-up', 9, 'leads que tinham sumido']];
  $('#fu-kpis').innerHTML = k.map(([i, r, n, v]) => `<div class="card kpi"><div class="rot">${ic(i)}${r}</div><div class="num">${n}</div><div class="var neutro">${v}</div></div>`).join('');
  const chip = { ag: `<span class="chip chip-ia">${ic('clock-3')}Agendado</span>`, ok: `<span class="chip chip-ok">${ic('check')}Respondeu</span>`, bad: `<span class="chip chip-bad">${ic('ban')}Cancelado</span>` };
  $('#fu-lista').innerHTML = FOLLOWUPS.map(f => `<div class="fu-item"><div class="quando"><b>${f.quando}</b><small>${f.h}</small></div><div class="q"><b>${f.lead}</b> · ${f.toque}<small>${f.motivo}</small><div class="prev">${f.msg}</div></div><div>${chip[f.st]}</div></div>`).join('');
}

/* ---------- Imóveis ---------- */
function renderImoveis() {
  $('#imo-grade').innerHTML = Object.entries(IMOVEIS).map(([ref, m]) => `
    <div class="card imo"><div class="foto"><img src="${img(ref)}" alt="${m.tipo} no ${m.bairro}" loading="lazy"><span class="chip chip-ok">${ic('check')}No site</span><span class="ref">Ref. ${ref.toUpperCase()}</span></div>
    <div class="info"><b>${m.tipo} no ${m.bairro}</b><div class="preco">${m.neg === 'Aluguel' ? brl(m.preco) + '<small style="font-size:12px;color:var(--muted)">/mês</small>' : brl(m.preco)}</div>
    <div class="specs"><span>${ic('bed-double', 'ic-sm')}${m.q} quartos</span><span>${ic('car', 'ic-sm')}${m.v} ${m.v > 1 ? 'vagas' : 'vaga'}</span><span>${ic('map-pin', 'ic-sm')}${m.neg}</span></div>
    <div class="uso"><div><b>${m.procuras}</b><small>pedidos no mês</small></div><div><b>${m.enviados}</b><small>enviados pela assistente</small></div></div>
    <a class="btn" style="margin-top:10px;width:100%;justify-content:center" href="${SITE + m.url}" target="_blank" rel="noopener">${ic('external-link', 'ic-sm')}Ver no site</a></div></div>`).join('');
}

/* ---------- Equipe ---------- */
function renderRodizio() {
  const ordem = rodizio.filter(r => !foraRodizio.has(r)).concat(rodizio.filter(r => foraRodizio.has(r)));
  const vez = ordem.find(r => !foraRodizio.has(r));
  $('#rodizio').innerHTML = ordem.map((r, i) => { const p = EQUIPE[r]; return `<div class="rod ${r === vez ? 'vez' : ''}"><span class="pos">${i + 1}</span><span class="avatar" style="background:${p.cor}">${p.sigla}</span><div><b>${p.nome}</b><small>${foraRodizio.has(r) ? 'Fora do rodízio' : r === vez ? 'Próximo lead é dele(a)' : 'Na fila'}</small></div><div class="dir">${r === vez ? '<span class="chip chip-ia">Da vez</span>' : ''}<button class="chave ${foraRodizio.has(r) ? '' : 'on'}" data-r="${r}" aria-label="Disponível"></button></div></div>`; }).join('')
    + `<div class="rod"><span class="pos">${ic('house', 'ic-sm')}</span><span class="avatar" style="background:${EQUIPE.bruno.cor}">BR</span><div><b>Bruno</b><small>Recebe toda captação de imóvel</small></div></div>
       <div class="rod"><span class="pos">${ic('message-circle', 'ic-sm')}</span><span class="avatar" style="background:${EQUIPE.atend.cor}">AT</span><div><b>Atendimento</b><small>Locação, documentos e o que a assistente não sabe</small></div></div>`;
  $('#rodizio').querySelectorAll('.chave').forEach(c => c.onclick = () => {
    const r = c.dataset.r;
    if (foraRodizio.has(r)) foraRodizio.delete(r); else { if (rodizio.filter(x => !foraRodizio.has(x)).length === 1) return avisa('Precisa de alguém no rodízio', 'Pelo menos um corretor tem que ficar disponível.', 'info'); foraRodizio.add(r); }
    renderRodizio();
  });
}
function renderEquipe() {
  renderRodizio();
  const linhas = [['carlos', 52, 17, 6, 2, '6 min'], ['juliana', 49, 15, 4, 2, '9 min'], ['bruno', 8, 5, 0, 0, '12 min'], ['atend', 17, 4, 0, 0, '4 min']];
  const max = 52;
  $('#tab-eq').innerHTML = `<tr><th>Pessoa</th><th>Leads recebidos</th><th>Visitas</th><th>Propostas</th><th>Fechados</th><th>Tempo pra assumir</th></tr>` + linhas.map(([r, le, vi, pr, fe, t]) => { const p = EQUIPE[r]; return `<tr><td class="nome"><span class="avatar" style="background:${p.cor}">${p.sigla}</span><div>${p.nome}<small>${p.papel}</small></div></td><td><div style="display:flex;align-items:center;gap:8px"><b>${le}</b><span class="mini-trilho"><i style="width:${le / max * 100}%"></i></span></div></td><td>${vi}</td><td>${pr || '-'}</td><td>${fe || '-'}</td><td>${t}</td></tr>`; }).join('');
}

/* ---------- Regras da assistente ---------- */
function checks(alvo, itens) {
  $(alvo).innerHTML = itens.map(([t, on]) => `<div class="check ${on ? 'on' : ''}" role="checkbox" tabindex="0" aria-checked="${on}"><span class="caixa">${ic('check')}</span>${t}</div>`).join('');
  $(alvo).querySelectorAll('.check').forEach(c => c.onclick = () => { c.classList.toggle('on'); c.setAttribute('aria-checked', c.classList.contains('on')); });
}
function renderAssistente() {
  checks('#ch-passar', [['O cliente quer visitar ou marcar horário', 1], ['Pede desconto, permuta ou condição de pagamento', 1], ['Quer vender ou alugar o imóvel dele (captação)', 1], ['Manda foto ou documento', 1], ['Reclama ou pede pra falar com uma pessoa', 1], ['Pergunta algo que não está na base de conhecimento', 1]]);
  checks('#ch-nunca', [['Inventar preço, condição ou disponibilidade', 1], ['Prometer desconto ou aprovação de financiamento', 1], ['Insistir depois que o cliente disse não', 1], ['Dizer que é uma pessoa, se perguntarem', 1]]);
  checks('#ch-quali', [['Compra ou aluguel', 1], ['Bairro ou região', 1], ['Faixa de valor', 1], ['Quartos e vagas', 1], ['Financiamento, FGTS ou recurso próprio', 1], ['Prazo pra mudar', 1], ['Tem imóvel pra dar de entrada', 0]]);
  const base = [['file-text', 'Documentos da locação', 'RG, CPF, comprovantes de renda e residência'], ['wallet', 'Garantias aceitas', 'Seguro fiança ou caução'], ['building-2', 'Financiamento e FGTS', 'Como funciona e o que o corretor vê com o cliente'], ['map-pin', 'Região atendida', 'João Monlevade e cidades vizinhas'], ['clock-3', 'Horário da equipe', 'Seg a sex, 8h às 18h. Sáb, 8h às 12h'], ['calendar-check', 'Como funciona a visita', 'Pré-agenda e o corretor confirma']];
  $('#base').innerHTML = base.map(([i, t, s]) => `<div><b>${ic(i)}${t}</b><small>${s}</small></div>`).join('');
  document.querySelectorAll('#v-assistente .chave').forEach(c => c.onclick = () => c.classList.toggle('on'));
  document.querySelectorAll('#v-assistente [data-grupo] button').forEach(b => b.onclick = () => b.parentElement.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)));
  const r = semente(3);
  $('#voz-ondas').innerHTML = Array.from({ length: 22 }, () => `<i style="height:${5 + Math.round(r() * 17)}px;animation-delay:${(r() * .7).toFixed(2)}s"></i>`).join('');
  $('#voz .play').onclick = () => {
    const v = $('#voz'); if (v.classList.contains('tocando')) return;
    v.classList.add('tocando'); setTimeout(() => v.classList.remove('tocando'), 3500);
    avisa('Prévia da voz', 'Na versão de vocês, aqui toca a voz gravada pela equipe.', 'audio-lines');
  };
}

const RENDER = {
  painel: () => { renderKpis(); renderDias(); renderFunil(); renderOrigem(); renderCalor(); renderFeed(); renderVisitas(); renderTopImoveis(); },
  conversas: renderConversas, funil: renderKanban, followups: renderFollowups, imoveis: renderImoveis, equipe: renderEquipe, assistente: renderAssistente,
};

/* ---------- Simulação de um contato novo ---------- */
async function simular() {
  if (simRodando) return;
  simRodando = true; $('#btn-simular').disabled = true; $('#btn-simular').style.opacity = .6;
  const base = SIMULACOES[simIndice % SIMULACOES.length];
  const volta = Math.floor(simIndice / SIMULACOES.length);
  simIndice++;
  const corretor = rodizio.find(r => !foraRodizio.has(r)) || 'carlos';
  const l = { ...base, id: base.id + volta, etapa: 'novo', status: 'ia', resp: null, quando: agoraHora(), ordem: Math.max(...LEADS.map(x => x.ordem)) + 1, nova: true, msgs: [{ dia: 'Hoje' }] };
  LEADS.unshift(l);
  avisa(`Novo contato: ${l.nome}`, `Chegou pelo ${l.origem.toLowerCase()}. A assistente já está respondendo.`, 'message-circle');
  addFeed(['message-circle', '#fbf3e2', '#8f5c0c', `Novo contato: <b>${l.nome}</b>, pelo ${l.origem.toLowerCase()}`, 'agora']);
  if (location.hash !== '#conversas') location.hash = 'conversas';
  filtro = 'todas'; document.querySelectorAll('#filtros button').forEach(x => x.classList.toggle('on', x.dataset.f === 'todas'));
  await espera(120);
  abreConversa(l.id);
  let t0 = Date.now();
  for (const passo of base.roteiro) {
    const aberta = () => selecionada === l.id && $('#mensagens');
    if (passo.de === 'cli' || passo.de === 'ia') {
      if (aberta()) { $('#mensagens').insertAdjacentHTML('beforeend', `<div class="digitando ${passo.de === 'cli' ? 'cli' : ''}" id="dig"><i></i><i></i><i></i></div>`); $('#mensagens').scrollTop = 1e6; }
      await espera(passo.imovel ? 700 : passo.de === 'cli' ? 1500 : 1300);
      const d = $('#dig'); if (d) d.remove();
    } else await espera(600);
    const m = { ...passo, h: agoraHora() };
    if (m.txt) m.txt = m.txt.replace('{corretor}', EQUIPE[corretor].nome);
    l.msgs.push(m); l.quando = agoraHora();
    if (aberta()) { $('#mensagens').insertAdjacentHTML('beforeend', htmlMsg(m)); ligaAudios($('#mensagens')); $('#mensagens').scrollTop = 1e6; }
    if (passo.de === 'ia' && !passo.imovel && t0) { $('#ult-resp').textContent = Math.max(2, Math.round((Date.now() - t0) / 1000)) + ' s'; t0 = 0; }
    if (passo.de === 'cli') t0 = Date.now();
    if (l.msgs.length === 5) { l.etapa = 'qualificando'; }
    renderLista();
  }
  l.etapa = 'visita'; l.status = 'eq'; l.resp = corretor; l.chegou = true;
  l.proximo = base.proximo + ', com ' + EQUIPE[corretor].nome;
  rodizio = rodizio.filter(r => r !== corretor).concat(corretor);
  if (renderizado.equipe) renderRodizio();
  if (renderizado.funil) renderKanban();
  VISITAS.unshift([l.nome, base.proximo.replace('Visita ', '').replace(/^./, c => c.toUpperCase()), l.imovel, corretor]);
  if (renderizado.painel) renderVisitas();
  addFeed(['user-check', '#eaf0f9', '#2f5d9e', `<b>${l.nome}</b> passado para ${EQUIPE[corretor].nome} com visita marcada`, 'agora']);
  avisa(`Lead qualificado para ${EQUIPE[corretor].nome}`, `${l.interesse}. Visita pré-agendada. O resumo já está na ficha.`, 'user-check');
  if (selecionada === l.id) abreConversa(l.id);
  simRodando = false; $('#btn-simular').disabled = false; $('#btn-simular').style.opacity = 1;
}
$('#btn-simular').onclick = simular;
$('#btn-sino').onclick = () => avisa('Avisos no celular', 'Cada corretor recebe no WhatsApp dele o lead que for da vez, com o resumo.', 'bell');

/* Início */
vai();
if (new URLSearchParams(location.search).has('simular')) setTimeout(simular, 900);
