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

import { createCreditCardHtml, bindCardInteractions } from '../components/Card.js';
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
              <img src="${getKpiIconPath(kpi.icon)}" alt="${kpi.label} icon" class="kpi-icon-img" />
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
                    <div class="accounts-tx-icon">
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
            }, 'accounts-credit-card')}
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
                    <div class="accounts-invoice-icon" style="background-color: ${(inv.iconType === 'apple' || inv.iconType === 'playstation') ? 'transparent' : inv.iconBg}; color: ${inv.iconColor};">
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
// Icon Helpers — using uploaded PNG images for KPI cards
// ---------------------------------------------------------------------------

/**
 * Maps KPI icon name to the corresponding uploaded PNG asset path.
 * Icons saved in /assets/icons/ from user uploads.
 */
function getKpiIconPath(icon) {
  const iconMap = {
    'wallet':  '/assets/icons/icon-money-bag.png',   // 💰 Yellow money bag   → My Balance
    'income':  '/assets/icons/icon-income-hand.png', // 🤲 Blue hand+coin     → Income
    'expense': '/assets/icons/icon-expense.png',     // 🩷 Pink expense icon  → Expense
    'piggy':   '/assets/icons/icon-piggy-bank.png',  // 🐷 Cyan piggy bank    → Total Saving
  };
  return iconMap[icon] || '/assets/icons/icon-expense.png';
}

function getTransactionIconSvg(iconType) {
  if (iconType === 'sync') {
    return `<img src="/assets/icons/tx-spotify.png" alt="Spotify Subscription" width="50" height="50" style="display: block; border-radius: 18px; width: 50px; height: 50px; object-fit: cover;" />`;
  } else if (iconType === 'tool') {
    return `<img src="/assets/icons/tx-service.png" alt="Mobile Service" width="50" height="50" style="display: block; border-radius: 18px; width: 50px; height: 50px; object-fit: cover;" />`;
  } else {
    return `<img src="/assets/icons/tx-user.png" alt="Emilly Wilson" width="50" height="50" style="display: block; border-radius: 18px; width: 50px; height: 50px; object-fit: cover;" />`;
  }
}

function getInvoiceIconSvg(iconType) {
  if (iconType === 'apple') {
    // Use exact uploaded Apple icon PNG
    return `<img src="/assets/icons/inv-apple.png" alt="Apple Store" style="width: 50px; height: 50px; border-radius: 18px; display: block; object-fit: cover;" />`;
  } else if (iconType === 'playstation') {
    // PlayStation PS logo PNG (extracted exact from Figma reference)
    return `<img src="/assets/icons/inv-playstation.png?v=2" alt="Playstation" style="width: 50px; height: 50px; border-radius: 18px; display: block; object-fit: cover;" />`;
  } else {
    // User outline with circular head and arched shoulders
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="7.8" r="4.2" />
      <path d="M 4.8 20 C 4.8 15.5 8 13.2 12 13.2 C 16 13.2 19.2 15.5 19.2 20" />
    </svg>`;
  }
}
