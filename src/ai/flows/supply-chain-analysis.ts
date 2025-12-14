'use server';
/**
 * @fileOverview Analyzes a list of software packages and generates a manifest.
 *
 * - analyzeDependencies - A function that analyzes dependencies.
 * - AnalyzeDependenciesInput - The input type for the analyzeDependencies function.
 * - AnalyzeDependenciesOutput - The return type for the analyzeDependencies function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {z} from 'genkit';

const AnalyzeDependenciesInputSchema = z.object({
  packages: z.array(z.string()).describe('A list of software package names.'),
  goal: z
    .string()
    .describe('The overall goal of the project or application.'),
});
export type AnalyzeDependenciesInput = z.infer<
  typeof AnalyzeDependenciesInputSchema
>;

const ManifestItemSchema = z.object({
  packageName: z.string().describe('The name of the software package.'),
  description: z
    .string()
    .describe('A brief description of the package and its role.'),
});

const AnalyzeDependenciesOutputSchema = z.object({
  manifest: z
    .array(ManifestItemSchema)
    .describe(
      'A manifest of dependencies, with a description for each package.'
    ),
});
export type AnalyzeDependenciesOutput = z.infer<
  typeof AnalyzeDependenciesOutputSchema
>;

export async function analyzeDependencies(
  input: AnalyzeDependenciesInput
): Promise<AnalyzeDependenciesOutput> {
  return supplyChainAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'supplyChainAnalysisPrompt',
  input: {schema: AnalyzeDependenciesInputSchema},
  output: {schema: AnalyzeDependenciesOutputSchema},
  model: googleAI.model('gemini-1.5-flash-latest'),
  prompt: `You are a software supply chain expert. Your task is to create a manifest for a list of software packages, explaining the role of each package in the context of a given project goal.

Project Goal: {{{goal}}}

Packages:
{{#each packages}}
- {{{this}}}
{{/each}}

Generate a manifest with a description for each package, explaining its purpose and how it contributes to the project goal.
`,
});

const supplyChainAnalysisFlow = ai.defineFlow(
  {
    name: 'supplyChainAnalysisFlow',
    inputSchema: AnalyzeDependenciesInputSchema,
    outputSchema: AnalyzeDependenciesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
