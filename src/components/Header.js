/* ==========================================================================
   APP HEADER COMPONENT
   ========================================================================== */

import { currentUser } from '../data/mockData.js';
import { showToast } from './Toast.js';

export function renderHeader(container, { activeTitle, onThemeChange, currentTheme }) {
  if (!container) return;

  container.innerHTML = `
    <div class="header-main-bar">
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
        <!-- Search Input (Desktop) -->
        <div class="header-search-wrap">
          <svg class="header-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" id="global-search-input" class="header-search-input" placeholder="Search for something" />
        </div>

        <!-- Action Buttons & User Profile -->
        <div class="header-actions">
          <button id="theme-toggle-btn" class="theme-picker-btn" style="display: none;" title="${currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}" aria-hidden="true">
            <span id="theme-label">${currentTheme === 'dark' ? 'Dark' : 'Light'}</span>
          </button>

          <button id="header-settings-btn" class="header-icon-btn" title="Settings" aria-label="Settings">
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#718EBF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>

          <button id="header-notif-btn" class="header-icon-btn" title="Notifications" aria-label="Notifications">
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#FE5C73" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              <circle cx="17.5" cy="7.2" r="2.8" stroke="#FE5C73" stroke-width="1.8" fill="#F5F7FA" class="notif-badge-ring"></circle>
            </svg>
          </button>

          <!-- User Profile Avatar -->
          <div class="header-user-btn" id="header-user-profile" title="${currentUser.name}" role="button" tabindex="0" aria-label="Profile">
            <img class="user-avatar" src="${currentUser.avatar}" alt="${currentUser.name}" />
            <div class="user-info" style="display: none;">
              <span class="user-name">${currentUser.name}</span>
              <span class="user-role">${currentUser.role}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Dedicated Search Bar (Matches Figma Mobile Spec) -->
    <div class="header-mobile-search">
      <svg class="header-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input type="text" id="mobile-search-input" class="header-search-input" placeholder="Search for something" />
    </div>
  `;

  // Attach search listeners
  const searchHandler = (input) => {
    if (!input) return;
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = input.value.trim();
        if (q) {
          showToast('Search query', `Searching records for "${q}"...`, 'info', 2500);
        }
      }
    });
  };

  searchHandler(container.querySelector('#global-search-input'));
  searchHandler(container.querySelector('#mobile-search-input'));

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
