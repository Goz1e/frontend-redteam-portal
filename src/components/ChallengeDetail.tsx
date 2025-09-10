import { useParams, useNavigate } from "react-router-dom";
import {
	ArrowLeft,
	Clock,
	Users,
	Target,
	BookOpen,
	Code,
	TestTube,
} from "lucide-react";
import { useChallenges } from "../hooks/useChallenges";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";
import { toast } from "sonner";
import { Challenge } from "../types/challenge";

export function ChallengeDetail() {
	const { challengeId } = useParams<{ challengeId: string }>();
	const navigate = useNavigate();
	const { data: challenges, isLoading, error } = useChallenges();

	// Find the specific challenge from the list
	const challenge = challenges?.find((c: Challenge) => c.id === challengeId);

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			toast.success("Code copied to clipboard!");
		} catch (err) {
			toast.error("Failed to copy code to clipboard");
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen bg-background text-foreground p-6">
				<div className="max-full mx-auto space-y-6">
					<div className="flex items-center gap-4">
						<Skeleton className="h-10 w-10 rounded bg-sidebar" />
						<Skeleton className="h-8 w-48 bg-sidebar" />
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="md:col-span-2 space-y-6">
							<Skeleton className="h-64 w-full rounded-lg bg-sidebar" />
							<Skeleton className="h-32 w-full rounded-lg bg-sidebar" />
						</div>
						<div className="space-y-4">
							<Skeleton className="h-48 w-full rounded-lg bg-sidebar" />
							<Skeleton className="h-32 w-full rounded-lg bg-sidebar" />
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (error || (!isLoading && !challenge)) {
		return (
			<div className="min-h-screen bg-background text-foreground p-6">
				<div className="w-full mx-auto">
					<div className="flex items-center gap-4 mb-6">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => navigate(-1)}
							className="flex items-center gap-2"
						>
							<ArrowLeft className="h-4 w-4" />
							Back
						</Button>
					</div>
					<Card>
						<CardContent className="p-6 text-center">
							<h2 className="text-xl font-semibold text-destructive mb-2">
								Challenge Not Found
							</h2>
							<p className="text-muted-foreground">
								The challenge you're looking for doesn't exist
								or couldn't be loaded.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case "active":
				return "default";
			case "completed":
				return "secondary";
			case "pending":
				return "outline";
			default:
				return "outline";
		}
	};

	const getCategoryColor = (category: string) => {
		switch (category.toLowerCase()) {
			case "web":
				return "bg-blue-500/10 text-blue-400 border-blue-500/20";
			case "crypto":
				return "bg-green-500/10 text-green-400 border-green-500/20";
			case "pwn":
				return "bg-red-500/10 text-red-400 border-red-500/20";
			case "reverse":
				return "bg-purple-500/10 text-purple-400 border-purple-500/20";
			case "forensics":
				return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
			default:
				return "bg-gray-500/10 text-gray-400 border-gray-500/20";
		}
	};

	return (
		<div className="min-h-screen bg-background text-foreground p-6">
			<div className="max-full mx-auto space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => navigate(-1)}
							className="flex items-center gap-2"
						>
							<ArrowLeft className="h-4 w-4" />
							Back
						</Button>
						<div>
							<h1 className="text-2xl font-bold">
								{challenge.name}
							</h1>
							<p className="text-muted-foreground">
								Challenge Details
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Badge
							variant={getStatusColor(challenge.status)}
							className={
								challenge.status === "Active" ||
								challenge.status === "Active"
									? "bg-green-500/10 text-green-400 border-green-500/20"
									: ""
							}
						>
							{challenge.status}
						</Badge>
						<Badge className={getCategoryColor(challenge.category)}>
							{challenge.category}
						</Badge>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Main Content */}
					<div className="md:col-span-2 space-y-6">
						{/* Description */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<BookOpen className="h-5 w-5" />
									Description
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-foreground leading-relaxed whitespace-pre-wrap">
									{challenge.description}
								</p>
							</CardContent>
						</Card>

						{/* Template */}
						{challenge.template && (
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Code className="h-5 w-5" />
										Template
									</CardTitle>
									<CardDescription>
										Starting code or template for this
										challenge
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="relative">
										<pre className="bg-black/50 border border-border p-4 rounded-lg overflow-x-auto text-sm font-mono">
											<code className="text-green-400">
												{challenge.template}
											</code>
										</pre>
										<Button
											variant="ghost"
											size="sm"
											className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-secondary"
											onClick={() =>
												copyToClipboard(
													challenge.template
												)
											}
										>
											📋
										</Button>
									</div>
								</CardContent>
							</Card>
						)}

						{/* Testing Guide */}
						{challenge.testingGuide && (
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<TestTube className="h-5 w-5" />
										Testing Guide
									</CardTitle>
									<CardDescription>
										Instructions for testing and validation
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="prose prose-invert max-w-none">
										<p className="whitespace-pre-wrap">
											{challenge.testingGuide}
										</p>
									</div>
								</CardContent>
							</Card>
						)}
					</div>

					{/* Sidebar */}
					<div className="space-y-4">
						{/* Challenge Stats */}
						<Card>
							<CardHeader>
								<CardTitle>Challenge Stats</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<Target className="h-4 w-4 text-muted-foreground" />
										<span className="text-sm">Weight</span>
									</div>
									<Badge variant="outline">
										{challenge.weight}
									</Badge>
								</div>

								<Separator />

								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<Users className="h-4 w-4 text-muted-foreground" />
										<span className="text-sm">
											Submissions
										</span>
									</div>
									<Badge variant="outline">
										{challenge.submissions}
									</Badge>
								</div>

								<Separator />

								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<Target className="h-4 w-4 text-muted-foreground" />
										<span className="text-sm">
											Avg Score
										</span>
									</div>
									<Badge variant="outline">
										{challenge.avgScore.toFixed(1)}%
									</Badge>
								</div>

								<Separator />

								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<Clock className="h-4 w-4 text-muted-foreground" />
										<span className="text-sm">
											Time Remaining
										</span>
									</div>
									<Badge variant="outline">
										{challenge.timeRemaining}
									</Badge>
								</div>
							</CardContent>
						</Card>

						{/* Actions */}
						<Card>
							<CardHeader>
								<CardTitle>Actions</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								<Button
									className="w-full"
									size="sm"
									onClick={() => navigate(`/submissions`)}
								>
									Start Challenge
								</Button>
								<Button
									variant="outline"
									className="w-full opacity-50"
									size="sm"
									disabled
								>
									Download Files
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
