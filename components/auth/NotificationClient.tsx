"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { notificationService, type NotificationResponse } from "@/services/notificationService";
import { useNotificationStore } from "@/stores/notificationStore";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

export default function NotificationClient() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  
  // Store - subscribe tới toàn bộ store
  const store = useNotificationStore();
  const {
    messages,
    unreadCount,
    isLoaded,
    connected,
    lastMessageId, // Theo dõi message mới từ WebSocket
    setMessages,
    updateMessage,
    deleteMessage,
    clearMessages,
    setUnreadCount,
    setIsLoaded,
  } = store;

  const [showNotifications, setShowNotifications] = useState(false);

  // Fetch initial data khi authenticate
  useEffect(() => {
    if (isAuthenticated) {
      console.log("🔔 NotificationClient: fetching initial data");
      fetchInitialData();
    }
  }, [isAuthenticated]);

  // Lắng nghe khi có message mới từ WebSocket (lastMessageId thay đổi)
  useEffect(() => {
    if (lastMessageId !== null) {
      console.log("🆕 Mới có message từ WebSocket, id:", lastMessageId);
      // Message đã được add vào store bởi NotificationProvider
      // Component sẽ tự động re-render do hook subscription
    }
  }, [lastMessageId]);

  const fetchInitialData = async () => {
    try {
      const response = await notificationService.getNotificationsWithPaging(0, 20);
      const notifications = response.data.content || [];
      
      if (Array.isArray(notifications)) {
        const fetchedMessages = notifications.map((msg: NotificationResponse) => ({
          ...msg,
          timestamp: new Date(msg.createdAt),
        }));

        fetchedMessages.sort((a: any, b: any) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setMessages(fetchedMessages);
        setIsLoaded(true);
        
        const unreadCount = fetchedMessages.filter(msg => !msg.isRead).length;
        setUnreadCount(unreadCount);
        
        console.log(`🔔 Loaded ${fetchedMessages.length} notifications, ${unreadCount} unread`);
      }
    } catch (error) {
      console.error("Failed to fetch initial notification data:", error);
      setIsLoaded(true);
    }
  };

  const handleMarkAsRead = async (id?: number) => {
    try {
      if (id) {
        await notificationService.markAsRead(id);
        updateMessage(id, { read: true, isRead: true });

        const msg = messages.find(m => m.id === id);
        if (msg && !msg.isRead) {
          const currentUnread = await notificationService.getUnreadCount();
          setUnreadCount(currentUnread.data || 0);
        }
      } else {
        const result = await notificationService.markAllAsRead();
        messages.forEach((msg) => {
          updateMessage(msg.id, { read: true, isRead: true });
        });
        setUnreadCount(0);
        toast.success(`Marked ${result.data} notifications as read`);
      }
    } catch (error) {
      toast.error("Failed to mark notification as read");
    }
  };

  const handleClearMessages = async () => {
    try {
      await notificationService.clearAll();
      clearMessages();
      setShowNotifications(false);
      toast.success("All notifications cleared");
    } catch (error) {
      console.error("Failed to clear messages:", error);
      toast.error("Failed to clear notifications");
    }
  };

  const handleDeleteMessage = (id: number) => {
    deleteMessage(id);
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
        return "✔";
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

  if (!isAuthenticated) return null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          console.log("📊 Store state:", { messages, unreadCount, isLoaded, connected });
          setShowNotifications(!showNotifications);
        }}
        className="relative rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-100"
        title={`${unreadCount} unread notifications`}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <>
            <span className="absolute right-1 top-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span className="absolute -right-1 -top-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          </>
        )}
        {connected && (
          <span className="absolute bottom-1 right-1 inline-flex h-2 w-2 rounded-full bg-green-500" />
        )}
      </button>

      <AnimatePresence>
        {showNotifications && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowNotifications(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-12 z-20 w-96 rounded-lg border border-neutral-200 bg-white shadow-lg"
            >
              {/* Header */}
              <div className="border-b border-neutral-200 p-4 flex justify-between items-center bg-neutral-50">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-neutral-900">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    type="button"
                    onClick={() => fetchInitialData()}
                    className="text-xs text-neutral-500 hover:text-neutral-700 underline"
                    title="Refresh notifications"
                  >
                    Refresh
                  </button>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={() => handleMarkAsRead()}
                      className="text-xs text-blue-600 hover:text-blue-800 underline font-medium"
                    >
                      Mark all read
                    </button>
                  )}
                  {messages.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearMessages}
                      className="text-xs text-neutral-500 hover:text-neutral-700 underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div className="max-h-96 overflow-y-auto">
                {!isLoaded ? (
                  <div className="p-4 text-center text-neutral-500">
                    <p>Loading notifications...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="p-4 text-center text-neutral-500">
                    <p>No notifications</p>
                  </div>
                ) : (
                  messages.slice(0, 10).map((notification) => (
                    <div
                      key={notification.id}
                      className={`border-b border-neutral-100 p-4 transition-colors ${
                        !notification.isRead ? "bg-blue-50/30" : ""
                      } ${getStatusColor(notification.status)} group cursor-pointer`}
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">
                              {getStatusIcon(notification.status)}
                            </span>
                            <h4 className="font-semibold text-sm text-neutral-900">
                              {notification.title}
                            </h4>
                            {!notification.isRead && (
                              <span className="inline-flex h-2 w-2 rounded-full bg-blue-500 ml-auto" />
                            )}
                          </div>

                          <p className="text-sm text-neutral-700 mb-2">
                            {notification.message}
                          </p>

                          {notification.itemUrl && (
                            <a
                              href={notification.itemUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs text-blue-600 hover:text-blue-800 underline"
                            >
                              View details →
                            </a>
                          )}

                          <div className="mt-3 flex gap-2">
                            {!notification.isRead && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMarkAsRead(notification.id);
                                }}
                                className="text-xs px-2 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded"
                              >
                                Mark as read
                              </button>
                            )}
                          </div>

                          <p className="mt-2 text-xs text-neutral-500">
                            {getTimeAgo(notification.createdAt)}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteMessage(notification.id);
                          }}
                          className="text-neutral-400 hover:text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          title="Delete"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {messages.length > 0 && (
                <div className="border-t border-neutral-200 p-3 text-center bg-neutral-50">
                  <button
                    type="button"
                    className="text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:underline"
                    onClick={() => {
                      setShowNotifications(false);
                      router.push("/notifications");
                    }}
                  >
                    View all notifications
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}