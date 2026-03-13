import { NextResponse } from "next/server";
import OpenAI from "openai";
import {
  INGREDIENT_SUBSTITUTES_MAP,
} from "@/lib/ai/ingredientDictionary";
import { normalizeIngredientLocal } from "@/lib/ai/normalizeIngredientLocal";
import type { IngredientAIResponse } from "@/lib/ai/types";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { ingredient?: string };
    const rawIngredient = body.ingredient?.trim();

    if (!rawIngredient) {
      return NextResponse.json<IngredientAIResponse>(
        { normalized: null, alternatives: [] },
        { status: 400 }
      );
    }

    const localNormalized = normalizeIngredientLocal(rawIngredient);
    const localAlternatives = INGREDIENT_SUBSTITUTES_MAP[localNormalized] ?? [];

    const response = await client.responses.create({
      model: "gpt-5.4",
      input: [
        {
          role: "system",
          content: `
You normalize ingredient names and suggest close cooking substitutes.

Rules:
- Return valid JSON only.
- Schema:
{
  "normalized": string,
  "alternatives": string[]
}
- normalized must be lowercase.
- alternatives must be lowercase array.
- Keep alternatives short, practical, food-only.
- Prefer 2-5 alternatives.
- If ingredient is already basic, keep it.
- Example:
Input: "creme fraiche"
Output: {"normalized":"cream","alternatives":["yoghurt","creme fraiche","milk"]}
          `.trim(),
        },
        {
          role: "user",
          content: rawIngredient,
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "ingredient_result",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              normalized: { type: "string" },
              alternatives: {
                type: "array",
                items: { type: "string" },
              },
            },
            required: ["normalized", "alternatives"],
          },
        },
      },
    });

    const parsed = JSON.parse(response.output_text) as IngredientAIResponse;

    const normalized = parsed.normalized?.trim().toLowerCase() || localNormalized;

    const mergedAlternatives = Array.from(
      new Set([
        normalized,
        ...localAlternatives.map((x) => x.toLowerCase()),
        ...(parsed.alternatives ?? []).map((x) => x.toLowerCase().trim()),
      ])
    ).filter(Boolean);

    return NextResponse.json<IngredientAIResponse>({
      normalized,
      alternatives: mergedAlternatives,
    });
  } catch (error) {
    console.error("AI normalize error:", error);

    return NextResponse.json<IngredientAIResponse>({
      normalized: null,
      alternatives: [],
    });
  }
}