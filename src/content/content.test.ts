import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { faqGroups, faqResources } from "@/content/faq";
import { people } from "@/content/people";
import { prizeContent, prizeTracks } from "@/content/prizes";
import { scheduleDays } from "@/content/schedule";
import { allSponsors, currentYearSponsors } from "@/content/sponsors";
import {
  FALLBACK_TEXT,
  footerLinks,
  navItems,
  siteConfig,
  socialLinks,
} from "@/content/site";

function publicAssetPath(assetPath: string) {
  return join(process.cwd(), "public", assetPath.replace(/^\//, ""));
}

function expectAbsoluteUrl(value: string) {
  const url = new URL(value);
  expect(["http:", "https:", "mailto:"].includes(url.protocol)).toBe(true);
}

describe("site content contract", () => {
  it("keeps public navigation aligned with the implemented static routes", () => {
    const implementedRoutes = new Set([
      "/",
      "/prizes",
      "/schedule",
      "/speakers-and-judges",
      "/faq",
    ]);

    const internalNavRoutes = navItems
      .filter((item) => !item.external)
      .map((item) => item.href);

    expect(internalNavRoutes).toEqual(Array.from(implementedRoutes));

    for (const item of [...navItems, ...footerLinks, ...socialLinks]) {
      expect(item.label.trim().length).toBeGreaterThan(0);

      if (
        item.external ||
        item.href.startsWith("http") ||
        item.href.startsWith("mailto:")
      ) {
        expectAbsoluteUrl(item.href);
      } else {
        expect(implementedRoutes.has(item.href)).toBe(true);
      }
    }
  });

  it("keeps the event dates consistent across site config, schedule, and FAQ copy", () => {
    expect(siteConfig.url).toBe(`https://${siteConfig.domain}`);
    expect(siteConfig.dateLabel).toBe("30-31 October 2026");
    expect(siteConfig.venue).toContain("House of Communication");

    expect(scheduleDays.map((day) => day.date)).toEqual([
      "2026-10-30",
      "2026-10-31",
    ]);
    expect(scheduleDays.map((day) => day.label)).toEqual([
      "Day 1 Fri, Oct 30",
      "Day 2 Sat, Oct 31",
    ]);

    const dateAnswer = faqGroups
      .flatMap((group) => group.items)
      .find((item) => item.question === "When and where is it?")?.answer;

    expect(dateAnswer).toContain("30-31 October 2026");
    expect(dateAnswer).toContain("House of Communication");
    expect(dateAnswer).toContain("31 October at 14:00");
  });

  it("keeps fallback prize content explicit while no partner tracks are public", () => {
    expect(prizeTracks).toHaveLength(0);
    expect(prizeContent.fallback).toBe("Prize tracks announced soon.");
    expect(prizeContent.trackAmountFallback).toBe(
      "Prize amount announced soon.",
    );
    expect(prizeContent.defaultRequirements).toEqual([
      "A working demo of your project.",
      "A public source code repository.",
      "A short demo video, with max length announced soon.",
      "A README describing what you built and how to run it.",
      "Project must be built during the hackathon. Pre-existing projects are not eligible unless meaningfully extended during the event.",
    ]);
  });

  it("keeps confirmed FAQ answers concrete and keeps disabled resource links explicit", () => {
    const slugs = new Set<string>();

    for (const group of faqGroups) {
      expect(group.slug).toMatch(/^[a-z0-9-]+$/);
      expect(slugs.has(group.slug)).toBe(false);
      slugs.add(group.slug);
      expect(group.items.length).toBeGreaterThan(0);

      for (const item of group.items) {
        expect(item.question.trim().length).toBeGreaterThan(0);
        expect(item.answer.trim().length).toBeGreaterThan(0);

        if (item.status === "confirmed") {
          expect(item.answer).not.toBe(FALLBACK_TEXT);
          expect(item.answer.toLowerCase()).not.toContain("announced soon");
        }
      }
    }

    expect(faqGroups[0]?.slug).toBe("about");
    expect(
      faqResources
        .filter((resource) => resource.disabled)
        .map((resource) => resource.label),
    ).toEqual(["Starter Docs"]);
  });

  it("references only sponsor and speaker assets that exist in public", () => {
    expect(allSponsors.length).toBeGreaterThanOrEqual(20);
    expect(currentYearSponsors.map((sponsor) => sponsor.name)).toEqual([
      "Devfolio",
      "BSV Blockchain",
    ]);
    expect(allSponsors.map((sponsor) => sponsor.name)).not.toContain(
      "Devfolio",
    );
    expect(allSponsors.map((sponsor) => sponsor.name)).not.toContain(
      "BSV Blockchain",
    );

    for (const sponsor of [...currentYearSponsors, ...allSponsors]) {
      expectAbsoluteUrl(sponsor.href);
      expect(sponsor.logoSrc).toBeTruthy();
      expect(existsSync(publicAssetPath(sponsor.logoSrc ?? ""))).toBe(true);
    }

    expect(
      currentYearSponsors.find((sponsor) => sponsor.name === "Devfolio"),
    ).toMatchObject({
      logoAlt: "DEVFOLIO LOGO",
      logoSrc: "/sponsors/devfolio_logo_colored.svg",
    });

    const publicPeople = people.filter((person) => person.publicCleared);
    expect(publicPeople.length).toBeGreaterThan(0);

    for (const person of publicPeople) {
      expect(person.imageSrc).toBeTruthy();
      expect(existsSync(publicAssetPath(person.imageSrc ?? ""))).toBe(true);
    }
  });
});
