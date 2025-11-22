# 🏆 HedgePod Agent - Partner Prize Submission

**Project**: HedgePod Agent  
**Category**: DeFi  
**Demo**: https://hedgepod.app  
**GitHub**: https://github.com/mollybeach/hedgepod  

---

## 🎯 Official Partner Prize Selections (Max 3)

### 1. LayerZero - $20,000

**Why we're applicable for this prize:**

HedgePod uses LayerZero as the core infrastructure for cross-chain token transfers and agent rebalancing. We've extended the OFT (Omnichain Fungible Token) standard to create AutoYieldToken, which includes custom yield-aware routing logic. Our agents autonomously move user funds across 8+ chains via LayerZero to optimize APR, making it a critical component of our chain abstraction strategy. This is not a superficial integration - LayerZero is the backbone that enables true autonomous cross-chain yield optimization.

**Links to code:**

- **AutoYieldToken OFT Extension**: https://github.com/mollybeach/hedgepod/blob/master/contracts/AutoYieldToken.sol
- **Cross-chain rebalancing logic**: https://github.com/mollybeach/hedgepod/blob/master/contracts/HedgePodVault.sol#L120-L180
- **Backend LayerZero integration**: https://github.com/mollybeach/hedgepod/blob/master/backend/src/agent/rebalancer.ts
- **Network configuration**: https://github.com/mollybeach/hedgepod/blob/master/config/networks.ts

**How easy is it to use the API / Protocol?**  
**Rating: 8/10**

**Additional feedback:**

LayerZero's OFT standard is well-documented and the endpoint interface is clean. The testnet faucet worked flawlessly, and Layerscan was invaluable for debugging cross-chain transactions. Minor pain point: adapter params encoding for custom gas limits could use better TypeScript type definitions. Overall, excellent developer experience - we were able to implement custom yield-aware routing on top of the base OFT in just a few hours.

---

### 2. World - $20,000

**Why we're applicable for this prize:**

HedgePod is built specifically as a World mini app to make DeFi accessible to the 23 million World App users. We integrate World ID for sybil-resistant agent deployment and use MiniKit SDK for all critical user flows (connect, transaction, payment commands). Our UX is designed for non-crypto users - no technical jargon, one-click operations, and human-readable ENS names throughout. The app is deployed on World Chain with gasless transactions, making it truly frictionless for mainstream adoption. This directly addresses World's mission of bringing financial tools to everyone.

**Links to code:**

- **World ID verification**: https://github.com/mollybeach/hedgepod/blob/master/contracts/HedgePodVault.sol#L200-L215
- **MiniKit SDK integration**: https://github.com/mollybeach/hedgepod/blob/master/frontend/components/Providers.tsx
- **World Chain deployment config**: https://github.com/mollybeach/hedgepod/blob/master/config/networks.ts#L10-L20
- **Consumer-grade UX**: https://github.com/mollybeach/hedgepod/blob/master/frontend/app/page.tsx

**How easy is it to use the API / Protocol?**  
**Rating: 9/10**

**Additional feedback:**

MiniKit SDK is extremely developer-friendly with excellent TypeScript support and clear documentation. World ID integration was straightforward, and the testnet faucet made testing seamless. The SDK's command structure (connect, transaction, payment) is intuitive and maps well to real-world user flows. Only minor suggestion: more examples of gasless transaction patterns would be helpful. Overall, best-in-class developer experience for building consumer crypto apps.

---

### 3. Coinbase Developer Platform - $20,000

**Why we're applicable for this prize:**

HedgePod leverages Coinbase CDP's Server Wallets to create truly autonomous AI agents that operate 24/7 without user intervention. We use x402 authorization to grant agents recurring permissions, eliminating the need for constant user approvals while maintaining security. CDP's Trade API powers our swap execution, and the wallet infrastructure ensures agents can operate independently across multiple chains. This enables our core value proposition: set-it-and-forget-it yield optimization. CDP is essential for agent autonomy - without it, our agents couldn't function.

**Links to code:**

- **CDP Server Wallet setup**: https://github.com/mollybeach/hedgepod/blob/master/backend/src/agent/wallet.ts
- **x402 authorization flow**: https://github.com/mollybeach/hedgepod/blob/master/contracts/HedgePodVault.sol#L250-L290
- **CDP Trade API integration**: https://github.com/mollybeach/hedgepod/blob/master/backend/src/services/cdp.service.ts
- **Agent rebalancing logic**: https://github.com/mollybeach/hedgepod/blob/master/backend/src/agent/rebalancer.ts

**How easy is it to use the API / Protocol?**  
**Rating: 7/10**

**Additional feedback:**

CDP SDK is powerful and well-structured. Server Wallets are easy to create and manage, and the x402 authorization pattern is elegant. Trade API documentation is comprehensive. However, the learning curve for x402 is steeper than expected - more code examples and patterns for recurring authorization would help. Also, local development/testing without hitting rate limits can be tricky. Despite these minor issues, CDP unlocks agent autonomy that's impossible with traditional wallets.

---

## 🔧 Other Partners' Technologies Used

**Select all that apply:**

- ✅ **Pyth Network** - Real-time price feeds and APR monitoring (core to agent decision-making)
- ✅ **1inch APIs** - Optimal swap routing and cross-chain liquidity checks
- ✅ **Uniswap v4 Hooks** - Dynamic fee adjustment based on market volatility (VolatilityFeeHook)
- ✅ **Chainlink** - Fallback oracle (Price Feeds) and redundant cross-chain messaging (CCIP)
- ✅ **Privy** - Gas sponsorship for completely gasless user experience
- ✅ **ENS** - Human-readable names throughout the UI (no 0x addresses visible)
- ✅ **Hardhat 3** - Smart contract testing framework (new Solidity-based tests)
- ✅ **Zircuit** - Deployment target chain with MultiBaas integration
- ✅ **Octav** - Portfolio dashboard widget for multi-chain position tracking

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

