import Image from "next/image";
import Link from "@/components/SiteLink";
import { ArrowUpRight, CalendarDays, CarFront, Check, ClipboardList, Clock3, Droplets, MapPin, MessageCircle, Phone, Star, Wrench } from "lucide-react";
import { avaliacoes, orcamentoRapido, site, whatsapp } from "@/config/site";
import { LocationMap } from "./LocationMap";
import { MotionLink } from "./MotionLink";
import { PhotoGallery } from "./PhotoGallery";

export function About() {
  return <section className="section about-section light-section"><div className="container about-grid">
    <div className="about-image"><Image src="/images/optimized/oficina-estrutura-960.webp" alt="Pneus organizados na Salgueiro, com a área de oficina ao fundo" fill sizes="(max-width: 760px) 100vw, 50vw" /><div className="image-label"><MapPin size={15} /> Salgueiro, no Maiobão</div></div>
    <div className="about-copy"><h2>Gente de verdade.<br /><span className="muted-title">Cuidado de perto.</span></h2><p>Na Av. 9, no Maiobão, a Salgueiro reúne oficina, lavajato e uma loja de pneus e autopeças nacionais e importadas.</p><p>Conte à equipe o que precisa, tire suas dúvidas e combine os detalhes antes de trazer seu carro.</p><ul className="check-list"><li><Check size={17} /> Mecânica e manutenção no mesmo endereço</li><li><Check size={17} /> Loja de peças, pneus e baterias</li><li><Check size={17} /> Atendimento de segunda a sábado</li></ul><Link className="text-link" href="/contato/">Veja como chegar <ArrowUpRight size={18} /></Link></div>
  </div></section>;
}

export function Wash() {
  const cuidados = [
    { nome: "Oficina", Icon: Wrench, tag: "Cuidado por dentro", texto: "Manutenção de acordo com a necessidade do seu veículo.", itens: ["Mecânica geral", "Troca de óleo", "Alinhamento e balanceamento"], botao: "Consultar oficina", href: orcamentoRapido("oficina") },
    { nome: "Lavajato", Icon: Droplets, tag: "Cuidado por fora", texto: "Inclua a lavagem nos cuidados do seu dia a dia.", itens: ["Informe o modelo do carro", "Consulte as opções de lavagem", "Combine o atendimento"], botao: "Consultar lavagem", href: orcamentoRapido("lavajato") },
    { nome: "Autopeças", Icon: CarFront, tag: "A peça que você procura", texto: "Peças, pneus e baterias com aplicação e estoque sob consulta.", itens: ["Peças nacionais e importadas", "Pneus e baterias", "Compatibilidade confirmada pela equipe"], botao: "Consultar peças", href: whatsapp("Olá! Vim pelo site da Salgueiro e gostaria de consultar uma peça para meu carro.") },
  ];
  return <section className="section wash-section" id="lavajato"><div className="container"><p className="section-label">Escolha seu atendimento</p><h2>Da oficina ao lavajato,<br />a gente cuida com você.</h2><div className="care-grid">{cuidados.map((c, i) => <article className={`care-card ${i === 1 ? "featured" : ""}`} key={c.nome}><span className="care-tag"><c.Icon size={17} />{c.tag}</span><h3>{c.nome}</h3><p>{c.texto}</p><ul>{c.itens.map(item => <li key={item}><Check size={14} />{item}</li>)}</ul><MotionLink label={c.botao} href={c.href} target="_blank" rel="noopener noreferrer" className={i === 1 ? "button-dark" : ""} /></article>)}</div><p className="care-note">Valores, modalidades, aplicação de peças e disponibilidade são confirmados diretamente com a equipe.</p></div></section>;
}

export function Gallery() {
  return <PhotoGallery />;
}

