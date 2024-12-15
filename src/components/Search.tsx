"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearch } from '../context/SearchContext';
import { recipesData } from '../utils/recipeData';

const searchIconLight = '/images/search-w.png';
const searchIconDark = '/images/search-b.png';
const closeIcon = '/images/search-b.png';

function Search() {
  const { searchValue, setSearchValue } = useSearch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Filter recipes based on searchValue
  const filteredRecipes = recipesData.filter(recipe =>
    recipe.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="relative flex flex-col items-center">
      {/* Search icon button to open the search input */}
      {!isSearchOpen && (
        <Image
          src={searchIconDark} // default to dark icon
          alt="search-icon"
          width={24}
          height={24}
          className="cursor-pointer ml-2 transition-transform duration-200 hover:scale-110 dark:hidden" // Show only in light mode
          onClick={() => setIsSearchOpen(true)}
        />
      )}
      {!isSearchOpen && (
        <Image
          src={searchIconLight} // use white icon for dark mode
          alt="search-icon"
          width={24}
          height={24}
          className="cursor-pointer ml-2 transition-transform duration-200 hover:scale-110 hidden dark:block" // Show only in dark mode
          onClick={() => setIsSearchOpen(true)}
        />
      )}

      {/* Search input field with close button */}
      {isSearchOpen && (
        <div className="relative flex items-center bg-[#FBB5A5] dark:bg-[#FFC8C2] p-3 rounded-full h-12 w-full max-w-lg shadow-lg">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-transparent border-0 outline-none text-[#3A3967] dark:text-[#9E88E4] text-base placeholder:text-[#3A3967] dark:placeholder:text-[#9E88E4] px-3 flex-grow rounded-full transition-colors duration-200 ease-in-out"
          />
          {/* Close button */}
          <Image
            src={closeIcon}
            alt="close-icon"
            width={24}
            height={24}
            className="cursor-pointer ml-2 transition-transform duration-200 hover:scale-110"
            onClick={() => {
              setIsSearchOpen(false);
              setSearchValue('');
            }}
          />
        </div>
      )}

      {/* Search results dropdown */}
      {isSearchOpen && searchValue && (
        <div className="absolute top-14 bg-white dark:bg-[#2D2D44] shadow-xl rounded-lg w-full max-h-60 overflow-y-auto z-10 border border-gray-200 dark:border-gray-700 mt-2 animate-fade-in">
          {filteredRecipes.map((recipe) => (
            <Link key={recipe.id} href={`/recipes/${recipe.id}`} passHref>
              <div className="p-4 hover:bg-[#FBB5A5] dark:hover:bg-[#FFC8C2] cursor-pointer flex flex-col rounded-lg transition-all duration-200">
                <span className="font-semibold text-[#3A3967] dark:text-[#9E88E4] text-base">
                  {recipe.title}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{recipe.time}</span>
              </div>
            </Link>
          ))}
          {filteredRecipes.length === 0 && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
