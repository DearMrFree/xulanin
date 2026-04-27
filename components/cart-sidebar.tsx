'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'

export function CartSidebar() {
  const { items, total } = useCart()

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Link href="/cart">
        <Button size="lg" className="rounded-full w-14 h-14 p-0 shadow-lg relative">
          <ShoppingCart className="w-6 h-6" />
          {items.length > 0 && (
            <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {items.length}
            </div>
          )}
        </Button>
      </Link>
    </div>
  )
}
