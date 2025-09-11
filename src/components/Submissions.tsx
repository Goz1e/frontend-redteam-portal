import {
	useState,
	useEffect,
	useMemo,
	useCallback,
	lazy,
	Suspense,
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import { useChallenges } from "../hooks/useChallenges";
import {
	useUserSubmissions,
	useCreateSubmission,
	useMinerProfileByUser,
	useCreateMinerProfile,
} from "../hooks/useSubmissions";
import { Challenge, Submission } from "../types/challenge";
import { useUser } from "@stackframe/react";
import { toast } from "sonner";
import {
	Play,
	Upload,
	CheckCircle,
	XCircle,
	AlertTriangle,
	Info,
	Code,
	TestTube,
	Clock,
	Target,
	Maximize,
	Minimize,
	ChevronDown,
	ChevronUp,
} from "lucide-react";

// Lazy-load Monaco (big dependency) to speed initial paint.
const MonacoEditor = lazy(() => import("@monaco-editor/react"));

/** ---------- helper functions ---------- */
// const formatTimeAgo = (dateString: string) => {
// 	const date = new Date(dateString);
// 	const now = new Date();
// 	const diffInHours = Math.floor(
// 		(now.getTime() - date.getTime()) / (1000 * 60 * 60)
// 	);

// 	if (diffInHours < 1) return "Just now";
// 	if (diffInHours < 24) return `${diffInHours}h ago`;
// 	const diffInDays = Math.floor(diffInHours / 24);
// 	if (diffInDays < 7) return `${diffInDays}d ago`;
// 	return date.toLocaleDateString();
// };

const getStatusBadgeClass = (status: string) => {
	switch (status.toLowerCase()) {
		case "completed":
			return "bg-green-900/20 text-green-400";
		case "scored":
			return "bg-green-900/20 text-green-400";
		case "processing":
			return "border-yellow-400/20 text-yellow-400";
		case "failed":
			return "bg-red-900/20 text-red-400";
		default:
			return "border-blue-400/20 text-blue-400";
	}
};

/** ---------- types ---------- */
type Language = "javascript" | "typescript" | "python";

interface TestResults {
	eslint: { passed: boolean; issues: number };
	syntax: { passed: boolean; errors: string[] };
	logic: { passed: boolean; score: number };
	comparison: { score: number; threshold: number; passed: boolean };
	performance: { executionTime: number; memoryUsage: string };
}

export function Submissions() {
	const [selectedChallenge, setSelectedChallenge] = useState("");
	const [code, setCode] = useState("");
	const [language, setLanguage] = useState<Language>("javascript");
	const [testResults, setTestResults] = useState<TestResults | null>(null);
	const [isTesting, setIsTesting] = useState(false);
	const [isEditorExpanded, setIsEditorExpanded] = useState(false);
	const [rulesExpanded, setRulesExpanded] = useState(false);
	const [progress, setProgress] = useState(0); // for nicer test progress UI

	// Get current user
	const user = useUser();

	// Get Polkadot wallet state (for optional rewards display)

	// Fetch challenges data
	const {
		data: challenges,
		isLoading: challengesLoading,
		error: challengesError,
	} = useChallenges();

	// Fetch user submissions
	const {
		data: userSubmissions,
		isLoading: submissionsLoading,
		error: submissionsError,
	} = useUserSubmissions(user?.id || "");

	// Create submission mutation
	const createSubmission = useCreateSubmission();

	// Get or create miner profile using user ID
	const {
		data: minerProfile,
		isLoading: minerProfileLoading,
		isError: minerProfileError,
	} = useMinerProfileByUser(user?.id || "");

	const createMinerProfile = useCreateMinerProfile();

	/** Stable editor options to avoid reconfiguring Monaco on each render */
	const editorOptions = useMemo(
		() => ({
			fontSize: 14,
			fontFamily: "Fira Mono, Menlo, Monaco, Consolas, monospace",
			minimap: { enabled: false },
			automaticLayout: true,
		}),
		[],
	);

	/** Toggle handlers (stable) */
	const toggleRules = useCallback(() => setRulesExpanded((v) => !v), []);
	const toggleEditor = useCallback(() => setIsEditorExpanded((v) => !v), []);

	/** Simulated testing (stable) */
	const handleTest = useCallback(() => {
		if (!selectedChallenge || !code.trim()) return;
		setIsTesting(true);
		setTestResults(null);
		setProgress(0);

		// Simulate progressive progress and a result
		const start = performance.now();
		const timer = window.setInterval(() => {
			const elapsed = performance.now() - start;
			const pct = Math.min(95, Math.round((elapsed / 3000) * 100));
			setProgress(pct);
		}, 120);

		const timeout = window.setTimeout(() => {
			const mock: TestResults = {
				eslint: { passed: true, issues: 0 },
				syntax: { passed: true, errors: [] },
				logic: { passed: true, score: 0.85 },
				comparison: { score: 0.65, threshold: 0.7, passed: true },
				performance: { executionTime: 120, memoryUsage: "45MB" },
			};
			window.clearInterval(timer);
			setProgress(100);
			setTestResults(mock);
			setIsTesting(false);
		}, 3000);

		// Cleanup if user navigates away fast
		return () => {
			window.clearInterval(timer);
			window.clearTimeout(timeout);
		};
	}, [selectedChallenge, code]);

	const handleSubmit = useCallback(async () => {
		if (
			!testResults ||
			!testResults.eslint.passed ||
			!user?.id ||
			!selectedChallenge
		)
			return;

		// Check if miner profile exists, create if it doesn't
		let currentMinerProfile = minerProfile;

		if (!currentMinerProfile && !minerProfileError) {
			// Still loading, wait
			return;
		}

		if (!currentMinerProfile) {
			// Create miner profile using user ID
			try {
				currentMinerProfile = await createMinerProfile.mutateAsync({
					user_id: user.id, // Use logged-in user ID
					trustTier: "bronze",
					publicProfile: true,
				});
			} catch (error) {
				const errorMessage = "Failed to create miner profile";
				console.error(errorMessage, error);
				toast.error(errorMessage);
				return;
			}
		}

		// Now create the submission
		createSubmission.mutate(
			{
				miner: currentMinerProfile.id,
				challenge: selectedChallenge,
				code: code,
				status: "pending",
				score: testResults.logic.score,
			},
			{
				onSuccess: () => {
					// Reset form and show success message
					console.log("Submission created successfully!");
					toast.success("Solution submitted successfully!");
					// Reset the form
					setCode("");
					setSelectedChallenge("");
					setTestResults(null);
				},
				onError: (error) => {
					const errorMessage = "Failed to create submission";
					console.error(errorMessage, error);
					toast.error(errorMessage);
				},
			},
		);
	}, [
		testResults,
		selectedChallenge,
		user?.id,
		code,
		createSubmission,
		minerProfile,
		minerProfileError,
		createMinerProfile,
	]);

	/** Load large base template from /examples/base.py (abortable + once) */
	useEffect(() => {
		const controller = new AbortController();
		(async () => {
			try {
				const res = await fetch("/examples/base.py", {
					signal: controller.signal,
				});
				if (!res.ok) return;
				const text = (await res.text()).trim();
				if (text) {
					setCode(text);
					setLanguage("python");
				}
			} catch (e) {
				if ((e as any)?.name !== "AbortError") {
					const errorMessage = "Failed to load base example";
					console.error(errorMessage, e);
					toast.error(errorMessage);
				}
			}
		})();
		return () => controller.abort();
	}, []);

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-semibold text-foreground mb-2">
					Submit Solution
				</h1>
				<p className="text-muted-foreground">
					Test your code and submit to challenges
				</p>
			</div>

			{/* Collapsible Important Rules Banner */}
			<Card className="bg-card border-border">
				<div
					className="flex items-center justify-between p-3 cursor-pointer"
					onClick={toggleRules}
				>
					<div className="flex items-center gap-2">
						<AlertTriangle className="h-5 w-5 text-primary" />
						<span className="font-medium text-foreground">
							Important Rules
						</span>
					</div>
					<Button
						variant="ghost"
						size="sm"
						onClick={toggleRules}
						className="p-1"
						aria-expanded={rulesExpanded}
					>
						{rulesExpanded ? (
							<ChevronUp className="h-4 w-4" />
						) : (
							<ChevronDown className="h-4 w-4" />
						)}
					</Button>
				</div>

				{rulesExpanded && (
					<CardContent className="space-y-4 pt-2 border-t border-border">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<CheckCircle className="h-4 w-4 text-green-400" />
									<span className="text-sm text-muted-foreground">
										ESLint check must pass (no malformed
										code)
									</span>
								</div>
								<div className="flex items-center gap-2">
									<Target className="h-4 w-4 text-blue-400" />
									<span className="text-sm text-muted-foreground">
										Minimum score threshold: &gt;0.5 (varies
										by challenge)
									</span>
								</div>
								<div className="flex items-center gap-2">
									<Info className="h-4 w-4 text-purple-400" />
									<span className="text-sm text-muted-foreground">
										Comparison score must be &lt;0.7
									</span>
								</div>
							</div>
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<Clock className="h-4 w-4 text-orange-400" />
									<span className="text-sm text-muted-foreground">
										Submissions decay from day 10, fully by
										day 15
									</span>
								</div>
								<div className="flex items-center gap-2">
									<AlertTriangle className="h-4 w-4 text-primary" />
									<span className="text-sm text-muted-foreground">
										Higher comparison scores negatively
										affect final score
									</span>
								</div>
								<div className="flex items-center gap-2">
									<Info className="h-4 w-4 text-cyan-400" />
									<span className="text-sm text-muted-foreground">
										Resubmissions: (old_score &lt;
										new_score) && comparison &lt; 0.9
									</span>
								</div>
							</div>
						</div>

						<Alert className="bg-blue-900/20 border-blue-400/20">
							<Info className="h-4 w-4 text-blue-400" />
							<AlertDescription className="text-blue-300">
								<strong>Testing First Recommended:</strong> Use
								the test button below to validate your
								submission before submitting. This reduces the
								gap between submission and receiving incentives,
								as final scoring depends mostly on comparison
								scores.
							</AlertDescription>
						</Alert>
					</CardContent>
				)}
			</Card>

			{/* Fullscreen editor overlay when expanded (only editor instance rendered) */}
			{isEditorExpanded && (
				<div className="fixed inset-0 z-50 flex items-stretch bg-black/60 p-6">
					<div className="relative w-full h-full bg-card border-border rounded shadow-lg flex flex-col">
						<div className="flex items-center justify-between p-2 border-b">
							<div className="flex items-center gap-2 text-foreground font-medium">
								<Code className="h-4 w-4" />
								{selectedChallenge
									? `${selectedChallenge}`
									: "Your Solution"}
							</div>
							<div className="flex items-center gap-2">
								<Button
									variant="ghost"
									size="sm"
									onClick={toggleEditor}
									title="Minimize editor"
									className="p-1"
								>
									<Minimize className="h-4 w-4 text-foreground" />
								</Button>
							</div>
						</div>

						<div className="flex-1">
							<Suspense
								fallback={
									<div className="p-4 text-sm text-muted-foreground">
										Loading editor…
									</div>
								}
							>
								<MonacoEditor
									height="100%"
									language={language}
									theme="vs-dark"
									value={code}
									options={editorOptions}
									onChange={(value) => setCode(value ?? "")}
								/>
							</Suspense>
						</div>
					</div>
				</div>
			)}

			{/* Submission Form */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 space-y-6">
					<Card className="bg-card border-border">
						<CardHeader>
							<CardTitle className="text-foreground flex items-center gap-2">
								<Code className="h-5 w-5" />
								Code Submission
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<label className="text-sm font-medium text-muted-foreground mb-2 block">
									Select Challenge
								</label>
								<Select
									value={selectedChallenge}
									onValueChange={setSelectedChallenge}
								>
									<SelectTrigger className="bg-input border-border text-foreground">
										<SelectValue placeholder="Choose a challenge" />
									</SelectTrigger>
									<SelectContent className="bg-card border-border">
										{challengesLoading ? (
											<SelectItem
												value="loading"
												disabled
												className="text-muted-foreground"
											>
												Loading challenges...
											</SelectItem>
										) : challengesError ? (
											<SelectItem
												value="error"
												disabled
												className="text-destructive"
											>
												Error loading challenges
											</SelectItem>
										) : challenges &&
										  challenges.length > 0 ? (
											challenges.map((ch: Challenge) => (
												<SelectItem
													key={ch.id}
													value={ch.id}
													className="text-foreground hover:bg-accent"
												>
													<div className="flex items-center justify-between w-full">
														<span>{ch.name}</span>
														<div className="flex items-center gap-2 ml-4">
															<Badge
																variant="outline"
																className="text-xs"
															>
																{ch.category}
															</Badge>
															<Badge
																variant="outline"
																className="text-xs"
															>
																{(
																	ch.weight *
																	100
																).toFixed(0)}
																%
															</Badge>
														</div>
													</div>
												</SelectItem>
											))
										) : (
											<SelectItem
												value="no-challenges"
												disabled
												className="text-muted-foreground"
											>
												No challenges available
											</SelectItem>
										)}
									</SelectContent>
								</Select>
							</div>

							<div>
								<div className="flex items-center justify-between">
									<label className="text-sm font-medium text-muted-foreground mb-2 block">
										Your Solution
									</label>
									<Button
										variant="outline"
										size="sm"
										onClick={toggleEditor}
										title={
											isEditorExpanded
												? "Minimize editor"
												: "Maximize editor"
										}
										className="h-8 w-8 p-0 flex items-center justify-center"
									>
										{isEditorExpanded ? (
											<Minimize className="h-4 w-4" />
										) : (
											<Maximize className="h-4 w-4" />
										)}
									</Button>
								</div>

								{/* Only mount the inline editor when NOT expanded */}
								{!isEditorExpanded && (
									<div className="min-h-[300px]">
										<Suspense
											fallback={
												<div className="p-4 text-sm text-muted-foreground">
													Loading editor…
												</div>
											}
										>
											<MonacoEditor
												height="300px"
												language={language}
												theme="vs-dark"
												value={code}
												options={editorOptions}
												onChange={(value) =>
													setCode(value ?? "")
												}
											/>
										</Suspense>
									</div>
								)}
							</div>

							<div className="flex gap-3">
								<Button
									onClick={handleTest}
									disabled={
										!selectedChallenge ||
										!code.trim() ||
										isTesting
									}
									className="bg-primary hover:bg-primary/90"
								>
									<TestTube className="h-4 w-4 mr-2" />
									{isTesting ? "Testing..." : "Test Code"}
								</Button>

								<Button
									onClick={handleSubmit}
									disabled={
										!testResults ||
										!testResults.eslint.passed ||
										!user?.id ||
										!selectedChallenge ||
										createSubmission.isPending ||
										createMinerProfile.isPending ||
										minerProfileLoading
									}
									className="bg-green-600 hover:bg-green-700"
								>
									{createSubmission.isPending ||
									createMinerProfile.isPending ? (
										<>
											<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
											{createMinerProfile.isPending
												? "Setting up profile..."
												: "Submitting..."}
										</>
									) : (
										<>
											<Upload className="h-4 w-4 mr-2" />
											Submit Solution
										</>
									)}
								</Button>
							</div>

							{/* Submission Status */}
							{createSubmission.isSuccess && (
								<Alert className="bg-green-900/20 border-green-400/20">
									<CheckCircle className="h-4 w-4 text-green-400" />
									<AlertDescription className="text-green-300">
										Submission created successfully! Your
										solution is now being processed.
									</AlertDescription>
								</Alert>
							)}

							{createSubmission.isError && (
								<Alert className="bg-red-900/20 border-red-400/20">
									<XCircle className="h-4 w-4 text-red-400" />
									<AlertDescription className="text-red-300">
										Failed to submit solution:{" "}
										{createSubmission.error?.message ||
											"Unknown error"}
									</AlertDescription>
								</Alert>
							)}

							{createMinerProfile.isError && (
								<Alert className="bg-red-900/20 border-red-400/20">
									<XCircle className="h-4 w-4 text-red-400" />
									<AlertDescription className="text-red-300">
										Failed to set up miner profile:{" "}
										{createMinerProfile.error?.message ||
											"Unknown error"}
									</AlertDescription>
								</Alert>
							)}
						</CardContent>
					</Card>

					{/* Test Results */}
					{(isTesting || testResults) && (
						<Card className="bg-card border-border">
							<CardHeader>
								<CardTitle className="text-foreground flex items-center gap-2">
									<Play className="h-5 w-5" />
									Test Results
								</CardTitle>
							</CardHeader>
							<CardContent>
								{isTesting ? (
									<div className="space-y-4">
										<div className="flex items-center gap-2">
											<div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
											<span className="text-muted-foreground">
												Running tests...
											</span>
										</div>
										<Progress
											value={progress}
											className="h-2"
										/>
										<p className="text-sm text-muted-foreground">
											This may take a few moments
										</p>
									</div>
								) : testResults ? (
									<div className="space-y-4">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-3">
												<div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
													<div className="flex items-center gap-2">
														{testResults.eslint
															.passed ? (
															<CheckCircle className="h-4 w-4 text-green-400" />
														) : (
															<XCircle className="h-4 w-4 text-red-400" />
														)}
														<span className="text-sm text-muted-foreground">
															ESLint Check
														</span>
													</div>
													<Badge
														className={
															testResults.eslint
																.passed
																? "bg-green-900/20 text-green-400"
																: "bg-red-900/20 text-red-400"
														}
													>
														{testResults.eslint
															.passed
															? "Passed"
															: "Failed"}
													</Badge>
												</div>

												<div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
													<div className="flex items-center gap-2">
														{testResults.syntax
															.passed ? (
															<CheckCircle className="h-4 w-4 text-green-400" />
														) : (
															<XCircle className="h-4 w-4 text-red-400" />
														)}
														<span className="text-sm text-muted-foreground">
															Syntax Check
														</span>
													</div>
													<Badge
														className={
															testResults.syntax
																.passed
																? "bg-green-900/20 text-green-400"
																: "bg-red-900/20 text-red-400"
														}
													>
														{testResults.syntax
															.passed
															? "Passed"
															: "Failed"}
													</Badge>
												</div>
											</div>

											<div className="space-y-3">
												<div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
													<div className="flex items-center gap-2">
														<Target className="h-4 w-4 text-blue-400" />
														<span className="text-sm text-muted-foreground">
															Logic Score
														</span>
													</div>
													<span className="text-sm font-medium text-foreground">
														{testResults.logic.score.toFixed(
															2,
														)}
													</span>
												</div>

												<div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
													<div className="flex items-center gap-2">
														<Info className="h-4 w-4 text-purple-400" />
														<span className="text-sm text-muted-foreground">
															Comparison Score
														</span>
													</div>
													<span className="text-sm font-medium text-foreground">
														{testResults.comparison.score.toFixed(
															2,
														)}
													</span>
												</div>
											</div>
										</div>

										<div className="mt-4 p-3 bg-secondary rounded-lg">
											<h4 className="text-sm font-medium text-foreground mb-2">
												Performance Metrics
											</h4>
											<div className="grid grid-cols-2 gap-4 text-sm">
												<div>
													<span className="text-muted-foreground">
														Execution Time:
													</span>
													<span className="text-foreground ml-2">
														{
															testResults
																.performance
																.executionTime
														}
														ms
													</span>
												</div>
												<div>
													<span className="text-muted-foreground">
														Memory Usage:
													</span>
													<span className="text-foreground ml-2">
														{
															testResults
																.performance
																.memoryUsage
														}
													</span>
												</div>
											</div>
										</div>

										{testResults.comparison.score >=
											0.7 && (
											<Alert className="bg-yellow-900/20 border-yellow-400/20">
												<AlertTriangle className="h-4 w-4 text-yellow-400" />
												<AlertDescription className="text-yellow-300">
													Warning: Comparison score is{" "}
													{testResults.comparison.score.toFixed(
														2,
													)}
													, which is above the 0.7
													threshold. This may
													negatively impact your final
													score.
												</AlertDescription>
											</Alert>
										)}
									</div>
								) : null}
							</CardContent>
						</Card>
					)}
				</div>

				{/* Comparison Process Info + Recent Submissions */}
				<div className="space-y-6">
					<Card className="bg-card border-border">
						<CardHeader>
							<CardTitle className="text-foreground">
								How Scoring Works
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-3">
								<div className="text-sm">
									<h4 className="text-foreground font-medium mb-1">
										1. Initial Validation
									</h4>
									<p className="text-muted-foreground">
										ESLint check ensures code quality and
										security
									</p>
								</div>
								<div className="text-sm">
									<h4 className="text-foreground font-medium mb-1">
										2. Performance Scoring
									</h4>
									<p className="text-muted-foreground">
										Your solution is evaluated against test
										cases
									</p>
								</div>
								<div className="text-sm">
									<h4 className="text-foreground font-medium mb-1">
										3. Comparison Analysis
									</h4>
									<p className="text-muted-foreground">
										Compared with other submissions for
										uniqueness
									</p>
								</div>
								<div className="text-sm">
									<h4 className="text-foreground font-medium mb-1">
										4. Final Weight Calculation
									</h4>
									<p className="text-muted-foreground">
										Score-driven weights determine your
										rewards
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="bg-card border-border">
						<CardHeader>
							<CardTitle className="text-foreground">
								Recent Submissions
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							{submissionsLoading ? (
								<div className="p-3 bg-secondary rounded-lg">
									<div className="text-sm text-muted-foreground">
										Loading submissions...
									</div>
								</div>
							) : submissionsError ? (
								<div className="p-3 bg-secondary rounded-lg">
									<div className="text-sm text-red-400">
										Error loading submissions
									</div>
								</div>
							) : userSubmissions &&
							  userSubmissions.length > 0 ? (
								userSubmissions
									.slice(0, 3) // Show only the 3 most recent
									.map((submission: Submission) => {
										return (
											<div
												key={submission.id}
												className="p-3 bg-secondary rounded-lg"
											>
												<div className="flex justify-between items-start mb-1">
													<p className="text-sm font-medium text-foreground">
														{submission.challenge_name ||
															"Unknown Challenge"}
													</p>
													<Badge
														variant={
															submission.status ===
															"completed"
																? "secondary"
																: "outline"
														}
														className={getStatusBadgeClass(
															submission.status,
														)}
													>
														{submission.status
															.charAt(0)
															.toUpperCase() +
															submission.status.slice(
																1,
															)}
													</Badge>
												</div>
												<div className="flex justify-between items-center">
													<span className="text-xs text-muted-foreground">
														{/* {formatTimeAgo(
															submission.submission_time
														)} */}
														...
													</span>
													<span className="text-xs text-foreground">
														Score:{" "}
														{submission.score?.toFixed(
															2,
														) || "N/A"}
													</span>
												</div>
											</div>
										);
									})
							) : (
								<div className="p-3 bg-secondary rounded-lg">
									<div className="text-sm text-muted-foreground">
										No submissions yet
									</div>
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
