// Cookie-Consent-Logik aus index.html — ausgelagert, damit sie nach der
// React-Hydration läuft (Inline-Ausführung vor der Hydration verursachte
// einen Hydration-Mismatch). Verhalten identisch zum Original-Inline-Script.
(function () {
    'use strict';

    function init() {
        const cookieBanner = document.getElementById('cookie-consent-banner');
        const acceptButton = document.getElementById('cookie-accept');
        const declineButton = document.getElementById('cookie-decline');
        if (!cookieBanner || !acceptButton || !declineButton) return;

        // Check if user has already made a choice
        if (!localStorage.getItem('cookieConsent')) {
            // Show the banner after a short delay
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1000);
        }

        // Accept cookies
        acceptButton.addEventListener('click', function () {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.classList.remove('show');
        });

        // Decline cookies
        declineButton.addEventListener('click', function () {
            localStorage.setItem('cookieConsent', 'declined');
            cookieBanner.classList.remove('show');
        });
    }

    if (document.readyState !== 'loading') { init(); }
    else { document.addEventListener('DOMContentLoaded', init); }
})();
