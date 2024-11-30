"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { Suspense } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: true,
      username,
      password,
      callbackUrl: "/main",
    });
  };
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardDescription className="text-lg">
          Welcome to the AI course. Please login to continue. If you do not have
          an account please contact the author. You cannot create an account by
          yourself. <br />
          <div className="mt-5">
            Please also note that this is private repository and selling or
            sharing any data is this course is{" "}
            <span className="font-bold">strictly prohibited</span>. Regards,
          </div>
          Ravan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              {error && (
                <p
                  style={{
                    color: "red",
                    border: "1px solid red",
                    padding: "10px",
                    borderRadius: "4px",
                    marginBottom: "10px",
                  }}
                >
                  Invalid username or password
                </p>
              )}
              <Label htmlFor="username">Username</Label>
              <Input
                id="main"
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full ">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
