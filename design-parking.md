# Book Parking - Design Specification

## Design System

### Brand Identity

```
Brand Name:  ParkingBook
Tagline:    Park Smart, Drive Easy
Tone:       Professional, Trustworthy, Modern
```

### Color Palette

```css
/* Primary - Deep Blue (Trust, Professionalism) */
--primary:       #1E40AF    /* 800 blue */
--primary-light: #3B82F6   /* 500 blue */
--primary-dark:  #1E3A8A   /* 900 blue */

/* Secondary - Teal (Fresh, Modern) */
--secondary:       #0D9488   /* 600 teal */
--secondary-light: #14B8A6   /* 500 teal */
--secondary-dark:  #0F766E   /* 700 teal */

/* Accent - Amber (Warning, Attention) */
--accent:       #F59E0B   /* 500 amber */
--accent-light: #FBBF24   /* 400 amber */

/* Success / Danger / Info */
--success: #10B981   /* Emerald 500 */
--danger:  #EF4444   /* Red 500 */
--info:    #3B82F6   /* Blue 500 */
--warning: #F59E0B   /* Amber 500 */

/* Neutral */
--background: #F8FAFC    /* Slate 50 */
--foreground: #0F172A    /* Slate 900 */
--muted:      #F1F5F9    /* Slate 100 */
--muted-fg:   #64748B    /* Slate 500 */
--border:     #E2E8F0    /* Slate 200 */
--card:       #FFFFFF
--card-fg:    #0F172A

/* Dark Mode */
--dark-bg:       #0F172A   /* Slate 900 */
--dark-card:     #1E293B   /* Slate 800 */
--dark-border:   #334155   /* Slate 700 */
--dark-foreground: #F8FAFC
```

### Typography

```css
/* Font Family */
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* Font Sizes */
--text-xs:   0.75rem    /* 12px */
--text-sm:   0.875rem   /* 14px */
--text-base: 1rem       /* 16px */
--text-lg:   1.125rem   /* 18px */
--text-xl:   1.25rem    /* 20px */
--text-2xl:  1.5rem     /* 24px */
--text-3xl:  1.875rem   /* 30px */
--text-4xl:  2.25rem    /* 36px */
--text-5xl:  3rem       /* 48px */

/* Font Weights */
--fw-regular: 400
--fw-medium:  500
--fw-semibold: 600
--fw-bold:    700

/* Line Heights */
--leading-tight: 1.25
--leading-normal: 1.5
--leading-relaxed: 1.625
```

### Spacing Scale

```css
--space-0:   0px
--space-1:   0.25rem   /* 4px */
--space-2:   0.5rem    /* 8px */
--space-3:   0.75rem   /* 12px */
--space-4:   1rem      /* 16px */
--space-5:   1.25rem   /* 20px */
--space-6:   1.5rem    /* 24px */
--space-8:   2rem      /* 32px */
--space-10:  2.5rem    /* 40px */
--space-12:  3rem      /* 48px */
--space-16:  4rem      /* 64px */
--space-20:  5rem      /* 80px */
--space-24:  6rem      /* 96px */
```

### Border Radius

```css
--radius-sm:   0.25rem   /* 4px */
--radius-md:   0.375rem  /* 6px */
--radius-lg:   0.5rem    /* 8px */
--radius-xl:   0.75rem   /* 12px */
--radius-2xl:  1rem      /* 16px */
--radius-full: 9999px
```

### Shadows

```css
--shadow-sm:   0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow-md:   0 4px 6px -1px rgb(0 0 0 / 0.1)
--shadow-lg:   0 10px 15px -3px rgb(0 0 0 / 0.1)
--shadow-xl:   0 20px 25px -5px rgb(0 0 0 / 0.1)
--shadow-card: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
```

### Breakpoints

```css
--bp-sm:  640px    /* Mobile landscape */
--bp-md:  768px    /* Tablet */
--bp-lg:  1024px   /* Desktop */
--bp-xl:  1280px   /* Wide */
--bp-2xl: 1536px   /* Ultra-wide */
```

## Layout Structure

### Public Website Layout

```
┌──────────────────────────────────────────┐
│  Header                                  │
│  ┌─────┐ ┌──────────────────────────┐    │
│  │Logo │ │ Nav Links      Auth Btns │    │
│  └─────┘ └──────────────────────────┘    │
├──────────────────────────────────────────┤
│                                           │
│             Page Content                  │
│           (max-w-7xl mx-auto)             │
│                                           │
├──────────────────────────────────────────┤
│  Footer                                  │
│  ┌─────────┐ ┌──────────┐ ┌─────────┐   │
│  │Company  │ │ Quick    │ │ Social  │   │
│  │Info     │ │ Links    │ │         │   │
│  └─────────┘ └──────────┘ └─────────┘   │
└──────────────────────────────────────────┘
```

### Admin Layout

```
┌──────────────────────────────────────────────┐
│ Header (top)                                 │
│ ┌──────┐ ┌──────────────────────────────┐    │
│ │Menu  │ │ Search        Avatar  Logout │    │
│ └──────┘ └──────────────────────────────┘    │
├────────┬─────────────────────────────────────┤
│Sidebar │ Main Content                        │
│(fixed) │                                     │
│ ┌────┐ │ ┌─Page Header──────────────────┐    │
│ │Icon│ │ │ Title      Actions (Add Btn) │    │
│ │Name│ │ └──────────────────────────────┘    │
│ ├────┤ │                                     │
│ │Icon│ │ ┌─Filters / Tabs───────────────┐    │
│ │Name│ │ │                               │    │
│ ├────┤ │ └──────────────────────────────┘    │
│ │Icon│ │                                     │
│ │Name│ │ ┌─Data Table / Content──────────┐   │
│ ├────┤ │ │                               │   │
│ │Icon│ │ │                               │   │
│ │Name│ │ │                               │   │
│ └────┘ │ └──────────────────────────────┘   │
│        │                                     │
│        │ ┌─Pagination─────────────────────┐  │
│        │ │                               │  │
│        │ └──────────────────────────────┘  │
├────────┴─────────────────────────────────────┤
│ Footer                                       │
└──────────────────────────────────────────────┘
```

