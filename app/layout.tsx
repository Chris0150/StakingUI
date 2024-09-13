'use client';

import { ReactNode } from 'react';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import useWagmiConfig from './hooks/useWagmiConfig';
import { sepolia } from 'wagmi/chains';

const queryClient = new QueryClient();

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const wagmiConfig = useWagmiConfig();

  return (
    <html lang="en">
      <body>
      <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
              initialChain={sepolia}
              theme={darkTheme({
                accentColor: '#0BEB8A',
                accentColorForeground: 'white',
                borderRadius: 'none',
                fontStack: 'system',
                overlayBlur: 'small',
              })}
              showRecentTransactions
            >
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
