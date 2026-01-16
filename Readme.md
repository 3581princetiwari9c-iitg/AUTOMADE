# AUTOMADE | Intelligent Automation Agency Website

![Project Status](https://img.shields.io/badge/Status-Live-success)
![License](https://img.shields.io/badge/License-Proprietary-blue)
![Tech](https://img.shields.io/badge/Stack-HTML%20%7C%20CSS%20%7C%20JS-yellow)

**AUTOMADE** is a high-performance, futuristic portfolio website architected for an AI Automation Agency. It replaces standard flat design with a bespoke **3D Infinite Tunnel environment**, **Glassmorphism 2.0** UI, and **physics-based interactions**, all built without heavy frameworks to ensure maximum speed and compatibility.

---

## 📑 Table of Contents
- [✨ Key Features](#-key-features)
- [🎨 Design System Analysis](#-design-system-analysis)
- [📂 File Structure](#-file-structure)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Configuration (Google Sheets)](#️-configuration-google-sheets)
- [🌍 Deployment](#-deployment)
- [📱 Browser Compatibility](#-browser-compatibility)
- [🤝 Contributing](#-contributing)
- [📝 License & Credits](#-license--credits)

---

## ✨ Key Features

* **🌌 Infinite 3D Tunnel:** A lightweight, DOM-based 3D environment that creates a sensation of speed and depth without WebGL overhead.
* **🔮 Glassmorphism 2.0:** High-contrast, dark-mode frosted glass cards (`backdrop-filter`) designed specifically to maintain readability against moving backgrounds.
* **🖱️ Interactive 3D Tilt:** Cards react to cursor movement using vector mathematics, tilting continuously for a tactile, premium feel.
* **📜 Parallax Scrolling:** The Hero section features differential scrolling speeds, creating a multi-layered depth effect.
* **⚡ Zero-Latency Transitions:** GPU-accelerated CSS transitions ensure 60FPS performance on all devices.
* **📱 Fully Responsive:** A CSS Grid architecture that fluidly adapts from 3-column desktop layouts to optimized mobile stacks.
* **📨 Serverless Contact Form:** Fully functional contact form connected to Google Sheets via Google Apps Script (No backend required).

---

## 🎨 Design System Analysis

### The Visual Engine (`style.css`)
* **Perspective Engine:** The `body` acts as the camera with `perspective: 800px`, while the `#tunnel-container` handles the vanishing point `perspective-origin: center 50vh`.
* **Neon Accents:** The brand color `#00ff88` (Neon Green) is used strategically for active states and hover glows to guide user attention.
* **Optimization:** `will-change` properties are used on heavy elements to promote them to their own compositor layers, preventing layout thrashing during animations.

### The Logic Core (`script.js`)
* **Tunnel Generation:** The script calculates the exact document height (`Math.max(...)`) and dynamically generates the precise number of tunnel segments needed to cover the scroll area—preventing infinite scroll bugs.
* **Input Handling:** Mouse movement events are throttled and mapped to CSS rotation degrees (`rotateX`, `rotateY`) to create the magnetic card effect.

---

## 📂 File Structure

```text
/
├── index.html      # Landing Page (Hero, Services, Blueprint, Pricing, FAQ)
├── about.html      # Company Profile (Mission, Values, Team, "Why Us")
├── contact.html    # Conversion Page (Form, Direct Details)
├── style.css       # The Visual Engine (Grid, 3D Transforms, Animations)
├── script.js       # The Logic Core (Tunnel Gen, Tilt Math, API Handler)
└── README.md       # Project Documentation