# HedgePod Agent - Demo Script (2-4 Minutes)

> **🎯 Goal**: Show judges a complete, working DeFi platform that solves real problems with cutting-edge tech

---

## 🎬 Recommended Setup

**Before Recording**:
- ✅ Open `https://hedgepod.app/` in a clean browser window
- ✅ Have your wallet connected with some test funds
- ✅ Make sure you have at least 1 agent deployed (or be ready to deploy one)
- ✅ Close unnecessary browser tabs
- ✅ Set browser zoom to 100%
- ✅ Test your microphone
- ✅ Record at 1080p minimum
- ✅ Use OBS, Loom, or QuickTime
- ✅ Aim for **3-3.5 minutes** (sweet spot for engagement)

---

## 📝 Full Demo Script

### **[0:00-0:30] INTRO: The Problem** (30 seconds)

**Visual**: Homepage at `https://hedgepod.app/`

**Script**:
> "Hi, I'm [YOUR NAME], and this is **HedgePod Agent**—autonomous cross-chain DeFi built for World App's 23 million users.
>
> Here's the problem: Today's DeFi has the best yield on Base, but your funds are stuck on Arbitrum. Most users can't afford gas fees, don't know what an RPC is, and definitely won't manually bridge and rebalance.
>
> HedgePod solves this with **AI agents that work 24/7**—gasless, autonomous, and human-readable."

