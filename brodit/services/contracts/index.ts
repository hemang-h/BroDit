import { Contract, ethers } from 'ethers';
import def from './Brodit.json';
import { useRef } from 'react';

export const useContract = () => {
  const contractRef = useRef<Contract>();
  let signer;

  // Connect to the injected Web3 provider
  const connectToWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        return signer;
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      console.error('Web3 provider not found. Please install MetaMask or another wallet extension.');
    }
  };

  const getContract = async (): Promise<Contract> => {
    if (contractRef.current) return contractRef.current;

    if (!signer) {
      signer = await connectToWallet();
      if (!signer) {
        throw new Error('Failed to connect to wallet.');
      }
    }

    contractRef.current = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, def.abi, signer);
    return contractRef.current;
  };

  return { getContract };
};
