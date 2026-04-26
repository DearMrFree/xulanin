"""Menu routes — product catalog for Xubie Snacks."""
from __future__ import annotations

from typing import Optional

from fastapi import APIRouter, Query
from pydantic import BaseModel

router = APIRouter(prefix="/menu", tags=["menu"])


class Product(BaseModel):
    id: int
    name: str
    category: str
    price: float
    description: str
    tags: list[str]


class Category(BaseModel):
    id: str
    name: str
    description: str


CATEGORIES: list[Category] = [
    Category(id="signature", name="Signature Drops", description="The items people recognize from the booth first"),
    Category(id="sweet", name="Sweets & Treats", description="Dessert-forward favorites with serious repeat energy"),
    Category(id="savory", name="Savory Crunch", description="Salty, spicy, snackable counterpoints to the sweets"),
    Category(id="wellness", name="Feel-Good Bites", description="Lighter options that still feel unmistakably Xubie"),
    Category(id="seasonal", name="Pop-Up Specials", description="Limited runs inspired by events, weekends, and crowd favorites"),
]

PRODUCTS: list[Product] = [
    Product(id=1, name="Banana Pudding Cup", category="signature", price=8, description="Creamy, layered, and instantly recognizable from the booth. The cup that keeps showing up in reaction videos and repeat orders.", tags=["bestseller", "crowd-favorite"]),
    Product(id=2, name="Xubie Cake Slice", category="signature", price=6, description="The namesake dessert with full brand energy — soft, sweet, and built to make first-time tasters believers.", tags=["bestseller", "signature"]),
    Product(id=3, name="Peach Cobbler Jar", category="sweet", price=9.5, description="Warm-spiced peaches layered into a grab-and-go dessert jar that feels like comfort food at pop-up speed.", tags=["new"]),
    Product(id=4, name="Cookies & Cream Pudding Cup", category="sweet", price=8.5, description="A chilled dessert cup with creamy texture, cookie crunch, and the kind of sweetness that photographs beautifully.", tags=["customer-loved"]),
    Product(id=5, name="Hot Honey Plantain Crunch", category="savory", price=7, description="Sweet heat and a crisp finish — the perfect snack-table balance when the dessert cups are selling out fast.", tags=["spicy", "gluten-free"]),
    Product(id=6, name="Chili Lime Party Mix", category="savory", price=7.5, description="A tangy, salty mix built for sharing at events, creative sessions, and late-night Bay Area linkups.", tags=["gluten-free"]),
    Product(id=7, name="Coconut Date Energy Bites", category="wellness", price=9, description="Naturally sweet bites with a softer energy profile for customers who want the feel-good side of the brand.", tags=["vegan", "gluten-free"]),
    Product(id=8, name="Citrus Ginger Fruit Cup", category="wellness", price=8, description="Bright, fresh, and clean — a cooler counterpoint to richer desserts without losing the handcrafted feel.", tags=["vegan"]),
    Product(id=9, name="Lake Merritt Sunday Box", category="seasonal", price=18, description="A weekend-only combo inspired by the booth moments and reel captions that helped the brand catch fire.", tags=["seasonal", "limited"]),
    Product(id=10, name="Vendor Table Treat Tray", category="seasonal", price=28, description="Designed for gatherings, birthdays, and community tables that want the full Xubie visual spread.", tags=["seasonal", "preorder"]),
    Product(id=11, name="Mini Dessert Flight", category="sweet", price=14, description="A tasting set for anyone deciding between pudding, cake, and whatever else is moving at the booth that day.", tags=["new"]),
    Product(id=12, name="Celebration Crowd Pack", category="signature", price=32, description="A larger-format order for creators, families, and event hosts who want the Xubie table to feel instantly stocked.", tags=["custom"]),
]


@router.get("/products", response_model=list[Product])
def list_products(category: Optional[str] = Query(None)) -> list[Product]:
    if category:
        return [p for p in PRODUCTS if p.category == category]
    return PRODUCTS


@router.get("/products/{product_id}", response_model=Product)
def get_product(product_id: int) -> Product:
    for p in PRODUCTS:
        if p.id == product_id:
            return p
    from fastapi import HTTPException
    raise HTTPException(status_code=404, detail="Product not found")


@router.get("/categories", response_model=list[Category])
def list_categories() -> list[Category]:
    return CATEGORIES
