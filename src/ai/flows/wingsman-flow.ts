'use server';

/**
 * @fileOverview A wingsman AI agent that provides dating advice.
 * 
 * - wingsman - A function that handles the wingsman process.
 * - WingsmanInput - The input type for the wingsman function.
 * - WingsmanOutput - The return type for the wingsman function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WingsmanInputSchema = z.object({
    style: z.enum(['pickup-line', 'flirty-reply', 'conversation-starter']).describe("The style of message to generate."),
    context: z.string().optional().describe("The last message from the other person, for context."),
});
export type WingsmanInput = z.infer<typeof WingsmanInputSchema>;

const WingsmanOutputSchema = z.object({
    suggestion: z.string().describe("The AI-generated suggestion."),
});
export type WingsmanOutput = z.infer<typeof WingsmanOutputSchema>;


export async function wingsman(input: WingsmanInput): Promise<WingsmanOutput> {
    return wingsmanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'wingsmanPrompt',
  input: {schema: WingsmanInputSchema},
  output: {schema: WingsmanOutputSchema},
  prompt: `You are Wingsman AI, an expert in crafting witty and charming messages for dating apps. Your task is to generate a message based on the user's request.

Request Style: {{{style}}}
{{#if context}}
Their last message: {{{context}}}
{{/if}}

Generate a response in the requested style. If they provided their last message, use it for context to make your reply more relevant.
`,
});

const wingsmanFlow = ai.defineFlow(
  {
    name: 'wingsmanFlow',
    inputSchema: WingsmanInputSchema,
    outputSchema: WingsmanOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
