/* Invitación de Aula Google. La fecha ISO debe incluir la zona horaria. */
(() => {
  'use strict';
  if (window.__aulaGoogleInvitation) return;
  window.__aulaGoogleInvitation = true;
  const script = document.currentScript;
  if (!script) return;
  const eventStart = script.dataset.eventStart || '';
  const eventTime = Date.parse(eventStart);
  const registration = script.dataset.registration || '';
  let registrationUrl;
  try { registrationUrl = new URL(registration); } catch (_) { return; }
  // No aparece hasta contar con un horario confirmado y una inscripción válida.
  if (!Number.isFinite(eventTime) || registrationUrl.protocol !== 'https:' || Date.now() >= eventTime) return;

  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = new URL('aula-google-invitacion.css?v=20260929-2', script.src).href;
  document.head.appendChild(stylesheet);
  const posterUrl = new URL('assets/aula-google/invitacion-05-octubre.webp', script.src).href;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function start() {
    const dialog = document.createElement('dialog');
    dialog.className = 'ag-invite';
    dialog.setAttribute('aria-label', 'Invitación a la capacitación virtual de Aula Google');
    dialog.innerHTML = '<div class="ag-invite__poster">' +
      '<img class="ag-invite__image" width="1254" height="1254" alt="Secretaría de Educación Jalisco. Aprende a sacarle el máximo provecho al Aula Google de tu escuela. Sesión de presentación para escuelas que ya cuentan con este recurso. Transmisión en vivo el 5 de octubre a las 6 de la tarde, hora de Guadalajara.">' +
      '<div class="ag-invite__countdown" role="timer" aria-live="off"></div>' +
      '<a class="ag-invite__register" target="_blank" rel="noopener noreferrer" aria-label="Inscribirse a la capacitación virtual de Aula Google (abre en una pestaña nueva)"><span class="ag-invite__sr">Inscribirse</span></a>' +
      '<p class="ag-invite__sr ag-invite__status" role="status"></p>' +
      '</div><button class="ag-invite__close" type="button" aria-label="Cerrar invitación"><span aria-hidden="true">×</span></button>';
    const image = dialog.querySelector('img');
    image.src = posterUrl;
    const countdown = dialog.querySelector('.ag-invite__countdown');
    const close = dialog.querySelector('.ag-invite__close');
    const register = dialog.querySelector('.ag-invite__register');
    register.href = registrationUrl.href;
    const groups = ['días', 'horas', 'minutos', 'segundos'].map(label => {
      const group = document.createElement('div');
      group.className = 'ag-invite__group';
      group.setAttribute('aria-hidden', 'true');
      const cards = document.createElement('div');
      cards.className = 'ag-invite__cards';
      const digits = [0, 1].map(() => {
        const digit = document.createElement('div');
        digit.className = 'ag-invite__digit';
        const span = document.createElement('span');
        span.textContent = '0';
        digit.appendChild(span); cards.appendChild(digit);
        digit.addEventListener('animationend', () => digit.classList.remove('is-changing'));
        return digit;
      });
      const caption = document.createElement('span');
      caption.className = 'ag-invite__unit';
      caption.textContent = label;
      group.append(cards, caption);
      countdown.appendChild(group);
      return { label, digits };
    });
    document.body.appendChild(dialog);
    let previousFocus;
    let interval;
    let closeTimer;
    let closed = false;
    let openingTimer;
    const cleanup = () => {
      clearInterval(interval); clearTimeout(openingTimer); clearTimeout(closeTimer);
      document.removeEventListener('visibilitychange', update);
      window.removeEventListener('pageshow', update);
    };
    function finishClose() {
      if (closed) return;
      closed = true;
      cleanup();
      if (dialog.open) dialog.close();
      dialog.remove();
      if (previousFocus && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    }
    function closeAnimated() {
      if (closed || dialog.classList.contains('is-leaving')) return;
      dialog.classList.remove('is-entering');
      if (reducedMotion.matches) { finishClose(); return; }
      dialog.classList.add('is-leaving');
      closeTimer = setTimeout(finishClose, 460);
    }
    function update() {
      if (closed) return;
      const remaining = Math.max(0, eventTime - Date.now());
      const totalSeconds = Math.ceil(remaining / 1000);
      const values = [Math.floor(totalSeconds / 86400), Math.floor(totalSeconds / 3600) % 24, Math.floor(totalSeconds / 60) % 60, totalSeconds % 60];
      groups.forEach((group, index) => {
        const value = String(values[index]).padStart(2, '0');
        // La campaña próxima está dentro de 99 días; conserva dos casillas.
        group.digits.forEach((digit, i) => {
          const span = digit.firstElementChild;
          if (span.textContent === value[i]) return;
          span.textContent = value[i];
          if (dialog.open) digit.classList.add('is-changing');
        });
      });
      countdown.setAttribute('aria-label', 'Faltan ' + values[0] + ' días, ' + values[1] + ' horas, ' + values[2] + ' minutos y ' + values[3] + ' segundos para la sesión.');
      if (remaining === 0) {
        clearInterval(interval);
        dialog.querySelector('.ag-invite__status').textContent = 'La hora programada de la sesión ha llegado.';
        if (dialog.open) closeAnimated();
        else finishClose();
      }
    }
    close.addEventListener('click', closeAnimated);
    dialog.addEventListener('cancel', event => { event.preventDefault(); closeAnimated(); });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeAnimated();
    });
    dialog.addEventListener('animationend', event => {
      if (event.target === dialog && event.animationName === 'ag-leave') finishClose();
    });
    image.addEventListener('error', finishClose, { once: true });
    function show() {
      if (closed || Date.now() >= eventTime || !image.complete || !image.naturalWidth) return;
      if (document.visibilityState !== 'visible') {
        document.addEventListener('visibilitychange', function showWhenVisible() {
          if (document.visibilityState !== 'visible') return;
          document.removeEventListener('visibilitychange', showWhenVisible);
          show();
        });
        return;
      }
      update();
      if (closed) return;
      previousFocus = document.activeElement;
      dialog.classList.add('is-entering');
      dialog.showModal();
      close.focus({ preventScroll: true });
    }
    update();
    if (closed) return;
    interval = setInterval(update, 1000);
    document.addEventListener('visibilitychange', update);
    window.addEventListener('pageshow', update);
    openingTimer = setTimeout(() => {
      if (image.complete) show();
      else image.addEventListener('load', show, { once: true });
    }, 2000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
