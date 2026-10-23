"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, MapPin, Pause, Play, Star } from "lucide-react";
import { site, whatsapp } from "@/config/site";

export function Hero() {
  const [pausado, setPausado] = useState(false);
  const [video, setVideo] = useState("");
  const [erroVideo, setErroVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const movimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 640px)");
    const atualizar = () => setVideo(movimento.matches ? "" : mobile.matches ? "/images/oficina-video.mp4" : "/images/salgueiro-tour.mp4");
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
    <div className="hero-media"><Image src="/images/salgueiro-oficina.jpg" alt="Fachada do Centro Automotivo Salgueiro, com loja de autopeças e pneus no Maiobão" fill priority sizes="100vw" className="hero-photo" />{video && !erroVideo && <video key={video} ref={videoRef} className="hero-video" src={video} muted loop playsInline autoPlay preload="metadata" poster="/images/salgueiro-oficina.jpg" aria-hidden="true" onError={() => setErroVideo(true)} />}</div>
    <div className="hero-shade" />
    <div className="container hero-content">
      <p className="eyebrow hero-location"><MapPin size={14} /> MAIOBÃO, PAÇO DO LUMIAR — MA</p>
      <h1>Seu carro.<br />Nosso <span>cuidado.</span></h1>
      <p className="hero-description">Da oficina ao lavajato, um só destino.<br />Manutenção, peças e cuidado para seguir em frente.</p>
      <div className="hero-actions"><a className="button" href={whatsapp()} target="_blank" rel="noopener noreferrer">Cuidar do meu carro <ArrowUpRight size={20} /></a><Link className="button button-ghost" href="/servicos/">Conhecer os serviços <ArrowUpRight size={18} /></Link></div>
      <a className="hero-rating" href={site.mapa} target="_blank" rel="noopener noreferrer"><span className="google-g">G</span><span><span className="rating-stars" aria-label="4,8 de 5 estrelas">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={12} fill="currentColor" />)}</span><span><strong>{site.avaliacao.nota}</strong> · {site.avaliacao.total} avaliações no Google</span></span><ArrowUpRight size={16} /></a>
    </div>
    <div className="container hero-bottom"><a href="#servicos" className="scroll-cue"><ArrowDown size={17} /> CONHEÇA A SALGUEIRO</a><span className="media-caption">IMAGENS REAIS · SALGUEIRO</span><button className="media-control" onClick={() => setPausado(!pausado)} aria-label={pausado ? "Retomar movimento das imagens" : "Pausar movimento das imagens"}>{pausado ? <Play size={15} /> : <Pause size={15} />}</button></div>
  </section>;
}
