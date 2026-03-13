import { normalizeIngredientLocal } from './normalizeIngredientLocal';

export type IngredientAIResponse = {
  normalized: string | null;
  alternatives: string[];
};

export async function getIngredientAIData(name: string): Promise<IngredientAIResponse> {
  const local = normalizeIngredientLocal(name);

  try {
    const res = await fetch('/api/ai/normalize-ingredient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredient: local }),
    });

    if (!res.ok) {
      return {
        normalized: local,
        alternatives: [local],
      };
    }

    const data = (await res.json()) as IngredientAIResponse;

    return {
      normalized: data.normalized ?? local,
      alternatives: data.alternatives?.length ? data.alternatives : [local],
    };
  } catch {
    return {
      normalized: local,
      alternatives: [local],
    };
  }
}