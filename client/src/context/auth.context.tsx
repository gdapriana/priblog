import type { AuthUser, LoginInput, RegisterInput } from "../data/type.data";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApiError, getMe, setAuthorizedHandler } from "../utils/api.utils";

import * as authApi from "../utils/api.utils";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthContextValue {
  user: AuthUser | null;
  status: AuthStatus;
  sessionExpired: boolean;
  login: (data: LoginInput) => Promise<AuthUser>;
  register: (data: RegisterInput) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [sessionExpired, setSessionExpired] = useState(false);

  const clear = useCallback((expired = false) => {
    setUser(null);
    setStatus("unauthenticated");
    setSessionExpired(expired);
  }, []);

  const refresh = useCallback(async () => {
    try {
      const me = await getMe();
      setUser(me);
      setStatus("authenticated");
    } catch (e) {
      if (e instanceof ApiError && e.status === 0) {
        setStatus((s) => (s === "loading" ? "unauthenticated" : s));
        return;
      }

      clear();
    }
  }, [clear]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    setAuthorizedHandler(() => {
      getMe()
        .then(setUser)
        .catch(() => clear(true));
    });
    return () => setAuthorizedHandler(null);
  }, [clear]);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [refresh]);

  const login = useCallback(async (data: LoginInput) => {
    await authApi.login(data);
    const me = await authApi.getMe();
    setUser(me);
    setStatus("authenticated");
    setSessionExpired(false);
    return me;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      clear();
    }
  }, [clear]);
  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      sessionExpired,
      login,
      register: authApi.register,
      logout,
      refresh,
    }),
    [user, status, sessionExpired, login, logout, refresh],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must use inside <AuthProvider>");
  return ctx;
}
