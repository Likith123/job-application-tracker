import { NextResponse } from "next/server";
import { getSession } from "./auth";
type Handler = (req: Request, user: { id: string }) => Promise<unknown>;

export async function requireUser(req: Request) {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("UNAUTHORIZED");
  }
  return session.user;
}

export function withAuth(handler: Handler) {
  return async (req: Request) => {
    try {
      const user = await requireUser(req);
      const result = await handler(req, user);
      return NextResponse.json(result);
    } catch (err) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  };
}
