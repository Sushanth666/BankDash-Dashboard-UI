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
    // Life Insurance: Solid blue shield with white heart outline and white medical cross inside (Image 3 & 4)
    return `
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Blue Shield Body -->
        <path d="M15 4.5L23.5 7.5V14.5C23.5 20.2 19.8 23.5 15 25.5C10.2 23.5 6.5 20.2 6.5 14.5V7.5L15 4.5Z" fill="#2D60FF"/>
        <!-- White Heart Outline -->
        <path d="M15 19.8C15 19.8 10 16.5 10 13.2C10 11.2 11.5 10 13.2 10C14.2 10 14.8 10.6 15 10.8C15.2 10.6 15.8 10 16.8 10C18.5 10 20 11.2 20 13.2C20 16.5 15 19.8 15 19.8Z" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <!-- Centered White Cross -->
        <path d="M14.2 13H15.8V14.2H17V15.4H15.8V16.6H14.2V15.4H13V14.2H14.2V13Z" fill="#FFFFFF"/>
      </svg>
    `;
  } else if (type === 'shopping-bag') {
    // Shopping: Solid amber shopping tote bag with arched loop handle (Image 2 & 4)
    return `
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Arched Loop Handle -->
        <path d="M11.5 11V7.5C11.5 5.6 13.1 4 15 4C16.9 4 18.5 5.6 18.5 7.5V11" stroke="#FFBB38" stroke-width="2.4" stroke-linecap="round"/>
        <!-- Bag Body with rounded bottom corners -->
        <path d="M8.5 11.5H21.5C22.2 11.5 22.8 12 22.9 12.7L24.3 22.2C24.5 23.5 23.5 24.5 22.2 24.5H7.8C6.5 24.5 5.5 23.5 5.7 22.2L7.1 12.7C7.2 12 7.8 11.5 8.5 11.5Z" fill="#FFBB38"/>
      </svg>
    `;
  } else {
    // Safety: Solid mint shield with white circle and mint checkmark inside (Image 1 & 4)
    return `
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Teal Shield Body -->
        <path d="M15 4.5L23.5 7.5V14.5C23.5 20.2 19.8 23.5 15 25.5C10.2 23.5 6.5 20.2 6.5 14.5V7.5L15 4.5Z" fill="#16DBCC"/>
        <!-- White Center Circle -->
        <circle cx="15" cy="14.8" r="5.2" fill="#FFFFFF"/>
        <!-- Teal Checkmark Inside Circle -->
        <polyline points="12.5,14.8 14.3,16.6 17.5,13.2" stroke="#16DBCC" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      </svg>
    `;
  }
}

function getBankServiceIconSvg(type) {
  if (type === 'loan') {
    // Business Loans: Hand with floating dollar coin in #FF82AC
    return `
      <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Dollar Coin -->
        <circle cx="27.5" cy="23.5" r="7" fill="#FF82AC"/>
        <text x="27.5" y="24" font-family="'Inter', -apple-system, sans-serif" font-size="9" font-weight="700" fill="#FFFFFF" text-anchor="middle" dominant-baseline="central">$</text>
        <!-- Sleeve Cuff -->
        <rect x="16.5" y="32.5" width="2.5" height="6.5" rx="1.25" fill="#FF82AC"/>
        <!-- Hand / Palm -->
        <path d="M20.5 33C21 31.8 22.2 31 23.8 31C24.8 31 25.5 31.4 26.2 32H30C31.5 32 33 32.8 33.8 33.8L37.2 33.2C38 33 38.8 33.8 38.6 34.6C38.2 36 36.8 37.2 35 37.8L28.5 38.8C25.5 39.2 21.5 38.5 20.5 37V33Z" fill="#FF82AC"/>
      </svg>
    `;
  } else if (type === 'briefcase') {
    // Checking Accounts: Amber Briefcase with top handle, seam, and center clasp
    return `
      <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Handle -->
        <path d="M23 20V18C23 16.9 23.9 16 25 16H30C31.1 16 32 16.9 32 18V20" stroke="#FFBB38" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Upper Lid -->
        <path d="M16 22C16 20.6 17.1 19.5 18.5 19.5H36.5C37.9 19.5 39 20.6 39 22V25.5H16V22Z" fill="#FFBB38"/>
        <!-- Lower Body -->
        <path d="M16 27.5H39V33.5C39 34.9 37.9 36 36.5 36H18.5C17.1 36 16 34.9 16 33.5V27.5Z" fill="#FFBB38"/>
        <!-- Center Latch -->
        <rect x="25.5" y="24.5" width="4" height="4" rx="0.8" fill="#FFF5D9"/>
      </svg>
    `;
  } else if (type === 'chart') {
    // Savings Accounts: 3 Growth Bars with Upward Arrow on 3rd Bar
    return `
      <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="17" y="27" width="5" height="9.5" rx="2.5" fill="#FF82AC"/>
        <rect x="24" y="23" width="5" height="13.5" rx="2.5" fill="#FF82AC"/>
        <rect x="31" y="20" width="5" height="16.5" rx="2.5" fill="#FF82AC"/>
        <path d="M33.5 13.8L38.2 18.8C38.7 19.3 38.3 20.2 37.5 20.2H29.5C28.7 20.2 28.3 19.3 28.8 18.8L33.5 13.8Z" fill="#FF82AC"/>
      </svg>
    `;
  } else if (type === 'user') {
    // Debit and credit cards: Solid Blue User Avatar
    return `
      <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="27.5" cy="18" r="5.5" fill="#396AFF"/>
        <path d="M18.5 35C18.5 30.5 21.8 26.5 27.5 26.5C33.2 26.5 36.5 30.5 36.5 35C36.5 35.8 35.8 36.5 35 36.5H20C19.2 36.5 18.5 35.8 18.5 35Z" fill="#396AFF"/>
      </svg>
    `;
  } else {
    // Life Insurance: Solid Mint Shield Check
    return `
      <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27.5 12C32 15 36 15.5 37.5 16C38 22.5 36.5 28.5 27.5 33.5C18.5 28.5 17 22.5 17.5 16C19 15.5 23 15 27.5 12Z" fill="#16DBCC"/>
        <circle cx="27.5" cy="22.5" r="5.2" fill="#FFFFFF"/>
        <polyline points="25.2,22.5 26.8,24.3 29.8,21" stroke="#16DBCC" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      </svg>
    `;
  }
}
