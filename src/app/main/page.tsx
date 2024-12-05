"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavUser from "@/components/avatar_user";
import LoadingAnimation from "@/components/loading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Post = {
  slug: string;
  title: string;
};

export default function MainPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<Post[]>([]); // Set type here
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/posts.json");
        if (!response.ok) throw new Error("Failed to load posts");
        const data: Post[] = await response.json(); // Ensure type Post[]
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

  return (
    <div style={{ padding: "20px" }}>
      {session && (
        <NavUser
          user={{
            name: session.user?.name || "John Doe",
            email: session.user?.email || "john.doe@example.com",
            avatar: session.user?.image || "avatar_url",
          }}
        />
      )}

      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.slug} style={{ marginBottom: "10px" }}>
            <h3>{post.title}</h3>
            <Link href={`/posts/${post.slug}`}>
              <button>View Post</button>
            </Link>
          </div>
        ))
      ) : (
        <LoadingAnimation />
      )}

      <Accordion type="single" collapsible className="w-[20rem]">
        {/* Accordion Content */}
      </Accordion>
    </div>
  );
}
