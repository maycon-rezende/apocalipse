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

  function openDominiumSite() {
    let authorized = false;
    try { authorized = sessionStorage.getItem('dd_doom_site_access_v1') === 'granted'; } catch (error) {}
    if (!authorized) return;
    elevator.hidden = true;
    elevator.setAttribute('aria-hidden', 'true');
    surface.hidden = true;
    window.location.href = 'dominium.html';
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
    const route = moduleFromLocation();
    selectHubModule(route);
    if (!/^#hades\/(overview|divisions|research|experiments|evolution|personnel|diary)$/.test(window.location.hash)) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#hades/${route}`);
    }
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

  function moduleFromLocation() {
    const match = window.location.hash.match(/^#hades\/([a-z]+)/);
    return match && modules[match[1]] ? match[1] : 'overview';
  }

  function selectHubModule(name, options = {}) {
    if (!modules[name]) return;
    document.querySelectorAll('[data-hub-module]').forEach(button => {
      const active = button.dataset.hubModule === name;
      button.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('[data-hub-view]').forEach(view => {
      view.hidden = view.dataset.hubView !== name;
    });
    byId('hades-hub-title').textContent = t(`classified.doom.stage1.hub.panel.${name}.title`);
    const moduleTitle = byId('hub-module-title');
    if (moduleTitle) moduleTitle.textContent = t(`classified.doom.stage1.hub.panel.${name}.title`);
    byId('hub-module-copy').textContent = t(`classified.doom.stage1.hub.panel.${name}.copy`);
    byId('hub-module-status').textContent = t(`classified.doom.stage1.hub.panel.${name}.status`);
    if (options.navigate) {
      const nextUrl = `${window.location.pathname}${window.location.search}#hades/${name}`;
      if (window.location.hash !== `#hades/${name}`) window.history.pushState(null, '', nextUrl);
    }
    if (options.scroll && hub && !hub.hidden) {
      hub.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }
  }

  function returnToSurface() {
    if (!hub || !surface) return;
    hub.hidden = true;
    surface.hidden = false;
    document.body.classList.remove('doom-hades-active');
    document.body.classList.add('doom-surface-active');
    descentStarted = false;
    const descentButton = byId('go-to-hades');
    if (descentButton) descentButton.disabled = false;
    elevator.hidden = true;
    elevator.setAttribute('aria-hidden', 'true');
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    window.switchToRestrictedTheme?.();
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    requestAnimationFrame(() => byId('surface-title')?.focus());
  }

  byId('go-to-hades')?.addEventListener('click', beginDescent);
  byId('enter-hades-hub')?.addEventListener('click', openDominiumSite);
  document.querySelector('[data-return-surface]')?.addEventListener('click', returnToSurface);
  document.querySelectorAll('[data-hub-module]').forEach(button => {
    button.setAttribute('aria-controls', 'hub-module-stage');
    button.addEventListener('click', () => selectHubModule(button.dataset.hubModule, { navigate: true, scroll: true }));
  });
  selectHubModule(moduleFromLocation());
  const restoreHubRoute = () => {
    if (!hub?.hidden && document.body.classList.contains('doom-hades-active')) {
      selectHubModule(moduleFromLocation(), { scroll: true });
    }
  };
  window.addEventListener('popstate', restoreHubRoute);
  window.addEventListener('hashchange', restoreHubRoute);
  document.addEventListener('dd:locale-change', () => {
    const active = document.querySelector('[data-hub-module][aria-pressed="true"]')?.dataset.hubModule || 'overview';
    requestAnimationFrame(() => selectHubModule(active));
  });

  window.ProjectDoomStage1 = Object.freeze({ showAntarcticEntry, enterSurface });
})();
