export type SearchableProduct = { id: string; name: string; categoryId: string; approved: boolean; brand?: string; code?: string; description?: string; application?: string };
export type Product = SearchableProduct & { image?: string; imageAlt?: string; specification?: string };
export type ProductFilters = { query?: string; category?: string; brand?: string };
export type Offer = { id: string; title: string; description: string; conditions: string; approved: boolean; published: boolean; startsAt: string; endsAt: string };
export const normalizeSearch = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
export function filterProducts<T extends SearchableProduct>(products: readonly T[], filters: ProductFilters): T[] {
  const terms = normalizeSearch(filters.query ?? "").split(/\s+/).filter(Boolean);
  return products.filter(p => p.approved && (!filters.category || p.categoryId === filters.category) && (!filters.brand || p.brand === filters.brand)
    && terms.every(term => normalizeSearch([p.name, p.code, p.description, p.application, p.brand].filter(Boolean).join(" ")).includes(term)));
}
export function isOfferActive(offer: Pick<Offer, "approved" | "published" | "startsAt" | "endsAt">, now = new Date()): boolean {
  if (!offer.approved || !offer.published || !/T.*(?:Z|[+-]\d{2}:\d{2})$/.test(offer.startsAt) || !/T.*(?:Z|[+-]\d{2}:\d{2})$/.test(offer.endsAt)) return false;
  const start = Date.parse(offer.startsAt), end = Date.parse(offer.endsAt);
  return Number.isFinite(start) && Number.isFinite(end) && start < end && start <= now.getTime() && now.getTime() < end;
}
