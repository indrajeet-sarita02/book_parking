# Book Parking - Development Specification

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | JavaScript |
| ORM | Sequelize 6 |
| Database | PostgreSQL |
| Auth | JWT + HttpOnly Cookies |
| Validation | Zod |
| State | Zustand (global), React Context (theme/auth) |
| HTTP Client | fetch (built-in) |
| Charts | Recharts |
| Date | date-fns |
| QR | qrcode |
| Invoice | jspdf + html2canvas |

## Project Structure

```
src/
├── app/
│   ├── (website)/
│   │   ├── layout.js
│   │   ├── page.js                  # Home
│   │   ├── about/page.js
│   │   ├── contact/page.js
│   │   ├── pricing/page.js
│   │   ├── login/page.js
│   │   ├── register/page.js
│   │   ├── forgot-password/page.js
│   │   ├── parking/
│   │   │   ├── page.js              # Search / List
│   │   │   └── [id]/page.js         # Details + Slots
│   │   ├── booking/
│   │   │   ├── [id]/page.js         # Book + Pay
│   │   │   └── success/page.js
│   │   ├── bookings/
│   │   │   ├── page.js              # My Bookings
│   │   │   └── [id]/page.js         # Booking Detail
│   │   ├── profile/page.js
│   │   ├── notifications/page.js
│   │   └── settings/page.js
│   │
│   ├── admin/
│   │   ├── layout.js
│   │   ├── page.js                  # Redirect → /admin/dashboard
│   │   ├── dashboard/page.js
│   │   ├── users/
│   │   │   ├── page.js
│   │   │   ├── add/page.js
│   │   │   └── [id]/page.js
│   │   ├── locations/
│   │   │   ├── page.js
│   │   │   ├── add/page.js
│   │   │   └── [id]/page.js
│   │   ├── slots/
│   │   │   ├── page.js
│   │   │   ├── add/page.js
│   │   │   └── [id]/page.js
│   │   ├── bookings/
│   │   │   ├── page.js
│   │   │   ├── pending/page.js
│   │   │   ├── confirmed/page.js
│   │   │   ├── cancelled/page.js
│   │   │   ├── completed/page.js
│   │   │   └── [id]/page.js
│   │   ├── pricing/
│   │   │   ├── page.js
│   │   │   └── edit/page.js
│   │   ├── reports/
│   │   │   ├── page.js
│   │   │   ├── revenue/page.js
│   │   │   └── analytics/page.js
│   │   ├── settings/page.js
│   │   └── profile/page.js
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.js
│   │   │   ├── login/route.js
│   │   │   ├── logout/route.js
│   │   │   └── me/route.js
│   │   ├── users/
│   │   │   ├── route.js             # GET (list), POST
│   │   │   └── [id]/route.js        # GET, PUT, DELETE
│   │   ├── locations/
│   │   │   ├── route.js
│   │   │   └── [id]/route.js
│   │   ├── slots/
│   │   │   ├── route.js
│   │   │   ├── [id]/route.js
│   │   │   └── available/route.js
│   │   ├── bookings/
│   │   │   ├── route.js
│   │   │   ├── [id]/route.js
│   │   │   ├── [id]/confirm/route.js
│   │   │   ├── [id]/cancel/route.js
│   │   │   ├── [id]/checkin/route.js
│   │   │   ├── [id]/checkout/route.js
│   │   │   └── [id]/invoice/route.js
│   │   ├── payments/
│   │   │   ├── route.js
│   │   │   ├── [id]/route.js
│   │   │   └── verify/route.js
│   │   ├── reports/
│   │   │   ├── revenue/route.js
│   │   │   ├── bookings/route.js
│   │   │   └── utilization/route.js
│   │   └── upload/route.js
│   │
│   └── not-found.js
│
├── components/
│   ├── ui/                          # Shadcn primitives
│   │   ├── button.js
│   │   ├── input.js
│   │   ├── card.js
│   │   ├── dialog.js
│   │   ├── table.js
│   │   ├── badge.js
│   │   ├── select.js
│   │   ├── skeleton.js
│   │   ├── toast.js
│   │   └── ...
│   ├── layout/
│   │   ├── header.js
│   │   ├── footer.js
│   │   ├── sidebar.js               # Admin sidebar
│   │   ├── mobile-nav.js
│   │   └── breadcrumb.js
│   ├── forms/
│   │   ├── login-form.js
│   │   ├── register-form.js
│   │   ├── location-form.js
│   │   ├── slot-form.js
│   │   ├── booking-form.js
│   │   └── profile-form.js
│   ├── booking/
│   │   ├── booking-card.js
│   │   ├── booking-timeline.js
│   │   ├── booking-qr.js
│   │   ├── booking-invoice.js
│   │   └── status-badge.js
│   ├── parking/
│   │   ├── location-card.js
│   │   ├── slot-grid.js
│   │   ├── slot-item.js
│   │   ├── search-bar.js
│   │   └── filter-panel.js
│   ├── dashboard/
│   │   ├── stat-card.js
│   │   ├── revenue-chart.js
│   │   ├── bookings-chart.js
│   │   ├── recent-bookings.js
│   │   └── recent-payments.js
│   ├── shared/
│   │   ├── data-table.js
│   │   ├── search-input.js
│   │   ├── pagination.js
│   │   ├── confirm-dialog.js
│   │   ├── empty-state.js
│   │   ├── error-state.js
│   │   ├── loading-state.js
│   │   ├── page-header.js
│   │   └── image-upload.js
│   └── providers/
│       ├── auth-provider.js
│       ├── theme-provider.js
│       └── toast-provider.js
│
├── lib/
│   ├── utils.js                     # cn(), formatDate(), etc.
│   ├── constants.js
│   ├── validations/
│   │   ├── auth.js
│   │   ├── location.js
│   │   ├── slot.js
│   │   ├── booking.js
│   │   └── user.js
│   └── api/
│       ├── client.js                # fetch wrapper
│       ├── auth.js
│       ├── users.js
│       ├── locations.js
│       ├── slots.js
│       ├── bookings.js
│       └── payments.js
│
├── hooks/
│   ├── use-auth.js
│   ├── use-debounce.js
│   ├── use-media-query.js
│   └── use-pagination.js
│
├── store/
│   ├── auth-store.js
│   └── ui-store.js
│
├── middlewares/
│   ├── auth.js
│   ├── role.js
│   └── rate-limit.js
│
├── config/
│   ├── database.js                  # Sequelize instance
│   ├── auth.js                      # JWT config
│   └── app.js                       # App constants
│
├── models/
│   ├── User.js
│   ├── Location.js
│   ├── ParkingSlot.js
│   ├── Booking.js
│   └── Payment.js
│
├── controllers/
│   ├── auth-controller.js
│   ├── user-controller.js
│   ├── location-controller.js
│   ├── slot-controller.js
│   ├── booking-controller.js
│   ├── payment-controller.js
│   └── report-controller.js
│
├── services/
│   ├── auth-service.js
│   ├── user-service.js
│   ├── location-service.js
│   ├── slot-service.js
│   ├── booking-service.js
│   ├── payment-service.js
│   ├── report-service.js
│   ├── qr-service.js
│   ├── invoice-service.js
│   └── notification-service.js
│
├── repositories/
│   ├── user-repo.js
│   ├── location-repo.js
│   ├── slot-repo.js
│   ├── booking-repo.js
│   └── payment-repo.js
│
├── database/
│   ├── index.js                     # DB init + sync
│   ├── seed.js                      # Seed data
│   └── migrations/                  # Manual migrations (if needed)
│
└── public/
    ├── images/
    ├── icons/
    └── fonts/
```

