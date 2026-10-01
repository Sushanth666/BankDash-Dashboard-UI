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
          <div class="investments-kpi-card">
            <div class="investments-kpi-icon" style="background-color: ${kpi.iconBg};">
              ${getInvestmentsKpiIconSvg(kpi.iconType)}
            </div>
            <div class="investments-kpi-info">
              <span class="investments-kpi-label">${kpi.label}</span>
              <span class="investments-kpi-value">${kpi.value}</span>
            </div>
          </div>
        `).join('')}
      </section>

      <!-- ROW 2: YEARLY TOTAL INVESTMENT & MONTHLY REVENUE -->
      <section class="investments-charts-row" style="margin-top: 28px;">
        <!-- Left: Yearly Total Investment -->
        <div class="investments-col">
          <div class="section-header">
            <h2 class="section-title">Yearly Total Investment</h2>
          </div>
          <div class="widget-box" id="yearly-total-inv-box">
            <!-- Rendered by SVG chart below -->
          </div>
        </div>

        <!-- Right: Monthly Revenue -->
        <div class="investments-col">
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
        <div class="investments-col">
          <div class="section-header">
            <h2 class="section-title">My Investment</h2>
          </div>
          <div class="my-investments-list">
            ${investmentsData.myInvestments.map(inv => `
              <div class="my-investment-card">
                <!-- Col 1: Icon + Name & Category -->
                <div class="my-inv-left">
                  <div class="my-inv-icon" style="background-color: transparent; color: ${inv.iconColor};">
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
        <div class="investments-col">
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

function getInvestmentsKpiIconSvg(iconType) {
  if (iconType === 'bag') {
    return `
      <svg width="44" height="44" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.5 10.5 C10.8 9.2 9.2 7.8 10 6.6 C10.8 5.6 12 7.2 12.8 8.2 C13.4 6.8 14.2 5 15 5 C15.8 5 16.6 6.8 17.2 8.2 C18 7.2 19.2 5.6 20 6.6 C20.8 7.8 19.2 9.2 18.5 10.5 C21.6 11.8 24 14.5 24 18 C24 22.5 20.2 25.5 15 25.5 C9.8 25.5 6 22.5 6 18 C6 14.5 8.4 11.8 11.5 10.5 Z" fill="#16DBCC"/>
        <text x="15" y="18.5" font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" font-size="11.5" font-weight="800" fill="#FFFFFF" text-anchor="middle" dominant-baseline="central">$</text>
      </svg>
    `;
  } else if (iconType === 'pie-split') {
    return `
      <svg width="44" height="44" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 16 3.5 A 11.5 11.5 0 0 1 16 26.5 Z" fill="#FF82AC"/>
        <text x="21" y="15" font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" font-size="10.5" font-weight="800" fill="#FFFFFF" text-anchor="middle" dominant-baseline="central">$</text>
        <path d="M 14 3.5 A 11.5 11.5 0 0 0 3.5 14 L 14 14 Z" fill="#FF82AC"/>
        <text x="9.5" y="9.5" font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" font-size="7.5" font-weight="800" fill="#FFFFFF" text-anchor="middle" dominant-baseline="central">%</text>
        <path d="M 3.5 16 A 11.5 11.5 0 0 0 14 26.5 L 14 16 Z" fill="#FF82AC"/>
      </svg>
    `;
  } else {
    return `
      <svg width="44" height="44" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 8.5 14.5 C 8.5 12 10 11 13 11 L 17.5 11" stroke="#2D60FF" stroke-width="3.4" stroke-linecap="round"/>
        <polygon points="16.5,6.8 23,11 16.5,15.2" fill="#2D60FF" stroke="#2D60FF" stroke-width="1" stroke-linejoin="round"/>
        <path d="M 21.5 15.5 C 21.5 18 20 19 17 19 L 12.5 19" stroke="#2D60FF" stroke-width="3.4" stroke-linecap="round"/>
        <polygon points="13.5,14.8 7,19 13.5,23.2" fill="#2D60FF" stroke="#2D60FF" stroke-width="1" stroke-linejoin="round"/>
      </svg>
    `;
  }
}

function getBrandIconSvg(iconType) {
  if (iconType === 'apple') {
    return `<img src="/assets/icons/mi-apple.png" alt="Apple Store" style="width: 50px; height: 50px; border-radius: 18px; display: block; object-fit: cover;" />`;
  } else if (iconType === 'google') {
    return `<img src="/assets/icons/mi-google.png" alt="Samsung Mobile" style="width: 50px; height: 50px; border-radius: 18px; display: block; object-fit: cover;" />`;
  } else {
    return `<img src="/assets/icons/mi-tesla.png" alt="Tesla Motors" style="width: 50px; height: 50px; border-radius: 18px; display: block; object-fit: cover;" />`;
  }
}
