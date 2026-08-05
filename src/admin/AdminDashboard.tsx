import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { WarrantyRegistration, ContactMessage } from "../lib/types";
import { getAdminSession } from "./adminAuth";
import {
  Package,
  Shield,
  MessageSquare,
  Bell,
  Loader2,
} from "lucide-react";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalWarranties, setTotalWarranties] = useState(0);
  const [totalMessages, setTotalMessages] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [recentWarranties, setRecentWarranties] = useState<WarrantyRegistration[]>([]);
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    async function fetchDashboard() {
      setLoading(true);

      const session = getAdminSession();
      const username = session?.username || "";
      const hash = localStorage.getItem("p2g_admin_hash") || "";

      try {
        const { data, error } = await supabase.rpc("admin_dashboard_stats", {
          p_username: username,
          p_password_hash: hash,
        });

        if (error) throw error;

        if (data) {
          setTotalProducts(data.total_products ?? 0);
          setTotalWarranties(data.total_warranties ?? 0);
          setTotalMessages(data.total_messages ?? 0);
          setUnreadMessages(data.unread_messages ?? 0);
          setRecentWarranties((data.recent_warranties as WarrantyRegistration[]) ?? []);
          setRecentMessages((data.recent_messages as ContactMessage[]) ?? []);
        }
      } catch (err) {
        console.error("Failed to load dashboard statistics:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const stats = [
    {
      label: "Total Products",
      value: totalProducts,
      icon: Package,
      bg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      label: "Warranty Registrations",
      value: totalWarranties,
      icon: Shield,
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Total Messages",
      value: totalMessages,
      icon: MessageSquare,
      bg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      label: "Unread Messages",
      value: unreadMessages,
      icon: Bell,
      bg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back, admin</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg border border-gray-200 p-6 flex items-center gap-4"
          >
            <div className={`${stat.bg} p-3 rounded-lg`}>
              <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Warranty Registrations
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-gray-500">
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Product</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentWarranties.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                      No warranty registrations yet.
                    </td>
                  </tr>
                ) : (
                  recentWarranties.map((w) => (
                    <tr key={w.id} className="border-b border-gray-50 last:border-0">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {w.full_name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{w.product_model}</td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(w.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            w.warranty_status === "approved"
                              ? "bg-green-100 text-green-700"
                              : w.warranty_status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {w.warranty_status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Messages
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-gray-500">
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Read</th>
                </tr>
              </thead>
              <tbody>
                {recentMessages.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                      No messages yet.
                    </td>
                  </tr>
                ) : (
                  recentMessages.map((m) => (
                    <tr key={m.id} className="border-b border-gray-50 last:border-0">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {m.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{m.email}</td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(m.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            m.is_read
                              ? "bg-gray-100 text-gray-600"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {m.is_read ? "Read" : "Unread"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
