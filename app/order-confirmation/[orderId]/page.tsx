'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Copy, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Order {
  id: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }>
  subtotal: number
  tax: number
  total: number
  customer: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    zip: string
    deliveryDate: string
    notes: string
    paymentMethod: string
    venmoHandle: string
  }
  createdAt: string
  status: string
}

export default function OrderConfirmationPage({ params }: { params: { orderId: string } }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setMounted(true)
    const orders = JSON.parse(localStorage.getItem('xubie-orders') || '[]')
    const foundOrder = orders.find((o: Order) => o.id === params.orderId)
    if (foundOrder) {
      setOrder(foundOrder)
    }
  }, [params.orderId])

  if (!mounted || !order) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-muted-foreground text-lg mb-6">Loading order details...</p>
        </div>
      </main>
    )
  }

  const handleCopyId = () => {
    navigator.clipboard.writeText(order.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const cashAppHandle = '$XULANIN7'
  const phoneNumber = '(408)-849-6090'

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-center text-5xl font-bold mb-2">
            <span className="text-primary">ORDER</span> <span className="text-foreground">CONFIRMED!</span>
          </h1>
          <p className="text-center text-muted-foreground text-lg">
            Thank you for your order! Check your email for a confirmation.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Order Details */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-border">
            <div>
              <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2">
                Order Number
              </p>
              <div className="flex items-center gap-3">
                <p className="text-2xl font-bold text-primary">{order.id}</p>
                <button
                  onClick={handleCopyId}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
              {copied && <p className="text-primary text-sm mt-2">Copied!</p>}
            </div>
            <div>
              <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2">
                Delivery Date
              </p>
              <p className="text-2xl font-bold">
                {new Date(order.customer.deliveryDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-border">
            <div>
              <p className="text-muted-foreground text-sm uppercase tracking-widest mb-4">
                Delivery To
              </p>
              <div className="space-y-2 text-foreground">
                <p className="font-semibold">{order.customer.name}</p>
                <p>{order.customer.address}</p>
                <p>
                  {order.customer.city}, {order.customer.zip}
                </p>
                <p className="text-sm text-muted-foreground mt-3">{order.customer.phone}</p>
                <p className="text-sm text-muted-foreground">{order.customer.email}</p>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground text-sm uppercase tracking-widest mb-4">
                What&apos;s Next?
              </p>
              <div className="space-y-3 text-foreground">
                <p>✓ We&apos;ll confirm your order via DM or call</p>
                <p>✓ Payment via Venmo/CashApp upon pickup or delivery</p>
                <p>✓ Fresh baked on your delivery date</p>
                <p>✓ Tracked and delivered with love!</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <p className="text-muted-foreground text-sm uppercase tracking-widest mb-4">
              Items
            </p>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4 bg-secondary/50 rounded-lg"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-primary/10 border border-primary rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Payment Instructions</h2>
          <p className="text-foreground mb-4">
            Send payment via <span className="font-bold">CashApp</span> to{' '}
            <span className="font-bold text-primary font-mono text-lg">{cashAppHandle}</span>
          </p>
          <p className="text-muted-foreground text-sm mb-4">
            Include your order number in the payment note so we can match it to your order.
          </p>
          <div className="bg-card rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-2">Amount Due:</p>
            <p className="text-3xl font-bold text-primary">${order.total.toFixed(2)}</p>
          </div>
          <p className="text-muted-foreground text-sm">
            Make payment before your delivery date. Include your order number in the payment note.
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Questions or Changes?</h2>
          <p className="text-muted-foreground mb-6">
            DM us on Instagram or text/call us for any questions about your order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.instagram.com/xubie_snacks/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="outline" className="w-full" size="lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                Instagram DM
              </Button>
            </a>
            <a href="tel:4088496090" className="flex-1">
              <Button variant="outline" className="w-full" size="lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                Call / Text {phoneNumber}
              </Button>
            </a>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="text-center">
          <Link href="/">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
