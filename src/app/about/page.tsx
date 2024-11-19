// src/app/about/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import aboutImage from '/public/images/guotie.jpg'; // replace with your actual image path

export default function AboutPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative">
        <Image
          src={aboutImage}
          alt="About Us"
          layout="fill"
          objectFit="cover"
          className="opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/0"></div>
        <div className="relative max-w-7xl mx-auto py-32 px-6 lg:px-8 text-center">
          <h1 className="text-6xl font-bold font-serif text-[rgb(229,231,235)] dark:text-gray-200" style={{ textShadow: '2px 2px 4px #2c2b4f' }}>
            About Our Journey
          </h1>
          <p className="mt-4 text-xl text-[rgb(229,231,235)] dark:text-gray-400" style={{ textShadow: '1px 1px 3px #2c2b4f' }}>
            Discover our mission and passion for sharing culinary delights.
          </p>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-16 bg-gray-50 dark:bg-[#2d2e55] text-center">
        <div className="max-w-5xl mx-auto mb-8">
          <h2 className="text-4xl font-semibold text-[#3a3967] dark:text-gray-200">Our Story</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
            We believe that food is more than just sustenance—it’s an experience. Our goal is to bring the joy of cooking dumplings from around the world to your kitchen.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
            Whether you're a beginner or a seasoned cook, we offer recipes, guides, and tips to help you master the art of dumpling-making.
          </p>
          <Link href="/contact">
            <button className="mt-6 px-6 py-3 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-300">
              Get in Touch
            </button>
          </Link>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-white dark:bg-[#22223c] text-center">
        <div className="max-w-7xl mx-auto mb-8 px-6">
          <h2 className="text-4xl font-semibold text-[#3a3967] dark:text-gray-200">Our Values</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
            We are committed to providing accessible, delicious, and sustainable recipes for everyone.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto px-6">
          <div className="transform transition-transform duration-300 hover:scale-105 bg-yellow-100 shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-[#3a3967]">Quality Ingredients</h3>
            <p className="mt-4 text-gray-600">
              We believe in using fresh, high-quality ingredients to make the most flavorful and authentic dishes.
            </p>
          </div>
          <div className="transform transition-transform duration-300 hover:scale-105 bg-green-100 shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-[#3a3967]">Cultural Heritage</h3>
            <p className="mt-4 text-gray-600">
              Our recipes celebrate the culinary heritage of dumplings from diverse cultures around the world.
            </p>
          </div>
          <div className="transform transition-transform duration-300 hover:scale-105 bg-pink-100 shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-[#3a3967]">Sustainability</h3>
            <p className="mt-4 text-gray-600">
              We prioritize sustainable practices and encourage the use of locally sourced ingredients.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#2d2e55] py-8 text-center">
        <div className="max-w-7xl mx-auto text-gray-300">
          <p>© 2024 Dumplings Recipes. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}


