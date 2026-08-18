import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET no está configurado");
  }

  return secret;
}

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

export function createToken(user: AuthUser): string {
  const secret = getJwtSecret();

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    secret,
    {
      expiresIn: "7d",
    }
  );
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const secret = getJwtSecret();
    const decoded = jwt.verify(token, secret);

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      !("id" in decoded) ||
      !("email" in decoded) ||
      !("name" in decoded)
    ) {
      return null;
    }

    const payload = decoded as JwtPayload & {
      id: string;
      email: string;
      name: string;
    };

    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
    };
  } catch {
    return null;
  }
}