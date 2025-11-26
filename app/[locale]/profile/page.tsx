"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { profileService } from "@/services/profileService";
import type { CustomerProfile, Address } from "@/types/profile";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import ChangePasswordModal from "@/components/profile/ChangePasswordModal";
import AddressCard from "@/components/profile/AddressCard";
import AddressModal from "@/components/profile/AddressModal";
import ProfileSkeleton from "@/components/profile/ProfileSkeleton";

export default function ProfilePage() {
  const t = useTranslations("profile");
  const tSecurity = useTranslations("profile.security");
  const tAddresses = useTranslations("profile.addresses");
  const tTabs = useTranslations("profile.tabs");
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [activeTab, setActiveTab] = useState<
    "profile" | "addresses" | "orders"
  >("profile");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Wait for auth state to hydrate from localStorage
    setIsCheckingAuth(false);
  }, []);

  useEffect(() => {
    if (isCheckingAuth) return; // Wait for auth check to complete

    if (!isAuthenticated) {
      router.push("/");
      return;
    }

    loadData();
  }, [isAuthenticated, router, isCheckingAuth]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [profileData, addressesData] = await Promise.all([
        profileService.getProfile(),
        profileService.getAddresses(),
      ]);
      setProfile(profileData);
      setAddresses(addressesData);
    } catch (error) {
      toast.error(t("loadError"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAddress = async (id: number) => {
    if (!confirm(tAddresses("card.deleteConfirm"))) return;

    try {
      await profileService.deleteAddress(id);
      setAddresses(addresses.filter((addr) => addr.id !== id));
      toast.success(tAddresses("card.deleteSuccess"));
    } catch (error) {
      toast.error(tAddresses("card.deleteError"));
    }
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setIsAddressModalOpen(true);
  };

  const handleAddressModalClose = () => {
    setIsAddressModalOpen(false);
    setEditingAddress(null);
  };

  // Show skeleton while checking auth or loading data
  if (isCheckingAuth || isLoading) {
    return <ProfileSkeleton />;
  }

  // If not authenticated after check, don't render anything (will redirect)
  if (!isAuthenticated || !profile) return null;

  return (
    <div className="min-h-screen bg-amber-50 py-12">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <ProfileHeader profile={profile} />

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex gap-4 border-b border-neutral-200"
        >
          <button
            onClick={() => setActiveTab("profile")}
            className={`relative px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === "profile"
                ? "text-[#33391d]"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            {tTabs("personalInfo")}
            {activeTab === "profile" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#33391d]"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("addresses")}
            className={`relative px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === "addresses"
                ? "text-[#33391d]"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            {tTabs("addresses")}
            {activeTab === "addresses" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#33391d]"
              />
            )}
          </button>
          <button
            onClick={() => router.push("/profile/orders")}
            className="relative px-6 py-3 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
          >
            {tTabs("myOrders")}
          </button>
        </motion.div>

        {/* Content */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {activeTab === "profile" ? (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <ProfileForm profile={profile} onUpdate={setProfile} />

                {/* Change Password Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="mb-2 text-lg font-semibold text-[#33391d]">
                    {tSecurity("title")}
                  </h3>
                  <p className="mb-4 text-sm text-neutral-600">
                    {tSecurity("description")}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsPasswordModalOpen(true)}
                    className="rounded-md border border-[#33391d] px-6 py-2 text-sm text-[#33391d] transition-colors hover:bg-[#33391d] hover:text-white"
                  >
                    {tSecurity("changePassword")}
                  </motion.button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="addresses"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Add Address Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 flex justify-end"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setEditingAddress(null);
                      setIsAddressModalOpen(true);
                    }}
                    className="flex items-center gap-2 rounded-md bg-[#33391d] px-6 py-2.5 text-white transition-colors hover:bg-[#2a2f18]"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    {tAddresses("addNew")}
                  </motion.button>
                </motion.div>

                {/* Address List */}
                {addresses.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-lg border border-neutral-200 bg-white p-12 text-center shadow-sm"
                  >
                    <svg
                      className="mx-auto h-16 w-16 text-neutral-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-neutral-900">
                      {tAddresses("empty.title")}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600">
                      {tAddresses("empty.description")}
                    </p>
                  </motion.div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {addresses.map((address) => (
                      <AddressCard
                        key={address.id}
                        address={address}
                        onEdit={handleEditAddress}
                        onDelete={handleDeleteAddress}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modals */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={handleAddressModalClose}
        onSuccess={loadData}
        editAddress={editingAddress}
      />
    </div>
  );
}
