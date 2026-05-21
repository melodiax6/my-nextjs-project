"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [savedCount, setSavedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      setEmail(user.email ?? null);

      const { count } = await supabase
        .from("saved_recipes")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      setSavedCount(count ?? 0);
      setLoading(false);
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[hsl(var(--background))] px-4 py-12 text-[hsl(var(--foreground))]">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[2rem] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 shadow-xl">
            <p className="animate-pulse text-center text-[hsl(var(--muted-foreground))]">
              Loading dashboard...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[hsl(var(--background))] px-4 py-10 text-[hsl(var(--foreground))] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section
          className="
            mb-8 overflow-hidden rounded-[2rem]
            border border-[hsl(var(--border))]
            bg-gradient-to-br from-[hsl(var(--card))]
            via-[hsl(var(--card))]
            to-[hsl(var(--secondary))]
            p-6 shadow-2xl
            sm:p-8
          "
        >
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))] sm:text-sm">
              Your cooking space
            </p>

            <h1 className="font-playfair text-4xl font-extrabold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl">
              Welcome back
            </h1>

            {email && (
              <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))] sm:text-base">
                Signed in as{" "}
                <span className="font-medium text-[hsl(var(--foreground))]">
                  {email}
                </span>
              </p>
            )}
          </div>
        </section>

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div
            className="
              rounded-3xl border border-[hsl(var(--border))]
              bg-[hsl(var(--card))]
              p-6 shadow-xl
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-2xl
            "
          >
            <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
              Saved recipes
            </p>

            <p className="mt-4 text-5xl font-black tracking-tight text-[hsl(var(--foreground))]">
              {savedCount}
            </p>

            <Link
              href="/saved-recipes"
              className="
                mt-7 inline-flex items-center justify-center
                rounded-full bg-[hsl(var(--foreground))]
                px-5 py-2.5 text-sm font-semibold
                text-[hsl(var(--background))]
                transition hover:opacity-80
              "
            >
              View saved recipes
            </Link>
          </div>

          <div
            className="
              rounded-3xl border border-[hsl(var(--border))]
              bg-[hsl(var(--card))]
              p-6 shadow-xl
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-2xl
            "
          >
            <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
              Shopping list
            </p>

            <p className="mt-4 text-5xl font-black tracking-tight text-[hsl(var(--foreground))]">
              Ready
            </p>

            <Link
              href="/shopping-list"
              className="
                mt-7 inline-flex items-center justify-center
                rounded-full border border-[hsl(var(--border))]
                px-5 py-2.5 text-sm font-semibold
                text-[hsl(var(--foreground))]
                transition hover:bg-[hsl(var(--secondary))]
              "
            >
              Open list
            </Link>
          </div>

          <div
            className="
              rounded-3xl border border-[hsl(var(--border))]
              bg-[hsl(var(--card))]
              p-6 shadow-xl
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-2xl
              sm:col-span-2 lg:col-span-1
            "
          >
            <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
              Cook with what you have
            </p>

            <p className="mt-4 text-5xl font-black tracking-tight text-[hsl(var(--foreground))]">
              AI
            </p>

            <Link
              href="/cookmaster"
              className="
                mt-7 inline-flex items-center justify-center
                rounded-full border border-[hsl(var(--border))]
                px-5 py-2.5 text-sm font-semibold
                text-[hsl(var(--foreground))]
                transition hover:bg-[hsl(var(--secondary))]
              "
            >
              Start cooking
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}