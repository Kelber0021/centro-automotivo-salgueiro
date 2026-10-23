"use client";

import { useState } from "react";
import { ArrowUpRight, CarFront, CircleDot, Cog, Droplets, Package, Wrench } from "lucide-react";
import { servicos, whatsapp } from "@/config/site";

const icons = { wrench: Wrench, wash: CarFront, oil: Droplets, wheel: CircleDot, gear: Cog, parts: Package };

export function Services() {
  const [filtro, setFiltro] = useState("todos");
  const exibidos = servicos.filter(s => filtro === "todos" || filtro === s.categoria);
  return <section className="section services-section" id="servicos"><div className="container">
    <div className="section-heading"><div><p className="eyebrow"><span className="little-line" /> O QUE SEU CARRO PRECISA?</p><h2>Cuidado por dentro.<br /><span className="muted-title">E por fora também.</span></h2></div><p>Uma oficina para a manutenção.<br />Um lavajato para renovar o visual.<br />Tudo no seu caminho.</p></div>
    <div className="filter-row" aria-label="Filtrar serviços">{[{ id: "todos", label: "Todos os serviços" }, { id: "oficina", label: "Oficina e autopeças" }, { id: "lavajato", label: "Lavajato" }].map(f => <button key={f.id} className={filtro === f.id ? "filter active" : "filter"} aria-pressed={filtro === f.id} onClick={() => setFiltro(f.id)}>{f.label}</button>)}<span className="service-count" role="status" aria-live="polite">{exibidos.length} {exibidos.length === 1 ? "serviço" : "serviços"}</span></div>
    <div className="services-grid">{exibidos.map(s => { const Icon = icons[s.icone]; return <article className="service-card" key={s.id}><div className="service-card-top"><Icon size={28} strokeWidth={1.4} /><span>{s.categoria === "lavajato" ? "LAVAJATO" : "CENTRO AUTOMOTIVO"}</span></div><h3>{s.nome}</h3><p>{s.descricao}</p><div className="service-card-bottom"><span>{s.detalhe}</span><a href={whatsapp(`Olá! Vim pelo site da Salgueiro e gostaria de consultar ${s.nome.toLowerCase()} para meu veículo.`)} target="_blank" rel="noopener noreferrer" aria-label={`Pedir orçamento de ${s.nome}`}><ArrowUpRight size={21} /></a></div></article>; })}</div>
    <p className="services-note">Cada carro tem sua necessidade. Valores, peças e prazo são confirmados pela equipe antes do serviço.</p>
  </div></section>;
}
