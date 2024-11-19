// src/context/ShoppingListContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface Ingredient {
  id: string;
  name: string;
  image: any;
}

interface ShoppingListContextType {
  shoppingList: Ingredient[];
  addToShoppingList: (ingredient: Ingredient) => void;
  removeFromShoppingList: (id: number) => void;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

export const ShoppingListProvider = ({ children }: { children: ReactNode }) => {
  const [shoppingList, setShoppingList] = useState<Ingredient[]>([]);

  const addToShoppingList = (ingredient: Ingredient) => {
    setShoppingList((prevList) => [...prevList, ingredient]);
  };

  const removeFromShoppingList = (id: number) => {
    setShoppingList((prevList) => prevList.filter(item => item.id !== id));
  };

  return (
    <ShoppingListContext.Provider value={{ shoppingList, addToShoppingList, removeFromShoppingList }}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (!context) throw new Error('useShoppingList must be used within a ShoppingListProvider');
  return context;
};

