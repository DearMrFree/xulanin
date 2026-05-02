import { getMessages } from "@/lib/store";
import MessagesList from "./messages-list";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const messages = await getMessages();
  const newCount = messages.filter((m) => m.status === "new").length;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">Messages</h1>
        <p className="text-gray-500 text-sm mt-1">
          {messages.length} total{newCount > 0 ? ` · ${newCount} need a reply` : " · all caught up!"}
        </p>
      </div>
      <MessagesList messages={messages} />
    </div>
  );
}
