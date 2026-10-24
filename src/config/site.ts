// Dados consultados em 23/10/2026 no perfil fornecido pelo usuário:
// https://maps.app.goo.gl/KmWV1oBNv76wHkei6
// Lavajato: atividade informada pelo usuário; modalidades e preços sob consulta.
export const site = {
  nome: "Centro Automotivo Salgueiro",
  telefone: "(98) 98743-0111",
  whatsapp: "5598987430111",
  endereco: "Av. 9, casa 33, quadra 56 — Maiobão",
  cidade: "Paço do Lumiar — MA",
  cep: "65130-000",
  mapa: "https://maps.app.goo.gl/KmWV1oBNv76wHkei6",
  instagram: "https://www.instagram.com/salgueiro_centro_automotivo/",
  instagramHandle: "salgueiro_centro_automotivo",
  horario: "Segunda a sábado, das 7h30 às 17h",
  avaliacao: { nota: "4,8", total: 17, consultadoEm: "23/10/2026" },
} as const;

// Prévias curadas do perfil público, conferidas em 24/10/2026; não é um feed automático.
export const instagramPosts = [
  { titulo: "Troca de óleo", imagem: "/images/instagram-troca-oleo.jpg", largura: 640, altura: 640, data: "2026-10-23", dataTexto: "23 out 2026", url: "https://www.instagram.com/salgueiro_centro_automotivo/p/De2MEjjh0k4/", alt: "Publicação da Salgueiro sobre troca de óleo, com óleos e o contato da empresa" },
  { titulo: "Revisão para viajar", imagem: "/images/instagram-revisao-viagem.jpg", largura: 482, altura: 640, data: "2026-10-21", dataTexto: "21 out 2026", url: "https://www.instagram.com/salgueiro_centro_automotivo/p/DexQHxHufV0/", alt: "Publicação da Salgueiro sobre revisão do veículo antes de viajar" },
] as const;

export function whatsapp(mensagem = "Olá! Vim pelo site da Salgueiro e gostaria de um orçamento.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export function orcamentoRapido(tipo: "oficina" | "lavajato") {
  return whatsapp(tipo === "lavajato"
    ? "Olá! Vim pelo site da Salgueiro. Gostaria de consultar as opções de lavagem e os valores para meu carro."
    : "Olá! Vim pelo site da Salgueiro. Gostaria de um orçamento de oficina para meu veículo.");
}

// Trechos literais conferidos no Maps em português, em 23/10/2026.
export const avaliacoes = [
  { nome: "Abraao Batista", trecho: "Preço justo e honesto.", perfil: "https://www.google.com/maps/contrib/113623483848323016936?hl=pt-BR" },
  { nome: "Ivan Kleyton", trecho: "o atendimento é sempre excelente.", perfil: "https://www.google.com/maps/contrib/116770514833875450623?hl=pt-BR" },
] as const;

export const servicos = [
  { id: "mecanica", nome: "Mecânica geral", categoria: "oficina", icone: "wrench", descricao: "Conte o que seu carro precisa. Nossa equipe avalia o serviço e prepara o orçamento.", detalhe: "Avaliação e manutenção" },
  { id: "lavagem", nome: "Lavagem automotiva", categoria: "lavajato", icone: "wash", descricao: "Um cuidado a mais na sua rotina. Consulte as opções de lavagem e a disponibilidade da equipe.", detalhe: "Opções sob consulta" },
  { id: "oleo", nome: "Troca de óleo", categoria: "oficina", icone: "oil", descricao: "Óleo e filtros conforme a necessidade do seu veículo. Consulte a aplicação antes da troca.", detalhe: "Óleo do motor e filtros" },
  { id: "alinhamento", nome: "Alinhamento e balanceamento", categoria: "oficina", icone: "wheel", descricao: "Cuidado com o conjunto de rodas para a manutenção e o comportamento do seu carro na estrada.", detalhe: "Cuidados com as rodas" },
  { id: "cambio", nome: "Óleo de câmbio automático", categoria: "oficina", icone: "gear", descricao: "Consulte o procedimento e o fluido indicado para o modelo e o câmbio do seu veículo.", detalhe: "Consulte a aplicação" },
  { id: "pecas", nome: "Pneus e autopeças", categoria: "oficina", icone: "parts", descricao: "Peças nacionais e importadas, pneus e baterias. Fale com a equipe para consultar compatibilidade e estoque.", detalhe: "Disponibilidade sob consulta" },
] as const;
