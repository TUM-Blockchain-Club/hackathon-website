import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { FaqsSection } from "@/components/ui/faqs-1";
import { HeroAsciiOne } from "@/components/ui/hero-ascii-one";
import { MiniNavbar } from "@/components/ui/mini-navbar";
import { CountdownBanner } from "@/components/sections/countdown-banner";
import { CurrentYearSponsors } from "@/components/sections/current-year-sponsors";
import { PrizeTracks } from "@/components/sections/prize-tracks";
import { RollingSponsors } from "@/components/sections/rolling-sponsors";
import { faqGroups, faqResources } from "@/content/faq";
import type { PrizeTrack, Sponsor } from "@/types/content";

const mockUsePathname = vi.fn(() => "/");

vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

describe("site component interactions", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/schedule");
  });

  it("opens and closes the mobile navigation with contextual hackathon links", async () => {
    const user = userEvent.setup();
    render(<MiniNavbar />);

    const openButton = screen.getByRole("button", { name: "Open menu" });
    expect(openButton.getAttribute("aria-expanded")).toBe("false");

    await user.click(openButton);

    const closeButton = screen.getByRole("button", { name: "Close menu" });
    expect(closeButton.getAttribute("aria-expanded")).toBe("true");
    expect(
      screen.getAllByRole("link", { name: "Schedule" }).length,
    ).toBeGreaterThan(1);
    expect(
      screen
        .getAllByRole("link", { name: "Conference" })[0]
        ?.getAttribute("href"),
    ).toBe("https://conference.tum-blockchain.com/");

    await user.click(screen.getAllByRole("link", { name: "FAQ" })[1]);

    expect(
      screen
        .getByRole("button", { name: "Open menu" })
        .getAttribute("aria-expanded"),
    ).toBe("false");
  });

  it("keeps FAQ topic groups collapsed until the user opens a contextual section", async () => {
    const user = userEvent.setup();
    render(<FaqsSection groups={faqGroups} resources={faqResources} />);

    expect(
      screen.getByText("What is the TUM Blockchain & AI Hackathon?"),
    ).toBeTruthy();
    expect(screen.queryByText("Who can participate?")).toBeNull();

    await user.click(
      screen.getByRole("button", { name: /Eligibility and cost/i }),
    );

    const participantQuestion = screen.getByRole("button", {
      name: /Who can participate\?/i,
    });
    expect(participantQuestion).toBeTruthy();

    await user.click(participantQuestion);

    expect(
      screen.getByText(
        /Anyone who is interested in building projects in the Blockchain and AI space/i,
      ),
    ).toBeTruthy();
  });

  it("renders truthful prize fallback copy when no partner tracks are public", () => {
    render(<PrizeTracks tracks={[]} />);

    expect(screen.getByText("Partner track slots")).toBeTruthy();
    expect(screen.getByText("Prize tracks announced soon.")).toBeTruthy();
    expect(
      screen.getByText(
        "Partner tracks are being finalized, and confirmed program details will be added soon.",
      ),
    ).toBeTruthy();
  });

  it("makes both marquee passes link to sponsor websites", () => {
    const sponsors: Sponsor[] = [
      {
        name: "Sui",
        tier: "Platinum",
        href: "https://sui.io/",
      },
      {
        name: "Solana",
        tier: "Gold",
        href: "https://solana.com/",
      },
    ];

    render(<RollingSponsors sponsors={sponsors} />);

    for (const sponsor of sponsors) {
      const links = screen.getAllByRole("link", {
        name: `${sponsor.name} official website`,
      });

      expect(links).toHaveLength(2);
      expect(links.map((link) => link.getAttribute("href"))).toEqual([
        sponsor.href,
        sponsor.href,
      ]);
    }
  });

  it("renders current year sponsors as static centered sponsor cards", () => {
    const sponsors: Sponsor[] = [
      {
        name: "Devfolio",
        tier: "Partner",
        href: "https://devfolio.co/",
        logoSrc: "/sponsors/devfolio_logo_colored.svg",
      },
      {
        name: "BSV Association",
        tier: "Partner",
        href: "https://bsvblockchain.org/",
        logoSrc: "/sponsors/bsv_blockchain_logo.png",
      },
    ];

    render(<CurrentYearSponsors sponsors={sponsors} />);

    for (const sponsor of sponsors) {
      const link = screen.getByRole("link", {
        name: `${sponsor.name} official website`,
      });
      expect(link.getAttribute("href")).toBe(sponsor.href);
    }
  });

  it("renders the hero apply button as a normal linked CTA", () => {
    render(
      <HeroAsciiOne
        eyebrow="House of Communication, Munich // 30-31 October 2026"
        headline="TUM Blockchain Hackathon"
        subhead="Build in Munich."
        primaryCta={{
          label: "Apply",
          href: "https://tum.devfolio.co",
        }}
        secondaryCta={{
          label: "View Prizes",
          href: "/prizes",
        }}
      />,
    );

    const applyLink = screen.getByRole("link", { name: "Apply" });
    expect(applyLink.getAttribute("href")).toBe("https://tum.devfolio.co");
    expect(screen.queryByRole("link", { name: "Apply with Devfolio" })).toBe(
      null,
    );
    expect(document.querySelector(".apply-button")).toBe(null);
  });

  it("stacks one anchored detail section per prize track", () => {
    const tracks: PrizeTrack[] = [
      {
        slug: "protocol-labs",
        sponsor: "Protocol Labs",
        trackName: "Protocol UX",
        sponsorHref: "https://protocol.ai/",
        about: "Protocol Labs builds protocols and tools for the open web.",
        amount: "5000 EUR",
        rightMark: "UX",
        description:
          "Make protocol onboarding measurable and easier for new builders.",
        ideas: ["Wallet onboarding health check"],
        requirements: ["Demo the full onboarding path."],
      },
      {
        slug: "zero-knowledge-labs",
        sponsor: "Zero Knowledge Labs",
        trackName: "ZK Infrastructure",
        rightMark: "ZK",
        status: "coming-soon",
      },
    ];

    const { container } = render(<PrizeTracks tracks={tracks} />);

    // Both tracks render in the tab sidebar, each anchored by its slug.
    expect(container.querySelector("#protocol-labs")).toBeTruthy();
    expect(container.querySelector("#zero-knowledge-labs")).toBeTruthy();

    expect(
      screen.getByText(
        "Make protocol onboarding measurable and easier for new builders.",
      ),
    ).toBeTruthy();
    expect(screen.getAllByText("5000 EUR").length).toBeGreaterThan(0);
    expect(screen.getByText("Wallet onboarding health check")).toBeTruthy();
    expect(screen.getByText("Demo the full onboarding path.")).toBeTruthy();
    expect(
      screen.getByRole("link", { name: /protocol\.ai/ }).getAttribute("href"),
    ).toBe("https://protocol.ai/");

    // Switch to the pending track
    const zkTab = container.querySelector("#zero-knowledge-labs");
    if (zkTab) {
      fireEvent.click(zkTab);
    }

    // The pending track advertises no amount, brief, or ideas.
    expect(screen.getByText("Prize details coming soon")).toBeTruthy();
    expect(
      screen.getAllByText("Prize amount announced soon.").length,
    ).toBeGreaterThan(0);
  });

  it("renders countdown banner with units and target title", () => {
    render(
      <CountdownBanner
        targetDate="2026-10-30T09:00:00+01:00"
        title="TUM Blockchain Hackathon"
      />,
    );

    expect(screen.getByText("COUNTDOWN TO")).toBeTruthy();
    expect(screen.getByText("TUM Blockchain Hackathon")).toBeTruthy();
    expect(screen.getByText("DAYS")).toBeTruthy();
    expect(screen.getByText("HOURS")).toBeTruthy();
    expect(screen.getByText("MINUTES")).toBeTruthy();
    expect(screen.getByText("SECONDS")).toBeTruthy();
  });
});
