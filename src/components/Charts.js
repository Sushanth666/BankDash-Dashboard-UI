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
/**
 * 2. EXPENSE STATISTICS POLAR / PIE CHART (Exact match to User Image 1)
 * Exploded pie chart with labels directly inside the wedges:
 * - 30% Entertainment (Dark Navy #343C6A)
 * - 15% Bill Expense (Vivid Orange #FC7900)
 * - 35% Others (Electric Blue #1814F3)
 * - 20% Investment (Hot Magenta Pink #FA00FF)
 */
export function renderExpensePieChart(container, data) {
  if (!container) return;

  const size = 320;
  const center = size / 2; // 160
  const radius = 126;

  // Exact configuration matching Image 1:
  // Slices:
  // 1. Bill Expense: 15% (54°). Range: -54° to 0° (306° to 360°). Exploded offset: 18px along -27°
  // 2. Others: 35% (126°). Range: 0° to 126°. Exploded offset: 10px along 63°
  // 3. Investment: 20% (72°). Range: 126° to 198°. Exploded offset: 10px along 162°
  // 4. Entertainment: 30% (108°). Range: 198° to 306°. Exploded offset: 10px along 252°

  const slicesConfig = [
    {
      label: 'Bill Expense',
      value: 15,
      color: '#FC7900',
      startDeg: -54,
      endDeg: 0,
      midDeg: -27,
      offset: 18,
      labelDist: 72
    },
    {
      label: 'Others',
      value: 35,
      color: '#10B981',
      startDeg: 0,
      endDeg: 126,
      midDeg: 63,
      offset: 10,
      labelDist: 74
    },
    {
      label: 'Investment',
      value: 20,
      color: '#FA00FF',
      startDeg: 126,
      endDeg: 198,
      midDeg: 162,
      offset: 10,
      labelDist: 76
    },
    {
      label: 'Entertainment',
      value: 30,
      color: '#343C6A',
      startDeg: 198,
      endDeg: 306,
      midDeg: 252,
      offset: 10,
      labelDist: 74
    }
  ];

  let slicesHtml = '';
  let labelsHtml = '';

  slicesConfig.forEach(slice => {
    const rad = Math.PI / 180;
    const midRad = slice.midDeg * rad;
    const startRad = slice.startDeg * rad;
    const endRad = slice.endDeg * rad;

    const cx = center + Math.cos(midRad) * slice.offset;
    const cy = center + Math.sin(midRad) * slice.offset;

    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);

    const sweepAngle = slice.endDeg - slice.startDeg;
    const largeArc = sweepAngle > 180 ? 1 : 0;

    const pathD = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    const lx = cx + Math.cos(midRad) * slice.labelDist;
    const ly = cy + Math.sin(midRad) * slice.labelDist;

    slicesHtml += `
      <path
        d="${pathD}"
        fill="${slice.color}"
        class="pie-slice"
        style="cursor: pointer; transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s ease;"
        data-label="${slice.label}"
        data-percent="${slice.value}%"
      />
    `;

    labelsHtml += `
      <g class="pie-text-group" style="pointer-events: none;">
        <text
          x="${lx}"
          y="${ly - 6}"
          fill="#ffffff"
          font-size="15"
          font-weight="700"
          text-anchor="middle"
          dominant-baseline="central"
          font-family="'Inter', -apple-system, sans-serif"
        >${slice.value}%</text>
        <text
          x="${lx}"
          y="${ly + 12}"
          fill="#ffffff"
          font-size="12"
          font-weight="600"
          text-anchor="middle"
          dominant-baseline="central"
          font-family="'Inter', -apple-system, sans-serif"
        >${slice.label}</text>
      </g>
    `;
  });

  container.innerHTML = `
    <div style="position: relative; width: 100%; display: flex; align-items: center; justify-content: center; padding: 6px 0;">
      <svg viewBox="0 0 ${size} ${size}" style="width: 100%; max-width: 320px; height: auto; overflow: visible;">
        <g class="pie-slices">${slicesHtml}</g>
        <g class="pie-labels">${labelsHtml}</g>
      </svg>
      <div class="chart-tooltip"></div>
    </div>
  `;

  // Attach hover animations & tooltip
  const tooltip = container.querySelector('.chart-tooltip');
  const paths = container.querySelectorAll('.pie-slices path');
  paths.forEach(p => {
    p.addEventListener('mouseenter', () => {
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
 * 3. BALANCE HISTORY SPLINE AREA CHART (Exact match to User Image 2)
 * Features:
 * - Left Y-axis: 800, 600, 400, 200, 0 in #718EBF with small tick dashes
 * - Bottom X-axis: Jul, Aug, Sep, Oct, Nov, Dec, Jan in #718EBF
 * - Dashed horizontal and vertical grid lines (#DFEAF2)
 * - Multi-wave cubic spline curve in electric blue (#1814F3) with translucent gradient area fill
 */
export function renderBalanceHistoryChart(container, data) {
  if (!container) return;

  const width = 640;
  const height = 245;
  const padding = { top: 25, right: 30, bottom: 45, left: 50 };

  const chartWidth = width - padding.left - padding.right; // 560
  const chartHeight = height - padding.top - padding.bottom; // 175

  const yTicks = [
    { val: 800, y: 25 },
    { val: 600, y: 68.75 },
    { val: 400, y: 112.5 },
    { val: 200, y: 156.25 },
    { val: 0, y: 200 }
  ];

  const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
  const monthStep = chartWidth / (months.length - 1); // 560 / 6 = 93.33px

  // Grid lines
  let gridHtml = '';
  yTicks.forEach(tick => {
    // Horizontal dashed line
    gridHtml += `
      <line x1="${padding.left}" y1="${tick.y}" x2="${width - padding.right}" y2="${tick.y}" stroke="#DFEAF2" stroke-width="1.2" stroke-dasharray="4,4" />
      <text x="${padding.left - 12}" y="${tick.y + 4}" fill="#718EBF" font-size="13" font-weight="400" text-anchor="end" font-family="'Inter', sans-serif">${tick.val}</text>
      <!-- Small tick mark -->
      <line x1="${padding.left - 6}" y1="${tick.y}" x2="${padding.left}" y2="${tick.y}" stroke="#718EBF" stroke-width="1.2" />
    `;
  });

  // Vertical dashed lines & Month labels
  let xLabelsHtml = '';
  const monthCoords = [];
  months.forEach((month, i) => {
    const x = padding.left + i * monthStep;
    monthCoords.push({ month, x });

    gridHtml += `
      <line x1="${x}" y1="${padding.top}" x2="${x}" y2="${padding.top + chartHeight}" stroke="#DFEAF2" stroke-width="1.2" stroke-dasharray="4,4" />
    `;

    xLabelsHtml += `
      <text
        x="${x}"
        y="${height - 14}"
        fill="#718EBF"
        font-size="13"
        font-weight="400"
        text-anchor="middle"
        font-family="'Inter', sans-serif"
      >${month}</text>
    `;
  });

  // Exact trajectory of the spline curve matching Image 2:
  // Starts at Jul (x=50, y=172), crests between Jul & Aug (x=98, y=128),
  // dips at Aug (x=143.33, y=146), rises to crest before Sep (x=192, y=94),
  // slight dip at Sep (x=236.67, y=103), shoots up to the massive pinnacle peak at Oct (x=330, y=30),
  // plunges to Nov valley (x=423.33, y=152), climbs to Dec peak (x=516.67, y=74),
  // dips between Dec & Jan (x=562, y=148), surges before Jan (x=588, y=60), finishes at Jan (x=610, y=70).
  const splineLinePath = `M 50 172 C 65 150, 80 128, 98 128 C 114 128, 128 146, 143.33 146 C 160 146, 175 94, 192 94 C 208 94, 222 103, 236.67 103 C 265 103, 298 30, 330 30 C 362 30, 392 152, 423.33 152 C 455 152, 485 74, 516.67 74 C 536 74, 548 148, 562 148 C 574 148, 580 60, 588 60 C 596 60, 604 66, 610 70`;
  const splineAreaPath = `${splineLinePath} L 610 200 L 50 200 Z`;

  // Interactive hit target points for tooltips
  const monthDataValues = {
    'Jul': 120,
    'Aug': 240,
    'Sep': 450,
    'Oct': 780,
    'Nov': 210,
    'Dec': 570,
    'Jan': 600
  };

  let hitTargetsHtml = '';
  monthCoords.forEach(mc => {
    const val = monthDataValues[mc.month];
    const yVal = padding.top + chartHeight - (val / 800) * chartHeight;
    hitTargetsHtml += `
      <circle
        class="chart-point"
        cx="${mc.x}"
        cy="${yVal}"
        r="6"
        fill="#ffffff"
        stroke="var(--primary, #10B981)"
        stroke-width="3"
        style="cursor: pointer; opacity: 0; transition: opacity 0.2s ease, r 0.2s ease;"
        data-month="${mc.month}"
        data-val="$${val}"
      />
    `;
  });

  const lastMc = monthCoords[monthCoords.length - 1];
  const lastVal = monthDataValues[lastMc.month];
  const lastY = padding.top + chartHeight - (lastVal / 800) * chartHeight;
  const beaconHtml = `
    <!-- Live Sonar Radar Beacon on Latest Point -->
    <circle
      cx="${lastMc.x}"
      cy="${lastY}"
      r="6"
      fill="none"
      stroke="var(--primary, #10B981)"
      style="pointer-events: none; animation: beaconPing 2.2s infinite cubic-bezier(0, 0.2, 0.8, 1);"
    />
  `;

  container.innerHTML = `
    <div style="position: relative; width: 100%;">
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; overflow: visible;">
        <defs>
          <linearGradient id="balanceHistoryBlueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--primary, #10B981)" stop-opacity="0.3" />
            <stop offset="100%" stop-color="var(--primary, #10B981)" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        ${gridHtml}
        <!-- Area gradient fill -->
        <path class="chart-spline-area" d="${splineAreaPath}" fill="url(#balanceHistoryBlueGrad)" />
        <!-- Sharp vivid curve -->
        <path class="chart-spline-line" d="${splineLinePath}" fill="none" stroke="var(--primary, #10B981)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" />
        ${xLabelsHtml}
        ${hitTargetsHtml}
        ${beaconHtml}
      </svg>
      <div class="chart-tooltip"></div>
    </div>
  `;

  // Attach tooltips
  const tooltip = container.querySelector('.chart-tooltip');
  const dots = container.querySelectorAll('.chart-point');
  dots.forEach(dot => {
    dot.addEventListener('mouseenter', () => {
      dot.style.opacity = '1';
      dot.setAttribute('r', '7.5');
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
      dot.style.opacity = '0';
      dot.setAttribute('r', '6');
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
