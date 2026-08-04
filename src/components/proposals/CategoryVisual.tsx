import type { ComponentType, SVGProps } from "react";

import {
  CategoryAnimalIcon,
  CategoryCuidadoIcon,
  CategoryCulturaIcon,
  CategoryDeporteIcon,
  CategoryDigitalIcon,
  CategoryEconomiaIcon,
  CategoryEmpleoIcon,
  CategoryEspacioIcon,
  CategoryInclusionIcon,
  CategoryInnovacionIcon,
  CategoryJuventudIcon,
  CategoryMovilidadIcon,
  CategorySaludIcon,
  CategorySeguridadIcon,
  CategoryServiciosIcon,
  CategorySostenibilidadIcon,
  CategoryTransparenciaIcon,
  CategoryUrbanoIcon,
} from "~/components/Icons";

type CategoryVisualConfig = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  tone: string;
};

const categoryVisuals: Record<string, CategoryVisualConfig> = {
  Cuidado: { Icon: CategoryCuidadoIcon, tone: "tone-rose" },
  Inclusión: { Icon: CategoryInclusionIcon, tone: "tone-purple" },
  "Bienestar animal": { Icon: CategoryAnimalIcon, tone: "tone-teal" },
  Salud: { Icon: CategorySaludIcon, tone: "tone-blue" },
  Seguridad: { Icon: CategorySeguridadIcon, tone: "tone-indigo" },
  Juventud: { Icon: CategoryJuventudIcon, tone: "tone-violet" },
  Deporte: { Icon: CategoryDeporteIcon, tone: "tone-orange" },
  Innovación: { Icon: CategoryInnovacionIcon, tone: "tone-yellow" },
  Empleo: { Icon: CategoryEmpleoIcon, tone: "tone-slate" },
  "Cultura y turismo": { Icon: CategoryCulturaIcon, tone: "tone-amber" },
  "Desarrollo económico": { Icon: CategoryEconomiaIcon, tone: "tone-green" },
  Movilidad: { Icon: CategoryMovilidadIcon, tone: "tone-cyan" },
  "Desarrollo urbano": { Icon: CategoryUrbanoIcon, tone: "tone-stone" },
  Sostenibilidad: { Icon: CategorySostenibilidadIcon, tone: "tone-lime" },
  "Espacio público": { Icon: CategoryEspacioIcon, tone: "tone-emerald" },
  Transparencia: { Icon: CategoryTransparenciaIcon, tone: "tone-fuchsia" },
  "Gobierno digital": { Icon: CategoryDigitalIcon, tone: "tone-sky" },
  "Servicios municipales": { Icon: CategoryServiciosIcon, tone: "tone-neutral" },
};

const fallbackVisual: CategoryVisualConfig = {
  Icon: CategoryInnovacionIcon,
  tone: "tone-purple",
};

export function getCategoryVisual(categoria: string) {
  return categoryVisuals[categoria] ?? fallbackVisual;
}

type CategoryVisualProps = {
  categoria: string;
  className?: string;
  size?: "card" | "panel";
};

export default function CategoryVisual({
  categoria,
  className = "",
  size = "card",
}: CategoryVisualProps) {
  const { Icon, tone } = getCategoryVisual(categoria);

  return (
    <div
      aria-hidden="true"
      className={`category-visual ${tone} category-visual-${size} ${className}`.trim()}
    >
      <Icon />
    </div>
  );
}
