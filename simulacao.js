(function () {
  'use strict';

  const WIDTH = 320;
  const HEIGHT = 480;
  const TOTAL_WAVES = 3;
  const RECORDS_KEY = 'dd_simulation_records_v1';
  const SETTINGS_KEY = 'dd_simulation_settings_v1';

  const CHARACTERS = {
    mick: {
      health: 100,
      speed: 88,
      damage: 24,
      fireDelay: 0.18,
      magazine: 12,
      reserve: 48,
      reload: 1.25,
      abilityCooldown: 13,
      abilityDuration: 4,
      body: '#263d45',
      accent: '#6eb1bc'
    },
    mei: {
      health: 78,
      speed: 116,
      damage: 18,
      fireDelay: 0.135,
      magazine: 16,
      reserve: 64,
      reload: 0.92,
      abilityCooldown: 12,
      abilityDuration: 2.6,
      body: '#5e5549',
      accent: '#e4ad71'
    },
    hanson: {
      health: 145,
      speed: 72,
      damage: 38,
      fireDelay: 0.245,
      magazine: 8,
      reserve: 40,
      reload: 1.55,
      abilityCooldown: 15,
      abilityDuration: 4.2,
      body: '#3e533e',
      accent: '#a8bd7b'
    }
  };

  const ENEMY_TYPES = {
    common: { health: 42, speed: 29, damage: 12, size: 9, score: 100, color: '#71865d' },
    fast: { health: 27, speed: 49, damage: 9, size: 7, score: 150, color: '#a49355' },
    brute: { health: 112, speed: 20, damage: 24, size: 14, score: 280, color: '#596d50' }
  };

  const WAVES = [
    { total: 24, interval: 1.00, weights: [0.86, 0.14, 0] },
    { total: 34, interval: 0.85, weights: [0.57, 0.32, 0.11] },
    { total: 44, interval: 0.72, weights: [0.40, 0.35, 0.25] }
  ];

  const dom = {};
  const input = { up: false, down: false, left: false, right: false, shoot: false };
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ctx = null;
  let selectedCharacter = 'mick';
  let records = readStorage(RECORDS_KEY, { mick: 0, mei: 0, hanson: 0 });
  let settings = readStorage(SETTINGS_KEY, { muted: false });
  let countdownToken = 0;

  const game = {
    phase: 'select',
    beforePause: 'running',
    player: null,
    bullets: [],
    enemies: [],
    drops: [],
    particles: [],
    score: 0,
    combo: 1,
    comboTimer: 0,
    wave: 0,
    spawned: 0,
    defeated: 0,
    nextSpawn: 0,
    betweenWaves: 0,
    bannerTime: 0,
    bannerKey: '',
    elapsed: 0,
    shake: 0,
    flash: 0,
    lastTime: 0,
    raf: 0,
    emptyNotice: false,
    newRecord: false
  };

  function readStorage(key, fallback) {
    try {
      const stored = JSON.parse(localStorage.getItem(key));
      return stored && typeof stored === 'object' ? Object.assign({}, fallback, stored) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) {}
  }

  function tr(key, variables) {
    if (window.DoomsdayI18n) return window.DoomsdayI18n.t(key, variables);
    return key;
  }

  function announce(key, variables) {
    if (!dom.announcer) return;
    dom.announcer.textContent = '';
    window.setTimeout(function () { dom.announcer.textContent = tr(key, variables); }, 20);
  }

  function padScore(value) {
    return String(Math.max(0, Math.floor(value))).padStart(6, '0');
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  function isAnalog() {
    return Boolean(window.DD_ANALOG_MODE || document.documentElement.classList.contains('analog-experience'));
  }

  const audio = {
    context: null,
    master: null,
    nextPulse: 0,

    ensure: function () {
      if (this.context) {
        if (this.context.state === 'suspended') this.context.resume().catch(function () {});
        return;
      }
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      try {
        this.context = new AudioContext();
        this.master = this.context.createGain();
        this.master.gain.value = settings.muted ? 0 : 0.38;
        this.master.connect(this.context.destination);
      } catch (error) {
        this.context = null;
        this.master = null;
      }
    },

    setMuted: function (muted) {
      settings.muted = Boolean(muted);
      writeStorage(SETTINGS_KEY, settings);
      if (this.master && this.context) {
        this.master.gain.cancelScheduledValues(this.context.currentTime);
        this.master.gain.setTargetAtTime(settings.muted ? 0 : 0.38, this.context.currentTime, 0.015);
      }
      updateSoundButton();
    },

    tone: function (frequency, duration, type, volume, endFrequency) {
      if (settings.muted || !this.context || !this.master) return;
      const now = this.context.currentTime;
      const oscillator = this.context.createOscillator();
      const gain = this.context.createGain();
      oscillator.type = type || 'square';
      oscillator.frequency.setValueAtTime(frequency, now);
      if (endFrequency) oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, endFrequency), now + duration);
      gain.gain.setValueAtTime(Math.max(0.0001, volume || 0.05), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      oscillator.connect(gain);
      gain.connect(this.master);
      oscillator.start(now);
      oscillator.stop(now + duration + 0.02);
    },

    noise: function (duration, volume) {
      if (settings.muted || !this.context || !this.master) return;
      const length = Math.max(1, Math.floor(this.context.sampleRate * duration));
      const buffer = this.context.createBuffer(1, length, this.context.sampleRate);
      const channel = buffer.getChannelData(0);
      for (let index = 0; index < length; index += 1) channel[index] = (Math.random() * 2 - 1) * (1 - index / length);
      const source = this.context.createBufferSource();
      const gain = this.context.createGain();
      source.buffer = buffer;
      gain.gain.value = volume || 0.035;
      source.connect(gain);
      gain.connect(this.master);
      source.start();
    },

    ambient: function () {
      if (!this.context || settings.muted || this.context.currentTime < this.nextPulse) return;
      this.nextPulse = this.context.currentTime + 1.2;
      this.tone(isAnalog() ? 47 : 55, 0.16, 'triangle', 0.014, 42);
    },

    shot: function (character) {
      const base = character === 'hanson' ? 88 : character === 'mei' ? 142 : 116;
      this.tone(base, character === 'hanson' ? 0.09 : 0.055, 'square', character === 'hanson' ? 0.055 : 0.035, 48);
    },
    hit: function () { this.tone(74, 0.055, 'sawtooth', 0.025, 38); },
    hurt: function () { this.noise(0.12, 0.06); this.tone(52, 0.18, 'sawtooth', 0.045, 30); },
    pickup: function () { this.tone(390, 0.08, 'square', 0.035, 660); },
    reload: function () { this.tone(180, 0.05, 'square', 0.022, 115); },
    ability: function () { this.tone(135, 0.28, 'sawtooth', 0.045, 520); },
    wave: function () { this.tone(110, 0.2, 'square', 0.04, 220); },
    win: function () { this.tone(220, 0.18, 'square', 0.04, 330); window.setTimeout(() => this.tone(330, 0.3, 'square', 0.04, 520), 150); },
    lose: function () { this.tone(120, 0.7, 'sawtooth', 0.05, 28); }
  };

  function cacheDom() {
    dom.app = document.getElementById('simulation-app');
    dom.selection = document.getElementById('selection-screen');
    dom.gameScreen = document.getElementById('game-screen');
    dom.cards = Array.from(document.querySelectorAll('[data-character]'));
    dom.selectedUnit = document.getElementById('selected-unit');
    dom.start = document.getElementById('start-game');
    dom.canvas = document.getElementById('game-canvas');
    dom.frame = document.getElementById('canvas-frame');
    dom.frameStatus = document.getElementById('frame-status');
    dom.countdown = document.getElementById('countdown-overlay');
    dom.countdownValue = document.getElementById('countdown-value');
    dom.pauseOverlay = document.getElementById('pause-overlay');
    dom.resultOverlay = document.getElementById('result-overlay');
    dom.resultCode = document.getElementById('result-code');
    dom.resultTitle = document.getElementById('result-title');
    dom.resultCopy = document.getElementById('result-copy');
    dom.resultScore = document.getElementById('result-score');
    dom.resultRecord = document.getElementById('result-record');
    dom.newRecord = document.getElementById('new-record');
    dom.hudCharacter = document.getElementById('hud-character');
    dom.hudScore = document.getElementById('hud-score');
    dom.hudRecord = document.getElementById('hud-record');
    dom.hudCombo = document.getElementById('hud-combo');
    dom.hudWave = document.getElementById('hud-wave');
    dom.hudHealth = document.getElementById('hud-health');
    dom.hudHealthValue = document.getElementById('hud-health-value');
    dom.hudMagazine = document.getElementById('hud-magazine');
    dom.hudReserve = document.getElementById('hud-reserve');
    dom.hudAbility = document.getElementById('hud-ability');
    dom.abilityFill = document.getElementById('ability-fill');
    dom.abilityStatus = document.getElementById('ability-status');
    dom.reloadStatus = document.getElementById('reload-status');
    dom.pauseButton = document.getElementById('pause-button');
    dom.touchPause = document.getElementById('touch-pause');
    dom.sound = document.getElementById('sound-toggle');
    dom.announcer = document.getElementById('game-announcer');
  }

  function characterName(key, short) {
    return tr('simulation.character.' + key + (short ? '.short' : '.name'));
  }

  function abilityName(key) {
    return tr('simulation.character.' + key + '.ability');
  }

  function updateSoundButton() {
    if (!dom.sound) return;
    const enabled = !settings.muted;
    dom.sound.setAttribute('aria-pressed', String(enabled));
    const label = dom.sound.querySelector('[data-sound-label]');
    if (label) label.textContent = tr(enabled ? 'simulation.sound.disable' : 'simulation.sound.enable');
  }

  function selectCharacter(key, shouldAnnounce) {
    if (!CHARACTERS[key]) return;
    selectedCharacter = key;
    dom.cards.forEach(function (card) {
      const selected = card.dataset.character === key;
      card.classList.toggle('is-selected', selected);
      card.setAttribute('aria-checked', String(selected));
      card.tabIndex = selected ? 0 : -1;
    });
    dom.selectedUnit.textContent = tr('simulation.selection.selected' + (key === 'mick' ? 'Mick' : key === 'mei' ? 'Mei' : 'Hanson'));
    if (shouldAnnounce) announce('simulation.status.selected', { name: characterName(key) });
  }

  function createPlayer(key) {
    const config = CHARACTERS[key];
    return {
      key: key,
      x: WIDTH / 2,
      y: HEIGHT - 55,
      radius: 7,
      health: config.health,
      maxHealth: config.health,
      magazine: config.magazine,
      magazineSize: config.magazine,
      reserve: config.reserve,
      fireTimer: 0,
      reloadTimer: 0,
      reloading: false,
      abilityCooldown: 0,
      abilityActive: 0,
      invulnerable: 0
    };
  }

  function resetGame() {
    game.player = createPlayer(selectedCharacter);
    game.bullets.length = 0;
    game.enemies.length = 0;
    game.drops.length = 0;
    game.particles.length = 0;
    game.score = 0;
    game.combo = 1;
    game.comboTimer = 0;
    game.wave = 0;
    game.spawned = 0;
    game.defeated = 0;
    game.nextSpawn = 0;
    game.betweenWaves = 0;
    game.bannerTime = 0;
    game.bannerKey = '';
    game.elapsed = 0;
    game.shake = 0;
    game.flash = 0;
    game.emptyNotice = false;
    game.newRecord = false;
    Object.keys(input).forEach(function (key) { input[key] = false; });
    updateHud();
  }

  function startGame() {
    audio.ensure();
    document.body.classList.add('locked');
    countdownToken += 1;
    cancelAnimationFrame(game.raf);
    resetGame();
    game.phase = 'countdown';
    dom.app.dataset.state = 'game';
    dom.selection.hidden = true;
    dom.gameScreen.hidden = false;
    dom.pauseOverlay.hidden = true;
    dom.resultOverlay.hidden = true;
    dom.countdown.hidden = false;
    dom.frameStatus.textContent = tr('simulation.status.standby');
    announce('simulation.status.starting');
    beginCountdown(countdownToken);
    game.lastTime = performance.now();
    game.raf = requestAnimationFrame(loop);
    window.setTimeout(function () {
      dom.canvas.focus({ preventScroll: true });
      announce('simulation.status.focus');
    }, 80);
  }

  function beginCountdown(token) {
    let value = 3;
    dom.countdownValue.textContent = String(value);
    const step = function () {
      if (token !== countdownToken || game.phase !== 'countdown') return;
      value -= 1;
      if (value > 0) {
        dom.countdownValue.textContent = String(value);
        audio.tone(180 + value * 30, 0.08, 'square', 0.03, 120);
        window.setTimeout(step, 700);
        return;
      }
      dom.countdownValue.textContent = tr('simulation.status.go');
      audio.tone(260, 0.18, 'square', 0.045, 520);
      window.setTimeout(function () {
        if (token !== countdownToken || game.phase !== 'countdown') return;
        dom.countdown.hidden = true;
        game.phase = 'running';
        startWave(0);
        announce('simulation.status.begin');
      }, 420);
    };
    audio.tone(240, 0.08, 'square', 0.03, 150);
    window.setTimeout(step, 700);
  }

  function startWave(index) {
    game.wave = index;
    game.spawned = 0;
    game.defeated = 0;
    game.nextSpawn = 0.35;
    game.betweenWaves = 0;
    game.bannerTime = 1.6;
    game.bannerKey = 'simulation.canvas.wave';
    dom.frameStatus.textContent = tr('simulation.status.running');
    audio.wave();
    if (index > 0) announce('simulation.status.waveIncoming', { wave: index + 1 });
    updateHud();
  }

  function chooseEnemyType(weights) {
    const roll = Math.random();
    if (roll < weights[0]) return 'common';
    if (roll < weights[0] + weights[1]) return 'fast';
    return 'brute';
  }

  function spawnEnemy() {
    const wave = WAVES[game.wave];
    const type = chooseEnemyType(wave.weights);
    const config = ENEMY_TYPES[type];
    const size = config.size;
    game.enemies.push({
      type: type,
      x: random(size + 8, WIDTH - size - 8),
      y: -size - random(2, 26),
      radius: size,
      health: config.health,
      maxHealth: config.health,
      speed: config.speed * random(0.91, 1.09),
      phase: random(0, Math.PI * 2)
    });
    game.spawned += 1;
  }

  function fire() {
    const player = game.player;
    const config = CHARACTERS[player.key];
    if (player.reloading || player.fireTimer > 0 || game.phase !== 'running') return;
    if (player.magazine <= 0) {
      if (!game.emptyNotice) {
        announce(player.reserve > 0 ? 'simulation.status.empty' : 'simulation.status.noReserve');
        game.emptyNotice = true;
      }
      return;
    }

    player.magazine -= 1;
    game.emptyNotice = false;
    const focus = player.key === 'mick' && player.abilityActive > 0;
    const evasive = player.key === 'mei' && player.abilityActive > 0;
    const heavy = player.key === 'hanson' && player.abilityActive > 0;
    player.fireTimer = config.fireDelay * (focus ? 0.52 : 1);
    const shots = evasive ? [-48, 0, 48] : [0];

    shots.forEach(function (velocityX) {
      game.bullets.push({
        x: player.x + (velocityX === 0 ? 0 : velocityX / 16),
        y: player.y - 11,
        vx: velocityX,
        vy: -245,
        radius: heavy ? 3 : 2,
        damage: config.damage * (heavy ? 1.35 : 1),
        pierce: focus ? 1 : 0,
        color: config.accent
      });
    });
    createParticles(player.x, player.y - 12, config.accent, reducedMotion ? 1 : 3, 18);
    audio.shot(player.key);
  }

  function beginReload() {
    const player = game.player;
    const config = CHARACTERS[player.key];
    if (!player || player.reloading || player.magazine >= player.magazineSize) return;
    if (player.reserve <= 0) {
      announce('simulation.status.noReserve');
      return;
    }
    player.reloading = true;
    player.reloadTimer = config.reload;
    dom.reloadStatus.textContent = tr('simulation.canvas.reload');
    announce('simulation.status.reloadStart');
    audio.reload();
  }

  function completeReload() {
    const player = game.player;
    const needed = player.magazineSize - player.magazine;
    const transfer = Math.min(needed, player.reserve);
    player.magazine += transfer;
    player.reserve -= transfer;
    player.reloading = false;
    player.reloadTimer = 0;
    game.emptyNotice = false;
    dom.reloadStatus.textContent = '';
    announce('simulation.status.reloadDone');
    audio.reload();
  }

  function activateAbility() {
    const player = game.player;
    if (!player || game.phase !== 'running' || player.abilityCooldown > 0 || player.abilityActive > 0) return;
    const config = CHARACTERS[player.key];
    player.abilityActive = config.abilityDuration;
    player.abilityCooldown = config.abilityCooldown;
    if (player.key === 'mei' || player.key === 'hanson') player.invulnerable = Math.max(player.invulnerable, config.abilityDuration);
    announce('simulation.status.abilityUsed', { ability: abilityName(player.key) });
    audio.ability();
    createParticles(player.x, player.y, config.accent, reducedMotion ? 4 : 18, 65);
  }

  function damagePlayer(amount) {
    const player = game.player;
    if (!player || player.invulnerable > 0 || game.phase !== 'running') return;
    player.health = Math.max(0, player.health - amount);
    player.invulnerable = 0.75;
    if (!reducedMotion) {
      game.shake = 0.26;
      game.flash = 0.18;
    }
    createParticles(player.x, player.y, '#bf2938', reducedMotion ? 2 : 9, 42);
    audio.hurt();
    announce(player.health <= player.maxHealth * 0.25 ? 'simulation.status.lowHealth' : 'simulation.status.damaged', { health: Math.ceil(player.health) });
    if (player.health <= 0) finishGame(false);
  }

  function createParticles(x, y, color, count, speed) {
    for (let index = 0; index < count; index += 1) {
      const angle = random(0, Math.PI * 2);
      const velocity = random(speed * 0.35, speed);
      game.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: random(0.18, 0.42),
        maxLife: 0.42,
        color: color
      });
    }
  }

  function enemyDefeated(enemy) {
    const config = ENEMY_TYPES[enemy.type];
    game.combo = game.comboTimer > 0 ? Math.min(9, game.combo + 1) : 1;
    game.comboTimer = 2.5;
    game.score += config.score * game.combo;
    game.defeated += 1;
    createParticles(enemy.x, enemy.y, '#852b31', reducedMotion ? 2 : enemy.type === 'brute' ? 13 : 7, 52);
    audio.hit();

    const dropRoll = Math.random();
    if (dropRoll < 0.09) game.drops.push({ type: 'ammo', x: enemy.x, y: enemy.y, radius: 7, life: 10 });
    else if (dropRoll < 0.16) game.drops.push({ type: 'health', x: enemy.x, y: enemy.y, radius: 7, life: 10 });
  }

  function collectDrop(drop) {
    const player = game.player;
    if (drop.type === 'ammo') {
      player.reserve += Math.max(8, Math.round(player.magazineSize * 0.8));
      announce('simulation.status.dropAmmo');
    } else {
      player.health = Math.min(player.maxHealth, player.health + Math.ceil(player.maxHealth * 0.25));
      announce('simulation.status.dropHealth');
    }
    audio.pickup();
    createParticles(drop.x, drop.y, drop.type === 'ammo' ? '#d39a31' : '#58bd82', reducedMotion ? 3 : 10, 48);
  }

  function circlesTouch(a, b, padding) {
    const radius = a.radius + b.radius + (padding || 0);
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return dx * dx + dy * dy <= radius * radius;
  }

  function update(dt) {
    const player = game.player;
    const config = CHARACTERS[player.key];
    game.elapsed += dt;
    audio.ambient();

    let dx = (input.right ? 1 : 0) - (input.left ? 1 : 0);
    let dy = (input.down ? 1 : 0) - (input.up ? 1 : 0);
    if (dx && dy) { dx *= 0.7071; dy *= 0.7071; }
    const speedBoost = player.key === 'mei' && player.abilityActive > 0 ? 1.72 : 1;
    player.x = clamp(player.x + dx * config.speed * speedBoost * dt, 10, WIDTH - 10);
    player.y = clamp(player.y + dy * config.speed * speedBoost * dt, HEIGHT * 0.38, HEIGHT - 13);

    player.fireTimer = Math.max(0, player.fireTimer - dt);
    player.invulnerable = Math.max(0, player.invulnerable - dt);
    player.abilityActive = Math.max(0, player.abilityActive - dt);
    player.abilityCooldown = Math.max(0, player.abilityCooldown - dt);
    if (player.reloading) {
      player.reloadTimer -= dt;
      if (player.reloadTimer <= 0) completeReload();
    }
    if (input.shoot) fire();

    game.comboTimer = Math.max(0, game.comboTimer - dt);
    if (game.comboTimer <= 0) game.combo = 1;
    game.bannerTime = Math.max(0, game.bannerTime - dt);
    game.shake = Math.max(0, game.shake - dt);
    game.flash = Math.max(0, game.flash - dt);

    updateWave(dt);
    updateBullets(dt);
    updateEnemies(dt);
    updateDrops(dt);
    updateParticles(dt);
    updateHud();
  }

  function updateWave(dt) {
    const wave = WAVES[game.wave];
    if (game.betweenWaves > 0) {
      game.betweenWaves -= dt;
      if (game.betweenWaves <= 0) startWave(game.wave + 1);
      return;
    }

    if (game.spawned < wave.total) {
      game.nextSpawn -= dt;
      if (game.nextSpawn <= 0) {
        spawnEnemy();
        game.nextSpawn = wave.interval * random(0.72, 1.22);
      }
    }

    if (game.spawned >= wave.total && game.defeated >= wave.total && game.enemies.length === 0) {
      if (game.wave >= TOTAL_WAVES - 1) {
        finishGame(true);
      } else {
        game.bannerKey = 'simulation.canvas.cleared';
        game.bannerTime = 1.7;
        game.betweenWaves = 2.15;
        announce('simulation.status.waveClear', { wave: game.wave + 1 });
        audio.wave();
      }
    }
  }

  function updateBullets(dt) {
    for (let bulletIndex = game.bullets.length - 1; bulletIndex >= 0; bulletIndex -= 1) {
      const bullet = game.bullets[bulletIndex];
      bullet.x += bullet.vx * dt;
      bullet.y += bullet.vy * dt;
      let removeBullet = bullet.y < -8 || bullet.x < -8 || bullet.x > WIDTH + 8;

      for (let enemyIndex = game.enemies.length - 1; enemyIndex >= 0 && !removeBullet; enemyIndex -= 1) {
        const enemy = game.enemies[enemyIndex];
        if (!circlesTouch(bullet, enemy, -1)) continue;
        enemy.health -= bullet.damage;
        createParticles(bullet.x, bullet.y, '#a33a38', reducedMotion ? 1 : 3, 25);
        if (enemy.health <= 0) {
          game.enemies.splice(enemyIndex, 1);
          enemyDefeated(enemy);
        } else {
          audio.hit();
        }
        if (bullet.pierce > 0) bullet.pierce -= 1;
        else removeBullet = true;
      }

      if (removeBullet) game.bullets.splice(bulletIndex, 1);
    }
  }

  function updateEnemies(dt) {
    const player = game.player;
    for (let index = game.enemies.length - 1; index >= 0; index -= 1) {
      const enemy = game.enemies[index];
      enemy.phase += dt * (enemy.type === 'fast' ? 7 : 3);
      const tracking = enemy.type === 'brute' ? 0.13 : enemy.type === 'fast' ? 0.24 : 0.18;
      const targetVelocity = clamp((player.x - enemy.x) * tracking, -enemy.speed * 0.75, enemy.speed * 0.75);
      enemy.x += (targetVelocity + (enemy.type === 'fast' ? Math.sin(enemy.phase) * 18 : 0)) * dt;
      enemy.y += enemy.speed * dt;

      if (circlesTouch(enemy, player, -1)) {
        game.enemies.splice(index, 1);
        game.defeated += 1;
        damagePlayer(ENEMY_TYPES[enemy.type].damage);
        createParticles(enemy.x, enemy.y, '#81252d', reducedMotion ? 2 : 7, 45);
        continue;
      }

      if (enemy.y > HEIGHT + enemy.radius) {
        game.enemies.splice(index, 1);
        game.defeated += 1;
        damagePlayer(Math.ceil(ENEMY_TYPES[enemy.type].damage * 0.7));
      }
    }
  }

  function updateDrops(dt) {
    const player = game.player;
    for (let index = game.drops.length - 1; index >= 0; index -= 1) {
      const drop = game.drops[index];
      drop.life -= dt;
      drop.y += 13 * dt;
      if (circlesTouch(drop, player, 1)) {
        game.drops.splice(index, 1);
        collectDrop(drop);
      } else if (drop.life <= 0 || drop.y > HEIGHT + 10) {
        game.drops.splice(index, 1);
      }
    }
  }

  function updateParticles(dt) {
    for (let index = game.particles.length - 1; index >= 0; index -= 1) {
      const particle = game.particles[index];
      particle.life -= dt;
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.vx *= 0.93;
      particle.vy *= 0.93;
      if (particle.life <= 0) game.particles.splice(index, 1);
    }
  }

  function finishGame(victory) {
    if (game.phase === 'result') return;
    game.phase = 'result';
    document.body.classList.remove('locked');
    input.shoot = false;
    const previous = Number(records[selectedCharacter]) || 0;
    game.newRecord = game.score > previous;
    if (game.newRecord) {
      records[selectedCharacter] = game.score;
      writeStorage(RECORDS_KEY, records);
    }
    const record = Math.max(previous, game.score);
    dom.resultCode.textContent = tr(victory ? 'simulation.result.victoryCode' : 'simulation.result.defeatCode');
    dom.resultTitle.textContent = tr(victory ? 'simulation.result.victoryTitle' : 'simulation.result.defeatTitle');
    dom.resultCopy.textContent = tr(victory ? 'simulation.result.victoryCopy' : 'simulation.result.defeatCopy');
    dom.resultScore.textContent = padScore(game.score);
    dom.resultRecord.textContent = padScore(record);
    dom.newRecord.hidden = !game.newRecord;
    dom.resultOverlay.hidden = false;
    dom.frameStatus.textContent = tr(victory ? 'simulation.result.victoryTitle' : 'simulation.result.defeatTitle');
    announce(victory ? 'simulation.status.victory' : 'simulation.status.defeat');
    if (game.newRecord) window.setTimeout(function () { announce('simulation.status.newRecord', { score: game.score }); }, 900);
    if (victory) audio.win(); else audio.lose();
    updateHud();
    draw();
    window.setTimeout(function () {
      const action = dom.resultOverlay.querySelector('[data-overlay-action="restart"]');
      if (action) action.focus();
    }, 80);
  }

  function togglePause(forcePause) {
    if (game.phase !== 'running' && game.phase !== 'countdown' && game.phase !== 'paused') return;
    const shouldPause = typeof forcePause === 'boolean' ? forcePause : game.phase !== 'paused';
    if (shouldPause && (game.phase === 'running' || game.phase === 'countdown')) {
      game.beforePause = game.phase;
      if (game.phase === 'countdown') {
        countdownToken += 1;
        dom.countdown.hidden = true;
      }
      game.phase = 'paused';
      dom.pauseOverlay.hidden = false;
      dom.frameStatus.textContent = tr('simulation.overlay.paused');
      input.shoot = false;
      announce('simulation.status.paused');
      const resume = dom.pauseOverlay.querySelector('[data-overlay-action="resume"]');
      if (resume) resume.focus();
    } else if (!shouldPause && game.phase === 'paused') {
      dom.pauseOverlay.hidden = true;
      game.lastTime = performance.now();
      announce('simulation.status.resumed');
      if (game.beforePause === 'countdown') {
        game.phase = 'countdown';
        dom.countdown.hidden = false;
        dom.frameStatus.textContent = tr('simulation.status.standby');
        countdownToken += 1;
        beginCountdown(countdownToken);
      } else {
        game.phase = 'running';
        dom.frameStatus.textContent = tr('simulation.status.running');
      }
      dom.canvas.focus({ preventScroll: true });
    }
  }

  function returnToSelection() {
    countdownToken += 1;
    cancelAnimationFrame(game.raf);
    game.phase = 'select';
    document.body.classList.remove('locked');
    Object.keys(input).forEach(function (key) { input[key] = false; });
    dom.app.dataset.state = 'select';
    dom.gameScreen.hidden = true;
    dom.selection.hidden = false;
    dom.pauseOverlay.hidden = true;
    dom.resultOverlay.hidden = true;
    dom.countdown.hidden = true;
    dom.start.focus();
  }

  function updateHud() {
    const player = game.player;
    if (!player) return;
    const config = CHARACTERS[player.key];
    const record = Math.max(Number(records[player.key]) || 0, game.score);
    dom.hudCharacter.textContent = characterName(player.key, true);
    dom.hudScore.textContent = padScore(game.score);
    dom.hudRecord.textContent = padScore(record);
    dom.hudCombo.textContent = '×' + game.combo;
    dom.hudWave.textContent = String(game.wave + 1) + '/' + TOTAL_WAVES;
    dom.hudHealth.max = player.maxHealth;
    dom.hudHealth.value = player.health;
    dom.hudHealthValue.textContent = String(Math.ceil(player.health));
    dom.hudMagazine.textContent = String(player.magazine);
    dom.hudReserve.textContent = String(player.reserve);
    dom.hudAbility.textContent = abilityName(player.key);

    const cooldownRatio = player.abilityCooldown > 0 ? 1 - player.abilityCooldown / config.abilityCooldown : 1;
    dom.abilityFill.style.transform = 'scaleX(' + clamp(cooldownRatio, 0, 1).toFixed(3) + ')';
    if (player.abilityActive > 0) {
      dom.abilityStatus.textContent = tr('simulation.status.active');
    } else if (player.abilityCooldown > 0) {
      dom.abilityStatus.textContent = tr('simulation.status.cooldown', { seconds: Math.ceil(player.abilityCooldown) });
    } else {
      dom.abilityStatus.textContent = tr('simulation.status.ready');
    }
  }

  function drawArena() {
    const scroll = Math.floor((game.elapsed * 17) % 24);
    ctx.fillStyle = '#111912';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = '#172019';
    for (let y = -24 + scroll; y < HEIGHT; y += 24) {
      ctx.fillRect(0, y, WIDTH, 1);
      for (let x = 10; x < WIDTH; x += 32) ctx.fillRect(x, y + 5, 2, 2);
    }
    ctx.fillStyle = '#202a21';
    ctx.fillRect(22, 0, 2, HEIGHT);
    ctx.fillRect(WIDTH - 24, 0, 2, HEIGHT);
    ctx.fillStyle = '#807748';
    for (let y = -20 + scroll; y < HEIGHT; y += 42) {
      ctx.fillRect(WIDTH / 2 - 1, y, 2, 13);
    }
    ctx.fillStyle = '#283128';
    ctx.fillRect(0, HEIGHT * 0.38, WIDTH, 1);
  }

  function drawPlayer(player) {
    const config = CHARACTERS[player.key];
    const x = Math.round(player.x);
    const y = Math.round(player.y);
    if (player.invulnerable > 0 && !reducedMotion && Math.floor(player.invulnerable * 18) % 2 === 0) return;

    ctx.fillStyle = 'rgba(0,0,0,.42)';
    ctx.fillRect(x - 8, y + 7, 16, 4);
    ctx.fillStyle = config.body;
    ctx.fillRect(x - 6, y - 6, 12, 15);
    ctx.fillRect(x - 9, y - 2, 3, 9);
    ctx.fillRect(x + 6, y - 2, 3, 9);
    ctx.fillStyle = config.accent;
    ctx.fillRect(x - 5, y - 8, 10, 5);
    ctx.fillRect(x - 2, y - 13, 4, 8);
    ctx.fillStyle = '#090b0a';
    ctx.fillRect(x - 3, y - 7, 2, 2);
    ctx.fillRect(x + 2, y - 7, 2, 2);

    if (player.abilityActive > 0) {
      ctx.strokeStyle = config.accent;
      ctx.lineWidth = 1;
      ctx.strokeRect(x - 12, y - 15, 24, 27);
      if (player.key === 'hanson') ctx.strokeRect(x - 15, y - 18, 30, 33);
    }
  }

  function drawEnemy(enemy) {
    const config = ENEMY_TYPES[enemy.type];
    const x = Math.round(enemy.x);
    const y = Math.round(enemy.y);
    const size = enemy.radius;
    ctx.fillStyle = 'rgba(0,0,0,.38)';
    ctx.fillRect(x - size, y + size - 2, size * 2, 4);
    ctx.fillStyle = config.color;
    ctx.fillRect(x - size + 2, y - size + 4, size * 2 - 4, size * 2 - 3);
    ctx.fillStyle = enemy.type === 'brute' ? '#424b35' : '#343d2c';
    ctx.fillRect(x - size + 1, y - size, size * 2 - 2, Math.max(5, size - 2));
    ctx.fillStyle = '#b1b466';
    ctx.fillRect(x - 4, y - size + 2, 2, 2);
    ctx.fillRect(x + 2, y - size + 2, 2, 2);
    ctx.fillStyle = '#54252a';
    ctx.fillRect(x - 2, y + 1, 5, 2);
    if (enemy.type === 'fast') {
      ctx.fillStyle = '#a49355';
      ctx.fillRect(x - size - 2, y, 3, 2);
      ctx.fillRect(x + size - 1, y - 3, 3, 2);
    }
    if (enemy.type === 'brute') {
      ctx.fillStyle = '#1d241c';
      ctx.fillRect(x - size - 3, y - 1, 5, size);
      ctx.fillRect(x + size - 2, y - 1, 5, size);
      ctx.fillStyle = '#371a1c';
      ctx.fillRect(x - size, y - size - 5, size * 2, 2);
      ctx.fillStyle = '#a64243';
      ctx.fillRect(x - size, y - size - 5, Math.round(size * 2 * enemy.health / enemy.maxHealth), 2);
    }
  }

  function drawDrop(drop) {
    const x = Math.round(drop.x);
    const y = Math.round(drop.y);
    const pulse = reducedMotion ? 0 : Math.floor(game.elapsed * 6) % 2;
    ctx.fillStyle = drop.type === 'ammo' ? '#d39a31' : '#58bd82';
    ctx.fillRect(x - 6 - pulse, y - 6 - pulse, 12 + pulse * 2, 12 + pulse * 2);
    ctx.fillStyle = '#101510';
    if (drop.type === 'ammo') {
      ctx.fillRect(x - 3, y - 4, 2, 8);
      ctx.fillRect(x + 1, y - 4, 2, 8);
    } else {
      ctx.fillRect(x - 1, y - 4, 3, 9);
      ctx.fillRect(x - 4, y - 1, 9, 3);
    }
  }

  function drawBanner() {
    if (game.bannerTime <= 0 || !game.bannerKey) return;
    ctx.fillStyle = 'rgba(3,5,4,.78)';
    ctx.fillRect(0, 205, WIDTH, 48);
    ctx.fillStyle = game.bannerKey === 'simulation.canvas.cleared' ? '#58bd82' : '#d39a31';
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'center';
    const message = game.bannerKey === 'simulation.canvas.wave'
      ? tr(game.bannerKey, { wave: game.wave + 1 })
      : tr(game.bannerKey);
    ctx.fillText(message, WIDTH / 2, 234);
    ctx.textAlign = 'left';
  }

  function drawAnalogInterference() {
    if (!isAnalog()) return;
    ctx.save();
    ctx.globalAlpha = reducedMotion ? 0.055 : random(0.035, 0.09);
    ctx.fillStyle = '#ddd8bd';
    const lines = reducedMotion ? 2 : 5;
    for (let index = 0; index < lines; index += 1) {
      const y = reducedMotion ? 90 + index * 170 : Math.floor(Math.random() * HEIGHT);
      ctx.fillRect(0, y, WIDTH, 1);
    }
    if (!reducedMotion && Math.random() < 0.025) {
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = '#8c1725';
      ctx.fillRect(0, Math.floor(Math.random() * HEIGHT), WIDTH, random(2, 7));
      ctx.globalAlpha = 0.48;
      ctx.fillStyle = '#c0bbb0';
      ctx.font = '7px monospace';
      ctx.fillText(tr('simulation.canvas.analog'), 8, 14);
    }
    ctx.restore();
  }

  function draw() {
    if (!ctx || !game.player) return;
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    if (game.shake > 0 && !reducedMotion) ctx.translate(Math.round(random(-2, 2)), Math.round(random(-2, 2)));
    drawArena();
    game.drops.forEach(drawDrop);
    game.bullets.forEach(function (bullet) {
      ctx.fillStyle = bullet.color;
      ctx.fillRect(Math.round(bullet.x - bullet.radius), Math.round(bullet.y - bullet.radius * 2), bullet.radius * 2, bullet.radius * 4);
    });
    game.enemies.forEach(drawEnemy);
    game.particles.forEach(function (particle) {
      ctx.globalAlpha = clamp(particle.life / particle.maxLife, 0, 1);
      ctx.fillStyle = particle.color;
      ctx.fillRect(Math.round(particle.x), Math.round(particle.y), 2, 2);
    });
    ctx.globalAlpha = 1;
    drawPlayer(game.player);
    drawBanner();
    drawAnalogInterference();
    if (game.flash > 0 && !reducedMotion) {
      ctx.fillStyle = 'rgba(170,16,31,' + Math.min(0.34, game.flash * 1.7) + ')';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }
    ctx.restore();
  }

  function loop(timestamp) {
    if (game.phase === 'select') return;
    const dt = Math.min(0.034, Math.max(0, (timestamp - game.lastTime) / 1000 || 0));
    game.lastTime = timestamp;
    if (game.phase === 'running') update(dt);
    draw();
    if (game.phase !== 'result' && game.phase !== 'select') game.raf = requestAnimationFrame(loop);
  }

  function keyAction(code) {
    const map = {
      ArrowUp: 'up', KeyW: 'up',
      ArrowDown: 'down', KeyS: 'down',
      ArrowLeft: 'left', KeyA: 'left',
      ArrowRight: 'right', KeyD: 'right',
      Space: 'shoot'
    };
    return map[code] || null;
  }

  function onKeyDown(event) {
    if (dom.gameScreen.hidden) return;
    const interactive = event.target && event.target.closest && event.target.closest('button, a, input, select, textarea');
    if (interactive && event.code !== 'Escape' && event.code !== 'KeyP') return;
    const action = keyAction(event.code);
    if (action) {
      event.preventDefault();
      input[action] = true;
      if (action === 'shoot') {
        audio.ensure();
        fire();
      }
      return;
    }
    if (event.repeat) return;
    if (event.code === 'KeyR') {
      event.preventDefault();
      audio.ensure();
      beginReload();
    } else if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      event.preventDefault();
      audio.ensure();
      activateAbility();
    } else if (event.code === 'Escape' || event.code === 'KeyP') {
      event.preventDefault();
      togglePause();
    }
  }

  function onKeyUp(event) {
    const action = keyAction(event.code);
    if (action) input[action] = false;
  }

  function bindTouchControl(button) {
    const action = button.dataset.input;
    const press = function (event) {
      event.preventDefault();
      audio.ensure();
      button.classList.add('is-held');
      if (action === 'reload') beginReload();
      else if (action === 'ability') activateAbility();
      else {
        input[action] = true;
        if (action === 'shoot') fire();
      }
      try { button.setPointerCapture(event.pointerId); } catch (error) {}
    };
    const release = function (event) {
      if (event) event.preventDefault();
      button.classList.remove('is-held');
      if (Object.prototype.hasOwnProperty.call(input, action)) input[action] = false;
    };
    button.addEventListener('pointerdown', press);
    button.addEventListener('pointerup', release);
    button.addEventListener('pointercancel', release);
    button.addEventListener('lostpointercapture', release);
  }

  function bindEvents() {
    dom.cards.forEach(function (card) {
      card.addEventListener('click', function () {
        audio.ensure();
        selectCharacter(card.dataset.character, true);
        audio.tone(240, 0.06, 'square', 0.025, 320);
      });
      card.addEventListener('keydown', function (event) {
        if (event.code !== 'ArrowLeft' && event.code !== 'ArrowRight') return;
        event.preventDefault();
        const index = dom.cards.indexOf(card);
        const step = event.code === 'ArrowRight' ? 1 : -1;
        const next = dom.cards[(index + step + dom.cards.length) % dom.cards.length];
        selectCharacter(next.dataset.character, true);
        next.focus();
      });
    });

    dom.start.addEventListener('click', startGame);
    dom.pauseButton.addEventListener('click', function () { togglePause(); });
    dom.touchPause.addEventListener('click', function () { togglePause(); });
    dom.sound.addEventListener('click', function () {
      audio.ensure();
      audio.setMuted(!settings.muted);
      if (!settings.muted) audio.tone(330, 0.12, 'square', 0.035, 520);
      announce(settings.muted ? 'simulation.status.audioOff' : 'simulation.status.audioOn');
    });

    document.querySelectorAll('[data-overlay-action]').forEach(function (button) {
      button.addEventListener('click', function () {
        const action = button.dataset.overlayAction;
        audio.ensure();
        if (action === 'resume') togglePause(false);
        else if (action === 'restart') startGame();
        else if (action === 'select') returnToSelection();
      });
    });

    document.querySelectorAll('[data-input]').forEach(bindTouchControl);
    window.addEventListener('keydown', onKeyDown, { passive: false });
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', function () {
      Object.keys(input).forEach(function (key) { input[key] = false; });
      if (game.phase === 'running' || game.phase === 'countdown') togglePause(true);
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden && (game.phase === 'running' || game.phase === 'countdown')) togglePause(true);
    });
    document.addEventListener('dd:locale-change', function () {
      selectCharacter(selectedCharacter, false);
      updateSoundButton();
      updateHud();
    });
  }

  function init() {
    cacheDom();
    ctx = dom.canvas && dom.canvas.getContext ? dom.canvas.getContext('2d') : null;
    if (!ctx) {
      dom.start.disabled = true;
      announce('simulation.game.canvasFallback');
      return;
    }
    ctx.imageSmoothingEnabled = false;
    records = {
      mick: Math.max(0, Number(records.mick) || 0),
      mei: Math.max(0, Number(records.mei) || 0),
      hanson: Math.max(0, Number(records.hanson) || 0)
    };
    settings.muted = Boolean(settings.muted);
    selectCharacter(selectedCharacter, false);
    updateSoundButton();
    bindEvents();

    game.player = createPlayer(selectedCharacter);
    draw();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
