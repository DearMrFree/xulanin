"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { StoredMessage, MessageStatus } from "@/lib/store";

const STATUS_STYLES: Record<string, string> = {
  new:     "bg-blue-100 text-blue-700 border border-blue-200",
  read:    "bg-gray-100 text-gray-600 border border-gray-200",
  replied: "bg-emerald-100 text-emerald-700 border border-emerald-200",
};

const INQUIRY_COLORS: Record<string, string> = {
  "Place a Custom Order":      "bg-orange-100 text-orange-700",
  "Corporate / Event Catering":"bg-purple-100 text-purple-700",
  "Wholesale Partnership":     "bg-indigo-100 text-indigo-700",
  "Feedback / Suggestion":     "bg-emerald-100 text-emerald-700",
  "Press / Media":             "bg-pink-100 text-pink-700",
  "General Inquiry":           "bg-gray-100 text-gray-600",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const FILTERS = [
  { label: "All",     value: "all" },
  { label: "New",     value: "new" },
  { label: "Read",    value: "read" },
  { label: "Replied", value: "replied" },
];

export default function MessagesList({ messages }: { messages: StoredMessage[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState<string | null>(null);

  const filtered =
    filter === "all" ? messages : messages.filter((m) => m.status === filter);

  const counts: Record<string, number> = { all: messages.length };
  FILTERS.slice(1).forEach((f) => {
    counts[f.value] = messages.filter((m) => m.status === f.value).length;
  });

  async function updateStatus(id: string, status: MessageStatus) {
    setUpdating(id);
    try {
      await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      router.refresh();
    } finally {
      setUpdating(null);
    }
  }

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
          <p className="text-gray-400 text-sm">No {filter === "all" ? "" : filter} messages</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${
                msg.status === "new" ? "border-blue-200 shadow-blue-50" : "border-gray-100"
              }`}
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                      {msg.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-gray-900">{msg.name}</p>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_STYLES[msg.status]}`}
                        >
                          {msg.status}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${INQUIRY_COLORS[msg.inquiryType] ?? "bg-gray-100 text-gray-600"}`}
                        >
                          {msg.inquiryType}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {msg.email}{msg.phone ? ` · ${msg.phone}` : ""} · {formatDate(msg.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
                  {msg.message}
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <a
                    href={`mailto:${msg.email}?subject=Re: Your inquiry to Xubie Snacks`}
                    onClick={() => msg.status === "new" && updateStatus(msg.id, "replied")}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    Reply via Email
                  </a>
                  {msg.phone && (
                    <a
                      href={`https://wa.me/${msg.phone.replace(/\D/g, "")}?text=Hi ${msg.name}! Thanks for reaching out to Xubie Snacks.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => msg.status === "new" && updateStatus(msg.id, "replied")}
                      className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-xl transition-colors"
                    >
                      WhatsApp Reply
                    </a>
                  )}
                  {msg.status === "new" && (
                    <button
                      onClick={() => updateStatus(msg.id, "read")}
                      disabled={updating === msg.id}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold rounded-xl transition-colors disabled:opacity-50"
                    >
                      {updating === msg.id ? "…" : "Mark as Read"}
                    </button>
                  )}
                  {msg.status === "read" && (
                    <button
                      onClick={() => updateStatus(msg.id, "replied")}
                      disabled={updating === msg.id}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold rounded-xl transition-colors disabled:opacity-50"
                    >
                      {updating === msg.id ? "…" : "Mark as Replied"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
