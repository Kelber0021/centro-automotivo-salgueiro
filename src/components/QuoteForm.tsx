"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, CarFront, MessageCircle, Wrench } from "lucide-react";
import { orcamentoRapido, servicos, whatsapp } from "@/config/site";

export function QuoteForm() {
  const [mensagem, setMensagem] = useState("");
  const [categoria, setCategoria] = useState<"oficina" | "lavajato">("oficina");
  function preparar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const dados = new FormData(event.currentTarget);
    const nome = String(dados.get("nome") ?? "").trim();
    const veiculo = String(dados.get("veiculo") ?? "").trim();
    const servico = String(dados.get("servico") ?? "");
    if (!veiculo || !servicos.some(s => s.nome === servico)) return;
    const data = String(dados.get("data") ?? "");
    const detalhes = String(dados.get("detalhes") ?? "").trim();
    const linhas = [
      "Olá! Vim pelo site da Salgueiro e gostaria de solicitar um atendimento.", "",
      ...(nome ? ["Nome: " + nome] : []),
      "Veículo: " + veiculo, "Serviço: " + servico,
      "Data de preferência: " + (data ? data.split("-").reverse().join("/") : "A combinar"),
      ...(detalhes ? ["Observações: " + detalhes] : []),
      "", "Podem confirmar disponibilidade e orçamento?"
    ];
    setMensagem(linhas.join("\n"));
  }
  const hoje = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  return <div className="quote-layout"><div className="quote-intro"><h2>Conte o que precisa.<br /><span className="muted-title">A equipe cuida do próximo passo.</span></h2><p>Escolha o atendimento e informe seu carro. Sua mensagem fica pronta para conferir e enviar pelo WhatsApp.</p><div className="quote-disclaimer"><MessageCircle size={23} /><p>A data é uma preferência. O agendamento e o orçamento são confirmados pela equipe na conversa.</p></div><div className="quote-fast"><h3>Prefere ir direto à conversa?</h3><a href={orcamentoRapido("oficina")} target="_blank" rel="noopener noreferrer">Falar sobre oficina <ArrowUpRight size={16} /></a><a href={orcamentoRapido("lavajato")} target="_blank" rel="noopener noreferrer">Falar sobre lavagem <ArrowUpRight size={16} /></a></div><p className="privacy-note">Os dados ficam nesta página até você escolher enviar. Não armazenamos o formulário.</p></div>
    <form className="quote-form" onSubmit={preparar} onChange={() => setMensagem("")}>
      <fieldset className="quote-category"><legend>Qual atendimento você procura?</legend>{([{ id: "oficina", nome: "Oficina", Icon: Wrench }, { id: "lavajato", nome: "Lavajato", Icon: CarFront }] as const).map(c => <label key={c.id} className={categoria === c.id ? "category-option selected" : "category-option"}><input type="radio" name="atendimento" value={c.id} checked={categoria === c.id} onChange={() => setCategoria(c.id)} /><c.Icon size={21} /><span>{c.nome}</span></label>)}</fieldset>
      <div className="form-field"><label htmlFor="veiculo">Seu veículo</label><input id="veiculo" name="veiculo" placeholder="Ex.: Onix 1.0, ano 2020" required pattern={".*\\S.*"} title="Informe o modelo do seu veículo." maxLength={100} /></div>
      {categoria === "oficina" ? <div className="form-field"><label htmlFor="servico">Qual serviço?</label><select id="servico" name="servico" required defaultValue=""><option value="" disabled>Escolha um serviço</option>{servicos.filter(s => s.categoria === "oficina").map(s => <option key={s.id}>{s.nome}</option>)}</select></div> : <><input name="servico" type="hidden" value="Lavagem automotiva" /><p className="selected-wash">Lavagem automotiva · Opções e valores na conversa.</p></>}
      <div className="form-field"><label htmlFor="nome">Seu nome <span>(opcional)</span></label><input id="nome" name="nome" placeholder="Como podemos chamar você?" maxLength={80} autoComplete="given-name" /></div>
      <details className="quote-extra"><summary>Adicionar data ou observações</summary><div className="form-field"><label htmlFor="data">Data de preferência <span>(opcional)</span></label><input id="data" name="data" type="date" min={hoje} /></div><div className="form-field"><label htmlFor="detalhes">O que mais precisamos saber? <span>(opcional)</span></label><textarea id="detalhes" name="detalhes" rows={3} placeholder="Conte o que percebeu no carro ou o que procura." maxLength={1000} /></div></details>
      {mensagem ? <div className="quote-result" role="status"><strong>Sua mensagem está pronta.</strong><p>Confira os dados e abra a conversa para enviar.</p><pre>{mensagem}</pre><a className="button" href={whatsapp(mensagem)} target="_blank" rel="noopener noreferrer">Abrir conversa no WhatsApp <ArrowUpRight size={19} /></a></div> : <button className="button" type="submit">Preparar mensagem <ArrowUpRight size={19} /></button>}
      <p className="form-note">Você confere e envia. Nada é enviado automaticamente.</p>
    </form></div>;
}
