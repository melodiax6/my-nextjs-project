// Set a variable that contains all the fields needed for articles when a fetch for

import client from "./contentfulClient";

export async function allRecipes(kind: string | null) {


  const entry = await client.getEntries({
    content_type: "recipe",
    "fields.category": kind,

  });

  if (!entry) {
    return null
  }

  const items = entry.items;

  console.log(items)


  return items;
}

export async function getRecipe(id: string) {

  console.log("ID",id)

  const entry = await client.getEntries({
    content_type: "recipe",
    limit:1 ,
  "fields.id": id,
  });
  
  if (!entry) {
    return null
  }


  return entry.items[0].fields;
}
