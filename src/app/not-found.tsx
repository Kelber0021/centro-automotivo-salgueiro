import Link from "next/link";
export default function NotFound() { return <section className="section container not-found"><p className="eyebrow">PÁGINA NÃO ENCONTRADA</p><h1>Vamos voltar<br />ao caminho?</h1><p>Esse endereço não existe. Encontre os serviços e o contato na página inicial.</p><Link className="button" href="/">Voltar ao início</Link></section>; }
