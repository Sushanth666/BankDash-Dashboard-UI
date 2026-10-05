/* ==========================================================================
   PAGE: TRANSACTIONS
   Layout:
   - Top Row: My Cards (compact 2-card slider) | My Expense (bar chart)
   - Recent Transactions table with tabs, search, category filter
   - Pagination + Receipt modal
   ========================================================================== */

import { userCards, recentTransactions } from '../data/mockData.js';
import { createCreditCardHtml, bindCardInteractions } from '../components/Card.js';
import { openModal } from '../components/Modal.js';
import { showToast } from '../components/Toast.js';
import { animateAllCounters } from '../utils/animations.js';

// Expanded transactions dataset matching Figma design
const allTransactionsData = [
  // Page 1 — Exact match to Figma Recent Transactions image
  {
    id: 'tx-1',
    title: 'Spotify Subscription',
    transactionId: '#12548796',
    type: 'expense',
    category: 'Shopping',
    card: '1234 ****',
    formattedDate: '28 Jan, 12.30 AM',
    amount: -2500
  },
  {
    id: 'tx-2',
    title: 'Freepik Sales',
    transactionId: '#12548796',
    type: 'income',
    category: 'Transfer',
    card: '1234 ****',
    formattedDate: '25 Jan, 10.40 PM',
    amount: 750
  },
  {
    id: 'tx-3',
    title: 'Mobile Service',
    transactionId: '#12548796',
    type: 'expense',
    category: 'Service',
    card: '1234 ****',
    formattedDate: '20 Jan, 10.40 PM',
    amount: -150
  },
  {
    id: 'tx-4',
    title: 'Wilson',
    transactionId: '#12548796',
    type: 'expense',
    category: 'Transfer',
    card: '1234 ****',
    formattedDate: '15 Jan, 03.29 PM',
    amount: -1050,
    customAmount: '-$1050'
  },
  {
    id: 'tx-5',
    title: 'Emilly',
    transactionId: '#12548796',
    type: 'income',
    category: 'Transfer',
    card: '1234 ****',
    formattedDate: '14 Jan, 10.40 PM',
    amount: 840
  },

  // Page 2
  {
    id: 'tx-6',
    title: 'Netflix Subscription',
    transactionId: '#12548796',
    type: 'expense',
    category: 'Shopping',
    card: '1234 ****',
    formattedDate: '12 Jan, 08.15 AM',
    amount: -20
  },
  {
    id: 'tx-7',
    title: 'Client Project Wire',
    transactionId: '#12548796',
    type: 'income',
    category: 'Transfer',
    card: '1234 ****',
    formattedDate: '10 Jan, 02.45 PM',
    amount: 3200
  },
  {
    id: 'tx-8',
    title: 'Supermarket Groceries',
    transactionId: '#12548796',
    type: 'expense',
    category: 'Shopping',
    card: '1234 ****',
    formattedDate: '08 Jan, 06.20 PM',
    amount: -180
  },
  {
    id: 'tx-9',
    title: 'Freelance Payout',
    transactionId: '#12548796',
    type: 'income',
    category: 'Transfer',
    card: '1234 ****',
    formattedDate: '06 Jan, 11.00 AM',
    amount: 1500
  },
  {
    id: 'tx-10',
    title: 'Uber City Trip',
    transactionId: '#12548796',
    type: 'expense',
    category: 'Service',
    card: '1234 ****',
    formattedDate: '04 Jan, 09.30 PM',
    amount: -45
  },

  // Page 3
  {
    id: 'tx-11',
    title: 'Amazon Prime Order',
    transactionId: '#12548796',
    type: 'expense',
    category: 'Shopping',
    card: '1234 ****',
    formattedDate: '02 Jan, 01.10 PM',
    amount: -89
  },
  {
    id: 'tx-12',
    title: 'Software Licensing',
    transactionId: '#12548796',
    type: 'expense',
    category: 'Service',
    card: '1234 ****',
    formattedDate: '01 Jan, 10.00 AM',
    amount: -240
  },
  {
    id: 'tx-13',
    title: 'Consulting Retainer',
    transactionId: '#12548796',
    type: 'income',
    category: 'Transfer',
    card: '1234 ****',
    formattedDate: '29 Dec, 04.20 PM',
    amount: 2100
  },
  {
    id: 'tx-14',
    title: 'Gym Club Membership',
    transactionId: '#12548796',
    type: 'expense',
    category: 'Service',
    card: '1234 ****',
    formattedDate: '28 Dec, 07.00 AM',
    amount: -65
  },
  {
    id: 'tx-15',
    title: 'Figma Team Plan',
    transactionId: '#12548796',
    type: 'expense',
    category: 'Service',
    card: '1234 ****',
    formattedDate: '25 Dec, 12.00 PM',
    amount: -180
  },

  // Page 4
  {
    id: 'tx-16',
    title: 'Apple Store Purchase',
    transactionId: '#12548796',
    type: 'expense',
    category: 'Shopping',
    card: '1234 ****',
    formattedDate: '22 Dec, 03.40 PM',
    amount: -1299
  },
  {
    id: 'tx-17',
    title: 'Upwork Project Earnings',
    transactionId: '#12548796',
    type: 'income',
    category: 'Transfer',
    card: '1234 ****',
    formattedDate: '20 Dec, 11.15 AM',
    amount: 1850
  },
  {
    id: 'tx-18',
    title: 'Cloud Infrastructure',
    transactionId: '#12548796',
    type: 'expense',
    category: 'Service',
    card: '1234 ****',
    formattedDate: '18 Dec, 05.30 PM',
    amount: -120
  },
  {
    id: 'tx-19',
    title: 'Coffee & Catering',
    transactionId: '#12548796',
    type: 'expense',
    category: 'Shopping',
    card: '1234 ****',
    formattedDate: '15 Dec, 09.45 AM',
    amount: -32
  },
  {
    id: 'tx-20',
    title: 'Dividend Earnings',
    transactionId: '#12548796',
    type: 'income',
    category: 'Transfer',
    card: '1234 ****',
    formattedDate: '12 Dec, 02.00 PM',
    amount: 920
  }
];

