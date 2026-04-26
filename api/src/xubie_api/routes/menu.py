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
    Category(id="signature", name="Signature Collection", description="Our most-loved creations"),
    Category(id="sweet", name="Sweet Bites", description="Indulgent treats"),
    Category(id="savory", name="Savory Crunch", description="Bold flavors"),
    Category(id="wellness", name="Wellness Bites", description="Nourishing snacks"),
    Category(id="seasonal", name="Seasonal Specials", description="Limited-edition"),
]

PRODUCTS: list[Product] = [
    Product(id=1, name="Golden Crunch Mix", category="signature", price=8.99, description="Signature trail mix with roasted almonds, golden raisins, dark chocolate chips, and sea salt.", tags=["bestseller", "vegan"]),
    Product(id=2, name="Spiced Plantain Chips", category="signature", price=6.99, description="Thinly sliced plantains with our secret spice blend.", tags=["bestseller", "gluten-free"]),
    Product(id=3, name="Honey Lavender Granola Bites", category="sweet", price=9.99, description="Clusters of oats, honey, and dried lavender.", tags=["new"]),
    Product(id=4, name="Cocoa Cashew Clusters", category="sweet", price=10.99, description="Dark cocoa dusted over toasted cashew clusters.", tags=["vegan"]),
    Product(id=5, name="Chili Lime Peanuts", category="savory", price=5.99, description="Roasted peanuts with chili powder and lime zest.", tags=["gluten-free", "spicy"]),
    Product(id=6, name="Rosemary Parmesan Crackers", category="savory", price=7.99, description="Artisan crackers with fresh rosemary and aged parmesan.", tags=["new"]),
    Product(id=7, name="Turmeric Ginger Energy Balls", category="wellness", price=11.99, description="Turmeric, ginger, oats, and dates energy bites.", tags=["vegan", "gluten-free"]),
    Product(id=8, name="Matcha Coconut Bites", category="wellness", price=10.99, description="Ceremonial-grade matcha meets toasted coconut.", tags=["vegan"]),
    Product(id=9, name="Maple Pecan Brittle", category="seasonal", price=12.99, description="Vermont maple syrup and toasted pecans brittle.", tags=["seasonal", "limited"]),
    Product(id=10, name="Strawberry Basil Fruit Leather", category="seasonal", price=8.99, description="Sun-ripened strawberries and fresh basil fruit leather.", tags=["seasonal", "vegan"]),
    Product(id=11, name="Everything Bagel Nut Mix", category="savory", price=7.49, description="Almonds, cashews, pumpkin seeds with everything bagel seasoning.", tags=["bestseller"]),
    Product(id=12, name="Vanilla Bean Caramel Corn", category="sweet", price=9.49, description="Caramel corn with real vanilla bean and fleur de sel.", tags=["new"]),
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
