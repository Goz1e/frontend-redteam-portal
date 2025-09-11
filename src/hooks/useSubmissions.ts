import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPost } from "../utils/api";
import {
	Submission,
	BackendSubmission,
	MinerProfile,
} from "../types/challenge";

// Helper function to convert backend submission format to frontend format
const convertBackendSubmission = (
	backendSubmission: BackendSubmission
): Submission => ({
	id: backendSubmission.id,
	user_id: "", // Will be populated by the API endpoint context
	miner_profile_id: backendSubmission.miner,
	challenge_id: backendSubmission.challenge,
	challenge_name: backendSubmission.challenge_name,
	score: backendSubmission.score,
	submission_time: backendSubmission.time || "",
	status: backendSubmission.status,
	code: backendSubmission.code,
});

// Hook to get submissions for a specific user
export const useUserSubmissions = (userId: string | undefined) => {
	const { data, isLoading, error, isError } = useQuery<Submission[]>({
		queryKey: ["user-submissions", userId],
		queryFn: async () => {
			const backendSubmissions: BackendSubmission[] = await apiGet(
				`/users/${userId}/submissions`
			);
			return backendSubmissions.map(convertBackendSubmission);
		},
		enabled: !!userId && userId.trim() !== "", // Only run if userId is provided and not empty
		staleTime: 1000 * 60 * 5, // 5 minutes
		gcTime: 1000 * 60 * 10, // 10 minutes
	});

	return {
		data,
		isLoading,
		error,
		isError,
	};
};

// Hook to get submissions for a specific miner profile
export const useMinerProfileSubmissions = (profileId: string | undefined) => {
	const { data, isLoading, error, isError } = useQuery<Submission[]>({
		queryKey: ["miner-profile-submissions", profileId],
		queryFn: async () => {
			const backendSubmissions: BackendSubmission[] = await apiGet(
				`/miner-profiles/${profileId}/submissions`
			);
			return backendSubmissions.map(convertBackendSubmission);
		},
		enabled: !!profileId && profileId.trim() !== "", // Only run if profileId is provided and not empty
		staleTime: 1000 * 60 * 5, // 5 minutes
		gcTime: 1000 * 60 * 10, // 10 minutes
	});

	return {
		data,
		isLoading,
		error,
		isError,
	};
};

// Hook to get submissions for a specific challenge
export const useChallengeSubmissions = (challengeId: string | undefined) => {
	const { data, isLoading, error, isError } = useQuery<Submission[]>({
		queryKey: ["challenge-submissions", challengeId],
		queryFn: async () => {
			const backendSubmissions: BackendSubmission[] = await apiGet(
				`/challenges/${challengeId}/submissions`
			);
			return backendSubmissions.map(convertBackendSubmission);
		},
		enabled: !!challengeId && challengeId.trim() !== "", // Only run if challengeId is provided and not empty
		staleTime: 1000 * 60 * 5, // 5 minutes
		gcTime: 1000 * 60 * 10, // 10 minutes
	});

	return {
		data,
		isLoading,
		error,
		isError,
	};
};

// Hook to get submissions for a specific miner (backward compatibility)
// This is an alias for useMinerProfileSubmissions
export const useMinerSubmissions = (minerId: string | undefined) => {
	return useMinerProfileSubmissions(minerId);
};

// Hook to get miner profile by user ID
export const useMinerProfileByUser = (userId: string | undefined) => {
	const { data, isLoading, error, isError } = useQuery<MinerProfile>({
		queryKey: ["miner-profile-by-user", userId],
		queryFn: () => apiGet(`/miner-profiles/by-user/${userId}`),
		enabled: !!userId && userId.trim() !== "",
		staleTime: 1000 * 60 * 5, // 5 minutes
		gcTime: 1000 * 60 * 10, // 10 minutes
		retry: false, // Don't retry if miner profile doesn't exist
	});

	return {
		data,
		isLoading,
		error,
		isError,
	};
};

// Hook to create a miner profile
export const useCreateMinerProfile = () => {
	const queryClient = useQueryClient();

	return useMutation<
		MinerProfile,
		Error,
		{
			user_id: string;
			walletAddress?: string;
			trustTier?: string;
			publicProfile?: boolean;
		}
	>({
		mutationFn: (profileData) => apiPost("/miner-profiles", profileData),
		onSuccess: (data) => {
			// Invalidate relevant queries
			queryClient.invalidateQueries({
				queryKey: ["miner-profile-by-user", data.user_id],
			});
			queryClient.invalidateQueries({
				queryKey: ["miner-profiles"],
			});
		},
	});
};

// Note: Individual submission endpoint doesn't exist in the current API
// If needed, submissions can be found through user or miner profile submissions
// and filtered by ID on the client side

// Hook to create a new submission
export const useCreateSubmission = () => {
	const queryClient = useQueryClient();

	return useMutation<
		BackendSubmission,
		Error,
		{
			miner: string;
			challenge: string;
			code: string;
			// Optional fields with defaults
			score?: number;
			status?:
				| "pending"
				| "processing"
				| "completed"
				| "failed"
				| "scored";
		}
	>({
		mutationFn: (submissionData) => apiPost("/submissions", submissionData),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["miner-profile-submissions", data.miner],
			});
			queryClient.invalidateQueries({
				queryKey: ["challenge-submissions", data.challenge],
			});
			queryClient.invalidateQueries({
				queryKey: ["user-submissions"],
			});
		},
	});
};
