import {API_BASE_URL} from '../config/api';
import {mockDb} from './mockDb';

type GetAuthHeaders = () => Record<string, string>;

// Intercept specific routes to use our mock database instead of a real backend
export async function apiRequest(
  path: string,
  options: RequestInit & {getAuthHeaders?: GetAuthHeaders} = {},
) {
  const {getAuthHeaders, ...fetchOptions} = options;
  const bodyParams = fetchOptions.body
    ? JSON.parse(fetchOptions.body as string)
    : {};

  // Mock Route Interception
  try {
    if (path === '/getPetsByUser') {
      const pets = await mockDb.getPetsByUser(bodyParams.userId);
      return {status: 'success', pets};
    }

    if (path === '/getReminders') {
      const reminders = await mockDb.getRemindersByUser(bodyParams.userId);
      return {status: 'success', reminders};
    }

    if (path === '/addPet') {
      const newPet = await mockDb.addPet(bodyParams);
      return {status: 'success', pet: newPet};
    }

    if (path === '/addReminder') {
      const newReminder = await mockDb.addReminder(bodyParams);
      return {status: 'success', reminder: newReminder};
    }

    // Auth fallbacks (just mock success for now if someone tries to login/signup)
    if (path === '/login' || path === '/signup') {
      return {
        status: 'success',
        token: 'mock_jwt_token_123',
        user: {
          _id: 'guest',
          name: 'Guest User',
          email: bodyParams.email || 'guest@example.com',
        },
      };
    }
  } catch (err) {
    console.error(`Mock API Error at ${path}:`, err);
    throw err;
  }

  // Fallback to real fetch (in case we didn't mock it)
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
