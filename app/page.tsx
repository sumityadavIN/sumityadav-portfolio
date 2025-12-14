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
        <h2 className="text-lg font-medium tracking-tight text-zinc-700 dark:text-zinc-300">
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


         {/* Social  */}   
        <section className="mt-10">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Find me on
          </p>
        
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
            <a
              href="https://github.com/sumityadavIN"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-900 hover:underline dark:text-zinc-100"
            >
              GitHub
            </a>
        
            <span className="text-zinc-400">·</span>
        
            <a
              href="https://www.linkedin.com/in/sumityadav96/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-900 hover:underline dark:text-zinc-100"
            >
              LinkedIn
            </a>
        
            <span className="text-zinc-400">·</span>
        
            <a
              href="https://x.com/sumityadav_me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-900 hover:underline dark:text-zinc-100"
            >
              X
            </a>
        
            <span className="text-zinc-400">·</span>
        
            <a
              href="mailto:contact@sumityadav.me"
              className="text-zinc-900 hover:underline dark:text-zinc-100"
            >
              Email
            </a>
          </div>
        </section>

      
        {/* DIVIDER */}
      <hr className="border-gray-200 dark:border-gray-800" />

      
    </main>
  );
}
