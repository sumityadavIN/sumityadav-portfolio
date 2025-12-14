import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-4xl font-bold mb-4">
        Hi, I’m Sumit 👋
      </h1>

      <p className="text-xl text-gray-600 max-w-2xl mb-8">
        I build software, explore systems and AI, and write about what I learn.
      </p>

      <div className="flex gap-4">
        <Link
          href="/blog"
          className="rounded bg-black px-6 py-3 text-white"
        >
          Read Blog
        </Link>

        <Link
          href="/projects"
          className="rounded border px-6 py-3"
        >
          View Projects
        </Link>
      </div>
    </main>
  )
}
