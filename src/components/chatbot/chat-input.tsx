"use client";

import { useContext, useRef, useState, type HTMLAttributes } from "react";
import { ThickArrowLeftIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { toast } from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";

import { MessagesContext } from "~/context/messages";
import { cn } from "~/lib/utils";
import { type Message } from "~/lib/validators/message";

type ChatInputProps = HTMLAttributes<HTMLDivElement>;

export function ChatInput({ className, ...props }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [input, setInput] = useState<string>("");
  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  } = useContext(MessagesContext);

  const { mutate: sendMessage, isPending } = useMutation({
    mutationKey: ["sendMessage"],

    // include message to later use it in onMutate
    mutationFn: async (_message: Message) => {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });

      return response.body;
    },

    onMutate(message) {
      addMessage(message);
    },

    onSuccess: async (stream) => {
      if (!stream) throw new Error("No stream");

      // construct new message to add
      const id = nanoid();
      const responseMessage: Message = {
        id,
        isUserMessage: false,
        text: "",
      };

      // add new message to state
      addMessage(responseMessage);

      setIsMessageUpdating(true);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        updateMessage(id, (prev) => prev + chunkValue);
      }

      // clean up
      setIsMessageUpdating(false);
      setInput("");

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 10);
    },

    onError: (_, message) => {
      toast.error("Something went wrong. Please try again.");
      removeMessage(message.id);
      textareaRef.current?.focus();
    },
  });

  return (
    <div {...props} className={cn("border-t border-zinc-300", className)}>
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextareaAutosize
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();

              const message: Message = {
                id: nanoid(),
                isUserMessage: true,
                text: input,
              };

              sendMessage(message);
            }
          }}
          rows={2}
          maxRows={4}
          value={input}
          autoFocus
          disabled={isPending}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a message..."
          className="peer block w-full resize-none border-0 bg-zinc-100 p-1.5 pr-10 text-sm text-gray-900 focus:ring-0 disabled:opacity-50 sm:leading-6"
        />

        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-gray-200 bg-white px-1 font-sans text-xs text-gray-400">
            {isPending ? (
              <UpdateIcon className="h-3 w-3 animate-spin" />
            ) : (
              <ThickArrowLeftIcon className="h-3 w-3" />
            )}
          </kbd>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-blue-600"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
