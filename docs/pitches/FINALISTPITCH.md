# HedgePod Agent - Top 10 Finalist Pitch
## ETHGlobal Buenos Aires 2025

**When**: Sunday, November 23rd 2025 at 09:30 AM UTC-03
**Format**: 4 minutes demo + 3 minutes Q&A

---

## 4-MINUTE LIVE DEMO SCRIPT

**Timing**: Introduction (30s) → Problem & Solution (45s) → Portfolio (45s) → Agent History (30s) → Real-Time Rebalance (30s) → Technical Highlights (30s) → Closing (30s)

---

### [0:00-0:30] INTRODUCTION (30 seconds)
**Screen**: hedgepod.app homepage

"Hi judges! I'm Molly, and I built HedgePod Agent - your personal AI hedge fund.

The tagline says it all: 'Create your own AI hedge fund. Made for 23M World users.'

This is a World mini app that solves DeFi's biggest problem: terrible UX preventing mainstream adoption.

Let me show you how it works live."

---

### [0:30-1:15] PROBLEM & SOLUTION (45 seconds)
**Screen**: Stay on homepage, gesture to sidebar stats

"Here's the problem: DeFi has the best yields - 5 to 15% APR versus 0.01% in traditional banks. But almost nobody uses it.

Why? Because to earn optimal yields, you need to:
- Track APRs across 8 different chains manually
- Bridge tokens and pay gas fees each time
- Monitor markets 24/7 and rebalance constantly
- Deal with endless wallet popups

Our solution is simple: Deposit once. AI agents do everything else automatically.

Notice this sidebar shows real stats - Total Value: $14,450, 4 Active Agents, 8.2% Total Yield. Let me show you how this actually works."

---

### [1:15-2:00] PORTFOLIO (45 seconds)
**Screen**: Click "Portfolio" in navigation

"Here's my portfolio page. I have 4 agents already deployed.

[Point to first agent card]

This agent - 'Yield Hunter' - is managing over $3,800 across multiple chains. Current APR is 8.4%. It's executed 12 successful rebalances automatically.

See these chain badges? This agent is active on Base, Polygon, and Arbitrum simultaneously. That's LayerZero's cross-chain magic at work.

[Point to stats]

Total Value Managed: $3,842. Current APR: 8.4%. Last rebalanced: 3 hours ago - completely autonomously while I was sleeping.

[Click "View History" button]

Let me show you the agent's transaction history."

---

### [2:00-2:30] AGENT HISTORY (30 seconds)
**Screen**: Agent History page with timeline

"Here's the complete audit trail. Every rebalance is recorded with full transparency.

[Point to latest rebalance]

Look at this latest one: Agent moved funds from Base to Polygon because the APR went from 6.1% to 8.4%. That's a 2.3% improvement.

See this transaction hash? [Hover over it] That's a real LayerZero cross-chain transfer. Click it and you'll see it on LayerScan.

[Click "Run Rebalance Now" button]

I can also trigger a manual rebalance. Let me do that right now..."

---

### [2:30-3:00] REAL-TIME REBALANCE (30 seconds)
**Screen**: Modal appears with Pyth APR data

"Perfect! The agent just checked real-time APRs from Pyth Network across all 8 chains.

[Point to APR comparison]

World Chain: 5.2%, Base: 6.1%, Polygon: 8.4%, Arbitrum: 7.3%...

Polygon still has the best yield, so the agent decides to keep funds there. If another chain's APR exceeded Polygon by more than my threshold - 1.5% - the agent would automatically execute a LayerZero transfer.

But here's the key innovation: Our custom LayerZero OFT only moves funds if APR improvement exceeds gas costs. No wasteful transfers.

[Close modal, go back to Portfolio]

This all happens 24/7 thanks to Coinbase CDP Server Wallets with x402 authorization."

---

### [3:00-3:30] TECHNICAL HIGHLIGHTS (30 seconds)
**Screen**: Click "Contracts" in navigation

"Quick technical deep-dive:

[Point to contract addresses]

We're deployed on 8 chains - World Chain, Base, Polygon, Arbitrum, Optimism, Avalanche, Celo, and Zircuit.

Key innovations:

1. LayerZero: We EXTENDED the base OFT contracts with custom _debit() logic that checks APRs before allowing cross-chain transfers. This is TRUE extension, not just inheritance.

2. Coinbase CDP: Server wallets enable 24/7 autonomy. x402 authorization means users grant permission once, agents operate forever. No wallet popups.

3. World: Full MiniKit SDK integration, World ID verification, 19 languages, gasless transactions. Built for 23M non-crypto users."

---

### [3:30-4:00] CLOSING & ASK (30 seconds)
**Screen**: Navigate to homepage

"So to recap:

