import { betterAuth } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
  },
  // user: {
  //   additionalFields: {
  //     firstName: {
  //       type: "string",
  //       required: true,
  //     },
  //     lastName: {
  //       type: "string",
  //       required: true,
  //     },
  //   },
  // },
});

export async function getSession() {
  const result = await auth.api.getSession({
    headers: await headers(),
  });
  return result;
}

export async function signOut() {
  const result = await auth.api.signOut({
    headers: await headers(),
  });

  if (result.success) {
    redirect("/sign-in");
  }
}
