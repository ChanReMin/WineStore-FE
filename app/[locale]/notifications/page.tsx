"use client";

import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import {
  notificationService,
  type NotificationResponse,
} from "@/services/notificationService";
import { useAuth } from "@/hooks/useAuth";
import { useNotificationStore } from "@/stores/notificationStore";
import { getWebSocketUrl } from "@/lib/websocketUrl";
import { toast } from "react-toastify";
import { Bell, ChevronLeft, ChevronRight } from "lucide-react";
import SockJS from "sockjs-client";
import { LoaderOne } from "@/components/ui/loader";

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

  const [notifications, setNotifications] = useState<NotificationResponse[]>(
    []
  );
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
      const response = await notificationService.getNotificationsWithPaging(
        page,
        size
      );
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
        console.log(
          "📨 New notification received on notifications page:",
          msg.body
        );

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
      stompClient
        .deactivate()
        .catch((err) =>
          console.error("Failed to deactivate STOMP client", err)
        );
    };
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true, isRead: true } : n))
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
        return "border-l-4 border-[#3b4417]";
      case "ERROR":
        return "border-l-4 border-red-500";
      case "WARNING":
        return "border-l-4 border-orange-500";
      case "INFO":
        return "border-l-4 border-blue-500";
      default:
        return "border-l-4 border-[#3b4417]/30";
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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-12 px-4 max-w-6xl">
        <div className="bg-white rounded-2xl shadow-xl border-2 border-[#3b4417]/20 overflow-hidden">
          {/* Header Section */}
          <div className="bg-[#3b4417] px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Bell size={24} className="text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white tracking-wide uppercase">Notifications</h1>
                  <p className="text-white/70 text-sm mt-1">Stay updated with your latest activities</p>
                </div>
                {connected && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white rounded-full text-xs font-semibold">
                    <span className="inline-flex h-2 w-2 rounded-full bg-white animate-pulse" />
                    Live
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                {notifications.some((n) => !n.isRead) && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="px-5 py-2.5 bg-white text-[#3b4417] rounded-lg hover:bg-white/90 transition-all font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 uppercase tracking-wide"
                  >
                    Mark all read
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="px-5 py-2.5 bg-transparent text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-all font-bold text-sm hover:scale-105 active:scale-95 uppercase tracking-wide"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <LoaderOne />
                <p className="mt-4 text-[#3b4417]/70 font-medium">Loading notifications...</p>
              </div>
            </div>
          )}

          {!loading && notifications.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#3b4417]/10 mb-4">
                <Bell size={40} className="text-[#3b4417]" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-[#3b4417] mb-2">No notifications yet</h3>
              <p className="text-[#3b4417]/70">You're all caught up! Check back later for updates.</p>
            </div>
          )}

          {!loading && notifications.length > 0 && (
            <>
              <div className="p-6 space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`group relative p-5 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-white ${
                      !notification.isRead
                        ? "ring-2 ring-[#3b4417]/30"
                        : "shadow-md"
                    } ${getStatusColor(notification.status)}`}
                  >
                    {/* Unread indicator stripe */}
                    {!notification.isRead && (
                      <div className="absolute top-0 right-0 h-full w-1.5 bg-[#3b4417] rounded-r-xl" />
                    )}
                    
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          {/* Status icon with background */}
                          <div className="h-10 w-10 rounded-lg bg-[#3b4417] flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                            <span className="text-white text-lg font-bold">
                              {getStatusIcon(notification.status)}
                            </span>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-[#3b4417] text-base tracking-wide">
                                {notification.title}
                              </h3>
                              {!notification.isRead && (
                                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#3b4417] shadow-sm" />
                              )}
                            </div>
                            <p className="text-[#3b4417]/70 text-sm leading-relaxed">
                              {notification.message}
                            </p>
                          </div>
                        </div>

                        {notification.itemUrl && (
                          <a
                            href={notification.itemUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-[#3b4417] hover:opacity-70 font-semibold mb-3 group/link transition-opacity"
                          >
                            View details 
                            <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                          </a>
                        )}

                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#3b4417]/10">
                          <div className="flex items-center gap-3">
                            {!notification.isRead && (
                              <button
                                onClick={() => handleMarkAsRead(notification.id)}
                                className="text-xs px-4 py-2 bg-[#3b4417] text-white hover:bg-[#3b4417]/80 rounded-lg font-semibold transition-all shadow-sm hover:shadow-md uppercase tracking-wide"
                              >
                                Mark as read
                              </button>
                            )}
                            <span className="text-xs text-[#3b4417]/60 font-medium italic">
                              {getTimeAgo(notification.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 bg-[#3b4417]/5 border-t-2 border-[#3b4417]/20">
                <div className="flex items-center gap-3">
                  <label className="text-sm text-[#3b4417] font-semibold">
                    Items per page:
                  </label>
                  <select
                    value={size}
                    onChange={(e) => {
                      setSize(Number(e.target.value));
                      setPage(0);
                    }}
                    className="px-4 py-2 border-2 border-[#3b4417]/20 bg-white rounded-lg text-[#3b4417] font-medium focus:outline-none focus:ring-2 focus:ring-[#3b4417]/30 transition-all"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPage(Math.max(0, page - 1))}
                    disabled={page === 0}
                    className="p-2.5 text-[#3b4417] hover:bg-[#3b4417]/10 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95 border-2 border-[#3b4417]/20"
                  >
                    <ChevronLeft size={20} strokeWidth={2.5} />
                  </button>

                  <span className="text-sm text-[#3b4417] font-bold px-4 py-2 bg-white rounded-lg border-2 border-[#3b4417]/20 min-w-[120px] text-center">
                    Page {page + 1} of {totalPages || 1}
                  </span>

                  <button
                    onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                    disabled={page >= totalPages - 1 || totalPages === 0}
                    className="p-2.5 text-[#3b4417] hover:bg-[#3b4417]/10 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95 border-2 border-[#3b4417]/20"
                  >
                    <ChevronRight size={20} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
