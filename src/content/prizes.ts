import { siteConfig } from "@/content/site";
import { agentContexts } from "@/content/agent-contexts";
import { buildTrackContext } from "@/lib/track-context";
import type { PrizeTrack, SubmissionGuide, TrackLink } from "@/types/content";

const submissionGuide: SubmissionGuide = {
  slug: "how-to-submit",
  title: "How to submit",
  label: "Deadline: Sat 31 Oct, 15:00",
  lockedLabel: "Opens Fri 30 Oct, 09:00",
  deadline: "Saturday 31 October, 15:00",
  deadlineIso: "2026-10-31T15:00:00+01:00",
  hackingStartsIso: "2026-10-30T09:00:00+01:00",
  intro:
    "Every project is submitted on Devfolio. One submission per team, entered into up to three partner tracks. Every project is also judged for the TUM Blockchain Track automatically.",
  steps: [
    {
      title: "Create your project on Devfolio",
      body: "Open tum.devfolio.co, start a project and add every teammate to it. Create it early on Saturday and keep editing it, instead of starting at 14:55.",
    },
    {
      title: "Pick up to three partner tracks",
      body: "Select the partner tracks you are building for: BSV Association, Cardano or API3, up to three. You don't select the TUM Blockchain Track; every project is judged for it.",
    },
    {
      title: "Add everything the judges need",
      body: "A demo video of at most 2.5 minutes, a detailed project description, a link to your public repository, and the extra items for each track you entered (listed below).",
    },
    {
      title: "Submit before 15:00",
      body: "You can edit your submission until the deadline. Only what is submitted by Saturday 31 October, 15:00 is judged.",
    },
  ],
  requirements: [
    "A demo video of at most 2.5 minutes.",
    "A detailed project description on Devfolio: the problem, what you built and how it works.",
    "A link to your repository, with a README on how to set it up and run it. Make the repository public before the deadline.",
  ],
  judging: [
    {
      time: "15:00",
      title: "Submissions close",
      body: "Devfolio stops accepting projects. Get your demo ready.",
    },
    {
      time: "15:00–17:00",
      title: "Live judging",
      body: "Each partner judges its own track for two hours. Present your project to the judges of every track you entered. TUM Blockchain Club judges every project for the TUM Blockchain Track.",
    },
    {
      time: "17:30",
      title: "Winners announced",
      body: "The winning teams are announced on stage at the closing ceremony.",
    },
  ],
  help: [
    {
      label: "Submit on Devfolio",
      href: siteConfig.applicationUrl,
    },
    {
      label: siteConfig.contactEmail,
      href: `mailto:${siteConfig.contactEmail}`,
    },
    {
      label: "Hackathon Telegram group",
      href: siteConfig.telegramUrl,
    },
  ],
};

export const prizeContent = {
  trackLimitLabel: "Choose up to 3 tracks",
  title: "Prize Tracks",
  description:
    "A €12,000+ prize pool across the BSV Association, Cardano and API3 partner tracks, plus $16,000 in Adevar Labs audit credits in the TUM Blockchain Track. Enter up to three partner tracks; every project is also judged for the TUM Blockchain Track.",
  fallback: "Prize tracks announced soon.",
  trackAmountFallback: "Prize amount announced soon.",
  trackDescriptionFallback: "Track brief announced soon.",
  trackIdeasFallback: "Example ideas announced soon.",
  trackRequirementsFallback: "Track-specific requirements announced soon.",
  partnerPrizesFallback: "Prize split announced soon.",
  mainPoolDescription:
    "The total prize pool is split across our partner tracks, plus platform security audit credits.",
  mainPoolAmount: "€12,000+",
  mainPoolSubhead: "Available in prizes",
  mainPoolNote: undefined,
  comingSoonLabel: "Track details coming soon",
  defaultRequirements: submissionGuide.requirements,
  submission: submissionGuide,
};

