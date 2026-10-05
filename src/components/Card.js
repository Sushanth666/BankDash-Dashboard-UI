/* ==========================================================================
   BANK CREDIT CARD COMPONENT
   ========================================================================== */

import { showToast } from './Toast.js';

export function createCreditCardHtml(card, extraClass = '') {
  let cardClass = 'card-dark';
  if (card.theme === 'light') cardClass = 'card-light';
  else if (card.theme === 'secondary' || card.theme === 'indigo') cardClass = 'card-secondary';

  const brandHtml = card.brand === 'mastercard'
    ? `<div class="mastercard-circles">
         <div class="circle-left"></div>
         <div class="circle-right"></div>
       </div>`
    : `<div class="visa-logo">VISA</div>`;

  const chipSvg = `
    <svg class="card-chip-svg" width="34" height="25" viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="chip-mask-${card.id}">
        <rect width="34" height="25" rx="5" fill="white"/>
        <path d="M0 8.5H10M24 8.5H34M0 16.5H10M24 16.5H34M10 0V25M24 0V25" stroke="black" stroke-width="1.4"/>
        <rect x="12.5" y="5.5" width="9" height="14" rx="2" fill="none" stroke="black" stroke-width="1.4"/>
      </mask>
      <rect width="34" height="25" rx="5" fill="currentColor" mask="url(#chip-mask-${card.id})"/>
    </svg>
  `;

  return `
    <div class="credit-card ${cardClass} ${extraClass}" data-card-id="${card.id}" title="Click to copy card number">
      <div class="card-top">
        <div>
          <div class="card-balance-label card-subtext">Balance</div>
          <div class="card-balance-value">$${card.balance.toLocaleString()}</div>
        </div>
        <div class="card-chip" aria-label="EMV Smart Chip">
          ${chipSvg}
        </div>
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
    // Interactive 3D Parallax Tilt & Dynamic Light Glare Tracking
    cardEl.addEventListener('mousemove', (e) => {
      const rect = cardEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -11;
      const rotateY = ((x - centerX) / centerX) * 13;
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      cardEl.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale3d(1.025, 1.025, 1.025)`;
      cardEl.style.setProperty('--glare-x', `${glareX.toFixed(1)}%`);
      cardEl.style.setProperty('--glare-y', `${glareY.toFixed(1)}%`);
      cardEl.style.setProperty('--glare-opacity', '0.65');
    });

    cardEl.addEventListener('mouseleave', () => {
      cardEl.style.transform = '';
      cardEl.style.setProperty('--glare-opacity', '0');
    });

    // Click to copy card number
    cardEl.addEventListener('click', () => {
      const cardNum = cardEl.querySelector('.card-number').innerText;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(cardNum.replace(/\s+/g, '')).catch(() => {});
      }
      showToast('Card Number Copied', `Card ${cardNum} copied to clipboard!`, 'success', 2500);
    });
  });
}
