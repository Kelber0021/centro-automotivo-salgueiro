"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Camera, Menu, MessageCircle, Phone, X } from "lucide-react";
import { site, whatsapp } from "@/config/site";

const links = [{ href: "/", nome: "Início" }, { href: "/servicos/", nome: "Serviços" }, { href: "/sobre/", nome: "A Salgueiro" }, { href: "/horarios/", nome: "Agendamento" }, { href: "/contato/", nome: "Onde estamos" }];

export function Marca() {
  return <span className="marca"><span className="marca-top"><i aria-hidden="true" />CENTRO AUTOMOTIVO</span><strong>Salgueiro<span aria-hidden="true">.</span></strong></span>;
}

export function Header() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);
  return <header className="header">
    <div className="container header-inner">
      <Link href="/" aria-label="Salgueiro, página inicial" onClick={() => setAberto(false)}><Marca /></Link>
      <nav aria-label="Principal" className="desktop-nav">{links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.nome}</Link>)}</nav>
      <a className="button button-small header-cta" href={whatsapp()} target="_blank" rel="noopener noreferrer">Pedir orçamento <ArrowUpRight size={17} /></a>
      <button className="menu-toggle" aria-label={aberto ? "Fechar menu" : "Abrir menu"} aria-expanded={aberto} aria-controls="menu-mobile" onClick={() => setAberto(!aberto)}>{aberto ? <X /> : <Menu />}</button>
    </div>
    {aberto && <nav id="menu-mobile" className="mobile-nav" aria-label="Menu mobile">{links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => setAberto(false)}>{link.nome}<ArrowUpRight size={17} /></Link>)}<a href={whatsapp()} target="_blank" rel="noopener noreferrer">Pedir orçamento <MessageCircle size={18} /></a></nav>}
  </header>;
}

export function Footer() {
  return <footer className="footer"><div className="container footer-main">
    <div><Link href="/" aria-label="Página inicial da Salgueiro"><Marca /></Link><p>Da manutenção à lavagem.<br />Cuidado com o seu carro, no Maiobão.</p><div className="social-links"><a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram da Salgueiro"><Camera size={19} /></a><a href={whatsapp()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp da Salgueiro"><MessageCircle size={19} /></a><a href={`tel:+${site.whatsapp}`} aria-label="Ligar para a Salgueiro"><Phone size={18} /></a></div></div>
    <nav aria-label="Rodapé"><span className="eyebrow">Explore</span>{links.slice(1).map(link => <Link href={link.href} key={link.href}>{link.nome}</Link>)}</nav>
    <div><span className="eyebrow">Passe por aqui</span><p>{site.endereco}<br />{site.cidade}<br />{site.cep}</p><a className="text-link" href={site.mapa} target="_blank" rel="noopener noreferrer">Traçar rota <ArrowUpRight size={16} /></a></div>
    <div><span className="eyebrow">Atendimento</span><a className="footer-phone" href={`tel:+${site.whatsapp}`}>{site.telefone}</a><p>Segunda a sábado<br />7h30 às 17h<br /><span className="muted">Domingo: fechado</span></p></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Centro Automotivo Salgueiro.</span><span>Maiobão · Paço do Lumiar · Maranhão</span></div></footer>;
}
