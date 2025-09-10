import { Providers } from "../providers";

interface LayoutProps {
	children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<Providers>{children}</Providers>
		</div>
	);
}
