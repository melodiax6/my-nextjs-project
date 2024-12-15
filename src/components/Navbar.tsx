// "use client";

// import React from 'react';
// import Link from 'next/link';
// import NavCategory from './NavCategory';
// import { recipesData } from '../utils/recipeData';
// import Search from './Search';
// import { ModeToggle } from './ModeToggle';

// const Navbar = () => {
//   return (
//     <div className="flex flex-wrap w-full justify-between items-center p-4 md:px-10 bg-gray-200 text-[#3A3967] dark:bg-[#22223c] dark:text-gray-200 transition-all duration-500">
//       <div className="flex items-center mb-4 md:mb-0">
//         {/* Responsive logo */}
//         <img
//           src="/images/dumplings2.jpg"
//           alt="logo"
//           className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full object-cover mr-4 sm:mr-6"
//         />
//         <Link href="/" className="text-2xl sm:text-3xl font-serif font-bold text-[#3a3967] dark:text-gray-200 hover:text-[#fbb5a5] transition-colors duration-300">
//           Dumplings Recipes
//         </Link>
//       </div>

//       {/* Category navigation with dropdowns */}
//       <div className="flex flex-wrap items-center space-x-4">
//         <NavCategory title="Recipes" className="flex items-center justify-center h-10 sm:h-12 px-4 py-2 border-[3px] rounded-full font-semibold text-base text-[#3a3967] border-[#3a3967] dark:text-gray-200 dark:border-gray-200 hover:text-[#ff8a65] hover:border-[#ff8a65] transition-all duration-300">
//           {recipesData.map((recipe) => (
//             <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
//               {recipe.title}
//             </Link>
//           ))}
//           <Link href="/recipes">Recipes Site</Link>
//           <Link href="/ingredients">Ingredients</Link>
//         </NavCategory>

//         {/* Direct links for About and Shopping List */}
//         <Link
//           href="/about"
//           className="flex items-center justify-center h-10 sm:h-12 px-4 py-2 border-2 rounded-full font-weight: 300 text-base text-[#3a3967] border-[#3a3967] dark:text-gray-200 dark:border-gray-200 hover:text-[#ff8a65] hover:border-[#ff8a65] transition-all duration-300"
//         >
//           About
//         </Link>
//         <Link
//           href="/shopping-list"
//           className="flex items-center justify-center h-10 sm:h-12 px-4 py-2 border-2 rounded-full font-weight: 300 text-base text-[#3a3967] border-[#3a3967] dark:text-gray-200 dark:border-gray-200 hover:text-[#ff8a65] hover:border-[#ff8a65] transition-all duration-300"
//         >
//           Shopping List
//         </Link>
//       </div>

//       {/* Search, mode toggle, and login button */}
//       <div className="flex items-center space-x-2 sm:space-x-4 mt-4 md:mt-0">
//         <Search />
//         <ModeToggle />
//       </div>
//     </div>
//   );
// };

// export default Navbar;


"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NavCategory from './NavCategory';
import { allRecipes } from '@/lib/contentful/api'; // Zakładając, że masz funkcję do pobierania przepisów
import Search from './Search';
import { ModeToggle } from './ModeToggle';

const Navbar = () => {
  const [recipes, setRecipes] = useState<any[]>([]); // Typowanie może zależeć od struktury danych

  useEffect(() => {
    // Asynchroniczne pobieranie danych z Contentful
    const fetchRecipes = async () => {
      try {
        const data = await allRecipes(); // Funkcja do pobierania przepisów z Contentful
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="flex flex-wrap w-full justify-between items-center p-4 md:px-10 bg-gray-200 text-[#3A3967] dark:bg-[#22223c] dark:text-gray-200 transition-all duration-500">
      <div className="flex items-center mb-4 md:mb-0">
        {/* Responsive logo */}
        <img
          src="/images/dumplings2.jpg"
          alt="logo"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full object-cover mr-4 sm:mr-6"
        />
        <Link href="/" className="text-2xl sm:text-3xl font-serif font-bold text-[#3a3967] dark:text-gray-200 hover:text-[#fbb5a5] transition-colors duration-300">
          Dumplings Recipes
        </Link>
      </div>

      {/* Category navigation with dropdowns */}
      <div className="flex flex-wrap items-center space-x-4">
        <NavCategory title="Recipes" className="flex items-center justify-center h-10 sm:h-12 px-4 py-2 border-[3px] rounded-full font-semibold text-base text-[#3a3967] border-[#3a3967] dark:text-gray-200 dark:border-gray-200 hover:text-[#ff8a65] hover:border-[#ff8a65] transition-all duration-300">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <Link key={recipe.fields.id} href={`/recipes/${recipe.fields.id}`}>
                {recipe.fields.title}
              </Link>
            ))
          ) : (
            <p>Loading recipes...</p> // Placeholder, jeśli dane się ładują
          )}
          <Link href="/recipes">Recipes Site</Link>
          <Link href="/ingredients">Ingredients</Link>
        </NavCategory>

        {/* Direct links for About and Shopping List */}
        <Link
          href="/about"
          className="flex items-center justify-center h-10 sm:h-12 px-4 py-2 border-2 rounded-full font-weight: 300 text-base text-[#3a3967] border-[#3a3967] dark:text-gray-200 dark:border-gray-200 hover:text-[#ff8a65] hover:border-[#ff8a65] transition-all duration-300"
        >
          About
        </Link>
        <Link
          href="/shopping-list"
          className="flex items-center justify-center h-10 sm:h-12 px-4 py-2 border-2 rounded-full font-weight: 300 text-base text-[#3a3967] border-[#3a3967] dark:text-gray-200 dark:border-gray-200 hover:text-[#ff8a65] hover:border-[#ff8a65] transition-all duration-300"
        >
          Shopping List
        </Link>
      </div>

      {/* Search, mode toggle, and login button */}
      <div className="flex items-center space-x-2 sm:space-x-4 mt-4 md:mt-0">
        <Search />
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;



