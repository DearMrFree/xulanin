'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductsGrid } from '@/components/products-grid'
import { CartSidebar } from '@/components/cart-sidebar'
import { products } from '@/lib/products'

const categories = ['all', 'cookies', 'cakes', 'pudding']

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory)

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="text-foreground">ORDER</span> <span className="text-primary">NOW</span>
          </h1>

          {/* Category Filters */}
          <div className="flex gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-semibold transition-all capitalize ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {filteredProducts.length > 0 ? (
          <ProductsGrid products={filteredProducts} />
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products in this category</p>
          </div>
        )}
      </div>

      {/* Cart Floating Button */}
      <CartSidebar />
    </main>
  )
}
