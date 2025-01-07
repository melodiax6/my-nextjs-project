'use client';

import { saveIngredientsToShoppingList } from '@/utils/saveIngredientsToShoppingList';
import { StaticImageData } from 'next/image';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Ingredient {
  name: string;
  image: StaticImageData | string; // Obsługuje zarówno StaticImageData, jak i string (np. URL)
  richText: string;
}

interface ShoppingListContextType {
  shoppingList: Record<string, { value: string[]; image: StaticImageData | string }>;
  addToShoppingList: (ingredient: Ingredient) => void;
  removeFromShoppingList: (name: string) => void; // Usuwanie po nazwie, ponieważ lista jest obiektem
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

export const ShoppingListProvider = ({ children }: { children: ReactNode }) => {
  const [shoppingList, setShoppingList] = useState<Record<string, { value: string[]; image: StaticImageData | string }>>({});

  // Odczyt z Local Storage podczas pierwszego renderowania
  useEffect(() => {
    const storedList = localStorage.getItem('shoppingList');
    if (storedList) {
      setShoppingList(JSON.parse(storedList));
    }
  }, []);

  // Zapis do Local Storage przy każdej zmianie
  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  }, [shoppingList]);

  const addToShoppingList = (ingredient: Ingredient) => {

    if (shoppingList?.[ingredient.name]) {
      const newShoppingList = {
        ...shoppingList,
        [ingredient.name]: {
          value: [...shoppingList?.[ingredient.name].value, ingredient.richText],
          image: ingredient.image,
        },
      };
      setShoppingList(newShoppingList);
      return
    }
    
    const newShoppingList = {
      ...shoppingList,
      [ingredient.name]: {
        value: [ingredient.richText],
        image: ingredient.image,
      },
    };
    setShoppingList(newShoppingList);
  };

  const removeFromShoppingList = (name: string) => {
    const { [name]: _, ...remainingItems } = shoppingList; // Usuwanie składnika po nazwie
    setShoppingList(remainingItems);
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
