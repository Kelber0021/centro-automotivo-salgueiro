"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";

const fotos = [
  { src: "/images/pneus.jpg", nome: "A oficina em atividade", categoria: "oficina", alt: "Equipe da Salgueiro trabalhando com veículos nos elevadores" },
  { src: "/images/autopecas.jpg", nome: "Nossa loja de autopeças", categoria: "loja", alt: "Balcão da loja Salgueiro com produtos e acessórios automotivos" },
  { src: "/images/oficina-estrutura.jpg", nome: "Pneus e estrutura", categoria: "loja", alt: "Pneus organizados na loja, com a oficina ao fundo" },
  { src: "/images/salgueiro-oficina.jpg", nome: "Encontre a Salgueiro", categoria: "local", alt: "Fachada real da Salgueiro na Avenida 9, Maiobão" },
];

export function PhotoGallery() {
  const [filtro, setFiltro] = useState("todos");
  const exibidas = fotos.filter(f => filtro === "todos" || f.categoria === filtro);
  return <section className="section gallery-section"><div className="container">
    <div className="section-heading"><div><p className="section-label">Por dentro da Salgueiro</p><h2>Um lugar de verdade.<br />Cuidado de perto.</h2></div><a href={site.mapa} className="text-link" target="_blank" rel="noopener noreferrer">Ver no Google Maps <ArrowUpRight size={17} /></a></div>
    <div className="gallery-filters" aria-label="Filtrar fotos">{[{ id: "todos", nome: "Todas" }, { id: "oficina", nome: "Oficina" }, { id: "loja", nome: "Autopeças" }, { id: "local", nome: "Localização" }].map(f => <button key={f.id} className={filtro === f.id ? "filter active" : "filter"} aria-pressed={filtro === f.id} onClick={() => setFiltro(f.id)}>{f.nome}</button>)}<span className="sr-only" role="status" aria-live="polite">{exibidas.length} fotos</span></div>
    <div className="photo-grid">{exibidas.map(f => <a className="photo-tile" key={f.src} href={site.mapa} target="_blank" rel="noopener noreferrer"><Image src={f.src} alt={f.alt} fill sizes="(max-width: 640px) 100vw, 50vw" /><span className="photo-caption"><span>{f.nome}</span><span className="round-arrow"><ArrowUpRight size={20} /></span></span></a>)}</div>
    <p className="gallery-source">Fotos reais publicadas no perfil da Salgueiro no Google Maps.</p>
  </div></section>;
}
