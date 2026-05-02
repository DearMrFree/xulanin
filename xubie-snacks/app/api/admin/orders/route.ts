import { NextResponse } from "next/server";
import {
  getOrders,
  updateOrderStatus,
  type OrderStatus,
} from "@/lib/store";

export async function GET() {
  const orders = await getOrders();
  return NextResponse.json(orders);
}

export async function PATCH(request: Request) {
  try {
    const { orderId, status } = (await request.json()) as {
      orderId: string;
      status: OrderStatus;
    };
    if (!orderId || !status) {
      return NextResponse.json(
        { error: "orderId and status are required" },
        { status: 400 }
      );
    }
    const updated = await updateOrderStatus(orderId, status);
    if (!updated) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
