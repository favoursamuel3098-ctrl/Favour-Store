# Favour Store — Project Structure & Progress

```
Favour-Store/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── index.ts
│   │   ├── lib/prisma.ts
│   │   ├── middleware/auth.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── products.ts
│   │   │   └── categories.ts
│   │   └── utils/auth.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── .gitignore
├── README.md
└── STRUCTURE.md
```

## Progress

### Done
- [x] Project scaffold (backend + frontend)
- [x] Full Prisma schema
- [x] Express server + security
- [x] JWT Auth (register, login, /me)
- [x] Role-based access (USER / ADMIN)
- [x] Product routes (list + admin CRUD)
- [x] Category routes
- [x] Database seed (categories + admin)
- [x] Frontend home page

### Next
- [ ] Cart system
- [ ] Checkout + Opay payment
- [ ] Digital delivery
- [ ] Admin Dashboard UI
- [ ] User Dashboard UI
- [ ] Contact page
- [ ] Deploy

## Admin Account (after seeding)
- Email: favoursamuel3098@gmail.com
- Password: ChangeMe123!
