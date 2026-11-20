(function () {
  'use strict';

  const t = key => window.DoomsdayI18n?.t(key) || key;
  const buttons = Array.from(document.querySelectorAll('[data-infected-select]'));
  const image = document.getElementById('infected-art');
  const scanner = document.getElementById('infected-scanner');
  const scanButton = document.getElementById('infected-scan-button');
  const scanResult = document.getElementById('infected-scan-result');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let scanTimer = 0;

  if (!buttons.length || !image || !scanner || !scanButton || !scanResult) return;

  function selectProfile(button) {
    if (scanTimer) window.clearTimeout(scanTimer);
    buttons.forEach(candidate => {
      const active = candidate === button;
      candidate.setAttribute('aria-pressed', String(active));
      candidate.classList.toggle('is-active', active);
    });

    image.src = button.dataset.infectedImage;
    image.alt = t(button.dataset.altKey);
    document.getElementById('infected-record-code').textContent = button.dataset.infectedCode;
    document.getElementById('infected-name').textContent = t(button.dataset.nameKey);
    document.getElementById('infected-type').textContent = t(button.dataset.typeKey);
    document.getElementById('infected-description').textContent = t(button.dataset.descriptionKey);
    document.getElementById('infected-appearance').textContent = t(button.dataset.appearanceKey);
    document.getElementById('infected-appearance-readout').textContent = t(button.dataset.appearanceKey);
    document.getElementById('infected-observation').textContent = t(button.dataset.observationKey);
    scanner.classList.remove('is-scanning', 'is-complete');
    scanResult.textContent = t('classified.doom.stage1.hub.view.evolution.scanner.prompt');
    scanButton.disabled = false;
    scanButton.textContent = t('classified.doom.stage1.hub.view.evolution.scanner.button');
  }

  buttons.forEach(button => button.addEventListener('click', () => selectProfile(button)));
  scanButton.addEventListener('click', () => {
    if (scanTimer) window.clearTimeout(scanTimer);
    scanButton.disabled = true;
    scanButton.textContent = t('classified.doom.stage1.hub.view.evolution.scanner.running');
    scanResult.textContent = t('classified.doom.stage1.hub.view.evolution.scanner.running.copy');
    scanner.classList.remove('is-complete');
    scanner.classList.add('is-scanning');
    scanTimer = window.setTimeout(() => {
      scanner.classList.remove('is-scanning');
      scanner.classList.add('is-complete');
      scanResult.textContent = t('classified.doom.stage1.hub.view.evolution.scanner.result');
      scanButton.disabled = false;
      scanButton.textContent = t('classified.doom.stage1.hub.view.evolution.scanner.button');
      scanTimer = 0;
    }, reduceMotion ? 0 : 1450);
  });

  selectProfile(buttons.find(button => button.getAttribute('aria-pressed') === 'true') || buttons[0]);
  document.addEventListener('dd:locale-change', () => {
    const active = buttons.find(button => button.getAttribute('aria-pressed') === 'true') || buttons[0];
    requestAnimationFrame(() => selectProfile(active));
  });
})();
