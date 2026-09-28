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
  currentTheme: localStorage.getItem('bankdash_theme') || 'emerald'
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
    themeLabel.innerText = theme === 'emerald' ? 'Emerald' : theme === 'dark' ? 'Dark' : 'Indigo';
  }
}

function cycleTheme() {
  const themes = ['emerald', 'dark', 'indigo'];
  const nextIdx = (themes.indexOf(state.currentTheme) + 1) % themes.length;
  const newTheme = themes[nextIdx];
  applyTheme(newTheme);

  const friendlyNames = {
    emerald: 'Emerald Fintech Theme (Default)',
    dark: 'Midnight Obsidian Dark Theme',
    indigo: 'Nordic Cobalt Theme'
  };
  showToast('Theme Changed', `Switched to ${friendlyNames[newTheme]}`, 'info', 2000);
}

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
  document.title = `${title} — BankDash Fintech`;

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
  // Apply saved theme
  applyTheme(state.currentTheme);

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
      'Modern Emerald Fintech theme active. Use the top Theme Switcher to test Dark and Nordic Cobalt modes!',
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
