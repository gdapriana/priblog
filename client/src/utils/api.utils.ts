import {
  type ApiFailure,
  type ApiSuccess,
  type AuthUser,
  type LoginInput,
  type RegisterInput,
  type ValidationIssue,
} from "../data/type.data";

const BASE_URL = import.meta.env.VITE_SERVER_URL as string;

export class ApiError extends Error {
  readonly status: number;
  readonly errors?: ValidationIssue[];

  constructor(status: number, message: string, errors?: ValidationIssue[]) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

let onUnauthorized: (() => void) | null = null;
export const setAuthorizedHandler = (fn: (() => void) | null) => {
  onUnauthorized = fn;
};

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  skipAuthHandler?: boolean;
  signal?: AbortSignal;
}

export async function api<T = void>(
  path: string,
  {
    method = "GET",
    body,
    skipAuthHandler = false,
    signal,
  }: RequestOptions = {},
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      credentials: "include",
      headers:
        body !== undefined ? { "Content-Type": "application/json" } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") throw e;
    throw new ApiError(0, "cant connect to server");
  }

  const json = (await res.json().catch(() => null)) as
    ApiSuccess<T> | ApiFailure | null;

  if (!res.ok || !json || json.success === false) {
    if (res.status === 401 && !skipAuthHandler) onUnauthorized?.();
    const failure = json && json.success === false ? json : undefined;
    throw new ApiError(
      res.status,
      failure?.message ?? "something wrong",
      failure?.errors,
    );
  }
  return json.data;
}

export const register = (data: RegisterInput) =>
  api<AuthUser>("/api/auth/register", { method: "POST", body: data });
export const login = (data: LoginInput) =>
  api<AuthUser>("/api/auth/login", { method: "POST", body: data });
export const logout = () => api("/api/auth/logout", { method: "DELETE" });
export const getMe = () =>
  api<AuthUser>("/api/auth/me", { skipAuthHandler: true });
