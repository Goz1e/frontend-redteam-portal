import { useState } from "react";
import { motion } from "motion/react";
import {
	Routes,
	Route,
	Navigate,
	Outlet,
	useNavigate,
	useLocation,
} from "react-router-dom";

// Pages
import { LandingPage } from "./components/LandingPage";
import { Dashboard } from "./components/Dashboard";
import { Submissions } from "./components/Submissions";
import { ChallengeDetail } from "./components/ChallengeDetail";
// import { MinerProfiles } from "./components/MinerProfiles";
// import { Settings } from "./components/Settings";
// import { Payouts } from "./components/Payouts";

// UI
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";

function LandingRoute() {
	return (
		<div className="min-h-screen bg-black text-white">
			<LandingPage />
		</div>
	);
}

function DashboardLayout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<motion.div
			className="min-h-screen bg-black text-white flex"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<motion.div
				className={`${
					isSidebarOpen ? "w-64" : "w-16"
				} bg-sidebar border-r border-sidebar-border relative z-10`}
				animate={{ width: isSidebarOpen ? 256 : 64 }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
			>
				<Sidebar
					isOpen={isSidebarOpen}
					setIsOpen={setIsSidebarOpen}
					onBackToLanding={() => navigate("/")}
				/>
			</motion.div>

			<div className="flex-1 flex flex-col overflow-hidden">
				<Header />
				<main className="flex-1 p-6 overflow-auto">
					<motion.div
						key={location.pathname}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="w-full h-full"
					>
						<Outlet />
					</motion.div>
				</main>
			</div>
		</motion.div>
	);
}

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<LandingRoute />} />
			<Route element={<DashboardLayout />}>
				<Route path="/challenges" element={<Dashboard />} />
				<Route
					path="/challenges/:challengeId"
					element={<ChallengeDetail />}
				/>
				<Route path="/submissions" element={<Submissions />} />
				{/* <Route path="/profiles" element={<MinerProfiles />} />
				<Route path="/payouts" element={<Payouts />} />
				<Route path="/settings" element={<Settings />} /> */}
			</Route>
			<Route path="*" element={<Navigate to="/dashboard" replace />} />
		</Routes>
	);
}
