"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { productCategories, products } from "@/config/catalog";
import { filterProducts, type Product } from "@/lib/commerce";
import { whatsapp } from "@/config/site";

export function ProductCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const categories = productCategories.filter(c => c.approved);
  const available = products.filter(p => p.approved && categories.some(c => c.id === p.categoryId));
  const brands = [...new Set(available.map(p => p.brand).filter((b): b is string => !!b))].sort();
  const matches = filterProducts(available, { query, category, brand });
  function open(product: Product, element: HTMLElement) { opener.current = element; setSelected(product); dialog.current?.showModal(); }
  const consultation = selected ? whatsapp(`Olá! Vim pelo site da Salgueiro. Gostaria de consultar ${selected.name}${selected.code ? ` (referência ${selected.code})` : ""}. Podem confirmar aplicação e disponibilidade?`) : whatsapp();
  return <section className="section light-section catalog-section"><div className="container">
    <div className="catalog-intro"><p>Encontre orientação para a peça que procura. Aplicação e disponibilidade são confirmadas pela equipe.</p><a className="text-link" href={whatsapp("Olá! Gostaria de consultar uma autopeça e sua aplicação para meu veículo.")} target="_blank" rel="noopener noreferrer">Consultar uma peça <ArrowUpRight size={18} /></a></div>
    {available.length > 0 ? <>
      <label className="catalog-search"><Search size={21} aria-hidden="true" /><span className="sr-only">Pesquisar produtos</span><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Nome, código ou aplicação" /></label>
      <div className="catalog-tools"><label>Categoria<select value={category} onChange={e => setCategory(e.target.value)}><option value="">Todas as categorias</option>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>{brands.length > 1 && <label>Marca<select value={brand} onChange={e => setBrand(e.target.value)}><option value="">Todas as marcas</option>{brands.map(b => <option key={b}>{b}</option>)}</select></label>}<button className="text-link" onClick={() => { setQuery(""); setCategory(""); setBrand(""); }}>Limpar filtros</button></div>
      <p className="catalog-count" role="status">{matches.length} {matches.length === 1 ? "produto encontrado" : "produtos encontrados"}</p>
      <div className="product-grid">{matches.map(product => <article className="product-card" key={product.id}>{product.image ? <div className="product-photo"><Image src={product.image} alt={product.imageAlt ?? product.name} fill sizes="(max-width: 700px) 100vw, 33vw" /></div> : <div className="product-no-photo">Fotografia não disponível</div>}<div><h2>{product.name}</h2>{product.brand && <p>{product.brand}</p>}<p>{product.description}</p><button className="text-link" onClick={e => open(product, e.currentTarget)}>Ver detalhes <ArrowUpRight size={17} /></button></div></article>)}</div>
      {!matches.length && <div className="catalog-empty"><h2>Não encontrou o que procura?</h2><p>Tente outro termo ou converse com a equipe sobre a peça e o veículo.</p></div>}
    </> : <div className="catalog-empty editorial-empty"><div><p className="section-label">Consulta de autopeças</p><h2>Conte o que procura.<br />A equipe orienta você.</h2><p>O catálogo de produtos ainda não está disponível aqui. Você pode consultar peças, pneus e aplicação diretamente pelo WhatsApp.</p><a className="button" href={whatsapp("Olá! Gostaria de consultar uma peça. Podem me orientar sobre aplicação e disponibilidade?")} target="_blank" rel="noopener noreferrer">Falar com a equipe <ArrowUpRight size={18} /></a></div><div className="catalog-store-photo"><Image src="/images/optimized/autopecas-960.webp" alt="Balcão e prateleiras da Salgueiro" fill sizes="(max-width: 700px) 100vw, 50vw" /></div></div>}
    <dialog ref={dialog} className="product-dialog" aria-labelledby="product-title" onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }} onClose={() => opener.current?.focus()}><div className="product-dialog-content"><button className="dialog-close" onClick={() => dialog.current?.close()} aria-label="Fechar produto"><X /></button>{selected && <>{selected.image && <div className="product-detail-image"><Image src={selected.image} alt={selected.imageAlt ?? selected.name} fill sizes="(max-width: 700px) 90vw, 500px" /></div>}<h2 id="product-title">{selected.name}</h2>{selected.code && <p>Referência: {selected.code}</p>}{selected.brand && <p>Marca: {selected.brand}</p>}{selected.specification && <p>{selected.specification}</p>}<p>{selected.description}</p>{selected.application && <p>Aplicação informada: {selected.application}. Confirme com a equipe.</p>}<a className="button" href={consultation} target="_blank" rel="noopener noreferrer">Consultar disponibilidade <ArrowUpRight size={18} /></a><a className="text-link" href={`/contato/?produto=${encodeURIComponent(selected.id)}#solicitar`}>Informar meu veículo</a></>}</div></dialog>
  </div></section>;
}
