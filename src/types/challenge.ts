export interface Challenge {
	id: string;
	name: string;
	category: string;
	weight: number;
	status: string;
	submissions: number;
	avgScore: number;
	timeRemaining: string;
	description: string;
	template: string;
	testingGuide: string;
	challenge_submissions?: Submission[];
}

export interface Submission {
	id: string;
	miner_id: string;
	challenge_id: string;
	score: number;
	submission_time: string;
	status: "pending" | "processing" | "completed" | "failed";
	code: string;
	test_results?: string;
	miner_ref?: Miner;
	challenge_ref?: Challenge;
}

export interface Miner {
	id: string;
	email: string;
	fullAddress: string;
	name: string;
	totalScore: number;
	rank: number;
	submissions: number;
	successRate: number;
	totalEarned: string;
	joinDate: string;
	lastActive: string;
	trustTier: string;
	publicProfile: boolean;
	miner_submissions?: Submission[];
}

export interface ChallengeCardProps {
	challenge: Challenge;
	onClick?: (challenge: Challenge) => void;
}

export interface ChallengeDetailProps {
	challengeId: string;
}
