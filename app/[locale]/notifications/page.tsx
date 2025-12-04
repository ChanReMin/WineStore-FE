"use client";

import { useEffect, useState } from "react";
import { notificationService, type NotificationResponse } from "@/services/notificationService";
import { useAuth } from "@/hooks/useAuth";
import { useNotificationStore } from "@/stores/notificationStore";
import { toast } from "react-toastify";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NotificationsPage() {
  const { isAuthenticated } = useAuth();
  
  const { 
    updateMessage,
    setUnreadCount,
    clearMessages,
    messages: storeMessages,
    lastMessageId, // Theo dõi message mới từ WebSocket
    connected,
  } = useNotificationStore();

  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch notifications từ API khi page/size thay đổi
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [isAuthenticated, page, size]);

  // ✅ Khi có tin nhắn mới từ WebSocket (lastMessageId thay đổi)
  // Nếu đang ở trang đầu, thêm vào danh sách hiển thị
  useEffect(() => {
    if (lastMessageId !== null && page === 0) {
      console.log("🆕 Mới có message từ WebSocket, id:", lastMessageId);
      
      const newMessage = storeMessages.find(msg => msg.id === lastMessageId);
      if (newMessage) {
        // Kiểm tra message đã tồn tại trong list không
        const exists = notifications.some(n => n.id === newMessage.id);
        
        if (!exists) {
          console.log("📝 Thêm message mới vào danh sách hiển thị");
          setNotifications(prev => [newMessage, ...prev]);
        }
      }
    }
  }, [lastMessageId, page, storeMessages, notifications]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationService.getNotificationsWithPaging(page, size);
      
      if (response.data) {
        if (page === 0) {
          // Kết hợp với store messages để có real-time data
          const apiIds = new Set(response.data.content.map(n => n.id));
          const uniqueStoreMessages = storeMessages.filter(msg => !apiIds.has(msg.id));
          setNotifications([...uniqueStoreMessages, ...response.data.content]);
        } else {
          setNotifications(response.data.content);
        }
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("Failed to load notifications:", error);
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev =>
        prev.map((n) =>
          n.id === id ? { ...n, read: true, isRead: true } : n
        )
      );
      updateMessage(id, { read: true, isRead: true });
      toast.success("Marked as read");
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      toast.error("Failed to mark notification as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev =>
        prev.map((n) => ({ ...n, read: true, isRead: true }))
      );
      setUnreadCount(0);
      
      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
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
      console.error("Failed to clear notifications:", error);
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