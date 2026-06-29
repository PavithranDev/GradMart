const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/**
 * A drop-in replacement for fetch() that automatically:
 * 1. Prepends the API base URL if path starts with /api
 * 2. Injects the JWT Authorization header from localStorage
 */
export async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const url = path.startsWith('http') ? path : `${API}${path}`;
  
  let token: string | null = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('gradmart_token');
  }

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Default Content-Type to JSON if body is a string
  if (options.body && typeof options.body === 'string' && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  return fetch(url, {
    ...options,
    headers,
  });
}

export { API };
