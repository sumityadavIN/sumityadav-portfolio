"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  function toggleTheme() {
    const root = document.documentElement;

    // REMOVE all other theme classes
    root.classList.remove("light", "white");

    // Toggle dark only
    root.classList.toggle("dark");
  }

  return (
    <button
      onClick={toggleTheme}
      className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
    >
      Toggle theme
    </button>
  );
}
