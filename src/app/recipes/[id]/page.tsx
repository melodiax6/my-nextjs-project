'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Image from "next/image";
import Row from "@/components/Row";
import { useShoppingList } from "@/context/ShoppingListContext";
import { getRecipe, getAllIngredients } from "@/lib/contentful/api";
import { HydrationBoundary } from "@/components/HydrationBoundary";
import type { Recipe, Ingredient } from "@/lib/contentful/api";

const getImageUrl = (
  image?: { fields?: { file?: { url?: string } } }
): string | null => {
  if (!image?.fields?.file?.url) return null;
  return `https:${image.fields.file.url}`;
};

const findIngredientInList = (
  ingredientTitle: string,
  richText: any
) => {
  if (!richText?.content) return null;

  const lines: string[] = [];

  const traverseNodes = (node: any) => {
    if (node.nodeType === "text") {
      lines.push(node.value);
    } else if (node.content) {
      node.content.forEach(traverseNodes);
    }
  };

  richText.content.forEach(traverseNodes);

  for (const line of lines) {
    if (line.includes(ingredientTitle)) {
      return { title: ingredientTitle, line };
    }
  }

  return null;
};

const RecipePage = () => {
  const params = useParams();
  const recipeId = params?.id as string;

  const [recipeData, setRecipeData] = useState<Recipe | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [clickedIngredient, setClickedIngredient] = useState<{
    title: string;
    line: string;
  } | null>(null);

  const { addToShoppingList } = useShoppingList();

  /* ================= FETCH INGREDIENTS ================= */
  useEffect(() => {
    async function fetchIngredients() {
      const ing = await getAllIngredients();
      setIngredients(ing);
    }

    fetchIngredients();
  }, []);

  /* ================= FETCH RECIPE ================= */
  useEffect(() => {
    if (!recipeId) return;

    async function fetchRecipe() {
      const recipe = await getRecipe(recipeId);
      if (recipe) {
        setRecipeData(recipe);
      }
    }

    fetchRecipe();
  }, [recipeId]);

  if (!recipeData) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  const { title, ingredients: recipeIngredients, ingredientsList, steps, image, time, difficulty } = recipeData;

  /* ================= CLICK HANDLER ================= */
  const handleIngredientClick = (ingredient: Ingredient) => {
    if (!ingredientsList) return;

    const result = findIngredientInList(
      ingredient.title,
      ingredientsList
    );

    if (result) {
      setClickedIngredient(result);

      addToShoppingList({
        name: ingredient.title,
        richText: result.line,
        image: ingredient.imageUrl ?? "",
      });
    } else {
      setClickedIngredient({
        title: ingredient.title,
        line: "Not found in detailed list.",
      });
    }
  };

  /* ================= FILTER RECIPE INGREDIENTS ================= */
  const filteredIngredients = ingredients.filter((ingredient) =>
    recipeIngredients.some(
      (recipeIng) => recipeIng.sys.id === ingredient.id
    )
  );

  return (
    <HydrationBoundary fallback="Loading...">
      <Row>
        <div className="flex flex-col items-center p-5 w-full">
          <div className="w-full bg-gray-50 dark:bg-[#1a1a2e] rounded-lg shadow-lg flex flex-col mb-8 border border-gray-200 dark:border-gray-700 overflow-hidden">

            {/* IMAGE */}
            <div className="flex flex-col md:flex-row-reverse">
              <div className="flex-1">
                {getImageUrl(image) ? (
                  <div className="relative w-full h-80 md:h-full">
                    <Image
                      src={getImageUrl(image)!}
                      alt={title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-80 flex items-center justify-center">
                    No image available
                  </div>
                )}
              </div>

              {/* DETAILS */}
              <div className="flex-1 p-6">
                <h1 className="text-4xl font-extrabold text-center uppercase mb-4">
                  {title}
                </h1>

                <div className="flex justify-center space-x-8 text-lg mb-8">
                  <span>{time}</span>
                  <span>Difficulty: {difficulty}</span>
                </div>

                {/* INGREDIENT GRID */}
                <h2 className="text-2xl font-semibold mb-4">
                  Ingredients
                </h2>

                <div className="grid grid-cols-4 gap-4">
                  {filteredIngredients.length > 0 ? (
                    filteredIngredients.map((ingredient) => (
                      <div
                        key={ingredient.id}
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() =>
                          handleIngredientClick(ingredient)
                        }
                      >
                        <Image
                          src={
                            ingredient.imageUrl ||
                            "/images/default-image.png"
                          }
                          alt={ingredient.title}
                          width={70}
                          height={70}
                          className="rounded-lg"
                        />
                        <p className="mt-2 text-center">
                          {ingredient.title}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No ingredients available</p>
                  )}
                </div>

                {/* CLICKED INGREDIENT */}
                {clickedIngredient && (
                  <div className="mt-4 text-center">
                    <strong>{clickedIngredient.title}:</strong>{" "}
                    {clickedIngredient.line}
                  </div>
                )}

                {/* DETAILED INGREDIENTS */}
                <h2 className="text-2xl font-semibold mt-8 mb-4">
                  Detailed Ingredients
                </h2>

                {ingredientsList &&
                  documentToReactComponents(ingredientsList, {
                    renderNode: {
                      [BLOCKS.LIST_ITEM]: (_, children) => (
                        <li>{children}</li>
                      ),
                      [BLOCKS.PARAGRAPH]: (_, children) => (
                        <p>{children}</p>
                      ),
                    },
                  })}
              </div>
            </div>

            {/* STEPS */}
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Preparation Steps
              </h2>

              {steps &&
                documentToReactComponents(steps, {
                  renderNode: {
                    [BLOCKS.PARAGRAPH]: (_, children) => (
                      <p className="mb-4">{children}</p>
                    ),
                  },
                })}
            </div>
          </div>
        </div>
      </Row>
    </HydrationBoundary>
  );
};

export default RecipePage;

