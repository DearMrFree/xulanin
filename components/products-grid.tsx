'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { Product } from '@/lib/products'
import { ShoppingCart, FileText, X, AlertTriangle } from 'lucide-react'

interface ProductsGridProps {
  products: Product[]
}

function LabelModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { label } = product
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{label.productName}</h2>
            <p className="text-primary text-xs uppercase tracking-widest mt-1">Product Label</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition-colors ml-4 flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Home Kitchen Statement - must be prominent per CFO rules */}
        <div className="bg-primary/10 border border-primary rounded-xl p-4 mb-6 text-center">
          <p className="font-bold text-primary text-base">{label.homekitchenStatement}</p>
        </div>

        <div className="space-y-5 text-sm">
          {/* Business Info */}
          <div className="border-b border-border pb-5">
            <p className="text-muted-foreground text-xs uppercase tracking-widest mb-2">Produced By</p>
            <p className="font-semibold">{label.businessName}</p>
            <p className="text-muted-foreground">{label.businessCity}, {label.businessState} {label.businessZip}</p>
          </div>

          {/* Permit & County */}
          <div className="border-b border-border pb-5 grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1">Permit Number</p>
              <p className="font-semibold">{label.permitNumber}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1">Issued In</p>
              <p className="font-semibold">{label.countyIssued}</p>
            </div>
          </div>

          {/* Net Weight by size */}
          <div className="border-b border-border pb-5">
            <p className="text-muted-foreground text-xs uppercase tracking-widest mb-2">Net Weight</p>
            <div className="space-y-1">
              {product.sizes.map((s) => (
                <p key={s.label} className="font-semibold">
                  {s.label}: {s.netWeight} ({s.netWeightMetric})
                </p>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div className="border-b border-border pb-5">
            <p className="text-muted-foreground text-xs uppercase tracking-widest mb-2">Ingredients</p>
            <p className="leading-relaxed">{label.ingredients}</p>
            {label.toppingIngredients && (
              <p className="mt-3 leading-relaxed"><span className="font-semibold">Topping: </span>{label.toppingIngredients}</p>
            )}
            {label.fillingIngredients && (
              <p className="mt-3 leading-relaxed"><span className="font-semibold">Filling: </span>{label.fillingIngredients}</p>
            )}
          </div>

          {/* Allergens */}
          {label.allergens.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-primary" />
                <p className="text-xs uppercase tracking-widest font-bold">Contains Allergens</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {label.allergens.map((a) => (
                  <span key={a} className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/30">
                    {a}
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground text-xs mt-3">
                Contains: {label.allergens.join(', ')}. May also be produced in a facility that handles other allergens.
              </p>
            </div>
          )}
        </div>

        <p className="text-muted-foreground text-xs mt-6 pt-5 border-t border-border leading-relaxed">
          This product was made in a home kitchen and is not inspected by the Department of State Health Services or a local health department. Produced in compliance with the California Homemade Food Act.
        </p>
      </div>
    </div>
  )
}

export function ProductsGrid({ products }: ProductsGridProps) {
  const { addItem } = useCart()
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({})
  const [addedProduct, setAddedProduct] = useState<string | null>(null)
  const [labelProduct, setLabelProduct] = useState<Product | null>(null)

  const getSelectedSize = (product: Product) => {
    const sizeLabel = selectedSizes[product.id] ?? product.sizes[0].label
    return product.sizes.find((s) => s.label === sizeLabel) ?? product.sizes[0]
  }

  const handleAddToCart = (product: Product) => {
    const size = getSelectedSize(product)
    addItem({
      id: `${product.id}-${size.label.toLowerCase()}`,
      name: `${product.name} (${size.label})`,
      price: size.price,
      quantity: 1,
      image: product.image,
    })
    setAddedProduct(product.id)
    setTimeout(() => setAddedProduct(null), 1500)
  }

  return (
    <>
      {labelProduct && <LabelModal product={labelProduct} onClose={() => setLabelProduct(null)} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => {
          const selectedSize = getSelectedSize(product)
          const isAdded = addedProduct === product.id

          return (
            <div
              key={product.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col"
            >
              {/* Image */}
              <div className="relative h-64 w-full overflow-hidden bg-secondary flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-primary text-xs uppercase tracking-widest mb-1">{product.category}</p>
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed flex-1">{product.description}</p>

                {/* Size selector */}
                <div className="flex gap-2 mb-5">
                  {product.sizes.map((size) => (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSizes((prev) => ({ ...prev, [product.id]: size.label }))}
                      className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-all ${
                        selectedSize.label === size.label
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-secondary text-foreground border-border hover:border-primary/50'
                      }`}
                    >
                      {size.label} — ${size.price}
                    </button>
                  ))}
                </div>

                {/* Price row */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-3xl font-bold text-primary">${selectedSize.price}</p>
                  <p className="text-muted-foreground text-xs">{selectedSize.netWeight} / {selectedSize.netWeightMetric}</p>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className={`flex-1 transition-all duration-300 ${isAdded ? 'bg-primary/70' : 'bg-primary hover:bg-primary/90'}`}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {isAdded ? 'Added!' : 'Add to Cart'}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setLabelProduct(product)}
                    title="View product label"
                    className="flex-shrink-0"
                  >
                    <FileText className="w-4 h-4" />
                  </Button>
                </div>

                {/* Allergen quick hint */}
                {product.label.allergens.length > 0 && (
                  <p className="text-muted-foreground text-xs mt-3 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-primary flex-shrink-0" />
                    Contains: {product.label.allergens.join(', ')}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