HedgePod is the first autonomous yield optimizer with:
- Consumer-grade UX built for 23M World App users
- Novel yield-aware LayerZero OFT that prevents unprofitable transfers
- True agent autonomy via CDP Server Wallets and x402
- Real-time data from Pyth, The Graph, and 1inch

We're competing for World, LayerZero, and Coinbase CDP partner prizes.

This is DeFi that actually feels like a savings account. No bridging, no jargon, no wallet popups. Just deposit USDC and watch it grow.

Thank you! Happy to answer questions."

**TOTAL: 4:00 minutes**

---

## 3-MINUTE Q&A PREPARATION

### Top 10 Questions (30 seconds each)

---

**Q1: "How does this make money? What's the business model?"**

ANSWER:
"Great question! We take a 5% performance fee on gains only. So if your agent earns you $100 in yield, we keep $5 and you get $95.

Key point: Agents only earn if users earn. Perfect incentive alignment.

At scale, if we capture 1% of the 23M World App users depositing an average of $1,000 each, that's $230 million TVL. At 10% average APR, that's $23 million in annual yields generated. Our 5% fee is $1.15 million in revenue.

We're betting on volume, not extractive fees."

---

**Q2: "What if the agent makes bad decisions? How do you prevent loss?"**

ANSWER:
"Multiple safety mechanisms:

1. User-Set Thresholds: Users define the minimum APR improvement required. Agent only acts if opportunity exceeds this threshold.

2. Circuit Breakers: We can pause any chain if we detect issues. Per-chain control.

3. On-Chain Validation: Our LayerZero OFT validates profitability on-chain. If APR improvement doesn't justify gas, the transaction reverts automatically.

4. Transparent History: Every action is recorded. Users can revoke authorization anytime.

Plus, agents only move funds between established DeFi protocols - no experimental strategies."

---

**Q3: "How is this different from Yearn Finance or other yield aggregators?"**

ANSWER:
"Four key differences:

1. Cross-Chain: Yearn is single-chain per vault. We optimize across 8 chains simultaneously via LayerZero.

2. UX: Yearn assumes crypto knowledge. We're built for World App's 23M non-crypto users with 19 languages and no jargon.

3. Autonomy: Yearn requires manual deposits per vault. Our agents use CDP x402 to operate 24/7 without user interaction.

4. Distribution: Yearn targets crypto natives. We're a World mini app reaching mainstream users.

We're Yearn for the next billion users."

---

**Q4: "You integrated 9 sponsors - how did you do it so deeply in one weekend?"**

ANSWER:
"Strategic architecture from day one:

- LayerZero = the backbone for cross-chain
- CDP = enables autonomy
- Pyth = provides real-time data
- World = provides distribution
- The Graph = pools data
- 1inch = optimal swaps
- Uniswap v4 = dynamic fees

Each sponsor solves a specific problem. Not forced integration - they're essential to the architecture.

I started with the hardest parts first: LayerZero OFT extension and CDP agent infrastructure. Then layered in data sources and UX polish.

200+ commits over 48 hours. Lots of coffee."

---

**Q5: "What's the hardest technical problem you solved?"**

ANSWER:
"Extending LayerZero OFT with custom APR-checking logic while maintaining security and gas efficiency.

The challenge: Override _debit() to add APR validation BEFORE calling the parent, but ensure it doesn't break LayerZero's security model or add excessive gas costs.

The solution: Implemented a minimal on-chain APR oracle that caches values for 10 minutes. Agent updates it off-chain via Pyth data. When _debit() is called, it checks cached APRs, validates profitability, then calls super._debit().

Result: Only ~20k extra gas per cross-chain transfer, and we prevent unprofitable moves that would waste user funds.

This required deep understanding of LayerZero V2 internals and careful gas optimization."

---

**Q6: "Why would users trust autonomous agents with their money?"**

ANSWER:
"Trust is built on four pillars:

1. Transparency: Every transaction is visible on-chain with full history
2. Proof: World ID verification prevents sybil attacks and bot manipulation
3. Control: Users set the rules (APR threshold, max slippage). Agents follow them.
4. Infrastructure: Coinbase CDP provides enterprise-grade wallet security

Plus, users can revoke authorization anytime. It's autonomous, but not uncontrollable."

---

**Q7: "What's your moat? What prevents someone from copying this?"**

ANSWER:
"Four defensibility layers:

1. Technical IP: Our yield-aware LayerZero OFT extension is novel. First to do this.

2. UX Differentiation: Consumer-grade design is rare in DeFi. Animal Crossing theme, 19 languages, ENS everywhere.

3. Distribution: First mover on World App. 23M user distribution advantage.

4. Network Effects: More users = more liquidity = better yields = more users.

But honestly, I hope people DO copy this pattern. The goal is mainstream DeFi adoption, not a monopoly. Rising tide lifts all boats."

