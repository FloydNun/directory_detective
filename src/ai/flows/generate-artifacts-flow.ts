'use server';
/**
 * @fileOverview An AI flow to generate sample development artifacts.
 *
 * - generateArtifacts - A function that returns a list of sample artifacts.
 * - Artifact - The type for a single artifact.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleCloud } from '@genkit-ai/google-cloud';

const ArtifactSchema = z.object({
  id: z.string().describe('A unique identifier for the artifact, e.g., "art-001".'),
  type: z.enum(['code-snippet', 'text', 'image-prompt']).describe('The type of the artifact.'),
  content: z.string().describe('The textual content of the artifact.'),
});
export type Artifact = z.infer<typeof ArtifactSchema>;

const ArtifactListSchema = z.array(ArtifactSchema);

export async function generateArtifacts(): Promise<Artifact[]> {
  return generateArtifactsFlow();
}

const prompt = ai.definePrompt({
  name: 'generateArtifactsPrompt',
  model: googleCloud('gemini-1.5-pro-preview'),
  output: { schema: ArtifactListSchema },
  prompt: `Generate a list of 5 sample development artifacts. The list should include a mix of code snippets, text descriptions, and image generation prompts. Each artifact must have a unique ID, a type, and content.`,
});

const generateArtifactsFlow = ai.defineFlow(
  {
    name: 'generateArtifactsFlow',
    outputSchema: ArtifactListSchema,
  },
  async () => {
    const { output } = await prompt();
    return output || [];
  }
);
