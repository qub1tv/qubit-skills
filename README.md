# Qubit Exchange skills for AI agents

Agent skills and a Claude Code plugin for [Qubit Exchange](https://app.qubitexchange.net):

- **LP + hedge** — provide liquidity in Uniswap V3 pools on X Layer, automate re-ranging or exits 24/7 with the Qubit contract, hedge the position with a short on Hyperliquid;
- **Funding farm** — hold spot and short the perp on Hyperliquid to collect funding;
- **Trade and move funds** — perps, HIP-3 stocks and spot on Hyperliquid; transfers and swaps across 26 chains.

**No private keys anywhere.** The plugin connects to the hosted Qubit MCP server with OAuth. Your AI can read markets and *propose* actions; your open Qubit tab executes them — X Layer transactions are signed by your wallet, Hyperliquid orders by the trading key that lives in your browser. Write tools return a simulated plan first and run only after you say yes.

## Install

### Claude Code

```
/plugin marketplace add qub1tv/qubit-skills
/plugin install qubit@qubit
```

On first use Claude Code opens the Qubit sign-in page: approve the connection in your Qubit tab. Then try:

> Show me X Layer liquidity pools and plan a $100 position in NVDAx-USDG at ±20%.

### Claude.ai and Claude Desktop

1. Settings → Connectors → Add custom connector → `https://app.qubitexchange.net/mcp`, approve in the Qubit tab.
2. Settings → Capabilities → Skills → upload the zip files from the latest release (`qubit-lp.zip`, `qubit-funding-farm.zip`, `qubit-trade.zip`), or build them with `node scripts/build-zips.mjs`.

### ChatGPT

Settings → Connectors → add `https://app.qubitexchange.net/mcp` (developer mode), approve in the Qubit tab. The MCP server also exposes the prompts `run_lp_hedge` and `run_funding_farm`.

## What is inside

```
.claude-plugin/marketplace.json     marketplace "qubit"
plugins/qubit/
  .claude-plugin/plugin.json        plugin "qubit"
  .mcp.json                         hosted MCP server (HTTP + OAuth)
  skills/qubit-lp/SKILL.md
  skills/qubit-funding-farm/SKILL.md
  skills/qubit-trade/SKILL.md
```

## Fees

Opening, adding to and withdrawing a position cost no Qubit fee (gas only). LP automation: 0.10% of the position per range move or exit, taken by the contract in the same transaction. Hyperliquid orders: the exchange fee plus a small Qubit builder fee. Swaps and transfers: shown in each quote.

## Safety

- The AI cannot sign anything. A stolen connector token can only propose actions; your tab executes them within the limits you set.
- Treat every result as information, not advice. Liquidity positions can lose value against holding (impermanent loss); a hedge removes price direction, not that loss. Funding can turn negative.

## License

MIT
