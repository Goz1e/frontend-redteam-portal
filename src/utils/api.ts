import { toast } from "sonner";

const BASE_API = import.meta.env.VITE_BASE_API || "http://localhost:8000";

if (!BASE_API) {
	toast.error("VITE_BASE_API is not set");
}

export interface ApiOptions {
	method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
	headers?: Record<string, string>;
	body?: any;
	showToast?: boolean;
}

/**
 * Reusable fetch function for API calls
 * @param endpoint - The API endpoint (without base URL)
 * @param options - Request options
 * @returns Promise with the response data
 */
export const apiFetch = async <T = any>(
	endpoint: string,
	options: ApiOptions = {}
): Promise<T> => {
	const { method = "GET", headers = {}, body, showToast = true } = options;

	const url = `${BASE_API}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

	if (showToast) {
		toast.info(`${method} ${url}`);
	}

	const config: RequestInit = {
		method,
		headers: {
			"Content-Type": "application/json",
			...headers,
		},
	};

	if (body && method !== "GET") {
		config.body = JSON.stringify(body);
	}

	try {
		const response = await fetch(url, config);

		if (!response.ok) {
			const errorMessage = `${method} ${endpoint} failed: ${response.status} ${response.statusText}`;
			if (showToast) {
				toast.error(errorMessage);
			}
			throw new Error(errorMessage);
		}

		const data = await response.json();

		if (showToast) {
			toast.success(`${method} ${endpoint} successful`);
		}

		return data;
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error occurred";
		if (showToast) {
			toast.error(errorMessage);
		}
		throw error;
	}
};

// Convenience methods for common HTTP verbs
export const apiGet = <T = any>(
	endpoint: string,
	showToast = true
): Promise<T> => apiFetch<T>(endpoint, { method: "GET", showToast });

export const apiPost = <T = any>(
	endpoint: string,
	body?: any,
	showToast = true
): Promise<T> => apiFetch<T>(endpoint, { method: "POST", body, showToast });

export const apiPut = <T = any>(
	endpoint: string,
	body?: any,
	showToast = true
): Promise<T> => apiFetch<T>(endpoint, { method: "PUT", body, showToast });

export const apiDelete = <T = any>(
	endpoint: string,
	showToast = true
): Promise<T> => apiFetch<T>(endpoint, { method: "DELETE", showToast });

export const apiPatch = <T = any>(
	endpoint: string,
	body?: any,
	showToast = true
): Promise<T> => apiFetch<T>(endpoint, { method: "PATCH", body, showToast });

// Export the base API URL for use in other parts of the app
export { BASE_API };
