"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type MockUser = { name: string; email: string };

type AuthContextValue = {
  user: MockUser | null;
  authOpen: boolean;
  signIn: (name: string, email: string) => void;
  signOut: () => void;
  openAuth: () => void;
  closeAuth: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "fitthread-user";

/** Demo auth for the portfolio build — any credentials work, persisted locally. */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const signIn = useCallback((name: string, email: string) => {
    const u = { name: name.trim() || email.split("@")[0], email: email.trim() };
    setUser(u);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } catch {
      /* ignore */
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      authOpen,
      signIn,
      signOut,
      openAuth: () => setAuthOpen(true),
      closeAuth: () => setAuthOpen(false),
    }),
    [user, authOpen, signIn, signOut]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
