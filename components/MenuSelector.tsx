import {Avatar, Flex, HStack, Menu, MenuButton, MenuItem, MenuList, Text} from '@chakra-ui/react';
import {PlusIcon, Wallet2Icon} from 'lucide-react';
import {useAccount, useDisconnect} from 'wagmi';
import type {UseAccountReturnType} from 'wagmi';

import type {ConnectedWallet} from '@privy-io/react-auth';
import {usePrivy, useWallets} from '@privy-io/react-auth';
import {useSetActiveWallet} from '@privy-io/wagmi';

type WalletProps = {
  isDesktop?: boolean;
};

/**
 * Takes in a wallet address and an optional icon URL, and displays them in a simple format.
 */
const Display = (props: WalletProps & {address: string; icon?: string}) => {
  const {address, icon, isDesktop = false} = props;
  return (
    <Flex gap="2" p="2">
      <Avatar size="xs" src={icon} />
      {isDesktop && <Text>{shortAddress(address)}</Text>}
    </Flex>
  );
};

/**
 * A simple wallet display component that shows the selected wallet's icon and a label.
 */
const DisplaySelected = (props: WalletProps) => {
  const {isDesktop = false} = props;
  const selectedWallet = useAccount();

  return (
    <Flex gap="2" p="2">
      <Avatar size="xs" src={icon(selectedWallet) ?? ''} />
      {isDesktop && <Text>{shortAddress(selectedWallet.address)}</Text>}
    </Flex>
  );
};

const DisplayNoneSelected = (props: WalletProps) => {
  const {isDesktop = false} = props;

  return (
    <Flex gap="2" p="2">
      <Wallet2Icon />
      {isDesktop && <Text>Select Wallet</Text>}
    </Flex>
  );
};

/**
 * A way to select a wallet from a list of the available connected wallets
 */
const Selector = (props: WalletProps) => {
  const {isDesktop = false} = props;
  const selectedWallet = useAccount();
  const {wallets, ready: walletReady} = useWallets();
  const {setActiveWallet} = useSetActiveWallet();
  const {linkWallet, ready: privyReady} = usePrivy();

  const isReady = walletReady && privyReady;

  const handleSelectWallet = (wallet: ConnectedWallet) => {
    setActiveWallet(wallet);
  };

  if (!isReady)
    return (
      <Flex>
        <Avatar size="xs" src="/images/privy.png" />
        {isDesktop && <Text>{shortAddress('0x000000000000000000000')}</Text>}
      </Flex>
    );

  return (
    <Menu direction="rtl" placement="bottom-end">
      <MenuButton>
        {selectedWallet ? (
          <DisplaySelected isDesktop={isDesktop} />
        ) : (
          <DisplayNoneSelected isDesktop={isDesktop} />
        )}
      </MenuButton>
      <MenuList
        px="2"
        minW="min-content"
        bg="g.primary.oxford.700"
        borderColor="g.neutral.metallic.dark"
      >
        {wallets.map(
          (wallet) =>
            wallet.linked === true && (
              <HStack
                bg={
                  selectedWallet?.address === wallet.address
                    ? 'g.primary.oxford.600'
                    : 'g.primary.oxford.700'
                }
                _hover={{bg: 'g.primary.oxford.600'}}
                gap="2"
                p="2"
                alignItems="center"
                onClick={handleSelectWallet.bind(null, wallet)}
                key={wallet.address}
              >
                <Avatar size="xs" src={icon(wallet)} />
                <Text>{shortAddress(wallet.address)}</Text>
              </HStack>
            ),
        )}
        {/* {wallets.map(
          wallet =>
            wallet.linked === true && (
              <MenuItem
                bg={selectedWallet?.address === wallet.address ? 'g.primary.oxford.600' : 'g.primary.oxford.700'}
                _hover={{ bg: 'g.primary.oxford.600' }}
                gap="2"
                p="2"
                alignItems="center"
                onClick={handleSelectWallet.bind(null, wallet)}
                key={wallet.address}
              >
                <Avatar size="xs" src={icon(wallet)} />
                <Text>{shortAddress(wallet.address)}</Text>
              </MenuItem>
            ),
        )} */}
        <MenuItem
          bg="g.primary.oxford.700"
          _hover={{bg: 'g.primary.oxford.600'}}
          p="2"
          gap="2"
          alignItems="center"
          onClick={() => linkWallet()}
        >
          <PlusIcon fill="blue" />
          Add Wallet
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const Disconnect = () => {
  const {disconnect} = useDisconnect();
  return (
    <Flex p="2" onClick={() => disconnect()} cursor="pointer" color="red.500">
      <Text>Disconnect Wallet</Text>
    </Flex>
  );
};

export const Wallet = {
  DisplaySelected,
  Selector,
  Disconnect,
  Display,
};

type WalletTypes = ConnectedWallet | UseAccountReturnType;

const isConnectedWallet = (wallet: WalletTypes): wallet is ConnectedWallet => {
  return 'connectorType' in wallet && typeof wallet.connectorType === 'string';
};

export const shortAddress = (address?: string) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
};

export const icon = (wallet: WalletTypes) => {
  if (isConnectedWallet(wallet)) {
    if (wallet.walletClientType === 'privy') return '/images/privy.png';
    return wallet.meta.icon;
  }
  if (wallet.connector?.id === 'io.privy.wallet') return '/images/privy.png';
  return wallet.connector?.icon ?? '';
};
