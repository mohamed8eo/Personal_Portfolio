"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Github, Mail, Download, ArrowDown } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const typingRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Typing animation
      const text = "Full-Stack Developer"
      const chars = text.split("")

      if (typingRef.current) {
        typingRef.current.innerHTML = ""

        // Add cursor element
        const cursor = document.createElement("span")
        cursor.className = "typing-cursor"
        cursor.textContent = "|"

        chars.forEach((char, index) => {
          const span = document.createElement("span")
          span.textContent = char === " " ? "\u00A0" : char
          span.style.opacity = "0"
          typingRef.current?.appendChild(span)

          gsap.to(span, {
            opacity: 1,
            duration: 0.05,
            delay: 1 + index * 0.08,
            ease: "none",
          })
        })

        // Add cursor at the end
        typingRef.current.appendChild(cursor)

        // Animate cursor blinking throughout typing
        gsap.to(cursor, {
          opacity: 0,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        })
      }

      // Floating animation for profile image
      gsap.to(".profile-image", {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      })

      // Social links animation
      gsap.from(".social-link", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        delay: 2,
        ease: "back.out(1.7)",
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/5 dark:via-purple-500/5 dark:to-pink-500/5" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="hero-content text-center max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="mb-8">
            <div className="profile-image relative w-32 h-32 mx-auto mb-6">
              <Image
                src="/personalimage.jpg"
                alt="Profile Picture"
                width={128}
                height={128}
                className="rounded-full border-4 border-primary/20 shadow-2xl"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20" />
            </div>
          </div>

          {/* Name and Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Mohamed El-morsey
            </span>
          </h1>

          <div className="text-xl md:text-2xl text-muted-foreground mb-6 h-8">
            <span ref={typingRef} className="typing-cursor" />
          </div>

          <p className="text-lg text-muted-foreground mb-4 max-w-2xl mx-auto leading-relaxed">
            JavaScript | React | Next.js | TypeScript | Node.js
          </p>

          {/* Bio */}
          <p className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Passionate about learning and creating innovative web solutions. Currently studying computer science while
            building practical skills through hands-on projects and exploring the latest technologies.
          </p>

          {/* Social Links */}
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" download={true}>
              <Button size="lg" className="group">
                <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                Download Resume
              </Button>
            </Link>
            <Button variant="outline" size="lg" onClick={scrollToAbout}>
              View My Work
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <ArrowDown className="h-6 w-6 mx-auto text-muted-foreground" />
          </div>
        </div>
      </div>
      {/* Removed the problematic style jsx block */}
    </section>
  )
}
