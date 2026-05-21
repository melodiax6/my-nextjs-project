"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type SaveRecipeButtonProps = {
  recipeId: string;
};

export default function SaveRecipeButton({
  recipeId,
}: SaveRecipeButtonProps) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkIfSaved = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setUserId(null);
        setSaved(false);
        setLoading(false);
        return;
      }

      setUserId(user.id);

      const { data, error } = await supabase
        .from("saved_recipes")
        .select("id")
        .eq("user_id", user.id)
        .eq("recipe_id", recipeId)
        .maybeSingle();

      if (!error && data) {
        setSaved(true);
      }

      setLoading(false);
    };

    checkIfSaved();
  }, [recipeId]);

  const handleSave = async () => {
    const supabase = createClient();

    if (!userId) {
      window.location.href = "/login";
      return;
    }

    setLoading(true);

    if (saved) {
      const { error } = await supabase
        .from("saved_recipes")
        .delete()
        .eq("user_id", userId)
        .eq("recipe_id", recipeId);

      if (!error) {
        setSaved(false);
      }
    } else {
      const { error } = await supabase.from("saved_recipes").insert({
        user_id: userId,
        recipe_id: recipeId,
      });

      if (!error) {
        setSaved(true);
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={handleSave}
        disabled={loading}
        className={`
          group relative inline-flex items-center justify-center
          overflow-hidden rounded-full
          px-6 py-3
          text-sm sm:text-base
          font-semibold tracking-wide
          shadow-xl
          transition-all duration-300
          hover:scale-[1.03]
          active:scale-[0.98]
          disabled:opacity-60

          ${
            saved
              ? `
                bg-gradient-to-r from-green-500 to-emerald-600
                text-white
                hover:from-green-600 hover:to-emerald-700
              `
              : `
                bg-gradient-to-r
                from-neutral-900 to-black
                text-white
                hover:from-neutral-800 hover:to-neutral-900

                dark:from-white dark:to-neutral-200
                dark:text-black
                dark:hover:from-neutral-100 dark:hover:to-white
              `
          }
        `}
      >
        <span className="relative z-10 flex items-center gap-2">
          {loading ? (
            <>
              <span className="animate-pulse">⏳</span>
              Loading...
            </>
          ) : saved ? (
            <>
              ✓ Saved Recipe
            </>
          ) : (
            <>
              ❤ Save Recipe
            </>
          )}
        </span>

        <div
          className="
            absolute inset-0
            opacity-0 transition-opacity duration-300
            group-hover:opacity-100
            bg-white/10
          "
        />
      </button>
    </div>
  );
}