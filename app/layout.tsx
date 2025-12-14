import './globals.css'
import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 dark:bg-black dark:text-gray-100">
        <header className="border-b">
          <nav className="py-4 flex gap-6">
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/projects">Projects</Link>
          </nav>
        </header>
          <main className="mx-auto max-w-4xl px-6">
            {children}
          </main>
      </body>
    </html>
  )
}
