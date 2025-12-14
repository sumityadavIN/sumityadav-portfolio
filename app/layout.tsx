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
            <nav className="mx-auto max-w-4xl px-6 py-4 flex items-center">
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
<footer className="border-t border-zinc-200 dark:border-zinc-800">
  <div className="mx-auto max-w-4xl px-6 py-10 flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
    <span>© {new Date().getFullYear()} Sumit</span>
    <ThemeToggle />
  </div>
</footer>


        
      </body>
      
    </html>
  )
}
