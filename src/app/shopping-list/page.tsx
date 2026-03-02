'use client';

import { useShoppingList } from '@/context/ShoppingListContext';
import { useState } from 'react';
import Image from 'next/image';

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
        
        {/* Shopping List Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-playfair font-semibold">
            Look and write the food below.
          </h2>
        </div>

        {/* Shopping Items List */}
        <div className="bg-yellow-50 dark:bg-gray-800 p-4 rounded-md">
          {Object.entries(shoppingList).length > 0 ? (
            Object.entries(shoppingList).map(([key, item]) => {
              return (
                <div key={key} className="bg-white dark:bg-gray-900 rounded-lg p-4 flex items-start gap-4 shadow-md mb-4">
                  {/* Usunięcie obrazu, zostawiamy tylko nazwę składnika */}
                  <div className="flex-1">
                    <span className="block text-lg font-medium text-purple-900 dark:text-purple-300">{key}</span>
                    <ul className="list-disc pl-5">
                      {item.value && item.value.map((ingredient: string, index: number) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300">{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => removeFromShoppingList(key)}
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

      </div>
    </div>
  );
}




