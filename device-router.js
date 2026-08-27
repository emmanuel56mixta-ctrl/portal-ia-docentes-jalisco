(function () {
  'use strict';

  var script = document.currentScript;
  if (!script) return;

  var mobileTarget = script.getAttribute('data-mobile-target');
  var desktopTarget = script.getAttribute('data-desktop-target');
  var query = new URLSearchParams(window.location.search);
  var forcedView = query.get('view');

  function isMobileExperience() {
    if (forcedView === 'mobile') return true;
    if (forcedView === 'desktop') return false;

    /*
      La experiencia se decide por el espacio disponible, no por marca,
      sistema operativo ni user-agent. Así un iPhone, Samsung, Xiaomi,
      Motorola o cualquier otro equipo con el mismo ancho recibe el mismo layout.
    */
    return window.matchMedia
      ? window.matchMedia('(max-width: 760px)').matches
      : (window.innerWidth || document.documentElement.clientWidth || 1024) <= 760;
  }

  var target = isMobileExperience() ? mobileTarget : desktopTarget;
  if (!target) return;

  var destination = new URL(target, window.location.href);
  query.forEach(function (value, key) {
    if (!destination.searchParams.has(key)) destination.searchParams.append(key, value);
  });
  if (window.location.hash && !destination.hash) destination.hash = window.location.hash;

  var currentPath = window.location.pathname.replace(/\/+$/, '');
  var destinationPath = destination.pathname.replace(/\/+$/, '');
  if (currentPath === destinationPath) return;

  window.location.replace(destination.href);
})();
