"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import Chatbot from "@/components/chatbot"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Smooth scroll setup
    const ctx = gsap.context(() => {
      // Initial page load animation
      gsap.from(".hero-content", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      })

      // Scroll-triggered animations
      gsap.utils.toArray(".animate-on-scroll").forEach((element: any) => {
        gsap.from(element, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        })
      })

      // Staggered animations for project cards
      gsap.utils.toArray(".project-card").forEach((card: any, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          ease: "power3.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      })

      // Skills animation
      gsap.utils.toArray(".skill-item").forEach((skill: any, index) => {
        gsap.from(skill, {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: "back.out(1.7)",
          delay: index * 0.05,
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        })
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <main ref={mainRef} className="min-h-screen bg-background text-foreground">
        <Header />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
        <Chatbot />
      </main>
    </ThemeProvider>
  )
}