## Naming Conventions

| Artifact | Convention | Example |
|----------|-----------|---------|
| Files | kebab-case | `booking-form.js` |
| Components | PascalCase | `BookingCard` |
| Functions | camelCase | `getAvailableSlots` |
| Variables | camelCase | `totalAmount` |
| Constants | UPPER_SNAKE | `BOOKING_STATUS` |
| DB Columns | snake_case | `slot_number` |
| API Routes | kebab-case | `/api/bookings/checkin` |
| Models | PascalCase (singular) | `ParkingSlot` |
| Tables | snake_case (plural) | `parking_slots` |

## Database Models

### User
```js
// models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id:        { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name:      { type: DataTypes.STRING(100), allowNull: false },
    email:     { type: DataTypes.STRING(100), allowNull: false, unique: true },
    mobile:    { type: DataTypes.STRING(15), allowNull: false },
    password:  { type: DataTypes.STRING(255), allowNull: false },
    role:      { type: DataTypes.ENUM('super_admin', 'admin', 'staff', 'customer'), defaultValue: 'customer' },
    status:    { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
    avatar:    { type: DataTypes.STRING(255) },
  }, { timestamps: true, underscored: true });
  return User;
};
```

### Location
```js
// models/Location.js
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    id:            { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name:          { type: DataTypes.STRING(200), allowNull: false },
    address:       { type: DataTypes.TEXT },
    city:          { type: DataTypes.STRING(100), allowNull: false },
    state:         { type: DataTypes.STRING(100), allowNull: false },
    latitude:      { type: DataTypes.DOUBLE },
    longitude:     { type: DataTypes.DOUBLE },
    opening_time:  { type: DataTypes.TIME, defaultValue: '00:00:00' },
    closing_time:  { type: DataTypes.TIME, defaultValue: '23:59:00' },
    total_slots:   { type: DataTypes.INTEGER, defaultValue: 0 },
    images:        { type: DataTypes.TEXT }, // JSON array
    status:        { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
  }, { timestamps: true, underscored: true });
  return Location;
};
```

