import type { FaqGroup, ResourceLink } from "@/types/content";
import { siteConfig, FALLBACK_TEXT } from "@/content/site";
import { ticketRefundContent } from "@/content/ticket-refund";

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
    label: "Refund a student ticket",
    href: ticketRefundContent.path,
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
          "30-31 October 2026, at the House of Communication in Munich. Doors open on Friday 30 October at 09:00, and the opening ceremony starts at 09:30. Submissions close on 31 October at 15:00. The TUM Blockchain Conference takes place the day before, on Thursday 29 October. The full agenda is on the Schedule page.",
        status: "confirmed",
      },
      {
        question: "Is it in person or online?",
        answer: "Fully in person, in Munich.",
        status: "confirmed",
      },
      {
        question: "What is the theme?",
        answer:
          "Blockchain and AI. The partner tracks are Cardano, BSV Association and API3. Track details are on the Prizes page.",
        status: "confirmed",
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
          "Anyone interested in building in the blockchain and AI space is welcome. Whether you are a developer, designer, product manager or simply curious, we encourage you to apply.",
        status: "partial-tbd",
      },
      {
        question: "Do I have to be a TUM student?",
        answer:
          "No, you do not need to be a TUM student. Everyone from all around the world is welcome to TUM Blockchain Hackathon.",
        status: "tbd",
      },
      {
        question: "What happens after I apply?",
        answer:
          "If we select you, you get an email from hackathon@tum-blockchain.com with a personal Luma link and a personal single-use code. You use them to pay your deposit on Luma. Once your deposit is paid, we accept you on Devfolio.",
        status: "confirmed",
      },
      {
        question: "How much does it cost?",
        answer:
          "You pay a €50 refundable deposit on Luma to confirm your place. You get the full €50 back after the event if you meet the refund conditions.",
        status: "confirmed",
      },
      {
        question: "When do I have to pay the deposit?",
        answer:
          "Within five days of your selection email. The deadline is in the email and cannot be extended. If you don't pay in time, your place goes to someone on the waitlist.",
        status: "confirmed",
      },
      {
        question: "Does every team member pay the deposit?",
        answer:
          "Yes. Every team member pays the deposit individually. Check that your teammates are listed on the hacker dashboard.",
        status: "confirmed",
      },
      {
        question: "How do I get my deposit back?",
        answer:
          "Do all three, in person, at House of Communication. Thursday 29 October: check in and attend the TUM Blockchain Conference. Friday 30 October: check in separately at the hackathon. Saturday 31 October: submit your project on Devfolio before 15:00. The project must enter at least one partner track: Cardano, BSV Association or API3. You then get the full €50 back after the event.",
        status: "confirmed",
      },
      {
        question: "When is the deposit not refunded?",
        answer:
          "If you miss a check-in, take part remotely, do not submit a project, or submit a project that is not in a partner track.",
        status: "confirmed",
      },
      {
        question: "Can I give my place to someone else?",
        answer: "No. Your acceptance is personal and cannot be transferred.",
        status: "confirmed",
      },
      {
        question: "I already bought a student ticket. Can I use it?",
        answer:
          'No. Hackers can only take part with the dedicated hacker ticket. If you already bought a student ticket, request a refund for it. The "Refund a student ticket" guide at the top of this page shows how.',
        status: "confirmed",
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
          "Apply on Devfolio at https://tum.devfolio.co. Every team member applies individually. If we select you, you get an email with the next steps. You are accepted on Devfolio once your deposit is paid.",
        status: "confirmed",
      },
      {
        question: "How and where do I submit my project?",
        answer:
          "On Devfolio, before the deadline on 31 October at 15:00. To get your deposit back, your project must enter at least one partner track: Cardano, BSV Association or API3.",
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
      {
        question: "Who do I contact with questions?",
        answer: "Email hackathon@tum-blockchain.com.",
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
        answer:
          "€12,000 in cash prizes across the Cardano, BSV Association and API3 tracks, plus €16,000 in audit credits. Details are on the Prizes page.",
        status: "confirmed",
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
