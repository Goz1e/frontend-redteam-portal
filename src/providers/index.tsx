import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { config } from "../../config";
import { Toaster } from "@/components/ui/sonner";

interface ProvidersProps {
	children: React.ReactNode;
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// Data is considered fresh for 5 minutes
			staleTime: 1000 * 60 * 5,
			// Data stays in cache for 10 minutes after being unused
			gcTime: 1000 * 60 * 10,
			// Retry failed requests up to 3 times
			retry: 3,
			// Exponential backoff for retries
			retryDelay: (attemptIndex) =>
				Math.min(1000 * 2 ** attemptIndex, 30000),
			// Don't refetch on window focus for better UX
			refetchOnWindowFocus: false,
			// Don't refetch on reconnect for blockchain data
			refetchOnReconnect: false,
		},
		mutations: {
			// Retry mutations once on failure
			retry: 1,
		},
	},
});

export function Providers({ children }: ProvidersProps) {
	// Create QueryClient instance with optimal settings for Web3 applications

	return (
		<QueryClientProvider client={queryClient}>
			<WagmiProvider config={config}>
				<RainbowKitProvider
					theme={darkTheme({
						accentColor: "#ff0000",
						accentColorForeground: "white",
						borderRadius: "medium",
						fontStack: "system",
						overlayBlur: "small",
					})}
					initialChain={config.chains[0]}
					modalSize="compact"
				>
					{children}
					<Toaster />
				</RainbowKitProvider>
			</WagmiProvider>
		</QueryClientProvider>
	);
}
