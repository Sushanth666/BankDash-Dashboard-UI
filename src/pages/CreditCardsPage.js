/* ==========================================================================
   PAGE: CREDIT CARDS
   Pixel-perfect match to BankDash Figma Credit Cards design:
   - Row 1: My Cards (3 Cards: Emerald/Blue Luxe, Indigo/Purple, Crisp White)
   - Row 2: Card Expense Statistics (Donut chart) & Card List (3 card items with View Details)
   - Row 3: Add New Card (Description + 2x2 Form) & Card Setting (5 Setting Items)
   ========================================================================== */

import { creditCardsPageData } from '../data/mockData.js';
import { createCreditCardHtml, bindCardInteractions } from '../components/Card.js';
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
                  ${getCardListIconSvg()}
                </div>

                <!-- Col 1: Card Type -->
                <div class="card-list-col card-list-col-type">
                  <div class="card-list-label">Card Type</div>
                  <div class="card-list-val">${card.cardType}</div>
                </div>

                <!-- Col 2: Bank -->
                <div class="card-list-col card-list-col-bank">
                  <div class="card-list-label">Bank</div>
                  <div class="card-list-val">${card.bank}</div>
                </div>

                <!-- Col 3: Card Number -->
                <div class="card-list-col card-list-col-number">
                  <div class="card-list-label">Card Number</div>
                  <div class="card-list-val text-mono">${card.cardNumber}</div>
                </div>

                <!-- Col 4: Namain Card -->
                <div class="card-list-col card-list-col-name">
                  <div class="card-list-label">Namain Card</div>
                  <div class="card-list-val">${card.namainCard}</div>
                </div>

                <!-- Col 5: Action Link -->
                <div class="card-list-col-action" style="text-align: right;">
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
                  <div class="card-setting-figma-icon" style="background-color: ${setting.iconBg}; color: ${setting.iconColor}; overflow: hidden;">
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
/**
 * Card Expense Statistics Donut Chart
 * Exact multi-radius 4-quadrant polar donut chart matching Figma/user reference:
 * - Top-Right: ABM Bank (Teal #16DBCC, outer radius 92px)
 * - Bottom-Right: BRC Bank (Pink #FF6B9D, outer radius 62px)
 * - Bottom-Left: MCP Bank (Amber #FFBB38, outer radius 76px)
 * - Top-Left: DBL Bank (Blue #4C78FF, outer radius 76px)
 * - Central circular hole (radius 36px)
 * - 2x2 Legend: [DBL Bank | BRC Bank] / [ABM Bank | MCP Bank]
 */
