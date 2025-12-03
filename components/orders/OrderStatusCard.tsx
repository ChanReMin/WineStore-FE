"use client";

import { ORDER_STATUS } from "@/types/order";
import { formatCurrency } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface OrderStatusCardProps {
  status: number;
  totalAmount: number;
  paymentMethod: string;
  isPaid: boolean;
  orderCode: string;
  onPaymentClick?: () => void;
  onCancelClick?: () => void;
  onViewDetailClick?: () => void;
}

export default function OrderStatusCard({
  status,
  totalAmount,
  paymentMethod,
  isPaid,
  orderCode,
  onPaymentClick,
  onCancelClick,
  onViewDetailClick,
}: OrderStatusCardProps) {
  const t = useTranslations("orders.statusCard");

  const getStatusUI = () => {
    switch (status) {
      case ORDER_STATUS.PENDING:
        return {
          gradient: "from-yellow-400 to-orange-500",
          icon: "⏳",
          title: t("pendingTitle"),
          description: t("pendingDesc"),
          action: t("cancelAction"),
          actionColor: "bg-white/20 hover:bg-white/30",
          onActionClick: onCancelClick,
        };

      case ORDER_STATUS.CONFIRMED:
        return {
          gradient: "from-blue-400 to-indigo-500",
          icon: "✅",
          title: t("confirmedTitle"),
          description: t("confirmedDesc"),
          action: t("payAction"),
          actionColor:
            "bg-white text-blue-600 hover:bg-white/90 font-bold animate-pulse",
          onActionClick: onPaymentClick,
        };

      case ORDER_STATUS.PAID:
        return {
          gradient: "from-green-400 to-emerald-500",
          icon: "🎉",
          title: t("paidTitle"),
          description: t("paidDesc"),
          action: t("viewAction"),
          actionColor: "bg-white/20 hover:bg-white/30",
          onActionClick: onViewDetailClick,
        };

      case ORDER_STATUS.CANCELLED:
        return {
          gradient: "from-red-400 to-rose-500",
          icon: "❌",
          title: t("cancelledTitle"),
          description: t("cancelledDesc"),
          action: t("reorderAction"),
          actionColor: "bg-white/20 hover:bg-white/30",
          onActionClick: undefined,
        };

      default:
        return {
          gradient: "from-gray-400 to-gray-500",
          icon: "❓",
          title: t("unknownTitle"),
          description: t("unknownDesc"),
          action: t("viewAction"),
          actionColor: "bg-white/20 hover:bg-white/30",
          onActionClick: onViewDetailClick,
        };
    }
  };

  const statusUI = getStatusUI();

  return (
    <div
      className={`
      bg-linear-to-r ${statusUI.gradient} 
      text-white p-6 rounded-xl shadow-lg
      transition-all duration-300 hover:shadow-2xl
    `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{statusUI.icon}</span>
          <div>
            <h3 className="text-2xl font-bold">{statusUI.title}</h3>
            <p className="text-white/90 text-sm mt-1">{statusUI.description}</p>
          </div>
        </div>
      </div>

      {/* Order Info */}
      <div className="bg-white/10 rounded-lg p-4 mb-4 backdrop-blur-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-white/70 text-xs mb-1">{t("orderCodeLabel")}</p>
            <p className="font-mono font-bold">{orderCode}</p>
          </div>
          <div>
            <p className="text-white/70 text-xs mb-1">{t("totalLabel")}</p>
            <p className="font-bold text-lg">{formatCurrency(totalAmount)}</p>
          </div>
          <div>
            <p className="text-white/70 text-xs mb-1">{t("paymentLabel")}</p>
            <p className="font-semibold">{paymentMethod}</p>
          </div>
          <div>
            <p className="text-white/70 text-xs mb-1">{t("statusLabel")}</p>
            <p className="font-semibold">
              {isPaid ? t("paidStatus") : t("unpaidStatus")}
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      {statusUI.onActionClick && (
        <button
          onClick={statusUI.onActionClick}
          className={`
            w-full py-3 rounded-lg font-medium transition-all
            ${statusUI.actionColor}
          `}
        >
          {statusUI.action}
        </button>
      )}

      {/* Progress Bar */}
      <div className="mt-4 bg-white/20 rounded-full h-2 overflow-hidden">
        <div
          className="bg-white h-full rounded-full transition-all duration-500"
          style={{
            width: `${status === ORDER_STATUS.CANCELLED ? 0 : ((status - 1) / 2) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
