/* Docente IA: nombres accesibles y alternativas textuales, 2026-09-29.
   Mejora progresiva: conserva destinos, eventos, pestañas y diálogos nativos.
   Las descripciones son editoriales; nunca se inventan a partir del archivo. */
(() => {
  'use strict';
  if (window.__docenteAccessibility) return;
  window.__docenteAccessibility = true;
  const source = document.currentScript;
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = new URL('portal-accessibility.css?v=20260929-1', source && source.src ? source.src : document.baseURI).href;
  document.head.appendChild(css);

  const normalize = value => String(value || '').replace(/\s+/g, ' ').trim();
  const set = (el, key, value) => {
    if (el && el.getAttribute(key) !== value) el.setAttribute(key, value);
  };
  const visibleText = el => {
    const copy = el.cloneNode(true);
    copy.querySelectorAll('[aria-hidden="true"],.ihb-hover,.sr-only,.a11y-sr,svg').forEach(n => n.remove());
    return normalize(copy.textContent).replace(/\s*[→↗›]+\s*$/u, '').trim();
  };
  // Only simple, explicitly selected buttons: keep their event-owning element.
  function labelButton(button, text) {
    if (!button) return;
    const label = button.querySelector(':scope > .ihb-label') || button;
    if (visibleText(label) !== text) {
      const icons = [...label.querySelectorAll('svg')];
      label.replaceChildren(document.createTextNode(text), ...icons);
    }
    const hoverCopy = button.querySelector('.ihb-hover > span:not(.ihb-arrow)');
    if (hoverCopy && hoverCopy.textContent !== text) hoverCopy.textContent = text;
    if (button.hasAttribute('aria-label')) set(button, 'aria-label', text);
  }
  function describeControl(el, id) {
    const ids = new Set((el.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean));
    ids.add(id);
    set(el, 'aria-describedby', [...ids].join(' '));
  }
  const descriptions = {
    cabinet: {
      title: 'Descripción del gabinete y sus componentes',
      paragraphs: [
        'El explorador muestra el gabinete del Aula Google con las puertas cerradas. El botón «Abrir gabinete» cambia a la vista abierta; «Cerrar gabinete» vuelve a la vista inicial.',
        'En la vista abierta hay cuatro controles numerados: 1, Chromebook de estudiantes; 2, conexión y organización dentro del gabinete; 3, centro de carga en la parte inferior; 4, ruedas y traslado. Cada número abre la información del componente.',
        'El Aula Google resguarda 40 Chromebooks en espacios separados, con sus cables de carga organizados. El gabinete tiene cuatro ruedas de uso rudo. La ilustración es una referencia: la distribución se comprueba en el modelo del plantel.',
        'Con teclado, usa Tab para llegar a los controles, Enter o Espacio para activarlos y Escape para cerrar una ventana de información. Al cerrarla, el foco regresa al control que la abrió.'
      ]
    },
    ports: {
      title: 'Descripción de los puertos de la Chromebook',
      paragraphs: [
        'La vista lateral de referencia identifica cuatro conexiones. En la imagen ampliada, de izquierda a derecha, los controles numerados indican: 1, entrada combinada de audífonos y micrófono; 2, lector microSD; 3, USB-A; 4, USB-C.',
        'Los mismos puertos se pueden elegir con los botones Audio, microSD, USB-A y USB-C, sin necesidad de localizar los números sobre la fotografía. Al elegir uno se muestra su explicación.',
        'Esta vista corresponde a los equipos del alumnado, que no tienen HDMI. La ubicación y disponibilidad de las conexiones deben comprobarse en el modelo del plantel; la conexión HDMI mostrada en otra fotografía corresponde al equipo docente.'
      ]
    },
    keyboard: {
      title: 'Descripción de las teclas destacadas',
      paragraphs: [
        'La fotografía y el esquema destacan cuatro funciones del teclado: Búsqueda o Launcher en azul; Mostrar ventanas en violeta; brillo en amarillo; volumen en verde. Los colores se añadieron a la imagen como apoyo: no son el color de las teclas físicas.',
        'Búsqueda permite localizar aplicaciones; Mostrar ventanas permite revisar las ventanas abiertas; brillo ajusta la iluminación de la pantalla; volumen ajusta el sonido. La ubicación exacta cambia según el modelo.',
        'En «Ver teclas y funciones» puedes elegir cada función con botones de texto. Las combinaciones de la sección de atajos también están escritas debajo de cada imagen; no necesitas distinguir los colores para conocerlas.'
      ]
    }
  };
  function addDescription(host, key, images) {
    if (!host) return;
    const id = 'a11y-description-' + key;
    let details = document.getElementById(id);
    if (!details) {
      details = document.createElement('details');
      details.id = id;
      details.className = 'a11y-image-description';
      const summary = document.createElement('summary');
      summary.textContent = descriptions[key].title;
      const body = document.createElement('div');
      descriptions[key].paragraphs.forEach(text => {
        const p = document.createElement('p'); p.textContent = text; body.appendChild(p);
      });
      details.append(summary, body);
      host.appendChild(details);
    }
    // The native disclosure is usable even without aria-details support.
    images.forEach(img => set(img, 'aria-details', id));
  }

  function start() {
    const aula = document.body.classList.contains('aula-google-page');
    const tutorialLabels = {
      acceso: 'Iniciar sesión en la Chromebook',
      conectar: 'Conectar cargador y accesorios',
      touchpad: 'Usar el panel táctil',
      archivos: 'Guardar y encontrar archivos',
      proyeccion: 'Proyectar desde el equipo docente'
    };
    // Explicit, reviewed alternatives for informational images. Other existing
    // alternatives (including intentional alt="") remain unchanged.
    const imageAlternatives = {
      'gabinete-cerrado.webp': 'Gabinete móvil del Aula Google con las puertas cerradas.',
      'gabinete-abierto.webp': 'Gabinete abierto. Cuatro puntos de consulta: 1, Chromebook de estudiantes; 2, organización y conexiones; 3, centro de carga inferior; 4, ruedas y traslado.',
      'chromebook-frontal.webp': 'Vista frontal de una Chromebook HP abierta, con pantalla, teclado y panel táctil.',
      'puertos-chromebook.webp': 'Vista lateral de la Chromebook del alumnado: entrada de audio, lector microSD, USB-A y USB-C. Este equipo no tiene HDMI.',
      'teclado-chromebook.webp': 'Teclado de Chromebook con cuatro funciones destacadas: Búsqueda, Mostrar ventanas, brillo y volumen. Los colores de la imagen son apoyos de identificación.',
      'conexion-docente.webp': 'Conexión HDMI del equipo docente para la proyección. No corresponde a las 40 Chromebooks del alumnado.'
    };
    let unique = 0;
    function ensureId(el, prefix) {
      if (!el.id) {
        let id;
        do { id = prefix + '-' + (++unique); } while (document.getElementById(id));
        el.id = id;
      }
      return el.id;
    }
    function items(root, selector) {
      return [...(root.matches && root.matches(selector) ? [root] : []), ...root.querySelectorAll(selector)];
    }
    function enhance(root) {
      if (!root || root.nodeType !== 1 || !root.isConnected) return;
      // Shared Gem controls: the visible verb is kept in the accessible name.
      items(root, '.js-gem-open[data-name]').forEach(button => {
        const name = normalize(button.dataset.name);
        const text = visibleText(button);
        if (name && /^(Abrir Gema|Abrir|Acceder|Entrar)$/i.test(text)) {
          set(button, 'aria-label', text + ': ' + name);
        }
      });
      if (!aula) return;
      items(root, '.photo-step button[data-tutorial]').forEach(button => {
        const text = tutorialLabels[button.dataset.tutorial];
        if (text) labelButton(button, text);
      });
      items(root, 'button[data-special="keyboard"]').forEach(button => labelButton(button, 'Ver teclas y funciones'));
      items(root, 'button[data-special="ports"]').forEach(button => labelButton(button, 'Explorar puertos de la Chromebook'));
      items(root, '#cabinet-open').forEach(button => labelButton(button, 'Abrir gabinete'));
      items(root, '#loan-download').forEach(button => labelButton(button, 'Descargar registro de préstamo (CSV)'));
      items(root, '#continuity-download').forEach(button => labelButton(button, 'Descargar ficha sin internet (HTML)'));
      items(root, 'button[data-tutorial],button[data-special],button[data-shortcut]').forEach(button => {
        set(button, 'aria-haspopup', 'dialog');
        set(button, 'aria-controls', 'tutorial-dialog');
      });
      items(root, '[data-shortcut]').forEach(button => {
        const combo = button.closest('.shortcut')?.querySelector('.key-combo');
        if (combo) describeControl(button, ensureId(combo, 'a11y-shortcut'));
      });
      items(root, 'img').forEach(img => {
        const filename = (img.getAttribute('src') || '').split('/').pop().split('?')[0];
        if (imageAlternatives[filename]) set(img, 'alt', imageAlternatives[filename]);
      });
      items(root, '#keyboard-detail,#port-detail').forEach(el => {
        set(el, 'aria-live', 'polite'); set(el, 'aria-atomic', 'true');
      });
      items(root, '#tutorial-dialog').forEach(el => set(el, 'aria-labelledby', 'dialog-title'));
      items(root, '#component-dialog').forEach(el => set(el, 'aria-labelledby', 'component-title'));
      items(root, '.dialog-actions a').forEach(link => {
        const title = link.closest('dialog')?.querySelector('#dialog-title')?.textContent;
        const text = visibleText(link);
        if (title && /^(Consultar ayuda oficial|Consultar ayuda de Google)$/i.test(text)) {
          set(link, 'aria-label', text + ': ' + normalize(title));
        }
      });
      // El nombre se conserva en la lista de enlaces del lector de pantalla.
      items(root, 'a[target="_blank"]').forEach(link => {
        const name = normalize(link.getAttribute('aria-label')) || visibleText(link);
        if (name && !/se abre en una nueva pestaña/i.test(name)) {
          set(link, 'aria-label', name + ' (se abre en una nueva pestaña)');
        }
      });
      // One optional description per topic, outside clipped image containers.
      const cabinet = document.getElementById('cabinet-explorer');
      addDescription(cabinet, 'cabinet', [...document.querySelectorAll('#cabinet-explorer img')]);
      for (const [key, photo] of [['ports', 'side'], ['keyboard', 'keyboard']]) {
        const img = document.querySelector('.photo-step img[data-photo="' + photo + '"]');
        const host = img?.closest('.photo-step')?.lastElementChild;
        addDescription(host, key, img ? [img] : []);
      }
    }
    enhance(document.body);
    // Observe added content for native dialogs and cards. Attribute writes do
    // not trigger this observer. A batch is processed once, not once per node.
    const observer = new MutationObserver(records => {
      const roots = new Set();
      for (const record of records) {
        const target = record.target;
        if (target.nodeType === 1 && target.closest('.a11y-image-description,.a11y-sr')) continue;
        if (target.nodeType === 1) roots.add(target.closest('button,a') || target);
        for (const node of record.addedNodes) if (node.nodeType === 1) roots.add(node);
      }
      [...roots].filter(root => ![...roots].some(other => other !== root && other.contains(root))).forEach(enhance);
    });
    observer.observe(document.body, {childList: true, subtree: true});
    if (!aula) return;
    const status = document.createElement('p');
    status.id = 'a11y-download-status'; status.className = 'a11y-sr';
    status.setAttribute('role', 'status'); status.setAttribute('aria-atomic', 'true');
    document.body.appendChild(status);
    let downloadTimer;
    document.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button) return;
      if (button.id === 'cabinet-open' || button.id === 'cabinet-reset') {
        queueMicrotask(() => {
          const note = document.getElementById('cabinet-instruction');
          if (!note) return;
          set(note, 'aria-atomic', 'true');
          const expanded = document.getElementById('cabinet-open')?.getAttribute('aria-expanded') === 'true';
          note.textContent = expanded
            ? 'Gabinete abierto. Explora los cuatro componentes: equipos, organización, centro de carga y ruedas.'
            : 'Gabinete cerrado. Activa Abrir gabinete para conocer sus componentes.';
        });
      }
      if (button.id === 'loan-download' || button.id === 'continuity-download') {
        clearTimeout(downloadTimer); status.textContent = '';
        downloadTimer = setTimeout(() => {
          status.textContent = button.id === 'loan-download'
            ? 'Se solicitó la descarga del registro de préstamo en formato CSV. Revisa las descargas de tu navegador.'
            : 'Se solicitó la descarga de la ficha sin internet en formato HTML. Revisa las descargas de tu navegador.';
        }, 80);
      }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once: true});
  else start();
})();
