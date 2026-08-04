type ProposalFiltersProps = {
  categories: string[];
  activeCategory: string;
  counts: Record<string, number>;
  totalCount: number;
  onChange: (category: string) => void;
};

export default function ProposalFilters({
  categories,
  activeCategory,
  counts,
  totalCount,
  onChange,
}: ProposalFiltersProps) {
  return (
    <div
      aria-label="Filtrar por categoría"
      className="gallery-filters"
      role="group"
    >
      <button
        aria-pressed={activeCategory === "Todas"}
        className={activeCategory === "Todas" ? "is-active" : ""}
        onClick={() => onChange("Todas")}
        type="button"
      >
        Todas
        <span>{totalCount}</span>
      </button>
      {categories.map((category) => (
        <button
          aria-pressed={activeCategory === category}
          className={activeCategory === category ? "is-active" : ""}
          key={category}
          onClick={() => onChange(category)}
          type="button"
        >
          {category}
          <span>{counts[category] ?? 0}</span>
        </button>
      ))}
    </div>
  );
}
