import type { Offer, Product } from "@/lib/commerce";

// Categorias de planejamento. A aprovação abaixo é comercial, não técnica.
export const productCategories = [
  { id: "pneus", name: "Pneus", approved: false },
  { id: "baterias", name: "Baterias", approved: false },
  { id: "oleos", name: "Óleos e lubrificantes", approved: false },
  { id: "filtros", name: "Filtros", approved: false },
  { id: "freios", name: "Freios", approved: false },
  { id: "outras", name: "Outras autopeças", approved: false },
] as const;

// Não preencher com fixtures ou dados deduzidos das embalagens nas fotografias.
export const products: Product[] = [];
export const offers: Offer[] = [];
