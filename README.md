# BankDash — Modern Fintech Banking Dashboard UI

A state-of-the-art, responsive banking and fintech admin dashboard UI based on the **BankDash Dashboard UI Kit Figma design**, re-engineered with an original, ultra-modern **"Emerald Fintech"** design system, full interactivity, accessible SVG data visualizations, and complete module implementation.

![BankDash Overview Preview](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80)

---

## 🌟 Key Highlights & Implementation Features

### 1. Distinct Modern Color Theme (Zero Figma Color Copying)
As strictly required, the original blue `#2D60FF` / `#1814F3` palette was replaced with a bespoke, high-trust luxury financial aesthetic:
- **Default Theme — Emerald Luxe Fintech**: Deep imperial spruce, radiant emerald (`#0D9488` / `#10B981`), cool slate neutrals (`#F8FAFC`, `#0F172A`), and gold/indigo accents.
- **Built-in Theme Switcher**: Features a header toggle that allows instant real-time switching between:
  1. **Emerald Fintech (Default)**
  2. **Midnight Obsidian (Sleek Dark Mode with luminous emerald/cyan glowing highlights)**
  3. **Nordic Cobalt (Deep Sapphire & Mint)**

### 2. Complete Module Implementation (All 9 Modules)
1. **Dashboard / Overview**:
   - **My Cards**: 2 credit cards (Primary Emerald Luxe gradient card & White card) with chip, masked card number, brand marks, and click-to-copy interaction.
   - **Recent Transactions**: Real-time activity list with categorized icons and positive/negative values.
   - **Weekly Activity Chart**: Grouped bar chart comparing weekly deposits and withdrawals with hover tooltips.
   - **Expense Statistics Chart**: Custom interactive pie chart with percentage slices.
   - **Quick Transfer**: Payee contact avatar carousel with selection ring and instant animated transfer dispatcher.
   - **Balance History Chart**: Luminous spline area curve with coordinate hover tooltips.
2. **Transactions**:
   - Filter tabs: **All Transactions**, **Income**, and **Expense**.
   - Real-time search filter and category selector.
   - Interactive electronic receipt generator with printable/saveable modal.
   - Pagination controls.
3. **Accounts**:
   - 4 KPI summary cards (My Balance, Income, Expense, Total Saving).
   - Last transactions feed.
   - Debit & Credit monthly comparison chart.
   - Invoices Sent list with interactive "New Invoice" modal generator.
4. **Investments**:
   - Total Invested Amount ($150,000), Number of Investments (1,250), Rate of Return (+5.80%).
   - Yearly Investment area trend chart & Monthly Revenue bar chart.
   - Trending stocks table with live SVG miniature sparklines and Trade Order execution modal.
5. **Credit Cards**:
   - Credit card showcase slider.
   - Card Expense Statistics donut chart.
   - Card settings toggles (Block card, PIN change modal, Google Pay, Apple Pay).
   - **Live "Add New Card" Form**: As user types cardholder name, number, or expiry, the virtual card previews the changes in real-time.
6. **Loans**:
   - 4 Loan category cards (Personal, Corporate, Business, Custom).
   - Active Loans Overview table with installment breakdowns.
   - Interactive Repay Loan modal & Apply for New Loan modal.
7. **Services**:
   - Full banking services catalog (Life Insurance, Smart Business Shopping, Biometric Vault, Wealth Advisory, Global Wire Transfer, Card Shield).
   - Service details modal with instant activation.
8. **My Privileges**:
   - Diamond Member status card with progress tracker toward Black Obsidian status.
   - VIP perks grid (Airport lounges, 24/7 concierge, 5% dining cashback, zero FX fees).
   - Redeemable reward points vouchers catalog with point deduction mechanics.
9. **Setting**:
   - **Edit Profile**: Avatar photo upload & live preview, personal info form.
   - **Preferences**: Currency selector (USD $, EUR €, GBP £, JPY ¥), timezone selector, notification toggles.
   - **Security**: 2FA multi-factor toggle, password update form, and active session manager.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation & Development
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build optimized production bundle
npm run build

# 4. Preview production build locally
npm run preview -- --port 3000
```

The application will be accessible at `http://localhost:3000/`.

---

## 📱 Responsiveness
- **Desktop (1200px+)**: Multi-column dashboard grid with persistent navigation sidebar.
- **Tablet (768px - 1199px)**: Optimized card stack, responsive data grids, collapsible sidebar drawer.
- **Mobile (< 768px)**: Off-canvas sidebar with backdrop overlay, swipeable cards, touch-friendly transfer carousel, and responsive scrollable tables.

---

## 🛠️ Architecture & Technologies
- **Core**: Semantic HTML5 and Modular ES6+ JavaScript.
- **Styling**: Pure Vanilla CSS with CSS Custom Properties (zero framework lock-in).
- **Data Visualizations**: Crisp, responsive SVG chart renderers with zero third-party charting bloat.
- **Bundler**: Vite.
