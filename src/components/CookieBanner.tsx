// Cookie-Consent-Banner aus index.html — statisches Markup; die Logik liegt in
// public/js/cookie-banner.js und wird vom ScriptLoader NACH der Hydration
// geladen (Inline-Script vor der Hydration verursachte Hydration-Mismatch).

export function CookieBanner() {
  return (
    <>
      <div id="cookie-consent-banner" className="cookie-banner">
        <div className="cookie-content">
          <div className="cookie-text">
            <h5>Cookie Policy</h5>
            <p>
              We use cookies to enhance your browsing experience, analyze site traffic, and
              personalize content. By clicking &quot;Accept All&quot;, you consent to our use of
              cookies. You can click &quot;Decline&quot; to refuse non-essential cookies.
            </p>
          </div>
          <div className="cookie-buttons">
            <button id="cookie-accept" className="button-48">
              Accept All
            </button>
            <button id="cookie-decline" className="button-48-transparent">
              Decline
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
