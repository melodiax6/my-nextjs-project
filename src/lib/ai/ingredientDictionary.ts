export const INGREDIENT_NORMALIZATION_MAP: Record<string, string> = {
  tomatoes: "tomato",
  "cherry tomatoes": "tomato",
  "cherry tomato": "tomato",
  "creme fraiche": "cream",
  creams: "cream",
  yoghurts: "yoghurt",
};

export const INGREDIENT_SUBSTITUTES_MAP: Record<string, string[]> = {
  cream: ["yoghurt", "creme fraiche", "milk"],
  yoghurt: ["cream", "buttermilk"],
  butter: ["olive oil", "margarine"],
  onion: ["shallot", "leek"],
};