import { useEffect } from "react";
import "@n8n/chat/style.css";
//import "../../app/globals.css";
import { createChat } from "@n8n/chat";

export const N8nChat = () => {
  useEffect(() => {
    try {
      createChat({
        webhookUrl:
          "https://craftedfinishes.app.n8n.cloud/webhook/7aafc5f5-6696-4467-aaad-2977675e9bab/chat",

        initialMessages: [
          `Hi there 👋 !`,
          "My name is John. How can I help you today?",
        ],
        i18n: {
          en: {
            title: "Crafted Finishes Helper",
            subtitle: "Ask me anything about our products and services",
            sendButtonText: "Send",
            placeholder: "Type your message here...",
            welcomeMessage: "Hi there! How can I help you today?",
            footer: "Powered by Crafted Finishes",
            getStarted: "Get Started",
            inputPlaceholder: "Type your message...",
            closeButtonTooltip: "Close chat",
          },
        },
      });

      
    } catch (error) {
      console.error("Error initializing chat:", error);
    }
  }, []);

  return <div id="n8n-chat"></div>;
};
