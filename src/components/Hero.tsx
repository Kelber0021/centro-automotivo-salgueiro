"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowUpRight, CarFront, CircleDot, Droplets, Play, Wrench, X } from "lucide-react";
import { site } from "@/config/site";
import { MotionLink } from "./MotionLink";

export function Hero() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  function abrirVideo() {
    dialogRef.current?.showModal();
    void videoRef.current?.play().catch(() => {});
  }
  function fecharVideo() { dialogRef.current?.close(); }
  return <section className="hero hero-facade" aria-label="Bem-vindo à Salgueiro">
    <div className="hero-media"><Image src="/images/salgueiro-oficina.jpg" alt="Fachada da Salgueiro, com letreiro amarelo e vermelho e entrada da loja de autopeças no Maiobão" fill loading="eager" fetchPriority="high" sizes="(max-width: 700px) 100vw, 56vw" className="hero-photo" /></div>
    <div className="container hero-content">
      <p className="hero-location">Centro automotivo no Maiobão, MA</p>
      <h1>Seu carro merece<br />cuidado de<br /><span>verdade.</span></h1>
      <p className="hero-description">Oficina, lavajato e autopeças em um só lugar.<br />A Salgueiro cuida do próximo passo com você.</p>
      <div className="hero-actions"><MotionLink href="#servicos" label="Conhecer os serviços" /><button className="play-button" onClick={abrirVideo}><span className="play-icon"><Play size={14} fill="currentColor" aria-hidden="true" /></span> Ver a oficina</button></div>
    </div>
    <div className="container hero-trust"><p>Do motor ao cuidado do dia a dia.</p><div className="trust-services"><span><Wrench /> Mecânica</span><span><Droplets /> Lavajato</span><span><CircleDot /> Pneus</span><span><CarFront /> Autopeças</span><a href={site.mapa} target="_blank" rel="noopener noreferrer"><strong>{site.avaliacao.nota}</strong><span>no Google<small>{site.avaliacao.total} avaliações · {site.avaliacao.consultadoEm}</small></span><ArrowUpRight size={16} /></a></div></div>
    <dialog ref={dialogRef} className="video-dialog" aria-labelledby="video-title" onClose={() => videoRef.current?.pause()} onClick={e => { if (e.target === e.currentTarget) fecharVideo(); }}>
      <div className="video-dialog-inner"><div className="video-dialog-heading"><h2 id="video-title">Por dentro da Salgueiro</h2><button onClick={fecharVideo} aria-label="Fechar vídeo"><X size={23} /></button></div><video ref={videoRef} controls playsInline muted preload="none" poster="/images/pneus.jpg"><source src="/images/oficina-video.mp4" type="video/mp4" />Seu navegador não reproduz este vídeo.</video><p>Vídeo real publicado pela Salgueiro no Google Maps.</p></div>
    </dialog>
  </section>;
}
