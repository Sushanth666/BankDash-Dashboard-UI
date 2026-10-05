<p align="center">
  <img src="public/assets/logo.svg" alt="BankDash Logo" width="280" />
</p>

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
│   │   ├── logo.svg              # Brand vector logo (dual theme)
│   │   ├── avatar.png            # Current user profile avatar
│   │   ├── avatars/              # Contact and quick-transfer avatars
│   │   └── icons/                # Navigation, stock, and KPI icons
│   ├── favicon.svg               # Vector SVG browser tab favicon
│   ├── favicon.png               # High-res PNG browser tab favicon
│   └── favicon.ico               # Standard browser tab icon
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
├── screenshots/                  # High-resolution multi-device screenshot captures
│   ├── desktop/                  # 11 Desktop view screenshots (1920×1080)
│   ├── tablet/                   # 11 Tablet view screenshots (963px iPad)
│   ├── mobile/                   # 11 Mobile view screenshots (357px Smartphone)
│   └── locators/                 # Visual animation & interaction locator guides for all 9 pages
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

## 📸 Device Views & Screenshots Showcase

BankDash is fully responsive and meticulously optimized across desktop, tablet, and mobile displays. Below is the complete gallery of high-resolution captures showing all 11 application views across every device form factor.

### 🧭 Quick View Jump Links
- [🖥️ 1. Desktop View Screenshots (1920 × 1080)](#-1-desktop-view-screenshots)
- [📱 2. Tablet View Screenshots (iPad / 963px)](#-2-tablet-view-screenshots)
- [📲 3. Mobile View Screenshots (Smartphone / 357px)](#-3-mobile-view-screenshots)
- [🎯 4. Interactive Animation & Feature Locators](#-4-interactive-animation--feature-locators)

---

### 🖥️ 1. Desktop View Screenshots

Captured at **1920 × 1080** full high-definition resolution, showcasing the multi-column modular grid, persistent sidebar navigation, interactive charts, and rich financial widgets.

#### 01. Dashboard (Overview)
*Real-time net worth tracking, interactive credit card slider, recent transactions, weekly bar charts, expense breakdown donut chart, and instant quick-transfer slider.*

![Desktop - Dashboard Overview](screenshots/desktop/01-dashboard.png)

#### 02. Transactions Ledger
*Comprehensive financial transaction ledger with category filters (All, Income, Expense), live search, status badges, and download receipt capabilities.*

![Desktop - Transactions](screenshots/desktop/02-transactions.png)

#### 03. Accounts Monitoring
*Account health KPI cards (Total Balance, Income, Expense, Total Savings), debit/credit flow comparisons, and sent invoice records.*

![Desktop - Accounts](screenshots/desktop/03-accounts.png)

#### 04. Investments Portfolio
*Portfolio performance metrics, total return valuations, yearly investment area charts, and live trending stock watchlists.*

![Desktop - Investments](screenshots/desktop/04-investments.png)

#### 05. Credit Cards Management
*Card portfolio showcase featuring dual smoke green cards, expense category donut chart, real-time "Add New Card" 2×2 form, and card security settings.*

![Desktop - Credit Cards](screenshots/desktop/05-credit-cards.png)

#### 06. Loans & Repayment
*Personal, corporate, and business loan tracking with interest rate indicators, repayment schedules, and interactive loan application modals.*

![Desktop - Loans](screenshots/desktop/06-loans.png)

#### 07. Banking Services Catalog
*Banking services catalog (Life Insurance, Shopping, Safety, Accounts) with interactive "View Details" modals and automated advisor callbacks.*

![Desktop - Services](screenshots/desktop/07-services.png)

#### 08. My Privileges (VIP Diamond Tier)
*Diamond VIP tier status dashboard, reward point redemptions, instant digital credential generation, and dedicated private wealth advisor messaging.*

![Desktop - Privileges](screenshots/desktop/08-privileges.png)

#### 09. Setting — Edit Profile
*User profile management with profile photo upload, personal information fields, and date/address validation.*

![Desktop - Setting Edit Profile](screenshots/desktop/09-setting-profile.png)

#### 10. Setting — Preferences
*Currency selection, time zone customization, and notification triggers for financial activities.*

![Desktop - Setting Preferences](screenshots/desktop/10-setting-preferences.png)

#### 11. Setting — Security & 2FA
*Two-factor authentication toggle, password update form, and security activity credentials.*

![Desktop - Setting Security](screenshots/desktop/11-setting-security.png)

---

### 📱 2. Tablet View Screenshots

Captured at **963px (iPad / Medium Viewport)**, demonstrating the responsive single-column widget layout, off-canvas navigation drawer, and tailored financial card chip dimensions.

#### 01. Dashboard (Overview)
![Tablet - Dashboard Overview](screenshots/tablet/01-dashboard.png)

#### 02. Transactions Ledger
![Tablet - Transactions](screenshots/tablet/02-transactions.png)

#### 03. Accounts Monitoring
![Tablet - Accounts](screenshots/tablet/03-accounts.png)

#### 04. Investments Portfolio
![Tablet - Investments](screenshots/tablet/04-investments.png)

#### 05. Credit Cards Management
![Tablet - Credit Cards](screenshots/tablet/05-credit-cards.png)

#### 06. Loans & Repayment
![Tablet - Loans](screenshots/tablet/06-loans.png)

#### 07. Banking Services Catalog
![Tablet - Services](screenshots/tablet/07-services.png)

#### 08. My Privileges (VIP Diamond Tier)
![Tablet - Privileges](screenshots/tablet/08-privileges.png)

#### 09. Setting — Edit Profile
![Tablet - Setting Edit Profile](screenshots/tablet/09-setting-profile.png)

#### 10. Setting — Preferences
![Tablet - Setting Preferences](screenshots/tablet/10-setting-preferences.png)

#### 11. Setting — Security & 2FA
![Tablet - Setting Security](screenshots/tablet/11-setting-security.png)

---

### 📲 3. Mobile View Screenshots

Captured at **357px (Smartphone / Portrait Viewport)**, demonstrating the compact 1-column layouts, touch-friendly navigation, mobile search, and responsive cards scaled for handheld devices.

| 01. Dashboard (Overview) | 02. Transactions Ledger |
| :---: | :---: |
| <img src="screenshots/mobile/01-dashboard.png" width="340" alt="Mobile Dashboard Overview" /><br><sub><b>01. Dashboard</b></sub> | <img src="screenshots/mobile/02-transactions.png" width="340" alt="Mobile Transactions" /><br><sub><b>02. Transactions</b></sub> |

| 03. Accounts Monitoring | 04. Investments Portfolio |
| :---: | :---: |
| <img src="screenshots/mobile/03-accounts.png" width="340" alt="Mobile Accounts" /><br><sub><b>03. Accounts</b></sub> | <img src="screenshots/mobile/04-investments.png" width="340" alt="Mobile Investments" /><br><sub><b>04. Investments</b></sub> |

| 05. Credit Cards Management | 06. Loans & Repayment |
| :---: | :---: |
| <img src="screenshots/mobile/05-credit-cards.png" width="340" alt="Mobile Credit Cards" /><br><sub><b>05. Credit Cards</b></sub> | <img src="screenshots/mobile/06-loans.png" width="340" alt="Mobile Loans" /><br><sub><b>06. Loans</b></sub> |

| 07. Banking Services Catalog | 08. My Privileges (VIP Tier) |
| :---: | :---: |
| <img src="screenshots/mobile/07-services.png" width="340" alt="Mobile Services" /><br><sub><b>07. Services</b></sub> | <img src="screenshots/mobile/08-privileges.png" width="340" alt="Mobile Privileges" /><br><sub><b>08. My Privileges</b></sub> |

| 09. Setting — Edit Profile | 10. Setting — Preferences |
| :---: | :---: |
| <img src="screenshots/mobile/09-setting-profile.png" width="340" alt="Mobile Setting Profile" /><br><sub><b>09. Edit Profile</b></sub> | <img src="screenshots/mobile/10-setting-preferences.png" width="340" alt="Mobile Setting Preferences" /><br><sub><b>10. Preferences</b></sub> |

| 11. Setting — Security & 2FA |
| :---: |
| <img src="screenshots/mobile/11-setting-security.png" width="340" alt="Mobile Setting Security" /><br><sub><b>11. Security & 2FA</b></sub> |

---

### 🎯 4. Interactive Animation & Feature Locators

Dedicated visual locator guides mapping all key interactive zones, micro-interactions, hardware-accelerated transforms, and dynamic animation triggers across every single application view. Located in the separate [`screenshots/locators/`](screenshots/locators/) directory:

| Module Page | High-Resolution Locator Diagram | Key Highlights & Interactive Features |
| :--- | :--- | :--- |
| **01. Dashboard** | [01-dashboard-locator.svg](screenshots/locators/01-dashboard-locator.svg) | 3D Parallax Tilt, Row Hover Glide, Weekly Bar Spring, Donut Pop, Confetti Burst & Radar Beacon |
| **02. Transactions** | [02-transactions-locator.svg](screenshots/locators/02-transactions-locator.svg) | Dual Card Tilt, Monthly Expense Stagger, Sliding Category Tabs, Debounced Search & Receipt Modal |
| **03. Accounts** | [03-accounts-locator.svg](screenshots/locators/03-accounts-locator.svg) | KPI Rolling Counters, Transaction Feed Glide, Holographic Card Glare, Dual Bar Spring & Invoices |
| **04. Investments** | [04-investments-locator.svg](screenshots/locators/04-investments-locator.svg) | Valuation Tickers, Gradient Spline Area Shimmer, Peak Line Beacon & Stock Buy/Sell Modals |
| **05. Credit Cards** | [05-credit-cards-locator.svg](screenshots/locators/05-credit-cards-locator.svg) | 3-Card Multi-Tier 3D Carousel, Donut Slice Pop-Out, Live 2×2 Card Form & Security Toggles |
| **06. Loans** | [06-loans-locator.svg](screenshots/locators/06-loans-locator.svg) | Loan Summary Tickers, Full Table Row Hover Glide, Repay Button Modal Drawer & Grand Total |
| **07. Services** | [07-services-locator.svg](screenshots/locators/07-services-locator.svg) | Highlight Cards Soft Elevation, Squircle Icon Zoom, Service Rows & View Details Modal |
| **08. My Privileges** | [08-privileges-locator.svg](screenshots/locators/08-privileges-locator.svg) | 3D Luxury Metallic Card, Foil Shimmer, Tier Selector, Confetti Voucher Redemption & QR Pass |
| **09. Settings** | [09-settings-locator.svg](screenshots/locators/09-settings-locator.svg) | Fluid Tab Switcher, Photo Upload Preview, 10-Field Form Focus Glow & 2FA Switch Animations |

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
