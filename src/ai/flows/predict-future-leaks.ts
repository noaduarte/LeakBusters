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
  databaseConnectionString: z
    .string()
    .describe(
      'The connection string for the user\u2019s water consumption database.'
    ),
  modelDataUri: z
    .string()
    .describe(
      'The user-provided trained machine learning model, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
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

  Analyze the water consumption data from the provided database (connection string: {{{databaseConnectionString}}}) using the model (data URI: {{modelDataUri}}).

  Provide a leak risk assessment based on your analysis, including the likelihood of future leaks and potential causes.
  Be brief.
  `,
});

const predictFutureLeaksFlow = ai.defineFlow(
  {
    name: 'predictFutureLeaksFlow',
    inputSchema: PredictFutureLeaksInputSchema,
    outputSchema: PredictFutureLeaksOutputSchema,
  },
  async input => {
    const {output} = await predictFutureLeaksPrompt(input);
    return output!;
  }
);
