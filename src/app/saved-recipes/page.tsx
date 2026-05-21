"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { getRecipe, Recipe } from "@/lib/contentful/api";

export default function SavedRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setRecipes([]);
        setLoading(false);
        return;
      }

      const { data: savedRecipes, error } = await supabase
        .from("saved_recipes")
        .select("recipe_id")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error || !savedRecipes) {
        console.error("Error fetching saved recipes:", error);
        setRecipes([]);
        setLoading(false);
        return;
      }

      const fullRecipes = await Promise.all(
        savedRecipes.map((item) => getRecipe(item.recipe_id))
      );

      setRecipes(fullRecipes.filter(Boolean) as Recipe[]);
      setLoading(false);
    };

    fetchSavedRecipes();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[hsl(var(--background))] px-4 py-10 text-[hsl(var(--foreground))]">
        <p className="text-center text-gray-500 dark:text-gray-300">
          Loading saved recipes...
        </p>
      </main>
    );
  }

  if (!recipes.length) {
    return (
      <main className="min-h-screen bg-[hsl(var(--background))] px-4 py-10 text-[hsl(var(--foreground))]">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 font-playfair text-4xl font-bold">
            Saved Recipes
          </h1>
          <p className="mb-6 text-gray-500 dark:text-gray-300">
            You don’t have any saved recipes yet.
          </p>
          <Link
            href="/recipes"
            className="inline-flex rounded-full bg-black px-6 py-3 font-medium text-white transition hover:opacity-80 dark:bg-white dark:text-black"
          >
            Browse recipes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[hsl(var(--background))] px-4 py-10 text-[hsl(var(--foreground))]">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center font-playfair text-4xl font-bold">
          Saved Recipes
        </h1>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {recipes.map((recipe) => {
            const imageUrl = recipe.image?.fields?.file?.url
              ? `https:${recipe.image.fields.file.url}?w=400&h=500&fm=webp&q=75`
              : "/images/placeholder.png";

            return (
              <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
                <div className="group flex cursor-pointer flex-col items-start">
                  <div className="relative h-60 w-full overflow-hidden rounded-2xl shadow-md">
                    <Image
                      src={imageUrl}
                      alt={recipe.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-3 w-full text-left">
                    <h3 className="mb-1 text-md font-bold uppercase">
                      {recipe.title}
                    </h3>

                    {recipe.time && (
                      <p className="mb-2 flex items-center text-xs opacity-70">
                        <Image
                          src="/images/clock1.png"
                          alt="Time Icon"
                          width={14}
                          height={14}
                          className="mr-1"
                        />
                        {recipe.time}
                      </p>
                    )}

                    {recipe.difficulty && (
                      <span className="rounded-full bg-pink-500 px-2 py-1 text-xs font-medium uppercase text-white">
                        {recipe.difficulty}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}