"use client"

import { Github, Linkedin, Mail, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FaWhatsapp } from "react-icons/fa"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://linkedin.com",
    },
    {
      name: "Email",
      icon: <Mail className="h-5 w-5" />,
      href: "mailto:alex@example.com",
    },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo and Description */}
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
              {"<Dev />"}
            </div>
            <p className="text-muted-foreground text-sm">Building digital experiences with passion and precision.</p>
          </div>

          <div className="flex justify-center space-x-6 mb-8">
            <a href="https://github.com/mohamed8eo" target="_blank" rel="noopener noreferrer" className="social-link group">
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full group-hover:scale-110 transition-transform bg-transparent"
              >
                <Github className="h-5 w-5" />
              </Button>
            </a>
            <a href="https://wa.me/201032562631" target="_blank" rel="noopener noreferrer" className="social-link group">
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full group-hover:scale-110 transition-transform bg-transparent"
              >
                <FaWhatsapp className="h-5 w-5" />
              </Button>
            </a>
            <a href="mailto:mohamedmahomed403@gmail.com" className="social-link group">
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full group-hover:scale-110 transition-transform bg-transparent"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </a>
          </div>

          {/* Back to Top */}
          <div className="text-center md:text-right">
            <Button
              variant="outline"
              onClick={scrollToTop}
              className="hover:scale-105 transition-transform bg-transparent"
            >
              Back to Top ↑
            </Button>
          </div>
        </div>

        <hr className="my-8 border-border" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm flex items-center justify-center">
            © {currentYear} Mohamed El-morsey. Made with <Heart className="h-4 w-4 mx-1 text-red-500 animate-pulse" /> and
            lots of coffee.
          </p>
        </div>
      </div>
    </footer>
  )
}