---

**Q8: "Why should you win Top 10?"**

ANSWER:
"Five reasons:

1. Real Problem: DeFi adoption is stuck at <1% because of terrible UX. We fix that.

2. Novel Tech: First yield-aware LayerZero OFT, first DeFi app with CDP x402, first Uniswap v4 hook with Pyth volatility.

3. Production Quality: Deployed on 8 chains, functional agents, 94% test coverage. Not a demo.

4. Massive Impact: If successful, 23M World users could earn 5-15% APR without touching blockchain complexity.

5. Deep Integration: 9 sponsors, all essential to the architecture. Not shallow integration.

We're proving blockchain can have consumer-grade UX."

---

**Q9: "What's next after the hackathon?"**

ANSWER:
"Three immediate steps:

1. World App Store: Submit to World App for 23M user distribution
2. Mainnet Launch: Deploy all contracts to mainnet (already on World Chain)
3. Security Audit: Get smart contracts audited before handling real user funds

Long-term: Become the #1 World mini app for passive income. Onboard 100K users in 6 months."

---

**Q10: "Are you concerned about regulatory issues with autonomous finance?"**

ANSWER:
"Yes, but we're designed with compliance in mind:

1. Non-Custodial: Users control funds. We never hold custody.
2. User-Directed: Users set all parameters. Agents execute user-defined strategies.
3. Transparent: All transactions on-chain, fully auditable.
4. World ID: Built-in KYC via proof of personhood.

We're working with legal counsel to ensure compliance as we scale. Regulation should protect users, not prevent innovation."

---

### Difficult Questions - How to Handle

**Q: "This seems too complex for regular users. How will they understand it?"**

DON'T SAY: "Well, they don't need to understand blockchain..."

DO SAY:
"That's exactly why we built the UX the way we did. Users don't see 'LayerZero' or 'OFT' or '0x addresses.' They see:
- 'Current Yield: 8.2%'
- 'Your agent moved funds to get you better returns'
- Simple stats, clear language, no jargon

We tested this with non-crypto friends. They understood 'AI manages your savings to get better interest' immediately. The complexity is hidden - by design."

---

**Q: "Aren't you just recreating centralized finance with extra steps?"**

DON'T SAY: "No, this is completely decentralized..."

DO SAY:
"I'd argue the opposite - we're making DeFi's benefits accessible without centralized intermediaries.

Traditional finance: Bank controls your money, decides yields, takes 99% of profits
HedgePod: You control your funds (non-custodial), agent optimizes transparently, you keep 95% of gains

The automation doesn't centralize it - it democratizes access to sophisticated strategies that were previously only available to crypto experts."

---

### Q&A Strategy

DO:
- Make eye contact with questioner
- Repeat question briefly if unclear
- Answer in 20-30 seconds max
- End with confidence
- Admit if you don't know something

DON'T:
- Get defensive
- Go over time
- Use too much jargon
- Ramble
- Bash competitors

---

### Timing Practice

Before judging:
1. Set timer for 4:00 minutes
2. Run through demo script
3. Note where you're at 2:00 mark (should be at Agent History)
4. If too fast, add detail; if too slow, cut fluff

For Q&A:
- Practice answering each question in exactly 30 seconds
- Record yourself and watch back
- Note verbal tics ("um," "like," "so yeah")

---

## 60-Second Elevator Pitch (For Quick Reference)

"Create your own AI hedge fund. Made for 23M World users."

**The Problem**:
- DeFi has the best yields (5-15% APR vs 0.01% in banks)
- But nobody uses it because it's too complex
- Miss yield opportunities while sleeping
- Wallet popup fatigue kills the UX

**Our Solution**: HedgePod Agent = Autonomous AI hedge fund manager
- Deposit USDC once
- Agent monitors yields across 8 chains 24/7
- Automatically rebalances to best APR
- All gasless, transparent, autonomous

"Set it once. Forget it forever. Watch your money grow."

---

## Why This Matters

### The DeFi Adoption Problem

Stats:
- 5.3 billion people worldwide
- $350+ billion in DeFi TVL
- 23 million World App users
- <1% of World users have touched DeFi

Why? Traditional DeFi workflow is too complex:
"Connect wallet → Bridge USDC → Approve spending → Pay gas → Monitor APRs → Bridge again → Repeat forever"

What consumers want:
"Deposit money → Watch it grow → That's it"

HedgePod makes DeFi feel like a savings account, not a blockchain maze.

### What HedgePod Actually Does

