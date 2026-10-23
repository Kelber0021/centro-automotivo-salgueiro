"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight, MapPin, RotateCcw } from "lucide-react";
import { site } from "@/config/site";

export function LocationMap() {
  const [estado, setEstado] = useState<"foto" | "carregando" | "mapa" | "falha">("foto");
  useEffect(() => {
    if (estado !== "carregando") return;
    const timeout = window.setTimeout(() => setEstado("falha"), 12000);
    return () => window.clearTimeout(timeout);
  }, [estado]);

  return <div className="map-frame">
    <div className="map-stage">
      <Image src="/images/salgueiro-oficina.jpg" alt="Fachada da Salgueiro para reconhecer o local ao chegar" fill sizes="(max-width: 760px) 100vw, 50vw" />
      {estado !== "mapa" && <div className="map-preview"><MapPin size={28} /><strong>É aqui no Maiobão.</strong><p>Av. 9, casa 33, quadra 56</p>{estado === "carregando" ? <p className="map-status" role="status">Carregando o mapa…</p> : <button className="button" onClick={() => setEstado("carregando")}>{estado === "falha" ? <><RotateCcw size={17} /> Tentar carregar novamente</> : <>Carregar mapa interativo <ArrowUpRight size={18} /></>}</button>}{estado === "falha" && <p className="map-status" role="status">O mapa demorou a responder. Você pode abrir a rota pelo link abaixo.</p>}</div>}
      {(estado === "carregando" || estado === "mapa") && <iframe title="Localização do Centro Automotivo Salgueiro no Maiobão" src="https://maps.google.com/maps?q=Centro%20Automotivo%20Salgueiro%20Maiob%C3%A3o%20Pa%C3%A7o%20do%20Lumiar&z=16&output=embed" loading="eager" referrerPolicy="no-referrer-when-downgrade" allowFullScreen onLoad={() => setEstado("mapa")} onError={() => setEstado("falha")} className={estado === "mapa" ? "map-loaded" : "map-loading"} />}
    </div>
    <a className="map-foot" href={site.mapa} target="_blank" rel="noopener noreferrer"><MapPin size={17} /><span>Abrir a localização no Google Maps</span><ArrowUpRight size={17} /></a>
  </div>;
}
