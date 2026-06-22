import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { FaqsSection } from "@/components/ui/faqs-1";
import { MiniNavbar } from "@/components/ui/mini-navbar";
import { PrizeTracks } from "@/components/sections/prize-tracks";
import { faqGroups, faqResources } from "@/content/faq";
import type { PrizeTrack } from "@/types/content";

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
    expect(
      screen.getByText(
        "Partner tracks are being finalized, and confirmed program details will be added soon.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Prize breakdown")).toBeTruthy();
    expect(
      screen.getByText("Track-specific requirements announced soon."),
    ).toBeTruthy();
  });

  it("updates the prize detail panel when a confirmed track is selected", async () => {
    const user = userEvent.setup();
    const tracks: PrizeTrack[] = [
      {
        sponsor: "Protocol Labs",
        trackName: "Protocol UX",
        amount: "5000 EUR",
        rightMark: "UX",
        description:
          "Make protocol onboarding measurable and easier for new builders.",
        ideas: ["Wallet onboarding health check"],
        requirements: ["Demo the full onboarding path."],
      },
      {
        sponsor: "Zero Knowledge Labs",
        trackName: "ZK Infrastructure",
        amount: "3000 EUR",
        rightMark: "ZK",
        description:
          "Build a proving dashboard that makes infrastructure status visible.",
        ideas: ["Proof latency visualizer"],
        requirements: ["Include a live or mocked prover status feed."],
      },
    ];

    render(<PrizeTracks tracks={tracks} />);

    expect(
      screen.getByText(
        "Make protocol onboarding measurable and easier for new builders.",
      ),
    ).toBeTruthy();

    const zkTrackButton = screen
      .getByText("ZK Infrastructure")
      .closest("button");
    expect(zkTrackButton).toBeTruthy();
    await user.click(zkTrackButton as HTMLButtonElement);

    expect(screen.getAllByText("3000 EUR").length).toBeGreaterThanOrEqual(2);
    expect(
      screen.getByText(
        "Build a proving dashboard that makes infrastructure status visible.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("Proof latency visualizer")).toBeTruthy();
  });
});
