import './globals.css'
import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header className="border-b">
          <nav className="mx-auto max-w-4xl px-6 py-4 flex gap-6">
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/projects">Projects</Link>
          </nav>
        </header>

        <main>{children}</main>
      </body>
    </html>
  )
}
