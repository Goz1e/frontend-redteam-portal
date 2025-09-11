import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

// Global state to sync across all hook instances
let globalWalletState = {
	address: null as string | null,
	isConnected: false,
};

// Event emitter for cross-component synchronization
const walletStateListeners = new Set<() => void>();

const emitWalletStateChange = () => {
	walletStateListeners.forEach((listener) => listener());
};

const addWalletStateListener = (listener: () => void) => {
	walletStateListeners.add(listener);
	return () => {
		walletStateListeners.delete(listener);
	};
};

// Dynamic imports to handle missing dependencies gracefully
let web3Enable: any;
let DedotClient: any;
let WsProvider: any;
let formatBalance: any;

// Try to import Polkadot dependencies
const loadPolkadotDeps = async () => {
	try {
		// Use Polkadot API instead of Dedot for better browser compatibility
		const extensionDapp = await import("@polkadot/extension-dapp");
		const api = await import("@polkadot/api");
		const util = await import("@polkadot/util");

		web3Enable = extensionDapp.web3Enable;

		// Use Polkadot API instead of Dedot
		const { ApiPromise, WsProvider: PolkadotWsProvider } = api;
		const { formatBalance: polkadotFormatBalance } = util;

		// Assign to our variables
		DedotClient = {
			new: async (provider: any) => {
				return await ApiPromise.create({ provider });
			},
		};
		WsProvider = PolkadotWsProvider;
		formatBalance = polkadotFormatBalance;

		return true;
	} catch (error) {
		console.warn(
			"Polkadot dependencies not found. Please install: npm install @polkadot/extension-dapp @polkadot/api @polkadot/util",
		);
		return false;
	}
};

// Cookie utilities with global state sync
const setCookie = (name: string, value: string, days: number = 30) => {
	const expires = new Date();
	expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;

	// Update global state when cookie is set
	if (name === "polkadot_wallet_address") {
		globalWalletState.address = value;
		globalWalletState.isConnected = true;
		emitWalletStateChange();
	}
};

const getCookie = (name: string): string | null => {
	const nameEQ = name + "=";
	const ca = document.cookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === " ") c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0)
			return c.substring(nameEQ.length, c.length);
	}
	return null;
};

const deleteCookie = (name: string) => {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

	// Update global state when cookie is deleted
	if (name === "polkadot_wallet_address") {
		globalWalletState.address = null;
		globalWalletState.isConnected = false;
		emitWalletStateChange();
	}
};

interface PolkadotWalletState {
	address: string | null;
	balance: string | null;
	isConnected: boolean;
	isConnecting: boolean;
	isLoadingBalance: boolean;
	error: string | null;
}

