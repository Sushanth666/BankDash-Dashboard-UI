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

import { createCreditCardHtml, bindCardInteractions } from '../components/Card.js';
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
                  ${tx.amount > 0 ? '+' : '-'}$${Math.abs(tx.amount).toLocaleString()}
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
          <div class="widget-box quick-transfer-widget">
            <div class="quick-transfer-contacts-wrapper">
              <div class="quick-transfer-contacts" id="quick-transfer-contacts-list">
                ${quickTransferContacts.map(c => `
                  <div class="contact-card ${c.id === selectedContactId ? 'selected' : ''}" data-contact-id="${c.id}">
                    <img class="contact-avatar" src="${c.avatar}" alt="${c.name}" />
                    <span class="contact-name">${c.name}</span>
                    <span class="contact-role">${c.role}</span>
                  </div>
                `).join('')}
              </div>
              <button class="quick-transfer-next-btn" id="quick-transfer-next-btn" aria-label="Next contact" title="Next contact">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#718EBF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>

            <div class="quick-transfer-form">
              <span class="quick-transfer-label">Write Amount</span>
              <div class="quick-transfer-input-group">
                <input type="text" id="quick-transfer-amount" class="quick-transfer-input" value="525.50" />
                <button id="quick-transfer-send-btn" class="quick-transfer-btn">
                  <span>Send</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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

  // Quick Transfer Next Button Carousel Scroll
  const nextContactBtn = container.querySelector('#quick-transfer-next-btn');
  const contactsScrollList = container.querySelector('#quick-transfer-contacts-list');
  if (nextContactBtn && contactsScrollList) {
    nextContactBtn.addEventListener('click', () => {
      const scrollStep = 100;
      if (contactsScrollList.scrollLeft + contactsScrollList.clientWidth >= contactsScrollList.scrollWidth - 10) {
        contactsScrollList.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        contactsScrollList.scrollBy({ left: scrollStep, behavior: 'smooth' });
      }
    });
  }

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
  if (sendBtn && amountInput) {
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
}

function getTransactionIconSvg(iconType) {
  if (iconType === 'sync') {
    // Spotify / Sync clean circular arrows (previous logo)
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>`;
  } else if (iconType === 'tool') {
    // Mobile Service / Tools clean wrench (previous logo)
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
    </svg>`;
  } else if (iconType === 'card') {
    // Stacked Cards logo matching Figma Recent Transactions
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
      <rect x="5.5" y="4" width="15" height="11" rx="2.2" />
      <line x1="5.5" y1="8" x2="20.5" y2="8" />
      <rect x="3" y="8.5" width="15" height="11" rx="2.2" fill="#FFF5D9" />
      <line x1="3" y1="12.5" x2="18" y2="12.5" />
    </svg>`;
  } else if (iconType === 'paypal') {
    // Exact PayPal logo from Figma asset
    return `<img src="/assets/icons/tx-paypal.png" alt="PayPal" style="width: 100%; height: 100%; object-fit: cover; display: block;" />`;
  } else if (iconType === 'coin') {
    // Coin logo with inner dotted circle & dollar symbol matching Figma
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9.5"></circle>
      <circle cx="12" cy="12" r="6.2" stroke-dasharray="1.8 1.8" stroke-width="1.3"></circle>
      <path d="M12 8.5v7M13.5 10.2c0-.7-.6-1.1-1.5-1.1s-1.5.4-1.5 1.1 1.5.9 1.5 1.6-.6 1.2-1.5 1.2-1.5-.4-1.5-1.1" stroke-width="1.5"></path>
    </svg>`;
  } else {
    // User / Transfer clean silhouette (previous logo)
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>`;
  }
}
