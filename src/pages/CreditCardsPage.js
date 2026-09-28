/* ==========================================================================
   PAGE: CREDIT CARDS
   Features:
   - Full Cards showcase (Grid / Slider)
   - Card Expense Statistics (Donut Breakdown)
   - Card Settings list (Block card, PIN change, Google Pay, Apple Pay toggles)
   - Add New Card Form with LIVE Virtual Card Preview and submission
   ========================================================================== */

import { userCards } from '../data/mockData.js';
import { createCreditCardHtml, bindCardInteractions } from '../components/CardComponent.js';
import { openModal } from '../components/Modal.js';
import { showToast } from '../components/Toast.js';

export function renderCreditCardsPage(container) {
  // Mock breakdown of card expenses
  const cardExpenseData = [
    { label: 'DBL Bank', value: 35, color: 'var(--chart-primary)' },
    { label: 'BRC Bank', value: 25, color: 'var(--chart-secondary)' },
    { label: 'ABM Bank', value: 20, color: 'var(--chart-amber)' },
    { label: 'MCP Bank', value: 20, color: 'var(--chart-rose)' }
  ];

  container.innerHTML = `
    <div>
      <!-- Cards List Header & Grid -->
      <section style="margin-bottom: 32px;">
        <div class="section-header">
          <h2 class="section-title">My Cards</h2>
          <span style="font-size: 0.875rem; color: var(--text-muted); font-weight: 500;">${userCards.length} Active Cards</span>
        </div>
        <div class="cards-slider" id="credit-cards-list-container">
          ${userCards.map(c => createCreditCardHtml(c)).join('')}
        </div>
      </section>

      <!-- Row: Card Expense Statistics + Card Settings -->
      <section class="credit-cards-row">
        <!-- Card Expense Statistics -->
        <div>
          <div class="section-header">
            <h2 class="section-title">Card Expense Statistics</h2>
          </div>
          <div class="widget-box" id="card-expense-donut-box">
            <!-- Donut SVG -->
          </div>
        </div>

        <!-- Card Settings List -->
        <div>
          <div class="section-header">
            <h2 class="section-title">Card Setting</h2>
          </div>
          <div class="widget-box">
            <div class="card-settings-list">
              <!-- Setting 1: Block Card -->
              <div class="card-setting-item">
                <div class="card-setting-info">
                  <div class="card-setting-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <div>
                    <div class="card-setting-title">Block Card</div>
                    <div class="card-setting-desc">Instantly freeze card from transactions</div>
                  </div>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="toggle-block-card" />
                  <span class="toggle-slider"></span>
                </label>
              </div>

              <!-- Setting 2: Change Pin Code -->
              <div class="card-setting-item">
                <div class="card-setting-info">
                  <div class="card-setting-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </div>
                  <div>
                    <div class="card-setting-title">Change Pin Code</div>
                    <div class="card-setting-desc">Withdraw with any ATM worldwide</div>
                  </div>
                </div>
                <button class="btn btn-secondary btn-pill" id="change-pin-btn" style="height: 32px; padding: 0 14px; font-size: 0.8125rem;">
                  Change
                </button>
              </div>

              <!-- Setting 3: Add to Google Pay -->
              <div class="card-setting-item">
                <div class="card-setting-info">
                  <div class="card-setting-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                  </div>
                  <div>
                    <div class="card-setting-title">Add to Google Pay</div>
                    <div class="card-setting-desc">Withdraw without card anywhere</div>
                  </div>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="toggle-google-pay" checked />
                  <span class="toggle-slider"></span>
                </label>
              </div>

              <!-- Setting 4: Add to Apple Pay -->
              <div class="card-setting-item">
                <div class="card-setting-info">
                  <div class="card-setting-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
                      <path d="M10 2c1 .5 2 2 2 5"></path>
                    </svg>
                  </div>
                  <div>
                    <div class="card-setting-title">Add to Apple Pay</div>
                    <div class="card-setting-desc">Tap-to-pay on iPhone & Apple Watch</div>
                  </div>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="toggle-apple-pay" checked />
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Add New Card Section with LIVE PREVIEW -->
      <section style="margin-top: 36px;">
        <div class="section-header">
          <h2 class="section-title">Add New Card</h2>
          <span style="font-size: 0.875rem; color: var(--text-muted);">Real-time Card Issuance</span>
        </div>
        <div class="widget-box">
          <div class="add-card-wrapper">
            <!-- Left: Live Preview Card -->
            <div>
              <div style="font-size: 0.8125rem; font-weight: 600; color: var(--text-muted); margin-bottom: 12px; text-transform: uppercase;">
                Card Live Preview
              </div>
              <div id="live-card-preview-container">
                <!-- Preview card injected below -->
              </div>
            </div>

            <!-- Right: Card Form -->
            <form id="add-new-card-form">
              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label" for="new-card-type">Card Type</label>
                  <select class="form-select" id="new-card-type">
                    <option value="Classic">Classic Debit</option>
                    <option value="Platinum" selected>Platinum Emerald Credit</option>
                    <option value="Corporate">Corporate Gold</option>
                    <option value="Titanium">Titanium Infinite</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label" for="new-card-name">Name On Card</label>
                  <input type="text" class="form-input" id="new-card-name" placeholder="e.g. Eddy Cusuma" value="Eddy Cusuma" required />
                </div>
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label" for="new-card-number">Card Number</label>
                  <input type="text" class="form-input" id="new-card-number" placeholder="4567 8901 2345 6789" value="4567 8901 2345 6789" maxlength="19" required />
                </div>
                <div class="form-group">
                  <label class="form-label" for="new-card-expiry">Expiration Date</label>
                  <input type="text" class="form-input" id="new-card-expiry" placeholder="MM/YY" value="09/29" maxlength="5" required />
                </div>
              </div>

              <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
                <button type="submit" class="btn btn-primary btn-pill" style="min-width: 160px;">
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  `;

  // Bind Card interactions
  bindCardInteractions(container.querySelector('#credit-cards-list-container'));

  // Render Donut Chart
  renderDonutChart(container.querySelector('#card-expense-donut-box'), cardExpenseData);

  // Setup Live Card Preview
  const previewBox = container.querySelector('#live-card-preview-container');
  const nameInput = container.querySelector('#new-card-name');
  const numInput = container.querySelector('#new-card-number');
  const expiryInput = container.querySelector('#new-card-expiry');
  const typeInput = container.querySelector('#new-card-type');

  function updatePreview() {
    const rawNum = numInput.value || '**** **** **** ****';
    const masked = rawNum.length >= 4 ? `${rawNum.slice(0, 4)} **** **** ${rawNum.slice(-4)}` : rawNum;
    const cardObj = {
      id: 'preview-card',
      balance: 10000,
      cardHolder: nameInput.value || 'Card Holder',
      validThru: expiryInput.value || '12/28',
      cardNumber: masked,
      theme: 'dark',
      brand: 'mastercard',
      type: typeInput.value
    };
    previewBox.innerHTML = createCreditCardHtml(cardObj);
  }

  updatePreview();
  nameInput.addEventListener('input', updatePreview);
  numInput.addEventListener('input', updatePreview);
  expiryInput.addEventListener('input', updatePreview);
  typeInput.addEventListener('change', updatePreview);

  // Add Card Submission
  const addForm = container.querySelector('#add-new-card-form');
  addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const rawNum = numInput.value.trim();
    const name = nameInput.value.trim();
    const expiry = expiryInput.value.trim();

    if (!name || rawNum.length < 12) {
      showToast('Validation Error', 'Please enter a valid card name and number.', 'error');
      return;
    }

    const masked = `${rawNum.slice(0, 4)} **** **** ${rawNum.slice(-4)}`;
    userCards.push({
      id: `card-${Date.now()}`,
      balance: 10000,
      cardHolder: name,
      validThru: expiry,
      cardNumber: masked,
      rawNumber: rawNum,
      theme: userCards.length % 2 === 0 ? 'dark' : 'light',
      brand: 'mastercard',
      type: typeInput.value,
      isBlocked: false,
      applePay: true,
      googlePay: true
    });

    showToast('Card Activated', `New ${typeInput.value} card issued successfully!`, 'success');
    renderCreditCardsPage(container);
  });

  // Toggles and Change PIN
  const blockToggle = container.querySelector('#toggle-block-card');
  blockToggle.addEventListener('change', () => {
    showToast(
      blockToggle.checked ? 'Card Frozen' : 'Card Unfrozen',
      blockToggle.checked ? 'Your card has been locked for all transactions.' : 'Your card is now active.',
      blockToggle.checked ? 'error' : 'success'
    );
  });

  const pinBtn = container.querySelector('#change-pin-btn');
  pinBtn.addEventListener('click', () => {
    openModal({
      title: 'Update ATM PIN Code',
      contentHtml: `
        <div class="form-group">
          <label class="form-label">Current PIN</label>
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
      confirmText: 'Save PIN',
      onConfirm: () => {
        showToast('PIN Updated', 'ATM PIN code updated successfully.', 'success');
        return true;
      }
    });
  });
}

function renderDonutChart(container, data) {
  const size = 240;
  const strokeWidth = 26;
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
        style="transition: all var(--transition-fast);"
      />
    `;
    accumulatedPercent += d.value;
  });

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; gap: 18px;">
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform: rotate(-90deg);">
        ${circlesHtml}
      </svg>
      <div style="display: flex; flex-wrap: wrap; gap: 14px; justify-content: center;">
        ${data.map(d => `
          <div class="legend-item">
            <span class="legend-dot" style="background-color: ${d.color};"></span>
            <span>${d.label} (${d.value}%)</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
