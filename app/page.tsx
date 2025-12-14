import Link from "next/link";

import { sanityFetch } from "@/sanity/lib/fetch";
import { latestPostsQuery } from "@/sanity/lib/queries";

type Post = {
  _id: string;
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
};

export default async function HomePage() {
  const posts: Post[] = await sanityFetch({
    query: latestPostsQuery,
  });

  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      {/* Hero */}
      <section className="mb-20">
        <h1 className="text-4xl font-bold mb-4">
          Hi, I’m Sumit 👋
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Personal portfolio and notes on software, systems, and learning.
        </p>

        <div className="flex gap-4">
          <Link
            href="/blog"
            className="rounded bg-black px-6 py-3 text-white"
          >
            Read Blog
          </Link>
        </div>
      </section>

      {/* Latest Posts */}
      {posts?.length > 0 && (
        <section>
          <h2 className="mb-8 text-2xl font-semibold">
            Latest Writing
          </h2>

          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post._id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xl font-medium hover:underline"
                >
                  {post.title}
                </Link>

                {post.excerpt && (
                  <p className="mt-1 text-gray-600">
                    {post.excerpt}
                  </p>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Link href="/blog" className="underline">
              View all posts →
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
