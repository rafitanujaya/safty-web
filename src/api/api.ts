import { useAuthStore } from '../store/authStore';

export const BASE_URL = "http://localhost:3000/api";

export const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  try {
    const isFormData = options.body instanceof FormData;
    const headers: HeadersInit = {
      ...options.headers,
    };

    // DO NOT set Content-Type manually if it's FormData. 
    // Browser will set it automatically with the correct boundary.
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    // Auto-inject token
    const token = useAuthStore.getState().token;
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Clean endpoint to avoid double slashes
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

    const response = await fetch(`${BASE_URL}${cleanEndpoint}`, {
      ...options,
      headers,
    });

    const json = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage = json?.message || `API error: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    if (json && typeof json === 'object') {
      if (json.success === false) {
        throw new Error(json.message || "Unknown API error");
      }
      if (json.success === true && 'data' in json) {
        return json.data;
      }
    }

    return json as T;
  } catch (error) {
    console.error("Fetch API Error:", error);
    throw error;
  }
};
