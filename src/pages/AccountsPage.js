/* ==========================================================================
   PAGE: ACCOUNTS
   Pixel-perfect match to BankDash Figma Accounts design:
   - Row 1: 4 KPI Cards (My Balance, Income, Expense, Total Saving)
   - Row 2: Last Transaction (left) + My Card (right with See All)
   - Row 3: Debit & Credit Overview (left, weekly Sat-Fri) + Invoices Sent (right)
   ========================================================================== */

import {
  accountsKPIs,
  accountsLastTransactions,
  userCards,
  debitCreditWeeklyData,
  invoicesSentData
} from '../data/mockData.js';

import { createCreditCardHtml, bindCardInteractions } from '../components/CardComponent.js';
import { openModal } from '../components/Modal.js';
import { showToast } from '../components/Toast.js';

export function renderAccountsPage(container, onNavigate) {
  const primaryCard = userCards[0] || {
    id: 'card-1',
    balance: 5756,
    cardHolder: 'Eddy Cusuma',
    validThru: '12/22',
    cardNumber: '3778 **** **** 1234',
    theme: 'dark',
    brand: 'mastercard'
  };

  container.innerHTML = `
    <div class="accounts-page-container">
      <!-- ROW 1: 4 KPI CARDS -->
      <section class="kpi-grid accounts-kpi-grid">
        ${accountsKPIs.map(kpi => `
          <div class="kpi-card accounts-kpi-card">
            <div class="kpi-icon-wrap ${kpi.type}">
              ${getKpiIconSvg(kpi.icon)}
            </div>
            <div class="kpi-info">
              <span class="kpi-label">${kpi.label}</span>
              <span class="kpi-value">$${kpi.value.toLocaleString()}</span>
            </div>
          </div>
        `).join('')}
      </section>

      <!-- ROW 2: LAST TRANSACTION (65%) & MY CARD (35%) -->
      <section class="accounts-row-grid" style="margin-top: 28px;">
        <!-- Left: Last Transaction -->
        <div class="accounts-col-main">
          <div class="section-header">
            <h2 class="section-title">Last Transaction</h2>
          </div>
          <div class="widget-box accounts-transactions-box">
            <div class="accounts-tx-list">
              ${accountsLastTransactions.map(tx => `
                <div class="accounts-tx-row">
                  <!-- Col 1: Icon + Title & Date -->
                  <div class="accounts-tx-col-main">
                    <div class="accounts-tx-icon" style="background-color: ${tx.iconBg}; color: ${tx.iconColor};">
                      ${getTransactionIconSvg(tx.iconType)}
                    </div>
                    <div>
                      <div class="accounts-tx-title">${tx.title}</div>
                      <div class="accounts-tx-date">${tx.date}</div>
                    </div>
                  </div>

                  <!-- Col 2: Category -->
                  <div class="accounts-tx-category">${tx.category}</div>

                  <!-- Col 3: Card Number -->
                  <div class="accounts-tx-card text-mono">${tx.card}</div>

                  <!-- Col 4: Status -->
                  <div class="accounts-tx-status ${tx.status.toLowerCase()}">${tx.status}</div>

                  <!-- Col 5: Amount -->
                  <div class="accounts-tx-amount ${tx.amount > 0 ? 'positive' : 'negative'}">
                    ${tx.amount > 0 ? '+' : '-'}$${Math.abs(tx.amount)}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Right: My Card -->
        <div class="accounts-col-side">
          <div class="section-header">
            <h2 class="section-title">My Card</h2>
            <a class="section-action-link" id="accounts-see-all-cards">See All</a>
          </div>
          <div id="accounts-card-container">
            ${createCreditCardHtml({
              ...primaryCard,
              validThru: '12/22' // Matching Figma design screenshot
            })}
          </div>
        </div>
      </section>

      <!-- ROW 3: DEBIT & CREDIT OVERVIEW (65%) & INVOICES SENT (35%) -->
      <section class="accounts-row-grid" style="margin-top: 28px;">
        <!-- Left: Debit & Credit Overview -->
        <div class="accounts-col-main">
          <div class="section-header">
            <h2 class="section-title">Debit & Credit Overview</h2>
          </div>
          <div class="widget-box" id="accounts-debit-credit-box">
            <!-- Rendered by SVG chart below -->
          </div>
        </div>

        <!-- Right: Invoices Sent -->
        <div class="accounts-col-side">
          <div class="section-header">
            <h2 class="section-title">Invoices Sent</h2>
          </div>
          <div class="widget-box accounts-invoices-box">
            <div class="accounts-invoices-list">
              ${invoicesSentData.map(inv => `
                <div class="accounts-invoice-item">
                  <div class="accounts-invoice-left">
                    <div class="accounts-invoice-icon" style="background-color: ${inv.iconBg}; color: ${inv.iconColor};">
                      ${getInvoiceIconSvg(inv.iconType)}
                    </div>
                    <div>
                      <div class="accounts-invoice-name">${inv.company}</div>
                      <div class="accounts-invoice-time">${inv.time}</div>
                    </div>
                  </div>
                  <div class="accounts-invoice-amount">$${inv.amount}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  // Bind Card copy & flip interactions
  bindCardInteractions(container.querySelector('#accounts-card-container'));

  // See All cards link
  const seeAllLink = container.querySelector('#accounts-see-all-cards');
  if (seeAllLink) {
    seeAllLink.addEventListener('click', () => {
      if (onNavigate) onNavigate('credit-cards');
    });
  }

  // Render Debit & Credit Weekly Grouped Bar Chart
  const chartBox = container.querySelector('#accounts-debit-credit-box');
  renderWeeklyDebitCreditChart(chartBox, debitCreditWeeklyData);
}

/**
 * Weekly Debit & Credit Grouped Bar Chart
 * Matching the exact visual style in Figma image:
 * Subtitle: "$7,560 Debited & $5,420 Credited in this Week"
 * Sat-Fri clean rounded pill bars without distracting axis lines
 */
function renderWeeklyDebitCreditChart(container, data) {
  if (!container) return;

  const width = 640;
  const height = 250;
  const padding = { top: 30, right: 20, bottom: 40, left: 20 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxVal = 500;

  const groupWidth = chartWidth / data.labels.length;
  const barWidth = 18;
  const barGap = 12;

  let barsHtml = '';
  data.labels.forEach((label, i) => {
    const groupX = padding.left + i * groupWidth + (groupWidth - (barWidth * 2 + barGap)) / 2;

    // Debit bar (Theme Primary / Indigo / Emerald)
    const debitH = (data.debit[i] / maxVal) * chartHeight;
    const debitY = padding.top + chartHeight - debitH;

    // Credit bar (Accent Amber / Orange)
    const creditH = (data.credit[i] / maxVal) * chartHeight;
    const creditY = padding.top + chartHeight - creditH;

    barsHtml += `
      <!-- Debit Bar -->
      <rect
        class="chart-bar-debit"
        x="${groupX}"
        y="${debitY}"
        width="${barWidth}"
        height="${debitH}"
        rx="9"
        fill="var(--chart-primary)"
        style="cursor: pointer; transition: filter var(--transition-fast);"
        data-val="$${data.debit[i]}"
        data-type="Debited"
        data-day="${label}"
      />
      <!-- Credit Bar -->
      <rect
        class="chart-bar-credit"
        x="${groupX + barWidth + barGap}"
        y="${creditY}"
        width="${barWidth}"
        height="${creditH}"
        rx="9"
        fill="var(--chart-amber)"
        style="cursor: pointer; transition: filter var(--transition-fast);"
        data-val="$${data.credit[i]}"
        data-type="Credited"
        data-day="${label}"
      />
      <!-- Day Label -->
      <text
        x="${groupX + barWidth + barGap / 2}"
        y="${height - 12}"
        fill="var(--text-muted)"
        font-size="13"
        font-weight="500"
        text-anchor="middle"
        font-family="Inter"
      >${label}</text>
    `;
  });

  container.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 20px;">
      <div style="font-size: 0.9375rem;">
        <span style="font-weight: 700; color: var(--chart-primary);">$${data.debitedAmount} Debited</span>
        <span style="color: var(--text-muted);"> &amp; </span>
        <span style="font-weight: 700; color: var(--chart-amber);">$${data.creditedAmount} Credited</span>
        <span style="color: var(--text-muted);"> in this Week</span>
      </div>

      <div class="chart-header-legend" style="margin-bottom: 0;">
        <div class="legend-item">
          <span class="legend-dot" style="background-color: var(--chart-primary);"></span>
          <span>Debit</span>
        </div>
        <div class="legend-item">
          <span class="legend-dot" style="background-color: var(--chart-amber);"></span>
          <span>Credit</span>
        </div>
      </div>
    </div>

    <div style="position: relative; width: 100%;">
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; overflow: visible;">
        ${barsHtml}
      </svg>
      <div class="chart-tooltip"></div>
    </div>
  `;

  // Attach tooltips
  const tooltip = container.querySelector('.chart-tooltip');
  const bars = container.querySelectorAll('rect');
  bars.forEach(bar => {
    bar.addEventListener('mouseenter', () => {
      bar.style.filter = 'brightness(1.15)';
      const val = bar.getAttribute('data-val');
      const type = bar.getAttribute('data-type');
      const day = bar.getAttribute('data-day');
      tooltip.innerHTML = `${day} &bull; ${type}: <strong>${val}</strong>`;
      tooltip.classList.add('show');
    });

    bar.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      tooltip.style.left = `${e.clientX - rect.left}px`;
      tooltip.style.top = `${e.clientY - rect.top}px`;
    });

    bar.addEventListener('mouseleave', () => {
      bar.style.filter = 'none';
      tooltip.classList.remove('show');
    });
  });
}

