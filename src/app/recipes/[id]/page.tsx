'use client';
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Image from "next/image";
import Row from "@/components/Row";
import { useShoppingList } from "@/context/ShoppingListContext";
import { getRecipe } from "@/lib/contentful/api";
import { HydrationBoundary } from "@/components/HydrationBoundary";

type Ingredient = {
  sys: { id: string };
  fields: {
    title: string;
    image?: { fields: { file: { url: string } } };
  };
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

const getImageUrl = (image: RecipeData['image'] | Ingredient['fields']['image']): string | null => {
  if (!image?.fields?.file?.url) return null;
  return `https:${image.fields.file.url}`;
};

const findIngredientInList = (ingredientTitle: string | undefined, richText: any) => {
  if (!richText || !ingredientTitle) return null;
  const lines: string[] = [];
  const traverseNodes = (node: any) => {
    if (node.nodeType === "text") lines.push(node.value);
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
  const [clickedIngredient, setClickedIngredient] = useState<{ title: string, line: string } | null>(null);
  const { addToShoppingList } = useShoppingList();

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

  if (!recipeData) return <div className="text-center text-gray-500 dark:text-gray-300">Loading...</div>;

  const { title, ingredients = [], ingredientsList, steps, image, time, difficulty } = recipeData;

  const handleIngredientClick = (ingredient: Ingredient) => {
    if (!ingredientsList) return;
    const result = findIngredientInList(ingredient.fields?.title, ingredientsList);
    if (result) {
      setClickedIngredient(result);
      addToShoppingList({
        name: ingredient.fields?.title,
        richText: result.line,
        image: getImageUrl(ingredient.fields?.image) || "",
      });
    } else {
      setClickedIngredient({ title: ingredient.fields?.title, line: "Not found in detailed list." });
    }
  };

  return (
    <HydrationBoundary fallback="something">
      <Row>
        <div className="flex flex-col items-center p-5 w-full">
          {/* --- CARD --- */}
          <div className="w-full bg-gray-50 dark:bg-[#1a1a2e] rounded-lg shadow-lg flex flex-col mb-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300 overflow-hidden">
            
            {/* --- IMAGE & HEADER --- */}
            <div className="flex flex-col md:flex-row-reverse">
              <div className="flex-1">
                {getImageUrl(image) ? (
                  <div className="relative w-full h-80 md:h-full bg-gray-200 dark:bg-gray-800">
                    <Image
                      src={getImageUrl(image) || "/images/default-image.png"}
                      alt={title || "Recipe"}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                ) : (
                  <div className="w-full h-80 md:h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center rounded-lg">
                    <p className="text-gray-400 dark:text-gray-300">No image available</p>
                  </div>
                )}
              </div>

              {/* --- DETAILS --- */}
              <div className="flex-1 p-6">
                <h1 className="text-4xl font-extrabold text-center uppercase mb-2 text-gray-900 dark:text-gray-100">{title}</h1>

                {/* --- INFO --- */}
                <div className="flex justify-center space-x-8 text-lg mb-8 mt-4 text-gray-700 dark:text-gray-300">
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

                {/* --- INGREDIENTS --- */}
                <h2 className="text-2xl font-semibold border-b-2 border-gray-300 dark:border-gray-600 pb-2 mb-4">Ingredients</h2>
                <div className="grid grid-cols-4 gap-4">
                  {ingredients.length > 0 ? (
                    ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="relative flex flex-col items-center text-center cursor-pointer"
                        onClick={() => handleIngredientClick(ingredient)}
                      >
                        <div className="relative">
                          <Image
                            src={getImageUrl(ingredient.fields?.image) || "/images/default-image.png"}
                            alt={ingredient.fields?.title || "Ingredient"}
                            width={70}
                            height={70}
                            quality={80}
                            className="rounded-lg shadow-md"
                          />
                          <div className="absolute bottom-0 right-0 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                            <span className="text-white text-sm font-bold">+</span>
                          </div>
                        </div>
                        <p className="mt-2 text-gray-800 dark:text-gray-200">{ingredient.fields?.title}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300">No ingredients available</p>
                  )}
                </div>

                {/* --- CLICKED INGREDIENT --- */}
                {clickedIngredient && (
                  <div className="mt-4 text-center text-lg text-gray-800 dark:text-gray-200">
                    <p>
                      <strong>{clickedIngredient.title}:</strong> {clickedIngredient.line}
                    </p>
                  </div>
                )}

                {/* --- DETAILED INGREDIENTS --- */}
                <h2 className="text-2xl font-semibold border-b-2 border-gray-300 dark:border-gray-600 pb-2 mb-4">Detailed Ingredients</h2>
                <ul className="list-disc pl-5 text-lg leading-relaxed mb-5 text-gray-700 dark:text-gray-300">
                  {ingredientsList ? (
                    documentToReactComponents(ingredientsList, {
                      renderNode: {
                        [BLOCKS.LIST_ITEM]: (node, children) => (
                          <li className="text-gray-800 dark:text-gray-200">{children}</li>
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

            {/* --- PREPARATION STEPS --- */}
            <div className="p-6">
              <h2 className="text-2xl font-semibold border-b-2 border-gray-300 dark:border-gray-600 pb-2 mb-4">Preparation Steps</h2>
              <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
                {steps ? (
                  documentToReactComponents(steps, {
                    renderNode: {
                      [BLOCKS.PARAGRAPH]: (node, children) => (
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center font-semibold shadow-md">
                            <span>•</span>
                          </div>
                          <p className="flex-1">{children}</p>
                        </div>
                      ),
                      [BLOCKS.OL_LIST]: (node, children) => <ol className="list-decimal pl-6">{children}</ol>,
                      [BLOCKS.LIST_ITEM]: (node, children) => <li className="mb-1">{children}</li>,
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

