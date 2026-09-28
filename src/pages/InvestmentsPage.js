/* ==========================================================================
   PAGE: INVESTMENTS
   Pixel-perfect match to BankDash Figma Investments design:
   - Row 1: 3 KPI Cards (Total Invested Amount, Number of Investments, Rate of Return)
   - Row 2: Yearly Total Investment (left) + Monthly Revenue (right)
   - Row 3: My Investment (left) + Trending Stock (right)
   ========================================================================== */

import { investmentsData } from '../data/mockData.js';

export function renderInvestmentsPage(container) {
  container.innerHTML = `
    <div class="investments-page-container">
      <!-- ROW 1: 3 KPI CARDS -->
      <section class="investments-kpi-grid">
        ${investmentsData.kpis.map(kpi => `
          <div class="kpi-card investments-kpi-card">
            <div class="kpi-icon-wrap ${kpi.type}">
              ${getKpiIconSvg(kpi.icon)}
            </div>
            <div class="kpi-info">
              <span class="kpi-label">${kpi.label}</span>
              <span class="kpi-value">${kpi.value}</span>
            </div>
          </div>
        `).join('')}
      </section>

      <!-- ROW 2: YEARLY TOTAL INVESTMENT & MONTHLY REVENUE -->
      <section class="investments-charts-row" style="margin-top: 28px;">
        <!-- Left: Yearly Total Investment -->
        <div>
          <div class="section-header">
            <h2 class="section-title">Yearly Total Investment</h2>
          </div>
          <div class="widget-box" id="yearly-total-inv-box">
            <!-- Rendered by SVG chart below -->
          </div>
        </div>

        <!-- Right: Monthly Revenue -->
        <div>
          <div class="section-header">
            <h2 class="section-title">Monthly Revenue</h2>
          </div>
          <div class="widget-box" id="monthly-revenue-box">
            <!-- Rendered by SVG chart below -->
          </div>
        </div>
      </section>

      <!-- ROW 3: MY INVESTMENT (60%) & TRENDING STOCK (40%) -->
      <section class="investments-bottom-row" style="margin-top: 28px;">
        <!-- Left: My Investment Cards -->
        <div>
          <div class="section-header">
            <h2 class="section-title">My Investment</h2>
          </div>
          <div class="my-investments-list">
            ${investmentsData.myInvestments.map(inv => `
              <div class="my-investment-card">
                <!-- Col 1: Icon + Name & Category -->
                <div class="my-inv-left">
                  <div class="my-inv-icon" style="background-color: ${inv.iconBg}; color: ${inv.iconColor};">
                    ${getBrandIconSvg(inv.iconType)}
                  </div>
                  <div>
                    <div class="my-inv-title">${inv.title}</div>
                    <div class="my-inv-subtitle">${inv.category}</div>
                  </div>
                </div>

                <!-- Col 2: Investment Value -->
                <div class="my-inv-col-value">
                  <div class="my-inv-val">${inv.value}</div>
                  <div class="my-inv-sublabel">${inv.valueLabel}</div>
                </div>

                <!-- Col 3: Return Value -->
                <div class="my-inv-col-return">
                  <div class="my-inv-rate ${inv.isPositive ? 'positive' : 'negative'}">
                    ${inv.returnRate}
                  </div>
                  <div class="my-inv-sublabel">${inv.returnLabel}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right: Trending Stock Table -->
        <div>
          <div class="section-header">
            <h2 class="section-title">Trending Stock</h2>
          </div>
          <div class="trending-stock-box">
            <table class="trending-stock-table">
              <thead>
                <tr>
                  <th style="width: 15%;">SL No</th>
                  <th style="width: 40%;">Name</th>
                  <th style="width: 25%;">Price</th>
                  <th style="width: 20%; text-align: right;">Return</th>
                </tr>
              </thead>
              <tbody>
                ${investmentsData.trendingStocks.map(stock => `
                  <tr>
                    <td class="text-mono" style="color: var(--text-muted);">${stock.sl}</td>
                    <td style="font-weight: 500; color: var(--text-primary);">${stock.name}</td>
                    <td style="font-weight: 500; color: var(--text-primary);">${stock.price}</td>
                    <td style="font-weight: 700; text-align: right;" class="${stock.positive ? 'badge-positive' : 'badge-negative'}">
                      ${stock.returnVal}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  `;

  // Render Left Chart: Yearly Total Investment
  const yearlyBox = container.querySelector('#yearly-total-inv-box');
  renderYearlyTotalInvestmentChart(yearlyBox, investmentsData.yearlyTotalInvestment);

  // Render Right Chart: Monthly Revenue
  const revenueBox = container.querySelector('#monthly-revenue-box');
  renderMonthlyRevenueWaveChart(revenueBox, investmentsData.monthlyRevenueCurve);
}

/**
 * 1. Yearly Total Investment Line Chart
 * Matches Figma design:
 * Y-axis: $0, $10,000, $20,000, $30,000, $40,000
 * X-axis: 2016, 2017, 2018, 2019, 2020, 2021
 * Golden Amber line with hollow circular data points
 */
function renderYearlyTotalInvestmentChart(container, data) {
  if (!container) return;

  const width = 560;
  const height = 240;
  const padding = { top: 25, right: 25, bottom: 35, left: 65 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxVal = data.maxVal || 40000;

  // Grid lines
  let gridHtml = '';
  data.yTicks.forEach(tick => {
    const y = padding.top + chartHeight - (tick / maxVal) * chartHeight;
    const label = tick === 0 ? '$0' : `$${tick.toLocaleString()}`;
    gridHtml += `
      <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="var(--chart-grid)" stroke-width="1" stroke-dasharray="4,4" />
      <text x="${padding.left - 12}" y="${y + 4}" fill="var(--text-muted)" font-size="12" text-anchor="end" font-family="Inter">${label}</text>
    `;
  });

  // Calculate points
  const points = data.points.map((pt, i) => {
    const x = padding.left + (i / (data.points.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - (pt.value / maxVal) * chartHeight;
    return { x, y, year: pt.year, value: pt.value };
  });

  const lineD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  let pointsHtml = '';
  points.forEach(p => {
    pointsHtml += `
      <!-- X-axis Label -->
      <text
        x="${p.x}"
        y="${height - 10}"
        fill="var(--text-muted)"
        font-size="12"
        font-weight="500"
        text-anchor="middle"
        font-family="Inter"
      >${p.year}</text>

      <!-- Data Point Circle -->
      <circle
        class="chart-inv-point"
        cx="${p.x}"
        cy="${p.y}"
        r="5"
        fill="var(--bg-surface)"
        stroke="var(--accent-amber)"
        stroke-width="3"
        style="cursor: pointer; transition: r var(--transition-fast);"
        data-year="${p.year}"
        data-val="$${p.value.toLocaleString()}"
      />
    `;
  });

  container.innerHTML = `
    <div style="position: relative; width: 100%;">
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; overflow: visible;">
        ${gridHtml}
        <!-- Trend line -->
        <path d="${lineD}" fill="none" stroke="var(--accent-amber)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
        ${pointsHtml}
      </svg>
      <div class="chart-tooltip"></div>
    </div>
  `;

  // Attach tooltips
  const tooltip = container.querySelector('.chart-tooltip');
  const dots = container.querySelectorAll('.chart-inv-point');
  dots.forEach(dot => {
    dot.addEventListener('mouseenter', () => {
      dot.setAttribute('r', '7');
      const year = dot.getAttribute('data-year');
      const val = dot.getAttribute('data-val');
      tooltip.innerHTML = `${year}: <strong>${val}</strong>`;
      tooltip.classList.add('show');
    });

    dot.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      tooltip.style.left = `${e.clientX - rect.left}px`;
      tooltip.style.top = `${e.clientY - rect.top}px`;
    });

    dot.addEventListener('mouseleave', () => {
      dot.setAttribute('r', '5');
      tooltip.classList.remove('show');
    });
  });
}

/**
 * 2. Monthly Revenue Smooth Wave Curve
 * Matches Figma design:
 * Smooth undulating spline line in vibrant Cyan/Teal
 * Y-axis: $0, $10,000, $20,000, $30,000, $40,000
 * X-axis: 2016, 2017, 2018, 2019, 2020, 2021
 */
function renderMonthlyRevenueWaveChart(container, data) {
  if (!container) return;

  const width = 560;
  const height = 240;
  const padding = { top: 25, right: 25, bottom: 35, left: 65 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxVal = data.maxVal || 40000;

  // Grid lines
  let gridHtml = '';
  data.yTicks.forEach(tick => {
    const y = padding.top + chartHeight - (tick / maxVal) * chartHeight;
    const label = tick === 0 ? '$0' : `$${tick.toLocaleString()}`;
    gridHtml += `
      <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="var(--chart-grid)" stroke-width="1" stroke-dasharray="4,4" />
      <text x="${padding.left - 12}" y="${y + 4}" fill="var(--text-muted)" font-size="12" text-anchor="end" font-family="Inter">${label}</text>
    `;
  });

  // Calculate curve points
  const points = data.controlPoints.map(p => ({
    x: padding.left + p.x * chartWidth,
    y: padding.top + chartHeight - (p.y / maxVal) * chartHeight,
    val: p.y
  }));

  // Cubic spline generator
  function getSplineD(pts) {
    if (pts.length < 2) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  }

  const waveD = getSplineD(points);

  // X-axis year labels
  let xLabelsHtml = '';
  data.years.forEach((yr, i) => {
    const x = padding.left + (i / (data.years.length - 1)) * chartWidth;
    xLabelsHtml += `
      <text
        x="${x}"
        y="${height - 10}"
        fill="var(--text-muted)"
        font-size="12"
        font-weight="500"
        text-anchor="middle"
        font-family="Inter"
      >${yr}</text>
    `;
  });

  container.innerHTML = `
    <div style="position: relative; width: 100%;">
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; overflow: visible;">
        ${gridHtml}
        <!-- Smooth wave curve in Cyan/Teal -->
        <path d="${waveD}" fill="none" stroke="var(--accent-cyan)" stroke-width="3.5" stroke-linecap="round" />
        ${xLabelsHtml}
      </svg>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// SVG Icon Helpers
// ---------------------------------------------------------------------------

function getKpiIconSvg(icon) {
  if (icon === 'wallet') {
    // Money bag matching Card 1
    return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h1l1-3c0-2-1.5-3.5-3-3.5h-1c0-.5 0-1-.5-1.5"></path>
      <circle cx="16" cy="10" r="1"></circle>
    </svg>`;
  } else if (icon === 'pie') {
    // Pie chart / circle divided matching Card 2
    return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
      <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
    </svg>`;
  } else {
    // Repeat / sync arrows matching Card 3
    return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>`;
  }
}

function getBrandIconSvg(iconType) {
  if (iconType === 'apple') {
    // Apple logo
    return `<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.64-.78 1.08-1.87.96-2.96-.93.04-2.07.62-2.73 1.4-.58.67-1.09 1.77-.95 2.83 1.04.08 2.08-.51 2.72-1.27z"/>
    </svg>`;
  } else if (iconType === 'google') {
    // Google "G" logo
    return `<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a9.96 9.96 0 0 1 6.29 2.22l-2.6 2.6A6.29 6.29 0 0 0 12 5.71c-3.48 0-6.29 2.81-6.29 6.29s2.81 6.29 6.29 6.29c3.16 0 5.76-2.32 6.21-5.36H12v-3.71h9.92c.11.64.17 1.31.17 2 0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"/>
    </svg>`;
  } else {
    // Tesla "T" logo
    return `<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4.5c2.6 0 4.9.7 6.8 1.8l.8-2.2C17.2 2.9 14.7 2.3 12 2.3s-5.2.6-7.6 1.8l.8 2.2c1.9-1.1 4.2-1.8 6.8-1.8zm8.6 3.1c-.2-.1-.5-.2-.8-.3-.5 1.5-1.7 2.6-3.3 3.1l1.5 8.6c1.8-1.4 3-3.6 3.2-6.1.1-1.9-.3-3.7-.6-5.3zM3.4 7.6c-.3 1.6-.7 3.4-.6 5.3.2 2.5 1.4 4.7 3.2 6.1l1.5-8.6c-1.6-.5-2.8-1.6-3.3-3.1-.3.1-.6.2-.8.3zm7.6 3.9h2v10.2h-2V11.5z"/>
    </svg>`;
  }
}
