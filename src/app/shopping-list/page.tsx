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
    setEditingNoteId(null); // Exit edit mode to close the textarea
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>, id: string) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent new line from being added
      handleNoteSubmit(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#e5e7eb] p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-[#4c2b85] mb-10">Shopping List</h1>
      <div className="bg-[#fabd3b] border-4 border-[#fabd3b] rounded-lg p-6 max-w-3xl w-full shadow-lg relative">
        
        {/* Shopping List Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#4c2b85]">Look and write the food below.</h2>
          <Image
            src="/images/shopping-bag.png" // Replace with your actual path
            alt="Person holding groceries"
            width={60}
            height={60}
            className="rounded-full"
          />
        </div>

        {/* Shopping Items List with Light Yellow Background */}
        <div className="bg-[#fffbe0] p-4 rounded-md">
          {Object.entries(shoppingList).length > 0 ? (
            Object.entries(shoppingList).map((item) => {
              const ingredients = Array.isArray(item[1].value) ? item[1].value : [item[1].value]; // Ensure it's an array
              return (
                <div key={item[0]} className="bg-white rounded-lg p-4 flex items-start gap-4 shadow-md mb-4">
                  <Image
                    src={item[1].image}
                    alt={item[0]}
                    width={50}
                    height={50}
                    className="rounded-lg shadow"
                  />
                  <div className="flex-1">
                    <span className="block text-lg font-medium text-[#4c2b85]">{item[0]}</span>
                    <ul className="list-disc pl-5">
                      {ingredients.map((ingredient, index) => (
                        <li key={index} className="text-gray-700">{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => removeFromShoppingList(item[0])}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center">Your shopping list is currently empty.</p>
          )}
        </div>
        
        {/* Decorative Illustrations */}
        <div className="absolute bottom-[-30px] left-[-30px]">
          <Image
            src="/images/dumpling.png" // Replace with your actual path
            alt="Cartoon woman"
            width={70}
            height={70}
          />
        </div>
      </div>
    </div>
  );
}



