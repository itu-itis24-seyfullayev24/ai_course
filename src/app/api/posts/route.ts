import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Post = {
  slug: string;
  title: string;
  video: string;
  content: string;
};

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "posts.json");
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const posts: Post[] = JSON.parse(fileContents);

  return NextResponse.json(posts);
}
