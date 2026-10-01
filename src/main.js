/* ==========================================================================
   BANKDASH - MAIN ENTRYPOINT & APPLICATION CONTROLLER
   ========================================================================== */

import './styles/index.css';
import { renderSidebar, NAV_ITEMS, renderHeader, showToast } from './components/index.js';
import {
  renderDashboardPage,
  renderTransactionsPage,
  renderAccountsPage,
  renderInvestmentsPage,
  renderCreditCardsPage,
  renderLoansPage,
  renderServicesPage,
  renderPrivilegesPage,
  renderSettingPage
} from './pages/index.js';

// Application State (Strictly default to Light Mode)
const state = {
  currentRoute: 'dashboard',
  currentTheme: 'light'
};

const routePageMap = {
  'dashboard': { title: 'Overview', render: renderDashboardPage },
  'transactions': { title: 'Transactions', render: renderTransactionsPage },
  'accounts': { title: 'Accounts', render: renderAccountsPage },
  'investments': { title: 'Investments', render: renderInvestmentsPage },
  'credit-cards': { title: 'Credit Cards', render: renderCreditCardsPage },
  'loans': { title: 'Loans', render: renderLoansPage },
  'services': { title: 'Services', render: renderServicesPage },
  'privileges': { title: 'My Privileges', render: renderPrivilegesPage },
  'setting': { title: 'Setting', render: renderSettingPage }
};

// Initialize Theme: Strictly Light Mode (Burgundy Default) & Dark Mode (Burgundy Dark)
function applyTheme(theme) {
  if (theme !== 'dark') {
    theme = 'light';
  }
  state.currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('bankdash_theme', theme);

  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    const isDark = theme === 'dark';
    themeBtn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    const sunSvg = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
    const moonSvg = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
    themeBtn.innerHTML = `
      ${isDark ? moonSvg : sunSvg}
      <span id="theme-label" style="text-transform: capitalize;">${isDark ? 'Dark' : 'Light'}</span>
    `;
  }
}

function cycleTheme() {
  const newTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
  const friendlyName = newTheme === 'dark' ? 'Smoky Pine Dark Mode' : 'Smoke Green Light Mode';
  showToast('Theme Changed', `Switched to ${friendlyName}`, 'info', 2000);
}

// ==========================================================================
// BROWSER TAB TITLE CONTINUOUS SCROLLING MARQUEE ANIMATION
// ==========================================================================
let titleMarqueeTimer = null;
let currentMarqueeText = '';
let marqueeIndex = 0;

function updateAnimatedTabTitle(pageTitle) {
  if (titleMarqueeTimer) {
    clearInterval(titleMarqueeTimer);
    titleMarqueeTimer = null;
  }

  // Selected format: BankDash | Modern Fintech & Smart Banking Dashboard
  const brandSuffix = 'BankDash | Modern Fintech & Smart Banking Dashboard';
  currentMarqueeText = `${pageTitle} — ${brandSuffix}   •   `;
  marqueeIndex = 0;
  document.title = currentMarqueeText;

  titleMarqueeTimer = setInterval(() => {
    marqueeIndex = (marqueeIndex + 1) % currentMarqueeText.length;
    document.title = currentMarqueeText.slice(marqueeIndex) + currentMarqueeText.slice(0, marqueeIndex);
  }, 260);
}

// Pause/resume when tab switches for battery efficiency & clean UX
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (titleMarqueeTimer) {
      clearInterval(titleMarqueeTimer);
      titleMarqueeTimer = null;
    }
    document.title = '💳 BankDash | Modern Fintech & Smart Banking Dashboard';
  } else {
    const currentTitle = routePageMap[state.currentRoute]?.title || 'Overview';
    updateAnimatedTabTitle(currentTitle);
  }
});

// Router Navigation
function navigateTo(routeId) {
  if (!routePageMap[routeId]) {
    routeId = 'dashboard';
  }

  state.currentRoute = routeId;
  window.location.hash = routeId;

  // Update Sidebar active state
  const sidebar = document.getElementById('app-sidebar');
  if (sidebar) {
    const navLinks = sidebar.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
      if (link.getAttribute('data-nav-id') === routeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Update Page Title
  const pageHeading = document.getElementById('page-heading');
  const title = routePageMap[routeId].title;
  if (pageHeading) {
    pageHeading.innerText = title;
  }
  updateAnimatedTabTitle(title);

  // Render Page Content
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.classList.remove('page-enter');
    void mainContent.offsetWidth; // trigger reflow for smooth re-animation
    mainContent.innerHTML = '';
    routePageMap[routeId].render(mainContent, navigateTo);
    mainContent.classList.add('page-enter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Close mobile sidebar if open
  closeMobileSidebar();
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('app-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
}

function openMobileSidebar() {
  const sidebar = document.getElementById('app-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.add('open');
  if (overlay) overlay.classList.add('active');
}

// Bootstrap Application
function initApp() {
  // Strictly default to Light Mode
  localStorage.setItem('bankdash_theme', 'light');
  applyTheme('light');

  // Initial Route from URL Hash
  const rawHash = window.location.hash.replace('#', '');
  const initialRoute = rawHash.split('?')[0];
  if (initialRoute && routePageMap[initialRoute]) {
    state.currentRoute = initialRoute;
  }

  // Render Sidebar
  const sidebarContainer = document.getElementById('app-sidebar');
  renderSidebar(sidebarContainer, state.currentRoute, navigateTo);

  // Render Header
  const headerContainer = document.getElementById('app-header');
  renderHeader(headerContainer, {
    activeTitle: routePageMap[state.currentRoute].title,
    currentTheme: state.currentTheme,
    onThemeChange: cycleTheme
  });


  // Bind Header Button Events
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', openMobileSidebar);
  }

  const sidebarOverlay = document.getElementById('sidebar-overlay');
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeMobileSidebar);
  }

  const headerSettingsBtn = document.getElementById('header-settings-btn');
  if (headerSettingsBtn) {
    headerSettingsBtn.addEventListener('click', () => navigateTo('setting'));
  }

  const headerUserBtn = document.getElementById('header-user-profile');
  if (headerUserBtn) {
    headerUserBtn.addEventListener('click', () => navigateTo('setting'));
  }

  // Listen to Hash Changes
  window.addEventListener('hashchange', () => {
    const rawNew = window.location.hash.replace('#', '');
    const newRoute = rawNew.split('?')[0];
    if (newRoute && routePageMap[newRoute]) {
      navigateTo(newRoute);
    }
  });

  // Initial Render of Content (support direct URL hash like #credit-cards or #/credit-cards)
  const initialHash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
  const startRoute = initialHash && routePageMap[initialHash] ? initialHash : 'dashboard';
  navigateTo(startRoute);

  // Welcome Toast - Only show when refreshing/loading directly on the dashboard
  if (state.currentRoute === 'dashboard') {
    setTimeout(() => {
      const isDark = state.currentTheme === 'dark';
      showToast(
        'Welcome to BankDash',
        'Smoke Green & Luminous Mint theme active. Toggle Light or Dark mode anytime!',
        'success',
        6000,
        {
          actionText: isDark ? '☀️ Switch to Light' : '🌙 Switch to Dark',
          onAction: () => cycleTheme()
        }
      );
    }, 600);
  }
}

// Start application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
