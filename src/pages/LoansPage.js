/* ==========================================================================
   PAGE: LOANS
   Pixel-perfect match to BankDash Figma Loans design:
   - 4 Loans KPI Summary Cards (Personal, Corporate, Business, Custom)
   - Active Loans Overview Table with 8 loans + Total summary row
   - Interactive Repay Modal with instant balance deduction & toast
   ========================================================================== */

import { loansData } from '../data/mockData.js';
import { openModal } from '../components/Modal.js';
import { showToast } from '../components/Toast.js';

export function renderLoansPage(container) {
  container.innerHTML = `
    <div class="loans-page-container">
      <!-- ROW 1: 4 LOAN KPI SUMMARY CARDS -->
      <section class="loans-kpi-grid">
        ${loansData.kpis.map(kpi => `
          <div class="loans-kpi-card">
            <div class="loans-kpi-icon" style="background-color: ${kpi.iconBg}; color: ${kpi.iconColor};">
              ${getLoanKpiIconSvg(kpi.iconType)}
            </div>
            <div class="loans-kpi-info">
              <span class="loans-kpi-label">${kpi.label}</span>
              <span class="loans-kpi-value">${kpi.value}</span>
            </div>
          </div>
        `).join('')}
      </section>

      <!-- ROW 2: ACTIVE LOANS OVERVIEW TABLE -->
      <section style="margin-top: 32px;">
        <div class="section-header">
          <h2 class="section-title">Active Loans Overview</h2>
        </div>

        <div class="loans-table-card">
          <div class="table-responsive-wrapper">
            <table class="loans-table">
              <thead>
                <tr>
                  <th style="width: 10%;">SL No</th>
                  <th style="width: 16%;">Loan Money</th>
                  <th style="width: 16%;">Left to repay</th>
                  <th style="width: 16%;">Duration</th>
                  <th style="width: 14%;">Interest rate</th>
                  <th style="width: 16%;">Installment</th>
                  <th style="width: 12%; text-align: right;">Repay</th>
                </tr>
              </thead>
              <tbody>
                ${loansData.activeLoans.map((loan, idx) => `
                  <tr>
                    <td class="loans-td-sl">${loan.sl}</td>
                    <td class="loans-td-money">${loan.money}</td>
                    <td class="loans-td-left">${loan.left}</td>
                    <td class="loans-td-duration">${loan.duration}</td>
                    <td class="loans-td-rate">${loan.rate}</td>
                    <td class="loans-td-inst">${loan.installment}</td>
                    <td style="text-align: right;">
                      <button
                        class="loans-repay-btn ${loan.isFirst ? 'active' : ''}"
                        data-index="${idx}"
                        data-sl="${loan.sl}"
                        data-money="${loan.money}"
                        data-left="${loan.left}"
                        data-raw-left="${loan.rawLeft}"
                        data-inst="${loan.installment}"
                        data-raw-inst="${loan.rawInst}"
                      >
                        Repay
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
              <tfoot>
                <tr class="loans-total-row">
                  <td class="loans-total-text">${loansData.total.sl}</td>
                  <td class="loans-total-val">${loansData.total.money}</td>
                  <td class="loans-total-val">${loansData.total.left}</td>
                  <td></td>
                  <td></td>
                  <td class="loans-total-val">${loansData.total.installment}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>
    </div>
  `;

  // Bind Repay Modal Actions
  const repayButtons = container.querySelectorAll('.loans-repay-btn');
  repayButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const sl = btn.getAttribute('data-sl');
      const money = btn.getAttribute('data-money');
      const left = btn.getAttribute('data-left');
      const rawLeft = parseFloat(btn.getAttribute('data-raw-left')) || 40500;
      const inst = btn.getAttribute('data-inst');
      const rawInst = parseFloat(btn.getAttribute('data-raw-inst')) || 2000;
      const idx = parseInt(btn.getAttribute('data-index'), 10);

      openModal({
        title: `Repay Loan ${sl} (${money})`,
        contentHtml: `
          <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 18px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.9375rem;">
              <span style="color: var(--text-muted);">Total Principal:</span>
              <strong style="color: var(--text-primary);">${money}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.9375rem;">
              <span style="color: var(--text-muted);">Remaining Balance:</span>
              <strong style="color: var(--accent-rose); font-size: 1.125rem;">${left}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.9375rem;">
              <span style="color: var(--text-muted);">Standard Installment:</span>
              <span style="color: var(--text-primary); font-weight: 600;">${inst}</span>
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 14px;">
            <label class="form-label">Payment Amount ($)</label>
            <input type="number" class="form-input" id="loan-repay-input-amount" value="${rawInst}" min="50" max="${rawLeft}" />
          </div>

          <div class="form-group">
            <label class="form-label">Debit Source Account</label>
            <select class="form-select" id="loan-repay-source">
              <option selected>Primary Checking Account (Balance: $15,850)</option>
              <option>Corporate Savings Account (Balance: $48,200)</option>
              <option>DBL Bank Premier Card (Limit: $25,000)</option>
            </select>
          </div>
        `,
        confirmText: 'Confirm Repayment',
        cancelText: 'Cancel',
        onConfirm: () => {
          const inputEl = document.querySelector('#loan-repay-input-amount');
          const paidAmount = parseFloat(inputEl ? inputEl.value : rawInst) || rawInst;

          // Update remaining balance in mockData
          const updatedLeft = Math.max(0, rawLeft - paidAmount);
          loansData.activeLoans[idx].rawLeft = updatedLeft;
          loansData.activeLoans[idx].left = `$${updatedLeft.toLocaleString()}`;

          showToast(
            'Payment Completed',
            `Successfully processed $${paidAmount.toLocaleString()} repayment for Loan ${sl}.`,
            'success'
          );

          // Re-render to reflect live updated balances
          renderLoansPage(container);
          return true;
        }
      });
    });
  });
}

// ---------------------------------------------------------------------------
// SVG Helper for Loan KPI Icons
// ---------------------------------------------------------------------------
function getLoanKpiIconSvg(type) {
  if (type === 'user') {
    // Personal Loans User Icon
    return `
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    `;
  } else if (type === 'briefcase') {
    // Corporate Loans Briefcase Icon
    return `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    `;
  } else if (type === 'chart') {
    // Business Loans Growth Chart Icon
    return `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="20" x2="18" y2="8"></line>
        <line x1="12" y1="20" x2="12" y2="13"></line>
        <line x1="6" y1="20" x2="6" y2="16"></line>
      </svg>
    `;
  } else {
    // Custom Loans Crossed Tools Icon
    return `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    `;
  }
}
