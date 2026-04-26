"""Order routes — create and track snack orders."""
from __future__ import annotations

import time
import uuid
from typing import Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter(prefix="/orders", tags=["orders"])


class OrderItem(BaseModel):
    product_id: int
    name: str
    price: float
    quantity: int = Field(ge=1)


class CustomerInfo(BaseModel):
    name: str = Field(min_length=1)
    email: str = Field(min_length=3)
    phone: Optional[str] = None
    address: Optional[str] = None
    notes: Optional[str] = None


class CreateOrderIn(BaseModel):
    items: list[OrderItem] = Field(min_length=1)
    customer: CustomerInfo


class OrderOut(BaseModel):
    order_id: str
    items: list[OrderItem]
    customer: CustomerInfo
    subtotal: float
    status: str
    created_at: str


# In-memory store (replace with DB in production)
_orders: dict[str, OrderOut] = {}


@router.post("", response_model=OrderOut, status_code=201)
def create_order(body: CreateOrderIn) -> OrderOut:
    order_id = f"XUB-{uuid.uuid4().hex[:8].upper()}"
    subtotal = sum(item.price * item.quantity for item in body.items)

    order = OrderOut(
        order_id=order_id,
        items=body.items,
        customer=body.customer,
        subtotal=round(subtotal, 2),
        status="confirmed",
        created_at=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    )
    _orders[order_id] = order
    return order


@router.get("/{order_id}", response_model=OrderOut)
def get_order(order_id: str) -> OrderOut:
    order = _orders.get(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order
