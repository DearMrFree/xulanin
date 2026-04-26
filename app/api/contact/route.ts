import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, inquiryType, message } = body;

    if (!name || !email || !inquiryType || !message) {
      return NextResponse.json(
        { error: "Name, email, inquiry type, and message are required." },
        { status: 400 }
      );
    }

    // Log the contact submission (in production, send to email/CRM)
    console.log("[Contact]", { name, email, inquiryType, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
