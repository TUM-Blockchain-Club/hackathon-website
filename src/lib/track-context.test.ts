import { describe, expect, it } from "vitest";
import { prizeTracks } from "@/content/prizes";
import { buildTrackContext } from "@/lib/track-context";

describe("minimal track starting context", () => {
  it.each(prizeTracks)(
    "keeps $sponsor context short and points to current rules",
    (track) => {
      const context = buildTrackContext(track);
      expect(context.split(/\s+/).length).toBeLessThan(150);
      expect(context).toContain(`/prizes#${track.slug}`);
      expect(context).toContain("/prizes#how-to-submit");
      const links = context.split("\n").filter((line) => line.startsWith("- "));
      expect(links.length).toBeLessThanOrEqual(4);
      for (const link of links) {
        expect(
          (track.resources ?? []).some((group) =>
            group.links.some(
              (source) => source.href && link.endsWith(source.href),
            ),
          ),
        ).toBe(true);
      }
      expect(context).not.toContain("undefined");
      expect(context).not.toContain("Qualification requirements\n");
    },
  );

  it("skips unpublished resources instead of giving an unavailable setup link", () => {
    const context = buildTrackContext({
      slug: "demo",
      sponsor: "Demo",
      trackName: "Demo Track",
      resources: [
        {
          title: "Start here",
          links: [
            { label: "Pending pack", pending: true },
            { label: "Docs", href: "https://example.com/docs" },
          ],
        },
      ],
    });
    expect(context).not.toContain("Pending pack");
    expect(context).toContain("https://example.com/docs");
  });

  it("links the published BSV developer pack first", () => {
    const context = buildTrackContext(
      prizeTracks.find((track) => track.slug === "bsv-association")!,
    );
    expect(context).toContain("BSV developer pack: https://drive.google.com/");
  });
});
