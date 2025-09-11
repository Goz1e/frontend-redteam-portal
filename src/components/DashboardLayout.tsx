import { useState } from "react";
import { motion } from "motion/react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export default function DashboardLayout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<motion.div
			className="max-h-svh bg-black text-white flex"
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
