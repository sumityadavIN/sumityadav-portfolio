import Link from "next/link";

import { sanityFetch } from "@/sanity/lib/fetch";
import { latestPostsQuery } from "@/sanity/lib/queries";

type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  date?: string;
};

export default async function HomePage() {
  const posts: Post[] = await sanityFetch({
    query: latestPostsQuery,
  });

  return (
    <main className="mx-auto max-w-6xl px-8">
      {/* HERO */}
      <section className="pt-24 pb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight text-zinc-900 dark:text-zinc-100">
            Hi, I’m Sumit.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            I build thoughtful software products and write about systems,
            engineering, and long-term thinking.
          </p>

        <div className="mt-10 flex gap-6 text-sm">
          <Link
            href="/projects"
            className="font-medium underline underline-offset-4"
          >
            View projects
          </Link>

          <Link
            href="/blog"
            className="text-gray-600 dark:text-gray-400 underline underline-offset-4"
          >
            Read blog
          </Link>
        </div>
      </section>

      {/* DIVIDER */}
      <hr className="border-gray-200 dark:border-gray-800" />

      {/* ABOUT */}
      <section className="py-20">
        <h2 className="text-sm uppercase tracking-wider text-gray-500">
          About
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          I’m interested in building reliable systems, understanding how
          complex things fail, and writing software that stays boring over
          time. I value clarity, simplicity, and long-term thinking.
        </p>
      </section>

      {/* DIVIDER */}
      <hr className="border-gray-200 dark:border-gray-800" />

      {/* LATEST WRITING */}
      {posts?.length > 0 && (
        <section className="py-20">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm uppercase tracking-wider text-gray-500">
              Latest writing
            </h2>

            <Link
              href="/blog"
              className="text-sm underline underline-offset-4 text-gray-600 dark:text-gray-400"
            >
              View all
            </Link>
          </div>

          <ul className="mt-10 space-y-8">
            {posts.map((post) => (
              <li key={post._id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <h3 className="text-xl font-medium group-hover:underline underline-offset-4">
                    {post.title}
                  </h3>

                  {post.excerpt && (
                    <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl">
                      {post.excerpt}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* FOOTER CTA */}
      <section className="pb-24 pt-10">
        <p className="text-gray-600 dark:text-gray-400">
          You can also find me exploring ideas through code and long-form
          projects.
        </p>

        <div className="mt-4">
          <Link
            href="/projects"
            className="underline underline-offset-4"
          >
            Explore projects →
          </Link>
        </div>
      </section>
    </main>
  );
}
