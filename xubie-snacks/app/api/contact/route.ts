import { NextResponse } from "next/server";
import { saveMessage } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, inquiryType, message } = body as {
      name: string;
      email: string;
      phone?: string;
      inquiryType: string;
      message: string;
    };

    if (!name || !email || !inquiryType || !message) {
      return NextResponse.json(
        { error: "Name, email, inquiry type, and message are required." },
        { status: 400 }
      );
    }

    const id = `MSG-${Date.now().toString(36).toUpperCase()}`;

    await saveMessage({
      id,
      name,
      email,
      phone: phone ?? "",
      inquiryType,
      message,
      status: "new",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