### Sidebar Navigation (Admin)

```
┌─────────────────────┐
│ ☰ ParkingBook Admin │  ← Logo + App Name
├─────────────────────┤
│ ◻ Dashboard         │  ← Active state: bg-primary/10 text-primary
│ ◻ Users             │
│ ◻ Locations         │
│ ◻ Parking Slots     │
│ ◻ Bookings          │
│   ├── Pending       │  ← Nested items (indented)
│   ├── Confirmed     │
│   ├── Cancelled     │
│   └── Completed     │
│ ◻ Pricing           │
│ ◻ Reports           │
│   ├── Revenue       │
│   └── Analytics     │
│ ◻ Settings          │
├─────────────────────┤
│ ◻ Profile           │  ← Separated section
│ ◻ Logout            │
└─────────────────────┘
```

### Mobile Navigation

```
┌──────────────────────────────────────┐
│ ☰  ParkingBook           🔔  👤     │  ← Top bar
├──────────────────────────────────────┤
│                                      │
│  Drawer (slide from left):           │
│  ┌────────────────────────────┐      │
│  │ 👤 John Doe               │      │
│  │    john@email.com         │      │
│  ├────────────────────────────┤      │
│  │ ◻ Dashboard               │      │
│  │ ◻ Users                   │      │
│  │ ◻ Locations               │      │
│  │ ◻ Bookings                │      │
│  │ ◻ Reports                 │      │
│  ├────────────────────────────┤      │
│  │ ◻ Profile                 │      │
│  │ ◻ Logout                  │      │
│  └────────────────────────────┘      │
└──────────────────────────────────────┘
```

## Page Designs

### Home Page

```
┌─────────────────────────────────────────────────────────┐
│ [Logo]  Parking  Pricing  About  Contact  Login | Sign Up│
├─────────────────────────────────────────────────────────┤
│                                                          │
│ ┌────────────────────────────────────────────────────┐  │
│ │                                                     │  │
│ │   Find & Book Parking in India                      │  │
│ │   Park your vehicle safely at any location          │  │
│ │                                                     │  │
│ │   ┌─────────────────────────────────────────┐       │  │
│ │   │ 🔍  Enter city, location...    Search  │       │  │
│ │   └─────────────────────────────────────────┘       │  │
│ │                                                     │  │
│ │   Popular: Mumbai  Delhi  Bangalore  Pune  Chennai  │  │
│ │                                                     │  │
│ └────────────────────────────────────────────────────┘  │
│                                                          │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                    │
│ │ 🚗   │ │ 🏍️   │ │ 🚌   │ │ 🔌   │                    │
│ │ Car  │ │ Bike │ │ Bus  │ │ EV   │                    │
│ │₹50/hr│ │₹20/hr│ │₹80/hr│ │₹40/hr│                    │
│ └──────┘ └──────┘ └──────┘ └──────┘                    │
│                                                          │
│  How It Works                                            │
│  ┌──────────┐  ──→  ┌──────────┐  ──→  ┌──────────┐   │
│  │ 🔍      │       │ 📅      │       │ 🅿️       │   │
│  │ Search  │       │ Book    │       │ Park    │   │
│  │ Location│       │ Slot    │       & Pay   │   │
│  └──────────┘       └──────────┘       └──────────┘   │
│                                                          │
│  Popular Locations (Grid of cards)                       │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │
│  │ City Center  │ │ Railway Stn  │ │ Mall Parking │    │
│  │ Mumbai       │ │ Delhi        │ │ Bangalore    │    │
│  │ 20 slots     │ │ 45 slots     │ │ 30 slots     │    │
│  │ ₹50/hr       │ │ ₹40/hr       │ │ ₹60/hr       │    │
│  └──────────────┘ └──────────────┘ └──────────────┘    │
│                                                          │
│  Footer (4 columns)                                      │
└─────────────────────────────────────────────────────────┘
```

### Location Card

```
┌──────────────────────────────────────┐
│ 📍 City Center Parking               │
│ 123, MG Road, Near Gateway Of India  │
│ Mumbai, Maharashtra                  │
│                                      │
│ 🕐 06:00 AM - 11:00 PM              │
│                                      │
│ ┌────────────────────────────────┐   │
│ │ 🟢 12 Available    🔴 8 Occupied│  │
│ └────────────────────────────────┘   │
│                                      │
│ ₹50/hr starting price                │
│                                      │
│ ┌────────────┐  ┌────────────────┐   │
│ │ View Slots │  │ ⭐ 4.5 (128)  │   │
│ └────────────┘  └────────────────┘   │
└──────────────────────────────────────┘
```

### Location Detail Page

