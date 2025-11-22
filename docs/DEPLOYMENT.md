# HedgePod Deployment Guide

Complete guide for deploying HedgePod contracts across multiple chains.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
make install
```

### 2. Compile Contracts
```bash
make compile
```

### 3. Deploy to a Network
```bash
# Interactive - choose network
make deploy

# Or deploy to specific network
make deploy-base      # Base Sepolia testnet
make deploy-world     # World Chain
make deploy-celo      # Celo
```

### 4. Verify Contracts
```bash
npx hardhat run scripts/verify/verify.ts --network baseSepolia
```

---

## 📁 Project Structure

```
hedgepod/
├── config/                    # Network configurations (centralized)
│   ├── networks.ts           # All network settings
│   ├── priceIds.ts           # Pyth price feed IDs
│   └── index.ts              # Barrel exports
│
├── scripts/
│   ├── deploy/               # Deployment scripts
│   │   ├── deployer.ts      # ⭐ Main deployment script
│   │   └── deploy-all.js    # Multi-network orchestrator
│   ├── verify/               # Verification scripts
│   │   └── verify.ts        # Contract verification
│   ├── abi/                  # ABI utilities
│   ├── logs/                 # Logging utilities
│   ├── check/                # Balance checking
│   └── faucet/               # Test token minting
│
├── deployments/              # Deployment outputs
│   ├── baseSepolia.json     # Latest deployment per network
│   ├── deployment-*.json     # Historical deployments
│   └── abis/                 # Contract ABIs
│
├── Makefile                  # Common commands
└── README.md                 # Project overview
```

---

## 📝 Main Deployment Script

### `scripts/deploy/deployer.ts`

Your one-stop comprehensive deployment script with:

✅ Colored console output with step-by-step logging  
✅ Automatic ABI saving to `deployments/abis/`  
✅ Timestamped deployment history  
✅ Frontend/backend data export  
✅ Explorer links for all contracts  
✅ Auto-generated verification commands  
✅ Network configuration from `config/networks.ts`  

**Deploys 4 contracts:**
1. **YieldOracle** - Multi-source oracle (Pyth + Chainlink)
2. **AutoYieldToken** - LayerZero OFT with yield routing
3. **HedgePodVault** - Main deposit and rebalancing vault
4. **VolatilityFeeHook** - Uniswap v4 dynamic fee adjustment

**Usage:**
```bash
npx hardhat run scripts/deploy/deployer.ts --network baseSepolia
```

---

## 🌐 Supported Networks

| Network | Network ID | Status | Config |
|---------|-----------|--------|--------|
| Base Sepolia | `baseSepolia` | ✅ Testnet | Fully configured |
| World Chain | `worldchain` | ⚠️ Mainnet | Needs oracle addresses |
| Base | `base` | ✅ Mainnet | Fully configured |
| Celo | `celo` | ✅ Mainnet | Fully configured |
| Polygon | `polygon` | ✅ Mainnet | Fully configured |
| Arbitrum | `arbitrum` | ✅ Mainnet | Fully configured |
| Optimism | `optimism` | ✅ Mainnet | Fully configured |
| Avalanche | `avalanche` | ✅ Mainnet | Fully configured |
| Zircuit | `zircuit` | ⚠️ Testnet | Needs configuration |

**Network configs:** `config/networks.ts`  
**Price IDs:** `config/priceIds.ts`

---

## 🛠️ Common Commands

### Deployment
```bash
make deploy              # Interactive deployment
make deploy-base         # Deploy to Base Sepolia
make deploy-world        # Deploy to World Chain
make deploy-all          # Deploy to ALL networks
```

### Testing
```bash
make test                # Run all tests
make test-coverage       # Coverage report
make test-gas            # Gas usage report
```

### Development
```bash
make compile             # Compile contracts
make clean               # Clean artifacts
make lint                # Lint contracts
```

### Frontend/Backend
```bash
make frontend-dev        # Start frontend
make backend-dev         # Start backend agent
```

---

## 📊 Deployment Output

After deployment, data is saved to:

### 1. Main Deployments
```
deployments/
├── baseSepolia.json              # Latest deployment
├── deployment-baseSepolia-{timestamp}.json  # History
└── abis/
    ├── YieldOracle.json
    ├── AutoYieldToken.json
    ├── HedgePodVault.json
    └── VolatilityFeeHook.json
```

### 2. Frontend Data
```
frontend/lib/data/
└── contracts_data.json    # Imported by frontend
```

### 3. Backend Data
```
backend/src/data/
└── contracts_data.json    # Used by agent
```

---

## 🔍 Contract Verification

### Automatic
The deployer script generates verification commands for you:

```bash
# Check deployments/{network}.json for commands
cat deployments/baseSepolia.json | jq '.verificationCommands'
```

### Manual
```bash
npx hardhat run scripts/verify/verify.ts --network baseSepolia
```

### Individual Contracts
```bash
# YieldOracle
npx hardhat verify --network baseSepolia \
  <address> <pythOracle> <chainlinkOracle>

# AutoYieldToken
npx hardhat verify --network baseSepolia \
  <address> <lzEndpoint> 100

# HedgePodVault
npx hardhat verify --network baseSepolia \
  <address> <depositToken> <autoYieldToken> <pythOracle> \
  <ethPriceId> <usdcPriceId>

# VolatilityFeeHook
npx hardhat verify --network baseSepolia \
  <address> <pythOracle> <poolManager> <priceId>
```

---

## ⚙️ Configuration

### Adding a New Network

1. **Update `config/networks.ts`:**
```typescript
export const NETWORK_CONFIG = {
  // ... existing networks
  newNetwork: {
    name: "New Network",
    explorerUrl: "https://explorer.newnetwork.com",
    pythOracle: "0x...",
    chainlinkOracle: "0x...",
    lzEndpoint: "0x...",
    depositToken: "0x...", // USDC address
  }
};
```

2. **Update `hardhat.config.ts`:**
```typescript
networks: {
  newNetwork: {
    url: process.env.NEW_NETWORK_RPC,
    accounts: [process.env.PRIVATE_KEY],
  }
}
```

3. **Deploy:**
```bash
make deploy
# Enter: newNetwork
```

---

## 🐛 Troubleshooting

### Insufficient Balance
```bash
make check-balance
# Get testnet ETH from faucets
```

### Compilation Errors
```bash
make clean
make compile
```

### Verification Fails
- Wait 1-2 minutes after deployment
- Check API key in `hardhat.config.ts`
- Verify constructor arguments match deployment

### Wrong Network Config
```bash
# Check available networks
cat config/networks.ts | grep "name:"
```

---

## 📚 Documentation

- [Main README](./README.md) - Project overview
- [Scripts README](./scripts/README.md) - Detailed script docs
- [Config README](./config/README.md) - Network configuration
- [Makefile](./Makefile) - All available commands

---

## 🎯 Workflow Examples

### Deploy to Testnet
```bash
# 1. Install and compile
make install
make compile

# 2. Test
make test

# 3. Deploy to Base Sepolia
make deploy-base

# 4. Verify
npx hardhat run scripts/verify/verify.ts --network baseSepolia
```

### Deploy to All Mainnets
```bash
# Deploys to all networks sequentially
make deploy-all
```

### Check Deployment
```bash
# View latest deployment
cat deployments/baseSepolia.json | jq '.'

# Check contracts
cat deployments/baseSepolia.json | jq '.contracts'
```

---

**Built with ❤️ at ETHGlobal Buenos Aires 2025**  
*Eight chains. One app. Zero friction.*

