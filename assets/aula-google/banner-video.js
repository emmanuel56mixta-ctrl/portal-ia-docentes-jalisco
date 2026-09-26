(() => {
  const hero = document.querySelector('.hero');
  const video = hero?.querySelector('.hero-video');
  if (!video) return;

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const play = async () => {
    if (!video.hasAttribute('src')) video.src = video.dataset.src;
    video.muted = true;
    try {
      await video.play();
    } catch {
      // Keep the still image if this browser cannot autoplay the background.
      hero.classList.remove('is-video-ready');
    }
  };

  video.addEventListener('playing', () => {
    hero.classList.add('is-video-ready');
  });
  video.addEventListener('error', () => {
    hero.classList.remove('is-video-ready');
  });

  const updatePlayback = () => {
    if (motion.matches || navigator.connection?.saveData || video.error) {
      video.pause();
      hero.classList.remove('is-video-ready');
    } else if (document.hidden) {
      video.pause();
    } else {
      play();
    }
  };
  motion.addEventListener('change', updatePlayback);
  document.addEventListener('visibilitychange', updatePlayback);
  updatePlayback();
})();
