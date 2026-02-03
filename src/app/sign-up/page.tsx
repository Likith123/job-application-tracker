"use client";

import FormButton from "@/components/FormButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  
  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const result = await signUp.email({
        name: formData.firstName.trim() + " " + formData.lastName.trim(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        setError(result.error.message ?? "Sign up failed");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("An unexpected error occurred during sign up.");
    }
  }

  return (
    <section className="container max-w-7xl min-h-[calc(100vh-4rem)] mx-auto flex flex-col items-center justify-center">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <CardTitle className="text-2xl font-bold text-center">
          Sign Up
        </CardTitle>
        <CardDescription className="text-lg font-medium text-center text-muted-foreground">
          Please sign up for your account
        </CardDescription>
        <CardContent>
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm rounded-md p-2">
                {error}
              </div>
            )}
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <Input
                  id="firstName"
                  placeholder="First Name"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  required
                />
              </Field>
              <Field>
                <Input
                  id="lastName"
                  placeholder="Last Name"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  required
                />
              </Field>
            </FieldGroup>
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
                required
              />
            </div>
            <div>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
            {/* <div>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                required
              />
            </div> */}
            <div className="mt-4">
              <FormButton text="Sign Up" />
            </div>
          </form>
        </CardContent>
        <hr className="my-4" />
        <p className="flex gap-3 justify-center items-center">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </Card>
    </section>
  );
}