### ParkingSlot
```js
// models/ParkingSlot.js
module.exports = (sequelize, DataTypes) => {
  const ParkingSlot = sequelize.define('ParkingSlot', {
    id:            { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    location_id:   { type: DataTypes.INTEGER, allowNull: false },
    slot_number:   { type: DataTypes.STRING(20), allowNull: false },
    floor:         { type: DataTypes.STRING(20) },
    vehicle_type:  { type: DataTypes.ENUM('car', 'bike', 'auto', 'bus', 'truck', 'ev'), defaultValue: 'car' },
    status:        { type: DataTypes.ENUM('available', 'occupied', 'reserved', 'maintenance'), defaultValue: 'available' },
    price_per_hour:{ type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 },
  }, { timestamps: true, underscored: true });
  return ParkingSlot;
};
```

### Booking
```js
// models/Booking.js
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    id:             { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    booking_number: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    user_id:        { type: DataTypes.INTEGER, allowNull: false },
    location_id:    { type: DataTypes.INTEGER, allowNull: false },
    slot_id:        { type: DataTypes.INTEGER, allowNull: false },
    vehicle_number: { type: DataTypes.STRING(20), allowNull: false },
    vehicle_type:   { type: DataTypes.ENUM('car', 'bike', 'auto', 'bus', 'truck', 'ev'), defaultValue: 'car' },
    date:           { type: DataTypes.DATEONLY, allowNull: false },
    start_time:     { type: DataTypes.TIME, allowNull: false },
    end_time:       { type: DataTypes.TIME, allowNull: false },
    hours:          { type: DataTypes.DECIMAL(5, 2), allowNull: false },
    amount:         { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    discount:       { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    tax:            { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    total_amount:   { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    payment_status: { type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'), defaultValue: 'pending' },
    booking_status: { type: DataTypes.ENUM('pending', 'confirmed', 'checked_in', 'checked_out', 'completed', 'cancelled', 'refunded'), defaultValue: 'pending' },
    qr_code:        { type: DataTypes.TEXT },
    notes:          { type: DataTypes.TEXT },
  }, { timestamps: true, underscored: true });
  return Booking;
};
```

