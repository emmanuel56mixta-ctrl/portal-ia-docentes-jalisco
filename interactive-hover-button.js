/* Progressive enhancement: preserves links, listeners and accessible labels. */
(() => {
  const selector = '.portal-final-action,a.cta,a.btn,a.start,a.playlist,a.gm-open,a.s3btn,a.b1,.tool-dialog-open,.gem-safety-open,.et-open,.freemode .fbtn,.gobtn,.explore,.bb-btn,.character-home__button,.learn-ai-home__primary,a.primary,button.primary';
  function enhance(el) {
    if (el.querySelector(':scope > .ihb-label') || el.closest('nav,footer') || el.querySelector('input,select,textarea')) return;
    const text = el.textContent.trim();
    if (!text || text.length > 100) return;
    const owner = el.closest('a,button');
    if (!owner) return;
    el.classList.add('ihb');
    if (!owner.classList.contains('ihb-trigger')) {
      owner.classList.add('ihb-trigger');
      owner.addEventListener('pointerenter', () => { if (!owner.disabled) owner.classList.add('ihb-active'); });
      owner.addEventListener('pointerleave', () => owner.classList.remove('ihb-active'));
      owner.addEventListener('pointercancel', () => owner.classList.remove('ihb-active'));
      owner.addEventListener('blur', () => owner.classList.remove('ihb-active'));
    }
    const label = document.createElement('span'); label.className = 'ihb-label';
    while (el.firstChild) label.appendChild(el.firstChild);
    const hover = document.createElement('span'); hover.className = 'ihb-hover'; hover.setAttribute('aria-hidden', 'true');
    const copy = document.createElement('span'); copy.textContent = text.replace(/[→↗▸►➜]+\s*$/u, '').trim();
    const arrow = document.createElement('span'); arrow.className = 'ihb-arrow'; arrow.textContent = '→';
    hover.append(copy, arrow); el.append(label, hover);
  }
  function scan(root) {
    if (root.nodeType !== 1) return;
    if (root.matches(selector)) enhance(root);
    root.querySelectorAll(selector).forEach(enhance);
  }
  scan(document.body);
  new MutationObserver(records => {
    for (const record of records) {
      if (record.target.nodeType === 1 && record.target.matches(selector)) enhance(record.target);
      record.addedNodes.forEach(scan);
    }
  }).observe(document.body, {childList:true, subtree:true});
})();
