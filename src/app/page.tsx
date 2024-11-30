import Image from "next/image";
import NextAuth from "next-auth";

import { LoginForm } from "@/components/login-form";

export default function Home() {
  return (
    <div className="min-h-screen items-center flex justify-center overflow-y-hidden">
      <LoginForm />
    </div>
  );
}
