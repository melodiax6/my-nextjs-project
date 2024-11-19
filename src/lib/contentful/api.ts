// Set a variable that contains all the fields needed for articles when a fetch for

import client from "./contentfulClient";

export async function allRecipes() {
  const entry = await client.getEntries({
    content_type: "recipe"
  });

  if (!entry) {
    return null
  }

  const items = entry.items;


  return items;
}

export async function getRecipe(id: string) {
  const entry = await client.getEntry(id);

  console.log("entry ",entry)
  if (!entry) {
    return null
  }



  return entry.fields;
}