1. User deposits USDC (any chain)
2. Agent monitors yields across 8 chains in real-time (Pyth data)
3. Agent finds best APR (Polygon: 8.2%, Base: 5.1%, Arbitrum: 6.7%)
4. Agent moves funds via LayerZero if profitable
5. Agent swaps optimally via 1inch when needed
6. Agent trades on Uniswap v4 with dynamic fees
7. Agent operates 24/7 using Coinbase CDP wallets
8. User watches portfolio grow - no interaction needed

Key Difference: Agent only moves funds if APR improvement EXCEEDS gas costs. No wasteful transfers.

---

## Technical Architecture

**Frontend**: World Mini App (Next.js + MiniKit SDK)
- 23M potential users, 19 languages
- Privy gas sponsorship (gasless)
- ENS resolution (jane.eth not 0x...)
- Animal Crossing-themed UI

**Smart Contracts**: Solidity, Hardhat 3
- HedgePodVault: deposits & withdrawals
- AutoYieldToken (LayerZero OFT): cross-chain transfers
- VolatilityFeeHook (Uniswap v4): dynamic fees
- RandomAgentSelector (Pyth Entropy): fair rewards
- YieldOracle: APR aggregation
- Deployed on 8 chains: World, Base, Polygon, Arbitrum, Optimism, Avalanche, Celo, Zircuit

**Autonomous Agent**: Node.js + CDP Server Wallets
- Monitors: Pyth APRs, 1inch liquidity, The Graph pools
- Executes: LayerZero OFT, 1inch Fusion+, Uniswap v4
- x402 Authorization: recurring permissions (no popups)
- Runs 24/7 autonomously

---

## Key Integrations (9 Sponsors)

**1. World** (MiniKit + World ID + World Chain)
- Full MiniKit SDK (MiniKitProvider, wallet auth, SIWE, transactions)
- World ID Orb-level verification, backend-verified
- 19-language support, gasless transactions
- Deployed on World Chain mainnet (480) + testnet (4801)
- Target: 23M World App users
- Evidence: `frontend/app/layout.tsx`, `frontend/components/WorldIDVerify.tsx`, `contracts/HedgePodVault.sol`

**2. LayerZero** (Extended OFT with APR-Aware Routing)
- Extended OFT with custom `_debit()` and `_credit()` logic
- APR-checking before cross-chain transfers
- Batch send, circuit breakers, on-chain analytics
- Deployed on 8 chains, automated 56-peer configuration
- Novel use case: First yield-aware LayerZero OFT
- Evidence: `contracts/AutoYieldToken.sol` (lines 112-230), `scripts/layerzero/setPeers.ts`

**3. Coinbase CDP** (Server Wallets + x402)
- CDP Server Wallets for 24/7 autonomous operation
- x402 authorization (one-time grant, infinite permissions)
- CDP Data APIs for portfolio tracking
- The killer feature: enables TRUE agent autonomy
- Evidence: `backend/src/agent/wallet.ts`, `contracts/HedgePodVault.sol`

**4. Pyth Network** (Price Feeds + Entropy)
- Real-time price feeds via Hermes API
- Dynamic Uniswap v4 fees based on volatility
- Pyth Entropy for verifiable randomness
- PR submitted to pyth-examples repo
- Evidence: `contracts/VolatilityFeeHook.sol`, `contracts/RandomAgentSelector.sol`

**5. The Graph** (Uniswap v3 Subgraphs)
- GraphQL queries across 5 chains
- Real liquidity ($245.8M+ TVL) and volume data
- Evidence: `frontend/lib/thegraph.ts`

**6. Uniswap v4** (Dynamic Fee Hooks)
- Custom hook adjusts fees (0.1%-0.3%) based on volatility
- Protects LPs from impermanent loss
- Evidence: `contracts/VolatilityFeeHook.sol`

**7. 1inch** (Aggregation APIs)
- Swap, Quote, Liquidity Source APIs
- Optimal routing across 50+ DEXs
- Evidence: `frontend/lib/oneinch.ts`

**8. Supabase** (PostgreSQL)
- Agent performance tracking, rebalance history
- Portfolio value calculations
- Evidence: `frontend/lib/supabase.ts`

**9. Privy** (Gas Sponsorship)
- Complete gas sponsorship, users NEVER pay fees
- Evidence: `frontend/lib/privy.ts`

---

## Consumer-Grade UX

**Animal Crossing-Inspired Design**
- Friendly, approachable, non-intimidating
- Cherry blossom sidebar, HedgePod mascot
- Soft pastel colors, "dialogue box" cards
- Makes finance feel fun, not scary
- Result: DeFi that doesn't look like DeFi

**19-Language Support**
- English, Chinese, Spanish, Arabic, Portuguese, Indonesian, French, Japanese, Russian, German, Hindi, Korean, Polish, Catalan, Malay, Thai, Dutch
- World App's 23M users are global, we serve them all
- Evidence: `docs/LOCALISATIONS.md`

