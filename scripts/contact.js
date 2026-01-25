/**
 * JEDAN PORTFOLIO - Contact Form Handler
 * Uses EmailJS for SMTP email sending
 */

// EmailJS Configuration
// User needs to sign up at emailjs.com and get these values
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY" // Replace with your EmailJS public key
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID" // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID" // Replace with your EmailJS template ID

let emailjs // Declare the emailjs variable

document.addEventListener("DOMContentLoaded", () => {
  initContactForm()
  initFormValidation()
  initCharacterCounter()
})

/**
 * Initialize Contact Form
 */
function initContactForm() {
  const form = document.querySelector("form")
  if (!form) return

  // Create status message element
  const statusDiv = document.createElement("div")
  statusDiv.className = "form-status"
  statusDiv.setAttribute("role", "alert")
  statusDiv.setAttribute("aria-live", "polite")
  form.appendChild(statusDiv)

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Validate form
    if (!validateForm(form)) return

    // Show loading state
    form.classList.add("loading")
    const submitBtn = form.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent
    submitBtn.textContent = "Sending..."
    submitBtn.disabled = true

    try {
      // Send email using EmailJS
      await sendEmail(form)

      // Show success message
      showStatus(statusDiv, "success", "Message sent successfully! I'll get back to you soon.")
      form.reset()

      // Reset floating labels
      form.querySelectorAll(".form-group input, .form-group textarea").forEach((input) => {
        input.dispatchEvent(new Event("blur"))
      })
    } catch (error) {
      console.error("Error sending email:", error)
      showStatus(statusDiv, "error", "Failed to send message. Please try again or email me directly.")
    } finally {
      // Reset form state
      form.classList.remove("loading")
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }
  })
}

/**
 * Send Email via EmailJS
 */
async function sendEmail(form) {
  // Check if EmailJS is configured
  if (EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
    // Fallback: Simulate sending for demo
    console.log("EmailJS not configured. Simulating email send...")
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Log form data
    const formData = new FormData(form)
    console.log("Form Data:")
    for (const [key, value] of formData.entries()) {
      console.log(`  ${key}: ${value}`)
    }

    return { status: 200 }
  }

  // Load EmailJS SDK if not already loaded
  if (typeof window.emailjs === "undefined") {
    await loadEmailJS()
  }

  // Initialize EmailJS
  window.emailjs.init(EMAILJS_PUBLIC_KEY)

  // Prepare template parameters
  const templateParams = {
    from_name: form.querySelector("#name").value,
    from_email: form.querySelector("#email").value,
    subject: form.querySelector("#subject").value,
    message: form.querySelector("#message").value,
  }

  // Send email
  return window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
}

/**
 * Load EmailJS SDK dynamically
 */
function loadEmailJS() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
    script.onload = () => {
      emailjs = window.emailjs // Assign the emailjs variable from window
      resolve()
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
}

/**
 * Show Status Message
 */
function showStatus(element, type, message) {
  element.className = `form-status ${type}`
  element.innerHTML = `
    ${
      type === "success"
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>'
    }
    <span>${message}</span>
  `

  // Auto-hide success message after 5 seconds
  if (type === "success") {
    setTimeout(() => {
      element.className = "form-status"
      element.innerHTML = ""
    }, 5000)
  }
}

/**
 * Form Validation
 */
function initFormValidation() {
  const form = document.querySelector("form")
  if (!form) return

  const inputs = form.querySelectorAll("input, textarea")

  inputs.forEach((input) => {
    // Real-time validation on blur
    input.addEventListener("blur", () => {
      validateField(input)
    })

    // Clear error on input
    input.addEventListener("input", () => {
      clearFieldError(input)
    })
  })
}

function validateForm(form) {
  let isValid = true
  const inputs = form.querySelectorAll("input[required], textarea[required]")

  inputs.forEach((input) => {
    if (!validateField(input)) {
      isValid = false
    }
  })

  return isValid
}

function validateField(input) {
  const value = input.value.trim()
  let isValid = true
  let errorMessage = ""

  // Check required
  if (input.required && !value) {
    isValid = false
    errorMessage = "This field is required"
  }

  // Check email format
  if (input.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      isValid = false
      errorMessage = "Please enter a valid email address"
    }
  }

  // Check minimum length for message
  if (input.id === "message" && value && value.length < 10) {
    isValid = false
    errorMessage = "Message must be at least 10 characters"
  }

  if (!isValid) {
    showFieldError(input, errorMessage)
  } else {
    clearFieldError(input)
  }

  return isValid
}

function showFieldError(input, message) {
  input.style.borderColor = "var(--color-error)"

  // Remove existing error
  const existingError = input.parentElement.querySelector(".field-error")
  if (existingError) existingError.remove()

  // Add error message
  const errorSpan = document.createElement("span")
  errorSpan.className = "field-error"
  errorSpan.style.cssText = "color: var(--color-error); font-size: 0.75rem; margin-top: 4px; display: block;"
  errorSpan.textContent = message
  input.parentElement.appendChild(errorSpan)
}

function clearFieldError(input) {
  input.style.borderColor = ""
  const existingError = input.parentElement.querySelector(".field-error")
  if (existingError) existingError.remove()
}

/**
 * Character Counter for Message Field
 */
function initCharacterCounter() {
  const messageField = document.querySelector("#message")
  if (!messageField) return

  const maxLength = 1000
  messageField.setAttribute("maxlength", maxLength)

  // Create counter element
  const counter = document.createElement("div")
  counter.className = "char-counter"
  counter.style.cssText = "font-size: 0.75rem; color: var(--color-text-muted); text-align: right; margin-top: 4px;"
  counter.textContent = `0 / ${maxLength}`
  messageField.parentElement.appendChild(counter)

  messageField.addEventListener("input", () => {
    const currentLength = messageField.value.length
    counter.textContent = `${currentLength} / ${maxLength}`

    if (currentLength >= maxLength * 0.9) {
      counter.style.color = "var(--color-accent)"
    } else {
      counter.style.color = "var(--color-text-muted)"
    }
  })
}
