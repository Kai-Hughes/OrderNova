# OrderNova

> Order and invoice automation to the UBL 2.1 XML standard — built for SMEs who'd rather not spend their afternoon manually formatting documents.

**[Live Demo](https://order-nova.vercel.app)** &nbsp;·&nbsp; [Backend API](https://ordernova-production.up.railway.app)

---

![OrderNova Homepage](./docs/homepage.jpeg)

---

## Overview

OrderNova is a full-stack order and invoice management platform that automatically generates UBL 2.1-compliant XML documents from structured order data. Built originally as a UNSW SENG2021 team capstone project, it has since been redeployed to production, debugged, and reworked visually — using Claude as a development assistant throughout for code review, bug-fixing, and design iteration.

The core idea: fill in buyer, seller, and item details once. The platform handles XML generation, document storage, confirmation emails, and gives you analytics on spending trends, order volume, and product categories over time.

---

## Features

| Feature | Description |
|---|---|
| **Order Creation** | Generate UBL 2.1-compliant XML orders from a structured form |
| **Invoice Generation** | Convert orders to invoices in one step |
| **Real-Time Analytics** | Monthly cost trends, daily order volume, average order value, top product categories |
| **Bulk CSV Import** | Upload orders in bulk via CSV or XLSX with client-side validation before any request is made |
| **Email Notifications** | Automated confirmation emails to buyer and seller on order creation |
| **XML Viewer** | Syntax-highlighted, copyable UBL XML document viewer on every order detail page |
| **Chatbot** | Navigates you around the platform. Not GPT. Knows this. Has made peace with it. |

---

## Screenshots

### Homepage
![Homepage](./docs/homepage.jpeg)

![Homepage](./docs/homepage2.jpeg)

### Analytics Dashboard
![Dashboard](./docs/dashboard.jpeg)

![Dashboard](./docs/dashboard2.jpeg)

### Order Detail — UBL XML Viewer
![Order detail with XML viewer](./docs/xml.jpeg)

![View all Orders](./docs/orders.jpeg)


### Bulk Order
![Order create](./docs/bulk.jpeg)

### Chatbot
![Early Chatbot](./docs/chatbot.jpeg)




---

## Tech Stack

**Frontend**
- React 18 + Vite
- TypeScript
- Tailwind CSS
- Recharts
- Deployed on **Vercel**

**Backend**
- Node.js + Express
- TypeScript
- PostgreSQL
- JWT authentication with session revocation
- Nodemailer for transactional email
- Deployed on **Railway**

---

## Technical Highlights

- **UBL 2.1 XML compliance** — every order is automatically serialised to a standards-compliant XML document, not string concatenation
- **JWT session management** — tokens have configurable expiry, and explicit logout immediately revokes the session, so a stolen token stops working the moment the user logs out
- **Bulk import with client-side validation** — CSV and XLSX uploads are fully validated in the browser before any request hits the backend, including email format, required fields, and numeric type enforcement per row
- **Syntax-highlighted XML viewer** — a dependency-free tokenizer renders the raw stored UBL document with per-token colour coding directly on the order detail page

---

## Local Development

### Prerequisites
- Node.js 18+
- PostgreSQL instance (local or managed — Railway works well)

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

**Required environment variables:**
```
DATABASE_URL=postgresql://user:password@host:port/dbname
JWT_SECRET=your-secret-here
FRONTEND_URL=http://localhost:5173
```

### Frontend

```bash
cd frontend/src
npm install
npm run dev
```

**Optional environment variable:**
```
VITE_API_BASE_URL=http://localhost:3030
```
Falls back to `http://localhost:3030` if unset.

---

## Project Background

This started as a UNSW SENG2021 team capstone — which means the original codebase had the usual hallmarks of a project built under deadline pressure. Since then it's been redeployed independently to production, with a number of bugs fixed, security gaps addressed, and a full frontend redesign completed.

The frontend is built on the [Mosaic](https://github.com/cruip/tailwind-dashboard-template) open-source Tailwind dashboard template by Cruip, extended and restyled substantially across all pages.

The original chatbot is a product of its time — built before LLM APIs were the obvious answer to everything. It knows its way around the platform, and it knows it's not GPT.

A full design and technical report from the original project submission is available in [`docs/Final_Design_Report.pdf`](./docs/Final_Design_Report.pdf) for anyone interested in the original system design and requirements.

---

## API Documentation

Swagger docs available at `/api-docs` on the running backend.

---

## Acknowledgements

Built originally with teammates as part of UNSW SENG2021. Redeployed, debugged, and redesigned independently — using [Claude](https://claude.ai) as a development assistant for code review, debugging, and design iteration.