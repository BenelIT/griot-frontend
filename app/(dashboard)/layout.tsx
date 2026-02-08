"use client";

import { BarChart3, BookOpen, Home, Library, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-verbum-cream">
      <header className="bg-verbum-cream">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          {/* Logo */}
          <img
            src={"/logos/VerbumLight.svg"}
            alt="Verbum Logo"
            className="h-9 w-auto shrink-0 object-contain sm:h-12"
          />

          {/* Desktop Navigation */}
          <div className="hidden gap-6 text-sm font-sans md:flex">
            <Link href="/" className="hover:text-verbum-teal transition-colors">
              Dashboard
            </Link>
            <Link href="/" className="hover:text-verbum-teal transition-colors">
              Example
            </Link>
            <Link href="/" className="hover:text-verbum-teal transition-colors">
              Example
            </Link>
            <Link href="/" className="hover:text-verbum-teal transition-colors">
              Example
            </Link>
          </div>

          {/* Right side - Avatar (desktop only) and Hamburger */}
          <div className="flex items-center gap-4">
            {/* Avatar - Only visible on desktop */}
            <div className="hidden h-10 w-9 shrink-0 rounded-full bg-verbum-teal md:block"></div>

            {/* Hamburger Button - Only on mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden transition-transform hover:scale-110"
              aria-label="Toggle menu"
            >
              <Menu className="h-7 w-7 transition-all" />
            </button>
          </div>
        </nav>

        {/* Mobile Menu Sidebar */}
        <div
          className={`fixed inset-y-0 right-0 z-50 w-72 bg-verbum-cream shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header con avatar y botón cerrar */}
            <div className="flex items-center justify-between p-6 border-b border-verbum-teal/10">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div
                  className="h-12 w-12 shrink-0 rounded-full bg-linear-to-br from-verbum-teal to-verbum-teal/70 
                            flex items-center justify-center text-white font-semibold text-lg"
                >
                  CC
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold font-serif text-gray-900 truncate">
                    Cristóbal de Jesus Coronel Chambé
                  </p>
                  <p className="text-sm font-sans text-gray-500 truncate">
                    cristobal.coronelchambe@outlook.com
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-verbum-teal/10 rounded-lg transition-colors shrink-0 ml-2"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-verbum-gray" />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 px-4 py-6 overflow-y-auto">
              <div className="flex flex-col gap-2">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-verbum-teal/10 transition-all group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="h-5 w-5 text-verbum-teal" />
                  <span className="font-medium font-sans text-verbum-gray group-hover:text-verbum-teal">
                    Dashboard
                  </span>
                </Link>

                <Link
                  href="/"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-verbum-teal/10 transition-all group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BookOpen className="h-5 w-5 text-verbum-teal" />
                  <span className="font-medium font-sans text-verbum-gray group-hover:text-verbum-teal">
                    Study
                  </span>
                </Link>

                <Link
                  href="/"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-verbum-teal/10 transition-all group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Library className="h-5 w-5 text-verbum-teal" />
                  <span className="font-medium font-sans text-verbum-gray group-hover:text-verbum-teal">
                    Words
                  </span>
                </Link>

                <Link
                  href="/"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-verbum-teal/10 transition-all group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BarChart3 className="h-5 w-5 text-verbum-teal" />
                  <span className="font-medium font-sans text-verbum-gray group-hover:text-verbum-teal">
                    Statistics
                  </span>
                </Link>
              </div>
            </nav>

            {/* Footer con botón de logout o acción secundaria */}
            <div className="p-4 border-t border-verbum-teal/10">
              <button
                className="w-full px-4 py-3 bg-verbum-teal text-verbum-cream rounded-lg font-medium 
                        font-serif hover:bg-verbum-teal/90 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-white/10 backdrop-blur-lg md:hidden"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6">
        {children}
      </main>
    </div>
  );
}
