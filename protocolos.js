(function () {
  'use strict';

  const SIMULATION_KEY = 'dd_simulation_records_v1';
  const FREQUENCY_KEY = 'dd_dead_frequency_v1';
  const SCORE_FIELDS = ['mick', 'mei', 'hanson'];
  const FREQUENCY_STAGES = 4;
  const TARGET_FREQUENCY = 41.73;
  const TARGET_GAIN = 68;
  const TARGET_PHASE = 126;
  const FREQUENCY_TOLERANCE = 0.005;
  const GAIN_TOLERANCE = 2;
  const PHASE_TOLERANCE = 3;
  const FRAGMENT_SOLUTION = ['alpha', 'beta', 'gamma', 'delta'];
  const RELAY_IDS = ['alexandria', 'fairfax', 'arlington', 'mclean'];
  const dom = {};
  let initialized = false;

  function isRecord(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
  }

  function readLocalJson(key) {
    try {
      const raw = localStorage.getItem(key);
      if (typeof raw !== 'string' || raw.length === 0) return null;
      const parsed = JSON.parse(raw);
      return isRecord(parsed) ? parsed : null;
    } catch (error) {
      return null;
    }
  }

  function safeScore(value) {
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) return 0;
    return Math.min(Number.MAX_SAFE_INTEGER, Math.floor(value));
  }

  function simulationSnapshot() {
    const stored = readLocalJson(SIMULATION_KEY) || {};
    const scores = {};
    SCORE_FIELDS.forEach(function (field) {
      scores[field] = safeScore(stored[field]);
    });
    scores.overall = Math.max(scores.mick, scores.mei, scores.hanson);
    return scores;
  }

  function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
  }

  function finiteNumber(value, fallback) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  function validOrder(value) {
    if (!Array.isArray(value) || value.length !== FRAGMENT_SOLUTION.length) return false;
    const unique = new Set(value);
    return unique.size === FRAGMENT_SOLUTION.length && FRAGMENT_SOLUTION.every(function (id) {
      return unique.has(id);
    });
  }

  function frequencySolved(value) {
    return Math.abs(value - TARGET_FREQUENCY) <= FREQUENCY_TOLERANCE;
  }

  function waveSolved(gain, phase) {
    return Math.abs(gain - TARGET_GAIN) <= GAIN_TOLERANCE && Math.abs(phase - TARGET_PHASE) <= PHASE_TOLERANCE;
  }

  function orderSolved(order) {
    return FRAGMENT_SOLUTION.every(function (id, index) { return order[index] === id; });
  }

  function frequencySnapshot() {
    const stored = readLocalJson(FREQUENCY_KEY);
    if (!stored || stored.version !== 1 || !Array.isArray(stored.solved) || stored.solved.length !== FREQUENCY_STAGES) {
      return { progress: 0, complete: false };
    }

    const frequency = Math.round(clamp(finiteNumber(stored.frequency, 40.50), 40, 43) * 100) / 100;
    const gain = Math.round(clamp(finiteNumber(stored.gain, 36), 0, 100));
    const phase = Math.round(clamp(finiteNumber(stored.phase, 42), 0, 180));
    const order = validOrder(stored.order) ? stored.order.slice() : ['gamma', 'alpha', 'delta', 'beta'];
    const selectedRelay = RELAY_IDS.includes(stored.selectedRelay) ? stored.selectedRelay : null;
    const solved = [false, false, false, false];

    solved[0] = stored.solved[0] === true && frequencySolved(frequency);
    solved[1] = solved[0] && stored.solved[1] === true && waveSolved(gain, phase);
    solved[2] = solved[1] && stored.solved[2] === true && orderSolved(order);
    solved[3] = solved[2] && stored.solved[3] === true && selectedRelay === 'arlington' && stored.complete === true;

    return {
      progress: solved.filter(function (stage) { return stage; }).length,
      complete: solved[3]
    };
  }

  function tr(key, variables) {
    if (window.DoomsdayI18n) return window.DoomsdayI18n.t(key, variables);
    return key;
  }

  function formatScore(value) {
    return String(value).padStart(6, '0');
  }

  function setStatus(element, state, key) {
    if (!element) return;
    element.dataset.state = state;
    element.textContent = tr(key);
  }

  function renderSimulation() {
    const scores = simulationSnapshot();
    dom.simulationOverall.textContent = formatScore(scores.overall);
    dom.simulationMick.textContent = formatScore(scores.mick);
    dom.simulationMei.textContent = formatScore(scores.mei);
    dom.simulationHanson.textContent = formatScore(scores.hanson);

    if (scores.overall > 0) {
      setStatus(dom.simulationStatus, 'progress', 'protocols.status.recorded');
    } else {
      setStatus(dom.simulationStatus, 'idle', 'protocols.status.notStarted');
    }
  }

  function renderFrequency() {
    const state = frequencySnapshot();
    const progressText = tr('protocols.frequency.progressValue', {
      current: state.progress,
      total: FREQUENCY_STAGES
    });

    dom.frequencyProgress.textContent = progressText;
    dom.frequencyMeter.value = state.progress;
    dom.frequencyMeter.textContent = progressText;
    dom.frequencyMeter.setAttribute('aria-label', tr('protocols.frequency.progressLabel', {
      current: state.progress,
      total: FREQUENCY_STAGES
    }));

    if (state.complete) {
      setStatus(dom.frequencyStatus, 'complete', 'protocols.status.complete');
      dom.frequencyCopy.textContent = tr('protocols.frequency.completeCopy');
    } else if (state.progress > 0) {
      setStatus(dom.frequencyStatus, 'progress', 'protocols.status.inProgress');
      dom.frequencyCopy.textContent = tr('protocols.frequency.progressCopy', {
        current: state.progress,
        total: FREQUENCY_STAGES
      });
    } else {
      setStatus(dom.frequencyStatus, 'idle', 'protocols.status.notStarted');
      dom.frequencyCopy.textContent = tr('protocols.frequency.noProgress');
    }
  }

  function refresh() {
    if (!initialized) return;
    renderSimulation();
    renderFrequency();
  }

  function cacheDom() {
    dom.simulationStatus = document.querySelector('[data-simulation-status]');
    dom.simulationOverall = document.querySelector('[data-simulation-overall]');
    dom.simulationMick = document.querySelector('[data-simulation-mick]');
    dom.simulationMei = document.querySelector('[data-simulation-mei]');
    dom.simulationHanson = document.querySelector('[data-simulation-hanson]');
    dom.frequencyStatus = document.querySelector('[data-frequency-status]');
    dom.frequencyProgress = document.querySelector('[data-frequency-progress]');
    dom.frequencyMeter = document.querySelector('[data-frequency-meter]');
    dom.frequencyCopy = document.querySelector('[data-frequency-copy]');

    const complete = Object.keys(dom).every(function (key) { return Boolean(dom[key]); });
    if (!complete) return false;

    [dom.simulationStatus, dom.frequencyStatus, dom.frequencyCopy].forEach(function (element) {
      element.removeAttribute('data-i18n');
    });
    return true;
  }

  function onStorage(event) {
    if (event.key === null || event.key === SIMULATION_KEY || event.key === FREQUENCY_KEY) refresh();
  }

  function init() {
    if (initialized || !cacheDom()) return;
    initialized = true;
    refresh();
    window.addEventListener('pageshow', refresh);
    window.addEventListener('storage', onStorage);
    document.addEventListener('dd:locale-change', refresh);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