// ---------------------------------------------------------------------------
// SVG Icon Helpers
// ---------------------------------------------------------------------------

function getKpiIconSvg(icon) {
  if (icon === 'wallet') {
    // Money bag icon matching Figma Card 1
    return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h1l1-3c0-2-1.5-3.5-3-3.5h-1c0-.5 0-1-.5-1.5"></path>
      <circle cx="16" cy="10" r="1"></circle>
    </svg>`;
  } else if (icon === 'income') {
    // Hand receiving coin/money matching Figma Card 2
    return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"></path>
      <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.8a2 2 0 0 0-2.8-2.8l-3.6 3.8"></path>
      <circle cx="18" cy="6" r="3"></circle>
    </svg>`;
  } else if (icon === 'expense') {
    // Cash voucher / receipt icon matching Figma Card 3
    return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
      <line x1="2" y1="10" x2="22" y2="10"></line>
      <circle cx="7" cy="15" r="1"></circle>
      <circle cx="17" cy="15" r="1"></circle>
    </svg>`;
  } else {
    // Piggy bank icon matching Figma Card 4
    return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h1l1-3c0-2-1.5-3.5-3-3.5h-1c0-.5 0-1-.5-1.5"></path>
      <circle cx="16" cy="10" r="1"></circle>
    </svg>`;
  }
}

function getTransactionIconSvg(iconType) {
  if (iconType === 'sync') {
    // Spotify / Sync arrows
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>`;
  } else if (iconType === 'tool') {
    // Mobile Service / Tools
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
    </svg>`;
  } else {
    // User / Transfer
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>`;
  }
}

function getInvoiceIconSvg(iconType) {
  if (iconType === 'apple') {
    // Apple logo
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.64-.78 1.08-1.87.96-2.96-.93.04-2.07.62-2.73 1.4-.58.67-1.09 1.77-.95 2.83 1.04.08 2.08-.51 2.72-1.27z"/>
    </svg>`;
  } else if (iconType === 'playstation') {
    // Gamepad / Playstation
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="6" y1="12" x2="10" y2="12"></line>
      <line x1="8" y1="10" x2="8" y2="14"></line>
      <line x1="15" y1="13" x2="15.01" y2="13"></line>
      <line x1="18" y1="11" x2="18.01" y2="11"></line>
      <rect x="2" y="6" width="20" height="12" rx="6"></rect>
    </svg>`;
  } else {
    // User profile icon
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>`;
  }
}
