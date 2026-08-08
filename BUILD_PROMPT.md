# Favour Store — Complete Build Prompt

> **Document type:** Self-contained build prompt  
> **Version:** 2.2.0  
> **Date:** 2026-08-08  
> **Owner:** Favour Samuel Olakunle  
> **Deployment:** App Deploy (live site) + GitHub (source + future full stack)

Hand this document to any AI coding agent or developer to rebuild or extend the platform end-to-end.

---

## 1. Purpose & Business Overview

Build **Favour Store** — a printing press, design, and branding business website.

### What the business sells / offers
- Custom tumblers & engraved cups
- Birthday & event posters / flyers
- Business cards (with QR codes)
- Award certificates & frames
- School badges, prefect tags, lapel pins
- Custom jerseys (names & numbers)
- Water bottle labels
- Photo mugs
- Cash invoices & stationery
- Logo, branding, graphics design
- Banners, frames, mounting

### Core customer flow
1. Customer opens the website
2. Browses services / work samples
3. Taps **Order on WhatsApp**
4. Chats with the owner about the job (frame, banner, cards, etc.)
5. Design is previewed and approved
6. Customer pays to **Opay 7075627260** (Favour Samuel Olakunle)
7. Job is printed and delivered

### Business contact (must appear on site)
- **Owner:** Favour Samuel Olakunle
- **WhatsApp / Phone:** 09054434502  
  (WhatsApp link format: `https://wa.me/2349054434502`)
- **Email:** favoursamuel3098@gmail.com
- **Opay Account:** 7075627260  
  **Account Name:** Favour Samuel Olakunle

---

## 2. Deployment Strategy (Important)

### Primary: App Deploy (live public site)
- Use **App Deploy** (`frontend-only` or `frontend+backend`) to publish a public URL quickly.
- App type for MVP: **frontend-only** + **react-vite** template.
- Goal: live marketing + WhatsApp ordering site that customers can open immediately.
- No Google Play, no APK for this product (it is a website, not an Android app).

### Secondary: GitHub (source of truth)
- Repository: `favoursamuel3098-ctrl/Favour-Store`
- Push all source code here.
- Use GitHub for version control, collaboration, and later full-stack deploy (Railway/Vercel).

### Related project (separate)
- **Offline QR / Barcode Android app** lives in `favoursamuel3098-ctrl/Barcode`
- That project uses **GitHub Actions** to build **APK** artifacts.
- Do **not** mix APK build into Favour Store. Favour Store = website only.

---

## 3. Product Requirements

### Public pages (required)
1. **Home**
   - Brand: Favour Store
   - Tagline: Printing Press · Design · Branding
   - Hero with WhatsApp CTA
   - Services grid (12+ services)
   - How-to-order steps (Message → Design → Pay & Print)
   - Payment block (Opay number + name)
   - Footer with contact

2. **Work / Services gallery**
   - Cards for each service type
   - Each card opens WhatsApp with prefilled message, e.g.  
     `Hello Favour Store! I want to order: Custom Tumblers`

3. **Contact**
   - Owner name, WhatsApp, email, Opay
   - Big WhatsApp button
   - List of services

4. **Navbar**
   - Logo / store name
   - WhatsApp button (green)
   - Optional: Work, Contact, Cart, Login

### Optional advanced features (full stack on GitHub)
- Register / Login (JWT)
- Cart + Checkout
- Manual Opay payment page (`/pay/:reference`)
- Admin dashboard (add products, confirm payments)
- User dashboard (orders)

These exist in the GitHub repo backend; the **live App Deploy MVP** prioritizes WhatsApp ordering.

---

## 4. Tech Stack

### App Deploy MVP (live site)
| Layer | Choice |
|-------|--------|
| Frontend | React + Vite + TypeScript + Tailwind |
| Routing | HashRouter or simple single-page (no absolute `/` routes on App Deploy SPA) |
| Ordering | WhatsApp deep links only |
| Hosting | App Deploy public URL |

### Full stack (GitHub)
| Layer | Choice |
|-------|--------|
| Frontend | React + Vite + TypeScript + Tailwind |
| Backend | Node.js + Express + TypeScript |
| Database | PostgreSQL + Prisma |
| Auth | JWT (access + refresh), roles USER / ADMIN |
| Payments | Manual Opay transfer (account 7075627260) |
| Deploy later | Frontend → Vercel; Backend + DB → Railway/Render |

