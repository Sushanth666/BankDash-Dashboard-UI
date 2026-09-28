/* ==========================================================================
   PAGE: SETTING
   Includes the 3 Figma tabs:
   1. Edit Profile (Photo upload, personal information inputs, save button)
   2. Preferences (Currency, Timezone, Notification toggles)
   3. Security (Two-factor auth toggle, Change password form, Active devices)
   ========================================================================== */

import { currentUser } from '../data/mockData.js';
import { showToast } from '../components/Toast.js';

export function renderSettingPage(container) {
  let activeTab = 'profile'; // 'profile', 'preferences', 'security'

  function updateView() {
    container.innerHTML = `
      <div class="settings-content-wrapper">
        <!-- Setting Tabs Navigation -->
        <div class="tabs-nav">
          <button class="tab-btn ${activeTab === 'profile' ? 'active' : ''}" data-tab="profile">Edit Profile</button>
          <button class="tab-btn ${activeTab === 'preferences' ? 'active' : ''}" data-tab="preferences">Preferences</button>
          <button class="tab-btn ${activeTab === 'security' ? 'active' : ''}" data-tab="security">Security</button>
        </div>

        <!-- Tab 1: Edit Profile -->
        <div id="tab-pane-profile" style="display: ${activeTab === 'profile' ? 'block' : 'none'};">
          <form id="edit-profile-form">
            <!-- Profile Avatar Section -->
            <div class="profile-edit-avatar-section">
              <div class="profile-avatar-wrapper">
                <img id="setting-avatar-preview" class="profile-large-avatar" src="${currentUser.avatar}" alt="${currentUser.name}" />
                <label for="avatar-file-input" class="avatar-edit-badge" title="Change photo">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </label>
                <input type="file" id="avatar-file-input" accept="image/*" style="display: none;" />
              </div>
              <div>
                <div style="font-weight: 700; color: var(--text-primary); font-size: 1.1rem;">${currentUser.name}</div>
                <div style="font-size: 0.8125rem; color: var(--text-muted); margin-top: 2px;">JPG, GIF or PNG. Max size 2MB</div>
              </div>
            </div>

            <!-- Form Fields Grid -->
            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label" for="prof-name">Your Name</label>
                <input type="text" class="form-input" id="prof-name" value="${currentUser.name}" required />
              </div>
              <div class="form-group">
                <label class="form-label" for="prof-username">User Name</label>
                <input type="text" class="form-input" id="prof-username" value="${currentUser.userName}" required />
              </div>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label" for="prof-email">Email</label>
                <input type="email" class="form-input" id="prof-email" value="${currentUser.email}" required />
              </div>
              <div class="form-group">
                <label class="form-label" for="prof-password">Password</label>
                <input type="password" class="form-input" id="prof-password" value="••••••••••••" />
              </div>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label" for="prof-dob">Date of Birth</label>
                <input type="date" class="form-input" id="prof-dob" value="${currentUser.dob}" />
              </div>
              <div class="form-group">
                <label class="form-label" for="prof-present-address">Present Address</label>
                <input type="text" class="form-input" id="prof-present-address" value="${currentUser.presentAddress}" />
              </div>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label" for="prof-perm-address">Permanent Address</label>
                <input type="text" class="form-input" id="prof-perm-address" value="${currentUser.permanentAddress}" />
              </div>
              <div class="form-group">
                <label class="form-label" for="prof-city">City</label>
                <input type="text" class="form-input" id="prof-city" value="${currentUser.city}" />
              </div>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label" for="prof-postal">Postal Code</label>
                <input type="text" class="form-input" id="prof-postal" value="${currentUser.postalCode}" />
              </div>
              <div class="form-group">
                <label class="form-label" for="prof-country">Country</label>
                <input type="text" class="form-input" id="prof-country" value="${currentUser.country}" />
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; margin-top: 14px;">
              <button type="submit" class="btn btn-primary btn-pill" style="min-width: 150px;">
                Save
              </button>
            </div>
          </form>
        </div>

        <!-- Tab 2: Preferences -->
        <div id="tab-pane-preferences" style="display: ${activeTab === 'preferences' ? 'block' : 'none'};">
          <form id="preferences-form">
            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label">Currency</label>
                <select class="form-select" id="pref-currency">
                  <option value="USD" ${currentUser.currency === 'USD' ? 'selected' : ''}>USD ($ - United States Dollar)</option>
                  <option value="EUR" ${currentUser.currency === 'EUR' ? 'selected' : ''}>EUR (€ - Euro)</option>
                  <option value="GBP" ${currentUser.currency === 'GBP' ? 'selected' : ''}>GBP (£ - British Pound)</option>
                  <option value="JPY" ${currentUser.currency === 'JPY' ? 'selected' : ''}>JPY (¥ - Japanese Yen)</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Time Zone</label>
                <select class="form-select" id="pref-timezone">
                  <option value="(GMT-05:00) Eastern Time" selected>(GMT-05:00) Eastern Time (US & Canada)</option>
                  <option value="(GMT-08:00) Pacific Time">(GMT-08:00) Pacific Time (US & Canada)</option>
                  <option value="(GMT+00:00) London">(GMT+00:00) Greenwich Mean Time (London)</option>
                  <option value="(GMT+05:30) New Delhi">(GMT+05:30) India Standard Time</option>
                  <option value="(GMT+09:00) Tokyo">(GMT+09:00) Tokyo</option>
                </select>
              </div>
            </div>

            <div style="margin-top: 24px;">
              <div style="font-weight: 700; font-size: 1.05rem; color: var(--text-primary); margin-bottom: 16px;">
                Notification Preferences
              </div>

              <div class="card-setting-item">
                <div class="card-setting-info">
                  <div>
                    <div class="card-setting-title">I send or receive digital currency</div>
                    <div class="card-setting-desc">Push notifications on crypto & digital settlement</div>
                  </div>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="notif-crypto" ${currentUser.notifications.digitalCurrency ? 'checked' : ''} />
                  <span class="toggle-slider"></span>
                </label>
              </div>

              <div class="card-setting-item">
                <div class="card-setting-info">
                  <div>
                    <div class="card-setting-title">I receive merchant order</div>
                    <div class="card-setting-desc">Automated emails whenever a checkout order settles</div>
                  </div>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="notif-merchant" ${currentUser.notifications.merchantOrder ? 'checked' : ''} />
                  <span class="toggle-slider"></span>
                </label>
              </div>

              <div class="card-setting-item">
                <div class="card-setting-info">
                  <div>
                    <div class="card-setting-title">There are recommendations for my account</div>
                    <div class="card-setting-desc">Yield optimization, high-interest CDs, and investment tips</div>
                  </div>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="notif-recom" ${currentUser.notifications.recommendations ? 'checked' : ''} />
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; margin-top: 24px;">
              <button type="submit" class="btn btn-primary btn-pill" style="min-width: 150px;">
                Save
              </button>
            </div>
          </form>
        </div>

        <!-- Tab 3: Security -->
        <div id="tab-pane-security" style="display: ${activeTab === 'security' ? 'block' : 'none'};">
          <!-- 2FA Section -->
          <div style="margin-bottom: 32px;">
            <div style="font-weight: 700; font-size: 1.05rem; color: var(--text-primary); margin-bottom: 16px;">
              Two-Factor Authentication
            </div>
            <div class="card-setting-item">
              <div class="card-setting-info">
                <div>
                  <div class="card-setting-title">Enable or disable two-factor authentication</div>
                  <div class="card-setting-desc">Multi-factor SMS or Authenticator App verification on login</div>
                </div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="toggle-2fa" ${currentUser.twoFactorEnabled ? 'checked' : ''} />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <!-- Change Password Form -->
          <form id="change-pwd-form">
            <div style="font-weight: 700; font-size: 1.05rem; color: var(--text-primary); margin-bottom: 16px;">
              Change Password
            </div>
            <div class="form-group">
              <label class="form-label" for="sec-current-pwd">Current Password</label>
              <input type="password" class="form-input" id="sec-current-pwd" placeholder="••••••••••••" required />
            </div>
            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label" for="sec-new-pwd">New Password</label>
                <input type="password" class="form-input" id="sec-new-pwd" placeholder="Minimum 8 characters" required />
              </div>
              <div class="form-group">
                <label class="form-label" for="sec-confirm-pwd">Confirm New Password</label>
                <input type="password" class="form-input" id="sec-confirm-pwd" placeholder="Re-type new password" required />
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; margin-top: 14px;">
              <button type="submit" class="btn btn-primary btn-pill" style="min-width: 150px;">
                Save
              </button>
            </div>
          </form>

          <!-- Recognized Devices List -->
          <div style="margin-top: 40px;">
            <div style="font-weight: 700; font-size: 1.05rem; color: var(--text-primary); margin-bottom: 16px;">
              Recognized Active Sessions
            </div>
            <div class="security-session-item">
              <div style="display: flex; align-items: center; gap: 14px;">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                <div>
                  <div style="font-weight: 600; color: var(--text-primary);">MacBook Pro 16" &bull; San Jose, USA</div>
                  <div style="font-size: 0.75rem; color: var(--accent-success); font-weight: 600;">Active Now &bull; Chrome 128</div>
                </div>
              </div>
              <span class="status-badge complete">Current Device</span>
            </div>

            <div class="security-session-item">
              <div style="display: flex; align-items: center; gap: 14px;">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
                <div>
                  <div style="font-weight: 600; color: var(--text-primary);">iPhone 15 Pro Max &bull; San Jose, USA</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">Last active 4 hours ago &bull; iOS App</div>
                </div>
              </div>
              <button class="btn btn-secondary btn-pill" style="height: 30px; padding: 0 12px; font-size: 0.75rem;">
                Revoke
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    attachEvents();
  }

  function attachEvents() {
    // Tabs toggle
    const tabBtns = container.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-tab');
        updateView();
      });
    });

    // Avatar file input preview
    const fileInput = container.querySelector('#avatar-file-input');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (re) => {
            currentUser.avatar = re.target.result;
            const preview = container.querySelector('#setting-avatar-preview');
            if (preview) preview.src = currentUser.avatar;
            // update header avatar too
            const headAvatar = document.querySelector('.header-user-btn .user-avatar');
            if (headAvatar) headAvatar.src = currentUser.avatar;
            showToast('Avatar Updated', 'Your profile picture has been updated.', 'success');
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Profile form submission
    const profForm = container.querySelector('#edit-profile-form');
    if (profForm) {
      profForm.addEventListener('submit', (e) => {
        e.preventDefault();
        currentUser.name = container.querySelector('#prof-name').value;
        currentUser.userName = container.querySelector('#prof-username').value;
        currentUser.email = container.querySelector('#prof-email').value;
        currentUser.city = container.querySelector('#prof-city').value;
        currentUser.country = container.querySelector('#prof-country').value;

        // update header name
        const headerName = document.querySelector('.header-user-btn .user-name');
        if (headerName) headerName.innerText = currentUser.name;

        showToast('Profile Saved', 'Profile settings updated successfully.', 'success');
      });
    }

    // Preferences form submission
    const prefForm = container.querySelector('#preferences-form');
    if (prefForm) {
      prefForm.addEventListener('submit', (e) => {
        e.preventDefault();
        currentUser.currency = container.querySelector('#pref-currency').value;
        currentUser.timeZone = container.querySelector('#pref-timezone').value;
        showToast('Preferences Saved', 'Financial preferences updated.', 'success');
      });
    }

    // Security form submission
    const pwdForm = container.querySelector('#change-pwd-form');
    if (pwdForm) {
      pwdForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newPwd = container.querySelector('#sec-new-pwd').value;
        const confirmPwd = container.querySelector('#sec-confirm-pwd').value;
        if (newPwd !== confirmPwd) {
          showToast('Password Mismatch', 'New passwords do not match.', 'error');
          return;
        }
        showToast('Password Changed', 'Security credentials updated successfully.', 'success');
      });
    }
  }

  updateView();
}
