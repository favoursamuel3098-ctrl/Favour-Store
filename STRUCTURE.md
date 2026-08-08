# Favour Store — Progress

## Done
- [x] Project scaffold (backend + frontend)
- [x] Full Prisma schema
- [x] Express server + security
- [x] JWT Auth (register, login, /me)
- [x] Role-based access (USER / ADMIN)
- [x] Product routes + Categories
- [x] Database seed
- [x] **Cart system** (add / remove / clear / view)
- [x] **Checkout** (create order from cart)
- [x] **Opay webhook** (marks order as paid + assigns license keys)
- [x] Frontend home page

## Next
- [ ] Connect real Opay Cashier API (needs your merchant keys)
- [ ] Digital delivery emails
- [ ] Admin Dashboard UI
- [ ] User Dashboard UI
- [ ] Contact page
- [ ] Deploy

## API Endpoints so far

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Current user |
| GET | /api/products | List products |
| GET | /api/products/:slug | Single product |
| POST | /api/products | Create product (Admin) |
| GET | /api/categories | List categories |
| GET | /api/cart | View cart |
| POST | /api/cart/add | Add to cart |
| DELETE | /api/cart/:productId | Remove item |
| POST | /api/orders/checkout | Create order |
| GET | /api/orders/my | My orders |
| POST | /api/payments/opay/webhook | Opay callback |

## Admin Account
- Email: favoursamuel3098@gmail.com
- Password: ChangeMe123!
