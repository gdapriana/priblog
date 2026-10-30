import db from "../configs/db.js";
import { eq } from "drizzle-orm";
import { CookieOptions, Response } from "express";
import { createHash, randomBytes } from "node:crypto";
import { sessions, users } from "../db/schema.js";

export const COOKIE_NAME = "session";
const DURATION_MS = 1000 * 60 * 60 * 24 * 30;
const RENEW_THRESHOLD_MS = 1000 * 60 * 60 * 24 * 15;

const cookieBase: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/"
};

const hashToken = (token: string) =>
  createHash("sha256").update(token).digest("hex");

export function setSessionCookie(
  res: Response,
  token: string,
  expiresAt: Date
) {
  res.cookie(COOKIE_NAME, token, { ...cookieBase, expires: expiresAt });
}

export function clearSessionCookie(res: Response) {
  res.clearCookie(COOKIE_NAME, cookieBase);
}

export async function createSession(
  res: Response,
  userId: number,
  meta?: { userAgent?: string; ipAddress?: string }
) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + DURATION_MS);
  await db.insert(sessions).values({
    id: hashToken(token),
    userId,
    expiresAt,
    userAgent: meta?.userAgent,
    ipAddress: meta?.ipAddress
  });
  setSessionCookie(res, token, expiresAt);
}

export async function validateSession(token: string) {
  const id = hashToken(token);
  const [row] = await db
    .select({
      session: sessions,
      user: {
        id: users.id,
        name: users.name,
        email: users.email
      }
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.id, id))
    .limit(1);

  if (!row) return null;

  if (row.session.expiresAt.getTime() <= Date.now()) {
    await db.delete(sessions).where(eq(sessions.id, id));
    return null;
  }

  let renewedExpiresAt: Date | null = null;
  if (row.session.expiresAt.getTime() - Date.now() < RENEW_THRESHOLD_MS) {
    renewedExpiresAt = new Date(Date.now() + DURATION_MS);
    await db
      .update(sessions)
      .set({ expiresAt: renewedExpiresAt, lastUsedAt: new Date() })
      .where(eq(sessions.id, id));
  }

  return {
    session: {
      ...row.session,
      expiresAt: renewedExpiresAt ?? row.session.expiresAt
    },
    user: row.user,
    renewedExpiresAt
  };
}

export async function deleteSessionByToken(token: string) {
  await db.delete(sessions).where(eq(sessions.id, hashToken(token)));
}

export async function deleteAllUserSessions(userId: number) {
  await db.delete(sessions).where(eq(sessions.userId, userId));
}
