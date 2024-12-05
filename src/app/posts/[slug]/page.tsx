import { notFound } from "next/navigation";
import { use } from "react";
type Post = {
  slug: string;
  title: string;
  video: string;
  content: string;
};
type Params = Promise<{ slug: string }>;

export default async function PostPage(props: { params: Params }) {
  const params = use(props.params);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    next: { revalidate: 60 }, // optional caching if needed
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const posts: Post[] = await res.json();
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <video
        src={post.video}
        controls
        style={{ width: "100%", height: "auto" }}
      />
      <p>{post.content}</p>
    </div>
  );
}
