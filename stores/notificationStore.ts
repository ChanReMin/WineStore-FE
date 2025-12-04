import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NotificationResponse } from "@/services/notificationService";

interface NotificationMessage extends NotificationResponse {
  timestamp?: Date;
}

interface NotificationStore {
  messages: NotificationMessage[];
  unreadCount: number;
  isLoaded: boolean;
  connected: boolean;
  // Thêm flag để trigger re-render khi có message mới từ WebSocket
  lastMessageId: number | null;

  // Actions
  setMessages: (messages: NotificationMessage[]) => void;
  addMessage: (message: NotificationMessage) => void;
  updateMessage: (id: number, updates: Partial<NotificationMessage>) => void;
  deleteMessage: (id: number) => void;
  clearMessages: () => void;

  setUnreadCount: (count: number) => void;
  incrementUnreadCount: () => void;
  decrementUnreadCount: () => void;

  setIsLoaded: (loaded: boolean) => void;
  setConnected: (connected: boolean) => void;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      messages: [],
      unreadCount: 0,
      isLoaded: false,
      connected: false,
      lastMessageId: null,

      setMessages: (messages) => set({ messages }),

      addMessage: (message) => {
        set((state) => {
          // Kiểm tra message đã tồn tại chưa (tránh duplicate)
          const exists = state.messages.some((msg) => msg.id === message.id);
          if (exists) return state;

          return {
            messages: [message, ...state.messages],
            lastMessageId: message.id, // Cập nhật flag để trigger component
          };
        });
      },

      updateMessage: (id, updates) => {
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === id ? { ...msg, ...updates } : msg
          ),
        }));
      },

      deleteMessage: (id) => {
        set((state) => ({
          messages: state.messages.filter((msg) => msg.id !== id),
        }));
      },

      clearMessages: () =>
        set({ messages: [], unreadCount: 0, lastMessageId: null }),

      setUnreadCount: (count) => set({ unreadCount: count }),

      incrementUnreadCount: () => {
        set((state) => ({
          unreadCount: state.unreadCount + 1,
        }));
      },

      decrementUnreadCount: () => {
        set((state) => ({
          unreadCount: Math.max(0, state.unreadCount - 1),
        }));
      },

      setIsLoaded: (loaded) => set({ isLoaded: loaded }),

      setConnected: (connected) => set({ connected }),
    }),
    {
      name: "notification-store",
      partialize: (state) => ({
        messages: state.messages,
        // Không persist unreadCount - luôn fetch fresh từ API
        // Không persist lastMessageId - chỉ dùng trong session
      }),
    }
  )
);
