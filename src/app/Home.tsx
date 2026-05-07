'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DumplingsCard from "@/components/DumplingsCard";
import { allRecipes } from "@/lib/contentful/api";

export default function Home() {
  const [randomRecipes, setRandomRecipes] = useState<any[]>([]);

  useEffect(() => {
    async function fetchRandomRecipes() {
      const recipes = await allRecipes(); 

      if (!recipes || recipes.length === 0) return;

   
    
      const shuffled = recipes.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);

      const transformed = selected.map((entry: any) => ({
        id: entry.id || entry.fields?.id,
        title: entry.title || entry.fields?.title,
        time: entry.time || entry.fields?.time,
        difficulty: entry.difficulty || entry.fields?.difficulty,
        image: entry.image?.fields?.file?.url
          ? `https:${entry.image.fields.file.url}?w=400&h=500&fm=webp&q=75`
          : "/images/placeholder.png",
      }));

      setRandomRecipes(transformed);
    }

    fetchRandomRecipes();
  }, []);

  return (
    <div className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">

{/* HERO SECTION */}
<section className="relative min-h-[520px] sm:min-h-[620px] lg:min-h-[640px] overflow-hidden">
  <Image
    src="/images/option8.jpg"
    alt="Delicious Dumplings"
    fill
    priority
    className="object-cover opacity-75"
  />

  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/40 dark:block"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-36 pb-44 sm:pb-52 lg:pb-0">
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold drop-shadow-lg leading-tight text-white max-w-4xl">
      Explore the World of Dumplings
    </h1>

    <p className="mt-4 text-base sm:text-lg md:text-xl font-poppins text-white/85 max-w-3xl">
      A variety of dumplings from around the globe for you to try at home.
    </p>
  </div>

  {/* ABOUT US CARD */}
  <div
    className="
      absolute z-20
      left-4 right-4 bottom-6
      mx-auto max-w-sm

      bg-[hsl(var(--background)/0.92)]
      backdrop-blur-md
      shadow-xl
      rounded-2xl
      p-4
      border border-[hsl(var(--foreground)/0.12)]

      sm:left-auto sm:right-6 sm:bottom-8 sm:w-80 sm:p-5

      xl:top-24 xl:right-12 xl:bottom-auto
      xl:w-72 xl:h-72 xl:rounded-full
      xl:flex xl:items-center xl:justify-center xl:text-center xl:p-5
    "
  >
    <div>
      <h2 className="text-lg sm:text-xl md:text-2xl font-playfair font-semibold">
        About Us
      </h2>

      <p className="mt-2 text-sm sm:text-base font-poppins opacity-70">
        Discover traditional and modern dumpling recipes you&apos;ll love,
        with step-by-step guidance.
      </p>

      <p className="mt-2 hidden sm:block text-sm sm:text-base font-poppins opacity-70">
        We offer a variety of recipes, from sweet to savory, simple to
        sophisticated.
      </p>

      <Link href="/about">
        <button className="mt-4 px-4 py-2 text-sm sm:text-base font-poppins rounded-full border border-[hsl(var(--foreground))] hover:opacity-70 transition">
          Learn more
        </button>
      </Link>
    </div>
  </div>
</section>

      {/* CATEGORIES */}
      <section className="py-12 text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl font-playfair font-semibold">
            Recipe Categories
          </h2>

          <p className="text-base sm:text-lg md:text-lg mt-4 font-poppins opacity-70">
            Discover a wide variety of dumpling recipes, organized by categories
            to suit your tastes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DumplingsCard kind="vege" src="/images/vegeDump.jpg" title="Vegetarian Dumplings" />
          <DumplingsCard kind="meat" src="/images/meatD.png" title="Meat Dumplings" />
          <DumplingsCard kind="sweet" src="/images/sweetDump.png" title="Sweet Dumplings" />
        </div>
      </section>

      {/* DAILY INSPIRATION */}
      <section className="py-12 sm:py-16 text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <h2 className="text-2xl sm:text-3xl md:text-3xl font-playfair font-semibold">
              Daily Inspiration
            </h2>

            <Image src="/images/idea.png" alt="Inspiration Idea" width={40} height={40} />
          </div>

          <p className="text-base sm:text-lg md:text-lg mt-4 font-poppins opacity-70 max-w-3xl mx-auto">
            Start your culinary journey with these handpicked dumpling recipes
            for the day!
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-0">
          {randomRecipes.map((recipe) => (
            <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
              <div className="flex flex-col items-start cursor-pointer">
                <div className="relative w-full h-56 sm:h-60 md:h-60 overflow-hidden rounded-2xl shadow-md">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105 rounded-2xl"
                  />
                </div>

                <div className="mt-3 text-left w-full">
                  <h3 className="text-md sm:text-md md:text-md font-playfair font-bold uppercase mb-1">
                    {recipe.title}
                  </h3>

                  <p className="text-xs sm:text-sm flex items-center font-poppins opacity-70 mb-2">
                    <Image
                      src="/images/clock1.png"
                      alt="Time Icon"
                      width={14}
                      height={14}
                      className="mr-1"
                    />
                    {recipe.time}
                  </p>

                  <span
                    className={`text-xs sm:text-sm font-medium text-white px-2 py-1 rounded-full uppercase
                      ${
                        recipe.difficulty === "Easy"
                          ? "bg-green-500"
                          : recipe.difficulty === "Not too tricky"
                          ? "bg-blue-500"
                          : recipe.difficulty === "Moderate"
                          ? "bg-orange-500"
                          : recipe.difficulty === "Challenging"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }`}
                  >
                    {recipe.difficulty}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-[hsl(var(--foreground)/0.1)] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center opacity-70 font-poppins">
          <p>© 2024 Dumplings Recipes. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
}


