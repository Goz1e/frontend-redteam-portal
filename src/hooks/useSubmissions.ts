import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPost } from "../utils/api";
import { Submission } from "../types/challenge";

// Hook to get all submissions
export const useSubmissions = () => {
	const { data, isLoading, error, isError } = useQuery<Submission[]>({
		queryKey: ["submissions"],
		queryFn: () => apiGet("/submissions"),
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

// Hook to get submissions for a specific miner
export const useMinerSubmissions = (minerId: string) => {
	const { data, isLoading, error, isError } = useQuery<Submission[]>({
		queryKey: ["miner-submissions", minerId],
		queryFn: () => apiGet(`/miners/${minerId}/submissions`),
		enabled: !!minerId, // Only run if minerId is provided
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
export const useChallengeSubmissions = (challengeId: string) => {
	const { data, isLoading, error, isError } = useQuery<Submission[]>({
		queryKey: ["challenge-submissions", challengeId],
		queryFn: () => apiGet(`/challenges/${challengeId}/submissions`),
		enabled: !!challengeId, // Only run if challengeId is provided
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

// Hook to get a specific submission
export const useSubmission = (submissionId: string) => {
	const { data, isLoading, error, isError } = useQuery<Submission>({
		queryKey: ["submission", submissionId],
		queryFn: () => apiGet(`/submissions/${submissionId}`),
		enabled: !!submissionId, // Only run if submissionId is provided
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

// Hook to create a new submission
export const useCreateSubmission = () => {
	const queryClient = useQueryClient();

	return useMutation<
		Submission,
		Error,
		Omit<Submission, "id" | "submission_time">
	>({
		mutationFn: (submissionData) =>
			apiPost("/submissions", submissionData, {
				successMessage: "Submission created successfully!",
				errorMessage: "Failed to create submission.",
			}),
		onSuccess: (data) => {
			// Invalidate relevant queries
			queryClient.invalidateQueries({ queryKey: ["submissions"] });
			queryClient.invalidateQueries({
				queryKey: ["miner-submissions", data.miner_id],
			});
			queryClient.invalidateQueries({
				queryKey: ["challenge-submissions", data.challenge_id],
			});
		},
	});
};
