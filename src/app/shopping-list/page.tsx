'use client';

import { useShoppingList } from '@/context/ShoppingListContext';
import Image from 'next/image';
import { useState } from 'react';

export default function ShoppingListPage() {
  const { shoppingList, removeFromShoppingList } = useShoppingList();
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const handleNoteChange = (id: string, note: string) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [id]: note,
    }));
  };

  const handleNoteSubmit = (id: string) => {
    setEditingNoteId(null);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>, id: string) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleNoteSubmit(id);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] p-6 flex flex-col items-center font-poppins">
      <h1 className="text-4xl font-playfair font-bold mb-10">Shopping List</h1>

      <div className="bg-yellow-400 dark:bg-yellow-600 border-4 border-yellow-400 dark:border-yellow-600 rounded-lg p-6 max-w-3xl w-full shadow-lg relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-playfair font-semibold">
            Look and write the food below.
          </h2>
          <Image
            src="/images/shopping-bag.png"
            alt="Person holding groceries"
            width={60}
            height={60}
            className="rounded-full"
          />
        </div>

        {/* Shopping Items List */}
        <div className="bg-yellow-50 dark:bg-gray-800 p-4 rounded-md">
          {Object.entries(shoppingList).length > 0 ? (
            Object.entries(shoppingList).map((item) => {
              const ingredients = Array.isArray(item[1].value) ? item[1].value : [item[1].value];
              return (
                <div key={item[0]} className="bg-white dark:bg-gray-900 rounded-lg p-4 flex items-start gap-4 shadow-md mb-4">
                  <Image
                    src={item[1].image}
                    alt={item[0]}
                    width={50}
                    height={50}
                    className="rounded-lg shadow"
                  />
                  <div className="flex-1">
                    <span className="block text-lg font-medium text-purple-900 dark:text-purple-300">{item[0]}</span>
                    <ul className="list-disc pl-5">
                      {ingredients.map((ingredient, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300">{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => removeFromShoppingList(item[0])}
                    className="bg-red-500 dark:bg-red-600 text-white p-2 rounded-full hover:bg-red-600 dark:hover:bg-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center">Your shopping list is currently empty.</p>
          )}
        </div>
        <div className="absolute bottom-[-30px] left-[-30px]">
          <Image
            src="/images/dumpling.png"
            alt="Cartoon woman"
            width={70}
            height={70}
          />
        </div>
      </div>
    </div>
  );
}