// Monthly expense data for the bar chart — matching Figma Image 2
const monthlyExpenseData = [
  { month: 'Aug', amount: 7500 },
  { month: 'Sep', amount: 10600 },
  { month: 'Oct', amount: 6800 },
  { month: 'Nov', amount: 4500 },
  { month: 'Dec', amount: 12500 },
  { month: 'Jan', amount: 6800 }
];

const maxExpense = Math.max(...monthlyExpenseData.map(d => d.amount));

function renderExpenseChart() {
  const bars = monthlyExpenseData.map((d, i) => {
    const heightPct = (d.amount / maxExpense) * 78;
    const isHighest = d.amount === maxExpense;
    return `
      <div class="tx-expense-bar-col">
        <div class="tx-expense-bar-wrap">
          <div class="tx-expense-bar ${isHighest ? 'active' : ''}" 
               style="height: ${heightPct}%;"
               data-amount="$${d.amount.toLocaleString()}"
               title="$${d.amount.toLocaleString()}">
            ${isHighest ? `<span class="tx-expense-bar-label">$${d.amount.toLocaleString()}</span>` : ''}
          </div>
        </div>
        <div class="tx-expense-month">${d.month}</div>
      </div>
    `;
  }).join('');

  return `
    <div class="tx-expense-chart">
      ${bars}
    </div>
  `;
}

