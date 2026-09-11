(function () {
  'use strict';

  var currentScript = document.currentScript;
  var style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = new URL('gem-model-notice.css?v=20260828-modelnotice2', currentScript && currentScript.src ? currentScript.src : window.location.href).href;
  document.head.appendChild(style);

  /* Nombres editoriales de las Gemas de Formación del Carácter.
     Se conserva cada herramienta, enlace y funcionamiento; solo cambia
     la jerarquía visible: nombre principal y descripción debajo. */
  function applyCharacterGemTitles() {
    var firstGem = document.querySelector('.gem-card img[src*="gema-dilemas-morales"]');
    if (!firstGem) return;

    var labels = [
      { title: 'Dilemas que forman', subtitle: 'Generador de dilemas morales' },
      { title: 'Cuentos con carácter', subtitle: 'Generador de cuentos personalizados' },
      { title: 'Brújula del carácter', subtitle: 'Alineación de acciones de Formación del Carácter' }
    ];
    var cards = document.querySelectorAll('.gem-grid .gem-card');
    if (cards.length < labels.length) return;

    if (!document.getElementById('characterGemTitleStyles')) {
      var titleStyles = document.createElement('style');
      titleStyles.id = 'characterGemTitleStyles';
      titleStyles.textContent = [
        '.gem-overlay .character-gem-title{margin:0;color:#fff;font-family:\'Archivo\',sans-serif;font-size:22px;font-weight:900;line-height:1.03;letter-spacing:-.5px;text-shadow:0 2px 12px rgba(0,0,0,.5)}',
        '.gem-overlay .character-gem-subtitle{display:block;margin-top:8px;color:#f0d9e2;font-family:\'Inter\',system-ui,sans-serif;font-size:13px;font-weight:500;font-style:italic;line-height:1.35;letter-spacing:0;text-transform:none;text-shadow:0 1px 8px rgba(0,0,0,.58)}',
        '@media(max-width:480px){.gem-overlay .character-gem-title{font-size:20px}.gem-overlay .character-gem-subtitle{font-size:12.5px}}'
      ].join('');
      document.head.appendChild(titleStyles);
    }

    Array.prototype.forEach.call(labels, function (label, index) {
      var card = cards[index];
      var overlay = card.querySelector('.gem-overlay');
      var title = overlay && overlay.querySelector('h3');
      var subtitle = overlay && overlay.querySelector('.gem-type');
      var button = card.querySelector('.js-gem-open');

      if (title && subtitle) {
        title.textContent = label.title;
        subtitle.textContent = label.subtitle;
        title.classList.add('character-gem-title');
        subtitle.classList.add('character-gem-subtitle');
        overlay.insertBefore(title, subtitle);
      }

      if (button) {
        button.dataset.name = label.title;
        button.setAttribute('aria-label', 'Abrir Gema ' + label.title);
      }
    });
  }

  applyCharacterGemTitles();

  /* Gema exclusiva de la página Banco de Gemas especializadas.
     No se agrega al Kit ni a otras páginas del portal. */
  function addPreschoolAdvisorGem() {
    var grid = document.getElementById('bgGrid');
    if (!grid || document.querySelector('[data-gem-id="asesor-planes-acompanamiento-sej"]')) return;

    if (!document.getElementById('preschoolAdvisorGemStyles')) {
      var cardStyles = document.createElement('style');
      cardStyles.id = 'preschoolAdvisorGemStyles';
      cardStyles.textContent = [
        '#bgGrid .hg-card[data-gem-id="asesor-planes-acompanamiento-sej"] .preschool-advisor-thumb{background:radial-gradient(circle at 82% 18%,rgba(255,174,210,.26),transparent 33%),linear-gradient(150deg,#5b1741,#190919)}',
        '#bgGrid .hg-card[data-gem-id="asesor-planes-acompanamiento-sej"] .preschool-advisor-thumb span{font-size:14.5px;line-height:1.14;text-transform:none}',
        '#bgGrid .hg-card[data-gem-id="asesor-planes-acompanamiento-sej"] .hg-desc{margin:0;color:var(--muted);font-size:12.5px;line-height:1.5}',
        '@media(max-width:500px){#bgGrid .hg-card[data-gem-id="asesor-planes-acompanamiento-sej"] .preschool-advisor-thumb span{font-size:15px}}'
      ].join('');
      document.head.appendChild(cardStyles);
    }

    var card = document.createElement('a');
    card.className = 'hg-card';
    card.setAttribute('data-gem-id', 'asesor-planes-acompanamiento-sej');
    card.setAttribute('data-eje', 'Preescolar');
    card.setAttribute('data-search', 'asesor de planes de acompanamiento sej asesor planes acompanamiento para jefas y jefes de sector nivel preescolar supervision preescolar gestion liderazgo directivo seguimiento');
    card.href = 'https://gemini.google.com/gem/1seXHl-kVHombpVhAPVzmQEMvmtTwOEkP?usp=sharing';
    card.target = '_blank';
    card.rel = 'noopener';
    card.title = 'Se abre en Gemini, en pestaña nueva';
    card.setAttribute('aria-label', 'Abrir Gema Asesor de planes de acompañamiento SEJ');
    card.innerHTML = [
      '<div class="hg-thumb preschool-advisor-thumb"><span>Asesor de planes de acompañamiento SEJ</span></div>',
      '<div class="hg-body">',
      '  <p class="hg-desc">Asesor de planes de acompañamiento para Jefas y Jefes de sector de nivel preescolar.</p>',
      '  <div class="hg-chips"><span class="hg-tag" style="color:#ff7aa8;border-color:#ff7aa855">Preescolar</span><span class="hg-campo">Jefaturas de sector</span></div>',
      '  <div class="hg-stats"><span class="hg-eje" style="color:#ff7aa8">● Acompañamiento SEJ</span></div>',
      '</div>'
    ].join('');
    grid.insertBefore(card, grid.firstElementChild);

    function normalizeText(text) {
      return (text || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    function syncCardWithBankFilters() {
      var activeChip = document.querySelector('.bg-chip.on');
      var activeAxis = activeChip ? activeChip.getAttribute('data-eje') : 'todos';
      var input = document.getElementById('bgInput');
      var query = normalizeText(input ? input.value.trim() : '');
      var matchesAxis = activeAxis === 'todos' || activeAxis === 'Preescolar';
      var matchesSearch = !query || card.getAttribute('data-search').indexOf(query) !== -1;
      var visible = matchesAxis && matchesSearch;
      card.style.display = visible ? '' : 'none';

      var empty = document.getElementById('bgEmpty');
      if (empty && visible) empty.hidden = true;
    }

    var searchInput = document.getElementById('bgInput');
    var chipGroup = document.querySelector('.bg-chips');
    var clearButton = document.getElementById('bgClear');

    if (searchInput) searchInput.addEventListener('input', syncCardWithBankFilters);
    if (chipGroup) chipGroup.addEventListener('click', function () {
      window.setTimeout(syncCardWithBankFilters, 0);
    });
    if (clearButton) clearButton.addEventListener('click', function () {
      window.setTimeout(syncCardWithBankFilters, 0);
    });

    syncCardWithBankFilters();
  }

  addPreschoolAdvisorGem();

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
      '  <p class="gem-model-notice-tip"><strong>Evita utilizar Flash</strong> en estos procesos guiados, ya que puede omitir pasos importantes. Accede con tu cuenta <strong>@jaliscoedu.mx</strong> y no ingreses datos personales del alumnado.</p>',
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

  function openNotice(trigger, href, target) {
    if (closeTimer) {
      window.clearTimeout(closeTimer);
      closeTimer = 0;
    }
    lastTrigger = trigger;
    openLink.href = href;
    if (target) {
      openLink.target = target;
      openLink.rel = 'noopener';
    } else {
      openLink.removeAttribute('target');
      openLink.removeAttribute('rel');
    }
    notice.hidden = false;
    document.body.classList.add('gem-model-notice-active');
    window.requestAnimationFrame(function () {
      notice.classList.add('is-open');
      closeButton.focus();
    });
  }

  function closeNotice(returnFocus) {
    notice.classList.remove('is-open');
    document.body.classList.remove('gem-model-notice-active');
    closeTimer = window.setTimeout(function () {
      notice.hidden = true;
      closeTimer = 0;
      if (returnFocus !== false && lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
    }, 210);
  }

  document.addEventListener('click', function (event) {
    var trigger = event.target.closest && event.target.closest('a[href], button[data-gema], button[data-url]');
    if (!trigger) return;
    var isLink = trigger.tagName === 'A';
    var href = isLink ? trigger.href : (trigger.getAttribute('data-gema') || trigger.getAttribute('data-url') || '');
    if (!isGemLink(href)) return;
    if (trigger.matches('.tool-trigger, .tool-dialog-open, .gem-safety-open, [data-gem-notice-skip]')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openNotice(trigger, href, isLink ? trigger.target : '_blank');
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
