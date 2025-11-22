# 🚀 HedgePod Deployment Quickstart

## 📋 Prerequisites

- ✅ Node.js & npm installed
- ✅ Contracts compiled
- ✅ Deployer wallet with funds on target chains

---

## Step 1: Create `.env` File

Create a `.env` file in the **root** of the `hedgepod/` directory:

```bash
# From hedgepod/ directory
touch .env
```

Add the following to your `.env` file:

```bash
# =====================================================
# DEPLOYER WALLET (REQUIRED)
# =====================================================
# Your deployer private key (must have funds on target chains)
# Get from MetaMask: Account Details -> Export Private Key
# ⚠️ NEVER commit this file to git!
DEPLOYER_PRIVATE_KEY=your_private_key_here

# =====================================================
# RPC ENDPOINTS
# =====================================================
# Get free API keys from: https://www.alchemy.com/

# Testnets (recommended for first deployment)
BASE_SEPOLIA_RPC=https://base-sepolia.g.alchemy.com/v2/YOUR_API_KEY
CELO_ALFAJORES_RPC=https://alfajores-forno.celo-testnet.org
POLYGON_AMOY_RPC=https://rpc-amoy.polygon.technology
ZIRCUIT_RPC=https://zircuit1-testnet.p2pify.com

# Optional: Block Explorer API Keys (for verification)
BASESCAN_API_KEY=your_basescan_api_key
POLYGONSCAN_API_KEY=your_polygonscan_api_key
```

---

## Step 2: Get Testnet Funds 🪙

You need testnet ETH/tokens on the chains you want to deploy to:

### **Base Sepolia** (Recommended first deployment)
- **Faucet**: https://www.alchemy.com/faucets/base-sepolia
- **Chain ID**: 84532
- **Need**: ~0.05 ETH for deployment

### **Celo Alfajores**
- **Faucet**: https://faucet.celo.org/alfajores
- **Chain ID**: 44787
- **Need**: ~0.5 CELO for deployment

### **Polygon Amoy**
- **Faucet**: https://faucet.polygon.technology/
- **Chain ID**: 80002
- **Need**: ~0.1 MATIC for deployment

### **Zircuit Testnet**
- **Faucet**: https://zircuit.com/faucet
- **Chain ID**: 48899
- **Need**: ~0.05 ETH for deployment

**Pro Tip**: Use https://faucet.quicknode.com/ for multi-chain faucets!

---

## Step 3: Compile Contracts 🔨

```bash
# From hedgepod/ directory
npx hardhat compile
```

Expected output:
```
Compiled 12 Solidity files successfully
```

---

## Step 4: Deploy to Testnet 🚀

### **Option A: Deploy to Single Chain**

```bash
# Deploy to Base Sepolia (recommended first)
npx hardhat run scripts/deploy/deployer.ts --network baseSepolia

# Or deploy to other testnets:
npx hardhat run scripts/deploy/deployer.ts --network celoAlfajores
npx hardhat run scripts/deploy/deployer.ts --network polygonAmoy
npx hardhat run scripts/deploy/deployer.ts --network zircuit
```

### **Option B: Deploy to All Chains** (Advanced)

```bash
# Deploy to all configured testnets
node scripts/deploy/deploy-all.js
```

### **Option C: Use Makefile** (Easiest)

```bash
# Deploy to Base Sepolia
make deploy-base-sepolia

# Deploy to Celo Alfajores
make deploy-celo-alfajores

# Deploy to Polygon Amoy
make deploy-polygon-amoy

# Deploy to Zircuit
make deploy-zircuit

# Deploy to ALL chains
make deploy-all
```

---

## Step 5: Verify Deployment ✅

After deployment, you should see:

```
============================================================
  HedgePod Deployment Complete
============================================================

🎯 Network: baseSepolia (84532)
⏰ Deployed at: 2025-01-17T...

📦 Contract Addresses:
YieldOracle: 0x...
AutoYieldToken: 0x...
HedgePodVault: 0x...
VolatilityFeeHook: 0x...

🔗 Block Explorer Links:
YieldOracle: https://sepolia.basescan.org/address/0x...
AutoYieldToken: https://sepolia.basescan.org/address/0x...
HedgePodVault: https://sepolia.basescan.org/address/0x...
VolatilityFeeHook: https://sepolia.basescan.org/address/0x...

💾 Deployment data saved: deployments/baseSepolia.json
📊 Deployment history saved: deployments/deployment-baseSepolia-1234567890.json
💾 ABI saved: deployments/abis/...

✅ Deployment Complete!
```

