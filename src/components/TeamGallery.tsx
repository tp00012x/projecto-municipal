import Image from "next/image";
import MotionReveal from "~/components/MotionReveal";
import { galleryImages } from "~/data/site";

export default function TeamGallery() {
  return (
    <section className="section gallery-section" id="equipo">
      <div className="shell">
        <MotionReveal className="gallery-heading">
          <div>
            <p className="eyebrow">Registro fotográfico</p>
            <h2>
              Personas reales.
              <span> Trabajo en territorio.</span>
            </h2>
          </div>
          <p>
            Fotografías proporcionadas para este proyecto. Se muestran mediante
            recortes editoriales, sin regeneración ni modificación de rostros.
          </p>
        </MotionReveal>

        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <MotionReveal
              className={`gallery-card gallery-card-${index + 1}`}
              delay={index * 70}
              key={image.src}
            >
              <Image
                alt={image.alt}
                fill
                loading="lazy"
                sizes={
                  index === 0
                    ? "(max-width: 767px) 100vw, 66vw"
                    : "(max-width: 767px) 100vw, 33vw"
                }
                src={image.src}
              />
              <span>{image.caption}</span>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

