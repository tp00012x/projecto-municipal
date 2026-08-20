import { SearchIcon } from "~/components/Icons";

type EmptyStateProps = {
  title?: string;
  description?: string;
  onReset?: () => void;
  resetLabel?: string;
};

export default function EmptyState({
  title = "Nada por acá con esos filtros",
  description = "Prueba con otra palabra o limpia los filtros para ver las 24 propuestas otra vez.",
  onReset,
  resetLabel = "Ver todas las propuestas",
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
