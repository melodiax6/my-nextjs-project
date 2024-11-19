// 'use client';

// import { useShoppingList } from '@/context/ShoppingListContext';
// import { ingredientsData } from '@/utils/ingredientsData';

// export default function Page() {
//   const { shoppingList, addToShoppingList, removeFromShoppingList } = useShoppingList();

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Hello, welcome to the About page!</h1>

//       <h2 className="text-xl font-semibold mt-6 mb-4">Available Ingredients:</h2>
//       <ul className="space-y-2">
//         {ingredientsData.map((ingredient) => (
//           <li key={ingredient.id} className="flex items-center space-x-4">
//             <span>{ingredient.name}</span>
//             <button 
//               onClick={() => addToShoppingList(ingredient)}
//               className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//             >
//               Add to Shopping List
//             </button>
//           </li>
//         ))}
//       </ul>

//       <h2 className="text-xl font-semibold mt-8 mb-4">Your Shopping List:</h2>
//       {shoppingList.length > 0 ? (
//         <table className="w-full text-left border border-gray-300 rounded-md">
//           <thead>
//             <tr className="bg-gray-100">
//               {/* <th className="p-3 border-b">Image</th> */}
//               <th className="p-3 border-b">Name</th>
//               <th className="p-3 border-b">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {shoppingList.map((item) => (
//               <tr key={item.id} className="hover:bg-gray-50">
//                 {/* <td className="p-3 border-b">
//                   <img src={item.image} alt={item.name} width={40} height={40} className="rounded" />
//                 </td> */}
//                 <td className="p-3 border-b">{item.name}</td>
//                 <td className="p-3 border-b">
//                   <button 
//                     onClick={() => removeFromShoppingList(item.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                   >
//                     Remove
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="text-gray-500">Your shopping list is currently empty.</p>
//       )}
//     </div>
//   );
// }


// C:\Users\kasia\dumplings-app\src\app\shopping-list\page.tsx

// 'use client';

// import { useShoppingList } from '@/context/ShoppingListContext';
// import Image from 'next/image';

// export default function Page() {
//   const { shoppingList, removeFromShoppingList } = useShoppingList();

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-center mb-8">Your Shopping List</h1>

//       {shoppingList.length > 0 ? (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {shoppingList.map((item) => (
//             <div key={item.id} className="bg-white rounded-lg p-4 flex flex-col items-center shadow">
//               <Image src={item.image} alt={item.name} width={50} height={50} className="rounded-full mb-2 shadow-md" />
//               <span className="text-gray-800 text-sm font-medium">{item.name}</span>
//               <button 
//                 onClick={() => removeFromShoppingList(item.id)}
//                 className="bg-red-500 text-white px-3 py-1 mt-2 rounded-full hover:bg-red-600"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500 text-center">Your shopping list is currently empty.</p>
//       )}
//     </div>
//   );
// }
// src/app/shopping-list/page.tsx
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
      <div className="bg-[#e5e7eb] border-4 border-[#fabd3b] rounded-lg p-6 max-w-3xl w-full shadow-lg relative">
        
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

        {/* Shopping Items List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shoppingList.length > 0 ? (
            shoppingList.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-4 flex items-start gap-4 shadow-md">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="rounded-lg shadow"
                />
                <div className="flex-1">
                  <span className="block text-lg font-medium text-[#4c2b85]">{item.name}</span>
                  {editingNoteId === item.id ? (
                    <textarea
                      placeholder="Write a note..."
                      value={notes[item.id] || ''}
                      onChange={(e) => handleNoteChange(item.id, e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, item.id)}
                      className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#fabd3b] text-gray-700 resize-none"
                      rows={2}
                    />
                  ) : (
                    <p
                      onClick={() => setEditingNoteId(item.id)} // Clicking text allows editing
                      className="mt-2 p-2 bg-gray-100 rounded-md cursor-pointer text-gray-700"
                    >
                      {notes[item.id] || 'Click to add a note...'}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeFromShoppingList(item.id)}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-2">Your shopping list is currently empty.</p>
          )}
        </div>
        
        {/* Decorative Illustrations */}
        <div className="absolute bottom-[-30px] left-[-30px]">
          <Image
            src="/images/dough.png" // Replace with your actual path
            alt="Cartoon woman"
            width={70}
            height={70}
          />
        </div>
      </div>
    </div>
  );
}

