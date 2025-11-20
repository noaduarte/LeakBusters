'use server';
/**
 * @fileOverview This file defines a Genkit flow for predicting future water leaks using a user-provided machine learning model.
 *
 * - predictFutureLeaks - A function that takes water consumption data and a model and predicts potential leaks.
 * - PredictFutureLeaksInput - The input type for the predictFutureLeaks function, including the database connection string and model.
 * - PredictFutureLeaksOutput - The return type for the predictFutureLeaks function, providing a leak risk assessment.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictFutureLeaksInputSchema = z.object({
  consumptionDataFile: z
    .string()
    .describe(
      'The filename of the water consumption data in the "data" directory (e.g., "dades_user1.json").'
    ),
  modelFile: z
    .string()
    .describe(
      'The filename of the trained machine learning model in the "data" directory (e.g., "model_fuites.keras").'
    ),
});
export type PredictFutureLeaksInput = z.infer<typeof PredictFutureLeaksInputSchema>;

const PredictFutureLeaksOutputSchema = z.object({
  leakRiskAssessment: z
    .string()
    .describe(
      'An assessment of the risk of future leaks based on the provided data and model.'
    ),
});
export type PredictFutureLeaksOutput = z.infer<typeof PredictFutureLeaksOutputSchema>;

export async function predictFutureLeaks(input: PredictFutureLeaksInput): Promise<PredictFutureLeaksOutput> {
  return predictFutureLeaksFlow(input);
}

const predictFutureLeaksPrompt = ai.definePrompt({
  name: 'predictFutureLeaksPrompt',
  input: {schema: PredictFutureLeaksInputSchema},
  output: {schema: PredictFutureLeaksOutputSchema},
  prompt: `You are an AI assistant designed to predict future water leaks based on water consumption data and a user-provided machine learning model.

  Analyze the water consumption data from the file '{{consumptionDataFile}}' using the model from the file '{{modelFile}}'.

  Provide a leak risk assessment based on your analysis, including the likelihood of future leaks and potential causes.
  Be brief and provide a risk percentage.
  `,
});

const predictFutureLeaksFlow = ai.defineFlow(
  {
    name: 'predictFutureLeaksFlow',
    inputSchema: PredictFutureLeaksInputSchema,
    outputSchema: PredictFutureLeaksOutputSchema,
  },
  async input => {
    // In a real application, you would load the model and data here to perform the prediction.
    // Since we can't execute the model, we'll return a mock response for demonstration.
    const mockResponse = {
      leakRiskAssessment: `Anàlisi completada. S'ha detectat un risc de fuita del 75% en els propers 3 mesos basat en patrons de consum anòmals durant les hores nocturnes. Es recomana revisar la instal·lació.`
    };
    
    // This simulates calling an AI model, but we will return our mock data.
    const {output} = await predictFutureLeaksPrompt(input);
    
    // In a real scenario, you'd process the AI output. Here we just return the mock assessment.
    return mockResponse;
  }
);
