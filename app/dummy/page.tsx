'use client';

import {LinkIcon} from '@chakra-ui/icons';
import {
  MenuItem,
  Avatar,
  Button,
  chakra,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
  VStack,
  Divider,
} from '@chakra-ui/react';
import {PlusIcon, UserIcon} from 'lucide-react';
import {useAccount} from 'wagmi';

import {useLinkAccount, usePrivy, useWallets} from '@privy-io/react-auth';

const shortAddress = (address?: string) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
};

const UserIconChakra = chakra(UserIcon);

const Page: React.FC = () => {
  console.log('New dummy page!');

  return (
    <VStack w="full" maxW="md" mx="auto" my={10}>
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

const Selector = () => {
  const selectedWallet = useAccount();
  const {wallets} = useWallets();

  return (
    <Menu direction="rtl" placement="bottom-end">
      <MenuButton>{selectedWallet ? 'Selected' : 'None selected'}</MenuButton>
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
        >
          <PlusIcon fill="blue" />
          Add Wallet
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
