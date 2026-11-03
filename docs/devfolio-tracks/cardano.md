**Build an agent, service or developer tool that does a useful job and gets paid for it on Cardano.**

Partner: [Cardano](https://cardano.org/) · Prize pool: **€6,000**

### The challenge

AI agents already do real work. What they still lack is standard and secure ways to get hired, paid and trusted, by people and by other agents. In this track, you build an agent, service or developer tool that does a useful job and gets paid for it using Cardano.

**What does the work?** Not every agent needs AI inside. If the job needs writing or judgement, such as a research report, your agent calls a language model. If the job is a fixed set of steps, such as placing an order through a shop's API, fetching prices from a data service or running a calculation, regular software can do it without a model. Many projects mix both.

**How does it get paid?**

- **Per job, with Masumi on Sokosumi:** your agent becomes a Coworker that people hire for tasks on Sokosumi, the agent marketplace built on the open Masumi standard. The buyer's payment waits in escrow on Cardano until your agent delivers, and the buyer is refunded if it doesn't.
- **Per request, with x402:** every call to your API or agent is paid on the spot through HTTP's 402 "Payment Required" status code, with no accounts or API keys. x402 is the quicker way to a first payment.

Any combination works, and one project can use both.

You don't need to be a blockchain developer: x402 handles the payment, and Masumi adds agent identity and escrow, so you can focus on what your agent does. Whatever you build, show at least one payment going through it on **Cardano preprod**.

### Prizes

- 1st place: **€3,000**
- 2nd place: **€2,000**
- 3rd place: **€1,000**

### Requirements to qualify

- A working agent or service that completes at least one paid job or payment on Cardano preprod: per job through Masumi, or per request through x402.

### What to submit

Every team:

- A demo video of at most 2.5 minutes.
- A detailed project description: the problem, what you built and how it works.
- A link to your public repository, with a README on how to set it up and run it.

For this track:

- The transaction hash of a paid job or paid request on Cardano preprod.
- In the demo video: who the project is for, the problem, the business case and one paid job or request from start to finish.
- In the description: how it works, the Cardano tools used and how it could run in real use.

### What judges look for

Show an original use case and a paid workflow that works from start to finish. Judges look at technical execution with Cardano tools, creativity, user experience, and a clear pitch and demo. Explain the real-world impact and how the project can work beyond the hackathon.

Cardano especially wants to see:

- a clear customer, their journey and an agent job they would pay for;
- payment tied to the result, such as escrow, refunds or paying only for work that passed a check;
- agents that hire other agents or act in the real world by buying, publishing or booking;
- a live demo of a paid task with its transaction on a preprod explorer.

### Example ideas

- **Paid research task:** a shop owner hires your agent for a short research report through Masumi on Sokosumi. Show the completed result and preprod payment transaction.
- **Paid data API:** your service returns a useful response after an x402 payment on Cardano preprod. Show the request, the response, and the payment transaction.
- **Agent team:** a lead agent hires a specialist to improve a product listing. Show one paid job and its result before adding more agents.

### Get started

1. Choose a paid job with Masumi on Sokosumi, or a paid request with x402. Use the corresponding official guide and starter below.
2. Follow the starter prerequisites for Node.js, accounts, model access if needed, and Cardano preprod test funds. Use preprod for the qualifying payment.
3. Complete one paid job or request. Save its transaction hash, show the result, and describe setup steps and limits in the README.

### Resources

- [Masumi hackathon guide](https://www.masumi.network/tum-hackathon): step-by-step setup, the full agent brief and the demo checklist.
- [Masumi starter template](https://github.com/masumi-network/tum-hackathon-quickstart)
- [x402 on Cardano](https://developers.cardano.org/x402/)
- Paid per job (Masumi): [Sokosumi preprod sign-up](https://preprod.sokosumi.com/signup) · [Masumi dispenser: test ADA and tUSDM](https://dispenser.masumi.network/)
- Paid per request (x402): [x402-express template](https://developers.cardano.org/templates/x402-express/) · [x402-next template](https://developers.cardano.org/templates/x402-next/) · [Cardano testnet faucet](https://docs.cardano.org/cardano-testnets/tools/faucet)
- Shared tools: [Blockfrost preprod key (free)](https://blockfrost.io) · [End-to-end x402 demo with a Masumi agent](https://github.com/cardano-foundation/x402-cardano-demo)
- AI tooling: [Masumi hackathon skill (SKILL.md)](https://www.masumi.network/tum-hackathon/skill/SKILL.md) · [Masumi skills](https://www.masumi.network/dev/masumi/documentation/integrations/masumi-skills) · [Sokosumi MCP server setup](https://www.masumi.network/dev/sokosumi/mcp) · [Cardano Developer Plugin](https://github.com/cardano-foundation/cardano-dev-skills)

### Workshop

**Agentic Commerce on Cardano: get your agent hired and paid**, Fri 30 Oct, 12:00–12:30, with Bora Oben, Developer Community Advocate, Cardano. How agents get hired and paid on Cardano, per job with Masumi escrow on Sokosumi or per request with x402, plus build ideas, judging, and where to find starters, guides and help.

### Judges

- Bora Oben, Developer Community Advocate, Cardano
- Vladislav Kudrin, Web3 Solutions Architect, Cardano Foundation

### Support

- [1:1 sessions with a Masumi engineer](https://calendly.com/sandro-schaier/hackathon)
- [Hackathon Telegram group](https://t.me/+mY6aLKS8OnlhZjJk)
- Mentors on site

**Deadline:** Saturday 31 October, 15:00. Live judging runs 15:00–17:00; present to the judges of every track you entered. Full track page: [hackathon.tum-blockchain.com/prizes#cardano](https://hackathon.tum-blockchain.com/prizes#cardano)
