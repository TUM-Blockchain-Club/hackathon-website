**Real-world data. Checked by your contract.**

Partner: [API3](https://api3.org/) · Prize pool: **€2,000**

### The challenge

Build an app or agent whose core on-chain functionality depends on authenticated AirnodeHub data. A user, keeper or agent brings the response on-chain; the contract verifies the expected signer, the intended request and freshness before using the data to make a meaningful decision or state change. A single API call added to an otherwise unrelated project is not enough.

Start with the integrations marked "Recommended for the hackathon" in the integrations guide. A signature authenticates the Airnode's response and detects changes; it does not independently prove the underlying real-world claim is true.

### Prizes

- 1st place: **€1,000**
- 2nd place: **€600**
- 3rd place: **€400**

### Requirements to qualify

- Use an AirnodeHub integration as an essential part of a core feature or workflow. Removing it must materially impair the application.
- Submit a signed response to a deployed contract that verifies the expected signer, the intended request and the relevant timing conditions. A testnet deployment is enough.
- Use a value bound to the exact signed response to drive a meaningful on-chain action or state change, with protection against duplicate execution where needed.
- Pass the tamper test (pass/fail, see below).

### What to submit

Every team:

- A demo video of at most 2.5 minutes.
- A detailed project description: the problem, what you built and how it works.
- A link to your public repository, with a README on how to set it up and run it.

For this track:

- The deployed contract address and network.
- A way for judges to submit their own responses, through the app or a documented script, so they can run the tamper test.
- In the demo video, the **tamper test** (pass/fail): first a valid, timely response that triggers the intended on-chain action, then four responses rejected before that action:
  1. a real response with one value edited,
  2. a real response that is too old,
  3. a real response to a different request,
  4. a response signed by a key that is not the expected Airnode's.
- In the description: who relies on the data, what goes wrong if it is forged, and what data you wanted but could not find on AirnodeHub.

### What judges look for

Show a real use case where authenticated data matters to the core workflow. Judges look at execution and originality. The tamper test is a pass/fail qualification requirement. An autonomous agent adds value when it selects data, pays through x402 when required, and acts on-chain over repeated cycles. Payment alone or one-off MCP discovery does not demonstrate that workflow.

### Example ideas

- **Signed-price guard:** use the starter's ETH/USD response to permit or block a demo on-chain action. Show the accepted action and the required rejected responses.
- **Conditional payment:** release test funds only when verified AirnodeHub data meets a condition. Choose an operation recommended for the hackathon before defining your demo.
- **Protocol safeguard:** update a demo contract state when a signed value crosses a threshold. Show why modified, stale, wrong-request, and wrong-signer responses cannot trigger it.

### Get started

1. Check the recommended integrations and the official starter. Its signed ETH/USD response provides a concrete first integration.
2. Follow the starter prerequisites for Foundry, Node.js and pnpm. Use the event faucet and payment instructions for priced operations.
3. Deploy a contract that checks the signer, intended request and freshness before acting. Show one valid response and all four required tamper-test failures.

### Resources

- [Starter template](https://github.com/api3dao/airnodehub-hackathon-starter): a Nodary ETH/USD signed-response consumer and logger, a client and verification tests.
- [Challenge and onboarding](https://api3dao.github.io/airnodehub-hackathon/)
- [Hackathon documentation](https://api3dao.github.io/airnodehub-hackathon/docs/)
- [Recommended integrations](https://api3dao.github.io/airnodehub-hackathon/docs/integrations)
- Guides and docs: [From API to contract](https://api3dao.github.io/airnodehub-hackathon/docs/from-api-to-contract) · [Projections](https://api3dao.github.io/airnodehub-hackathon/docs/projections) · [AirnodeHub catalogue](https://airnodehub.api3.org/) · [Product documentation](https://airnodehub-docs.api3.org/)
- Test funds: [aUSD faucet](https://api3dao.github.io/airnodehub-hackathon/faucet/) · [Testnet USDC (Circle faucet)](https://faucet.circle.com)
- AI tooling: [AirnodeHub MCP server setup](https://airnodehub-docs.api3.org/api-consumers/mcp) · [AirnodeHub llms.txt](https://airnodehub.api3.org/llms.txt)

### Workshop

**Building with AirnodeHub**, Fri 30 Oct, 11:00–11:30, with Ugur Schenk, Strategy Lead, API3. An introduction to API3 and AirnodeHub, how apps and agents use authenticated external data, and the track's challenge, submission requirements, judging and prizes.

### Judges

- Matej Falat, Software Engineer, API3
- Ugur Schenk, Strategy Lead, API3

### Support

- [Hackathon Telegram group](https://t.me/+mY6aLKS8OnlhZjJk)
- Mentors on site

**Deadline:** Saturday 31 October, 15:00. Live judging runs 15:00–17:00; present to the judges of every track you entered. Full track page: [hackathon.tum-blockchain.com/prizes#api3](https://hackathon.tum-blockchain.com/prizes#api3)
