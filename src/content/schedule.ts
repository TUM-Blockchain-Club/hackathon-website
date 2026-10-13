import type { ScheduleDay } from "@/types/content";

export const scheduleContent = {
  title: "Hackathon Agenda",
  description:
    "Find workshops, connecting hours, meal times and start and finish times here.",
  fallback: "Full schedule coming soon.",
};

export const scheduleDays: ScheduleDay[] = [
  {
    label: "Day 1 Fri, Oct 30",
    date: "2026-10-30",
    sessions: [],
  },
  {
    label: "Day 2 Sat, Oct 31",
    date: "2026-10-31",
    sessions: [],
  },
];
