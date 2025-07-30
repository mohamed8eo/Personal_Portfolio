"use client"

import { useRef, useEffect } from "react"
import { 
  Code, 
  Database, 
  Globe, 
  Smartphone, 
  Cloud, 
  Palette, 
  Zap,
  Palette as FigmaIcon,
} from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiDocker,
  SiAmazon,
  SiFigma,
  SiJest,
  SiTestinglibrary
} from "react-icons/si"

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Globe className="h-6 w-6" />,
      skills: [
        { name: "React", level: 95, icon: <SiReact className="h-4 w-4" />, color: "text-[#61DAFB]" },
        { name: "Next.js", level: 90, icon: <SiNextdotjs className="h-4 w-4" />, color: "#ffffff" },
        { name: "TS", level: 88, icon: <SiTypescript className="h-4 w-4" />, color: "text-[#3178C6]" },
        { name: "Tailwind CSS", level: 92, icon: <SiTailwindcss className="h-4 w-4" />, color: "text-[#06B6D4]" },
        { name: "JS", level: 95, icon: <SiJavascript className="h-4 w-4" />, color: "text-[#F7DF1E]" },
      ],
    },
    {
      title: "Backend",
      icon: <Database className="h-6 w-6" />,
      skills: [
        { name: "Node.js", level: 90, icon: <SiNodedotjs className="h-4 w-4" />, color: "text-[#339933]" },
        { name: "Express.js", level: 85, icon: <SiExpress className="h-4 w-4" />, color: "#ffffff" },
        { name: "PostgreSQL", level: 60, icon: <SiPostgresql className="h-4 w-4" />, color: "text-[#336791]" },
        { name: "MongoDB", level: 82, icon: <SiMongodb className="h-4 w-4" />, color: "text-[#47A248]" },
        { name: "REST APIs", level: 88, icon: <Globe className="h-4 w-4" />, color: "text-primary" },
      ],
    },
    {
      title: "Tools & Others",
      icon: <Code className="h-6 w-6" />,
      skills: [
        { name: "Git", level: 90, icon: <SiGit className="h-4 w-4" />, color: "text-[#F05032]" },
        { name: "Docker", level: 75, icon: <SiDocker className="h-4 w-4" />, color: "text-[#2496ED]" },
        { name: "AWS", level: 20, icon: <SiAmazon className="h-4 w-4" />, color: "text-[#FF9900]" },
        { name: "Figma", level: 80, icon: <SiFigma className="h-4 w-4" />, color: "text-[#F24E1E]" },
        { name: "Testing", level: 10, icon: <SiJest className="h-4 w-4" />, color: "text-[#C21325]" },
      ],
    },
  ]

  const skillsRef = useRef<HTMLDivElement>(null)
  const categoryRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Progress bar animations
      const progressBars = gsap.utils.toArray(".progress-bar")
      
      // Set initial width to 0 for all progress bars
      progressBars.forEach((bar: any) => {
        const progressFill = bar.querySelector(".progress-fill")
        if (progressFill) {
          gsap.set(progressFill, { width: 0 })
        }
      })
      
      // Create a single ScrollTrigger for the skills section
      ScrollTrigger.create({
        trigger: skillsRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          progressBars.forEach((bar: any, index: number) => {
            const progressFill = bar.querySelector(".progress-fill")
            const targetWidth = progressFill?.getAttribute("data-width")
            
            if (progressFill && targetWidth) {
              gsap.to(progressFill, {
                width: targetWidth,
                duration: 1.5,
                delay: index * 0.2,
                ease: "power2.out"
              })
            }
          })
        },
        onLeave: () => {
          progressBars.forEach((bar: any) => {
            const progressFill = bar.querySelector(".progress-fill")
            if (progressFill) {
              gsap.to(progressFill, {
                width: 0,
                duration: 0.5,
                ease: "power2.out"
              })
            }
          })
        },
        onEnterBack: () => {
          progressBars.forEach((bar: any, index: number) => {
            const progressFill = bar.querySelector(".progress-fill")
            const targetWidth = progressFill?.getAttribute("data-width")
            
            if (progressFill && targetWidth) {
              gsap.to(progressFill, {
                width: targetWidth,
                duration: 1,
                delay: index * 0.1,
                ease: "power2.out"
              })
            }
          })
        },
        onLeaveBack: () => {
          progressBars.forEach((bar: any) => {
            const progressFill = bar.querySelector(".progress-fill")
            if (progressFill) {
              gsap.to(progressFill, {
                width: 0,
                duration: 0.5,
                ease: "power2.out"
              })
            }
          })
        }
      })

      // Enhanced hover animations for skill cards
      gsap.utils.toArray(".skill-feature-card").forEach((card: any) => {
        const icon = card.querySelector(".skill-icon")
        const content = card.querySelector(".skill-content")

        const handleMouseEnter = () => {
          gsap.to(card, {
            y: -10,
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          })
          gsap.to(icon, {
            scale: 1.2,
            rotation: 360,
            duration: 0.5,
            ease: "back.out(1.7)",
          })
          gsap.to(content, {
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          })
        }

        const handleMouseLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          })
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          })
          gsap.to(content, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          })
        }

        const handleClick = () => {
          gsap.to(card, {
            scale: 0.95,
            duration: 0.1,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
          })

          // Add ripple effect
          const ripple = document.createElement("div")
          ripple.className = "absolute inset-0 bg-primary/20 rounded-lg animate-ping"
          card.appendChild(ripple)
          setTimeout(() => ripple.remove(), 600)
        }

        card.addEventListener("mouseenter", handleMouseEnter)
        card.addEventListener("mouseleave", handleMouseLeave)
        card.addEventListener("click", handleClick)

        return () => {
          card.removeEventListener("mouseenter", handleMouseEnter)
          card.removeEventListener("mouseleave", handleMouseLeave)
          card.removeEventListener("click", handleClick)
        }
      })
    }, skillsRef)

    return () => ctx.revert()
  }, [])

  const technologies = [
    { name: "JS", icon: <SiJavascript className="h-8 w-8" />, color: "text-[#F7DF1E]" },
    { name: "TS", icon: <SiTypescript className="h-8 w-8" />, color: "text-[#3178C6]" },
    { name: "React", icon: <SiReact className="h-8 w-8" />, color: "text-[#61DAFB]" },
    { name: "Next.js", icon: <SiNextdotjs className="h-8 w-8" />},
    { name: "Node.js", icon: <SiNodedotjs className="h-8 w-8" />, color: "text-[#339933]" },
    { name: "Express", icon: <SiExpress className="h-8 w-8" />},
    { name: "MongoDB", icon: <SiMongodb className="h-8 w-8" />, color: "text-[#47A248]" },
    { name: "PostgreSQL", icon: <SiPostgresql className="h-8 w-8" />, color: "text-[#336791]" },
    { name: "Tailwind", icon: <SiTailwindcss className="h-8 w-8" />, color: "text-[#06B6D4]" },
    { name: "Docker", icon: <SiDocker className="h-8 w-8" />, color: "text-[#2496ED]" },
    { name: "AWS", icon: <SiAmazon className="h-8 w-8" />, color: "text-[#FF9900]" },
    { name: "Git", icon: <SiGit className="h-8 w-8" />, color: "text-[#F05032]" },
  ]

  return (
    <section id="skills" ref={skillsRef} className="py-20">
      <div className="container mx-auto px-6">
        <div className="animate-on-scroll text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills & <span className="text-primary">Technologies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and the tools I use to bring ideas to life
          </p>
        </div>

        {/* Technology Icons Grid */}
        <div className="skills-grid grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-16">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="skill-item group bg-card border rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                              onMouseEnter={(e) => {
                  const icon = e.currentTarget.querySelector('div');
                  if (icon) {
                    const color = tech.color?.replace('text-[', '').replace(']', '');
                    if (color && color.includes('#')) {
                      // Handle Next.js and Express icons - use theme-aware colors
                      if (color === '#ffffff') {
                        const isDark = document.documentElement.classList.contains('dark');
                        icon.style.color = isDark ? '#ffffff' : '#000000';
                      } else {
                        icon.style.color = color;
                      }
                    }
                  }
                }}
              onMouseLeave={(e) => {
                const icon = e.currentTarget.querySelector('div');
                if (icon) {
                  icon.style.color = '';
                }
              }}
            >
              <div className="text-primary mb-3 group-hover:scale-110 transition-all duration-300 flex justify-center">
                {tech.icon}
              </div>
              <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {tech.name}
              </p>
            </div>
          ))}
        </div>

        {/* Skill Categories with Progress Bars */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="animate-on-scroll bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow group"
              onMouseEnter={(e) => {
                const icons = e.currentTarget.querySelectorAll('[data-color]');
                icons.forEach((icon) => {
                  const color = icon.getAttribute('data-color');
                  if (color && color.includes('#')) {
                    // Handle Next.js and Express icons - use theme-aware colors
                    if (color === '#ffffff') {
                      const isDark = document.documentElement.classList.contains('dark');
                      (icon as HTMLElement).style.color = isDark ? '#ffffff' : '#000000';
                    } else {
                      (icon as HTMLElement).style.color = color;
                    }
                  } else if (color && color.includes('text-[')) {
                    const hexColor = color.replace('text-[', '').replace(']', '');
                    (icon as HTMLElement).style.color = hexColor;
                  }
                });
              }}
              onMouseLeave={(e) => {
                const icons = e.currentTarget.querySelectorAll('[data-color]');
                icons.forEach((icon) => {
                  (icon as HTMLElement).style.color = '';
                });
              }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <div className="text-primary">{category.icon}</div>
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="text-primary transition-colors duration-300 group-hover:scale-110"
                          data-color={skill.color}
                        >
                          {skill.icon}
                        </div>
                        <span className="text-sm font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="progress-bar w-full bg-muted rounded-full h-2">
                      <div
                        className="progress-fill bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        data-width={`${skill.level}%`}
                        style={{ width: 0 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div ref={skillsRef} className="animate-on-scroll mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-8">What I Bring to the Table</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="skill-feature-card relative bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
              <div className="skill-icon">
                <Zap className="h-8 w-8 text-primary mx-auto mb-4" />
              </div>
              <div className="skill-content">
                <h4 className="font-semibold mb-2">Performance</h4>
                <p className="text-sm text-muted-foreground">Optimized, fast-loading applications</p>
              </div>
            </div>
            <div className="skill-feature-card relative bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
              <div className="skill-icon">
                <Smartphone className="h-8 w-8 text-primary mx-auto mb-4" />
              </div>
              <div className="skill-content">
                <h4 className="font-semibold mb-2">Responsive</h4>
                <p className="text-sm text-muted-foreground">Mobile-first, cross-device compatibility</p>
              </div>
            </div>
            <div className="skill-feature-card relative bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
              <div className="skill-icon">
                <Palette className="h-8 w-8 text-primary mx-auto mb-4" />
              </div>
              <div className="skill-content">
                <h4 className="font-semibold mb-2">Design</h4>
                <p className="text-sm text-muted-foreground">Clean, modern, user-centered interfaces</p>
              </div>
            </div>
            <div className="skill-feature-card relative bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
              <div className="skill-icon">
                <Cloud className="h-8 w-8 text-primary mx-auto mb-4" />
              </div>
              <div className="skill-content">
                <h4 className="font-semibold mb-2">Scalable</h4>
                <p className="text-sm text-muted-foreground">Cloud-ready, maintainable architecture</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
