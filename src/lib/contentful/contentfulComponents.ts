import  contentfulClient  from './contentfulClient';


export async function getRecipes() {
  const result = await contentfulClient.getEntries({
    content_type: 'recipe',
  });

  const recipes = result.items

  if (!recipes) {
    throw new Error(`There is no available recipes.`);
  }

  return recipes
}