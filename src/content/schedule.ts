import type { ScheduleDay } from "@/types/content";

export const scheduleContent = {
  title: "Hackathon Agenda",
  description:
    "Find workshops, connecting hours, meal times and start and finish times here.",
  fallback: "Full schedule coming soon.",
  /** Munich is back on CET (UTC+1) after the 25 October 2026 clock change. */
  timezone: "CET",
  utcOffset: "+01:00",
  /** Reference point for the T+hh:mm mission clock shown on each session. */
  kickoff: { date: "2026-10-30", time: "09:00" },
};

export const scheduleDays: ScheduleDay[] = [
  {
    label: "Day 1 Fri, Oct 30",
    date: "2026-10-30",
    sessions: [
      {
        startTime: "09:00",
        title: "Hackathon Starts",
        type: "Milestone",
        note: "Doors open at the House of Communication. Check in, grab your badge, find your team and get set up for two days of building.",
      },
      {
        startTime: "09:30",
        title: "Opening Ceremony",
        type: "Ceremony",
        location: "Hackathon Stage",
        note: "Official opening of the TUM Blockchain & AI Hackathon 2026: a welcome from the organizers, an introduction to the partner tracks and everything you need to know for the weekend.",
        speakers: [
          {
            name: "Kerem Eskici",
            role: "Vice President, TUM Blockchain Club",
          },
        ],
      },
      {
        startTime: "10:00",
        endTime: "10:30",
        title: "BSV Association Workshop",
        type: "Workshop",
        timeTba: true,
        location: "Workshop Room",
        sponsor: "BSV Association",
        sponsorLogoSrc: "/sponsors/bsv_icon.png",
        note: "A 30-minute workshop from BSV Association to help you get started on the DeFi Rails for Agentic Payments track.",
        speakers: [
          {
            name: "Speaker to be announced",
            role: "BSV Association",
            placeholder: true,
          },
        ],
      },
      {
        startTime: "10:30",
        endTime: "11:00",
        title: "Cardano Workshop",
        type: "Workshop",
        timeTba: true,
        location: "Workshop Room",
        sponsor: "Cardano",
        sponsorLogoSrc: "/sponsors/cardano_icon.svg",
        note: "A 30-minute workshop from Cardano to help you get started on the Agentic Commerce on Cardano track.",
        speakers: [
          {
            name: "Speaker to be announced",
            role: "Cardano",
            placeholder: true,
          },
        ],
      },
      {
        startTime: "11:00",
        endTime: "11:30",
        title: "API3 Workshop: Building with AirnodeHub",
        type: "Workshop",
        location: "Workshop Room",
        sponsor: "API3",
        sponsorLogoSrc: "/sponsors/api3_icon.svg",
        note: "An introduction to API3 and AirnodeHub: how apps and agents use authenticated external data, plus the track's challenge, submission requirements, judging and prizes.",
        speakers: [
          {
            name: "Ugur Schenk",
            role: "Strategy Lead, API3",
          },
        ],
      },
      {
        startTime: "12:45",
        endTime: "13:30",
        title: "Lunch",
        titleSuffix: "sponsored by BSV, Cardano and API3",
        type: "Meal",
        note: "Lunch break. Step away from the keyboard, refuel, and meet the other teams.",
      },
      {
        startTime: "19:00",
        title: "Dinner",
        type: "Meal",
        location: "Hacker Area",
        note: "Dinner is served. Take a break, refuel, and catch up with the other teams.",
      },
    ],
  },
  {
    label: "Day 2 Sat, Oct 31",
    date: "2026-10-31",
    sessions: [
      {
        startTime: "09:00",
        title: "Breakfast",
        type: "Meal",
        location: "Hacker Area",
        note: "Breakfast to start day two. Grab a coffee and get back to building.",
      },
      {
        startTime: "12:45",
        endTime: "13:30",
        title: "Lunch",
        titleSuffix: "sponsored by BSV, Cardano and API3",
        type: "Meal",
        note: "Lunch break. Step away from the keyboard, refuel, and meet the other teams.",
      },
      {
        startTime: "15:00",
        title: "Hackathon Ends",
        type: "Milestone",
        note: "Building time is over: Devfolio submissions close at 15:00 sharp and judging begins. Thanks for building with us.",
      },
      {
        startTime: "15:00",
        endTime: "17:00",
        title: "Judging",
        type: "Judging",
        location: "Partner booths",
        note: "Each partner judges its own track for two hours. Present your project to the judges of every track you entered. TUM Blockchain Club judges every project for the TUM Blockchain Track.",
      },
      {
        startTime: "17:30",
        title: "Winner Announcement & Closing Ceremony",
        type: "Ceremony",
        location: "Hackathon Stage",
        note: "The winning teams are announced on stage, followed by the official close of the TUM Blockchain & AI Hackathon 2026.",
      },
    ],
  },
];
