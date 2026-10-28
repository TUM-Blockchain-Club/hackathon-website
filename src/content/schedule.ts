import type { ScheduleDay } from "@/types/content";

export const scheduleContent = {
  title: "Hackathon Agenda",
  description:
    "Find workshops, connecting hours, meal times and start and finish times here.",
  fallback: "Full schedule coming soon.",
  /**
   * Munich is back on CET (UTC+1) after the 25 October 2026 clock change.
   * Only used for countdown/live maths; times are shown without a zone.
   */
  utcOffset: "+01:00",
  /** Hacking starts; the homepage countdown counts down to this moment. */
  kickoff: { date: "2026-10-30", time: "09:00" },
};

export const scheduleDays: ScheduleDay[] = [
  {
    label: "Day 1 Fri, Oct 30",
    date: "2026-10-30",
    interludes: [
      { startTime: "13:30", label: "13:30 – 19:00", text: "Hacking continues" },
      {
        startTime: "19:00",
        label: "Overnight",
        text: "Hacking continues through the night. The venue stays open, so you can come and go.",
      },
    ],
    sessions: [
      {
        startTime: "08:00",
        title: "Doors Open",
        type: "Milestone",
      },
      {
        startTime: "09:00",
        title: "Hackathon Starts",
        type: "Milestone",
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
            imageSrc: "/speakers/kerem_eskici.jpg",
          },
        ],
      },
      {
        startTime: "10:30",
        endTime: "11:00",
        title: "Agentic Commerce on Cardano: get your agent hired and paid",
        type: "Workshop",
        location: "Workshop Room",
        sponsor: "Cardano",
        sponsorLogoSrc: "/sponsors/cardano_icon.svg",
        note: "How agents get hired and paid on Cardano, per job with Masumi escrow on Sokosumi or per request with x402, plus build ideas, judging, and where to find starters, guides and help.",
        speakers: [
          {
            name: "Bora Oben",
            role: "Developer Community Advocate, Cardano",
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
            imageSrc: "/speakers/ugur_schenk.jpg",
          },
        ],
      },
      {
        startTime: "11:30",
        endTime: "12:00",
        title: "BSV Association Workshop",
        type: "Workshop",
        location: "Workshop Room",
        sponsor: "BSV Association",
        sponsorLogoSrc: "/sponsors/bsv_icon.png",
        note: "A 30-minute workshop from BSV Association to help you get started on the DeFi Rails for Agentic Payments track.",
        speakers: [
          {
            name: "Axel Maisonneuve",
            role: "Head of DevRel, BSV Association",
            imageSrc: "/speakers/axel_maisonneuve.jpg",
          },
        ],
      },
      {
        startTime: "12:45",
        endTime: "13:30",
        title: "Lunch",
        titleSuffix: "sponsored by BSV Association and Cardano",
        type: "Meal",
        location: "Hacker Area",
      },
      {
        startTime: "19:00",
        title: "Dinner",
        titleSuffix: "sponsored by BSV Association and Cardano",
        type: "Meal",
        location: "Hacker Area",
      },
    ],
  },
  {
    label: "Day 2 Sat, Oct 31",
    date: "2026-10-31",
    interludes: [
      { startTime: "09:00", label: "09:00 – 12:45", text: "Hacking continues" },
      { startTime: "13:30", label: "13:30 – 15:00", text: "Hacking continues" },
    ],
    sessions: [
      {
        startTime: "09:00",
        title: "Breakfast",
        titleSuffix: "sponsored by BSV Association and Cardano",
        type: "Meal",
        location: "Hacker Area",
      },
      {
        startTime: "12:45",
        endTime: "13:30",
        title: "Lunch",
        titleSuffix: "sponsored by BSV Association and Cardano",
        type: "Meal",
        location: "Hacker Area",
      },
      {
        startTime: "15:00",
        title: "Submission Deadline",
        type: "Milestone",
      },
      {
        startTime: "15:00",
        endTime: "17:00",
        title: "Live Judging",
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
        speakers: [
          {
            name: "Kerem Eskici",
            role: "Vice President, TUM Blockchain Club",
            imageSrc: "/speakers/kerem_eskici.jpg",
          },
        ],
      },
    ],
  },
];
