import { ChevronDownIcon } from "~/components/Icons";
import type { SortOption } from "~/lib/proposal-utils";

type ProposalSortProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
  showCommentSort: boolean;
};

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: "numero", label: "Número de propuesta" },
  { value: "titulo", label: "Nombre alfabético" },
  { value: "categoria", label: "Categoría" },
  { value: "comentadas", label: "Más comentadas" },
];

export default function ProposalSort({
  value,
  onChange,
  showCommentSort,
}: ProposalSortProps) {
  const options = showCommentSort
    ? sortOptions
    : sortOptions.filter((option) => option.value !== "comentadas");

  return (
    <label className="gallery-sort">
      <span>Ordenar por:</span>
      <div className="gallery-sort-select">
        <select
          aria-label="Ordenar propuestas"
          onChange={(event) => onChange(event.target.value as SortOption)}
          value={value}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon />
      </div>
    </label>
  );
}
