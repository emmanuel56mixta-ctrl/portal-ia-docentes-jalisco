/* Recommendations before leaving the constructor. No model recommendations. */
(() => {
  const trigger = document.getElementById('open');
  if (!trigger) return;

  /*
    Reorganiza las funciones existentes dentro del mismo instrumento.
    No elimina contenido ni altera la lógica de los cuatro módulos.
  */
  function organizeConstructorFlow() {
    const work = document.getElementById('work');
    const start = document.getElementById('start');
    const helps = start && start.querySelector('.helps');
    const returnBlock = document.getElementById('return');
    const foot = document.querySelector('.layout .foot');
    const review = document.getElementById('review');

    if (!work || !start) return;

    /* Los apoyos opcionales aparecen antes de la acción principal. */
    if (helps && helps.parentElement === start && trigger.parentElement === start) {
      start.insertBefore(helps, trigger);
    }

    /* El punto de regreso queda dentro del recorrido del paso activo. */
    if (returnBlock && returnBlock.parentElement !== start) {
      start.appendChild(returnBlock);
    }

    /* El recordatorio de criterio y privacidad cierra el mismo instrumento. */
    if (foot && foot.parentElement !== work) {
      work.appendChild(foot);
    }

    if (review) {
      review.textContent = 'Revisar lo que debo guardar →';
    }

    work.classList.add('constructor-flow-ready');
  }

  organizeConstructorFlow();

  const panels = [
    ['Una Gema es un apoyo, no un reemplazo', 'Las Gemas ofrecen orientaciones y sugerencias para el diagnóstico, el programa analítico, la planeación y la evaluación.', 'Nunca sustituyen tu conocimiento, experiencia ni criterio profesional. Revisa, adapta y valida cada propuesta según las necesidades, el contexto y los aprendizajes de tu grupo.'],
    ['Cuida la información que compartes', 'Accede con tu cuenta institucional @jaliscoedu.mx. Describe el contexto y las necesidades generales de tu grupo.', 'No ingreses nombres ni datos personales del alumnado. Comparte únicamente la información necesaria para trabajar tu propuesta.'],
    ['Guarda tu trabajo y vuelve aquí', 'La Gema se abrirá en Gemini, en otra pestaña. Realiza la actividad y revisa el resultado antes de utilizarlo.', 'Copia o guarda la propuesta en un documento de tu elección y regresa a este constructor para continuar. El portal no guarda el resultado ni lo transfiere automáticamente a la siguiente Gema.']
  ];
  const dialog = document.createElement('dialog');
  dialog.className = 'constructor-guidance';
  dialog.setAttribute('aria-labelledby', 'guidanceHeading');
  dialog.innerHTML = '<div class="guidance-top"><span>ANTES DE ABRIR LA GEMA</span><button type="button" class="guidance-close" aria-label="Cerrar recomendaciones">×</button></div><p class="guidance-count"></p><div class="guidance-panel"><h2 id="guidanceHeading" tabindex="-1"></h2><p class="guidance-copy"></p><p class="guidance-emphasis"></p></div><div class="guidance-actions"><button type="button" class="guidance-prev">Anterior</button><button type="button" class="guidance-next">Siguiente →</button><a class="guidance-launch" target="_blank" rel="noopener noreferrer" hidden>Entendido, abrir la Gema ↗</a></div>';
  document.body.appendChild(dialog);
  const panel = dialog.querySelector('.guidance-panel');
  const heading = dialog.querySelector('h2');
  const prev = dialog.querySelector('.guidance-prev');
  const next = dialog.querySelector('.guidance-next');
  const launch = dialog.querySelector('.guidance-launch');
  let index = 0;
  let busy = false;
  let revision = 0;
  function paint(focus) {
    heading.textContent = panels[index][0];
    dialog.querySelector('.guidance-copy').textContent = panels[index][1];
    dialog.querySelector('.guidance-emphasis').textContent = panels[index][2];
    dialog.querySelector('.guidance-count').textContent = 'Recomendación ' + (index + 1) + ' de ' + panels.length;
    prev.disabled = index === 0;
    next.hidden = index === panels.length - 1;
    launch.hidden = !next.hidden;
    if (focus) heading.focus();
  }
  async function change(direction) {
    if (busy || index + direction < 0 || index + direction >= panels.length) return;
    busy = true;
    const token = ++revision;
    const motion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches && typeof panel.animate === 'function';
    if (motion) await panel.animate([{opacity:1,transform:'translateX(0)'},{opacity:0,transform:'translateX(' + (-direction * 24) + 'px)'}],{duration:120,easing:'ease-in'}).finished.catch(() => {});
    if (token !== revision || !dialog.open) return;
    index += direction;
    paint(true);
    if (motion) panel.animate([{opacity:0,transform:'translateX(' + (direction * 24) + 'px)'},{opacity:1,transform:'translateX(0)'}],{duration:220,easing:'ease-out'});
    busy = false;
  }
  trigger.addEventListener('click', event => {
    event.preventDefault();
    revision++; busy = false; index = 0;
    launch.href = trigger.href;
    paint(false);
    dialog.showModal();
    heading.focus();
  });
  prev.addEventListener('click', () => change(-1));
  next.addEventListener('click', () => change(1));
  dialog.querySelector('.guidance-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {revision++;busy=false;trigger.focus();});
  launch.addEventListener('click', () => dialog.close());
})();
