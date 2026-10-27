import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { faqGroups, faqResources } from "@/content/faq";
import { people } from "@/content/people";
import { prizeContent, prizeTracks } from "@/content/prizes";
import { scheduleDays } from "@/content/schedule";
import {
  allSponsors,
  currentYearSponsors,
  platformPartners,
  trackSponsors,
} from "@/content/sponsors";
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
      ...(siteConfig.showSpeakersAndJudges ? ["/speakers-and-judges"] : []),
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
    expect(dateAnswer).toContain("31 October at 15:00");
  });

  it("publishes every partner track with its confirmed details", () => {
    expect(prizeContent.mainPoolAmount).toBe("€12,000+");
    expect(prizeContent.description).toContain("€12,000+");

    expect(prizeTracks.map((track) => track.sponsor)).toEqual([
      "BSV Association",
      "Cardano",
      "API3",
      "TUM Blockchain Club",
    ]);

    const slugs = new Set<string>([prizeContent.submission.slug]);

    for (const track of prizeTracks) {
      expect(track.slug).toMatch(/^[a-z0-9-]+$/);
      expect(slugs.has(track.slug)).toBe(false);
      slugs.add(track.slug);

      // Partner track sponsors must also be listed in track sponsors
      if (track.sponsor !== "TUM Blockchain Club") {
        expect(trackSponsors.map((sponsor) => sponsor.name)).toContain(
          track.sponsor,
        );
      }
      expect(track.sponsorLogoSrc).toBeTruthy();
      expect(existsSync(publicAssetPath(track.sponsorLogoSrc ?? ""))).toBe(
        true,
      );

      if (track.sponsorMarkSrc) {
        expect(existsSync(publicAssetPath(track.sponsorMarkSrc))).toBe(true);
      }

      expectAbsoluteUrl(track.sponsorHref ?? "");
      if (track.sponsorXHref) {
        expectAbsoluteUrl(track.sponsorXHref);
      }
      expect(track.amount).toBeTruthy();

      for (const group of track.resources ?? []) {
        for (const link of group.links) {
          if (link.href) {
            expectAbsoluteUrl(link.href);
          } else {
            expect(link.pending).toBe(true);
          }
        }
      }

      // Judges are published by name, role and an optional photo only:
      // never phone numbers or Telegram handles.
      for (const judge of track.judges ?? []) {
        for (const key of Object.keys(judge)) {
          expect(["name", "role", "imageSrc"]).toContain(key);
        }
        if (judge.imageSrc) {
          expect(existsSync(publicAssetPath(judge.imageSrc))).toBe(true);
        }
      }

      for (const company of track.companies ?? []) {
        for (const src of [company.logoSrc, company.markSrc]) {
          if (src) {
            expect(existsSync(publicAssetPath(src))).toBe(true);
          }
        }
        expectAbsoluteUrl(company.href);
        expect(company.amount).toBeTruthy();
      }
    }

    const bsv = prizeTracks.find((t) => t.slug === "bsv-association");
    const cardano = prizeTracks.find((t) => t.slug === "cardano");
    const api3 = prizeTracks.find((t) => t.slug === "api3");
    const tum = prizeTracks.find((t) => t.slug === "tum-blockchain-club");

    expect(bsv?.amount).toBe("€4,000");
    expect(bsv?.trackName).toBe("DeFi Rails for Agentic Payments");
    expect(bsv?.status).toBe("confirmed");
    expect(bsv?.prizes?.map((prize) => prize.amount)).toEqual([
      "€2,500",
      "€1,000",
      "€500",
    ]);
    // ts-sdk and wallet-toolbox are archived; only the ts-stack monorepo is linked.
    const bsvLinks = (bsv?.resources ?? []).flatMap((group) =>
      group.links.map((link) => link.href ?? ""),
    );
    expect(bsvLinks).toContain("https://github.com/bsv-blockchain/ts-stack");
    expect(bsvLinks.some((href) => /ts-sdk|wallet-toolbox/.test(href))).toBe(
      false,
    );

    expect(api3?.amount).toBe("€2,000");
    expect(api3?.trackName).toBe("Any API in your contract");
    expect(api3?.status).toBe("confirmed");
    expect(api3?.prizes?.map((prize) => prize.amount)).toEqual([
      "€1,000",
      "€600",
      "€400",
    ]);
    expect(api3?.workshop?.when).toBe("Fri 30 Oct, 11:00–11:30");
    expect(cardano?.workshop?.when).toBe("Fri 30 Oct, 10:30–11:00");
    expect(bsv?.workshop?.when).toBe("Fri 30 Oct, 11:30–12:00");

    // Payout formats (USDC, fiat, ...) are never published.
    for (const track of prizeTracks) {
      const prizeText = JSON.stringify([track.prizes, track.prizeNote]);
      expect(prizeText).not.toMatch(/usdc|paid in|payout format/i);
    }

    expect(cardano?.amount).toBe("€6,000");
    expect(cardano?.trackName).toBe("Agentic Commerce on Cardano");
    expect(cardano?.status).toBe("confirmed");
    expect(cardano?.prizes?.map((prize) => prize.amount)).toEqual([
      "€3,000",
      "€2,000",
      "€1,000",
    ]);
    // Cardano asked for up to 3 minutes; the hackathon-wide 2.5-minute cap wins.
    expect(cardano?.submission?.join(" ")).toContain("2.5-minute");
    expect(
      cardano?.judgingCriteria?.reduce(
        (sum, criterion) => sum + Number.parseInt(criterion.weight, 10),
        0,
      ),
    ).toBe(100);

    expect(tum?.amount).toBe("€16,000 in audit credits");
    expect(tum?.trackName).toBe("TUM Blockchain Track");
    expect(tum?.companies?.map((company) => company.name)).toEqual([
      "Adevar Labs",
    ]);
    expect(tum?.companies?.[0]?.prizes?.map((prize) => prize.title)).toEqual([
      "10K in audit credits",
      "Pre-Audit Core",
      "Pre-Audit Express",
    ]);
    expect(tum?.judges?.map((judge) => judge.name)).toEqual([
      "Benjamin Bosnjak",
      "Zafar Nasimov",
    ]);

    expect(prizeContent.fallback).toBe("Prize tracks announced soon.");
    expect(prizeContent.trackAmountFallback).toBe(
      "Prize amount announced soon.",
    );
  });

  it("states the submission deadline, video limit and track limit", () => {
    const guide = prizeContent.submission;

    expect(guide.deadline).toBe("Saturday 31 October, 15:00 CET");
    expect(new Date(guide.deadlineIso).toISOString()).toBe(
      "2026-10-31T14:00:00.000Z",
    );
    expect(guide.requirements).toContain(
      "A demo video of at most 2.5 minutes.",
    );
    expect(guide.rules.join(" ")).toContain("up to three partner tracks");
    expect(guide.rules.join(" ")).toContain("All AI coding tools are allowed");
    expect(guide.judging.map((slot) => slot.time)).toEqual([
      "15:00",
      "15:00–17:00",
      "17:30",
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
    ).toEqual([]);
  });

  it("references only sponsor and speaker assets that exist in public", () => {
    expect(allSponsors.length).toBeGreaterThanOrEqual(20);

    // Premium and standard track sponsors stay separated from the platform partner.
    expect(trackSponsors.map((sponsor) => sponsor.name)).toEqual([
      "BSV Association",
      "Cardano",
      "API3",
    ]);
    expect(platformPartners.map((sponsor) => sponsor.name)).toEqual([
      "Devfolio",
      "Adevar Labs",
    ]);
    expect(currentYearSponsors.map((sponsor) => sponsor.name)).toEqual([
      "BSV Association",
      "Cardano",
      "API3",
      "Devfolio",
      "Adevar Labs",
    ]);
    for (const currentSponsor of currentYearSponsors) {
      expect(allSponsors.map((sponsor) => sponsor.name)).not.toContain(
        currentSponsor.name,
      );
    }

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
    expect(
      currentYearSponsors.find((sponsor) => sponsor.name === "Adevar Labs"),
    ).toMatchObject({
      logoAlt: "Adevar Labs logo",
      logoSrc: "/sponsors/adevar_labs_logo.png",
    });

    const publicPeople = people.filter((person) => person.publicCleared);
    expect(publicPeople.length).toBeGreaterThan(0);

    for (const person of publicPeople) {
      expect(person.imageSrc).toBeTruthy();
      expect(existsSync(publicAssetPath(person.imageSrc ?? ""))).toBe(true);
    }
  });
});
