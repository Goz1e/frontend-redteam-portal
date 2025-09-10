import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
	Home,
	FileText,
	Users,
	DollarSign,
	Settings as SettingsIcon,
	Plus,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";

interface SidebarProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	onBackToLanding: () => void;
}

export function Sidebar({ isOpen, setIsOpen, onBackToLanding }: SidebarProps) {
	const [walletHovered, setWalletHovered] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const navigation = [
		{ to: "/challenges", id: "dashboard", label: "Dashboard", icon: Home },
		{
			to: "/submissions",
			id: "submissions",
			label: "Submissions",
			icon: FileText,
		},
		{
			to: "/profiles",
			id: "profiles",
			label: "Miner Profiles",
			icon: Users,
		},
		{ to: "/payouts", id: "payouts", label: "Payouts", icon: DollarSign },
		{
			to: "/settings",
			id: "settings",
			label: "Settings",
			icon: SettingsIcon,
		},
	];

	return (
		<div className="h-full flex flex-col bg-sidebar text-sidebar-foreground">
			{/* Sidebar Header */}
			<div className="p-4 border-b border-sidebar-border h-16 flex items-center justify-between">
				<AnimatePresence mode="wait">
					{isOpen && (
						<motion.div
							key="header-content"
							className="flex items-center space-x-2"
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -10 }}
							transition={{ duration: 0.2 }}
						>
							<button
								onClick={onBackToLanding}
								className="p-1 text-primary hover:text-primary/80 transition-colors duration-200 text-xs"
								title="Back to Landing"
							>
								<span className="text-sm font-medium ">
									REDTEAM
								</span>
							</button>
						</motion.div>
					)}
				</AnimatePresence>
				<motion.button
					onClick={() => setIsOpen(!isOpen)}
					className="p-1 text-muted-foreground hover:text-foreground transition-all duration-200"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
				>
					<AnimatePresence mode="wait">
						{isOpen ? (
							<motion.div
								key="left"
								initial={{ opacity: 0, rotate: 180 }}
								animate={{ opacity: 1, rotate: 0 }}
								exit={{ opacity: 0, rotate: -180 }}
								transition={{ duration: 0.3 }}
							>
								<ChevronLeft className="h-4 w-4" />
							</motion.div>
						) : (
							<motion.div
								key="right"
								initial={{ opacity: 0, rotate: -180 }}
								animate={{ opacity: 1, rotate: 0 }}
								exit={{ opacity: 0, rotate: 180 }}
								transition={{ duration: 0.3 }}
							>
								<ChevronRight className="h-4 w-4" />
							</motion.div>
						)}
					</AnimatePresence>
				</motion.button>
			</div>

			{/* New Submission Button */}
			<div className="p-4">
				<motion.button
					onClick={() => navigate("/submissions")}
					className="w-full bg-primary hover:bg-primary/90 text-primary-foreground relative overflow-hidden group rounded-md px-4 py-2 transition-all duration-200"
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
				>
					<motion.div className="absolute inset-0 bg-gradient-to-r from-primary to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
					<div className="relative z-10 flex items-center justify-center w-full">
						<Plus className="h-4 w-4 mr-2" />
						<AnimatePresence mode="wait">
							{isOpen && (
								<motion.span
									key="text"
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -10 }}
									transition={{ duration: 0.2 }}
								>
									New Submission
								</motion.span>
							)}
						</AnimatePresence>
					</div>
				</motion.button>
			</div>

			{/* Navigation */}
			<nav className="flex-1 p-4 space-y-2">
				{navigation.map((item, index) => {
					const Icon = item.icon;
					const isActive = location.pathname.startsWith(item.to);
					const isComingSoon = [
						"/profiles",
						"/payouts",
						"/settings",
					].includes(item.to);

					return (
						<motion.div
							key={item.id}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.05, duration: 0.3 }}
							className="relative"
						>
							<NavLink
								to={isComingSoon ? location.pathname : item.to}
								onClick={(e) => {
									if (isComingSoon) {
										e.preventDefault();
										toast("Coming soon...");
									}
								}}
								className={`w-full justify-start relative group rounded-md px-3 py-2 transition-all duration-200 flex items-center ${"text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"} ${
									isComingSoon ? "opacity-80" : ""
								}`}
							>
								<AnimatePresence>
									{isActive && (
										<motion.div
											className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r"
											initial={{ scaleY: 0 }}
											animate={{ scaleY: 1 }}
											exit={{ scaleY: 0 }}
											transition={{ duration: 0.3 }}
										/>
									)}
								</AnimatePresence>
								<motion.div
									whileHover={{ rotate: 2, scale: 1.1 }}
									transition={{ duration: 0.2 }}
								>
									<Icon className="h-4 w-4" />
								</motion.div>
								<AnimatePresence mode="wait">
									{isOpen && (
										<motion.span
											className="ml-2"
											initial={{ opacity: 0, x: -10 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -10 }}
											transition={{ duration: 0.2 }}
										>
											{item.label}
										</motion.span>
									)}
								</AnimatePresence>
							</NavLink>
						</motion.div>
					);
				})}
			</nav>

			{/* Wallet Balance */}
			<div className="p-4 border-t border-sidebar-border">
				<motion.div
					className="bg-card rounded-lg p-3 cursor-pointer transition-all duration-300"
					onMouseEnter={() => setWalletHovered(true)}
					onMouseLeave={() => setWalletHovered(false)}
					whileHover={{ scale: 1.02 }}
				>
					<AnimatePresence mode="wait">
						{isOpen && (
							<motion.p
								className="text-xs text-muted-foreground mb-1"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
							>
								Wallet Balance
							</motion.p>
						)}
					</AnimatePresence>
					<div className="flex items-center justify-between">
						<div>
							<motion.p
								className="text-sm font-semibold text-foreground"
								animate={{ scale: walletHovered ? 1.1 : 1 }}
								transition={{ duration: 0.2 }}
							>
								2.45 TAO
							</motion.p>
							<AnimatePresence mode="wait">
								{isOpen && (
									<motion.p
										className="text-xs text-muted-foreground"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.2 }}
									>
										~$123.45 USD
									</motion.p>
								)}
							</AnimatePresence>
						</div>
					</div>
					<motion.button
						onClick={() => navigate("/payouts")}
						className="w-full mt-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded px-3 py-1 text-sm transition-all duration-200"
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						<AnimatePresence mode="wait">
							{isOpen ? (
								<motion.span
									key="withdraw"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									Withdraw
								</motion.span>
							) : (
								<motion.span
									key="w"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									W
								</motion.span>
							)}
						</AnimatePresence>
					</motion.button>
				</motion.div>
			</div>
		</div>
	);
}
