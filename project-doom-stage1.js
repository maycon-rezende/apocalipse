(() => {
  const t = key => window.DoomsdayI18n?.t(key) || key;
  const byId = id => document.getElementById(id);
  const intro = byId('intro');
  const bootBox = byId('boot-box');
  const surface = byId('surface-complex');
  const elevator = byId('hades-elevator');
  const arrival = byId('hades-arrival');
  const hub = byId('hades-hub');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let descentStarted = false;

  function showAntarcticEntry() {
    if (!intro || !bootBox) return;
    intro.classList.add('antarctic-gateway');
    bootBox.replaceChildren();

    const panel = document.createElement('section');
    panel.className = 'antarctic-entry-panel';
    panel.setAttribute('aria-labelledby', 'antarctic-entry-title');

    const kicker = document.createElement('p');
    kicker.className = 'scene-kicker';
    kicker.textContent = t('classified.doom.stage1.antarctic.kicker');

    const title = document.createElement('h1');
    title.id = 'antarctic-entry-title';
    title.textContent = t('classified.doom.stage1.antarctic.title');

    const copy = document.createElement('p');
    copy.textContent = t('classified.doom.stage1.antarctic.copy');

    const button = document.createElement('button');
    button.type = 'button';
    button.id = 'enter-surface-complex';
    button.className = 'doom-action';
    button.textContent = t('classified.doom.stage1.antarctic.enter');
    button.addEventListener('click', enterSurface);

    const hint = document.createElement('small');
    hint.className = 'entry-hint';
    hint.textContent = t('classified.doom.stage1.antarctic.hint');

    panel.append(kicker, title, copy, button, hint);
    bootBox.append(panel);
    requestAnimationFrame(() => button.focus());
  }

  function enterSurface() {
    if (!surface || !intro) return;
    intro.classList.add('hidden');
    document.body.classList.remove('locked');
    document.body.classList.add('doom-surface-active');
    surface.hidden = false;
    requestAnimationFrame(() => byId('surface-title')?.focus());
    window.setTimeout(() => intro.remove(), reduceMotion ? 0 : 720);
  }

  function showArrival() {
    elevator.classList.remove('is-opening', 'is-closing', 'is-descending');
    elevator.classList.add('is-arrived');
    byId('elevator-status').textContent = t('classified.doom.stage1.elevator.arrival');
    arrival.hidden = false;
    requestAnimationFrame(() => byId('enter-hades-hub')?.focus());
  }

  function beginDescent() {
    if (descentStarted || !elevator) return;
    descentStarted = true;
    byId('go-to-hades').disabled = true;
    elevator.hidden = false;
    elevator.setAttribute('aria-hidden', 'false');
    arrival.hidden = true;
    elevator.classList.remove('is-arrived', 'is-opening', 'is-closing', 'is-descending');
    requestAnimationFrame(() => elevator.classList.add('is-opening'));

    if (reduceMotion) {
      showArrival();
      return;
    }

    window.setTimeout(() => {
      elevator.classList.remove('is-opening');
      elevator.classList.add('is-closing');
    }, 900);
    window.setTimeout(() => {
      elevator.classList.remove('is-closing');
      elevator.classList.add('is-descending');
      byId('elevator-status').textContent = t('classified.doom.stage1.elevator.descending');
    }, 1700);
    window.setTimeout(showArrival, 4900);
  }

  function enterHub() {
    if (!hub) return;
    elevator.hidden = true;
    elevator.setAttribute('aria-hidden', 'true');
    surface.hidden = true;
    hub.hidden = false;
    document.body.classList.remove('doom-surface-active');
    document.body.classList.add('doom-hades-active');
    window.switchToLaboratoryTheme?.();
    requestAnimationFrame(() => byId('hades-hub-title')?.focus());
  }

  const modules = {
    overview: 'overview',
    divisions: 'divisions',
    research: 'research',
    experiments: 'experiments',
    evolution: 'evolution',
    personnel: 'personnel',
    diary: 'diary'
  };

  function selectHubModule(name) {
    if (!modules[name]) return;
    document.querySelectorAll('[data-hub-module]').forEach(button => {
      const active = button.dataset.hubModule === name;
      button.setAttribute('aria-pressed', String(active));
    });
    byId('hub-module-title').textContent = t(`classified.doom.stage1.hub.panel.${name}.title`);
    byId('hub-module-copy').textContent = t(`classified.doom.stage1.hub.panel.${name}.copy`);
    byId('hub-module-status').textContent = t(`classified.doom.stage1.hub.panel.${name}.status`);
  }

  byId('go-to-hades')?.addEventListener('click', beginDescent);
  byId('enter-hades-hub')?.addEventListener('click', enterHub);
  document.querySelectorAll('[data-hub-module]').forEach(button => {
    button.addEventListener('click', () => selectHubModule(button.dataset.hubModule));
  });

  window.ProjectDoomStage1 = Object.freeze({ showAntarcticEntry, enterSurface });
})();
