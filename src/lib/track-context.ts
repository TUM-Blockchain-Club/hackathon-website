import { siteConfig } from "@/content/site";
import type { PrizeTrack } from "@/types/content";

export function buildTrackContext(track: PrizeTrack) {
  const links = (track.resources ?? [])
    .flatMap((group) => group.links.filter((link) => link.href).slice(0, 1))
    .slice(0, 4)
    .map((link) => `- ${link.label}: ${link.href}`);
  return [
    `# ${track.sponsor}: ${track.trackName}`,
    "Help me start a small prototype. Ask what I want to build. Read the current sponsor docs before choosing setup commands.",
    `Track requirements: ${siteConfig.url}/prizes#${track.slug}`,
    `Submission rules: ${siteConfig.url}/prizes#how-to-submit`,
    "",
    ...(links.length ? ["Sponsor starting points:", ...links] : []),
    "Use the track's required network. Keep keys and secrets out of prompts and repositories.",
  ].join("\n");
}