```
┌──────────────────────────────────────────────────────────┐
│ ← Back to Search                                         │
│                                                           │
│ ┌──────────────────────────────────────────────────────┐  │
│ │  [Location Image Banner - 1200x300px]               │  │
│ ├──────────────────────────────────────────────────────┤  │
│ │ 📍 City Center Parking               ⭐ 4.5 (128)   │  │
│ │ 123, MG Road, Mumbai, Maharashtra                    │  │
│ │ 🕐 06:00 AM - 11:00 PM  │  🅿️ 20 Total Slots        │  │
│ └──────────────────────────────────────────────────────┘  │
│                                                           │
│ ┌─ Date & Time Selector ──────────────────────────────┐   │
│ │  📅 [Select Date]    ⏰ From [--:--]  To [--:--]   │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                           │
│ ┌─ Available Slots ───────────────────────────────────┐   │
│ │                                                      │   │
│ │  $50/hr — Car Slots                                  │   │
│ │  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐                      │   │
│ │  │A1 │ │A2 │ │A3 │ │A4❌│ │A5 │                      │   │
│ │  │🟢 │ │🟢 │ │🟢 │ │🔴 │ │🟢 │                      │   │
│ │  └───┘ └───┘ └───┘ └───┘ └───┘                      │   │
│ │  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐                      │   │
│ │  │A6 │ │A7 │ │A8 │ │A9 │ │A10│                      │   │
│ │  │🟢 │ │🟢 │ │🔴 │ │🟢 │ │🟢 │                      │   │
│ │  └───┘ └───┘ └───┘ └───┘ └───┘                      │   │
│ │                                                      │   │
│ │  $20/hr — Bike Slots                                  │   │
│ │  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐                      │   │
│ │  │B1 │ │B2 │ │B3 │ │B4 │ │B5 │                      │   │
│ │  │🟢 │ │🟢 │ │🟢 │ │🟢 │ │🟢 │                      │   │
│ │  └───┘ └───┘ └───┘ └───┘ └───┘                      │   │
│ │                                                      │   │
│ │  🟢 Available  🔴 Occupied  🟡 Reserved             │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                           │
│ ┌─ Booking Summary (Sticky Bottom on Mobile) ─────────┐   │
│ │  Slot: A1  |  2 hours  |  ₹100 + ₹18 GST = ₹118    │   │
│ │  Vehicle: MH-01-AB-1234  |  Car                     │   │
│ │  ┌─────────────────────────────────────────────┐    │   │
│ │  │         Book Now — ₹118                      │    │   │
│ │  └─────────────────────────────────────────────┘    │   │
│ └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

### Booking Form / Payment Page

```
┌──────────────────────────────────────────────────────────┐
│  Book Parking — City Center Parking                      │
│                                                           │
│ ┌─ Step 1: Vehicle Details ──────────────────────────┐   │
│ │  Vehicle Number: [ MH-01-AB-1234            ]      │   │
│ │  Vehicle Type:   [ Car ▼  ]                       │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                           │
│ ┌─ Step 2: Booking Details ──────────────────────────┐   │
│ │  Date:       15 June 2026                          │   │
│ │  Time:       10:00 AM  →  12:00 PM (2 hours)       │   │
│ │  Slot:       A1 (Ground Floor)                     │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                           │
│ ┌─ Step 3: Payment ──────────────────────────────────┐   │
│ │                                                     │   │
│ │  ┌─── Order Summary ──────────────────────────┐     │   │
│ │  │  Parking Fee (2 hrs × ₹50)      ₹100.00    │     │   │
│ │  │  GST (18%)                        ₹18.00    │     │   │
│ │  │  ─────────────────────────────────────────  │     │   │
│ │  │  Total Payable                    ₹118.00   │     │   │
│ │  └─────────────────────────────────────────────┘     │   │
│ │                                                     │   │
│ │  Pay with:                                          │   │
│ │  ┌─────────────────────────────────────────────┐    │   │
│ │  │ ● Razorpay  ○ Cash (Pay at venue)          │    │   │
│ │  └─────────────────────────────────────────────┘    │   │
│ │                                                     │   │
│ │  ┌─────────────────────────────────────────────┐    │   │
│ │  │     Pay ₹118  (via Razorpay)                │    │   │
│ │  └─────────────────────────────────────────────┘    │   │
│ └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

### Booking Success Page

```
┌──────────────────────────────────────────────────────────┐
│                                                           │
│               ✅ Booking Confirmed!                        │
│                                                           │
│              ┌─────────────────────┐                      │
│              │     ██ ██████       │                      │
│              │    ████████████     │   ← QR Code         │
│              │   ██████████████    │                      │
│              │    ████████████     │                      │
│              │     ██████████      │                      │
│              └─────────────────────┘                      │
│                                                           │
│  Booking Number: PBK2606150001                            │
│                                                           │
│  📍 City Center Parking, Mumbai                          │
│  🅿️ Slot A1 — Ground Floor                              │
│  📅 15 June 2026  |  10:00 AM - 12:00 PM                │
│  🚗 MH-01-AB-1234                                       │
│                                                           │
│  ┌──────────────────────────────────────────────────┐    │
│  │  Download Invoice    │    Share Pass             │    │
│  └──────────────────────────────────────────────────┘    │
│                                                           │
│  [Go to My Bookings]                                      │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

### My Bookings Page

```
┌──────────────────────────────────────────────────────────┐
│  My Bookings                                             │
│                                                           │
│  [All] [Pending] [Confirmed] [Checked In] [Completed] [Cancelled]│
│                                                           │
│ ┌─ Booking Card ──────────────────────────────────────┐   │
│ │  📍 City Center Parking     PBK2606150001           │   │
│ │  🅿️ Slot A1  │  🚗 Car                            │   │
│ │  📅 15 Jun 2026  10:00 AM - 12:00 PM               │   │
│ │  💰 ₹118  │  🟢 Confirmed                         │   │
│ │  ┌──────────┐  ┌──────────┐                        │   │
│ │  │ View     │  │ Cancel   │                        │   │
│ │  └──────────┘  └──────────┘                        │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                           │
│ ┌─ Booking Card ──────────────────────────────────────┐   │
│ │  📍 Railway Station Parking   PBK2606140002         │   │
│ │  🅿️ B3  │  🏍️ Bike                               │   │
│ │  📅 14 Jun 2026  2:00 PM - 4:00 PM                 │   │
│ │  💰 ₹58  │  🔵 Completed                          │   │
│ │  ┌──────────┐  ┌──────────┐                        │   │
│ │  │ View     │  │ Invoice  │                        │   │
│ │  └──────────┘  └──────────┘                        │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                           │
│  Load More...                                              │
└──────────────────────────────────────────────────────────┘
```

### Booking Detail Page

```
┌──────────────────────────────────────────────────────────┐
│ ← Back to My Bookings                                    │
│                                                           │
│ ┌──────────────────────────────────────────────────────┐  │
│ │  Booking #PBK2606150001              🟢 Confirmed    │  │
│ ├──────────────────────────────────────────────────────┤  │
│ │                                                      │  │
│ │  ┌─────┐  📍 City Center Parking                   │  │
│ │  │ QR  │  123, MG Road, Mumbai, Maharashtra        │  │
│ │  │ Code│                                           │  │
│ │  └─────┘  🅿️ Slot A1 — Ground Floor               │  │
│ │            🚗 MH-01-AB-1234 (Car)                  │  │
│ │            📅 15 June 2026                         │  │
│ │            ⏰ 10:00 AM → 12:00 PM (2 hrs)          │  │
│ │                                                     │  │
│ │  ┌─ Price Breakup ───────────────────────────┐     │  │
│ │  │  Parking Fee                  ₹100.00     │     │  │
│ │  │  GST (18%)                     ₹18.00     │     │  │
│ │  │  Total                         ₹118.00    │     │  │
│ │  │  Payment: ✅ Paid via Razorpay            │     │  │
│ │  └──────────────────────────────────────────┘     │  │
│ │                                                     │  │
│ │  ┌─ Booking Timeline ────────────────────────┐     │  │
│ │  │  ● Pending      — 15 Jun 2026, 09:45 AM  │     │  │
│ │  │  ● Confirmed    — 15 Jun 2026, 09:46 AM  │     │  │
│ │  │  ○ Checked In   — Waiting                 │     │  │
│ │  │  ○ Completed    — Waiting                 │     │  │
│ │  └──────────────────────────────────────────┘     │  │
│ │                                                     │  │
│ │  ┌──────────────────┐  ┌──────────────────┐        │  │
│ │  │ Download Invoice │  │ Cancel Booking   │        │  │
│ │  └──────────────────┘  └──────────────────┘        │  │
│ └──────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

