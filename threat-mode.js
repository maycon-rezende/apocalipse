(function () {
  'use strict';

  const analog = window.DD_ANALOG_MODE === true;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  root.dataset.threatMode = analog ? 'analog' : 'original';
  root.classList.toggle('threat-analog', analog);
  root.classList.toggle('threat-original', !analog);

  function applyThreatMode() {
    const intro = document.getElementById('threat-intro');

    document.body.dataset.threatMode = analog ? 'analog' : 'original';
    document.body.classList.toggle('threat-mode-analog', analog);
    document.body.classList.toggle('threat-mode-original', !analog);

    if (!analog && intro) {
      intro.hidden = true;
      intro.setAttribute('aria-hidden', 'true');
      intro.removeAttribute('aria-modal');
      document.body.classList.remove('threat-intro-open', 'threat-intro-exit');
    }

    document.dispatchEvent(new CustomEvent('dd:threat-mode-ready', {
      detail: { analog, reducedMotion }
    }));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyThreatMode, { once: true });
  } else {
    applyThreatMode();
  }

  window.DoomsdayThreatMode = Object.freeze({
    analog,
    reducedMotion,
    allowAnalogMotion: analog && !reducedMotion
  });
})();