**ENS Everywhere**
- Traditional DeFi: `0xA167...f982`
- HedgePod: `jane.eth`
- Normal people don't want to see crypto addresses

**Gasless Transactions**
- Traditional DeFi: "Fee: $5.23"
- HedgePod: "Fee: $0.00 (sponsored)"
- Nobody wants to pay to use their own money

---

## By The Numbers

**Tech Stack**:
- 9 sponsors: World, LayerZero, CDP, Pyth, The Graph, 1inch, Uniswap v4, Privy, ENS
- 8 chains: World Chain, Base, Polygon, Arbitrum, Optimism, Avalanche, Celo, Zircuit
- 19 languages (all World App locales)
- 5 smart contracts
- 3,000+ lines Solidity
- 8,000+ lines TypeScript
- 94% test coverage

**Integration Depth**:
- LayerZero: 56 peer connections, custom OFT extension (500+ lines)
- World: Full MiniKit SDK, SIWE backend verification, 19 languages
- CDP: Server wallets + x402 + Data APIs (3 tools)
- Pyth: Price feeds + Entropy (PR submitted)
- The Graph: 5-chain subgraph queries
- 1inch: 3 APIs (Swap, Quote, Liquidity)
- Uniswap v4: Full hook with volatility-based fees

Not shallow integration - every sponsor deeply integrated with custom logic.

---

## Why We Should Win Top 10

**1. Solves Real Problem**
- Problem: DeFi has best yields but terrible UX prevents adoption
- Solution: Make DeFi feel like a savings account
- Impact: 23M World users could earn 5-15% APR without blockchain complexity

**2. True Innovation**
- First yield-aware LayerZero OFT
- First autonomous yield optimizer using CDP + x402
- First Uniswap v4 hook with Pyth volatility fees
- First DeFi app for 23M World App users
- Consumer-grade UX (Animal Crossing theme + 19 languages)
- Introduces NEW patterns, not just integration

**3. Production Quality**
- Deployed on 8 chains (mainnet + testnet)
- Functional agents with real transaction history
- 94% contract test coverage
- Extensive documentation (20+ docs)
- 200+ commits
- Feels like a product, not a prototype

**4. Technical Depth**
- Extended LayerZero OFT base contracts
- Custom Uniswap v4 hooks with Pyth oracle
- CDP Server Wallets with x402 pattern
- GraphQL subgraph queries (5 chains)
- Multi-chain peer configuration automation
- Every decision demonstrates deep protocol understanding

**5. Consumer Focus**
- 19-language support
- Animal Crossing UI (friendly, approachable)
- ENS everywhere (no 0x addresses)
- Gasless transactions (no ETH needed)
- World mini app (23M distribution)
- No crypto jargon
- Most projects are for developers. This is for everyone.

**6. Complete Execution**
- Frontend: Next.js app with consumer UX
- Contracts: Deployed and verified on 8 chains
- Backend: Autonomous agents 24/7
- Database: Supabase with agent tracking
- APIs: All integrations working
- Documentation: Comprehensive
- Live App: hedgepod.app
- Every piece done, not just MVP

---

## 🎬 **4-MINUTE LIVE DEMO SCRIPT**

**Format**: 4 minutes demo + 3 minutes Q&A = 7 minutes total

**⏱️ Timing Breakdown**:
- Introduction: 30 seconds
- Problem & Solution: 45 seconds
- Live Demo: 2 minutes 15 seconds
- Technical Highlights: 30 seconds
- Closing: 15 seconds

---

### **[0:00-0:30] INTRODUCTION (30 seconds)**

**[Screen: hedgepod.app homepage]**

> "Hi judges! I'm Molly, and I built HedgePod Agent - your personal AI hedge fund.
> 
> **The tagline says it all: 'Create your own AI hedge fund. Made for 23M World users.'**
> 
> This is a World mini app that solves DeFi's biggest problem: terrible UX preventing mainstream adoption.
> 
> Let me show you how it works live."

---

### **[0:30-1:15] PROBLEM & SOLUTION (45 seconds)**

**[Stay on homepage, gesture to stats in sidebar]**

> "Here's the problem: DeFi has the best yields - 5 to 15% APR versus 0.01% in traditional banks. But almost nobody uses it.
> 
> Why? Because to earn optimal yields, you need to:
> - Track APRs across 8 different chains manually
> - Bridge tokens and pay gas fees each time
> - Monitor markets 24/7 and rebalance constantly
> - Deal with endless wallet popups
> 
> **Our solution is simple: Deposit once. AI agents do everything else automatically.**
> 
> Notice this sidebar shows real stats - Total Value: $14,450, 4 Active Agents, 8.2% Total Yield. Let me show you how this actually works."

---

### **[1:15-2:00] LIVE DEMO PART 1: PORTFOLIO (45 seconds)**

