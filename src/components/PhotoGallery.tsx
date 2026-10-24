"use client";
import Image from "next/image";
import Link from "@/components/SiteLink";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { galleryPhotos } from "@/config/media";
import { site } from "@/config/site";

export function PhotoGallery({ compact = false }: { compact?: boolean }) {
  const [filter, setFilter] = useState("todos");
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const photos = compact ? galleryPhotos.slice(0, 2) : galleryPhotos.filter(p => filter === "todos" || p.category === filter);
  const current = photos[index] ?? photos[0];
  const move = (delta: number) => setIndex(i => (i + photos.length + delta) % photos.length);
  return <section className="section gallery-section light-section"><div className="container">
    <div className="section-heading"><div><p className="section-label">Por dentro da Salgueiro</p><h2>Um lugar de verdade.<br />Cuidado de perto.</h2></div>{compact ? <Link href="/sobre/#estrutura" className="text-link">Conheça a estrutura <ArrowUpRight size={18} /></Link> : <a href={site.mapa} className="text-link" target="_blank" rel="noopener noreferrer">Ver no Google Maps <ArrowUpRight size={18} /></a>}</div>
    {!compact && <div className="gallery-filters" aria-label="Filtrar fotos">{[{ id: "todos", name: "Todas" }, { id: "oficina", name: "Oficina" }, { id: "loja", name: "Autopeças" }, { id: "local", name: "Fachada" }].map(item => <button key={item.id} className={filter === item.id ? "filter active" : "filter"} aria-pressed={filter === item.id} onClick={() => { setFilter(item.id); setIndex(0); }}>{item.name}</button>)}<span className="sr-only" role="status">{photos.length} fotografias</span></div>}
    <div className={`photo-grid ${compact ? "photo-grid--compact" : ""}`}>{photos.map((photo, i) => <button className="photo-tile" key={photo.src} aria-label={`Ampliar fotografia: ${photo.name}`} onClick={e => { opener.current = e.currentTarget; setIndex(i); setOpen(true); dialog.current?.showModal(); }}><picture className="fill-picture"><source media="(max-width: 700px)" srcSet={photo.src.replace("-960", "-640")} /><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 100vw, 50vw" /></picture><span className="photo-caption"><span>{photo.name}</span><span className="round-arrow"><ArrowUpRight size={20} /></span></span></button>)}</div>
    <p className="gallery-source">Fotografias publicadas no perfil da Salgueiro no Google Maps.</p>
    <dialog ref={dialog} className="gallery-dialog" aria-labelledby="gallery-caption" onClose={() => { setOpen(false); opener.current?.focus(); }} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }} onKeyDown={e => { if (e.key === "ArrowRight") { e.preventDefault(); move(1); } if (e.key === "ArrowLeft") { e.preventDefault(); move(-1); } }}>
      <div className="gallery-dialog-inner"><button className="dialog-close" aria-label="Fechar galeria" onClick={() => dialog.current?.close()}><X /></button>{open && <><div className="gallery-large-photo" onTouchStart={e => { touch.current = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }; }} onTouchEnd={e => { if (!touch.current) return; const dx = e.changedTouches[0].clientX - touch.current.x, dy = e.changedTouches[0].clientY - touch.current.y; if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1); touch.current = null; }}><Image src={current.src} alt={current.alt} fill sizes="90vw" /></div><div className="gallery-dialog-footer"><p id="gallery-caption" aria-live="polite">{current.name}<small>{index + 1} de {photos.length}</small></p><div><button aria-label="Fotografia anterior" onClick={() => move(-1)}><ArrowLeft /></button><button aria-label="Próxima fotografia" onClick={() => move(1)}><ArrowRight /></button></div></div></>}</div>
    </dialog>
  </div></section>;
}
