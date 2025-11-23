/**
 * Wagmi Configuration for HedgePod Multi-Chain Support
 * Supports: World Chain, Base, Celo, Zircuit, Polygon, Arbitrum, Optimism, Avalanche
 */

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  base,
  celo,
  polygon,
  arbitrum,
  optimism,
  avalanche,
} from 'wagmi/chains';
import type { Chain } from 'wagmi/chains';

// Custom chain: World Chain (with custom logo)
export const worldchain: Chain = {
  id: 480,
  name: 'World Chain',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://worldchain-mainnet.g.alchemy.com/public'] },
    public: { http: ['https://worldchain-mainnet.g.alchemy.com/public'] },
  },
  blockExplorers: {
    default: { name: 'World Chain Explorer', url: 'https://worldchain-mainnet.explorer.alchemy.com' },
  },
  iconUrl: '/worldchain_logo.png',
  iconBackground: '#ffffff',
};

// Custom chain: Zircuit (not in wagmi by default)
export const zircuit = {
  id: 48899,
  name: 'Zircuit Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://zircuit1-testnet.p2pify.com'] },
    public: { http: ['https://zircuit1-testnet.p2pify.com'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.testnet.zircuit.com' },
  },
  testnet: true,
} as const;

export const config = getDefaultConfig({
  appName: 'HedgePod Agent',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [
    worldchain, // Custom World Chain with logo
    base,
    celo,
    zircuit as any,
    polygon,
    arbitrum,
    optimism,
    avalanche,
  ],
  ssr: true, // Enable for Next.js App Router
});

