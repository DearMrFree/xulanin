import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(filename: string, defaultValue: T): Promise<T> {
  await ensureDir();
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, filename), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

async function writeJson<T>(filename: string, data: T): Promise<void> {
  await ensureDir();
  await fs.writeFile(
    path.join(DATA_DIR, filename),
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

export type OrderStatus = "pending" | "confirmed" | "fulfilled" | "cancelled";
export type OrderType = "pickup" | "delivery";

export interface StoredOrderItem {
  id: number;
  name: string;
  size: string;
  price: number;
  quantity: number;
}

export interface StoredOrder {
  orderId: string;
  items: StoredOrderItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    notes: string;
  };
  orderType: OrderType;
  zone?: string;
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  tax: number;
  tip: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export type MessageStatus = "new" | "read" | "replied";

export interface StoredMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
}

export async function getOrders(): Promise<StoredOrder[]> {
  return readJson<StoredOrder[]>("orders.json", []);
}

export async function saveOrder(order: StoredOrder): Promise<void> {
  const orders = await getOrders();
  orders.unshift(order);
  await writeJson("orders.json", orders);
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<boolean> {
  const orders = await getOrders();
  const idx = orders.findIndex((o) => o.orderId === orderId);
  if (idx === -1) return false;
  orders[idx].status = status;
  await writeJson("orders.json", orders);
  return true;
}

export async function getMessages(): Promise<StoredMessage[]> {
  return readJson<StoredMessage[]>("messages.json", []);
}

export async function saveMessage(msg: StoredMessage): Promise<void> {
  const messages = await getMessages();
  messages.unshift(msg);
  await writeJson("messages.json", messages);
}

export async function updateMessageStatus(
  id: string,
  status: MessageStatus
): Promise<boolean> {
  const messages = await getMessages();
  const idx = messages.findIndex((m) => m.id === id);
  if (idx === -1) return false;
  messages[idx].status = status;
  await writeJson("messages.json", messages);
  return true;
}
