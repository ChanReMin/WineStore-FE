"use client";

import { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useAuth } from "@/hooks/useAuth";
import { useNotificationStore } from "@/stores/notificationStore";
import { getWebSocketUrl } from "@/lib/websocketUrl";
import { toast } from "react-toastify";

/**
 * Provider component để setup WebSocket globally
 * Sử dụng state để quản lý lifecycle của WebSocket
 */
export function NotificationSocketProvider() {
  const { getAccessToken, isAuthenticated } = useAuth();
  const {
    addMessage,
    incrementUnreadCount,
    setConnected,
  } = useNotificationStore();

  const stompClientRef = useRef<Client | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isCleaningUpRef = useRef(false);

  // Cleanup function
  const cleanup = () => {
    if (isCleaningUpRef.current) return;
    isCleaningUpRef.current = true;

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (stompClientRef.current?.active) {
      console.log("🧹 Cleaning up WebSocket");
      stompClientRef.current.deactivate().catch(() => {});
    }
    
    setConnected(false);
    isCleaningUpRef.current = false;
  };

  // Reset khi authentication thay đổi
  useEffect(() => {
    return () => {
      if (!isAuthenticated) {
        console.log("🔌 User logged out, cleaning up WebSocket");
        cleanup();
      }
    };
  }, [isAuthenticated]);

  // Setup WebSocket - CHỈ chạy 1 lần khi component mount
  useEffect(() => {
    if (!isAuthenticated) {
      console.log("⸰️ User not authenticated, skipping WebSocket setup");
      return;
    }

    const token = getAccessToken();
    if (!token) {
      console.log("⸰️ No token available");
      return;
    }

    // Nếu đã có client đang connected, không tạo mới
    if (stompClientRef.current?.connected) {
      console.log("✅ WebSocket already connected");
      return;
    }

    console.log("🔌 Setting up WebSocket...");

    const wsUrl = getWebSocketUrl(token);
    const newStompClient = new Client({
      webSocketFactory: () => new SockJS(wsUrl),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => {
        // console.log("STOMP Debug:", str);
      },
    });

    stompClientRef.current = newStompClient;

    // Setup event handlers
    newStompClient.onConnect = () => {
      console.log("✅ WebSocket Connected Successfully");
      setConnected(true);

      newStompClient.subscribe("/user/queue/notifications", (msg) => {
        try {
          const data = JSON.parse(msg.body);
          console.log("📨 Received notification from WebSocket:", data);

          const message = {
            ...data,
            timestamp: new Date(),
            isRead: data.isRead ?? data.read ?? false,
            read: data.read ?? data.isRead ?? false,
          };

          console.log("📝 Adding message to store:", message.id, message.title);
          addMessage(message);
          
          if (!message.isRead) {
            incrementUnreadCount();
          }

          toast.info(message.title || "New Notification", {
            autoClose: 3000,
          });
        } catch (e) {
          console.error("❌ Failed to parse WS notification:", e);
        }
      });

      console.log("✅ Subscribed to /user/queue/notifications");
    };

    newStompClient.onDisconnect = () => {
      console.log("❌ WebSocket Disconnected");
      setConnected(false);
      
      // Attempt reconnect sau 5 giây
      if (!isCleaningUpRef.current && isAuthenticated) {
        console.log("🔄 Scheduling reconnect in 5 seconds...");
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log("🔄 Attempting to reconnect...");
          newStompClient.activate();
        }, 5000);
      }
    };

    newStompClient.onStompError = (frame) => {
      console.error("❌ STOMP Error:", frame.headers?.message || frame.body);
      setConnected(false);
    };

    newStompClient.onWebSocketClose = (event) => {
      console.log("🔌 WebSocket Closed:", event.code, event.reason);
      setConnected(false);
    };

    // Kích hoạt client
    console.log("🚀 Activating WebSocket...");
    newStompClient.activate();

    // Cleanup function khi component unmount
    return () => {
      cleanup();
    };
  }, [isAuthenticated]); // CHỈ depend on isAuthenticated

  return null;
}