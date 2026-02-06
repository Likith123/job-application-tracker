import { NextResponse } from "next/server";
import { getSession } from "./auth";
type Handler = (
  req: Request,
  user: { id: string },
  context?: { params?: Record<string, string> },
) => Promise<unknown>;

export async function requireUser() {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("UNAUTHORIZED");
  }
  return session.user;
}

type HandlerType<TParams> = (
  req: Request,
  user: { id: string },
  context?: { params?: Promise<TParams> },
) => Promise<Response>;

export function withAuth<TParams>(handler: HandlerType<TParams>) {
  return async (req: Request, context: { params: Promise<TParams> }) => {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return handler(req, session.user, context);
  };
}
