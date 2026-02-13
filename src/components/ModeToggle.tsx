"use client";

import Image from "next/image";
import { useThemeContext } from "@/lib/ThemeContext";

export function ModeToggle() {
  const { theme, setTheme } = useThemeContext();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative w-10 h-10 cursor-pointer"
    >
      {/* SUN */}
      <Image
        src="/images/sun.png"
        alt="Light mode"
        fill
        className={`object-contain transition-all duration-200 ${
          theme === "dark" ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      />

      {/* MOON */}
      <Image
        src="/images/crescent-moon.png"
        alt="Dark mode"
        fill
        className={`object-contain transition-all duration-200 ${
          theme === "dark" ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      />
    </button>
  );
}
