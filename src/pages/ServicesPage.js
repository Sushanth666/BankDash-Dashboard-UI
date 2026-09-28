/* ==========================================================================
   PAGE: SERVICES
   Pixel-perfect match to BankDash Figma Services design:
   - Top 3 Highlight Cards (Life Insurance, Shopping, Safety)
   - Bank Services List: 6 horizontal cards with detailed columns and "View Details"
   - Interactive modal showing full service information on "View Details"
   ========================================================================== */

import { servicesPageData } from '../data/mockData.js';
import { openModal } from '../components/Modal.js';
import { showToast } from '../components/Toast.js';

export function renderServicesPage(container) {
  container.innerHTML = `
    <div class="services-page-container">
      <!-- ROW 1: 3 HIGHLIGHT CARDS -->
      <section class="services-highlights-grid">
        ${servicesPageData.highlights.map(hl => `
          <div class="service-highlight-card">
            <div class="service-highlight-icon" style="background-color: ${hl.iconBg}; color: ${hl.iconColor};">
              ${getServiceHighlightSvg(hl.iconType)}
            </div>
            <div>
              <div class="service-highlight-title">${hl.title}</div>
              <div class="service-highlight-desc">${hl.desc}</div>
            </div>
          </div>
        `).join('')}
      </section>

      <!-- ROW 2: BANK SERVICES LIST -->
      <section style="margin-top: 32px;">
        <div class="section-header">
          <h2 class="section-title">Bank Services List</h2>
        </div>

        <div class="bank-services-list">
          ${servicesPageData.servicesList.map((service, idx) => `
            <div class="bank-service-card-item">
              <!-- Service Identity (Icon + Title + Desc) -->
              <div class="bank-service-main-col">
                <div class="bank-service-icon" style="background-color: ${service.iconBg}; color: ${service.iconColor};">
                  ${getBankServiceIconSvg(service.iconType)}
                </div>
                <div class="bank-service-info">
                  <div class="bank-service-name">${service.title}</div>
                  <div class="bank-service-sub">${service.desc}</div>
                </div>
              </div>

              <!-- Metadata Column 1 -->
              <div class="bank-service-col">
                <div class="bank-service-col-val">${service.col1Title}</div>
                <div class="bank-service-col-sub">${service.col1Desc}</div>
              </div>

              <!-- Metadata Column 2 -->
              <div class="bank-service-col">
                <div class="bank-service-col-val">${service.col2Title}</div>
                <div class="bank-service-col-sub">${service.col2Desc}</div>
              </div>

              <!-- Metadata Column 3 -->
              <div class="bank-service-col">
                <div class="bank-service-col-val">${service.col3Title}</div>
                <div class="bank-service-col-sub">${service.col3Desc}</div>
              </div>

              <!-- Action Link / Button -->
              <div class="bank-service-action">
                <button
                  class="bank-service-btn ${service.isHighlightBtn ? 'active' : ''}"
                  data-index="${idx}"
                  data-id="${service.id}"
                  data-name="${service.title}"
                >
                  View Details
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  `;

  // Attach View Details Click Events
  const detailButtons = container.querySelectorAll('.bank-service-btn');
  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-name');
      const id = btn.getAttribute('data-id');

      openModal({
        title: `${name} - Service Details`,
        contentHtml: `
          <div style="margin-bottom: 20px;">
            <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 14px;">
              BankDash provides institutional-grade ${name.toLowerCase()} tailored with low fees, high security, and 24/7 dedicated account support.
            </p>
          </div>
          <div style="background-color: var(--bg-surface-subtle); border-radius: var(--radius-md); padding: 18px; margin-bottom: 16px;">
            <div style="font-size: 0.9375rem; font-weight: 600; color: var(--text-primary); margin-bottom: 10px;">
              Key Features & Benefits:
            </div>
            <ul style="padding-left: 20px; font-size: 0.875rem; color: var(--text-muted); line-height: 1.7;">
              <li>Instant online activation with zero administrative paperwork</li>
              <li>Competitive annual yield and low transaction commissions</li>
              <li>Multi-tiered biometric authentication and FDIC insured coverage</li>
              <li>Integrated real-time financial tracking directly within your BankDash portal</li>
            </ul>
          </div>
        `,
        confirmText: 'Inquire / Activate',
        cancelText: 'Close',
        onConfirm: () => {
          showToast('Service Requested', `Your request for ${name} has been received. Our banking representative will contact you shortly.`, 'success');
          return true;
        }
      });
    });
  });
}

// ---------------------------------------------------------------------------
// SVG Helpers
// ---------------------------------------------------------------------------

function getServiceHighlightSvg(type) {
  if (type === 'shield-heart') {
    // Shield with heart/diamond
    return `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="M12 8c-1.5-1.5-3-1-3 1 0 2 3 4 3 4s3-2 3-4c0-2-1.5-2.5-3-1z"></path>
      </svg>
    `;
  } else if (type === 'shopping-bag') {
    // Shopping bag
    return `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
      </svg>
    `;
  } else {
    // Shield check (Safety)
    return `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <polyline points="9 12 11 14 15 10"></polyline>
      </svg>
    `;
  }
}

function getBankServiceIconSvg(type) {
  if (type === 'loan') {
    // Loan / Money Bag / Coin Hand
    return `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="8" r="5"></circle>
        <path d="M12 6v4m-2-2h4"></path>
        <path d="M4 22h16a2 2 0 0 0 2-2c0-3-4-5-10-5s-10 2-10 5a2 2 0 0 0 2 2z"></path>
      </svg>
    `;
  } else if (type === 'briefcase') {
    // Briefcase (Checking Accounts)
    return `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    `;
  } else if (type === 'chart') {
    // Chart (Savings Accounts)
    return `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="20" x2="18" y2="8"></line>
        <line x1="12" y1="20" x2="12" y2="13"></line>
        <line x1="6" y1="20" x2="6" y2="16"></line>
      </svg>
    `;
  } else if (type === 'user') {
    // User / Debit Card Profile
    return `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    `;
  } else {
    // Safety / Life Insurance
    return `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <polyline points="9 12 11 14 15 10"></polyline>
      </svg>
    `;
  }
}
