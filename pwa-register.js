(function () {
  'use strict';

  if (!('serviceWorker' in navigator)) {
    return;
  }

  var isAllowedContext = window.isSecureContext ||
    location.hostname === 'localhost' ||
    location.hostname === '127.0.0.1';

  if (!isAllowedContext) {
    return;
  }

  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('./service-worker.js', { scope: './' })
      .catch(function () {
        // Service worker registration is optional for the website experience.
      });
  });
})();
