# Layout and Providers Guide

This guide explains the new layout structure and how to use context providers in your React application.

## 🏗️ New Structure

```
src/
├── components/
│   ├── Layout.tsx          # Main layout wrapper
│   ├── WalletConnect.tsx   # Wallet connection component
│   └── WalletExample.tsx   # Example usage
├── providers/
│   └── index.tsx           # All context providers
├── hooks/
│   └── useWallet.ts        # Custom wallet hook
└── main.tsx                # Updated entry point
```

## 🔧 How It Works

### 1. Entry Point (`main.tsx`)

```tsx
import { Layout } from "./components/Layout.tsx";

createRoot(document.getElementById("root")!).render(
    <Layout>
        <App />
    </Layout>
);
```

### 2. Layout Component (`components/Layout.tsx`)

-   Wraps your entire app
-   Provides consistent styling
-   Includes all context providers

### 3. Providers (`providers/index.tsx`)

-   **WagmiProvider**: Web3 wallet connections
-   **QueryClientProvider**: React Query for data fetching
-   Ready to add more providers (Theme, Auth, etc.)

## 🎯 Using Wallet Functionality

### Basic Usage

```tsx
import { useWallet } from "../hooks/useWallet";

function MyComponent() {
    const { address, isConnected, connectWallet, disconnectWallet } =
        useWallet();

    return (
        <div>
            {isConnected ? (
                <p>Connected: {address}</p>
            ) : (
                <button onClick={() => connectWallet()}>Connect Wallet</button>
            )}
        </div>
    );
}
```

### Pre-built Component

```tsx
import { WalletConnect } from "./WalletConnect";

function MyPage() {
    return (
        <div>
            <h1>My Page</h1>
            <WalletConnect />
        </div>
    );
}
```

## 🚀 Adding New Providers

To add a new context provider:

1. Create your provider component
2. Add it to `providers/index.tsx`:

```tsx
import { MyNewProvider } from "./MyNewProvider";

export function Providers({ children }: ProvidersProps) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <MyNewProvider>{children}</MyNewProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
```

## 🎨 Available Hooks

-   `useWallet()` - Wallet connection and account info
-   `useQuery()` - Data fetching (from React Query)
-   `useMutation()` - Data mutations (from React Query)

## 🔗 Wallet Connectors

The following wallet connectors are configured:

-   **Injected** (MetaMask, etc.)
-   **Coinbase Wallet**
-   **WalletConnect** (requires project ID)

## ⚙️ Configuration

Make sure to set your WalletConnect project ID in the config file:

```typescript
// config.ts
const projectId =
    process.env.VITE_WALLETCONNECT_PROJECT_ID || "your-project-id";
```

## 📝 Environment Variables

Create a `.env` file:

```
VITE_WALLETCONNECT_PROJECT_ID=your-walletconnect-project-id
```

## 🎯 Benefits

-   ✅ Clean separation of concerns
-   ✅ Easy to add new providers
-   ✅ Type-safe wallet interactions
-   ✅ Optimized React Query settings
-   ✅ Automatic wallet reconnection
-   ✅ Ready-to-use components