## Admin Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│ ◻ Dashboard                                                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐             │
│  │ 👥   │ │ 📅   │ │ ⏳   │ │ ✅   │ │ 💰  │             │
│  │ 1,234│ │ 56   │ │ 12   │ │ 38   │ │₹45K │             │
│  │Users │ │Today │ │Pending│ │Active │ │Month│             │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘             │
│                                                              │
│  ┌─── Revenue Chart (Recharts) ─────────────────────────┐   │
│  │                                                       │   │
│  │  ₹15K ┤        ╱╲                                    │   │
│  │  ₹10K ┤     ╱╱  ╲╲    ╱╲                             │   │
│  │  ₹5K  ┤  ╱╱      ╲╲ ╱╱  ╲╲  ╱╲                      │   │
│  │  ₹0   ┤────────────────────────────                   │   │
│  │       Mon  Tue  Wed  Thu  Fri  Sat  Sun               │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─── Recent Bookings ───────┐  ┌─── Slot Utilization ──┐   │
│  │ PBK001 — John — Pending   │  │ 🟢 Available  12      │   │
│  │ PBK002 — Sara — Confirmed │  │ 🔴 Occupied   8       │   │
│  │ PBK003 — Raj  — Checked In│  │ 🟡 Reserved   2       │   │
│  │ PBK004 — Ali  — Completed │  └───────────────────────┘   │
│  │ PBK005 — Maya — Cancelled │                               │
│  └────────────────────────────┘                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Admin Users Page

```
┌─────────────────────────────────────────────────────────────┐
│ ◻ Users                                                     │
├─────────────────────────────────────────────────────────────┤
│ Users                                        + Add User     │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ 🔍 Search by name, email, mobile...     [Filter ▼]  │   │
│ ├──────────────────────────────────────────────────────┤   │
│ │ Name        Email          Role       Status  Action │   │
│ │ ──────────────────────────────────────────────────── │   │
│ │ John Doe    john@e.com     Customer  🟢 Active  👁 ✏🗑│   │
│ │ Sara Smith  sara@e.com     Admin     🟢 Active  👁 ✏🗑│   │
│ │ Raj Kumar   raj@e.com      Staff     🔴 Inact.  👁 ✏🗑│   │
│ │ ...                                                   │   │
│ ├──────────────────────────────────────────────────────┤   │
│ │ ← 1  2  3 ... 10 →     Showing 1-10 of 98           │   │
│ └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Admin Locations Page

```
┌─────────────────────────────────────────────────────────────┐
│ ◻ Locations                                  + Add Location │
├─────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────┐   │
│ │ 🔍 Search by name, city...         [City ▼] [State▼]│   │
│ ├──────────────────────────────────────────────────────┤   │
│ │ Name        City        State     Slots  Status  Act │   │
│ │ ──────────────────────────────────────────────────── │   │
│ │ City Center  Mumbai      MH        20/20  🟢     👁 ✏│   │
│ │ Railway Stn  Delhi       DL        45/40  🟢     👁 ✏│   │
│ │ Mall Parking Bangalore  KA        30/30  🔴     👁 ✏│   │
│ └──────────────────────────────────────────────────────┘   │
│                                                              │
│ Map View (Toggle: Table | Map)                               │
│ ┌──────────────────────────────────────────────────────┐   │
│ │                                                       │   │
│ │         [Google Maps / Leaflet Map]                   │   │
│ │         Showing all locations with pins               │   │
│ │                                                       │   │
│ └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Admin Slot Grid

