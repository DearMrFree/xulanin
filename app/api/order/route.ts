import { NextResponse } from "next/server";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customer } = body as {
      items: OrderItem[];
      customer: {
        name: string;
        email: string;
        phone: string;
        address: string;
        notes: string;
      };
    };

    if (
      !items ||
      items.length === 0 ||
      !customer?.name ||
      !customer?.email
    ) {
      return NextResponse.json(
        { error: "Items and customer info (name, email) are required." },
        { status: 400 }
      );
    }

    const total = items.reduce(
      (sum: number, item: OrderItem) => sum + item.price * item.quantity,
      0
    );

    const orderId = `XUB-${Date.now().toString(36).toUpperCase()}`;

    // Log the order (in production, persist to DB / send to fulfillment)
    console.log("[Order]", {
      orderId,
      items,
      customer,
      total,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      orderId,
      total,
      message: `Order ${orderId} confirmed! Total: $${total.toFixed(2)}`,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
