'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { allRecipes, getAllIngredients } from '@/lib/contentful/api';
import { getIngredientAIData } from '@/lib/ai/normalize';
import type { Recipe } from '@/lib/contentful/api';

type Ingredient = {
  id: string;
  title: string;
  category?: string;
};

const CATEGORIES = [
  'Dough & Base',
  'Meat',
  'Dairy',
  'Vegetables & Fruits',
  'Herbs & Spices',
  'Sauces, Oils & Liquids',
  'Grains, Nuts & Extras',
  'Fish & Seafood',
  'Other',
] as const;

const CATEGORY_IMAGES: Record<string, string> = {
  Meat: '/images/veal.png',
  'Dough & Base': '/images/flour.png',
  Dairy: '/images/milk.png',
  'Vegetables & Fruits': '/images/tomato.png',
  'Herbs & Spices': '/images/parsley.png',
  'Sauces, Oils & Liquids': '/images/olive-oil.png',
  'Grains, Nuts & Extras': '/images/hazelnut.png',
  'Fish & Seafood': '/images/salmon.png',
  Other: '/images/placeholder.png',
};

function normalizeText(value: string): string {
  return value.toLowerCase().trim();
}

function matchesIngredient(recipeIngredientName: string, aliases: string[]): boolean {
  const normalizedRecipeIngredient = normalizeText(recipeIngredientName);

  return aliases.some((alias) => {
    const normalizedAlias = normalizeText(alias);

    return (
      normalizedRecipeIngredient === normalizedAlias ||
      normalizedRecipeIngredient.includes(normalizedAlias) ||
      normalizedAlias.includes(normalizedRecipeIngredient)
    );
  });
}

