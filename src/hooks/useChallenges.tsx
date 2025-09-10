import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../utils/api";

export const useChallenges = () => {
	const { data, isLoading, error, isError } = useQuery({
		queryKey: ["challenges"],
		queryFn: () => apiGet("/challenges"),
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

export const useChallengeDetail = (challengeId: string) => {
	const { data, isLoading, error, isError } = useQuery({
		queryKey: ["challenge", challengeId],
		queryFn: () => apiGet(`/challenges/${challengeId}`),
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