### Payment
```js
// models/Payment.js
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    id:             { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    booking_id:     { type: DataTypes.INTEGER, allowNull: false },
    transaction_id: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    amount:         { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    payment_method: { type: DataTypes.ENUM('razorpay', 'stripe', 'cash', 'wallet'), defaultValue: 'razorpay' },
    status:         { type: DataTypes.ENUM('pending', 'success', 'failed', 'refunded'), defaultValue: 'pending' },
    payment_data:   { type: DataTypes.TEXT }, // JSON response from gateway
  }, { timestamps: true, underscored: true });
  return Payment;
};
```

### Model Associations
```js
// database/index.js
User.hasMany(Booking, { foreignKey: 'user_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

Location.hasMany(ParkingSlot, { foreignKey: 'location_id' });
ParkingSlot.belongsTo(Location, { foreignKey: 'location_id' });

Location.hasMany(Booking, { foreignKey: 'location_id' });
Booking.belongsTo(Location, { foreignKey: 'location_id' });

ParkingSlot.hasMany(Booking, { foreignKey: 'slot_id' });
Booking.belongsTo(ParkingSlot, { foreignKey: 'slot_id' });

Booking.hasOne(Payment, { foreignKey: 'booking_id' });
Payment.belongsTo(Booking, { foreignKey: 'booking_id' });
```

## Constants

```js
// lib/constants.js
export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  STAFF: 'staff',
  CUSTOMER: 'customer',
};

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CHECKED_IN: 'checked_in',
  CHECKED_OUT: 'checked_out',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

export const SLOT_STATUS = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  RESERVED: 'reserved',
  MAINTENANCE: 'maintenance',
};

export const VEHICLE_TYPES = ['car', 'bike', 'auto', 'bus', 'truck', 'ev'];

export const BOOKING_STATUS_COLORS = {
  pending: 'yellow',
  confirmed: 'blue',
  checked_in: 'indigo',
  checked_out: 'purple',
  completed: 'green',
  cancelled: 'red',
  refunded: 'gray',
};

export const PAYMENT_STATUS_COLORS = {
  pending: 'yellow',
  paid: 'green',
  failed: 'red',
  refunded: 'gray',
};

export const STATES_OF_INDIA = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar', 'Chandigarh', 'Delhi', 'Jammu and Kashmir',
  'Ladakh', 'Lakshadweep', 'Puducherry',
];

export const BOOKING_NUMBER_PREFIX = 'PBK';
```

## API Response Format

### Success
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### List with Pagination
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

### Error
```json
{
  "success": false,
  "message": "Error description",
  "errors": [{ "field": "email", "message": "Email is required" }]
}
```

## API Client (Frontend)

```js
// lib/api/client.js
const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const config = {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await res.json();

  if (!res.ok) throw new ApiError(data.message, res.status, data.errors);
  return data;
}

export const api = {
  get:    (url, opts) => request(url, { ...opts, method: 'GET' }),
  post:   (url, body, opts) => request(url, { ...opts, method: 'POST', body: JSON.stringify(body) }),
  put:    (url, body, opts) => request(url, { ...opts, method: 'PUT', body: JSON.stringify(body) }),
  delete: (url, opts) => request(url, { ...opts, method: 'DELETE' }),
};
```

## Controller Pattern

```js
// controllers/location-controller.js
const locationService = require('../services/location-service');
const { success, paginated, error } = require('../helpers/response');

exports.list = async (req) => {
  const { page, limit, city, state, status } = req.query;
  const result = await locationService.getAll({ page, limit, city, state, status });
  return paginated(result.data, result.pagination);
};

exports.getById = async (req) => {
  const location = await locationService.getById(req.params.id);
  if (!location) throw new NotFoundError('Location not found');
  return success(location);
};

exports.create = async (req) => {
  const location = await locationService.create(req.body);
  return success(location, 'Location created successfully');
};

exports.update = async (req) => {
  const location = await locationService.update(req.params.id, req.body);
  return success(location, 'Location updated successfully');
};

exports.delete = async (req) => {
  await locationService.delete(req.params.id);
  return success(null, 'Location deleted successfully');
};
```

