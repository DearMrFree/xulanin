import { getOrders, getMessages } from "@/lib/store";
import Sidebar from "./components/sidebar";

export const metadata = { title: "Admin — Xubie Snacks" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [orders, messages] = await Promise.all([getOrders(), getMessages()]);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const newMessages = messages.filter((m) => m.status === "new").length;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar pendingOrders={pendingOrders} newMessages={newMessages} />

      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        <div className="flex-1 p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
