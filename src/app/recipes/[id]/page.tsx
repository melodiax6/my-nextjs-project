"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ingredientsData } from '@/utils/ingredientsData';
import { recipesData } from '@/utils/recipeData';
import Image from "next/image";
import Row from '@/components/Row';
import { getAllRecipes } from '@/lib/contentful/api';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { useShoppingList } from '@/context/ShoppingListContext';

const Recipe = () => {
  const { id: recipeId } = useParams();
  const [recipeData, setRecipeData] = useState(null);
  const [allRecipes, setAllRecipes] = useState([]);
  const { shoppingList, addToShoppingList, removeFromShoppingList } = useShoppingList();


  
  useEffect(() => {
    async function getData() {
      const response = await getAllRecipes();
      
      setAllRecipes(response)
    }
  
    getData()

  }, [allRecipes])
  

  useEffect(() => {
    if (recipeId) {
      const recipe = recipesData.find(recipe => recipe.id === parseInt(recipeId));
      setRecipeData(recipe);
    }
  }, [recipeId]);

  if (!recipeData) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }
  const { title, ingredients, ingredientsList, steps, image, time, difficulty } = recipeData;

  

  const selectedIngredients = ingredientsData.filter((ingredient) =>
    ingredients.includes(ingredient.id)
  );

  const document = {
    nodeType: 'document',
    content: [
      {
        nodeType: 'paragraph',
        content: [
          {
            nodeType: 'text',
            value: 'Hello',
            marks: [{ type: 'bold' }],
          },
          {
            nodeType: 'text',
            value: ' world!',
            marks: [{ type: 'italic' }],
          },
        ],
      },
    ],
  };

  return (
      <Row>
{/* {
  allRecipes.map(recipe => {
    return documentToReactComponents(recipe.steps, {
      renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => {
          return  <p>{children}</p>
        }
      }
    })
  })
} */}

{/* {allRecipes.map((recipe, index) => (
  <div key={index} className="p-4 border-b border-gray-300">
    <h2 className="text-2xl font-semibold text-orange-600 mb-2">Title: {recipe.title}</h2>
    <p><strong>Ingredients:</strong> {recipe.ingredients?.join(', ')}</p> 
    <p><strong>Time:</strong> {recipe.time}</p>
    <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
  </div>
))} */}
    <div className="flex flex-col items-center p-5 w-full">
      <div className="w-full bg-white rounded-lg shadow-lg flex flex-col mb-8 border border-gray-200">
        <div className="flex w-full flex-col md:flex-row">
          <div className="flex-1 p-6">
            <h1 className="text-center text-4xl font-bold text-orange-600 mb-8">{title}</h1>
            <h2 className="my-4 text-2xl font-semibold border-b-2 border-gray-300 text-gray-800">Ingredients</h2>
            <div className="flex flex-col">
              <div className="flex flex-wrap gap-4 mb-5">
                {selectedIngredients.map((ingredient) => (
                  <div key={ingredient.id} className="flex flex-col items-center relative w-1/4 text-center mb-5 p-2">
                    <Image src={ingredient.image} alt={ingredient.name} width={50} height={50} className="rounded-full mb-2 shadow-md" />
                    <button className="absolute bottom-6 right-0 h-7 w-7 flex justify-center items-center bg-white border-2 border-gray-200 rounded-full text-orange-600 text-xl shadow-md" onClick={() => addToShoppingList(ingredient)}>+</button>
                    <p className="text-gray-700">{ingredient.name}</p>
                  </div>
                ))}
                
              </div>
              <ul className="pl-5 mb-5 list-disc text-lg text-gray-700 leading-loose">
                {ingredientsList.map((ingredient, index) => (
                  <li key={index} className="text-gray-600">{Object.keys(ingredient)} - {Object.values(ingredient)}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex-1">
            <Image src={image} alt="Recipe" width={500} height={500} className="w-full h-full object-cover block rounded-lg shadow-md" />
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between text-lg text-gray-600 mb-4">
            <div><strong>Time:</strong> {time}</div>
            <div><strong>Difficulty:</strong> {difficulty}</div>
          </div>
          <h2 className="my-4 text-2xl font-semibold border-b-2 border-gray-300 text-gray-800">Preparation Steps</h2>
          <div className="flex flex-col gap-4 text-lg text-gray-700">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start">
                <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex justify-center items-center mr-3 text-lg font-semibold shadow-md">{index + 1}</div>
                <p className="flex-1">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-5">
            {shoppingList.length !== 0 && (
              <>
                <h2 className="text-2xl text-orange-600 mb-2">Shopping List</h2>
                <ul className="text-lg text-gray-700">
                  {shoppingList.map((item) => (
                    <li key={item.id} className="mb-2 flex items-center gap-2">
                      {item.name}
                      <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700" onClick={() => removeFromShoppingList(item.id)}>Delete</button>
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
  );
};

export default Recipe;
