# 🦔 HedgePod Agent - World Booth Pitch

## 🎯 **Quick Pitch (30 seconds)**

**"Hey! I'm Molly, building HedgePod Agent - a World mini app that turns your 23M users into hedge fund managers."**

**The Problem**: Your average World App user has no idea what "bridging" or "chain selection" means. They just want their money to grow.

**Our Solution**: Deposit once. AI agents automatically hunt for the best yields across 8+ chains and rebalance for you. Completely gasless. Completely chain-abstracted. Just "deposit USDC, watch number go up."

**Why World?**: Full MiniKit SDK integration (not just IDKit!), World ID for sybil-resistance, 19-language support, and designed specifically for the 23M users who'll never touch MetaMask.

**Live Now**: [hedgepod.app](https://hedgepod.app) - Deployed on World Chain mainnet & testnet!

---

## 🌟 **Why This Matters for World**

### **1. Onboarding 23M Non-Crypto Users to DeFi**
- Most World users have never used DeFi because it's too complex
- HedgePod abstracts away chains, gas, bridges—just "set it and forget it"
- First DeFi experience feels like a savings account, not a blockchain maze

### **2. World ID = Built-In Sybil Resistance**
- Every agent deployment requires World ID verification
- Prevents bot farms from gaming yield strategies
- Proof-of-personhood = fair access to optimal yields

### **3. True Chain Abstraction**
- Users deposit on World Chain (home chain)
- Agent automatically moves funds to Base, Polygon, Arbitrum, etc. for best APR
- Returns profits back to World Chain
- Users never know they left World Chain

### **4. Built for 23M Users**
- **19 languages** (all World-supported locales)
- **Gasless UX** (Privy gas sponsorship)
- **Human-readable addresses** (ENS integration)
- **Mobile-first design** (World mini app optimized)

---

## 🔧 **World-Specific Integrations**

✅ **World ID (Orb-level verification)**
- Integrated into agent deployment flow
- Zero-knowledge proof verification
- No PII stored, just humanity verified

✅ **World Chain (Mainnet + Sepolia)**
- Primary deposit/withdrawal chain
- All 4 HedgePod contracts deployed to World Chain
- Custom network config in wagmi

✅ **Multi-Language (19 locales)**
- All World-supported languages
- Full translations: UI, docs, localization files
- See: `docs/LOCALISATIONS.md`

✅ **World Mini App Ready**
- Optimized for World App browser
- Mobile-responsive Animal Crossing-themed UI
- Social preview images (1200x630 for World App cards)

---

## 📊 **Live Demo**

**🚀 [hedgepod.app](https://hedgepod.app)**

**What to test:**
1. **Deploy Agent** → World ID verification → Agent created
2. **Portfolio Page** → See your agents and active chains
3. **View History** → Click "Run Rebalance Now" → Watch autonomous rebalancing
4. **Swap Tokens** → Uniswap v4 integration with dynamic fees

**GitHub**: [github.com/mollybeach/hedgepod](https://github.com/mollybeach/hedgepod)

---

## ❓ **Questions for World Team**

### **Technical Questions:**

1. **World ID Integration Best Practices**:
   - Currently using IDKit widget with Orb-level verification
   - Should we also verify on-chain in smart contracts for additional security?
   - Best practices for storing/checking verification status long-term?
   - Any plans for recurring verification (e.g., agents that run for months/years)?

2. **World Mini App Submission**:
   - Ready to submit to World App store
   - What's the review timeline for hackathon projects?
   - Any specific requirements beyond the standard metadata?
   - Do you prioritize DeFi apps or specific categories for featuring?

3. **World Chain Performance**:
   - Deployed to both World Chain mainnet and Sepolia testnet
   - Any World Chain-specific gas optimizations we should know about?
   - Oracle support: Does World Chain have recommended oracle providers beyond Pyth?
   - Best practices for handling World Chain in multi-chain apps?

4. **MiniKit SDK Advanced Features**:
   - Currently using wallet auth, SIWE, and transaction commands
   - Planning to add payment commands for on-ramp integration
   - Any upcoming MiniKit features that would benefit DeFi use cases?
   - Best practices for error handling when MiniKit is not installed?

5. **Partnership Opportunities**:
   - Competing for the $20K World Best Mini App Prize at ETHGlobal
   - Would love to feature HedgePod in World App for the 23M users
   - Open to collaboration on educational content about DeFi for your user base
   - Feedback from your team would be invaluable for improving consumer UX!

---

## 🎁 **What We're Building For World Users**

### **Phase 1 (✅ COMPLETE - ETHGlobal Submission)**:
- ✅ Full MiniKit SDK integration (MiniKitProvider, wallet auth, SIWE, transactions)
- ✅ World ID verification (Orb-level, backend-verified)
- ✅ World Chain deployment (mainnet + testnet, all contracts)
- ✅ 19-language support (all World locales)
- ✅ Autonomous rebalancing agents (24/7 operation)
- ✅ Cross-chain via LayerZero OFT (8 chains)
- ✅ Uniswap v4 + 1inch + Pyth + The Graph integration
- ✅ Gasless transactions (Privy sponsorship)
- ✅ Consumer-grade UX (Animal Crossing theme, ENS everywhere)

### **Phase 2 (Post-Hackathon)**:
- 🔄 World App store submission
- 🔄 World Chain mainnet deployment
- 🔄 Referral system (World ID-gated)
- 🔄 Social features (share yields with World friends)
- 🔄 On-ramp integration (buy USDC with fiat)

### **Phase 3 (Vision)**:
- 🎯 "Set-and-forget" savings for 23M World users
- 🎯 First DeFi experience that doesn't feel like DeFi
- 🎯 Prove that chain abstraction + AI agents = mainstream adoption
- 🎯 Become the #1 World mini app for passive income

---

## 🔥 **Why World Users Will Love This**

**Traditional DeFi:**
- "Connect wallet to Base"
- "Bridge USDC from Ethereum"
- "Approve token spending"
- "Pay gas fees"
- "Monitor APRs manually"
- "Migrate funds when rates change"

**HedgePod on World:**
- "Verify you're human" ✅
- "Deposit USDC" ✅
- "Watch your money grow" ✅
- (Everything else happens automatically)

---

## 📞 **Contact**

**Molly Beach**
- 📧 mollybeach@hedgepod.app
- 🐦 [@hedgepod](https://x.com/hedgepod)
- 💻 [github.com/mollybeach](https://github.com/mollybeach)
- 🌐 [hedgepod.app](https://hedgepod.app)

**Looking forward to your feedback and hopefully winning the World Best Mini App Prize! 🙏**

---

## 📸 **Screenshot for Context**

*(Show them the app on your phone)*

**Key screens to demo:**
1. **Home Page**: "Deploy Your First Agent" CTA
2. **World ID Verification**: Live verification flow
3. **Portfolio Page**: Agent cards with active chains
4. **History Page**: "Run Rebalance Now" → Instant rebalancing
5. **Network Switcher**: World Chain logo in the network modal

**What makes it special:**
- 🎨 Animal Crossing-themed UI (friendly, not intimidating)
- 🌸 Cherry blossom sidebar (World App aesthetic)
- 🦔 HedgePod mascot (cute, memorable)
- 🌍 World Chain front and center

---

**Thanks for building World Chain and making DeFi accessible to 23M people! Let's make yield farming as easy as a savings account. 🦔💰**

