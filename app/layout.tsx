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
        <header className="border-b border-gray-200 dark:border-gray-800">
              <nav className="mx-auto max-w-4xl px-6 py-4 flex items-center">
                {/* Logo (left) */}
                <Link
                  href="/"
                  className="font-semibold tracking-tight text-lg"
                >
                  Sumit
                </Link>
            
                {/* Nav links (right) */}
                <div className="ml-auto flex gap-6 text-sm">
                  <Link
                    href="/blog"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/projects"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Projects
                  </Link>
                </div>
              </nav>
            </header>

          <main className="mx-auto max-w-4xl px-6">
            {children}
          </main>
      </body>
    </html>
  )
}
