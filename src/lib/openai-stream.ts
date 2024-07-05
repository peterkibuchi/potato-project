import OpenAI from "openai";

import { env } from "~/env";

export type ChatGPTAgent = "user" | "system";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

export interface OpenAIStreamPayload {
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

export async function OpenAIStream(payload: OpenAIStreamPayload) {
  const stream = await openai.chat.completions.create({
    ...payload,
    stream: true,
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content ?? "");
  }

  return stream;
}
