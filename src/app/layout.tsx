import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { Header, Footer } from "@/components/Chrome";
import { site, whatsapp } from "@/config/site";
import { MessageCircle } from "lucide-react";
import "./globals.css";

const body = Barlow({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body" });
const display = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display" });

export const metadata: Metadata = {
  title: { default: "Salgueiro | Oficina e lavajato no Maiobão", template: "%s | Salgueiro" },
  description: "Mecânica, lavajato, troca de óleo, alinhamento, pneus e autopeças no Maiobão, Paço do Lumiar. Consulte serviços e solicite seu orçamento pelo WhatsApp.",
  openGraph: { type: "website", locale: "pt_BR", siteName: site.nome },
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { themeColor: "#17191c" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR" className={`${body.variable} ${display.variable}`}><body>
    <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
    <Header /><main id="conteudo">{children}</main><Footer />
    <a className="whatsapp-float" href={whatsapp()} target="_blank" rel="noopener noreferrer" aria-label="Conversar com a Salgueiro no WhatsApp"><MessageCircle size={24} /><span>Vamos conversar?</span></a>
  </body></html>;
}
