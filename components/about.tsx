"use client"

import { Calendar, MapPin, Code, Coffee } from "lucide-react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function About() {
  const milestones = [
    {
      year: "Now",
      title: "Full-Stack Web Development",
      company: "Personal Projects & Freelance Work",
      description:
        "Built advanced full-stack applications using Next.js, Prisma, and Tailwind CSS. Delivered real-world projects like dashboards, portfolios, and social platforms.",
    },
    {
      year: "April 2025",
      title: "MERN Stack",
      company: "Self-Learning & Open Source",
      description:
        "Built and contributed to full-stack web applications using MongoDB, Express.js, React, and Node.js. Developed features like user authentication By Clerk, RESTful APIs, and dynamic Frontend. Gained hands-on experience through open-source contributions and personal projects.",
    },
    
    {
      year: "March 2025",
      title: "Backend & API Integration",
      company: "Freelance & Practice Projects",
      description:
      "Worked on backend logic using Node.js, Express, and MongoDB. Integrated third-party APIs, authentication (Clerk), and optimized for performance.",
    },
    {
      year: "January 2025",
      title: "Frontend Mastery with React & Next.js",
      company: "Self-Learning & Open Source",
      description:
        "Specialized in building dynamic UIs with React, and Tailwind. Created multiple responsive web templates and animated interfaces.",
    },
    {
      year: "October 2024",
      title: "Started My Web Development Journey",
      company: "Self-Driven Learning",
      description:
        "Began learning HTML, CSS, and JavaScript From Elzero Web School. Discovering a strong passion for Web Development.",
    },
  ];
  

  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Timeline line progressive animation
      gsap.to(".timeline-line", {
        scaleY: 1,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      })

      // Individual timeline items with step-by-step animation
      gsap.utils.toArray(".timeline-item").forEach((item: any, index) => {
        // Timeline dot animation
        gsap.from(item.querySelector(".timeline-dot"), {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })

        // Timeline card animation
        gsap.from(item.querySelector(".timeline-card"), {
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })

        // Timeline content stagger animation
        gsap.from(item.querySelectorAll(".timeline-content > *"), {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.5,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      })
    }, timelineRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="animate-on-scroll text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know more about my journey, experience, and what drives my passion for development
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* About Content */}
          <div className="animate-on-scroll">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                I'm a passionate computer science student with a deep curiosity for web development and software
                engineering. Currently pursuing my degree while building practical skills through hands-on projects and
                continuous learning. My journey in programming started with curiosity and has evolved into a genuine
                passion for creating digital solutions.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                I'm actively learning modern web technologies including React, Next.js, Node.js, and TypeScript. Through
                academic projects and personal initiatives, I'm gaining experience in both frontend and backend
                development. I believe in learning by doing and constantly challenge myself with new technologies and
                frameworks.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-8">
                When I'm not studying or coding, I enjoy participating in hackathons, contributing to open-source
                projects, and connecting with the developer community. I'm always eager to learn from experienced
                developers and share knowledge with fellow students on this exciting journey.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">0.5 Years</p>
                  <p className="text-sm text-muted-foreground">Learning</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">35+ Projects</p>
                  <p className="text-sm text-muted-foreground">Built</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">New Mansura University NUM</p>
                  <p className="text-sm text-muted-foreground">Student</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Coffee className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">70+ Hours</p>
                  <p className="text-sm text-muted-foreground">Coding</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="animate-on-scroll overflow-hidden">
            <h3 className="text-2xl font-bold mb-8">My Journey</h3>
            <div className="timeline-container space-y-8 relative overflow-hidden">
              <div className="timeline-line absolute left-4 top-0 bottom-0 w-0.5 bg-primary/30 scale-y-0"></div>
              {milestones.map((milestone, index) => (
                <div key={index} className="timeline-item relative pl-12 overflow-hidden">
                  <div className="timeline-dot absolute left-2 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />
                  <div className="timeline-card bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                    <div className="timeline-content">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {milestone.year}
                        </span>
                      </div>
                      <h4 className="font-semibold text-lg mb-1 break-words">{milestone.title}</h4>
                      <p className="text-primary font-medium mb-2 break-words">{milestone.company}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed break-words">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
