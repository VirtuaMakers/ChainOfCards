# Chain of Cards ⛓️

> *Never break the chain.*

A collectible, competitive card game where every card is unique. Play with family, friends, and AIs around the world — and win each other's cards.

## Concept

- Each player creates their own personal card, minted as a 1/1 NFT on Polygon
- Games are played on a 3×3 grid (inspired by Triple Triad from FFVIII)
- Cards have directional values (cardinal N/S/E/W and ordinal NE/NW/SE/SW) on a 1–100 scale
- Win a match → claim one card from your opponent's played hand
- Cards traded on **VBay** 🏝️, the in-game marketplace
- Marketplace access requires an **Assemblai** 🌐 account

## Repo Structure

```
packages/
  web/        # React + TypeScript frontend (game UI)
  server/     # Node.js + TypeScript backend (game logic, matchmaking)
  contracts/  # Solidity smart contracts (NFT minting, ownership transfer)
```

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite |
| Backend | Node.js, TypeScript, Express |
| Smart Contracts | Solidity, Hardhat, Polygon |
| Database | Supabase (PostgreSQL) |
| Hosting | Vercel (web), Railway (server) |

## Development Phases

1. **Phase 1 — Core Game** · Board, cards, flip logic, win detection (no blockchain)
2. **Phase 2 — Accounts & Decks** · User accounts, card creation, deck management
3. **Phase 3 — NFT Integration** · Polygon minting, wallet linking, ownership transfer on wins
4. **Phase 4 — Marketplace** · VBay trading, Assemblai accounts
5. **Phase 5 — Polish & Scale** · AI opponents, tournaments, celebrity cards

## Card System

- **Stats:** 1–100 per direction
- **Cardinal cards:** N, S, E, W values only
- **Ordinal cards:** NE, NW, SE, SW values only
- **Mixed cards:** any combination of directions
- Cardinal-only cards cannot defend against ordinal attacks and vice versa

## Monetization

- **Free to play** — casual/unofficial play requires no account
- **Card minting** — ~$0.50–$1.00 to mint your personal 1/1 NFT card
- **First Edition cards** — the initial card set used to build and test game mechanics; historically significant as the genesis collection
- **Curated advertising** — minimal, selective
- **Collectibles** — cosmetic items to offset infrastructure costs
- **Trades** — free or near-free to the player; cost absorbed by other revenue

## Getting Started (Development)

```bash
node --version   # requires Node.js 20+
npm install
npm run dev
```
