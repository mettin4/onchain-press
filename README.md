# OnChain Press

**A decentralized media publishing platform built on Shelby Protocol and Aptos.**

Live demo: [onchain-press.vercel.app](https://onchain-press.vercel.app)

---

## What is it?

Censorship is accelerating. Governments block websites, platforms delete accounts, journalists get silenced. Every piece of content published on a centralized platform is one takedown request away from disappearing forever.

OnChain Press removes that vulnerability. Writers, journalists, and creators connect their Petra wallet and publish content — articles, images, videos, audio — directly to Shelby's decentralized blob storage network, registered on Aptos. No platform owns it. No one can delete it. Your wallet address is your byline.

## How it works

1. **Connect wallet** — Link your Petra wallet. Your address becomes your permanent author identity on-chain.
2. **Write** — Use the editor to compose your article with title, subtitle, tags, and cover image.
3. **Publish to chain** — Your content is encoded using Clay erasure coding and registered on Aptos via Shelby blob storage.
4. **It's permanent** — The content lives on the network. No one — including us — can remove it.

## Tech Stack

- **Frontend:** React + Vite + TypeScript
- **Storage:** [Shelby Protocol](https://shelby.xyz) — decentralized hot blob storage
- **Blockchain:** Aptos (Testnet)
- **Wallet:** Petra Wallet via `@aptos-labs/wallet-adapter-react`
- **SDK:** `@shelby-protocol/sdk`

## Features

- 📝 Rich text editor with cover image upload
- 🔐 Wallet-based author identity (Petra)
- 💾 Draft auto-save to localStorage
- 🌐 On-chain blob registration via Shelby SDK
- 📰 Article feed with tag filtering
- 👤 Writer directory with follower sorting
- 🏷️ Topic browser

## Status

Currently awaiting **Early Access** to Shelby's developer program. The UI is fully built and live. Once Early Access is granted, the roadmap includes:

- Real blob registration on Shelby testnet
- Live content feed pulling from on-chain data
- Full multi-media support (video and audio streaming via Shelby hot storage)
- Token-gated content access
- Creator monetization via Shelby's usage-based pricing

## Run locally

```bash
git clone https://github.com/mettin4/onchain-press
cd onchain-press
npm install --legacy-peer-deps
```

Create a `.env` file:
```
VITE_SHELBY_API_KEY=your_api_key
```

```bash
npm run dev
```

## Built by

[@0xmeto_](https://x.com/0xmeto_) — independent builder in the Shelby + Aptos ecosystem.

---

*OnChain Press is built on Shelby Protocol — Web3's first cloud-grade decentralized hot storage network, developed by Aptos Labs and Jump Crypto.*