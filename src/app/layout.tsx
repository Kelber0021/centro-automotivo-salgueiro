import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Header, Footer } from "@/components/Chrome";
import { ScrollEffects } from "@/components/ScrollEffects";
import { site } from "@/config/site";
import { ContactDock } from "@/components/ContactDock";
import "./globals.css";
import "./redesign.css";

const body = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-body" });

export const metadata: Metadata = {
  title: { default: "Salgueiro | Oficina e lavajato no Maiobão", template: "%s | Salgueiro" },
  description: "Mecânica, lavajato, troca de óleo, alinhamento, pneus e autopeças no Maiobão, Paço do Lumiar. Consulte serviços e solicite seu orçamento pelo WhatsApp.",
  openGraph: { type: "website", locale: "pt_BR", siteName: site.nome },
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { themeColor: "#0d0e0f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR" data-scroll-behavior="smooth" className={body.variable}><body>
    <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
    <div className="site-shell"><Header /><main id="conteudo">{children}</main><ScrollEffects /><Footer /></div>
    <ContactDock />
  </body></html>;
}
