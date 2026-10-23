import { siteConfig } from "@/content/site";

/**
 * Inline rich-text run for step copy: plain text, a bold phrase, a Luma UI
 * label (rendered as a chip), or an external link.
 */
export type RefundTextPart =
  | string
  | { strong: string }
  | { ui: string }
  | { link: string; href: string };

export type RefundStep = {
  title: string;
  body: RefundTextPart[];
  image: { src: string; width: number; height: number; alt: string };
  /** Dialog screenshots are small; keep them at their native width. */
  narrow?: boolean;
  caption?: string;
  callout?: RefundTextPart[];
};

/**
 * Hidden page linked from hacker acceptance emails (not in the nav). Walks
 * accepted hackers through refunding a Student Ticket they bought on Luma.
 */
export const ticketRefundContent = {
  path: "/ticket-refund",
  eyebrow: "Accepted hackers",
  title: "Refund your student ticket",
  description:
    "Hackers get into House of Communication only with a hacker ticket. If you already bought a Student Ticket on Luma, request a refund, cancel it, and register again with your hacker voucher. It takes about three minutes.",
  lumaUrl: "https://luma.com",
  eventUrl: "https://luma.com/tbc26",
  message: "I am a hacker, and I want a refund for my student ticket.",
  messageLabel: "The message you'll paste twice",
  messageHint:
    "You'll send it once to the host (step 3) and add it as a note when you cancel (step 6).",
  footnote:
    "Screenshots taken on the Luma desktop site, October 2026. TUM Blockchain Club e.V., Munich.",
};

export const ticketRefundPrep: RefundTextPart[][] = [
  [
    "Sign in to ",
    { link: "luma.com", href: ticketRefundContent.lumaUrl },
    " with the ",
    { strong: "same email you used to buy the Student Ticket" },
    ".",
  ],
  [
    "Use a laptop if you can. On a phone the page is stacked into one column, but the buttons have the same names.",
  ],
];

export const ticketRefundSteps: RefundStep[] = [
  {
    title: "Open the TBC26 event on Luma",
    body: [
      "Go to ",
      { link: "luma.com/tbc26", href: ticketRefundContent.eventUrl },
      ". In the box on the right you should see ",
      { ui: "You're In" },
      " and ",
      { ui: "Ticket: Student Ticket" },
      ". If you don't see a Student Ticket there, you have nothing to refund and can skip this guide.",
    ],
    image: {
      src: "/ticket-refund/01-event-ticket.jpg",
      width: 888,
      height: 560,
      alt: "Luma event page for TUM Blockchain Conference 26 with the ticket box highlighted, showing You're In and Ticket: Student Ticket.",
    },
  },
  {
    title: 'Click "Contact the Host"',
    body: ["It's in the left column, below ", { strong: "Hosted By" }, "."],
    image: {
      src: "/ticket-refund/02-contact-link.jpg",
      width: 888,
      height: 680,
      alt: "Luma event page with the Contact the Host link highlighted in the left column under Hosted By.",
    },
  },
  {
    title: "Paste the message and send it",
    body: [
      "Paste ",
      { strong: `"${ticketRefundContent.message}"` },
      " into the box, then click ",
      { ui: "Send Message" },
      ". Any reply from us goes to the email on your Luma account.",
    ],
    image: {
      src: "/ticket-refund/03-contact-dialog.jpg",
      width: 460,
      height: 468,
      alt: "Contact the Host dialog with the refund message typed in and the Send Message button highlighted.",
    },
    narrow: true,
    caption:
      "The email address under the box is hidden here. Yours will show your own Luma email.",
  },
  {
    title: 'Click "canceling your registration"',
    body: [
      "Back on the event page, find the line ",
      { strong: "No longer able to attend?" },
      " in the ticket box and click the pink link ",
      { ui: "canceling your registration" },
      ".",
    ],
    image: {
      src: "/ticket-refund/04-cancel-link.jpg",
      width: 888,
      height: 560,
      alt: "Luma ticket box with the canceling your registration link highlighted.",
    },
  },
  {
    title: 'Click "+ Add a personal note"',
    body: [
      "A ",
      { strong: "Cancel Registration" },
      " window opens. Click ",
      { ui: "+ Add a personal note" },
      " to open a text box.",
    ],
    image: {
      src: "/ticket-refund/05-cancel-dialog.jpg",
      width: 460,
      height: 418,
      alt: "Cancel Registration dialog with the Add a personal note link highlighted.",
    },
    narrow: true,
    callout: [
      { strong: "Cancelling alone does not refund you." },
      " Luma says this in the window itself. The message you sent in step 3 is what tells us to refund you, so don't skip it.",
    ],
  },
  {
    title: "Paste the message again and click Confirm",
    body: [
      "Paste the same text into the note and click ",
      { ui: "Confirm" },
      ". Your Student Ticket is now cancelled.",
    ],
    image: {
      src: "/ticket-refund/06-cancel-note.jpg",
      width: 460,
      height: 493,
      alt: "Cancel Registration dialog with the refund message in the note field and the Confirm button highlighted.",
    },
    narrow: true,
  },
  {
    title: 'Open your voucher link and click "register again"',
    body: [
      "The ticket box now says ",
      { ui: "You're Not Going" },
      ". Open your ",
      { strong: "personal Luma link" },
      " from the email we sent with your link and code, click ",
      { ui: "register again" },
      " in the ticket box, then pick the hacker ticket and enter your personal code to pay the €50 deposit.",
    ],
    image: {
      src: "/ticket-refund/07-register-again.jpg",
      width: 1194,
      height: 444,
      alt: "Luma ticket box after cancelling, showing You're Not Going and the register again link.",
    },
    callout: [
      { strong: "The voucher link won't open the ticket selection by itself." },
      " Because you cancelled a registration, you have to click register again first. Only then can you choose the hacker ticket.",
    ],
  },
];

export const ticketRefundNextSteps: RefundTextPart[][] = [
  [
    "We issue the refund from our side. Luma emails you when it's done, and the money goes back to the card or account you paid with. How long it takes to show up depends on your bank.",
  ],
  [
    "Pay your ",
    { strong: "€50 hacker deposit" },
    " in step 7 before the deadline in the email with your personal link. If you don't, your place goes to someone on the waitlist.",
  ],
  [
    "Questions? Reply to your acceptance email or write to ",
    {
      link: siteConfig.contactEmail,
      href: `mailto:${siteConfig.contactEmail}`,
    },
    ".",
  ],
];
