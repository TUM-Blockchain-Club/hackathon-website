import { describe, expect, it, vi } from "vitest";

const { mockScheduleContent, mockScheduleDays } = vi.hoisted(() => ({
  mockScheduleContent: {
    title: "Hackathon Agenda",
    description:
      "Find workshops, connecting hours, meal times and start and finish times here.",
    fallback: "Full schedule coming soon.",
    utcOffset: "+01:00",
  },
  mockScheduleDays: [
    {
      label: "Day 1 Fri, Oct 30",
      date: "2026-10-30",
      sessions: [
        {
          startTime: "11:00",
          endTime: "12:00",
          title: "AI x Blockchain Workshop",
          type: "Workshop" as const,
          note: "Hands-on session for turning a sponsor prompt into a build plan.",
          location: "Workshop Room",
          speakers: [{ name: "Ada Mentor", role: "Mentor" as const }],
        },
        {
          startTime: "09:30",
          title: "Opening Ceremony",
          type: "Ceremony" as const,
          note: "Welcome builders and explain the hackathon rules.",
          location: "Main Stage",
          speakers: [{ name: "TUM Blockchain Club" }],
        },
      ],
    },
    {
      label: "Day 2 Sat, Oct 31",
      date: "2026-10-31",
      sessions: [
        {
          startTime: "15:00",
          title: "Hackathon Ends",
          type: "Milestone" as const,
          note: "The hackathon comes to a close.",
        },
      ],
    },
  ],
}));

vi.mock("@/content/schedule", () => ({
  scheduleContent: mockScheduleContent,
  scheduleDays: mockScheduleDays,
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ScheduleClient } from "./schedule-client";

describe("ScheduleClient", () => {
  it("renders sessions as time-ordered agenda cards", () => {
    render(<ScheduleClient />);

    const titles = screen
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);
    expect(titles).toEqual(["Opening Ceremony", "AI x Blockchain Workshop"]);

    // No sequence number or T+ mission clock on the cards.
    expect(screen.queryByText(/T[+-]\d{2}:\d{2}/)).toBeNull();
    expect(screen.getByText("Fri, 11:00 – 12:00")).toBeTruthy();
    expect(screen.getByText("Ada Mentor")).toBeTruthy();
    // Everyone is on site in Munich: times carry no time zone.
    expect(document.body.textContent).not.toMatch(/\b(CET|CEST|UTC)\b/);
  });

  it("switches days and filters sessions by speaker and title", async () => {
    const user = userEvent.setup();
    render(<ScheduleClient />);

    await user.click(screen.getByRole("button", { name: "Day 2 Sat, Oct 31" }));
    expect(screen.getByText("Hackathon Ends")).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Day 1 Fri, Oct 30" }));
    await user.type(
      screen.getByPlaceholderText("Search by session title, speaker..."),
      "ada",
    );

    expect(screen.queryByText("Opening Ceremony")).toBeNull();
    expect(screen.getByText("AI x Blockchain Workshop")).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Clear search" }));
    expect(screen.getByText("Opening Ceremony")).toBeTruthy();
  });
});
