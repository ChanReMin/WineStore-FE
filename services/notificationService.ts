import axiosInstance from "@/lib/axios";
import type { Page } from "@/types/common";

export interface NotificationResponse {
  id: number;
  userId: number;
  title: string;
  message: string;
  status: "SUCCESS" | "ERROR" | "WARNING" | "INFO";
  itemUrl?: string;
  createdAt: string;
  read: boolean;
  isRead: boolean;
}

export const notificationService = {
  getAllNotifications: async () => {
    try {
      const url = `/api/v1/notifications/all`;
      const response = await axiosInstance.get<NotificationResponse[]>(url);
      return response;
    } catch (error: any) {
      const url = `/api/v1/notifications?page=0&size=100`;
      const response = await axiosInstance.get<Page<NotificationResponse>>(url);
      const notifications = response.data.content || [];
      return {
        ...response,
        data: notifications,
      } as any;
    }
  },

  getNotificationsWithPaging: async (page: number = 0, size: number = 20) => {
    const url = `/api/v1/notifications?page=${page}&size=${size}`;
    try {
      const response = await axiosInstance.get<Page<NotificationResponse>>(url);
      return response;
    } catch (error: any) {
      throw error;
    }
  },

  // Lấy số lượng unread
  getUnreadCount: async () => {
    try {
      const url = `/api/v1/notifications/unread-count`;
      const response = await axiosInstance.get<number>(url);
      return response;
    } catch (error: any) {
      // Return 0 as default
      return {
        data: 0,
      } as any;
    }
  },

  // Mark notification as read
  markAsRead: (id: number) => {
    return axiosInstance.patch(`/api/v1/notifications/${id}/read`, {});
  },

  // Mark all as read
  markAllAsRead: () => {
    return axiosInstance.patch<number>(`/api/v1/notifications/read-all`, {});
  },

  // Clear all notifications
  clearAll: () => {
    return axiosInstance.delete<void>(`/api/v1/notifications/clear-all`);
  },

  // Test SQS flow
  testSqsFlow: () => {
    return axiosInstance.post<string>(`/api/v1/notifications/test-sqs`, {});
  },
};