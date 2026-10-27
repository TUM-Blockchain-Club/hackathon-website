import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { DeadlinePill } from "@/components/sections/deadline-pill";

const props = {
  href: "#how-to-submit",
  startLabel: "Friday 30 October, 09:00 CET",
  startIso: "2026-10-30T09:00:00+01:00",
  deadline: "Saturday 31 October, 15:00 CET",
};

describe("DeadlinePill", () => {
  afterEach(() => vi.useRealTimers());

  it("announces the start before hacking begins", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-29T20:00:00+01:00"));
    render(<DeadlinePill {...props} />);
    expect(
      screen.getByText("Hackathon begins Friday 30 October, 09:00 CET"),
    ).toBeTruthy();
  });

  it("shows the submission deadline once hacking has started", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-30T09:00:00+01:00"));
    render(<DeadlinePill {...props} />);
    expect(
      screen.getByText("Submissions close Saturday 31 October, 15:00 CET"),
    ).toBeTruthy();
  });
});
