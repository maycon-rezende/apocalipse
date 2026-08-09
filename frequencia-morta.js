(function () {
  'use strict';

  const STORAGE_KEY = 'dd_dead_frequency_v1';
  const STATE_VERSION = 1;
  const TARGET_FREQUENCY = 41.73;
  const TARGET_GAIN = 68;
  const TARGET_PHASE = 126;
  const FREQUENCY_TOLERANCE = 0.005;
  const GAIN_TOLERANCE = 2;
  const PHASE_TOLERANCE = 3;
  const FRAGMENT_SOLUTION = ['alpha', 'beta', 'gamma', 'delta'];
  const INITIAL_FRAGMENT_ORDER = ['gamma', 'alpha', 'delta', 'beta'];
  const RELAY_IDS = ['alexandria', 'fairfax', 'arlington', 'mclean'];

  const REQUIRED_IDS = [
    'frequency-app', 'sound-toggle', 'sound-label', 'reset-puzzle',
    'global-progress', 'progress-copy',
    'stage-tune', 'stage-tune-title', 'stage-tune-status', 'tune-controls',
    'frequency-control', 'frequency-readout', 'frequency-dial', 'signal-quality',
    'tune-feedback', 'validate-frequency', 'tune-hint',
    'stage-wave', 'stage-wave-title', 'stage-wave-status', 'wave-controls',
    'wave-canvas', 'wave-description', 'gain-control', 'gain-readout',
    'phase-control', 'phase-readout', 'wave-match', 'wave-match-copy',
    'validate-wave', 'wave-hint',
    'stage-fragments', 'stage-fragments-title', 'stage-fragments-status',
    'fragment-controls', 'fragment-list', 'validate-fragments', 'fragment-hint',
    'stage-map', 'stage-map-title', 'stage-map-status', 'map-controls',
    'signal-map', 'relay-reading', 'validate-relay', 'relay-hint',
    'result-panel', 'result-title', 'puzzle-announcer', 'alert-announcer'
  ];

  let elements = null;
  let state = null;
  let audioContext = null;
  let masterGain = null;
  let lastFeedbackTone = 0;
  let resizeFrame = 0;

  function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
  }

  function finiteNumber(value, fallback) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  function t(key, variables) {
    if (window.DoomsdayI18n) return window.DoomsdayI18n.t(key, variables);
    return key;
  }

  function defaultState() {
    return {
      version: STATE_VERSION,
      frequency: 40.50,
      gain: 36,
      phase: 42,
      order: INITIAL_FRAGMENT_ORDER.slice(),
      selectedRelay: null,
      solved: [false, false, false, false],
      complete: false,
      attempts: [0, 0, 0, 0],
      muted: true
    };
  }

  function validOrder(value) {
    if (!Array.isArray(value) || value.length !== FRAGMENT_SOLUTION.length) return false;
    const unique = new Set(value);
    return unique.size === FRAGMENT_SOLUTION.length && FRAGMENT_SOLUTION.every(function (id) { return unique.has(id); });
  }

  function orderSolved(order) {
    return FRAGMENT_SOLUTION.every(function (id, index) { return order[index] === id; });
  }

  function frequencySolved(value) {
    return Math.abs(value - TARGET_FREQUENCY) <= FREQUENCY_TOLERANCE;
  }

  function waveSolved(gain, phase) {
    return Math.abs(gain - TARGET_GAIN) <= GAIN_TOLERANCE && Math.abs(phase - TARGET_PHASE) <= PHASE_TOLERANCE;
  }

  function loadState() {
    const fallback = defaultState();
    let candidate;
    try {
      candidate = JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      return fallback;
    }

    if (!candidate || typeof candidate !== 'object' || candidate.version !== STATE_VERSION) return fallback;

    const next = defaultState();
    next.frequency = Math.round(clamp(finiteNumber(candidate.frequency, next.frequency), 40, 43) * 100) / 100;
    next.gain = Math.round(clamp(finiteNumber(candidate.gain, next.gain), 0, 100));
    next.phase = Math.round(clamp(finiteNumber(candidate.phase, next.phase), 0, 180));
    next.order = validOrder(candidate.order) ? candidate.order.slice() : next.order;
    next.selectedRelay = RELAY_IDS.includes(candidate.selectedRelay) ? candidate.selectedRelay : null;
    next.attempts = Array.isArray(candidate.attempts) && candidate.attempts.length === 4
      ? candidate.attempts.map(function (attempt) { return Math.round(clamp(finiteNumber(attempt, 0), 0, 99)); })
      : next.attempts;
    next.muted = candidate.muted === false ? false : true;

    const storedSolved = Array.isArray(candidate.solved) && candidate.solved.length === 4 ? candidate.solved : [];
    next.solved[0] = storedSolved[0] === true && frequencySolved(next.frequency);
    next.solved[1] = next.solved[0] && storedSolved[1] === true && waveSolved(next.gain, next.phase);
    next.solved[2] = next.solved[1] && storedSolved[2] === true && orderSolved(next.order);
    next.solved[3] = next.solved[2] && storedSolved[3] === true && next.selectedRelay === 'arlington' && candidate.complete === true;
    next.complete = next.solved[3];
    return next;
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      // The puzzle remains fully playable when storage is unavailable.
    }
  }

  function collectElements() {
    const found = {};
    const missing = [];
    REQUIRED_IDS.forEach(function (id) {
      found[id] = document.getElementById(id);
      if (!found[id]) missing.push('#' + id);
    });
    if (missing.length) {
      console.error('[DD-02] DOM contract missing:', missing.join(', '));
      return null;
    }
    found.relayButtons = Array.from(document.querySelectorAll('[data-relay]'));
    if (found.relayButtons.length !== RELAY_IDS.length) {
      console.error('[DD-02] DOM contract requires four [data-relay] buttons.');
      return null;
    }
    return found;
  }

  function announce(message, assertive) {
    const region = assertive ? elements['alert-announcer'] : elements['puzzle-announcer'];
    region.textContent = '';
    window.requestAnimationFrame(function () { region.textContent = message; });
  }

  function completedCount() {
    return state.solved.filter(function (value) { return value; }).length;
  }

  function stageUnlocked(index) {
    return index === 0 || state.solved[index - 1] === true;
  }

  function stageConfiguration() {
    return [
      { section: elements['stage-tune'], heading: elements['stage-tune-title'], status: elements['stage-tune-status'], controls: elements['tune-controls'], titleKey: 'frequency.stage1.title' },
      { section: elements['stage-wave'], heading: elements['stage-wave-title'], status: elements['stage-wave-status'], controls: elements['wave-controls'], titleKey: 'frequency.stage2.title' },
      { section: elements['stage-fragments'], heading: elements['stage-fragments-title'], status: elements['stage-fragments-status'], controls: elements['fragment-controls'], titleKey: 'frequency.stage3.title' },
      { section: elements['stage-map'], heading: elements['stage-map-title'], status: elements['stage-map-status'], controls: elements['map-controls'], titleKey: 'frequency.stage4.title' }
    ];
  }

  function renderStages() {
    stageConfiguration().forEach(function (stage, index) {
      const solved = state.solved[index];
      const unlocked = stageUnlocked(index);
      stage.section.classList.toggle('is-complete', solved);
      stage.section.classList.toggle('is-active', unlocked && !solved);
      stage.section.classList.toggle('is-locked', !unlocked);
      stage.controls.disabled = !unlocked || solved;
      stage.status.textContent = t(solved
        ? 'frequency.status.complete'
        : unlocked
          ? 'frequency.status.available'
          : 'frequency.status.locked');
    });

    const count = completedCount();
    elements['global-progress'].value = count;
    elements['global-progress'].textContent = count + '/4';
    elements['progress-copy'].textContent = t('frequency.progress.copy', { count: count });
    elements['result-panel'].hidden = !state.complete;
    document.body.classList.toggle('frequency-complete', state.complete);
  }

  function frequencyQuality() {
    return clamp(Math.round(100 - Math.abs(state.frequency - TARGET_FREQUENCY) * 68), 0, 100);
  }

  function frequencyFeedbackKey() {
    const distance = Math.abs(state.frequency - TARGET_FREQUENCY);
    if (distance <= FREQUENCY_TOLERANCE) return 'frequency.stage1.feedback.locked';
    if (distance <= .08) return 'frequency.stage1.feedback.near';
    if (distance <= .35) return 'frequency.stage1.feedback.rising';
    return 'frequency.stage1.feedback.static';
  }

  function renderTuner() {
    const value = state.frequency.toFixed(2);
    const quality = frequencyQuality();
    const dialAngle = -130 + ((state.frequency - 40) / 3) * 260;
    elements['frequency-control'].value = value;
    elements['frequency-readout'].textContent = value;
    elements['frequency-dial'].style.setProperty('--dial-angle', dialAngle.toFixed(2) + 'deg');
    elements['signal-quality'].value = quality;
    elements['signal-quality'].textContent = quality + '%';
    elements['tune-feedback'].textContent = t(frequencyFeedbackKey());
  }

  function waveMatch() {
    const penalty = Math.abs(state.gain - TARGET_GAIN) * 1.4 + Math.abs(state.phase - TARGET_PHASE) * .65;
    return clamp(Math.round(100 - penalty), 0, 100);
  }

  function drawWave() {
    const canvas = elements['wave-canvas'];
    const context = canvas.getContext && canvas.getContext('2d');
    if (!context) return;

    const rect = canvas.getBoundingClientRect();
    const width = Math.max(300, Math.round(rect.width || 720));
    const height = Math.max(190, Math.round(rect.height || width * 250 / 720));
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
    }
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);
    context.fillStyle = '#040806';
    context.fillRect(0, 0, width, height);

    context.lineWidth = 1;
    context.strokeStyle = 'rgba(109, 145, 123, .16)';
    for (let x = 0; x <= width; x += 32) {
      context.beginPath();
      context.moveTo(x + .5, 0);
      context.lineTo(x + .5, height);
      context.stroke();
    }
    for (let y = 0; y <= height; y += 32) {
      context.beginPath();
      context.moveTo(0, y + .5);
      context.lineTo(width, y + .5);
      context.stroke();
    }

    const middle = height * .55;
    const cycles = 3.25;
    function trace(gain, phase, color, lineWidth) {
      const amplitude = (gain / 100) * height * .40;
      const radians = phase * Math.PI / 180;
      context.beginPath();
      for (let x = 0; x <= width; x += 2) {
        const y = middle + Math.sin((x / width) * Math.PI * 2 * cycles + radians) * amplitude;
        if (x === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.stroke();
    }

    trace(TARGET_GAIN, TARGET_PHASE, 'rgba(214, 166, 74, .68)', 2);
    trace(state.gain, state.phase, 'rgba(143, 216, 176, .92)', 2.5);

    context.font = '700 11px "Courier New", monospace';
    context.fillStyle = '#d6a64a';
    context.fillText(t('frequency.stage2.canvasReference'), 13, 18);
    context.fillStyle = '#8fd8b0';
    context.fillText(t('frequency.stage2.canvasReceived'), 13, 36);
  }

  function renderWave() {
    const match = waveMatch();
    elements['gain-control'].value = String(state.gain);
    elements['phase-control'].value = String(state.phase);
    elements['gain-readout'].textContent = state.gain + '%';
    elements['phase-readout'].textContent = state.phase + '°';
    elements['wave-match'].value = match;
    elements['wave-match'].textContent = match + '%';
    elements['wave-match-copy'].textContent = match + '%';
    elements['wave-description'].textContent = t('frequency.stage2.description', {
      gain: state.gain,
      phase: state.phase,
      match: match
    });
    drawWave();
  }

  function renderHint(element, prefix, index) {
    const attempt = state.attempts[index];
    const show = attempt > 0 && !state.solved[index];
    element.hidden = !show;
    if (show) element.textContent = t(prefix + Math.min(attempt, 3));
  }

  function createFragmentButton(id, position, direction) {
    const button = document.createElement('button');
    const movingUp = direction === 'up';
    button.type = 'button';
    button.className = 'fragment-action';
    button.dataset.move = direction;
    button.dataset.fragment = id;
    button.disabled = state.solved[2] || (movingUp ? position === 0 : position === state.order.length - 1);
    button.setAttribute('aria-label', t(movingUp ? 'frequency.stage3.moveUpLabel' : 'frequency.stage3.moveDownLabel', {
      position: position + 1,
      fragment: t('frequency.fragment.' + id)
    }));

    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = movingUp ? '↑' : '↓';
    const copy = document.createElement('span');
    copy.className = 'reorder-text';
    copy.textContent = t(movingUp ? 'frequency.stage3.moveUp' : 'frequency.stage3.moveDown');
    button.appendChild(arrow);
    button.appendChild(copy);
    return button;
  }

  function renderFragments() {
    const list = elements['fragment-list'];
    const fragment = document.createDocumentFragment();
    state.order.forEach(function (id, index) {
      const item = document.createElement('li');
      item.className = 'fragment-item';
      item.dataset.fragmentId = id;
      item.tabIndex = -1;

      const copy = document.createElement('span');
      copy.className = 'fragment-copy';
      copy.textContent = t('frequency.fragment.' + id);

      const buttons = document.createElement('span');
      buttons.className = 'fragment-buttons';
      buttons.appendChild(createFragmentButton(id, index, 'up'));
      buttons.appendChild(createFragmentButton(id, index, 'down'));

      item.appendChild(copy);
      item.appendChild(buttons);
      fragment.appendChild(item);
    });
    list.replaceChildren(fragment);
  }

  function renderRelays() {
    const activeId = state.selectedRelay;
    elements.relayButtons.forEach(function (button, index) {
      const selected = button.dataset.relay === activeId;
      button.setAttribute('aria-checked', String(selected));
      button.classList.toggle('is-selected', selected);
      button.tabIndex = selected || (!activeId && index === 0) ? 0 : -1;
      button.disabled = state.solved[3];
    });

    if (!activeId) {
      elements['relay-reading'].textContent = t('frequency.stage4.noSelection');
      return;
    }
    elements['relay-reading'].textContent = t('frequency.stage4.selected', {
      name: t('frequency.relay.' + activeId + '.name'),
      reading: t('frequency.relay.' + activeId + '.reading')
    });
  }

  function renderSound() {
    elements['sound-toggle'].setAttribute('aria-pressed', String(!state.muted));
    elements['sound-label'].textContent = t(state.muted ? 'frequency.sound.enable' : 'frequency.sound.disable');
  }

  function renderAll() {
    renderStages();
    renderTuner();
    renderWave();
    renderFragments();
    renderRelays();
    renderHint(elements['tune-hint'], 'frequency.stage1.hint', 0);
    renderHint(elements['wave-hint'], 'frequency.stage2.hint', 1);
    renderHint(elements['fragment-hint'], 'frequency.stage3.hint', 2);
    renderHint(elements['relay-hint'], 'frequency.stage4.hint', 3);
    renderSound();
  }

  function ensureAudio() {
    if (state.muted) return Promise.resolve(null);
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return Promise.resolve(null);
    if (!audioContext) {
      audioContext = new AudioContextClass();
      masterGain = audioContext.createGain();
      masterGain.gain.value = 1;
      masterGain.connect(audioContext.destination);
    }
    if (audioContext.state === 'suspended') return audioContext.resume().then(function () { return audioContext; });
    return Promise.resolve(audioContext);
  }

  function playTone(frequency, duration, volume, type, delay) {
    if (state.muted) return;
    ensureAudio().then(function (context) {
      if (!context || state.muted) return;
      const start = context.currentTime + (delay || 0);
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = type || 'sine';
      oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(.0001, start);
      gain.gain.exponentialRampToValueAtTime(Math.max(.0002, volume), start + .008);
      gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
      oscillator.connect(gain);
      gain.connect(masterGain);
      oscillator.start(start);
      oscillator.stop(start + duration + .02);
    }).catch(function () {});
  }

  function playTuningFeedback() {
    const now = performance.now();
    if (now - lastFeedbackTone < 75) return;
    lastFeedbackTone = now;
    const quality = frequencyQuality();
    playTone(150 + quality * 5.1, .075, .018 + quality / 2400, quality > 92 ? 'sine' : 'triangle');
  }

  function playWaveFeedback() {
    const match = waveMatch();
    playTone(180 + match * 3.2, .065, .018 + match / 3200, 'sine');
  }

  function playSuccess() {
    playTone(392, .13, .045, 'sine', 0);
    playTone(523.25, .16, .04, 'sine', .08);
    playTone(659.25, .21, .035, 'sine', .16);
  }

  function playError() {
    playTone(150, .11, .035, 'sawtooth', 0);
    playTone(118, .14, .027, 'sawtooth', .08);
  }

  function focusTarget(target) {
    window.setTimeout(function () {
      target.focus({ preventScroll: true });
      const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
    }, 70);
  }

  function completeStage(index, successKey) {
    state.solved[index] = true;
    if (index === 3) state.complete = true;
    saveState();
    renderAll();
    playSuccess();

    if (index === 3) {
      announce(t('frequency.result.announcement'), true);
      focusTarget(elements['result-panel']);
      return;
    }

    const next = stageConfiguration()[index + 1];
    announce(t(successKey) + ' ' + t('frequency.status.stageUnlocked', {
      stage: index + 2,
      title: t(next.titleKey)
    }), false);
    focusTarget(next.heading);
  }

  function recordFailure(index, message, hintElement, hintPrefix) {
    state.attempts[index] = clamp(state.attempts[index] + 1, 0, 99);
    saveState();
    renderHint(hintElement, hintPrefix, index);
    playError();
    announce(message + (hintElement.hidden ? '' : ' ' + hintElement.textContent), false);
  }

  function validateFrequency() {
    if (!stageUnlocked(0) || state.solved[0]) return;
    if (frequencySolved(state.frequency)) {
      state.frequency = TARGET_FREQUENCY;
      completeStage(0, 'frequency.stage1.success');
      return;
    }
    recordFailure(0, t('frequency.stage1.error', { value: state.frequency.toFixed(2) }), elements['tune-hint'], 'frequency.stage1.hint');
  }

  function validateWave() {
    if (!stageUnlocked(1) || state.solved[1]) return;
    if (waveSolved(state.gain, state.phase)) {
      state.gain = TARGET_GAIN;
      state.phase = TARGET_PHASE;
      completeStage(1, 'frequency.stage2.success');
      return;
    }
    recordFailure(1, t('frequency.stage2.error', { match: waveMatch() }), elements['wave-hint'], 'frequency.stage2.hint');
  }

  function moveFragment(id, direction) {
    if (!stageUnlocked(2) || state.solved[2]) return;
    const index = state.order.indexOf(id);
    const destination = direction === 'up' ? index - 1 : index + 1;
    if (index < 0 || destination < 0 || destination >= state.order.length) return;
    const swap = state.order[destination];
    state.order[destination] = id;
    state.order[index] = swap;
    saveState();
    renderFragments();
    announce(t('frequency.stage3.moved', { position: destination + 1 }), false);
    window.requestAnimationFrame(function () {
      const item = elements['fragment-list'].querySelector('[data-fragment-id="' + id + '"]');
      if (item) item.focus();
    });
  }

  function validateFragments() {
    if (!stageUnlocked(2) || state.solved[2]) return;
    if (orderSolved(state.order)) {
      completeStage(2, 'frequency.stage3.success');
      return;
    }
    recordFailure(2, t('frequency.stage3.error'), elements['fragment-hint'], 'frequency.stage3.hint');
  }

  function selectRelay(id, shouldFocus) {
    if (!stageUnlocked(3) || state.solved[3] || !RELAY_IDS.includes(id)) return;
    state.selectedRelay = id;
    saveState();
    renderRelays();
    if (shouldFocus) {
      const button = elements.relayButtons.find(function (candidate) { return candidate.dataset.relay === id; });
      if (button) button.focus();
    }
  }

  function validateRelay() {
    if (!stageUnlocked(3) || state.solved[3]) return;
    if (!state.selectedRelay) {
      recordFailure(3, t('frequency.stage4.noChoice'), elements['relay-hint'], 'frequency.stage4.hint');
      return;
    }
    if (state.selectedRelay === 'arlington') {
      completeStage(3, 'frequency.stage4.success');
      return;
    }
    recordFailure(3, t('frequency.stage4.error', {
      name: t('frequency.relay.' + state.selectedRelay + '.name')
    }), elements['relay-hint'], 'frequency.stage4.hint');
  }

  function toggleSound() {
    state.muted = !state.muted;
    saveState();
    renderSound();
    if (!state.muted) {
      ensureAudio().then(function () {
        playTone(440, .09, .035, 'sine');
      }).catch(function () {});
      announce(t('frequency.sound.enabledAnnouncement'), false);
    } else {
      if (masterGain && audioContext) masterGain.gain.setValueAtTime(0, audioContext.currentTime);
      announce(t('frequency.sound.disabledAnnouncement'), false);
    }
    if (!state.muted && masterGain && audioContext) masterGain.gain.setValueAtTime(1, audioContext.currentTime);
  }

  function resetPuzzle() {
    if (!window.confirm(t('frequency.action.resetConfirm'))) return;
    const muted = state.muted;
    state = defaultState();
    state.muted = muted;
    saveState();
    renderAll();
    announce(t('frequency.status.reset'), false);
    focusTarget(elements['frequency-control']);
  }

  function bindEvents() {
    elements['frequency-control'].addEventListener('input', function (event) {
      state.frequency = Math.round(clamp(finiteNumber(event.target.value, state.frequency), 40, 43) * 100) / 100;
      saveState();
      renderTuner();
      playTuningFeedback();
    });
    elements['validate-frequency'].addEventListener('click', validateFrequency);

    elements['gain-control'].addEventListener('input', function (event) {
      state.gain = Math.round(clamp(finiteNumber(event.target.value, state.gain), 0, 100));
      saveState();
      renderWave();
      playWaveFeedback();
    });
    elements['phase-control'].addEventListener('input', function (event) {
      state.phase = Math.round(clamp(finiteNumber(event.target.value, state.phase), 0, 180));
      saveState();
      renderWave();
      playWaveFeedback();
    });
    elements['validate-wave'].addEventListener('click', validateWave);

    elements['fragment-list'].addEventListener('click', function (event) {
      const button = event.target.closest('[data-move]');
      if (button) moveFragment(button.dataset.fragment, button.dataset.move);
    });
    elements['validate-fragments'].addEventListener('click', validateFragments);

    elements.relayButtons.forEach(function (button) {
      button.addEventListener('click', function () { selectRelay(button.dataset.relay, false); });
      button.addEventListener('keydown', function (event) {
        if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const current = RELAY_IDS.indexOf(button.dataset.relay);
        let next = current;
        if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = RELAY_IDS.length - 1;
        else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (current - 1 + RELAY_IDS.length) % RELAY_IDS.length;
        else next = (current + 1) % RELAY_IDS.length;
        selectRelay(RELAY_IDS[next], true);
      });
    });
    elements['validate-relay'].addEventListener('click', validateRelay);

    elements['sound-toggle'].addEventListener('click', toggleSound);
    elements['reset-puzzle'].addEventListener('click', resetPuzzle);

    window.addEventListener('resize', function () {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(drawWave);
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden && audioContext && audioContext.state === 'running') audioContext.suspend().catch(function () {});
    });
    document.addEventListener('dd:locale-change', function () {
      window.setTimeout(renderAll, 0);
    });
  }

  function removeDynamicBindings() {
    [
      elements['sound-label'], elements['stage-tune-status'], elements['stage-wave-status'],
      elements['stage-fragments-status'], elements['stage-map-status'],
      elements['tune-feedback'], elements['relay-reading']
    ].forEach(function (element) { element.removeAttribute('data-i18n'); });
  }

  function init() {
    elements = collectElements();
    if (!elements) return;
    removeDynamicBindings();
    state = loadState();
    bindEvents();
    renderAll();
    saveState();

    const restored = completedCount();
    if (restored > 0) {
      window.setTimeout(function () {
        announce(t('frequency.status.restored', { count: restored }), false);
      }, 450);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
