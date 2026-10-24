"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { avaliacoes, site, whatsapp } from "@/config/site";
import { MotionLink } from "./MotionLink";

export function TestimonialsCTA({ compact = false }: { compact?: boolean }) {
  const [indice, setIndice] = useState(0);
  const atual = avaliacoes[indice];
  return <section className={`section testimonials-section light-section ${compact ? "testimonials-section--compact" : ""}`}><div className="container testimonials-grid">
    <div className="testimonial"><p className="section-label">Avaliações</p><h2>Quem passa por aqui<br />conta como foi.</h2><div className="testimonial-content" aria-live="polite"><Quote size={30} aria-hidden="true" /><blockquote>“{atual.trecho}”</blockquote><a className="reviewer" href={atual.perfil} target="_blank" rel="noopener noreferrer"><span className="reviewer-initials" aria-hidden="true">{atual.nome.split(" ").map(n => n[0]).slice(0, 2).join("")}</span><span><strong>{atual.nome}</strong><small>Google Maps <ArrowUpRight size={12} /></small></span></a></div><div className="testimonial-controls"><span>{String(indice + 1).padStart(2, "0")} / {String(avaliacoes.length).padStart(2, "0")}</span><button aria-label="Avaliação anterior" onClick={() => setIndice((indice + avaliacoes.length - 1) % avaliacoes.length)}><ArrowLeft size={18} /></button><button aria-label="Próxima avaliação" onClick={() => setIndice((indice + 1) % avaliacoes.length)}><ArrowRight size={18} /></button></div><small className="review-note">Nota {site.avaliacao.nota} em {site.avaliacao.total} avaliações. Consulta em {site.avaliacao.consultadoEm}.</small></div>
    {!compact && <div className="testimonial-cta"><Image src="/images/optimized/salgueiro-oficina-960.webp" alt="" fill sizes="50vw" aria-hidden="true" /><div><h2>Vamos cuidar<br />do seu carro<br />juntos?</h2><p>Conte o que precisa. A equipe da Salgueiro ajuda a combinar o atendimento.</p><MotionLink className="button-dark" label="Falar com a equipe" href={whatsapp()} target="_blank" rel="noopener noreferrer" /></div></div>}
  </div></section>;
}
