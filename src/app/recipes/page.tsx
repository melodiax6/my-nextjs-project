'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { allRecipes } from '@/lib/contentful/api';
import { HydrationBoundary } from '@/components/HydrationBoundary';

type RecipeFields = {
  id: string;
  title: string;
  time: string;
  difficulty: 'Easy' | 'Not too tricky' | 'Moderate' | 'Challenging';
  image?: {
    fields: {
      file: {
        url: string;
      };
      title: string;
    };
  };
};

type Recipe = {
  fields: RecipeFields;
};

export default function Recipes() {
  const searchParams = useSearchParams();
  const kind = searchParams?.get('kind');

  const [data, setData] = useState<Recipe[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const rawRecipes = await allRecipes(kind);

      // Transform the raw data to match the Recipe type
      const transformedRecipes = rawRecipes?.map((entry: any) => ({
        fields: {
          id: entry.sys.id,
          title: entry.fields.title,
          time: entry.fields.time,
          difficulty: entry.fields.difficulty,
          image: entry.fields.image,
        },
      })) as Recipe[]; // Use type assertion to indicate the transformation result

      setData(transformedRecipes || null);
    }

    fetchData();
  }, [kind]);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <HydrationBoundary fallback="Loading...">
      <div className="flex flex-col items-center p-4 bg-gray-50 min-h-screen font-sans">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          {data.map((recipe, index) => {
            if (!recipe.fields) return null;

            const { title, time, difficulty, image } = recipe.fields;
            const imageUrl = image?.fields.file.url
              ? `https:${image.fields.file.url}?w=400&h=500&fm=webp&q=75`
              : '/images/placeholder.png';

            return (
              <Link
                href={{
                  pathname: `/recipes/${recipe.fields.id}`,
                }}
                passHref
                key={index}
              >
                <div className="flex flex-col items-start cursor-pointer">
                  <div className="relative w-full h-60 overflow-hidden rounded-2xl shadow-md">
                    <Image
                      src={imageUrl}
                      alt={image?.fields.title || 'Recipe Image'}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-300 hover:scale-105 rounded-2xl"
                    />
                  </div>
                  <div className="mt-3 text-left w-full">
                    <h3 className="text-md font-bold uppercase mb-1" style={{ color: '#3a3967' }}>
                      {title}
                    </h3>
                    <p className="text-xs mb-2 flex items-center" style={{ color: '#3a3967' }}>
                      <Image
                        src="/images/clock1.png"
                        alt="Time Icon"
                        width={14}
                        height={14}
                        className="mr-1"
                      />
                      {time}
                    </p>
                    <span
                      className={`text-xs font-medium text-white px-2 py-1 rounded-full uppercase
                      ${difficulty === 'Easy' ? 'bg-green-500' :
                        difficulty === 'Not too tricky' ? 'bg-blue-500' :
                        difficulty === 'Moderate' ? 'bg-orange-500' :
                        difficulty === 'Challenging' ? 'bg-red-500' : 'bg-gray-500'}`}
                    >
                      {difficulty}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </HydrationBoundary>
  );
}

// import Image from 'next/image';
// import Link from 'next/link';
// import { allRecipes } from '@/lib/contentful/api';
// import { HydrationBoundary } from '@/components/HydrationBoundary';

// // Typing for the recipe fields (data structure)
// type RecipeFields = {
//   id: string;
//   title: string;
//   time: string;
//   difficulty: 'Easy' | 'Not too tricky' | 'Moderate' | 'Challenging';
//   image?: {
//     fields: {
//       file: {
//         url: string;
//       };
//       title: string;
//     };
//   };
// };

// // Typing for the Recipe object containing the fields
// type Recipe = {
//   fields: RecipeFields;
// };

// // Typing for the search parameters passed to the component
// type SearchParams = { searchParams: { kind: string | null } };

// // The main Recipes component, which fetches and displays recipes
// export default async function Recipes({ searchParams }: SearchParams) {
//   // Extract kind from searchParams
//   const { kind } = searchParams;

//   // Typing for the fetched data
//   const data: Recipe[] | null = await allRecipes(kind);

//   // If no data exists, return null (or loading UI)
//   if (!data) {
//     return null;
//   }

//   return (
//     <HydrationBoundary fallback="Loading...">
//       <div className="flex flex-col items-center p-4 bg-gray-50 min-h-screen font-sans">
//         {/* Grid layout with responsiveness */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
//           {data.map((recipe, index) => {
//             // Check if recipe fields exist
//             if (!recipe.fields) {
//               return null; // Return null if no fields are present
//             }

//             const { title, time, difficulty, image } = recipe.fields;

//             // Ensure image exists, otherwise use a placeholder image
//             const imageUrl = image?.fields.file.url
//               ? `https:${image.fields.file.url}?w=400&h=500&fm=webp&q=75`
//               : '/images/placeholder.png'; // Fallback if no image URL

//             return (
//               <Link
//                 href={{
//                   pathname: `/recipes/${recipe.fields.id}`,
//                 }}
//                 passHref
//                 key={index} // Use index as key (ideally use a unique ID)
//               >
//                 <div className="flex flex-col items-start cursor-pointer">
//                   {/* Image container with overflow hidden and rounded corners */}
//                   <div className="relative w-full h-60 overflow-hidden rounded-2xl shadow-md">
//                     <Image
//                       src={imageUrl}
//                       alt={image?.fields.title || 'Recipe Image'} // Fallback alt text if no title
//                       fill
//                       style={{ objectFit: 'cover' }} // Correct handling for image fill
//                       className="transition-transform duration-300 hover:scale-105 rounded-2xl"
//                     />
//                   </div>

//                   {/* Recipe details below the image */}
//                   <div className="mt-3 text-left w-full">
//                     <h3 className="text-md font-bold uppercase mb-1" style={{ color: '#3a3967' }}>
//                       {title}
//                     </h3>
//                     <p className="text-xs mb-2 flex items-center" style={{ color: '#3a3967' }}>
//                       <Image
//                         src="/images/clock1.png"
//                         alt="Time Icon"
//                         width={14}
//                         height={14}
//                         className="mr-1"
//                       />
//                       {time}
//                     </p>
//                     {/* Display difficulty level with a dynamic background color */}
//                     <span
//                       className={`text-xs font-medium text-white px-2 py-1 rounded-full uppercase
//                       ${difficulty === 'Easy' ? 'bg-green-500' :
//                         difficulty === 'Not too tricky' ? 'bg-blue-500' :
//                         difficulty === 'Moderate' ? 'bg-orange-500' :
//                         difficulty === 'Challenging' ? 'bg-red-500' : 'bg-gray-500'}`}
//                     >
//                       {difficulty}
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//     </HydrationBoundary>
//   );
// }
