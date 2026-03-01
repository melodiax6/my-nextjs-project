'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearch } from "../context/SearchContext";
import { allRecipes } from "@/lib/contentful/api";

type RawRecipe = {
  id?: string;
  title?: string;
  time?: string;
  difficulty?: string;
  fields?: {
    id?: string;
    title?: string;
    time?: string;
    difficulty?: string;
  };
};

type Recipe = {
  id: string;
  title: string;
  time: string;
  difficulty: string;
};

type SearchProps = {
  onOpenChange?: (open: boolean) => void;
};

const Search: React.FC<SearchProps> = ({ onOpenChange }) => {
  const { searchValue, setSearchValue } = useSearch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const rawRecipes: RawRecipe[] = (await allRecipes()) ?? [];

      const transformed: Recipe[] = rawRecipes.map((entry) => ({
        id: entry.id ?? entry.fields?.id ?? "unknown",
        title: entry.title ?? entry.fields?.title ?? "Untitled",
        time: entry.time ?? entry.fields?.time ?? "N/A",
        difficulty: entry.difficulty ?? entry.fields?.difficulty ?? "Easy",
      }));

      setRecipes(transformed);
    }

    fetchData();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const iconSrc = isDark ? "/images/search-w.png" : "/images/search-b.png";

  const toggleSearch = (open: boolean) => {
    setIsSearchOpen(open);
    onOpenChange?.(open);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Ikona lupki, gdy pole jest zamknięte */}
      {!isSearchOpen && (
        <Image
          src={iconSrc}
          alt="search-icon"
          width={24}
          height={24}
          className="cursor-pointer ml-2 transition-transform duration-200 hover:scale-110 flex-shrink-0"
          onClick={() => toggleSearch(true)}
        />
      )}

      {/* Pole wyszukiwania */}
      {isSearchOpen && (
        <div className="relative flex items-center bg-[#FBB5A5] dark:bg-[#FFC8C2] p-3 rounded-full h-12 w-full max-w-lg shadow-lg">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-transparent border-0 outline-none px-3 flex-grow rounded-full font-poppins"
          />

          {/* Lupka w przycisku zamykania */}
          <button
            onClick={() => {
              toggleSearch(false);
              setSearchValue("");
            }}
            className="ml-2 flex items-center justify-center w-6 h-6 transition-transform duration-200 hover:scale-110 flex-shrink-0"
          >
            <Image
              src={iconSrc} // ta sama lupka co przy otwieraniu
              alt="search-icon"
              width={24}
              height={24}
            />
          </button>
        </div>
      )}

      {/* Wyniki wyszukiwania */}
      {isSearchOpen && searchValue && (
        <div className="absolute top-14 bg-[hsl(var(--background))] dark:bg-[#2D2D44] shadow-xl rounded-lg w-full max-h-60 overflow-y-auto z-10 border mt-2">
          {filteredRecipes.map((recipe) => (
            <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
              <div className="p-4 hover:bg-[#FBB5A5] dark:hover:bg-[#FFC8C2] cursor-pointer flex flex-col rounded-lg transition-all duration-200">
                <span className="font-semibold text-base font-poppins">
                  {recipe.title}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-poppins">
                  {recipe.time}
                </span>
              </div>
            </Link>
          ))}

          {filteredRecipes.length === 0 && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400 font-poppins">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;






