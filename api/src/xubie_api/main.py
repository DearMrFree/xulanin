"""Xubie Snacks API — FastAPI backend for orders, menu, and contact."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes.health import router as health_router
from .routes.menu import router as menu_router
from .routes.orders import router as orders_router
from .routes.contact import router as contact_router

app = FastAPI(
    title="Xubie Snacks API",
    description="Backend for Xubie Snacks — handcrafted snacks by Nina Lux (Xuliani LLC)",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://xulanin.com",
        "https://www.xulanin.com",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(menu_router, prefix="/api")
app.include_router(orders_router, prefix="/api")
app.include_router(contact_router, prefix="/api")
