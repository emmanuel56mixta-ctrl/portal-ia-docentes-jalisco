/* El enlace permanente de Servicios Digitales DTI permanece en el inicio. */
(() => {
  'use strict';
  if (window.__dtiPromotion) return;
  window.__dtiPromotion = true;
  const script = document.currentScript;
  if (!script || typeof HTMLDialogElement === 'undefined') return;
  const base = script.src;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function start() {
    const dialog = document.createElement('dialog');
    dialog.className = 'dti-promo';
    dialog.setAttribute('aria-labelledby', 'dti-promo-title');
    dialog.setAttribute('aria-describedby', 'dti-promo-description');
    dialog.innerHTML = '<div class="dti-promo__art"><div class="dti-promo__content">' +
      '<h2 class="dti-promo__title" id="dti-promo-title">Recupera tu cuenta <span>institucional</span></h2>' +
      '<p class="dti-promo__description" id="dti-promo-description">Encuentra guías para solicitar cuentas para grupos de alumnos.</p>' +
      '<p class="dti-promo__section">Servicios Digitales DTI</p>' +
      '<a class="dti-promo__link" aria-label="Acceder a Servicios Digitales DTI">Acceder <span aria-hidden="true">→</span></a>' +
      '<p class="dti-promo__institution">Secretaría de Educación Jalisco</p></div>' +
      '<div class="dti-promo__picture"><img class="dti-promo__image" width="1672" height="941" alt="" decoding="async"></div></div>' +
      '<button class="dti-promo__close" type="button" aria-label="Cerrar promoción de Servicios Digitales DTI"><span aria-hidden="true">×</span></button>';
    const image = dialog.querySelector('img');
    image.src = new URL('assets/dti/servicios-dti-banner-v3.png', base).href;
    dialog.querySelector('.dti-promo__link').href = new URL('servicios-digitales-dti.html', base).href;
    const closeButton = dialog.querySelector('.dti-promo__close');
    let previousFocus;
    let closed = false;
    let ready = false;
    let openingTimer;
    let closeTimer;

    function finishClose() {
      if (closed) return;
      closed = true;
      clearTimeout(openingTimer);
      clearTimeout(closeTimer);
      document.removeEventListener('visibilitychange', show);
      document.documentElement.classList.remove('dti-promo-open');
      if (dialog.open) dialog.close();
      dialog.remove();
      if (previousFocus && previousFocus.isConnected) previousFocus.focus({preventScroll:true});
    }
    function closeAnimated() {
      if (closed || dialog.classList.contains('is-leaving')) return;
      dialog.classList.remove('is-entering');
      if (reducedMotion.matches) { finishClose(); return; }
      dialog.classList.add('is-leaving');
      closeTimer = setTimeout(finishClose, 500);
    }
    function show() {
      if (!ready || closed || dialog.open || document.visibilityState !== 'visible' || !image.complete || !image.naturalWidth) return;
      // Espera a que se cierre otra ventana; nunca apila dos promociones.
      if (document.querySelector('dialog[open]')) {
        openingTimer = setTimeout(show, 300);
        return;
      }
      previousFocus = document.activeElement;
      dialog.classList.add('is-entering');
      dialog.showModal();
      document.documentElement.classList.add('dti-promo-open');
      closeButton.focus({preventScroll:true});
    }
    closeButton.addEventListener('click', closeAnimated);
    dialog.addEventListener('cancel', event => { event.preventDefault(); closeAnimated(); });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeAnimated();
    });
    dialog.addEventListener('animationend', event => {
      if (event.target !== dialog) return;
      if (event.animationName === 'dti-promo-leave') finishClose();
      else if (event.animationName === 'dti-promo-enter') dialog.classList.remove('is-entering');
    });
    dialog.addEventListener('close', finishClose);
    image.addEventListener('error', finishClose, {once:true});
    image.addEventListener('load', show);
    document.body.appendChild(dialog);
    document.addEventListener('visibilitychange', show);
    openingTimer = setTimeout(() => { ready = true; show(); }, 1000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();
