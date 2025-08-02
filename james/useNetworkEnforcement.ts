import {useCallback, useEffect, useMemo} from 'react';
import {useAccount, useSwitchChain} from 'wagmi';

// Base mainnet: 8453, Base Sepolia: 84532
const ALLOWED_CHAIN_IDS = [84532];
const TARGET_CHAIN_ID = 84532;

export const useNetworkEnforcement = () => {
  const {address, isConnected, chainId} = useAccount();
  const {switchChain} = useSwitchChain();

  const isOnCorrectNetwork = useMemo(() => {
    if (!chainId || !isConnected) return true;
    return ALLOWED_CHAIN_IDS.includes(chainId);
  }, [chainId, isConnected]);

  const switchToCorrectNetwork = useCallback(async () => {
    if (!isConnected || !address) return;

    try {
      await switchChain({chainId: TARGET_CHAIN_ID});
    } catch (error) {
      console.error('Failed to switch to correct network:', error);
    }
  }, [switchChain, isConnected, address]);

  // Automatically switch to correct network if connected but on wrong chain
  useEffect(() => {
    if (isConnected && address && chainId && !isOnCorrectNetwork) {
      switchToCorrectNetwork();
    }
  }, [isConnected, address, chainId, isOnCorrectNetwork, switchToCorrectNetwork]);

  return {
    isOnCorrectNetwork,
    switchToCorrectNetwork,
  };
};
