import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPost, apiPut, apiDelete } from "../utils/api";
import { toast } from "sonner";

// Hook for creating a new challenge
export const useCreateChallenge = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (challengeData: any) =>
			apiPost("/challenges", challengeData),
		onSuccess: () => {
			// Invalidate and refetch challenges list
			queryClient.invalidateQueries({ queryKey: ["challenges"] });
			toast.success("Challenge created successfully!");
		},
		onError: (error: Error) => {
			toast.error(`Failed to create challenge: ${error.message}`);
		},
	});
};

// Hook for updating a challenge
export const useUpdateChallenge = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: any }) =>
			apiPut(`/challenges/${id}`, data),
		onSuccess: (_, variables) => {
			// Invalidate and refetch challenges list and specific challenge
			queryClient.invalidateQueries({ queryKey: ["challenges"] });
			queryClient.invalidateQueries({
				queryKey: ["challenge", variables.id],
			});
			toast.success("Challenge updated successfully!");
		},
		onError: (error: Error) => {
			toast.error(`Failed to update challenge: ${error.message}`);
		},
	});
};

// Hook for deleting a challenge
export const useDeleteChallenge = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => apiDelete(`/challenges/${id}`),
		onSuccess: () => {
			// Invalidate and refetch challenges list
			queryClient.invalidateQueries({ queryKey: ["challenges"] });
			toast.success("Challenge deleted successfully!");
		},
		onError: (error: Error) => {
			toast.error(`Failed to delete challenge: ${error.message}`);
		},
	});
};

// Hook for seeding the database
export const useSeedDatabase = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => apiPost("/seed-database"),
		onSuccess: () => {
			// Invalidate all queries to refetch fresh data
			queryClient.invalidateQueries();
			toast.success("Database seeded successfully!");
		},
		onError: (error: Error) => {
			toast.error(`Failed to seed database: ${error.message}`);
		},
	});
};
