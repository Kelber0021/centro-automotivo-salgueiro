"use client";
import { useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { servicos, whatsapp } from "@/config/site";
import { products, productCategories } from "@/config/catalog";
import { buildRequestMessage, localDate, validateRequest, type RequestErrors, type RequestType, type ServiceRequest } from "@/lib/consultation";
import type { Product } from "@/lib/commerce";
import { useLocalDate } from "@/lib/useLocalDate";

export function QuoteForm() {
  const params = useSearchParams();
  const product = products.find(p => p.id === params.get("produto") && p.approved && productCategories.some(c => c.id === p.categoryId && c.approved));
  return <RequestForm key={product?.id ?? "general"} product={product} />;
}
function RequestForm({ product }: { product?: Product }) {
  const [data, setData] = useState<ServiceRequest>({ type: product ? "autopecas" : "oficina", request: product?.name ?? "", productCode: product?.code, brand: "", model: "", year: "", name: "", date: "", notes: "" });
  const [errors, setErrors] = useState<RequestErrors>({});
  const [message, setMessage] = useState("");
  const [unknownVehicle, setUnknownVehicle] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const today = useLocalDate();
  function field<K extends keyof ServiceRequest>(key: K, value: ServiceRequest[K]) {
    setData(old => ({ ...old, [key]: value, ...(key === "request" && value !== product?.name ? { productCode: undefined } : {}) }));
    setMessage(""); setErrors(old => ({ ...old, [key]: undefined }));
  }
  function changeType(type: RequestType) {
    setData(old => ({ ...old, type, request: type === "lavajato" ? "Lavagem automotiva" : "", date: "", productCode: undefined }));
    setErrors({}); setMessage("");
  }
  function prepare(event: FormEvent) {
    event.preventDefault(); const currentErrors = validateRequest(data, localDate()); setErrors(currentErrors);
    if (Object.keys(currentErrors).length) { setMessage(""); requestAnimationFrame(() => form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()); return; }
    setMessage(buildRequestMessage(data));
  }
  const error = (key: keyof ServiceRequest) => errors[key] ? <span id={`error-${key}`} className="field-error">{errors[key]}</span> : null;
  return <div className="quote-layout">
    <div className="quote-intro"><p className="section-label">Solicitação de atendimento</p><h2>Conte o que precisa.<br /><span className="muted-title">A conversa começa por aqui.</span></h2><p>Informe o atendimento e o que souber sobre o veículo. A equipe orienta a aplicação, o orçamento e a disponibilidade.</p><div className="quote-disclaimer"><p>A data é uma preferência. O envio da mensagem não confirma um agendamento.</p></div><p className="privacy-note">O formulário não é armazenado pelo site. Você confere antes de abrir o WhatsApp.</p></div>
    <form ref={form} className="quote-form request-form" onSubmit={prepare} noValidate>
      <fieldset className="quote-category"><legend>Qual atendimento você procura?</legend>{([{ id: "oficina", name: "Oficina" }, { id: "autopecas", name: "Autopeças" }, { id: "lavajato", name: "Lavajato" }] as const).map(item => <label key={item.id} className={`category-option ${data.type === item.id ? "selected" : ""}`}><input type="radio" name="type" value={item.id} checked={data.type === item.id} onChange={() => changeType(item.id)} /><span>{item.name}</span></label>)}</fieldset>
      <div className="form-field"><label htmlFor="request">O que você precisa?</label><input id="request" name="request" list={data.type === "oficina" ? "service-suggestions" : undefined} value={data.request} onChange={e => field("request", e.target.value)} maxLength={200} required aria-invalid={!!errors.request} aria-describedby={errors.request ? "error-request" : "request-help"} placeholder={data.type === "autopecas" ? "Nome da peça, medida ou dúvida" : "Ex.: troca de óleo ou preciso de orientação"} /><small id="request-help">Não precisa conhecer o nome técnico. Descreva com suas palavras.</small>{error("request")}<datalist id="service-suggestions">{servicos.filter(s => s.categoria === "oficina").map(s => <option key={s.id} value={s.nome} />)}<option value="Preciso de orientação" /></datalist></div>
      <fieldset className="vehicle-fields"><legend>Seu veículo <span>(se souber)</span></legend><label className="unknown-vehicle"><input type="checkbox" checked={unknownVehicle} onChange={e => { setUnknownVehicle(e.target.checked); setData(old => ({ ...old, brand: "", model: "", year: "" })); setMessage(""); setErrors({}); }} /> Não sei informar o modelo ou a versão</label>{!unknownVehicle && <div className="form-two-columns"><div className="form-field"><label htmlFor="brand">Marca (opcional)</label><input id="brand" name="brand" value={data.brand} onChange={e => field("brand", e.target.value)} placeholder="Ex.: Fiat" maxLength={80} /></div><div className="form-field"><label htmlFor="model">Modelo (opcional)</label><input id="model" name="model" value={data.model} onChange={e => field("model", e.target.value)} placeholder="Ex.: Uno" maxLength={80} /></div><div className="form-field"><label htmlFor="year">Ano (opcional)</label><input id="year" name="year" value={data.year} onChange={e => field("year", e.target.value)} inputMode="numeric" maxLength={4} placeholder="Ex.: 2020" aria-invalid={!!errors.year} aria-describedby={errors.year ? "error-year" : undefined} />{error("year")}</div></div>}</fieldset>
      <details className="quote-extra"><summary>Adicionar nome, data ou observações</summary><div className="form-field"><label htmlFor="name">Nome (opcional)</label><input id="name" name="name" autoComplete="given-name" value={data.name} onChange={e => field("name", e.target.value)} maxLength={80} /></div>{data.type !== "autopecas" && <div className="form-field"><label htmlFor="date">Data de preferência (opcional)</label><input id="date" name="date" type="date" min={today || undefined} value={data.date} onChange={e => field("date", e.target.value)} aria-invalid={!!errors.date} aria-describedby={errors.date ? "error-date" : undefined} />{error("date")}</div>}<div className="form-field"><label htmlFor="notes">Observações (opcional)</label><textarea id="notes" name="notes" value={data.notes} onChange={e => field("notes", e.target.value)} maxLength={1000} rows={3} placeholder="Conte o que mais precisamos saber." /></div></details>
      {Object.keys(errors).some(k => !!errors[k as keyof ServiceRequest]) && <p role="alert" className="field-error">Confira os campos indicados para preparar sua mensagem.</p>}
      {message ? <div className="quote-result" role="status"><strong>Sua mensagem está pronta para conferir.</strong><pre>{message}</pre><a className="button" href={whatsapp(message)} target="_blank" rel="noopener noreferrer">Abrir conversa no WhatsApp <ArrowUpRight size={18} /></a></div> : <button className="button" type="submit">Preparar mensagem <ArrowUpRight size={18} /></button>}
      <p className="form-note">Você revisa e envia. Nada é enviado automaticamente.</p>
    </form>
  </div>;
}
