/* ==========================================================================
   BANKDASH HIGH-PERFORMANCE FINTECH ANIMATIONS
   Includes:
   - Smooth numeric ticker counter with exponential ease-out
   - Quick Transfer confetti particle burst
   - Dynamic button ripple waves
   - Zero layout shift guarantee
   ========================================================================== */

/**
 * Animate a numeric text element smoothly from 0 to its target value.
 * Preserves currency prefixes ($), signs (+/-), commas, decimals, and suffixes (%).
 */
export function animateCounter(element, duration = 850) {
  if (!element || element.dataset.animating === 'true') return;

  const rawText = element.textContent.trim();
  // Regex to extract prefix (e.g., -$, +$, $, +, -), number, and suffix (e.g., %)
  const match = rawText.match(/^([^\d]*?)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return;

  const prefix = match[1] || '';
  const numClean = match[2].replace(/,/g, '');
  const suffix = match[3] || '';
  const targetVal = parseFloat(numClean);
  if (isNaN(targetVal) || targetVal === 0) return;

  const isDecimal = numClean.includes('.');
  const decimalPlaces = isDecimal ? numClean.split('.')[1].length : 0;

  element.dataset.animating = 'true';
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Smooth exponential ease-out
    const easeOut = 1 - Math.pow(2, -10 * progress);
    const currentVal = targetVal * easeOut;

    let formattedVal;
    if (isDecimal) {
      formattedVal = currentVal.toFixed(decimalPlaces);
    } else {
      formattedVal = Math.round(currentVal).toLocaleString();
    }

    element.textContent = `${prefix}${formattedVal}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = rawText; // Exact final restoration
      element.dataset.animating = 'false';
    }
  }

  requestAnimationFrame(step);
}

/**
 * Animate all prominent numbers and balance figures in a rendered container
 */
export function animateAllCounters(container) {
  if (!container) return;
  const selectors = [
    '.card-balance-value',
    '.kpi-value',
    '.stat-value',
    '.privilege-status-points',
    '.privilege-metric-value',
    '.privilege-metric-val',
    '.investments-kpi-value',
    '.loans-summary-val',
    '.accounts-invoice-amount',
    '.transaction-amount',
    '.tx-amount-cell',
    '.accounts-tx-amount',
    '.my-inv-val',
    '.my-inv-rate',
    '.trending-stock-price',
    '.trending-stock-return',
    '.badge-positive',
    '.badge-negative',
    '.tx-expense-bar-label'
  ];

  const elements = container.querySelectorAll(selectors.join(', '));
  elements.forEach((el, index) => {
    setTimeout(() => {
      animateCounter(el, 750 + Math.min(index * 35, 300));
    }, index * 20);
  });
}

/**
 * Creates a festive, sparkling fintech confetti particle burst on transaction completion
 */
export function triggerSendConfetti(button) {
  if (!button) return;
  const rect = button.getBoundingClientRect();
  const colors = ['#10B981', '#059669', '#34D399', '#06B6D4', '#F59E0B', '#38BDF8'];
  const particleCount = 18;

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    const angle = (Math.PI * 2 * i) / particleCount + (Math.random() * 0.4 - 0.2);
    const distance = 45 + Math.random() * 55;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance;
    const color = colors[i % colors.length];
    const size = 5 + Math.random() * 5;

    p.style.cssText = `
      position: fixed;
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top + rect.height / 2}px;
      width: ${size}px;
      height: ${size}px;
      background-color: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      transform: translate(-50%, -50%) scale(1);
      box-shadow: 0 0 10px ${color};
      transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s ease;
    `;

    document.body.appendChild(p);

    requestAnimationFrame(() => {
      p.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(0)`;
      p.style.opacity = '0';
    });

    setTimeout(() => p.remove(), 700);
  }
}

/**
 * Initializes global interactive ripple feedback on button clicks
 */
export function initGlobalRipple() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn, .quick-transfer-btn, .loans-repay-btn, .bank-service-btn, .privilege-ticket-btn, .settings-save-btn, .header-icon-btn');
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%);
      pointer-events: none;
      transform: scale(0);
      animation: rippleExpand 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      z-index: 10;
    `;

    if (getComputedStyle(btn).position === 'static') {
      btn.style.position = 'relative';
    }
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);

    setTimeout(() => ripple.remove(), 550);
  });
}
