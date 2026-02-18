
import client from "./contentfulClient";
export async function allRecipes(kind: string | null) {
  try {
    const entry = await client.getEntries({
      content_type: "recipe",
      ...(kind && { "fields.category": kind }),
    });

    if (!entry || !entry.items) {
      console.warn("No entries returned from Contentful for allRecipes");
      return [];
    }

    console.log("allRecipes items:", entry.items);

    return entry.items.map((item) => item.fields);
  } catch (error) {
    console.error("Error fetching allRecipes:", error);
    return [];
  }
}

export async function getRecipe(id: string) {
  try {
    const entry = await client.getEntries({
      content_type: "recipe",
      limit: 1,
      "fields.id": id,
    });

    if (!entry || !entry.items || entry.items.length === 0) {
      console.warn(`Recipe with id "${id}" not found`);
      return null;
    }

    console.log(`getRecipe id=${id} item:`, entry.items[0]);
    return entry.items[0].fields;
  } catch (error) {
    console.error(`Error fetching recipe id=${id}:`, error);
    return null;
  }
}
