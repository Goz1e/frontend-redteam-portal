import React from "react";
import { Button } from "./ui/button";
import { usePolkadotWallet } from "../hooks/usePolkadotWallet";
import { Wallet } from "lucide-react";

interface PolkadotWalletConnectProps {
	className?: string;
}

export const PolkadotWalletConnect: React.FC<PolkadotWalletConnectProps> = ({
	className = "",
}) => {
	const { address, isConnected, isConnecting, error, connect } =
		usePolkadotWallet();

	const formatAddress = (addr: string) => {
		return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
	};

	if (isConnected && address) {
		return (
			<div className={`flex items-center gap-2 ${className}`}>
				<div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
					<Wallet className="h-4 w-4" />
					<span className="text-sm font-medium">
						{formatAddress(address)}
					</span>
				</div>
			</div>
		);
	}

	return (
		<div className={className}>
			<Button
				onClick={connect}
				disabled={isConnecting}
				className="flex items-center gap-2 bg-transparent !h-fit !pt-1"
			>
				<Wallet className="h-4 w-4" />
				{isConnecting ? "Connecting..." : "Connect Wallet"}
			</Button>
			{error && <p className="text-sm text-red-500 mt-1">{error}</p>}
		</div>
	);
};