const tracks: PrizeTrack[] = [
  {
    slug: "bsv-association",
    sponsor: "BSV Association",
    trackName: "DeFi Rails for Agentic Payments",
    tagline:
      "Build the DeFi layer on BSV Blockchain, then show an AI agent paying with it.",
    sponsorLogoSrc: "/sponsors/bsv_association_stacked.png",
    sponsorLogoPadding: "p-1",
    sponsorMarkSrc: "/sponsors/bsv_icon.png",
    sponsorHref: "https://bsvassociation.org/",
    about:
      "BSV Association is a non-profit organisation based in Zug, Switzerland, and the global advocate for the BSV Blockchain. The BSV Blockchain is a scalable public blockchain built for high transaction volumes at very low cost, which makes it well suited to micropayments and data-integrity applications.",
    rightMark: "BSV",
    amount: "€4,000",
    status: "confirmed",
    description:
      "AI agents are starting to buy services, call APIs and pay for data on their own. To do this at scale, every agent needs identity, micropayments and traceability at once, and BSV Blockchain's very low fees make pay-per-use micropayments viable at the volume agents generate.\n\nWhat agents still lack is the financial layer: stable value to pay with, liquidity, and ways to swap and move funds between chains. Build that DeFi layer on BSV Blockchain, then show an AI agent using it to make a real payment. The DeFi product is the core of your project; the agent can be simple, for example one that swaps into the right token and pays for an API call.",
    ideas: [
      "Agent token swap: build a wallet-connected swap between demo assets on BSV. Show an AI agent using your project to make a payment.",
      "Service launchpad: prototype a funding flow for an agent-powered service using bridged stablecoins. Show the contribution and an agent payment. Confirm asset availability with BSV before choosing this route.",
      "Cross-chain funding (advanced): bring assets into a BSV wallet through a non-custodial flow, then demonstrate an AI agent payment. A bridge from scratch is a large scope for this event.",
    ],
    quickStart: [
      "Start with the ts-stack documentation and its SDK and wallet packages. Use the versions and wallet setup documented there.",
      "Download the BSV developer pack and open START-HERE.md first. Ask the BSV support contact for test funds.",
      "Connect a supported BSV wallet. Build one small DeFi flow and show an AI agent making a real BSV payment through it. Keep user funds non-custodial.",
    ],
    prizes: [
      { place: "1st", title: "1st place", amount: "€2,500" },
      { place: "2nd", title: "2nd place", amount: "€1,000" },
      { place: "3rd", title: "3rd place", amount: "€500" },
    ],
    requirements: [
      "Build on BSV Blockchain with BSV Association's open-source TypeScript stack: the BSV SDK and, where wallet functionality is needed, the Wallet Toolbox (both in ts-stack).",
      "Connect user-facing flows to a standard BSV wallet such as BSV Desktop or BSV Browser.",
      "Make real transactions on BSV Blockchain (testnet or mainnet).",
      "Keep user funds non-custodial wherever funds are involved: no single party holds users' assets.",
      "Include at least one AI agent that uses your project to make a payment. A simple agent is enough.",
    ],
    submission: [
      "Links to example transactions on WhatsOnChain.",
      "In the demo video: the project working end to end, including the agent payment.",
      "In the description: the problem, the target users, how people would use it and what it brings to BSV Blockchain.",
    ],
    judgingGuidance:
      "Build a useful DeFi product that gives people and agents a reason to use BSV. Show clear adoption potential and explain how it brings users or liquidity to the network. Judges look at your use of the BSV stack, technical execution, non-custodial design, a real agent payment, originality, and a clear demo.",
    resources: [
      {
        title: "Start here",
        links: [
          {
            label: "BSV developer pack",
            href: "https://drive.google.com/drive/folders/179lAsiQEiV1Fpf9SY8b0y4456-3QfxfG?usp=sharing",
            note: "Open START-HERE.md first. Includes the complete stack guide, AGENTS.md for AI assistants, and a starter kit with 38 tests.",
          },
          {
            label: "ts-stack documentation",
            href: "https://bsv-blockchain.github.io/ts-stack/",
          },
          {
            label: "ts-stack on GitHub",
            href: "https://github.com/bsv-blockchain/ts-stack",
          },
        ],
      },
      {
        title: "Wallets",
        links: [
          {
            label: "BSV Desktop (macOS, Windows, Linux)",
            href: "https://desktop.bsvb.tech",
          },
          {
            label: "BSV Browser (iOS, Android)",
            href: "https://mobile.bsvb.tech",
          },
        ],
      },
      {
        title: "Build and broadcast",
        links: [
          {
            label: "Arcade transaction broadcaster",
            href: "https://arcade-v2-us-1.bsvblockchain.tech",
          },
          {
            label: "BRC standards",
            href: "https://github.com/bsv-blockchain/BRCs",
          },
          {
            label: "BSV-21 token spec",
            href: "https://docs.1satordinals.com/fungible-tokens/bsv-21",
          },
        ],
      },
      {
        title: "Explorers",
        links: [
          {
            label: "WhatsOnChain",
            href: "https://whatsonchain.com",
          },
          {
            label: "BananaBlocks token explorer",
            href: "https://bananablocks.com/tokens",
          },
        ],
      },
      {
        title: "AI tooling",
        links: [
          {
            label: "bOpen agent plugins (community)",
            href: "https://bopen.ai/agents",
          },
        ],
      },
    ],
    workshop: {
      title: "BSV Association Workshop",
      when: "Fri 30 Oct, 11:30–12:00",
      speaker: "Axel Maisonneuve, Head of DevRel, BSV Association",
    },
    judges: [
      {
        name: "Axel Maisonneuve",
        role: "Head of DevRel, BSV Association",
        imageSrc: "/speakers/axel_maisonneuve.jpg",
      },
    ],
    support: [
      { label: "DM Axel on Telegram", href: "https://t.me/lexamaison" },
    ],
  },
  {
    slug: "cardano",
    sponsor: "Cardano",
    trackName: "Agentic Commerce on Cardano",
    tagline:
      "Build an agent, service or developer tool that does a useful job and gets paid for it on Cardano.",
    sponsorLogoSrc: "/sponsors/cardano_icon.svg",
    sponsorLogoPadding: "p-2.5",
    sponsorMarkSrc: "/sponsors/cardano_icon.svg",
    sponsorHref: "https://cardano.org/",
    about:
      "Cardano is a decentralized proof-of-stake blockchain platform built through peer-reviewed research, with an extended UTXO model whose results and fees can be checked in advance. Masumi, built on top, is a payment network for AI agents with escrow, on-chain identity and a public registry, and Sokosumi is its agent marketplace.",
    rightMark: "ADA",
    amount: "€6,000",
    status: "confirmed",
    description:
      "AI agents already do real work. What they still lack is standard and secure ways to get hired, paid and trusted, by people and by other agents. In this track, you build an agent, service or developer tool that does a useful job and gets paid for it using Cardano.\n\nWhat does the work? Not every agent needs AI inside. If the job needs writing or judgement, such as a research report, your agent calls a language model. If the job is a fixed set of steps, such as placing an order through a shop's API, fetching prices from a data service or running a calculation, regular software can do it without a model. Many projects mix both.\n\nHow does it get paid? Per job, with Masumi on Sokosumi: your agent becomes a Coworker that people hire for tasks on Sokosumi, the agent marketplace built on the open Masumi standard. The buyer's payment waits in escrow on Cardano until your agent delivers, and the buyer is refunded if it doesn't. Or per request, with x402: every call to your API or agent is paid on the spot through HTTP's 402 \"Payment Required\" status code, with no accounts or API keys. x402 is the quicker way to a first payment. Any combination works, and one project can use both.\n\nYou don't need to be a blockchain developer: x402 handles the payment, and Masumi adds agent identity and escrow, so you can focus on what your agent does. You can build an agent that writes market research per task, one that buys items online and returns the order ID, a model that charges per answer, a data API that charges per call, an agent that pays for the services it uses, or tools that make agent payments on Cardano easier, safer or more private. Whatever you build, show at least one payment going through it on Cardano preprod.",
    ideas: [
      "Paid research task: a shop owner hires your agent for a short research report through Masumi on Sokosumi. Show the completed result and preprod payment transaction.",
      "Paid data API: your service returns a useful response after an x402 payment on Cardano preprod. Show the request, the response, and the payment transaction.",
      "Agent team: a lead agent hires a specialist to improve a product listing. Show one paid job and its result before adding more agents.",
    ],
    quickStart: [
      "Choose a paid job with Masumi on Sokosumi, or a paid request with x402. Use the corresponding official guide and starter below.",
      "Follow the starter prerequisites for Node.js, accounts, model access if needed, and Cardano preprod test funds. Use preprod for the qualifying payment.",
      "Complete one paid job or request. Save its transaction hash, show the result, and describe setup steps and limits in the README.",
    ],
    prizes: [
      { place: "1st", title: "1st place", amount: "€3,000" },
      { place: "2nd", title: "2nd place", amount: "€2,000" },
      { place: "3rd", title: "3rd place", amount: "€1,000" },
    ],
    requirements: [
      "A working agent or service that completes at least one paid job or payment on Cardano preprod: per job through Masumi, or per request through x402.",
    ],
    submission: [
      "The transaction hash of a paid job or paid request on Cardano preprod.",
      "In the demo video: who the project is for, the problem, the business case and one paid job or request from start to finish.",
      "In the description: how it works, the Cardano tools used and how it could run in real use.",
    ],
    judgingGuidance:
      "Show an original use case and a paid workflow that works from start to finish. Judges look at technical execution with Cardano tools, creativity, user experience, and a clear pitch and demo. Explain the real-world impact and how the project can work beyond the hackathon. Cardano especially wants to see a clear customer, their journey and an agent job they would pay for; payment tied to the result, such as escrow, refunds or paying only for work that passed a check; agents that hire other agents or act in the real world by buying, publishing or booking; and a live demo of a paid task with its transaction on a preprod explorer.",
    resources: [
      {
        title: "Start here",
        links: [
          {
            label: "Masumi hackathon guide",
            href: "https://www.masumi.network/tum-hackathon",
            note: "Step-by-step setup, the full agent brief and the demo checklist.",
          },
          {
            label: "Masumi starter template",
            href: "https://github.com/masumi-network/tum-hackathon-quickstart",
          },
          {
            label: "x402 on Cardano",
            href: "https://developers.cardano.org/x402/",
          },
        ],
      },
      {
        title: "Paid per job: Masumi",
        links: [
          {
            label: "Sokosumi preprod sign-up",
            href: "https://preprod.sokosumi.com/signup",
          },
          {
            label: "Masumi dispenser: test ADA and tUSDM",
            href: "https://dispenser.masumi.network/",
          },
        ],
      },
      {
        title: "Paid per request: x402",
        links: [
          {
            label: "x402-express template",
            href: "https://developers.cardano.org/templates/x402-express/",
          },
          {
            label: "x402-next template",
            href: "https://developers.cardano.org/templates/x402-next/",
          },
          {
            label: "Cardano testnet faucet",
            href: "https://docs.cardano.org/cardano-testnets/tools/faucet",
          },
        ],
      },
      {
        title: "Shared tools",
        links: [
          {
            label: "Blockfrost preprod key (free)",
            href: "https://blockfrost.io",
          },
          {
            label: "End-to-end x402 demo with a Masumi agent",
            href: "https://github.com/cardano-foundation/x402-cardano-demo",
          },
        ],
      },
      {
        title: "AI tooling",
        links: [
          {
            label: "Masumi hackathon skill (SKILL.md)",
            href: "https://www.masumi.network/tum-hackathon/skill/SKILL.md",
          },
          {
            label: "Masumi skills",
            href: "https://www.masumi.network/dev/masumi/documentation/integrations/masumi-skills",
          },
          {
            label: "Sokosumi MCP server setup",
            href: "https://www.masumi.network/dev/sokosumi/mcp",
          },
          {
            label: "Cardano Developer Plugin",
            href: "https://github.com/cardano-foundation/cardano-dev-skills",
          },
        ],
      },
    ],
    workshop: {
      title: "Agentic Commerce on Cardano: get your agent hired and paid",
      when: "Fri 30 Oct, 10:30–11:00",
      speaker: "Bora Oben, Developer Community Advocate, Cardano",
      description:
        "How agents get hired and paid on Cardano, per job with Masumi escrow on Sokosumi or per request with x402, plus build ideas, judging, and where to find starters, guides and help.",
    },
    judges: [
      {
        name: "Bora Oben",
        role: "Developer Community Advocate, Cardano",
      },
      {
        name: "Vladislav Kudrin",
        role: "Web3 Solutions Architect, Cardano Foundation",
        imageSrc: "/speakers/vladislav_kudrin.jpg",
      },
    ],
    support: [
      {
        label: "1:1 sessions with a Masumi engineer",
        href: "https://calendly.com/sandro-schaier/hackathon",
      },
    ],
  },
  {
    slug: "api3",
    sponsor: "API3",
    trackName: "Any API in your contract",
    tagline: "Real-world data. Checked by your contract.",
    sponsorLogoSrc: "/sponsors/api3_logo.svg",
    sponsorLogoPadding: "p-2.5",
    sponsorMarkSrc: "/sponsors/api3_icon.svg",
    sponsorHref: "https://api3.org/",
    about:
      "API3 builds oracle infrastructure that connects smart contracts to external data, for developers and protocols whose applications depend on information from outside the blockchain. AirnodeHub helps developers and AI agents discover APIs and obtain signed responses that their contracts can authenticate before acting.",
    rightMark: "API3",
    amount: "€2,000",
    status: "confirmed",
    description:
      'Build an app or agent whose core on-chain functionality depends on authenticated AirnodeHub data. A user, keeper or agent brings the response on-chain; the contract verifies the expected signer, the intended request and freshness before using the data to make a meaningful decision or state change. A single API call added to an otherwise unrelated project is not enough.\n\nStart with the integrations marked "Recommended for the hackathon" in the integrations guide. A signature authenticates the Airnode\'s response and detects changes; it does not independently prove the underlying real-world claim is true.',
    ideas: [
      "Signed-price guard: use the starter's ETH/USD response to permit or block a demo on-chain action. Show the accepted action and the required rejected responses.",
      "Conditional payment: release test funds only when verified AirnodeHub data meets a condition. Choose an operation recommended for the hackathon before defining your demo.",
      "Protocol safeguard: update a demo contract state when a signed value crosses a threshold. Show why modified, stale, wrong-request, and wrong-signer responses cannot trigger it.",
    ],
    quickStart: [
      "Check the recommended integrations and the official starter. Its signed ETH/USD response provides a concrete first integration.",
      "Follow the starter prerequisites for Foundry, Node.js and pnpm. Use the event faucet and payment instructions for priced operations.",
      "Deploy a contract that checks the signer, intended request and freshness before acting. Show one valid response and all four required tamper-test failures.",
    ],
    prizes: [
      { place: "1st", title: "1st place", amount: "€1,000" },
      { place: "2nd", title: "2nd place", amount: "€600" },
      { place: "3rd", title: "3rd place", amount: "€400" },
    ],
    requirements: [
      "Use an AirnodeHub integration as an essential part of a core feature or workflow. Removing it must materially impair the application.",
      "Submit a signed response to a deployed contract that verifies the expected signer, the intended request and the relevant timing conditions. A testnet deployment is enough.",
      "Use a value bound to the exact signed response to drive a meaningful on-chain action or state change, with protection against duplicate execution where needed.",
    ],
    submission: [
      "The deployed contract address and network.",
      "A way for judges to submit their own responses, through the app or a documented script, so they can run the tamper test.",
      "In the demo video: the tamper test (pass/fail). First a valid, timely response that triggers the intended on-chain action, then four responses rejected before that action: a real response with one value edited, a real response that is too old, a real response to a different request, and a response signed by a key that is not the expected Airnode's.",
      "In the description: who relies on the data, what goes wrong if it is forged, and what data you wanted but could not find on AirnodeHub.",
    ],
    judgingGuidance:
      "Show a real use case where authenticated data matters to the core workflow. Judges look at execution and originality. The tamper test is a pass/fail qualification requirement. An autonomous agent adds value when it selects data, pays through x402 when required, and acts on-chain over repeated cycles. Payment alone or one-off MCP discovery does not demonstrate that workflow.",
    resources: [
      {
        title: "Start here",
        links: [
          {
            label: "Starter template",
            href: "https://github.com/api3dao/airnodehub-hackathon-starter",
            note: "A Nodary ETH/USD signed-response consumer and logger, a client and verification tests.",
          },
          {
            label: "Challenge and onboarding",
            href: "https://api3dao.github.io/airnodehub-hackathon/",
          },
          {
            label: "Hackathon documentation",
            href: "https://api3dao.github.io/airnodehub-hackathon/docs/",
          },
          {
            label: "Recommended integrations",
            href: "https://api3dao.github.io/airnodehub-hackathon/docs/integrations",
          },
        ],
      },
      {
        title: "Guides and docs",
        links: [
          {
            label: "From API to contract",
            href: "https://api3dao.github.io/airnodehub-hackathon/docs/from-api-to-contract",
          },
          {
            label: "Projections",
            href: "https://api3dao.github.io/airnodehub-hackathon/docs/projections",
          },
          {
            label: "AirnodeHub catalogue",
            href: "https://airnodehub.api3.org/",
          },
          {
            label: "Product documentation",
            href: "https://airnodehub-docs.api3.org/",
          },
        ],
      },
      {
        title: "Test funds",
        links: [
          {
            label: "aUSD faucet",
            href: "https://api3dao.github.io/airnodehub-hackathon/faucet/",
          },
          {
            label: "Testnet USDC (Circle faucet)",
            href: "https://faucet.circle.com",
          },
        ],
      },
      {
        title: "AI tooling",
        links: [
          {
            label: "AirnodeHub MCP server setup",
            href: "https://airnodehub-docs.api3.org/api-consumers/mcp",
          },
        ],
      },
    ],
    workshop: {
      title: "Building with AirnodeHub",
      when: "Fri 30 Oct, 11:00–11:30",
      speaker: "Ugur Schenk, Strategy Lead, API3",
      description:
        "An introduction to API3 and AirnodeHub, how apps and agents use authenticated external data, and the track's challenge, submission requirements, judging and prizes.",
    },
    judges: [
      {
        name: "Matej Falat",
        role: "Software Engineer, API3",
        imageSrc: "/speakers/matej_falat.jpg",
      },
      {
        name: "Ugur Schenk",
        role: "Strategy Lead, API3",
        imageSrc: "/speakers/ugur_schenk.jpg",
      },
    ],
  },
  {
    slug: "tum-blockchain-club",
    sponsor: "TUM Blockchain Club",
    trackName: "TUM Blockchain Track",
    tagline: "Every project is judged for this track automatically.",
    sponsorLogoSrc: "/sponsors/tbc_icon.png",
    sponsorLogoPadding: "p-2",
    sponsorMarkSrc: "/sponsors/tbc_icon.png",
    sponsorHref: "https://tum-blockchain.com/",
    about:
      "TUM Blockchain Club is the largest student-led blockchain club in Germany and an officially accredited student club at the Technical University of Munich. It organises the TUM Blockchain Conference and this hackathon, and its judges review every submitted project for the TUM Blockchain Track.",
    rightMark: "TBC",
    amount: "$16,000 in audit credits",
    status: "confirmed",
    companies: [
      {
        name: "Adevar Labs",
        role: "Platform Partner",
        logoSrc: "/sponsors/adevar_labs_logo.png",
        markSrc: "/sponsors/adevar_labs_icon.png",
        logoAlt: "Adevar Labs logo",
        href: "https://adevarlabs.com/",
        amount: "$16,000",
        amountNote: "in audit credits",
        description:
          "Smart contract audit and pre-audit packages for the top 3 projects. Credits are valid for one year.",
        prizes: [
          { place: "1st", title: "10K in audit credits", amount: "$10,000" },
          { place: "2nd", title: "Pre-Audit Core", amount: "$4,000" },
          { place: "3rd", title: "Pre-Audit Express", amount: "$2,000" },
        ],
      },
    ],
    selectionCriteria: [
      "Every project submitted on Devfolio is judged automatically. You don't select this track, and it doesn't count toward your three partner tracks.",
      "Judges from TUM Blockchain Club pick the three most serious projects of the hackathon: the ones that most deserve a security audit to keep building.",
      "Adevar Labs distributes its audit credits among these three projects. The credits are valid for one year from the award.",
    ],
    judges: [
      { name: "Benjamin Bosnjak", role: "Member, TUM Blockchain Club" },
      { name: "Zafar Nasimov", role: "Member, TUM Blockchain Club" },
    ],
  },
];

// Every partner track ends its support list the same way: the hackathon
// Telegram group, then the partner mentors at the venue.
const sharedSupport: TrackLink[] = [
  {
    label: "Support on Telegram during hackathon",
    href: siteConfig.telegramUrl,
  },
  { label: "Mentors on site", icon: "person" },
];

// Tracks with resources also get a coding-agent prompt: the partner's own
// text from agent-contexts.ts, or a short generic one built from the track.
export const prizeTracks: PrizeTrack[] = tracks.map((track) => {
  // The pooled TUM Blockchain Track has no partner of its own to contact.
  const pooled = (track.companies ?? []).length > 0;
  const withSupport: PrizeTrack = pooled
    ? track
    : { ...track, support: [...(track.support ?? []), ...sharedSupport] };
  if ((track.resources ?? []).length === 0) return withSupport;
  return {
    ...withSupport,
    agentContext: agentContexts[track.slug] ?? buildTrackContext(withSupport),
  };
});
