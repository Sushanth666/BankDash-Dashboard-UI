/* ==========================================================================
   PAGE: INVESTMENTS
   Features:
   - 3 Investment KPI cards (Total Invested, Number of Investments, Return Rate)
   - Yearly Investment Trend (Area Curve)
   - Monthly Revenue Visual
   - Trending Stocks & Portfolio Table with SVG sparklines and trade modal
   ========================================================================== */

import { investmentsData } from '../data/mockData.js';
import { createSparklineHtml } from '../components/Charts.js';
import { openModal } from '../components/Modal.js';
import { showToast } from '../components/Toast.js';

export function renderInvestmentsPage(container) {
  container.innerHTML = `
    <div>
      <!-- 3 KPI Cards -->
      <section class="kpi-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
        ${investmentsData.kpis.map(kpi => `
          <div class="kpi-card">
            <div class="kpi-icon-wrap ${kpi.type}">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </div>
            <div class="kpi-info">
              <span class="kpi-label">${kpi.label}</span>
              <span class="kpi-value">${kpi.isPercent ? `${kpi.value}%` : `$${kpi.value.toLocaleString()}`}</span>
              <span class="kpi-trend positive">${kpi.change} year-over-year</span>
            </div>
          </div>
        `).join('')}
      </section>

      <!-- 2 Charts: Yearly Investment & Monthly Revenue -->
      <section class="investments-charts-row">
        <!-- Yearly Investment Chart -->
        <div>
          <div class="section-header">
            <h2 class="section-title">Yearly Investment</h2>
            <span style="font-size: 0.8125rem; color: var(--text-muted);">2021 &ndash; 2026</span>
          </div>
          <div class="widget-box" id="yearly-investment-chart-box">
            <!-- Rendered by SVG below -->
          </div>
        </div>

        <!-- Monthly Revenue Chart -->
        <div>
          <div class="section-header">
            <h2 class="section-title">Monthly Revenue</h2>
            <span style="font-size: 0.8125rem; color: var(--text-muted);">Past 6 Months</span>
          </div>
          <div class="widget-box" id="monthly-revenue-chart-box">
            <!-- Rendered by SVG below -->
          </div>
        </div>
      </section>

      <!-- Trending Stocks & Portfolio Assets Table -->
      <section style="margin-top: 10px;">
        <div class="section-header">
          <h2 class="section-title">Trending Stock & Portfolio Assets</h2>
          <span style="font-size: 0.875rem; color: var(--text-muted);">Real-time Market Feeds</span>
        </div>
        <div class="table-responsive-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>SL No</th>
                <th>Name / Symbol</th>
                <th>Price</th>
                <th>Return Value</th>
                <th>Trend (7D)</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${investmentsData.trendingStocks.map(stock => `
                <tr>
                  <td class="text-mono" style="color: var(--text-muted);">${stock.sl}</td>
                  <td>
                    <div style="font-weight: 600; color: var(--text-primary);">${stock.name}</div>
                    <div class="text-mono" style="font-size: 0.75rem; color: var(--text-muted);">${stock.ticker}</div>
                  </td>
                  <td class="text-mono" style="font-weight: 600;">$${stock.price.toFixed(2)}</td>
                  <td style="font-weight: 700;" class="${stock.positive ? 'badge-positive' : 'badge-negative'}">
                    ${stock.returnVal}
                  </td>
                  <td>
                    ${createSparklineHtml(stock.sparkline, stock.positive)}
                  </td>
                  <td style="text-align: right;">
                    <button class="btn btn-outline btn-pill trade-stock-btn" data-ticker="${stock.ticker}" data-price="${stock.price}" style="height: 32px; padding: 0 16px; font-size: 0.8125rem;">
                      Trade
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

  // Render Yearly Investment Area Chart
  const yearlyBox = container.querySelector('#yearly-investment-chart-box');
  renderYearlyTrendChart(yearlyBox, investmentsData.yearlyTrend);

  // Render Monthly Revenue Bar Chart
  const revenueBox = container.querySelector('#monthly-revenue-chart-box');
  renderMonthlyRevenueChart(revenueBox, investmentsData.monthlyRevenue);

  // Trade modal triggers
  const tradeBtns = container.querySelectorAll('.trade-stock-btn');
  tradeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const ticker = btn.getAttribute('data-ticker');
      const price = parseFloat(btn.getAttribute('data-price'));

      openModal({
        title: `Execute Order: ${ticker}`,
        contentHtml: `
          <div style="margin-bottom: 16px;">
            <div style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary);">$${price.toFixed(2)} USD</div>
            <div style="font-size: 0.8125rem; color: var(--text-muted);">Real-time Nasdaq settlement spread: 0.01%</div>
          </div>
          <div class="form-group">
            <label class="form-label">Order Type</label>
            <select class="form-select" id="order-type">
              <option value="buy">Market Buy</option>
              <option value="sell">Market Sell</option>
              <option value="limit">Limit Order</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Number of Shares</label>
            <input type="number" class="form-input" id="order-shares" value="10" min="1" step="1" />
          </div>
          <div style="background-color: var(--bg-surface-subtle); padding: 14px; border-radius: var(--radius-md); font-size: 0.875rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
              <span>Estimated Value:</span>
              <strong id="estimated-total">$${(price * 10).toFixed(2)}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; color: var(--text-muted); font-size: 0.75rem;">
              <span>Commission:</span>
              <span style="color: var(--accent-success); font-weight: 600;">$0.00 (Zero Fee)</span>
            </div>
          </div>
        `,
        confirmText: 'Submit Order',
        cancelText: 'Cancel',
        onConfirm: (modalBackdrop) => {
          const shares = modalBackdrop.querySelector('#order-shares').value;
          const orderType = modalBackdrop.querySelector('#order-type').value;
          showToast('Order Submitted', `Successfully placed ${orderType.toUpperCase()} order for ${shares} shares of ${ticker}.`, 'success');
          return true;
        }
      });

      // Update total on input
      const sharesInput = document.querySelector('#order-shares');
      const totalEl = document.querySelector('#estimated-total');
      if (sharesInput && totalEl) {
        sharesInput.addEventListener('input', () => {
          const count = parseFloat(sharesInput.value) || 0;
          totalEl.innerText = `$${(count * price).toFixed(2)}`;
        });
      }
    });
  });
}

