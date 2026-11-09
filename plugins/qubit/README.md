# qubit — Qubit Exchange plugin for Claude Code

Connects Claude Code to the hosted Qubit Exchange MCP server (HTTP + OAuth, no API key or private key to configure) and adds three skills:

- `qubit-lp` — Uniswap V3 liquidity on X Layer: pick a pool, plan and open a position, automate re-ranging or exits with the Qubit contract, hedge with a short on Hyperliquid;
- `qubit-funding-farm` — spot + short perp on Hyperliquid to collect funding, with hourly checks and exits;
- `qubit-trade` — Hyperliquid perps, HIP-3 stocks and spot; transfers and swaps across 26 chains.

## Setup

1. Install: `/plugin marketplace add qub1tv/qubit-skills`, then `/plugin install qubit@qubit`.
2. On the first tool call Claude Code opens the Qubit sign-in page; approve the connection in your Qubit tab at https://app.qubitexchange.net with the wallet you trade from.
3. Keep the Qubit tab open while your AI works: it executes the proposals. Hyperliquid orders can be auto-signed within limits you set there; wallet transactions always ask you.

## What the plugin sends and fetches

The plugin contains no code that runs on your machine: three skill files (instructions) and one MCP server entry. The only network connection it adds is Claude Code's MCP connection to `https://app.qubitexchange.net/mcp` (HTTP, OAuth). Over it Claude sends the tool calls you ask for — for example a pool name, an amount, an order — and receives market data, your public wallet data and execution results. Your wallet address comes from the OAuth link you approve in the Qubit tab. No private keys, seed phrases or API keys are sent, stored or requested. Privacy policy: https://app.qubitexchange.net/privacy

## How actions run

Read tools answer immediately. Write tools for liquidity return a plan with a full simulation from your address and a `plan_id`; they run only when called again with `execute: true` after you approve. Nothing is signed by the AI or by Qubit's servers.
