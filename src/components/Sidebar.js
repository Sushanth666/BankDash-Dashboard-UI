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
        <img src="/assets/logo.png" alt="BankDash." class="sidebar-logo-img sidebar-logo-light" />
        <img src="/assets/logo-dark.png" alt="BankDash." class="sidebar-logo-img sidebar-logo-dark" />
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
