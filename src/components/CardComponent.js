/* ==========================================================================
   BANK CREDIT CARD COMPONENT
   ========================================================================== */

import { showToast } from './Toast.js';

export function createCreditCardHtml(card) {
  const isDark = card.theme === 'dark';
  const cardClass = isDark ? 'card-dark' : 'card-light';

  const brandHtml = card.brand === 'mastercard'
    ? `<div class="mastercard-circles">
         <div class="circle-left"></div>
         <div class="circle-right"></div>
       </div>`
    : `<div class="visa-logo">VISA</div>`;

  return `
    <div class="credit-card ${cardClass}" data-card-id="${card.id}" title="Click to copy card number">
      <div class="card-top">
        <div>
          <div class="card-balance-label card-subtext">Balance</div>
          <div class="card-balance-value">$${card.balance.toLocaleString()}</div>
        </div>
        <div class="card-chip" aria-label="EMV Smart Chip"></div>
      </div>

      <div class="card-middle">
        <div class="card-meta-block">
          <div class="card-meta-label card-subtext">CARD HOLDER</div>
          <div class="card-meta-value">${card.cardHolder}</div>
        </div>
        <div class="card-meta-block">
          <div class="card-meta-label card-subtext">VALID THRU</div>
          <div class="card-meta-value">${card.validThru}</div>
        </div>
      </div>

      <div class="card-footer">
        <div class="card-number">${card.cardNumber}</div>
        <div class="card-brand-logo">${brandHtml}</div>
      </div>
    </div>
  `;
}

export function bindCardInteractions(container) {
  if (!container) return;
  const cards = container.querySelectorAll('.credit-card');
  cards.forEach(cardEl => {
    cardEl.addEventListener('click', () => {
      const cardNum = cardEl.querySelector('.card-number').innerText;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(cardNum.replace(/\s+/g, '')).catch(() => {});
      }
      showToast('Card Number Copied', `Card ${cardNum} copied to clipboard!`, 'success', 2500);
    });
  });
}
