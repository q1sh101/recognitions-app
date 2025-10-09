// =============================================================================
// theme_controller.js
// Purpose: Theme switcher with Bootstrap 5.3+ color mode sync
// =============================================================================

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.initializeTheme()
  }

  initializeTheme() {
    const saved = this.getSaved()
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches
    const theme = saved || (system ? "dark" : "light")
    
    this.apply(theme)
  }

  toggle() {
    const current = document.documentElement.getAttribute("data-theme")
    const next = current === "dark" ? "light" : "dark"
    
    this.apply(next)
    this.save(next)
  }

  // Apply theme to BOTH data-theme AND data-bs-theme
  apply(theme) {
    const root = document.documentElement
    
    // Custom attribute (for our CSS)
    root.setAttribute("data-theme", theme)
    
    // Bootstrap attribute (for Bootstrap components)
    root.setAttribute("data-bs-theme", theme)
  }

  save(theme) {
    try {
      localStorage.setItem("theme", JSON.stringify(theme))
    } catch (e) {
      console.warn("Failed to save theme:", e)
    }
  }

  getSaved() {
    try {
      return JSON.parse(localStorage.getItem("theme"))
    } catch (e) {
      return null
    }
  }
}