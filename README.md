# Privy x Wagmi x Coinbase Bug Demo

## Summary

This is a minimalist repo demonstrating a bug when logging into coinbase when the Chakra-ui library is in use.

## Steps To Reproduce

1. Clone the repo

```sh
git clone git@github.com:jdouitsis/privy-wagmi-chakra-bug.git
```

2. Install the necessary dependencies with `npm`.

```sh
npm i
```

3. Initialize your environment variables

```sh
# In your terminal, create .env.local from .env.local.example
cp .env.local.example .env.local

# Add your Privy App ID to .env.local
NEXT_PUBLIC_PRIVY_APP_ID=<your-privy-app-id>
NEXT_PUBLIC_ALCHEMY_API_KEY=<your-alchemy-api-key>
```

4. Build locally

```sh
npm run dev
```

5. Run the app with one of the two problem components to see.

In the [app/page.tsx](./app/page.tsx), there are two components that cause this issue.

1. `MenuExampleThatCausesTheIssueWithCoinbaseWhenRendered`
2. `PopoverExampleThatCausesTheIssueWithCoinbaseWhenRendered`

If either of these are rendered, linking coinbase via the app will fail due to it getting stuck in an infinite loading state. In each of the components, there is a
comment showing what part should can be modified to prevent the issue from happening.

## Current Assumption

The current assumption is some underlying implementation of chakra-ui, such as framer-motion or popperjs is somehow interfering with the way privy connects with coinbase.
