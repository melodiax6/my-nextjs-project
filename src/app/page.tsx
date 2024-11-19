// import Image from "next/image";
// import { getAllArticles } from "@/lib/contentful/api";

// export default async function Home() {
//   const data = await getAllArticles();

//   console.log(data[0].title)

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           Get started by editing&nbsp;
//           <code className="font-mono font-bold">src/app/page.tsx</code>
//         </p>
//         <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
//           <a
//             className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{" "}{data.map(element => element.title)}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className="dark:invert"
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
//         <Image
//           className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//       <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className="mb-3 text-2xl font-semibold">
//             Docs{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className="m-0 max-w-[30ch] text-sm opacity-50">
//             Find in-depth information about Next.js features and API.
//           </p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className="mb-3 text-2xl font-semibold">
//             Learn{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className="m-0 max-w-[30ch] text-sm opacity-50">
//             Learn about Next.js in an interactive course with&nbsp;quizzes!
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className="mb-3 text-2xl font-semibold">
//             Templates{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className="m-0 max-w-[30ch] text-sm opacity-50">
//             Explore starter templates for Next.js.
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className="mb-3 text-2xl font-semibold">
//             Deploy{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   );
// }
// pages/index.tsx
import { getRandomRecipes } from '../utils/recipeData';
import Image from 'next/image';
import dumplingsHero from '/public/images/option8.jpg';
import sweetDump from '/public/images/sweetDump.png';
import meatDump from '/public/images/meatD.png';
import ideaImage from '/public/images/idea.png'; 
import vegeDump from '/public/images/vegeDump.jpg';
import Link from 'next/link';
import { getAllRecipes } from '@/lib/contentful/api';


export default async function HomePage() {
  const randomRecipes = getRandomRecipes(); // Get 3 random recipes

  let data = [];
  try {
    data = await getAllRecipes(); // Fetch recipes data
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }

  return (
    <div>
      {/* Hero Section */}
      {/* {data && data.length > 0 ? (
        <h2>{data[0].title}</h2>
      ) : (
        <p>Loading recipes...</p> // Fallback if data is not loaded yet
      )} */}

      <section className="relative">
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
    <p
      className="mt-4 text-xl text-[#3a3967] dark:text-gray-400 -ml-8 lg:-ml-16 drop-shadow-[1px_1px_3px_rgba(255,255,255,0.6)] dark:drop-shadow-none"
    >
      A variety of dumplings from around the globe for you to try at home.
    </p>
  </div>
        {/* About Section */}
        <div className="absolute top-20 right-12 bg-white shadow-lg rounded-full w-72 h-72 dark:bg-[#22223c] dark:text-gray-200 flex items-center justify-center text-center p-4">
  <div>
    <h2 className="text-xl font-semibold text-[#3a3967] dark:text-gray-200">
      About Our Site
    </h2>
    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
      Discover traditional and modern dumpling recipes you'll love, with step-by-step guidance for beginners and experts alike.
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
<section className="mt-8 py-16 bg-gray-50 dark:bg-[#2d2e55] text-center"> {/* Reduced top margin to mt-8 */}
        <div className="max-w-7xl mx-auto mb-8">
          <h2 className="text-4xl font-semibold text-[#3a3967] dark:text-gray-200">Recipe Categories</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
            Discover a wide variety of dumpling recipes, organized by categories to suit your tastes.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          <Link href="/recipes/vegetarian">
            <div className="transform transition-transform duration-300 hover:scale-105 bg-yellow-100 shadow-md rounded-lg cursor-pointer p-4">
              <Image
                src={vegeDump}
                alt="Vegetarian Dumplings"
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold text-[#3a3967] mt-4">Vegetarian Dumplings</h3>
            </div>
          </Link>
          <Link href="/recipes/meat">
            <div className="transform transition-transform duration-300 hover:scale-105 bg-green-100 shadow-md rounded-lg cursor-pointer p-4">
              <Image
                src={meatDump}
                alt="Meat Dumplings"
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold text-[#3a3967] mt-4">Meat Dumplings</h3>
            </div>
          </Link>
          <Link href="/recipes/sweet">
            <div className="transform transition-transform duration-300 hover:scale-105 bg-pink-100 shadow-md rounded-lg cursor-pointer p-4">
              <Image
                src={sweetDump}
                alt="Sweet Dumplings"
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold text-[#3a3967] mt-4">Sweet Dumplings</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* Daily Inspiration Section */}
      <section className="mt-8 py-16 bg-gray-100 dark:bg-[#2d2e55] text-center"> {/* Reduced top margin to mt-8 */}
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {randomRecipes.map((recipe) => (
            <Link href={`/recipes/${recipe.id}`} key={recipe.id} className="transform transition-transform duration-300 hover:scale-105 bg-white dark:bg-[#22223c] shadow-md rounded-lg overflow-hidden">
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#3a3967] dark:text-gray-200">{recipe.title}</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Time: {recipe.time}</p>
                <p className="mt-1 text-gray-700 dark:text-gray-400">Difficulty: {recipe.difficulty}</p>
                <div className="flex justify-center mt-4">
                  <button className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-300">
                    View Recipe
                  </button>
                </div>
              </div>
            </Link>
          ))}
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