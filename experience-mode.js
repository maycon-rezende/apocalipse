(function () {
  'use strict';

  const STORAGE_KEY = 'dd_experience_mode_v1';
  const scriptSource = document.currentScript && document.currentScript.src
    ? document.currentScript.src
    : new URL('experience-mode.js', location.href).href;

  let storedMode = 'original';
  try { storedMode = localStorage.getItem(STORAGE_KEY) || 'original'; } catch (error) {}
  const enabled = storedMode === 'analog';
  window.DD_ANALOG_MODE = enabled;
  document.documentElement.classList.add(enabled ? 'analog-experience' : 'original-experience');

  function loadLocalScript(relativePath, ready) {
    if (ready()) return Promise.resolve();
    const source = new URL(relativePath, scriptSource).href;
    const existing = Array.from(document.scripts).find(function (script) { return script.src === source; });
    return new Promise(function (resolve, reject) {
      const script = existing || document.createElement('script');
      const done = function () { if (ready()) resolve(); else reject(new Error('i18n unavailable: ' + relativePath)); };
      script.addEventListener('load', done, { once: true });
      script.addEventListener('error', reject, { once: true });
      if (!existing) {
        script.src = source;
        script.async = false;
        script.dataset.ddI18nBootstrap = 'true';
        document.head.appendChild(script);
      } else if (ready()) {
        resolve();
      }
    });
  }

  function ensureI18n() {
    if (window.DoomsdayI18n) return Promise.resolve(window.DoomsdayI18n);
    return loadLocalScript('i18n/pt-BR.js', function () {
      return Boolean(window.DD_I18N_DICTIONARIES && window.DD_I18N_DICTIONARIES['pt-BR']);
    }).then(function () {
      return loadLocalScript('i18n/en.js', function () {
        return Boolean(window.DD_I18N_DICTIONARIES && window.DD_I18N_DICTIONARIES.en);
      });
    }).then(function () {
      return loadLocalScript('i18n/core.js', function () { return Boolean(window.DoomsdayI18n); });
    }).then(function () { return window.DoomsdayI18n; });
  }

  function translate(key, variables, fallback) {
    if (!window.DoomsdayI18n) return fallback || key;
    const value = window.DoomsdayI18n.t(key, variables);
    return value === key && fallback ? fallback : value;
  }

  function applyMode(next, reload) {
    if (reload === undefined) reload = true;
    try { localStorage.setItem(STORAGE_KEY, next ? 'analog' : 'original'); } catch (error) {}
    window.DD_ANALOG_MODE = next;
    document.documentElement.classList.toggle('analog-experience', next);
    document.documentElement.classList.toggle('original-experience', !next);
    if (reload) location.reload();
  }

  function createLanguageSwitcher() {
    if (!window.DoomsdayI18n) return null;
    const isFullyTranslated = document.documentElement.dataset.i18nReady === 'full';
    const labelKey = isFullyTranslated ? 'global.language.full' : 'global.language.partial';
    const switcher = document.createElement('div');
    switcher.className = 'language-switcher';
    switcher.setAttribute('role', 'group');
    switcher.setAttribute('aria-label', translate(labelKey));
    switcher.title = translate(labelKey);

    [['pt-BR', 'PT'], ['en', 'EN']].forEach(function (entry, index) {
      const button = document.createElement('button');
      const active = window.DoomsdayI18n.locale === entry[0];
      button.type = 'button';
      button.className = 'language-option';
      button.dataset.locale = entry[0];
      button.setAttribute('aria-pressed', String(active));
      button.setAttribute('aria-label', translate(entry[0] === 'pt-BR' ? 'global.language.pt' : 'global.language.en'));
      button.textContent = entry[1];
      if (active) button.classList.add('active');
      button.addEventListener('click', function () {
        if (!active) window.DoomsdayI18n.setLocale(entry[0]);
      });
      switcher.appendChild(button);
      if (index === 0) {
        const separator = document.createElement('span');
        separator.setAttribute('aria-hidden', 'true');
        separator.textContent = '//';
        switcher.appendChild(separator);
      }
    });
    return switcher;
  }

  function mountControls() {
    if (window.DoomsdayI18n) window.DoomsdayI18n.apply(document);
    const pageName = location.pathname.split('/').pop().toLowerCase();
    const isOpeningPage = pageName === 'home.html' || pageName === 'index.html';

    if (!enabled) {
      if (!isOpeningPage) {
        document.body.style.overflow = '';
        document.body.classList.remove('locked');
      }
      document.querySelectorAll('.personnel-intro,.personnel-hud,.personnel-alert,.subject-tape,.subject-hud,.subject-corruption,.gallery-intro,.family-entry,.memory-frame,.memory-tracking,.memory-hud,.memory-anomaly').forEach(function (element) { element.remove(); });
      ['gallery-intro-theme', 'parallel-theme'].forEach(function (id) {
        const audio = document.getElementById(id);
        if (audio) audio.pause();
      });
    }

    const homeControl = document.getElementById('experience-switch');
    if (homeControl) {
      homeControl.setAttribute('aria-pressed', String(enabled));
      const title = homeControl.querySelector('[data-experience-title]');
      const copy = homeControl.querySelector('[data-experience-copy]');
      if (title) title.textContent = translate(enabled ? 'global.experience.activeTitle' : 'global.experience.accessTitle');
      if (copy) copy.textContent = translate(enabled ? 'global.experience.returnCopy' : 'global.experience.enterCopy');
      homeControl.setAttribute('aria-label', translate(enabled ? 'global.experience.exitLabel' : 'global.experience.enterLabel'));
      homeControl.addEventListener('click', function () {
        const nextMode = !enabled;
        homeControl.disabled = true;
        homeControl.setAttribute('aria-busy', 'true');
        document.body.dataset.experienceChangingLabel = translate('global.experience.syncing');
        document.body.classList.add('experience-changing');
        document.dispatchEvent(new CustomEvent('dd:experience-changing', { detail: { analog: nextMode } }));
        const delay = nextMode
          ? Number(document.body.dataset.experienceEnterMs) || 650
          : Number(document.body.dataset.experienceExitMs) || 650;
        setTimeout(function () { applyMode(nextMode); }, delay);
      });
    }

    const dock = document.createElement('div');
    dock.className = 'global-control-dock';
    const languageSwitcher = createLanguageSwitcher();
    if (languageSwitcher) dock.appendChild(languageSwitcher);

    if (!isOpeningPage && pageName !== '') {
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'experience-corner-toggle';
      toggle.setAttribute('aria-label', translate(enabled ? 'global.experience.exitLabel' : 'global.experience.enterLabel'));
      toggle.innerHTML = '<span>' + translate(enabled ? 'global.experience.corruptSignal' : 'global.experience.originalFile') + '</span><b>' + translate(enabled ? 'global.experience.deactivate' : 'global.experience.activate') + '</b>';
      toggle.addEventListener('click', function () { applyMode(!enabled); });
      dock.appendChild(toggle);
    }
    if (dock.childElementCount) document.body.appendChild(dock);

    const transmissionStyle = document.createElement('style');
    transmissionStyle.textContent = ".global-corrupt-transmission{position:fixed;z-index:4900;left:50%;top:48%;width:min(720px,88vw);padding:.65rem 1rem;border-block:1px solid #742029;background:linear-gradient(90deg,transparent,rgba(3,3,3,.94) 12% 88%,transparent);color:#bfc0b8;text-align:center;opacity:0;visibility:hidden;pointer-events:none;transform:translate(-50%,-50%);text-shadow:2px 0 #451017,-2px 0 #123b40}.global-corrupt-transmission small,.global-corrupt-transmission strong,.global-corrupt-transmission span{display:block}.global-corrupt-transmission small{color:#8b353c;font:.78rem 'VT323',monospace;letter-spacing:.17em}.global-corrupt-transmission strong{margin:.2rem 0;color:#d6d4c9;font:clamp(1rem,2.6vw,1.35rem) 'VT323',monospace;letter-spacing:.12em}.global-corrupt-transmission span{color:#5e5e58;font:.7rem 'Courier Prime',monospace;letter-spacing:.16em}.global-corrupt-transmission.visible{visibility:visible;animation:corrupt-transmission 1.15s steps(2) forwards}.analog-experience .global-corrupt-transmission{border-color:#a51d29;filter:contrast(1.15)}@keyframes corrupt-transmission{0%{opacity:0;transform:translate(-52%,-50%) scaleY(.05)}8%{opacity:.92;transform:translate(-48%,-50%) scaleY(1)}15%{opacity:.3;clip-path:inset(18% 0 47% 0)}22%,72%{opacity:.94;clip-path:inset(0)}35%{transform:translate(-50%,-50%) skewX(-2deg)}48%{opacity:.55;clip-path:inset(61% 0 8% 0)}58%{opacity:.95;clip-path:inset(0)}82%{opacity:.75;transform:translate(-49%,-50%) scaleY(1)}100%{opacity:0;visibility:hidden;transform:translate(-50%,-50%) scaleY(.08)}}@media(prefers-reduced-motion:reduce){.global-corrupt-transmission.visible{animation:corrupt-transmission-reduced 2.8s ease forwards}@keyframes corrupt-transmission-reduced{0%,100%{opacity:0}15%,85%{opacity:.9}}}";
    document.head.appendChild(transmissionStyle);

    const transmission = document.createElement('aside');
    transmission.className = 'global-corrupt-transmission';
    transmission.setAttribute('aria-live', enabled ? 'polite' : 'off');
    transmission.setAttribute('aria-atomic', 'true');
    transmission.innerHTML = '<small></small><strong></strong><span>' + translate('global.transmission.unstable') + '</span>';
    document.body.appendChild(transmission);

    const messageKeys = enabled
      ? ['global.transmission.analog.0', 'global.transmission.analog.1', 'global.transmission.analog.2', 'global.transmission.analog.3', 'global.transmission.analog.4']
      : ['global.transmission.original.0', 'global.transmission.original.1', 'global.transmission.original.2', 'global.transmission.original.3'];
    const messages = messageKeys.map(function (key) { return translate(key); });
    let messageIndex = Math.floor(Math.random() * messages.length);
    let transmissionTimer = null;
    const showTransmission = function () {
      if (document.body.classList.contains('locked') || document.body.style.overflow === 'hidden' || document.querySelector('[aria-modal="true"].open')) return;
      transmission.querySelector('strong').textContent = messages[messageIndex++ % messages.length];
      const channel = String(13 + (messageIndex * 7) % 80).padStart(2, '0');
      transmission.querySelector('small').textContent = translate('global.transmission.unsolicited', { channel: channel });
      transmission.classList.remove('visible');
      void transmission.offsetWidth;
      transmission.classList.add('visible');
    };
    const scheduleTransmission = function () {
      clearTimeout(transmissionTimer);
      const base = enabled ? 10500 : 19000;
      const variation = enabled ? 7000 : 11000;
      transmissionTimer = setTimeout(function () {
        showTransmission();
        scheduleTransmission();
      }, base + Math.random() * variation);
    };
    scheduleTransmission();
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) clearTimeout(transmissionTimer);
      else scheduleTransmission();
    });
  }

  function whenReady(callback) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', callback, { once: true });
    else callback();
  }

  ensureI18n().catch(function () {
    return null;
  }).then(function () {
    whenReady(mountControls);
  });

  window.DoomsdayExperience = { enabled: enabled, set: applyMode };
})();
