/* ==========================================================================
   PAGE: TRANSACTIONS
   Includes:
   - My Cards preview slider
   - Transaction tabs (All, Income, Expense)
   - Real-time search filter and category filter
   - Responsive data table with colored amount indicators and download receipt
   - Interactive receipt modal generator
   - Client-side pagination
   ========================================================================== */

import { userCards, recentTransactions } from '../data/mockData.js';
import { createCreditCardHtml, bindCardInteractions } from '../components/CardComponent.js';
import { openModal } from '../components/Modal.js';
import { showToast } from '../components/Toast.js';

// Expanded transactions set for realistic pagination & filtering
const allTransactionsData = [
  ...recentTransactions,
  {
    id: 'tx-9',
    title: 'Uber Technologies Ride',
    date: '30 December 2025',
    formattedDate: '30 Dec, 10:14 PM',
    amount: -34.5,
    type: 'expense',
    category: 'Transport',
    card: '5289 ****',
    transactionId: '#TX89209',
    status: 'Complete'
  },
  {
    id: 'tx-10',
    title: 'Figma Professional Team Plan',
    date: '28 December 2025',
    formattedDate: '28 Dec, 01:10 PM',
    amount: -45.0,
    type: 'expense',
    category: 'Software',
    card: '1234 ****',
    transactionId: '#TX89210',
    status: 'Complete'
  },
  {
    id: 'tx-11',
    title: 'Consulting Honorarium Wire',
    date: '25 December 2025',
    formattedDate: '25 Dec, 04:00 PM',
    amount: 1450.0,
    type: 'income',
    category: 'Payment',
    card: '4111 ****',
    transactionId: '#TX89211',
    status: 'Complete'
  },
  {
    id: 'tx-12',
    title: 'Whole Foods Market',
    date: '22 December 2025',
    formattedDate: '22 Dec, 06:45 PM',
    amount: -128.4,
    type: 'expense',
    category: 'Groceries',
    card: '1234 ****',
    transactionId: '#TX89212',
    status: 'Complete'
  }
];

export function renderTransactionsPage(container) {
  let activeTab = 'all'; // 'all', 'income', 'expense'
  let searchQuery = '';
  let currentPage = 1;
  const pageSize = 5;

  function getFilteredData() {
    return allTransactionsData.filter(tx => {
      const matchesTab = activeTab === 'all' || tx.type === activeTab;
      const matchesSearch = !searchQuery ||
        tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }

  function renderTableRows(filtered) {
    const startIdx = (currentPage - 1) * pageSize;
    const paged = filtered.slice(startIdx, startIdx + pageSize);

    if (paged.length === 0) {
      return `
        <tr>
          <td colspan="7" style="text-align: center; padding: 40px; color: var(--text-muted);">
            No transactions found matching your criteria.
          </td>
        </tr>
      `;
    }

    return paged.map(tx => {
      const isPositive = tx.amount > 0;
      return `
        <tr>
          <td>
            <div style="font-weight: 600; color: var(--text-primary);">${tx.title}</div>
          </td>
          <td class="text-mono" style="font-size: 0.8125rem; color: var(--text-muted);">${tx.transactionId}</td>
          <td><span class="status-badge" style="background-color: var(--bg-surface-subtle); color: var(--text-secondary);">${tx.category}</span></td>
          <td class="text-mono">${tx.card}</td>
          <td>${tx.date}</td>
          <td style="font-weight: 700;" class="${isPositive ? 'badge-positive' : 'badge-negative'}">
            ${isPositive ? '+' : ''}$${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </td>
          <td style="text-align: right;">
            <button class="table-action-btn download-receipt-btn" data-tx-id="${tx.id}" title="Download Receipt">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Receipt</span>
            </button>
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
        <button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>
      `;
    }

    return `
      <div class="pagination-container">
        <button class="pagination-btn" id="pagination-prev" ${currentPage === 1 ? 'disabled' : ''}>
          &lt; Previous
        </button>
        ${pagesHtml}
        <button class="pagination-btn" id="pagination-next" ${currentPage === totalPages ? 'disabled' : ''}>
          Next &gt;
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

  container.innerHTML = `
    <div>
      <!-- My Cards Slider -->
      <section class="transactions-top-cards">
        <div class="section-header">
          <h2 class="section-title">My Cards</h2>
          <span style="font-size: 0.875rem; color: var(--text-muted); font-weight: 500;">Active Credit & Debit Lines</span>
        </div>
        <div class="cards-slider" id="tx-cards-slider">
          ${userCards.map(c => createCreditCardHtml(c)).join('')}
        </div>
      </section>

      <!-- Transactions Section -->
      <section style="margin-top: 36px;">
        <div class="section-header">
          <h2 class="section-title">Recent Transactions</h2>
        </div>

        <!-- Toolbar: Tabs & Search Filter -->
        <div class="transactions-toolbar">
          <div class="tabs-nav" style="margin-bottom: 0; border-bottom: none;">
            <button class="tab-btn ${activeTab === 'all' ? 'active' : ''}" data-tab="all">All Transactions</button>
            <button class="tab-btn ${activeTab === 'income' ? 'active' : ''}" data-tab="income">Income</button>
            <button class="tab-btn ${activeTab === 'expense' ? 'active' : ''}" data-tab="expense">Expense</button>
          </div>

          <div class="transactions-search-filter">
            <div style="position: relative;">
              <svg style="position: absolute; left: 14px; top: 12px; color: var(--text-subtle);" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" id="tx-search-input" class="table-search-input" placeholder="Search by description or ID..." value="${searchQuery}" />
            </div>

            <select id="tx-category-select" class="filter-select">
              <option value="">All Categories</option>
              <option value="Deposit">Deposit</option>
              <option value="Payment">Payment</option>
              <option value="Shopping">Shopping</option>
              <option value="Electronics">Electronics</option>
              <option value="Transport">Transport</option>
              <option value="Groceries">Groceries</option>
            </select>
          </div>
        </div>

        <!-- Transactions Table -->
        <div class="table-responsive-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Transaction ID</th>
                <th>Type</th>
                <th>Card</th>
                <th>Date</th>
                <th>Amount</th>
                <th style="text-align: right;">Receipt</th>
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
      </section>
    </div>
  `;

  // Bind Card interactions
  bindCardInteractions(container.querySelector('#tx-cards-slider'));

  // Tab switching
  const tabBtns = container.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTab = btn.getAttribute('data-tab');
      currentPage = 1;
      updateView();
    });
  });

  // Search input
  const searchInput = container.querySelector('#tx-search-input');
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    currentPage = 1;
    updateView();
  });

  // Category select
  const catSelect = container.querySelector('#tx-category-select');
  catSelect.addEventListener('change', (e) => {
    searchQuery = e.target.value;
    currentPage = 1;
    updateView();
  });

  function attachRowEvents() {
    // Pagination buttons
    const pageBtns = container.querySelectorAll('.pagination-btn[data-page]');
    pageBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        currentPage = parseInt(btn.getAttribute('data-page'), 10);
        updateView();
      });
    });

    const prevBtn = container.querySelector('#pagination-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          updateView();
        }
      });
    }

    const nextBtn = container.querySelector('#pagination-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(getFilteredData().length / pageSize);
        if (currentPage < totalPages) {
          currentPage++;
          updateView();
        }
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
                <span style="color: var(--text-muted);">Date & Time:</span>
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
                <span style="color: ${tx.amount > 0 ? 'var(--accent-success)' : 'var(--accent-rose)'};">
                  ${tx.amount > 0 ? '+' : ''}$${Math.abs(tx.amount).toFixed(2)} USD
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
  }

  attachRowEvents();
}
