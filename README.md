# Doffins CleanCare 
### #1 Premium Cleaning & Pest Control Services in Nairobi

[![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fdoffinscleancare.co.ke)](https://doffinscleancare.co.ke)
[![Framework](https://img.shields.io/badge/Framework-React%20%2B%20Vite-blue)](https://vitejs.dev/)
[![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC)](https://tailwindcss.com/)
[![Database](https://img.shields.io/badge/Database-SQLite%20%2B%20Drizzle-003B57)](https://orm.drizzle.team/)

Doffins CleanCare is a professionally modernized, full-stack web application designed for **Doffins & Co. Ltd**. It serves as the digital storefront for Nairobi's leading cleaning experts, offering dynamic service management, real-time lead tracking, and a premium administrative portal.

---

##  Key Features

###  Public Experience
- **Dynamic Service Catalog**: Fetch and display services (Carpet, Sofa, Mattress, Deep House, etc.) directly from the database.
- **Instant Booking Protocol**: Dual-channel inquiry system that saves leads to the database and automatically triggers a pre-filled email client (Gmail/Outlook).
- **Premium UI/UX**: Immersive animations using **Framer Motion**, glassmorphism aesthetics, and obsidian-grade dark modes.
- **Fully Responsive**: Optimized for every screen size—from iPhone 12 to 4K Desktop monitors.

###  Administrative Portal
- **Service Manager**: Full CRUD (Create, Read, Update, Delete) capabilities. Toggle between professional **Grid** and **List** views.
- **Lead Intelligence**: Real-time tracking of customer inquiries and bookings.
- **Data Export**: One-click CSV export for lead analysis and CRM integration.
- **Secure Access**: Backend-hardened login system with secure credential processing.

###  Performance & SEO
- **Search Optimization**: Integrated `sitemap.xml`, `robots.txt`, and **JSON-LD Local Business Schema**.
- **Social SEO**: Full Open Graph (OG) and Twitter Card support for professional link sharing.
- **Branding**: Official favicon and Apple Touch Icon support for Google Search visibility.

---

##  Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: SQLite (via `better-sqlite3`)
- **ORM**: Drizzle ORM
- **Icons**: Lucide React
- **SEO**: React Helmet Async

---

##  Getting Started

### 1. Installation
```bash
npm install
```

### 2. Database Setup
The project uses a local SQLite database (`dev.db`). Initialize and seed it with the professional service catalog:
```bash
npm run seed
```

### 3. Development Server
```bash
npm run dev
```

---

## 📁 Project Structure

```text
├── api/                # Backend API endpoints (Drizzle/Better-SQLite3)
├── public/             # Static assets (robots.txt, sitemap.xml, logo)
├── src/
│   ├── app/
│   │   ├── components/ # Reusable UI components & Layouts
│   │   ├── pages/      # Route-level components (Home, About, Admin, etc.)
│   │   └── routes.ts   # Main application routing
│   ├── db/             # Drizzle schema and database configuration
│   └── styles/         # Global CSS and Tailwind configuration
└── seed.ts             # Database seeding script
```

---

##  Administrative Access

- **Login URL**: `/admin/login`
- **Default Dashboard**: `/admin`
- **Lead Management**: Filter, search, and export customer data effortlessly.

---

##  License & Attribution

This project was built for **Doffins CleanCare (Doffins & Co. Ltd)**.
---

Developed  for **Doffins CleanCare**.