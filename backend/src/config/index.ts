import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export const config = {
  // Coinbase CDP
  cdp: {
    apiKeyName: process.env.CDP_API_KEY || "", //process.env.CDP_API_KEY || "",
    privateKey: process.env.CDP_API_SECRET || "",
  },

  // Pyth
  pyth: {
    hermesUrl: process.env.PYTH_HERMES_URL || "https://hermes.pyth.network",
    priceIds: {
      ethUsd: "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
      usdcUsd: "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a",
      btcUsd: "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
    },
  },

  // 1inch
  oneInch: {
    apiKey: process.env.ONEINCH_API_KEY || "",
    baseUrl: "https://api.1inch.dev",
  },

  // RPC Endpoints
  rpc: {
    worldchain: process.env.WORLD_CHAIN_RPC || "",
    base: process.env.BASE_RPC || "",
    celo: process.env.CELO_RPC || "",
    zircuit: process.env.ZIRCUIT_RPC || "",
    polygon: process.env.POLYGON_RPC || "",
    arbitrum: process.env.ARBITRUM_RPC || "",
    optimism: process.env.OPTIMISM_RPC || "",
    avalanche: process.env.AVALANCHE_RPC || "",
  },

  // Contract Addresses (loaded from deployments)
  contracts: {
    worldchain: {
      vault: "",
      token: "",
      oracle: "",
    },
    base: {
      vault: "",
      token: "",
      oracle: "",
    },
    // ... other chains
  },

  // Agent Configuration
  agent: {
    rebalanceInterval: 1 * 60 * 60 * 1000, // 1 hour
    minAPRDelta: 100, // 1% minimum APR improvement
    maxSlippage: 100, // 1% max slippage
    monitorInterval: 5 * 60 * 1000, // 5 minutes
  },

  // Chain IDs
  chainIds: {
    worldchain: 480,
    base: 8453,
    baseSepolia: 84532,
    celo: 42220,
    celoAlfajores: 44787,
    zircuit: 48899,
    polygon: 137,
    polygonAmoy: 80002,
    arbitrum: 42161,
    optimism: 10,
    avalanche: 43114,
  },
};

export default config;

