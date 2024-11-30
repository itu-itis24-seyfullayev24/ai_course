import { promises as fs } from "fs";
import path from "path";

// Enable dynamic params handling
export const dynamicParams = true;

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    // Load posts.json file dynamically
    const filePath = path.join(process.cwd(), "src", "app", "posts.json");
    const fileContents = await fs.readFile(filePath, "utf-8");
    const posts = JSON.parse(fileContents);

    // Ensure params is awaited and find the post
    const post = posts.find((p: any) => p.slug === params.slug);

    if (!post) {
      return <h1>Post Not Found</h1>;
    }

    return (
      <div style={{ padding: "20px" }}>
        <h1>{post.title}</h1>
        <video controls style={{ width: "100%" }}>
          <source src={`/videos/${post.video}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p>{post.content}</p>
      </div>
    );
  } catch (error) {
    console.error("Error loading post:", error);
    return <h1>Error loading the post</h1>;
  }
}