export function Impact() {
  return <section className="section impact-section light-section"><div className="container"><div className="impact-card"><div className="impact-copy"><p className="section-label">A Salgueiro</p><h2>O cuidado com seu carro<br />tem endereço certo.</h2><p>Oficina, lavajato e autopeças na Av. 9, no Maiobão. Fale com a equipe e combine o atendimento que seu carro precisa.</p><ul className="impact-facts"><li><Clock3 /><span><strong>7h30 às 17h</strong><small>De segunda a sábado</small></span></li><li><Star /><span><strong>{site.avaliacao.nota} no Google</strong><small>{site.avaliacao.total} avaliações · consulta em {site.avaliacao.consultadoEm}</small></span></li><li><MapPin /><span><strong>Maiobão</strong><small>Paço do Lumiar, Maranhão</small></span></li></ul><Link href="/sobre/" className="button">Conheça a Salgueiro <ArrowUpRight size={17} /></Link></div><div><div className="impact-photo"><Image src="/images/optimized/pneus-960.webp" alt="Equipe da Salgueiro trabalhando na oficina com carros nos elevadores" fill sizes="(max-width: 700px) 100vw, 50vw" /></div><div className="impact-links"><Link className="impact-link" href="/horarios/"><span>Oficina e manutenção<br />do seu jeito.</span><span className="round-arrow"><ArrowUpRight size={18} /></span></Link><Link className="impact-link" href="/contato/"><Image src="/images/optimized/salgueiro-oficina-960.webp" alt="Fachada real da Salgueiro no Maiobão" fill sizes="25vw" /><span>Encontre a gente.</span><span className="round-arrow"><ArrowUpRight size={18} /></span></Link></div></div></div></div></section>;
}

export function Process() {
  const etapas = [
    { nome: "Converse", Icon: MessageCircle, texto: "Conte o modelo do veículo e o que você precisa." },
    { nome: "Consulte", Icon: ClipboardList, texto: "Tire dúvidas sobre serviços, valores e peças." },
    { nome: "Combine", Icon: CalendarDays, texto: "Confirme a disponibilidade e o atendimento com a equipe." },
    { nome: "Venha", Icon: CarFront, texto: "Traga seu carro até a Salgueiro, no Maiobão." },
  ];
  return <section className="section process-section"><div className="container"><p className="section-label">Como funciona</p><h2>Uma conversa.<br />O próximo passo é com a gente.</h2><div className="process-grid">{etapas.map((e, i) => <article className="process-step" key={e.nome}><div className="process-step-top"><e.Icon /><span>{String(i + 1).padStart(2, "0")}</span></div><h3>{e.nome}</h3><p>{e.texto}</p></article>)}</div><div className="process-note"><strong>Seu carro. O cuidado que ele precisa.</strong><span>Sem orçamento automático: você consulta, tira dúvidas e combina tudo diretamente com a equipe.</span></div></div></section>;
}

export function Reputation() {
  return <section className="section reputation light-section"><div className="container"><div className="reputation-inner"><div><h2>Quem passa por aqui<br /><span className="muted-title">conta como foi.</span></h2><a className="text-link" href={site.mapa} target="_blank" rel="noopener noreferrer">Ler avaliações no Google <ArrowUpRight size={18} /></a></div><div className="reputation-score"><strong>{site.avaliacao.nota}<small>/ 5</small></strong><div className="rating-stars" aria-label="4,8 de 5 estrelas">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={16} fill="currentColor" />)}</div><span>{site.avaliacao.total} avaliações no Google</span><small>Consultado em {site.avaliacao.consultadoEm}</small></div></div>
    <div className="reviews-grid">{avaliacoes.map(r => <figure className="review" key={r.nome}><blockquote>“{r.trecho}”</blockquote><figcaption><strong>{r.nome}</strong><a href={r.perfil} target="_blank" rel="noopener noreferrer">Avaliação pública no Google Maps <ArrowUpRight size={13} /></a></figcaption></figure>)}</div><p className="review-note">Trechos de avaliações públicas. A nota é uma consulta datada, sem atualização automática.</p>
  </div></section>;
}

export function Location() {
  return <section className="section location-section" id="localizacao"><div className="container location-grid"><div><h2>A gente se encontra<br /><span className="muted-title">aqui no Maiobão.</span></h2><div className="contact-detail"><MapPin /><div><h3>{site.endereco}</h3><p>Maiobão · {site.cidade}<br />CEP {site.cep}</p></div></div><div className="contact-detail"><Clock3 /><div><h3>{site.horario}</h3><p>Domingo fechado.<br /><small>Em feriados, confirme o horário com a equipe.</small></p></div></div><div className="contact-detail"><Phone /><div><h3>Telefone e WhatsApp</h3><a href={"tel:+" + site.whatsapp}>{site.telefone}</a></div></div><a className="button" href={site.mapa} target="_blank" rel="noopener noreferrer">Traçar rota até a Salgueiro <ArrowUpRight size={19} /></a></div><LocationMap /></div></section>;
}

export function ContactBanner() {
  return <section className="contact-banner"><div className="container"><div><h2>Seu próximo cuidado<br />começa por aqui.</h2><p>Fale com a equipe e combine o atendimento.</p></div><a className="button button-dark" href={whatsapp()} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} /> Conversar no WhatsApp <ArrowUpRight size={19} /></a></div></section>;
}
