# Power2Go Energy — Official Web Platform

[![React](https://img.shields.io/badge/React-18.3-blue.svg?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3-purple.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E.svg?logo=supabase)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Power2Go Energy is a modern, high-performance web application for commercial, residential, and portable clean energy solutions, high-voltage/low-voltage energy vaults, solar monitoring, product documentation, interactive calculators, admin dashboard, and an integrated warranty verification system.

---

## ⚡ Key Features

- **Product Catalog & Solutions**: Detailed pages for Commercial (HV Energy Vaults), Residential (LV Energy Vaults), Portable Power (P2G PULSE), and Solar Energy Monitoring Systems.
- **Interactive Energy Calculator**: Calculate power backup requirements and estimate energy savings.
- **Warranty Management System**: Online warranty registration, instant serial number verification, and PDF warranty card downloads powered by Google Apps Script and Google Sheets.
- **Support & Documentation**: Comprehensive technical documentation, installation guides, datasheets, user manuals, and interactive FAQ accordions.
- **Customer Inquiry & Contact**: Instant contact form with dynamic map integration and customer inquiry routing.
- **Admin Dashboard**: Portal for managing product listings, customer inquiries, product warranty records, and user management via Supabase backend.
- **User Authentication**: Secure user login, signup, password recovery, and profile management integration with Supabase Auth.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, React Router v7
- **Styling**: Tailwind CSS v4, Lucide React Icons, Radix UI primitives, Motion (Framer Motion)
- **Build Tool**: Vite 6
- **Database & Auth**: Supabase (PostgreSQL, Row Level Security, Storage, Auth)
- **Warranty Service**: Google Apps Script REST endpoint + Google Sheets
- **Document Export**: jsPDF + dom-to-image-more (Client-side PDF warranty card generation)

---

## 📂 Project Structure

```text
Power2Go.Energy/
├── public/                 # Static public assets & favicon
├── src/
│   ├── admin/              # Admin dashboard components & authentication
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminLogin.tsx
│   │   ├── AdminProducts.tsx
│   │   ├── AdminWarranties.tsx
│   │   └── ...
│   ├── assets/             # Product images and design assets
│   ├── components/         # Reusable UI components (Header, Footer, ProductCards, UI primitives)
│   ├── context/            # Global React state & providers
│   ├── data/               # Product catalog and dynamic datasets
│   ├── lib/                # Utilities, Supabase client initialization, TypeScript types
│   ├── pages/              # Application views & pages
│   │   ├── auth/           # Login, Register, Forgot Password
│   │   ├── warranty/       # Warranty Registration, Search, and PDF Warranty Card
│   │   └── ...
│   ├── styles/             # Global CSS and Tailwind styles
│   ├── App.tsx             # Main App layout component
│   ├── main.tsx            # Application entry point
│   └── routes.tsx          # Route definitions & navigation structure
├── supabase/
│   └── migrations/         # SQL migration scripts for Supabase tables & RLS policies
├── .env.example            # Environment variable template
├── .gitignore              # Git ignore rules
├── index.html              # Vite HTML entry template
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: v18.0.0 or higher
- **npm** (v9+) or **yarn** or **pnpm**

---

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/power2go-energy.git
   cd power2go-energy
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and fill in your actual Supabase and Google Apps Script credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

4. **Run local development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000` to view the application.

---

## 💻 Available Scripts

- `npm run dev`: Starts the Vite development server on port 3000.
- `npm run build`: Compiles TypeScript and builds production bundles into `dist/`.
- `npm run preview`: Previews the production build locally.

---

## 🌐 Vercel Deployment & SPA Routing

The repository includes a root `vercel.json` configuration file to ensure Single Page Application (SPA) routing works seamlessly on Vercel:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This prevents `404: NOT_FOUND` errors when directly accessing or refreshing deep URLs like `/admin`, `/admin/login`, `/admin/products`, `/admin/warranties`, and `/admin/messages`.


---

## 🗄️ Supabase Setup Summary

The database is built on Supabase PostgreSQL. Database setup files are located in `supabase/migrations/`:

1. `001_initial_auth_profiles_addresses.sql`: Sets up user profiles, addresses, triggers, and Row Level Security (RLS) policies.
2. `002_admin_products_warranties_messages.sql`: Sets up products table, warranty claims, and contact messages tables.
3. `003_add_product_detail_columns.sql`: Adds rich specification and feature columns for product management.
4. `004_warranty_claims_and_image_upload.sql`: Configures storage buckets for warranty claims and file attachments.

To apply these migrations:
1. Link your project: `npx supabase link --project-ref your-project-id`
2. Push migrations: `npx supabase db push`

---

## 📄 Warranty System Overview

The application features a hybrid warranty management workflow:
- **Client Frontend**: Allows users to register new product warranties, check warranty status by serial number, and generate downloadable PDF warranty certificates.
- **Google Apps Script & Google Sheets**: Acts as an automated external registry endpoint for serial verification and Google Sheet storage.
- **Deployment**: Deploy your Apps Script as a Web App (`Execute as: Me`, `Access: Anyone`) and set its Web App URL to `VITE_GOOGLE_SCRIPT_URL`.

---

## 🖼️ Screenshots

*(Add screenshots of your application here)*

| Home Page | Product Detail | Warranty Registration |
| :---: | :---: | :---: |
| ![Home](https://via.placeholder.com/600x350?text=Power2Go+Home) | ![Product](https://via.placeholder.com/600x350?text=Product+Detail) | ![Warranty](https://via.placeholder.com/600x350?text=Warranty+System) |

---

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🏢 Author & Support

**Power2Go Energy Private Limited**
- Website: [https://power2go.energy](https://power2go.energy)
- Support: `info@power2go.energy` / `support@power2go.energy`
- Head Office: 10 Ali Block, Garden Town, Lahore, Pakistan
#   2  
 #   3  
 #   3  
 