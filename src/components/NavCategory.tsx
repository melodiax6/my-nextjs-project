// "use client";

// import React, { useState } from 'react';

// type NavCategoryProps = {
//     title: string;
//     children: React.ReactNode;
// };

// const NavCategory: React.FC<NavCategoryProps> = ({ title, children }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleDropdown = () => {
//         setIsOpen(!isOpen);
//     };

//     return (
//         <li className="relative list-none group" onClick={toggleDropdown}>
//             <span
//                 className="cursor-pointer h-10 sm:h-12 px-4 py-2 text-base font-normal rounded-full transition-all duration-300 bg-transparent inline-flex items-center justify-between border-2 text-[#3A3967] border-[#3A3967] dark:text-gray-200 dark:border-gray-200 group-hover:text-[#ff8a65] group-hover:border-[#ff8a65]"
//             >
//                 {title}
//                 <span
//                     className={`ml-2 w-1.5 h-1.5 border-l-2 border-t-2 border-[#3A3967] dark:border-gray-200 transform transition-transform duration-300 ${
//                         isOpen ? 'rotate-[225deg]' : 'rotate-[135deg]'
//                     } group-hover:border-[#ff8a65]`}
//                 />
//             </span>
//             <ul
//                 className={`absolute top-full left-0 bg-white dark:bg-[#22223c] text-base shadow-lg rounded-lg py-4 mt-1 z-10 min-w-[150px] w-full sm:w-auto ${
//                     isOpen ? 'block' : 'hidden'
//                 } bg-gray-200 text-[#3A3967] dark:bg-[#22223c] dark:text-gray-200`}
//             >
//                 {React.Children.map(children, (child) => (
//                     <li className="text-inherit text-base block px-4 py-2 transition-all duration-300">
//                         {React.cloneElement(child as React.ReactElement, {
//                             className: `block w-full h-full hover:bg-[#FBB5A5] hover:text-[#3A3967] dark:hover:bg-[#FF8A65] dark:hover:text-[#22223c]`,
//                         })}
//                     </li>
//                 ))}
//             </ul>
//         </li>
//     );
// };

// export default NavCategory;

"use client";

import React, { useState, useEffect } from 'react';
import { allRecipes } from '@/lib/contentful/api'; // Zakładając, że masz funkcję do pobierania przepisów

type NavCategoryProps = {
    title: string;
    children?: React.ReactNode;
};

const NavCategory: React.FC<NavCategoryProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [recipes, setRecipes] = useState<any[]>([]); // Zmienna do przechowywania przepisów

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Ładowanie przepisów asynchronicznie
    useEffect(() => {
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
        <li className="relative list-none group" onClick={toggleDropdown}>
            <span
                className="cursor-pointer h-10 sm:h-12 px-4 py-2 text-base font-normal rounded-full transition-all duration-300 bg-transparent inline-flex items-center justify-between border-2 text-[#3A3967] border-[#3A3967] dark:text-gray-200 dark:border-gray-200 group-hover:text-[#ff8a65] group-hover:border-[#ff8a65]"
            >
                {title}
                <span
                    className={`ml-2 w-1.5 h-1.5 border-l-2 border-t-2 border-[#3A3967] dark:border-gray-200 transform transition-transform duration-300 ${
                        isOpen ? 'rotate-[225deg]' : 'rotate-[135deg]'
                    } group-hover:border-[#ff8a65]`}
                />
            </span>
            <ul
                className={`absolute top-full left-0 bg-white dark:bg-[#22223c] text-base shadow-lg rounded-lg py-4 mt-1 z-10 min-w-[150px] w-full sm:w-auto ${
                    isOpen ? 'block' : 'hidden'
                } bg-gray-200 text-[#3A3967] dark:bg-[#22223c] dark:text-gray-200`}
            >
                {title === "Recipes" ? (
                    // Jeśli tytuł to "Recipes", renderujemy przepisy dynamicznie
                    recipes.length > 0 ? (
                        recipes.map((recipe) => (
                            <li key={recipe.fields.id} className="text-inherit text-base block px-4 py-2 transition-all duration-300">
                                <a
                                    href={`/recipes/${recipe.fields.id}`}
                                    className="block w-full h-full hover:bg-[#FBB5A5] hover:text-[#3A3967] dark:hover:bg-[#FF8A65] dark:hover:text-[#22223c]"
                                >
                                    {recipe.fields.title}
                                </a>
                            </li>
                        ))
                    ) : (
                        <li className="text-inherit text-base block px-4 py-2 transition-all duration-300">
                            Loading recipes...
                        </li>
                    )
                ) : (
                    // Jeśli tytuł to cokolwiek innego, renderujemy children
                    React.Children.map(children, (child) => (
                        <li className="text-inherit text-base block px-4 py-2 transition-all duration-300">
                            {React.cloneElement(child as React.ReactElement, {
                                className: `block w-full h-full hover:bg-[#FBB5A5] hover:text-[#3A3967] dark:hover:bg-[#FF8A65] dark:hover:text-[#22223c]`,
                            })}
                        </li>
                    ))
                )}
            </ul>
        </li>
    );
};

export default NavCategory;

