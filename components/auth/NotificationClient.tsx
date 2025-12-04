"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  notificationService,
  type NotificationResponse,
} from "@/services/notificationService";
import { useNotificationStore } from "@/stores/notificationStore";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { LoaderOne } from "../ui/loader";
import { useTranslations } from "next-intl";

export default function NotificationClient() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const t = useTranslations("notifications");
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
      const response = await notificationService.getNotificationsWithPaging(
        0,
        20
      );
      const notifications = response.data.content || [];
      if (Array.isArray(notifications)) {
        const fetchedMessages = notifications.map(
          (msg: NotificationResponse) => ({
            ...msg,
            timestamp: new Date(msg.createdAt),
          })
        );

        fetchedMessages.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setMessages(fetchedMessages);
        setIsLoaded(true);
        const unreadCount = fetchedMessages.filter((msg) => !msg.isRead).length;
        setUnreadCount(unreadCount);
        console.log(
          `🔔 Loaded ${fetchedMessages.length} notifications, ${unreadCount} unread`
        );
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

        const msg = messages.find((m) => m.id === id);
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
          setShowNotifications(!showNotifications);
        }}
        className="relative rounded-lg p-2.5 text-[#3b4417] transition-all hover:bg-[#3b4417]/10 hover:scale-105 active:scale-95"
       title={`${unreadCount} unread notifications`}
      >
        <Bell size={20} strokeWidth={2.5} />
        {unreadCount > 0 && (
          <>
            <span className="absolute right-1 top-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3b4417] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3b4417]" />
            </span>
            <span className="absolute -right-1 -top-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#3b4417] text-white text-[10px] font-bold shadow-md">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          </>
        )}
        {connected && (
          <span className="absolute bottom-1.5 right-1.5 inline-flex h-2 w-2 rounded-full bg-[#3b4417] ring-2 ring-white" />
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
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 top-12 z-20 w-96 rounded-xl border-2 border-[#3b4417]/20 bg-white shadow-2xl overflow-hidden backdrop-blur-sm"
            >
              {/* Header */}
              <div className="border-b-2 border-[#3b4417]/20 p-4 flex justify-between items-center bg-[#3b4417]/5">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[#3b4417] flex items-center justify-center shadow-md">
                    <Bell size={16} className="text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-bold text-[#3b4417] tracking-wide text-sm uppercase">
                    {t("title")}
                  </h3>
                  {unreadCount > 0 && (
                    <span className="px-2.5 py-0.5 text-xs font-bold text-white bg-[#3b4417] rounded-full shadow-sm">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={() => handleMarkAsRead()}
                      className="text-xs text-[#3b4417] hover:opacity-70 font-semibold transition-opacity"
                    >
                      {t("markAllRead")}
                    </button>
                  )}
                  {messages.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearMessages}
                      className="text-xs text-[#3b4417]/70 hover:text-[#3b4417] font-medium transition-colors"
                    >
                      {t("clear")}
                    </button>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div className="max-h-96 overflow-y-auto">
                {!isLoaded ? (
                  <div className="p-4 text-center text-neutral-500">
                    <div className="flex h-screen items-center justify-center bg-neutral-50">
                      <LoaderOne />
                    </div>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="p-4 text-center text-neutral-500">
                    <p>{t("noNotifications")}</p>
                  </div>
                ) : (
                  messages.map((notification) => (
                    <div
                      key={notification.id}
                      className={`border-b border-[#3b4417]/10 p-4 transition-all hover:bg-[#3b4417]/5 ${
                        !notification.isRead ? "bg-[#3b4417]/5" : ""
                      } ${getStatusColor(notification.status)} group cursor-pointer`}
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          {/* Title with status */}
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-base font-semibold">
                              {getStatusIcon(notification.status)}
                            </span>
                            <h4 className="font-bold text-sm text-[#3b4417] tracking-wide">
                              {notification.title}
                            </h4>
                            {!notification.isRead && (
                              <span className="inline-flex h-2 w-2 rounded-full bg-[#3b4417] ml-auto shadow-sm" />
                            )}
                          </div>

                          {/* Message */}
                          <p className="text-sm text-[#3b4417]/70 mb-2 leading-relaxed">
                            {notification.message}
                          </p>

                          {/* Link if exists */}
                          {notification.itemUrl && (
                            <a
                              href={notification.itemUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-xs text-[#3b4417] hover:opacity-70 font-semibold transition-opacity"
                            >
                              {t("viewDetails")} <span>→</span>
                            </a>
                          )}

                          {/* Actions */}
                          <div className="mt-3 flex gap-2">
                            {!notification.isRead && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMarkAsRead(notification.id);
                                }}
                                className="text-xs px-3 py-1.5 bg-[#3b4417] text-white hover:bg-[#3b4417]/80 rounded-md font-medium transition-all shadow-sm hover:shadow-md"
                              >
                                {t("markAsRead")}
                              </button>
                            )}
                          </div>

                          {/* Time */}
                          <p className="mt-2 text-xs text-[#3b4417]/60 italic">
                            {getTimeAgo(notification.createdAt)}
                          </p>
                        </div>

                        {/* Delete button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteMessage(notification.id);
                          }}
                          className="text-[#3b4417]/50 hover:text-[#3b4417] opacity-0 group-hover:opacity-100 transition-all shrink-0 hover:scale-110"
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
                <div className="border-t-2 border-[#3b4417]/20 p-3 text-center bg-[#3b4417]/5">
                  <button
                    type="button"
                    className="text-sm font-bold text-[#3b4417] hover:opacity-70 tracking-wide uppercase transition-opacity"
                    onClick={() => {
                      setShowNotifications(false);
                      router.push("/notifications");
                    }}
                  >
                    {t("viewAll")} →
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
