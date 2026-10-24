"use client";

import Link from "@/components/SiteLink";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Camera, Menu, MessageCircle, Phone, X } from "lucide-react";
import { site, whatsapp } from "@/config/site";
import { MotionLink } from "./MotionLink";

const links = [{ href: "/", nome: "Início" }, { href: "/servicos/", nome: "Serviços" }, { href: "/autopecas/", nome: "Autopeças" }, { href: "/sobre/", nome: "Sobre" }, { href: "/contato/", nome: "Contato" }];

export function Marca() {
  // Referência raster da publicação oficial, sem redesenhar a marca. Original definitivo pendente.
  return <span className="brand-art" role="img" aria-label="Salgueiro Centro Automotivo"><Image src="/images/instagram-troca-oleo.jpg" alt="" width={640} height={640} sizes="340px" loading="eager" /></span>;
}

export function Header() {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const aberto = menuPath === pathname;
  const setAberto = (value: boolean) => setMenuPath(value ? pathname : null);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!aberto) return;
    headerRef.current?.querySelector<HTMLAnchorElement>("#menu-mobile a")?.focus();
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setMenuPath(null); toggleRef.current?.focus(); } };
    const outside = (event: PointerEvent) => { if (!headerRef.current?.contains(event.target as Node)) setMenuPath(null); };
    const media = window.matchMedia("(min-width: 981px)");
    const resize = () => { if (media.matches) { setMenuPath(null); headerRef.current?.querySelector<HTMLAnchorElement>('a[aria-label="Salgueiro, página inicial"]')?.focus(); } };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    media.addEventListener("change", resize);
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", outside); media.removeEventListener("change", resize); };
  }, [aberto]);
  return <header ref={headerRef} className="header">
    <div className="container header-inner">
      <Link href="/" aria-label="Salgueiro, página inicial" onClick={() => setAberto(false)}><Marca /></Link>
      <nav aria-label="Principal" className="desktop-nav">{links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.nome}</Link>)}</nav>
      <MotionLink className="button-small header-cta" label="Falar no WhatsApp" href={whatsapp()} target="_blank" rel="noopener noreferrer" />
      <button ref={toggleRef} className={`menu-toggle ${aberto ? "is-open" : ""}`} aria-label={aberto ? "Fechar menu" : "Abrir menu"} aria-expanded={aberto} aria-controls="menu-mobile" onClick={() => setAberto(!aberto)}><span className="menu-glyph" aria-hidden="true"><Menu /><X /></span></button>
    </div>
    {aberto && <nav id="menu-mobile" className="mobile-nav" aria-label="Menu mobile">{links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => setAberto(false)}>{link.nome}<ArrowUpRight size={17} /></Link>)}<a href={whatsapp()} target="_blank" rel="noopener noreferrer">Pedir orçamento <MessageCircle size={18} /></a></nav>}
  </header>;
}

export function Footer() {
  return <footer className="footer"><div className="container footer-main">
    <div><Link href="/" aria-label="Página inicial da Salgueiro"><Marca /></Link><p>Da manutenção à lavagem.<br />Cuidado com o seu carro, no Maiobão.</p><div className="social-links"><a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram da Salgueiro"><Camera size={19} /></a><a href={whatsapp()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp da Salgueiro"><MessageCircle size={19} /></a><a href={`tel:+${site.whatsapp}`} aria-label="Ligar para a Salgueiro"><Phone size={18} /></a></div></div>
    <nav aria-label="Rodapé"><span className="eyebrow">Explore</span>{links.slice(1).map(link => <Link href={link.href} key={link.href}>{link.nome}</Link>)}</nav>
    <div><span className="eyebrow">Passe por aqui</span><p>{site.endereco}<br />{site.cidade}<br />{site.cep}</p><a className="text-link" href={site.mapa} target="_blank" rel="noopener noreferrer">Traçar rota <ArrowUpRight size={16} /></a></div>
    <div><span className="eyebrow">Atendimento</span><a className="footer-phone" href={`tel:+${site.whatsapp}`}>{site.telefone}</a><p>{site.horario}<br /><span className="muted">Domingo: fechado</span></p></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Centro Automotivo Salgueiro.</span><span>Maiobão · Paço do Lumiar · Maranhão</span></div></footer>;
}
