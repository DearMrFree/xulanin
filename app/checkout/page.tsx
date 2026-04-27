'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    deliveryDate: '',
    notes: '',
    paymentMethod: 'venmo',
    venmoHandle: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <Link href="/shop" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
          <div className="text-center py-24">
            <p className="text-muted-foreground text-lg mb-6">Your cart is empty</p>
            <Link href="/shop">
              <Button size="lg">Start Shopping</Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const subtotal = total
  const tax = subtotal * 0.08
  const finalTotal = subtotal + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Store order in localStorage
      const order = {
        id: `ORD-${Date.now()}`,
        items,
        subtotal,
        tax,
        total: finalTotal,
        customer: formData,
        createdAt: new Date().toISOString(),
        status: 'pending',
      }

      const orders = JSON.parse(localStorage.getItem('xubie-orders') || '[]')
      orders.push(order)
      localStorage.setItem('xubie-orders', JSON.stringify(orders))

      // Clear cart
      clearCart()

      // Redirect to confirmation
      router.push(`/order-confirmation/${order.id}`)
    } catch (error) {
      console.error('Error submitting order:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link href="/cart" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <h1 className="text-5xl font-bold">
            <span className="text-foreground">CHECKOUT</span>
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Info */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:outline-none transition-colors"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Delivery Address</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:outline-none transition-colors"
                  />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:outline-none transition-colors"
                    />
                    <input
                      type="text"
                      name="zip"
                      placeholder="ZIP Code"
                      required
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Date */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Delivery Date</h2>
                <input
                  type="date"
                  name="deliveryDate"
                  required
                  value={formData.deliveryDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Special Notes */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Special Requests (Optional)</h2>
                <textarea
                  name="notes"
                  placeholder="Any special requests or dietary preferences?"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Payment Method */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg border-2 border-primary bg-primary/5">
                    <input
                      type="radio"
                      id="venmo"
                      name="paymentMethod"
                      value="venmo"
                      checked={formData.paymentMethod === 'venmo'}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <label htmlFor="venmo" className="flex-1 cursor-pointer font-semibold">
                      Venmo / CashApp
                    </label>
                  </div>
                  {formData.paymentMethod === 'venmo' && (
                    <input
                      type="text"
                      name="venmoHandle"
                      placeholder="Your Venmo/CashApp handle (optional - we'll contact you)"
                      value={formData.venmoHandle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-primary focus:outline-none transition-colors"
                    />
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 py-6 text-lg"
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-8 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-6 pb-6 border-b border-border max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg pt-3 border-t border-border">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-primary text-xl">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
