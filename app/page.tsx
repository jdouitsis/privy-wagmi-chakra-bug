'use client';

import Balance from 'components/Balance';
import BlockNumber from 'components/BlockNumber';
import Button from 'components/Button';
import ContractEvent from 'components/ContractEvent';
import ContractRead from 'components/ContractRead';
import ContractReads from 'components/ContractReads';
import ContractWrite from 'components/ContractWrite';
import EnsAddress from 'components/EnsAddress';
import EnsAvatar from 'components/EnsAvatar';
import EnsName from 'components/EnsName';
import EnsResolver from 'components/EnsResolver';
import FeeData from 'components/FeeData';
import PublicClient from 'components/PublicClient';
import SendTransaction from 'components/SendTransaction';
import SignMessage from 'components/SignMessage';
import SignTypedData from 'components/SignTypedData';
import Signer from 'components/Signer';
import SwitchNetwork from 'components/SwitchNetwork';
import Token from 'components/Token';
import Transaction from 'components/Transaction';
import WaitForTransaction from 'components/WaitForTransaction';
import WalletClient from 'components/WalletClient';
import WatchPendingTransactions from 'components/WatchPendingTransactions';
import {shorten} from 'lib/utils';
import Image from 'next/image';
import {useCallback, useEffect, useMemo} from 'react';
import {useAccount, useDisconnect} from 'wagmi';

import {useLinkAccount, usePrivy, useWallets} from '@privy-io/react-auth';
import type {ConnectedWallet} from '@privy-io/react-auth';
import {useSetActiveWallet} from '@privy-io/wagmi';

import wagmiPrivyLogo from '../public/wagmi_privy_logo.png';

const MonoLabel = ({label}: {label: string}) => {
  return <span className="px-2 py-1 font-mono rounded-xl bg-slate-200">{label}</span>;
};

