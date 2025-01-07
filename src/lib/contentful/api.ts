// Set a variable that contains all the fields needed for articles when a fetch for
import client from "./contentfulClient";

type Recipe = {
  fields: {
      id: string;
      title: string;
      image?: string; // Optional properties
      difficulty?: string;
      // Add more fields as needed
  };
};


export async function allRecipes(kind: string | null): Promise<Recipe[]> {
    const entry = await client.getEntries({
        content_type: "recipe",
        "fields.category": kind,
    });

    if (!entry || !entry.items) {
        return [];
    }

    // Map the raw data to match the `Recipe` type
    return entry.items.map((item: any) => ({
        fields: {
            id: item.fields.id || "", // Ensure `id` is always a string
            title: item.fields.title || "", // Ensure `title` is always a string
        },
    }));
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
