/* ==========================================================================
   BANKDASH - MAIN ENTRYPOINT & APPLICATION CONTROLLER
   ========================================================================== */

import { renderSidebar, NAV_ITEMS } from './components/Sidebar.js';
import { renderHeader } from './components/Header.js';
import { renderDashboardPage } from './pages/DashboardPage.js';
import { renderTransactionsPage } from './pages/TransactionsPage.js';
import { renderAccountsPage } from './pages/AccountsPage.js';
import { renderInvestmentsPage } from './pages/InvestmentsPage.js';
import { renderCreditCardsPage } from './pages/CreditCardsPage.js';
import { renderLoansPage } from './pages/LoansPage.js';
import { renderServicesPage } from './pages/ServicesPage.js';
import { renderPrivilegesPage } from './pages/PrivilegesPage.js';
import { renderSettingPage } from './pages/SettingPage.js';
import { showToast } from './components/Toast.js';

// Application State
const state = {
  currentRoute: 'dashboard',
  currentTheme: localStorage.getItem('bankdash_theme') || 'sapphire'
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

// Initialize Theme
function applyTheme(theme) {
  state.currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('bankdash_theme', theme);

  const themeLabel = document.getElementById('theme-label');
  if (themeLabel) {
    const labelNames = {
      sapphire: 'Sapphire',
      dark: 'Dark',
      indigo: 'Indigo',
      emerald: 'Emerald'
    };
    themeLabel.innerText = labelNames[theme] || 'Sapphire';
  }
}

function cycleTheme() {
  const themes = ['sapphire', 'dark', 'indigo', 'emerald'];
  const nextIdx = (themes.indexOf(state.currentTheme) + 1) % themes.length;
  const newTheme = themes[nextIdx];
  applyTheme(newTheme);

  const friendlyNames = {
    sapphire: 'Electric Sapphire Blue (Default)',
    dark: 'Midnight Obsidian Dark Theme',
    indigo: 'Nordic Cobalt Theme',
    emerald: 'Emerald Luxe Theme'
  };
  showToast('Theme Changed', `Switched to ${friendlyNames[newTheme]}`, 'info', 2000);
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
  // Apply Electric Sapphire Blue theme as default
  const savedTheme = localStorage.getItem('bankdash_theme');
  const activeTheme = (!savedTheme || savedTheme === 'emerald') ? 'sapphire' : savedTheme;
  applyTheme(activeTheme);

  // Initial Route from URL Hash
  const hash = window.location.hash.replace('#', '');
  if (hash && routePageMap[hash]) {
    state.currentRoute = hash;
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
    const newHash = window.location.hash.replace('#', '');
    if (newHash && newHash !== state.currentRoute && routePageMap[newHash]) {
      navigateTo(newHash);
    }
  });

  // Initial Render of Content
  navigateTo(state.currentRoute);

  // Welcome Toast
  setTimeout(() => {
    showToast(
      'Welcome to BankDash',
      'Electric Sapphire Blue theme active. Use the top Theme Switcher to test Dark, Indigo, and Emerald modes!',
      'success',
      4500
    );
  }, 600);
}

// Start application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
