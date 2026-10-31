import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TrackWinners } from "@/components/sections/track-winners";
import type { WinnerResults } from "@/content/winners";

const stagedResults: WinnerResults = {
  published: false,
  tracks: {
    "bsv-association": {
      "1st": { team: "Unannounced team", project: "Unannounced project" },
      "2nd": { team: "Incomplete entry", project: " " },
    },
  },
};

describe("track winner publication", () => {
  it("omits staged identities from the rendered markup until publication", () => {
    const { container } = render(<TrackWinners results={stagedResults} />);

    expect(screen.getAllByText("Winner locked")).toHaveLength(12);
    expect(container.innerHTML).not.toContain("Unannounced");
    expect(container.innerHTML).not.toContain("Incomplete entry");
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
  });
});
