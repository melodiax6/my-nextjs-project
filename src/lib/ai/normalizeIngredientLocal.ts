import { INGREDIENT_NORMALIZATION_MAP } from "./ingredientDictionary";

export function normalizeIngredientLocal(name: string): string {
  const value = name.trim().toLowerCase();

  if (INGREDIENT_NORMALIZATION_MAP[value]) {
    return INGREDIENT_NORMALIZATION_MAP[value];
  }

  if (value.endsWith("es")) return value.slice(0, -2);
  if (value.endsWith("s")) return value.slice(0, -1);

  return value;
}