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

// Helper function to get the image URL
const getImageUrl = (image: RecipeData['image'] | Ingredient['fields']['image']): string | null => {
  if (!image?.fields?.file?.url) return null;
  return `https:${image.fields.file.url}`;
};

// Function to find ingredient in the detailed list based on title
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
  const [ingredients, setIngredients] = useState<IngredientImage[] | null>(null);
  const { addToShoppingList } = useShoppingList();

  // Fetch ingredients from API
  useEffect(() => {
    async function fetchAppIngredients() {
      const ing = await getAllIngredients() as IngredientImage[];
      setIngredients(ing);
      return ing;
    }

    fetchAppIngredients();
  }, []);

  // Fetch recipe data based on the recipeId from the URL
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

  // If recipe data is not available, show a loading message
  if (!recipeData) return <div className="text-center text-gray-500 dark:text-gray-300">Loading...</div>;

  const { title, ingredientsList, steps, image, time, difficulty } = recipeData;

  // Handle click on an ingredient to add it to the shopping list
  const handleIngredientClick = (ingredient: Ingredient) => {
    if (!ingredientsList) return;
    const result = findIngredientInList(ingredient.fields?.title, ingredientsList);
    if (result) {
      addToShoppingList({
        name: ingredient.fields?.title,
        richText: result.line,
        image: getImageUrl(ingredient.fields?.image) || "",
      });
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
                {/* If image exists, display it, otherwise show a placeholder */}
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
                <h1 className="text-4xl font-playfair font-extrabold text-center uppercase mb-2 text-black">{title}</h1>

                {/* --- INFO --- */}
                <div className="flex justify-center space-x-8 text-lg mb-8 mt-4 text-black">
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
                <h2 className="text-2xl font-playfair font-semibold border-b-2 border-gray-300 dark:border-gray-600 pb-2 mb-4 text-black">Ingredients</h2>
                <div className="grid grid-cols-4 gap-4">
                  {ingredients?.length && recipeData.ingredients?.length ? (
                    ingredients
                      .filter((ingredient) =>
                        recipeData.ingredients.some(
                          (recipeIng) => recipeIng.sys.id === ingredient.id
                        )
                      )
                      .map((ingredient) => (
                        <div
                          key={ingredient.id}
                          className="relative flex flex-col items-center text-center cursor-pointer"
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
                              src={ingredient.imageUrl || "/images/default-image.png"}
                              alt={ingredient.title}
                              width={70}
                              height={70}
                              className="rounded-lg shadow-md"
                            />
                            <div className="absolute bottom-0 right-0 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                              <span className="text-white text-sm font-bold">+</span>
                            </div>
                          </div>
                          <p className="mt-2 text-black">{ingredient.title}</p>
                        </div>
                      ))
                  ) : (
                    <p>No ingredients available</p>
                  )}
                </div>

                {/* --- DETAILED INGREDIENTS --- */}
                <h2 className="text-2xl font-playfair font-semibold border-b-2 border-gray-300 dark:border-gray-600 pb-2 mb-4 text-black">Detailed Ingredients</h2>
                <ul className="list-decimal pl-5 text-lg leading-relaxed mb-5 text-black">
                  {ingredientsList ? (
                    documentToReactComponents(ingredientsList, {
                      renderNode: {
                        [BLOCKS.LIST_ITEM]: (node, children) => (
                          <li className="text-black">{children}</li>
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
              <h2 className="text-2xl font-semibold border-b-2 border-gray-300 dark:border-gray-600 pb-2 mb-4 text-black">Preparation Steps</h2>
              <div className="space-y-6 text-lg text-black">
                {steps ? (
                  documentToReactComponents(steps, {
                    renderNode: {
                      [BLOCKS.OL_LIST]: (node, children) => (
                        <ol className="list-decimal pl-6">{children}</ol>
                      ),
                      [BLOCKS.LIST_ITEM]: (node, children) => (
                        <li className="text-black mb-1">{children}</li>
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

