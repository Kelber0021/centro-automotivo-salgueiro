import Image from "next/image";
import { ArrowUpRight, Camera } from "lucide-react";
import { instagramPosts, site } from "@/config/site";
import { MotionLink } from "./MotionLink";

export function InstagramSection() {
  return <section className="section instagram-section light-section" id="instagram" aria-labelledby="instagram-heading"><div className="container instagram-grid">
    <div className="instagram-copy"><p className="section-label">Instagram da Salgueiro</p><h2 id="instagram-heading">Mais Salgueiro<br />no seu dia a dia.</h2><p>Serviços, ofertas e um olhar por dentro do nosso espaço. Acompanhe as novidades direto no perfil.</p><a className="instagram-handle" href={site.instagram} target="_blank" rel="noopener noreferrer"><Camera size={20} aria-hidden="true" /><span>@{site.instagramHandle}</span></a><p className="instagram-highlights">Conheça também os destaques <strong>Espaço</strong> e <strong>Ofertas</strong>.</p><MotionLink label="Ver perfil no Instagram" href={site.instagram} target="_blank" rel="noopener noreferrer" /></div>
    <div className="instagram-posts">{instagramPosts.map(post => <a className="instagram-post" key={post.url} href={post.url} target="_blank" rel="noopener noreferrer" aria-label={`Ver publicação no Instagram: ${post.titulo}`}><div className="instagram-post-image" style={{ position: "relative" }}><Image src={post.imagem} alt={post.alt} fill sizes="(max-width: 700px) 100vw, 25vw" /></div><div className="instagram-post-caption"><span><strong>{post.titulo}</strong><time dateTime={post.data}>{post.dataTexto}</time></span><ArrowUpRight size={18} aria-hidden="true" /></div></a>)}<p className="instagram-source">Publicações do perfil oficial. Abra no Instagram para ver o conteúdo original.</p></div>
  </div></section>;
}
