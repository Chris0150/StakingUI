import '@rainbow-me/rainbowkit/styles.css';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, binanceWallet, coin98Wallet, phantomWallet } from '@rainbow-me/rainbowkit/wallets';
import { http, createConfig, Config } from 'wagmi';
import { sepolia } from 'wagmi/chains';

const transports = {
  [sepolia.id]: http(),
};

const connectors = connectorsForWallets(
    [
      {
        groupName: 'Recommended',
        wallets: [
          metaMaskWallet,
          binanceWallet,
          coin98Wallet,
          phantomWallet
        ],
      },
    ],
    {
      appName: 'Staking app',
      projectId: '04309ed1007e77d1f119b85205bb779d',
    },
  );

const initialConfig = createConfig({
  chains: [sepolia],
  transports,
  connectors,
  ssr: true,
});

export default function useWagmiConfig(): Config {
  return initialConfig;
}
