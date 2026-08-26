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

    var userAgent = navigator.userAgent || '';
    var userAgentDataMobile = navigator.userAgentData && navigator.userAgentData.mobile;
    var mobileUserAgent = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(userAgent);
    var iPad = /iPad/i.test(userAgent) || (/Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1);
    var coarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    var compactViewport = window.matchMedia && window.matchMedia('(max-width: 900px)').matches;
    var compactTouchDevice = compactViewport && (coarsePointer || navigator.maxTouchPoints > 0);

    return Boolean(userAgentDataMobile || mobileUserAgent || iPad || compactTouchDevice);
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
