export interface DeliveryZone {
  id: string;
  name: string;
  description: string;
  fee: number;
  estimatedMinutes: [number, number];
  minimumOrder: number;
}

export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: "pickup",
    name: "Pickup",
    description: "2095 Fruitdale Ave, San Jose",
    fee: 0,
    estimatedMinutes: [15, 30],
    minimumOrder: 0,
  },
  {
    id: "south-bay",
    name: "South Bay",
    description: "San Jose, Santa Clara, Sunnyvale, Cupertino, Campbell, Los Gatos",
    fee: 3.99,
    estimatedMinutes: [25, 40],
    minimumOrder: 15,
  },
  {
    id: "peninsula",
    name: "Peninsula",
    description: "Mountain View, Palo Alto, Redwood City, San Mateo",
    fee: 5.99,
    estimatedMinutes: [35, 55],
    minimumOrder: 20,
  },
  {
    id: "east-bay",
    name: "East Bay",
    description: "Fremont, Newark, Milpitas, Hayward, Union City",
    fee: 7.99,
    estimatedMinutes: [40, 60],
    minimumOrder: 25,
  },
  {
    id: "sf-north",
    name: "SF / North Bay",
    description: "San Francisco, Daly City, Oakland, Berkeley",
    fee: 9.99,
    estimatedMinutes: [50, 75],
    minimumOrder: 30,
  },
];

export const SERVICE_FEE_RATE = 0.05;
export const SERVICE_FEE_CAP = 5.0;
export const SMALL_ORDER_THRESHOLD = 15;
export const SMALL_ORDER_FEE = 2.0;
export const TAX_RATE = 0.09375; // San Jose CA sales tax

export const TIP_PRESETS = [0, 0.1, 0.15, 0.2, 0.25];

export type OrderType = "pickup" | "delivery";

export interface OrderFees {
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  smallOrderFee: number;
  tax: number;
  tip: number;
  total: number;
}

export function calculateFees(
  subtotal: number,
  orderType: OrderType,
  zone: DeliveryZone | null,
  tipAmount: number
): OrderFees {
  const deliveryFee = orderType === "delivery" && zone ? zone.fee : 0;

  const rawServiceFee = subtotal * SERVICE_FEE_RATE;
  const serviceFee = Math.min(rawServiceFee, SERVICE_FEE_CAP);

  const smallOrderFee =
    subtotal < SMALL_ORDER_THRESHOLD && subtotal > 0 ? SMALL_ORDER_FEE : 0;

  const taxableAmount = subtotal + serviceFee;
  const tax = taxableAmount * TAX_RATE;

  const tip = tipAmount;

  const total = subtotal + deliveryFee + serviceFee + smallOrderFee + tax + tip;

  return {
    subtotal,
    deliveryFee,
    serviceFee,
    smallOrderFee,
    tax,
    tip,
    total,
  };
}

export function getZoneById(id: string): DeliveryZone | null {
  return DELIVERY_ZONES.find((z) => z.id === id) ?? null;
}

export function formatEstimate(zone: DeliveryZone): string {
  return `${zone.estimatedMinutes[0]}–${zone.estimatedMinutes[1]} min`;
}
