/* Medición agregada opcional. No envía texto libre, URLs, cookies ni identificadores de usuario. */
(function (root) {
  'use strict';
  const constructors = {
    inicial: ['docente', 'gestion', 'atp'], especial: ['docente', 'gestion', 'atp'],
    indigena: ['docente', 'gestion', 'atp'], fisica: ['fisica', 'gestion', 'atp'],
    preescolar: ['docente', 'gestion', 'atp'], primaria: ['docente', 'multigrado', 'gestion', 'atp'],
    secundaria: ['docente', 'telesecundaria', 'gestion', 'atp'], 'media-superior': ['docente', 'gestion', 'atp']
  };
  const events = ['page_view', 'section_open', 'constructor_open', 'stage_select', 'role_select', 'gem_open'];
  function normalize(value) {
    if (!value || !events.includes(value.event)) return null;
    const event = value.event;
    if (event === 'page_view') return {event, section:'', constructor:'', stage:0, role:''};
    if (event === 'section_open') {
      if (value.section !== 'integral' && !Object.hasOwn(constructors, value.section)) return null;
      return {event, section:value.section, constructor:'', stage:0, role:''};
    }
    if (!Object.hasOwn(constructors, value.section) || !constructors[value.section].includes(value.constructor)) return null;
    if (!Number.isInteger(value.stage) || value.stage < 1 || value.stage > 4) return null;
    const role = value.constructor === 'gestion' ? value.role : '';
    if (value.constructor === 'gestion' && !['direccion','supervision','sector'].includes(role)) return null;
    if (event === 'role_select' && value.constructor !== 'gestion') return null;
    return {event, section:value.section, constructor:value.constructor, stage:value.stage, role};
  }
  function endpointFor(config, location) {
    if (!config || config.enabled !== true || !config.endpoint || location.protocol !== 'https:') return null;
    try {
      const u = new URL(config.endpoint, location.href);
      if (u.origin !== location.origin || u.username || u.password || u.hash || u.search) return null;
      if (!u.pathname.endsWith('/wp-json/docente-ia/v1/event')) return null;
      return u.href;
    } catch { return null; }
  }
  function createTracker(env) {
    const endpoint = endpointFor(env.config, env.location);
    const recent = new Map();
    let viewed = false, failed = false, sent = 0;
    return {track(value) {
      if (!endpoint || failed || env.navigator.doNotTrack === '1' || env.navigator.globalPrivacyControl === true) return false;
      const data = normalize(value);
      if (!data || (data.event === 'page_view' && viewed) || sent >= 300) return false;
      const key = JSON.stringify(data), now = env.now();
      if (recent.has(key) && now - recent.get(key) < 1200) return false;
      recent.set(key, now);
      for (const [k,time] of recent) if (now-time > 1200) recent.delete(k);
      if (data.event === 'page_view') viewed = true;
      sent++;
      // No reintentos: un fallo de medición nunca interrumpe la navegación ni duplica conteos.
      try {
        Promise.resolve(env.fetch(endpoint, {method:'POST', mode:'same-origin', credentials:'omit',
          headers:{'Content-Type':'application/json'}, body:JSON.stringify(data),
          keepalive:true, cache:'no-store', referrerPolicy:'no-referrer'}))
          .then(response => {if (!response.ok) failed=true;}).catch(() => {failed=true;});
      } catch { failed=true; return false; }
      return true;
    }};
  }
  if (typeof module !== 'undefined' && module.exports) module.exports={normalize,endpointFor,createTracker};
  if (root?.document) root.ConstructorUsage=createTracker({config:root.CONSTRUCTOR_CONFIG?.measurement,
    location:root.location, navigator:root.navigator, now:()=>Date.now(), fetch:root.fetch.bind(root)});
})(typeof window !== 'undefined' ? window : null);
