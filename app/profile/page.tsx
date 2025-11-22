"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold mb-6">Thông tin cá nhân</h1>
            
            {user && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Username</p>
                    <p className="font-medium">{user.username}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Họ tên</p>
                    <p className="font-medium">
                      {user.first_name} {user.last_name}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Vai trò</p>
                    <p className="font-medium">{user.role}</p>
                  </div>
                  
                  {user.phone_number && (
                    <div>
                      <p className="text-sm text-gray-600">Số điện thoại</p>
                      <p className="font-medium">{user.phone_number}</p>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t">
                  <button
                    onClick={logout}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