```
┌─────────────────────────────────────────────────────────────┐
│ ◻ Slots — City Center Parking              + Add Slot      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─ Floor: Ground ─────────────────────────────────────┐   │
│  │                                                     │   │
│  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐                │   │
│  │  │ A1 │ │ A2 │ │ A3 │ │ A4 │ │ A5 │                │   │
│  │  │ 🟢 │ │ 🟢 │ │ 🟢 │ │ 🔴 │ │ 🟢 │                │   │
│  │  │₹50 │ │₹50 │ │₹50 │ │₹50 │ │₹50 │                │   │
│  │  │Car │ │Car │ │Car │ │Car │ │Car │                │   │
│  │  └────┘ └────┘ └────┘ └────┘ └────┘                │   │
│  │                                                     │   │
│  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐                │   │
│  │  │ A6 │ │ A7 │ │ A8 │ │ A9 │ │ A10│                │   │
│  │  │ 🟢 │ │ 🟢 │ │ 🔴 │ │ 🟢 │ │ 🟢 │                │   │
│  │  │₹50 │ │₹50 │ │₹50 │ │₹50 │ │₹50 │                │   │
│  │  │Car │ │Car │ │Car │ │Car │ │Car │                │   │
│  │  └────┘ └────┘ └────┘ └────┘ └────┘                │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Click a slot to edit:                                       │
│  ┌─ Edit Slot A4 ──────────────────────────────────┐       │
│  │  Slot Number: [A4                               ]│       │
│  │  Floor:       [Ground                           ]│       │
│  │  Vehicle:     [Car ▼]  Price: [₹50.00          ]│       │
│  │  Status:      [Occupied ▼]                      │       │
│  │  ┌────────┐  ┌────────┐                         │       │
│  │  │ Save   │  │ Cancel │                         │       │
│  │  └────────┘  └────────┘                         │       │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Admin Bookings Page

```
┌─────────────────────────────────────────────────────────────┐
│ ◻ Bookings                                                  │
├─────────────────────────────────────────────────────────────┤
│  [All] [Pending:12] [Confirmed:38] [Checked In:8] [Completed] [Cancelled]│
│                                                              │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ 🔍 Search booking ID, customer, vehicle...          │   │
│ ├──────────────────────────────────────────────────────┤   │
│ │ Booking    Customer   Location     Status   Amount  │   │
│ │ ──────────────────────────────────────────────────── │   │
│ │ PBK001    John Doe   City Center  ⏳ Pending  ₹118  │   │
│ │ PBK002    Sara Smith Railway Stn  ✅ Confrm  ₹200  │   │
│ │ PBK003    Raj Kumar  Mall Parking 🔵 ChkIn   ₹150  │   │
│ │ PBK004    Ali Khan   City Center  ✅ Compltd ₹90   │   │
│ │ PBK005    Maya Patel Airport      ❌ Cancel  ₹0    │   │
│ │ ...                                                  │   │
│ ├──────────────────────────────────────────────────────┤   │
│ │ ← 1  2  3 ... 25 →     Showing 1-10 of 250         │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                              │
│ Click booking to open detail panel:                          │
│ ┌─ Booking Detail (Slide-over panel) ───────────────────┐   │
│ │  PBK001  |  John Doe  |  john@email.com              │   │
│ │  📍 City Center Parking, Slot A1                     │   │
│ │  🚗 MH-01-AB-1234 (Car)                              │   │
│ │  📅 15 Jun 2026  10:00 AM - 12:00 PM                 │   │
│ │  💰 ₹118  |  ⏳ Pending Payment                      │   │
│ │                                                       │   │
│ │  ┌────────────────┐  ┌────────────────┐              │   │
│ │  │ ✅ Confirm     │  │ ❌ Cancel      │              │   │
│ │  └────────────────┘  └────────────────┘              │   │
│ └───────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Component Design Specifications

### Button

```
┌──────────────────────────────────────────┐
│ Variants:                                 │
│                                           │
│  [Primary]   [Secondary]   [Outline]      │
│  [Ghost]     [Danger]      [Link]         │
│                                           │
│ Sizes:                                     │
│  [xs]  [sm]  [md (default)]  [lg]  [xl]  │
│                                           │
│ States:                                    │
│  Default  │  Hover  │  Active  │  Loading │
│  Disabled │                              │
│                                           │
│ With Icon:                                 │
│  [🔍 Search]  [➕ Add New]  [🗑 Delete]   │
└──────────────────────────────────────────┘
```

### Status Badge

```
┌─────────────────────────────────────────┐
│ Pending     → Yellow bg, Yellow text    │
│ Confirmed   → Blue bg, Blue text        │
│ Checked In  → Indigo bg, Indigo text    │
│ Checked Out → Purple bg, Purple text    │
│ Completed   → Green bg, Green text      │
│ Cancelled   → Red bg, Red text          │
│ Refunded    → Gray bg, Gray text        │
│                                         │
│ Active      → Green bg (User status)    │
│ Inactive    → Red bg                    │
│ Available   → Green bg (Slot status)    │
│ Occupied    → Red bg                    │
│ Reserved    → Yellow bg                 │
│ Maintenance → Gray bg                   │
└─────────────────────────────────────────┘
```

### Card

```
┌──────────────────────────────────────────┐
│  ┌──────────────────────────────────┐    │
│  │ Optional Image (16:9 aspect)    │    │
│  ├──────────────────────────────────┤    │
│  │ Title / Name                     │    │
│  │ Description / Address            │    │
│  │                                  │    │
│  │ Meta: Location, Price, Status    │    │
│  │                                  │    │
│  │ [Action Button]                  │    │
│  └──────────────────────────────────┘    │
│                                          │
│  Hover: Elevate shadow, slight scale     │
│  Padding: p-6                           │
│  Border: 1px solid --border             │
│  Radius: --radius-xl                    │
└──────────────────────────────────────────┘
```

### Data Table

```
┌──────────────────────────────────────────┐
│  🔍 Search input       [Filter ▼] [Exp] │
├──────────────────────────────────────────┤
│  Column1  Column2  Column3  Column4  Act │
│  ────────────────────────────────────── │
│  Data     Data     Data     Data     📝🗑│
│  Data     Data     Data     Data     📝🗑│
│  Data     Data     Data     Data     📝🗑│
├──────────────────────────────────────────┤
│  ← 1  2  3 ... 10 →   1-10 of 100      │
│                                          │
│  Empty state:                            │
│  ┌─────────────────────────────────┐     │
│  │  📭 No data found              │     │
│  │  Try adjusting search or       │     │
│  │  filters                        │     │
│  └─────────────────────────────────┘     │
│                                          │
│  Loading state:                          │
│  ┌─────────────────────────────────┐     │
│  │  ░░░░  ░░░░  ░░░░  ░░░░  ░░░░  │     │
│  │  ░░░░  ░░░░  ░░░░  ░░░░  ░░░░  │     │
│  │  ░░░░  ░░░░  ░░░░  ░░░░  ░░░░  │     │
│  └─────────────────────────────────┘     │
└──────────────────────────────────────────┘
```

### Form Elements

