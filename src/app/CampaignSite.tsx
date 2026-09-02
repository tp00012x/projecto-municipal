import BrandTransition from "~/components/BrandTransition";
import CandidateIntro from "~/components/CandidateIntro";
import ClosingSection from "~/components/ClosingSection";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import Hero from "~/components/Hero";
import IdentitySection from "~/components/IdentitySection";
import TeamGallery from "~/components/TeamGallery";
import VisionSection from "~/components/VisionSection";
import type { Proposal } from "~/types/proposal";

export default function CampaignSite({ proposals }: { proposals: Proposal[] }) {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <CandidateIntro />
        <VisionSection proposals={proposals} />
        <TeamGallery />
        <BrandTransition />
        <IdentitySection />
        <ClosingSection />
      </main>
      <Footer />
    </>
  );
}
