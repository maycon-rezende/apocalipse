(() => {
  'use strict';

  const opening = document.getElementById('dominium-opening');
  if (!opening) return;

  let accessGranted = false;
  try {
    accessGranted = sessionStorage.getItem('dd_doom_site_access_v1') === 'granted';
  } catch (error) {
    accessGranted = false;
  }
  if (!accessGranted) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stage = document.getElementById('opening-stage');
  const stillLayers = [
    document.getElementById('opening-still'),
    document.getElementById('opening-still-next')
  ].filter(Boolean);
  const video = document.getElementById('opening-video');
  const gate = document.getElementById('opening-gate');
  const waiting = document.getElementById('opening-wait');
  const waitingCopy = document.getElementById('opening-wait-copy');
  const copy = document.getElementById('opening-copy');
  const finalCard = document.getElementById('opening-final');
  const kicker = document.getElementById('opening-kicker');
  const line = document.getElementById('opening-line');
  const lineEmphasis = document.getElementById('opening-line-em');
  const caption = document.getElementById('opening-caption');
  const live = document.getElementById('opening-live');
  const startButton = document.getElementById('opening-start');
  const enterButton = document.getElementById('opening-enter');
  const skipButton = document.getElementById('opening-skip');
  const progressCount = document.getElementById('opening-progress-count');
  const progressBar = document.getElementById('opening-progress-bar');
  const soundtrackFrame = document.getElementById('dominium-soundtrack-player');
  const soundcloudApi = document.getElementById('soundcloud-widget-api');

  if (!stage || !stillLayers.length) return;

  let alreadySeen = false;
  try {
    alreadySeen = sessionStorage.getItem('dd_dominium_opening_seen_v1') === 'yes';
  } catch (error) {
    alreadySeen = false;
  }
  if (alreadySeen) {
    opening.remove();
    return;
  }

  const SCENE_DURATION = Object.freeze({
    STILL: 5800,
    VIDEO: 9030,
    TITLE: 4900
  });
  const TRACK_CUTOFF_MS = 90000; // Trilha de 1:38; corta os 8 segundos finais.
  const TRACK_FADE_MS = 850;
  const TRANSITION_MS = reduceMotion ? 0 : 520;
  const scenes = [
    {
      type: 'video',
      src: 'video/dominium-intro/intro-entrada-leviathan.mp4',
      fallback: 'img-dominus/intro/video-keyframes/intro-video-frame-01-leviathan-approach.png',
      duration: SCENE_DURATION.STILL,
      frames: [
        { at: 0, kicker: 'dominium.opening.scene.1a.kicker', line: 'dominium.opening.scene.1a.line', emphasis: 'dominium.opening.scene.1a.emphasis', caption: 'dominium.opening.scene.1a.caption' },
        { at: 3400, kicker: 'dominium.opening.scene.1b.kicker', line: 'dominium.opening.scene.1b.line', emphasis: 'dominium.opening.scene.1b.emphasis', caption: 'dominium.opening.scene.1b.caption' }
      ]
    },
    {
      type: 'video',
      src: 'video/dominium-intro/intro-equipe-chegada.mp4',
      fallback: 'img-dominus/intro/stills/intro-still-12-leviathan-arrival.png',
      duration: SCENE_DURATION.VIDEO,
      frames: [
        { at: 0, kicker: 'dominium.opening.scene.arrival.kicker', line: 'dominium.opening.scene.arrival.line', emphasis: 'dominium.opening.scene.arrival.emphasis', caption: 'dominium.opening.scene.arrival.caption' },
        { at: 0.54, kicker: 'dominium.opening.scene.arrival.next.kicker', line: 'dominium.opening.scene.arrival.next.line', emphasis: 'dominium.opening.scene.arrival.next.emphasis', caption: 'dominium.opening.scene.arrival.next.caption' }
      ]
    },
    {
      type: 'image',
      src: 'img-dominus/intro/stills/intro-still-14-heller-perimeter-watch.png',
      duration: SCENE_DURATION.STILL,
      frames: [{ at: 0, kicker: 'dominium.opening.scene.security.kicker', line: 'dominium.opening.scene.security.line', emphasis: 'dominium.opening.scene.security.emphasis', caption: 'dominium.opening.scene.security.caption' }]
    },
    {
      type: 'video',
      src: 'video/dominium-intro/intro-entrada-equipe-leviathan.mp4',
      fallback: 'img-dominus/intro/stills/intro-still-13-leviathan-entry.png',
      duration: SCENE_DURATION.STILL,
      frames: [{ at: 0, kicker: 'dominium.opening.scene.entry.kicker', line: 'dominium.opening.scene.entry.line', emphasis: 'dominium.opening.scene.entry.emphasis', caption: 'dominium.opening.scene.entry.caption' }]
    },
    {
      type: 'image',
      src: 'img-dominus/intro/stills/intro-still-15-security-inside-leviathan.png',
      duration: SCENE_DURATION.STILL,
      frames: [{ at: 0, kicker: 'dominium.opening.scene.inside.kicker', line: 'dominium.opening.scene.inside.line', emphasis: 'dominium.opening.scene.inside.emphasis', caption: 'dominium.opening.scene.inside.caption' }]
    },
    {
      type: 'image',
      src: 'img-dominus/intro/stills/intro-still-16-security-entering-elevator.png',
      duration: SCENE_DURATION.STILL,
      frames: [{ at: 0, kicker: 'dominium.opening.scene.elevator.kicker', line: 'dominium.opening.scene.elevator.line', emphasis: 'dominium.opening.scene.elevator.emphasis', caption: 'dominium.opening.scene.elevator.caption' }]
    },
    {
      type: 'intertitle',
      duration: SCENE_DURATION.TITLE,
      frames: [{ at: 0, kicker: 'dominium.opening.scene.welcome.kicker', line: 'dominium.opening.scene.welcome.line', emphasis: 'dominium.opening.scene.welcome.emphasis', caption: 'dominium.opening.scene.welcome.caption' }]
    },
    {
      type: 'video',
      src: 'video/dominium-intro/intro-interior.mp4',
      fallback: 'img-dominus/intro/video-keyframes/intro-video-frame-02-hades-corridor.png',
      duration: SCENE_DURATION.VIDEO,
      frames: [
        { at: 0, kicker: 'dominium.opening.scene.3a.kicker', line: 'dominium.opening.scene.3a.line', emphasis: 'dominium.opening.scene.3a.emphasis', caption: 'dominium.opening.scene.3a.caption' },
        { at: 0.55, kicker: 'dominium.opening.scene.3b.kicker', line: 'dominium.opening.scene.3b.line', emphasis: 'dominium.opening.scene.3b.emphasis', caption: 'dominium.opening.scene.3b.caption' }
      ]
    },
    {
      type: 'image',
      src: 'img-dominus/intro/stills/intro-still-04-research-team.png',
      duration: SCENE_DURATION.STILL,
      frames: [{ at: 0, kicker: 'dominium.opening.scene.team.kicker', line: 'dominium.opening.scene.team.line', emphasis: 'dominium.opening.scene.team.emphasis', caption: 'dominium.opening.scene.team.caption' }]
    },
    {
      type: 'image',
      src: 'img-dominus/intro/stills/intro-still-05-grey-daniel-lab.png',
      duration: SCENE_DURATION.STILL,
      frames: [{ at: 0, kicker: 'dominium.opening.scene.laboratory.kicker', line: 'dominium.opening.scene.laboratory.line', emphasis: 'dominium.opening.scene.laboratory.emphasis', caption: 'dominium.opening.scene.laboratory.caption' }]
    },
    {
      type: 'image',
      src: 'img-dominus/intro/stills/intro-still-07-grey-frost-research.png',
      duration: SCENE_DURATION.STILL,
      frames: [{ at: 0, kicker: 'dominium.opening.scene.research.kicker', line: 'dominium.opening.scene.research.line', emphasis: 'dominium.opening.scene.research.emphasis', caption: 'dominium.opening.scene.research.caption' }]
    },
    {
      type: 'image',
      src: 'img-dominus/intro/stills/intro-still-03-containment-vessel.png',
      duration: SCENE_DURATION.STILL,
      frames: [
        { at: 0, kicker: 'dominium.opening.scene.5a.kicker', line: 'dominium.opening.scene.5a.line', emphasis: 'dominium.opening.scene.5a.emphasis', caption: 'dominium.opening.scene.5a.caption' },
        { at: 3400, kicker: 'dominium.opening.scene.5b.kicker', line: 'dominium.opening.scene.5b.line', emphasis: 'dominium.opening.scene.5b.emphasis', caption: 'dominium.opening.scene.5b.caption' }
      ]
    },
    {
      type: 'video',
      src: 'video/dominium-intro/intro-malverik.mp4',
      fallback: 'img-dominus/intro/stills/intro-still-10-maverick-laboratory.png',
      duration: SCENE_DURATION.VIDEO,
      frames: [
        { at: 0, kicker: 'dominium.opening.scene.4a.kicker', line: 'dominium.opening.scene.4a.line', emphasis: 'dominium.opening.scene.4a.emphasis', caption: 'dominium.opening.scene.4a.caption' },
        { at: 0.58, kicker: 'dominium.opening.scene.4b.kicker', line: 'dominium.opening.scene.4b.line', emphasis: 'dominium.opening.scene.4b.emphasis', caption: 'dominium.opening.scene.4b.caption' }
      ]
    },
    {
      type: 'image',
      src: 'img-dominus/intro/stills/intro-still-11-maverick-journal.png',
      duration: SCENE_DURATION.STILL,
      frames: [{ at: 0, kicker: 'dominium.opening.scene.journal.kicker', line: 'dominium.opening.scene.journal.line', emphasis: 'dominium.opening.scene.journal.emphasis', caption: 'dominium.opening.scene.journal.caption' }]
    }
  ];
  const totalDuration = scenes.reduce((total, scene) => total + scene.duration, 0);
  const timers = new Set();
  const imageCache = new Map();
  let activeStill = stillLayers[0];
  let standbyStill = stillLayers[1] || stillLayers[0];
  let soundtrackWidget = null;
  let soundtrackStarted = false;
  let soundtrackExpired = false;
  let soundtrackEnding = false;
  let soundtrackVolume = 0;
  let soundtrackFadeTimer = 0;
  let soundtrackStartFallback = 0;
  let soundtrackBound = false;
  let soundtrackUnavailable = false;
  let visualStarted = false;
  let userStarted = false;
  let playbackToken = 0;
  let finalShowing = false;
  let progressFrame = 0;
  let frameObserver = null;

  const translate = (element, key) => {
    if (!element || !key) return;
    element.dataset.i18n = key;
    const locale = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'pt-BR';
    const value = window.DD_I18N_DICTIONARIES?.[locale]?.[key];
    if (value) element.textContent = value;
  };

  const silenceVideo = media => {
    if (!(media instanceof HTMLVideoElement)) return;
    media.defaultMuted = true;
    media.muted = true;
    media.volume = 0;
    media.setAttribute('muted', '');
    media.setAttribute('playsinline', '');
  };

  const silenceAllVideos = root => {
    root.querySelectorAll?.('video').forEach(silenceVideo);
    if (root instanceof HTMLVideoElement) silenceVideo(root);
  };

  silenceAllVideos(document);
  document.addEventListener('play', event => silenceVideo(event.target), true);
  document.addEventListener('volumechange', event => {
    const media = event.target;
    if (media instanceof HTMLVideoElement && (!media.muted || media.volume !== 0)) silenceVideo(media);
  }, true);
  frameObserver = new MutationObserver(records => {
    records.forEach(record => record.addedNodes.forEach(node => {
      if (node instanceof Element) silenceAllVideos(node);
    }));
  });
  frameObserver.observe(document.documentElement, { childList: true, subtree: true });

  const schedule = (callback, delay, token = playbackToken) => {
    const timer = window.setTimeout(() => {
      timers.delete(timer);
      if (token === playbackToken) callback();
    }, Math.max(0, delay));
    timers.add(timer);
    return timer;
  };

  const clearTimers = () => {
    timers.forEach(timer => window.clearTimeout(timer));
    timers.clear();
    if (progressFrame) window.cancelAnimationFrame(progressFrame);
    progressFrame = 0;
  };

  const stopVideo = media => {
    if (!(media instanceof HTMLVideoElement)) return;
    silenceVideo(media);
    media.pause();
    media.onplaying = null;
    media.onended = null;
    media.onerror = null;
    media.ontimeupdate = null;
    media.classList.remove('is-visible');
    media.hidden = true;
    media.removeAttribute('src');
    media.load();
    silenceVideo(media);
  };

  const preloadImage = source => {
    if (!source) return Promise.resolve(null);
    if (imageCache.has(source)) return imageCache.get(source);
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
    imageCache.set(source, promise);
    return promise;
  };

  const preloadNearbyStills = index => {
    scenes.slice(index, index + 3).forEach(scene => {
      if (scene.type === 'image') void preloadImage(scene.src);
      if (scene.fallback) void preloadImage(scene.fallback);
    });
  };

  const setBackdrop = source => {
    if (!source) return;
    const absoluteSource = new URL(source, document.baseURI).href.replace(/["\\\n]/g, '\\$&');
    stage.style.setProperty('--opening-backdrop-image', `url("${absoluteSource}")`);
  };

  const crossfadeToStill = async (source, token) => {
    const loaded = await preloadImage(source);
    if (!loaded || token !== playbackToken) return false;

    const outgoing = activeStill;
    const incoming = standbyStill || outgoing;
    incoming.src = source;
    incoming.hidden = false;
    incoming.classList.remove('is-visible');
    setBackdrop(source);

    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      if (token !== playbackToken) return;
      incoming.classList.add('is-visible');
      if (outgoing && outgoing !== incoming) outgoing.classList.remove('is-visible');
      if (video) video.classList.remove('is-visible');
    }));

    activeStill = incoming;
    standbyStill = outgoing || incoming;
    await new Promise(resolve => window.setTimeout(resolve, TRANSITION_MS + 40));
    if (token !== playbackToken) return false;
    if (outgoing && outgoing !== incoming) outgoing.hidden = true;
    if (video) stopVideo(video);
    return true;
  };

  const progressLabel = key => {
    const locale = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'pt-BR';
    return window.DD_I18N_DICTIONARIES?.[locale]?.[key] || (locale === 'en' ? 'RECORD' : 'REGISTRO');
  };

  const revealCopy = frame => {
    if (!copy || !frame) return;
    copy.classList.remove('is-visible');
    translate(kicker, frame.kicker);
    translate(line, frame.line);
    translate(lineEmphasis, frame.emphasis);
    translate(caption, frame.caption);
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => copy.classList.add('is-visible')));
  };

  const showImageScene = (scene, token) => {
    stage.classList.add('is-final-image');
    stage.classList.remove('is-video');
    void crossfadeToStill(scene.src, token);
  };

  const showVideoScene = async (scene, token) => {
    const fallback = scene.fallback || activeStill?.src;
    if (!video || !fallback) {
      if (fallback) void crossfadeToStill(fallback, token);
      return;
    }

    const fallbackVisible = await crossfadeToStill(fallback, token);
    if (!fallbackVisible || token !== playbackToken) return;

    silenceVideo(video);
    video.hidden = false;
    video.preload = 'auto';
    video.playsInline = true;
    video.src = scene.src;
    video.load();
    silenceVideo(video);
    video.onerror = () => {
      if (token !== playbackToken) return;
      video.pause();
      video.hidden = true;
      video.classList.remove('is-visible');
      if (activeStill) {
        activeStill.hidden = false;
        activeStill.classList.add('is-visible');
      }
    };
    video.onplaying = () => {
      if (token !== playbackToken) return;
      silenceVideo(video);
      window.requestAnimationFrame(() => video.classList.add('is-visible'));
      schedule(() => {
        if (token === playbackToken) stillLayers.forEach(layer => {
          if (layer !== activeStill) layer.hidden = true;
          layer.classList.remove('is-visible');
        });
      }, TRANSITION_MS + 30, token);
    };
    video.onended = () => {
      if (token === playbackToken) video.pause();
    };

    try {
      const playback = video.play();
      if (playback?.catch) playback.catch(() => {
        if (token !== playbackToken) return;
        video.pause();
        video.hidden = true;
        video.classList.remove('is-visible');
        if (activeStill) {
          activeStill.hidden = false;
          activeStill.classList.add('is-visible');
        }
      });
    } catch (error) {
      video.hidden = true;
      video.classList.remove('is-visible');
      if (activeStill) {
        activeStill.hidden = false;
        activeStill.classList.add('is-visible');
      }
    }
  };

  const sceneElapsedBefore = index => scenes.slice(0, index).reduce((total, scene) => total + scene.duration, 0);

  const showFinal = (fromSkip = false) => {
    if (finalShowing || opening.classList.contains('dismissed')) return;
    finalShowing = true;
    playbackToken += 1;
    clearTimers();
    window.clearTimeout(soundtrackStartFallback);
    if (fromSkip) fadeSoundtrackTo(0, reduceMotion ? 0 : 350, releaseSoundtrack);
    else releaseSoundtrack();

    stage.classList.remove('is-cinematic', 'is-intertitle', 'is-video', 'is-connecting');
    stage.classList.add('is-final-image');
    void crossfadeToStill('img-dominus/intro/stills/intro-still-11-maverick-journal.png', playbackToken);

    if (gate) gate.hidden = true;
    if (waiting) waiting.hidden = true;
    if (copy) copy.hidden = true;
    if (finalCard) finalCard.hidden = false;
    if (skipButton) skipButton.hidden = true;
    if (progressCount) progressCount.textContent = `${progressLabel('dominium.opening.progress.final')} // ${String(scenes.length).padStart(2, '0')}`;
    if (progressBar) progressBar.style.width = '100%';
    opening.classList.remove('is-gate', 'is-cinematic', 'is-connecting', 'is-intertitle');
    opening.classList.add('is-final');
    translate(live, 'dominium.opening.final.status');
    if (enterButton) enterButton.hidden = false;
  };

  const nextScene = index => {
    if (index >= scenes.length) {
      showFinal(false);
      return;
    }

    clearTimers();
    const token = ++playbackToken;
    const scene = scenes[index];
    const elapsedBefore = sceneElapsedBefore(index);
    const sceneStartedAt = performance.now();
    preloadNearbyStills(index);

    opening.classList.remove('is-gate', 'is-final', 'is-connecting', 'is-intertitle');
    opening.classList.add('is-cinematic');
    if (gate) gate.hidden = true;
    if (waiting) waiting.hidden = true;
    if (finalCard) finalCard.hidden = true;
    if (copy) copy.hidden = false;
    if (skipButton) skipButton.hidden = false;
    if (progressCount) progressCount.textContent = `${progressLabel('dominium.opening.progress.record')} // ${String(index + 1).padStart(2, '0')} / ${String(scenes.length).padStart(2, '0')}`;
    if (progressBar) progressBar.style.width = `${(elapsedBefore / totalDuration) * 100}%`;

    stage.classList.remove('is-final-image', 'is-intertitle', 'is-video', 'is-connecting');
    if (scene.type === 'video') stage.classList.add('is-video');
    if (scene.type === 'intertitle') {
      stage.classList.add('is-intertitle');
      opening.classList.add('is-intertitle');
    }
    translate(live, soundtrackUnavailable ? 'dominium.opening.audio.unavailable' : 'dominium.opening.playing');
    revealCopy(scene.frames[0]);

    if (scene.type === 'video') void showVideoScene(scene, token);
    else if (scene.type === 'image') showImageScene(scene, token);

    scene.frames.slice(1).forEach(frame => {
      const offset = scene.type === 'video' ? frame.at * scene.duration : frame.at;
      schedule(() => revealCopy(frame), offset, token);
    });

    schedule(() => nextScene(index + 1), scene.duration, token);
    const updateProgress = () => {
      if (token !== playbackToken) return;
      const elapsed = Math.min(scene.duration, performance.now() - sceneStartedAt);
      if (progressBar) progressBar.style.width = `${((elapsedBefore + elapsed) / totalDuration) * 100}%`;
      if (elapsed < scene.duration) progressFrame = window.requestAnimationFrame(updateProgress);
    };
    progressFrame = window.requestAnimationFrame(updateProgress);
  };

  const beginVisuals = audioUnavailable => {
    if (visualStarted || opening.classList.contains('dismissed')) return;
    visualStarted = true;
    soundtrackUnavailable = Boolean(audioUnavailable);
    window.clearTimeout(soundtrackStartFallback);
    if (waiting) waiting.hidden = true;
    if (opening) opening.classList.remove('is-connecting');
    stage.classList.remove('is-connecting');
    nextScene(0);
  };

  const setSoundtrackVolume = value => {
    soundtrackVolume = Math.max(0, Math.min(100, value));
    try { soundtrackWidget?.setVolume(soundtrackVolume); } catch (error) {}
  };

  const fadeSoundtrackTo = (target, duration, onComplete) => {
    window.clearInterval(soundtrackFadeTimer);
    if (!soundtrackWidget || !soundtrackStarted || duration <= 0) {
      setSoundtrackVolume(target);
      onComplete?.();
      return;
    }
    const initial = soundtrackVolume;
    const steps = Math.max(1, Math.ceil(duration / 80));
    let step = 0;
    soundtrackFadeTimer = window.setInterval(() => {
      step += 1;
      setSoundtrackVolume(initial + ((target - initial) * step / steps));
      if (step >= steps) {
        window.clearInterval(soundtrackFadeTimer);
        soundtrackFadeTimer = 0;
        onComplete?.();
      }
    }, 80);
  };

  function releaseSoundtrack() {
    window.clearInterval(soundtrackFadeTimer);
    window.clearTimeout(soundtrackStartFallback);
    soundtrackExpired = true;
    soundtrackEnding = true;
    try { soundtrackWidget?.pause(); } catch (error) {}
    if (soundtrackFrame && soundtrackFrame.src !== 'about:blank') soundtrackFrame.src = 'about:blank';
    soundtrackStarted = false;
  }

  const endSoundtrackAtCut = () => {
    if (!soundtrackStarted || soundtrackEnding) return;
    soundtrackEnding = true;
    fadeSoundtrackTo(0, TRACK_FADE_MS, releaseSoundtrack);
  };

  const confirmSoundtrackStarted = () => {
    if (soundtrackExpired || soundtrackStarted) {
      if (soundtrackExpired) {
        try { soundtrackWidget?.pause(); } catch (error) {}
      }
      return;
    }
    soundtrackStarted = true;
    soundtrackEnding = false;
    window.clearTimeout(soundtrackStartFallback);
    fadeSoundtrackTo(48, reduceMotion ? 0 : 1000);
    beginVisuals(false);
  };

  const bindSoundtrack = () => {
    if (soundtrackBound || !window.SC?.Widget || !soundtrackFrame) return false;
    try {
      soundtrackWidget = window.SC.Widget(soundtrackFrame);
      soundtrackBound = true;
      const events = window.SC.Widget.Events;
      soundtrackWidget.bind(events.READY, () => {
        if (soundtrackExpired) {
          try { soundtrackWidget.pause(); } catch (error) {}
          return;
        }
        try { soundtrackWidget.setVolume(0); } catch (error) {}
        try { soundtrackWidget.seekTo(0); } catch (error) {}
        try { soundtrackWidget.play(); } catch (error) {}
      });
      if (events.PLAY) soundtrackWidget.bind(events.PLAY, confirmSoundtrackStarted);
      if (events.PLAY_PROGRESS) soundtrackWidget.bind(events.PLAY_PROGRESS, progress => {
        const position = Number(progress?.currentPosition);
        if (!Number.isFinite(position)) return;
        if (!soundtrackStarted && position > 0) confirmSoundtrackStarted();
        if (soundtrackStarted && position >= TRACK_CUTOFF_MS - TRACK_FADE_MS) endSoundtrackAtCut();
        if (soundtrackStarted && position >= TRACK_CUTOFF_MS) releaseSoundtrack();
      });
      if (events.FINISH) soundtrackWidget.bind(events.FINISH, () => {
        soundtrackStarted = false;
        if (!visualStarted) beginVisuals(true);
      });
      return true;
    } catch (error) {
      soundtrackWidget = null;
      soundtrackBound = false;
      return false;
    }
  };

  const startSoundtrack = () => {
    if (!soundtrackFrame?.dataset.soundtrackSrc) {
      beginVisuals(true);
      return;
    }
    soundtrackFrame.src = soundtrackFrame.dataset.soundtrackSrc;
    if (!bindSoundtrack()) {
      soundcloudApi?.addEventListener('load', bindSoundtrack, { once: true });
      const poll = window.setInterval(() => {
        if (bindSoundtrack()) window.clearInterval(poll);
      }, 200);
      window.setTimeout(() => window.clearInterval(poll), 7500);
    }
    soundtrackStartFallback = window.setTimeout(() => {
      if (visualStarted) return;
      soundtrackExpired = true;
      releaseSoundtrack();
      beginVisuals(true);
    }, 8000);
  };

  const dismissOpening = () => {
    if (opening.classList.contains('dismissed')) return;
    playbackToken += 1;
    clearTimers();
    releaseSoundtrack();
    if (video) stopVideo(video);
    silenceAllVideos(document);
    document.body.classList.remove('dominium-opening-active');
    opening.classList.add('dismissed');
    try { sessionStorage.setItem('dd_dominium_opening_seen_v1', 'yes'); } catch (error) {}
    frameObserver?.disconnect();
    window.setTimeout(() => opening.remove(), reduceMotion ? 0 : 650);
    document.querySelector('.dominium-topbar')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    document.querySelector('.dominium-brand')?.focus({ preventScroll: true });
  };

  const startOpening = () => {
    if (userStarted) return;
    userStarted = true;
    opening.classList.remove('is-gate');
    opening.classList.add('is-connecting');
    stage.classList.add('is-connecting');
    if (gate) gate.hidden = true;
    if (waiting) waiting.hidden = false;
    if (skipButton) skipButton.hidden = false;
    if (waitingCopy) translate(waitingCopy, 'dominium.opening.wait.copy');
    if (live) translate(live, 'dominium.opening.wait.kicker');
    document.body.classList.add('dominium-opening-active');
    startSoundtrack();
  };

  const handleKeydown = event => {
    if (opening.classList.contains('dismissed')) return;
    if (event.key === 'Escape' && userStarted && !finalShowing) {
      event.preventDefault();
      showFinal(true);
      return;
    }
    if (event.key !== 'Enter' || event.target.closest?.('button,a,input,textarea,select,[contenteditable="true"]')) return;
    event.preventDefault();
    if (finalShowing) dismissOpening();
    else if (!userStarted) startOpening();
  };

  document.body.classList.add('dominium-opening-active');
  startButton?.addEventListener('click', startOpening);
  enterButton?.addEventListener('click', dismissOpening);
  skipButton?.addEventListener('click', () => showFinal(true));
  document.addEventListener('keydown', handleKeydown);

  if (reduceMotion) showFinal(false);
})();
