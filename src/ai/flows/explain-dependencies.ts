// This file uses server-side code.
'use server';

/**
 * @fileOverview Explains file dependencies for a given file or directory.
 *
 * - explainDependencies - A function that explains the dependencies of a given file or directory.
 * - ExplainDependenciesInput - The input type for the explainDependencies function.
 * - ExplainDependenciesOutput - The return type for the explainDependencies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainDependenciesInputSchema = z.object({
  filePath: z.string().describe('The path to the file or directory.'),
});
export type ExplainDependenciesInput = z.infer<typeof ExplainDependenciesInputSchema>;

const ExplainDependenciesOutputSchema = z.object({
  explanation: z.string().describe('An explanation of the file dependencies.'),
  requiredFiles: z.array(z.string()).describe('A list of required files to run the specified file or directory in isolation.'),
});
export type ExplainDependenciesOutput = z.infer<typeof ExplainDependenciesOutputSchema>;

export async function explainDependencies(input: ExplainDependenciesInput): Promise<ExplainDependenciesOutput> {
  return explainDependenciesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainDependenciesPrompt',
  input: {schema: ExplainDependenciesInputSchema},
  output: {schema: ExplainDependenciesOutputSchema},
  prompt: `You are an expert software engineer tasked with explaining the dependencies of a given file or directory.

  Given the file path: {{{filePath}}},

  Explain the dependencies of this file or directory, including any required files to run it in isolation.  List the files in requiredFiles.
  `,
});

const explainDependenciesFlow = ai.defineFlow(
  {
    name: 'explainDependenciesFlow',
    inputSchema: ExplainDependenciesInputSchema,
    outputSchema: ExplainDependenciesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