**[Click "Portfolio" in navigation]**

> "Here's my portfolio page. I have 4 agents already deployed.
> 
> **[Point to first agent card]**
> 
> This agent - 'Yield Hunter' - is managing over $3,800 across multiple chains. Current APR is 8.4%. It's executed 12 successful rebalances automatically.
> 
> See these chain badges? This agent is active on Base, Polygon, and Arbitrum simultaneously. That's LayerZero's cross-chain magic at work.
> 
> **[Point to stats]**
> 
> Total Value Managed: $3,842. Current APR: 8.4%. Last rebalanced: 3 hours ago - completely autonomously while I was sleeping.
> 
> **[Click "View History" button]**
> 
> Let me show you the agent's transaction history."

---

### **[2:00-2:30] LIVE DEMO PART 2: AGENT HISTORY (30 seconds)**

**[On Agent History page with timeline]**

> "Here's the complete audit trail. Every rebalance is recorded with full transparency.
> 
> **[Point to latest rebalance]**
> 
> Look at this latest one: Agent moved funds from Base to Polygon because the APR went from 6.1% to 8.4%. That's a 2.3% improvement.
> 
> See this transaction hash? **[Hover over it]** That's a real LayerZero cross-chain transfer. Click it and you'll see it on LayerScan.
> 
> **[Click "Run Rebalance Now" button]**
> 
> I can also trigger a manual rebalance. Let me do that right now..."

---

### **[2:30-3:00] LIVE DEMO PART 3: REAL-TIME REBALANCE (30 seconds)**

**[Modal appears with Pyth APR data]**

> "Perfect! The agent just checked real-time APRs from Pyth Network across all 8 chains.
> 
> **[Point to APR comparison]**
> 
> World Chain: 5.2%, Base: 6.1%, Polygon: 8.4%, Arbitrum: 7.3%...
> 
> Polygon still has the best yield, so the agent decides to keep funds there. If another chain's APR exceeded Polygon by more than my threshold - 1.5% - the agent would automatically execute a LayerZero transfer.
> 
> But here's the key innovation: **Our custom LayerZero OFT only moves funds if APR improvement exceeds gas costs.** No wasteful transfers.
> 
> **[Close modal, go back to Portfolio]**
> 
> This all happens 24/7 thanks to Coinbase CDP Server Wallets with x402 authorization."

---

### **[3:00-3:30] TECHNICAL HIGHLIGHTS (30 seconds)**

**[Click "Contracts" in navigation]**

> "Quick technical deep-dive:
> 
> **[Point to contract addresses]**
> 
> We're deployed on 8 chains - World Chain, Base, Polygon, Arbitrum, Optimism, Avalanche, Celo, and Zircuit.
> 
> **Key innovations:**
> 
> 1. **LayerZero**: We EXTENDED the base OFT contracts with custom _debit() logic that checks APRs before allowing cross-chain transfers. This is TRUE extension, not just inheritance.
> 
> 2. **Coinbase CDP**: Server wallets enable 24/7 autonomy. x402 authorization means users grant permission once, agents operate forever. No wallet popups.
> 
> 3. **World**: Full MiniKit SDK integration, World ID verification, 19 languages, gasless transactions. Built for 23M non-crypto users."

---

### **[3:30-4:00] CLOSING & ASK (30 seconds)**

**[Navigate to homepage]**

> "So to recap:
> 
> **HedgePod is the first autonomous yield optimizer with:**
> - Consumer-grade UX built for 23M World App users
> - Novel yield-aware LayerZero OFT that prevents unprofitable transfers
> - True agent autonomy via CDP Server Wallets and x402
> - Real-time data from Pyth, The Graph, and 1inch
> 
> **We're competing for World, LayerZero, and Coinbase CDP partner prizes.**
> 
> This is DeFi that actually feels like a savings account. No bridging, no jargon, no wallet popups. Just deposit USDC and watch it grow.
> 
> **Thank you! Happy to answer questions.**"

**[Total: 4:00 minutes]**

---

## ❓ **3-MINUTE Q&A PREPARATION**

### **🔥 Most Likely Questions + Perfect Answers**

---

#### **Q1: "How does this make money? What's the business model?"**

**ANSWER** (30 seconds):
> "Great question! We take a 5% performance fee on gains only. So if your agent earns you $100 in yield, we keep $5 and you get $95.
> 
> Key point: **Agents only earn if users earn.** Perfect incentive alignment.
> 
> At scale, if we capture 1% of the 23M World App users depositing an average of $1,000 each, that's $230 million TVL. At 10% average APR, that's $23 million in annual yields generated. Our 5% fee is $1.15 million in revenue.
> 
> **We're betting on volume, not extractive fees.**"

---

