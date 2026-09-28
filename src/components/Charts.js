/* ==========================================================================
   PURE SVG RESPONSIVE INTERACTIVE CHARTS
   Supports Weekly Activity, Expense Statistics, Balance History, & Sparklines
   Adapts smoothly to theme switches (Emerald, Dark, Indigo)
   ========================================================================== */

/**
 * 1. WEEKLY ACTIVITY GROUPED BAR CHART
 */
export function renderWeeklyActivityChart(container, data) {
  if (!container) return;

  const width = 600;
  const height = 240;
  const padding = { top: 20, right: 20, bottom: 40, left: 40 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxVal = 500;
  const yTicks = [0, 100, 200, 300, 400, 500];

  const groupWidth = chartWidth / data.labels.length;
  const barWidth = 14;
  const barGap = 12;

  // Grid lines and labels
  let gridHtml = '';
  yTicks.forEach(tick => {
    const y = padding.top + chartHeight - (tick / maxVal) * chartHeight;
    gridHtml += `
      <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="var(--chart-grid)" stroke-width="1" stroke-dasharray="4,4" />
      <text x="${padding.left - 10}" y="${y + 4}" fill="var(--text-muted)" font-size="12" text-anchor="end" font-family="Inter">${tick}</text>
    `;
  });

  // Bars and x-axis labels
  let barsHtml = '';
  data.labels.forEach((label, i) => {
    const groupX = padding.left + i * groupWidth + (groupWidth - (barWidth * 2 + barGap)) / 2;

    // Withdraw bar (Indigo/Amber)
    const withdrawHeight = (data.withdraw[i] / maxVal) * chartHeight;
    const withdrawY = padding.top + chartHeight - withdrawHeight;

    // Deposit bar (Primary Emerald)
    const depositHeight = (data.deposit[i] / maxVal) * chartHeight;
    const depositY = padding.top + chartHeight - depositHeight;

    barsHtml += `
      <!-- Withdraw Bar -->
      <rect
        class="chart-bar-withdraw"
        x="${groupX}"
        y="${withdrawY}"
        width="${barWidth}"
        height="${withdrawHeight}"
        rx="7"
        fill="var(--chart-secondary)"
        style="cursor: pointer; transition: fill var(--transition-fast);"
        data-val="$${data.withdraw[i]}"
        data-type="Withdraw"
        data-label="${label}"
      />
      <!-- Deposit Bar -->
      <rect
        class="chart-bar-deposit"
        x="${groupX + barWidth + barGap}"
        y="${depositY}"
        width="${barWidth}"
        height="${depositHeight}"
        rx="7"
        fill="var(--chart-primary)"
        style="cursor: pointer; transition: fill var(--transition-fast);"
        data-val="$${data.deposit[i]}"
        data-type="Deposit"
        data-label="${label}"
      />
      <!-- X Label -->
      <text
        x="${groupX + barWidth + barGap / 2}"
        y="${height - 12}"
        fill="var(--text-muted)"
        font-size="13"
        font-weight="500"
        text-anchor="middle"
        font-family="Inter"
      >${label}</text>
    `;
  });

  container.innerHTML = `
    <div class="chart-header-legend">
      <div class="legend-item">
        <span class="legend-dot" style="background-color: var(--chart-secondary);"></span>
        <span>Withdraw</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot" style="background-color: var(--chart-primary);"></span>
        <span>Deposit</span>
      </div>
    </div>
    <div style="position: relative; width: 100%;">
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; overflow: visible;">
        ${gridHtml}
        ${barsHtml}
      </svg>
      <div class="chart-tooltip"></div>
    </div>
  `;

  // Attach tooltips
  bindBarTooltips(container);
}

function bindBarTooltips(container) {
  const tooltip = container.querySelector('.chart-tooltip');
  if (!tooltip) return;

  const bars = container.querySelectorAll('rect');
  bars.forEach(bar => {
    bar.addEventListener('mouseenter', (e) => {
      const val = bar.getAttribute('data-val');
      const type = bar.getAttribute('data-type');
      const label = bar.getAttribute('data-label');
      tooltip.innerHTML = `${label} &bull; ${type}: ${val}`;
      tooltip.classList.add('show');
    });

    bar.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y}px`;
    });

    bar.addEventListener('mouseleave', () => {
      tooltip.classList.remove('show');
    });
  });
}

/**
 * 2. EXPENSE STATISTICS POLAR / PIE CHART
 */
export function renderExpensePieChart(container, data) {
  if (!container) return;

  const size = 260;
  const center = size / 2;
  const radius = 95;

  let total = data.reduce((acc, d) => acc + d.value, 0);
  let startAngle = -Math.PI / 2;

  let slicesHtml = '';
  let labelsHtml = '';

  data.forEach((slice, idx) => {
    const sliceAngle = (slice.value / total) * 2 * Math.PI;
    const endAngle = startAngle + sliceAngle;

    // Small separation gap between slices for ultra modern look
    const angleMid = startAngle + sliceAngle / 2;
    const offset = 6;
    const cx = center + Math.cos(angleMid) * offset;
    const cy = center + Math.sin(angleMid) * offset;

    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy + radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy + radius * Math.sin(endAngle);

    const largeArc = sliceAngle > Math.PI ? 1 : 0;
    const pathD = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    // Percentage Label position
    const labelRadius = radius * 0.65;
    const lx = cx + labelRadius * Math.cos(angleMid);
    const ly = cy + labelRadius * Math.sin(angleMid);

    slicesHtml += `
      <path
        d="${pathD}"
        fill="${slice.color}"
        style="cursor: pointer; transition: transform var(--transition-fast), filter var(--transition-fast);"
        data-label="${slice.label}"
        data-percent="${slice.value}%"
      />
    `;

    labelsHtml += `
      <text
        x="${lx}"
        y="${ly}"
        fill="#ffffff"
        font-size="12"
        font-weight="700"
        text-anchor="middle"
        dominant-baseline="central"
        pointer-events="none"
        font-family="Inter"
      >${slice.value}%</text>
    `;

    startAngle = endAngle;
  });

  container.innerHTML = `
    <div style="position: relative; width: 100%; display: flex; flex-direction: column; align-items: center;">
      <svg viewBox="0 0 ${size} ${size}" style="max-width: 260px; height: auto; overflow: visible;">
        <g class="pie-slices">${slicesHtml}</g>
        <g class="pie-labels">${labelsHtml}</g>
      </svg>
      <div class="chart-tooltip"></div>
      <div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-top: 14px;">
        ${data.map(d => `
          <div class="legend-item" style="font-size: 0.75rem;">
            <span class="legend-dot" style="background-color: ${d.color};"></span>
            <span>${d.label}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Attach hover animations & tooltip
  const tooltip = container.querySelector('.chart-tooltip');
  const paths = container.querySelectorAll('.pie-slices path');
  paths.forEach(p => {
    p.addEventListener('mouseenter', (e) => {
      p.style.filter = 'brightness(1.15)';
      const label = p.getAttribute('data-label');
      const pct = p.getAttribute('data-percent');
      tooltip.innerHTML = `${label}: <strong>${pct}</strong>`;
      tooltip.classList.add('show');
    });

    p.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      tooltip.style.left = `${e.clientX - rect.left}px`;
      tooltip.style.top = `${e.clientY - rect.top}px`;
    });

    p.addEventListener('mouseleave', () => {
      p.style.filter = 'none';
      tooltip.classList.remove('show');
    });
  });
}

/**
 * 3. BALANCE HISTORY SPLINE AREA CHART
 */
export function renderBalanceHistoryChart(container, data) {
  if (!container) return;

  const width = 600;
  const height = 220;
  const padding = { top: 20, right: 30, bottom: 40, left: 45 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxVal = 800;
  const yTicks = [0, 200, 400, 600, 800];

  // Grid lines
  let gridHtml = '';
  yTicks.forEach(tick => {
    const y = padding.top + chartHeight - (tick / maxVal) * chartHeight;
    gridHtml += `
      <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="var(--chart-grid)" stroke-width="1" stroke-dasharray="4,4" />
      <text x="${padding.left - 10}" y="${y + 4}" fill="var(--text-muted)" font-size="12" text-anchor="end" font-family="Inter">${tick}</text>
    `;
  });

  // Calculate points
  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - (d.value / maxVal) * chartHeight;
    return { x, y, month: d.month, value: d.value };
  });

  // Smooth cubic Bezier path
  function getSplinePath(pts) {
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

  const linePathD = getSplinePath(points);
  const areaPathD = `${linePathD} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`;

  // X-axis labels
  let xLabelsHtml = '';
  points.forEach(pt => {
    xLabelsHtml += `
      <text
        x="${pt.x}"
        y="${height - 12}"
        fill="var(--text-muted)"
        font-size="13"
        font-weight="500"
        text-anchor="middle"
        font-family="Inter"
      >${pt.month}</text>
      <!-- Point Circle -->
      <circle
        class="chart-point"
        cx="${pt.x}"
        cy="${pt.y}"
        r="5"
        fill="var(--bg-surface)"
        stroke="var(--chart-primary)"
        stroke-width="3"
        style="cursor: pointer; transition: r var(--transition-fast);"
        data-month="${pt.month}"
        data-val="$${pt.value}"
      />
    `;
  });

  container.innerHTML = `
    <div style="position: relative; width: 100%;">
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; overflow: visible;">
        <defs>
          <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--chart-primary)" stop-opacity="0.35" />
            <stop offset="100%" stop-color="var(--chart-primary)" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        ${gridHtml}
        <!-- Area fill -->
        <path class="chart-spline-area" d="${areaPathD}" fill="url(#balanceGradient)" />
        <!-- Line stroke -->
        <path class="chart-spline-line" d="${linePathD}" fill="none" stroke="var(--chart-primary)" stroke-width="3.5" stroke-linecap="round" />
        ${xLabelsHtml}
      </svg>
      <div class="chart-tooltip"></div>
    </div>
  `;

  // Attach tooltips
  const tooltip = container.querySelector('.chart-tooltip');
  const dots = container.querySelectorAll('.chart-point');
  dots.forEach(dot => {
    dot.addEventListener('mouseenter', () => {
      dot.setAttribute('r', '7');
      const month = dot.getAttribute('data-month');
      const val = dot.getAttribute('data-val');
      tooltip.innerHTML = `${month}: <strong>${val}</strong>`;
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
 * 4. SPARKLINE COMPONENT
 */
export function createSparklineHtml(points, isPositive) {
  const width = 90;
  const height = 28;
  const strokeColor = isPositive ? 'var(--accent-success)' : 'var(--accent-rose)';

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const pts = points.map((val, i) => {
    const x = (i / (points.length - 1)) * (width - 4) + 2;
    const y = height - ((val - min) / range) * (height - 8) - 4;
    return `${x},${y}`;
  }).join(' ');

  return `
    <svg width="${width}" height="${height}" style="overflow: visible;">
      <polyline
        fill="none"
        stroke="${strokeColor}"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        points="${pts}"
      />
    </svg>
  `;
}