function renderCardExpenseDonutChart(container, data) {
  if (!container) return;

  const width = 256;
  const height = 196;
  const cx = 124;
  const cy = 97;

  // Exact quadrant paths calculated for seamless junctions and shared inner circle
  const quadrants = [
    {
      id: 'abm',
      label: 'ABM Bank',
      val: '35%',
      color: '#16DBCC',
      path: `M ${cx} ${cy - 36} L ${cx} ${cy - 92} A 92 92 0 0 1 ${cx + 92} ${cy} L ${cx + 36} ${cy} A 36 36 0 0 0 ${cx} ${cy - 36} Z`
    },
    {
      id: 'brc',
      label: 'BRC Bank',
      val: '15%',
      color: '#FF6B9D',
      path: `M ${cx + 36} ${cy} L ${cx + 62} ${cy} A 62 62 0 0 1 ${cx} ${cy + 62} L ${cx} ${cy + 36} A 36 36 0 0 0 ${cx + 36} ${cy} Z`
    },
    {
      id: 'mcp',
      label: 'MCP Bank',
      val: '20%',
      color: '#FFBB38',
      path: `M ${cx} ${cy + 36} L ${cx} ${cy + 76} A 76 76 0 0 1 ${cx - 76} ${cy} L ${cx - 36} ${cy} A 36 36 0 0 0 ${cx} ${cy + 36} Z`
    },
    {
      id: 'dbl',
      label: 'DBL Bank',
      val: '30%',
      color: '#4C78FF',
      path: `M ${cx - 36} ${cy} L ${cx - 76} ${cy} A 76 76 0 0 1 ${cx} ${cy - 76} L ${cx} ${cy - 36} A 36 36 0 0 0 ${cx - 36} ${cy} Z`
    }
  ];

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4px 0 10px; position: relative;">
      <!-- Chart Tooltip -->
      <div id="card-expense-tooltip" class="chart-tooltip" style="position: absolute; display: none; z-index: 10; pointer-events: none;"></div>

      <div style="position: relative; display: flex; justify-content: center;">
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="overflow: visible;">
          <defs>
            <filter id="card-donut-shadow" x="-20%" y="-20%" width="150%" height="150%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.07" />
            </filter>
          </defs>
          <g filter="url(#card-donut-shadow)">
            ${quadrants.map(q => `
              <path
                id="donut-segment-${q.id}"
                class="card-expense-quadrant-path"
                d="${q.path}"
                fill="${q.color}"
                data-id="${q.id}"
                data-label="${q.label}"
                data-val="${q.val}"
                style="cursor: pointer; transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), filter 0.2s ease; transform-origin: ${cx}px ${cy}px;"
              />
            `).join('')}
          </g>
        </svg>
      </div>

      <!-- 2x2 Legend beneath chart matching user reference:
           Row 1: DBL Bank (Blue)  |  BRC Bank (Pink)
           Row 2: ABM Bank (Teal)  |  MCP Bank (Yellow)
      -->
      <div class="card-expense-legend-grid">
        <div class="card-expense-legend-item" data-id="dbl">
          <span class="legend-dot" style="background-color: #4C78FF;"></span>
          <span>DBL Bank</span>
        </div>
        <div class="card-expense-legend-item" data-id="brc">
          <span class="legend-dot" style="background-color: #FF6B9D;"></span>
          <span>BRC Bank</span>
        </div>
        <div class="card-expense-legend-item" data-id="abm">
          <span class="legend-dot" style="background-color: #16DBCC;"></span>
          <span>ABM Bank</span>
        </div>
        <div class="card-expense-legend-item" data-id="mcp">
          <span class="legend-dot" style="background-color: #FFBB38;"></span>
          <span>MCP Bank</span>
        </div>
      </div>
    </div>
  `;

  // Attach hover interactions for quadrants & legend
  const tooltip = container.querySelector('#card-expense-tooltip');
  const paths = container.querySelectorAll('.card-expense-quadrant-path');
  const legendItems = container.querySelectorAll('.card-expense-legend-item');

  function highlight(id, label, val, e) {
    paths.forEach(p => {
      if (p.getAttribute('data-id') === id) {
        p.style.transform = 'scale(1.05)';
        p.style.filter = 'brightness(1.12)';
      } else {
        p.style.opacity = '0.7';
      }
    });
    if (tooltip && label && val) {
      tooltip.style.display = 'block';
      tooltip.innerHTML = `<strong>${label}</strong>: ${val}`;
      if (e) {
        const rect = container.getBoundingClientRect();
        tooltip.style.left = `${e.clientX - rect.left}px`;
        tooltip.style.top = `${e.clientY - rect.top - 36}px`;
      }
    }
  }

  function resetHighlight() {
    paths.forEach(p => {
      p.style.transform = 'scale(1)';
      p.style.filter = 'none';
      p.style.opacity = '1';
    });
    if (tooltip) {
      tooltip.style.display = 'none';
    }
  }

  paths.forEach(p => {
    p.addEventListener('mouseenter', (e) => {
      highlight(p.getAttribute('data-id'), p.getAttribute('data-label'), p.getAttribute('data-val'), e);
    });
    p.addEventListener('mousemove', (e) => {
      if (tooltip && tooltip.style.display === 'block') {
        const rect = container.getBoundingClientRect();
        tooltip.style.left = `${e.clientX - rect.left}px`;
        tooltip.style.top = `${e.clientY - rect.top - 36}px`;
      }
    });
    p.addEventListener('mouseleave', resetHighlight);
  });

  legendItems.forEach(item => {
    const id = item.getAttribute('data-id');
    const q = quadrants.find(itemQ => itemQ.id === id);
    item.addEventListener('mouseenter', () => {
      if (q) highlight(q.id, q.label, q.val, null);
    });
    item.addEventListener('mouseleave', resetHighlight);
  });
}

// ---------------------------------------------------------------------------
// SVG Icon Helpers
// ---------------------------------------------------------------------------

function getCardSettingIconSvg(iconType) {
  if (iconType === 'card') {
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"></rect>
      <circle cx="12" cy="12" r="2"></circle>
      <img src="/assets/icons/Group 165.png" alt="Block Card"/>
    </svg>`;
  } else if (iconType === 'lock') {
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <img src="/assets/icons/Group 166.png" alt="pincode"/>
    </svg>`;
  } else if (iconType === 'google') {
    return `<img src="/assets/icons/Group 167.png" alt="Google Pay" style="width: 48px; height: 48px; border-radius: 18px; display: block; object-fit: cover;" />`;
  } else if (iconType === 'apple') {
    return `<img src="/assets/icons/inv-apple.png" alt="Apple Pay" style="width: 48px; height: 48px; border-radius: 18px; display: block; object-fit: cover;" />`;
  } else {
    return `<img src="/assets/icons/inv-apple.png" alt="Apple Store" style="width: 48px; height: 48px; border-radius: 18px; display: block; object-fit: cover;" />`;
  }
}

function getCardListIconSvg() {
  return `<svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="2" width="18" height="13" rx="2.5" fill="currentColor"/>
    <line x1="1" y1="6" x2="19" y2="6" stroke="#ffffff" stroke-width="1.3"/>
    <rect x="3" y="9" width="4" height="2.5" rx="0.6" fill="#ffffff"/>
    <circle cx="17.5" cy="15" r="4.8" fill="currentColor"/>
    <circle cx="17.5" cy="15" r="4.3" stroke="#ffffff" stroke-width="0.9"/>
    <text x="17.5" y="17" font-size="5.2" font-weight="700" fill="#ffffff" text-anchor="middle" font-family="Inter, sans-serif">$</text>
  </svg>`;
}
