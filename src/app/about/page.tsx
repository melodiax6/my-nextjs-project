"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      
      {/* HERO */}
      <section className="relative">
        <Image
          src="/images/guotie.jpg"
          alt="About Our Dumplings"
          fill
          className="object-cover opacity-75"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto py-32 px-6 lg:px-8 text-center">
          <h1 className="text-6xl font-playfair font-bold text-white drop-shadow-lg">
            About Our Journey
          </h1>

          <p className="mt-4 text-xl font-poppins text-white/90 drop-shadow">
            Discover our mission and passion for sharing culinary delights.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-16 text-center">
        <div className="max-w-5xl mx-auto mb-8">
          <h2 className="text-4xl font-playfair font-semibold">
            Our Story
          </h2>

          <p className="text-lg mt-4 font-poppins opacity-70">
            We believe that food is more than just sustenance—it&apos;s an
            experience. Our goal is to bring the joy of cooking dumplings from
            around the world to your kitchen.
          </p>

          <p className="text-lg mt-4 font-poppins opacity-70">
            Whether you&apos;re a beginner or a seasoned cook, we offer recipes,
            guides, and tips to help you master the art of dumpling-making.
          </p>

          <Link href="/contact">
            <button className="mt-6 px-6 py-3 rounded-full bg-green-500 text-white font-poppins hover:bg-green-600 transition-colors duration-300">
              Get in Touch
            </button>
          </Link>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="py-16 text-center border-t border-[hsl(var(--foreground)/0.1)]">
        <div className="max-w-7xl mx-auto mb-8 px-6">
          <h2 className="text-4xl font-playfair font-semibold">
            Our Values
          </h2>

          <p className="text-lg mt-4 font-poppins opacity-70">
            We are committed to providing accessible, delicious, and sustainable
            recipes for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto px-6">

          <div className="transition-transform duration-300 hover:scale-105 bg-yellow-100 dark:bg-yellow-200 shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-playfair font-semibold text-gray-900">
              Quality Ingredients
            </h3>
            <p className="mt-4 font-poppins text-gray-700">
              We believe in using fresh, high-quality ingredients to make the
              most flavorful and authentic dishes.
            </p>
          </div>

          <div className="transition-transform duration-300 hover:scale-105 bg-green-100 dark:bg-green-200 shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-playfair font-semibold text-gray-900">
              Cultural Heritage
            </h3>
            <p className="mt-4 font-poppins text-gray-700">
              Our recipes celebrate the culinary heritage of dumplings from
              diverse cultures around the world.
            </p>
          </div>

          <div className="transition-transform duration-300 hover:scale-105 bg-pink-100 dark:bg-pink-200 shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-playfair font-semibold text-gray-900">
              Sustainability
            </h3>
            <p className="mt-4 font-poppins text-gray-700">
              We prioritize sustainable practices and encourage the use of
              locally sourced ingredients.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center border-t border-[hsl(var(--foreground)/0.1)]">
        <div className="max-w-7xl mx-auto opacity-70 font-poppins">
          <p>© 2024 Dumplings Recipes. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
}