```
┌──────────────────────────────────────────┐
│ Input:                                    │
│  ┌──────────────────────────────────┐     │
│  │ Label                            │     │
│  │ [ Placeholder text          ]    │     │
│  │ ⚠ Error message (if any)        │     │
│  └──────────────────────────────────┘     │
│                                           │
│ Select:                                    │
│  ┌──────────────────────────────────┐     │
│  │ Label                            │     │
│  │ [ Option 1              ▼  ]    │     │
│  └──────────────────────────────────┘     │
│                                           │
│ Date Picker:                               │
│  ┌──────────────────────────────────┐     │
│  │ [ 15 June 2026          📅  ]    │     │
│  └──────────────────────────────────┘     │
│                                           │
│ Time Picker:                               │
│  ┌──────────┐  ┌──────────┐              │
│  │ 10:00 AM │  │ 12:00 PM │              │
│  └──────────┘  └──────────┘              │
│                                           │
│ Checkbox:  ◻ Label                        │
│ Radio:     ○ Option 1  ○ Option 2        │
│ Toggle:    [[●]] Active                   │
└──────────────────────────────────────────┘
```

### Modal / Dialog

```
┌──────────────────────────────────────────┐
│  ┌────────────────────────────────────┐  │
│  │  ✕                               │  │
│  │  ── Title ──────────────────────  │  │
│  │                                    │  │
│  │  Content / Form / Confirmation     │  │
│  │                                    │  │
│  │  ┌──────────┐  ┌──────────┐       │  │
│  │  │ Primary  │  │ Cancel   │       │  │
│  │  └──────────┘  └──────────┘       │  │
│  └────────────────────────────────────┘  │
│                                           │
│  Overlay: rgba(0,0,0,0.5)                │
│  Max width: 32rem (sm), 28rem (mobile)   │
│  Animation: scale + fade in              │
└──────────────────────────────────────────┘
```

### Confirm Dialog

```
┌──────────────────────────────────────────┐
│  ┌────────────────────────────────────┐  │
│  │  ⚠️ Confirm Action                 │  │
│  │                                    │  │
│  │  Are you sure you want to          │  │
│  │  cancel this booking?              │  │
│  │                                    │  │
│  │  This action cannot be undone.     │  │
│  │                                    │  │
│  │  ┌──────────┐  ┌──────────┐       │  │
│  │  │ Yes,     │  │ No, Keep │       │  │
│  │  │ Cancel  │  │ It       │       │  │
│  │  │ (Danger)│  │          │       │  │
│  │  └──────────┘  └──────────┘       │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

### Empty State

```
┌──────────────────────────────────────────┐
│  ┌────────────────────────────────────┐  │
│  │                                    │  │
│  │         📭 / 🅿️ / 📋              │  │
│  │                                    │  │
│  │       No Bookings Yet              │  │
│  │   Book your first parking slot     │  │
│  │                                    │  │
│  │  ┌──────────────────────────┐      │  │
│  │  │   Search Parking         │      │  │
│  │  └──────────────────────────┘      │  │
│  │                                    │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

### Stat Card (Dashboard)

```
┌─────────────────────┐
│  👥 Today's Bookings│
│                     │
│   56                │  ← Large number
│   ↑ 12% from yesterday
│                     │
│  ┌─────────────────┐│
│  │ Mini sparkline  ││  ← Recharts sparkline
│  └─────────────────┘│
└─────────────────────┘
```

### Notification Card

```
┌──────────────────────────────────────────┐
│  ┌────────────────────────────────────┐  │
│  │  🔔 Booking Confirmed              │  │
│  │  Your booking at City Center is   │  │
│  │  confirmed. Show QR at entry.     │  │
│  │  📅 15 Jun, 10:00 AM             │  │
│  │  ─────────────────  ● Unread     │  │
│  └────────────────────────────────────┘  │
│  ┌────────────────────────────────────┐  │
│  │  🅿️ Check-in Reminder             │  │
│  │  Your booking starts in 30 min.   │  │
│  │  📅 16 Jun, 09:30 AM             │  │
│  │  ─────────────────                 │  │
│  └────────────────────────────────────┘  │
│                                          │
│  [Mark all as read]                      │
└──────────────────────────────────────────┘
```

### Invoice Layout

```
┌──────────────────────────────────────────┐
│           TAX INVOICE                     │
│                                           │
│  ┌──────────────────┐ ┌────────────────┐ │
│  │ ParkingBook      │ │ Invoice #:     │ │
│  │ 123 Business St  │ │ INV-PBK-001   │ │
│  │ Mumbai, India    │ │ Date: 15-Jun  │ │
│  └──────────────────┘ └────────────────┘ │
│                                           │
│  ┌─ Bill To ────────────────────────┐    │
│  │ John Doe                         │    │
│  │ john@email.com                   │    │
│  │ +91 98765 43210                  │    │
│  └──────────────────────────────────┘    │
│                                           │
│  ┌─ Booking Details ────────────────┐    │
│  │ PBK2606150001                    │    │
│  │ City Center Parking, Mumbai      │    │
│  │ Slot A1 | 15 Jun 2026           │    │
│  │ 10:00 AM - 12:00 PM (2 hrs)     │    │
│  │ Vehicle: MH-01-AB-1234 (Car)    │    │
│  └──────────────────────────────────┘    │
│                                           │
│  ┌─ Amount ─────────────────────────┐    │
│  │ Parking Fee (2hrs × ₹50)  ₹100   │    │
│  │ GST (18%)                  ₹18   │    │
│  │ ───────────────────────────────  │    │
│  │ Total                      ₹118  │    │
│  │ Paid ✓ via Razorpay              │    │
│  └──────────────────────────────────┘    │
│                                           │
│  ┌──────────────────────────────────┐    │
│  │         QR Code                  │    │
│  └──────────────────────────────────┘    │
│                                           │
│  Thank you for parking with us!           │
└──────────────────────────────────────────┘
```

### Search & Filter Panel

