'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Image from 'next/image';
import Row from '@/components/Row';
import { useShoppingList } from '@/context/ShoppingListContext';
import { getRecipe, getAllIngredients } from '@/lib/contentful/api';
import { getIngredientAIData } from '@/lib/ai/normalize';
import { HydrationBoundary } from '@/components/HydrationBoundary';

type Ingredient = {
  sys: { id: string };
  fields: {
    title: string;
    image?: { fields: { file: { url: string } } };
  };
};

type IngredientImage = {
  id: string;
  title: string;
  imageUrl: string;
};

type RecipeData = {
  title: string;
  ingredients: Ingredient[];
  ingredientsList?: any;
  steps?: any;
  image?: { fields: { file: { url: string } } };
  time: string;
  difficulty: string;
};

type IngredientSubstitutesMap = Record<
  string,
  {
    normalized: string;
    alternatives: string[];
  }
>;

const getImageUrl = (
  image: RecipeData['image'] | Ingredient['fields']['image']
): string | null => {
  if (!image?.fields?.file?.url) return null;
  return `https:${image.fields.file.url}`;
};

const normalizeText = (value: string) => value.toLowerCase().trim();

const findIngredientInList = (ingredientTitle: string | undefined, richText: any) => {
  if (!richText || !ingredientTitle) return null;

  const lines: string[] = [];

  const traverseNodes = (node: any) => {
    if (node.nodeType === 'text') lines.push(node.value);
    else if (node.content) node.content.forEach(traverseNodes);
  };

  richText.content.forEach(traverseNodes);

  for (const line of lines) {
    if (line.includes(ingredientTitle)) return { title: ingredientTitle, line };
  }

  return null;
};