function renderYearlyTrendChart(container, data) {
  const width = 500;
  const height = 220;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxVal = 160000;

  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - (d.value / maxVal) * chartHeight;
    return { x, y, label: d.year, val: d.value };
  });

  const lineD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${lineD} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`;

  const xLabels = points.map(p => `
    <text x="${p.x}" y="${height - 12}" fill="var(--text-muted)" font-size="12" text-anchor="middle" font-family="Inter">${p.label}</text>
    <circle cx="${p.x}" cy="${p.y}" r="4" fill="var(--bg-surface)" stroke="var(--primary)" stroke-width="3" />
  `).join('');

  container.innerHTML = `
    <div style="width: 100%;">
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; overflow: visible;">
        <defs>
          <linearGradient id="invGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--chart-primary)" stop-opacity="0.3" />
            <stop offset="100%" stop-color="var(--chart-primary)" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        <path d="${areaD}" fill="url(#invGrad)" />
        <path d="${lineD}" fill="none" stroke="var(--chart-primary)" stroke-width="3" stroke-linecap="round" />
        ${xLabels}
      </svg>
    </div>
  `;
}

function renderMonthlyRevenueChart(container, data) {
  const width = 500;
  const height = 220;
  const padding = { top: 20, right: 20, bottom: 40, left: 45 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxVal = 16000;

  const barWidth = 24;
  const groupWidth = chartWidth / data.length;

  let barsHtml = '';
  data.forEach((d, i) => {
    const x = padding.left + i * groupWidth + (groupWidth - barWidth) / 2;
    const h = (d.value / maxVal) * chartHeight;
    const y = padding.top + chartHeight - h;

    barsHtml += `
      <rect x="${x}" y="${y}" width="${barWidth}" height="${h}" rx="6" fill="var(--chart-secondary)" />
      <text x="${x + barWidth / 2}" y="${height - 12}" fill="var(--text-muted)" font-size="12" text-anchor="middle" font-family="Inter">${d.month}</text>
    `;
  });

  container.innerHTML = `
    <div style="width: 100%;">
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; overflow: visible;">
        ${barsHtml}
      </svg>
    </div>
  `;
}
