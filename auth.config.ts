import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import fs from "fs";
import path from "path";

const usersFilePath = path.join(process.cwd(), "users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
type User = {
  username: string;
  password: string;
  name: string;
  email: string;
};
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = users.find(
          (u: User) =>
            u.username === credentials?.username &&
            u.password === credentials?.password
        );

        if (user) {
          return { id: user.username, name: user.name, email: user.email };
        }

        throw new Error("Invalid username or password");
      },
    }),
  ],
  pages: {
    signIn: "/", // Login page
    error: "/", // Redirect here on error
  },
  secret: process.env.NEXTAUTH_SECRET,
};
