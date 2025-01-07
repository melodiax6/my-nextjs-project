// import client from "./contentfulClient";

// export async function allRecipes(kind: string | null) {
//   const entry = await client.getEntries({
//     content_type: "recipe",
//     "fields.category": kind,
//   });

//   if (!entry) {
//     return null;
//   }

//   const items = entry.items;

//   console.log(items);

//   return items;
// }

// export async function getRecipe(id: string) {
//   const entry = await client.getEntries({
//     content_type: "recipe",
//     limit: 1,
//     "fields.id": id,
//   });

//   if (!entry) {
//     return null;
//   }

//   return entry.items[0].fields;
// }

import client from "./contentfulClient";

export async function allRecipes(kind: string | null) {
  const entry = await client.getEntries({
    content_type: "recipe",
    "fields.category": kind,
  });

  if (!entry) {
    return null;
  }

  const items = entry.items;

  console.log(items);

  return items;
}

export async function getRecipe(id: string) {
  const entry = await client.getEntries({
    content_type: "recipe",
    limit: 1,
    "fields.id": id,
  });

  if (!entry) {
    return null;
  }

  return entry.items[0].fields;
}
// import client from "./contentfulClient";

// export async function allRecipes(kind: string | null) {


//   const entry = await client.getEntries({
//     content_type: "recipe",
//     "fields.category": kind,

//   });

//   if (!entry) {
//     return null
//   }

//   const items = entry.items;

//   console.log(items)


//   return items;
// }

// export async function getRecipe(id: string) {


//   const entry = await client.getEntries({
//     content_type: "recipe",
//     limit:1 ,
//   "fields.id": id,
//   });
  
//   if (!entry) {
//     return null
//   }


//   return entry.items[0].fields;
// }
