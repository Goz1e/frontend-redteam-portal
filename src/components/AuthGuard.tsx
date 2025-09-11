import { ReactNode } from "react";
import { useUser } from "@stackframe/react";
import { Navigate, useLocation } from "react-router-dom";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { User, Lock } from "lucide-react";

interface AuthGuardProps {
	children: ReactNode;
	fallback?: ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
	const user = useUser();
	const location = useLocation();

	// If user is authenticated, render the protected content
	if (user) {
		return <>{children}</>;
	}

	// If custom fallback is provided, use it
	if (fallback) {
		return <>{fallback}</>;
	}

	// Default authentication required message
	return (
		<div className="flex items-center justify-center min-h-[60vh] p-6">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="flex justify-center mb-4">
						<div className="p-3 bg-primary/10 rounded-full">
							<Lock className="h-8 w-8 text-primary" />
						</div>
					</div>
					<CardTitle className="text-xl">
						Authentication Required
					</CardTitle>
					<CardDescription>
						You need to be logged in to access this page.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="text-center text-sm text-muted-foreground">
						Please sign in to view your submissions and access
						protected features.
					</div>

					<div className="flex flex-col gap-3">
						<Button
							onClick={() => {
								// Navigate to sign in - Neon Auth will handle this
								window.location.href = "/handler/sign-in";
							}}
							className="w-full"
						>
							<User className="mr-2 h-4 w-4" />
							Sign In
						</Button>

						<Button
							variant="outline"
							onClick={() => {
								// Navigate to sign up
								window.location.href = "/handler/sign-up";
							}}
							className="w-full"
						>
							Create Account
						</Button>
					</div>

					<div className="text-center">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => {
								// Go back to previous page or dashboard
								window.history.back();
							}}
						>
							← Go Back
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

// Alternative: Redirect-based AuthGuard
export function AuthGuardRedirect({ children }: { children: ReactNode }) {
	const user = useUser();
	const location = useLocation();

	if (!user) {
		// Redirect to sign-in page, preserving the intended destination
		return (
			<Navigate
				to={`/handler/sign-in?redirect=${encodeURIComponent(
					location.pathname
				)}`}
				replace
			/>
		);
	}

	return <>{children}</>;
}

// Hook for checking authentication status
export function useAuthGuard() {
	const user = useUser();

	return {
		isAuthenticated: !!user,
		user,
		requireAuth: (callback: () => void) => {
			if (user) {
				callback();
			} else {
				window.location.href = "/handler/sign-in";
			}
		},
	};
}
