import { getOrders } from "@/lib/store";
import OrdersTable from "./orders-table";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Orders</h1>
          <p className="text-gray-500 text-sm mt-1">
            {orders.length} total · {orders.filter((o) => o.status === "pending").length} pending action
          </p>
        </div>
      </div>
      <OrdersTable orders={orders} />
    </div>
  );
}
