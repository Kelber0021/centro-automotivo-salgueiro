"use client";

import Image from "next/image";
import Link from "@/components/SiteLink";
import { useRef } from "react";
import { ArrowUpRight, Play, X } from "lucide-react";
import { whatsapp } from "@/config/site";
import { MotionLink } from "./MotionLink";

export function Hero() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  function abrirVideo() {
    dialogRef.current?.showModal();
    void videoRef.current?.play().catch(() => {});
  }
  function fecharVideo() { dialogRef.current?.close(); }
  return <section className="hero hero-facade hero--clean" aria-label="Bem-vindo à Salgueiro">
    <div className="hero-media"><picture className="fill-picture"><source media="(max-width: 700px)" srcSet="/images/optimized/salgueiro-oficina-640.webp" /><Image src="/images/optimized/salgueiro-oficina-960.webp" alt="Fachada documentada da Salgueiro, com letreiro amarelo e vermelho e entrada da loja no Maiobão" fill loading="eager" fetchPriority="high" sizes="(max-width: 980px) 100vw, 50vw" className="hero-photo" /></picture></div>
    <div className="container hero-content">
      <p className="hero-location">Centro automotivo no Maiobão, MA</p>
      <h1>Seu carro merece<br />cuidado de verdade.</h1>
      <p className="hero-description">Oficina, lavajato e autopeças em um só lugar.<br />A Salgueiro cuida do próximo passo com você.</p>
      <div className="hero-actions"><MotionLink href={whatsapp()} label="Falar no WhatsApp" target="_blank" rel="noopener noreferrer" /><Link className="hero-secondary" href="/servicos/">Conhecer serviços <ArrowUpRight size={17} /></Link></div>
      <button className="play-button" onClick={abrirVideo}><span className="play-icon"><Play size={14} fill="currentColor" aria-hidden="true" /></span> Ver a oficina</button>
    </div>
    <dialog ref={dialogRef} className="video-dialog" aria-labelledby="video-title" onClose={() => videoRef.current?.pause()} onClick={e => { if (e.target === e.currentTarget) fecharVideo(); }}>
      <div className="video-dialog-inner"><div className="video-dialog-heading"><h2 id="video-title">Por dentro da Salgueiro</h2><button onClick={fecharVideo} aria-label="Fechar vídeo"><X size={23} /></button></div><video ref={videoRef} controls playsInline muted preload="none" poster="/images/optimized/pneus-640.webp"><source src="/images/oficina-video.mp4" type="video/mp4" />Seu navegador não reproduz este vídeo.</video><p>Vídeo real publicado pela Salgueiro no Google Maps.</p></div>
    </dialog>
  </section>;
}
