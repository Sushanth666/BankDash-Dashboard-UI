/* ==========================================================================
   PAGE: ACCOUNTS
   Features:
   - 4 High-fidelity KPI stat cards
   - Last Transaction list widget
   - Debit & Credit Overview interactive SVG bar chart
   - Invoices Sent list with live status and action triggers
   ========================================================================== */

import { accountsKPIs, debitCreditMonthlyData, invoicesSentData, recentTransactions } from '../data/mockData.js';
import { openModal } from '../components/Modal.js';
import { showToast } from '../components/Toast.js';

export function renderAccountsPage(container) {
  container.innerHTML = `
    <div>
      <!-- 4 KPI Summary Cards -->
      <section class="kpi-grid">
        ${accountsKPIs.map(kpi => `
          <div class="kpi-card">
            <div class="kpi-icon-wrap ${kpi.type}">
              ${getKpiIcon(kpi.icon)}
            </div>
            <div class="kpi-info">
              <span class="kpi-label">${kpi.label}</span>
              <span class="kpi-value">$${kpi.value.toLocaleString()}</span>
              <span class="kpi-trend ${kpi.change.startsWith('+') ? 'positive' : 'negative'}">
                ${kpi.change} from last month
              </span>
            </div>
          </div>
        `).join('')}
      </section>

      <!-- Last Transaction & Invoices Sent Section -->
      <section class="accounts-overview-grid">
        <!-- Last Transactions Column -->
        <div>
          <div class="section-header">
            <h2 class="section-title">Last Transaction</h2>
            <a class="section-action-link" href="#transactions">View All</a>
          </div>
          <div class="widget-box">
            <div class="recent-transactions-list" style="max-height: 280px;">
              ${recentTransactions.slice(0, 4).map(tx => `
                <div class="transaction-item">
                  <div class="transaction-left">
                    <div class="transaction-icon-box" style="background-color: ${tx.iconBg}; color: ${tx.iconColor};">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </div>
                    <div>
                      <div class="transaction-title">${tx.title}</div>
                      <div class="transaction-date">${tx.formattedDate || tx.date}</div>
                    </div>
                  </div>
                  <div class="transaction-amount ${tx.amount > 0 ? 'positive' : 'negative'}">
                    ${tx.amount > 0 ? '+' : '-'}$${Math.abs(tx.amount).toFixed(2)}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Invoices Sent Column -->
        <div>
          <div class="section-header">
            <h2 class="section-title">Invoices Sent</h2>
            <button class="btn btn-outline btn-pill" id="create-new-invoice-btn" style="height: 34px; padding: 0 14px; font-size: 0.8125rem;">
              + New Invoice
            </button>
          </div>
          <div class="widget-box">
            <div class="invoices-list" id="invoices-list-container">
              ${invoicesSentData.map(inv => `
                <div class="invoice-item">
                  <div class="invoice-left">
                    <div class="invoice-icon" style="background-color: ${inv.iconBg}; color: ${inv.iconColor};">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </div>
                    <div>
                      <div class="invoice-title">${inv.company}</div>
                      <div class="invoice-time">${inv.category} &bull; ${inv.time}</div>
                    </div>
                  </div>
                  <div style="text-align: right;">
                    <div class="invoice-amount">$${inv.amount.toLocaleString()}</div>
                    <span class="status-badge ${inv.status.toLowerCase()}">${inv.status}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- Debit & Credit Overview Chart Section -->
      <section style="margin-top: 36px;">
        <div class="section-header">
          <h2 class="section-title">Debit & Credit Overview</h2>
          <span style="font-size: 0.875rem; color: var(--text-muted);">Monthly Comparison (USD)</span>
        </div>
        <div class="widget-box" id="debit-credit-chart-box">
          <!-- Rendered by SVG chart generator below -->
        </div>
      </section>
    </div>
  `;

  // Render Debit & Credit Grouped Bar Chart
  const chartBox = container.querySelector('#debit-credit-chart-box');
  renderDebitCreditChart(chartBox, debitCreditMonthlyData);

  // New Invoice Modal
  const newInvoiceBtn = container.querySelector('#create-new-invoice-btn');
  newInvoiceBtn.addEventListener('click', () => {
    openModal({
      title: 'Generate New Invoice',
      contentHtml: `
        <form id="create-invoice-form">
          <div class="form-group">
            <label class="form-label">Client / Company Name</label>
            <input type="text" class="form-input" id="inv-client-name" placeholder="e.g. Acme Corp" required />
          </div>
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">Invoice Amount ($)</label>
              <input type="number" class="form-input" id="inv-amount" placeholder="1250" required />
            </div>
            <div class="form-group">
              <label class="form-label">Category</label>
              <select class="form-select" id="inv-category">
                <option value="Consulting">Consulting</option>
                <option value="Software Development">Software Development</option>
                <option value="Design Retainer">Design Retainer</option>
                <option value="Hardware Delivery">Hardware Delivery</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Payment Terms</label>
            <select class="form-select">
              <option>Net 15 Days</option>
              <option>Net 30 Days</option>
              <option>Due On Receipt</option>
            </select>
          </div>
        </form>
      `,
      confirmText: 'Send Invoice',
      cancelText: 'Cancel',
      onConfirm: (modalBackdrop) => {
        const client = modalBackdrop.querySelector('#inv-client-name').value.trim();
        const amt = modalBackdrop.querySelector('#inv-amount').value.trim();
        const cat = modalBackdrop.querySelector('#inv-category').value;

        if (!client || !amt) {
          showToast('Validation Error', 'Please enter client name and amount.', 'error');
          return false;
        }

        invoicesSentData.unshift({
          id: `inv-${Date.now()}`,
          company: client,
          category: cat,
          time: 'Just now',
          amount: parseFloat(amt),
          status: 'Pending',
          iconBg: '#eff6ff',
          iconColor: '#2563eb'
        });

        showToast('Invoice Dispatched', `Invoice for $${amt} dispatched to ${client}.`, 'success');
        renderAccountsPage(container);
        return true;
      }
    });
  });
}

function renderDebitCreditChart(container, data) {
  const width = 800;
  const height = 260;
  const padding = { top: 20, right: 30, bottom: 40, left: 50 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxVal = 7000;
  const yTicks = [0, 1500, 3000, 4500, 6000];

  let gridHtml = '';
  yTicks.forEach(tick => {
    const y = padding.top + chartHeight - (tick / maxVal) * chartHeight;
    gridHtml += `
      <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="var(--chart-grid)" stroke-width="1" stroke-dasharray="4,4" />
      <text x="${padding.left - 10}" y="${y + 4}" fill="var(--text-muted)" font-size="12" text-anchor="end" font-family="Inter">$${tick}</text>
    `;
  });

  const groupWidth = chartWidth / data.labels.length;
  const barWidth = 16;
  const barGap = 10;

  let barsHtml = '';
  data.labels.forEach((label, i) => {
    const groupX = padding.left + i * groupWidth + (groupWidth - (barWidth * 2 + barGap)) / 2;

    const debitH = (data.debit[i] / maxVal) * chartHeight;
    const debitY = padding.top + chartHeight - debitH;

    const creditH = (data.credit[i] / maxVal) * chartHeight;
    const creditY = padding.top + chartHeight - creditH;

    barsHtml += `
      <rect x="${groupX}" y="${debitY}" width="${barWidth}" height="${debitH}" rx="8" fill="var(--accent-rose)" />
      <rect x="${groupX + barWidth + barGap}" y="${creditY}" width="${barWidth}" height="${creditH}" rx="8" fill="var(--chart-primary)" />
      <text x="${groupX + barWidth + barGap / 2}" y="${height - 12}" fill="var(--text-muted)" font-size="13" font-weight="500" text-anchor="middle" font-family="Inter">${label}</text>
    `;
  });

  container.innerHTML = `
    <div class="chart-header-legend">
      <div class="legend-item">
        <span class="legend-dot" style="background-color: var(--accent-rose);"></span>
        <span>Debit (Expense)</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot" style="background-color: var(--chart-primary);"></span>
        <span>Credit (Income)</span>
      </div>
    </div>
    <div style="width: 100%; position: relative;">
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; overflow: visible;">
        ${gridHtml}
        ${barsHtml}
      </svg>
    </div>
  `;
}

function getKpiIcon(icon) {
  if (icon === 'wallet') {
    return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
    </svg>`;
  } else if (icon === 'income') {
    return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="19" x2="12" y2="5"></line>
      <polyline points="5 12 12 5 19 12"></polyline>
    </svg>`;
  } else if (icon === 'expense') {
    return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <polyline points="19 12 12 19 5 12"></polyline>
    </svg>`;
  } else {
    return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h1l1-3c0-2-1.5-3.5-3-3.5h-1c0-.5 0-1-.5-1.5"></path>
      <circle cx="16" cy="10" r="1"></circle>
    </svg>`;
  }
}
