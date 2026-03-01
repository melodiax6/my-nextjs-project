'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Search from "./Search";
import { ModeToggle } from "./ModeToggle";

const Navbar: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const pages = [
    { pathname: "recipes", title: "Recipes" },
    { pathname: "about", title: "About" },
    { pathname: "shopping-list", title: "Shopping List" },
    { pathname: "cookmaster", title: "Cook With What You Have", special: true },
  ];

  return (
    <nav className="w-full bg-[hsl(var(--background))] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/0.1)] transition-colors duration-300 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center py-4 md:py-6">

        {/* Logo */}
        <div
          className={`flex items-center gap-2.5 flex-shrink-0 transition-all duration-300
                      ${searchOpen ? "translate-x-2 sm:translate-x-4 md:translate-x-0" : "translate-x-0"}`}
        >
          <Image
            src="/images/dumplings2.jpg"
            width={500}
            height={800}
            alt="logo"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full object-cover flex-shrink-0"
          />
          <Link
            href="/"
            className="text-2xl sm:text-3xl md:text-3xl font-playfair font-bold hover:opacity-70 transition-opacity duration-300 -ml-0.5 whitespace-nowrap"
          >
            DumplinGo
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 flex-1 min-w-0">
          {pages.map((page) => (
            <Link
              href={`/${page.pathname}`}
              key={page.title}
              className={`
                flex items-center justify-center
                h-10 sm:h-12 px-2.5 sm:px-3.5 py-2
                border rounded-full
                text-base font-poppins font-light
                transition
                flex-shrink-0
                ${page.special
                  ? "bg-pink-500 text-white border-pink-500 hover:bg-pink-600 whitespace-nowrap"
                  : "border-[hsl(var(--foreground))] hover:opacity-70 min-w-[120px]"
                }
                ${page.pathname === "recipes" && searchOpen ? "ml-6 sm:ml-10" : ""}
              `}
            >
              {page.title}
            </Link>
          ))}
        </div>

        {/* Right side: Search + ModeToggle */}
        <div className="flex items-center gap-2.5 ml-1.5 sm:ml-2.5 md:ml-4 flex-shrink-0">
          <Search onOpenChange={(open: boolean) => setSearchOpen(open)} />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




