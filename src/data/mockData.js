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
  avatar: '/assets/avatar.png',
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
    validThru: '12/22',
    cardNumber: '3778 **** **** 1234',
    rawNumber: '3778 5412 8901 1234',
    theme: 'dark', // Blue gradient
    brand: 'mastercard',
    type: 'Platinum Credit',
    isBlocked: false,
    applePay: true,
    googlePay: true
  },
  {
    id: 'card-2',
    balance: 5756,
    cardHolder: 'Eddy Cusuma',
    validThru: '12/22',
    cardNumber: '3778 **** **** 1234',
    rawNumber: '3778 5412 8901 1234',
    theme: 'secondary', // Shade 2: Deep Smoky Forest Pine
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
    avatar: '/assets/avatars/livia-bator.png'
  },
  {
    id: 'ct-2',
    name: 'Randy Press',
    role: 'Director',
    avatar: '/assets/avatars/randy-press.png'
  },
  {
    id: 'ct-3',
    name: 'Workman',
    role: 'Designer',
    avatar: '/assets/avatars/workman.png'
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
    date: '28 January 2021',
    formattedDate: '28 Jan, 12:30 PM',
    amount: -850,
    type: 'expense',
    category: 'Deposit',
    card: '1234 ****',
    iconType: 'card',
    iconBg: '#FFF5D9',
    iconColor: '#FFBB38',
    transactionId: '#TX89201',
    status: 'Complete'
  },
  {
    id: 'tx-2',
    title: 'Deposit Paypal',
    date: '25 January 2021',
    formattedDate: '25 Jan, 09:15 AM',
    amount: 2500,
    type: 'income',
    category: 'Payment',
    card: '5289 ****',
    iconType: 'paypal',
    iconBg: '#E7EDFF',
    iconColor: '#396AFF',
    transactionId: '#TX89202',
    status: 'Complete'
  },
  {
    id: 'tx-3',
    title: 'Jemi Wilson',
    date: '21 January 2021',
    formattedDate: '21 Jan, 07:45 PM',
    amount: 5400,
    type: 'income',
    category: 'Transfer',
    card: '1234 ****',
    iconType: 'coin',
    iconBg: '#DCFAF8',
    iconColor: '#16DBCC',
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
    iconBg: 'rgba(5, 150, 105, 0.12)',
    iconColor: '#059669',
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
    iconBg: 'rgba(236, 72, 153, 0.14)',
    iconColor: '#EC4899',
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
    iconBg: 'rgba(5, 150, 105, 0.12)',
    iconColor: '#059669',
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
    iconBg: 'rgba(236, 72, 153, 0.14)',
    iconColor: '#EC4899',
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
    iconBg: 'rgba(6, 182, 212, 0.14)',
    iconColor: '#06B6D4',
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
  { label: 'Entertainment', value: 30, color: '#343C6A' },
  { label: 'Bill Expense', value: 15, color: '#FC7900' },
  { label: 'Others', value: 35, color: '#10B981' },
  { label: 'Investment', value: 20, color: '#FA00FF' }
];

export const balanceHistoryData = [
  { month: 'Jul', value: 120 },
  { month: 'Aug', value: 240 },
  { month: 'Sep', value: 450 },
  { month: 'Oct', value: 780 },
  { month: 'Nov', value: 210 },
  { month: 'Dec', value: 570 },
  { month: 'Jan', value: 600 }
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
    iconBg: '#DCFAF8',
    iconColor: '#16DBCC',
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
    iconBg: '#E7EDFF',
    iconColor: '#396AFF',
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
    iconBg: '#FFE0EB',
    iconColor: '#FF82AC',
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
    iconBg: '#DCFAF8',
    iconColor: '#16DBCC',
    iconType: 'apple'
  },
  {
    id: 'inv-2',
    company: 'Michael',
    time: '2 days ago',
    amount: 160,
    iconBg: '#FFF5D9',
    iconColor: '#FFBB38',
    iconType: 'user'
  },
  {
    id: 'inv-3',
    company: 'Playstation',
    time: '5 days ago',
    amount: 1085,
    iconBg: '#E7EDFF',
    iconColor: '#396AFF',
    iconType: 'playstation'
  },
  {
    id: 'inv-4',
    company: 'William',
    time: '10 days ago',
    amount: 90,
    iconBg: '#FFE0EB',
    iconColor: '#FF82AC',
    iconType: 'user'
  }
];

