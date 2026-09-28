/* ==========================================================================
   BANKDASH MOCK DATA & PERSISTENT APP STATE
   ========================================================================== */

export const currentUser = {
  name: 'Charlene Reed',
  userName: 'charlenereed',
  email: 'charlenereed@gmail.com',
  dob: '1992-01-25',
  presentAddress: 'San Jose, California, USA',
  permanentAddress: 'San Jose, California, USA',
  city: 'San Jose',
  postalCode: '95962',
  country: 'USA',
  role: 'Fintech Executive',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80',
  currency: 'USD',
  currencySymbol: '$',
  timeZone: '(GMT-05:00) Eastern Time',
  notifications: {
    digitalCurrency: true,
    merchantOrder: false,
    recommendations: true
  },
  twoFactorEnabled: true,
  membershipTier: 'Diamond Member',
  rewardPoints: 24850
};

export const userCards = [
  {
    id: 'card-1',
    balance: 5756,
    cardHolder: 'Eddy Cusuma',
    validThru: '12/26',
    cardNumber: '3778 **** **** 1234',
    rawNumber: '3778 5412 8901 1234',
    theme: 'dark', // Emerald gradient
    brand: 'mastercard',
    type: 'Platinum Credit',
    isBlocked: false,
    applePay: true,
    googlePay: true
  },
  {
    id: 'card-2',
    balance: 3250,
    cardHolder: 'Eddy Cusuma',
    validThru: '08/28',
    cardNumber: '5289 **** **** 8945',
    rawNumber: '5289 4512 7890 8945',
    theme: 'light', // Crisp white
    brand: 'mastercard',
    type: 'Corporate Gold',
    isBlocked: false,
    applePay: false,
    googlePay: true
  },
  {
    id: 'card-3',
    balance: 14200,
    cardHolder: 'Charlene Reed',
    validThru: '04/29',
    cardNumber: '4111 **** **** 9081',
    rawNumber: '4111 6789 2341 9081',
    theme: 'dark',
    brand: 'visa',
    type: 'Titanium Infinite',
    isBlocked: false,
    applePay: true,
    googlePay: true
  }
];

export const quickTransferContacts = [
  {
    id: 'ct-1',
    name: 'Livia Bator',
    role: 'CEO',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'ct-2',
    name: 'Randy Press',
    role: 'Director',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'ct-3',
    name: 'Workman',
    role: 'Designer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'ct-4',
    name: 'Kevin Martin',
    role: 'Engineer',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'ct-5',
    name: 'Sofia Davis',
    role: 'Product Lead',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80'
  }
];

