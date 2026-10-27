import { siteConfig } from "@/content/site";
import type { PrizeTrack, SubmissionGuide } from "@/types/content";

const submissionGuide: SubmissionGuide = {
  slug: "how-to-submit",
  title: "How to submit",
  label: "Deadline: Sat 31 Oct, 15:00",
  deadline: "Saturday 31 October, 15:00 CET",
  deadlineIso: "2026-10-31T15:00:00+01:00",
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
      body: "Your public repository, a demo video of at most 2.5 minutes, a README, and the extra items for each track you entered (listed below).",
    },
    {
      title: "Submit before 15:00",
      body: "You can edit your submission until the deadline. Only what is submitted by Saturday 31 October, 15:00 CET is judged.",
    },
  ],
  requirements: [
    "A working demo of your project.",
    "A public source code repository.",
    "A demo video of at most 2.5 minutes.",
    "A README describing what you built and how to run it.",
    "Built during the hackathon. An existing project only qualifies if it is meaningfully extended during the event.",
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
  rules: [
    "Teams of 1 to 5 people. Solo projects are welcome.",
    "Enter up to three partner tracks. Every project is also judged for the TUM Blockchain Track.",
    "To get your €50 deposit back, your project must enter at least one partner track.",
    "All AI coding tools are allowed.",
    "TUM Blockchain Club members and employees of partner companies cannot compete.",
    "Prizes are paid out directly by TUM Blockchain Club. The payout scheme is announced later.",
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
  title: "Prize Tracks",
  description:
    "A €12,000+ prize pool across the BSV Association, Cardano and API3 partner tracks, plus €16,000 in Adevar Labs audit credits in the TUM Blockchain Track. Enter up to three partner tracks; every project is also judged for the TUM Blockchain Track.",
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

export const prizeTracks: PrizeTrack[] = [
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
    sponsorXHref: "https://x.com/BSVAssociation",
    about:
      "BSV Association is a non-profit organisation based in Zug, Switzerland, and the global advocate for the BSV Blockchain. It supports developers, enterprises and public-sector institutions through technical education, open-source developer tools and real-world use cases. The BSV Blockchain is a scalable public blockchain built for high transaction volumes at very low cost, which makes it well suited to micropayments and data-integrity applications.",
    rightMark: "BSV",
    amount: "€4,000",
    status: "confirmed",
    description:
      "AI agents are starting to buy services, call APIs and pay for data on their own. To do this at scale, every agent needs identity, micropayments and traceability at once, and BSV Blockchain's very low fees make pay-per-use micropayments viable at the volume agents generate.\n\nWhat agents still lack is the financial layer: stable value to pay with, liquidity, and ways to swap and move funds between chains. Build that DeFi layer on BSV Blockchain, then show an AI agent using it to make a real payment. The DeFi product is the core of your project; the agent can be simple, for example one that swaps into the right token and pays for an API call.",
    ideas: [
      "Non-custodial bridges that bring stablecoins such as USDT or USDC onto BSV Blockchain, for example using ICP's chain-key technology.",
      "An order-book DEX or token swap where people and agents trade bridged assets on BSV Blockchain.",
      "A launchpad where projects or agent-powered services raise funds in bridged stablecoins.",
      "Cross-chain flows that bring users and liquidity from other chains into BSV Blockchain applications.",
      "Any other DeFi idea that gives people and agents a real reason to use BSV Blockchain.",
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
      "An open-source repository with a README explaining what the project does and how to run it.",
      "A live demo, or the demo video, showing the project working end to end, including the agent payment.",
      "Links to example transactions on BSV Blockchain, for example on WhatsOnChain.",
      "A short usage and value note (one page or a README section): the problem, the target users, how people would use it, and what it brings to BSV Blockchain.",
    ],
    judgingCriteria: [
      { label: "Adoption potential and real-world usefulness", weight: "35%" },
      {
        label: "Use of the BSV stack (SDK, Wallet Toolbox, BSV wallets)",
        weight: "25%",
      },
      {
        label: "Technical execution, including a sound non-custodial design",
        weight: "20%",
      },
      {
        label: "Agentic payments: the agent uses the project in a real payment",
        weight: "10%",
      },
      { label: "Originality and presentation", weight: "10%" },
    ],
    judgingNote:
      "What BSV Association values most: an app people would actually come to BSV Blockchain for, ideally bringing new users or liquidity from other chains. Working code alone is not enough.",
    resources: [
      {
        title: "Start here",
        links: [
          {
            label: "BSV developer pack",
            pending: true,
            note: "Open START-HERE.md first. Includes the complete stack guide, AGENTS.md for AI assistants, and a starter kit with 38 tests.",
          },
          {
            label: "ts-stack: SDK, Wallet Toolbox, overlays and middleware",
            href: "https://github.com/bsv-blockchain/ts-stack",
          },
          {
            label: "ts-stack documentation",
            href: "https://bsv-blockchain.github.io/ts-stack/",
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
        title: "Infrastructure and standards",
        links: [
          {
            label: "Arcade: broadcasting, transaction status and block headers",
            href: "https://arcade-v2-us-1.bsvblockchain.tech",
            note: "No API key needed.",
          },
          {
            label: "BRC standards",
            href: "https://github.com/bsv-blockchain/BRCs",
          },
          {
            label: "BSV-21 token spec",
            href: "https://docs.1satordinals.com/fungible-tokens/bsv-21",
          },
          { label: "WhatsOnChain explorer", href: "https://whatsonchain.com" },
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
            label: "bOpen plugins for Claude Code: bsv-skills, 1sat, bsv-mcp",
            href: "https://bopen.ai/agents",
            note: "Community tools, not maintained by BSV Association.",
          },
        ],
      },
    ],
    notes: [
      "No API keys needed. BSV Association sends mainnet satoshis to every team: in BSV Desktop go to Payments → Receive → BSV Address, then send the address and your team name to @lexamaison on Telegram.",
      "Building with an AI assistant? Give it AGENTS.md and BSV_STACK_COMPLETE_GUIDE.md from the developer pack. The guide's Appendix A has tested code to copy instead of inventing it.",
      "Never share your recovery phrase or private keys with anyone. A BSV address is public and safe to share.",
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
      {
        label: "@lexamaison on Telegram",
        href: "https://t.me/lexamaison",
        note: "Questions about the stack, the starter kit or the track.",
      },
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
      "Cardano is a proof-of-stake blockchain platform built on peer-reviewed research, with a focus on security, sustainability, and formal methods.",
    rightMark: "ADA",
    amount: "€6,000",
    status: "confirmed",
    description:
      "AI agents already do real work. What they still lack is standard and secure ways to get hired, paid and trusted, by people and by other agents. In this track, you build an agent, service or developer tool that does a useful job and gets paid for it using Cardano.\n\nWhat does the work? Not every agent needs AI inside. If the job needs writing or judgement, such as a research report, your agent calls a language model. If the job is a fixed set of steps, such as placing an order through a shop's API, fetching prices from a data service or running a calculation, regular software can do it without a model. Many projects mix both.\n\nHow does it get paid? Per job, with Masumi on Sokosumi: your agent becomes a Coworker that people hire for tasks on Sokosumi, the agent marketplace built on the open Masumi standard. The buyer's payment waits in escrow on Cardano until your agent delivers, and the buyer is refunded if it doesn't. Or per request, with x402: every call to your API or agent is paid on the spot through HTTP's 402 \"Payment Required\" status code, with no accounts or API keys. x402 is the quicker way to a first payment. Any combination works, and one project can use both.\n\nYou don't need to be a blockchain developer: x402 handles the payment, and Masumi adds agent identity and escrow, so you can focus on what your agent does. You can build an agent that writes market research per task, one that buys items online and returns the order ID, a model that charges per answer, a data API that charges per call, an agent that pays for the services it uses, or tools that make agent payments on Cardano easier, safer or more private. Whatever you build, show at least one payment going through it on Cardano preprod.",
    howToWin: [
      "A clear customer audience, journey and an agent job they would pay for.",
      "Payment tied to the result: escrow, refunds, or paying only for work that passed a check.",
      "Agents that hire other agents.",
      "Agents that act in the real world, such as buying, publishing or booking.",
      "A live demo of a paid task, with the transaction on a preprod explorer.",
    ],
    ideas: [
      "An agent that buys real items online for its buyer. The money waits in Masumi escrow, the agent places the order and writes the order ID on-chain, and the escrow pays out, or refunds the buyer if the purchase fails.",
      "A team of AI agents on Sokosumi that improves an online shop listing: a lead agent hires specialists for keywords, pricing, copy and images, and the shop owner pays through escrow only for work that passed checks.",
      "A check that other agents call before they trade a token, built from market, on-chain and risk data, paid per question with x402 or per task through Masumi.",
      "A gateway that makes any existing API payable by agents: agents buy packs of answers with x402, and only answers that pass a quality check use up the pack.",
      "Private payments for agents: a shared privacy pool that pays x402 sellers and Masumi agents, so the payment can't be traced to the agent's own wallet.",
      "Anything else that advances agentic commerce on Cardano.",
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
      "The transaction hash of that payment.",
      "A public open-source repository with a README on setup, run commands and limits.",
      "A public demo video, within the hackathon's 2.5-minute limit: who the solution is for, the problem, the business case, and a paid business cycle end to end.",
      "A short write-up on Devfolio: the problem, how it works, the Cardano tools used, and how it could run in real use.",
    ],
    judgingCriteria: [
      {
        label:
          "Technical execution and use of Cardano tech (Masumi, Sokosumi or x402)",
        weight: "30%",
      },
      { label: "Innovation and creativity", weight: "20%" },
      { label: "Pitch and demo video", weight: "20%" },
      { label: "User experience and design", weight: "15%" },
      { label: "Impact and feasibility", weight: "15%" },
    ],
    judgingNote:
      "Judges look for an original idea that opens a new use case, a project that works end to end, something a newcomer can use quickly, real-world value beyond the hackathon, and a pitch that makes the problem, the solution and the business case easy to follow.",
    resources: [
      {
        title: "Paid per job: Masumi on Sokosumi",
        links: [
          {
            label: "Masumi TUM guide",
            href: "https://www.masumi.network/tum-hackathon",
            note: "Step-by-step setup, the full agent brief and the demo checklist.",
          },
          {
            label: "Starter template",
            href: "https://github.com/masumi-network/tum-hackathon-quickstart",
          },
          {
            label: "Sokosumi preprod sign-up",
            href: "https://preprod.sokosumi.com/signup",
          },
          {
            label: "Masumi dispenser: test ADA and test stablecoin",
            href: "https://dispenser.masumi.network/",
          },
        ],
      },
      {
        title: "Paid per request: x402",
        links: [
          {
            label: "x402 on Cardano: start here",
            href: "https://developers.cardano.org/x402/",
          },
          {
            label: "x402-express template: a paid API",
            href: "https://developers.cardano.org/templates/x402-express/",
          },
          {
            label: "x402-next template: a full-stack app",
            href: "https://developers.cardano.org/templates/x402-next/",
            note: "Both templates pay through the Cardano Foundation's hosted facilitator on preprod.",
          },
          {
            label: "Cardano testnet faucet: test ADA",
            href: "https://docs.cardano.org/cardano-testnets/tools/faucet",
          },
        ],
      },
      {
        title: "For your coding agents",
        links: [
          {
            label: "Masumi TUM agent guide (agent-guide.md)",
            href: "https://www.masumi.network/tum-hackathon/agent-guide.md",
          },
          {
            label: "Masumi TUM skill (SKILL.md)",
            href: "https://www.masumi.network/tum-hackathon/skill/SKILL.md",
          },
          {
            label: "Masumi skills",
            href: "https://www.masumi.network/dev/masumi/documentation/integrations/masumi-skills",
          },
          {
            label: "Sokosumi MCP server",
            href: "https://www.masumi.network/dev/sokosumi/mcp",
          },
          {
            label: "Cardano Developer Plugin for Claude Code and Codex",
            href: "https://github.com/cardano-foundation/cardano-dev-skills",
          },
        ],
      },
      {
        title: "Everyone",
        links: [
          {
            label: "Blockfrost: free key for Cardano preprod",
            href: "https://blockfrost.io",
            note: "The free plan is enough.",
          },
          {
            label: "End-to-end x402 demo with a Masumi agent",
            href: "https://github.com/cardano-foundation/x402-cardano-demo",
          },
        ],
      },
    ],
    notes: [
      "What you need: a laptop with Node.js 24 and Git, and a free Blockfrost key for Cardano preprod. Paid per job also needs a Sokosumi preprod account. If AI does the work, bring an API key for any language model with an OpenAI-compatible API.",
      "Per job: sign up on Sokosumi preprod and join the TUM Workspace, clone the starter and give the agent its job, run a test task in your own workspace, set up payments (test ADA, Blockfrost key, register your agent), run a paid task and save its transaction hash, then demo it in the TUM Workspace.",
      "Per request: scaffold the x402-express or x402-next template, add your Blockfrost key and get test ADA from the faucet, make a paid request and save its transaction hash, then build your product on top of it.",
      "Everything runs on Cardano preprod, the test network, with free test money: tADA (test ADA) and tUSDM (a test US-dollar stablecoin). Escrow is money locked by a smart contract until the job is done. A transaction hash is a payment's ID, which anyone can look up on a preprod explorer.",
    ],
    workshop: {
      title: "Cardano Workshop",
      when: "Fri 30 Oct, 10:30–11:00",
      speaker: "Bora Oben, Developer Community Advocate, Cardano",
    },
    support: [
      {
        label: "1:1 sessions with a Masumi engineer",
        href: "https://calendly.com/sandro-schaier/hackathon",
        note: "Open to all hackathon participants: discuss ideas and get live support.",
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
    sponsorXHref: "https://x.com/API3DAO",
    about:
      "API3 builds oracle infrastructure that connects smart contracts to external data, for developers and protocols whose applications depend on information from outside the blockchain. AirnodeHub helps developers and AI agents discover APIs and obtain signed responses that their contracts can authenticate before acting.",
    rightMark: "API3",
    amount: "€2,000",
    status: "confirmed",
    description:
      'Build an app or agent whose core on-chain functionality depends on authenticated AirnodeHub data. A user, keeper or agent brings the response on-chain; the contract verifies the expected signer, the intended request and freshness before using the data to make a meaningful decision or state change. A single API call added to an otherwise unrelated project is not enough.\n\nStart with the integrations marked "Recommended for the hackathon" in the integrations guide. A signature authenticates the Airnode\'s response and detects changes; it does not independently prove the underlying real-world claim is true.',
    ideas: [
      "An agent whose actions are constrained by signed market data.",
      "A conditional payment or escrow using authenticated external evidence.",
      "A protocol safeguard triggered by a verified value.",
      "Your own idea: teams are welcome to propose other directions.",
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
      "A public source repository with setup instructions.",
      "The deployed contract address and network, and a working demo.",
      "A way for judges to submit their own responses, through the app or a documented script, so they can run the tamper test.",
      "The tamper test (pass/fail): first a valid, timely response producing the intended on-chain action, then each of these rejected before that action: a real response with one value edited, a real response that is too old, a real response to a different request, and a response signed by a key that is not the expected Airnode's.",
      "Who relies on the data, what goes wrong if it is forged, and what data you wanted but could not find on AirnodeHub.",
    ],
    judgingCriteria: [
      { label: "Real use case", weight: "40 pts" },
      { label: "Signed data matters", weight: "30 pts" },
      { label: "Execution", weight: "20 pts" },
      { label: "Novelty", weight: "10 pts" },
      { label: "Bonus: autonomous agent", weight: "+10 pts" },
    ],
    judgingNote:
      "The tamper test is a pass/fail eligibility requirement. The bonus rewards an agent that runs the core workflow on its own over repeated cycles: selecting data, paying through x402 when required and acting on-chain without a person starting each cycle. Payment alone or one-off MCP discovery does not earn it. Maximum total: 110 points.",
    resources: [
      {
        title: "Start here",
        links: [
          {
            label: "Challenge and onboarding",
            href: "https://api3dao.github.io/airnodehub-hackathon/",
          },
          {
            label: "Starter template",
            href: "https://github.com/api3dao/airnodehub-hackathon-starter",
            note: "A Nodary ETH/USD signed-response consumer and logger, a client and verification tests.",
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
        title: "AI tooling",
        links: [
          {
            label: "MCP server",
            href: "https://airnodehub.api3.org/mcp",
            note: "Use MCP for discovery, then call priced operations directly on the Airnode.",
          },
          {
            label: "Agent discovery file (llms.txt)",
            href: "https://airnodehub.api3.org/llms.txt",
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
    ],
    notes: [
      "Priced operations accept AirnodeHub USD (aUSD) or testnet USDC through x402 on Base Sepolia. Minting aUSD needs Base Sepolia ETH; the x402 facilitator pays the access-transfer gas. Your app's own transactions need their own gas token. No promo code needed.",
      "Check the integrations guide before choosing an API: a catalogue listing alone does not guarantee hackathon availability.",
      "Provider quotas are shared by all teams. Cache responses and avoid unbounded polling.",
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
    support: [
      {
        label: "API3 mentors on-site",
      },
      {
        label: "API3 Support topic in the hackathon Telegram group",
        href: siteConfig.telegramUrl,
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
      "The TUM Blockchain Track pools rewards from partners who support the hackathon without running a named track of their own. TUM Blockchain Club judges every submitted project and picks three winners, and the partners below distribute their prizes among them.",
    rightMark: "TBC",
    amount: "€16,000 in audit credits",
    status: "confirmed",
    companies: [
      {
        name: "Adevar Labs",
        role: "Platform Partner",
        logoSrc: "/sponsors/adevar_labs_logo.png",
        markSrc: "/sponsors/adevar_labs_icon.png",
        logoAlt: "Adevar Labs logo",
        href: "https://adevarlabs.com/",
        amount: "€16,000",
        amountNote: "in audit credits",
        description:
          "Smart contract audit and pre-audit packages for the top 3 projects. Credits are valid for one year.",
        prizes: [
          { place: "1st", title: "10K in audit credits", amount: "€10,000" },
          { place: "2nd", title: "Pre-Audit Core", amount: "€4,000" },
          { place: "3rd", title: "Pre-Audit Express", amount: "€2,000" },
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
