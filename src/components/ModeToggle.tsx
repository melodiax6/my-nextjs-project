"use client";

import * as React from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useThemeContext } from "@/lib/ThemeContext"; 

export function ModeToggle() {
  const { theme, setTheme } = useThemeContext(); 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer">
          {/* Ikona słońca */}
          <Image
            src="/images/sun.png"  // Ścieżka do ikony słońca
            alt="Sun Icon"
            width={40}
            height={40}
            className={`h-[2.4rem] w-[2.4rem] transition-all ${theme === "dark" ? "scale-0" : "scale-100"}`}
          />
          {/* Ikona księżyca */}
          <Image
            src="/images/crescent-moon.png"  // Ścieżka do ikony księżyca
            alt="Moon Icon"
            width={33}
            height={33}
            className={`absolute top-0 left-0 h-[2rem] w-[2rem] transition-all ${theme === "dark" ? "scale-100" : "scale-0"}`}
          />
          <span className="sr-only">Toggle theme</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

