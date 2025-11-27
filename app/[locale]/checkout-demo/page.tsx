"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckoutProvider } from "@/contexts/CheckoutContext";
import CartStep from "@/components/checkout/CartStep";
import AddressStep from "@/components/checkout/AddressStep";
import PaymentStep from "@/components/checkout/PaymentStep";
import OrderReviewStep from "@/components/checkout/OrderReviewStep";
import CheckoutSuccessStep from "@/components/checkout/CheckoutSuccessStep";
import CheckoutProgress from "@/components/checkout/CheckoutProgress";

type CheckoutStep = "cart" | "address" | "payment" | "review" | "success";

const DEMO_STEPS: { key: CheckoutStep; label: string }[] = [
  { key: "cart", label: "Cart Step" },
  { key: "address", label: "Address Step" },
  { key: "payment", label: "Payment Step" },
  { key: "review", label: "Review Step" },
  { key: "success", label: "Success Step" },
];

export default function CheckoutDemoPage() {
  const [selectedDemo, setSelectedDemo] = useState<CheckoutStep>("cart");

  return (
    <CheckoutProvider>
      <div className="min-h-screen bg-[#fdfbf5]">
        {/* Demo Controls */}
        <div className="bg-[#3b4417] text-white py-6 sticky top-0 z-50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl font-semibold mb-4 tracking-wide uppercase">
              🛒 Checkout Flow Demo
            </h1>
            <div className="flex flex-wrap gap-2">
              {DEMO_STEPS.map((step) => (
                <motion.button
                  key={step.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDemo(step.key)}
                  className={`px-6 py-2 text-sm tracking-wide uppercase transition-colors ${
                    selectedDemo === step.key
                      ? "bg-white text-[#3b4417]"
                      : "bg-[#2a2f18] text-white hover:bg-[#4c5b23]"
                  }`}
                >
                  {step.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Demo Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-8 bg-white p-6 border-2 border-[#d4af37]">
            <h2 className="text-xl font-semibold text-[#3b4417] mb-2">
              📋 Current Demo:{" "}
              {DEMO_STEPS.find((s) => s.key === selectedDemo)?.label}
            </h2>
            <p className="text-neutral-600">
              This is a demo page to showcase all checkout components
              individually. Use the buttons above to switch between different
              steps.
            </p>
          </div>

          <CheckoutProgress currentStep={selectedDemo} />

          <motion.div
            key={selectedDemo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {selectedDemo === "cart" && <CartStep />}
            {selectedDemo === "address" && <AddressStep />}
            {selectedDemo === "payment" && <PaymentStep />}
            {selectedDemo === "review" && <OrderReviewStep />}
            {selectedDemo === "success" && <CheckoutSuccessStep />}
          </motion.div>
        </div>

        {/* Feature List */}
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="bg-white p-8 border border-[#e8e6dc]">
            <h2 className="text-2xl font-semibold text-[#3b4417] mb-6 tracking-wide uppercase">
              ✨ Features Implemented
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Cart view with quantity management",
                "Remove items with slide animation",
                "Address selection & creation",
                "Payment method selection",
                "Promotion code validation",
                "Shipping fee calculation",
                "Order review & summary",
                "Success confirmation with confetti",
                "Progress indicator",
                "Loading states",
                "Empty states",
                "Responsive design",
                "Smooth animations",
                "Form validation",
                "Wine Store design language",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-2 p-3 bg-[#f5f3e8] border border-[#d4d6b4]"
                >
                  <span className="text-[#d4af37] text-lg">✓</span>
                  <span className="text-sm text-neutral-700">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mock Data Info */}
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="bg-[#f5f3e8] p-8 border border-[#d4d6b4]">
            <h2 className="text-2xl font-semibold text-[#3b4417] mb-4 tracking-wide uppercase">
              🎭 Mock Data
            </h2>
            <div className="space-y-4 text-sm text-neutral-700">
              <div>
                <h3 className="font-semibold text-[#3b4417] mb-2">
                  Cart Items:
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Rượu Vang Đỏ Château Margaux 2015 - 15,000,000₫ x 2</li>
                  <li>Rượu Vang Trắng Chardonnay Reserve - 3,500,000₫ x 1</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#3b4417] mb-2">
                  Addresses:
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>123 Nguyễn Huệ, Quận 1, TP. HCM (Default)</li>
                  <li>456 Lê Lợi, Quận 1, TP. HCM</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#3b4417] mb-2">
                  Payment Methods:
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>COD - Thanh toán khi nhận hàng</li>
                  <li>VNPAY - Thanh toán online</li>
                  <li>MoMo - Ví điện tử</li>
                  <li>Bank Transfer - Chuyển khoản</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#3b4417] mb-2">
                  Promotion Code:
                </h3>
                <p className="ml-4">
                  Use code{" "}
                  <span className="font-mono bg-white px-2 py-1 border border-[#d4d6b4]">
                    SUMMER2024
                  </span>{" "}
                  for 5% discount
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="bg-white p-8 border border-[#e8e6dc]">
            <h2 className="text-2xl font-semibold text-[#3b4417] mb-6 tracking-wide uppercase">
              🛠️ Tech Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Next.js 14", desc: "React Framework" },
                { name: "TypeScript", desc: "Type Safety" },
                { name: "Framer Motion", desc: "Animations" },
                { name: "Tailwind CSS", desc: "Styling" },
                { name: "Context API", desc: "State Management" },
                { name: "React Confetti", desc: "Success Effect" },
                { name: "Lucide Icons", desc: "Icon Library" },
                { name: "Mock API", desc: "Data Simulation" },
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-[#f5f3e8] border border-[#d4d6b4] text-center"
                >
                  <h3 className="font-semibold text-[#3b4417] mb-1">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-neutral-600">{tech.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CheckoutProvider>
  );
}
