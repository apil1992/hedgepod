# 🏆 HedgePod Agent - Partner Prize Submission

> **All form fields are in copyable code blocks - just click to copy!**

**Project**: HedgePod Agent  
**Category**: DeFi  
**Demo**: https://hedgepod.app  
**GitHub**: https://github.com/mollybeach/hedgepod  

## 📋 Quick Navigation

- [LayerZero Prize](#1️⃣-layerzero---20000) - Rating: 8/10
- [World Prize](#2️⃣-world---20000) - Rating: 9/10  
- [Coinbase CDP Prize](#3️⃣-coinbase-developer-platform---20000) - Rating: 7/10
- [Other Technologies Used](#-other-partners-technologies-used) - 9 integrations

---

## 🎯 Official Partner Prize Selections (Max 3)

---

### 1️⃣ LayerZero - $20,000

#### 📝 Why we're applicable (copy this):

```
HedgePod uses LayerZero as the core infrastructure for cross-chain token transfers and agent rebalancing. We've extended the OFT (Omnichain Fungible Token) standard to create AutoYieldToken, which includes custom yield-aware routing logic. Our agents autonomously move user funds across 8+ chains via LayerZero to optimize APR, making it a critical component of our chain abstraction strategy. This is not a superficial integration - LayerZero is the backbone that enables true autonomous cross-chain yield optimization.
```

#### 🔗 Code link #1 (AutoYieldToken OFT Extension):

```
https://github.com/mollybeach/hedgepod/blob/master/contracts/AutoYieldToken.sol
```

#### 🔗 Code link #2 (Cross-chain rebalancing logic):

```
https://github.com/mollybeach/hedgepod/blob/master/contracts/HedgePodVault.sol#L120-L180
```

#### 🔗 Code link #3 (Backend LayerZero integration):

```
https://github.com/mollybeach/hedgepod/blob/master/backend/src/agent/rebalancer.ts
```

#### 🔗 Code link #4 (Network configuration):

```
https://github.com/mollybeach/hedgepod/blob/master/config/networks.ts
```

#### ⭐ Ease of use rating:

```
8
```

#### 💬 Additional feedback (copy this):

```
LayerZero's OFT standard is well-documented and the endpoint interface is clean. The testnet faucet worked flawlessly, and Layerscan was invaluable for debugging cross-chain transactions. Minor pain point: adapter params encoding for custom gas limits could use better TypeScript type definitions. Overall, excellent developer experience - we were able to implement custom yield-aware routing on top of the base OFT in just a few hours.
```

---

### 2️⃣ World - $20,000

#### 📝 Why we're applicable (copy this):

```
HedgePod is built specifically as a World mini app to make DeFi accessible to the 23 million World App users. We integrate World ID for sybil-resistant agent deployment and use MiniKit SDK for all critical user flows (connect, transaction, payment commands). Our UX is designed for non-crypto users - no technical jargon, one-click operations, and human-readable ENS names throughout. The app is deployed on World Chain with gasless transactions, making it truly frictionless for mainstream adoption. This directly addresses World's mission of bringing financial tools to everyone.
```

#### 🔗 Code link #1 (World ID verification):

```
https://github.com/mollybeach/hedgepod/blob/master/contracts/HedgePodVault.sol#L200-L215
```

#### 🔗 Code link #2 (MiniKit SDK integration):

```
https://github.com/mollybeach/hedgepod/blob/master/frontend/components/Providers.tsx
```

#### 🔗 Code link #3 (World Chain deployment config):

```
https://github.com/mollybeach/hedgepod/blob/master/config/networks.ts#L10-L20
```

#### 🔗 Code link #4 (Consumer-grade UX):

```
https://github.com/mollybeach/hedgepod/blob/master/frontend/app/page.tsx
```

#### ⭐ Ease of use rating:

```
9
```

#### 💬 Additional feedback (copy this):

```
MiniKit SDK is extremely developer-friendly with excellent TypeScript support and clear documentation. World ID integration was straightforward, and the testnet faucet made testing seamless. The SDK's command structure (connect, transaction, payment) is intuitive and maps well to real-world user flows. Only minor suggestion: more examples of gasless transaction patterns would be helpful. Overall, best-in-class developer experience for building consumer crypto apps.
```

---

### 3️⃣ Coinbase Developer Platform - $20,000

#### 📝 Why we're applicable (copy this):

```
HedgePod leverages Coinbase CDP's Server Wallets to create truly autonomous AI agents that operate 24/7 without user intervention. We use x402 authorization to grant agents recurring permissions, eliminating the need for constant user approvals while maintaining security. CDP's Trade API powers our swap execution, and the wallet infrastructure ensures agents can operate independently across multiple chains. This enables our core value proposition: set-it-and-forget-it yield optimization. CDP is essential for agent autonomy - without it, our agents couldn't function.
```

#### 🔗 Code link #1 (CDP Server Wallet setup):

```
https://github.com/mollybeach/hedgepod/blob/master/backend/src/agent/wallet.ts
```

#### 🔗 Code link #2 (x402 authorization flow):

```
https://github.com/mollybeach/hedgepod/blob/master/contracts/HedgePodVault.sol#L250-L290
```

#### 🔗 Code link #3 (CDP Trade API integration):

```
https://github.com/mollybeach/hedgepod/blob/master/backend/src/services/cdp.service.ts
```

#### 🔗 Code link #4 (Agent rebalancing logic):

```
https://github.com/mollybeach/hedgepod/blob/master/backend/src/agent/rebalancer.ts
```

#### ⭐ Ease of use rating:

```
7
```

#### 💬 Additional feedback (copy this):

```
CDP SDK is powerful and well-structured. Server Wallets are easy to create and manage, and the x402 authorization pattern is elegant. Trade API documentation is comprehensive. However, the learning curve for x402 is steeper than expected - more code examples and patterns for recurring authorization would help. Also, local development/testing without hitting rate limits can be tricky. Despite these minor issues, CDP unlocks agent autonomy that's impossible with traditional wallets.
```

---

---

## 🔧 Other Partners' Technologies Used

**Check these boxes in the form:**

```
☑ Pyth Network
☑ 1inch
☑ Uniswap v4
☑ Chainlink
☑ Privy
☑ ENS
☑ Hardhat
☑ Zircuit
☑ Octav
```

**How we use each (for reference):**

- **Pyth Network** - Real-time price feeds and APR monitoring (core to agent decision-making)
- **1inch APIs** - Optimal swap routing and cross-chain liquidity checks
- **Uniswap v4 Hooks** - Dynamic fee adjustment based on market volatility (VolatilityFeeHook)
- **Chainlink** - Fallback oracle (Price Feeds) and redundant cross-chain messaging (CCIP)
- **Privy** - Gas sponsorship for completely gasless user experience
- **ENS** - Human-readable names throughout the UI (no 0x addresses visible)
- **Hardhat 3** - Smart contract testing framework (new Solidity-based tests)
- **Zircuit** - Deployment target chain with MultiBaas integration
- **Octav** - Portfolio dashboard widget for multi-chain position tracking

---

## 📊 Integration Summary

| Technology | Integration Type | Key Feature Enabled |
|------------|------------------|---------------------|
| **LayerZero** | Core Infrastructure | Cross-chain token transfers |
| **World** | Frontend Platform | 23M user distribution |
| **Coinbase CDP** | Backend Infrastructure | Autonomous agent wallets |
| Pyth Network | Data Layer | Real-time APR monitoring |
| 1inch | Swap Layer | Optimal trade execution |
| Uniswap v4 | DeFi Protocol | Dynamic fee pools |
| Chainlink | Redundancy Layer | Backup oracle + messaging |
| Privy | UX Layer | Gasless transactions |
| ENS | Identity Layer | Human-readable addresses |
| Hardhat 3 | Dev Tools | Contract testing |
| Zircuit | Deployment | Additional chain support |
| Octav | Analytics | Portfolio visualization |

---

## 🎥 Demo Video Timestamps

**LayerZero Demo**: 0:45 - 1:15 (Cross-chain rebalance)  
**World Mini App**: 0:00 - 0:30 (One-click onboarding)  
**CDP Agent**: 1:15 - 2:00 (Autonomous operation)  

---

## 📞 Contact During Judging

- **Email**: mollybeach@hedgepod.app
- **Discord**: Join at https://discord.com/invite/5C7yYrsR
- **Telegram**: https://t.me/hedgepod
- **GitHub**: https://github.com/mollybeach/hedgepod

---

## ✅ Checklist

- [x] Project deployed and accessible at https://hedgepod.app
- [x] Smart contracts deployed to World Chain, Base, Celo, Zircuit, Polygon, Arbitrum, Optimism, Avalanche
- [x] All contracts verified on block explorers
- [x] Demo video uploaded (4 minutes)
- [x] GitHub repository public with comprehensive README
- [x] All 3 partner integrations are core (not superficial)
- [x] Working prototype with real cross-chain transactions
- [x] Code is well-documented and tested
- [x] Feedback provided for all 3 partners

---

**Built with ❤️ at ETHGlobal Buenos Aires 2025**  
**🦔 Making DeFi accessible for everyone!**

