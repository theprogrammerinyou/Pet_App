import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE_URL} from '../config/api';

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
  login: (email: string, password: string) => Promise<{success: boolean; error?: string}>;
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
    if (!user?._id) return;
    try {
      const res = await fetch(`${API_BASE_URL}/getUser`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId: user._id}),
      });
      const data = await res.json();
      if (data.status === 'success' && data.users?.[0]) {
        const u = data.users[0];
        setUser({
          _id: u._id,
          fullName: u.fullName,
          emailId: u.emailId,
          contactNumber: u.contactNumber,
          userImg: u.userImg,
        });
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
          _id: u._id,
          fullName: u.fullName,
          emailId: u.emailId,
          contactNumber: u.contactNumber,
          userImg: u.userImg,
        }));
      }
    } catch {
      // ignore
    }
  }, [user?._id]);

  const getAuthHeaders = useCallback(() => {
    if (token) return { Authorization: `Bearer ${token}` };
    return {};
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
        if (storedToken) setToken(storedToken);
      } catch {
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<{success: boolean; error?: string}> => {
      try {
        const res = await fetch(`${API_BASE_URL}/login`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({emailId: email, password}),
        });
        const data = await res.json();
        if (data.status === 'success' && data.user) {
          const u = data.user;
          await persistUser(
            {
              _id: u._id,
              fullName: u.fullName,
              emailId: u.emailId,
              contactNumber: u.contactNumber,
              userImg: u.userImg,
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
        const res = await fetch(`${API_BASE_URL}/addUser`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: payload.fullName,
            emailId: payload.emailId,
            password: payload.password,
            contactNumber: payload.contactNumber || '0',
          }),
        });
        const data = await res.json();
        if (data.status === 'success') {
          // Auto-login: fetch user by email (backend would need getByEmail or return user from addUser)
          const loginRes = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({emailId: payload.emailId, password: payload.password}),
          });
          const loginData = await loginRes.json();
          if (loginData.status === 'success' && loginData.user) {
            const u = loginData.user;
            await persistUser(
              {
                _id: u._id,
                fullName: u.fullName,
                emailId: u.emailId,
                contactNumber: u.contactNumber,
                userImg: u.userImg,
              },
              loginData.token ?? null,
            );
            return {success: true};
          }
          return {success: true}; // account created, user can log in
        }
        return {success: false, error: data.message || 'Signup failed'};
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
    setUser({
      _id: 'guest',
      fullName: 'Guest',
      emailId: 'guest@pawmantra.com',
      contactNumber: '',
    });
    AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
      _id: 'guest',
      fullName: 'Guest',
      emailId: 'guest@pawmantra.com',
      contactNumber: '',
    })).catch(() => {});
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
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
