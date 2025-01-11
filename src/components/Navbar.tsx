"use client";

import React from "react";
import Link from "next/link";
import Search from "./Search";
import { ModeToggle } from "./ModeToggle"; 


const Navbar: React.FC = () => {
    const pages = [{pathname: "recipes", title: "Recipes"}, {pathname: "about", title: "About"}, {pathname: "shopping-list", title: "Shopping List"}]

    return (
        
        <div className="flex flex-wrap w-full justify-between items-center p-4 md:px-10 bg-gray-200 text-[#3A3967] dark:bg-[#22223c] dark:text-gray-200 transition-all duration-500">
            <div className="flex items-center mb-4 md:mb-0">
                <img
                    src="/images/dumplings2.jpg"
                    alt="logo"
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full object-cover mr-4 sm:mr-6"
                />
                <Link
                    href="/"
                    className="text-2xl sm:text-3xl font-serif font-bold text-[#3a3967] dark:text-gray-200 hover:text-[#fbb5a5] transition-colors duration-300"
                >
                    Dumplings Recipes
                </Link>
            </div>

            <div className="flex flex-wrap items-center space-x-4">
                {pages.map(page => (

                <Link
                    href={`/${page.pathname}`}
                    className="flex items-center justify-center h-10 sm:h-12 px-4 py-2 border-2 rounded-full font-weight: 300 text-base text-[#3a3967] border-[#3a3967] dark:text-gray-200 dark:border-gray-200 hover:text-[#ff8a65] hover:border-[#ff8a65] transition-all duration-300"
                >
                    {page.title}
                </Link>
                ))}
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4 mt-4 md:mt-0">
                <Search />
                <ModeToggle />
            </div>
        </div>
    );
};

export default Navbar;


