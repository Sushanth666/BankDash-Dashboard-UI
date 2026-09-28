/* ==========================================================================
   PAGE: LOANS
   Features:
   - 4 Loans KPI Summary Cards (Personal, Corporate, Business, Custom)
   - Active Loans Overview Table with status pills and actions
   - Interactive Repay Modal and Apply for Loan Modal
   ========================================================================== */

import { loansData } from '../data/mockData.js';
import { openModal } from '../components/Modal.js';
import { showToast } from '../components/Toast.js';

export function renderLoansPage(container) {
  container.innerHTML = `
    <div>
      <!-- 4 Loan Summary Cards -->
      <section class="kpi-grid">
        ${loansData.kpis.map(kpi => `
          <div class="kpi-card">
            <div class="kpi-icon-wrap ${kpi.type}">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                <circle cx="12" cy="12" r="2"></circle>
                <path d="M6 12h.01M18 12h.01"></path>
              </svg>
            </div>
            <div class="kpi-info">
              <span class="kpi-label">${kpi.label}</span>
              <span class="kpi-value">$${kpi.value.toLocaleString()}</span>
              <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">
                Est. ${kpi.monthly}
              </span>
            </div>
          </div>
        `).join('')}
      </section>

      <!-- Active Loans Overview Table Section -->
      <section style="margin-top: 36px;">
        <div class="section-header">
          <h2 class="section-title">Active Loans Overview</h2>
          <button class="btn btn-primary btn-pill" id="apply-loan-btn" style="height: 38px; padding: 0 18px; font-size: 0.875rem;">
            + Apply for Loan
          </button>
        </div>

        <div class="table-responsive-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>SL No</th>
                <th>Loan ID</th>
                <th>Loan Money</th>
                <th>Left to Repay</th>
                <th>Duration</th>
                <th>Interest Rate</th>
                <th>Installment / Month</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${loansData.activeLoans.map(loan => `
                <tr>
                  <td class="text-mono" style="color: var(--text-muted);">${loan.sl}</td>
                  <td class="text-mono" style="font-weight: 600; color: var(--text-primary);">${loan.loanId}</td>
                  <td class="text-mono" style="font-weight: 600;">$${loan.money.toLocaleString()}</td>
                  <td class="text-mono" style="color: var(--accent-rose); font-weight: 600;">$${loan.left.toLocaleString()}</td>
                  <td>${loan.duration}</td>
                  <td>${loan.rate}</td>
                  <td class="text-mono" style="font-weight: 600;">$${loan.installment.toLocaleString()} / mo</td>
                  <td style="text-align: right;">
                    <button class="btn btn-outline btn-pill repay-loan-btn" data-loan-id="${loan.loanId}" data-left="${loan.left}" data-inst="${loan.installment}" style="height: 32px; padding: 0 16px; font-size: 0.8125rem;">
                      Repay
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `;

  // Apply for loan modal
  const applyBtn = container.querySelector('#apply-loan-btn');
  applyBtn.addEventListener('click', () => {
    openModal({
      title: 'Apply for Commercial or Personal Loan',
      contentHtml: `
        <div class="form-group">
          <label class="form-label">Loan Type</label>
          <select class="form-select" id="loan-apply-type">
            <option>Personal Clean Loan (8.5% APR)</option>
            <option>Corporate Line of Credit (6.2% APR)</option>
            <option>Small Business Expansion Loan (7.0% APR)</option>
            <option>Equipment Financing (5.8% APR)</option>
          </select>
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Requested Principal ($)</label>
            <input type="number" class="form-input" id="loan-apply-amount" value="50000" min="1000" />
          </div>
          <div class="form-group">
            <label class="form-label">Tenure (Months)</label>
            <select class="form-select" id="loan-apply-tenure">
              <option value="12">12 Months</option>
              <option value="24" selected>24 Months</option>
              <option value="36">36 Months</option>
              <option value="60">60 Months</option>
            </select>
          </div>
        </div>
        <div style="background-color: var(--bg-surface-subtle); padding: 14px; border-radius: var(--radius-md); font-size: 0.875rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Estimated Monthly Installment:</span>
            <strong style="color: var(--primary);">$2,220.50 / mo</strong>
          </div>
          <span style="font-size: 0.75rem; color: var(--text-muted);">Instant credit check & same-day disbursement.</span>
        </div>
      `,
      confirmText: 'Submit Application',
      cancelText: 'Cancel',
      onConfirm: () => {
        showToast('Application Submitted', 'Your loan application is under instant automated underwriting.', 'success');
        return true;
      }
    });
  });

  // Repay modal
  const repayBtns = container.querySelectorAll('.repay-loan-btn');
  repayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const loanId = btn.getAttribute('data-loan-id');
      const left = parseFloat(btn.getAttribute('data-left'));
      const inst = parseFloat(btn.getAttribute('data-inst'));

      openModal({
        title: `Repay Installment for ${loanId}`,
        contentHtml: `
          <div style="margin-bottom: 16px;">
            <div style="font-size: 0.875rem; color: var(--text-muted);">Current Outstanding Balance:</div>
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--text-primary);">$${left.toLocaleString()} USD</div>
          </div>
          <div class="form-group">
            <label class="form-label">Repayment Amount ($)</label>
            <input type="number" class="form-input" id="repay-amount" value="${inst}" min="10" max="${left}" />
          </div>
          <div class="form-group">
            <label class="form-label">Deduct From Account</label>
            <select class="form-select">
              <option>Primary Checking Account (Balance: $12,750)</option>
              <option>Corporate Savings Account (Balance: $34,800)</option>
            </select>
          </div>
        `,
        confirmText: 'Pay Now',
        cancelText: 'Cancel',
        onConfirm: () => {
          showToast('Payment Successful', `Successfully settled installment of $${inst} for ${loanId}.`, 'success');
          return true;
        }
      });
    });
  });
}
