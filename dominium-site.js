(() => {
  'use strict';

  const lock = document.getElementById('dominium-access-lock');
  const app = document.getElementById('dominium-app');
  let authorized = false;

  try {
    authorized = sessionStorage.getItem('dd_doom_site_access_v1') === 'granted';
  } catch (error) {
    authorized = false;
  }

  if (!authorized) {
    if (lock) lock.hidden = false;
    if (app) app.hidden = true;
    document.body.classList.add('dominium-locked');
    return;
  }

  if (lock) lock.hidden = true;
  if (app) app.hidden = false;

  document.querySelectorAll('[data-dominium-locale]').forEach(button => {
    button.addEventListener('click', () => window.DoomsdayI18n?.setLocale(button.dataset.dominiumLocale));
  });

  document.querySelectorAll('[data-panel-selector]').forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.panelSelector;
      document.querySelectorAll('[data-panel-selector]').forEach(item => {
        item.setAttribute('aria-pressed', String(item === button));
      });
      document.querySelectorAll('[data-panel]').forEach(panel => {
        panel.hidden = panel.dataset.panel !== target;
      });
    });
  });

  document.querySelectorAll('[data-timeline-step]').forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.timelineStep;
      document.querySelectorAll('[data-timeline-step]').forEach(item => {
        item.setAttribute('aria-pressed', String(item === button));
      });
      document.querySelectorAll('[data-timeline-panel]').forEach(panel => {
        panel.hidden = panel.dataset.timelinePanel !== target;
      });
    });
  });
})();
