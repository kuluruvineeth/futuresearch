import { Message } from "@/components/ChatWindow";

export const getSuggestions = async (chatHistory: Message[]) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/suggestions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_history: chatHistory,
      chat_model: "GPT-3.5-turbo",
      chat_model_provider: "openai",
    }),
  });

  const data = (await res.json()) as { suggestions: string[] };

  return data.suggestions;
};
