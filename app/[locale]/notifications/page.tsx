"use client";

import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { notificationService, type NotificationResponse } from "@/services/notificationService";
import { useAuth } from "@/hooks/useAuth";
import { useNotificationStore } from "@/stores/notificationStore";
import { getWebSocketUrl } from "@/lib/websocketUrl";
import { toast } from "react-toastify";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SockJS from "sockjs-client";

export default function NotificationsPage() {
  const { getAccessToken, isAuthenticated } = useAuth();
  const { 
    messages,
    unreadCount,
    addMessage, 
    updateMessage,
    setUnreadCount,
    clearMessages,
  } = useNotificationStore();

  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [isAuthenticated, page, size]);

  // WebSocket setup - separate useEffect with empty dependency array
  useEffect(() => {
    if (isAuthenticated) {
      const cleanup = setupWebSocket();
      return cleanup;
    }
  }, [isAuthenticated]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationService.getNotificationsWithPaging(page, size);
      if (response.data) {
        setNotifications(response.data.content);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Setup WebSocket để realtime updates
  const setupWebSocket = () => {
const token = getAccessToken();
    if (!token) {
      return;
    }
    const wsUrl = getWebSocketUrl(token);
    
    const stompClient = new Client({
      webSocketFactory: () => new SockJS(wsUrl),
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    // const stompClient = new Client({
    //   webSocketFactory: () => new SockJS(wsUrl), // SockJS sẽ gọi /ws/info?token=...
    //   reconnectDelay: 5000,
    // });

    stompClient.onConnect = () => {
      console.log("✅ Connected to WebSocket on notifications page");
      setConnected(true);

      stompClient.subscribe("/user/queue/notifications", (msg) => {
        console.log("📨 New notification received on notifications page:", msg.body);

        try {
          const parsedMsg = JSON.parse(msg.body) as NotificationResponse;
          const notificationData: NotificationResponse = {
            ...parsedMsg,
          };

          // ✅ Add to top of list
          setNotifications((prev) => [notificationData, ...prev]);

          toast.info(`New: ${notificationData.title}`);
        } catch (error) {
          console.error("Failed to parse notification:", error);
        }
      });
    };

    stompClient.onStompError = (frame) => {
      console.error("❌ STOMP error:", frame);
      setConnected(false);
    };

    stompClient.onDisconnect = () => {
      console.warn("⚠️ Disconnected from WebSocket");
      setConnected(false);
    };

    console.log("🚀 Activating STOMP client...");
    stompClient.activate();

    // Return cleanup function
    return () => {
      console.log("🔌 Cleaning up WebSocket on notifications page");
      stompClient.deactivate().catch((err) =>
        console.error("Failed to deactivate STOMP client", err)
      );
    };
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, read: true, isRead: true } : n
        )
      );
      updateMessage(id, { read: true, isRead: true });
      toast.success("Marked as read");
    } catch (error) {
      toast.error("Failed to mark notification as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read: true, isRead: true }))
      );
      messages.forEach((msg) => {
        updateMessage(msg.id, { read: true, isRead: true });
      });
      setUnreadCount(0);
      
      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error("Failed to mark all notifications as read");
    }
  };

  const handleClearAll = async () => {
    try {
      await notificationService.clearAll();
      setNotifications([]);
      clearMessages();
      setPage(0);
      toast.success("All notifications cleared");
    } catch (error) {
      toast.error("Failed to clear notifications");
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "bg-green-50 border-l-4 border-green-500";
      case "ERROR":
        return "bg-red-50 border-l-4 border-red-500";
      case "WARNING":
        return "bg-yellow-50 border-l-4 border-yellow-500";
      case "INFO":
        return "bg-blue-50 border-l-4 border-blue-500";
      default:
        return "bg-neutral-50 border-l-4 border-neutral-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "✓";
      case "ERROR":
        return "✕";
      case "WARNING":
        return "⚠";
      case "INFO":
        return "ℹ";
      default:
        return "●";
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-center text-neutral-500">Please login first</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-neutral-900">Notifications</h1>
          {connected && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
              <span className="inline-flex h-2 w-2 rounded-full bg-green-500" />
              Live
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {notifications.some((n) => !n.isRead) && (
            <button
              onClick={handleMarkAllAsRead}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Mark all as read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {loading && (
        <div className="text-center py-12">
          <p className="text-neutral-500">Loading notifications...</p>
        </div>
      )}

      {!loading && notifications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-500">No notifications</p>
        </div>
      )}

      {!loading && notifications.length > 0 && (
        <>
          <div className="space-y-3 mb-8">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg transition-colors ${
                  !notification.isRead ? "ring-2 ring-blue-400" : ""
                } ${getStatusColor(notification.status)}`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">
                        {getStatusIcon(notification.status)}
                      </span>
                      <h3 className="font-semibold text-neutral-900">
                        {notification.title}
                      </h3>
                      {!notification.isRead && (
                        <span className="ml-auto inline-flex h-2 w-2 rounded-full bg-blue-500" />
                      )}
                    </div>

                    <p className="text-neutral-700 mb-3">
                      {notification.message}
                    </p>

                    {notification.itemUrl && (
                      <a
                        href={notification.itemUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 underline mb-3 inline-block"
                      >
                        View details →
                      </a>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      {!notification.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-xs px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded"
                        >
                          Mark as read
                        </button>
                      )}
                      <span className="text-xs text-neutral-500 ml-auto">
                        {getTimeAgo(notification.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-neutral-200">
            <div className="flex items-center gap-2">
              <label className="text-sm text-neutral-600">Items per page:</label>
              <select
                value={size}
                onChange={(e) => {
                  setSize(Number(e.target.value));
                  setPage(0);
                }}
                className="px-3 py-2 border border-neutral-300 rounded-lg"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>

              <span className="text-sm text-neutral-600">
                Page {page + 1} of {totalPages || 1}
              </span>

              <button
                onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                disabled={page >= totalPages - 1 || totalPages === 0}
                className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
