'use server';
/**
 * @fileOverview Provides personalized recommendations for reducing water consumption based on user data.
 *
 * - `getConsumptionRecommendations` - A function that analyzes water consumption data and provides personalized recommendations.
 * - `ConsumptionRecommendationsInput` - The input type for the `getConsumptionRecommendations` function.
 * - `ConsumptionRecommendationsOutput` - The return type for the `getConsumptionRecommendations` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConsumptionRecommendationsInputSchema = z.object({
  dailyConsumption: z.number().describe('The user\'s average daily water consumption in gallons.'),
  monthlyConsumption: z.number().describe('The user\'s average monthly water consumption in gallons.'),
  location: z.string().describe('The user\'s location (city, state) to provide location-specific recommendations.'),
  householdSize: z.number().describe('The number of people in the user\'s household.'),
});
export type ConsumptionRecommendationsInput = z.infer<typeof ConsumptionRecommendationsInputSchema>;

const ConsumptionRecommendationsOutputSchema = z.object({
  comparisonToAverage: z
    .string()
    .describe(
      'A comparison of the user\'s water consumption to the average consumption for their location and household size.'
    ),
  recommendations: z.array(z.string()).describe('A list of personalized recommendations for reducing water consumption.'),
});
export type ConsumptionRecommendationsOutput = z.infer<typeof ConsumptionRecommendationsOutputSchema>;

export async function getConsumptionRecommendations(
  input: ConsumptionRecommendationsInput
): Promise<ConsumptionRecommendationsOutput> {
  return consumptionRecommendationsFlow(input);
}

const consumptionRecommendationsPrompt = ai.definePrompt({
  name: 'consumptionRecommendationsPrompt',
  input: {schema: ConsumptionRecommendationsInputSchema},
  output: {schema: ConsumptionRecommendationsOutputSchema},
  prompt: `You are a water conservation expert. Analyze the user's water consumption data and provide personalized recommendations for reducing their usage.

Here is the user's data:
- Daily Consumption: {{dailyConsumption}} gallons
- Monthly Consumption: {{monthlyConsumption}} gallons
- Location: {{location}}
- Household Size: {{householdSize}} people

First, compare the user's water consumption to the average consumption for their location and household size. Provide a brief comparison.

Then, provide a list of personalized recommendations for reducing water consumption. Consider the user's location and household size when making recommendations.

Comparison to Average:

Recommendations:
`,
});

const consumptionRecommendationsFlow = ai.defineFlow(
  {
    name: 'consumptionRecommendationsFlow',
    inputSchema: ConsumptionRecommendationsInputSchema,
    outputSchema: ConsumptionRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await consumptionRecommendationsPrompt(input);
    return output!;
  }
);
