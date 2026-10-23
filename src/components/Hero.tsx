"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, MapPin, Pause, Play, Star } from "lucide-react";
import { orcamentoRapido, site } from "@/config/site";

export function Hero() {
  const [pausado, setPausado] = useState(false);
  const [video, setVideo] = useState("");
  const [erroVideo, setErroVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const movimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 640px)");
    const atualizar = () => setVideo(movimento.matches ? "" : mobile.matches ? "/images/salgueiro-tour.mp4" : "/images/oficina-video.mp4");
    atualizar();
    movimento.addEventListener("change", atualizar);
    mobile.addEventListener("change", atualizar);
    return () => { movimento.removeEventListener("change", atualizar); mobile.removeEventListener("change", atualizar); };
  }, []);
  useEffect(() => {
    const elemento = videoRef.current;
    if (!elemento) return;
    const atualizar = () => {
      if (pausado || document.hidden) elemento.pause();
      else void elemento.play().catch(() => setPausado(true));
    };
    atualizar();
    document.addEventListener("visibilitychange", atualizar);
    return () => document.removeEventListener("visibilitychange", atualizar);
  }, [pausado, video, erroVideo]);
  return <section className={`hero ${pausado ? "hero-paused" : ""}`} aria-label="Bem-vindo à Salgueiro">
    <div className="hero-media"><Image src="/images/salgueiro-oficina.jpg" alt="Fachada do Centro Automotivo Salgueiro, com loja de autopeças e pneus no Maiobão" fill priority sizes="100vw" className="hero-photo" /></div>
    <div className="hero-shade" />
    <div className="container hero-grid"><div className="hero-content">
      <p className="hero-location"><MapPin size={14} /> Maiobão · Paço do Lumiar, MA</p>
      <h1>Oficina e lavajato.<br /><span>Seu carro em<br />boas mãos.</span></h1>
      <p className="hero-description">Manutenção, lavagem e autopeças no mesmo endereço. Escolha o que precisa e fale direto com a nossa equipe.</p>
      <div className="hero-actions"><a className="button" href={orcamentoRapido("oficina")} target="_blank" rel="noopener noreferrer">Orçar oficina <ArrowUpRight size={19} /></a><a className="button button-ghost" href={orcamentoRapido("lavajato")} target="_blank" rel="noopener noreferrer">Orçar lavagem <ArrowUpRight size={19} /></a></div>
      <a className="hero-rating" href={site.mapa} target="_blank" rel="noopener noreferrer"><span className="google-g">G</span><span><span className="rating-stars" aria-label="4,8 de 5 estrelas">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={12} fill="currentColor" />)}</span><span><strong>{site.avaliacao.nota}</strong> · {site.avaliacao.total} avaliações no Google</span></span><ArrowUpRight size={16} /></a>
    </div><figure className="hero-film"><div className="hero-film-frame"><Image src="/images/pneus.jpg" alt="Equipe trabalhando na oficina Salgueiro, com veículos nos elevadores" fill sizes="(max-width: 640px) 100vw, 300px" />{video && !erroVideo && <video key={video} ref={videoRef} className="hero-video" src={video} muted loop playsInline autoPlay preload="metadata" poster="/images/pneus.jpg" aria-hidden="true" onError={() => setErroVideo(true)} />}</div><figcaption><span>Um olhar por dentro da Salgueiro<small>Vídeo real do nosso Google Maps</small></span><button className="media-control" onClick={() => setPausado(!pausado)} aria-label={pausado ? "Retomar movimento das imagens" : "Pausar movimento das imagens"}>{pausado ? <Play size={15} /> : <Pause size={15} />}</button></figcaption></figure></div>
    <div className="container hero-bottom"><a href="#servicos" className="scroll-cue"><ArrowDown size={17} /> Explore os serviços</a><span className="media-caption">Oficina · Lavajato · Autopeças</span></div>
  </section>;
}
