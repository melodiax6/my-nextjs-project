import Image from 'next/image';
import Link from 'next/link';
import { allRecipes } from '@/lib/contentful/api';
import { HydrationBoundary } from '@/components/HydrationBoundary';


type SearchParams = {searchParams: {kind: string | null}};

export default async function Recipes({ searchParams }: SearchParams) {
  const { kind } = searchParams;



  const data = await allRecipes(kind);

  console.log(data?.length)
  
  if (!data) {
    return null;
  }

  return (
    <HydrationBoundary fallback={"kos"} >
    <div className="flex flex-col items-center p-4 bg-gray-50 min-h-screen font-sans">
      
      {/* Grid ustawiony na 4 kolumny */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {data.map((recipe, index) => {
          if (!recipe.fields) {
            return null;
          }

          // Zmieniony URL obrazka, aby miał większą wysokość (wymuszenie bardziej pionowego formatu)
          const imageUrl = `https:${recipe.fields.image.fields.file.url}?w=400&h=500&fm=webp&q=75`;

          return (
            <Link
              href={{
                pathname: `/recipes/${recipe.fields.id}`
              }}
              passHref
              key={index}
            >
              <div className="flex flex-col items-start cursor-pointer">
                
                {/* Stylizowane zdjęcie z bardziej wydłużonym formatem */}
                <div className="relative w-full h-60 overflow-hidden rounded-2xl shadow-md">
                  <Image
                    src={imageUrl}
                    alt={recipe.fields.image.fields.title}
                    layout="fill"
                    className="object-cover transition-transform duration-300 hover:scale-105 rounded-2xl"
                  />
                </div>
                
                {/* Informacje o przepisie pod zdjęciem, przesunięte do lewej strony */}
                <div className="mt-3 text-left w-full">
                  <h3 className="text-md font-bold uppercase mb-1" style={{ color: '#3a3967' }}>
                    {recipe.fields.title}
                  </h3>
                  <p className="text-xs mb-2 flex items-center" style={{ color: '#3a3967' }}>
                    <Image
                      src="/images/clock1.png"
                      alt="Time Icon"
                      width={14}
                      height={14}
                      className="mr-1"
                    />
                    {recipe.fields.time}
                  </p>
                  {/* Poziom trudności */}
                  <span
                    className={`text-xs font-medium text-white px-2 py-1 rounded-full uppercase
                      ${recipe.fields.difficulty === 'Easy' ? 'bg-green-500' : 
                        recipe.fields.difficulty === 'Not too tricky' ? 'bg-blue-500' : 
                        recipe.fields.difficulty === 'Moderate' ? 'bg-orange-500' : 
                        recipe.fields.difficulty === 'Challenging' ? 'bg-red-500' : 'bg-gray-500'}`}
                  >
                    {recipe.fields.difficulty}
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
};