```
┌──────────────────────────────────────────┐
│  ┌────────────────────────────────────┐  │
│  │ 🔍 Search locations, cities...    │  │
│  ├────────────────────────────────────┤  │
│  │ Filters:                           │  │
│  │  State:    [Maharashtra        ▼]  │  │
│  │  City:     [Mumbai             ▼]  │  │
│  │  Vehicle:  [All ▼]                │  │
│  │  Price:    ₹0 ──────●─── ₹200     │  │
│  │  Rating:   ⭐ 3+  ⭐ 4+            │  │
│  │                                     │  │
│  │  [Apply Filters]  [Clear All]      │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

### Booking Timeline

```
┌──────────────────────────────────────────┐
│  Booking Timeline                         │
│                                           │
│  ● Pending          15 Jun, 09:45 AM     │
│  │                                        │
│  ● Confirmed        15 Jun, 09:46 AM     │
│  │                                        │
│  ○ Checked In       Awaiting check-in    │  ← Current
│  │                                        │
│  ○ Checked Out      Pending              │
│  │                                        │
│  ○ Completed        Not yet              │
│                                           │
│  Colors:                                   │
│  ● Completed = green dot                   │
│  ● Active (current) = blue dot + pulse    │
│  ○ Pending = gray dotted                  │
└──────────────────────────────────────────┘
```

### Slot Grid Visual

```
┌──────────────────────────────────────────┐
│  Car Parking — ₹50/hr                    │
│                                           │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐    │
│  │ A1 │ │ A2 │ │ A3 │ │ A4 │ │ A5 │    │
│  │ 🟢 │ │ 🟢 │ │ 🟢 │ │ 🔴 │ │ 🟢 │    │
│  └────┘ └────┘ └────┘ └────┘ └────┘    │
│    A1     A2     A3     A4     A5       │
│                                           │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐    │
│  │ A6 │ │ A7 │ │ A8 │ │ A9 │ │ A10│    │
│  │ 🟡 │ │ 🟢 │ │ 🔴 │ │ 🟢 │ │ 🟢 │    │
│  └────┘ └────┘ └────┘ └────┘ └────┘    │
│                                           │
│  🟢 Available   🔴 Occupied   🟡 Reserved │
│                                           │
│  Selected: A1 (highlighted with border)   │
│  Hover: slight scale up + shadow          │
└──────────────────────────────────────────┘
```

### QR Code Pass

```
┌──────────────────────────────────────────┐
│  ┌────────────────────────────────────┐  │
│  │  Parking Pass                      │  │
│  │  ┌──────────────────────────┐      │  │
│  │  │                          │      │  │
│  │  │      ██████████          │      │  │
│  │  │    ██        ██         │      │  │
│  │  │   █   ██████   █        │      │  │
│  │  │   █   ██████   █        │      │  │
│  │  │    ██        ██         │      │  │
│  │  │      ██████████          │      │  │
│  │  │                          │      │  │
│  │  └──────────────────────────┘      │  │
│  │                                     │  │
│  │  PBK2606150001                      │  │
│  │  City Center Parking                │  │
│  │  Slot A1  |  Car                   │  │
│  │  15 Jun 2026  10:00-12:00          │  │
│  └────────────────────────────────────┘  │
│                                           │
│  Size: 200px × 200px                      │
│  Print-friendly: white bg, no shadows    │
└──────────────────────────────────────────┘
```

## Responsive Behavior

| Component | Desktop (≥1024px) | Tablet (768-1023px) | Mobile (<768px) |
|-----------|-------------------|---------------------|-----------------|
| Header | Full nav links | Collapsed hamburger | Hamburger + drawer |
| Admin Layout | Sidebar visible | Collapsible sidebar | Bottom nav / drawer |
| Slot Grid | 5 columns | 3 columns | 2 columns |
| Location Cards | 3 columns | 2 columns | 1 column |
| Data Table | Full table | Scrollable horizontal | Card layout |
| Dashboard Stats | 5 columns | 3 columns | 2 columns |
| Forms | 2 columns | 2 columns | 1 column |
| Booking Timeline | Horizontal | Horizontal | Vertical |
| Footer | 4 columns | 2 columns | 1 column |

## Animation & Transitions

```css
/* Page transitions */
.page-enter { opacity: 0; transform: translateY(8px); }
.page-enter-active { opacity: 1; transform: translateY(0); transition: 200ms ease-out; }

/* Modal */
.modal-overlay { opacity: 0; transition: opacity 200ms; }
.modal-overlay.open { opacity: 1; }
.modal-content { transform: scale(0.95); transition: transform 200ms; }
.modal-content.open { transform: scale(1); }

/* Sidebar */
.sidebar { transform: translateX(-100%); transition: transform 200ms; }
.sidebar.open { transform: translateX(0); }

/* Card hover */
.card { transition: box-shadow 200ms, transform 200ms; }
.card:hover { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); transform: translateY(-2px); }

/* Slot item */
.slot { transition: all 150ms; }
.slot:hover { transform: scale(1.05); }
.slot.selected { ring: 2px solid var(--primary); }

/* Toast */
.toast { animation: slideIn 300ms ease-out; }
@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

