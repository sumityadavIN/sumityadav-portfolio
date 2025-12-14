"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Burger button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        className="relative z-50 flex h-8 w-8 flex-col justify-center gap-1.5"
      >
        <span
          className={`h-0.5 w-6 bg-current transition-transform duration-300 ${
            open ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-current transition-opacity duration-300 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-current transition-transform duration-300 ${
            open ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      {/* Menu panel */}
      <div
        className={`fixed inset-x-0 top-16 z-40 origin-top transform bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 transition-all duration-300 ${
          open
            ? "scale-y-100 opacity-100"
            : "scale-y-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col px-6 py-6 gap-4 text-lg">
          <Link
            href="/blog"
            onClick={() => setOpen(false)}
            className="text-zinc-900 dark:text-zinc-100"
          >
            Blog
          </Link>
          <Link
            href="/projects"
            onClick={() => setOpen(false)}
            className="text-zinc-900 dark:text-zinc-100"
          >
            Projects
          </Link>
        </nav>
      </div>
    </div>
  );
}
