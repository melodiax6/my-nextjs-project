"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Search from "./Search";
import { ModeToggle } from "./ModeToggle";

const Navbar: React.FC = () => {
  const pages = [
    { pathname: "recipes", title: "Recipes" },
    { pathname: "about", title: "About" },
    { pathname: "shopping-list", title: "Shopping List" },
  ];

  return (
    <nav className="w-full bg-[hsl(var(--background))] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/0.1)] transition-colors duration-300 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:justify-between py-4 md:py-6 gap-4 md:gap-0">

        {/* Logo + Title */}
        <div className="flex items-center w-full md:w-auto justify-center md:justify-start gap-4">
          <Image
            src="/images/dumplings2.jpg"
            width={500}
            height={800}
            alt="logo"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full object-cover"
          />

          <Link
            href="/"
            className="text-2xl sm:text-3xl md:text-3xl font-playfair font-bold hover:opacity-70 transition-opacity duration-300"
          >
            DumplinGo
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 sm:gap-4 w-full md:w-auto">
          {pages.map((page) => (
            <Link
              href={`/${page.pathname}`}
              key={page.title}
              className="flex items-center justify-center
                        h-10 sm:h-12 px-3 sm:px-4 py-2
                        border rounded-full
                        text-base sm:text-base font-poppins font-light
                        border-[hsl(var(--foreground))]
                        hover:opacity-70
                        transition
                        min-w-[140px]"
            >
              {page.title}
            </Link>
          ))}
        </div>

        {/* Search + Toggle */}
        <div className="flex items-center justify-center md:justify-end gap-2 sm:gap-4 w-full md:w-auto mt-2 md:mt-0">
          <Search />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;





