import type { FaqGroup, ResourceLink } from "@/types/content";
import { siteConfig, FALLBACK_TEXT } from "@/content/site";

export const faqContent = {
  title: "FAQ",
  description:
    "Everything participants need to know about applying, building, submitting, and getting help during the hackathon.",
  fallback: FALLBACK_TEXT,
};

export const faqResources: ResourceLink[] = [
  {
    label: "Apply",
    href: siteConfig.applicationUrl,
    primary: true,
  },
  {
    label: "Join the Telegram",
    href: siteConfig.telegramUrl,
    primary: false,
  },
  {
    label: "Starter Docs",
    href: "#starter-docs",
    primary: false,
    disabled: true,
  },
];

export const faqGroups: FaqGroup[] = [
  {
    slug: "about",
    code: "01",
    title: "About the hackathon",
    items: [
      {
        question: "What is the TUM Blockchain & AI Hackathon?",
        answer:
          "An in-person hackathon in Munich at the intersection of blockchain and AI, run by TUM Blockchain Club as part of TUM Blockchain Conference + Hackathon 26.",
        status: "confirmed",
      },
      {
        question: "When and where is it?",
        answer:
          "30-31 October 2026, at the House of Communication in Munich. Building begins on 30 October at 10:00, and submissions close on 31 October at 14:00. The full schedule is announced soon.",
        status: "partial-tbd",
      },
      {
        question: "Is it in person or online?",
        answer: "Fully in person, in Munich.",
        status: "confirmed",
      },
      {
        question: "What is the theme?",
        answer: "Blockchain and AI. Specific tracks are announced soon.",
        status: "partial-tbd",
      },
    ],
  },
  {
    slug: "eligibility-cost",
    code: "02",
    title: "Eligibility and cost",
    items: [
      {
        question: "Who can participate?",
        answer:
          "Anyone who is interested in building projects in the Blockchain and AI space are welcome to attend. Whether you are a developer, designer, product manager, or simply curious about the space - we encourage you to apply!",
        status: "partial-tbd",
      },
      {
        question: "Do I have to be a TUM student?",
        answer:
          "No, you do not need to be a TUM student. Everyone from all around the world is welcome to TUM Blockchain Hackathon.",
        status: "tbd",
      },
      {
        question: "How much does it cost?",
        answer:
          "Participation is free. Registration deposit details, if any, will be announced soon.",
        status: "partial-tbd",
      },
    ],
  },
  {
    slug: "building",
    code: "03",
    title: "Building your project",
    items: [
      {
        question: "Can I take part on my own, and how large can a team be?",
        answer:
          "Yes, solo participation is welcome. The maximum team size is 5.",
        status: "partial-tbd",
      },
      {
        question: "How do I find teammates?",
        answer:
          "Through team formation at the kickoff and in our Telegram community.",
        status: "confirmed",
      },
      {
        question: "Do I need prior experience?",
        answer:
          "Some programming and blockchain familiarity is recommended. Workshops and mentors are there to support you during the event.",
        status: "confirmed",
      },
      {
        question: "Can I start building before the event?",
        answer:
          "No. Work on your project during the hackathon. An existing project only qualifies if it is meaningfully extended during the event.",
        status: "confirmed",
      },
      {
        question: "Can I use open-source libraries or starter templates?",
        answer:
          "Yes, standard libraries and tooling are fine. The core build should happen during the hackathon.",
        status: "confirmed",
      },
    ],
  },
  {
    slug: "applying-submitting",
    code: "04",
    title: "Applying and submitting",
    items: [
      {
        question: "How do I register?",
        answer:
          "Apply on Devfolio at https://tum.devfolio.co. Each team member registers individually.",
        status: "confirmed",
      },
      {
        question: "How and where do I submit my project?",
        answer: "Through Devfolio, before the deadline on 31 October at 14:00.",
        status: "confirmed",
      },
      {
        question: "What do I need to submit?",
        answer:
          "A working demo, a public code repository, a short demo video, and a short write-up or README. Exact requirements and video length will be announced soon.",
        status: "partial-tbd",
      },
      {
        question: "Can I keep working after the deadline?",
        answer: "No. Only what you submit by the deadline is judged.",
        status: "confirmed",
      },
      {
        question: "Who owns the intellectual property of my project?",
        answer: "Your team keeps full ownership of your project and its IP.",
        status: "confirmed",
      },
    ],
  },
  {
    slug: "judging-prizes",
    code: "05",
    title: "Judging and prizes",
    items: [
      {
        question: "How are projects judged?",
        answer:
          "Judging criteria are announced soon. Expect a focus on technical execution, originality, use of partner technology, and real-world impact.",
        status: "partial-tbd",
      },
      {
        question: "Who are the judges?",
        answer: "Announced soon.",
        status: "tbd",
      },
      {
        question: "What are the prizes?",
        answer: "Announced soon, and the pool is growing.",
        status: "tbd",
      },
      {
        question: "When are winners announced?",
        answer: "On 31 October, after judging. Exact timing is announced soon.",
        status: "partial-tbd",
      },
      {
        question: "How are prizes paid out?",
        answer: FALLBACK_TEXT,
        status: "tbd",
      },
      {
        question: "Can one project win in more than one track?",
        answer: FALLBACK_TEXT,
        status: "tbd",
      },
    ],
  },
  {
    slug: "during-event",
    code: "06",
    title: "During the event",
    items: [
      {
        question: "Will there be mentors?",
        answer: "Yes. Mentor support details will be announced soon.",
        status: "partial-tbd",
      },
      {
        question: "How do I get help while building?",
        answer: "From mentors on-site and in our Telegram community.",
        status: "confirmed",
      },
      {
        question: "Will there be workshops?",
        answer: "Yes. The workshop schedule is announced soon.",
        status: "partial-tbd",
      },
      {
        question: "Can I build overnight?",
        answer: FALLBACK_TEXT,
        status: "tbd",
      },
      {
        question: "What should I bring?",
        answer:
          "Your laptop, charger, and a valid ID. Any additional packing notes will be announced soon.",
        status: "partial-tbd",
      },
      {
        question: "Is food provided?",
        answer: FALLBACK_TEXT,
        status: "tbd",
      },
      {
        question: "Is there accommodation?",
        answer: "Announced soon.",
        status: "tbd",
      },
      {
        question: "Will there be WiFi and power?",
        answer: "Yes, both are provided at the venue.",
        status: "confirmed",
      },
      {
        question: "Do you have accessibility arrangements?",
        answer:
          "Accessibility details will be announced soon. For specific needs, contact hackathon@tum-blockchain.com.",
        status: "partial-tbd",
      },
    ],
  },
];
