/* ==========================================================================
   APP SIDEBAR NAVIGATION
   ========================================================================== */

export const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '/assets/icons/dashboard.png'
  },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: '/assets/icons/transactions.png'
  },
  {
    id: 'accounts',
    label: 'Accounts',
    icon: '/assets/icons/accounts.png'
  },
  {
    id: 'investments',
    label: 'Investments',
    icon: '/assets/icons/investments.png'
  },
  {
    id: 'credit-cards',
    label: 'Credit Cards',
    icon: '/assets/icons/credit-cards.png'
  },
  {
    id: 'loans',
    label: 'Loans',
    icon: '/assets/icons/loans.png'
  },
  {
    id: 'services',
    label: 'Services',
    icon: '/assets/icons/services.png'
  },
  {
    id: 'privileges',
    label: 'My Privileges',
    icon: '/assets/icons/privileges.png'
  },
  {
    id: 'setting',
    label: 'Setting',
    icon: '/assets/icons/setting.png'
  }
];

export function renderSidebar(container, activeId, onNavigate) {
  if (!container) return;

  const linksHtml = NAV_ITEMS.map(item => `
    <a class="nav-item ${item.id === activeId ? 'active' : ''}" data-nav-id="${item.id}" href="#${item.id}">
      <span class="nav-item-icon">
        <span class="nav-icon-mask" style="-webkit-mask-image: url('${item.icon}'); mask-image: url('${item.icon}');"></span>
      </span>
      <span class="nav-item-label">${item.label}</span>
    </a>
  `).join('');

  container.innerHTML = `
    <div class="sidebar-header">
      <a href="#dashboard" class="sidebar-logo" aria-label="BankDash">
        <svg class="sidebar-logo-svg" viewBox="0 0 175 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="BankDash">
          <defs>
            <linearGradient id="sidebarLogoBackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#047857" />
              <stop offset="100%" stop-color="#022C22" />
            </linearGradient>
            <linearGradient id="sidebarLogoFrontGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#10B981" />
              <stop offset="100%" stop-color="#059669" />
            </linearGradient>
            <filter id="sidebarLogoShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#059669" flood-opacity="0.25" />
            </filter>
          </defs>

          <!-- Back Card (Forest Pine) -->
          <rect x="7" y="4.5" width="24" height="17" rx="3.5" fill="url(#sidebarLogoBackGrad)" stroke="#34D399" stroke-width="1.8" />
          <line x1="7" y1="8.5" x2="31" y2="8.5" stroke="#022C22" stroke-width="2" />

          <!-- Front Card (Vibrant Emerald & Jade Mint) -->
          <g filter="url(#sidebarLogoShadow)">
            <rect x="2.5" y="9.5" width="26" height="19" rx="3.5" fill="url(#sidebarLogoFrontGrad)" stroke="#FFFFFF" stroke-width="1.8" />
            
            <!-- Stripe -->
            <rect x="2.5" y="13.5" width="26" height="3.2" fill="#047857" />
            
            <!-- EMV Chip -->
            <rect x="5.5" y="19" width="6.5" height="5" rx="1" fill="#FBBF24" stroke="#B45309" stroke-width="0.5" />
            <line x1="8.75" y1="19" x2="8.75" y2="24" stroke="#B45309" stroke-width="0.5" />
            <line x1="5.5" y1="21.5" x2="12" y2="21.5" stroke="#B45309" stroke-width="0.5" />

            <!-- Wave contactless indicator -->
            <path d="M19 19.5 A 3 3 0 0 1 19 23.5" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" fill="none" opacity="0.9" />
            <path d="M21 18.5 A 5 5 0 0 1 21 24.5" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" fill="none" opacity="0.9" />
          </g>

          <!-- BankDash. text -->
          <text x="38" y="25" class="logo-text">
            <tspan class="logo-text-bank">Bank</tspan><tspan class="logo-text-dash">Dash</tspan><tspan class="logo-text-dot">.</tspan>
          </text>
        </svg>
      </a>
      <button id="sidebar-close-btn" class="sidebar-close-btn" aria-label="Close sidebar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <nav class="sidebar-nav">
      ${linksHtml}
    </nav>
  `;

  // Attach navigation listeners
  const navLinks = container.querySelectorAll('.nav-item');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const navId = link.getAttribute('data-nav-id');
      if (onNavigate) onNavigate(navId);
    });
  });

  const closeBtn = container.querySelector('#sidebar-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      container.classList.remove('open');
      const overlay = document.getElementById('sidebar-overlay');
      if (overlay) overlay.classList.remove('active');
    });
  }
}
