export const BASE_URL = "https://api.example.com"; // Hardcoded link untuk saat ini

/**
 * Wrapper function untuk melakukan fetch ke API
 * @param endpoint Endpoint API (contoh: '/users')
 * @param options Opsi fetch opsional (method, headers, body, dll.)
 */
export const fetchApi = async <T,>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch API Error:", error);
    throw error;
  }
};
