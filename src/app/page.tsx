import { getRandomRecipes } from '../utils/recipeData';
import Home from './Home';

export default async function HomePage() {
  const randomRecipes = getRandomRecipes(); // Get 3 random recipes


  return <Home randomRecipes={randomRecipes} />
   
}