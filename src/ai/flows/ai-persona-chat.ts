'use server';

/**
 * @fileOverview Implements the AI persona chat flow, allowing the AI to respond in a manner reflective of the chosen persona (Cute, Flirty, Supportive, Funny).
 *
 * - aiPersonaChat - A function that handles the AI persona chat process.
 * - AIPersonaChatInput - The input type for the aiPersonaChat function.
 * - AIPersonaChatOutput - The return type for the aiPersonaChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPersonaChatInputSchema = z.object({
  message: z.string().describe('The user message to respond to.'),
  persona: z
    .enum(['Cute', 'Flirty', 'Supportive', 'Funny'])
    .describe('The chosen persona for the AI.'),
  language: z
    .enum(['English', 'Hinglish'])
    .describe('The language for the AI to respond in.'),
});
export type AIPersonaChatInput = z.infer<typeof AIPersonaChatInputSchema>;

const AIPersonaChatOutputSchema = z.object({
  response: z.string().describe('The AI response, reflecting the chosen persona.'),
});
export type AIPersonaChatOutput = z.infer<typeof AIPersonaChatOutputSchema>;

export async function aiPersonaChat(input: AIPersonaChatInput): Promise<AIPersonaChatOutput> {
  return aiPersonaChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPersonaChatPrompt',
  input: {schema: AIPersonaChatInputSchema},
  output: {schema: AIPersonaChatOutputSchema},
  prompt: `You are an AI companion designed to chat with users. Your current persona is: {{{persona}}}.

Please respond in the following language: {{{language}}}.

User message: {{{message}}}

Craft a response that matches the user's message, your persona, and the requested language.`,
});

const aiPersonaChatFlow = ai.defineFlow(
  {
    name: 'aiPersonaChatFlow',
    inputSchema: AIPersonaChatInputSchema,
    outputSchema: AIPersonaChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
