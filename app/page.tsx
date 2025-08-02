'use client';

import {
  MenuItem,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Text,
  VStack,
  Divider,
} from '@chakra-ui/react';
import {useAccount} from 'wagmi';

import {usePrivy, useWallets} from '@privy-io/react-auth';

const shortAddress = (address?: string) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
};

const Page: React.FC = () => {
  const {linkWallet} = usePrivy();

  const selectedWallet = useAccount();
  const {wallets} = useWallets();

  return (
    <VStack>
      <Menu>
        <MenuButton>{selectedWallet ? 'Selected' : 'None selected'}</MenuButton>
        <MenuList>
          {wallets.map((wallet) => (
            <MenuItem key={wallet.address}>
              <Text>{shortAddress(wallet.address)}</Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <Divider />
      <HStack>
        <Button onClick={linkWallet}>Link Wallet</Button>
      </HStack>
    </VStack>
  );
};

export default Page;
