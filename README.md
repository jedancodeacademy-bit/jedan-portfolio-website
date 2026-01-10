# Jedan Portfolio Website

A semantic HTML5-only personal portfolio website for Jedan, a Full Stack Developer.

## Overview

This is a multi-page static website built entirely with HTML5 — no CSS or JavaScript. It demonstrates proper semantic markup, accessibility best practices, and clean document structure.

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Landing page with hero introduction, featured projects, and call-to-action |
| About | `about.html` | Biography, technical skills, and professional timeline |
| Projects | `projects.html` | Portfolio showcase with 4 detailed project case studies |
| Contact | `contact.html` | Lead generation form with proper validation attributes |

## File Structure

```
/jedan-portfolio
├── index.html      # Home / Landing Page
├── about.html      # Biography & Skills
├── projects.html   # Portfolio Showcase
├── contact.html    # Contact Form
└── README.md       # This file
```

## Viewing the Website

1. **Local Viewing**: Open any `.html` file directly in a web browser
2. **Live Server**: Use a local development server for best results:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```
3. **Deployment**: Upload files to any static hosting service (GitHub Pages, Netlify, Vercel)

## Semantic HTML5 Best Practices

This project demonstrates the following semantic HTML5 practices:

### Document Structure
- `<!DOCTYPE html>` declaration for HTML5
- `<html lang="en">` for language specification
- Proper `<head>` with charset, viewport, and description meta tags
- Meaningful `<title>` tags for each page

### Semantic Elements
- `<header>` — Site header with navigation
- `<nav>` — Primary navigation with `aria-label`
- `<main>` — Main content area (one per page)
- `<section>` — Thematic groupings with `aria-labelledby`
- `<article>` — Self-contained content blocks
- `<footer>` — Site footer with copyright

### Accessibility Features
- `aria-current="page"` for current navigation item
- `aria-labelledby` linking sections to their headings
- `aria-describedby` for form instructions
- Proper heading hierarchy (h1 → h2 → h3 → h4)
- `alt` attributes on all images
- `<label>` elements associated with form inputs
- `<fieldset>` and `<legend>` for form grouping
- `rel="noopener noreferrer"` on external links

### Form Best Practices
- HTML5 input types (`email`, `text`)
- `required` attribute for validation
- `autocomplete` attributes for better UX
- `placeholder` text for guidance
- Proper form structure with fieldsets

### Content Elements
- `<dl>`, `<dt>`, `<dd>` for definition lists (skills, project details)
- `<time>` elements with `datetime` attribute
- `<address>` for contact information
- `<strong>` for semantic emphasis

## Future Improvements

- [ ] Add CSS styling while maintaining semantic structure
- [ ] Implement CSS custom properties for theming
- [ ] Add JavaScript for form validation and submission
- [ ] Include `<picture>` elements for responsive images
- [ ] Add structured data (JSON-LD) for SEO
- [ ] Implement a skip navigation link
- [ ] Add a sitemap.xml and robots.txt
- [ ] Include Open Graph meta tags for social sharing

## Browser Support

This HTML5-only website is compatible with all modern browsers:
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## License

© 2026 Jedan. All rights reserved.
