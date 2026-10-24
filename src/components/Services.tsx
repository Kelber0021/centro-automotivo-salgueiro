"use client";

import { useState } from "react";
import Link from "@/components/SiteLink";
import { ArrowUpRight, CarFront, CircleDot, Cog, Droplets, Package, Wrench } from "lucide-react";
import { servicos, whatsapp } from "@/config/site";

const icons = { wrench: Wrench, wash: CarFront, oil: Droplets, wheel: CircleDot, gear: Cog, parts: Package };

export function Services({ compacto = false, heading = true }: { compacto?: boolean; heading?: boolean }) {
  const [filtro, setFiltro] = useState("todos");
  const exibidos = servicos.filter(s => (!compacto || ["mecanica", "lavagem", "oleo", "pecas"].includes(s.id)) && (filtro === "todos" || filtro === s.categoria));
  return <section className={`section services-section light-section ${compacto ? "compact-services" : ""}`} id="servicos"><div className="container">
    {heading && <div className="section-heading"><div><p className="section-label">O que fazemos</p><h2>Mais cuidado.<br />Mais tranquilidade.</h2></div><p>Da manutenção à lavagem, conte com a Salgueiro para orientar o atendimento que seu carro precisa.</p></div>}
    {!compacto && <div className="filter-row" aria-label="Filtrar serviços">{[{ id: "todos", label: "Todos os serviços" }, { id: "oficina", label: "Oficina e autopeças" }, { id: "lavajato", label: "Lavajato" }].map(f => <button key={f.id} className={filtro === f.id ? "filter active" : "filter"} aria-pressed={filtro === f.id} onClick={() => setFiltro(f.id)}>{f.label}</button>)}<span className="service-count" role="status" aria-live="polite">{exibidos.length} {exibidos.length === 1 ? "serviço" : "serviços"}</span></div>}
    <div className="services-grid">{exibidos.map(s => { const Icon = icons[s.icone]; return <article className="service-card" key={s.id}><div className="service-card-top"><Icon size={28} strokeWidth={1.5} /><span>{s.categoria === "lavajato" ? "Lavajato" : "Oficina e autopeças"}</span></div><h3>{s.nome}</h3><p>{s.descricao}</p><div className="service-card-bottom"><span>{s.detalhe}</span><a href={whatsapp(`Olá! Vim pelo site da Salgueiro e gostaria de consultar ${s.nome.toLowerCase()} para meu veículo.`)} target="_blank" rel="noopener noreferrer" aria-label={`Pedir orçamento de ${s.nome}`}>Consultar <ArrowUpRight size={18} /></a></div></article>; })}</div>
    <p className="services-note">Valores, peças e prazos são confirmados antes do serviço.{compacto && <> <Link href="/servicos/">Conheça todos os serviços <ArrowUpRight size={14} /></Link></>}</p>
  </div></section>;
}
