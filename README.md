# BankDash — Modern Fintech & Smart Banking Dashboard UI

A state-of-the-art, responsive banking and fintech admin dashboard UI based on the **BankDash Dashboard UI Kit**, engineered with an ultra-modern **"Smoke Green & Luminous Mint"** design system, full interactivity, accessible pure SVG data visualizations, complete module implementation, and seamless responsiveness across all screen sizes.

---

## 📌 Brief Project Explanation & Overview

**BankDash** is a modern, responsive web application designed for personal wealth management and corporate banking operations. Built with pure vanilla technologies (HTML5, modular CSS3, and ES6+ JavaScript), it delivers high performance, zero external framework overhead, and instant page transitions.

### 🌟 Key Functional Modules (The 9 Core Views)

1. **Dashboard (Overview)**: Real-time net worth tracking, interactive credit card slider with 3D tilt, recent transactions list, weekly deposit/withdrawal bar charts, expense breakdown donut chart, and instant quick-transfer contact slider with amount validation.
2. **Transactions**: Complete financial ledger featuring tab-based categorization (All, Income, Expense), transaction search, pagination, status badges, and download receipt capabilities.
3. **Accounts**: Comprehensive account monitoring, financial KPI summaries (Total Balance, Income, Expense, Total Savings), debit/credit flow comparisons, and sent invoice records.
4. **Investments**: Portfolio performance metrics, total return valuations, yearly investment area charts, and live trending stock watchlists (Apple, Google, Tesla, PlayStation).
5. **Credit Cards**: Card portfolio showcase featuring dual smoke green cards (Smoke Mint and Deep Forest Pine), expense category donut chart, real-time "Add New Card" 2×2 form with live validation, and card security settings (Block card, PIN change, Google Pay/Apple Pay integration).
6. **Loans**: Active personal, corporate, and custom loan tracking with interest rate indicators, repayment schedules, and interactive loan application modals.
7. **Services**: Banking service catalog (Life Insurance, Shopping, Safety, Accounts) with interactive "View Details" modals and automated banking representative callbacks.
8. **My Privileges**: Diamond VIP tier status dashboard, reward point redemptions, instant digital credential generation, and dedicated private wealth advisor messaging.
9. **Settings**: User profile management with avatar upload simulation, financial preferences, two-factor authentication (2FA) security, and notification triggers.

### ⚡ Technical Highlights

- **Pure Vanilla Stack**: Built without bulky frontend frameworks (React/Vue/Tailwind) for optimal speed, clean DOM control, and instant compilation (`<850ms` build time).
- **Dual Smoke Green Theme Engine**: Seamless live switching between **Smoke Green Light Mode** (crisp emerald, misty sage) and **Smoky Pine Dark Mode** (obsidian green, luminous neon jade) with persistence.
- **Custom Pure SVG Data Visualizations**: Interactive bar, pie, donut, and spline charts built with pure SVG and zero heavy external chart dependencies.
- **Glassmorphic Notification System**: Floating toast system with glowing status badges, live animated countdown progress bars, pause-on-hover timers, and quick theme toggle actions.
- **Universal Multi-Breakpoint Responsiveness**: Meticulously calibrated for Desktop (`1200px+`), Laptop (`993px–1200px`), Tablet (`769px–1024px`), and Mobile (`≤768px`).

---

## 📁 Project Architecture & Clean Folder Structure

