import {useAccount} from 'wagmi';

import {usePrivy} from '@privy-io/react-auth';

import {useNetworkEnforcement} from './useNetworkEnforcement';

/**
 * Used to track if the user is connected to the web3 wallet and the wallet is ready to be used.
 * Also handles automatic network enforcement.
 *
 * @returns `true` if the user is connected to the web3 wallet and the wallet is ready to be used.
 */
export const useWeb3Ready = () => {
  const {ready} = usePrivy();
  const {address, isConnected} = useAccount();
  const {isOnCorrectNetwork} = useNetworkEnforcement();

  return {isReady: isConnected && address && ready && isOnCorrectNetwork};
};
