/* ==========================================================================
   PAGE: MY PRIVILEGES
   Features:
   - Diamond Member tier status card with progress to Black Obsidian
   - High-net-worth VIP perks grid
   - Redeemable Reward points vouchers with interactive redemption
   ========================================================================== */

import { privilegesData, currentUser } from '../data/mockData.js';
import { showToast } from '../components/Toast.js';

export function renderPrivilegesPage(container) {
  function updateView() {
    container.innerHTML = `
      <div>
        <!-- Tier Banner Card -->
        <section class="privilege-tier-card">
          <div class="privilege-tier-content">
            <span class="privilege-tier-badge">${privilegesData.currentTier}</span>
            <h2 class="privilege-tier-title">Diamond Private Banking Status</h2>
            <p class="privilege-tier-desc">
              You are among our top 1% private banking clientele. Enjoy bespoke limits, direct partner allocation, and concierge privileges worldwide.
            </p>

            <div class="tier-progress-track">
              <div class="tier-progress-fill" style="width: ${privilegesData.progress}%;"></div>
            </div>
            <div class="tier-progress-meta">
              <span>Points: <strong>${privilegesData.points.toLocaleString()} pts</strong></span>
              <span>Next Tier: Black Obsidian (${privilegesData.nextTierPoints.toLocaleString()} pts)</span>
            </div>
          </div>
        </section>

        <!-- Perks & Benefits Grid -->
        <section style="margin-top: 36px;">
          <div class="section-header">
            <h2 class="section-title">Exclusive Member Benefits</h2>
            <span style="font-size: 0.875rem; color: var(--text-muted);">Complimentary with your tier</span>
          </div>

          <div class="privileges-grid">
            ${privilegesData.perks.map(perk => `
              <div class="widget-box" style="display: flex; flex-direction: column; gap: 12px;">
                <div style="width: 44px; height: 44px; border-radius: var(--radius-sm); background-color: var(--primary-tint); color: var(--primary); display: flex; align-items: center; justify-content: center;">
                  ${getPerkIcon(perk.icon)}
                </div>
                <div style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary);">${perk.title}</div>
                <div style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.5;">${perk.desc}</div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Redeem Vouchers Section -->
        <section style="margin-top: 36px;">
          <div class="section-header">
            <h2 class="section-title">Redeem Reward Vouchers</h2>
            <span style="font-size: 0.875rem; color: var(--text-muted);">Available: ${privilegesData.points.toLocaleString()} Points</span>
          </div>

          <div class="privileges-grid">
            ${privilegesData.vouchers.map(v => `
              <div class="widget-box" style="display: flex; align-items: center; justify-content: space-between; gap: 16px;">
                <div>
                  <div style="font-size: 0.8125rem; font-weight: 600; color: var(--primary); text-transform: uppercase;">${v.brand}</div>
                  <div style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 2px 0 4px;">${v.offer}</div>
                  <div style="font-size: 0.8125rem; color: var(--text-muted);">${v.points.toLocaleString()} Points</div>
                </div>
                <button class="btn btn-primary btn-pill redeem-voucher-btn" data-id="${v.id}" data-pts="${v.points}" data-offer="${v.offer}" style="height: 36px; padding: 0 16px; font-size: 0.8125rem;">
                  Redeem
                </button>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    `;

    attachRedeemEvents();
  }

  function attachRedeemEvents() {
    const btns = container.querySelectorAll('.redeem-voucher-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const pts = parseInt(btn.getAttribute('data-pts'), 10);
        const offer = btn.getAttribute('data-offer');

        if (privilegesData.points < pts) {
          showToast('Insufficient Points', 'You do not have enough points for this voucher.', 'error');
          return;
        }

        privilegesData.points -= pts;
        showToast('Voucher Claimed', `Successfully claimed ${offer}! Code sent to ${currentUser.email}.`, 'success', 4000);
        updateView();
      });
    });
  }

  updateView();
}

function getPerkIcon(icon) {
  if (icon === 'plane') {
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
    </svg>`;
  } else if (icon === 'concierge') {
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm0 0v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2"></path>
    </svg>`;
  } else if (icon === 'star') {
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>`;
  } else if (icon === 'crown') {
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path>
    </svg>`;
  } else {
    return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>`;
  }
}