---

## 5. WhatsApp Integration Rules

- Base number (international): `2349054434502`
- Link pattern:  
  `https://wa.me/2349054434502?text=${encodeURIComponent(message)}`
- Default messages:
  - General: `Hello Favour Store! I want to order a design / print job.`
  - Service-specific: `Hello! I want to order: {Service Name}`
- Place WhatsApp CTAs on: navbar, hero, every service card, contact page, footer area.

---

## 6. Payment Rules

- **Method:** Manual Opay transfer (no merchant API keys required for MVP)
- **Account number:** 7075627260
- **Account name:** Favour Samuel Olakunle
- Show these clearly on Home and Contact.
- Optional full-stack flow:
  1. Create order → status PENDING
  2. Show payment page with Opay details + order reference
  3. Customer clicks “I have paid”
  4. Admin confirms in `/admin/orders` → order FULFILLED

---

## 7. Design Guidelines

- Mobile-first, clean, professional
- Brand accent: sky/blue (`brand` / sky-600–900)
- WhatsApp buttons: green (`green-500`)
- Clear large tap targets
- Trust section: Custom Design · Quality Print · Easy WhatsApp Order
- Footer always shows owner, WhatsApp, email, Opay, version

---

## 8. App Deploy Instructions (for AI agent)

1. Call `get_deploy_instructions` with:
   - `app_type`: `frontend-only`
   - `frontend_template`: `react-vite`
2. Build a single polished storefront page (or few views) with:
   - Hero, services grid, how-to-order, payment, contact, footer
   - All WhatsApp links working
3. Replace `APP_TITLE` with `Favour Store - Printing Press & Design`
4. Provide `tests/tests.txt` with 3–5 tests covering:
   - Branding visible
   - Services listed
   - Opay details visible
   - WhatsApp CTAs present
5. Call `deploy_app` and poll `get_app_status` until `ready`
6. Return the live URL to the user

### Live example already deployed
- URL: `https://favour-store-6t0wsy.v2.appdeploy.ai/`
- App ID: `favour-store-6t0wsy`

---

## 9. GitHub Instructions

### Repo
- `https://github.com/favoursamuel3098-ctrl/Favour-Store`

### Structure (already scaffolded)
```
Favour-Store/
├── frontend/          # React storefront + admin/user shells
├── backend/           # Express + Prisma API
├── BUILD_PROMPT.md    # This file
├── README.md
└── STRUCTURE.md
```

### Push rules
- Commit meaningful changes to `main`
- Keep secrets out of git (use `.env.example` only)
- Version in footer / README: **2.2.0**

### Future full deploy from GitHub
1. Backend + Postgres on Railway
2. Frontend on Vercel with `VITE_API_URL` pointing to Railway
3. Seed admin: favoursamuel3098@gmail.com

---

## 10. Admin bootstrap (full stack only)

- Email: `favoursamuel3098@gmail.com`
- Default password (change after first login): `ChangeMe123!`
- Role: ADMIN

---

## 11. Acceptance Criteria

### App Deploy MVP
- [ ] Public URL loads on mobile and desktop
- [ ] Store name “Favour Store” visible
- [ ] At least 10 service categories visible
- [ ] WhatsApp links open chat to 09054434502 with useful prefill
- [ ] Opay 7075627260 and Favour Samuel Olakunle shown
- [ ] Contact email visible
- [ ] No broken layout on 375px width

### GitHub full stack (optional phase)
- [ ] Auth register/login works
- [ ] Admin can create products
- [ ] Cart + checkout creates order with reference
- [ ] Payment page shows Opay details
- [ ] Admin can confirm payment by reference
- [ ] Code pushed to GitHub repo

---

## 12. Out of Scope

- Google Play Store listing for Favour Store
- Building an Android APK for Favour Store
- Automatic Opay merchant API (unless keys are provided later)
- Mixing Barcode APK workflow into this repo

---

## 13. One-line agent instruction

**Build and deploy Favour Store as a mobile-first printing press website with WhatsApp ordering to 09054434502, show Opay 7075627260 (Favour Samuel Olakunle), use App Deploy for the live site, and keep full source on GitHub `favoursamuel3098-ctrl/Favour-Store`. Do not build an APK for this product.**

---

*End of build prompt.*
