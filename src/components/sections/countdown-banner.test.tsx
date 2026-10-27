import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CountdownBanner } from "./countdown-banner";

function digits(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll(".countdown-3d-num"),
    (node) => node.textContent,
  );
}

describe("CountdownBanner timing", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("counts down to the published 09:00 CET kickoff (08:00 UTC)", () => {
    vi.spyOn(Date, "now").mockReturnValue(Date.UTC(2026, 9, 27, 8));
    const { container } = render(<CountdownBanner />);

    expect(digits(container)).toEqual(["03", "00", "00", "00"]);
    act(() => {
      vi.mocked(Date.now).mockReturnValue(Date.now() + 1000);
      vi.advanceTimersByTime(1000);
    });
    expect(digits(container)).toEqual(["02", "23", "59", "59"]);
  });

  it("shows hours, minutes and seconds independently", () => {
    vi.spyOn(Date, "now").mockReturnValue(Date.UTC(2026, 9, 27, 10, 25, 4));
    const { container } = render(<CountdownBanner />);
    expect(digits(container)).toEqual(["02", "21", "34", "56"]);
  });

  it("stays at zero from kickoff onward", () => {
    vi.spyOn(Date, "now").mockReturnValue(Date.UTC(2026, 9, 30, 7, 59, 59));
    const { container } = render(<CountdownBanner />);
    expect(digits(container)).toEqual(["00", "00", "00", "01"]);

    act(() => {
      vi.mocked(Date.now).mockReturnValue(Date.now() + 1000);
      vi.advanceTimersByTime(1000);
    });
    expect(digits(container)).toEqual(["00", "00", "00", "00"]);
    act(() => {
      vi.mocked(Date.now).mockReturnValue(Date.now() + 60_000);
      vi.advanceTimersByTime(60_000);
    });
    expect(digits(container)).toEqual(["00", "00", "00", "00"]);
  });

  it("honors explicit targets and clears its timer on unmount", () => {
    vi.spyOn(Date, "now").mockReturnValue(Date.UTC(2026, 9, 30, 8));
    const { container, unmount } = render(
      <CountdownBanner targetDate="2026-10-30T09:30:00+01:00" />,
    );
    expect(digits(container)).toEqual(["00", "00", "30", "00"]);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