```
BankDash Dashboard UI/
├── public/                       # Static public assets served directly
│   ├── assets/
│   │   ├── avatars/              # Contact and quick-transfer avatars
│   │   ├── icons/                # Navigation, stock, and KPI icons
│   │   ├── logo.png              # Brand light mode logo
│   │   ├── logo-dark.png         # Brand dark mode logo
│   │   └── logo-icon.png         # High-resolution smoke green app icon
│   ├── favicon.svg               # Vector SVG browser tab favicon
│   └── favicon.png               # High-res PNG browser tab favicon
│
├── src/                          # Core frontend application source code
│   ├── components/               # Reusable UI & Layout Components
│   │   ├── Card.js               # Credit Card component with dual smoke green themes & tilt
│   │   ├── Charts.js             # Pure SVG interactive responsive charts
│   │   ├── Header.js             # Top application header, search & profile controls
│   │   ├── Modal.js              # Accessible modal dialog system
│   │   ├── Sidebar.js            # Sidebar navigation & mobile off-canvas drawer
│   │   ├── Toast.js              # Floating glassmorphic toast notification system
│   │   └── index.js              # Central barrel export for all components
│   │
│   ├── pages/                    # The 9 Core Application Views
│   │   ├── DashboardPage.js      # Overview: Cards, Transactions, Weekly Activity, Quick Transfer
│   │   ├── TransactionsPage.js   # Transactions table, categories, receipts & pagination
│   │   ├── AccountsPage.js       # KPI cards, Debit/Credit comparison, Invoices
│   │   ├── InvestmentsPage.js    # Investment metrics, Yearly charts, Trending stocks
│   │   ├── CreditCardsPage.js    # Card showcase, Expense donut chart, Add card form
│   │   ├── LoansPage.js          # Loan metrics & active loans table
│   │   ├── ServicesPage.js       # Banking services catalog & detail modals
│   │   ├── PrivilegesPage.js     # Tier status card & VIP perks grid
│   │   ├── SettingPage.js        # Profile edit, preferences & security settings
│   │   └── index.js              # Central barrel export for all pages
│   │
│   ├── data/                     # Application State & Financial Datasets
│   │   ├── mockData.js           # Comprehensive mock dataset (transactions, cards, KPIs)
│   │   └── index.js              # Central data re-export
│   │
│   ├── styles/                   # Modular CSS Design System
│   │   ├── index.css             # Main stylesheet entry (imports all design modules)
│   │   ├── variables.css         # Color palette tokens, themes (Light & Dark) & spacing
│   │   ├── base.css              # Reset, typography, animations & global utilities
│   │   ├── layout.css            # Header, sidebar drawer, main grid & layout media queries
│   │   ├── components.css        # Cards, buttons, tables, forms, modals & toasts
│   │   └── pages.css             # Page-specific grids & data visualizations
│   │
│   └── main.js                   # Main application entry, hash router & theme engine
│
├── index.html                    # Single HTML5 entrypoint
├── vite.config.js                # Vite configuration
├── package.json                  # Dependencies & scripts
└── README.md                     # Project documentation
```

---

## 🎨 Design Theme: Smoke Green & Luminous Mint

The application features a bespoke fintech color scheme engineered for financial elegance, clarity, and visual appeal:

- **Light Mode (Default)**: Smoke Green (`#059669`), deep pine slate text (`#1A332B`), misty sage background (`#F4F8F6`), and luminous mint accents (`#10B981`).
- **Dark Mode (Smoky Pine & Obsidian)**: Deep obsidian pine (`#0B1B17` / `#112B24`), glowing neon jade (`#34D399`), and luminous borders (`#1C4E41`).
- **Live Theme Toggle**: Accessible via the header button and welcome popup to toggle dynamically with smooth CSS color transitions.

---

## 📱 Responsive Design (All Form Factors)

- **Desktop (1200px+)**: Multi-column dashboard grid with persistent navigation sidebar.
- **Laptop (993px – 1200px)**: Compact 220px sidebar with adjusted paddings for smaller screens.
- **Tablet (769px – 992px)**: Sidebar transforms into an off-canvas drawer with hamburger button (`#mobile-toggle-btn`), close button, and backdrop blur overlay. Charts and widgets stack cleanly into 1 column.
- **Mobile (≤ 768px)**: 1-column layouts, expandable mobile search, touch-friendly transfer carousel, and responsive scrollable tables.
- **Small Mobile (≤ 480px)**: Auto-scaling credit cards, 1-column KPI summary cards, compact buttons, and fluid modal dialogs.

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
npm run preview
```

The application runs locally at `http://localhost:3000/`.
