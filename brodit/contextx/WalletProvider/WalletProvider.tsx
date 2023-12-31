'use client'
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'
import { WagmiConfig } from 'wagmi';
import { localhost } from 'viem/chains';

const projectId = '6303751cde71dbfb1e1696e3421b8db6'
const metadata = {
  name: 'brodit',
  description: 'brodit',
  url: 'http://brodit.run',
  icons: ['https://avatars.mywebsite.com/'],
}

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com',
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId,
})

export function Web3ModalProvider({ children }: { children: any }) {
  return children
}