**Actions**:
- Point to the hero headline: "Create Your Own AI-Powered Hedge Fund"
- Hover over the "8+ Supported Chains" and "$0 Gas Fees" badges
- Briefly gesture to the "How It Works" section (don't read it)

---

### **[0:30-0:50] CONNECT WALLET** (20 seconds)

**Visual**: Click "Connect Wallet to Start" button

**Script**:
> "Let me show you. First, I connect my wallet—one click with RainbowKit."

**Actions**:
- Click **"🚀 Connect Wallet to Start"** button
- Select your wallet (MetaMask, WalletConnect, etc.)
- Show the connected state with address + balance in header

**⚠️ Important**: If already connected, just point to the wallet button in the header and say "Already connected—see my address and balance here"

---

### **[0:50-1:30] PORTFOLIO DASHBOARD** (40 seconds)

**Visual**: Navigate to Portfolio page via **"📊 View Portfolio"** button

**Script**:
> "This is my portfolio dashboard. I have [X] active agents managing my funds across multiple chains.
>
> *(Point to top card)* Here's my full wallet address—no hiding behind 0x1234. We show everything.
>
> *(Point to agent cards)* Each agent is a Coinbase CDP Server Wallet. They operate 24/7 with x402 authorization—I granted permission once, and they can rebalance forever without me clicking 'Approve' every time.
>
> *(Point to stats)* This agent has rebalanced [X] times, earning [X]% APR. It's monitoring yields on World Chain, Base, Celo, and more in real-time using Pyth Network price feeds."

**Actions**:
- Scroll to show the full wallet address card (copy button optional)
- Highlight the **Total Agents, Active, Total Rebalances, Avg APR** stats
- Click on one agent to expand and show:
  - APR percentage
  - TVL (Total Value Managed)
  - Rebalances count
  - Active chains (with logos)
- Click **"📊 View History"** button briefly to show the rebalance history page (5 seconds)
- Navigate back to Portfolio

**⚠️ If you have no agents yet**: 
- Say "I'm going to deploy my first agent right now" and skip directly to the Deploy section

---

### **[1:30-2:10] DEPLOY A NEW AGENT** (40 seconds)

**Visual**: Click **"🤖 + Deploy New Agent"** button

**Script**:
> "Let me deploy a new agent. I'll name it... *(click random name button)* 'Yieldy Hedgehog #42'—perfect.
>
> Now I select the chains I want to monitor: World Chain, Base, Polygon, Arbitrum. The agent will automatically track yields on all of these and move my funds to whichever has the best APR.
>
> *(Optional: Show World ID)* Normally, I'd verify with World ID for sybil resistance, but I'll skip that for this demo.
>
> *(Click Deploy)* And... deploying! This creates a Coinbase CDP Server Wallet that operates autonomously 24/7."

**Actions**:
- Show the agent name field, click **"🎲 Random Name"** button
- Show the chain selection (toggle a few chains on/off)
- **Skip World ID verification** (just mention it briefly)
- Click **"🤖 Deploy Agent"** button
- Show the success modal with transaction hash and explorer link (if it works)
- If deployment is slow, say "This is happening on-chain right now—you can see the transaction hash and verify it on the explorer"

**⚠️ Backup Plan**: If deployment fails or takes too long, say "Normally this would deploy in 10-15 seconds, but let me show you what else the app can do" and move on

---

### **[2:10-3:00] SWAP PAGE: Real-Time Data** (50 seconds)

**Visual**: Navigate to **"🦄 Swap"** in header

**Script**:
> "Now, the coolest part: our Uniswap v4 integration with dynamic fees.
>
> *(Point to pool stats)* This is **100% real data**—no mocks. We're pulling liquidity and 24-hour volume from **The Graph** subgraphs, and volatility from **Pyth Network** price feeds. Everything refreshes every 30 seconds.
>
> *(Point to Current Fee)* See how the fee adjusts based on volatility? That's our custom Uniswap v4 hook—**VolatilityFeeHook.sol**—it protects liquidity providers from impermanent loss during high volatility and increases volume during stable periods.
>
> *(Click Swap button)* I can swap USDC for ETH here, and the agents use **1inch APIs** to find the best routes across 50+ DEXs automatically.
>
> *(Click Add Liquidity button)* Or I can add liquidity directly to the Uniswap v4 pool. Let me add 100 USDC... *(type amount)* ...and confirm. This triggers a real transaction using wagmi."

**Actions**:
- Point to the **Liquidity ($X)** and **24h Volume ($X)** stats
- Point to **Current Fee (0.10%)** and **Volatility (Low)** badges
- Click **"💱 Swap"** button to open swap modal
  - Show the token selection (USDC → ETH)
  - Type in an amount (e.g., "100")
  - Show the estimated output
  - **Optional**: Click "Confirm Swap" if you want to show a real transaction
  - Close modal
- Click **"💧 Add Liquidity"** button
  - Type an amount (e.g., "100")
  - Use the up/down arrows to adjust
  - **Optional**: Click "Add Liquidity" to show the confirmation modal with explorer link
  - Close modal

**⚠️ Important**: If The Graph data isn't loading (shows $0), say "We're waiting on The Graph API—normally this shows live liquidity from Uniswap v3 pools"

---

### **[3:00-3:30] IMPLEMENTATION PAGES: Prize Evidence** (30 seconds)

**Visual**: Navigate to **"More"** dropdown → Prize implementation pages

**Script**:
> "Before I wrap up, let me quickly show you how we're using our three main sponsors:
>
> *(Click World badge)* World—we built this as a mini app with **MiniKit SDK**, World ID verification for sybil resistance, and deployed on World Chain.
>
> *(Click LayerZero badge)* LayerZero—we **extended** their OFT contracts with custom APR-checking logic. Our agents only move funds cross-chain when the yield improvement exceeds the threshold.
>
> *(Click CDP badge)* And Coinbase CDP—every agent is a **server wallet** that operates autonomously with x402 authorization. No constant user approvals."

**Actions**:
- Scroll down on homepage to the partner prize badges (🌍 World, ⛓️ LayerZero, 🔵 Coinbase CDP)
- Click **🌍 World** → scroll briefly to show MiniKit code evidence
- Go back, click **⛓️ LayerZero** → scroll to show extended OFT code
- Go back, click **🔵 Coinbase CDP** → scroll to show x402 flow diagram

**⚠️ Time Saver**: If running over 3:30, skip this section and mention it verbally instead

---

### **[3:30-3:50] ABOUT PAGE & CLOSING** (20 seconds)

**Visual**: Navigate to **"About"** page

**Script**:
> "Finally, here's what makes HedgePod different: *(scroll to features)* truly autonomous with x402 authorization, completely gasless with Privy sponsorship, and built with real-time data from Pyth, The Graph, and 1inch—zero mocks, all production-ready.
>
> **HedgePod Agent**: Deposit once. Earn optimally. Everywhere.
>
> Check out the code on GitHub—all open source. Thanks!"

**Actions**:
- Navigate to **"About"** page
- Scroll to **"What Makes Us Different"** section
- Point to key features: "Truly Autonomous", "Completely Gasless", "Real-Time Data"
- Scroll to **"Tech Stack"** badges (show all the integrations)
- Point to **"View on GitHub"** button
- End on the homepage or About page

---

## 🎯 Alternative 2-Minute Version (If Time-Constrained)

**Cut these sections**:
- ❌ Deploy Agent page (just mention it exists)
- ❌ Implementation pages (mention verbally only)
- ❌ About page (end on Swap page)

**Condensed Script**:
1. **Problem** (20s): "DeFi is fragmented, gasless is hard"
2. **Portfolio** (40s): "Here are my agents—they work 24/7"
3. **Swap** (50s): "Real-time data, dynamic fees, actual transactions"
4. **Close** (10s): "Check it out on GitHub"

---

## 🛠️ Technical Backup Answers (For Q&A)

If judges ask technical questions during the demo:

### **"How does cross-chain rebalancing work?"**
> "Agents monitor APRs via Pyth Network on all selected chains. When they detect a 2%+ improvement, they use our **extended LayerZero OFT contract** (AutoYieldToken.sol) to move funds. The OFT has custom `_debit()` logic that blocks transfers to lower-yield chains—not just inherited, fully extended."

### **"Is this real data or mock data?"**
> "100% real. Pyth Hermes API for volatility and price feeds, The Graph for Uniswap v3 pool liquidity and volume, 1inch for routing. If you see $0, it means the API rate limit was hit—but normally it's live data refreshing every 30 seconds."

### **"What makes this autonomous?"**
> "Every agent is a **Coinbase CDP Server Wallet** with x402 authorization. You grant permission once, and the agent can rebalance forever without repeated approvals. It runs on our backend Node.js service 24/7."

### **"Why World App?"**
> "23 million users. Most don't know what MetaMask is. We built with **MiniKit SDK** for native wallet connection, World ID for sybil resistance, and Privy for gasless transactions. No 0x addresses visible—ENS everywhere."

### **"What's the hardest part you built?"**
> "Extending LayerZero's OFT contracts with custom routing logic that respects APR thresholds. Also, integrating Uniswap v4 hooks with real-time Pyth volatility—fees adjust dynamically every 30 seconds based on market conditions."

---

## 📊 Quick Stats to Memorize

- **🌐 8+ Chains**: World Chain, Base, Celo, Polygon, Arbitrum, Optimism, Avalanche, Zircuit
- **💰 $0 Gas Fees**: 100% Privy sponsorship
- **🤖 24/7 Agents**: Coinbase CDP Server Wallets with x402 authorization
- **📊 Real Data**: Pyth Network (volatility), The Graph (liquidity/volume), 1inch (routing)
- **🦄 Uniswap v4**: VolatilityFeeHook.sol adjusts fees (0.1%-0.3%) based on Pyth data
- **⛓️ LayerZero**: Extended OFT contracts with APR-checking logic
- **🌍 World**: MiniKit SDK, World ID verification, deployed on World Chain

---

## ✅ Pre-Demo Checklist

**5 Minutes Before Recording**:
- [ ] Wallet connected with test funds
- [ ] At least 1 agent deployed (or ready to deploy)
- [ ] Tested Swap modal (opens and closes smoothly)
- [ ] Tested Add Liquidity modal (opens and closes smoothly)
- [ ] Checked that The Graph data is loading (not $0)
- [ ] Browser zoom at 100%
- [ ] All unnecessary tabs closed
- [ ] Microphone tested
- [ ] Recording software ready

**During Recording**:
- [ ] Speak clearly and confidently
- [ ] Don't apologize for bugs—just move on
- [ ] Point with cursor to highlight features
- [ ] Keep energy high—this is exciting tech!
- [ ] Stay under 4 minutes (ideally 3-3.5)

**After Recording**:
- [ ] Watch the full video
- [ ] Check audio quality
- [ ] Trim any dead air at start/end
- [ ] Export at 1080p minimum
- [ ] Upload to YouTube (unlisted) for submission

---

## 🎥 Pro Tips for a Great Demo

### **Pacing**
- **30s intro** is crucial—sell the problem fast
- **Don't read the UI**—describe what it does, not what it says
- **Show, don't tell**—click buttons, open modals, trigger actions

### **Storytelling**
- Start with a problem ("DeFi is fragmented")
- Show your solution ("HedgePod automates everything")
- Prove it works ("Here's real data, real transactions")
- End with impact ("Built for 23M World App users")

### **Visuals**
- **Cursor movements matter**—point to key elements
- **Hover effects**—show buttons changing on hover
- **Scroll smoothly**—don't jerk the page around
- **Modals**—open and close them confidently

### **Common Mistakes to Avoid**
- ❌ Spending too long on one page
- ❌ Apologizing for unfinished features
- ❌ Going over 4 minutes
- ❌ Mumbling or speaking too fast
- ❌ Forgetting to show the actual code/contracts
- ❌ Not showing transaction hashes/explorer links

### **Judge Appeal**
- Judges want to see **code that works**
- Show **real on-chain transactions**
- Prove **sponsor integrations are deep** (not surface-level)
- Emphasize **real-world impact** (23M users)
- Be **confident but humble** ("We built X, and we're proud of Y")

---

## 🚀 You've Got This!

Remember: Judges see hundreds of demos. What makes yours stand out is:

1. **It actually works** (live demo, real transactions)
2. **It solves a real problem** (chain fragmentation, gas fees, UX)
3. **It's technically impressive** (extended OFT, dynamic hooks, autonomous agents)
4. **It's beautiful** (Animal Crossing UI, consumer-grade polish)
5. **You're passionate** (this is cool tech, and you know it!)

Good luck! 🦔✨