export const recentTransactions = [
  {
    id: 'tx-1',
    title: 'Deposit from my Card',
    date: '28 January 2026',
    formattedDate: '28 Jan, 12:30 PM',
    amount: 850,
    type: 'income',
    category: 'Deposit',
    card: '1234 ****',
    iconType: 'card',
    iconBg: 'var(--accent-amber-tint)',
    iconColor: 'var(--accent-amber)',
    transactionId: '#TX89201',
    status: 'Complete'
  },
  {
    id: 'tx-2',
    title: 'Deposit Paypal',
    date: '25 January 2026',
    formattedDate: '25 Jan, 09:15 AM',
    amount: 2500,
    type: 'income',
    category: 'Payment',
    card: '5289 ****',
    iconType: 'paypal',
    iconBg: 'var(--accent-secondary-tint)',
    iconColor: 'var(--accent-secondary)',
    transactionId: '#TX89202',
    status: 'Complete'
  },
  {
    id: 'tx-3',
    title: 'Jemi Wilson',
    date: '21 January 2026',
    formattedDate: '21 Jan, 07:45 PM',
    amount: -5.4,
    type: 'expense',
    category: 'Transfer',
    card: '1234 ****',
    iconType: 'user',
    iconBg: 'var(--accent-cyan-tint)',
    iconColor: 'var(--accent-cyan)',
    transactionId: '#TX89203',
    status: 'Complete'
  },
  {
    id: 'tx-4',
    title: 'Spotify Subscription',
    date: '18 January 2026',
    formattedDate: '18 Jan, 02:00 PM',
    amount: -14.99,
    type: 'expense',
    category: 'Shopping',
    card: '1234 ****',
    iconType: 'shopping',
    iconBg: 'var(--accent-rose-tint)',
    iconColor: 'var(--accent-rose)',
    transactionId: '#TX89204',
    status: 'Complete'
  },
  {
    id: 'tx-5',
    title: 'Freepik Sales Royalty',
    date: '15 January 2026',
    formattedDate: '15 Jan, 11:20 AM',
    amount: 450,
    type: 'income',
    category: 'Income',
    card: '5289 ****',
    iconType: 'card',
    iconBg: 'var(--primary-tint)',
    iconColor: 'var(--primary)',
    transactionId: '#TX89205',
    status: 'Complete'
  },
  {
    id: 'tx-6',
    title: 'Apple Store Purchase',
    date: '12 January 2026',
    formattedDate: '12 Jan, 04:30 PM',
    amount: -1299,
    type: 'expense',
    category: 'Electronics',
    card: '4111 ****',
    iconType: 'shopping',
    iconBg: 'var(--accent-purple-tint)',
    iconColor: 'var(--accent-purple)',
    transactionId: '#TX89206',
    status: 'Complete'
  },
  {
    id: 'tx-7',
    title: 'PlayStation Plus Premium',
    date: '10 January 2026',
    formattedDate: '10 Jan, 08:10 PM',
    amount: -79.99,
    type: 'expense',
    category: 'Entertainment',
    card: '1234 ****',
    iconType: 'shopping',
    iconBg: 'var(--accent-secondary-tint)',
    iconColor: 'var(--accent-secondary)',
    transactionId: '#TX89207',
    status: 'Complete'
  },
  {
    id: 'tx-8',
    title: 'Salary Direct Deposit',
    date: '01 January 2026',
    formattedDate: '01 Jan, 06:00 AM',
    amount: 6850,
    type: 'income',
    category: 'Salary',
    card: '1234 ****',
    iconType: 'card',
    iconBg: 'var(--primary-tint)',
    iconColor: 'var(--primary)',
    transactionId: '#TX89208',
    status: 'Complete'
  }
];

export const weeklyActivityData = {
  labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  deposit: [240, 130, 260, 380, 240, 240, 330],
  withdraw: [480, 350, 330, 480, 150, 400, 400]
};

export const expenseStatisticsData = [
  { label: 'Entertainment', value: 30, color: 'var(--accent-secondary)' },
  { label: 'Bill Expense', value: 15, color: 'var(--accent-amber)' },
  { label: 'Investment', value: 20, color: 'var(--accent-rose)' },
  { label: 'Others', value: 35, color: 'var(--primary)' }
];

export const balanceHistoryData = [
  { month: 'Jul', value: 120 },
  { month: 'Aug', value: 320 },
  { month: 'Sep', value: 240 },
  { month: 'Oct', value: 480 },
  { month: 'Nov', value: 780 },
  { month: 'Dec', value: 580 },
  { month: 'Jan', value: 650 }
];

export const accountsKPIs = [
  {
    label: 'My Balance',
    value: 12750,
    change: '+14.2%',
    type: 'emerald',
    icon: 'wallet'
  },
  {
    label: 'Income',
    value: 5600,
    change: '+8.4%',
    type: 'indigo',
    icon: 'income'
  },
  {
    label: 'Expense',
    value: 3460,
    change: '-3.1%',
    type: 'rose',
    icon: 'expense'
  },
  {
    label: 'Total Saving',
    value: 7920,
    change: '+12.6%',
    type: 'amber',
    icon: 'piggy'
  }
];

export const debitCreditMonthlyData = {
  labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
  debit: [2800, 3200, 2900, 3800, 4200, 3460],
  credit: [4100, 4800, 5200, 5100, 5900, 5600]
};

