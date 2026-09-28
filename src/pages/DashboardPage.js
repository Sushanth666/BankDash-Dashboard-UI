/* ==========================================================================
   PAGE: OVERVIEW / DASHBOARD
   Matches BankDash Figma structure:
   - My Cards + Recent Transactions
   - Weekly Activity + Expense Statistics
   - Quick Transfer + Balance History
   ========================================================================== */

import {
  userCards,
  recentTransactions,
  quickTransferContacts,
  weeklyActivityData,
  expenseStatisticsData,
  balanceHistoryData
} from '../data/mockData.js';

import { createCreditCardHtml, bindCardInteractions } from '../components/CardComponent.js';
import {
  renderWeeklyActivityChart,
  renderExpensePieChart,
  renderBalanceHistoryChart
} from '../components/Charts.js';
import { showToast } from '../components/Toast.js';

export function renderDashboardPage(container, onNavigate) {
  let selectedContactId = quickTransferContacts[0].id;

  container.innerHTML = `
    <div class="dashboard-grid">
      <!-- ROW 1: MY CARDS (2 Cards) & RECENT TRANSACTIONS -->
      <section class="dashboard-row-cards">
        <!-- Cards Column -->
        <div class="dashboard-col">
          <div class="section-header">
            <h2 class="section-title">My Cards</h2>
            <a class="section-action-link" id="see-all-cards-link">See All</a>
          </div>
          <div class="cards-slider" id="overview-cards-container">
            ${userCards.slice(0, 2).map(card => createCreditCardHtml(card)).join('')}
          </div>
        </div>

        <!-- Recent Transactions Column -->
        <div class="dashboard-col">
          <div class="section-header">
            <h2 class="section-title">Recent Transaction</h2>
          </div>
          <div class="widget-box recent-transactions-list">
            ${recentTransactions.slice(0, 3).map(tx => `
              <div class="transaction-item">
                <div class="transaction-left">
                  <div class="transaction-icon-box" style="background-color: ${tx.iconBg}; color: ${tx.iconColor};">
                    ${getTransactionIconSvg(tx.iconType)}
                  </div>
                  <div>
                    <div class="transaction-title">${tx.title}</div>
                    <div class="transaction-date">${tx.date}</div>
                  </div>
                </div>
                <div class="transaction-amount ${tx.amount > 0 ? 'positive' : 'negative'}">
                  ${tx.amount > 0 ? '+' : '-'}$${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- ROW 2: WEEKLY ACTIVITY & EXPENSE STATISTICS -->
      <section class="dashboard-row-activity">
        <!-- Weekly Activity -->
        <div class="dashboard-col">
          <div class="section-header">
            <h2 class="section-title">Weekly Activity</h2>
          </div>
          <div class="widget-box" id="weekly-activity-chart-box">
            <!-- Rendered by Charts.js -->
          </div>
        </div>

        <!-- Expense Statistics -->
        <div class="dashboard-col">
          <div class="section-header">
            <h2 class="section-title">Expense Statistics</h2>
          </div>
          <div class="widget-box" id="expense-statistics-chart-box">
            <!-- Rendered by Charts.js -->
          </div>
        </div>
      </section>

      <!-- ROW 3: QUICK TRANSFER & BALANCE HISTORY -->
      <section class="dashboard-row-transfer">
        <!-- Quick Transfer -->
        <div class="dashboard-col">
          <div class="section-header">
            <h2 class="section-title">Quick Transfer</h2>
          </div>
          <div class="widget-box">
            <div class="quick-transfer-contacts" id="quick-transfer-contacts-list">
              ${quickTransferContacts.map(c => `
                <div class="contact-card ${c.id === selectedContactId ? 'selected' : ''}" data-contact-id="${c.id}">
                  <img class="contact-avatar" src="${c.avatar}" alt="${c.name}" />
                  <span class="contact-name">${c.name}</span>
                  <span class="contact-role">${c.role}</span>
                </div>
              `).join('')}
            </div>

            <div class="quick-transfer-form">
              <span class="quick-transfer-label">Write Amount</span>
              <div class="quick-transfer-input-group">
                <input type="number" id="quick-transfer-amount" class="quick-transfer-input" value="525.50" min="1" step="0.5" />
                <button id="quick-transfer-send-btn" class="quick-transfer-btn">
                  <span>Send</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Balance History -->
        <div class="dashboard-col">
          <div class="section-header">
            <h2 class="section-title">Balance History</h2>
          </div>
          <div class="widget-box" id="balance-history-chart-box">
            <!-- Rendered by Charts.js -->
          </div>
        </div>
      </section>
    </div>
  `;

  // Bind Card interactions
  bindCardInteractions(container.querySelector('#overview-cards-container'));

  // See All cards link
  const seeAllLink = container.querySelector('#see-all-cards-link');
  if (seeAllLink) {
    seeAllLink.addEventListener('click', () => {
      if (onNavigate) onNavigate('credit-cards');
    });
  }

  // Render Charts
  const activityBox = container.querySelector('#weekly-activity-chart-box');
  renderWeeklyActivityChart(activityBox, weeklyActivityData);

  const expenseBox = container.querySelector('#expense-statistics-chart-box');
  renderExpensePieChart(expenseBox, expenseStatisticsData);

  const balanceBox = container.querySelector('#balance-history-chart-box');
  renderBalanceHistoryChart(balanceBox, balanceHistoryData);

  // Quick Transfer Contact Click Selection
  const contactCards = container.querySelectorAll('.contact-card');
  contactCards.forEach(card => {
    card.addEventListener('click', () => {
      contactCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedContactId = card.getAttribute('data-contact-id');
      const contactObj = quickTransferContacts.find(c => c.id === selectedContactId);
      showToast('Payee Selected', `Selected ${contactObj.name} (${contactObj.role})`, 'info', 2000);
    });
  });

  // Quick Transfer Send Action
  const sendBtn = container.querySelector('#quick-transfer-send-btn');
  const amountInput = container.querySelector('#quick-transfer-amount');
  sendBtn.addEventListener('click', () => {
    const amt = parseFloat(amountInput.value);
    if (!amt || amt <= 0) {
      showToast('Invalid Amount', 'Please enter a valid transfer amount.', 'error');
      return;
    }

    const contactObj = quickTransferContacts.find(c => c.id === selectedContactId);
    sendBtn.disabled = true;
    sendBtn.innerHTML = `<span>Sending...</span>`;

    setTimeout(() => {
      sendBtn.disabled = false;
      sendBtn.innerHTML = `
        <span>Send</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      `;

      showToast(
        'Transfer Complete',
        `Successfully transferred $${amt.toFixed(2)} to ${contactObj.name}.`,
        'success',
        4000
      );

      // Decrement first card balance
      if (userCards[0].balance >= amt) {
        userCards[0].balance -= amt;
        const balEl = container.querySelector('.card-dark .card-balance-value');
        if (balEl) balEl.innerText = `$${userCards[0].balance.toLocaleString()}`;
      }
    }, 600);
  });
}

function getTransactionIconSvg(iconType) {
  if (iconType === 'card') {
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
      <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>`;
  } else if (iconType === 'paypal') {
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 13l2.5-10h6a4.5 4.5 0 0 1 0 9h-4.5L12 21H7l3-8z"></path>
    </svg>`;
  } else if (iconType === 'user') {
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>`;
  } else {
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>`;
  }
}
