"use server";

import { chatbotPrompt } from "~/context/chatbot-prompt";
import {
  OpenAIStream,
  type ChatGPTMessage,
  type OpenAIStreamPayload,
} from "~/lib/openai-stream";
import { type Message } from "~/lib/validators/message";

export const getQueryResponse = async (messages: Message[]) => {
  const outboundMessages: ChatGPTMessage[] = messages.map((message) => {
    return {
      role: message.isUserMessage ? "user" : "system",
      content: message.text,
    };
  });

  outboundMessages.unshift({
    role: "system",
    content: chatbotPrompt,
  });

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: outboundMessages,
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 150,
    n: 1,
  };

  const stream = await OpenAIStream(payload);

  return stream;
};
