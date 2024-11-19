
'use client'
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ingredientsData } from "@/utils/ingredientsData";
import { recipesData } from "@/utils/recipeData";
import Image from "next/image";
import Row from "@/components/Row";
import { useShoppingList } from "@/context/ShoppingListContext";
import { getRecipe } from "@/lib/contentful/api";
import { HydrationBoundary } from "@/components/HydrationBoundary";

const Recipe = () => {
  const { id: recipeId } = useParams() as {id: string};
  const [recipeData, setRecipeData] = useState(null);
  const { shoppingList, addToShoppingList, removeFromShoppingList } = useShoppingList();

useEffect(() => {
async function getRecipeData() {
  const recipe = await getRecipe(recipeId)

  if (!recipe) {
    return null
  }

  return recipe

}

getRecipeData()
}, [])
  useEffect(() => {
    if (recipeId) {
      const recipe = recipesData.find((recipe) => recipe.id === parseInt(recipeId));
      if (recipe) {
        setRecipeData(recipe);
      }
    }
  }, [recipeId]);

  if (!recipeData) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  const { title, ingredients, ingredientsList, steps, image, time, difficulty } = recipeData;
  const selectedIngredients = ingredientsData.filter((ingredient) =>
    ingredients.includes(ingredient.id)
  );

  return (
    <HydrationBoundary fallback={"cos"} >
    <Row>
      <div className="flex flex-col items-center p-5 w-full">
        <div className="w-full bg-white rounded-lg shadow-lg flex flex-col mb-8 border border-gray-200">
          <div className="flex w-full flex-col md:flex-row-reverse">
            
            {/* Sekcja Obrazu */}
            <div className="flex-1">
              <Image src={image} alt="Recipe" width={500} height={500} className="w-full h-full object-cover block rounded-lg shadow-md" />
            </div>

            <div className="flex-1 p-6">
              {/* Tytuł Przepisu */}
              <h1 className="text-center text-4xl font-extrabold text-[#3a3967] mb-2 uppercase">{title}</h1>

              {/* Ikony: Czas, Trudność, Liczba Porcji */}
              <div className="flex justify-center space-x-8 text-lg text-[#3a3967] mb-8 mt-4">
                <div className="flex items-center space-x-2">
                  <Image src="/images/clock1.png" alt="Czas" width={24} height={24} />
                  <span>{time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Image src="/images/chef-hat.png" alt="Trudność" width={24} height={24} />
                  <span>Difficulty: {difficulty}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Image src="/images/cutlery.png" alt="Porcje" width={24} height={24} />
                  <span>Serves 4</span>
                </div>
              </div>

              {/* Sekcja Składników */}
              <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">Ingredients</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {selectedIngredients.map((ingredient) => (
                  <div key={ingredient.id} className="flex flex-col items-center bg-gray-100 rounded-lg p-4 shadow-sm relative">
                    <Image src={ingredient.image} alt={ingredient.name} width={60} height={60} className="rounded-full mb-2" />
                    <button
                      className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full text-gray-500 hover:bg-gray-100"
                      onClick={() => addToShoppingList(ingredient)}
                    >
                      +
                    </button>
                    <span className="text-center text-sm font-medium text-gray-700">{ingredient.name}</span>
                  </div>
                ))}
              </div>

              {/* Lista ilości składników */}
              <ul className="list-disc pl-5 text-lg text-gray-700 leading-relaxed mb-5">
                {ingredientsList.map((ingredient, index) => (
                  <li key={index} className="text-gray-800">
                    {Object.keys(ingredient)} - {Object.values(ingredient)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sekcja Kroków Przygotowania */}
          <div className="p-6">
            <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">Preparation Steps</h2>
            <div className="space-y-6 text-lg text-gray-700">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center font-semibold shadow-md">
                    {index + 1}
                  </div>
                  <p className="flex-1">{step}</p>
                </div>
              ))}
            </div>

            {/* Lista Zakupów */}
            <div className="mt-8">
              {shoppingList.length > 0 && (
                <>
                  <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">Shopping List</h2>
                  <ul className="space-y-3 text-lg text-gray-700">
                    {shoppingList.map((item) => (
                      <li key={item.id} className="flex items-center justify-between">
                        <span>{item.name}</span>
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                          onClick={() => removeFromShoppingList(item.id)}
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
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