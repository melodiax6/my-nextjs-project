import { Ingredient } from "@/context/ShoppingListContext";

export function saveIngredientsToShoppingList(ingredient: Ingredient): string {

  if (ingredient.name === "egg") {

    const matchedValue = ingredient.richText.match(/\d+/)

    if (!matchedValue) {
      return ""
    }
    
    return matchedValue[0]

    
  }
  return ""
}