export function renderTransactionsPage(container) {
  let activeTab = 'all';
  let currentPage = 1;
  const pageSize = 5;

  function getFilteredData() {
    return allTransactionsData.filter(tx => {
      return activeTab === 'all' || tx.type === activeTab;
    });
  }

  function renderTableRows(filtered) {
    const startIdx = (currentPage - 1) * pageSize;
    const paged = filtered.slice(startIdx, startIdx + pageSize);

    if (paged.length === 0) {
      return `
        <tr>
          <td colspan="7" style="text-align: center; padding: 48px; color: #718EBF;">
            No transactions found.
          </td>
        </tr>
      `;
    }

    return paged.map((tx, idx) => {
      const isPositive = tx.amount > 0;
      const formattedAmt = tx.customAmount || (isPositive 
        ? `+$${tx.amount.toLocaleString()}` 
        : `-$${Math.abs(tx.amount).toLocaleString()}`);
      const amtClass = isPositive ? 'positive' : 'negative';
      const isMiddle = idx === 2 || (paged.length === 5 && idx === 2);

      // Circle icon with up arrow (expense) or down arrow (income) matching user image
      const arrowIcon = isPositive
        ? `<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
             <circle cx="17" cy="17" r="16" stroke="#718EBF" stroke-width="1.3"/>
             <path d="M17 11V23M17 23L12 18M17 23L22 18" stroke="#718EBF" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>`
        : `<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
             <circle cx="17" cy="17" r="16" stroke="#718EBF" stroke-width="1.3"/>
             <path d="M17 23V11M17 11L12 16M17 11L22 16" stroke="#718EBF" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>`;

      return `
        <tr class="tx-table-row">
          <td>
            <div class="tx-desc-cell">
              <div class="tx-circle-icon">${arrowIcon}</div>
              <div class="tx-desc-info">
                <span class="tx-desc-title">${tx.title}</span>
                <span class="tx-desc-date-mobile">${tx.formattedDate || tx.date}</span>
              </div>
            </div>
          </td>
          <td class="tx-cell">${tx.transactionId}</td>
          <td class="tx-cell">${tx.category}</td>
          <td class="tx-cell">${tx.card}</td>
          <td class="tx-cell">${tx.formattedDate || tx.date}</td>
          <td class="tx-cell tx-amount-cell ${amtClass}">${formattedAmt}</td>
          <td style="text-align: center;">
            <button class="tx-download-btn download-receipt-btn ${isMiddle ? 'btn-green' : ''}" data-tx-id="${tx.id}">Download</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    let pagesHtml = '';

    for (let i = 1; i <= totalPages; i++) {
      pagesHtml += `
        <button class="tx-page-num ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>
      `;
    }

    return `
      <div class="tx-pagination-container">
        <button class="tx-page-arrow" id="pagination-prev" ${currentPage === 1 ? 'disabled' : ''}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Previous
        </button>
        ${pagesHtml}
        <button class="tx-page-arrow" id="pagination-next" ${currentPage === totalPages ? 'disabled' : ''}>
          Next
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    `;
  }

  function updateView() {
    const filtered = getFilteredData();
    const tbody = container.querySelector('#transactions-table-body');
    const paginationWrap = container.querySelector('#transactions-pagination-wrap');

    if (tbody) tbody.innerHTML = renderTableRows(filtered);
    if (paginationWrap) paginationWrap.innerHTML = renderPagination(filtered.length);

    attachRowEvents();
  }

  // Show only first 2 cards for compact layout
  const displayCards = userCards.slice(0, 2);

  container.innerHTML = `
    <div class="tx-page-container">

      <!-- TOP ROW: My Cards + Add Card + My Expense -->
      <div class="tx-top-row">

        <!-- My Cards Section -->
        <div class="tx-cards-section">
          <div class="section-header tx-section-header">
            <h2 class="section-title">My Cards</h2>
            <button class="tx-add-card-link" id="tx-add-card-btn">+ Add Card</button>
          </div>
          <div class="tx-cards-grid" id="tx-cards-slider">
            ${displayCards.map(c => createCreditCardHtml(c)).join('')}
          </div>
        </div>

        <!-- My Expense Section -->
        <div class="tx-expense-section">
          <div class="section-header tx-section-header">
            <h2 class="section-title">My Expense</h2>
          </div>
          <div class="tx-expense-card-box">
            ${renderExpenseChart()}
          </div>
        </div>

      </div>

      <!-- RECENT TRANSACTIONS TABLE SECTION -->
      <div class="tx-table-section" style="margin-top: 32px;">
        <div class="tx-table-header-block">
          <h2 class="section-title">Recent Transactions</h2>
        </div>

        <!-- Navigation Tabs: All Transactions, Income, Expense -->
        <div class="tx-tabs-nav">
          <button class="tx-tab-btn ${activeTab === 'all' ? 'active' : ''}" data-tab="all">All Transactions</button>
          <button class="tx-tab-btn ${activeTab === 'income' ? 'active' : ''}" data-tab="income">Income</button>
          <button class="tx-tab-btn ${activeTab === 'expense' ? 'active' : ''}" data-tab="expense">Expense</button>
        </div>

        <!-- Table Card Box -->
        <div class="tx-table-card-box">
          <table class="tx-clean-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Transaction ID</th>
                <th>Type</th>
                <th>Card</th>
                <th>Date</th>
                <th>Amount</th>
                <th style="text-align: center;">Receipt</th>
              </tr>
            </thead>
            <tbody id="transactions-table-body">
              ${renderTableRows(getFilteredData())}
            </tbody>
          </table>
        </div>

        <div id="transactions-pagination-wrap">
          ${renderPagination(getFilteredData().length)}
        </div>
      </div>

    </div>
  `;

  // Bind Card interactions
  bindCardInteractions(container.querySelector('#tx-cards-slider'));

  // Add card button
  const addCardBtn = container.querySelector('#tx-add-card-btn');
  if (addCardBtn) {
    addCardBtn.addEventListener('click', () => {
      showToast('Add New Card', 'Card addition feature coming soon!', 'info');
    });
  }

  // Tab switching
  const tabBtns = container.querySelectorAll('.tx-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTab = btn.getAttribute('data-tab');
      currentPage = 1;
      updateView();
    });
  });

  // Animate expense bars after render
  setTimeout(() => {
    const bars = container.querySelectorAll('.tx-expense-bar');
    bars.forEach((bar, i) => {
      bar.style.transform = 'scaleY(0)';
      bar.style.transformOrigin = 'bottom';
      bar.style.transition = `transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 80}ms`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bar.style.transform = 'scaleY(1)';
        });
      });
    });
  }, 100);

  function attachRowEvents() {
    // Pagination number buttons
    const pageBtns = container.querySelectorAll('.tx-page-num[data-page]');
    pageBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        currentPage = parseInt(btn.getAttribute('data-page'), 10);
        updateView();
      });
    });

    const prevBtn = container.querySelector('#pagination-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentPage > 1) { currentPage--; updateView(); }
      });
    }

    const nextBtn = container.querySelector('#pagination-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(getFilteredData().length / pageSize);
        if (currentPage < totalPages) { currentPage++; updateView(); }
      });
    }

    // Receipt modal click
    const receiptBtns = container.querySelectorAll('.download-receipt-btn');
    receiptBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const txId = btn.getAttribute('data-tx-id');
        const tx = allTransactionsData.find(t => t.id === txId);
        if (!tx) return;

        openModal({
          title: 'Transaction Receipt',
          contentHtml: `
            <div class="receipt-box">
              <div class="receipt-header">
                <div class="receipt-title">BankDash Official Statement</div>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">Verified Electronic Transaction Receipt</div>
              </div>
              <div class="receipt-row">
                <span style="color: var(--text-muted);">Transaction ID:</span>
                <span class="text-mono" style="font-weight: 600;">${tx.transactionId}</span>
              </div>
              <div class="receipt-row">
                <span style="color: var(--text-muted);">Merchant / Payee:</span>
                <span style="font-weight: 600;">${tx.title}</span>
              </div>
              <div class="receipt-row">
                <span style="color: var(--text-muted);">Date &amp; Time:</span>
                <span>${tx.formattedDate || tx.date}</span>
              </div>
              <div class="receipt-row">
                <span style="color: var(--text-muted);">Card Used:</span>
                <span class="text-mono">${tx.card}</span>
              </div>
              <div class="receipt-row">
                <span style="color: var(--text-muted);">Category:</span>
                <span>${tx.category}</span>
              </div>
              <div class="receipt-row total">
                <span>Total Amount:</span>
                <span style="color: ${tx.amount > 0 ? '#16DBCC' : '#FE5C73'}; font-weight: 600;">
                  ${tx.amount > 0 ? '+' : '-'}$${Math.abs(tx.amount).toLocaleString()} USD
                </span>
              </div>
            </div>
            <p style="font-size: 0.8125rem; color: var(--text-muted); text-align: center;">
              This receipt confirms that the funds have been settled under FDIC insured protocol.
            </p>
          `,
          confirmText: 'Print / Save PDF',
          cancelText: 'Close',
          onConfirm: () => {
            showToast('Receipt Saved', `Receipt for ${tx.transactionId} saved as PDF.`, 'success');
            return true;
          }
        });
      });
    });

    // Interactive amount copy & counter animation
    const rows = container.querySelectorAll('.tx-table-row');
    rows.forEach(row => {
      const amtEl = row.querySelector('.tx-amount-cell');
      if (amtEl) {
        amtEl.style.cursor = 'pointer';
        amtEl.setAttribute('title', 'Click to copy transaction amount');
        amtEl.addEventListener('click', (e) => {
          e.stopPropagation();
          showToast(`Amount ${amtEl.textContent.trim()} copied to clipboard!`, 'success');
        });
      }
    });

    animateAllCounters(container.querySelector('#transactions-table-body') || container);
  }

  attachRowEvents();
}