## Route Handler Pattern

```js
// app/api/locations/route.js
import { NextResponse } from 'next/server';
import { locationController } from '@/controllers';
import { withAuth, withRole } from '@/middlewares/auth';
import { validate } from '@/middlewares/validate';
import { createLocationSchema } from '@/lib/validations/location';

export const GET = withAuth(async (req) => {
  const result = await locationController.list(req);
  return NextResponse.json(result);
});

export const POST = withAuth(
  withRole(['super_admin', 'admin']),
  validate(createLocationSchema),
  async (req) => {
    const result = await locationController.create(req);
    return NextResponse.json(result, { status: 201 });
  }
);
```

## Middleware

```js
// middlewares/auth.js
import { jwtVerify } from '@/lib/jwt';
import { NextResponse } from 'next/server';

export function withAuth(handler) {
  return async (req) => {
    try {
      const token = req.cookies.get('token')?.value;
      if (!token) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
      }
      const payload = jwtVerify(token);
      req.user = payload;
      return handler(req);
    } catch (err) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }
  };
}

export function withRole(roles) {
  return (handler) => async (req) => {
    if (!roles.includes(req.user.role)) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }
    return handler(req);
  };
}
```

```js
// middlewares/validate.js
import { NextResponse } from 'next/server';

export function validate(schema) {
  return (handler) => async (req) => {
    try {
      const body = await req.json();
      const parsed = schema.parse(body);
      req.validatedBody = parsed;
      return handler(req);
    } catch (err) {
      const errors = err.errors?.map(e => ({ field: e.path.join('.'), message: e.message })) || [];
      return NextResponse.json({ success: false, message: 'Validation failed', errors }, { status: 400 });
    }
  };
}
```

## Booking Number Generation

```js
// helpers/booking-number.js
import { BOOKING_NUMBER_PREFIX } from '@/lib/constants';
import { sequelize } from '@/config/database';

export async function generateBookingNumber() {
  const date = new Date();
  const prefix = BOOKING_NUMBER_PREFIX;
  const yy = date.getFullYear().toString().slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const dateStr = `${yy}${mm}${dd}`;

  const [result] = await sequelize.query(
    `SELECT COUNT(*) as count FROM bookings WHERE created_at::date = CURRENT_DATE`
  );
  const seq = String(Number(result[0]?.count || 0) + 1).padStart(4, '0');

  return `${prefix}${dateStr}${seq}`;
}
```

## State Management (Zustand)

```js
// store/auth-store.js
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  clearUser: () => set({ user: null, isAuthenticated: false, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
}));
```

```js
// store/ui-store.js
import { create } from 'zustand';

export const useUiStore = create((set) => ({
  sidebarOpen: false,
  currentModal: null,

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  openModal: (modal) => set({ currentModal: modal }),
  closeModal: () => set({ currentModal: null }),
}));
```

## Auth Provider

```js
// components/providers/auth-provider.js
'use client';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { api } from '@/lib/api/client';

export function AuthProvider({ children }) {
  const { setUser, clearUser, setLoading } = useAuthStore();

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await api.get('/auth/me');
        setUser(res.data);
      } catch {
        clearUser();
      }
    }
    loadUser();
  }, []);

  return children;
}
```

## Layout Provider Setup

```js
// app/layout.js
import { AuthProvider } from '@/components/providers/auth-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## Validation Schemas (Zod)

```js
// lib/validations/location.js
import { z } from 'zod';

export const createLocationSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  address: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  opening_time: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, 'Invalid time format'),
  closing_time: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, 'Invalid time format'),
  total_slots: z.number().int().positive().optional(),
});
```

```js
// lib/validations/booking.js
import { z } from 'zod';

