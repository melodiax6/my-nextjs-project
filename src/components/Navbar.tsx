"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Search from "./Search";
import { ModeToggle } from "./ModeToggle";
import { Menu, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const Navbar: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const pages = [
    { pathname: "recipes", title: "Recipes" },
    { pathname: "saved-recipes", title: "Saved Recipes" },
    { pathname: "about", title: "About" },
    { pathname: "shopping-list", title: "Shopping List" },
    { pathname: "cookmaster", title: "Cook With What You Have", special: true },
  ];

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log("SUPABASE USER:", user);
      setUser(user);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();

    setUser(null);
    setMenuOpen(false);

    window.location.reload();
  };

  return (
    <nav className="w-full bg-[hsl(var(--background))] text-[hsl(var(--foreground))] border-b border-[hsl(var(--foreground)/0.1)] transition-colors duration-300 px-2 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto py-3 md:py-5">
        <div
          className={`
            items-center gap-1 sm:gap-3
            ${
              searchOpen
                ? "grid grid-cols-[44px_minmax(0,1fr)] sm:flex sm:justify-between"
                : "flex justify-between"
            }
          `}
        >
          <Link
            href="/"
            className="flex items-center gap-2 min-w-0 flex-shrink-0"
          >
            <Image
              src="/images/dumplings2.jpg"
              width={500}
              height={800}
              alt="logo"
              className="w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full object-cover flex-shrink-0"
            />

            <span
              className={`
                text-2xl sm:text-3xl font-playfair font-bold
                hover:opacity-70 transition-all duration-300 whitespace-nowrap
                ${searchOpen ? "hidden sm:block" : "block"}
              `}
            >
              DumplinGo
            </span>
          </Link>

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

          <div
            className={`
              flex items-center gap-1 min-w-0
              ${searchOpen ? "w-full" : "flex-shrink-0"}
            `}
          >
            <div className={`${searchOpen ? "flex-1 min-w-0" : "w-auto"}`}>
              <Search onOpenChange={(open: boolean) => setSearchOpen(open)} />
            </div>

            <div className="flex-shrink-0">
              <ModeToggle />
            </div>

            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="
                  hidden sm:flex items-center justify-center
                  h-10 px-4 rounded-full
                  border border-[hsl(var(--foreground)/0.2)]
                  hover:bg-[hsl(var(--foreground)/0.06)]
                  transition text-sm font-medium
                  whitespace-nowrap flex-shrink-0
                "
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="
                  hidden sm:flex items-center justify-center
                  h-10 px-4 rounded-full
                  border border-[hsl(var(--foreground)/0.2)]
                  hover:bg-[hsl(var(--foreground)/0.06)]
                  transition text-sm font-medium
                  whitespace-nowrap flex-shrink-0
                "
              >
                Login
              </Link>
            )}

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="
                lg:hidden inline-flex items-center justify-center
                w-10 h-10 rounded-full
                border border-[hsl(var(--foreground)/0.2)]
                hover:bg-[hsl(var(--foreground)/0.06)]
                transition flex-shrink-0
              "
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <div
          className={`
            lg:hidden overflow-hidden transition-all duration-300
            ${menuOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"}
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

            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="
                  w-full flex items-center justify-center min-h-11 px-4 py-2
                  border rounded-2xl text-sm sm:text-base font-poppins font-light
                  border-[hsl(var(--foreground)/0.2)]
                  hover:bg-[hsl(var(--foreground)/0.06)]
                  transition
                "
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="
                  w-full flex items-center justify-center min-h-11 px-4 py-2
                  border rounded-2xl text-sm sm:text-base font-poppins font-light
                  border-[hsl(var(--foreground)/0.2)]
                  hover:bg-[hsl(var(--foreground)/0.06)]
                  transition text-center
                "
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

