"use client"
import { getRandomRecipes } from '../utils/recipeData';

import dynamic from 'next/dynamic'
 
const Home = dynamic(
  () => import('./Home'),
  { ssr: false }
)

export default async function HomePage() {
  const randomRecipes = getRandomRecipes(); // Get 3 random recipes


  return <Home randomRecipes={randomRecipes} />
   
}