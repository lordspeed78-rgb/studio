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

const incorporatePersona = ai.defineTool({
  name: 'incorporatePersona',
  description: 'Determine if a specific aspect of the persona should be incorporated into the response.',
  inputSchema: z.object({
    aspect: z.string().describe('The specific aspect of the persona to consider.'),
    message: z.string().describe('The user message.'),
  }),
  outputSchema: z.boolean().describe('Whether or not to incorporate the aspect of the persona.'),
}, async (input) => {
  // For now, always incorporate the persona aspect.  A real implementation would use an LLM to decide.
  return true;
});

const prompt = ai.definePrompt({
  name: 'aiPersonaChatPrompt',
  input: {schema: AIPersonaChatInputSchema},
  output: {schema: AIPersonaChatOutputSchema},
  tools: [incorporatePersona],
  prompt: `You are an AI companion designed to chat with users. Your current persona is: {{{persona}}}.

Please respond in the following language: {{{language}}}.

User message: {{{message}}}

Consider the following aspects of your persona when crafting your response:

{{#if (incorporatePersona aspect="humor" message=message)}}
  - Incorporate humor and jokes into your response.
{{/if}}

{{#if (incorporatePersona aspect="flirtatiousness" message=message)}}
  - Be flirty and playful in your response.
{{/if}}

{{#if (incorporatePersona aspect="supportiveness" message=message)}}
  - Be supportive and encouraging in your response.
{{/if}}

{{#if (incorporatePersona aspect="cuteness" message=message)}}
  - Be cute and endearing in your response.
{{/if}}

Response:`, // The response will be infered to have the format specified in AIPersonaChatOutputSchema
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
