import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
	TrendingUp,
	Users,
	Trophy,
	DollarSign,
	AlertTriangle,
	Loader2,
	ChevronRight,
} from "lucide-react";

import { useChallenges } from "../hooks/useChallenges";
import { Challenge } from "../types/challenge";

export function Dashboard() {
	const navigate = useNavigate();

	const stats = [
		{
			title: "Total Earned",
			value: "4.12 TAO",
			subtitle: "≈$1,244.83 USD",
			icon: DollarSign,
			color: "text-green-400",
		},
		{
			title: "Active Validators",
			value: "23",
			subtitle: "+2 from last week",
			icon: Users,
			color: "text-blue-400",
		},
		{
			title: "Submissions",
			value: "2,847",
			subtitle: "Total platform",
			icon: Trophy,
			color: "text-purple-400",
		},
		{
			title: "Success Rate",
			value: "--%",
			subtitle: "Your submissions",
			icon: TrendingUp,
			color: "text-primary",
		},
	];

	const {
		data: challenges,
		isLoading: isLoadingChallenges,
		isError: isErrorChallenges,
	} = useChallenges();

	return (
		<motion.div
			className="space-y-6"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<motion.div
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.1 }}
			>
				<h1 className="text-2xl font-semibold text-foreground mb-2">
					Dashboard
				</h1>
				<p className="text-muted-foreground">
					Platform overview and key metrics
				</p>
			</motion.div>

			{/* Key Stats */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat, index) => {
					const Icon = stat.icon;
					return (
						<motion.div
							key={stat.title}
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.2 + index * 0.1 }}
							whileHover={{ y: -5 }}
						>
							<Card className="bg-card border-border card-hover group cursor-pointer gap-2">
								<CardHeader className="flex flex-row items-center justify-between space-y-0">
									<CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
										{stat.title}
									</CardTitle>
									<motion.div
										whileHover={{ rotate: 10, scale: 1.1 }}
										transition={{
											type: "spring",
											stiffness: 400,
											damping: 10,
										}}
									>
										<Icon
											className={`h-4 w-4 ${stat.color} group-hover:scale-110 transition-transform`}
										/>
									</motion.div>
								</CardHeader>
								<CardContent>
									<motion.div
										className="text-2xl font-bold text-foreground"
										initial={{ scale: 0.8 }}
										animate={{ scale: 1 }}
										transition={{
											delay: 0.3 + index * 0.1,
											type: "spring",
										}}
									>
										{stat.value}
									</motion.div>
									<p className="text-xs text-muted-foreground">
										{stat.subtitle}
									</p>
								</CardContent>
							</Card>
						</motion.div>
					);
				})}
			</div>

			{/* Platform Rules Overview */}
			<motion.div
				initial={{ y: 30, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.6 }}
			>
				<Card className="bg-card border-border border-l-4 border-l-primary card-hover">
					<CardHeader>
						<CardTitle className="text-foreground flex items-center gap-2 text-[16px]">
							<motion.div
								animate={{ rotate: [0, 5, -5, 0] }}
								transition={{
									duration: 2,
									repeat: Infinity,
									repeatDelay: 3,
								}}
							>
								<AlertTriangle className="h-5 w-5 text-primary" />
							</motion.div>
							Platform Rules & Requirements
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<motion.div
								className="space-y-3"
								initial={{ x: -20, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ delay: 0.7 }}
							>
								{[
									{
										label: "ESLint Check",
										badge: "Required",
										color: "bg-green-900/20 text-green-400 border-green-400/20",
									},
									{
										label: "Minimum Score",
										badge: ">0.5",
										color: "border-border text-muted-foreground",
									},
									{
										label: "Comparison Score",
										badge: "<0.7",
										color: "border-border text-muted-foreground",
									},
								].map((item, index) => (
									<motion.div
										key={item.label}
										className="flex items-center justify-between interactive-element p-2 rounded"
										whileHover={{ x: 5 }}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{
											delay: 0.8 + index * 0.1,
										}}
									>
										<span className="text-sm text-muted-foreground">
											{item.label}
										</span>
										<Badge
											variant="secondary"
											className={item.color}
										>
											{item.badge}
										</Badge>
									</motion.div>
								))}
							</motion.div>
							<motion.div
								className="space-y-3"
								initial={{ x: 20, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ delay: 0.7 }}
							>
								{[
									{
										label: "Submission Decay",
										badge: "Day 10-15",
										color: "border-border text-muted-foreground",
									},
									{
										label: "Resubmission Rule",
										badge: "<0.9",
										color: "border-border text-muted-foreground",
									},
									{
										label: "Daily Limit",
										badge: "1 per challenge",
										color: "border-border text-muted-foreground",
									},
								].map((item, index) => (
									<motion.div
										key={item.label}
										className="flex items-center justify-between interactive-element p-2 rounded"
										whileHover={{ x: -5 }}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{
											delay: 0.8 + index * 0.1,
										}}
									>
										<span className="text-sm text-muted-foreground">
											{item.label}
										</span>
										<Badge
											variant="outline"
											className={item.color}
										>
											{item.badge}
										</Badge>
									</motion.div>
								))}
							</motion.div>
						</div>
					</CardContent>
				</Card>
			</motion.div>

			{/* Recent Activity */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<motion.div
					initial={{ x: -30, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ delay: 0.9 }}
				>
					<Card className="bg-card border-border card-hover">
						<CardHeader>
							<CardTitle className="text-foreground">
								Current Challenges
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							{!isLoadingChallenges &&
								challenges &&
								challenges.map(
									(challenge: Challenge, index: number) => (
										<motion.div
											key={challenge.id}
											className="flex items-center justify-between p-3 bg-secondary rounded-lg interactive-element group cursor-pointer hover:bg-secondary/80 transition-colors"
											initial={{ y: 20, opacity: 0 }}
											animate={{ y: 0, opacity: 1 }}
											transition={{
												delay: 1 + index * 0.1,
											}}
											whileHover={{ scale: 1.02 }}
											onClick={() =>
												navigate(
													`/challenges/${challenge.id}`,
												)
											}
										>
											<div className="flex-1">
												<div className="flex items-center gap-2 mb-1">
													<p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
														{challenge.name}
													</p>
													<Badge
														variant="outline"
														className="text-xs"
													>
														{challenge.category}
													</Badge>
												</div>
												<p className="text-xs text-muted-foreground">
													Weight: {challenge.weight} •
													Submissions:{" "}
													{challenge.submissions}
												</p>
											</div>
											<div className="flex items-center gap-3">
												<div className="text-right">
													<p className="text-sm font-medium text-foreground">
														{
															challenge.timeRemaining
														}
													</p>
													<Badge
														variant={
															challenge.status.toLowerCase() ===
															"Active"
																? "default"
																: "outline"
														}
														className={
															challenge.status.toLowerCase() ===
															"active"
																? "bg-green-900/20 text-green-400 border-green-400/20"
																: ""
														}
													>
														{challenge.status}
													</Badge>
												</div>
												<ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
											</div>
										</motion.div>
									),
								)}
							{isLoadingChallenges && (
								<div className="flex items-center justify-center w-full ">
									<Loader2 className="h-4 w-4 animate-spin" />
								</div>
							)}
							{!isLoadingChallenges &&
								!challenges &&
								!isErrorChallenges && (
									<div className="flex items-center justify-center w-full py-8">
										<p className="text-sm text-muted-foreground">
											No challenges available
										</p>
									</div>
								)}
							{!isLoadingChallenges &&
								challenges &&
								challenges.length === 0 && (
									<div className="flex items-center justify-center w-full py-8">
										<p className="text-sm text-muted-foreground">
											No challenges found
										</p>
									</div>
								)}
							{isErrorChallenges && (
								<div className="flex items-center justify-center">
									<AlertTriangle className="h-4 w-4 text-red-500" />
									<p className="text-sm text-red-500">
										Error loading challenges
									</p>
								</div>
							)}
						</CardContent>
					</Card>
				</motion.div>

				<motion.div
					initial={{ x: 30, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ delay: 0.9 }}
				>
					<Card className="bg-card border-border card-hover">
						<CardHeader>
							<CardTitle className="text-foreground">
								Scoring Algorithm
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								{[
									{
										label: "Score-driven weights",
										badge: "Active",
										color: "bg-blue-900/20 text-blue-400",
									},
									{
										label: "Append-only registry",
										badge: "Verified",
										color: "bg-green-900/20 text-green-400",
									},
									{
										label: "Hash-anchored manifests",
										badge: "Secured",
										color: "bg-green-900/20 text-green-400",
									},
								].map((item, index) => (
									<motion.div
										key={item.label}
										className="flex items-center justify-between interactive-element p-2 rounded"
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{
											delay: 1.3 + index * 0.1,
										}}
										whileHover={{ scale: 1.05 }}
									>
										<span className="text-sm text-muted-foreground">
											{item.label}
										</span>
										<Badge
											variant="secondary"
											className={item.color}
										>
											{item.badge}
										</Badge>
									</motion.div>
								))}
							</div>
							<motion.div
								className="mt-4"
								initial={{ scaleX: 0 }}
								animate={{ scaleX: 1 }}
								transition={{ delay: 1.6, duration: 0.8 }}
							>
								<p className="text-xs text-muted-foreground mb-2">
									Transparency Score
								</p>
								<Progress value={95} className="h-2" />
								<motion.p
									className="text-xs text-muted-foreground mt-1"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 2.4 }}
								>
									95% - Excellent
								</motion.p>
							</motion.div>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</motion.div>
	);
}
