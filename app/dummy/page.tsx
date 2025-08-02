'use client';

import {LinkIcon} from '@chakra-ui/icons';
import {
  MenuItem,
  Avatar,
  Button,
  chakra,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
  VStack,
  Divider,
} from '@chakra-ui/react';
import {PlusIcon, UserIcon, Wallet2Icon} from 'lucide-react';
import type {UseAccountReturnType} from 'wagmi';
import {useAccount} from 'wagmi';

import type {ConnectedWallet} from '@privy-io/react-auth';
import {useLinkAccount, usePrivy, useWallets} from '@privy-io/react-auth';

type WalletTypes = ConnectedWallet | UseAccountReturnType;

const shortAddress = (address?: string) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
};

const UserIconChakra = chakra(UserIcon);

const Page: React.FC = () => {
  console.log('New dummy page!');

  return (
    <VStack w="full" maxW="md" mx="auto" my={10}>
      <DisplayUseAccount />

      <Divider />
      <DisplayUseWallets />

      <Selector />

      <Divider />
      <Actions />
    </VStack>
  );
};

const Actions = () => {
  const {linkWallet} = useLinkAccount();

  return (
    <HStack>
      <Button
        onClick={() => {
          setTimeout(linkWallet, 0);
        }}
      >
        Link Wallet
      </Button>
    </HStack>
  );
};

export default Page;

const DisplayUseWallets = () => {
  const wallets = useWallets();
  const account = useAccount();

  return (
    <VStack w="md">
      <HStack justifyContent="space-between" w="full">
        <Text>useWallets.wallets</Text>
        <VStack alignItems="flex-start">
          {wallets.wallets.map((wallet) => (
            <HStack key={wallet.address}>
              <Image
                src={
                  wallet.meta.icon
                    ? wallet.meta.icon
                    : wallet.meta.id === 'io.privy.wallet'
                    ? '/images/privy.png'
                    : ''
                }
                alt={wallet.meta.name}
                w={4}
                h={4}
              />
              <Text minW="120px">{shortAddress(wallet.address)}</Text>
              <LinkIcon color={wallet.linked ? 'green.500' : 'red.500'} />
              <UserIconChakra
                color={wallet.address === account.address ? 'green.500' : 'red.500'}
              />
            </HStack>
          ))}

          {wallets.wallets.map(
            (wallet) =>
              wallet.linked === true && (
                <HStack
                  _hover={{bg: 'g.primary.oxford.600'}}
                  gap="2"
                  p="2"
                  alignItems="center"
                  key={wallet.address}
                >
                  <Text>{shortAddress(wallet.address)}</Text>
                </HStack>
              ),
          )}
        </VStack>
      </HStack>
    </VStack>
  );
};

const DisplayUseAccount = () => {
  const account = useAccount();
  console.log('account', account);

  return (
    <VStack w="md">
      {/* useAccount.isConnecting */}
      <HStack justifyContent="space-between" w="full">
        <Text>useAccount.isConnecting</Text>
        <Text>{account.isConnecting ? '✅' : '❌'}</Text>
      </HStack>

      {/* useAccount.isDisconnecting */}
      <HStack justifyContent="space-between" w="full">
        <Text>useAccount.isDisconnected</Text>
        <Text>{account.isDisconnected ? '✅' : '❌'}</Text>
      </HStack>

      {/* useAccount.isConnected */}
      <HStack justifyContent="space-between" w="full">
        <Text>useAccount.isConnected</Text>
        <Text>{account.isConnected ? '✅' : '❌'}</Text>
      </HStack>

      {/* useAccount.address */}
      <HStack justifyContent="space-between" w="full">
        <Text>useAccount.address</Text>
        <Text>{account.address ? shortAddress(account.address) : '❌'}</Text>
      </HStack>
    </VStack>
  );
};

const Selector = () => {
  const selectedWallet = useAccount();
  const {wallets} = useWallets();
  const {linkWallet} = usePrivy();

  return (
    <Menu direction="rtl" placement="bottom-end">
      <MenuButton>{selectedWallet ? <DisplaySelected /> : <DisplayNoneSelected />}</MenuButton>
      <MenuList
        px="2"
        minW="min-content"
        bg="g.primary.oxford.700"
        borderColor="g.neutral.metallic.dark"
      >
        {wallets.map(
          (wallet) =>
            wallet.linked === true && (
              <MenuItem
                bg={
                  selectedWallet?.address === wallet.address
                    ? 'g.primary.oxford.600'
                    : 'g.primary.oxford.700'
                }
                _hover={{bg: 'g.primary.oxford.600'}}
                gap="2"
                p="2"
                alignItems="center"
                key={wallet.address}
              >
                <Avatar size="xs" src={wallet.meta.icon} />
                <Text>{shortAddress(wallet.address)}</Text>
              </MenuItem>
            ),
        )}
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

const DisplayNoneSelected = () => {
  const isDesktop = false;

  return (
    <Flex gap="2" p="2">
      <Wallet2Icon />
      {isDesktop && <Text>Select Wallet</Text>}
    </Flex>
  );
};

/**
 * Takes in a wallet address and an optional icon URL, and displays them in a simple format.
 */
const Display = (props: {address: string; icon?: string}) => {
  const {address, icon} = props;
  const isDesktop = false;
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
const DisplaySelected = () => {
  const isDesktop = false;
  const selectedWallet = useAccount();

  return (
    <Flex gap="2" p="2">
      {isDesktop && <Text>{shortAddress(selectedWallet.address)}</Text>}
    </Flex>
  );
};
