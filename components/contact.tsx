"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Send, Mail, Phone, MapPin, CheckCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import emailjs from "emailjs-com"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form field focus animations
      const inputs = formRef.current?.querySelectorAll("input, textarea")
      inputs?.forEach((input) => {
        const handleFocus = () => {
          gsap.to(input, {
            scale: 1.02,
            duration: 0.2,
            ease: "power2.out",
          })
        }

        const handleBlur = () => {
          gsap.to(input, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          })
        }

        input.addEventListener("focus", handleFocus)
        input.addEventListener("blur", handleBlur)

        return () => {
          input.removeEventListener("focus", handleFocus)
          input.removeEventListener("blur", handleBlur)
        }
      })
    }, formRef)

    return () => ctx.revert()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // EmailJS configuration
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ""
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ""
      const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID || ""

      // Check if environment variables are set
      if (!serviceId || !templateId || !userId) {
        throw new Error("EmailJS credentials not configured. Please check your environment variables.")
      }

      // Check if EmailJS is loaded
      if (typeof emailjs === 'undefined') {
        throw new Error("EmailJS is not loaded. Please check your internet connection.")
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: "Mohamed",
        reply_to: formData.email, // Add reply_to for better email handling
      }

      console.log("Sending email with params:", { serviceId, templateId, userId, templateParams })
      
      // Try with explicit initialization
      emailjs.init(userId)
      
      const result = await Promise.race([
        emailjs.send(serviceId, templateId, templateParams, userId),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error("EmailJS timeout - request took too long")), 10000)
        )
      ])
      console.log("Email sent successfully:", result)

      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after success
      setFormData({ name: "", email: "", message: "" })
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)

    } catch (error) {
      console.error("Email sending failed:", error)
      console.error("Error details:", {
        message: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined
      })
      setIsSubmitting(false)
      
      // Show specific error message
      let errorMessage = "Failed to send message. Please try again or contact me directly."
      
      if (error instanceof Error && error.message) {
        errorMessage = error.message
      } else if (error && typeof error === 'object' && Object.keys(error).length > 0) {
        errorMessage = JSON.stringify(error)
      } else {
        errorMessage = "EmailJS service unavailable. Please check your internet connection and try again."
      }
      
      setError(errorMessage)
      
      // Clear error after 5 seconds
      setTimeout(() => {
        setError("")
      }, 5000)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "mohamedmahomed403@gmail.com",
      href: "mailto:mohamedmahomed403@gmail.com",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+20 103 256 2631",
      href: "tel:+201032562631",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: "El-Dakahlia, Egypt",
      href: "https://maps.app.goo.gl/xq8uHALUSLzCizAH6",
    },
  ]

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="animate-on-scroll text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to start your next project? Let's discuss how we can work together to bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="animate-on-scroll">
            <h3 className="text-2xl font-semibold mb-8">Let's Connect</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              I'm always interested in hearing about new opportunities, whether it's a freelance project, full-time
              position, or just a chat about technology. Don't hesitate to reach out!
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <div className="text-primary">{info.icon}</div>
                  </div>
                  <div>
                    <p className="font-medium">{info.label}</p>
                    <p className="text-muted-foreground">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability Status */}
            <div className="mt-8 p-6 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <p className="text-green-700 dark:text-green-400 font-medium">Available for new projects</p>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Currently accepting freelance work and full-time opportunities
              </p>
            </div>

            {/* Freelance Platforms */}
            <div className="mt-6">
              <h4 className="font-semibold mb-4 text-foreground">Find me on Freelance Platforms</h4>
              <div className="space-y-3">
                <Link
                  href="https://khamsat.com/user/mohamed8eo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-md hover:bg-[#ffa500] transition-all duration-300 hover:scale-105 group hover:border-primary"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                      <img 
                        src="/khamsat-logo-png_seeklogo-566781.png" 
                        alt="Khamsat Logo" 
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-medium group-hover:text-primary transition-colors">Khamsat</p>
                      <p className="text-sm text-muted-foreground group-hover:text-primary/70 transition-colors">Arabic freelance platform</p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
                
                <Link
                  href="https://mostaql.com/u/M_oha_med8/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-300 hover:bg-[#1aa5e8] hover:scale-105 group hover:border-primary"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <img 
                        src="/مستقل.png" 
                        alt="Mostaql Logo" 
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-medium group-hover:text-primary transition-colors">Mostaql</p>
                      <p className="text-sm text-muted-foreground group-hover:text-primary/70 transition-colors">Arabic freelance platform</p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-on-scroll">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                    className="transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                    className="transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project or just say hello..."
                  rows={6}
                  required
                  className="transition-all duration-200 resize-none"
                />
              </div>

              <Button type="submit" size="lg" className="w-full group" disabled={isSubmitting || isSubmitted}>
                {isSubmitted ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Message Sent!
                  </>
                ) : isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </>
                )}
              </Button>
            </form>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Response Time */}
            <p className="text-sm text-muted-foreground mt-4 text-center">I typically respond within 24 hours</p>
          </div>
        </div>
      </div>
    </section>
  )
}
