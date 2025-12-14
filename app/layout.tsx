import './globals.css'
import Link from 'next/link'
import ThemeToggle from "./components/theme-toggle";
import MobileMenu from "./components/mobile-menu";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        
          <header className="border-b border-zinc-200 dark:border-zinc-800">
            <nav className="mx-auto max-w-6xl px-8 py-4 flex items-center">
              {/* Logo */}
                  <Link href="/" className="flex items-center gap-2">
                    <Image
                      src="/logo.jpg"
                      alt="Sumit logo"
                      width={32}
                      height={32}
                      className="rounded-sm"
                      priority
                    />
                  </Link>
          
              {/* Desktop nav */}
              <div className="ml-auto hidden md:flex gap-6 text-sm">
                <Link
                  href="/blog"
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  Blog
                </Link>
                <Link
                  href="/projects"
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  Projects
                </Link>
              </div>
          
              {/* Mobile menu */}
              <div className="ml-auto md:hidden">
                <MobileMenu />
              </div>
            </nav>
          </header>


          <main className="mx-auto max-w-4xl px-6">
            {children}
          </main>

        
<footer className="mt-24 border-t border-zinc-200 dark:border-zinc-800">
  <div className="mx-auto max-w-6xl px-8 py-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
    {/* Left */}
    <p className="text-sm text-zinc-500 dark:text-zinc-400">
      © {new Date().getFullYear()} Sumit Yadav
    </p>

    {/* Right */}
    <nav className="flex gap-4 text-sm font-medium">
      <a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
      >
        GitHub
      </a>

      <span className="text-zinc-400">·</span>

      <a
        href="https://linkedin.com/in/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
      >
        LinkedIn
      </a>

      <span className="text-zinc-400">·</span>

      <a
        href="mailto:youremail@example.com"
        className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
      >
        Email
      </a>
    </nav>
  </div>
</footer>



        
      </body>
      
    </html>
  )
}
