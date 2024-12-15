

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

// Helper function to validate image URL
const getImageUrl = (image) => {
  if (!image || !image.fields || !image.fields.file || !image.fields.file.url) {
    console.warn("Invalid image data:", image);
    return null;
  }
  return `https:${image.fields.file.url}`;
};

// Helper function to search for an ingredient title in the rich text ingredient list
const findIngredientInList = (ingredientTitle, richText) => {
  if (!richText || !ingredientTitle) return null;

  const lines = [];
  const traverseNodes = (node) => {
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

const Recipe = () => {
  const params = useParams();
  const recipeId = params?.id;
  const [recipeData, setRecipeData] = useState(null);
  const [clickedIngredient, setClickedIngredient] = useState(null);
  const { addToShoppingList } = useShoppingList();

  useEffect(() => {
    if (!recipeId) return;

    async function fetchRecipeData() {
      try {
        const recipe = await getRecipe(recipeId);

        if (!recipe) {
          console.error("Recipe not found");
          return;
        }

        setRecipeData(recipe);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    }

    fetchRecipeData();
  }, [recipeId]);

  if (!recipeData) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  const { title, ingredients = [], ingredientsList, steps, image, time, difficulty } = recipeData;

  const handleIngredientClick = (ingredient) => {
    if (!ingredientsList) {
      console.error("No ingredients list available");
      return;
    }

    const result = findIngredientInList(ingredient.fields?.title, ingredientsList);

    if (result) {
      setClickedIngredient(result);
      addToShoppingList({
        id: ingredient.sys.id,
        name: ingredient.fields?.title,
        richText: result.line,
        image: getImageUrl(ingredient.fields?.image),
      });
    } else {
      setClickedIngredient({ title: ingredient.fields?.title, line: "Not found in detailed list." });
    }
  };

  return (
    <HydrationBoundary fallback={"something"}>
      <Row>
        <div className="flex flex-col items-center p-5 w-full">
          <div className="w-full bg-white rounded-lg shadow-lg flex flex-col mb-8 border border-gray-200">
            <div className="flex w-full flex-col md:flex-row-reverse">
              <div className="flex-1">
                {image && getImageUrl(image) ? (
                  <Image
                    src={getImageUrl(image)}
                    alt={title || "Recipe"}
                    width={500}
                    height={500}
                    quality={100}
                    className="w-full h-full object-cover block shadow-md"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-lg">
                    <p className="text-gray-400">No image available</p>
                  </div>
                )}
              </div>

              <div className="flex-1 p-6">
                <h1 className="text-center text-4xl font-extrabold text-[#3a3967] mb-2 uppercase">{title}</h1>

                <div className="flex justify-center space-x-8 text-lg text-[#3a3967] mb-8 mt-4">
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

                <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">Ingredients</h2>
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
            src={getImageUrl(ingredient.fields?.image)}
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
        <p className="text-gray-800 mt-2">{ingredient.fields?.title}</p>
      </div>
    ))
  ) : (
    <p>No ingredients available</p>
  )}
</div>

                {clickedIngredient && (
                  <div className="mt-4 text-center text-lg text-gray-800">
                    <p>
                      <strong>{clickedIngredient.title}:</strong> {clickedIngredient.line}
                    </p>
                  </div>
                )}

                <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">Detailed Ingredients</h2>
                <ul className="list-disc pl-5 text-lg text-gray-700 leading-relaxed mb-5">
                  {ingredientsList ? (
                    documentToReactComponents(ingredientsList, {
                      renderNode: {
                        [BLOCKS.LIST_ITEM]: (node, children) => (
                          <li className="text-gray-800">{children}</li>
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
              <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">Preparation Steps</h2>
              <div className="space-y-6 text-lg text-gray-700">
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
                      [BLOCKS.OL_LIST]: (node, children) => (
                    

                        <ol className="list-decimal pl-6">{children}</ol>
                      ),
                      [BLOCKS.LIST_ITEM]: (node, children) => (
                        <li className="mb-1">{children}</li>
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


