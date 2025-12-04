"use client";

import dynamic from "next/dynamic";

// ✅ Dynamic import cho Chatbot (không cần SSR)
const ChatbotWrapper = dynamic(() => import("./ChatbotWrapper"), {
	ssr: false,
	loading: () => null, // Không cần loading state
});

export default function DynamicChatbot() {
	return <ChatbotWrapper />;
}
