/* ==========================================================================
   PAGE: SERVICES
   Features:
   - High-end bank services catalog
   - Category filter pills
   - Service cards with status, action buttons, and modal dialogs
   ========================================================================== */

import { servicesData } from '../data/mockData.js';
import { openModal } from '../components/Modal.js';
import { showToast } from '../components/Toast.js';

export function renderServicesPage(container) {
  let activeFilter = 'All';

  function renderCards() {
    const listEl = container.querySelector('#services-cards-grid');
    if (!listEl) return;

    listEl.innerHTML = servicesData.map(srv => `
      <div class="service-card">
        <div>
          <div class="service-icon-box" style="background-color: var(--primary-tint); color: var(--primary);">
            ${getServiceIcon(srv.icon)}
          </div>
          <div class="service-card-title">${srv.title}</div>
          <div class="service-card-desc">${srv.desc}</div>
        </div>
        <div class="service-card-footer">
          <span class="service-badge">${srv.badge}</span>
          <button class="btn btn-outline btn-pill view-service-btn" data-srv-id="${srv.id}" style="height: 32px; padding: 0 16px; font-size: 0.8125rem;">
            View Details
          </button>
        </div>
      </div>
    `).join('');

    attachServiceEvents();
  }

  container.innerHTML = `
    <div>
      <div class="section-header">
        <div>
          <h2 class="section-title">Banking & Financial Services</h2>
          <span style="font-size: 0.875rem; color: var(--text-muted);">Personalized tier-level institutional privileges</span>
        </div>
      </div>

      <!-- Services Grid -->
      <div class="services-highlight-grid" id="services-cards-grid">
        <!-- Rendered dynamically -->
      </div>
    </div>
  `;

  renderCards();

  function attachServiceEvents() {
    const btns = container.querySelectorAll('.view-service-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const srvId = btn.getAttribute('data-srv-id');
        const srv = servicesData.find(s => s.id === srvId);
        if (!srv) return;

        openModal({
          title: srv.title,
          contentHtml: `
            <div style="margin-bottom: 20px;">
              <span class="service-badge" style="font-size: 0.875rem;">${srv.badge}</span>
              <p style="margin-top: 12px; color: var(--text-secondary); line-height: 1.6;">${srv.desc}</p>
            </div>
            <div style="background-color: var(--bg-surface-subtle); border-radius: var(--radius-md); padding: 18px; margin-bottom: 16px;">
              <div style="font-size: 0.875rem; font-weight: 600; color: var(--text-primary); margin-bottom: 8px;">Service Specifications:</div>
              <ul style="padding-left: 20px; font-size: 0.8125rem; color: var(--text-muted); line-height: 1.6;">
                <li>Institutional encryption and FDIC multi-account coverage</li>
                <li>Real-time automated webhook alerts and ledger syncing</li>
                <li>Zero cancellation fees and full dedicated account rep</li>
              </ul>
            </div>
          `,
          confirmText: 'Activate Service',
          cancelText: 'Close',
          onConfirm: () => {
            showToast('Service Activated', `${srv.title} is now active on your BankDash account.`, 'success');
            return true;
          }
        });
      });
    });
  }
}

function getServiceIcon(icon) {
  if (icon === 'shield') {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>`;
  } else if (icon === 'cart') {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>`;
  } else if (icon === 'lock') {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>`;
  } else if (icon === 'globe') {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>`;
  } else {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
      <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>`;
  }
}