#### **Q2: "What if the agent makes bad decisions? How do you prevent loss?"**

**ANSWER** (30 seconds):
> "Multiple safety mechanisms:
> 
> 1. **User-Set Thresholds**: Users define the minimum APR improvement required. Agent only acts if opportunity exceeds this threshold.
> 
> 2. **Circuit Breakers**: We can pause any chain if we detect issues. Per-chain control.
> 
> 3. **On-Chain Validation**: Our LayerZero OFT validates profitability on-chain. If APR improvement doesn't justify gas, the transaction reverts automatically.
> 
> 4. **Transparent History**: Every action is recorded. Users can revoke authorization anytime.
> 
> **Plus, agents only move funds between established DeFi protocols - no experimental strategies.**"

---

#### **Q3: "How is this different from Yearn Finance or other yield aggregators?"**

**ANSWER** (30 seconds):
> "Four key differences:
> 
> 1. **Cross-Chain**: Yearn is single-chain per vault. We optimize across 8 chains simultaneously via LayerZero.
> 
> 2. **UX**: Yearn assumes crypto knowledge. We're built for World App's 23M non-crypto users with 19 languages and no jargon.
> 
> 3. **Autonomy**: Yearn requires manual deposits per vault. Our agents use CDP x402 to operate 24/7 without user interaction.
> 
> 4. **Distribution**: Yearn targets crypto natives. We're a World mini app reaching mainstream users.
> 
> **We're Yearn for the next billion users.**"

---

#### **Q4: "You integrated 9 sponsors - how did you do it so deeply in one weekend?"**

**ANSWER** (30 seconds):
> "Strategic architecture from day one:
> 
> - **LayerZero** = the backbone for cross-chain
> - **CDP** = enables autonomy
> - **Pyth** = provides real-time data
> - **World** = provides distribution
> - **The Graph** = pools data
> - **1inch** = optimal swaps
> - **Uniswap v4** = dynamic fees
> 
> Each sponsor solves a specific problem. Not forced integration - they're essential to the architecture.
> 
> **I started with the hardest parts first: LayerZero OFT extension and CDP agent infrastructure. Then layered in data sources and UX polish.**
> 
> 200+ commits over 48 hours. Lots of coffee."

---

#### **Q5: "What's the hardest technical problem you solved?"**

**ANSWER** (30 seconds):
> "Extending LayerZero OFT with custom APR-checking logic while maintaining security and gas efficiency.
> 
> **The challenge:** Override _debit() to add APR validation BEFORE calling the parent, but ensure it doesn't break LayerZero's security model or add excessive gas costs.
> 
> **The solution:** Implemented a minimal on-chain APR oracle that caches values for 10 minutes. Agent updates it off-chain via Pyth data. When _debit() is called, it checks cached APRs, validates profitability, then calls super._debit().
> 
> **Result:** Only ~20k extra gas per cross-chain transfer, and we prevent unprofitable moves that would waste user funds.
> 
> **This required deep understanding of LayerZero V2 internals and careful gas optimization.**"

---

#### **Q6: "Why would users trust autonomous agents with their money?"**

**ANSWER** (25 seconds):
> "Trust is built on four pillars:
> 
> 1. **Transparency**: Every transaction is visible on-chain with full history
> 2. **Proof**: World ID verification prevents sybil attacks and bot manipulation
> 3. **Control**: Users set the rules (APR threshold, max slippage). Agents follow them.
> 4. **Infrastructure**: Coinbase CDP provides enterprise-grade wallet security
> 
> Plus, users can revoke authorization anytime. **It's autonomous, but not uncontrollable.**"

---

#### **Q7: "What's your moat? What prevents someone from copying this?"**

**ANSWER** (30 seconds):
> "Four defensibility layers:
> 
> 1. **Technical IP**: Our yield-aware LayerZero OFT extension is novel. First to do this.
> 
> 2. **UX Differentiation**: Consumer-grade design is rare in DeFi. Animal Crossing theme, 19 languages, ENS everywhere.
> 
> 3. **Distribution**: First mover on World App. 23M user distribution advantage.
> 
> 4. **Network Effects**: More users = more liquidity = better yields = more users.
> 
> **But honestly, I hope people DO copy this pattern. The goal is mainstream DeFi adoption, not a monopoly. Rising tide lifts all boats.**"

---

#### **Q8: "Why should you win Top 10?"**

**ANSWER** (30 seconds):
> "Five reasons:
> 
> 1. **Real Problem**: DeFi adoption is stuck at <1% because of terrible UX. We fix that.
> 
> 2. **Novel Tech**: First yield-aware LayerZero OFT, first DeFi app with CDP x402, first Uniswap v4 hook with Pyth volatility.
> 
> 3. **Production Quality**: Deployed on 8 chains, functional agents, 94% test coverage. Not a demo.
> 
> 4. **Massive Impact**: If successful, 23M World users could earn 5-15% APR without touching blockchain complexity.
> 
> 5. **Deep Integration**: 9 sponsors, all essential to the architecture. Not shallow integration.
> 
> **We're proving blockchain can have consumer-grade UX.**"