export const invoicesSentData = [
  {
    id: 'inv-1',
    company: 'Apple Store',
    category: 'MacBook Pro M3 Max',
    time: '5h ago',
    amount: 450,
    status: 'Paid',
    iconBg: '#f0fdf4',
    iconColor: '#16a34a'
  },
  {
    id: 'inv-2',
    company: 'Michael Richard',
    category: 'Consulting Contract',
    time: '2 days ago',
    amount: 160,
    status: 'Pending',
    iconBg: '#eff6ff',
    iconColor: '#2563eb'
  },
  {
    id: 'inv-3',
    company: 'PlayStation Network',
    category: 'Console Hardware DevKit',
    time: '5 days ago',
    amount: 1085,
    status: 'Paid',
    iconBg: '#faf5ff',
    iconColor: '#9333ea'
  },
  {
    id: 'inv-4',
    company: 'William Harris',
    category: 'Design Retainer',
    time: '10 days ago',
    amount: 90,
    status: 'Paid',
    iconBg: '#fff7ed',
    iconColor: '#ea580c'
  }
];

export const investmentsData = {
  kpis: [
    { label: 'Total Invested Amount', value: 150000, change: '+15.2%', type: 'emerald' },
    { label: 'Number of Investments', value: 1250, change: '+8.0%', type: 'indigo' },
    { label: 'Rate of Return', value: 5.8, isPercent: true, change: '+1.4%', type: 'amber' }
  ],
  yearlyTrend: [
    { year: '2021', value: 45000 },
    { year: '2022', value: 72000 },
    { year: '2023', value: 95000 },
    { year: '2024', value: 118000 },
    { year: '2025', value: 135000 },
    { year: '2026', value: 150000 }
  ],
  monthlyRevenue: [
    { month: 'Jan', value: 8500 },
    { month: 'Feb', value: 9200 },
    { month: 'Mar', value: 7800 },
    { month: 'Apr', value: 11400 },
    { month: 'May', value: 12800 },
    { month: 'Jun', value: 14200 }
  ],
  trendingStocks: [
    { sl: '01', name: 'Apple Inc.', ticker: 'AAPL', price: 182.5, returnVal: '+2.45%', positive: true, sparkline: [175, 178, 176, 180, 181, 182.5] },
    { sl: '02', name: 'Tesla Motors', ticker: 'TSLA', price: 240.1, returnVal: '-1.20%', positive: false, sparkline: [250, 248, 242, 245, 239, 240.1] },
    { sl: '03', name: 'Alphabet Inc.', ticker: 'GOOGL', price: 142.3, returnVal: '+3.15%', positive: true, sparkline: [136, 138, 140, 139, 141, 142.3] },
    { sl: '04', name: 'Amazon.com', ticker: 'AMZN', price: 175.2, returnVal: '+1.80%', positive: true, sparkline: [170, 171, 169, 173, 174, 175.2] },
    { sl: '05', name: 'Microsoft Corp', ticker: 'MSFT', price: 415.5, returnVal: '+0.95%', positive: true, sparkline: [405, 410, 408, 412, 414, 415.5] },
    { sl: '06', name: 'NVIDIA Corp', ticker: 'NVDA', price: 890.0, returnVal: '+4.65%', positive: true, sparkline: [820, 840, 855, 870, 880, 890.0] }
  ]
};

export const loansData = {
  kpis: [
    { label: 'Personal Loans', value: 50000, monthly: '$3,500 / mo', type: 'emerald' },
    { label: 'Corporate Loans', value: 100000, monthly: '$8,200 / mo', type: 'indigo' },
    { label: 'Business Loans', value: 500000, monthly: '$24,000 / mo', type: 'amber' },
    { label: 'Custom Loans', value: 14500, monthly: '$1,100 / mo', type: 'rose' }
  ],
  activeLoans: [
    { sl: '01', loanId: 'LN-9481', money: 100000, left: 40500, duration: '8 Months', rate: '12%', installment: 2000, status: 'Active' },
    { sl: '02', loanId: 'LN-7822', money: 500000, left: 250000, duration: '36 Months', rate: '10%', installment: 8000, status: 'Active' },
    { sl: '03', loanId: 'LN-3104', money: 10000, left: 2000, duration: '6 Months', rate: '8%', installment: 1600, status: 'Active' },
    { sl: '04', loanId: 'LN-6059', money: 160000, left: 110000, duration: '12 Months', rate: '14%', installment: 4500, status: 'Active' },
    { sl: '05', loanId: 'LN-1428', money: 50000, left: 12000, duration: '5 Months', rate: '9%', installment: 2500, status: 'Active' }
  ]
};

