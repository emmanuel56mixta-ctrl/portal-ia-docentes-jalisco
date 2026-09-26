(() => {
  const hero = document.querySelector('.hero');
  const video = hero?.querySelector('.hero-video');
  const toggle = hero?.querySelector('.hero-video-toggle');
  if (!video || !toggle) return;

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let wantsPlayback = !motion.matches && !navigator.connection?.saveData;

  const updateControl = () => {
    const playing = !video.paused;
    const label = playing ? 'Pausar video' : 'Reproducir video';
    toggle.classList.toggle('is-playing', playing);
    toggle.querySelector('span').textContent = label;
    toggle.setAttribute('aria-label', `${label} del banner`);
  };

  const play = async () => {
    if (!video.hasAttribute('src')) video.src = video.dataset.src;
    video.muted = true;
    try {
      await video.play();
    } catch {
      // Keep the poster and manual play control if autoplay is unavailable.
      wantsPlayback = false;
      updateControl();
    }
  };

  video.addEventListener('playing', () => {
    hero.classList.add('is-video-ready');
    updateControl();
  });
  video.addEventListener('pause', updateControl);
  video.addEventListener('error', () => {
    wantsPlayback = false;
    hero.classList.remove('is-video-ready');
    toggle.hidden = true;
  });
  toggle.addEventListener('click', () => {
    wantsPlayback = video.paused;
    if (wantsPlayback) play();
    else video.pause();
  });
  motion.addEventListener('change', () => {
    if (!motion.matches) return;
    wantsPlayback = false;
    video.pause();
    hero.classList.remove('is-video-ready');
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
    else if (wantsPlayback) play();
  });

  toggle.hidden = false;
  if (wantsPlayback && !document.hidden) play();
})();
