/* ==========================================================================
   REUSABLE MODAL COMPONENT
   ========================================================================== */

export function openModal({ title, contentHtml, onConfirm, confirmText = 'Confirm', cancelText = 'Cancel', showFooter = true }) {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return;

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';

  backdrop.innerHTML = `
    <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal-header">
        <h3 id="modal-title" class="modal-title">${title}</h3>
        <button class="modal-close-btn" aria-label="Close modal">&times;</button>
      </div>
      <div class="modal-body">
        ${contentHtml}
      </div>
      ${showFooter ? `
        <div class="modal-footer">
          <button class="btn btn-secondary modal-cancel-btn">${cancelText}</button>
          <button class="btn btn-primary modal-confirm-btn">${confirmText}</button>
        </div>
      ` : ''}
    </div>
  `;

  function closeModal() {
    backdrop.style.opacity = '0';
    setTimeout(() => backdrop.remove(), 200);
    document.removeEventListener('keydown', handleKeyDown);
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') closeModal();
  }

  backdrop.querySelector('.modal-close-btn').addEventListener('click', closeModal);
  if (showFooter) {
    backdrop.querySelector('.modal-cancel-btn').addEventListener('click', closeModal);
    backdrop.querySelector('.modal-confirm-btn').addEventListener('click', () => {
      if (onConfirm) {
        const shouldClose = onConfirm(backdrop);
        if (shouldClose !== false) closeModal();
      } else {
        closeModal();
      }
    });
  }

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', handleKeyDown);
  modalRoot.appendChild(backdrop);
  return { backdrop, closeModal };
}
