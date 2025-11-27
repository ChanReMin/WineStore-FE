"use client";

import ChatbotTemplates, { StatusComponentProvider } from "quocle-chatbot-ui";

export default function ChatbotWrapper() {
  return (
    <StatusComponentProvider>
      <ChatbotTemplates themeConfigUrl="/themeConfig.json" />
    </StatusComponentProvider>
  );
}
