"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Building2, PartyPopper, Heart, Calendar, Users, Send, CheckCircle2, Instagram, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const eventTypes = [
  { id: "corporate", label: "Corporate Event", icon: Building2 },
  { id: "party", label: "Party / Celebration", icon: PartyPopper },
  { id: "wedding", label: "Wedding / Special", icon: Heart },
  { id: "other", label: "Other", icon: Calendar }
]

const guestRanges = [
  "10-25 guests",
  "25-50 guests",
  "50-100 guests",
  "100-200 guests",
  "200+ guests"
]

export default function InquiryPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    budget: "",
    details: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send to a backend or email service
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Thanks for reaching out!
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We&apos;ve received your inquiry and will get back to you within 24 hours. 
              For faster response, feel free to DM us on Instagram!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a 
                href="https://www.instagram.com/xubie_snacks/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-primary text-primary-foreground">
                  <Instagram className="mr-2 h-5 w-5" />
                  DM on Instagram
                </Button>
              </a>
              <Link href="/">
                <Button size="lg" variant="outline">
                  Back to Home
                </Button>
              </Link>
            </div>

            <div className="bg-card rounded-2xl p-8 text-left">
              <h3 className="font-semibold text-lg mb-4">Your Inquiry Summary</h3>
              <div className="space-y-2 text-muted-foreground">
                <p><span className="text-foreground font-medium">Name:</span> {formData.name}</p>
                <p><span className="text-foreground font-medium">Event Type:</span> {formData.eventType}</p>
                <p><span className="text-foreground font-medium">Date:</span> {formData.eventDate || "TBD"}</p>
                <p><span className="text-foreground font-medium">Guests:</span> {formData.guestCount}</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          <Link href="/#catering" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Catering
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Let&apos;s Plan Your <span className="text-primary">Event</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Tell us about your event and we&apos;ll create a custom quote tailored to your needs. 
            Corporate meetings, birthday parties, weddings - we do it all!
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Info */}
                <div className="bg-card rounded-2xl p-8 space-y-6">
                  <h2 className="text-xl font-bold">Contact Information</h2>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Your Name *</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full name"
                        required
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Company / Organization</label>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company name (if applicable)"
                        className="bg-background"
                      />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number *</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        required
                        className="bg-background"
                      />
                    </div>
                  </div>
                </div>

                {/* Event Type */}
                <div className="bg-card rounded-2xl p-8 space-y-6">
                  <h2 className="text-xl font-bold">Event Details</h2>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Type of Event *</label>
                    <div className="grid grid-cols-2 gap-3">
                      {eventTypes.map((type) => {
                        const Icon = type.icon
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, eventType: type.label }))}
                            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                              formData.eventType === type.label
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border bg-background hover:border-primary/50"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            <span className="font-medium text-sm">{type.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Event Date</label>
                      <Input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Number of Guests *</label>
                      <select
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleChange}
                        required
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      >
                        <option value="">Select guest count</option>
                        {guestRanges.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Estimated Budget</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                    >
                      <option value="">Select budget range</option>
                      <option value="Under $200">Under $200</option>
                      <option value="$200 - $500">$200 - $500</option>
                      <option value="$500 - $1000">$500 - $1,000</option>
                      <option value="$1000 - $2000">$1,000 - $2,000</option>
                      <option value="$2000+">$2,000+</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tell Us More</label>
                    <textarea
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Any specific requests, themes, dietary restrictions, or items you're interested in..."
                      className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm resize-none"
                    />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg">
                  <Send className="mr-2 h-5 w-5" />
                  Submit Inquiry
                </Button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/images/logo.jpg"
                  alt="Xubie Snacks"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Quick Contact */}
              <div className="bg-card rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-lg">Need it faster?</h3>
                <p className="text-muted-foreground text-sm">
                  For rush orders or quick questions, reach out directly!
                </p>
                <div className="space-y-3">
                  <a 
                    href="https://www.instagram.com/xubie_snacks/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                    <span>@xubie_snacks</span>
                  </a>
                </div>
              </div>

              {/* What to Expect */}
              <div className="bg-card rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-lg">What to Expect</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Response within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Custom quote based on your needs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Tasting sessions for large orders</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Flexible payment options</span>
                  </li>
                </ul>
              </div>

              {/* Testimonial */}
              <div className="bg-primary/10 rounded-2xl p-6 space-y-4">
                <p className="text-foreground italic">
                  &quot;Xubie Snacks catered our company holiday party and everyone LOVED it! 
                  The banana pudding was a huge hit. Already planning our next order!&quot;
                </p>
                <p className="text-sm text-muted-foreground">
                  - Happy Corporate Client
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
