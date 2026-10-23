import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Clock3, Droplets, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import { avaliacoes, orcamentoRapido, site, whatsapp } from "@/config/site";
import { LocationMap } from "./LocationMap";

export function About() {
  return <section className="section about-section light-section"><div className="container about-grid">
    <div className="about-image"><Image src="/images/oficina-estrutura.jpg" alt="Pneus organizados na Salgueiro, com a área de oficina ao fundo" fill sizes="(max-width: 760px) 100vw, 50vw" /><div className="image-label"><MapPin size={15} /> Salgueiro, no Maiobão</div></div>
    <div className="about-copy"><h2>Gente de verdade.<br /><span className="muted-title">Cuidado de perto.</span></h2><p>Na Av. 9, no Maiobão, a Salgueiro reúne oficina, lavajato e uma loja de pneus e autopeças nacionais e importadas.</p><p>Conte à equipe o que precisa, tire suas dúvidas e combine os detalhes antes de trazer seu carro.</p><ul className="check-list"><li><Check size={17} /> Mecânica e manutenção no mesmo endereço</li><li><Check size={17} /> Loja de peças, pneus e baterias</li><li><Check size={17} /> Atendimento de segunda a sábado</li></ul><Link className="text-link" href="/contato/">Veja como chegar <ArrowUpRight size={18} /></Link></div>
  </div></section>;
}

export function Wash() {
  return <section className="section wash-section" id="lavajato"><div className="container wash-grid">
    <div className="wash-copy"><Droplets className="wash-symbol" size={40} strokeWidth={1.3} /><h2>A manutenção em dia.<br /><span>O carro limpo também.</span></h2><p>O lavajato também faz parte da Salgueiro. Um lugar para incluir a lavagem nos cuidados com o seu carro.</p><p>Consulte as modalidades, os valores e a disponibilidade diretamente com a equipe.</p><a className="button" href={orcamentoRapido("lavajato")} target="_blank" rel="noopener noreferrer">Consultar lavagem <ArrowUpRight size={19} /></a></div>
    <div className="wash-details"><h3>Vamos combinar sua lavagem?</h3><p>Informe o modelo do carro e o que você procura. A equipe orienta as opções e confirma o atendimento.</p><Link className="text-link" href="/horarios/">Prefiro preparar um pedido <ArrowUpRight size={18} /></Link><figure className="wash-review"><blockquote>“Lava Jato excelente, dxa seu carro limpinho e brilhando!!”</blockquote><figcaption><a href="https://www.google.com/maps/contrib/103966249480120719022?hl=pt-BR" target="_blank" rel="noopener noreferrer">Trecho de avaliação no Google Maps <ArrowUpRight size={13} /></a></figcaption></figure></div>
  </div></section>;
}

export function Gallery() {
  return <section className="section gallery-section"><div className="container"><div className="section-heading"><h2>Portas abertas.<br /><span className="muted-title">Conheça a nossa estrutura.</span></h2><a href={site.mapa} className="text-link" target="_blank" rel="noopener noreferrer">Mais fotos no Google Maps <ArrowUpRight size={18} /></a></div>
    <div className="gallery-grid"><figure><Image src="/images/pneus.jpg" alt="Pessoas trabalhando na oficina Salgueiro com carros nos elevadores" width={1200} height={900} /><figcaption>A oficina e a equipe em atividade</figcaption></figure><figure><Image src="/images/autopecas.jpg" alt="Balcão real da loja Salgueiro, com peças e acessórios nas prateleiras" width={1200} height={900} /><figcaption>Peças e acessórios na nossa loja</figcaption></figure><figure className="gallery-video"><video controls playsInline preload="none" poster="/images/pneus.jpg" aria-label="Vídeo real do interior da oficina Salgueiro"><source src="/images/oficina-video.mp4" type="video/mp4" />Seu navegador não reproduz este vídeo. <a href={site.mapa}>Veja no Google Maps.</a></video><figcaption>Assista à oficina por dentro</figcaption></figure></div>
    <p className="gallery-source">Fotos e vídeos reais publicados no perfil da Salgueiro. <a href={site.mapa} target="_blank" rel="noopener noreferrer">Ver origem no Google Maps <ArrowUpRight size={12} /></a></p>
  </div></section>;
}

export function Reputation() {
  return <section className="section reputation light-section"><div className="container"><div className="reputation-inner"><div><h2>Quem passa por aqui<br /><span className="muted-title">conta como foi.</span></h2><a className="text-link" href={site.mapa} target="_blank" rel="noopener noreferrer">Ler avaliações no Google <ArrowUpRight size={18} /></a></div><div className="reputation-score"><strong>{site.avaliacao.nota}<small>/ 5</small></strong><div className="rating-stars" aria-label="4,8 de 5 estrelas">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={16} fill="currentColor" />)}</div><span>{site.avaliacao.total} avaliações no Google</span><small>Consultado em {site.avaliacao.consultadoEm}</small></div></div>
    <div className="reviews-grid">{avaliacoes.map(r => <figure className="review" key={r.nome}><blockquote>“{r.trecho}”</blockquote><figcaption><strong>{r.nome}</strong><a href={r.perfil} target="_blank" rel="noopener noreferrer">Avaliação pública no Google Maps <ArrowUpRight size={13} /></a></figcaption></figure>)}</div><p className="review-note">Trechos de avaliações públicas. A nota é uma consulta datada, sem atualização automática.</p>
  </div></section>;
}

export function Location() {
  return <section className="section location-section" id="localizacao"><div className="container location-grid"><div><h2>A gente se encontra<br /><span className="muted-title">aqui no Maiobão.</span></h2><div className="contact-detail"><MapPin /><div><h3>Av. 9, casa 33, quadra 56</h3><p>Maiobão · {site.cidade}<br />CEP {site.cep}</p></div></div><div className="contact-detail"><Clock3 /><div><h3>Segunda a sábado, 7h30 às 17h</h3><p>Domingo fechado.<br /><small>Em feriados, confirme o horário com a equipe.</small></p></div></div><div className="contact-detail"><Phone /><div><h3>Telefone e WhatsApp</h3><a href={"tel:+" + site.whatsapp}>{site.telefone}</a></div></div><a className="button" href={site.mapa} target="_blank" rel="noopener noreferrer">Traçar rota até a Salgueiro <ArrowUpRight size={19} /></a></div><LocationMap /></div></section>;
}

export function ContactBanner() {
  return <section className="contact-banner"><div className="container"><div><h2>Seu próximo cuidado<br />começa por aqui.</h2><p>Fale com a equipe e combine o atendimento.</p></div><a className="button button-dark" href={whatsapp()} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} /> Conversar no WhatsApp <ArrowUpRight size={19} /></a></div></section>;
}
