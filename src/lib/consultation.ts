export type RequestType = "oficina" | "autopecas" | "lavajato";
export type ServiceRequest = {
  type: RequestType; request: string; brand?: string; model?: string; year?: string;
  name?: string; date?: string; notes?: string; productCode?: string;
};
export type RequestErrors = Partial<Record<keyof ServiceRequest, string>>;

export function localDate(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  return ["year", "month", "day"].map(type => parts.find(p => p.type === type)?.value).join("-");
}

export function validateRequest(data: ServiceRequest, today = localDate()): RequestErrors {
  const errors: RequestErrors = {};
  if (!["oficina", "autopecas", "lavajato"].includes(data.type)) errors.type = "Escolha o atendimento.";
  if (!data.request.trim() || data.request.trim().length > 200) errors.request = "Informe o que precisa, em até 200 caracteres.";
  if (data.year && (!/^\d{4}$/.test(data.year) || Number(data.year) < 1900 || Number(data.year) > Number(today.slice(0, 4)) + 1)) errors.year = "Confira o ano ou deixe em branco se não souber.";
  if (data.date && data.type !== "autopecas") {
    const parsed = new Date(`${data.date}T12:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || !Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== data.date || data.date < today) errors.date = "Escolha hoje ou uma data futura válida.";
  }
  for (const key of ["brand", "model", "name"] as const) if ((data[key]?.length ?? 0) > 80) errors[key] = "Use até 80 caracteres.";
  if ((data.notes?.length ?? 0) > 1000) errors.notes = "Use até 1000 caracteres nas observações.";
  return errors;
}

export function buildRequestMessage(data: ServiceRequest): string {
  const type = { oficina: "Oficina", autopecas: "Autopeças", lavajato: "Lavajato" }[data.type];
  const vehicle = [data.brand?.trim(), data.model?.trim()].filter(Boolean).join(" ");
  return ["Olá! Vim pelo site da Salgueiro e gostaria de fazer uma consulta.", "", `Atendimento: ${type}`,
    ...(data.name?.trim() ? [`Nome: ${data.name.trim()}`] : []),
    `Pedido: ${data.request.trim()}`, ...(data.productCode ? [`Referência: ${data.productCode}`] : []),
    `Veículo: ${vehicle || "Preciso de orientação para identificar"}`,
    ...(data.year ? [`Ano: ${data.year}`] : []),
    ...(data.type !== "autopecas" ? [`Data de preferência: ${data.date ? data.date.split("-").reverse().join("/") : "A combinar"}`] : []),
    ...(data.notes?.trim() ? [`Observações: ${data.notes.trim()}`] : []), "", `Podem confirmar aplicação, disponibilidade e orçamento?${data.type !== "autopecas" ? " A data é apenas uma preferência." : ""}`].join("\n");
}
