"use client";

import FormButton from "@/components/FormButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const result = await signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        setError(result.error.message ?? "Sign in failed");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred during sign in.");
    }
  }
  return (
    <section className="container max-w-7xl min-h-[calc(100vh-4rem)] mx-auto flex flex-col items-center justify-center">
      <Card className="p-8 min-w-md">
        <CardTitle className="text-2xl font-bold text-center">
          Sign In
        </CardTitle>
        <CardDescription className="text-lg font-medium text-center text-muted-foreground">
          Please sign in to your account
        </CardDescription>
        <CardContent>
          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm rounded-md p-2">
                {error}
              </div>
            )}
            <div>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <FormButton text="Sign In" />
            </div>
          </form>
        </CardContent>
        <hr className="my-4" />
        <p className="flex gap-3 justify-center items-center">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </Card>
    </section>
  );
}
