import type { ComponentProps } from "react";

/**
 * Navegação por documento para o export estático.
 * O transporte/prefetch RSC desta versão gerou 404 nos caminhos de segmentos
 * dinâmicos no servidor estático. Links nativos usam os HTMLs exportados,
 * preservam query/hash e funcionam também sem JavaScript.
 */
export default function SiteLink({ children, ...props }: ComponentProps<"a">) {
  return <a {...props}>{children}</a>;
}
