"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { servicos, whatsapp } from "@/config/site";

export function QuoteForm() {
  const [mensagem, setMensagem] = useState("");
  function preparar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const dados = new FormData(event.currentTarget);
    const nome = String(dados.get("nome") ?? "").trim();
    const veiculo = String(dados.get("veiculo") ?? "").trim();
    const servico = String(dados.get("servico") ?? "");
    if (!nome || !veiculo || !servicos.some(s => s.nome === servico)) return;
    const data = String(dados.get("data") ?? "");
    const detalhes = String(dados.get("detalhes") ?? "").trim();
    const dataFormatada = data ? data.split("-").reverse().join("/") : "A combinar";
    setMensagem(`Olá! Vim pelo site da Salgueiro e gostaria de solicitar um atendimento.\n\nNome: ${nome}\nVeículo: ${veiculo}\nServiço: ${servico}\nData de preferência: ${dataFormatada}${detalhes ? `\nObservações: ${detalhes}` : ""}\n\nPodem confirmar disponibilidade e orçamento?`);
  }
  const hoje = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  return <div className="quote-layout"><div className="quote-intro"><p className="eyebrow"><span className="little-line" /> VAMOS COMBINAR?</p><h2>Um pedido.<br />O próximo passo<br /><span className="muted-title">é com a gente.</span></h2><p>Preencha os dados para preparar sua mensagem. Depois, abra o WhatsApp e converse diretamente com a equipe.</p><div className="quote-disclaimer"><MessageCircle size={23} /><p>O atendimento só fica agendado após a confirmação da Salgueiro. A data escolhida é uma preferência.</p></div><p className="privacy-note">Os dados ficam apenas nesta página e entram na mensagem que você escolher enviar. Não armazenamos o formulário.</p></div>
    <form className="quote-form" onSubmit={preparar} onChange={() => setMensagem("")}>
      <label htmlFor="nome">Seu nome<input id="nome" name="nome" placeholder="Como podemos chamar você?" required maxLength={80} autoComplete="given-name" /></label>
      <label htmlFor="veiculo">Seu veículo<input id="veiculo" name="veiculo" placeholder="Ex.: Onix 1.0, ano 2020" required maxLength={100} /></label>
      <label htmlFor="servico">O que você precisa?<select id="servico" name="servico" required defaultValue=""><option value="" disabled>Escolha um serviço</option>{servicos.map(s => <option key={s.id}>{s.nome}</option>)}</select></label>
      <label htmlFor="data">Data de preferência <span>(opcional)</span><input id="data" name="data" type="date" min={hoje} /></label>
      <label htmlFor="detalhes">Quer contar mais alguma coisa? <span>(opcional)</span><textarea id="detalhes" name="detalhes" rows={3} placeholder="Descreva o que precisa ou o que percebeu no carro." maxLength={1000} /></label>
      {mensagem ? <div className="quote-result" role="status"><strong>Sua mensagem está pronta.</strong><p>Confira os dados e abra o WhatsApp para enviar.</p><pre>{mensagem}</pre><a className="button" href={whatsapp(mensagem)} target="_blank" rel="noopener noreferrer">Abrir conversa no WhatsApp <ArrowUpRight size={19} /></a></div> : <button className="button" type="submit">Preparar pedido <ArrowUpRight size={20} /></button>}
      <p className="form-note">Nenhum pedido é enviado automaticamente.</p>
    </form></div>;
}
