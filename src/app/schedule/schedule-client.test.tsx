import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { ScheduleDay } from "@/types/content";
import { ScheduleClient } from "./schedule-client";

const testScheduleDays = vi.hoisted<() => ScheduleDay[]>(() => () => [
  {
    label: "Day 1 Fri, Oct 30",
    date: "2026-10-30",
    sessions: [
      {
        time: "10:00",
        startTime: "10:00",
        endTime: "10:30",
        title: "Opening Ceremony",
        type: "Ceremony",
        note: "Welcome builders and explain the hackathon rules.",
        location: "Main Stage",
        speaker: "TUM Blockchain Club",
        gridStart: 4,
        gridEnd: 5,
      },
      {
        time: "11:00",
        startTime: "11:00",
        endTime: "12:00",
        title: "AI x Blockchain Workshop",
        type: "Workshop",
        note: "Hands-on session for turning a sponsor prompt into a build plan.",
        location: "Workshop Room",
        speaker: "Ada Mentor",
        gridStart: 6,
        gridEnd: 8,
      },
    ],
  },
  {
    label: "Day 2 Sat, Oct 31",
    date: "2026-10-31",
    sessions: [
      {
        time: "14:00",
        startTime: "14:00",
        endTime: "15:00",
        title: "Final Pitches",
        type: "Pitch",
        note: "Teams present submitted projects to judges.",
        location: "Main Stage",
        gridStart: 12,
        gridEnd: 14,
      },
    ],
  },
]);

vi.mock("@/content/schedule", () => ({
  scheduleContent: {
    title: "Conference Agenda",
    description: "Two days of talks, workshops, and networking.",
    fallback: "Full schedule coming soon.",
  },
  scheduleDays: testScheduleDays(),
}));

describe("ScheduleClient", () => {
  it("filters sessions by contextual search terms and opens the session detail dialog", async () => {
    const user = userEvent.setup();
    render(<ScheduleClient />);

    // Day 1 is selected by default
    expect(screen.getByText("Opening Ceremony")).toBeTruthy();
    expect(screen.getByText("AI x Blockchain Workshop")).toBeTruthy();

    // Switch to Day 2
    await user.click(screen.getByRole("button", { name: "Day 2 Sat, Oct 31" }));
    expect(screen.getByText("Final Pitches")).toBeTruthy();

    // Switch back to Day 1
    await user.click(screen.getByRole("button", { name: "Day 1 Fri, Oct 30" }));
    expect(screen.getByText("Opening Ceremony")).toBeTruthy();
    expect(screen.getByText("AI x Blockchain Workshop")).toBeTruthy();

    await user.type(
      screen.getByPlaceholderText("Search by session title, speaker..."),
      "workshop",
    );

    expect(screen.queryByText("Opening Ceremony")).toBeNull();
    expect(screen.getByText("AI x Blockchain Workshop")).toBeTruthy();

    await user.click(
      screen.getByRole("button", {
        name: /AI x Blockchain Workshop/i,
      }),
    );

    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByText("Session Details")).toBeTruthy();
    expect(screen.getByText("Ada Mentor")).toBeTruthy();
    expect(
      screen.getAllByText(
        "Hands-on session for turning a sponsor prompt into a build plan.",
      ).length,
    ).toBeGreaterThanOrEqual(2);

    await user.click(screen.getByRole("button", { name: "Close details" }));

    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
