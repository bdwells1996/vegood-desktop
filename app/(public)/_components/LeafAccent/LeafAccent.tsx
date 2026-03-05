import Image from "next/image";
import { leafAccentAssets, LeafAccentVariant } from "./leafAccentAssets";

interface LeafAccentProps {
  variant: LeafAccentVariant;
  className?: string;
}

export function LeafAccent({ variant, className }: LeafAccentProps) {
  return (
    <Image
      src={leafAccentAssets[variant]}
      alt=""
      aria-hidden="true"
      className={className}
    />
  );
}
