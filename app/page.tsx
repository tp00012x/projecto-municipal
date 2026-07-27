import CampaignSite from "./CampaignSite";
import proposals from "../data/propuestas.json";
import type { Proposal } from "../types/proposal";

export default function Home() {
  return <CampaignSite proposals={proposals as Proposal[]} />;
}
