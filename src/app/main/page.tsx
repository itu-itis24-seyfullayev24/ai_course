"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function MainPage() {
  const [posts, setPosts] = useState([]); // useState always defined outside of conditional logic
  const [error, setError] = useState(null);

  useEffect(() => {
    // Always use hooks consistently
    const fetchPosts = async () => {
      try {
        const response = await fetch("../posts/posts.json");
        if (!response.ok) throw new Error("Failed to load posts");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPosts();
  }, []); // Correct useEffect with dependency array

  if (error) {
    return <div>Error loading posts: {error}</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Main Page</h1>
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
        <p>Loading posts...</p>
      )}
    </div>
  );
}
