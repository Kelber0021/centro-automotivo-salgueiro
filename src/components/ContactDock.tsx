"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Droplets, MessageCircle, Wrench, X } from "lucide-react";
import { orcamentoRapido } from "@/config/site";

// Disclosure inspirado na interação 08 (social click) do Daily Direction.
export function ContactDock() {
  const [aberto, setAberto] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!aberto) return;
    const fecharFora = (event: PointerEvent) => { if (!dockRef.current?.contains(event.target as Node)) setAberto(false); };
    const fecharEsc = (event: KeyboardEvent) => { if (event.key === "Escape") { setAberto(false); buttonRef.current?.focus(); } };
    document.addEventListener("pointerdown", fecharFora);
    document.addEventListener("keydown", fecharEsc);
    return () => { document.removeEventListener("pointerdown", fecharFora); document.removeEventListener("keydown", fecharEsc); };
  }, [aberto]);
  return <div ref={dockRef} className={`contact-dock ${aberto ? "is-open" : ""}`}>
    {aberto && <nav id="contato-rapido" className="contact-dock-panel" aria-label="Contato rápido"><strong>Como podemos ajudar?</strong><a href={orcamentoRapido("oficina")} target="_blank" rel="noopener noreferrer"><Wrench size={17} /> Orçamento de oficina <ArrowUpRight size={16} /></a><a href={orcamentoRapido("lavajato")} target="_blank" rel="noopener noreferrer"><Droplets size={17} /> Consultar lavagem <ArrowUpRight size={16} /></a><small>A conversa abre no WhatsApp.</small></nav>}
    <button ref={buttonRef} className="contact-dock-toggle" aria-label={aberto ? "Fechar contato rápido" : "Abrir contato rápido"} aria-expanded={aberto} aria-controls="contato-rapido" onClick={() => setAberto(!aberto)}>{aberto ? <X size={24} /> : <MessageCircle size={24} />}</button>
  </div>;
}