const Recipe = () => {
  const params = useParams();
  const recipeId = params?.id as string;

  const [recipeData, setRecipeData] = useState<RecipeData | null>(null);
  const [ingredients, setIngredients] = useState<IngredientImage[] | null>(null);
  const [ingredientSubstitutes, setIngredientSubstitutes] = useState<IngredientSubstitutesMap>({});
  const [loadingSubstitutesFor, setLoadingSubstitutesFor] = useState<string | null>(null);
  const [missingIngredient, setMissingIngredient] = useState('');

  const { addToShoppingList } = useShoppingList();

  useEffect(() => {
    async function fetchAppIngredients() {
      try {
        const ing = (await getAllIngredients()) as IngredientImage[];
        setIngredients(ing);
      } catch (error) {
        console.error(error);
        setIngredients([]);
      }
    }

    fetchAppIngredients();
  }, []);

  useEffect(() => {
    if (!recipeId) return;

    async function fetchRecipeData() {
      try {
        const recipe = await getRecipe(recipeId);
        if (!recipe) return;

        setRecipeData(recipe as RecipeData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchRecipeData();
  }, [recipeId]);

  const recipeIngredientsWithImages = useMemo(() => {
    if (!ingredients?.length || !recipeData?.ingredients?.length) return [];

    return ingredients.filter((ingredient) =>
      recipeData.ingredients.some((recipeIng) => recipeIng.sys.id === ingredient.id)
    );
  }, [ingredients, recipeData]);

  const matchedMissingIngredients = useMemo(() => {
    if (!recipeData?.ingredients?.length) return [];

    const normalizedSearch = normalizeText(missingIngredient);

    if (!normalizedSearch) return [];

    return recipeData.ingredients.filter((ingredient) =>
      normalizeText(ingredient.fields?.title ?? '').includes(normalizedSearch)
    );
  }, [recipeData, missingIngredient]);

  useEffect(() => {
    if (!matchedMissingIngredients.length) return;

    async function fetchSubstitutesForMatchedIngredients() {
      for (const ingredient of matchedMissingIngredients) {
        const title = ingredient.fields?.title?.trim();

        if (!title || ingredientSubstitutes[title]) continue;

        try {
          setLoadingSubstitutesFor(title);

          const aiData = await getIngredientAIData(title);

          const normalized = aiData?.normalized
            ? normalizeText(aiData.normalized)
            : normalizeText(title);

          const alternatives = Array.from(
            new Set(
              (aiData?.alternatives ?? [])
                .map((alt) => alt?.trim())
                .filter(Boolean)
            )
          );

          setIngredientSubstitutes((prev) => ({
            ...prev,
            [title]: {
              normalized,
              alternatives,
            },
          }));
        } catch (error) {
          console.error(`Error fetching substitutes for ${title}:`, error);

          setIngredientSubstitutes((prev) => ({
            ...prev,
            [title]: {
              normalized: normalizeText(title),
              alternatives: [],
            },
          }));
        } finally {
          setLoadingSubstitutesFor(null);
        }
      }
    }

    fetchSubstitutesForMatchedIngredients();
  }, [matchedMissingIngredients, ingredientSubstitutes]);

  if (!recipeData) {
    return <div className="text-center text-gray-500 dark:text-gray-300">Loading...</div>;
  }

  const { title, ingredientsList, steps, image, time, difficulty } = recipeData;

  const handleIngredientClick = (ingredient: Ingredient) => {
    if (!ingredientsList) return;

    const result = findIngredientInList(ingredient.fields?.title, ingredientsList);

    if (result) {
      addToShoppingList({
        name: ingredient.fields?.title,
        richText: result.line,
        image: getImageUrl(ingredient.fields?.image) || '',
      });
    }
  };

  return (
    <HydrationBoundary fallback="something">
      <Row>
        <div className="flex w-full flex-col items-center p-5">
          <div className="mb-8 flex w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-gray-50 shadow-lg transition-colors duration-300 dark:border-gray-700 dark:bg-[#1a1a2e]">
            <div className="flex flex-col md:flex-row-reverse">
              <div className="flex-1">
                {getImageUrl(image) ? (
                  <div className="relative h-80 w-full bg-gray-200 dark:bg-gray-800 md:h-full">
                    <Image
                      src={getImageUrl(image) || '/images/default-image.png'}
                      alt={title || 'Recipe'}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                ) : (
                  <div className="flex h-80 w-full items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800 md:h-full">
                    <p className="text-gray-400 dark:text-gray-300">No image available</p>
                  </div>
                )}
              </div>

              <div className="flex-1 p-6">
                <h1 className="mb-2 text-center font-playfair text-4xl font-extrabold uppercase text-black dark:text-white">
                  {title}
                </h1>

                <div className="mt-4 mb-8 flex justify-center space-x-8 text-lg text-black dark:text-white">
                  <div className="flex items-center space-x-2">
                    <Image src="/images/clock1.png" alt="Time" width={24} height={24} />
                    <span>{time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Image src="/images/chef-hat.png" alt="Difficulty" width={24} height={24} />
                    <span>Difficulty: {difficulty}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Image src="/images/cutlery.png" alt="Servings" width={24} height={24} />
                    <span>Serves 4</span>
                  </div>
                </div>

                <h2 className="mb-4 border-b-2 border-gray-300 pb-2 font-playfair text-2xl font-semibold text-black dark:border-gray-600 dark:text-white">
                  Ingredients
                </h2>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {recipeIngredientsWithImages.length > 0 ? (
                    recipeIngredientsWithImages.map((ingredient) => (
                      <div
                        key={ingredient.id}
                        className="relative flex cursor-pointer flex-col items-center text-center"
                        onClick={() =>
                          handleIngredientClick({
                            sys: { id: ingredient.id },
                            fields: {
                              title: ingredient.title,
                              image: {
                                fields: {
                                  file: { url: ingredient.imageUrl },
                                },
                              },
                            },
                          } as any)
                        }
                      >
                        <div className="relative">
                          <Image
                            src={ingredient.imageUrl || '/images/default-image.png'}
                            alt={ingredient.title}
                            width={70}
                            height={70}
                            className="rounded-lg shadow-md"
                          />
                          <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 shadow-md">
                            <span className="text-sm font-bold text-white">+</span>
                          </div>
                        </div>
                        <p className="mt-2 text-black dark:text-white">{ingredient.title}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-black dark:text-white">No ingredients available</p>
                  )}
                </div>

                <div className="mt-8 rounded-2xl border border-gray-200 bg-white/70 p-5 shadow-sm dark:border-gray-700 dark:bg-white/5">
                  <h2 className="mb-3 text-2xl font-semibold text-black dark:text-white">
                    Missing an ingredient?
                  </h2>

                  <p className="mb-4 text-sm leading-6 text-gray-500 dark:text-gray-300">
                    Type the ingredient you do not have, and we’ll show possible substitutes only for that item.
                  </p>

                  <input
                    type="text"
                    value={missingIngredient}
                    onChange={(e) => setMissingIngredient(e.target.value)}
                    placeholder="Type e.g. cream, onion, parmesan..."
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black/20 dark:border-gray-600 dark:bg-neutral-900 dark:text-white"
                  />

                  {missingIngredient.trim().length > 0 && (
                    <div className="mt-5 space-y-4">
                      {matchedMissingIngredients.length > 0 ? (
                        matchedMissingIngredients.map((ingredient) => {
                          const title = ingredient.fields?.title ?? '';
                          const substituteData = ingredientSubstitutes[title];
                          const alternatives = substituteData?.alternatives ?? [];
                          const isLoading = loadingSubstitutesFor === title;

                          return (
                            <div
                              key={`${ingredient.sys.id}-${title}`}
                              className="rounded-xl border border-gray-200 p-4 dark:border-gray-700"
                            >
                              <p className="font-semibold text-black dark:text-white">
                                Missing: {title}
                              </p>

                              {isLoading ? (
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                                  Loading substitutes...
                                </p>
                              ) : alternatives.length > 0 ? (
                                <>
                                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                                    Possible substitutes:
                                  </p>
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {alternatives.map((alternative) => (
                                      <span
                                        key={`${title}-${alternative}`}
                                        className="rounded-full bg-[hsl(var(--foreground)/0.08)] px-3 py-1 text-sm text-black dark:text-white"
                                      >
                                        {alternative}
                                      </span>
                                    ))}
                                  </div>
                                </>
                              ) : (
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                                  No suggested substitutes available for this ingredient.
                                </p>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div className="rounded-xl border border-dashed border-gray-300 p-4 dark:border-gray-600">
                          <p className="text-sm text-gray-500 dark:text-gray-300">
                            This ingredient was not found in the current recipe. Try typing the exact ingredient name from the list above.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <h2 className="mt-8 mb-4 border-b-2 border-gray-300 pb-2 font-playfair text-2xl font-semibold text-black dark:border-gray-600 dark:text-white">
                  Detailed Ingredients
                </h2>
                <ul className="mb-5 list-decimal pl-5 text-lg leading-relaxed text-black dark:text-white">
                  {ingredientsList ? (
                    documentToReactComponents(ingredientsList, {
                      renderNode: {
                        [BLOCKS.LIST_ITEM]: (node, children) => (
                          <li className="text-black dark:text-white">{children}</li>
                        ),
                        [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
                      },
                    })
                  ) : (
                    <p>No detailed ingredients available</p>
                  )}
                </ul>
              </div>
            </div>

            <div className="p-6">
              <h2 className="mb-4 border-b-2 border-gray-300 pb-2 text-2xl font-semibold text-black dark:border-gray-600 dark:text-white">
                Preparation Steps
              </h2>
              <div className="space-y-6 text-lg text-black dark:text-white">
                {steps ? (
                  documentToReactComponents(steps, {
                    renderNode: {
                      [BLOCKS.OL_LIST]: (node, children) => (
                        <ol className="list-decimal pl-6">{children}</ol>
                      ),
                      [BLOCKS.LIST_ITEM]: (node, children) => (
                        <li className="mb-1 text-black dark:text-white">{children}</li>
                      ),
                    },
                  })
                ) : (
                  <p>No preparation steps available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Row>
    </HydrationBoundary>
  );
};

export default Recipe;

