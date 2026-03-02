import client from "./contentfulClient";

/* ============================= */
/* ========= TYPES ============= */
/* ============================= */

export type ContentfulIngredientRef = {
  sys: { id: string };
  fields: {
    title: string;
    image?: { fields: { file: { url: string } } };
  };
};

export type Recipe = {
  id: string;
  title: string;
  slug?: string;
  time?: string;
  difficulty?: string;
  image?: any;
  category?: string;
  ingredients: ContentfulIngredientRef[];
  ingredientsList?: any; // Rich Text
  steps?: any;           // Rich Text
};

export type Ingredient = {
  id: string;
  title: string;
  imageUrl?: string;
  category?: string;
};

/* ============================= */
/* ======== ALL RECIPES ======== */
/* ============================= */
export async function allRecipes(kind?: string): Promise<Recipe[]> {
  try {
    const response = await client.getEntries({
      content_type: "recipe",
      include: 2, // pobiera referencje
      ...(kind && { "fields.category": kind }),
    });

    if (!response?.items) return [];

    return response.items.map((item: any) => ({
 id: item.fields.id, // 👈 TWOJE PRAWDZIWE ID Z CONTENTFUL
      title: item.fields.title,
      slug: item.fields.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
      time: item.fields.time,
      difficulty: item.fields.difficulty,
      image: item.fields.image,
      category: item.fields.category,
      ingredients: item.fields.ingredients || [],
      ingredientsList: item.fields.ingredientsList || null,
      steps: item.fields.steps || null,
    }));
  } catch (error) {
    console.error("Error fetching allRecipes:", error);
    return [];
  }
}

/* ============================= */
/* ========= GET RECIPE ======== */
/* ============================= */
export async function getRecipe(id: string): Promise<Recipe | null> {
  try {
    const response = await client.getEntries({
      content_type: "recipe",
      limit: 1,
      include: 2,
      "fields.id": id,
    });

    if (!response?.items?.length) return null;

    const item: any = response.items[0];

 return {
  id: item.fields.id, 
  title: item.fields.title,
  slug: item.fields.slug,
  time: item.fields.time,
  difficulty: item.fields.difficulty,
  image: item.fields.image,
  category: item.fields.category,
  ingredients: item.fields.ingredients || [],
  ingredientsList: item.fields.ingredientsList || null,
  steps: item.fields.steps || null,
};
  } catch (error) {
    console.error(`Error fetching recipe id=${id}:`, error);
    return null;
  }
}

/* ============================= */
/* ===== ALL INGREDIENTS ======= */
/* ============================= */
export async function getAllIngredients(): Promise<Ingredient[]> {
  try {
    const response = await client.getEntries({
      content_type: "ingredient",
      limit: 1000,
    });

    if (!response?.items) return [];

    return response.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title,
      imageUrl: item.fields.image?.fields?.file?.url ? `https:${item.fields.image.fields.file.url}` : "",
      category: item.fields.category || 'Other',
    }));
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return [];
  }
}