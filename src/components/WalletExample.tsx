import { useWallet } from "../hooks/useWallet";
import { WalletConnect } from "./WalletConnect";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

/**
 * Example component showing how to use the wallet functionality
 * You can integrate this pattern into any of your existing components
 */
export function WalletExample() {
	const { address, isConnected, balance } = useWallet();

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Wallet Integration Example</CardTitle>
					<CardDescription>
						This shows how to use the wallet functionality in your
						components
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<span>Connection Status:</span>
							<Badge
								variant={isConnected ? "default" : "secondary"}
							>
								{isConnected ? "Connected" : "Disconnected"}
							</Badge>
						</div>

						{isConnected && address && (
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<span>Address:</span>
									<code className="text-sm bg-muted px-2 py-1 rounded">
										{address}
									</code>
								</div>

								{balance && (
									<div className="flex items-center gap-2">
										<span>Balance:</span>
										<Badge variant="outline">
											{parseFloat(
												balance.formatted
											).toFixed(4)}{" "}
											{balance.symbol}
										</Badge>
									</div>
								)}
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			<WalletConnect />
		</div>
	);
}
