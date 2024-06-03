import express from "express";
import { getAvailableProviders } from "../lib/providers";
import {
  getChatModel,
  getChatModelProvider,
  getOllamaApiEndpoint,
  getOpenaiApiKey,
  updateConfig,
} from "../config";

const router = express.Router();

router.get("/", async (_, res) => {
  const config = {};

  const providers = await getAvailableProviders();

  for (const provider in providers) {
    delete providers[provider]["embeddings"];
  }

  config["providers"] = {};

  for (const provider in providers) {
    config["providers"][provider] = Object.keys(providers[provider]);
  }

  config["selectedProvider"] = getChatModelProvider();
  config["selectedChatModel"] = getChatModel();
  config["openaiApiKey"] = getOpenaiApiKey();
  config["ollamaApiUrl"] = getOllamaApiEndpoint();

  res.status(200).json(config);
});

router.post("/", async (req, res) => {
  const config = req.body;

  const updatedConfig = {
    GENERAL: {
      CHAT_MODEL_PROVIER: config.selectedProvider,
      CHAT_MODEL: config.selectedChatModel,
    },
    API_KEYS: {
      OPENAI: config.openAIApiKey,
    },
    API_ENDPOINTS: {
      OLLAMA: config.ollamaApiUrl,
    },
  };

  updateConfig(updatedConfig);

  res.status(200).json({ message: "config updated" });
});

export default router;
