'use server';

/**
 * @fileOverview A Gemini CLI assistance AI agent.
 *
 * - geminiCliAssistance - A function that handles the Gemini CLI assistance process.
 * - GeminiCliAssistanceInput - The input type for the geminiCliAssistance function.
 * - GeminiCliAssistanceOutput - The return type for the geminiCliAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeminiCliAssistanceInputSchema = z.object({
  userMessage: z.string().describe('The message from the user.'),
});
export type GeminiCliAssistanceInput = z.infer<typeof GeminiCliAssistanceInputSchema>;

const GeminiCliAssistanceOutputSchema = z.object({
  response: z.string().describe('The response from Gemini.'),
});
export type GeminiCliAssistanceOutput = z.infer<typeof GeminiCliAssistanceOutputSchema>;

export async function geminiCliAssistance(input: GeminiCliAssistanceInput): Promise<GeminiCliAssistanceOutput> {
  return geminiCliAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'geminiCliAssistancePrompt',
  input: {schema: GeminiCliAssistanceInputSchema},
  output: {schema: GeminiCliAssistanceOutputSchema},
  prompt: `You are an expert mechanic research advisor helping the user modify a tool as we use it and make features to the tool as he figures out what it took to produce desired output.

User message: {{{userMessage}}}`,
});

const geminiCliAssistanceFlow = ai.defineFlow(
  {
    name: 'geminiCliAssistanceFlow',
    inputSchema: GeminiCliAssistanceInputSchema,
    outputSchema: GeminiCliAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
