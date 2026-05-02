import { NextResponse } from "next/server";
import { saveOrder } from "@/lib/store";
import type { StoredOrderItem } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customer, orderType, zone, subtotal, deliveryFee, serviceFee, tax, tip, total } = body as {
      items: StoredOrderItem[];
      customer: {
        name: string;
        email: string;
        phone: string;
        address: string;
        notes: string;
      };
      orderType?: string;
      zone?: string;
      subtotal?: number;
      deliveryFee?: number;
      serviceFee?: number;
      tax?: number;
      tip?: number;
      total?: number;
    };

    if (!items || items.length === 0 || !customer?.name || !customer?.email) {
      return NextResponse.json(
        { error: "Items and customer info (name, email) are required." },
        { status: 400 }
      );
    }

    const computedTotal =
      total ??
      items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const orderId = `XUB-${Date.now().toString(36).toUpperCase()}`;

    await saveOrder({
      orderId,
      items,
      customer,
      orderType: (orderType as "pickup" | "delivery") ?? "pickup",
      zone,
      subtotal: subtotal ?? computedTotal,
      deliveryFee: deliveryFee ?? 0,
      serviceFee: serviceFee ?? 0,
      tax: tax ?? 0,
      tip: tip ?? 0,
      total: computedTotal,
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      orderId,
      total: computedTotal,
      message: `Order ${orderId} confirmed! Total: $${computedTotal.toFixed(2)}`,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
