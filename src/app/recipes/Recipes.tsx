'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { allRecipes } from '@/lib/contentful/api';
import { useSearchParams } from 'next/navigation';

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
  const params = useSearchParams();
  const kind = params?.get("kind");

  const [data, setData] = useState<Recipe[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const rawRecipes = await allRecipes(kind); // zwraca tablicę fields

      if (!rawRecipes || rawRecipes.length === 0) {
        setData([]);
        return;
      }

      const transformedRecipes: Recipe[] = rawRecipes.map((entry: any) => ({
        fields: {
          id: entry.id || entry.fields?.id || 'unknown',
          title: entry.title || entry.fields?.title || 'Untitled',
          time: entry.time || entry.fields?.time || 'N/A',
          difficulty:
            entry.difficulty ||
            entry.fields?.difficulty ||
            'Easy',
          image: entry.image || entry.fields?.image || undefined,
        },
      }));

      setData(transformedRecipes);
    }

    fetchData();
  }, [kind]);

  if (!data) {
    return <p>Loading...</p>;
  }

  if (data.length === 0) {
    return <p className="text-center mt-10 text-gray-500 dark:text-gray-400">No recipes found</p>;
  }

  return (
    <div className="flex flex-col items-center p-4 min-h-screen font-sans bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {data.map((recipe, index) => {
          if (!recipe.fields) return null;

          const { id, title, time, difficulty, image } = recipe.fields;
          const imageUrl = image?.fields?.file?.url
            ? `https:${image.fields.file.url}?w=400&h=500&fm=webp&q=75`
            : '/images/placeholder.png';

          const imageAlt = image?.fields?.title || 'Recipe Image';

          return (
            <Link href={`/recipes/${id}`} key={index}>
              <div className="flex flex-col items-start cursor-pointer">
                <div className="relative w-full h-60 overflow-hidden rounded-2xl shadow-md">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300 hover:scale-105 rounded-2xl"
                  />
                </div>
                <div className="mt-3 text-left w-full">
                  <h3 className="text-md font-bold uppercase mb-1">
                    {title}
                  </h3>

                  <p className="text-xs mb-2 flex items-center opacity-70">
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
                      ${
                        difficulty === 'Easy'
                          ? 'bg-green-500 dark:bg-green-700'
                          : difficulty === 'Not too tricky'
                          ? 'bg-blue-500 dark:bg-blue-700'
                          : difficulty === 'Moderate'
                          ? 'bg-orange-500 dark:bg-orange-700'
                          : difficulty === 'Challenging'
                          ? 'bg-red-500 dark:bg-red-700'
                          : 'bg-gray-500 dark:bg-gray-700'
                      }`}
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
  );
}