export default function Home() {
  // Privy hooks
  const {ready, user, authenticated, login, connectWallet, logout} = usePrivy();
  const {wallets, ready: walletsReady} = useWallets();
  const {linkWallet} = useLinkAccount();
  useLinkAccount();
  useLinkAccount();
  useLinkAccount();
  useWallets();

  // WAGMI hooks
  const {address, isConnected, isConnecting, isDisconnected} = useAccount();
  const {disconnect} = useDisconnect();
  const {setActiveWallet} = useSetActiveWallet();

  useNetworkEnforcement();
  if (!ready) {
    return null;
  }

  return (
    <>
      <main className="p-4 min-h-screen bg-slate-200 text-slate-800">
        <Image
          className="mx-auto rounded-lg"
          src={wagmiPrivyLogo}
          alt="wagmi x privy logo"
          width={400}
          height={100}
        />
        <p className="my-4 text-center">
          This demo showcases how you can integrate{' '}
          <a href="https://wagmi.sh/" className="font-medium underline">
            wagmi
          </a>{' '}
          alongside{' '}
          <a href="https://www.privy.io/" className="font-medium underline">
            Privy
          </a>{' '}
          in your React app. Login below to try it out!
          <br />
          For more information, check out{' '}
          <a href="https://docs.privy.io/guide/guides/wagmi" className="font-medium underline">
            our integration guide
          </a>{' '}
          or the{' '}
          <a href="https://github.com/privy-io/wagmi-demo" className="font-medium underline">
            source code
          </a>{' '}
          for this app.
        </p>

        <Break />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-2 items-start p-3 rounded border border-black border-1 bg-slate-100">
            <h1 className="text-4xl font-bold">Privy</h1>
            {ready && !authenticated && (
              <>
                <p>You are not authenticated with Privy</p>
                <div className="flex gap-4 items-center">
                  <Button onClick_={login} cta="Login with Privy" />
                  <span>or</span>
                  <Button onClick_={connectWallet} cta="Connect only" />
                </div>
              </>
            )}

            {walletsReady &&
              wallets.map((wallet) => {
                return (
                  <div
                    key={wallet.address}
                    className="flex flex-row flex-wrap gap-2 justify-between items-center p-4 min-w-full bg-slate-50"
                  >
                    <div>
                      <MonoLabel label={shorten(wallet.address)} />
                    </div>
                    <Button
                      cta="Make active"
                      onClick_={() => {
                        setActiveWallet(wallet);
                      }}
                    />
                  </div>
                );
              })}

            {ready && authenticated && (
              <>
                <p className="mt-2">You are logged in with privy.</p>
                <Button onClick_={connectWallet} cta="Connect another wallet" />
                <Button onClick_={linkWallet} cta="Link another wallet" />
                <textarea
                  value={JSON.stringify(wallets, null, 2)}
                  className="p-4 mt-2 w-full font-mono text-xs rounded-md bg-slate-700 text-slate-50 sm:text-sm"
                  rows={JSON.stringify(wallets, null, 2).split('\n').length}
                  disabled
                />
                <br />
                <textarea
                  value={JSON.stringify(user, null, 2)}
                  className="p-4 mt-2 w-full font-mono text-xs rounded-md bg-slate-700 text-slate-50 sm:text-sm"
                  rows={JSON.stringify(user, null, 2).split('\n').length}
                  disabled
                />
                <br />
                <Button onClick_={logout} cta="Logout from Privy" />
              </>
            )}
          </div>
          <div className="flex flex-col gap-2 items-start p-3 rounded border border-black border-1 bg-slate-100">
            <h1 className="text-4xl font-bold">WAGMI</h1>
            <p>
              Connection status: {isConnecting && <span>🟡 connecting...</span>}
              {isConnected && <span>🟢 connected.</span>}
              {isDisconnected && <span> 🔴 disconnected.</span>}
            </p>
            {isConnected && address && (
              <>
                <h2 className="mt-6 text-2xl">useAccount</h2>
                <p>
                  address: <MonoLabel label={address} />
                </p>

                <Balance />
                <Signer />
                <SignMessage />
                <SignTypedData />
                <PublicClient />
                <EnsName />
                <EnsAddress />
                <EnsAvatar />
                <EnsResolver />
                <SwitchNetwork />
                <BlockNumber />
                <SendTransaction />
                <ContractRead />
                <ContractReads />
                <ContractWrite />
                <ContractEvent />
                <FeeData />
                <Token />
                <Transaction />
                <WatchPendingTransactions />
                <WalletClient />
                <WaitForTransaction />

                <h2 className="mt-6 text-2xl">useDisconnect</h2>
                <Button onClick_={disconnect} cta="Disconnect from WAGMI" />
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

const Break = () => {
  const {wallets} = useWallets();

  return (
    <div>
      <h1>Break</h1>
      {wallets.map((wallet) => {
        return (
          <div key={wallet.address}>
            <p>{wallet.address}</p>
          </div>
        );
      })}
    </div>
  );
};

const ALLOWED_CHAIN_IDS = [84532];
const TARGET_CHAIN_ID = 84532;

export const useNetworkEnforcement = () => {
  const {address, isConnected, chainId} = useAccount();
  const {wallets} = useWallets();
  const {authenticated, ready} = usePrivy();
  const activeWallet = useMemo(() => getActiveWallet(wallets, address), [wallets, address]);

  const isOnCorrectNetwork = useMemo(() => {
    if (!activeWallet?.chainId) return false;

    const chainIdNumber = parseChainId(activeWallet.chainId);
    return isChainAllowed(chainIdNumber);
  }, [activeWallet?.chainId]);

  const canEnforceNetwork = useCallback(() => {
    return (
      ready &&
      authenticated &&
      isConnected &&
      address &&
      chainId &&
      !isOnCorrectNetwork &&
      wallets.length > 0 &&
      activeWallet
    );
  }, [
    ready,
    authenticated,
    isConnected,
    address,
    chainId,
    isOnCorrectNetwork,
    wallets.length,
    activeWallet,
  ]);

  const switchToCorrectNetwork = useCallback(async () => {
    if (!activeWallet) return;

    await activeWallet.switchChain(TARGET_CHAIN_ID);
  }, [activeWallet]);

  useEffect(() => {
    if (!canEnforceNetwork()) {
      return;
    }

    const activeWalletChainId = parseChainId(activeWallet!.chainId);
    const isActiveWalletOnWrongNetwork = !isChainAllowed(activeWalletChainId);

    if (isActiveWalletOnWrongNetwork) {
      switchToCorrectNetwork();
    }
  }, [
    chainId,
    ready,
    authenticated,
    isConnected,
    address,
    isOnCorrectNetwork,
    switchToCorrectNetwork,
    activeWallet,
    canEnforceNetwork,
  ]);

  return {
    isOnCorrectNetwork,
  };
};

const getActiveWallet = (
  wallets: ConnectedWallet[],
  address: `0x${string}` | undefined,
): ConnectedWallet | undefined => wallets.find((wallet) => wallet.address === address);

const parseChainId = (chainId: string): number => {
  return parseInt(chainId.split(':')[1], 10);
};

const isChainAllowed = (chainId: number): boolean => {
  return ALLOWED_CHAIN_IDS.includes(chainId);
};
