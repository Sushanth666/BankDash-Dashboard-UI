/* ==========================================================================
   PAGE: SETTING
   Pixel-perfect match to BankDash Figma Setting design:
   - 3 Tabs: Edit Profile, Preferences, Security
   - Tab 1 (Edit Profile): Left circular avatar with edit pencil badge,
     10 form fields in 2-column grid, bottom-right Save button
   - Tab 2 (Preferences): Currency, Time Zone, Notification toggle switches
   - Tab 3 (Security): Two-factor Authentication switch, Current & New Password
   ========================================================================== */

import { currentUser } from '../data/mockData.js';
import { showToast } from '../components/Toast.js';

export function renderSettingPage(container) {
  const hashParts = window.location.hash.split('?');
  const hashParams = new URLSearchParams(hashParts[1] || '');
  const urlParams = new URLSearchParams(window.location.search || '');
  let activeTab = hashParams.get('tab') || urlParams.get('tab') || 'profile'; // 'profile', 'preferences', 'security'

  function updateView() {
    container.innerHTML = `
      <div class="settings-content-wrapper">
        <!-- 3 Setting Tabs Navigation -->
        <div class="settings-tabs-nav">
          <button class="settings-tab-btn ${activeTab === 'profile' ? 'active' : ''}" data-tab="profile">
            Edit Profile
          </button>
          <button class="settings-tab-btn ${activeTab === 'preferences' ? 'active' : ''}" data-tab="preferences">
            Preferences
          </button>
          <button class="settings-tab-btn ${activeTab === 'security' ? 'active' : ''}" data-tab="security">
            Security
          </button>
        </div>

        <!-- TAB 1: EDIT PROFILE -->
        <div id="tab-pane-profile" style="display: ${activeTab === 'profile' ? 'block' : 'none'};">
          <form id="edit-profile-form" class="settings-profile-layout">
            <!-- Left: Avatar with Edit Badge -->
            <div class="settings-avatar-col">
              <div class="settings-avatar-wrapper">
                <img id="setting-avatar-preview" class="settings-large-avatar" src="${currentUser.avatar}" alt="${currentUser.name}" />
                <label for="avatar-file-input" class="settings-avatar-edit-badge" title="Change photo">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </label>
                <input type="file" id="avatar-file-input" accept="image/*" style="display: none;" />
              </div>
            </div>

            <!-- Right: 10 Form Fields (2-column grid) -->
            <div class="settings-fields-col">
              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label" for="prof-name">Your Name</label>
                  <input type="text" class="form-input" id="prof-name" value="${currentUser.name}" placeholder="Your Name" required />
                </div>
                <div class="form-group">
                  <label class="form-label" for="prof-username">User Name</label>
                  <input type="text" class="form-input" id="prof-username" value="${currentUser.userName}" placeholder="User Name" required />
                </div>
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label" for="prof-email">Email</label>
                  <input type="email" class="form-input" id="prof-email" value="${currentUser.email}" placeholder="Email" required />
                </div>
                <div class="form-group">
                  <label class="form-label" for="prof-password">Password</label>
                  <input type="password" class="form-input" id="prof-password" value="**********" placeholder="Password" />
                </div>
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label" for="prof-dob">Date of Birth</label>
                  <div style="position: relative;">
                    <select class="form-select" id="prof-dob" style="width: 100%; cursor: pointer;">
                      <option selected>${currentUser.dob}</option>
                      <option>15 March 1992</option>
                      <option>10 August 1988</option>
                      <option>04 December 1995</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label" for="prof-present-address">Present Address</label>
                  <input type="text" class="form-input" id="prof-present-address" value="${currentUser.presentAddress}" placeholder="Present Address" />
                </div>
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label" for="prof-perm-address">Permanent Address</label>
                  <input type="text" class="form-input" id="prof-perm-address" value="${currentUser.permanentAddress}" placeholder="Permanent Address" />
                </div>
                <div class="form-group">
                  <label class="form-label" for="prof-city">City</label>
                  <input type="text" class="form-input" id="prof-city" value="${currentUser.city}" placeholder="City" />
                </div>
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label" for="prof-postal">Postal Code</label>
                  <input type="text" class="form-input" id="prof-postal" value="${currentUser.postalCode}" placeholder="Postal Code" />
                </div>
                <div class="form-group">
                  <label class="form-label" for="prof-country">Country</label>
                  <input type="text" class="form-input" id="prof-country" value="${currentUser.country}" placeholder="Country" />
                </div>
              </div>

              <div class="settings-save-row">
                <button type="submit" class="btn btn-primary settings-save-btn">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- TAB 2: PREFERENCES -->
        <div id="tab-pane-preferences" style="display: ${activeTab === 'preferences' ? 'block' : 'none'};">
          <form id="preferences-form">
            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label">Currency</label>
                <input type="text" class="form-input" id="pref-currency" value="${currentUser.currency}" placeholder="USD" />
              </div>
              <div class="form-group">
                <label class="form-label">Time Zone</label>
                <input type="text" class="form-input" id="pref-timezone" value="${currentUser.timeZone}" placeholder="Time Zone" />
              </div>
            </div>

            <div style="margin-top: 30px;">
              <div class="settings-subheading">Notification</div>

              <div class="settings-toggle-list">
                <label class="settings-toggle-row">
                  <span class="toggle-switch">
                    <input type="checkbox" id="notif-crypto" ${currentUser.notifications.digitalCurrency ? 'checked' : ''} />
                    <span class="toggle-slider"></span>
                  </span>
                  <span class="settings-toggle-label">I send or receive digita currency</span>
                </label>

                <label class="settings-toggle-row">
                  <span class="toggle-switch">
                    <input type="checkbox" id="notif-merchant" ${currentUser.notifications.merchantOrder ? 'checked' : ''} />
                    <span class="toggle-slider"></span>
                  </span>
                  <span class="settings-toggle-label">I receive merchant order</span>
                </label>

                <label class="settings-toggle-row">
                  <span class="toggle-switch">
                    <input type="checkbox" id="notif-recom" ${currentUser.notifications.recommendations ? 'checked' : ''} />
                    <span class="toggle-slider"></span>
                  </span>
                  <span class="settings-toggle-label">There are recommendation for my account</span>
                </label>
              </div>
            </div>

            <div class="settings-save-row">
              <button type="submit" class="btn btn-primary settings-save-btn">
                Save
              </button>
            </div>
          </form>
        </div>

        <!-- TAB 3: SECURITY -->
        <div id="tab-pane-security" style="display: ${activeTab === 'security' ? 'block' : 'none'};">
          <form id="security-form">
            <div>
              <div class="settings-subheading">Two-factor Authentication</div>
              <label class="settings-toggle-row" style="margin-top: 14px;">
                <span class="toggle-switch">
                  <input type="checkbox" id="toggle-2fa" ${currentUser.twoFactorEnabled ? 'checked' : ''} />
                  <span class="toggle-slider"></span>
                </span>
                <span class="settings-toggle-label">Enable or disable two factor authentication</span>
              </label>
            </div>

            <div style="margin-top: 32px;">
              <div class="settings-subheading">Change Password</div>

              <div style="max-width: 510px; margin-top: 16px;">
                <div class="form-group">
                  <label class="form-label" for="sec-current-pwd">Current Password</label>
                  <input type="password" class="form-input" id="sec-current-pwd" value="**********" placeholder="**********" />
                </div>

                <div class="form-group" style="margin-top: 20px;">
                  <label class="form-label" for="sec-new-pwd">New Password</label>
                  <input type="password" class="form-input" id="sec-new-pwd" value="**********" placeholder="**********" />
                </div>
              </div>
            </div>

            <div class="settings-save-row">
              <button type="submit" class="btn btn-primary settings-save-btn">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    attachEvents();
  }

  function attachEvents() {
    // Tabs toggle
    const tabBtns = container.querySelectorAll('.settings-tab-btn');
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
            showToast('Avatar Updated', 'Profile photo updated successfully.', 'success');
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
        currentUser.presentAddress = container.querySelector('#prof-present-address').value;
        currentUser.permanentAddress = container.querySelector('#prof-perm-address').value;
        currentUser.city = container.querySelector('#prof-city').value;
        currentUser.postalCode = container.querySelector('#prof-postal').value;
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
        currentUser.notifications.digitalCurrency = container.querySelector('#notif-crypto').checked;
        currentUser.notifications.merchantOrder = container.querySelector('#notif-merchant').checked;
        currentUser.notifications.recommendations = container.querySelector('#notif-recom').checked;

        showToast('Preferences Saved', 'Financial preferences saved successfully.', 'success');
      });
    }

    // Security form submission
    const secForm = container.querySelector('#security-form');
    if (secForm) {
      secForm.addEventListener('submit', (e) => {
        e.preventDefault();
        currentUser.twoFactorEnabled = container.querySelector('#toggle-2fa').checked;
        showToast('Security Saved', 'Security preferences and password updated.', 'success');
      });
    }
  }

  updateView();
}
