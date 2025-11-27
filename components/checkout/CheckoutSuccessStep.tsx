"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Package, Mail, Home } from "lucide-react";
import { useCheckout } from "@/contexts/CheckoutContext";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

export default function CheckoutSuccessStep() {
  const { orderId, resetCheckout } = useCheckout();
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleGoHome = () => {
    resetCheckout();
    window.location.href = "/";
  };

  const handleViewOrders = () => {
    resetCheckout();
    window.location.href = "/profile/orders";
  };

  return (
    <div className="min-h-[600px] flex items-center justify-center">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={["#3b4417", "#d4af37", "#f5f3e8", "#5a6b2a"]}
        />
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-block mb-6"
        >
          <CheckCircle2
            size={100}
            className="text-green-500"
            strokeWidth={1.5}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-semibold text-[#3b4417] mb-4 tracking-wide uppercase"
        >
          Đặt hàng thành công!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-neutral-600 mb-2"
        >
          Cảm ơn bạn đã tin tưởng và mua sắm tại Wine Store
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="inline-block bg-[#f5f3e8] px-6 py-3 border border-[#d4d6b4] mb-8"
        >
          <p className="text-sm text-neutral-600 mb-1">Mã đơn hàng của bạn:</p>
          <p className="text-2xl font-bold text-[#3b4417] tracking-wider">
            {orderId}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          <div className="bg-white p-6 border border-[#e8e6dc]">
            <Package
              size={40}
              className="text-[#3b4417] mx-auto mb-3"
              strokeWidth={1.5}
            />
            <h3 className="font-semibold text-[#3b4417] mb-2">Đang xử lý</h3>
            <p className="text-sm text-neutral-600">
              Đơn hàng của bạn đang được chuẩn bị
            </p>
          </div>

          <div className="bg-white p-6 border border-[#e8e6dc]">
            <Mail
              size={40}
              className="text-[#3b4417] mx-auto mb-3"
              strokeWidth={1.5}
            />
            <h3 className="font-semibold text-[#3b4417] mb-2">
              Email xác nhận
            </h3>
            <p className="text-sm text-neutral-600">
              Chúng tôi đã gửi email xác nhận đơn hàng
            </p>
          </div>

          <div className="bg-white p-6 border border-[#e8e6dc]">
            <Home
              size={40}
              className="text-[#3b4417] mx-auto mb-3"
              strokeWidth={1.5}
            />
            <h3 className="font-semibold text-[#3b4417] mb-2">Giao hàng</h3>
            <p className="text-sm text-neutral-600">
              Dự kiến giao trong 3-5 ngày làm việc
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewOrders}
            className="bg-[#3b4417] text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#2a2f18] transition-colors"
          >
            Xem đơn hàng
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoHome}
            className="border-2 border-[#d4d6b4] text-[#3b4417] px-8 py-4 text-sm tracking-widest uppercase hover:border-[#3b4417] hover:bg-[#f5f3e8] transition-colors"
          >
            Về trang chủ
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
