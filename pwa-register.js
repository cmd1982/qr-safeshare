// Register service worker and handle install prompt
(function() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('./service-worker.js').catch(console.error);
    });
  }
  // Optional: custom install prompt
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const btn = document.querySelector('[data-install]');
    if (btn) {
      btn.style.display = 'inline-flex';
      btn.addEventListener('click', async () => {
        btn.disabled = true;
        try { await deferredPrompt.prompt(); } catch {}
        deferredPrompt = null;
        btn.style.display = 'none';
      }, { once: true });
    }
  });
})();