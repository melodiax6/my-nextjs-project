// src/app/layout.tsx
import "./globals.css";
import { Playfair_Display, Poppins } from "next/font/google";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "@/lib/ThemeContext";
import { ShoppingListProvider } from "@/context/ShoppingListContext";
import { SearchProvider } from "@/context/SearchContext";

// Fonty z weight (TS wymaga)
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Dumplings App",
  description: "Recipes app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] transition-colors duration-300 font-sans">
        <ThemeProvider>
          <ShoppingListProvider>
            <SearchProvider>
              <Navbar />
              {children}
            </SearchProvider>
          </ShoppingListProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

