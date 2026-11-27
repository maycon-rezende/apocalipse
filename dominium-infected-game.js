(() => {
  'use strict';

  const app = document.getElementById('dominium-app');
  const game = document.getElementById('infection-game');
  if (!app || app.hidden || !game) return;

  const views = [...game.querySelectorAll('[data-game-view]')];
  const doors = [...game.querySelectorAll('[data-game-cell]')];
  const channels = [...game.querySelectorAll('[data-game-channel]')];
  const frameButtons = [...game.querySelectorAll('[data-game-frame]')];
  const image = document.getElementById('game-stage-image');
  const frame = document.getElementById('game-feed-frame');
  const advanceButton = game.querySelector('[data-game-advance]');
  const records = new Map();
  const frames = [
    { image: 'img-dominus/ala-de-testes.png', alt: 'dominium.infected.stage.1.alt', title: 'dominium.infected.stage.1.title' },
    { image: 'img-dominus/ala-estagio-2.png', alt: 'dominium.infected.stage.2.alt', title: 'dominium.infected.stage.2.title' },
    { image: 'img-dominus/ala-estagio-3-transformacao.png', alt: 'dominium.infected.stage.3.alt', title: 'dominium.infected.stage.3.title' },
    { image: 'img-dominus/ala-estagio-4-transformacao.png', alt: 'dominium.infected.stage.4.alt', title: 'dominium.infected.stage.4.title' }
  ];
  const t = (key, variables) => window.DoomsdayI18n?.t(key, variables) || key;
  let selectedCell = '01';
  let transitionTimer = 0;
  let signalTimer = 0;

  function recordFor(cellCode) {
    if (!records.has(cellCode)) {
      records.set(cellCode, { unlocked: 1, current: 1, reads: new Map([[1, new Set()]]), lastChannel: new Map() });
    }
    return records.get(cellCode);
  }

  function readsFor(record, stage = record.current) {
    if (!record.reads.has(stage)) record.reads.set(stage, new Set());
    return record.reads.get(stage);
  }

  function showView(name) {
    window.clearTimeout(transitionTimer);
    const next = views.find(view => view.dataset.gameView === name);
    if (!next) return;
    views.forEach(view => {
      const active = view === next;
      view.hidden = !active;
      view.classList.toggle('is-active', active);
      view.setAttribute('aria-hidden', String(!active));
    });
    game.dataset.scene = name;
    next.classList.remove('is-entering');
    void next.offsetWidth;
    next.classList.add('is-entering');
    transitionTimer = window.setTimeout(() => next.classList.remove('is-entering'), 650);

    const location = document.getElementById('game-hud-location');
    if (location) {
      const locationKey = name === 'entry'
        ? 'dominium.infected.game.location.entry'
        : name === 'corridor'
          ? 'dominium.infected.game.location.corridor'
          : 'dominium.infected.game.location.cell';
      location.textContent = t(locationKey, { cell: selectedCell });
    }
    if (name === 'corridor') {
      game.querySelector('.infection-door.is-selected')?.focus({ preventScroll: true });
    }
    if (name === 'cell') game.querySelector('[data-game-back]')?.focus({ preventScroll: true });
  }

  function pulseFeed() {
    if (!frame) return;
    window.clearTimeout(signalTimer);
    frame.classList.remove('is-transmitting');
    void frame.offsetWidth;
    frame.classList.add('is-transmitting');
    signalTimer = window.setTimeout(() => frame.classList.remove('is-transmitting'), 520);
  }

  function renderCell() {
    const record = recordFor(selectedCell);
    const current = frames[record.current - 1];
    const reads = readsFor(record);
    const imageCaption = document.getElementById('game-stage-caption');
    const count = document.getElementById('game-channel-count');
    const meter = document.getElementById('game-channel-meter');
    const note = document.getElementById('game-complete-note');
    const advanceLabel = advanceButton?.querySelector('[data-i18n]');

    document.getElementById('game-cell-title-code').textContent = selectedCell;
    document.getElementById('game-cell-coord').textContent = t('dominium.infected.game.location.cell', { cell: selectedCell });
    document.getElementById('game-feed-code').textContent = t('dominium.infected.game.feed.code');
    document.getElementById('game-feed-stage').textContent = t('dominium.infected.game.frame.counter', {
      current: String(record.current).padStart(2, '0'), total: String(frames.length).padStart(2, '0')
    });
    document.getElementById('game-stage-counter').textContent = `${String(record.current).padStart(2, '0')} / ${String(frames.length).padStart(2, '0')}`;
    image.src = current.image;
    image.alt = t(current.alt);
    image.dataset.i18nAttr = `alt:${current.alt}`;
    if (imageCaption) imageCaption.textContent = t(current.title);

    frameButtons.forEach(button => {
      const number = Number(button.dataset.gameFrame);
      button.disabled = number > record.unlocked;
      if (number === record.current) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    channels.forEach(button => {
      const read = reads.has(button.dataset.gameChannel);
      button.setAttribute('aria-pressed', String(read));
      button.classList.toggle('is-read', read);
    });

    if (count) count.textContent = `${reads.size} / 2`;
    if (meter) meter.style.width = `${Math.min(reads.size / 2, 1) * 100}%`;
    const canAdvance = reads.size >= 2 && (record.current < frames.length || record.unlocked < frames.length);
    advanceButton.disabled = !canAdvance;
    if (advanceLabel) {
      const key = record.current < record.unlocked
        ? 'dominium.infected.game.advance.replay'
        : record.current >= frames.length
          ? 'dominium.infected.game.advance.done'
          : 'dominium.infected.game.advance';
      advanceLabel.textContent = t(key);
    }
    note.hidden = !(record.current === frames.length && record.unlocked === frames.length && reads.size >= 2);
    const log = document.getElementById('game-inspection-log');
    const lastChannel = record.lastChannel.get(record.current);
    if (lastChannel) {
      const channelKey = `dominium.infected.inspection.result.${lastChannel}`;
      log.dataset.channelKey = channelKey;
      log.textContent = t(channelKey, { cell: selectedCell, stage: String(record.current).padStart(2, '0') });
    } else {
      log.textContent = t('dominium.infected.game.log.initial');
      delete log.dataset.channelKey;
    }
  }

  function selectCell(cellCode) {
    selectedCell = cellCode;
    doors.forEach(door => {
      const selected = door.dataset.gameCell === selectedCell;
      door.classList.toggle('is-selected', selected);
      door.setAttribute('aria-pressed', String(selected));
      const label = door.querySelector('b');
      if (label) label.textContent = t(selected ? 'dominium.infected.game.cell.select' : 'dominium.infected.game.cell.open');
    });
    document.getElementById('game-selected-cell').textContent = selectedCell;
    const enter = game.querySelector('[data-game-enter] span:first-child');
    if (enter) enter.textContent = t('dominium.infected.game.console.enter', { cell: selectedCell });
    document.getElementById('game-hud-location').textContent = t('dominium.infected.game.location.corridor');
  }

  game.querySelector('[data-game-start]')?.addEventListener('click', () => showView('corridor'));
  doors.forEach(door => door.addEventListener('click', () => selectCell(door.dataset.gameCell)));
  game.querySelector('[data-game-enter]')?.addEventListener('click', () => {
    renderCell();
    showView('cell');
  });
  game.querySelector('[data-game-back]')?.addEventListener('click', () => showView('corridor'));

  channels.forEach(button => button.addEventListener('click', () => {
    const record = recordFor(selectedCell);
    readsFor(record).add(button.dataset.gameChannel);
    record.lastChannel.set(record.current, button.dataset.gameChannel);
    const channelKey = `dominium.infected.inspection.result.${button.dataset.gameChannel}`;
    const log = document.getElementById('game-inspection-log');
    log.dataset.channelKey = channelKey;
    log.textContent = t(channelKey, { cell: selectedCell, stage: String(record.current).padStart(2, '0') });
    renderCell();
    pulseFeed();
  }));

  frameButtons.forEach(button => button.addEventListener('click', () => {
    const record = recordFor(selectedCell);
    const requested = Number(button.dataset.gameFrame);
    if (requested > record.unlocked) return;
    record.current = requested;
    renderCell();
    pulseFeed();
  }));

  advanceButton?.addEventListener('click', () => {
    const record = recordFor(selectedCell);
    if (readsFor(record).size < 2) return;
    if (record.current < record.unlocked) {
      record.current += 1;
    } else if (record.unlocked < frames.length) {
      record.unlocked += 1;
      record.current = record.unlocked;
    }
    renderCell();
    pulseFeed();
  });

  game.addEventListener('keydown', event => {
    const view = game.dataset.scene;
    if (event.key === 'Escape' && view === 'cell') {
      event.preventDefault();
      showView('corridor');
      return;
    }
    if (view === 'entry' && event.key === 'Enter' && event.target === document.body) {
      event.preventDefault();
      showView('corridor');
      return;
    }
    if (view !== 'corridor' || !['ArrowLeft', 'ArrowRight', 'Enter'].includes(event.key)) return;
    const selectedIndex = doors.findIndex(door => door.dataset.gameCell === selectedCell);
    if (event.key === 'Enter') {
      event.preventDefault();
      game.querySelector('[data-game-enter]')?.click();
      return;
    }
    event.preventDefault();
    const offset = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (selectedIndex + offset + doors.length) % doors.length;
    selectCell(doors[nextIndex].dataset.gameCell);
    doors[nextIndex].focus({ preventScroll: true });
  });

  showView('entry');
  selectCell(selectedCell);
  renderCell();
})();
