export default function LoadingState() {
  return (
    <div aria-busy="true" aria-label="Cargando propuestas" className="gallery-loading">
      {Array.from({ length: 8 }, (_, index) => (
        <div className="gallery-skeleton-card" key={`skeleton-${index}`}>
          <div className="gallery-skeleton-media" />
          <div className="gallery-skeleton-body">
            <span className="gallery-skeleton-line gallery-skeleton-line-short" />
            <span className="gallery-skeleton-line gallery-skeleton-line-title" />
            <span className="gallery-skeleton-line" />
            <span className="gallery-skeleton-line gallery-skeleton-line-half" />
          </div>
        </div>
      ))}
    </div>
  );
}
