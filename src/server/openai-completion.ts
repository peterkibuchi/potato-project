import "server-only";

import OpenAI from "openai";

import { env } from "~/env";

export type ChatGPTAgent = "user" | "system";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

export interface OpenAICompletionPayload {
  model: string;
  messages: ChatGPTMessage[];
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  n: number;
}

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export async function OpenAICompletion(payload: OpenAICompletionPayload) {
  const completion = await openai.chat.completions.create({
    ...payload,
    stream: false,
  });

  return completion;
}