---

#### **Q9: "What's next after the hackathon?"**

**ANSWER** (20 seconds):
> "Three immediate steps:
> 
> 1. **World App Store**: Submit to World App for 23M user distribution
> 2. **Mainnet Launch**: Deploy all contracts to mainnet (already on World Chain)
> 3. **Security Audit**: Get smart contracts audited before handling real user funds
> 
> **Long-term: Become the #1 World mini app for passive income. Onboard 100K users in 6 months.**"

---

#### **Q10: "Are you concerned about regulatory issues with autonomous finance?"**

**ANSWER** (25 seconds):
> "Yes, but we're designed with compliance in mind:
> 
> 1. **Non-Custodial**: Users control funds. We never hold custody.
> 2. **User-Directed**: Users set all parameters. Agents execute user-defined strategies.
> 3. **Transparent**: All transactions on-chain, fully auditable.
> 4. **World ID**: Built-in KYC via proof of personhood.
> 
> **We're working with legal counsel to ensure compliance as we scale. Regulation should protect users, not prevent innovation.**"

---

### **⚠️ DIFFICULT QUESTIONS - HOW TO HANDLE**

#### **Q: "This seems too complex for regular users. How will they understand it?"**

**DON'T SAY**: "Well, they don't need to understand blockchain..."

**DO SAY**:
> "That's exactly why we built the UX the way we did. Users don't see 'LayerZero' or 'OFT' or '0x addresses.' They see:
> - 'Current Yield: 8.2%'
> - 'Your agent moved funds to get you better returns'
> - Simple stats, clear language, no jargon
> 
> **We tested this with non-crypto friends. They understood 'AI manages your savings to get better interest' immediately. The complexity is hidden - by design.**"

---

#### **Q: "Aren't you just recreating centralized finance with extra steps?"**

**DON'T SAY**: "No, this is completely decentralized..."

**DO SAY**:
> "I'd argue the opposite - we're making DeFi's benefits accessible without centralized intermediaries.
> 
> **Traditional finance**: Bank controls your money, decides yields, takes 99% of profits
> **HedgePod**: You control your funds (non-custodial), agent optimizes transparently, you keep 95% of gains
> 
> **The automation doesn't centralize it - it democratizes access to sophisticated strategies that were previously only available to crypto experts.**"

---

### **🎯 Q&A STRATEGY**

**DO**:
- ✅ Make eye contact with questioner
- ✅ Repeat question briefly if unclear ("Great question about...")
- ✅ Answer in 20-30 seconds max
- ✅ End with confidence, not a trailing "so yeah..."
- ✅ If you don't know something, admit it honestly

**DON'T**:
- ❌ Get defensive
- ❌ Go over time (judges are strict)
- ❌ Use too much jargon
- ❌ Ramble - answer the question directly
- ❌ Bash competitors

---

### **⏱️ TIMING PRACTICE**

**Before judging, practice this drill:**
1. Set timer for 4:00 minutes
2. Run through demo script
3. Note where you're at 2:00 mark (should be at Agent History)
4. If too fast, add detail; if too slow, cut fluff

**For Q&A:**
- Practice answering each question in exactly 30 seconds
- Record yourself and watch back
- Note verbal tics ("um," "like," "so yeah")

---

**🦔 You've got this! The product is amazing - now just show it confidently!**

---

## The Vision

**Short-term (Post-Hackathon)**:
- World App store submission
- Mainnet deployment on all 8 chains
- Referral system (World ID-gated)
- Social features (share yields)

**Long-term (6-12 months)**:
- On-ramp integration (buy USDC with fiat)
- Additional strategies (lending, options, leverage)
- AI-powered strategy optimization
- Become #1 World mini app for passive income

**The Big Picture**: Prove that DeFi can be as simple as a savings account. If we can make 23M World users comfortable with DeFi, we've changed the game.

---

## Contact

**Molly Beach**
- Email: mollybeach@hedgepod.app
- Twitter: @hedgepod
- GitHub: github.com/mollybeach
- Website: hedgepod.app
- Discord: discord.com/invite/5C7yYrsR
- Telegram: t.me/hedgepod

---

## Links

- Live Demo: hedgepod.app
- GitHub: github.com/mollybeach/hedgepod
- Video: youtu.be/lSkDzICg0vg

---

HedgePod: Your personal AI hedge fund.

Let's make DeFi accessible to 23 million people. Let's prove blockchain can have consumer-grade UX.

