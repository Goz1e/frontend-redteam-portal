import { useState } from "react";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { useWallet } from "../hooks/useWallet";

export function WalletConnect() {
	const {
		address,
		isConnected,
		isConnecting,
		balance,
		isBalanceLoading,
		connectWallet,
		disconnectWallet,
		connectors,
		isPending,
		error,
	} = useWallet();

	const [copiedAddress, setCopiedAddress] = useState(false);

	const copyAddress = async () => {
		if (address) {
			await navigator.clipboard.writeText(address);
			setCopiedAddress(true);
			setTimeout(() => setCopiedAddress(false), 2000);
		}
	};

	const formatAddress = (addr: string) => {
		return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
	};

	const formatBalance = (balance: any) => {
		if (!balance) return "0";
		return `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}`;
	};

	if (isConnected && address) {
		return (
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						🔗 Wallet Connected
					</CardTitle>
					<CardDescription>
						Your wallet is connected to the RedTeam Portal
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<span className="text-sm text-muted-foreground">
								Address:
							</span>
							<div className="flex items-center gap-2">
								<Badge
									variant="secondary"
									className="font-mono"
								>
									{formatAddress(address)}
								</Badge>
								<Button
									variant="ghost"
									size="sm"
									onClick={copyAddress}
									className="h-6 w-6 p-0"
								>
									{copiedAddress ? "✓" : "📋"}
								</Button>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<span className="text-sm text-muted-foreground">
								Balance:
							</span>
							<Badge variant="outline">
								{isBalanceLoading
									? "Loading..."
									: formatBalance(balance)}
							</Badge>
						</div>
					</div>

					<Button
						onClick={disconnectWallet}
						variant="destructive"
						className="w-full"
					>
						🔌 Disconnect Wallet
					</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					🔗 Connect Wallet
				</CardTitle>
				<CardDescription>
					Connect your wallet to access the RedTeam Portal
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-3">
				{error && (
					<div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
						{error.message}
					</div>
				)}

				{connectors.map((connector) => (
					<Button
						key={connector.id}
						onClick={() => connectWallet(connector.id)}
						disabled={isConnecting || isPending}
						variant="outline"
						className="w-full justify-start"
					>
						🔗{" "}
						{isConnecting || isPending
							? "Connecting..."
							: `Connect ${connector.name}`}
					</Button>
				))}
			</CardContent>
		</Card>
	);
}
