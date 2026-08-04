type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  message = "No pudimos cargar los aportes ciudadanos. Las propuestas siguen disponibles.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="gallery-error-banner" role="alert">
      <p>{message}</p>
      {onRetry ? (
        <button className="button button-outline" onClick={onRetry} type="button">
          Reintentar
        </button>
      ) : null}
    </div>
  );
}
