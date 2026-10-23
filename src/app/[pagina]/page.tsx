import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Services } from "@/components/Services";
import { About, ContactBanner, Gallery, Location, Reputation, Wash } from "@/components/Sections";
import { QuoteForm } from "@/components/QuoteForm";

const paginas = {
  servicos: { titulo: "Serviços", texto: "Um lugar. Vários cuidados.", descricao: "Conheça os serviços de oficina, lavajato, pneus e autopeças da Salgueiro no Maiobão." },
  sobre: { titulo: "A Salgueiro", texto: "O seu centro automotivo.", descricao: "Conheça o Centro Automotivo Salgueiro, no Maiobão, Paço do Lumiar." },
  horarios: { titulo: "Agendamento", texto: "Combine seu atendimento.", descricao: "Solicite um atendimento na Salgueiro. Confirme a disponibilidade com a equipe pelo WhatsApp." },
  contato: { titulo: "Onde estamos", texto: "Perto de você, no Maiobão.", descricao: "Endereço, horários e contato do Centro Automotivo Salgueiro, em Paço do Lumiar — MA." },
} as const;
export function generateStaticParams() { return Object.keys(paginas).map(pagina => ({ pagina })); }
export const dynamicParams = false;
type Props = { params: Promise<{ pagina: string }> };
function obterPagina(pagina: string) { if (!(pagina in paginas)) notFound(); return paginas[pagina as keyof typeof paginas]; }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const p = obterPagina((await params).pagina); return { title: p.titulo, description: p.descricao }; }
export default async function Pagina({ params }: Props) {
  const { pagina } = await params;
  const p = obterPagina(pagina);
  return <><div className="page-heading"><div className="container"><h1>{p.texto}</h1></div></div>
    {pagina === "servicos" && <><Services /><Wash /></>}
    {pagina === "sobre" && <><About /><Gallery /><Reputation /></>}
    {pagina === "horarios" && <section className="section quote-section light-section"><div className="container"><QuoteForm /></div></section>}
    {pagina === "contato" && <Location />}
    {(pagina === "servicos" || pagina === "sobre") && <ContactBanner />}</>;
}
