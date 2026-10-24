import { ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<"a">, "children"> & { label: string };

// Texto em duas linhas: referência Daily Direction, interação 01.
export function MotionLink({ label, className = "", ...props }: Props) {
  return <a {...props} className={`button motion-link ${className}`} aria-label={props["aria-label"] ?? label}>
    <span className="button-label" aria-hidden="true"><span>{label}</span><span>{label}</span></span>
    <ArrowUpRight size={17} aria-hidden="true" />
  </a>;
}
