import { createHash } from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "xubie2026";
const ADMIN_SECRET   = process.env.ADMIN_SECRET   || "xubie-admin-secret-2026";
export const COOKIE_NAME = "xubie-admin-token";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function generateToken(): string {
  return createHash("sha256")
    .update(ADMIN_PASSWORD + ADMIN_SECRET)
    .digest("hex");
}

export function checkPassword(input: string): boolean {
  return input === ADMIN_PASSWORD;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  return token === generateToken();
}