/* Skeleton loading */
.skeleton { animation: pulse 2s infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
```

## Shadcn UI Overrides

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E40AF',
          50: '#EFF6FF', 100: '#DBEAFE', 200: '#BFDBFE',
          300: '#93C5FD', 400: '#60A5FA', 500: '#3B82F6',
          600: '#2563EB', 700: '#1D4ED8', 800: '#1E40AF',
          900: '#1E3A8A',
        },
        secondary: {
          DEFAULT: '#0D9488',
          50: '#F0FDFA', 100: '#CCFBF1', 200: '#99F6E4',
          300: '#5EEAD4', 400: '#2DD4BF', 500: '#14B8A6',
          600: '#0D9488', 700: '#0F766E', 800: '#115E59',
          900: '#134E4A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
      },
    },
  },
};
```

## Icons

Use **Lucide React** (already included with Shadcn). Key icons:

| Component | Icon |
|-----------|------|
| Car | `Car` |
| Bike | `Bike` |
| Bus | `Bus` |
| EV | `Zap` |
| Location | `MapPin` |
| Search | `Search` |
| Calendar | `CalendarDays` |
| Clock | `Clock` |
| User | `User` |
| Dashboard | `LayoutDashboard` |
| Bookings | `CalendarCheck` |
| Slots | `ParkingCircle` |
| Users | `Users` |
| Reports | `BarChart3` |
| Settings | `Settings` |
| Notifications | `Bell` |
| QR Code | `QrCode` |
| Invoice | `FileText` |
| Payment | `CreditCard` |
| Star | `Star` |
| Check | `CheckCircle2` |
| X | `XCircle` |
| Info | `Info` |
| Alert | `AlertTriangle` |
| Menu | `Menu` |
| Arrow Left | `ArrowLeft` |
| Arrow Right | `ArrowRight` |
| Download | `Download` |
| Share | `Share2` |
| Filter | `Filter` |
| Plus | `Plus` |
| Edit | `Pencil` |
| Trash | `Trash2` |
| Eye | `Eye` |

## Dark Mode

```css
/* Tailwind: class-based dark mode via next-themes */

/* Dark mode overrides per component: */
.dark .card {
  background: var(--dark-card);
  border-color: var(--dark-border);
}

.dark .sidebar {
  background: var(--dark-card);
  border-color: var(--dark-border);
}

.dark .table {
  background: var(--dark-card);
}

.dark .input {
  background: var(--dark-bg);
  border-color: var(--dark-border);
  color: var(--dark-foreground);
}

.dark .modal-overlay {
  background: rgba(0, 0, 0, 0.7);
}
```

## Loader / Spinner

```
┌──────────────────────────────────────────┐
│  Full Page:                               │
│  ┌────────────────────────────────────┐  │
│  │                                    │  │
│  │          🅿️                         │  │
│  │        ⟳ Loading...               │  │
│  │                                    │  │
│  └────────────────────────────────────┘  │
│                                           │
│  Inline:                                   │
│  ⟳  Loading bookings...                   │
│                                           │
│  Button:                                   │
│  [⟳ Saving...]  (disabled, spinner)      │
│                                           │
│  Skeleton:                                 │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░            │
└──────────────────────────────────────────┘
```

## Toast Notifications

```
┌──────────────────────────────────────────┐
│  Position: Top-right corner              │
│                                           │
│  ┌────────────────────────────────────┐  │
│  │ ✅ Booking confirmed successfully │  │
│  │ ────────────────────────────── ✕  │  │
│  └────────────────────────────────────┘  │
│                                           │
│  ┌────────────────────────────────────┐  │
│  │ ⚠️ Payment failed. Please retry  │  │
│  └────────────────────────────────────┘  │
│                                           │
│  ┌────────────────────────────────────┐  │
│  │ ❌ Slot already booked            │  │
│  └────────────────────────────────────┘  │
│                                           │
│  Types: success (green), error (red),     │
│         warning (amber), info (blue)      │
│  Auto-dismiss: 5s (success/info)          │
│  Manual dismiss required: error           │
└──────────────────────────────────────────┘
```

## Page Header Component

```
┌──────────────────────────────────────────┐
│  Locatons                    [+ Add New] │
│  Manage parking locations across India  │
│                                           │
│  (Breadcrumb: Admin > Locations)          │
└──────────────────────────────────────────┘
```

Pattern for every admin page:

```js
<PageHeader
  title="Locations"
  description="Manage parking locations across India"
  breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Locations' }]}
  actions={<Button><Plus className="mr-2" /> Add New</Button>}
/>
```

## Form Row Layout

```js
// Two-column form (desktop), single column (mobile)
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <Label>Name</Label>
    <Input placeholder="Location name" />
  </div>
  <div>
    <Label>City</Label>
    <Select>...</Select>
  </div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <Label>State</Label>
    <Select>...</Select>
  </div>
  <div>
    <Label>Status</Label>
    <Select>...</Select>
  </div>
</div>
```

## Color Semantics by Status

| Status | Color | Badge Variant |
|--------|-------|--------------|
| `pending` | Yellow | `warning` |
| `confirmed` | Blue | `info` |
| `checked_in` | Indigo | `default` (custom) |
| `checked_out` | Purple | `default` (custom) |
| `completed` | Green | `success` |
| `cancelled` | Red | `destructive` |
| `refunded` | Gray | `secondary` |
| `active` | Green | `success` |
| `inactive` | Red | `destructive` |
| `available` | Green | `success` |
| `occupied` | Red | `destructive` |
| `reserved` | Yellow | `warning` |
| `maintenance` | Gray | `secondary` |
| `paid` | Green | `success` |
| `failed` | Red | `destructive` |

## PDF Invoice Style

```
Font: Inter (same as web)
Colors: Primary blue (#1E40AF) for header, black for body
Layout: A4 portrait
Margins: 20mm all sides
Sections: Header (logo + title), Bill To, Booking Details, Amount Table, QR Code, Footer
```

## Mobile Bottom Navigation (Customer)

```
┌──────────────────────────────────────────┐
│                                           │
│              Page Content                 │
│                                           │
├──────────────────────────────────────────┤
│  🏠     🔍    📋     🔔     👤          │
│ Home  Search Bookings  Notif  Profile    │
│ 🟦    ⚪    ⚪     ⚪     ⚪             │
└──────────────────────────────────────────┘

Active tab: Primary blue
Inactive: Gray
Badge on Notifications: Red dot with count
```

## Accessibility

```css
/* Focus styles */
*:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

## Input States

```
┌─────────────────────────────────────────┐
│  Default:                                │
│  ┌─────────────────────────────────┐    │
│  │ Placeholder text                │    │
│  └─────────────────────────────────┘    │
│  border: var(--border)                  │
│                                         │
│  Focus:                                 │
│  ┌─────────────────────────────────┐    │
│  │ Value entered                  │    │
│  └─────────────────────────────────┘    │
│  border: var(--primary) + ring          │
│                                         │
│  Error:                                 │
│  ┌─────────────────────────────────┐    │
│  │ Invalid value                  │    │
│  └─────────────────────────────────┘    │
│  border: var(--danger) + red text below│
│                                         │
│  Disabled:                              │
│  ┌─────────────────────────────────┐    │
│  │ Disabled field                  │    │
│  └─────────────────────────────────┘    │
│  bg: var(--muted), cursor: not-allowed  │
│                                         │
│  Success:                               │
│  ┌─────────────────────────────────┐    │
│  │ ✅ Valid value                  │    │
│  └─────────────────────────────────┘    │
│  border: var(--success)                │
└─────────────────────────────────────────┘
```
