import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Pages
import DashboardLayout from "./components/DashboardLayout";
import { LandingPage } from "./components/LandingPage";
import { Dashboard } from "./components/Dashboard";
import { Submissions } from "./components/Submissions";
import { ChallengeDetail } from "./components/ChallengeDetail";
// import { MinerProfiles } from "./components/MinerProfiles";
// import { Settings } from "./components/Settings";
// import { Payouts } from "./components/Payouts";

// Authentication
import { AuthGuard } from "./components/AuthGuard";

// Neon Auth
import { StackHandler, StackProvider, StackTheme } from "@stackframe/react";
import { Suspense } from "react";
import { stackClientApp } from "./stack";

function HandlerRoutes() {
	const location = useLocation();
	return (
		<StackHandler
			app={stackClientApp}
			location={location.pathname}
			fullPage
		/>
	);
}

export default function App() {
	return (
		<Suspense fallback={null}>
			<StackProvider app={stackClientApp}>
				<StackTheme>
					<Routes>
						<Route path="/handler/*" element={<HandlerRoutes />} />
						<Route path="/" element={<LandingPage />} />
						<Route element={<DashboardLayout />}>
							<Route path="/challenges" element={<Dashboard />} />
							<Route
								path="/challenges/:challengeId"
								element={<ChallengeDetail />}
							/>
							<Route
								path="/submissions"
								element={
									<AuthGuard>
										<Submissions />
									</AuthGuard>
								}
							/>
							{/* <Route path="/profiles" element={<MinerProfiles />} />
				<Route path="/payouts" element={<Payouts />} />
				<Route path="/settings" element={<Settings />} /> */}
						</Route>
						<Route
							path="*"
							element={<Navigate to="/dashboard" replace />}
						/>
					</Routes>
				</StackTheme>
			</StackProvider>
		</Suspense>
	);
}
