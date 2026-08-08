# Favour Store — Project Structure

```
Favour-Store/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma      # Database models
│   ├── src/
│   │   ├── index.ts           # Express server entry
│   │   ├── lib/
│   │   │   └── prisma.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   └── utils/
│   │       └── auth.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx            # Main routes + home page
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

## Current Progress

✅ Project scaffolded  
✅ Prisma schema (Users, Products, Orders, Keys, Downloads, Refunds)  
✅ Basic Express API + health check  
✅ JWT auth helpers + middleware  
✅ React + Vite + Tailwind frontend shell  
✅ Home page with branding & contact info  

## Next Steps

1. Auth routes (register / login / refresh)
2. Product routes + admin product management
3. Cart & Checkout
4. Opay payment integration
5. Digital delivery
6. Full Admin Dashboard
7. Full User Dashboard