export const usePolkadotWallet = () => {
	const [state, setState] = useState<PolkadotWalletState>({
		address: globalWalletState.address,
		balance: null,
		isConnected: globalWalletState.isConnected,
		isConnecting: false,
		isLoadingBalance: false,
		error: null,
	});

	// Initialize global state from cookie on first load
	useEffect(() => {
		const savedAddress = getCookie("polkadot_wallet_address");
		if (savedAddress && !globalWalletState.address) {
			globalWalletState.address = savedAddress;
			globalWalletState.isConnected = true;
		}

		// Sync local state with global state
		setState((prev) => ({
			...prev,
			address: globalWalletState.address,
			isConnected: globalWalletState.isConnected,
		}));
	}, []);

	// Listen for global state changes from other components
	useEffect(() => {
		const unsubscribe = addWalletStateListener(() => {
			setState((prev) => ({
				...prev,
				address: globalWalletState.address,
				isConnected: globalWalletState.isConnected,
			}));
		});

		return unsubscribe;
	}, []);

	// Get balance when address changes
	const getBalance = useCallback(async (address: string) => {
		if (!address) return;

		setState((prev) => ({ ...prev, isLoadingBalance: true, error: null }));

		try {
			// Load dependencies first
			const depsLoaded = await loadPolkadotDeps();
			if (!depsLoaded) {
				throw new Error("Polkadot dependencies not available");
			}

			const api = await DedotClient.new(
				new WsProvider("wss://test.finney.opentensor.ai:443"),
			);
			const account = await api.query.system.account(address);
			const formattedBalance = formatBalance(account.data.free, {
				decimals: 9,
				withSi: true,
				withUnit: "TAO",
			});

			setState((prev) => ({
				...prev,
				balance: formattedBalance,
				isLoadingBalance: false,
			}));
		} catch (error) {
			const errorMessage = "Failed to fetch balance";
			console.error(errorMessage, error);
			toast.error(errorMessage);
			setState((prev) => ({
				...prev,
				balance: null,
				isLoadingBalance: false,
				error: errorMessage,
			}));
		}
	}, []);

	// Connect to Polkadot wallet
	const connect = useCallback(async () => {
		setState((prev) => ({ ...prev, isConnecting: true, error: null }));

		try {
			// Load dependencies first
			const depsLoaded = await loadPolkadotDeps();
			if (!depsLoaded) {
				throw new Error(
					"Polkadot dependencies not installed. Please run: npm install @polkadot/extension-dapp dedot @dedot/chaintypes",
				);
			}

			const injected = await web3Enable("RedTeam Portal");

			if (!injected || injected.length === 0) {
				throw new Error(
					"No Polkadot extension found. Please install Polkadot.js extension.",
				);
			}

			const extension = injected[0];
			const accounts = await extension.accounts.get();

			if (accounts.length === 0) {
				throw new Error(
					"No accounts found. Please create an account in your Polkadot.js extension.",
				);
			}

			const address = accounts[0].address;

			// Save to cookie (this will automatically update global state)
			setCookie("polkadot_wallet_address", address);

			setState((prev) => ({
				...prev,
				address,
				isConnected: true,
				isConnecting: false,
			}));

			// Fetch balance
			await getBalance(address);
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Failed to connect to Polkadot wallet";
			console.error("Error connecting to Polkadot wallet:", error);
			toast.error(errorMessage);
			setState((prev) => ({
				...prev,
				isConnecting: false,
				error: errorMessage,
			}));
		}
	}, [getBalance]);

	// Disconnect wallet
	const disconnect = useCallback(() => {
		// Delete cookie (this will automatically update global state)
		deleteCookie("polkadot_wallet_address");
		setState({
			address: null,
			balance: null,
			isConnected: false,
			isConnecting: false,
			isLoadingBalance: false,
			error: null,
		});
	}, []);

	// Refresh balance
	const refreshBalance = useCallback(() => {
		if (state.address) {
			getBalance(state.address);
		}
	}, [state.address, getBalance]);

	// Get formatted balance without unit
	const getFormattedBalanceWithoutUnit = useCallback(() => {
		if (!state.balance) return null;
		// Remove the unit (TAO) from the balance string
		return state.balance.replace(/\s*TAO$/, "");
	}, [state.balance]);

	// Auto-fetch balance when address is loaded from cookie
	useEffect(() => {
		if (
			state.address &&
			state.isConnected &&
			!state.balance &&
			!state.isLoadingBalance
		) {
			getBalance(state.address);
		}
	}, [
		state.address,
		state.isConnected,
		state.balance,
		state.isLoadingBalance,
		getBalance,
	]);

	// Periodic check for cookie changes (in case cookies are modified externally)
	useEffect(() => {
		const checkCookieChanges = () => {
			const currentCookieAddress = getCookie("polkadot_wallet_address");
			if (currentCookieAddress !== globalWalletState.address) {
				if (currentCookieAddress) {
					globalWalletState.address = currentCookieAddress;
					globalWalletState.isConnected = true;
				} else {
					globalWalletState.address = null;
					globalWalletState.isConnected = false;
				}
				emitWalletStateChange();
			}
		};

		const interval = setInterval(checkCookieChanges, 1000); // Check every second
		return () => clearInterval(interval);
	}, []);

	return {
		...state,
		connect,
		disconnect,
		refreshBalance,
		formattedBalanceWithoutUnit: getFormattedBalanceWithoutUnit(),
	};
};
