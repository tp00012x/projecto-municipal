import { SearchIcon } from "~/components/Icons";

type ProposalSearchProps = {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
};

export default function ProposalSearch({
  value,
  onChange,
  onClear,
}: ProposalSearchProps) {
  return (
    <div className="gallery-search-wrap">
      <label className="search-field gallery-search">
        <span className="sr-only">Buscar propuestas</span>
        <SearchIcon />
        <input
          aria-label="Buscar por tema, meta o palabra clave"
          onChange={(event) => onChange(event.target.value)}
          placeholder="Buscar por tema, meta o palabra clave"
          type="search"
          value={value}
        />
      </label>
      {value && onClear ? (
        <button
          aria-label="Limpiar búsqueda"
          className="gallery-clear-search"
          onClick={onClear}
          type="button"
        >
          Limpiar
        </button>
      ) : null}
    </div>
  );
}
