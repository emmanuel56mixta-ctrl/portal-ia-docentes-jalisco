(function () {
  'use strict';
  function createModel(catalog) {
    const leaves = catalog.sections.flatMap(s => s.children || [s]);
    const sectionFor = id => leaves.find(s => s.id === id);
    const roleKeys = Object.keys(catalog.functions);
    const labels = {docente:'Docente', multigrado:'Docente multigrado', telesecundaria:'Docente de telesecundaria', fisica:'Docente de educación física', atp:'Asesoría técnico-pedagógica (ATP)'};
    function normalize(raw) {
      const empty = {view:'levels'};
      if (!raw || typeof raw !== 'object' || !['profiles','work','complete'].includes(raw.view)) return empty;
      const s = sectionFor(raw.section);
      if (!s) return empty;
      if (raw.view === 'profiles') return {view:'profiles', section:s.id};
      const c = s.constructors.find(c => c.id === raw.constructor);
      if (!c || (c.kind === 'management' && !roleKeys.includes(raw.role))) return {view:'profiles', section:s.id};
      const stage = Number.isInteger(raw.stage) && raw.stage >= 0 && raw.stage < 4 ? raw.stage : 0;
      const reviewed = Array.isArray(raw.reviewed) ? [...new Set(raw.reviewed.filter(n => Number.isInteger(n) && n >= 0 && n < 4))].sort() : [];
      const openedStage = Number.isInteger(raw.openedStage) && raw.openedStage >= 0 && raw.openedStage < 4 ? raw.openedStage : null;
      return {view:raw.view,section:s.id,constructor:c.id,role:c.kind === 'management' ? raw.role : '',stage,reviewed,openedStage};
    }
    function key(s) { return [s.section,s.constructor,s.role || ''].join(':'); }
    function hash(s) {
      s = normalize(s);
      if (s.view === 'levels') return '#niveles';
      if (s.view === 'profiles') return '#perfiles/' + s.section;
      return '#' + (s.view === 'complete' ? 'cierre' : 'trabajo') + '/' + s.section + '/' + s.constructor + (s.role ? '/' + s.role : '') + '/' + (s.stage + 1);
    }
    function fromHash(value) {
      let parts;
      try { parts = decodeURIComponent(value.replace(/^#/, '')).split('/'); } catch { return {view:'levels'}; }
      if (parts[0] === 'perfiles' && parts.length === 2) return normalize({view:'profiles',section:parts[1]});
      if (!['trabajo','cierre'].includes(parts[0]) || ![4,5].includes(parts.length) || !/^[1-4]$/.test(parts.at(-1))) return {view:'levels'};
      return normalize({view:parts[0] === 'cierre' ? 'complete' : 'work',section:parts[1],constructor:parts[2],role:parts.length === 5 ? parts[3] : '',stage:Number(parts.at(-1)) - 1});
    }
    function saved(value) {
      try {
        const raw = JSON.parse(value);
        if (!raw || raw.v !== 1) return null;
        const s = normalize(raw);
        return ['work','complete'].includes(s.view) ? s : null;
      } catch { return null; }
    }
    function profileLabel(s) {
      return s.constructor === 'gestion' ? catalog.functions[s.role].label : s.section === 'inicial' && s.constructor === 'docente' ? 'Agente educativo / docente' : labels[s.constructor] || 'Docente';
    }
    function describe(s) {
      const section = sectionFor(s.section);
      const constructor = section.constructors.find(c => c.id === s.constructor);
      const stages = catalog.route(section, constructor, s.role);
      return {section,constructor,stages,stage:stages[s.stage],label:profileLabel(s),url:catalog.gemFor(section,constructor,s.role)};
    }
    function prompt(s) {
      const d = describe(s);
      const prior = s.stage > 0 ? ' Retoma los acuerdos y resultados anteriores de esta conversación. Si no están disponibles, pídeme una síntesis antes de continuar; no los inventes.' : '';
      return 'Trabajo en ' + d.section.name + '. Mi perfil es ' + d.label + '. Etapa ' + (s.stage + 1) + ': ' + d.stage.name + '. ' + d.stage.example + prior + ' Acompáñame con preguntas y propuestas que yo pueda revisar y adaptar. Trabajaremos sin nombres ni datos personales.';
    }
    return {leaves,sectionFor,normalize,key,hash,fromHash,saved,profileLabel,describe,prompt};
  }
  if (typeof module !== 'undefined' && module.exports) { module.exports = {createModel}; return; }
  const catalog = window.ConstructorCatalog;
  const model = createModel(catalog);
  const esc = catalog.escapeHtml;
  const storageKey = 'docente-ia-recorrido-v1';
  const colors = {integral:'108,187,170',preescolar:'181,153,216',primaria:'219,180,116',secundaria:'129,173,221','media-superior':'212,151,169'};
  const views = {levels:document.getElementById('catalog-view'),profiles:document.getElementById('profiles-view'),work:document.getElementById('workspace-view'),complete:document.getElementById('complete-view')};
  const status = document.getElementById('route-status');
  const dialog = document.getElementById('handoff-dialog');
  let last = null;
  let busy = false;
  let pending = null;
  try { last = model.saved(localStorage.getItem(storageKey)); } catch {}
  function mergeSaved(next) {
    return last && ['work','complete'].includes(next.view) && model.key(last) === model.key(next) ? {...last,...next,reviewed:last.reviewed,openedStage:last.openedStage} : next;
  }
  let state = mergeSaved(model.fromHash(location.hash));
  function save() {
    if (!['work','complete'].includes(state.view)) return;
    last = model.normalize(state);
    try { localStorage.setItem(storageKey,JSON.stringify({v:1,...last})); } catch {}
  }
  function colorFor(id) { return colors[id] || colors.integral; }
  function announce(message) { status.textContent = message; }
  function navigate(next, replace = false) {
    state = model.normalize(next);
    save();
    if (model.hash(state) !== location.hash) history[replace ? 'replaceState' : 'pushState']({},'',model.hash(state));
    render(true);
  }
  function syncHistory() {
    state = mergeSaved(model.fromHash(location.hash));
    save();
    if (dialog.open) dialog.close();
    render(true);
  }
  window.addEventListener('popstate',syncHistory);
  window.addEventListener('hashchange',() => { if (model.hash(state) !== model.hash(model.fromHash(location.hash))) syncHistory(); });
  function levelButton(s) {
    return '<button type="button" class="level-entry" data-level="'+s.id+'"><span class="level-icon">'+catalog.svg(s.icon)+'</span><span class="level-title"><strong>'+esc(s.name)+'</strong><span>'+esc(s.caption)+'</span></span><span class="entry-arrow" aria-hidden="true">›</span></button>';
  }
  function renderLevels() {
    document.getElementById('niveles').innerHTML = catalog.sections.map(s => s.children ? '<details class="level" id="level-'+s.id+'"><summary><span class="level-icon">'+catalog.svg(s.icon)+'</span><span class="level-title"><strong>'+esc(s.name)+'</strong><span>'+esc(s.caption)+'</span></span><span class="entry-arrow" aria-hidden="true">⌄</span></summary><div class="area-options">'+s.children.map(levelButton).join('')+'</div></details>' : '<div class="level" id="level-'+s.id+'">'+levelButton(s)+'</div>').join('');
    views.levels.querySelectorAll('[data-level]').forEach(b => b.onclick = () => {
      catalog.track('section_open',b.dataset.level);
      navigate({view:'profiles',section:b.dataset.level});
    });
    const resume = document.getElementById('resume-route');
    resume.hidden = !last;
    if (last) {
      const d = model.describe(last);
      resume.innerHTML = '<div><strong>Continúa donde te quedaste</strong><p>'+esc(d.section.name)+' · '+esc(d.label)+'<br>Etapa '+(last.stage+1)+' · '+esc(d.stage.name)+'</p></div><button type="button" class="next">Continuar →</button>';
      resume.querySelector('button').onclick = () => navigate({...last,view:'work'});
    }
  }
  function profileOptions(section) {
    return section.constructors.flatMap(c => c.kind === 'management' ? Object.keys(catalog.functions).map(role => ({constructor:c.id,role,label:catalog.functions[role].label,description:role === 'direccion' ? 'Gestión y liderazgo del plantel' : role === 'supervision' ? 'Acompañamiento a las escuelas de la zona' : 'Articulación y seguimiento del sector',icon:c.icon})) : [{constructor:c.id,role:'',label:model.profileLabel({section:section.id,constructor:c.id}),description:c.kind === 'atp' ? 'Acompañamiento a docentes y colectivos' : c.id === 'multigrado' ? 'Trabajo con varios grados en un grupo' : c.id === 'telesecundaria' ? 'Articulación entre disciplinas' : section.id === 'especial' ? 'Inclusión y apoyos para el aprendizaje' : section.id === 'inicial' ? 'Primera infancia, juego y cuidado' : 'Planeación y evaluación con tu grupo',icon:c.icon}]);
  }
  function renderProfiles() {
    const s = model.sectionFor(state.section);
    views.profiles.style.setProperty('--section-rgb',colorFor(s.id));
    views.profiles.innerHTML = '<button class="text-button back-levels" type="button">← Cambiar nivel</button><p class="eyebrow">'+esc(s.name)+'</p><h1 id="profiles-title" tabindex="-1">Elige tu perfil</h1><p class="profile-intro">Abre el acompañamiento que corresponde a tu función.</p><div class="profile-options">'+profileOptions(s).map(p => '<button class="profile-option" type="button" data-profile="'+p.constructor+'" data-role="'+p.role+'"><span class="profile-option-icon">'+catalog.svg(p.icon)+'</span><span><strong>'+esc(p.label)+'</strong><small>'+esc(p.description)+'</small></span><span class="entry-arrow" aria-hidden="true">›</span></button>').join('')+'</div>';
    views.profiles.querySelector('.back-levels').onclick = () => navigate({view:'levels'});
    views.profiles.querySelectorAll('[data-profile]').forEach(b => b.onclick = () => {
      let next = model.normalize({view:'work',section:s.id,constructor:b.dataset.profile,role:b.dataset.role,stage:0});
      if (last && model.key(last) === model.key(next)) next = {...last,view:'work'};
      catalog.track('constructor_open',s.id,next.constructor,next.stage+1,next.role);
      if (next.role) catalog.track('role_select',s.id,next.constructor,next.stage+1,next.role);
      navigate(next);
    });
  }
  function reviewMarkup() {
    const done = state.reviewed.includes(state.stage);
    return '<div class="review-heading">'+(done ? '✓ Etapa revisada' : 'Al volver de Gemini')+'</div><p>'+(done ? 'Marcaste que revisaste y guardaste tu resultado. Puedes volver a ajustarlo cuando lo necesites.' : 'Revisa que la propuesta corresponda a tu contexto, realiza tus ajustes y guarda una copia.')+'</p>'+(done ? '' : '<button type="button" class="next mark-reviewed">Ya revisé y guardé mi resultado</button>');
  }
  function renderWork() {
    const d = model.describe(state);
    const isReady = catalog.validGemUrl(d.url);
    views.work.style.setProperty('--section-rgb',colorFor(state.section));
    views.work.innerHTML = '<div class="work-context"><div><p class="eyebrow">'+esc(d.section.name)+'</p><h1 id="work-title" tabindex="-1">'+esc(d.label)+'</h1></div><nav aria-label="Cambiar selección"><button class="text-button change-profile" type="button">Cambiar perfil</button><button class="text-button change-level" type="button">Cambiar nivel</button></nav></div><details class="stage-picker"><summary><span><small>Etapa '+(state.stage+1)+' de 4</small><strong>'+esc(d.stage.name)+'</strong></span><span class="picker-label">Ver etapas ⌄</span></summary><nav class="steps" aria-label="Etapas del recorrido">'+d.stages.map((x,n) => '<button class="step" type="button" data-stage="'+n+'" '+(n===state.stage?'aria-current="step"':'')+'><span class="number">'+(state.reviewed.includes(n)?'✓':n+1)+'</span><span>'+esc(x.name)+(state.reviewed.includes(n)?'<small class="state">Revisada</small>':'')+'</span></button>').join('')+'</nav></details><div class="work-card"><div class="eyebrow">'+esc(d.stage.name)+'</div><h2 id="module-title" tabindex="-1">'+esc(d.stage.title)+'</h2><p class="description">'+esc(d.stage.description)+'</p><div class="prepare"><strong>Ten a la mano</strong><p>'+esc(d.stage.prepare)+'</p></div>'+(state.stage>0?'<p class="continuity-note">Retoma la conversación donde empezaste en Gemini. Si abres una nueva, comparte primero una síntesis de tu trabajo anterior, sin datos personales.</p>':'')+'<details class="help"><summary>Ver un ejemplo para comenzar</summary><p class="example">'+esc(d.stage.example)+'</p></details><details class="help prompt-preview"><summary>Ver la indicación que se copiará</summary><textarea readonly rows="4" aria-label="Indicación para Gemini">'+esc(model.prompt(state))+'</textarea></details><p class="privacy-note">Comparte información general, sin nombres ni datos personales.</p></div><section class="review-panel" aria-label="Revisión del resultado">'+reviewMarkup()+'</section><div class="stage-navigation">'+(state.stage>0?'<button class="next previous-stage" type="button">← Etapa anterior</button>':'<span></span>')+'<button class="next next-stage" type="button">'+(state.stage<3?'Siguiente etapa →':'Revisar mi recorrido →')+'</button></div><p class="stage-freedom">Puedes cambiar de etapa si ya cuentas con el trabajo previo.</p><div class="gem-action-bar"><p>Se copiará una indicación. Pégala en Gemini y vuelve a esta pestaña.</p><button type="button" class="primary open-gem" '+(isReady?'':'disabled')+'>Copiar indicación y abrir Gemini ↗</button><button type="button" class="copy-only">Ya tengo Gemini abierto: solo copiar</button><p class="action-status" role="status"></p></div>';
    views.work.querySelector('.work-card').after(views.work.querySelector('.gem-action-bar'));
    views.work.querySelector('.change-profile').onclick = () => navigate({view:'profiles',section:state.section});
    views.work.querySelector('.change-level').onclick = () => navigate({view:'levels'});
    views.work.querySelectorAll('[data-stage]').forEach(b => b.onclick = () => goStage(Number(b.dataset.stage)));
    views.work.querySelector('.previous-stage')?.addEventListener('click',() => goStage(state.stage-1));
    views.work.querySelector('.next-stage').onclick = () => state.stage<3 ? goStage(state.stage+1) : navigate({...state,view:'complete'});
    views.work.querySelector('.open-gem').onclick = openGem;
    views.work.querySelector('.copy-only').onclick = copyOnly;
    bindReview();
  }
  function bindReview() {
    views.work.querySelector('.mark-reviewed')?.addEventListener('click',() => {
      state = model.normalize({...state,reviewed:[...state.reviewed,state.stage]});
      save();
      views.work.querySelector('.review-panel').innerHTML = reviewMarkup();
      const currentStep = views.work.querySelector('[data-stage="'+state.stage+'"]');
      currentStep.querySelector('.number').textContent = '✓';
      if (!currentStep.querySelector('.state')) currentStep.lastElementChild.insertAdjacentHTML('beforeend','<small class="state">Revisada</small>');
      const next = views.work.querySelector('.next-stage');
      next.focus({preventScroll:true});
      announce('Etapa marcada como revisada. Puedes continuar cuando estés listo.');
    });
  }
  function goStage(stage) {
    catalog.track('stage_select',state.section,state.constructor,stage+1,state.role);
    navigate({...state,view:'work',stage});
  }
  function renderComplete() {
    const d = model.describe(state);
    views.complete.style.setProperty('--section-rgb',colorFor(state.section));
    const all = state.reviewed.length === 4;
    views.complete.innerHTML = '<p class="eyebrow">'+esc(d.section.name)+' · '+esc(d.label)+'</p><h1 id="complete-title" tabindex="-1">'+(all?'Tu recorrido está revisado':'Revisa tu recorrido')+'</h1><p>Has marcado '+state.reviewed.length+' de 4 etapas como revisadas. Puedes volver a cualquiera para completar o ajustar tu trabajo.</p><div class="completion-list">'+d.stages.map((x,n) => '<button type="button" class="profile-option" data-stage="'+n+'"><span class="number">'+(state.reviewed.includes(n)?'✓':n+1)+'</span><span><strong>'+esc(x.name)+'</strong><small>'+(state.reviewed.includes(n)?'Revisada y guardada por ti':'Pendiente de revisión')+'</small></span><span class="entry-arrow" aria-hidden="true">›</span></button>').join('')+'</div><p class="saved-note">Conserva tus resultados en Gemini o en tus propios archivos. Este navegador recuerda tu selección y las etapas que marcaste; el portal no guarda tus documentos.</p><button class="primary finish-route" type="button">Volver al menú de niveles</button>';
    views.complete.querySelectorAll('[data-stage]').forEach(b => b.onclick = () => goStage(Number(b.dataset.stage)));
    views.complete.querySelector('.finish-route').onclick = () => navigate({view:'levels'});
  }
  function render(focus) {
    Object.entries(views).forEach(([name,el]) => el.hidden = name !== state.view);
    document.body.className = 'view-' + state.view;
    if (state.view === 'levels') renderLevels();
    if (state.view === 'profiles') renderProfiles();
    if (state.view === 'work') renderWork();
    if (state.view === 'complete') renderComplete();
    document.title = state.view === 'work' ? model.describe(state).stage.name+' · Constructor pedagógico' : 'Constructor pedagógico por niveles · Docente IA';
    if (focus) requestAnimationFrame(() => {
      const title = document.getElementById({levels:'catalog-title',profiles:'profiles-title',work:'work-title',complete:'complete-title'}[state.view]);
      title.focus({preventScroll:true});
      (state.view === 'levels' ? title : views[state.view]).scrollIntoView({block:'start',behavior:'auto'});
    });
  }
  function showManual(copied, message, seed, context) {
    pending = {seed,context};
    document.getElementById('handoff-message').textContent = message;
    document.getElementById('handoff-seed').value = seed;
    document.getElementById('manual-open').href = model.describe(context).url;
    document.getElementById('handoff-status').textContent = copied ? 'Indicación copiada.' : '';
    dialog.classList.toggle('already-copied',copied);
    dialog.showModal();
  }
  function copiedText(seed) {
    if (!navigator.clipboard?.writeText) return Promise.reject(new Error('clipboard-unavailable'));
    return navigator.clipboard.writeText(seed);
  }
  function markOpened(context) {
    if (model.key(state) !== model.key(context) || state.stage !== context.stage) return;
    state.openedStage = context.stage;
    save();
    catalog.track('gem_open',context.section,context.constructor,context.stage+1,context.role);
    const output = views.work.querySelector('.action-status');
    if (output) output.textContent = 'Pega la indicación en Gemini. Al volver, revisa y guarda tu resultado.';
  }
  async function openGem() {
    if (busy) return;
    const context = model.normalize(state);
    const d = model.describe(context);
    if (!catalog.validGemUrl(d.url)) return;
    busy = true;
    const button = views.work.querySelector('.open-gem');
    button.disabled = true;
    button.textContent = 'Preparando indicación…';
    const seed = model.prompt(context);
    let popup = null;
    let copied = false;
    try {
      // Both permission-sensitive operations start in the user's click gesture.
      const copying = copiedText(seed);
      copying.catch(() => {});
      popup = window.open('about:blank','_blank');
      if (popup) { popup.opener = null; popup.document.title = 'Abriendo Gemini'; popup.document.body.textContent = 'Preparando tu indicación para Gemini…'; }
      await copying;
      copied = true;
      if (popup && !popup.closed) { popup.location.replace(d.url); markOpened(context); }
      else showManual(true,'La indicación está copiada. Pulsa el botón para abrir Gemini y pégala allí.',seed,context);
    } catch {
      if (popup && !popup.closed) popup.close();
      showManual(copied,copied ? 'La indicación está copiada. Abre Gemini con el botón de abajo.' : 'No se pudo copiar automáticamente. Mantén presionada la indicación, cópiala y después abre Gemini.',seed,context);
    } finally {
      busy = false;
      button.disabled = false;
      button.textContent = 'Copiar indicación y abrir Gemini ↗';
    }
  }
  async function copyOnly() {
    const context = model.normalize(state);
    const seed = model.prompt(context);
    try {
      await copiedText(seed);
      views.work.querySelector('.action-status').textContent = 'Indicación copiada. Pégala en la conversación de Gemini donde ya estás trabajando.';
    } catch {
      showManual(false,'Selecciona y copia la indicación. Después, pégala en tu conversación de Gemini.',seed,context);
    }
  }
  dialog.querySelector('.close').onclick = () => dialog.close();
  dialog.addEventListener('click',event => { if (event.target === dialog) { const r=dialog.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close(); } });
  document.getElementById('manual-copy').onclick = async () => {
    if (!pending) return;
    try { await copiedText(pending.seed); document.getElementById('handoff-status').textContent='Indicación copiada. Ya puedes abrir Gemini.'; }
    catch { const field=document.getElementById('handoff-seed'); field.focus(); field.select(); document.getElementById('handoff-status').textContent='Usa Copiar en el menú de selección de tu teléfono.'; }
  };
  document.getElementById('manual-open').onclick = () => { if(pending)markOpened(pending.context); dialog.close(); };
  window.addEventListener('pageshow',() => { busy=false; const b=views.work.querySelector('.open-gem'); if(b){b.disabled=false;b.textContent='Copiar indicación y abrir Gemini ↗';} });
  render(false);
  if (['work','profiles','complete'].includes(state.view)) requestAnimationFrame(() => views[state.view].scrollIntoView({block:'start',behavior:'auto'}));
  catalog.track('page_view');
})();
