"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = [
  ".section-heading", ".service-card", ".about-image", ".about-copy",
  ".gallery-grid figure", ".steps-section h2", ".step", ".reputation-inner",
  ".location-grid > div:not(.map-frame)", ".contact-banner > .container", ".quote-intro", ".quote-form", ".review", ".impact-card", ".testimonial", ".testimonial-cta", ".photo-tile", ".process-step", ".care-card",
].join(", ");

// Melhoria progressiva: o HTML continua visível sem JavaScript ou animações.
export function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.getElementById("conteudo");
    if (!main) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};

    const setup = () => {
      dispose();
      if (preference.matches || !("IntersectionObserver" in window)) return;

      const registered = new WeakSet<HTMLElement>();
      const hero = main.querySelector<HTMLElement>(".hero");
      let frame = 0;
      let lastProgress = -1;
      let focoPorTeclado = true;

      const clearReveal = (element: HTMLElement) => {
        element.removeAttribute("data-scroll-reveal");
        element.style.removeProperty("--reveal-delay");
      };
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          element.dataset.scrollReveal = "visible";
          observer.unobserve(element);
        }
      }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });

      const register = () => {
        for (const element of main.querySelectorAll<HTMLElement>(revealSelector)) {
          if (registered.has(element)) continue;
          registered.add(element);
          // Não esconde conteúdo já visível, inclusive após filtros e navegação.
          if (element.getBoundingClientRect().top < window.innerHeight * 0.94) continue;
          const siblings = Array.from(element.parentElement?.children ?? []);
          const index = siblings.indexOf(element);
          const stagger = element.matches(".service-card, .gallery-grid figure, .step");
          element.style.setProperty("--reveal-delay", `${stagger ? (index % 3) * 85 : 0}ms`);
          element.dataset.scrollReveal = "pending";
          observer.observe(element);
        }
      };

      const updateHero = () => {
        frame = 0;
        if (!hero) return;
        const headerHeight = document.querySelector("header")?.offsetHeight ?? 0;
        const rect = hero.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (headerHeight - rect.top) / rect.height));
        if (Math.abs(progress - lastProgress) < 0.001) return;
        hero.style.setProperty("--hero-scroll", progress.toFixed(4));
        lastProgress = progress;
      };
      const schedule = () => {
        if (!frame) frame = window.requestAnimationFrame(updateHero);
      };
      const onAnimationEnd = (event: AnimationEvent) => {
        if (event.animationName === "salgueiro-reveal" && event.target instanceof HTMLElement) {
          clearReveal(event.target);
        }
      };
      const onFocus = (event: FocusEvent) => {
        // O clique não pode reposicionar seu alvo entre pointerdown e pointerup.
        if (!focoPorTeclado || !(event.target instanceof HTMLElement)) return;
        const parent = event.target.closest<HTMLElement>("[data-scroll-reveal]");
        if (parent) { observer.unobserve(parent); clearReveal(parent); }
      };
      const onPointerDown = () => { focoPorTeclado = false; };
      const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Tab") focoPorTeclado = true; };

      register();
      hero?.setAttribute("data-scroll-active", "");
      updateHero();
      const mutations = new MutationObserver(register);
      mutations.observe(main, { childList: true, subtree: true });
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      main.addEventListener("animationend", onAnimationEnd);
      main.addEventListener("focusin", onFocus);
      document.addEventListener("pointerdown", onPointerDown, true);
      document.addEventListener("keydown", onKeyDown, true);

      dispose = () => {
        observer.disconnect();
        mutations.disconnect();
        window.cancelAnimationFrame(frame);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        main.removeEventListener("animationend", onAnimationEnd);
        main.removeEventListener("focusin", onFocus);
        document.removeEventListener("pointerdown", onPointerDown, true);
        document.removeEventListener("keydown", onKeyDown, true);
        main.querySelectorAll<HTMLElement>("[data-scroll-reveal]").forEach(clearReveal);
        hero?.removeAttribute("data-scroll-active");
        hero?.style.removeProperty("--hero-scroll");
      };
    };

    setup();
    preference.addEventListener("change", setup);
    return () => { dispose(); preference.removeEventListener("change", setup); };
  }, [pathname]);

  return null;
}
