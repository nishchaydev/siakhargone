
/**
 * @fileoverview This file exports a singleton `ai` instance for use in Genkit flows.
 * It is initialized with the Google AI plugin.
 */

import { genkit, type GenkitOptions } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const genkitConfig: GenkitOptions = {
  plugins: [
    googleAI(),
  ],
};

export const ai = genkit(genkitConfig);
