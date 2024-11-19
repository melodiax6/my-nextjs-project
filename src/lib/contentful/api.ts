// Set a variable that contains all the fields needed for articles when a fetch for
// content is performed
const RECIPE_GRAPHQL_SCHEMA = `
  sys {
    id
  }
  title
  image {
    url
  }
  time
  difficulty
  ingredients
  ingredientsList {json}
  steps {json}
`;

async function fetchGraphQL(query: string, preview = false) {
  return fetch(
   `https://graphql.contentful.com/content/v1/spaces/eiq08qpa6mg1`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Switch the Bearer token depending on whether the fetch is supposed to retrieve live
        // Contentful content or draft content
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : "RnwFeeXLSVKzl6F5EF6joJhHd05nQPkmHxrj0IxWAyA"
        }`,
      },
      body: JSON.stringify({ query }),
      // Associate all fetches for articles with an "articles" cache tag so content can
      // be revalidated or updated from Contentful on publish
      // next: { tags: ["recipe"] },
    }
  ).then((response) => response.json());
}

function extractArticleEntries(fetchResponse: any) {
  return fetchResponse?.data?.recipeCollection?.items;
}

export async function getAllRecipes(
  // For this demo set the default limit to always return 3 articles.
  // By default this function will return published content but will provide an option to
  // return draft content for reviewing articles before they are live
  isDraftMode = false
) {
  const data = await fetchGraphQL(
    `query {
        recipeCollection {
          items {
            ${RECIPE_GRAPHQL_SCHEMA}
          }
        }
      }`,
    isDraftMode
  );
  return extractArticleEntries(data);
}
