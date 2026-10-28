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
    label: "Track resources",
    href: "/prizes",
    primary: false,
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
          "An in-person blockchain and AI hackathon in Munich, run by TUM Blockchain Club as part of TUM Blockchain Conference + Hackathon 26.",
        status: "confirmed",
      },
      {
        question: "When and where is it?",
        answer:
          "30-31 October 2026 at the House of Communication, Munich. Doors open Friday at 08:00, hacking starts at 09:00, and submissions close on 31 October at 15:00. The conference is the day before, Thursday 29 October.",
        status: "confirmed",
      },
      {
        question: "Is it in person or online?",
        answer: "Fully in person, in Munich. There is no remote participation.",
        status: "confirmed",
      },
      {
        question: "What is the theme?",
        answer:
          "Blockchain and AI, with a focus on agentic payments. The partner tracks are BSV Association, Cardano and API3, all detailed on the Prizes page.",
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
          "Anyone who wants to build with blockchain and AI: developers, designers, product people. You don't need to be a TUM student.",
        status: "confirmed",
      },
      {
        question: "Who cannot compete?",
        answer:
          "TUM Blockchain Club members and employees of partner companies cannot compete for prizes.",
        status: "confirmed",
      },
      {
        question: "What happens after I apply?",
        answer:
          "If you're selected, you get an email from hackathon@tum-blockchain.com with a personal Luma link and code to pay your deposit. Once it's paid, we accept you on Devfolio.",
        status: "confirmed",
      },
      {
        question: "How much does it cost?",
        answer:
          "Nothing, apart from a €50 refundable deposit on Luma that confirms your place.",
        status: "confirmed",
      },
      {
        question: "When do I have to pay the deposit?",
        answer:
          "Within five days of your selection email. The deadline can't be extended; unpaid places go to the waitlist.",
        status: "confirmed",
      },
      {
        question: "Does every team member pay the deposit?",
        answer: "Yes, every team member pays individually.",
        status: "confirmed",
      },
      {
        question: "How do I get my deposit back?",
        answer:
          "Check in at the conference on Thursday 29 October, check in at the hackathon on Friday 30 October, and submit a project in at least one partner track before Saturday 15:00. You then get the full €50 back after the event.",
        status: "confirmed",
      },
      {
        question: "When is the deposit not refunded?",
        answer:
          "If you miss a check-in, don't submit a project, or your project isn't in a partner track.",
        status: "confirmed",
      },
      {
        question: "Can I give my place to someone else?",
        answer: "No. Your place is personal and can't be transferred.",
        status: "confirmed",
      },
      {
        question: "I already bought a student ticket. Can I use it?",
        answer:
          'No, hackers need the hacker ticket. Refund your student ticket using the "Refund a student ticket" guide at the top of this page.',
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
        answer: "Yes, solo hackers are welcome. Teams can have up to 5 people.",
        status: "confirmed",
      },
      {
        question: "How do I find teammates?",
        answer:
          "In the hackathon Telegram group (Join the Telegram, at the top of this page), or at the venue on Friday morning before hacking starts.",
        status: "confirmed",
      },
      {
        question: "Do I need prior experience?",
        answer:
          "Some programming experience helps. Partner workshops and mentors help you get started with each track.",
        status: "confirmed",
      },
      {
        question: "Can I start building before the event?",
        answer:
          "No. Build during the hackathon. An existing project only counts if you extend it meaningfully during the event.",
        status: "confirmed",
      },
      {
        question: "Can I use open-source libraries or starter templates?",
        answer:
          "Yes, including the partners' starter kits on the Prizes page. The core build must happen during the hackathon.",
        status: "confirmed",
      },
      {
        question: "Can I use AI coding tools?",
        answer:
          "Yes, all of them. Several partners offer MCP servers, llms.txt files and agent prompts under their track on the Prizes page.",
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
          "Apply individually on Devfolio at tum.devfolio.co. If you're selected, we email you the next steps.",
        status: "confirmed",
      },
      {
        question: "How and where do I submit my project?",
        answer:
          "On Devfolio, by Saturday 31 October at 15:00. One submission per team, in up to three partner tracks. The step-by-step guide is under How to submit on the Prizes page.",
        status: "confirmed",
      },
      {
        question: "What do I need to submit?",
        answer:
          "A demo video of at most 2.5 minutes, a project description, and a public repository with a README. Each track adds its own items, listed on the Prizes page.",
        status: "confirmed",
      },
      {
        question: "Can I keep working after the deadline?",
        answer: "No. Only what you submit by 15:00 is judged.",
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
        question: "What are the prizes?",
        answer:
          "€12,000 across the partner tracks (Cardano €6,000, BSV Association €4,000, API3 €2,000), plus $16,000 in Adevar Labs audit credits in the TUM Blockchain Track.",
        status: "confirmed",
      },
      {
        question: "Can one project enter more than one track?",
        answer:
          "Yes, up to three partner tracks. Every project is also judged for the TUM Blockchain Track automatically.",
        status: "confirmed",
      },
      {
        question: "How are projects judged?",
        answer:
          "Live, on Saturday from 15:00 to 17:00. Each partner judges its own track; present to the judges of every track you entered. Judges and criteria are listed under each track on the Prizes page.",
        status: "confirmed",
      },
      {
        question: "When are winners announced?",
        answer:
          "Saturday at 17:30, at the closing ceremony on the hackathon stage.",
        status: "confirmed",
      },
      {
        question: "How are prizes paid out?",
        answer:
          "Prizes are paid out by TUM Blockchain Club. Details will be announced.",
        status: "partial-tbd",
      },
    ],
  },
  {
    slug: "during-event",
    code: "06",
    title: "During the event",
    items: [
      {
        question: "Will there be workshops?",
        answer:
          "Yes, on Friday in the Workshop Room: Cardano at 10:30, API3 at 11:00 and BSV Association at 11:30, plus a hands-on zk-SNARK workshop with Veronika Bauer (TUM) at 16:00.",
        status: "confirmed",
      },
      {
        question: "Will there be mentors, and how do I get help?",
        answer:
          "Yes. Partner teams support their tracks on-site and online; each track's support options are on the Prizes page. For anything else, ask in the Telegram group.",
        status: "confirmed",
      },
      {
        question: "Is food provided?",
        answer:
          "Yes. Lunch and dinner on Friday, breakfast and lunch on Saturday, sponsored by BSV Association and Cardano. Times are on the Schedule page.",
        status: "confirmed",
      },
      {
        question: "Can I build overnight?",
        answer:
          "Yes. The venue stays open through Friday night until the deadline on Saturday.",
        status: "confirmed",
      },
      {
        question: "Will there be WiFi and power?",
        answer: "Yes, both are provided at the venue.",
        status: "confirmed",
      },
      {
        question: "What should I bring?",
        answer:
          "Your laptop, charger and a valid ID; IDs are checked at the entrance. If you plan to stay overnight, bring a sleeping bag.",
        status: "confirmed",
      },
      {
        question: "Is there accommodation?",
        answer:
          "Only on the night of 30 to 31 October, at the venue. Bring your own sleeping bag and mat if you want to sleep there.",
        status: "confirmed",
      },
      {
        question: "Who do I contact with questions?",
        answer:
          "Email hackathon@tum-blockchain.com or ask in the hackathon Telegram group.",
        status: "confirmed",
      },
    ],
  },
];
