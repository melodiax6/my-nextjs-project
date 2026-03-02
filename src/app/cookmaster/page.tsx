'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { allRecipes, getAllIngredients } from '@/lib/contentful/api';
import Link from 'next/link';
import type { Recipe } from '@/lib/contentful/api';

// Defining types for ingredients and categories
type Ingredient = { id: string; title: string; category?: string };

// Defining available categories for ingredients
const CATEGORIES = [
  'Dough & Base',
  'Meat',
  'Dairy',
  'Vegetables & Fruits',
  'Herbs & Spices',
  'Sauces, Oils & Liquids',
  'Grains, Nuts & Extras',
  'Fish & Seafood',
];

// Category image mapping to display icons for each category
const CATEGORY_IMAGES: Record<string, string> = {
  'Meat': '/images/veal.png',
  'Dough & Base': '/images/flour.png',
  'Dairy': '/images/milk.png',
  'Vegetables & Fruits': '/images/tomato.png',
  'Herbs & Spices': '/images/parsley.png',
  'Sauces, Oils & Liquids': '/images/olive-oil.png',
  'Grains, Nuts & Extras': '/images/hazelnut.png',
  'Fish & Seafood': '/images/salmon.png',
};

export default function CookWithWhatYouHave() {
  // States for recipes, ingredients, and selected ingredients
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  useEffect(() => {
    // Fetch recipes and ingredients from API
    async function fetchData() {
      const recipesData = await allRecipes();
      const ingredientsData = await getAllIngredients();

      // Map ingredients and set category to "Other" if undefined
      const mappedIngredients = (ingredientsData ?? []).map((ing: any) => ({
        id: ing.id,
        title: ing.title,
        category: CATEGORIES.includes(ing.category) ? ing.category : 'Other',
      }));

      setRecipes(recipesData ?? []);
      setIngredients(mappedIngredients);
    }

    fetchData();
  }, []);

  // Toggle ingredient selection (add/remove from selectedIngredients)
  const toggleIngredient = (id: string) => {
    setSelectedIngredients(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Toggle category open/close (expand/collapse)
  const toggleCategory = (cat: string) => {
    setOpenCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  // Filter and sort recipes based on selected ingredients
  const matchedRecipes = recipes
    .map(recipe => {
      const recipeIngredients = recipe.ingredients ?? [];
      const matchedCount = recipeIngredients.filter(ing =>
        selectedIngredients.includes(ing.sys.id)
      ).length;
      const total = recipeIngredients.length;
      const ratio = total > 0 ? matchedCount / total : 0;
      return { ...recipe, matchedCount, total, ratio };
    })
    .filter(r => r.ratio > 0) // Only show recipes that have matched ingredients
    .sort((a, b) => b.ratio - a.ratio); // Sort by the percentage of matched ingredients

  // Determine the color for difficulty label
  const difficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500 dark:bg-green-700';
      case 'Not too tricky':
        return 'bg-blue-500 dark:bg-blue-700';
      case 'Moderate':
        return 'bg-orange-500 dark:bg-orange-700';
      case 'Challenging':
        return 'bg-red-500 dark:bg-red-700';
      default:
        return 'bg-gray-500 dark:bg-gray-700';
    }
  };

  return (
    <div className="flex justify-center bg-[hsl(var(--background))] min-h-screen p-6 font-poppins">
      <div className="w-full max-w-[65%]">
        <h1 className="text-4xl font-bold mb-10 text-center">Cook With What You Have</h1>

        {/* CATEGORIES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {CATEGORIES.map(cat => {
            const catIngredients = ingredients.filter(ing => ing.category === cat);
            const isOpen = openCategories.includes(cat);

            return (
              <div
                key={cat}
                className="border rounded-xl shadow-md p-4 flex flex-col cursor-pointer hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 relative">
                    <Image
                      src={CATEGORY_IMAGES[cat] || '/images/placeholder.png'}
                      alt={cat}
                      fill
                      className="object-contain rounded-md"
                      sizes="48px"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">{cat}</h3>
                  <button
                    className="ml-auto font-bold text-xl"
                    onClick={() => toggleCategory(cat)}
                  >
                    {isOpen ? '−' : '+'}
                  </button>
                </div>

                {/* INGREDIENTS DROPDOWN */}
                {isOpen && (
                  <div className="mt-2 grid grid-cols-1 gap-1">
                    {catIngredients.map(ing => (
                      <label
                        key={ing.id}
                        className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md hover:bg-[hsl(var(--foreground)/0.1)] transition"
                      >
                        <input
                          type="checkbox"
                          checked={selectedIngredients.includes(ing.id)}
                          onChange={() => toggleIngredient(ing.id)}
                        />
                        <span className="text-sm">{ing.title}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* MATCHED RECIPES */}
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-center">Recipes You Can Make</h2>

          {matchedRecipes.length === 0 ? (
            <p className="text-gray-500 text-center">
              Select ingredients to see matching recipes.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedRecipes.map(recipe => {
                const imageUrl = recipe.image?.fields?.file?.url
                  ? `https:${recipe.image.fields.file.url}?w=400&h=400&fm=webp&q=75`
                  : '/images/placeholder.png';

                return (
                  <Link href={`/recipes/${recipe.slug}`} key={recipe.id}>
                    <div className="border rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition flex flex-col">
                      <div className="relative w-full h-48">
                        <Image src={imageUrl} alt={recipe.title} fill style={{ objectFit: 'cover' }} />
                      </div>
                      <div className="p-4 flex flex-col items-start">
                        <h3 className="font-semibold text-lg mb-1">{recipe.title}</h3>
                        <span
                          className={`text-xs font-medium text-white px-2 py-1 rounded-full uppercase ${difficultyColor(
                            recipe.difficulty
                          )}`}
                        >
                          {recipe.difficulty}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">
                          Ingredients matched: {recipe.matchedCount} / {recipe.total} (
                          {(recipe.ratio * 100).toFixed(0)}%)
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
