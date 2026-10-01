/* ==========================================================================
   TOAST NOTIFICATION SYSTEM (MODERN SMOKE GREEN THEME)
   ========================================================================== */

export function showToast(title, message, type = 'success', duration = 4000, options = {}) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');

  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg class="toast-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>`;
  } else if (type === 'error') {
    iconSvg = `<svg class="toast-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>`;
  } else {
    iconSvg = `<svg class="toast-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>`;
  }

  // Optional Action Button
  let actionHtml = '';
  if (options && options.actionText) {
    actionHtml = `
      <div class="toast-actions">
        <button class="toast-action-btn" type="button">${options.actionText}</button>
      </div>
    `;
  }

  toast.innerHTML = `
    <div class="toast-icon-badge">
      ${iconSvg}
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
      ${actionHtml}
    </div>
    <button class="toast-close" type="button" aria-label="Dismiss">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
    <div class="toast-progress-bar" style="animation-duration: ${duration}ms;"></div>
  `;

  // Dismiss logic
  let isDismissing = false;
  function dismiss() {
    if (isDismissing) return;
    isDismissing = true;
    toast.classList.add('toast-dismissing');
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 280);
  }

  // Action button listener
  if (options && options.onAction) {
    const actionBtn = toast.querySelector('.toast-action-btn');
    if (actionBtn) {
      actionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        options.onAction();
        dismiss();
      });
    }
  }

  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dismiss();
  });

  // Pause on hover
  let remainingTime = duration;
  let startTime = Date.now();
  let timerId = null;

  function startTimer() {
    startTime = Date.now();
    timerId = setTimeout(dismiss, remainingTime);
  }

  function pauseTimer() {
    clearTimeout(timerId);
    remainingTime -= (Date.now() - startTime);
    const progressBar = toast.querySelector('.toast-progress-bar');
    if (progressBar) progressBar.style.animationPlayState = 'paused';
  }

  function resumeTimer() {
    if (remainingTime > 0) {
      const progressBar = toast.querySelector('.toast-progress-bar');
      if (progressBar) progressBar.style.animationPlayState = 'running';
      startTimer();
    } else {
      dismiss();
    }
  }

  toast.addEventListener('mouseenter', pauseTimer);
  toast.addEventListener('mouseleave', resumeTimer);

  container.appendChild(toast);
  startTimer();
}

