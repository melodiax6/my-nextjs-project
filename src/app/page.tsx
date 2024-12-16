import { getRandomRecipes } from '../utils/recipeData';
import Image from 'next/image';
import dumplingsHero from '/public/images/option8.jpg';
import sweetDump from '/public/images/sweetDump.png';
import meatDump from '/public/images/meatD.png';
import ideaImage from '/public/images/idea.png'; 
import vegeDump from '/public/images/vegeDump.jpg';
import Link from 'next/link';
import DumplingsCard from '@/components/DumplingsCard';


export default async function HomePage() {
  const randomRecipes = getRandomRecipes(); // Get 3 random recipes


  return (
    <div>
     
<section className="relative bg-gray-50 dark:bg-[#2d2e55]"> {/* Add background color */}
        <Image
          src={dumplingsHero}
          alt="Delicious Dumplings"
          layout="fill"
          objectFit="cover"
          className="opacity-75"
        />
  {/* Gradient overlay in dark mode */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/0 dark:block hidden"></div>

  {/* Hero Content */}
  <div className="relative max-w-7xl mx-auto py-40 px-6 lg:px-8">
    <h1
      className="text-6xl font-bold font-serif text-[#3a3967] dark:text-gray-200 -ml-8 lg:-ml-16 drop-shadow-[2px_2px_4px_rgba(255,255,255,0.7)] dark:drop-shadow-none"
    >
      Explore the World of Dumplings
    </h1>
    <p className="mt-4 text-xl text-[#3a3967] dark:text-gray-400 -ml-8 lg:-ml-16 drop-shadow-[1px_1px_3px_rgba(255,255,255,0.6)] dark:drop-shadow-none">
      A variety of dumplings from around the globe for you to try at home.
    </p>
  </div>
        {/* About Section */}
        <div className="cursor-dumpling absolute top-20 right-12 bg-white shadow-lg rounded-full w-72 h-72 dark:bg-[#22223c] dark:text-gray-200 flex items-center justify-center text-center p-4">
  <div>
    <h2 className="text-xl font-semibold text-[#3a3967] dark:text-gray-200">
      About Our Site
    </h2>
    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
      Discover traditional and modern dumpling recipes you&apos;ll love, with step-by-step guidance for beginners and experts alike.
    </p>
    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
      We offer a variety of recipes, from sweet to savory, simple to sophisticated.
    </p>
    <button className="mt-4 px-3 py-1 text-sm rounded-full border-2 text-[#3a3967] border-[#3a3967] dark:text-gray-200 dark:border-gray-200 hover:text-[#ff8a65] hover:border-[#ff8a65] transition-colors duration-300 font-semibold">
      <Link href="/about">Learn more</Link>
    </button>
  </div>
</div>
      </section>
{/* Recipe Categories Section */}
<section className="mt-0 py-8 pb-4 bg-gray-50 dark:bg-[#2d2e55] text-center">
  <div className="max-w-7xl mx-auto mb-8">
    <h2 className="text-4xl font-semibold text-[#3a3967] dark:text-gray-200">
      Recipe Categories
    </h2>
    <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
      Discover a wide variety of dumpling recipes, organized by categories to suit your tastes.
    </p>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
    <DumplingsCard kind="vege" image={vegeDump} title="Vegetarian Dumplings"  />
    <DumplingsCard kind="meat" image={meatDump} title="Meat Dumplings"  />
    <DumplingsCard kind="sweet" image={sweetDump} title="Sweet Dumplings"  />
  </div>
</section>

{/* Daily Inspiration Section */}
<section className="mt-0 py-16 bg-gray-50 dark:bg-[#2d2e55] text-center"> 
  <div className="max-w-7xl mx-auto mb-8">
    <div className="flex items-center justify-center space-x-4">
      <h2 className="text-3xl font-semibold text-[#3a3967] dark:text-gray-200">Daily Inspiration</h2>
      <Image
        src={ideaImage}
        alt="Inspiration Idea"
        width={40}
        height={40}
      />
    </div>
    <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
      Start your culinary journey with these handpicked dumpling recipes for the day!
    </p>
  </div>

  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {randomRecipes.map((recipe) => {
      const imageUrl = recipe.image;

      return (
        <Link 
          href={`/recipes/${recipe.id}`} 
          key={recipe.id} 
          passHref
        >
          <div className="flex flex-col items-start cursor-pointer">
            
            <div className="relative w-full h-60 overflow-hidden rounded-2xl shadow-md">
              <Image
                src={imageUrl}
                alt={recipe.title}
                layout="fill"
                className="object-cover transition-transform duration-300 hover:scale-105 rounded-2xl"
              />
            </div>
            
            {/* Recipes info */}
            <div className="mt-3 text-left w-full">
              <h3 className="text-md font-bold uppercase mb-1 text-[#3a3967] dark:text-gray-200">
                {recipe.title}
              </h3>
              <p className="text-xs mb-2 flex items-center text-[#3a3967] dark:text-gray-400">
                <Image
                  src="/images/clock1.png"
                  alt="Time Icon"
                  width={14}
                  height={14}
                  className="mr-1"
                />
                {recipe.time}
              </p>
              {/* Difficulty level */}
              <span
                className={`text-xs font-medium text-white px-2 py-1 rounded-full uppercase
                  ${recipe.difficulty === 'Easy' ? 'bg-green-500' : 
                    recipe.difficulty === 'Not too tricky' ? 'bg-blue-500' : 
                    recipe.difficulty === 'Moderate' ? 'bg-orange-500' : 
                    recipe.difficulty === 'Challenging' ? 'bg-red-500' : 'bg-gray-500'}`}
              >
                {recipe.difficulty}
              </span>
            </div>
          </div>
        </Link>
      );
    })}
  </div>
</section>

      {/* Footer Section */}
      <footer className="bg-[#2d2e55] py-8">
        <div className="max-w-7xl mx-auto text-center text-gray-300">
          <p>© 2024 Dumplings Recipes. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}