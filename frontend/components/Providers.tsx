/**
 * Web3 Providers Wrapper
 * RainbowKit + Wagmi + React Query
 */

'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { config } from '@/lib/wagmi';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#e2547f', // HedgePod pink
            accentColorForeground: 'white',
            borderRadius: 'large',
            fontStack: 'system',
          })}
          appInfo={{
            appName: 'HedgePod Agent',
            learnMoreUrl: 'https://hedgepod.app/about',
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

