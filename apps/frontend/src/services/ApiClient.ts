interface AuthResponse {
  token: string;
  refreshToken: string;
}

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
};

export class ApiClient {
  private csrfToken: string | null = null;
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  }

  private async ensureCsrfToken(forceRefresh: boolean = false) {
    if (!this.csrfToken || forceRefresh) {
      try {
        const response = await fetch(`${this.baseUrl}/auth/csrf-token`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          this.csrfToken = data.token;
        } else {
          throw new Error(
            `CSRF token acquisition failed with status ${response.status}`,
          );
        }
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
        throw new Error("Network error while retrieving CSRF token");
      }
    }
    return this.csrfToken;
  }

  private async request(endpoint: string, options: RequestOptions = {}) {
    const ensureValidCsrfToken = async () => {
      try {
        return await this.ensureCsrfToken();
      } catch (error) {
        console.error("Failed to retrieve CSRF token:", error);
        throw new Error("CSRF token acquisition failed");
      }
    };

    const makeRequest = async (retryCount = 0): Promise<Response> => {
      const csrfToken = await ensureValidCsrfToken();
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...options.headers,
      };

      if (csrfToken) {
        headers["X-CSRF-Token"] = csrfToken;
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
        credentials: "include",
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      // Handle CSRF token expiration or invalidation
      if ([401, 403].includes(response.status) && retryCount === 0) {
        this.csrfToken = null; // Clear expired token
        await this.ensureCsrfToken(true); // Force refresh
        return makeRequest(1); // Retry once with new token
      }

      return response;
    };

    return makeRequest();
  }

  async get(endpoint: string) {
    return this.request(endpoint, { method: "GET" });
  }

  async post(endpoint: string, data: any): Promise<Response | AuthResponse> {
    const response = await this.request(endpoint, {
      method: "POST",
      body: data,
    });

    if (endpoint === "/auth/login" && response.ok) {
      const result = await response.json();
      return {
        token: result.token,
        refreshToken: result.refreshToken,
      };
    }

    return response;
  }

  async put(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: "PUT",
      body: data,
    });
  }

  async delete(endpoint: string) {
    return this.request(endpoint, { method: "DELETE" });
  }

  synchronizeCsrfToken = async () => {
    try {
      const response = await fetch(`${this.baseUrl}/auth/csrf-token`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        try {
          // Validate token structure
          const decoded = Buffer.from(result.token, "base64").toString("utf-8");
          JSON.parse(decoded);
          this.csrfToken = result.token;
        } catch (error) {
          const errorMessage = (error as Error).message || "Unknown error";
          console.error("Invalid CSRF token received:", errorMessage);
          throw new Error("Invalid CSRF token format");
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error("CSRF token synchronization failed:", error);
      return false;
    }
  };
}

const apiClient = new ApiClient();
export default apiClient;