export const createBookingSchema = z.object({
  location_id: z.number().int().positive(),
  slot_id: z.number().int().positive(),
  vehicle_number: z.string().regex(/^[A-Z]{2}\s?\d{1,2}\s?[A-Z]{1,2}\s?\d{1,4}$/, 'Invalid Indian vehicle number'),
  vehicle_type: z.enum(['car', 'bike', 'auto', 'bus', 'truck', 'ev']),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  start_time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
  end_time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
});
```

## Database Config

```js
// config/database.js
const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';

const dbConfig = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: false,
  pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

const sequelize = new Sequelize(dbConfig);

module.exports = sequelize;
```

```js
// database/index.js
const sequelize = require('../config/database');
const User = require('../models/User');
const Location = require('../models/Location');
const ParkingSlot = require('../models/ParkingSlot');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

// Define associations
User.hasMany(Booking, { foreignKey: 'user_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

Location.hasMany(ParkingSlot, { foreignKey: 'location_id' });
ParkingSlot.belongsTo(Location, { foreignKey: 'location_id' });

Location.hasMany(Booking, { foreignKey: 'location_id' });
Booking.belongsTo(Location, { foreignKey: 'location_id' });

ParkingSlot.hasMany(Booking, { foreignKey: 'slot_id' });
Booking.belongsTo(ParkingSlot, { foreignKey: 'slot_id' });

Booking.hasOne(Payment, { foreignKey: 'booking_id' });
Payment.belongsTo(Booking, { foreignKey: 'booking_id' });

async function initDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('Database synced successfully');
  } catch (err) {
    console.error('Database sync failed:', err);
    process.exit(1);
  }
}

module.exports = { sequelize, initDatabase, User, Location, ParkingSlot, Booking, Payment };
```

## Seed Data

```js
// database/seed.js
const bcrypt = require('bcryptjs');
const { User, Location, ParkingSlot, Booking, Payment } = require('./index');

async function seed() {
  const hash = await bcrypt.hash('admin123', 10);

  const admin = await User.create({
    name: 'Super Admin', email: 'admin@parking.com',
    mobile: '9999999999', password: hash,
    role: 'super_admin', status: 'active',
  });

  const customer = await User.create({
    name: 'Test User', email: 'user@parking.com',
    mobile: '8888888888', password: hash,
    role: 'customer', status: 'active',
  });

  const location = await Location.create({
    name: 'City Center Parking', address: '123 MG Road',
    city: 'Mumbai', state: 'Maharashtra',
    opening_time: '06:00', closing_time: '23:00',
    total_slots: 20, status: 'active',
  });

  for (let i = 1; i <= 20; i++) {
    await ParkingSlot.create({
      location_id: location.id,
      slot_number: `A${i}`,
      floor: 'Ground',
      vehicle_type: i <= 15 ? 'car' : 'bike',
      status: 'available',
      price_per_hour: i <= 15 ? 50 : 20,
    });
  }

  console.log('Seed data inserted successfully');
}

seed().catch(console.error);
```

## Image Upload

```js
// app/api/upload/route.js
import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), 'public/uploads');
  await mkdir(uploadDir, { recursive: true });

  const filename = `${Date.now()}-${file.name}`;
  await writeFile(path.join(uploadDir, filename), buffer);

  return NextResponse.json({ success: true, data: { url: `/uploads/${filename}` } });
}

export const config = { api: { bodyParser: false } };
```

## Data Table Component

```js
// components/shared/data-table.js
'use client';
import { SearchInput } from './search-input';
import { Pagination } from './pagination';
import { Skeleton } from '@/components/ui/skeleton';

