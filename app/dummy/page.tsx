'use client';

import {
  MenuItem,
  Avatar,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Text,
  VStack,
  Divider,
} from '@chakra-ui/react';
import {PlusIcon} from 'lucide-react';
import {useAccount} from 'wagmi';

import {useLinkAccount, useWallets} from '@privy-io/react-auth';

const shortAddress = (address?: string) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
};

const Page: React.FC = () => {
  const {linkWallet} = useLinkAccount();

  const selectedWallet = useAccount();
  const {wallets} = useWallets();

  return (
    <VStack w="full" maxW="md" mx="auto" my={10}>
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

      <Divider />
      <HStack>
        <Button
          onClick={() => {
            setTimeout(linkWallet, 0);
          }}
        >
          Link Wallet
        </Button>
      </HStack>
    </VStack>
  );
};

export default Page;
