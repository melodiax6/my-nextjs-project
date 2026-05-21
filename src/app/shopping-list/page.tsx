"use client";

import { useShoppingList } from "@/context/ShoppingListContext";
import Link from "next/link";

export default function ShoppingListPage() {
  const { shoppingList, removeFromShoppingList } = useShoppingList();

  const items = Object.entries(shoppingList);

  return (
    <main className="min-h-screen bg-[hsl(var(--background))] px-4 py-10 text-[hsl(var(--foreground))] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <section
          className="
            mb-8 rounded-[2rem]
            border border-[hsl(var(--border))]
            bg-gradient-to-br from-[hsl(var(--card))]
            via-[hsl(var(--card))]
            to-[hsl(var(--secondary))]
            p-6 shadow-2xl sm:p-8
          "
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))] sm:text-sm">
            Shopping planner
          </p>

          <h1 className="font-playfair text-4xl font-extrabold tracking-tight sm:text-5xl">
            Shopping List
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[hsl(var(--muted-foreground))] sm:text-base">
            Ingredients you add from recipes will appear here and stay saved
            when you come back.
          </p>
        </section>

        {items.length === 0 ? (
          <section
            className="
              rounded-3xl border border-dashed border-[hsl(var(--border))]
              bg-[hsl(var(--card))]
              p-8 text-center shadow-xl
            "
          >
            <h2 className="font-playfair text-2xl font-bold">
              Your shopping list is empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[hsl(var(--muted-foreground))]">
              Open a recipe and click the plus icon on ingredients to add them
              here.
            </p>

            <Link
              href="/recipes"
              className="
                mt-6 inline-flex items-center justify-center
                rounded-full bg-[hsl(var(--foreground))]
                px-6 py-3 text-sm font-semibold
                text-[hsl(var(--background))]
                transition hover:opacity-80
              "
            >
              Browse recipes
            </Link>
          </section>
        ) : (
          <section className="grid gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                {items.length} item{items.length === 1 ? "" : "s"} in your list
              </p>
            </div>

            {items.map(([name, item]) => (
              <article
                key={name}
                className="
                  rounded-3xl border border-[hsl(var(--border))]
                  bg-[hsl(var(--card))]
                  p-5 shadow-xl
                  transition-all duration-300
                  hover:-translate-y-1 hover:shadow-2xl
                "
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">
                      {name}
                    </h2>

                    {item.value?.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {item.value.map((ingredient: string, index: number) => (
                          <li
                            key={`${name}-${index}`}
                            className="
                              rounded-2xl bg-[hsl(var(--secondary))]
                              px-4 py-3 text-sm leading-6
                              text-[hsl(var(--secondary-foreground))]
                            "
                          >
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromShoppingList(name)}
                    className="
                      inline-flex items-center justify-center
                      rounded-full border border-red-400/40
                      bg-red-500 px-5 py-2.5
                      text-sm font-semibold text-white
                      transition hover:bg-red-600
                      sm:flex-shrink-0
                    "
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}



