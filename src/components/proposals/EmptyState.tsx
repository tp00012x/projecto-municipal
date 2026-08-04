import { SearchIcon } from "~/components/Icons";

type EmptyStateProps = {
  title?: string;
  description?: string;
  onReset?: () => void;
  resetLabel?: string;
};

export default function EmptyState({
  title = "No encontramos propuestas relacionadas con tu búsqueda",
  description = "Prueba con otra palabra clave o restablece los filtros para ver todas las propuestas.",
  onReset,
  resetLabel = "Limpiar filtros",
}: EmptyStateProps) {
  return (
    <div className="gallery-empty-state" role="status">
      <SearchIcon />
      <strong>{title}</strong>
      <p>{description}</p>
      {onReset ? (
        <button className="button button-outline" onClick={onReset} type="button">
          {resetLabel}
        </button>
      ) : null}
    </div>
  );
}
