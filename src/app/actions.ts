'use server';

import {
  getConsumptionRecommendations,
  type ConsumptionRecommendationsInput,
} from '@/ai/flows/consumption-insights-and-recommendations';
import {
  predictFutureLeaks,
  type PredictFutureLeaksInput,
} from '@/ai/flows/predict-future-leaks';

export async function getRecommendationsAction(
  input: ConsumptionRecommendationsInput
) {
  try {
    const data = await getConsumptionRecommendations(input);
    return { data, error: null };
  } catch (e: any) {
    console.error(e);
    return { data: null, error: e.message || 'Failed to get recommendations.' };
  }
}

export async function predictLeakAction(input: PredictFutureLeaksInput) {
  try {
    const data = await predictFutureLeaks(input);
    return { data, error: null };
  } catch (e: any) {
    console.error(e);
    return { data: null, error: e.message || 'Failed to predict leaks.' };
  }
}
