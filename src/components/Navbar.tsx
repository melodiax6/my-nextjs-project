'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search as SearchIcon, Menu, X } from "lucide-react";
import Search from "./Search";
import { ModeToggle } from "./ModeToggle";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState("");

  const pages = [
    { pathname: "recipes", title: "Recipes" },
    { pathname: "about", title: "About" },
    { pathname: "shopping-list", title: "Shopping List" },
    { pathname: "cookmaster", title: "Cook With What You Have", special: true },
  ];

  return (
    <nav className="w-full bg-[hsl(var(--background))] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/0.1)] transition-colors duration-300 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto py-3 md:py-5">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <Image
              src="/images/dumplings2.jpg"
              width={500}
              height={800}
              alt="logo"
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full object-cover flex-shrink-0"
            />

            <span className="text-2xl sm:text-3xl font-playfair font-bold hover:opacity-70 transition-opacity duration-300 whitespace-nowrap">
              DumplinGo
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center justify-center gap-3 flex-1">
            {pages.map((page) => (
              <Link
                href={`/${page.pathname}`}
                key={page.title}
                className={`
                  flex items-center justify-center h-11 px-4 border rounded-full
                  text-base font-poppins font-light transition whitespace-nowrap
                  ${
                    page.special
                      ? "bg-pink-500 text-white border-pink-500 hover:bg-pink-600"
                      : "border-[hsl(var(--foreground))] hover:opacity-70"
                  }
                `}
              >
                {page.title}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Desktop/tablet Search */}
            <div className="hidden sm:block">
              <Search onOpenChange={() => {}} />
            </div>

            <ModeToggle />

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[hsl(var(--foreground)/0.2)] hover:bg-[hsl(var(--foreground)/0.06)] transition"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Search - zawsze rozwinięty */}
        <div className="sm:hidden mt-3">
          <div className="w-full flex items-center gap-2 rounded-full border border-[hsl(var(--foreground)/0.2)] bg-[hsl(var(--background))] px-4 py-2">
            <SearchIcon size={18} className="opacity-60 flex-shrink-0" />

            <input
              type="search"
              value={mobileSearch}
              onChange={(e) => setMobileSearch(e.target.value)}
              placeholder="Search recipes..."
              className="w-full bg-transparent outline-none text-sm font-poppins placeholder:opacity-60"
            />
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`
            lg:hidden overflow-hidden transition-all duration-300
            ${menuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"}
          `}
        >
          <div className="grid gap-2 pb-3">
            {pages.map((page) => (
              <Link
                href={`/${page.pathname}`}
                key={page.title}
                onClick={() => setMenuOpen(false)}
                className={`
                  w-full flex items-center justify-center min-h-11 px-4 py-2
                  border rounded-2xl text-sm sm:text-base font-poppins font-light
                  transition text-center
                  ${
                    page.special
                      ? "bg-pink-500 text-white border-pink-500 hover:bg-pink-600"
                      : "border-[hsl(var(--foreground)/0.2)] hover:bg-[hsl(var(--foreground)/0.06)]"
                  }
                `}
              >
                {page.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



