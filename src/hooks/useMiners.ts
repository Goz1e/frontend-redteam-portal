import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../utils/api";

export const useMiners = () => {
	const { data, isLoading, error, isError } = useQuery({
		queryKey: ["miners"],
		queryFn: () => apiGet("/miners"),
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
