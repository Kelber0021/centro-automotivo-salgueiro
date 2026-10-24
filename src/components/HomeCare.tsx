import Link from "@/components/SiteLink";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";

export function HomeCare() {
  const items = [
    { title: "Oficina e manutenção", text: "Mecânica, troca de óleo e cuidados conforme a necessidade do seu veículo.", href: "/servicos/", action: "Conhecer serviços" },
    { title: "Pneus e autopeças", text: "Conte o que procura. A equipe orienta a aplicação e confirma a disponibilidade.", href: "/autopecas/", action: "Consultar autopeças" },
    { title: "Lavagem automotiva", text: "Conheça as opções de lavagem e combine o atendimento diretamente com a equipe.", href: "/servicos/#servicos", action: "Consultar atendimento" },
  ];
  return <section className="section home-care light-section"><div className="container"><p className="section-label">Como podemos ajudar</p><h2>Cuidado, em cada necessidade.</h2><div className="care-editorial">{items.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p><Link className="text-link" href={item.href}>{item.action} <ArrowUpRight size={17} /></Link></article>)}</div></div></section>;
}
export function LocationSummary() {
  return <section className="section location-summary"><div className="container"><div><p className="section-label">Perto de você</p><h2>A gente se encontra<br />no Maiobão.</h2><p>{site.cidade} · {site.horario}</p></div><Link href="/contato/" className="button">Contato e localização <ArrowUpRight size={18} /></Link></div></section>;
}
