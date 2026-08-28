(function () {
  'use strict';

  var currentScript = document.currentScript;
  var style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = new URL('gem-model-notice.css?v=20260828-modelnotice1', currentScript && currentScript.src ? currentScript.src : window.location.href).href;
  document.head.appendChild(style);

  var lastTrigger = null;
  var closeTimer = 0;

  function isGemLink(href) {
    try {
      var url = new URL(href, window.location.href);
      return url.hostname === 'gemini.google.com' && url.pathname.indexOf('/gem/') === 0;
    } catch (error) {
      return false;
    }
  }

  function createNotice() {
    var backdrop = document.createElement('div');
    backdrop.className = 'gem-model-notice-backdrop';
    backdrop.id = 'gemModelNotice';
    backdrop.hidden = true;
    backdrop.innerHTML = [
      '<section class="gem-model-notice-card" role="dialog" aria-modal="true" aria-labelledby="gemModelNoticeTitle" aria-describedby="gemModelNoticeLead">',
      '  <button class="gem-model-notice-close" type="button" aria-label="Cerrar aviso">×</button>',
      '  <div class="gem-model-notice-badge">IMPORTANTE</div>',
      '  <h2 class="gem-model-notice-title" id="gemModelNoticeTitle">Selecciona el modelo antes de comenzar</h2>',
      '  <p class="gem-model-notice-lead" id="gemModelNoticeLead">Para que la Gema siga correctamente todos los pasos y genere respuestas más completas, al abrir Gemini elige el modelo de razonamiento más avanzado disponible.</p>',
      '  <div class="gem-model-options" aria-label="Modelos recomendados">',
      '    <div class="gem-model-option is-recommended"><span class="gem-model-option-mark" aria-hidden="true">✓</span><span class="gem-model-option-copy"><strong>Pro</strong><span>Opción recomendada · Razonamiento avanzado</span></span></div>',
      '    <div class="gem-model-option is-alternative"><span class="gem-model-option-mark" aria-hidden="true">2</span><span class="gem-model-option-copy"><strong>Pensar</strong><span>Alternativa si Pro no aparece en tu cuenta</span></span></div>',
      '  </div>',
      '  <p class="gem-model-notice-tip"><strong>Evita utilizar Flash</strong> en estos procesos guiados, ya que puede omitir pasos importantes.</p>',
      '  <div class="gem-model-notice-actions">',
      '    <a class="gem-model-notice-open" data-gem-notice-skip href="https://gemini.google.com/" rel="noopener">Entendido, abrir la Gema&nbsp; ↗</a>',
      '    <button class="gem-model-notice-cancel" type="button">Cancelar</button>',
      '  </div>',
      '</section>'
    ].join('');
    document.body.appendChild(backdrop);
    return backdrop;
  }

  var notice = createNotice();
  var card = notice.querySelector('.gem-model-notice-card');
  var openLink = notice.querySelector('.gem-model-notice-open');
  var cancelButton = notice.querySelector('.gem-model-notice-cancel');
  var closeButton = notice.querySelector('.gem-model-notice-close');

  function openNotice(trigger) {
    if (closeTimer) {
      window.clearTimeout(closeTimer);
      closeTimer = 0;
    }
    lastTrigger = trigger;
    openLink.href = trigger.href;
    if (trigger.target) {
      openLink.target = trigger.target;
      openLink.rel = 'noopener';
    } else {
      openLink.removeAttribute('target');
      openLink.removeAttribute('rel');
    }
    notice.hidden = false;
    document.body.classList.add('gem-model-notice-open');
    window.requestAnimationFrame(function () {
      notice.classList.add('is-open');
      closeButton.focus();
    });
  }

  function closeNotice(returnFocus) {
    notice.classList.remove('is-open');
    document.body.classList.remove('gem-model-notice-open');
    closeTimer = window.setTimeout(function () {
      notice.hidden = true;
      closeTimer = 0;
      if (returnFocus !== false && lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
    }, 210);
  }

  document.addEventListener('click', function (event) {
    var trigger = event.target.closest && event.target.closest('a[href]');
    if (!trigger || !isGemLink(trigger.href)) return;
    if (trigger.matches('.tool-trigger, .tool-dialog-open, .gem-safety-open, [data-gem-notice-skip]')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openNotice(trigger);
  }, true);

  closeButton.addEventListener('click', function () { closeNotice(); });
  cancelButton.addEventListener('click', function () { closeNotice(); });
  openLink.addEventListener('click', function () { window.setTimeout(function () { closeNotice(false); }, 80); });

  notice.addEventListener('click', function (event) {
    if (event.target === notice) {
      event.preventDefault();
      event.stopPropagation();
      closeNotice();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (notice.hidden || !notice.classList.contains('is-open')) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeNotice();
      return;
    }
    if (event.key !== 'Tab') return;
    var focusable = Array.prototype.slice.call(card.querySelectorAll('a[href], button:not([disabled])'));
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();
