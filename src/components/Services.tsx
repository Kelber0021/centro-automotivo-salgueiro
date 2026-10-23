"use client";

import { useState } from "react";
import { ArrowUpRight, CarFront, CircleDot, Cog, Droplets, Package, Wrench } from "lucide-react";
import { servicos, whatsapp } from "@/config/site";

const icons = { wrench: Wrench, wash: CarFront, oil: Droplets, wheel: CircleDot, gear: Cog, parts: Package };

export function Services() {
  const [filtro, setFiltro] = useState("todos");
  const exibidos = servicos.filter(s => filtro === "todos" || filtro === s.categoria);
  return <section className="section services-section light-section" id="servicos"><div className="container">
    <div className="section-heading"><div><h2>O cuidado certo<br /><span className="muted-title">para o seu carro.</span></h2></div><p>Da manutenção à lavagem.<br />Selecione um serviço e peça<br />seu orçamento pelo WhatsApp.</p></div>
    <div className="filter-row" aria-label="Filtrar serviços">{[{ id: "todos", label: "Todos os serviços" }, { id: "oficina", label: "Oficina e autopeças" }, { id: "lavajato", label: "Lavajato" }].map(f => <button key={f.id} className={filtro === f.id ? "filter active" : "filter"} aria-pressed={filtro === f.id} onClick={() => setFiltro(f.id)}>{f.label}</button>)}<span className="service-count" role="status" aria-live="polite">{exibidos.length} {exibidos.length === 1 ? "serviço" : "serviços"}</span></div>
    <div className="services-grid">{exibidos.map(s => { const Icon = icons[s.icone]; return <article className="service-card" key={s.id}><div className="service-card-top"><Icon size={28} strokeWidth={1.5} /><span>{s.categoria === "lavajato" ? "Lavajato" : "Oficina e autopeças"}</span></div><h3>{s.nome}</h3><p>{s.descricao}</p><div className="service-card-bottom"><span>{s.detalhe}</span><a href={whatsapp(`Olá! Vim pelo site da Salgueiro e gostaria de consultar ${s.nome.toLowerCase()} para meu veículo.`)} target="_blank" rel="noopener noreferrer" aria-label={`Pedir orçamento de ${s.nome}`}>Consultar <ArrowUpRight size={18} /></a></div></article>; })}</div>
    <p className="services-note">Cada carro tem sua necessidade. Valores, peças e prazo são confirmados pela equipe antes do serviço.</p>
  </div></section>;
}
