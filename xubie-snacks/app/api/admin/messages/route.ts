import { NextResponse } from "next/server";
import {
  getMessages,
  updateMessageStatus,
  type MessageStatus,
} from "@/lib/store";

export async function GET() {
  const messages = await getMessages();
  return NextResponse.json(messages);
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = (await request.json()) as {
      id: string;
      status: MessageStatus;
    };
    if (!id || !status) {
      return NextResponse.json(
        { error: "id and status are required" },
        { status: 400 }
      );
    }
    const updated = await updateMessageStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
