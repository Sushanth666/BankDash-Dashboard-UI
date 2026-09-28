/* ==========================================================================
   APP HEADER COMPONENT
   ========================================================================== */

import { currentUser } from '../data/mockData.js';
import { showToast } from './Toast.js';

export function renderHeader(container, { activeTitle, onThemeChange, currentTheme }) {
  if (!container) return;

  container.innerHTML = `
    <div class="header-left">
      <button id="mobile-toggle-btn" class="mobile-menu-btn" aria-label="Toggle menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      <h1 class="page-title" id="page-heading">${activeTitle}</h1>
    </div>

    <div class="header-right">
      <!-- Search Input -->
      <div class="header-search-wrap">
        <svg class="header-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" id="global-search-input" class="header-search-input" placeholder="Search for something" />
      </div>

      <!-- Action Buttons -->
      <div class="header-actions">
        <!-- Theme Switcher -->
        <button id="theme-toggle-btn" class="theme-picker-btn" title="Toggle color theme (Emerald / Dark / Cobalt)">
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
          <span id="theme-label" style="text-transform: capitalize;">${currentTheme === 'emerald' ? 'Emerald' : currentTheme === 'dark' ? 'Dark' : 'Indigo'}</span>
        </button>

        <!-- Setting Shortcut Button -->
        <button id="header-settings-btn" class="header-icon-btn" title="Settings">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>

        <!-- Notification Button -->
        <button id="header-notif-btn" class="header-icon-btn" title="Notifications">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span class="badge-dot"></span>
        </button>
      </div>

      <!-- User Profile -->
      <div class="header-user-btn" id="header-user-profile" title="View Profile">
        <img class="user-avatar" src="${currentUser.avatar}" alt="${currentUser.name}" />
        <div class="user-info">
          <span class="user-name">${currentUser.name}</span>
          <span class="user-role">${currentUser.role}</span>
        </div>
      </div>
    </div>
  `;

  // Attach search listener
  const searchInput = container.querySelector('#global-search-input');
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = searchInput.value.trim();
      if (q) {
        showToast('Search query', `Searching records for "${q}"...`, 'info', 2500);
      }
    }
  });

  // Attach theme switcher listener
  const themeBtn = container.querySelector('#theme-toggle-btn');
  themeBtn.addEventListener('click', () => {
    if (onThemeChange) onThemeChange();
  });

  // Attach notification click
  const notifBtn = container.querySelector('#header-notif-btn');
  notifBtn.addEventListener('click', () => {
    showToast(
      'New Activity (3 unread)',
      '• Wire transfer of $2,500 settled\n• Dividend payout received ($450)\n• Security check passed',
      'info',
      4000
    );
  });
}
