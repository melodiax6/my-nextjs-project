'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { recipesData } from '../../utils/recipeData';

const Recipes = (props: any) => {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 min-h-screen">
      {/* Search bar
      <div className="flex items-center bg-[#FBB5A5] dark:bg-[#FFC8C2] p-2 rounded-full h-12 w-full max-w-lg mb-6">
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="bg-transparent border-0 outline-none text-[#3A3967] dark:text-[#9E88E4] text-base placeholder:text-[#3A3967] dark:placeholder:text-[#9E88E4] px-4 flex-grow"
        />
      </div> */}

      {/* Recipe cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {recipesData
          .filter(recipe => recipe.title.toLowerCase().includes(searchValue))
          .map((recipe, index) => (
            <Link
              href={{
                pathname: `/recipes/${recipe.id}`,
                query: { recipe: JSON.stringify(recipe) }
              }}
              passHref
              key={index}
            >
              <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1 flex flex-col">
                <div className="relative w-full h-0 pb-[56.25%] rounded-t-xl overflow-hidden"> 
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4 flex flex-col items-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                    {recipe.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 text-center">
                    {recipe.time}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 text-sm font-medium text-white rounded-full 
                    ${recipe.difficulty === 'Easy' ? 'bg-green-500' : 
                      recipe.difficulty === 'Not too tricky' ? 'bg-blue-500' : 
                      recipe.difficulty === 'Moderate' ? 'bg-orange-500' : 
                      recipe.difficulty === 'Challenging' ? 'bg-red-500' : 'bg-gray-500'}`}
                  >
                    {recipe.difficulty}
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Recipes;


