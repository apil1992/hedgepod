# HedgePod Configuration

Centralized configuration files for the entire HedgePod project.

## 📁 Files

### `networks.ts`
Network-specific configuration for all supported chains:
- Network names and explorer URLs
- Oracle addresses (Pyth, Chainlink)
- LayerZero endpoints
- Deposit token addresses (USDC)

**Usage in Scripts:**
```typescript
import { getNetworkConfig, NETWORK_CONFIG } from "../config";

// Get config for a specific network
const config = getNetworkConfig("baseSepolia");
```

**Usage in Frontend:**
```typescript
import { NETWORK_CONFIG } from "../config/networks";

const baseConfig = NETWORK_CONFIG.base;
```

### `priceIds.ts`
Pyth Network price feed identifiers for various assets.

**Usage:**
```typescript
import { PRICE_IDS, getPriceId } from "../config/priceIds";

// Use predefined IDs
const ethUsdId = PRICE_IDS.ETH_USD;

// Or get dynamically
const btcUsdId = getPriceId("BTC", "USD");
```

### `index.ts`
Barrel export file for clean imports.

**Usage:**
```typescript
// Import everything from one place
import { getNetworkConfig, PRICE_IDS } from "../config";
```

## 🔧 Adding New Networks

1. **Add to `networks.ts`:**
```typescript
export const NETWORK_CONFIG: Record<string, NetworkConfig> = {
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
npx hardhat run scripts/deploy-new.ts --network newNetwork
```

## 🌐 Network Reference

### LayerZero Endpoints
- LayerZero V2 Endpoint (Most chains): `0x1a44076050125825900e736c501f859c50fE728c`
- Base Sepolia V2: `0x6EDCE65403992e310A62460808c4b910D972f10f`

Find more at: https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts

### Pyth Oracle Addresses
- Base: `0x8250f4aF4B972684F7b336503E2D6dFeDeB1487a`
- Base Sepolia: `0xA2aa501b19aff244D90cc15a4Cf739D2725B5729`
- Most EVM chains: `0xff1a0f4744e8582DF1aE09D5611b887B6a12925C`
- Avalanche: `0x4305FB66699C3B2702D4d05CF36551390A4c69C6`

Find more at: https://pyth.network/developers/price-feed-ids

### USDC Addresses
- **Base**: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- **Base Sepolia**: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`
- **Polygon**: `0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359` (Native USDC)
- **Arbitrum**: `0xaf88d065e77c8cC2239327C5EDb3A432268e5831` (Native USDC)
- **Optimism**: `0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85` (Native USDC)
- **Celo**: `0xcebA9300f2b948710d2653dD7B07f33A8B32118C`
- **Avalanche**: `0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E`

## 🔄 Usage Across Project

This config folder is designed to be used across all parts of the HedgePod project:

- **Scripts**: Deployment, testing, verification
- **Frontend**: Network switching, contract addresses
- **Backend**: Agent configuration, network monitoring
- **Tests**: Network-specific test configurations

## 📚 Resources

- [LayerZero Docs](https://docs.layerzero.network/)
- [Pyth Network](https://pyth.network/developers)
- [Circle USDC](https://developers.circle.com/stablecoins/docs/usdc-on-main-networks)

