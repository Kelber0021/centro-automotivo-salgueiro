import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/SiteLink";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Services } from "@/components/Services";
import { About, ContactBanner, Gallery, Location, Reputation } from "@/components/Sections";
import { QuoteForm } from "@/components/QuoteForm";
import { ProductCatalog } from "@/components/ProductCatalog";
import { InstagramSection } from "@/components/InstagramSection";
import { Offers } from "@/components/Offers";
const paginas = {
  servicos: { titulo: "Serviços", texto: "O cuidado certo começa com uma conversa.", descricao: "Oficina, manutenção e lavagem no Maiobão. Consulte o atendimento com a equipe." },
  autopecas: { titulo: "Autopeças", texto: "A peça certa começa pela aplicação certa.", descricao: "Consulte autopeças, pneus e aplicação com a equipe da Salgueiro. Disponibilidade sob consulta." },
  sobre: { titulo: "Sobre a Salgueiro", texto: "Um endereço. Vários cuidados.", descricao: "Conheça a estrutura do Centro Automotivo Salgueiro, no Maiobão." },
  horarios: { titulo: "Solicitação de atendimento", texto: "Vamos continuar a conversa.", descricao: "A solicitação de atendimento está na página de Contato." },
  contato: { titulo: "Contato e atendimento", texto: "Vamos cuidar do próximo passo.", descricao: "Conte o que precisa, consulte a equipe e veja como chegar à Salgueiro." },
} as const;
export function generateStaticParams() { return Object.keys(paginas).map(pagina => ({ pagina })); }
export const dynamicParams = false;
type Props = { params: Promise<{ pagina: string }> };
function obterPagina(pagina: string) { if (!Object.hasOwn(paginas, pagina)) notFound(); return paginas[pagina as keyof typeof paginas]; }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const p = obterPagina((await params).pagina); return { title: p.titulo, description: p.descricao }; }
export default async function Pagina({ params }: Props) {
  const { pagina } = await params; const p = obterPagina(pagina);
  return <><div className="page-heading"><div className="container"><p className="section-label">{p.titulo}</p><h1>{p.texto}</h1></div></div>
    {pagina === "servicos" && <><div className="container services-lead-photo"><Image src="/images/optimized/pneus-1440.webp" alt="Veículos nos elevadores na oficina da Salgueiro" fill sizes="(max-width: 1440px) 100vw, 1248px" /></div><Services heading={false} /><ContactBanner /></>}
    {pagina === "autopecas" && <><ProductCatalog /><Offers /></>}
    {pagina === "sobre" && <><About /><div id="estrutura"><Gallery /></div><Reputation /><InstagramSection /></>}
    {pagina === "horarios" && <section className="section light-section"><div className="container legacy-contact"><p>O formulário e as informações de localização agora estão juntos na página de Contato. Você informa sua preferência e a equipe confirma a disponibilidade.</p><Link className="button" aria-label="Solicitar atendimento" href="/contato/#solicitar">Solicitar atendimento ↗</Link></div></section>}
    {pagina === "contato" && <><section id="solicitar" className="section quote-section light-section"><div className="container"><Suspense fallback={<p role="status">Preparando formulário…</p>}><QuoteForm /></Suspense></div></section><Location /></>}
  </>;
}
