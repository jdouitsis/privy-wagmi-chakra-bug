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
  const {linkWallet, login, authenticated} = usePrivy();
  const [inputValue, setInputValue] = useState('');

  if (!authenticated) {
    return (
      <VStack>
        <Text>Not authenticated</Text>
        <Button onClick={login}>Login</Button>
      </VStack>
    );
  }

  return (
    <VStack>
      <Text>{authenticated ? 'Authenticated' : 'Not authenticated'}</Text>
      <Divider />

      <MenuExample />
      <Divider />
      <Input
        placeholder="Input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {/* <PopoverExample />
      <Divider /> */}

      <HStack>
        <Button onClick={linkWallet}>Link Wallet</Button>
      </HStack>
    </VStack>
  );
};

const MenuExample = () => {
  const {wallets} = useWallets();

  return (
    <Menu>
      <MenuButton as={Button}>This menu causes the issue, look at the code</MenuButton>
      <MenuList>
        {wallets.map((wallet) => (
          <MenuItem key={wallet.address}>
            <Text>{shortAddress(wallet.address)}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

const PopoverExample = () => {
  return (
    <Popover placement="top" trigger="hover">
      <PopoverTrigger>
        <Box>
          <Button isDisabled>Open Popover</Button>
        </Box>
      </PopoverTrigger>
      <PopoverContent
        w="230px"
        maxH="60vh"
        maxW="100vh"
        overflowY="auto"
        borderColor="g.neutral.metallic.mid"
        bgColor="g.primary.oxford.500"
        rounded="sm"
      >
        <PopoverArrow bg="gray.800" />
        <PopoverBody>
          <Text textAlign="center">Popover content</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Page;