export const servicesData = [
  {
    id: 'srv-1',
    title: 'Life Insurance Plus',
    desc: 'Comprehensive global health and life coverage with instant claim settlement, 24/7 medical concierge, and zero deductibles.',
    badge: 'Popular',
    icon: 'shield',
    color: 'emerald',
    status: 'Active'
  },
  {
    id: 'srv-2',
    title: 'Smart Business Shopping',
    desc: 'Exclusive high-yield commercial procurement card with 5% instant cashback at leading enterprise partners and software vendors.',
    badge: 'Enterprise',
    icon: 'cart',
    color: 'indigo',
    status: 'Active'
  },
  {
    id: 'srv-3',
    title: 'Biometric Safety Vault',
    desc: 'Multi-signature physical and digital deposit protection with institutional-grade hardware cryptography and 100% loss guarantee.',
    badge: 'High Security',
    icon: 'lock',
    color: 'amber',
    status: 'Active'
  },
  {
    id: 'srv-4',
    title: 'Private Wealth Management',
    desc: 'Bespoke global asset allocation, tax optimization, and direct access to top venture capital and private equity syndicates.',
    badge: 'VIP Only',
    icon: 'trend',
    color: 'purple',
    status: 'Available'
  },
  {
    id: 'srv-5',
    title: 'Cross-Border Wire Transfer',
    desc: 'Instant settlement across 140+ countries in 38 currencies with institutional exchange spreads and zero hidden SWIFT fees.',
    badge: 'Zero Fees',
    icon: 'globe',
    color: 'cyan',
    status: 'Active'
  },
  {
    id: 'srv-6',
    title: 'Card Shield & Protection',
    desc: 'Real-time AI behavioral fraud detection, instant one-click freezing, and virtual single-use card generation on demand.',
    badge: 'Automated',
    icon: 'credit',
    color: 'rose',
    status: 'Active'
  }
];

export const privilegesData = {
  currentTier: 'Diamond Member',
  points: 24850,
  nextTierPoints: 30000,
  progress: 82,
  perks: [
    { title: 'Global Airport Lounge Access', desc: 'Complimentary unlimited access to 1,400+ Priority Pass VIP lounges worldwide for you and a guest.', icon: 'plane' },
    { title: '24/7 Dedicated Concierge', desc: 'Direct personal banker access via phone, encrypted WhatsApp, or private messaging anytime.', icon: 'concierge' },
    { title: '5% Travel & Dining Cashback', desc: 'Highest rewards rate on luxury travel, Michelin-starred restaurants, and premier airlines.', icon: 'star' },
    { title: 'Zero Foreign Transaction Fees', desc: 'Pay anywhere on Earth at live interbank mid-market exchange rates without markup.', icon: 'globe' },
    { title: 'Exclusive Investor Syndicates', desc: 'First-look allocations into pre-IPO tech ventures and premier private market offerings.', icon: 'crown' },
    { title: 'Comprehensive Travel Assurance', desc: 'Up to $1,000,000 in international medical, luggage delay, and trip interruption coverage.', icon: 'shield' }
  ],
  vouchers: [
    { id: 'v1', brand: 'Delta Airlines', offer: '$250 Flight Credit', points: 5000 },
    { id: 'v2', brand: 'Four Seasons Hotels', offer: 'Complimentary Suite Upgrade', points: 8000 },
    { id: 'v3', brand: 'Apple', offer: '$100 App Store & Hardware Gift Card', points: 3500 },
    { id: 'v4', brand: 'Uber Black', offer: '6 Free Airport Rides', points: 4200 }
  ]
};