export const investmentsData = {
  kpis: [
    {
      id: 'kpi-total-invested',
      label: 'Total Invested Amount',
      value: '$150,000',
      iconType: 'bag',
      iconBg: 'rgba(16, 185, 129, 0.12)',
      iconColor: '#10B981'
    },
    {
      id: 'kpi-num-investments',
      label: 'Number of Investments',
      value: '1,250',
      iconType: 'pie-split',
      iconBg: 'rgba(128, 0, 32, 0.10)',
      iconColor: '#800020'
    },
    {
      id: 'kpi-rate-return',
      label: 'Rate of Return',
      value: '+5.80%',
      iconType: 'repeat',
      iconBg: 'rgba(16, 185, 129, 0.12)',
      iconColor: '#10B981'
    }
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
      iconBg: 'rgba(16, 185, 129, 0.12)',
      iconColor: '#10B981',
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
      iconBg: 'rgba(128, 0, 32, 0.10)',
      iconColor: '#800020',
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
      iconBg: 'rgba(16, 185, 129, 0.12)',
      iconColor: '#10B981',
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
      theme: 'secondary',
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
    { id: 'dbl', label: 'DBL Bank', value: 30, color: '#059669' },
    { id: 'brc', label: 'BRC Bank', value: 15, color: '#F43F5E' },
    { id: 'abm', label: 'ABM Bank', value: 35, color: '#10B981' },
    { id: 'mcp', label: 'MCP Bank', value: 20, color: '#06B6D4' }
  ],
  cardList: [
    {
      id: 'cl-1',
      cardType: 'Secondary',
      bank: 'DBL Bank',
      cardNumber: '**** **** 5600',
      namainCard: 'William',
      iconBg: '#E7EDFF',
      iconColor: '#2D60FF'
    },
    {
      id: 'cl-2',
      cardType: 'Secondary',
      bank: 'BRC Bank',
      cardNumber: '**** **** 4300',
      namainCard: 'Michel',
      iconBg: '#FFE0EB',
      iconColor: '#FF82AC'
    },
    {
      id: 'cl-3',
      cardType: 'Secondary',
      bank: 'ABM Bank',
      cardNumber: '**** **** 7560',
      namainCard: 'Edward',
      iconBg: '#FFF5D9',
      iconColor: '#FFBB38'
    }
  ],
  cardSettings: [
    {
      id: 'cs-1',
      title: 'Block Card',
      desc: 'Instantly block your card',
      iconType: 'card',
      iconBg: '#FFF5D9',
      iconColor: '#FFBB38'
    },
    {
      id: 'cs-2',
      title: 'Change Pin Code',
      desc: 'Choose another pin code',
      iconType: 'lock',
      iconBg: '#E7EDFF',
      iconColor: '#396AFF'
    },
    {
      id: 'cs-3',
      title: 'Add to Google Pay',
      desc: 'Withdraw without any card',
      iconType: 'google',
      iconBg: 'transparent',
      iconColor: '#396AFF'
    },
    {
      id: 'cs-4',
      title: 'Add to Apple Pay',
      desc: 'Withdraw without any card',
      iconType: 'apple',
      iconBg: 'transparent',
      iconColor: '#16DBAA'
    },
    {
      id: 'cs-5',
      title: 'Add to Apple Store',
      desc: 'Withdraw without any card',
      iconType: 'apple-store',
      iconBg: 'transparent',
      iconColor: '#16DBAA'
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
      iconBg: '#E7EDFF',
      iconColor: '#2D60FF'
    },
    {
      id: 'kpi-corporate',
      label: 'Corporate Loans',
      value: '$100,000',
      iconType: 'briefcase',
      iconBg: '#FFF5D9',
      iconColor: '#FFBB38'
    },
    {
      id: 'kpi-business',
      label: 'Business Loans',
      value: '$500,000',
      iconType: 'chart',
      iconBg: '#FFE0EB',
      iconColor: '#FF82AC'
    },
    {
      id: 'kpi-custom',
      label: 'Custom Loans',
      value: 'Choose Money',
      iconType: 'tool',
      iconBg: '#DCFAF8',
      iconColor: '#16DBCC'
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
      iconBg: '#E7EDFF',
      iconColor: '#2D60FF'
    },
    {
      id: 'hl-2',
      title: 'Shopping',
      desc: 'Buy. Think. Grow.',
      iconType: 'shopping-bag',
      iconBg: '#FFF5D9',
      iconColor: '#FFBB38'
    },
    {
      id: 'hl-3',
      title: 'Safety',
      desc: 'We are your allies',
      iconType: 'shield-check',
      iconBg: '#DCFAF8',
      iconColor: '#16DBCC'
    }
  ],
  servicesList: [
    {
      id: 'bs-1',
      title: 'Business loans',
      desc: 'It is a long established',
      iconType: 'loan',
      iconBg: '#FFE0EB',
      iconColor: '#FF82AC',
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
      iconBg: '#FFF5D9',
      iconColor: '#FFBB38',
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
      iconBg: '#FFE0EB',
      iconColor: '#FF82AC',
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
      iconBg: '#E7EDFF',
      iconColor: '#396AFF',
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
      iconBg: '#DCFAF8',
      iconColor: '#16DBCC',
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
      iconBg: '#FFE0EB',
      iconColor: '#FF82AC',
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
    color: 'burgundy',
    status: 'Active'
  },
  {
    id: 'srv-3',
    title: 'Biometric Safety Vault',
    desc: 'Multi-signature physical and digital deposit protection with institutional-grade hardware cryptography and 100% loss guarantee.',
    badge: 'High Security',
    icon: 'lock',
    color: 'emerald',
    status: 'Active'
  },
  {
    id: 'srv-4',
    title: 'Private Wealth Management',
    desc: 'Bespoke global asset allocation, tax optimization, and direct access to top venture capital and private equity syndicates.',
    badge: 'VIP Only',
    icon: 'trend',
    color: 'burgundy',
    status: 'Available'
  },
  {
    id: 'srv-5',
    title: 'Cross-Border Wire Transfer',
    desc: 'Instant settlement across 140+ countries in 38 currencies with institutional exchange spreads and zero hidden SWIFT fees.',
    badge: 'Zero Fees',
    icon: 'globe',
    color: 'emerald',
    status: 'Active'
  },
  {
    id: 'srv-6',
    title: 'Card Shield & Protection',
    desc: 'Real-time AI behavioral fraud detection, instant one-click freezing, and virtual single-use card generation on demand.',
    badge: 'Automated',
    icon: 'credit',
    color: 'burgundy',
    status: 'Active'
  }
];

export const privilegesData = {
  currentTier: 'Diamond Member',
  points: 24850,
  nextTierPoints: 30000,
  progress: 82,
  multiplier: '3.5x',
  lifetimeEarned: 148200,
  annualSavings: 4850,
  advisor: {
    name: 'Genevieve Laurent',
    role: 'Senior Private Banker',
    status: 'Online',
    response: 'Typically replies in 2 mins',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80'
  },
  tiers: [
    { id: 'silver', name: 'Silver Elite', minPoints: 0, perkCount: 2, active: false },
    { id: 'gold', name: 'Gold Executive', minPoints: 5000, perkCount: 4, active: false },
    { id: 'platinum', name: 'Platinum Premier', minPoints: 15000, perkCount: 5, active: false },
    { id: 'diamond', name: 'Diamond Member', minPoints: 25000, perkCount: 6, active: true },
    { id: 'obsidian', name: 'Black Obsidian', minPoints: 50000, perkCount: 8, active: false }
  ],
  perks: [
    {
      id: 'pk-1',
      title: 'Global Airport Lounge Access',
      desc: 'Complimentary unlimited access to 1,400+ Priority Pass VIP lounges worldwide for you and a guest with fast-track security.',
      icon: 'plane',
      category: 'travel',
      badge: 'UNLIMITED ACCESS',
      badgeBg: 'rgba(16, 185, 129, 0.12)',
      badgeColor: '#059669',
      iconBg: '#ECFDF5',
      iconColor: '#059669'
    },
    {
      id: 'pk-2',
      title: '24/7 Dedicated Concierge',
      desc: 'Direct personal banker access via private line, encrypted WhatsApp, or in-app concierge for reservations and global bookings.',
      icon: 'concierge',
      category: 'lifestyle',
      badge: 'DEDICATED ADVISOR',
      badgeBg: 'rgba(22, 219, 204, 0.12)',
      badgeColor: '#059669',
      iconBg: '#DCFAF8',
      iconColor: '#16DBCC'
    },
    {
      id: 'pk-3',
      title: '5% Travel & Dining Cashback',
      desc: 'Highest rewards rate on luxury hotels, Michelin-starred restaurants, and premier international airlines with instant redemption.',
      icon: 'star',
      category: 'lifestyle',
      badge: '3.5X MULTIPLIER',
      badgeBg: 'rgba(255, 187, 56, 0.14)',
      badgeColor: '#D97706',
      iconBg: '#FFF5D9',
      iconColor: '#FFBB38'
    },
    {
      id: 'pk-4',
      title: 'Zero Foreign Transaction Fees',
      desc: 'Spend anywhere on Earth at live interbank mid-market exchange rates without administrative fees, markups, or ATM withdrawal charges.',
      icon: 'globe',
      category: 'travel',
      badge: 'GLOBAL COMMERCE',
      badgeBg: 'rgba(45, 96, 255, 0.1)',
      badgeColor: '#2563EB',
      iconBg: '#E7EDFF',
      iconColor: '#2D60FF'
    },
    {
      id: 'pk-5',
      title: 'Exclusive Investor Syndicates',
      desc: 'First-look priority allocations into vetted pre-IPO tech ventures, unicorn private market funds, and private credit syndications.',
      icon: 'crown',
      category: 'wealth',
      badge: 'PRIVATE ALLOCATION',
      badgeBg: 'rgba(255, 130, 172, 0.14)',
      badgeColor: '#E11D48',
      iconBg: '#FFE0EB',
      iconColor: '#FF82AC'
    },
    {
      id: 'pk-6',
      title: 'Comprehensive Travel Assurance',
      desc: 'Up to $1,000,000 international emergency medical coverage, baggage loss, flight cancellation, and private repatriation protection.',
      icon: 'shield',
      category: 'wealth',
      badge: '$1M COVERAGE',
      badgeBg: 'rgba(16, 185, 129, 0.12)',
      badgeColor: '#059669',
      iconBg: '#DCFAF8',
      iconColor: '#16DBCC'
    }
  ],
  vouchers: [
    {
      id: 'v1',
      brand: 'Delta Airlines',
      offer: '$250 Flight Credit',
      points: 5000,
      category: 'travel',
      tag: 'AIRLINE PASS',
      expires: 'Valid 12 Months',
      logoText: 'DELTA',
      logoBg: '#FFE0EB',
      logoColor: '#FF82AC'
    },
    {
      id: 'v2',
      brand: 'Four Seasons Hotels',
      offer: 'Complimentary Suite Upgrade',
      points: 8000,
      category: 'travel',
      tag: 'HOTEL STAY',
      expires: 'Valid 6 Months',
      logoText: 'FOUR SEASONS',
      logoBg: '#FFF5D9',
      logoColor: '#FFBB38'
    },
    {
      id: 'v3',
      brand: 'Apple Store',
      offer: '$100 Hardware & App Credit',
      points: 3500,
      category: 'lifestyle',
      tag: 'TECH REWARD',
      expires: 'No Expiration',
      logoText: 'APPLE',
      logoBg: '#E7EDFF',
      logoColor: '#2D60FF'
    },
    {
      id: 'v4',
      brand: 'Uber Black',
      offer: '6 Free Airport Chauffeur Rides',
      points: 4200,
      category: 'travel',
      tag: 'RIDE PASS',
      expires: 'Valid 90 Days',
      logoText: 'UBER BLACK',
      logoBg: '#ECFDF5',
      logoColor: '#059669'
    }
  ]
};
