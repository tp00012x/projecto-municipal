import ClosingSection from "~/components/ClosingSection";
import FeaturedProposals from "~/components/FeaturedProposals";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import Hero from "~/components/Hero";
import IdentitySection from "~/components/IdentitySection";
import ParticipationStats from "~/components/ParticipationStats";
import ProposalExplorer from "~/components/ProposalExplorer";
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
        <IdentitySection />
        <VisionSection />
        <ProposalExplorer proposals={proposals} />
        <FeaturedProposals proposals={proposals} />
        <TeamGallery />
        <ParticipationStats proposals={proposals} />
        <ClosingSection />
      </main>
      <Footer />
    </>
  );
}
