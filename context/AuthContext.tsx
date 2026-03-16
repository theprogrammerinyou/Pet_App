import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiRequest} from '../services/api';

const AUTH_STORAGE_KEY = '@petapp_user';
const TOKEN_STORAGE_KEY = '@petapp_token';

export type User = {
  _id: string;
  fullName: string;
  emailId: string;
  contactNumber?: string;
  userImg?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isSignedIn: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{success: boolean; error?: string}>;
  signup: (data: {
    fullName: string;
    emailId: string;
    password: string;
    contactNumber: string;
  }) => Promise<{success: boolean; error?: string}>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  continueAsGuest: () => void;
  token: string | null;
  getAuthHeaders: () => Record<string, string>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const persistUser = useCallback(async (u: User | null, t?: string | null) => {
    if (u) {
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(u));
    } else {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    }
    if (t !== undefined) {
      if (t) {
        await AsyncStorage.setItem(TOKEN_STORAGE_KEY, t);
        setToken(t);
      } else {
        await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
        setToken(null);
      }
    }
    setUser(u);
  }, []);

  const refreshUser = useCallback(async () => {
    if (!user?._id) {
      return;
    }
    try {
      const data = await apiRequest('/getUser', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId: user._id}),
      });
      if (data.status === 'success' && data.users?.[0]) {
        const u = data.users[0];
        const refreshed: User = {
          _id: u._id,
          fullName: u.fullName,
          emailId: u.emailId,
          contactNumber: (u as Partial<User>).contactNumber,
          userImg: (u as Partial<User>).userImg,
        };
        setUser(refreshed);
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(refreshed));
      }
    } catch {
      // ignore
    }
  }, [user?._id]);

  const getAuthHeaders = useCallback(() => {
    if (token) {
      return {Authorization: `Bearer ${token}`};
    }
    return {} as Record<string, string>;
  }, [token]);

  useEffect(() => {
    (async () => {
      try {
        const [storedUser, storedToken] = await Promise.all([
          AsyncStorage.getItem(AUTH_STORAGE_KEY),
          AsyncStorage.getItem(TOKEN_STORAGE_KEY),
        ]);
        if (storedUser) {
          const parsed = JSON.parse(storedUser) as User;
          setUser(parsed);
        }
        if (storedToken) {
          setToken(storedToken);
        }
      } catch {
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = useCallback(
    async (
      email: string,
      password: string,
    ): Promise<{success: boolean; error?: string}> => {
      try {
        const data = await apiRequest('/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({emailId: email, password}),
        });
        if (data.status === 'success' && data.user) {
          const u = data.user;
          await persistUser(
            {
              _id: u._id,
              fullName: u.fullName,
              emailId: u.emailId,
              contactNumber: (u as Partial<User>).contactNumber,
              userImg: (u as Partial<User>).userImg,
            },
            data.token ?? null,
          );
          return {success: true};
        }
        return {success: false, error: data.message || 'Login failed'};
      } catch (e: any) {
        return {success: false, error: e?.message || 'Network error'};
      }
    },
    [persistUser],
  );

  const signup = useCallback(
    async (payload: {
      fullName: string;
      emailId: string;
      password: string;
      contactNumber: string;
    }): Promise<{success: boolean; error?: string}> => {
      try {
        const signupData = await apiRequest('/addUser', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: payload.fullName,
            emailId: payload.emailId,
            password: payload.password,
            contactNumber: payload.contactNumber || '0',
          }),
        });
        if (signupData.status === 'success') {
          // Auto-login after signup
          const loginData = await apiRequest('/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              emailId: payload.emailId,
              password: payload.password,
            }),
          });
          if (loginData.status === 'success' && loginData.user) {
            const u = loginData.user;
            await persistUser(
              {
                _id: u._id,
                fullName: u.fullName,
                emailId: u.emailId,
                contactNumber: (u as Partial<User>).contactNumber,
                userImg: (u as Partial<User>).userImg,
              },
              loginData.token ?? null,
            );
            return {success: true};
          }
          return {success: true};
        }
        return {success: false, error: signupData.message || 'Signup failed'};
      } catch (e: any) {
        return {success: false, error: e?.message || 'Network error'};
      }
    },
    [persistUser],
  );

  const logout = useCallback(async () => {
    await persistUser(null, null);
  }, [persistUser]);

  const continueAsGuest = useCallback(() => {
    const guestUser: User = {
      _id: 'guest',
      fullName: 'Guest User',
      emailId: 'guest@pawmantra.com',
      contactNumber: '+91 9876543210',
    };
    setUser(guestUser);
    AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(guestUser)).catch(
      () => {},
    );
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isSignedIn: !!user,
    login,
    signup,
    logout,
    refreshUser,
    continueAsGuest,
    token,
    getAuthHeaders,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
