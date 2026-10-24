"use client";

import { useEffect, useState } from "react";
import { offers } from "@/config/catalog";
import { isOfferActive, type Offer } from "@/lib/commerce";
import { whatsapp } from "@/config/site";

export function Offers() {
  const [active, setActive] = useState<Offer[]>([]);
  useEffect(() => {
    if (!offers.some(o => o.approved && o.published)) return;
    let timer: ReturnType<typeof setTimeout>;
    const update = () => {
      const now = new Date();
      setActive(offers.filter(o => isOfferActive(o, now)));
      const future = offers.flatMap(o => [Date.parse(o.startsAt), Date.parse(o.endsAt)]).filter(t => Number.isFinite(t) && t > now.getTime());
      timer = setTimeout(update, Math.min(future.length ? Math.min(...future) - now.getTime() + 20 : 60_000, 60_000));
    };
    // Atualização assíncrona mantém o HTML estático neutro, sem flash de promoção vencida.
    timer = setTimeout(update, 0);
    const resume = () => { if (!document.hidden) { clearTimeout(timer); update(); } };
    document.addEventListener("visibilitychange", resume);
    return () => { clearTimeout(timer); document.removeEventListener("visibilitychange", resume); };
  }, []);
  if (!active.length) return null;
  return <section className="section light-section offers-section"><div className="container"><p className="section-label">Ofertas confirmadas</p><h2>Condições para consultar.</h2><div className="offer-grid">{active.slice(0, 2).map(offer => <article key={offer.id}><h3>{offer.title}</h3><p>{offer.description}</p><p>{offer.conditions}</p><small>Validade até {new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo" }).format(new Date(offer.endsAt))}.</small><a className="text-link" href={whatsapp(`Olá! Gostaria de consultar a oferta ${offer.title}. Podem confirmar as condições?`)} target="_blank" rel="noopener noreferrer">Consultar oferta ↗</a></article>)}</div></div></section>;
}
