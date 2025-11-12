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
    // In a real application, you would validate the inputs here.
    // For this example, we're providing placeholder values if inputs are empty.
    const mockInput = {
        databaseConnectionString: input.databaseConnectionString || "mock-db-connection",
        modelDataUri: input.modelDataUri || "data:application/octet-stream;base64,mock-model-data",
    }
    const data = await predictFutureLeaks(mockInput);
    return { data, error: null };
  } catch (e: any) {
    console.error(e);
    return { data: null, error: e.message || 'Failed to predict leaks.' };
  }
}
