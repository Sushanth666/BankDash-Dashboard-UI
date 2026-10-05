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
import { animateAllCounters } from '../utils/animations.js';

export function renderLoansPage(container) {
  container.innerHTML = `
    <div class="loans-page-container">
      <!-- ROW 1: 4 LOAN KPI SUMMARY CARDS -->
      <section class="loans-kpi-grid">
        ${loansData.kpis.map((kpi, idx) => `
          <div class="loans-kpi-card loans-kpi-card-${kpi.iconType}">
            <div class="loans-kpi-icon" style="background-color: transparent;">
              ${getLoanKpiIconSvg(kpi.iconType)}
            </div>
            <div class="loans-kpi-info">
              <span class="loans-kpi-label">${kpi.label}</span>
              <span class="loans-kpi-value ${kpi.value.includes('$') ? '' : 'loans-kpi-action'}">${kpi.value}</span>
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
          <table class="loans-table">
            <thead>
              <tr>
                <th class="loans-th-sl" style="width: 8%;">SL No</th>
                <th class="loans-th-money" style="width: 15%;">Loan Money</th>
                <th class="loans-th-left" style="width: 15%;">Left to repay</th>
                <th class="loans-th-duration" style="width: 15%;">Duration</th>
                <th class="loans-th-rate" style="width: 15%;">Interest rate</th>
                <th class="loans-th-inst" style="width: 17%;">Installment</th>
                <th class="loans-th-repay" style="width: 15%;">Repay</th>
              </tr>
            </thead>
            <tbody>
              ${loansData.activeLoans.map((loan, idx) => `
                <tr class="loans-table-row">
                  <td class="loans-td-sl">${loan.sl}</td>
                  <td class="loans-td-money">${loan.money}</td>
                  <td class="loans-td-left">${loan.left}</td>
                  <td class="loans-td-duration">${loan.duration}</td>
                  <td class="loans-td-rate">${loan.rate}</td>
                  <td class="loans-td-inst">${loan.installment}</td>
                  <td class="loans-td-repay">
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
                <td class="loans-total-text loans-td-sl">${loansData.total.sl}</td>
                <td class="loans-total-val loans-td-money">
                  <span class="loans-mobile-total-label">Total</span>
                  ${loansData.total.money}
                </td>
                <td class="loans-total-val loans-td-left">${loansData.total.left}</td>
                <td class="loans-td-duration"></td>
                <td class="loans-td-rate"></td>
                <td class="loans-total-val loans-td-inst">${loansData.total.installment}</td>
                <td class="loans-td-repay"></td>
              </tr>
            </tfoot>
          </table>
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

  // Interactive Loan rows
  const loanRows = container.querySelectorAll('.loans-table-row');
  loanRows.forEach((row, idx) => {
    const loan = loansData.activeLoans[idx];
    if (loan) {
      row.style.cursor = 'pointer';
      row.setAttribute('title', `Click to view Loan ${loan.sl} details`);
      row.addEventListener('click', (e) => {
        if (e.target.closest('.loans-repay-btn')) return;
        showToast(`Loan ${loan.sl} (${loan.money})`, `Left to repay: ${loan.left} • Rate: ${loan.rate}`, 'info');
      });
    }
  });

  // Trigger smooth numeric counter animations on KPI values and loans table
  animateAllCounters(container);
}

// ---------------------------------------------------------------------------
// SVG Helper for Loan KPI Icons
// ---------------------------------------------------------------------------
function getLoanKpiIconSvg(type) {
  const iconMap = {
    'user': '/assets/icons/loan-personal.png',
    'briefcase': '/assets/icons/loan-corporate.png',
    'chart': '/assets/icons/loan-business.png',
    'tool': '/assets/icons/loan-custom.png',
  };
  const src = iconMap[type] || '/assets/icons/loan-personal.png';
  return `<img src="${src}?v=1" alt="${type}" class="loan-icon-img loan-icon-${type}" style="width: 100%; height: 100%; object-fit: contain; display: block;" />`;
}
