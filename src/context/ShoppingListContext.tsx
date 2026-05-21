"use client";

import { StaticImageData } from "next/image";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { createClient } from "@/lib/supabase/client";

export interface Ingredient {
  name: string;
  image: StaticImageData | string;
  richText: string;
}

type ShoppingListItem = {
  value: string[];
  image: StaticImageData | string;
};

interface ShoppingListContextType {
  shoppingList: Record<string, ShoppingListItem>;
  addToShoppingList: (ingredient: Ingredient) => void;
  removeFromShoppingList: (name: string) => void;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(
  undefined
);

export const ShoppingListProvider = ({ children }: { children: ReactNode }) => {
  const [shoppingList, setShoppingList] = useState<Record<string, ShoppingListItem>>(
    {}
  );
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const loadShoppingList = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        const storedList = localStorage.getItem("shoppingList");

        if (storedList) {
          setShoppingList(JSON.parse(storedList));
        }

        return;
      }

      setUserId(user.id);

      const { data, error } = await supabase
        .from("shopping_list_items")
        .select("name, rich_text, image")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error loading shopping list:", error);
        return;
      }

      const groupedList: Record<string, ShoppingListItem> = {};

      data?.forEach((item) => {
        if (!groupedList[item.name]) {
          groupedList[item.name] = {
            value: [],
            image: item.image || "",
          };
        }

        groupedList[item.name].value.push(item.rich_text || "");
      });

      setShoppingList(groupedList);
    };

    loadShoppingList();
  }, []);

  useEffect(() => {
    if (!userId) {
      localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    }
  }, [shoppingList, userId]);

  const addToShoppingList = async (ingredient: Ingredient) => {
    const imageValue =
      typeof ingredient.image === "string" ? ingredient.image : "";

    setShoppingList((prev) => {
      if (prev?.[ingredient.name]) {
        return {
          ...prev,
          [ingredient.name]: {
            value: [...prev[ingredient.name].value, ingredient.richText],
            image: ingredient.image,
          },
        };
      }

      return {
        ...prev,
        [ingredient.name]: {
          value: [ingredient.richText],
          image: ingredient.image,
        },
      };
    });

    if (userId) {
      const supabase = createClient();

      const { error } = await supabase.from("shopping_list_items").insert({
        user_id: userId,
        name: ingredient.name,
        rich_text: ingredient.richText,
        image: imageValue,
      });

      if (error) {
        console.error("Error saving shopping list item:", error);
      }
    }
  };

  const removeFromShoppingList = async (name: string) => {
    setShoppingList((prev) => {
      const { [name]: _, ...remainingItems } = prev;
      return remainingItems;
    });

    if (userId) {
      const supabase = createClient();

      const { error } = await supabase
        .from("shopping_list_items")
        .delete()
        .eq("user_id", userId)
        .eq("name", name);

      if (error) {
        console.error("Error removing shopping list item:", error);
      }
    }
  };

  return (
    <ShoppingListContext.Provider
      value={{ shoppingList, addToShoppingList, removeFromShoppingList }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);

  if (!context) {
    throw new Error("useShoppingList must be used within a ShoppingListProvider");
  }

  return context;
};
