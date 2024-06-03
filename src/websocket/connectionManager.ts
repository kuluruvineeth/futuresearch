import { WebSocket } from "ws";
import { handleMessage } from "./messageHandler";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { getChatModel, getChatModelProvider, getOpenaiApiKey } from "../config";
import { getAvailableProviders } from "../lib/providers";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import type { Embeddings } from "@langchain/core/embeddings";

export const handleConnection = async (ws: WebSocket) => {
  const models = await getAvailableProviders();
  const provider = getChatModelProvider();
  const chatModel = getChatModel();

  let llm: BaseChatModel | undefined;
  let embeddings: Embeddings | undefined;

  if (models[provider] && models[provider][chatModel]) {
    llm = models[provider][chatModel] as BaseChatModel | undefined;
    embeddings = models[provider].embeddings as Embeddings | undefined;
  }

  if (!llm || !embeddings) {
    ws.send(
      JSON.stringify({
        type: "error",
        data: "Invalid LLM or embeddings model selected",
      })
    );
  }

  ws.on(
    "message",
    async (message) =>
      await handleMessage(message.toString(), ws, llm, embeddings)
  );

  ws.on("close", () => console.log("Connection Closed"));
};
