"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { StoredOrder, OrderStatus } from "@/lib/store";

const FILTERS: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Fulfilled", value: "fulfilled" },
  { label: "Cancelled", value: "cancelled" },
];

const STATUS_STYLES: Record<string, string> = {
  pending:   "bg-amber-100 text-amber-700 border border-amber-200",
  confirmed: "bg-blue-100 text-blue-700 border border-blue-200",
  fulfilled: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  cancelled: "bg-red-100 text-red-500 border border-red-200",
};

const NEXT_STATUS: Record<OrderStatus, OrderStatus | null> = {
  pending:   "confirmed",
  confirmed: "fulfilled",
  fulfilled: null,
  cancelled: null,
};

const NEXT_LABEL: Record<OrderStatus, string> = {
  pending:   "Confirm",
  confirmed: "Mark Fulfilled",
  fulfilled: "",
  cancelled: "",
};

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function OrdersTable({ orders }: { orders: StoredOrder[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  async function updateStatus(orderId: string, status: OrderStatus) {
    setUpdating(orderId);
    try {
      await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status }),
      });
      router.refresh();
    } finally {
      setUpdating(null);
    }
  }

  const counts: Record<string, number> = { all: orders.length };
  FILTERS.slice(1).forEach((f) => {
    counts[f.value] = orders.filter((o) => o.status === f.value).length;
  });

  return (
    <div>
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              filter === f.value
                ? "bg-orange-500 text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300"
            }`}
          >
            {f.label}
            {counts[f.value] > 0 && (
              <span
                className={`text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none ${
                  filter === f.value ? "bg-white/30 text-white" : "bg-gray-100 text-gray-500"
                }`}
              >
                {counts[f.value]}
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center">
          <p className="text-gray-400 text-sm">No {filter === "all" ? "" : filter} orders</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => {
            const next = NEXT_STATUS[order.status];
            const isExpanded = expanded === order.orderId;
            return (
              <div
                key={order.orderId}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <div className="p-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900">{order.customer.name}</span>
                      <code className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-lg font-mono">
                        {order.orderId}
                      </code>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_STYLES[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {order.items.map((i) => `${i.name} (${i.size}) ×${i.quantity}`).join(" · ")}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-400">{formatDate(order.createdAt)}</span>
                      <span className="text-xs text-gray-300">·</span>
                      <span className="text-xs font-medium text-gray-500 capitalize">{order.orderType}</span>
                      {order.zone && (
                        <>
                          <span className="text-xs text-gray-300">·</span>
                          <span className="text-xs text-gray-500">{order.zone}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0 mr-2">
                    <p className="font-black text-gray-900 text-lg">{formatCurrency(order.total)}</p>
                    <p className="text-xs text-gray-400">{order.items.reduce((s, i) => s + i.quantity, 0)} item{order.items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => setExpanded(isExpanded ? null : order.orderId)}
                      className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg
                        className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {next && (
                      <button
                        onClick={() => updateStatus(order.orderId, next)}
                        disabled={updating === order.orderId}
                        className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap"
                      >
                        {updating === order.orderId ? "…" : NEXT_LABEL[order.status]}
                      </button>
                    )}

                    {order.status !== "cancelled" && order.status !== "fulfilled" && (
                      <button
                        onClick={() => updateStatus(order.orderId, "cancelled")}
                        disabled={updating === order.orderId}
                        className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-bold rounded-xl transition-colors disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-gray-100 px-4 py-4 bg-gray-50/50">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Customer</p>
                        <p className="text-gray-700">{order.customer.name}</p>
                        <p className="text-gray-500">{order.customer.email}</p>
                        {order.customer.phone && <p className="text-gray-500">{order.customer.phone}</p>}
                        {order.customer.address && <p className="text-gray-500 mt-1">{order.customer.address}</p>}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Items</p>
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-gray-700 py-0.5">
                            <span>{item.name} ({item.size}) ×{item.quantity}</span>
                            <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Summary</p>
                        <div className="space-y-1 text-gray-600">
                          <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(order.subtotal)}</span></div>
                          {order.deliveryFee > 0 && <div className="flex justify-between"><span>Delivery</span><span>{formatCurrency(order.deliveryFee)}</span></div>}
                          {order.serviceFee > 0 && <div className="flex justify-between"><span>Service fee</span><span>{formatCurrency(order.serviceFee)}</span></div>}
                          {order.tax > 0 && <div className="flex justify-between"><span>Tax</span><span>{formatCurrency(order.tax)}</span></div>}
                          {order.tip > 0 && <div className="flex justify-between"><span>Tip</span><span>{formatCurrency(order.tip)}</span></div>}
                          <div className="flex justify-between font-bold text-gray-900 pt-1 border-t border-gray-200"><span>Total</span><span>{formatCurrency(order.total)}</span></div>
                        </div>
                        {order.customer.notes && (
                          <div className="mt-3">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Note</p>
                            <p className="text-gray-600 italic text-xs">"{order.customer.notes}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <a
                        href={`mailto:${order.customer.email}?subject=Your Xubie Snacks Order ${order.orderId}`}
                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold rounded-xl transition-colors"
                      >
                        Email Customer
                      </a>
                      {order.customer.phone && (
                        <a
                          href={`https://wa.me/${order.customer.phone.replace(/\D/g, "")}?text=Hi ${order.customer.name}! Your Xubie Snacks order ${order.orderId} is ready.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 text-xs font-semibold rounded-xl transition-colors"
                        >
                          WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
