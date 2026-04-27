'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { Product } from '@/lib/products'
import { Plus, ShoppingCart } from 'lucide-react'

interface ProductsGridProps {
  products: Product[]
}

export function ProductsGrid({ products }: ProductsGridProps) {
  const { addItem } = useCart()
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    })
    setSelectedProduct(product.id)
    setTimeout(() => setSelectedProduct(null), 1500)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
        >
          {/* Image */}
          <div className="relative h-64 w-full overflow-hidden bg-secondary">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-primary text-xs uppercase tracking-widest mb-2">{product.category}</p>
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <p className="text-muted-foreground text-sm mb-6">{product.description}</p>

            {/* Price and Quantity */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-2xl font-bold text-primary">${product.price}</p>
              <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
                <button
                  onClick={() =>
                    setQuantities((prev) => ({
                      ...prev,
                      [product.id]: Math.max(1, (prev[product.id] || 1) - 1),
                    }))
                  }
                  className="text-foreground hover:text-primary transition-colors"
                >
                  −
                </button>
                <span className="w-6 text-center font-semibold">{quantities[product.id] || 1}</span>
                <button
                  onClick={() =>
                    setQuantities((prev) => ({
                      ...prev,
                      [product.id]: (prev[product.id] || 1) + 1,
                    }))
                  }
                  className="text-foreground hover:text-primary transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={() => handleAddToCart(product)}
              className={`w-full transition-all duration-300 ${
                selectedProduct === product.id
                  ? 'bg-primary/80'
                  : 'bg-primary hover:bg-primary/90'
              }`}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {selectedProduct === product.id ? 'Added!' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
