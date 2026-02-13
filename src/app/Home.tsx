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
      const recipes = await allRecipes(null); // pobieramy wszystkie przepisy

      if (!recipes || recipes.length === 0) return;

      // Losujemy 3 przepisy
      const shuffled = recipes.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);

      // Transformacja na format używany w Home
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
      <section className="relative">
        <Image
          src="/images/option8.jpg"
          alt="Delicious Dumplings"
          fill
          className="object-cover opacity-75"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent dark:block hidden"></div>

        <div className="relative max-w-7xl mx-auto py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold drop-shadow-lg dark:drop-shadow-none leading-tight">
            Explore the World of Dumplings
          </h1>

          <p className="mt-4 text-base sm:text-lg md:text-xl font-poppins opacity-80 max-w-3xl">
            A variety of dumplings from around the globe for you to try at home.
          </p>
        </div>

        {/* ABOUT BUBBLE */}
        <div className="absolute top-24 sm:top-20 right-4 sm:right-8 lg:top-20 lg:right-12
                        w-56 sm:w-64 md:w-72 h-56 sm:h-64 md:h-72
                        bg-[hsl(var(--background))] shadow-lg rounded-full
                        flex items-center justify-center text-center p-4 border border-[hsl(var(--foreground)/0.1)]
                        max-w-[90vw]">
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-playfair font-semibold">
              About Us
            </h2>

            <p className="mt-2 text-sm sm:text-base font-poppins opacity-70">
              Discover traditional and modern dumpling recipes you&apos;ll love,
              with step-by-step guidance for beginners and experts alike.
            </p>

            <p className="mt-2 text-sm sm:text-base font-poppins opacity-70">
              We offer a variety of recipes, from sweet to savory, simple to
              sophisticated.
            </p>

            <Link href="/about">
              <button className="mt-4 px-3 py-1 text-sm sm:text-base font-poppins rounded-full border border-[hsl(var(--foreground))] hover:opacity-70 transition">
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


