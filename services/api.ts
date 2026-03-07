import {API_BASE_URL} from '../config/api';

type GetAuthHeaders = () => Record<string, string>;

export async function apiRequest(
  path: string,
  options: RequestInit & { getAuthHeaders?: GetAuthHeaders } = {},
) {
  const { getAuthHeaders, ...fetchOptions } = options;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };
  if (getAuthHeaders) {
    Object.assign(headers, getAuthHeaders());
  }
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...fetchOptions,
    headers,
  });
  return res.json();
}
