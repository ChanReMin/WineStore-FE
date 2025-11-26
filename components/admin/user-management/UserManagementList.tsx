"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Users,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Lock,
  Unlock,
  UserPlus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Mail,
  Phone,
  ShoppingBag,
  DollarSign,
  MapPin,
  Shield,
  Store,
  UserCog,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchUsers, type User } from "@/lib/adminUserManagement";
import UserDetailModal from "./UserDetailModal";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";
import ChangeStatusModal from "./ChangeStatusModal";
import ChangeRoleModal from "./ChangeRoleModal";
import ResetPasswordModal from "./ResetPasswordModal";

export default function UserManagementList() {
  const t = useTranslations("admin.userManagement");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [summary, setSummary] = useState({
    total_users: 0,
    active_users: 0,
    inactive_users: 0,
    locked_users: 0,
    customers: 0,
    sellers: 0,
    admins: 0,
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total: 0,
  });

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<number | "all">("all");
  const [statusFilter, setStatusFilter] = useState<number | "all">("all");

  // Modals
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  const loadData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetchUsers({
        page,
        limit: 10,
        search: searchQuery,
        role: roleFilter,
        status: statusFilter,
      });
      setUsers(response.data.users);
      setPagination(response.data.pagination);
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [roleFilter, statusFilter]);

  const handleSearch = () => {
    loadData(1);
  };

  const handlePageChange = (newPage: number) => {
    loadData(newPage);
  };

  const handleViewDetail = (user: User) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleChangeStatus = (user: User) => {
    setSelectedUser(user);
    setShowStatusModal(true);
  };

  const handleChangeRole = (user: User) => {
    setSelectedUser(user);
    setShowRoleModal(true);
  };

  const handleResetPassword = (user: User) => {
    setSelectedUser(user);
    setShowResetPasswordModal(true);
  };

  const handleActionComplete = () => {
    loadData(pagination.current_page);
  };

  const getStatusBadge = (status: number) => {
    const badges = {
      1: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        icon: CheckCircle,
        label: t("status.active"),
      },
      0: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        icon: AlertCircle,
        label: t("status.inactive"),
      },
      "-1": {
        bg: "bg-red-50",
        text: "text-red-700",
        icon: XCircle,
        label: t("status.locked"),
      },
    };

    const badge = badges[status as keyof typeof badges] || badges[0];
    const Icon = badge.icon;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}
      >
        <Icon className="w-3.5 h-3.5" />
        {badge.label}
      </span>
    );
  };

  const getRoleBadge = (role: number) => {
    const badges = {
      0: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        icon: ShoppingBag,
        label: t("role.customer"),
      },
      1: {
        bg: "bg-purple-50",
        text: "text-purple-700",
        icon: Store,
        label: t("role.seller"),
      },
      2: {
        bg: "bg-orange-50",
        text: "text-orange-700",
        icon: Shield,
        label: t("role.admin"),
      },
    };

    const badge = badges[role as keyof typeof badges] || badges[0];
    const Icon = badge.icon;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}
      >
        <Icon className="w-3.5 h-3.5" />
        {badge.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fdfbf5]">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-[#3b4417] border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-[#7a8451]">{t("loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 bg-[#fdfbf5] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#3b4417] tracking-wide">
            {t("title")}
          </h1>
          <p className="text-sm md:text-base text-[#7a8451]">{t("subtitle")}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#3b4417] text-amber-50 rounded-lg hover:bg-[#4c5b23] transition-colors whitespace-nowrap"
        >
          <UserPlus className="w-4 h-4" />
          <span>{t("createUser")}</span>
        </motion.button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-[#3b4417]/20 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">
                    {t("summary.totalUsers")}
                  </p>
                  <p className="text-3xl font-bold text-[#3b4417]">
                    {summary.total_users}
                  </p>
                </div>
                <div className="bg-[#f5f3e8] p-3 rounded-xl">
                  <Users className="w-6 h-6 text-[#3b4417]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-emerald-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">
                    {t("summary.activeUsers")}
                  </p>
                  <p className="text-3xl font-bold text-emerald-600">
                    {summary.active_users}
                  </p>
                </div>
                <div className="bg-emerald-50 p-3 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-amber-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">
                    {t("summary.inactiveUsers")}
                  </p>
                  <p className="text-3xl font-bold text-amber-600">
                    {summary.inactive_users}
                  </p>
                </div>
                <div className="bg-amber-50 p-3 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-red-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">
                    {t("summary.lockedUsers")}
                  </p>
                  <p className="text-3xl font-bold text-red-600">
                    {summary.locked_users}
                  </p>
                </div>
                <div className="bg-red-50 p-3 rounded-xl">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Role Distribution */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-blue-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-3 rounded-xl">
                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">
                      {t("role.customer")}
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {summary.customers}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-purple-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-50 p-3 rounded-xl">
                    <Store className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">
                      {t("role.seller")}
                    </p>
                    <p className="text-2xl font-bold text-purple-600">
                      {summary.sellers}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="border-orange-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-50 p-3 rounded-xl">
                    <Shield className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">
                      {t("role.admin")}
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      {summary.admins}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative sm:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10"
              />
            </div>

            <Select
              value={roleFilter.toString()}
              onValueChange={(value) =>
                setRoleFilter(value === "all" ? "all" : parseInt(value))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("filters.allRoles")}</SelectItem>
                <SelectItem value="0">{t("filters.customers")}</SelectItem>
                <SelectItem value="1">{t("filters.sellers")}</SelectItem>
                <SelectItem value="2">{t("filters.admins")}</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={statusFilter.toString()}
              onValueChange={(value) =>
                setStatusFilter(value === "all" ? "all" : parseInt(value))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("filters.allStatus")}</SelectItem>
                <SelectItem value="1">{t("filters.active")}</SelectItem>
                <SelectItem value="0">{t("filters.inactive")}</SelectItem>
                <SelectItem value="-1">{t("filters.locked")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table - Desktop */}
      <Card className="hidden lg:block">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                    {t("table.user")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                    {t("table.contact")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                    {t("table.role")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                    {t("table.statistics")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                    {t("table.status")}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-neutral-600 uppercase tracking-wider">
                    {t("table.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                <AnimatePresence mode="popLayout">
                  {users.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-neutral-50 transition-colors"
                    >
                      {/* User Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.user_info.avatar}
                            alt={`${user.user_info.first_name} ${user.user_info.last_name}`}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-[#3b4417]">
                              {user.user_info.first_name}{" "}
                              {user.user_info.last_name}
                            </p>
                            <p className="text-xs text-neutral-500">
                              ID: {user.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-neutral-900">
                            <Mail className="w-3.5 h-3.5 text-neutral-400" />
                            <span className="truncate max-w-[200px]">
                              {user.account.email}
                            </span>
                          </div>
                          {user.user_info.phone_number && (
                            <div className="flex items-center gap-2 text-sm text-neutral-600">
                              <Phone className="w-3.5 h-3.5 text-neutral-400" />
                              <span>{user.user_info.phone_number}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        {getRoleBadge(user.account.role)}
                      </td>

                      {/* Statistics */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <ShoppingBag className="w-3.5 h-3.5 text-blue-500" />
                            <span className="text-neutral-600">
                              {user.stats.total_orders} {t("stats.orders")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="font-medium text-emerald-600">
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                                notation: "compact",
                              }).format(user.stats.total_spent)}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {getStatusBadge(user.account.status)}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleViewDetail(user)}
                            className="p-2 text-[#3b4417] hover:bg-[#f5f3e8] rounded-lg transition-colors"
                            title={t("actions.view")}
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEdit(user)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title={t("actions.edit")}
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleChangeRole(user)}
                            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title={t("actions.changeRole")}
                          >
                            <UserCog className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleChangeStatus(user)}
                            className={`p-2 rounded-lg transition-colors ${
                              user.account.status === 1
                                ? "text-amber-600 hover:bg-amber-50"
                                : "text-emerald-600 hover:bg-emerald-50"
                            }`}
                            title={
                              user.account.status === 1
                                ? t("actions.deactivate")
                                : t("actions.activate")
                            }
                          >
                            {user.account.status === 1 ? (
                              <Lock className="w-4 h-4" />
                            ) : (
                              <Unlock className="w-4 h-4" />
                            )}
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {users.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <Users className="w-16 h-16 text-neutral-300 mb-4" />
              <p className="text-lg font-medium text-neutral-900 mb-2">
                {t("table.noUsers")}
              </p>
              <p className="text-sm text-neutral-500">
                {t("table.noUsersDesc")}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Users Cards - Mobile */}
      <div className="lg:hidden space-y-4">
        <AnimatePresence mode="popLayout">
          {users.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  {/* User Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <img
                      src={user.user_info.avatar}
                      alt={`${user.user_info.first_name} ${user.user_info.last_name}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#3b4417] truncate">
                        {user.user_info.first_name} {user.user_info.last_name}
                      </h3>
                      <p className="text-xs text-neutral-500">ID: {user.id}</p>
                      <div className="flex gap-2 mt-2">
                        {getRoleBadge(user.account.role)}
                        {getStatusBadge(user.account.status)}
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4 pb-4 border-b border-neutral-100">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                      <span className="truncate text-neutral-700">
                        {user.account.email}
                      </span>
                    </div>
                    {user.user_info.phone_number && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                        <span className="text-neutral-700">
                          {user.user_info.phone_number}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <ShoppingBag className="w-4 h-4 text-blue-600" />
                        <span className="text-xs text-neutral-600">
                          {t("stats.orders")}
                        </span>
                      </div>
                      <p className="text-lg font-bold text-blue-600">
                        {user.stats.total_orders}
                      </p>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs text-neutral-600">
                          {t("stats.spent")}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-emerald-600">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                          notation: "compact",
                        }).format(user.stats.total_spent)}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleViewDetail(user)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-[#3b4417] bg-[#f5f3e8] hover:bg-[#e8e5d5] rounded-lg transition-colors text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      {t("actions.view")}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(user)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-sm font-medium"
                    >
                      <Edit className="w-4 h-4" />
                      {t("actions.edit")}
                    </motion.button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State - Mobile */}
        {users.length === 0 && (
          <Card>
            <CardContent className="p-12">
              <div className="flex flex-col items-center justify-center">
                <Users className="w-16 h-16 text-neutral-300 mb-4" />
                <p className="text-lg font-medium text-neutral-900 mb-2 text-center">
                  {t("table.noUsers")}
                </p>
                <p className="text-sm text-neutral-500 text-center">
                  {t("table.noUsersDesc")}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pagination */}
      {pagination.total_pages > 1 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-neutral-600 text-center sm:text-left">
                {t("pagination.showing")}{" "}
                {(pagination.current_page - 1) * 10 + 1} -{" "}
                {Math.min(pagination.current_page * 10, pagination.total)}{" "}
                {t("pagination.of")} {pagination.total}
              </p>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(pagination.current_page - 1)}
                  disabled={pagination.current_page === 1}
                  className="p-2 rounded-lg border border-neutral-200 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </motion.button>
                <span className="text-sm text-neutral-600 min-w-[60px] text-center">
                  {pagination.current_page} / {pagination.total_pages}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(pagination.current_page + 1)}
                  disabled={pagination.current_page === pagination.total_pages}
                  className="p-2 rounded-lg border border-neutral-200 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      {selectedUser && (
        <>
          <UserDetailModal
            user={selectedUser}
            isOpen={showDetailModal}
            onClose={() => setShowDetailModal(false)}
            onEdit={() => {
              setShowDetailModal(false);
              handleEdit(selectedUser);
            }}
            onResetPassword={() => {
              setShowDetailModal(false);
              handleResetPassword(selectedUser);
            }}
          />
          <EditUserModal
            user={selectedUser}
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            onSuccess={handleActionComplete}
          />
          <ChangeStatusModal
            user={selectedUser}
            isOpen={showStatusModal}
            onClose={() => setShowStatusModal(false)}
            onSuccess={handleActionComplete}
          />
          <ChangeRoleModal
            user={selectedUser}
            isOpen={showRoleModal}
            onClose={() => setShowRoleModal(false)}
            onSuccess={handleActionComplete}
          />
          <ResetPasswordModal
            user={selectedUser}
            isOpen={showResetPasswordModal}
            onClose={() => setShowResetPasswordModal(false)}
            onSuccess={handleActionComplete}
          />
        </>
      )}

      <CreateUserModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleActionComplete}
      />
    </div>
  );
}
