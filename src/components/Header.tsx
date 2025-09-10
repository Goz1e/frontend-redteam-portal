import { useState } from "react";
import { motion } from "motion/react";
import { User } from "lucide-react";
import { CustomConnectButton } from "./CustomConnectButton";

export function Header() {
	const [logoHovered, setLogoHovered] = useState(false);
	const [profileHovered, setProfileHovered] = useState(false);
	const [logoSpinning, setLogoSpinning] = useState(false);

	const onLogoClick = () => {
		setLogoSpinning(true);
		setTimeout(() => {
			setLogoSpinning(false);
		}, 800);
	};

	return (
		<header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
			<motion.div
				className="flex items-center space-x-4"
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.1, duration: 0.5 }}
			>
				<motion.div
					className="flex items-center space-x-2 cursor-pointer group transition-all duration-200"
					onClick={onLogoClick}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<motion.div
						className="w-8 h-8 bg-primary rounded flex items-center justify-center relative overflow-hidden transition-transform duration-300"
						animate={{ rotate: logoSpinning ? 360 : 0 }}
						transition={{ duration: 0.8 }}
					>
						<motion.div className="absolute inset-0 bg-gradient-to-r from-primary to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						<motion.span
							className="text-primary-foreground font-bold relative z-10"
							whileHover={{ scale: 1.2 }}
							transition={{ duration: 0.2 }}
						>
							R
						</motion.span>
					</motion.div>
					<motion.span
						className="text-xl font-semibold text-foreground group-hover:text-primary transition-all duration-200"
						animate={{ x: logoHovered ? 2 : 0 }}
						onMouseEnter={() => setLogoHovered(true)}
						onMouseLeave={() => setLogoHovered(false)}
					>
						RedTeam
					</motion.span>
				</motion.div>
			</motion.div>

			<motion.div
				className="flex items-center space-x-4"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.2, duration: 0.5 }}
			>
				<motion.div
					className="flex items-center space-x-2 pl-4  transition-all duration-200"
					onMouseEnter={() => setProfileHovered(true)}
					onMouseLeave={() => setProfileHovered(false)}
					whileHover={{ scale: 1.02 }}
				>
					<motion.div
						className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center cursor-pointer group transition-all duration-200"
						animate={{ rotate: profileHovered ? 2 : 0 }}
						whileHover={{ scale: 1.1 }}
					>
						<motion.div
							animate={{ scale: profileHovered ? 1.2 : 1 }}
							transition={{ duration: 0.2 }}
						>
							<User className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-all duration-200" />
						</motion.div>
					</motion.div>
					<motion.span
						className="text-sm text-muted-foreground font-mono cursor-pointer hover:text-foreground transition-all duration-200"
						animate={{ x: profileHovered ? 2 : 0 }}
					>
						<CustomConnectButton />
					</motion.span>
				</motion.div>
			</motion.div>
		</header>
	);
}
