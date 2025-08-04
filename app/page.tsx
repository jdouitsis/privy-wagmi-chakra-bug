'use client';

import {
  usePopoverContext,
  MenuItem,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Text,
  VStack,
  Divider,
  Popover,
  PopoverTrigger,
  Box,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Input,
} from '@chakra-ui/react';
import {useState} from 'react';

import {usePrivy, useWallets} from '@privy-io/react-auth';

const shortAddress = (address?: string) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
};

const Page: React.FC = () => {
  const {linkWallet, login, logout, authenticated} = usePrivy();
  const [inputValue, setInputValue] = useState('');

  return (
    <VStack bg={authenticated ? 'green' : 'red'}>
      {!authenticated && (
        <VStack>
          <Text>Not authenticated</Text>
          <Button onClick={login}>Login</Button>
        </VStack>
      )}

      <Text>{authenticated ? 'Authenticated' : 'Not authenticated'}</Text>
      <Button onClick={logout}>Logout</Button>
      <Divider />

      <MenuExampleThatCausesTheIssueWithCoinbaseWhenRendered />
      <Divider />
      <Input
        placeholder="Input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <PopoverExampleThatCausesTheIssueWithCoinbaseWhenRendered />
      <Divider />

      <HStack>
        <Button onClick={linkWallet}>Link Wallet</Button>
      </HStack>
    </VStack>
  );
};

const MenuExampleThatCausesTheIssueWithCoinbaseWhenRendered = () => {
  const {wallets} = useWallets();

  return (
    <Menu>
      <MenuButton as={Button}>This menu causes the issue, look at the code</MenuButton>
      <MenuList>
        {wallets.map((wallet) => (
          // If the MenuItem is replaced with HStack, the does not appear
          <MenuItem key={wallet.address}>
            <Text>{shortAddress(wallet.address)}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

const PopoverExampleThatCausesTheIssueWithCoinbaseWhenRendered = () => {
  return (
    <Popover placement="top" trigger="hover">
      <PopoverTrigger>
        <Box>
          <Button isDisabled>Open Popover</Button>
        </Box>
      </PopoverTrigger>

      {/* If the PopoverContent is replaced with NoAnimationPopoverContent, the does not appear */}
      <PopoverContent>
        <PopoverArrow bg="gray.800" />
        <PopoverBody>
          <Text textAlign="center">Popover content</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const NoAnimationPopoverContent = ({children}: {children: React.ReactNode}) => {
  const {isOpen} = usePopoverContext();

  if (!isOpen) {
    return null;
  }

  return (
    <Box
      position="absolute"
      top={100}
      left={0}
      right={0}
      bottom={0}
      p={8}
      border="1px solid red"
      zIndex={1000}
      bg="purple"
    >
      {children}
    </Box>
  );
};

export default Page;