export default function CookWithWhatYouHave() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [ingredientAliases, setIngredientAliases] = useState<Record<string, string[]>>({});
  const [ingredientCache, setIngredientCache] = useState<Record<string, string[]>>({});
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [loadingIngredientId, setLoadingIngredientId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const recipesData = await allRecipes();
        const ingredientsData = await getAllIngredients();

        const mappedIngredients: Ingredient[] = (ingredientsData ?? []).map((ing: any) => ({
          id: ing.id,
          title: ing.title,
          category: CATEGORIES.includes(ing.category) ? ing.category : 'Other',
        }));

        setRecipes(recipesData ?? []);
        setIngredients(mappedIngredients);
      } catch (error) {
        console.error('Error loading cookmaster data:', error);
        setRecipes([]);
        setIngredients([]);
      }
    }

    fetchData();
  }, []);

  const toggleIngredient = async (id: string, title: string) => {
    if (selectedIngredients.includes(id)) {
      setSelectedIngredients((prev) => prev.filter((ingredientId) => ingredientId !== id));
      return;
    }

    const normalizedTitle = normalizeText(title);

    if (ingredientCache[normalizedTitle]) {
      setIngredientAliases((prev) => ({
        ...prev,
        [id]: ingredientCache[normalizedTitle],
      }));

      setSelectedIngredients((prev) => [...prev, id]);
      return;
    }

    try {
      setLoadingIngredientId(id);

      const aiData = await getIngredientAIData(title);

      const aliases = Array.from(
        new Set([
          normalizedTitle,
          ...(aiData.normalized ? [normalizeText(aiData.normalized)] : []),
          ...(aiData.alternatives ?? []).map((alt) => normalizeText(alt)),
        ])
      ).filter(Boolean);

      const finalAliases = aliases.length > 0 ? aliases : [normalizedTitle];

      setIngredientCache((prev) => ({
        ...prev,
        [normalizedTitle]: finalAliases,
      }));

      setIngredientAliases((prev) => ({
        ...prev,
        [id]: finalAliases,
      }));

      setSelectedIngredients((prev) => [...prev, id]);
    } catch (error) {
      console.error('Error fetching AI ingredient data:', error);

      const fallbackAliases = [normalizedTitle];

      setIngredientCache((prev) => ({
        ...prev,
        [normalizedTitle]: fallbackAliases,
      }));

      setIngredientAliases((prev) => ({
        ...prev,
        [id]: fallbackAliases,
      }));

      setSelectedIngredients((prev) => [...prev, id]);
    } finally {
      setLoadingIngredientId(null);
    }
  };

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) =>
      prev.includes(category)
        ? prev.filter((currentCategory) => currentCategory !== category)
        : [...prev, category]
    );
  };

  const filteredIngredients = useMemo(() => {
    const normalizedSearch = normalizeText(searchTerm);

    if (!normalizedSearch) {
      return ingredients;
    }

    return ingredients.filter((ingredient) =>
      normalizeText(ingredient.title).includes(normalizedSearch)
    );
  }, [ingredients, searchTerm]);

  const matchedRecipes = useMemo(() => {
    return recipes
      .map((recipe) => {
        const recipeIngredients = recipe.ingredients ?? [];

        const matchedCount = recipeIngredients.filter((ingredientRef) => {
          const recipeIngredientName = ingredientRef.fields?.title ?? '';

          return selectedIngredients.some((selectedId) => {
            const aliases = ingredientAliases[selectedId] || [];
            return matchesIngredient(recipeIngredientName, aliases);
          });
        }).length;

        const total = recipeIngredients.length;
        const ratio = total > 0 ? matchedCount / total : 0;

        return {
          ...recipe,
          matchedCount,
          total,
          ratio,
        };
      })
      .filter((recipe) => recipe.ratio > 0)
      .sort((a, b) => {
        if (b.ratio !== a.ratio) return b.ratio - a.ratio;
        if (b.matchedCount !== a.matchedCount) return b.matchedCount - a.matchedCount;
        return a.title.localeCompare(b.title);
      });
  }, [recipes, selectedIngredients, ingredientAliases]);

  const selectedIngredientObjects = useMemo(() => {
    return ingredients.filter((ingredient) => selectedIngredients.includes(ingredient.id));
  }, [ingredients, selectedIngredients]);

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
    <div className="min-h-screen bg-[hsl(var(--background))] p-6 font-poppins flex justify-center">
      <div className="w-full max-w-[65%]">
        <h1 className="mb-4 text-center text-4xl font-bold">Cook With What You Have</h1>

        <p className="mx-auto mb-8 max-w-3xl text-center text-sm leading-6 text-gray-500 dark:text-gray-300">
          Select the ingredients you already have and we’ll show you the best matching recipes.
          Possible ingredient substitutes are available after opening a recipe.
        </p>

        <div className="mb-8">
          <label htmlFor="ingredient-search" className="mb-2 block text-sm font-medium">
            Search ingredient
          </label>
          <input
            id="ingredient-search"
            type="text"
            placeholder="Type e.g. cream, onion, tomato..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black/20 dark:bg-neutral-900"
          />
        </div>

        {selectedIngredientObjects.length > 0 && (
          <div className="mb-10 rounded-2xl border p-5 shadow-sm bg-[hsl(var(--foreground)/0.03)]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Selected ingredients:
              </span>

              {selectedIngredientObjects.map((ingredient) => (
                <span
                  key={ingredient.id}
                  className="rounded-full bg-[hsl(var(--foreground)/0.08)] px-3 py-1 text-sm"
                >
                  {ingredient.title}
                </span>
              ))}
            </div>

            <p className="mt-3 text-sm text-gray-500 dark:text-gray-300">
              Substitute suggestions will be shown inside each recipe page.
            </p>
          </div>
        )}

        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((category) => {
            const categoryIngredients = filteredIngredients.filter(
              (ingredient) => ingredient.category === category
            );

            const isOpen =
              openCategories.includes(category) || searchTerm.trim().length > 0;

            if (categoryIngredients.length === 0 && searchTerm.trim().length > 0) {
              return null;
            }

            return (
              <div
                key={category}
                className="flex flex-col rounded-xl border p-4 shadow-md"
              >
                <div className="mb-2 flex items-center gap-3">
                  <div className="relative h-12 w-12">
                    <Image
                      src={CATEGORY_IMAGES[category] || '/images/placeholder.png'}
                      alt={category}
                      fill
                      className="rounded-md object-contain"
                      sizes="48px"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">{category}</h3>
                    <p className="text-xs text-gray-500">
                      {categoryIngredients.length} item
                      {categoryIngredients.length === 1 ? '' : 's'}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="ml-auto text-xl font-bold"
                    onClick={() => toggleCategory(category)}
                    aria-expanded={isOpen}
                    aria-label={isOpen ? `Collapse ${category}` : `Expand ${category}`}
                  >
                    {isOpen ? '−' : '+'}
                  </button>
                </div>

                {isOpen && (
                  <div className="mt-2 grid max-h-72 grid-cols-1 gap-1 overflow-y-auto pr-1">
                    {categoryIngredients.length === 0 ? (
                      <p className="px-2 py-1 text-sm text-gray-500">
                        No ingredients in this category.
                      </p>
                    ) : (
                      categoryIngredients.map((ingredient) => {
                        const isChecked = selectedIngredients.includes(ingredient.id);
                        const isLoading = loadingIngredientId === ingredient.id;

                        return (
                          <label
                            key={ingredient.id}
                            className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-[hsl(var(--foreground)/0.1)]"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              disabled={isLoading}
                              onChange={() => toggleIngredient(ingredient.id, ingredient.title)}
                            />

                            <span className="text-sm">
                              {ingredient.title}
                              {isLoading && (
                                <span className="ml-2 text-xs text-gray-500">(loading AI...)</span>
                              )}
                            </span>
                          </label>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div>
          <h2 className="mb-2 text-center text-3xl font-semibold">Recipes You Can Make</h2>
          <p className="mb-6 text-center text-sm text-gray-500 dark:text-gray-300">
            Open a recipe to see ingredient details and possible substitutes.
          </p>

          {matchedRecipes.length === 0 ? (
            <p className="text-center text-gray-500">
              Select ingredients to see matching recipes.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {matchedRecipes.map((recipe) => {
                const imageUrl = recipe.image?.fields?.file?.url
                  ? `https:${recipe.image.fields.file.url}?w=400&h=400&fm=webp&q=75`
                  : '/images/placeholder.png';

                return (
                  <Link href={`/recipes/${recipe.slug}`} key={recipe.id}>
                    <div className="flex h-full flex-col overflow-hidden rounded-2xl border shadow-md transition hover:shadow-lg">
                      <div className="relative h-48 w-full">
                        <Image
                          src={imageUrl}
                          alt={recipe.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>

                      <div className="flex flex-1 flex-col items-start p-4">
                        <h3 className="mb-1 text-lg font-semibold">{recipe.title}</h3>

                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium uppercase text-white ${difficultyColor(
                            recipe.difficulty
                          )}`}
                        >
                          {recipe.difficulty ?? 'Unknown'}
                        </span>

                        <p className="mt-2 text-sm text-gray-500">
                          Ingredients matched: {recipe.matchedCount} / {recipe.total} (
                          {(recipe.ratio * 100).toFixed(0)}%)
                        </p>

                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                          View recipe details to check possible ingredient substitutes.
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