---

## Step 6: Verify Contracts on Block Explorer 🔍

After deployment, verify your contracts:

```bash
# Verify on Base Sepolia
make verify-base-sepolia

# Or manually:
npx hardhat run scripts/verify/verify.ts --network baseSepolia
```

This will verify all deployed contracts on BaseScan, making them readable in the block explorer.

---

## Step 7: Update Frontend with Contract Addresses 🎨

Your deployment automatically saves contract addresses to:
```
frontend/lib/data/contracts_data.json
```

This file is automatically used by your frontend to interact with the contracts!

---

## 📂 Deployment Artifacts

After deployment, you'll find:

```
hedgepod/
├── deployments/
│   ├── baseSepolia.json           # Latest deployment on Base Sepolia
│   ├── celoAlfajores.json         # Latest deployment on Celo Alfajores
│   ├── polygonAmoy.json           # Latest deployment on Polygon Amoy
│   ├── zircuit.json               # Latest deployment on Zircuit
│   ├── deployment-baseSepolia-1234567890.json  # Timestamped history
│   └── abis/
│       ├── YieldOracle.json
│       ├── AutoYieldToken.json
│       ├── HedgePodVault.json
│       └── VolatilityFeeHook.json
└── frontend/
    └── lib/
        └── data/
            └── contracts_data.json  # Frontend-ready contract data
```

---

## 🐛 Troubleshooting

### **Error: "Invalid private key"**
- Check that `DEPLOYER_PRIVATE_KEY` in `.env` is correct
- Should start with `0x` (if not, add it)
- Get from MetaMask: Account Details → Export Private Key

### **Error: "Insufficient funds"**
- Your deployer wallet needs testnet ETH/tokens
- Use faucets listed in Step 2 above
- Check your balance: `make balance-check`

### **Error: "Network not configured"**
- Ensure `.env` file has the correct RPC URL for the network
- Check `hardhat.config.ts` for network configuration

### **Error: "Contract deployment failed"**
- Check that contracts compile: `npx hardhat compile`
- Look for Solidity errors in compilation output
- Ensure all dependencies are installed: `npm install`

### **Error: "ECONNREFUSED" or "Network timeout"**
- RPC endpoint might be down or rate-limited
- Get a free Alchemy API key: https://www.alchemy.com/
- Update RPC URL in `.env` file

---

## 🎯 Recommended Deployment Order

For ETHGlobal Buenos Aires submission:

1. **Start Simple**: Deploy to **Base Sepolia** first (easiest, best docs)
2. **Add Chains**: Deploy to **Celo Alfajores** (World Chain integration)
3. **Multi-Chain**: Deploy to **Polygon Amoy** + **Zircuit** (show cross-chain)
4. **Go Live**: After testing, deploy to mainnets

---

## 🚨 Security Reminders

- ✅ **NEVER** commit `.env` file to git (it's in `.gitignore`)
- ✅ Use a **separate deployer wallet** (not your main wallet)
- ✅ Fund deployer wallet with **only what you need** for deployment
- ✅ Keep private keys **secure** and **encrypted**
- ✅ Test on **testnets** before mainnet deployment

---

## 📞 Need Help?

- **Hardhat Docs**: https://hardhat.org/hardhat-runner/docs/getting-started
- **Base Docs**: https://docs.base.org/
- **Celo Docs**: https://docs.celo.org/
- **Polygon Docs**: https://docs.polygon.technology/
- **ETHGlobal Discord**: Ask in #help channel

---

## 🎉 You're Ready!

Once deployed, your contracts will be live on testnets and ready to integrate with your frontend!

**Next Steps**:
1. ✅ Deploy contracts
2. ✅ Verify on block explorers
3. ✅ Test wallet connection with deployed contracts
4. ✅ Submit to ETHGlobal with live demo! 🦔

**Happy deploying!** 🚀

