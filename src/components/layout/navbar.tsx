import Link from "next/link";

import { ThemeToggle } from "@/features/theme-toggle/ui/theme-toggle";

export function Navbar() {
  return (
    <header className="border-b border-border">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-sm font-semibold sm:text-base">
          Next Starter
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
