(() => {
  'use strict';

  const lock = document.getElementById('dominium-access-lock');
  const app = document.getElementById('dominium-app');
  const opening = document.getElementById('dominium-opening');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  const openingText = (element, key) => {
    if (!element) return;
    element.dataset.i18n = key;
    const locale = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'pt-BR';
    const value = window.DD_I18N_DICTIONARIES?.[locale]?.[key];
    if (value) element.textContent = value;
  };

  const openingVideo = document.getElementById('opening-video');
  const silenceOpeningVideo = () => {
    if (!openingVideo) return;
    openingVideo.defaultMuted = true;
    openingVideo.muted = true;
    openingVideo.volume = 0;
    openingVideo.setAttribute('muted', '');
  };
  silenceOpeningVideo();
  const soundtrackFrame = document.getElementById('dominium-soundtrack-player');
  const openingTimers = new Set();
  let openingCleanup = () => {};
  let soundtrackWidget = null;
  let soundtrackReady = false;
  let soundtrackStarted = false;
  let soundtrackVolume = 0;
  let soundtrackFadeTimer = 0;
  let soundtrackFallbackTimer = 0;
  let soundtrackEndTimer = 0;
  let onSoundtrackReady = null;
  let soundtrackFadeStartMs = 0;
  let soundtrackOutroStarted = false;
  let soundtrackRequestExpired = false;
  const soundtrackFadeDurationMs = 1800;
  const clearOpeningTimers = () => {
    openingTimers.forEach(timer => window.clearTimeout(timer));
    openingTimers.clear();
  };
  const stopOpeningVideo = () => {
    if (!openingVideo) return;
    openingVideo.classList.remove('is-visible');
    openingVideo.hidden = true;
    openingVideo.onended = null;
    openingVideo.onerror = null;
    openingVideo.ontimeupdate = null;
    openingVideo.pause();
    openingVideo.removeAttribute('src');
    openingVideo.load();
  };

  const fadeSoundtrackTo = (target, duration, onComplete) => {
    window.clearInterval(soundtrackFadeTimer);
    if (!soundtrackWidget || !soundtrackReady) {
      if (onComplete) window.setTimeout(onComplete, duration);
      return;
    }
    const from = soundtrackVolume;
    const steps = Math.max(1, Math.ceil(duration / 100));
    let step = 0;
    soundtrackFadeTimer = window.setInterval(() => {
      step += 1;
      soundtrackVolume = Math.round(from + ((target - from) * step / steps));
      try { soundtrackWidget.setVolume(soundtrackVolume); } catch (error) {}
      if (step >= steps) {
        window.clearInterval(soundtrackFadeTimer);
        soundtrackFadeTimer = 0;
        onComplete?.();
      }
    }, 100);
  };

  const releaseSoundtrack = () => {
    window.clearTimeout(soundtrackEndTimer);
    try { soundtrackWidget?.pause(); } catch (error) {}
    if (soundtrackFrame) soundtrackFrame.src = 'about:blank';
    soundtrackStarted = false;
    soundtrackReady = false;
  };

  const stopSoundtrack = (duration = 650) => {
    soundtrackOutroStarted = true;
    soundtrackRequestExpired = true;
    onSoundtrackReady = null;
    window.clearTimeout(soundtrackFallbackTimer);
    window.clearTimeout(soundtrackEndTimer);
    fadeSoundtrackTo(0, duration, releaseSoundtrack);
  };

  const fadeSoundtrackForEnding = () => {
    if (!soundtrackStarted || soundtrackOutroStarted) return;
    soundtrackOutroStarted = true;
    window.clearTimeout(soundtrackEndTimer);
    fadeSoundtrackTo(0, soundtrackFadeDurationMs, releaseSoundtrack);
  };

  const bindSoundtrackWidget = () => {
    if (!soundtrackFrame || !window.SC?.Widget || soundtrackWidget) return;
    try {
      soundtrackWidget = window.SC.Widget(soundtrackFrame);
      soundtrackWidget.bind(window.SC.Widget.Events.READY, () => {
        if (soundtrackRequestExpired) {
          try { soundtrackWidget.pause(); } catch (error) {}
          return;
        }
        soundtrackReady = true;
        soundtrackVolume = 0;
        try { soundtrackWidget.setVolume(0); } catch (error) {}
        try { soundtrackWidget.seekTo(0); } catch (error) {}
        try { soundtrackWidget.play(); } catch (error) {}
        fadeSoundtrackTo(48, 1800);
        window.clearTimeout(soundtrackEndTimer);
        soundtrackEndTimer = window.setTimeout(fadeSoundtrackForEnding, soundtrackFadeStartMs);
        if (onSoundtrackReady) {
          window.clearTimeout(soundtrackFallbackTimer);
          const callback = onSoundtrackReady;
          onSoundtrackReady = null;
          callback();
        }
      });
      soundtrackWidget.bind(window.SC.Widget.Events.PLAY_PROGRESS, progress => {
        const position = Number(progress?.currentPosition);
        if (Number.isFinite(position) && position >= soundtrackFadeStartMs) fadeSoundtrackForEnding();
      });
      soundtrackWidget.bind(window.SC.Widget.Events.FINISH, () => {
        soundtrackStarted = false;
      });
    } catch (error) {
      soundtrackWidget = null;
    }
  };

  const startSoundtrack = onReady => {
    if (!soundtrackFrame || soundtrackStarted) { onReady?.(); return; }
    soundtrackStarted = true;
    soundtrackOutroStarted = false;
    soundtrackRequestExpired = false;
    onSoundtrackReady = onReady || null;
    soundtrackFallbackTimer = window.setTimeout(() => {
      if (!onSoundtrackReady) return;
      soundtrackRequestExpired = true;
      soundtrackReady = false;
      soundtrackStarted = false;
      try { soundtrackWidget?.pause(); } catch (error) {}
      if (soundtrackFrame) soundtrackFrame.src = 'about:blank';
      const callback = onSoundtrackReady;
      onSoundtrackReady = null;
      callback();
    }, 7000);
    soundtrackFrame.src = soundtrackFrame.dataset.soundtrackSrc;
    if (window.SC?.Widget) bindSoundtrackWidget();
    else document.getElementById('soundcloud-widget-api')?.addEventListener('load', bindSoundtrackWidget, { once: true });
  };

  const dismissOpening = () => {
    if (!opening || opening.classList.contains('dismissed')) return;
    openingCleanup();
    opening.classList.add('dismissed');
    document.body.classList.remove('dominium-opening-active');
    try { sessionStorage.setItem('dd_dominium_opening_seen_v1', 'yes'); } catch (error) {}
    window.setTimeout(() => opening.remove(), reduceMotion ? 0 : 760);
    document.querySelector('.dominium-topbar')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    document.querySelector('.dominium-brand')?.focus({ preventScroll: true });
  };

  if (opening) {
    let alreadySeen = false;
    try { alreadySeen = sessionStorage.getItem('dd_dominium_opening_seen_v1') === 'yes'; } catch (error) {}
    if (alreadySeen) opening.remove();
    else {
      const stage = document.getElementById('opening-stage');
      const stillLayers = [
        document.getElementById('opening-still'),
        document.getElementById('opening-still-next')
      ].filter(Boolean);
      let activeStill = stillLayers[0] || null;
      let standbyStill = stillLayers[1] || stillLayers[0] || null;
      const gate = document.getElementById('opening-gate');
      const copy = document.getElementById('opening-copy');
      const finalCard = document.getElementById('opening-final');
      const kicker = document.getElementById('opening-kicker');
      const line = document.getElementById('opening-line');
      const lineEm = document.getElementById('opening-line-em');
      const caption = document.getElementById('opening-caption');
      const live = document.getElementById('opening-live');
      const startButton = document.getElementById('opening-start');
      const enterButton = document.getElementById('opening-enter');
      const skipButton = document.getElementById('opening-skip');
      const progressCount = document.getElementById('opening-progress-count');
      const progressBar = document.getElementById('opening-progress-bar');
      // A trilha tem 1:38; a montagem termina em 1:30 para excluir somente os 8s finais.
      // Coloque os clipes futuros em video/dominium-intro/ com estes nomes: cada still fica como fallback automático.
      const scenes = [
        {
          type: 'image', src: 'img-dominus/intro/video-keyframes/intro-video-frame-01-leviathan-approach.png',
          futureVideo: 'video/dominium-intro/intro-01-leviathan-establishing.mp4', duration: 5800,
          frames: [
            { at: 0, kicker: 'dominium.opening.scene.1a.kicker', line: 'dominium.opening.scene.1a.line', emphasis: 'dominium.opening.scene.1a.emphasis', caption: 'dominium.opening.scene.1a.caption' },
            { at: 3400, kicker: 'dominium.opening.scene.1b.kicker', line: 'dominium.opening.scene.1b.line', emphasis: 'dominium.opening.scene.1b.emphasis', caption: 'dominium.opening.scene.1b.caption' }
          ]
        },
        {
          type: 'video', src: 'video/dominium-intro/intro-equipe-chegada.mp4', fallback: 'img-dominus/intro/stills/intro-still-12-leviathan-arrival.png', duration: 9030,
          frames: [
            { at: 0, kicker: 'dominium.opening.scene.arrival.kicker', line: 'dominium.opening.scene.arrival.line', emphasis: 'dominium.opening.scene.arrival.emphasis', caption: 'dominium.opening.scene.arrival.caption' },
            { at: 0.54, kicker: 'dominium.opening.scene.arrival.next.kicker', line: 'dominium.opening.scene.arrival.next.line', emphasis: 'dominium.opening.scene.arrival.next.emphasis', caption: 'dominium.opening.scene.arrival.next.caption' }
          ]
        },
        {
          type: 'image', src: 'img-dominus/intro/stills/intro-still-14-heller-perimeter-watch.png',
          futureVideo: 'video/dominium-intro/intro-03-security-perimeter.mp4', duration: 5800,
          frames: [{ at: 0, kicker: 'dominium.opening.scene.security.kicker', line: 'dominium.opening.scene.security.line', emphasis: 'dominium.opening.scene.security.emphasis', caption: 'dominium.opening.scene.security.caption' }]
        },
        {
          type: 'image', src: 'img-dominus/intro/stills/intro-still-13-leviathan-entry.png',
          futureVideo: 'video/dominium-intro/intro-entrada-equipe-leviathan.mp4', duration: 5800,
          frames: [{ at: 0, kicker: 'dominium.opening.scene.entry.kicker', line: 'dominium.opening.scene.entry.line', emphasis: 'dominium.opening.scene.entry.emphasis', caption: 'dominium.opening.scene.entry.caption' }]
        },
        {
          type: 'image', src: 'img-dominus/intro/stills/intro-still-15-security-inside-leviathan.png',
          futureVideo: 'video/dominium-intro/intro-05-security-inside-leviathan.mp4', duration: 5800,
          frames: [{ at: 0, kicker: 'dominium.opening.scene.inside.kicker', line: 'dominium.opening.scene.inside.line', emphasis: 'dominium.opening.scene.inside.emphasis', caption: 'dominium.opening.scene.inside.caption' }]
        },
        {
          type: 'image', src: 'img-dominus/intro/stills/intro-still-16-security-entering-elevator.png',
          futureVideo: 'video/dominium-intro/intro-06-elevator-descent.mp4', duration: 5800,
          frames: [{ at: 0, kicker: 'dominium.opening.scene.elevator.kicker', line: 'dominium.opening.scene.elevator.line', emphasis: 'dominium.opening.scene.elevator.emphasis', caption: 'dominium.opening.scene.elevator.caption' }]
        },
        {
          type: 'intertitle', duration: 4900,
          frames: [{ at: 0, kicker: 'dominium.opening.scene.welcome.kicker', line: 'dominium.opening.scene.welcome.line', emphasis: 'dominium.opening.scene.welcome.emphasis', caption: 'dominium.opening.scene.welcome.caption' }]
        },
        {
          type: 'video', src: 'video/dominium-intro/intro-interior.mp4', fallback: 'img-dominus/intro/video-keyframes/intro-video-frame-02-hades-corridor.png', duration: 9030,
          frames: [
            { at: 0, kicker: 'dominium.opening.scene.3a.kicker', line: 'dominium.opening.scene.3a.line', emphasis: 'dominium.opening.scene.3a.emphasis', caption: 'dominium.opening.scene.3a.caption' },
            { at: 0.55, kicker: 'dominium.opening.scene.3b.kicker', line: 'dominium.opening.scene.3b.line', emphasis: 'dominium.opening.scene.3b.emphasis', caption: 'dominium.opening.scene.3b.caption' }
          ]
        },
        {
          type: 'image', src: 'img-dominus/intro/stills/intro-still-04-research-team.png',
          futureVideo: 'video/dominium-intro/intro-09-research-team.mp4', duration: 5800,
          frames: [{ at: 0, kicker: 'dominium.opening.scene.team.kicker', line: 'dominium.opening.scene.team.line', emphasis: 'dominium.opening.scene.team.emphasis', caption: 'dominium.opening.scene.team.caption' }]
        },
        {
          type: 'image', src: 'img-dominus/intro/stills/intro-still-05-grey-daniel-lab.png',
          futureVideo: 'video/dominium-intro/intro-10-grey-daniel-lab.mp4', duration: 5800,
          frames: [{ at: 0, kicker: 'dominium.opening.scene.laboratory.kicker', line: 'dominium.opening.scene.laboratory.line', emphasis: 'dominium.opening.scene.laboratory.emphasis', caption: 'dominium.opening.scene.laboratory.caption' }]
        },
        {
          type: 'image', src: 'img-dominus/intro/stills/intro-still-07-grey-frost-research.png',
          futureVideo: 'video/dominium-intro/intro-11-grey-frost-research.mp4', duration: 5800,
          frames: [{ at: 0, kicker: 'dominium.opening.scene.research.kicker', line: 'dominium.opening.scene.research.line', emphasis: 'dominium.opening.scene.research.emphasis', caption: 'dominium.opening.scene.research.caption' }]
        },
        {
          type: 'image', src: 'img-dominus/intro/stills/intro-still-03-containment-vessel.png',
          futureVideo: 'video/dominium-intro/intro-12-pathogen-vessel.mp4', duration: 5800,
          frames: [
            { at: 0, kicker: 'dominium.opening.scene.5a.kicker', line: 'dominium.opening.scene.5a.line', emphasis: 'dominium.opening.scene.5a.emphasis', caption: 'dominium.opening.scene.5a.caption' },
            { at: 3400, kicker: 'dominium.opening.scene.5b.kicker', line: 'dominium.opening.scene.5b.line', emphasis: 'dominium.opening.scene.5b.emphasis', caption: 'dominium.opening.scene.5b.caption' }
          ]
        },
        {
          type: 'video', src: 'video/dominium-intro/intro-malverik.mp4', fallback: 'img-dominus/intro/stills/intro-still-10-maverick-laboratory.png', duration: 9030,
          frames: [
            { at: 0, kicker: 'dominium.opening.scene.4a.kicker', line: 'dominium.opening.scene.4a.line', emphasis: 'dominium.opening.scene.4a.emphasis', caption: 'dominium.opening.scene.4a.caption' },
            { at: 0.58, kicker: 'dominium.opening.scene.4b.kicker', line: 'dominium.opening.scene.4b.line', emphasis: 'dominium.opening.scene.4b.emphasis', caption: 'dominium.opening.scene.4b.caption' }
          ]
        },
        {
          type: 'image', src: 'img-dominus/intro/stills/intro-still-11-maverick-journal.png',
          futureVideo: 'video/dominium-intro/intro-14-maverick-journal.mp4', duration: 5800,
          frames: [
            { at: 0, kicker: 'dominium.opening.scene.journal.kicker', line: 'dominium.opening.scene.journal.line', emphasis: 'dominium.opening.scene.journal.emphasis', caption: 'dominium.opening.scene.journal.caption' }
          ]
        }
      ];
      soundtrackFadeStartMs = Math.max(0, scenes.reduce((total, scene) => total + scene.duration, 0) - soundtrackFadeDurationMs);
      const futureVideoAvailability = new Map();
      const futureVideoChecks = Promise.all(scenes.filter(scene => scene.futureVideo).map(async scene => {
        let available = false;
        try {
          const response = await fetch(scene.futureVideo, { method: 'HEAD', cache: 'no-store' });
          const contentType = response.headers.get('content-type')?.toLowerCase() || '';
          available = response.ok && !contentType.includes('text/html');
        } catch (error) {}
        futureVideoAvailability.set(scene.futureVideo, available);
      }));
      let started = false;
      let currentScene = -1;
      let playbackToken = 0;
      let finalRevealTimer = 0;
      let shownFrame = -1;
      let currentSceneStartedAt = 0;
      const imagePreloads = new Map();
      const layerTransitionMs = reduceMotion ? 0 : 760;

      const preloadImage = source => {
        if (!source) return Promise.resolve(null);
        if (imagePreloads.has(source)) return imagePreloads.get(source);
        const promise = new Promise(resolve => {
          const image = new Image();
          let settled = false;
          const finish = loaded => {
            if (settled) return;
            settled = true;
            resolve(loaded ? image : null);
          };
          image.onload = () => {
            if (typeof image.decode === 'function') image.decode().then(() => finish(true), () => finish(true));
            else finish(true);
          };
          image.onerror = () => finish(false);
          image.src = source;
          if (image.complete) finish(image.naturalWidth > 0);
        });
        imagePreloads.set(source, promise);
        return promise;
      };

      const preloadNearbyImages = index => {
        scenes.slice(index, index + 3).forEach(scene => {
          if (scene.type === 'image') void preloadImage(scene.src);
          if (scene.fallback) void preloadImage(scene.fallback);
        });
      };

      const crossfadeToStill = (source, token, fadeVideo = false) => preloadImage(source).then(image => {
        if (!image || token !== playbackToken || !activeStill || !standbyStill) return false;
        const outgoing = activeStill;
        const incoming = standbyStill;
        incoming.src = image.src;
        incoming.hidden = false;
        incoming.classList.remove('is-visible');
        if (fadeVideo && openingVideo) openingVideo.classList.remove('is-visible');
        window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
          if (token !== playbackToken) return;
          incoming.classList.add('is-visible');
          if (outgoing !== incoming) outgoing.classList.remove('is-visible');
        }));
        activeStill = incoming;
        standbyStill = outgoing;
        window.setTimeout(() => {
          if (token !== playbackToken) return;
          if (outgoing !== incoming) outgoing.hidden = true;
          if (fadeVideo && openingVideo && !openingVideo.classList.contains('is-visible')) {
            openingVideo.pause();
            openingVideo.hidden = true;
            openingVideo.removeAttribute('src');
            openingVideo.load();
            silenceOpeningVideo();
          }
        }, layerTransitionMs + 50);
        return true;
      });

      const progressLabel = key => {
        const locale = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'pt-BR';
        return window.DD_I18N_DICTIONARIES?.[locale]?.[key] || (locale === 'en' ? 'SCENE' : 'CENA');
      };

      const scheduleAdvance = (index, token, duration) => {
        const timer = window.setTimeout(() => { if (token === playbackToken) nextScene(index + 1); }, duration);
        openingTimers.add(timer);
      };

      const showImageScene = (scene, index, token, duration = scene.duration) => {
        clearOpeningTimers();
        void crossfadeToStill(scene.src, token, true);
        if (stage) {
          stage.classList.remove('is-video', 'is-intertitle');
          stage.classList.add('is-final-image');
          window.setTimeout(() => stage.classList.remove('is-cutting'), reduceMotion ? 0 : 420);
        }
        scene.frames.slice(1).forEach(frame => {
          const timer = window.setTimeout(() => {
            if (token === playbackToken) { revealCopy(frame); shownFrame += 1; }
          }, Math.min(frame.at, duration));
          openingTimers.add(timer);
        });
        scheduleAdvance(index, token, duration);
      };

      const showVideoScene = (scene, index, token, src) => {
        const fallback = () => {
          if (token !== playbackToken) return;
          const fallbackSource = scene.fallback || (scene.type === 'image' ? scene.src : null);
          if (fallbackSource) {
            const elapsed = Date.now() - currentSceneStartedAt;
            const remaining = Math.max(0, scene.duration - elapsed);
            const fallbackFrames = scene.frames.map(frame => {
              const offset = scene.type === 'image' ? frame.at : frame.at * scene.duration;
              return { ...frame, at: Math.max(0, offset - elapsed) };
            });
            showImageScene({ ...scene, type: 'image', src: fallbackSource, futureVideo: null, frames: fallbackFrames }, index, token, remaining);
          }
          else nextScene(index + 1);
        };
        const remaining = Math.max(0, scene.duration - (Date.now() - currentSceneStartedAt));
        if (!openingVideo) { fallback(); return; }
        const fallbackSource = scene.fallback || (scene.type === 'image' ? scene.src : null);
        if (fallbackSource) void crossfadeToStill(fallbackSource, token, false);
        if (stage) {
          stage.classList.remove('is-final-image', 'is-intertitle');
          stage.classList.add('is-video');
        }
        silenceOpeningVideo();
        openingVideo.classList.remove('is-visible');
        openingVideo.hidden = false;
        openingVideo.preload = 'auto';
        openingVideo.playsInline = true;
        openingVideo.src = src;
        openingVideo.load();
        silenceOpeningVideo();
        openingVideo.onerror = fallback;
        openingVideo.onplaying = () => {
          if (token !== playbackToken) return;
          openingVideo.classList.add('is-visible');
          stillLayers.forEach(layer => layer.classList.remove('is-visible'));
          window.setTimeout(() => {
            if (token !== playbackToken || !openingVideo.classList.contains('is-visible')) return;
            stillLayers.forEach(layer => { layer.hidden = true; });
          }, layerTransitionMs + 50);
        };
        openingVideo.onended = () => {
          if (token === playbackToken) openingVideo.pause();
        };
        openingVideo.ontimeupdate = () => {
          if (token !== playbackToken || !Number.isFinite(openingVideo.duration) || openingVideo.duration <= 0) return;
          const ratio = openingVideo.currentTime / openingVideo.duration;
          const phase = scene.frames.reduce((selected, frame, frameIndex) => {
            const threshold = scene.type === 'image' ? frame.at / scene.duration : frame.at;
            return ratio >= threshold ? frameIndex : selected;
          }, 0);
          if (phase !== shownFrame) { shownFrame = phase; revealCopy(scene.frames[phase]); }
          if (progressBar) progressBar.style.width = `${((index + ratio) / scenes.length) * 100}%`;
        };
        const playback = openingVideo.play();
        if (playback?.catch) playback.catch(() => { if (token === playbackToken) fallback(); });
        scheduleAdvance(index, token, remaining);
      };

      const revealCopy = frame => {
        if (!copy || !frame) return;
        copy.classList.remove('is-visible');
        openingText(kicker, frame.kicker);
        openingText(line, frame.line);
        openingText(lineEm, frame.emphasis);
        openingText(caption, frame.caption);
        window.requestAnimationFrame(() => window.requestAnimationFrame(() => copy.classList.add('is-visible')));
      };

      const showFinal = (stopMusic = false) => {
        if (!opening || opening.classList.contains('is-final') || opening.classList.contains('dismissed')) return;
        playbackToken += 1;
        clearOpeningTimers();
        window.clearTimeout(finalRevealTimer);
        if (stopMusic) stopSoundtrack();
        if (stage) {
          stage.classList.remove('is-intertitle', 'is-video', 'is-cutting', 'is-portrait');
          stage.classList.add('is-final-image');
        }
        void crossfadeToStill('img-dominus/intro/stills/intro-still-11-maverick-journal.png', playbackToken, true);
        if (gate) gate.hidden = true;
        if (copy) copy.hidden = true;
        if (finalCard) finalCard.hidden = false;
        if (skipButton) skipButton.hidden = true;
        if (progressCount) progressCount.textContent = `${progressLabel('dominium.opening.progress.final')} // ${String(scenes.length).padStart(2, '0')}`;
        if (progressBar) progressBar.style.width = '100%';
        opening.classList.remove('is-gate', 'is-cinematic', 'is-intertitle');
        opening.classList.add('is-final');
        openingText(live, 'dominium.opening.final.status');
        if (enterButton) enterButton.hidden = true;
        finalRevealTimer = window.setTimeout(() => {
          if (!opening.classList.contains('is-final') || !enterButton) return;
          enterButton.hidden = false;
          enterButton.focus({ preventScroll: true });
        }, reduceMotion ? 0 : 1700);
      };

      const nextScene = index => {
        if (index >= scenes.length) {
          showFinal();
          return;
        }
        clearOpeningTimers();
        const token = ++playbackToken;
        const scene = scenes[index];
        preloadNearbyImages(index);
        currentScene = index;
        currentSceneStartedAt = Date.now();
        shownFrame = -1;
        opening.classList.remove('is-gate', 'is-final', 'is-intertitle');
        opening.classList.add('is-cinematic');
        opening.classList.toggle('is-intertitle', scene.type === 'intertitle');
        if (gate) gate.hidden = true;
        if (finalCard) finalCard.hidden = true;
        if (copy) copy.hidden = false;
        if (skipButton) skipButton.hidden = false;
        if (progressCount) progressCount.textContent = `${progressLabel('dominium.opening.progress.record')} // ${String(index + 1).padStart(2, '0')} / ${String(scenes.length).padStart(2, '0')}`;
        if (progressBar) progressBar.style.width = `${((index + 1) / scenes.length) * 100}%`;
        if (stage) {
          stage.classList.remove('is-intertitle', 'is-final-image', 'is-portrait', 'is-video');
          stage.classList.add('is-cutting');
          if (scene.type === 'video' || (scene.futureVideo && futureVideoAvailability.get(scene.futureVideo) === true)) stage.classList.add('is-video');
          if (scene.type === 'intertitle') stage.classList.add('is-intertitle');
          window.setTimeout(() => { if (token === playbackToken) stage.classList.remove('is-cutting'); }, reduceMotion ? 0 : 420);
        }
        openingText(live, 'dominium.opening.playing');
        revealCopy(scene.frames[0]);
        shownFrame = 0;

        if (scene.type === 'intertitle') {
          // Preserve the previous frame behind the intertitle; never leave a multi-second black gap.
          if (stage) stage.classList.add('is-intertitle');
          const timer = window.setTimeout(() => { if (token === playbackToken) nextScene(index + 1); }, scene.duration);
          openingTimers.add(timer);
          return;
        }

        if (scene.type === 'image') {
          const hasFutureVideo = scene.futureVideo && futureVideoAvailability.get(scene.futureVideo) === true;
          if (hasFutureVideo) showVideoScene(scene, index, token, scene.futureVideo);
          else showImageScene(scene, index, token);
          return;
        }

        if (!openingVideo) {
          nextScene(index + 1);
          return;
        }
        showVideoScene(scene, index, token, scene.src);
      };

      openingCleanup = () => {
        playbackToken += 1;
        clearOpeningTimers();
        window.clearTimeout(finalRevealTimer);
        stopOpeningVideo();
        stopSoundtrack();
      };

      const startOpening = () => {
        if (started) return;
        started = true;
        opening.classList.remove('is-gate');
        document.body.classList.add('dominium-opening-active');
        startSoundtrack(() => {
          if (!opening.classList.contains('dismissed') && !opening.classList.contains('is-final') && currentScene < 0) nextScene(0);
        });
        void futureVideoChecks;
      };

      document.body.classList.add('dominium-opening-active');
      startButton?.addEventListener('click', startOpening);
      enterButton?.addEventListener('click', dismissOpening);
      skipButton?.addEventListener('click', () => showFinal(true));
      if (reduceMotion) showFinal(true);
      document.addEventListener('keydown', event => {
        if (opening.classList.contains('dismissed')) return;
        if (event.key === 'Escape' && opening.classList.contains('is-cinematic')) {
          event.preventDefault();
          showFinal(true);
          return;
        }
        if (event.key === 'Enter' && !event.target.closest('button,a,input,textarea,select,[contenteditable="true"]')) {
          event.preventDefault();
          if (opening.classList.contains('is-final')) dismissOpening();
          else if (!started) startOpening();
        }
      });
    }
  }

  document.querySelectorAll('[data-dominium-locale]').forEach(button => {
    button.addEventListener('click', () => window.DoomsdayI18n?.setLocale(button.dataset.dominiumLocale));
  });

  document.querySelectorAll('[data-panel-selector]').forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.panelSelector;
      document.querySelectorAll('[data-panel-selector]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      document.querySelectorAll('[data-panel]').forEach(panel => { panel.hidden = panel.dataset.panel !== target; });
    });
  });

  document.querySelectorAll('[data-timeline-step]').forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.timelineStep;
      document.querySelectorAll('[data-timeline-step]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      document.querySelectorAll('[data-timeline-panel]').forEach(panel => { panel.hidden = panel.dataset.timelinePanel !== target; });
    });
  });
})();
