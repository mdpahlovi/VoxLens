const BASE_URL = `${import.meta.env.VITE_APP_SERVER}/api/v1`;

class ApiError extends Error {
    public status: number;
    public data: unknown;

    constructor(message: string, status: number, data?: unknown) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}

async function request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    const config: RequestInit = {
        ...options,
        headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    const responseData = await response.json();

    if (!response.ok) {
        throw new ApiError(responseData.message || "Something went wrong", response.status, responseData);
    }

    return responseData;
}

export const api = {
    get: <T>(endpoint: string, options?: RequestInit) => request<T>(endpoint, { ...options, method: "GET" }),
    post: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
        request<T>(endpoint, { ...options, method: "POST", body: JSON.stringify(body) }),
};

export { ApiError };
