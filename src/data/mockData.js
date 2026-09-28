/* ==========================================================================
   BANKDASH MOCK DATA & PERSISTENT APP STATE
   ========================================================================== */

export const currentUser = {
  name: 'Charlene Reed',
  userName: 'Charlene Reed',
  email: 'charlenereed@gmail.com',
  dob: '25 January 1990',
  presentAddress: 'San Jose, California, USA',
  permanentAddress: 'San Jose, California, USA',
  city: 'San Jose',
  postalCode: '45962',
  country: 'USA',
  role: 'Fintech Executive',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80',
  currency: 'USD',
  currencySymbol: '$',
  timeZone: '(GMT-12:00) International Date Line West',
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

export const accountsLastTransactions = [
  {
    id: 'alt-1',
    title: 'Spotify Subscription',
    date: '25 Jan 2021',
    category: 'Shopping',
    card: '1234 ****',
    status: 'Pending',
    amount: -150,
    iconBg: 'rgba(16, 185, 129, 0.12)',
    iconColor: '#10b981',
    iconType: 'sync'
  },
  {
    id: 'alt-2',
    title: 'Mobile Service',
    date: '25 Jan 2021',
    category: 'Service',
    card: '1234 ****',
    status: 'Completed',
    amount: -340,
    iconBg: 'rgba(99, 102, 241, 0.12)',
    iconColor: '#6366f1',
    iconType: 'tool'
  },
  {
    id: 'alt-3',
    title: 'Emilly Wilson',
    date: '25 Jan 2021',
    category: 'Transfer',
    card: '1234 ****',
    status: 'Completed',
    amount: 780,
    iconBg: 'rgba(244, 63, 94, 0.12)',
    iconColor: '#f43f5e',
    iconType: 'user'
  }
];

export const debitCreditWeeklyData = {
  debitedAmount: '7,560',
  creditedAmount: '5,420',
  labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  debit: [240, 130, 260, 370, 240, 240, 330],
  credit: [480, 340, 320, 230, 480, 180, 400]
};

export const debitCreditMonthlyData = {
  labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
  debit: [2800, 3200, 2900, 3800, 4200, 3460],
  credit: [4100, 4800, 5200, 5100, 5900, 5600]
};

export const invoicesSentData = [
  {
    id: 'inv-1',
    company: 'Apple Store',
    time: '5h ago',
    amount: 450,
    iconBg: 'rgba(16, 185, 129, 0.12)',
    iconColor: '#10b981',
    iconType: 'apple'
  },
  {
    id: 'inv-2',
    company: 'Michael',
    time: '2 days ago',
    amount: 160,
    iconBg: 'rgba(245, 158, 11, 0.12)',
    iconColor: '#f59e0b',
    iconType: 'user'
  },
  {
    id: 'inv-3',
    company: 'Playstation',
    time: '5 days ago',
    amount: 1085,
    iconBg: 'rgba(99, 102, 241, 0.12)',
    iconColor: '#6366f1',
    iconType: 'playstation'
  },
  {
    id: 'inv-4',
    company: 'William',
    time: '10 days ago',
    amount: 90,
    iconBg: 'rgba(244, 63, 94, 0.12)',
    iconColor: '#f43f5e',
    iconType: 'user'
  }
];

export const investmentsData = {
  kpis: [
    { label: 'Total Invested Amount', value: '$150,000', icon: 'wallet', type: 'emerald' },
    { label: 'Number of Investments', value: '1,250', icon: 'pie', type: 'rose' },
    { label: 'Rate of Return', value: '+5.80%', icon: 'sync', type: 'indigo' }
  ],
  yearlyTotalInvestment: {
    yTicks: [0, 10000, 20000, 30000, 40000],
    maxVal: 40000,
    points: [
      { year: '2016', value: 5000 },
      { year: '2017', value: 23000 },
      { year: '2018', value: 16000 },
      { year: '2019', value: 37000 },
      { year: '2020', value: 21000 },
      { year: '2021', value: 29000 }
    ]
  },
  monthlyRevenueCurve: {
    yTicks: [0, 10000, 20000, 30000, 40000],
    years: ['2016', '2017', '2018', '2019', '2020', '2021'],
    maxVal: 40000,
    controlPoints: [
      { x: 0, y: 11000 },
      { x: 0.1, y: 13000 },
      { x: 0.2, y: 20000 },
      { x: 0.28, y: 10000 },
      { x: 0.4, y: 27000 },
      { x: 0.48, y: 31000 },
      { x: 0.58, y: 20000 },
      { x: 0.68, y: 28000 },
      { x: 0.78, y: 26000 },
      { x: 0.88, y: 15000 },
      { x: 1.0, y: 35000 }
    ]
  },
  myInvestments: [
    {
      id: 'mi-1',
      title: 'Apple Store',
      category: 'E-commerce, Marketplace',
      value: '$54,000',
      valueLabel: 'Envestment Value',
      returnRate: '+16%',
      returnLabel: 'Return Value',
      isPositive: true,
      iconBg: 'rgba(244, 63, 94, 0.12)',
      iconColor: '#f43f5e',
      iconType: 'apple'
    },
    {
      id: 'mi-2',
      title: 'Samsung Mobile',
      category: 'E-commerce, Marketplace',
      value: '$25,300',
      valueLabel: 'Envestment Value',
      returnRate: '-4%',
      returnLabel: 'Return Value',
      isPositive: false,
      iconBg: 'rgba(99, 102, 241, 0.12)',
      iconColor: '#6366f1',
      iconType: 'google'
    },
    {
      id: 'mi-3',
      title: 'Tesla Motors',
      category: 'Electric Vehicles',
      value: '$8,200',
      valueLabel: 'Envestment Value',
      returnRate: '+25%',
      returnLabel: 'Return Value',
      isPositive: true,
      iconBg: 'rgba(245, 158, 11, 0.12)',
      iconColor: '#f59e0b',
      iconType: 'tesla'
    }
  ],
  trendingStocks: [
    { sl: '01.', name: 'Trivago', price: '$520', returnVal: '+5%', positive: true },
    { sl: '02.', name: 'Canon', price: '$480', returnVal: '+10%', positive: true },
    { sl: '03.', name: 'Uber Food', price: '$350', returnVal: '-3%', positive: false },
    { sl: '04.', name: 'Nokia', price: '$940', returnVal: '+2%', positive: true },
    { sl: '05.', name: 'Tiktok', price: '$670', returnVal: '-12%', positive: false }
  ]
};

export const creditCardsPageData = {
  myCards: [
    {
      id: 'cc-1',
      balance: 5756,
      cardHolder: 'Eddy Cusuma',
      validThru: '12/22',
      cardNumber: '3778 **** **** 1234',
      theme: 'dark',
      brand: 'mastercard'
    },
    {
      id: 'cc-2',
      balance: 5756,
      cardHolder: 'Eddy Cusuma',
      validThru: '12/22',
      cardNumber: '3778 **** **** 1234',
      theme: 'indigo',
      brand: 'mastercard'
    },
    {
      id: 'cc-3',
      balance: 5756,
      cardHolder: 'Eddy Cusuma',
      validThru: '12/22',
      cardNumber: '3778 **** **** 1234',
      theme: 'light',
      brand: 'mastercard'
    }
  ],
  cardExpenseDonut: [
    { id: 'dbl', label: 'DBL Bank', value: 30, color: '#4C78FF' },
    { id: 'brc', label: 'BRC Bank', value: 15, color: '#FF6B9D' },
    { id: 'abm', label: 'ABM Bank', value: 35, color: '#16DBCC' },
    { id: 'mcp', label: 'MCP Bank', value: 20, color: '#FFBB38' }
  ],
  cardList: [
    {
      id: 'cl-1',
      cardType: 'Secondary',
      bank: 'DBL Bank',
      cardNumber: '**** **** 5600',
      namainCard: 'William',
      iconBg: 'rgba(99, 102, 241, 0.12)',
      iconColor: '#6366f1'
    },
    {
      id: 'cl-2',
      cardType: 'Secondary',
      bank: 'BRC Bank',
      cardNumber: '**** **** 4300',
      namainCard: 'Michel',
      iconBg: 'rgba(244, 63, 94, 0.12)',
      iconColor: '#f43f5e'
    },
    {
      id: 'cl-3',
      cardType: 'Secondary',
      bank: 'ABM Bank',
      cardNumber: '**** **** 7560',
      namainCard: 'Edward',
      iconBg: 'rgba(245, 158, 11, 0.12)',
      iconColor: '#f59e0b'
    }
  ],
  cardSettings: [
    {
      id: 'cs-1',
      title: 'Block Card',
      desc: 'Instantly block your card',
      iconType: 'card',
      iconBg: 'rgba(245, 158, 11, 0.12)',
      iconColor: '#f59e0b'
    },
    {
      id: 'cs-2',
      title: 'Change Pin Code',
      desc: 'Choose another pin code',
      iconType: 'lock',
      iconBg: 'rgba(99, 102, 241, 0.12)',
      iconColor: '#6366f1'
    },
    {
      id: 'cs-3',
      title: 'Add to Google Pay',
      desc: 'Withdraw without any card',
      iconType: 'google',
      iconBg: 'rgba(244, 63, 94, 0.12)',
      iconColor: '#f43f5e'
    },
    {
      id: 'cs-4',
      title: 'Add to Apple Pay',
      desc: 'Withdraw without any card',
      iconType: 'apple',
      iconBg: 'rgba(16, 185, 129, 0.12)',
      iconColor: '#10b981'
    },
    {
      id: 'cs-5',
      title: 'Add to Apple Store',
      desc: 'Withdraw without any card',
      iconType: 'apple',
      iconBg: 'rgba(16, 185, 129, 0.12)',
      iconColor: '#10b981'
    }
  ]
};

export const loansData = {
  kpis: [
    {
      id: 'kpi-personal',
      label: 'Personal Loans',
      value: '$50,000',
      iconType: 'user',
      iconBg: 'rgba(59, 130, 246, 0.12)',
      iconColor: '#3B82F6'
    },
    {
      id: 'kpi-corporate',
      label: 'Corporate Loans',
      value: '$100,000',
      iconType: 'briefcase',
      iconBg: 'rgba(245, 158, 11, 0.12)',
      iconColor: '#F59E0B'
    },
    {
      id: 'kpi-business',
      label: 'Business Loans',
      value: '$500,000',
      iconType: 'chart',
      iconBg: 'rgba(244, 63, 94, 0.12)',
      iconColor: '#F43F5E'
    },
    {
      id: 'kpi-custom',
      label: 'Custom Loans',
      value: 'Choose Money',
      iconType: 'tool',
      iconBg: 'rgba(20, 184, 166, 0.12)',
      iconColor: '#14B8A6'
    }
  ],
  activeLoans: [
    { sl: '01.', money: '$100,000', left: '$40,500', duration: '8 Months', rate: '12%', installment: '$2,000 / month', rawLeft: 40500, rawInst: 2000, isFirst: true },
    { sl: '02.', money: '$500,000', left: '$250,000', duration: '36 Months', rate: '10%', installment: '$8,000 / month', rawLeft: 250000, rawInst: 8000, isFirst: false },
    { sl: '03.', money: '$900,000', left: '$40,500', duration: '12 Months', rate: '12%', installment: '$5,000 / month', rawLeft: 40500, rawInst: 5000, isFirst: false },
    { sl: '04.', money: '$50,000', left: '$40,500', duration: '25 Months', rate: '5%', installment: '$2,000 / month', rawLeft: 40500, rawInst: 2000, isFirst: false },
    { sl: '05.', money: '$50,000', left: '$40,500', duration: '5 Months', rate: '16%', installment: '$10,000 / month', rawLeft: 40500, rawInst: 10000, isFirst: false },
    { sl: '06.', money: '$80,000', left: '$25,500', duration: '14 Months', rate: '8%', installment: '$2,000 / month', rawLeft: 25500, rawInst: 2000, isFirst: false },
    { sl: '07.', money: '$12,000', left: '$5,500', duration: '9 Months', rate: '13%', installment: '$500 / month', rawLeft: 5500, rawInst: 500, isFirst: false },
    { sl: '08.', money: '$160,000', left: '$100,800', duration: '3 Months', rate: '12%', installment: '$900 / month', rawLeft: 100800, rawInst: 900, isFirst: false }
  ],
  total: {
    sl: 'Total',
    money: '$125,0000',
    left: '$750,000',
    duration: '',
    rate: '',
    installment: '$50,000 / month'
  }
};

export const servicesPageData = {
  highlights: [
    {
      id: 'hl-1',
      title: 'Life Insurance',
      desc: 'Unlimited protection',
      iconType: 'shield-heart',
      iconBg: 'rgba(59, 130, 246, 0.12)',
      iconColor: '#3B82F6'
    },
    {
      id: 'hl-2',
      title: 'Shopping',
      desc: 'Buy. Think. Grow.',
      iconType: 'shopping-bag',
      iconBg: 'rgba(245, 158, 11, 0.12)',
      iconColor: '#F59E0B'
    },
    {
      id: 'hl-3',
      title: 'Safety',
      desc: 'We are your allies',
      iconType: 'shield-check',
      iconBg: 'rgba(20, 184, 166, 0.12)',
      iconColor: '#14B8A6'
    }
  ],
  servicesList: [
    {
      id: 'bs-1',
      title: 'Business loans',
      desc: 'It is a long established',
      iconType: 'loan',
      iconBg: 'rgba(244, 63, 94, 0.12)',
      iconColor: '#F43F5E',
      col1Title: 'Lorem Ipsum',
      col1Desc: 'Many publishing',
      col2Title: 'Lorem Ipsum',
      col2Desc: 'Many publishing',
      col3Title: 'Lorem Ipsum',
      col3Desc: 'Many publishing',
      isHighlightBtn: false
    },
    {
      id: 'bs-2',
      title: 'Checking accounts',
      desc: 'It is a long established',
      iconType: 'briefcase',
      iconBg: 'rgba(245, 158, 11, 0.12)',
      iconColor: '#F59E0B',
      col1Title: 'Lorem Ipsum',
      col1Desc: 'Many publishing',
      col2Title: 'Lorem Ipsum',
      col2Desc: 'Many publishing',
      col3Title: 'Lorem Ipsum',
      col3Desc: 'Many publishing',
      isHighlightBtn: false
    },
    {
      id: 'bs-3',
      title: 'Savings accounts',
      desc: 'It is a long established',
      iconType: 'chart',
      iconBg: 'rgba(244, 63, 94, 0.12)',
      iconColor: '#F43F5E',
      col1Title: 'Lorem Ipsum',
      col1Desc: 'Many publishing',
      col2Title: 'Lorem Ipsum',
      col2Desc: 'Many publishing',
      col3Title: 'Lorem Ipsum',
      col3Desc: 'Many publishing',
      isHighlightBtn: true
    },
    {
      id: 'bs-4',
      title: 'Debit and credit cards',
      desc: 'It is a long established',
      iconType: 'user',
      iconBg: 'rgba(59, 130, 246, 0.12)',
      iconColor: '#3B82F6',
      col1Title: 'Lorem Ipsum',
      col1Desc: 'Many publishing',
      col2Title: 'Lorem Ipsum',
      col2Desc: 'Many publishing',
      col3Title: 'Lorem Ipsum',
      col3Desc: 'Many publishing',
      isHighlightBtn: false
    },
    {
      id: 'bs-5',
      title: 'Life Insurance',
      desc: 'It is a long established',
      iconType: 'shield-check',
      iconBg: 'rgba(20, 184, 166, 0.12)',
      iconColor: '#14B8A6',
      col1Title: 'Lorem Ipsum',
      col1Desc: 'Many publishing',
      col2Title: 'Lorem Ipsum',
      col2Desc: 'Many publishing',
      col3Title: 'Lorem Ipsum',
      col3Desc: 'Many publishing',
      isHighlightBtn: false
    },
    {
      id: 'bs-6',
      title: 'Business loans',
      desc: 'It is a long established',
      iconType: 'loan',
      iconBg: 'rgba(244, 63, 94, 0.12)',
      iconColor: '#F43F5E',
      col1Title: 'Lorem Ipsum',
      col1Desc: 'Many publishing',
      col2Title: 'Lorem Ipsum',
      col2Desc: 'Many publishing',
      col3Title: 'Lorem Ipsum',
      col3Desc: 'Many publishing',
      isHighlightBtn: false
    }
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
