/**
 * contact-form.js — Plug-and-play Google Apps Script form handler
 * Supports English & Greek (auto-detects lang="el" on <html>)
 *
 * Usage:
 *   1. Deploy the Apps Script as a Web App (Execute as: Me, Access: Anyone).
 *   2. Paste the /exec URL into GOOGLE_SCRIPT_URL below.
 *   3. Add <script src="contact-form.js" defer></script> to the page.
 *   4. Form needs id="clientContactForm", hidden fields _to & _key, submit button.
 *      Add <p id="formStatus"></p> anywhere inside the form for status messages.
 *
 * The Apps Script reads e.parameter (form-encoded POST), so we send FormData.
 * Hidden fields _to and _key are already in the HTML — no changes needed there.
 */

(function () {
  /* ── CONFIG ─────────────────────────────────────────────────── */
  var GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx6XHAAeJMIUVUBtHmjNqu6NGSKvFWgkWeUT4x6x_UMsmEaoPXFPMqlhXLKH5dJ0aGlag/exec';

  /* ── i18n ────────────────────────────────────────────────────── */
  var isGreek = document.documentElement.lang === 'el';

  var T = {
    sending:       isGreek ? 'Αποστολή…'                                  : 'Sending…',
    success:       isGreek ? 'Το μήνυμά σας στάλθηκε! Θα επικοινωνήσουμε σύντομα.' : 'Message sent! We\'ll be in touch soon.',
    error:         isGreek ? 'Κάτι πήγε στραβά. Δοκιμάστε ξανά.'          : 'Something went wrong. Please try again.',
    networkError:  isGreek ? 'Σφάλμα δικτύου. Ελέγξτε τη σύνδεσή σας.'   : 'Network error. Check your connection.',
    notConfigured: isGreek ? 'Η φόρμα δεν έχει ρυθμιστεί ακόμα.'          : 'Form not configured yet.'
  };

  /* ── STATUS HELPER ──────────────────────────────────────────── */
  function setStatus(el, msg, type) {
    if (!el) return;
    el.textContent = msg;
    el.className = type === 'success' ? 'status-success' : 'status-error';
    el.style.display = 'block';
  }

  /* ── INIT ───────────────────────────────────────────────────── */
  function init() {
    var form   = document.getElementById('clientContactForm');
    var status = document.getElementById('formStatus');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
        setStatus(status, T.notConfigured, 'error');
        return;
      }

      var btn = form.querySelector('[type="submit"]');
      var originalLabel = btn ? btn.textContent : '';
      if (btn) { btn.textContent = T.sending; btn.disabled = true; }
      if (status) { status.textContent = ''; status.style.display = 'none'; }

      /* Send as FormData so Apps Script reads it via e.parameter */
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body:   new FormData(form)
      })
        .then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.json();
        })
        .then(function (json) {
          if (json && json.result === 'success') {
            setStatus(status, T.success, 'success');
            form.reset();
            if (window.ccEvent) ccEvent('form_submit', { form_id: 'clientContactForm' });
          } else {
            /* Apps Script returned result:"error" with a message */
            throw new Error(json && json.error ? json.error : 'unexpected response');
          }
          if (btn) { btn.textContent = originalLabel; btn.disabled = false; }
        })
        .catch(function (err) {
          var isNetwork = err instanceof TypeError;
          setStatus(status, isNetwork ? T.networkError : T.error, 'error');
          if (btn) { btn.textContent = originalLabel; btn.disabled = false; }
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
