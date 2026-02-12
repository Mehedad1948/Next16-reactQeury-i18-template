// lib/auth.ts
import { cookies } from "next/headers";

import { jwtVerify } from "jose";

export interface SessionPayload {
  userId: string;
  role: string;
  [key: string]: any;
}

const SECRET_KEY = process.env.JWT_SECRET || "";
const key = new TextEncoder().encode(SECRET_KEY);

export async function verifySession(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) {
    token = (await cookies()).get("token")?.value;
  }

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"]
    });
    return payload as SessionPayload;
  } catch (error) {
    return null;
  }
}
