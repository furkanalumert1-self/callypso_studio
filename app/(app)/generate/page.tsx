import { GenerateClient } from "@/components/app/generate-client";

/** Server side: fal.ai is "connected" when FAL_KEY exists — the key never reaches the client. */
export default function GeneratePage() {
  const falConnected = !!process.env.FAL_KEY;
  return <GenerateClient falConnected={falConnected} />;
}
