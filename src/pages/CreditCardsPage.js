/* ==========================================================================
   PAGE: CREDIT CARDS
   Pixel-perfect match to BankDash Figma Credit Cards design:
   - Row 1: My Cards (3 Cards: Emerald/Blue Luxe, Indigo/Purple, Crisp White)
   - Row 2: Card Expense Statistics (Donut chart) & Card List (3 card items with View Details)
   - Row 3: Add New Card (Description + 2x2 Form) & Card Setting (5 Setting Items)
   ========================================================================== */

import { creditCardsPageData } from '../data/mockData.js';
import { createCreditCardHtml, bindCardInteractions } from '../components/CardComponent.js';
import { openModal } from '../components/Modal.js';
import { showToast } from '../components/Toast.js';

export function renderCreditCardsPage(container) {
  container.innerHTML = `
    <div class="credit-cards-page-container">
      <!-- ROW 1: MY CARDS (3 CARDS) -->
      <section>
        <div class="section-header">
          <h2 class="section-title">My Cards</h2>
        </div>
        <div class="cards-slider" id="credit-cards-slider-container">
          ${creditCardsPageData.myCards.map(c => createCreditCardHtml(c)).join('')}
        </div>
      </section>

      <!-- ROW 2: CARD EXPENSE STATISTICS (35%) & CARD LIST (65%) -->
      <section class="credit-cards-row-middle" style="margin-top: 28px;">
        <!-- Left: Card Expense Statistics Donut Chart -->
        <div>
          <div class="section-header">
            <h2 class="section-title">Card Expense Statistics</h2>
          </div>
          <div class="widget-box" id="card-expense-donut-container">
            <!-- Rendered by SVG below -->
          </div>
        </div>

        <!-- Right: Card List -->
        <div>
          <div class="section-header">
            <h2 class="section-title">Card List</h2>
          </div>
          <div class="card-list-items-wrapper">
            ${creditCardsPageData.cardList.map(card => `
              <div class="card-list-item-box">
                <!-- Icon -->
                <div class="card-list-icon" style="background-color: ${card.iconBg}; color: ${card.iconColor};">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                  </svg>
                </div>

                <!-- Col 1: Card Type -->
                <div class="card-list-col">
                  <div class="card-list-label">Card Type</div>
                  <div class="card-list-val">${card.cardType}</div>
                </div>

                <!-- Col 2: Bank -->
                <div class="card-list-col">
                  <div class="card-list-label">Bank</div>
                  <div class="card-list-val">${card.bank}</div>
                </div>

                <!-- Col 3: Card Number -->
                <div class="card-list-col">
                  <div class="card-list-label">Card Number</div>
                  <div class="card-list-val text-mono">${card.cardNumber}</div>
                </div>

                <!-- Col 4: Namain Card -->
                <div class="card-list-col">
                  <div class="card-list-label">Namain Card</div>
                  <div class="card-list-val">${card.namainCard}</div>
                </div>

                <!-- Col 5: Action Link -->
                <div style="text-align: right;">
                  <a class="card-list-view-details-link" data-id="${card.id}">View Details</a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- ROW 3: ADD NEW CARD (65%) & CARD SETTING (35%) -->
      <section class="credit-cards-row-bottom" style="margin-top: 28px;">
        <!-- Left: Add New Card Form -->
        <div>
          <div class="section-header">
            <h2 class="section-title">Add New Card</h2>
          </div>
          <div class="widget-box add-new-card-box">
            <p class="add-card-intro-desc">
              Credit Card generally means a plastic card issued by Scheduled Commercial Banks assigned to a Cardholder, with a credit limit, that can be used to purchase goods and services on credit or obtain cash advances.
            </p>

            <form id="add-new-card-form" style="margin-top: 24px;">
              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label">Card Type</label>
                  <input type="text" class="form-input" id="new-card-type" value="Classic" placeholder="Classic" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Name On Card</label>
                  <input type="text" class="form-input" id="new-card-name" value="My Cards" placeholder="My Cards" required />
                </div>
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label">Card Number</label>
                  <input type="text" class="form-input text-mono" id="new-card-num" value="**** **** **** ****" placeholder="**** **** **** ****" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Expiration Date</label>
                  <div style="position: relative;">
                    <select class="form-select" id="new-card-exp" style="width: 100%; cursor: pointer;">
                      <option selected>25 January 2025</option>
                      <option>12 December 2026</option>
                      <option>18 August 2028</option>
                      <option>04 April 2029</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style="margin-top: 14px;">
                <button type="submit" class="btn btn-primary btn-pill" style="min-width: 140px;">
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Right: Card Setting List -->
        <div>
          <div class="section-header">
            <h2 class="section-title">Card Setting</h2>
          </div>
          <div class="widget-box card-settings-box">
            <div class="card-settings-figma-list">
              ${creditCardsPageData.cardSettings.map(setting => `
                <div class="card-setting-figma-item" data-title="${setting.title}">
                  <div class="card-setting-figma-icon" style="background-color: ${setting.iconBg}; color: ${setting.iconColor};">
                    ${getCardSettingIconSvg(setting.iconType)}
                  </div>
                  <div>
                    <div class="card-setting-figma-title">${setting.title}</div>
                    <div class="card-setting-figma-desc">${setting.desc}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  // Bind Card copy & flip interactions
  bindCardInteractions(container.querySelector('#credit-cards-slider-container'));

  // Render Donut Chart
  renderCardExpenseDonutChart(
    container.querySelector('#card-expense-donut-container'),
    creditCardsPageData.cardExpenseDonut
  );

  // View Details click modal
  const viewDetailsLinks = container.querySelectorAll('.card-list-view-details-link');
  viewDetailsLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('data-id');
      const item = creditCardsPageData.cardList.find(c => c.id === id);
      if (!item) return;

      openModal({
        title: `${item.bank} - Card Details`,
        contentHtml: `
          <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.9375rem;">
              <span style="color: var(--text-muted);">Card Holder:</span>
              <strong style="color: var(--text-primary);">${item.namainCard}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.9375rem;">
              <span style="color: var(--text-muted);">Card Number:</span>
              <span class="text-mono" style="font-weight: 600;">${item.cardNumber}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.9375rem;">
              <span style="color: var(--text-muted);">Card Tier:</span>
              <span>${item.cardType} Platinum</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.9375rem;">
              <span style="color: var(--text-muted);">Status:</span>
              <span class="status-badge complete">Active</span>
            </div>
          </div>
        `,
        confirmText: 'Done',
        cancelText: 'Close',
        onConfirm: () => true
      });
    });
  });

  // Add Card form submission
  const addCardForm = container.querySelector('#add-new-card-form');
  addCardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const type = container.querySelector('#new-card-type').value.trim();
    const name = container.querySelector('#new-card-name').value.trim();
    const num = container.querySelector('#new-card-num').value.trim();

    creditCardsPageData.cardList.push({
      id: `cl-${Date.now()}`,
      cardType: type || 'Secondary',
      bank: 'BankDash Premier',
      cardNumber: num.length >= 4 ? `**** **** ${num.slice(-4)}` : '**** **** 8820',
      namainCard: name || 'Eddy Cusuma',
      iconBg: 'rgba(16, 185, 129, 0.12)',
      iconColor: '#10b981'
    });

    showToast('Card Added', `New ${type} card successfully added to your account!`, 'success');
    renderCreditCardsPage(container);
  });

  // Card Settings click actions
  const settingItems = container.querySelectorAll('.card-setting-figma-item');
  settingItems.forEach(item => {
    item.addEventListener('click', () => {
      const title = item.getAttribute('data-title');
      if (title === 'Change Pin Code') {
        openModal({
          title: 'Change Pin Code',
          contentHtml: `
            <div class="form-group">
              <label class="form-label">Current 4-Digit PIN</label>
              <input type="password" class="form-input" maxlength="4" placeholder="••••" />
            </div>
            <div class="form-group">
              <label class="form-label">New 4-Digit PIN</label>
              <input type="password" class="form-input" maxlength="4" placeholder="••••" />
            </div>
            <div class="form-group">
              <label class="form-label">Confirm New PIN</label>
              <input type="password" class="form-input" maxlength="4" placeholder="••••" />
            </div>
          `,
          confirmText: 'Update PIN',
          onConfirm: () => {
            showToast('PIN Updated', 'ATM PIN code successfully changed.', 'success');
            return true;
          }
        });
      } else {
        showToast(title, `${title} preference updated.`, 'info');
      }
    });
  });
}

/**
 * Card Expense Statistics Donut Chart
 * Matching Figma layout with 4 colored slices and 2x2 legend below
 */
function renderCardExpenseDonutChart(container, data) {
  if (!container) return;

  const size = 220;
  const strokeWidth = 32;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercent = 0;

  let circlesHtml = '';
  data.forEach(d => {
    const strokeDasharray = `${(d.value / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((accumulatedPercent / 100) * circumference);

    circlesHtml += `
      <circle
        cx="${size / 2}"
        cy="${size / 2}"
        r="${radius}"
        fill="transparent"
        stroke="${d.color}"
        stroke-width="${strokeWidth}"
        stroke-dasharray="${strokeDasharray}"
        stroke-dashoffset="${strokeDashoffset}"
        style="transition: filter var(--transition-fast); cursor: pointer;"
        data-label="${d.label}"
        data-val="${d.value}%"
      />
    `;
    accumulatedPercent += d.value;
  });

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px 0;">
      <div style="position: relative;">
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform: rotate(-90deg); overflow: visible;">
          ${circlesHtml}
        </svg>
      </div>

      <!-- 2x2 Legend beneath chart matching Figma -->
      <div class="card-expense-legend-grid">
        ${data.map(d => `
          <div class="card-expense-legend-item">
            <span class="legend-dot" style="background-color: ${d.color};"></span>
            <span>${d.label}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// SVG Icon Helpers
// ---------------------------------------------------------------------------

function getCardSettingIconSvg(iconType) {
  if (iconType === 'card') {
    // Card icon (Block Card)
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"></rect>
      <circle cx="12" cy="12" r="2"></circle>
      <path d="M6 12h.01M18 12h.01"></path>
    </svg>`;
  } else if (iconType === 'lock') {
    // Lock icon (Change PIN)
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>`;
  } else if (iconType === 'google') {
    // Google "G" icon (Google Pay)
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a9.96 9.96 0 0 1 6.29 2.22l-2.6 2.6A6.29 6.29 0 0 0 12 5.71c-3.48 0-6.29 2.81-6.29 6.29s2.81 6.29 6.29 6.29c3.16 0 5.76-2.32 6.21-5.36H12v-3.71h9.92c.11.64.17 1.31.17 2 0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"/>
    </svg>`;
  } else {
    // Apple logo (Apple Pay / Apple Store)
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.64-.78 1.08-1.87.96-2.96-.93.04-2.07.62-2.73 1.4-.58.67-1.09 1.77-.95 2.83 1.04.08 2.08-.51 2.72-1.27z"/>
    </svg>`;
  }
}
