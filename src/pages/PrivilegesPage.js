/* ==========================================================================
   PAGE: MY PRIVILEGES - ALTERNATE BESPOKE PRIVATE CLIENT DASHBOARD
   Features:
   - Interactive 3D Luxury Metallic Membership Card with Tier Shimmer
   - Dynamic Tier Selector (Silver, Gold, Platinum, Diamond, Obsidian)
   - Real-time Points Progress Bar & Multiplier Tracker
   - 4-Column High-Impact VIP Metrics Strip
   - Category-filtered Exclusive Benefits with Squircles & Detail Modals
   - Luxury Partner Reward Vouchers with Interactive Instant Redemption
   - Dedicated 24/7 Private Client Concierge Hotline
   ========================================================================== */

import { privilegesData, currentUser } from '../data/mockData.js';
import { showToast } from '../components/Toast.js';
import { openModal } from '../components/Modal.js';
import { animateAllCounters } from '../utils/animations.js';

export function renderPrivilegesPage(container) {
  let selectedCategory = 'all';
  let activeTierId = 'diamond';

  const tierMetadata = {
    silver: {
      name: 'Silver Elite',
      cardGradient: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #64748b 100%)',
      multiplier: '1.5x',
      minPoints: 0,
      nextPoints: 5000,
      glow: 'rgba(100, 116, 139, 0.4)',
      badge: 'SILVER ELITE • TIER 1',
      desc: 'Essential digital banking with baseline rewards and domestic partner offers.'
    },
    gold: {
      name: 'Gold Executive',
      cardGradient: 'linear-gradient(135deg, #451a03 0%, #78350f 50%, #b45309 100%)',
      multiplier: '2.0x',
      minPoints: 5000,
      nextPoints: 15000,
      glow: 'rgba(217, 119, 6, 0.4)',
      badge: 'GOLD EXECUTIVE • TIER 2',
      desc: 'Enhanced lifestyle cashback, fee waivers, and preferential loan rates.'
    },
    platinum: {
      name: 'Platinum Premier',
      cardGradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
      multiplier: '2.75x',
      minPoints: 15000,
      nextPoints: 25000,
      glow: 'rgba(99, 102, 241, 0.4)',
      badge: 'PLATINUM PREMIER • TIER 3',
      desc: 'Global travel assistance, complimentary lounge passes, and zero FX surcharges.'
    },
    diamond: {
      name: 'Diamond Member',
      cardGradient: 'linear-gradient(135deg, #064E3B 0%, #047857 45%, #059669 80%, #10B981 100%)',
      multiplier: '3.5x',
      minPoints: 25000,
      nextPoints: 50000,
      glow: 'rgba(16, 185, 129, 0.45)',
      badge: 'DIAMOND MEMBER • TIER 4 (ACTIVE)',
      desc: 'You are among our top 1% private banking clientele. Enjoy bespoke credit facilities, personal banker allocation, and concierge privileges worldwide.'
    },
    obsidian: {
      name: 'Black Obsidian',
      cardGradient: 'linear-gradient(135deg, #09090b 0%, #18181b 50%, #27272a 100%)',
      multiplier: '5.0x',
      minPoints: 50000,
      nextPoints: 100000,
      glow: 'rgba(0, 0, 0, 0.6)',
      badge: 'BLACK OBSIDIAN • INVITATION ONLY',
      desc: 'Uncapped sovereign private banking, bespoke physical bullion vaulting, and private jet charter allocation.'
    }
  };

  function updateView() {
    const currentTierInfo = tierMetadata[activeTierId];
    const filteredPerks = selectedCategory === 'all'
      ? privilegesData.perks
      : privilegesData.perks.filter(p => p.category === selectedCategory);

    container.innerHTML = `
      <div class="privilege-container">

        <!-- ====================================================================
             1. HERO SECTION: 3D METALLIC CARD + TIER STATUS DASHBOARD
             ==================================================================== -->
        <section class="privilege-hero-row">
          
          <!-- 3D Luxury Metallic Member Card -->
          <div class="privilege-metal-card" style="background: ${currentTierInfo.cardGradient}; box-shadow: 0 20px 40px -10px ${currentTierInfo.glow};">
            <div class="privilege-card-shimmer"></div>
            
            <div class="privilege-card-top">
              <div class="privilege-card-brand">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="privilege-card-brand-name">BankDash</span>
              </div>
              <span class="privilege-card-badge">${activeTierId === 'diamond' ? 'ACTIVE TIER' : 'PREVIEW TIER'}</span>
            </div>

            <div class="privilege-card-chip-row">
              <div class="privilege-emv-chip"></div>
              <svg class="privilege-contactless-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round">
                <path d="M8.5 16.5a5 5 0 0 1 0-7"/>
                <path d="M12 19a8.5 8.5 0 0 0 0-14"/>
                <path d="M15.5 21.5a12 12 0 0 0 0-21"/>
              </svg>
            </div>

            <div class="privilege-card-number">•••• •••• •••• 8829</div>

            <div class="privilege-card-bottom">
              <div>
                <div class="privilege-card-holder-label">Private Client</div>
                <div class="privilege-card-holder-val">${currentUser.name}</div>
              </div>
              <div class="privilege-card-tier-tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <span>${currentTierInfo.name}</span>
              </div>
            </div>
          </div>

          <!-- Tier Status & Progression Widget -->
          <div class="privilege-status-card">
            <div>
              <div class="privilege-status-header">
                <span class="privilege-status-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  ${currentTierInfo.badge}
                </span>
                <span class="privilege-multiplier-pill">
                  ⚡ ${currentTierInfo.multiplier} Points Boost
                </span>
              </div>

              <h2 class="privilege-status-title">${currentTierInfo.name} Status</h2>
              <p class="privilege-status-desc">${currentTierInfo.desc}</p>
            </div>

            <div class="privilege-tier-track-wrapper">
              <div class="privilege-tier-track-header">
                <span class="privilege-tier-pts">Points: <strong>${privilegesData.points.toLocaleString()} pts</strong></span>
                <span class="privilege-tier-next">Next Tier Goal: <strong>${privilegesData.nextTierPoints.toLocaleString()} pts</strong></span>
              </div>
              <div class="privilege-progress-bar">
                <div class="privilege-progress-fill" style="width: ${privilegesData.progress}%;"></div>
              </div>
            </div>

            <!-- Tier Selector Switcher Pills -->
            <div>
              <div style="font-size: 0.8125rem; font-weight: 700; color: #718EBF; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">
                Select Tier To Compare Privileges:
              </div>
              <div class="privilege-tier-pills">
                ${privilegesData.tiers.map(t => `
                  <button class="privilege-tier-pill ${t.id === activeTierId ? 'active' : ''}" data-tier="${t.id}">
                    ${t.name}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>

        </section>


        <!-- ====================================================================
             2. METRICS STRIP: 4 HIGH-IMPACT VIP STAT CARDS
             ==================================================================== -->
        <section class="privilege-metrics-strip">
          
          <div class="privilege-metric-box privilege-metric-box-rewards">
            <div class="privilege-metric-icon" style="background-color: var(--primary-light); color: var(--primary);">
              <svg class="privilege-icon-svg privilege-icon-star" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <div>
              <div class="privilege-metric-val">${privilegesData.points.toLocaleString()}</div>
              <div class="privilege-metric-lbl">Available Rewards Pts</div>
            </div>
          </div>

          <div class="privilege-metric-box privilege-metric-box-savings">
            <div class="privilege-metric-icon" style="background-color: #FFF5D9; color: #FFBB38;">
              <svg class="privilege-icon-svg privilege-icon-dollar" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <div>
              <div class="privilege-metric-val">$${privilegesData.annualSavings.toLocaleString()}</div>
              <div class="privilege-metric-lbl">Annual VIP Savings</div>
            </div>
          </div>

          <div class="privilege-metric-box privilege-metric-box-lifetime">
            <div class="privilege-metric-icon" style="background-color: var(--primary-light); color: var(--primary);">
              <svg class="privilege-icon-svg privilege-icon-trend" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
            </div>
            <div>
              <div class="privilege-metric-val">${privilegesData.lifetimeEarned.toLocaleString()}</div>
              <div class="privilege-metric-lbl">Lifetime Points Earned</div>
            </div>
          </div>

          <div class="privilege-metric-box privilege-metric-box-banker">
            <div class="privilege-metric-icon" style="background-color: #DCFAF8; color: #16DBCC;">
              <svg class="privilege-icon-svg privilege-icon-bell" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm0 0v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2"/>
              </svg>
            </div>
            <div>
              <div class="privilege-metric-val" style="font-size: 1.15rem;">Private Banker</div>
              <div class="privilege-metric-lbl privilege-banker-status">
                <span class="privilege-status-dot"></span>Online • Concierge 24/7
              </div>
            </div>
          </div>

        </section>


        <!-- ====================================================================
             3. EXCLUSIVE BENEFITS SECTION WITH SQUIRCLES & CATEGORY FILTER
             ==================================================================== -->
        <section>
          <div class="section-header" style="margin-bottom: 16px;">
            <div>
              <h2 class="section-title">Exclusive Member Benefits</h2>
              <span style="font-size: 0.875rem; color: #718EBF;">Complimentary VIP access included in your ${currentTierInfo.name} tier</span>
            </div>
          </div>

          <!-- Category Filter Bar -->
          <div class="privilege-tabs-nav">
            <button class="privilege-tab-btn ${selectedCategory === 'all' ? 'active' : ''}" data-cat="all">
              All Privileges (${privilegesData.perks.length})
            </button>
            <button class="privilege-tab-btn ${selectedCategory === 'travel' ? 'active' : ''}" data-cat="travel">
              ✈️ Travel & Lounges (2)
            </button>
            <button class="privilege-tab-btn ${selectedCategory === 'lifestyle' ? 'active' : ''}" data-cat="lifestyle">
              🍸 Lifestyle & Dining (2)
            </button>
            <button class="privilege-tab-btn ${selectedCategory === 'wealth' ? 'active' : ''}" data-cat="wealth">
              🛡️ Wealth & Equity (2)
            </button>
          </div>

          <!-- Benefits Grid -->
          <div class="privilege-perks-grid">
            ${filteredPerks.map(perk => `
              <div class="privilege-perk-card">
                <div>
                  <div class="privilege-perk-header">
                    <div class="privilege-perk-icon" style="background-color: ${perk.iconBg}; color: ${perk.iconColor};">
                      ${getPerkIcon(perk.icon)}
                    </div>
                    <span class="privilege-perk-badge" style="background-color: ${perk.badgeBg}; color: ${perk.badgeColor};">
                      ${perk.badge}
                    </span>
                  </div>

                  <div class="privilege-perk-body" style="margin-top: 18px;">
                    <div class="privilege-perk-title">${perk.title}</div>
                    <div class="privilege-perk-desc">${perk.desc}</div>
                  </div>
                </div>

                <div class="privilege-perk-footer">
                  <span style="font-size: 0.8125rem; color: #10B981; font-weight: 700; display: inline-flex; align-items: center; gap: 5px;">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Active & Ready
                  </span>
                  <button class="privilege-perk-action-btn view-perk-modal-btn" data-id="${perk.id}" data-title="${perk.title}">
                    Explore Privilege
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </section>


        <!-- ====================================================================
             4. LUXURY REWARD VOUCHERS MARKETPLACE
             ==================================================================== -->
        <section>
          <div class="section-header" style="margin-bottom: 20px;">
            <div>
              <h2 class="section-title">Redeem Luxury Reward Passes</h2>
              <span style="font-size: 0.875rem; color: #718EBF;">Instant digital voucher passes redeemable with your points</span>
            </div>
            <div style="font-size: 0.875rem; font-weight: 700; color: var(--primary); background: var(--primary-light); padding: 6px 14px; border-radius: 20px;">
              Balance: ${privilegesData.points.toLocaleString()} Points
            </div>
          </div>

          <div class="privilege-vouchers-grid">
            ${privilegesData.vouchers.map(v => `
              <div class="privilege-voucher-ticket">
                <div class="privilege-ticket-header">
                  <div class="privilege-ticket-brand">
                    <div class="privilege-ticket-icon" style="background-color: ${v.logoBg}; color: ${v.logoColor};">
                      ${v.logoText.slice(0, 3)}
                    </div>
                    <div>
                      <div class="privilege-ticket-name">${v.brand}</div>
                      <div style="font-size: 0.75rem; color: #718EBF;">${v.expires}</div>
                    </div>
                  </div>
                  <span class="privilege-ticket-tag">${v.tag}</span>
                </div>

                <div class="privilege-ticket-divider"></div>

                <div class="privilege-ticket-body">
                  <div>
                    <div class="privilege-ticket-offer">${v.offer}</div>
                    <div class="privilege-ticket-pts">★ ${v.points.toLocaleString()} Points</div>
                  </div>
                  <button
                    class="privilege-ticket-btn redeem-voucher-btn"
                    data-id="${v.id}"
                    data-pts="${v.points}"
                    data-offer="${v.offer}"
                    data-brand="${v.brand}"
                  >
                    Claim Pass
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </section>


        <!-- ====================================================================
             5. 24/7 DEDICATED PRIVATE BANKER CONCIERGE BANNER
             ==================================================================== -->
        <section class="privilege-concierge-card">
          <div class="privilege-concierge-info">
            <div class="privilege-concierge-avatar-wrap">
              <img class="privilege-concierge-avatar" src="${privilegesData.advisor.avatar}" alt="${privilegesData.advisor.name}" />
              <div class="privilege-online-indicator"></div>
            </div>
            <div>
              <div class="privilege-concierge-name">${privilegesData.advisor.name}</div>
              <div class="privilege-concierge-sub">${privilegesData.advisor.role} • ${privilegesData.advisor.response}</div>
            </div>
          </div>

          <div class="privilege-concierge-actions">
            <button class="privilege-concierge-btn secondary" id="btn-request-callback">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Priority Callback
            </button>
            <button class="privilege-concierge-btn primary" id="btn-chat-concierge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              Direct Message
            </button>
          </div>
        </section>

      </div>
    `;

    attachEventHandlers();
  }

  function attachEventHandlers() {
    // Tier Switcher
    const tierPills = container.querySelectorAll('.privilege-tier-pill');
    tierPills.forEach(pill => {
      pill.addEventListener('click', () => {
        activeTierId = pill.getAttribute('data-tier');
        updateView();
      });
    });

    // Category Tabs
    const catBtns = container.querySelectorAll('.privilege-tab-btn');
    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        selectedCategory = btn.getAttribute('data-cat');
        updateView();
      });
    });

    // View Perk Details Modal
    const perkBtns = container.querySelectorAll('.view-perk-modal-btn');
    perkBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const title = btn.getAttribute('data-title');
        openModal({
          title: `${title} - VIP Benefit Details`,
          contentHtml: `
            <div style="margin-bottom: 16px;">
              <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 14px;">
                As a verified BankDash Private Client, this benefit is active across all your primary and secondary accounts with zero recurring subscription fees.
              </p>
            </div>
            <div style="background-color: var(--bg-surface-subtle); border-radius: var(--radius-md); padding: 18px; margin-bottom: 16px;">
              <div style="font-size: 0.9375rem; font-weight: 700; color: var(--text-primary); margin-bottom: 10px;">
                Privilege Highlights:
              </div>
              <ul style="padding-left: 20px; font-size: 0.875rem; color: var(--text-muted); line-height: 1.8;">
                <li>Instant digital presentation via Apple Wallet / Google Pay</li>
                <li>Priority queue reservation with direct partner allocation</li>
                <li>Complimentary guest pass entitlement renewed annually</li>
                <li>FDIC-insured and backed by BankDash Private Wealth Assurance</li>
              </ul>
            </div>
          `,
          confirmText: 'Access Digital Pass',
          cancelText: 'Close',
          onConfirm: () => {
            showToast('Digital Pass Generated', `Your VIP credential for "${title}" has been issued to your device.`, 'success', 3500);
            return true;
          }
        });
      });
    });

    // Redeem Voucher Action
    const voucherBtns = container.querySelectorAll('.redeem-voucher-btn');
    voucherBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const pts = parseInt(btn.getAttribute('data-pts'), 10);
        const offer = btn.getAttribute('data-offer');
        const brand = btn.getAttribute('data-brand');

        if (privilegesData.points < pts) {
          showToast('Insufficient Points', `You need ${pts.toLocaleString()} points for this reward pass.`, 'error');
          return;
        }

        const redemptionCode = `${brand.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`;

        openModal({
          title: `Claim ${offer}`,
          contentHtml: `
            <div style="text-align: center; margin-bottom: 20px;">
              <div style="font-size: 1.5rem; margin-bottom: 8px;">🎁</div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin-bottom: 6px;">
                ${offer}
              </h3>
              <p style="font-size: 0.875rem; color: var(--text-muted);">
                ${pts.toLocaleString()} Points will be deducted from your available balance.
              </p>
            </div>
            <div style="background-color: var(--primary-light); border: 1px dashed var(--primary); border-radius: 12px; padding: 14px; text-align: center; margin-bottom: 12px;">
              <div style="font-size: 0.75rem; color: #718EBF; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">Generated Pass Code</div>
              <div style="font-family: monospace; font-size: 1.2rem; font-weight: 800; color: var(--primary); letter-spacing: 0.1em; margin-top: 4px;">${redemptionCode}</div>
            </div>
          `,
          confirmText: `Confirm & Redeem (${pts.toLocaleString()} pts)`,
          cancelText: 'Cancel',
          onConfirm: () => {
            privilegesData.points -= pts;
            showToast('Pass Claimed Successfully', `Claimed ${offer}! Pass code sent to ${currentUser.email}.`, 'success', 4500);
            updateView();
            return true;
          }
        });
      });
    });

    // Concierge Callback
    const callbackBtn = container.querySelector('#btn-request-callback');
    if (callbackBtn) {
      callbackBtn.addEventListener('click', () => {
        showToast('Callback Scheduled', `${privilegesData.advisor.name} will call your verified number within 5 minutes.`, 'success', 4000);
      });
    }

    // Concierge Chat
    const chatBtn = container.querySelector('#btn-chat-concierge');
    if (chatBtn) {
      chatBtn.addEventListener('click', () => {
        openModal({
          title: `Direct Chat • ${privilegesData.advisor.name}`,
          contentHtml: `
            <div style="margin-bottom: 14px;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                <img src="${privilegesData.advisor.avatar}" style="width: 48px; height: 48px; border-radius: 50%;" />
                <div>
                  <div style="font-weight: 700; font-size: 0.9375rem;">${privilegesData.advisor.name}</div>
                  <div style="font-size: 0.8125rem; color: #10B981;">● Online Now (Encrypted Channel)</div>
                </div>
              </div>
              <label style="font-size: 0.875rem; font-weight: 600; display: block; margin-bottom: 6px;">How can we assist you today?</label>
              <textarea id="concierge-msg-input" rows="3" class="form-input" style="width: 100%; border-radius: 12px;" placeholder="e.g. Please reserve 2 VIP lounge tickets for flight AF083 or book Four Seasons Paris..."></textarea>
            </div>
          `,
          confirmText: 'Send Priority Request',
          cancelText: 'Cancel',
          onConfirm: () => {
            showToast('Message Delivered', `Your message was delivered to ${privilegesData.advisor.name}.`, 'success', 3500);
            return true;
          }
        });
      });
    }

    // Trigger counter tickers on metrics
    animateAllCounters(container);
  }

  updateView();
}

function getPerkIcon(icon) {
  if (icon === 'plane') {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
    </svg>`;
  } else if (icon === 'concierge') {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm0 0v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2"/>
    </svg>`;
  } else if (icon === 'star') {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>`;
  } else if (icon === 'crown') {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
    </svg>`;
  } else if (icon === 'shield') {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>`;
  } else {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>`;
  }
}
