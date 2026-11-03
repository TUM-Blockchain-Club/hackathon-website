import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TrackWinners } from "@/components/sections/track-winners";
import { winnerResults, type WinnerResults } from "@/content/winners";

const stagedResults: WinnerResults = {
  published: false,
  tracks: {
    "bsv-association": {
      "1st": {
        team: "Unannounced team",
        project: "Unannounced project",
        devfolioUrl: "https://devfolio.co/projects/first-project",
      },
      "2nd": {
        team: "Incomplete entry",
        project: " ",
        devfolioUrl: "https://devfolio.co/projects/incomplete-project",
      },
    },
  },
};

describe("track winner publication", () => {
  it("omits staged identities from the rendered markup until publication", () => {
    const { container } = render(<TrackWinners results={stagedResults} />);

    expect(screen.getAllByText("Winner locked")).toHaveLength(12);
    expect(container.innerHTML).not.toContain("Unannounced");
    expect(container.innerHTML).not.toContain("Incomplete entry");
    expect(container.innerHTML).not.toContain("devfolio.co");
    expect(screen.getByText("€2,500")).toBeInTheDocument();
    expect(screen.getByText("€3,000")).toBeInTheDocument();
    expect(screen.getByText("$10,000")).toBeInTheDocument();
    expect(
      screen.getByText("Audit credits by Adevar Labs"),
    ).toBeInTheDocument();
  });

  it("publishes complete results while keeping missing and blank entries locked", () => {
    render(<TrackWinners results={{ ...stagedResults, published: true }} />);

    expect(screen.getByText("Unannounced team")).toBeInTheDocument();
    expect(screen.getByText("Unannounced project")).toBeInTheDocument();
    expect(screen.queryByText("Incomplete entry")).not.toBeInTheDocument();
    expect(screen.getAllByText("Winner locked")).toHaveLength(11);
    expect(screen.queryByText("Results locked")).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "Unannounced team Unannounced project",
      }),
    ).toHaveAttribute("href", "https://devfolio.co/projects/first-project");
    expect(
      document.querySelector('a[href*="incomplete-project"]'),
    ).not.toBeInTheDocument();
  });

  it("keeps the locked markup identical when URLs are added", () => {
    const { container, rerender } = render(
      <TrackWinners results={{ published: false, tracks: {} }} />,
    );
    const lockedMarkup = container.innerHTML;
    rerender(<TrackWinners results={stagedResults} />);
    expect(container.innerHTML).toBe(lockedMarkup);
  });

  it("links each track's winner to their own supplied destination", () => {
    render(
      <TrackWinners
        results={{
          published: true,
          tracks: {
            ...stagedResults.tracks,
            cardano: {
              "2nd": {
                team: "Cardano winner",
                project: "Second project",
                devfolioUrl: "https://devfolio.co/@supplied-profile",
              },
            },
          },
        }}
      />,
    );
    expect(
      screen.getByRole("link", { name: "Cardano winner Second project" }),
    ).toHaveAttribute("href", "https://devfolio.co/@supplied-profile");
    expect(
      screen.getByRole("link", {
        name: "Unannounced team Unannounced project",
      }),
    ).toHaveAttribute("href", "https://devfolio.co/projects/first-project");
  });

  it.each([
    undefined,
    "",
    "not-a-url",
    "javascript:alert(1)",
    "http://devfolio.co/projects/example",
    "https://devfolio.co.example.com/projects/example",
    "https://example.com/projects/example",
  ])(
    "leaves winners without a valid Devfolio URL as plain text (%s)",
    (devfolioUrl) => {
      render(
        <TrackWinners
          results={{
            published: true,
            tracks: {
              api3: {
                "1st": { team: "API3 winner", project: "Project", devfolioUrl },
              },
            },
          }}
        />,
      );
      expect(screen.getByText("API3 winner")).toBeInTheDocument();
      expect(screen.getByText("API3 winner").closest("a")).toBeNull();
    },
  );

  it("publishes all twelve 2026 winners with their Devfolio links", () => {
    render(<TrackWinners results={winnerResults} />);

    expect(screen.queryByText("Winner locked")).not.toBeInTheDocument();
    expect(screen.queryByText("Results locked")).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Dar el eeers Hedgy" }),
    ).toHaveAttribute("href", "https://devfolio.co/projects/hedgy-91c5");
    expect(
      screen.getByRole("link", { name: "Kiko Devs Kiko" }),
    ).toHaveAttribute("href", "https://devfolio.co/projects/kiko-38f0");
    expect(
      screen.getByRole("link", { name: "BitcoinMiners AfterLife" }),
    ).toHaveAttribute("href", "https://devfolio.co/projects/afterlife-943e");
    // CreatorPay places in both the API3 and TUM Blockchain tracks.
    expect(
      screen.getAllByRole("link", { name: "Vibeathon CreatorPay" }),
    ).toHaveLength(2);
    expect(
      Object.values(winnerResults.tracks).flatMap((places) =>
        Object.values(places),
      ),
    ).toHaveLength(12);
  });
});
