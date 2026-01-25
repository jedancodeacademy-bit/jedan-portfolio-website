/**
 * JEDAN PORTFOLIO - Main JavaScript
 * Interactive features and animations
 */

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal()
  initHeaderScroll()
  initMobileMenu()
  initBackToTop()
  initTypingEffect()
  initSkillBars()
  initCounters()
  initParticles()
  initSmoothScroll()
  initProjectFilters()
})

/**
 * Scroll Reveal Animations
 * Elements with .reveal class animate when scrolled into view
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active")
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  revealElements.forEach((el) => observer.observe(el))
}

/**
 * Header Scroll Effect
 * Adds .scrolled class when page is scrolled
 */
function initHeaderScroll() {
  const header = document.querySelector("header")
  if (!header) return

  const scrollThreshold = 50

  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true })
  handleScroll() // Initial check
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const nav = document.querySelector("nav")
  const header = document.querySelector("header")
  if (!nav || !header) return

  // Create mobile menu button
  const menuBtn = document.createElement("button")
  menuBtn.className = "mobile-menu-btn"
  menuBtn.setAttribute("aria-label", "Toggle navigation menu")
  menuBtn.setAttribute("aria-expanded", "false")
  menuBtn.innerHTML = "<span></span><span></span><span></span>"

  // Insert before nav
  header.insertBefore(menuBtn, nav)

  menuBtn.addEventListener("click", () => {
    const isActive = nav.classList.toggle("active")
    menuBtn.classList.toggle("active")
    menuBtn.setAttribute("aria-expanded", isActive)
    document.body.style.overflow = isActive ? "hidden" : ""
  })

  // Close menu when clicking a link
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active")
      menuBtn.classList.remove("active")
      menuBtn.setAttribute("aria-expanded", "false")
      document.body.style.overflow = ""
    })
  })

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("active")) {
      nav.classList.remove("active")
      menuBtn.classList.remove("active")
      menuBtn.setAttribute("aria-expanded", "false")
      document.body.style.overflow = ""
    }
  })
}

/**
 * Back to Top Button
 */
function initBackToTop() {
  // Create button
  const btn = document.createElement("button")
  btn.className = "back-to-top"
  btn.setAttribute("aria-label", "Back to top")
  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  `
  document.body.appendChild(btn)

  // Show/hide based on scroll
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 500) {
        btn.classList.add("visible")
      } else {
        btn.classList.remove("visible")
      }
    },
    { passive: true },
  )

  // Scroll to top on click
  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

/**
 * Typing Effect for Hero Section
 */
function initTypingEffect() {
  const heroHeading = document.querySelector('[aria-labelledby="hero-heading"] h2')
  if (!heroHeading) return

  const text = heroHeading.textContent
  heroHeading.textContent = ""
  heroHeading.style.visibility = "visible"

  // Add cursor
  const cursor = document.createElement("span")
  cursor.className = "typing-cursor"
  heroHeading.appendChild(cursor)

  let i = 0
  function type() {
    if (i < text.length) {
      heroHeading.insertBefore(document.createTextNode(text.charAt(i)), cursor)
      i++
      setTimeout(type, 80)
    } else {
      // Remove cursor after typing is complete
      setTimeout(() => {
        cursor.style.display = "none"
      }, 2000)
    }
  }

  // Start typing after a short delay
  setTimeout(type, 500)
}

/**
 * Animated Skill Bars
 */
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-bar-fill")
  if (skillBars.length === 0) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target
          const targetWidth = bar.getAttribute("data-width") || "90%"
          bar.style.width = targetWidth
          observer.unobserve(bar)
        }
      })
    },
    { threshold: 0.5 },
  )

  skillBars.forEach((bar) => observer.observe(bar))
}

/**
 * Animated Counters
 */
function initCounters() {
  const counters = document.querySelectorAll(".counter")
  if (counters.length === 0) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target
          const target = Number.parseInt(counter.getAttribute("data-target")) || 0
          const duration = 2000
          const increment = target / (duration / 16)
          let current = 0

          const updateCounter = () => {
            current += increment
            if (current < target) {
              counter.textContent = Math.floor(current)
              requestAnimationFrame(updateCounter)
            } else {
              counter.textContent = target
            }
          }

          updateCounter()
          observer.unobserve(counter)
        }
      })
    },
    { threshold: 0.5 },
  )

  counters.forEach((counter) => observer.observe(counter))
}

/**
 * Particle Background Animation
 */
function initParticles() {
  // Only run on home page
  if (!document.querySelector('[aria-labelledby="hero-heading"]')) return

  const canvas = document.createElement("canvas")
  canvas.id = "particles-canvas"
  document.body.prepend(canvas)

  const ctx = canvas.getContext("2d")
  let particles = []
  let animationFrame

  function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }
  }

  function init() {
    resize()
    particles = []
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000))
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle())
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle, index) => {
      particle.x += particle.speedX
      particle.y += particle.speedY

      // Wrap around edges
      if (particle.x < 0) particle.x = canvas.width
      if (particle.x > canvas.width) particle.x = 0
      if (particle.y < 0) particle.y = canvas.height
      if (particle.y > canvas.height) particle.y = 0

      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(13, 148, 136, ${particle.opacity})`
      ctx.fill()

      // Draw connections
      particles.slice(index + 1).forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 120) {
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(otherParticle.x, otherParticle.y)
          ctx.strokeStyle = `rgba(13, 148, 136, ${0.1 * (1 - distance / 120)})`
          ctx.stroke()
        }
      })
    })

    animationFrame = requestAnimationFrame(animate)
  }

  window.addEventListener("resize", () => {
    resize()
    // Reinitialize particles on significant resize
    if (particles.length < 20 || particles.length > 150) {
      init()
    }
  })

  init()
  animate()

  // Cleanup on page unload
  window.addEventListener("beforeunload", () => {
    cancelAnimationFrame(animationFrame)
  })
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href === "#") return

      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

/**
 * Project Filter Animation (for projects page)
 */
function initProjectFilters() {
  const projects = document.querySelectorAll('[aria-labelledby^="project-"]')
  if (projects.length === 0) return

  // Add reveal classes to projects
  projects.forEach((project, index) => {
    project.classList.add("reveal")
    project.classList.add(`stagger-${(index % 5) + 1}`)
  })

  // Re-trigger scroll reveal
  initScrollReveal()
}
