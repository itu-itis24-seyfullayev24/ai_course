"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavUser from "@/components/avatar_user";
import LoadingAnimation from "@/components/loading";
export default function MainPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]); // Always defined outside conditional logic
  const [error, setError] = useState(null);

  // Redirect if session is not available (for protected routes)
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/posts.json"); // Ensure this path is correct
        if (!response.ok) throw new Error("Failed to load posts");
        const data = await response.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchPosts();
  }, []);

  if (status === "loading") {
    return <LoadingAnimation />;
  }

  if (error) {
    return <div>Error loading posts: {error}</div>;
  }

  type Post = {
    slug: string;
    title: string;
  };

  return (
    <div style={{ padding: "20px" }}>
      {session && (
        <div>
          <NavUser
            user={{
              name: session.user?.name || "John Doe",
              email: session.user?.email || "john.doe@example.com",
              avatar: session.user?.image || "avatar_url",
            }}
          />
        </div>
      )}
      {posts.length > 0 ? (
        posts.map((post: Post) => (
          <div
            key={post.slug}
            style={{ marginBottom: "10px" }}
            className="mt-[4rem]"
          >
            <h3>{post.title}</h3>
            <Link href={`/posts/${post.slug}`}>
              <button>View Post</button>
            </Link>
          </div>
        ))
      ) : (
        <LoadingAnimation />
      )}
    </div>
  );
}