export function DataTable({
  columns, data, loading, error,
  search, onSearch,
  page, totalPages, onPageChange,
  onRowClick,
}) {
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="space-y-4">
      {onSearch && <SearchInput value={search} onChange={onSearch} />}

      <div className="rounded-md border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              {columns.map(col => (
                <th key={col.key} className="text-left p-3 font-medium">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {columns.map(col => (
                    <td key={col.key} className="p-3"><Skeleton className="h-4 w-full" /></td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr><td colSpan={columns.length} className="text-center p-8 text-muted-foreground">No data found</td></tr>
            ) : (
              data.map((row, i) => (
                <tr key={row.id || i} className="border-t hover:bg-muted/50 cursor-pointer" onClick={() => onRowClick?.(row)}>
                  {columns.map(col => (
                    <td key={col.key} className="p-3">{col.render ? col.render(row) : row[col.key]}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
    </div>
  );
}
```

## Implementation Checklist

### Phase 1 — Foundation
- [ ] `npx create-next-app@latest parking-system --js --tailwind --app`
- [ ] Install deps: `sequelize pg bcryptjs jsonwebtoken zod zustand date-fns qrcode recharts @radix-ui/*`
- [ ] Init shadcn: `npx shadcn@latest init`
- [ ] Set up `config/database.js` + `database/index.js` + models
- [ ] Create `.env` + `.env.example`
- [ ] Build `lib/api/client.js`
- [ ] Build `middlewares/auth.js` + `middlewares/validate.js`
- [ ] Create `store/auth-store.js` + `AuthProvider`
- [ ] Create login/register pages + API routes

### Phase 2 — Admin
- [ ] Admin layout with sidebar + header
- [ ] Dashboard page with stat cards + charts
- [ ] Users CRUD (pages + API)
- [ ] Locations CRUD (pages + API)
- [ ] Slots CRUD (pages + API)
- [ ] Pricing page
- [ ] Bookings list with status filter tabs
- [ ] Booking detail + confirm/cancel/checkin/checkout actions

### Phase 3 — Customer
- [ ] Home page with search
- [ ] Location listing with city/state filters
- [ ] Location detail + slot grid
- [ ] Booking form (date, time, vehicle)
- [ ] Payment page (Razorpay/Stripe integration)
- [ ] Booking success + QR generation
- [ ] My Bookings page
- [ ] Booking detail with QR + timeline
- [ ] Cancel booking
- [ ] Profile + settings

### Phase 4 — Reports & Polish
- [ ] Revenue reports + charts
- [ ] Booking analytics
- [ ] Slot utilization report
- [ ] Invoice download (PDF)
- [ ] Search/filter on all admin tables
- [ ] Export to CSV
- [ ] Notifications system
- [ ] Activity logs

## Service Layer Pattern

```js
// services/location-service.js
const locationRepo = require('../repositories/location-repo');

exports.getAll = async ({ page = 1, limit = 10, city, state, status }) => {
  const offset = (page - 1) * limit;
  const where = {};
  if (city) where.city = city;
  if (state) where.state = state;
  if (status) where.status = status;

  const { rows, count } = await locationRepo.findAndCountAll({ where, limit, offset });
  return {
    data: rows,
    pagination: { page: Number(page), limit: Number(limit), total: count, totalPages: Math.ceil(count / limit) },
  };
};

exports.getById = async (id) => locationRepo.findById(id);

exports.create = async (data) => locationRepo.create(data);

exports.update = async (id, data) => {
  const location = await locationRepo.findById(id);
  if (!location) return null;
  return locationRepo.update(id, data);
};

exports.delete = async (id) => {
  const location = await locationRepo.findById(id);
  if (!location) return null;
  // Check no active bookings exist before deleting
  return locationRepo.delete(id);
};
```

## Repository Layer Pattern

```js
// repositories/location-repo.js
const { Location } = require('../database');

exports.findAndCountAll = (options) => Location.findAndCountAll(options);
exports.findById = (id) => Location.findByPk(id);
exports.create = (data) => Location.create(data);
exports.update = (id, data) => Location.update(data, { where: { id } });
exports.delete = (id) => Location.destroy({ where: { id } });
```

## Error Handling

```js
// helpers/errors.js
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

class ValidationError extends AppError {
  constructor(message = 'Validation failed', errors = []) {
    super(message, 400);
    this.errors = errors;
  }
}

module.exports = { AppError, NotFoundError, UnauthorizedError, ForbiddenError, ValidationError };
```

```js
// helpers/response.js
exports.success = (data, message = 'Success') => ({ success: true, data, message });
exports.paginated = (data, pagination, message = 'Success') => ({ success: true, data, pagination, message });
exports.error = (message, statusCode = 500, errors = []) => ({ success: false, message, errors, statusCode });
```

## Global Error Handler (API)

```js
// app/api/error-handler.js
import { NextResponse } from 'next/server';

export function errorHandler(err) {
  console.error('[API Error]', err);

  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal server error';

  return NextResponse.json(
    { success: false, message, errors: err.errors || [] },
    { status: statusCode }
  );
}
```

## Booking Service Logic

```js
// services/booking-service.js
const bookingRepo = require('../repositories/booking-repo');
const slotRepo = require('../repositories/slot-repo');
const { generateBookingNumber } = require('../helpers/booking-number');
const { AppError } = require('../helpers/errors');

exports.create = async (userId, data) => {
  // Check slot availability
  const slot = await slotRepo.findById(data.slot_id);
  if (!slot || slot.status !== 'available') {
    throw new AppError('Slot is not available', 400);
  }

  // Check slot belongs to location
  if (slot.location_id !== data.location_id) {
    throw new AppError('Slot does not belong to this location', 400);
  }

  // Check for overlapping bookings
  const overlapping = await bookingRepo.findOverlapping(
    data.slot_id, data.date, data.start_time, data.end_time
  );
  if (overlapping.length > 0) {
    throw new AppError('Slot already booked for this time period', 409);
  }

  // Calculate hours and amount
  const start = data.start_time.split(':').map(Number);
  const end = data.end_time.split(':').map(Number);
  const hours = ((end[0] * 60 + end[1]) - (start[0] * 60 + start[1])) / 60;
  if (hours <= 0) throw new AppError('End time must be after start time', 400);

  const amount = hours * parseFloat(slot.price_per_hour);
  const tax = amount * 0.18; // 18% GST
  const total = amount + tax;

  const booking = await bookingRepo.create({
    booking_number: await generateBookingNumber(),
    user_id: userId,
    location_id: data.location_id,
    slot_id: data.slot_id,
    vehicle_number: data.vehicle_number,
    vehicle_type: data.vehicle_type,
    date: data.date,
    start_time: data.start_time,
    end_time: data.end_time,
    hours,
    amount,
    tax,
    total_amount: total,
    payment_status: 'pending',
    booking_status: 'pending',
  });

  // Mark slot as reserved
  await slotRepo.update(data.slot_id, { status: 'reserved' });

  return booking;
};
```

## Package Dependencies

```json
{
  "dependencies": {
    "next": "^15",
    "react": "^19",
    "react-dom": "^19",
    "sequelize": "^6",
    "pg": "^8",
    "mysql2": "^3",
    "pg": "^8",
    "bcryptjs": "^2",
    "jsonwebtoken": "^9",
    "zod": "^3",
    "zustand": "^4",
    "date-fns": "^3",
    "qrcode": "^1",
    "jspdf": "^2",
    "html2canvas": "^1",
    "recharts": "^2",
    "react-hook-form": "^7",
    "@hookform/resolvers": "^3",
    "lucide-react": "^0.400",
    "next-themes": "^0.3",
    "clsx": "^2",
    "tailwind-merge": "^2",
    "class-variance-authority": "^0.7"
  },
  "devDependencies": {
    "tailwindcss": "^3",
    "autoprefixer": "^10",
    "postcss": "^8",
    "@tailwindcss/forms": "^0.5",
    "eslint": "^8",
    "eslint-config-next": "^15"
  }
}
```
