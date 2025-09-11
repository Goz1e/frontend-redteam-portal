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
	user_id: string; // References neon_auth.users_sync(id)
	miner_profile_id: string;
	challenge_id: string;
	challenge_name: string; // Challenge name for easy display
	score?: number; // Optional - can be null initially
	submission_time: string;
	status: "pending" | "processing" | "completed" | "failed" | "scored";
	code: string;
	test_results?: string; // JSON string of test results
	miner_ref?: MinerProfile;
	challenge_ref?: Challenge;
}

// Backend API response format (different field names)
export interface BackendSubmission {
	id: string;
	miner: string; // Backend uses 'miner' instead of 'miner_profile_id'
	challenge: string; // Backend uses 'challenge' instead of 'challenge_id'
	challenge_name: string;
	score?: number;
	time?: string; // Backend uses 'time' instead of 'submission_time'
	status: "pending" | "processing" | "completed" | "failed" | "scored";
	code: string;
}

export interface MinerProfile {
	id: string;
	user_id: string; // References neon_auth.users_sync(id)
	walletAddress?: string; // Wallet address (renamed from fullAddress)
	totalScore: number;
	rank?: number;
	submissions: number;
	successRate: number;
	totalEarned: string;
	joinDate: string;
	lastActive: string;
	trustTier: string;
	publicProfile: boolean;
	miner_submissions?: Submission[];
}

export interface NeonAuthUser {
	id: string;
	name: string;
	email: string;
	created_at: string;
}

export interface CompleteUserProfile {
	user: NeonAuthUser;
	miner_profile?: MinerProfile;
}

// Keep Miner interface for backward compatibility (deprecated)
export interface Miner extends MinerProfile {
	email: string;
	name: string;
}

export interface ChallengeCardProps {
	challenge: Challenge;
	onClick?: (challenge: Challenge) => void;
}

export interface ChallengeDetailProps {
	challengeId: string;
}
