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
  const gateHint = gate?.querySelector('small');
  const waiting = document.getElementById('opening-wait');
  const waitingCopy = document.getElementById('opening-wait-copy');
  const copy = document.getElementById('opening-copy');
  const finalCard = document.getElementById('opening-final');
  const kicker = document.getElementById('opening-kicker');
  const line = document.getElementById('opening-line');
  const lineEmphasis = document.getElementById('opening-line-em');
  const caption = document.getElementById('opening-caption');
  const finalKicker = document.getElementById('opening-final-kicker');
  const finalTitle = document.getElementById('opening-final-title');
  const finalTitlePrefix = document.getElementById('opening-final-prefix');
  const finalTitleWord = document.getElementById('opening-final-word');
  const finalCopy = document.getElementById('opening-final-copy');
  const finalHint = document.getElementById('opening-final-hint');
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
    STILL_BRIEF: 4960,
    VIDEO: 9030,
    VIDEO_FULL: 10000,
    TITLE: 4900,
    LAB_TEAM: 4400,
    TEST_WING: 5000,
    INFECTED_WING: 6000,
    DUAL_SAMPLE: 4800,
    CAPSULE_PRELUDE: 5000
  });
  const TRACK_MUTE_AT_MS = 98000;
  const TRACK_RETURN_AT_MS = 113000;
  const TRACK_END_MS = 128000;
  const SOUNDTRACK_EVENT_GRACE_MS = 1200;
  const TRACK_FADE_MS = 850;
  const TRACK_RETURN_FADE_MS = 1400;
  const SOUNDTRACK_TARGET_VOLUME = 70;
  const TRANSFORMATION_START_DELAY_MS = 1800;
  const TRANSFORMATION_FRAME_HOLD_MS = 1450;
  const TRANSFORMATION_MONTAGE = Object.freeze([
    'img-dominus/intro/stills/intro-still-17-maverick-capsule.png',
    'img-dominus/intro/stills/intro-still-18-dual-pathogen-experiment.png',
    'img-dominus/intro/stills/intro-still-19-host-transformation-v2.png',
    'img-dominus/intro/stills/intro-still-20-transformation-form-v3.png',
    'img-dominus/intro/stills/intro-still-21-creature-free-v3.png'
  ]);
  const TRANSITION_MS = reduceMotion ? 0 : 520;
  const scenes = [
    {
      type: 'video',
      src: 'video/dominium-intro/intro-entrada-leviathan.mp4',
      fallback: 'img-dominus/intro/video-keyframes/intro-video-frame-01-leviathan-approach.png',
      duration: SCENE_DURATION.VIDEO_FULL,
      waitForVideoEnd: true,
      frames: [
        { at: 0, kicker: 'dominium.opening.scene.1a.kicker', line: 'dominium.opening.scene.1a.line', emphasis: 'dominium.opening.scene.1a.emphasis', caption: 'dominium.opening.scene.1a.caption' },
        { at: 0.58, kicker: 'dominium.opening.scene.1b.kicker', line: 'dominium.opening.scene.1b.line', emphasis: 'dominium.opening.scene.1b.emphasis', caption: 'dominium.opening.scene.1b.caption' }
      ]
    },
    {
      type: 'image',
      src: 'img-dominus/intro/stills/intro-still-12-leviathan-arrival.png',
      duration: SCENE_DURATION.STILL_BRIEF,
      frames: [{ at: 0, kicker: 'dominium.opening.scene.arrival.kicker', line: 'dominium.opening.scene.arrival.line', emphasis: 'dominium.opening.scene.arrival.emphasis', caption: 'dominium.opening.scene.arrival.caption' }]
    },
    {
      type: 'video',
      src: 'video/dominium-intro/intro-entrada-equipe-leviathan.mp4',
      fallback: 'img-dominus/intro/stills/intro-still-13-leviathan-entry.png',
      duration: SCENE_DURATION.VIDEO_FULL,
      waitForVideoEnd: true,
      frames: [{ at: 0, kicker: 'dominium.opening.scene.entry.kicker', line: 'dominium.opening.scene.entry.line', emphasis: 'dominium.opening.scene.entry.emphasis', caption: 'dominium.opening.scene.entry.caption' }]
    },
    {
      type: 'video',
      src: 'video/dominium-intro/equipe-interior-leviathan.mp4',
      fallback: 'img-dominus/intro/stills/intro-still-15-security-inside-leviathan.png',
      duration: SCENE_DURATION.VIDEO_FULL,
      frames: [{ at: 0, kicker: 'dominium.opening.scene.inside.kicker', line: 'dominium.opening.scene.inside.line', emphasis: 'dominium.opening.scene.inside.emphasis', caption: 'dominium.opening.scene.inside.caption' }]
    },
    {
      type: 'image',
      src: 'img-dominus/intro/stills/intro-still-16-security-entering-elevator.png',
      duration: SCENE_DURATION.STILL_BRIEF,
      frames: [{ at: 0, kicker: 'dominium.opening.scene.elevator.kicker', line: 'dominium.opening.scene.elevator.line', emphasis: 'dominium.opening.scene.elevator.emphasis', caption: 'dominium.opening.scene.elevator.caption' }]
    },
    {
      type: 'intertitle',
      duration: SCENE_DURATION.TITLE,
      frames: [
        { at: 0, kicker: 'dominium.opening.scene.welcome.pre.kicker', line: 'dominium.opening.scene.welcome.pre.line', emphasis: 'dominium.opening.scene.welcome.pre.emphasis', caption: 'dominium.opening.scene.welcome.pre.caption' },
        { at: 2450, kicker: 'dominium.opening.scene.welcome.kicker', line: 'dominium.opening.scene.welcome.line', emphasis: 'dominium.opening.scene.welcome.emphasis', caption: 'dominium.opening.scene.welcome.caption', effect: 'hades-impact' }
      ]
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
      src: 'img-dominus/equipe-lab-1.png',
      duration: SCENE_DURATION.LAB_TEAM,
      frames: [{ at: 0, kicker: 'dominium.opening.scene.team.kicker', line: 'dominium.opening.scene.team.line', emphasis: 'dominium.opening.scene.team.emphasis', caption: 'dominium.opening.scene.team.caption' }]
    },
    {
      type: 'image',
      src: 'img-dominus/intro/stills/intro-still-05-grey-daniel-lab.png',
      duration: SCENE_DURATION.LAB_TEAM,
      frames: [{ at: 0, kicker: 'dominium.opening.scene.laboratory.kicker', line: 'dominium.opening.scene.laboratory.line', emphasis: 'dominium.opening.scene.laboratory.emphasis', caption: 'dominium.opening.scene.laboratory.caption' }]
    },
    {
      type: 'image',
      src: 'img-dominus/intro/stills/intro-still-07-grey-frost-research.png',
      duration: SCENE_DURATION.LAB_TEAM,
      frames: [{ at: 0, kicker: 'dominium.opening.scene.research.kicker', line: 'dominium.opening.scene.research.line', emphasis: 'dominium.opening.scene.research.emphasis', caption: 'dominium.opening.scene.research.caption' }]
    },
    {
      type: 'image',
      src: 'img-dominus/ala-de-testes.png',
      duration: SCENE_DURATION.TEST_WING,
      frames: [{ at: 0, kicker: 'dominium.opening.scene.test-wing.kicker', line: 'dominium.opening.scene.test-wing.line', emphasis: 'dominium.opening.scene.test-wing.emphasis', caption: 'dominium.opening.scene.test-wing.caption' }]
    },
    {
      type: 'video',
      src: 'video/dominium-intro/intro-corredor-escuro.mp4',
      fallback: 'img-dominus/ala-estagio-2.png',
      duration: SCENE_DURATION.INFECTED_WING,
      effect: 'infected-wing',
      frames: [{ at: 0, kicker: 'dominium.opening.scene.infected-wing.kicker', line: 'dominium.opening.scene.infected-wing.line', emphasis: 'dominium.opening.scene.infected-wing.emphasis', caption: 'dominium.opening.scene.infected-wing.caption' }]
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
      src: 'img-dominus/intro/stills/intro-still-18-dual-pathogen-experiment.png',
      duration: SCENE_DURATION.DUAL_SAMPLE,
      frames: [{ at: 0, kicker: 'dominium.opening.scene.dual-sample.kicker', line: 'dominium.opening.scene.dual-sample.line', emphasis: 'dominium.opening.scene.dual-sample.emphasis', caption: 'dominium.opening.scene.dual-sample.caption' }]
    },
    {
      type: 'image',
      src: 'img-dominus/intro/stills/intro-still-17-maverick-capsule.png',
      duration: SCENE_DURATION.CAPSULE_PRELUDE,
      frames: [{ at: 0, kicker: 'dominium.opening.scene.capsule.kicker', line: 'dominium.opening.scene.capsule.line', emphasis: 'dominium.opening.scene.capsule.emphasis', caption: 'dominium.opening.scene.capsule.caption' }]
    }
  ];
  let totalDuration = scenes.reduce((total, scene) => total + scene.duration, 0);
  const timers = new Set();
  const endingTimers = new Set();
  const imageCache = new Map();
  let activeStill = stillLayers[0];
  let standbyStill = stillLayers[1] || stillLayers[0];
  let soundtrackWidget = null;
  let soundtrackStarted = false;
  let soundtrackExpired = false;
  let soundtrackPhase = 'idle';
  let soundtrackVolume = 0;
  let soundtrackFadeTimer = 0;
  let soundtrackStartFallback = 0;
  let soundtrackPrepareFallback = 0;
  let soundtrackBound = false;
  let soundtrackReady = false;
  let soundtrackInitializationFailed = false;
  let soundtrackUnavailable = false;
  let visualStarted = false;
  let userStarted = false;
  let playbackToken = 0;
  let finalShowing = false;
  let suspenseShowing = false;
  let titleTickSequenceStarted = false;
  let transformationStarted = false;
  let transformationStageActive = false;
  const titleTickTimers = new Set();
  let progressFrame = 0;
  let frameObserver = null;

  const translate = (element, key) => {
    if (!element || !key) return;
    element.dataset.i18n = key;
    const locale = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'pt-BR';
    const value = window.DD_I18N_DICTIONARIES?.[locale]?.[key];
    if (value) element.textContent = value;
  };

  const setStartAvailability = ready => {
    if (!startButton) return;
    startButton.disabled = (!ready && !soundtrackInitializationFailed) || userStarted;
    startButton.setAttribute('aria-busy', String(!ready && !soundtrackInitializationFailed));
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

  const scheduleEnding = (callback, delay) => {
    const timer = window.setTimeout(() => {
      endingTimers.delete(timer);
      callback();
    }, Math.max(0, delay));
    endingTimers.add(timer);
    return timer;
  };

  const clearEndingTimers = () => {
    endingTimers.forEach(timer => window.clearTimeout(timer));
    endingTimers.clear();
  };

  const stopVideo = media => {
    if (!(media instanceof HTMLVideoElement)) return;
    silenceVideo(media);
    media.pause();
    media.onplaying = null;
    media.onended = null;
    media.onerror = null;
    media.onloadedmetadata = null;
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
    opening.classList.toggle('is-hades-impact', frame.effect === 'hades-impact');
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

  const showVideoScene = async (scene, token, callbacks = {}) => {
    const fallback = scene.fallback || activeStill?.src;
    if (!video || !fallback) {
      if (fallback) void crossfadeToStill(fallback, token);
      callbacks.onFailure?.();
      return;
    }

    const fallbackVisible = await crossfadeToStill(fallback, token);
    if (!fallbackVisible || token !== playbackToken) {
      callbacks.onFailure?.();
      return;
    }

    silenceVideo(video);
    video.hidden = false;
    video.preload = 'auto';
    video.playsInline = true;
    video.src = scene.src;
    video.load();
    silenceVideo(video);
    let failed = false;
    const failToFallback = () => {
      if (failed || token !== playbackToken) return;
      failed = true;
      if (token !== playbackToken) return;
      video.pause();
      video.hidden = true;
      video.classList.remove('is-visible');
      if (activeStill) {
        activeStill.hidden = false;
        activeStill.classList.add('is-visible');
      }
      callbacks.onFailure?.();
    };
    video.onerror = failToFallback;
    video.onloadedmetadata = () => {
      if (!scene.waitForVideoEnd || token !== playbackToken || !Number.isFinite(video.duration) || video.duration <= 0) return;
      scene.duration = Math.ceil(video.duration * 1000);
      totalDuration = scenes.reduce((total, item) => total + item.duration, 0);
    };
    video.onplaying = () => {
      if (token !== playbackToken) return;
      silenceVideo(video);
      window.requestAnimationFrame(() => video.classList.add('is-visible'));
      callbacks.onPlaying?.();
      schedule(() => {
        if (token === playbackToken) stillLayers.forEach(layer => {
          if (layer !== activeStill) layer.hidden = true;
          layer.classList.remove('is-visible');
        });
      }, TRANSITION_MS + 30, token);
    };
    video.onended = () => {
      if (token !== playbackToken) return;
      video.pause();
      callbacks.onEnded?.();
    };

    try {
      const playback = video.play();
      if (playback?.catch) playback.catch(failToFallback);
    } catch (error) {
      failToFallback();
    }
  };

  const sceneElapsedBefore = index => scenes.slice(0, index).reduce((total, scene) => total + scene.duration, 0);

  const showTransformationFrame = async (index, token) => {
    if (!suspenseShowing || finalShowing || token !== playbackToken) return;
    const source = TRANSFORMATION_MONTAGE[index];
    if (!source) return;

    const visible = await crossfadeToStill(source, token);
    if (!visible || !suspenseShowing || finalShowing || token !== playbackToken) return;

    if (index + 1 < TRANSFORMATION_MONTAGE.length) {
      scheduleEnding(() => { void showTransformationFrame(index + 1, token); }, TRANSFORMATION_FRAME_HOLD_MS);
    }
  };

  const startTransformationMontage = () => {
    if (!suspenseShowing || finalShowing || transformationStarted) return;
    transformationStarted = true;
    transformationStageActive = true;
    opening.classList.add('is-transformation');
    stage.classList.remove('is-video');
    stage.classList.add('is-final-image');
    if (finalCard) finalCard.hidden = true;
    void showTransformationFrame(0, playbackToken);
  };

  const showSuspense = () => {
    if (suspenseShowing || finalShowing || opening.classList.contains('dismissed')) return;
    suspenseShowing = true;
    playbackToken += 1;
    clearTimers();
    window.clearTimeout(soundtrackStartFallback);
    if (video) stopVideo(video);
    TRANSFORMATION_MONTAGE.forEach(source => { void preloadImage(source); });

    stage.classList.remove('is-cinematic', 'is-intertitle', 'is-video', 'is-connecting', 'is-infected-wing');
    stage.classList.add('is-final-image');
    void crossfadeToStill('img-dominus/intro/stills/intro-still-03-containment-vessel.png', playbackToken);
    if (gate) gate.hidden = true;
    if (waiting) waiting.hidden = true;
    if (copy) copy.hidden = true;
    if (finalCard) finalCard.hidden = false;
    if (finalTitle) finalTitle.hidden = true;
    if (finalTitlePrefix) finalTitlePrefix.hidden = true;
    if (finalTitleWord) finalTitleWord.textContent = '';
    if (enterButton) enterButton.hidden = true;
    if (finalHint) finalHint.hidden = true;
    if (skipButton) skipButton.hidden = false;
    opening.classList.remove('is-gate', 'is-cinematic', 'is-connecting', 'is-intertitle', 'is-hades-impact', 'is-dominium-reveal', 'is-tick-sequence', 'is-tick-pulse', 'is-transformation');
    opening.classList.add('is-final', 'is-suspense');
    translate(finalKicker, 'dominium.opening.final.suspense.kicker');
    translate(finalCopy, 'dominium.opening.final.suspense.copy');
    translate(live, 'dominium.opening.final.silence');
  };

  const showFinal = (fromSkip = false) => {
    if (finalShowing || opening.classList.contains('dismissed')) return;
    suspenseShowing = false;
    finalShowing = true;
    playbackToken += 1;
    clearTimers();
    clearEndingTimers();
    stopTitleTickSequence();
    window.clearTimeout(soundtrackStartFallback);
    if (fromSkip) {
      fadeSoundtrackTo(0, reduceMotion ? 0 : 350, releaseSoundtrack);
    }

    if (transformationStageActive) {
      stage.classList.remove('is-cinematic', 'is-intertitle', 'is-video', 'is-connecting', 'is-infected-wing');
      stage.classList.add('is-final-image');
    } else {
      stage.classList.remove('is-cinematic', 'is-intertitle', 'is-video', 'is-connecting', 'is-infected-wing');
      stage.classList.add('is-final-image');
      void crossfadeToStill('img-dominus/intro/stills/intro-still-03-containment-vessel.png', playbackToken);
    }

    if (gate) gate.hidden = true;
    if (waiting) waiting.hidden = true;
    if (copy) copy.hidden = true;
    if (finalCard) finalCard.hidden = false;
    if (skipButton) skipButton.hidden = true;
    opening.classList.remove('is-gate', 'is-cinematic', 'is-connecting', 'is-intertitle', 'is-hades-impact', 'is-suspense', 'is-tick-sequence', 'is-tick-pulse', 'is-transformation');
    opening.classList.add('is-final', 'is-dominium-reveal');
    if (finalTitle) finalTitle.hidden = false;
    if (finalTitlePrefix) {
      finalTitlePrefix.hidden = false;
      translate(finalTitlePrefix, 'dominium.opening.final.brand');
    }
    if (finalTitleWord) finalTitleWord.textContent = 'DOMINIUM';
    if (finalHint) finalHint.hidden = false;
    translate(finalKicker, 'dominium.opening.final.kicker');
    translate(finalCopy, 'dominium.opening.final.copy');
    translate(live, 'dominium.opening.final.status');
    if (enterButton) enterButton.hidden = false;
  };

  const nextScene = index => {
    if (index >= scenes.length) {
      clearTimers();
      return;
    }

    clearTimers();
    const token = ++playbackToken;
    const scene = scenes[index];
    const elapsedBefore = sceneElapsedBefore(index);
    const sceneStartedAt = performance.now();
    preloadNearbyStills(index);

    opening.classList.remove('is-gate', 'is-final', 'is-connecting', 'is-intertitle', 'is-suspense', 'is-dominium-reveal', 'is-tick-sequence', 'is-tick-pulse', 'is-transformation');
    opening.classList.add('is-cinematic');
    if (gate) gate.hidden = true;
    if (waiting) waiting.hidden = true;
    if (finalCard) finalCard.hidden = true;
    if (copy) copy.hidden = false;
    if (skipButton) skipButton.hidden = false;
    if (progressCount) progressCount.textContent = `${progressLabel('dominium.opening.progress.record')} // ${String(index + 1).padStart(2, '0')} / ${String(scenes.length).padStart(2, '0')}`;
    if (progressBar) progressBar.style.width = `${(elapsedBefore / totalDuration) * 100}%`;

    stage.classList.remove('is-final-image', 'is-intertitle', 'is-video', 'is-connecting', 'is-infected-wing');
    if (scene.effect === 'infected-wing') stage.classList.add('is-infected-wing');
    if (scene.type === 'video') stage.classList.add('is-video');
    if (scene.type === 'intertitle') {
      stage.classList.add('is-intertitle');
      opening.classList.add('is-intertitle');
    }
    translate(live, soundtrackUnavailable ? 'dominium.opening.audio.unavailable' : 'dominium.opening.playing');
    revealCopy(scene.frames[0]);

    let sceneAdvanced = false;
    const advanceScene = () => {
      if (sceneAdvanced || token !== playbackToken) return;
      sceneAdvanced = true;
      nextScene(index + 1);
    };

    if (scene.type === 'video') {
      void showVideoScene(scene, token, scene.waitForVideoEnd ? {
        onEnded: advanceScene,
        onFailure: () => schedule(advanceScene, scene.duration, token)
      } : {});
    }
    else if (scene.type === 'image') showImageScene(scene, token);

    scene.frames.slice(1).forEach(frame => {
      const offset = scene.type === 'video' ? frame.at * scene.duration : frame.at;
      schedule(() => revealCopy(frame), offset, token);
    });

    if (scene.type === 'video' && scene.waitForVideoEnd) schedule(advanceScene, 60000, token);
    else schedule(advanceScene, scene.duration, token);
    const updateProgress = () => {
      if (token !== playbackToken) return;
      const elapsed = Math.min(scene.duration, performance.now() - sceneStartedAt);
      if (progressBar) progressBar.style.width = `${((elapsedBefore + elapsed) / totalDuration) * 100}%`;
      if (elapsed < scene.duration || (scene.waitForVideoEnd && !sceneAdvanced)) progressFrame = window.requestAnimationFrame(updateProgress);
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
    if (soundtrackUnavailable) translate(live, 'dominium.opening.audio.unavailable');
    nextScene(0);
    if (soundtrackUnavailable) {
      scheduleEnding(() => { if (!suspenseShowing && !finalShowing) showSuspense(); }, TRACK_MUTE_AT_MS);
      scheduleEnding(() => {
        if (!suspenseShowing && !finalShowing) showSuspense();
        startTransformationMontage();
      }, TRACK_MUTE_AT_MS + TRANSFORMATION_START_DELAY_MS);
      scheduleEnding(() => {
        if (!suspenseShowing || finalShowing) return;
        startTitleTickSequence();
      }, TRACK_RETURN_AT_MS);
      scheduleEnding(() => { if (!finalShowing) showFinal(false); }, TRACK_END_MS);
    } else {
      scheduleEnding(() => {
        if (soundtrackPhase === 'opening') applySoundtrackTimeline(TRACK_MUTE_AT_MS);
      }, TRACK_MUTE_AT_MS + SOUNDTRACK_EVENT_GRACE_MS);
      scheduleEnding(() => {
        if (soundtrackPhase === 'muted') applySoundtrackTimeline(TRACK_RETURN_AT_MS);
      }, TRACK_RETURN_AT_MS + SOUNDTRACK_EVENT_GRACE_MS);
      scheduleEnding(() => {
        if (!finalShowing) applySoundtrackTimeline(TRACK_END_MS);
      }, TRACK_END_MS + SOUNDTRACK_EVENT_GRACE_MS);
    }
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

  const stopTitleTickSequence = () => {
    titleTickTimers.forEach(timer => window.clearTimeout(timer));
    titleTickTimers.clear();
    opening.classList.remove('is-tick-sequence', 'is-tick-pulse');
  };

  const startTitleTickSequence = () => {
    if (titleTickSequenceStarted || !suspenseShowing || finalShowing) return;
    titleTickSequenceStarted = true;
    if (finalCard) finalCard.hidden = false;
    if (finalTitle) finalTitle.hidden = false;
    if (finalTitlePrefix) finalTitlePrefix.hidden = true;
    translate(finalKicker, 'dominium.opening.final.countdown.kicker');
    translate(finalCopy, 'dominium.opening.final.countdown.copy');
    translate(live, 'dominium.opening.final.clock');
    opening.classList.add('is-tick-sequence');

    const beats = [
      { at: 0, text: 'D' },
      { at: 2000, text: 'DO' },
      { at: 4000, text: 'DOM' },
      { at: 6000, text: 'DOMI' },
      { at: 8000, text: 'DOMIN' },
      { at: 10000, text: 'DOMINI' },
      { at: 12000, text: 'DOMINIUM' }
    ];

    beats.forEach(beat => {
      const timer = window.setTimeout(() => {
        titleTickTimers.delete(timer);
        if (!suspenseShowing || finalShowing) return;
        if (finalTitle) finalTitle.hidden = false;
        if (finalTitlePrefix) finalTitlePrefix.hidden = true;
        if (finalTitleWord) {
          finalTitleWord.textContent = beat.text;
          finalTitleWord.classList.remove('is-tick-hit');
          void finalTitleWord.offsetWidth;
          finalTitleWord.classList.add('is-tick-hit');
        }
        opening.classList.remove('is-tick-pulse');
        void opening.offsetWidth;
        opening.classList.add('is-tick-pulse');
      }, beat.at);
      titleTickTimers.add(timer);
    });
  };

  function releaseSoundtrack() {
    window.clearInterval(soundtrackFadeTimer);
    window.clearTimeout(soundtrackStartFallback);
    soundtrackExpired = true;
    soundtrackPhase = 'ended';
    stopTitleTickSequence();
    try { soundtrackWidget?.pause(); } catch (error) {}
    if (soundtrackFrame && soundtrackFrame.src !== 'about:blank') soundtrackFrame.src = 'about:blank';
    soundtrackStarted = false;
  }

  const applySoundtrackTimeline = position => {
    if (!soundtrackStarted || soundtrackPhase === 'ended') return;

    if (position >= TRACK_END_MS) {
      if (suspenseShowing && !finalShowing) showFinal(false);
      releaseSoundtrack();
    } else if (position >= TRACK_END_MS - TRACK_FADE_MS) {
      if (soundtrackPhase !== 'ending') {
        soundtrackPhase = 'ending';
        stopTitleTickSequence();
        fadeSoundtrackTo(0, TRACK_FADE_MS, releaseSoundtrack);
      }
    } else if (position >= TRACK_RETURN_AT_MS) {
      if (soundtrackPhase !== 'return') {
        soundtrackPhase = 'return';
        fadeSoundtrackTo(SOUNDTRACK_TARGET_VOLUME, TRACK_RETURN_FADE_MS);
        if (!suspenseShowing) showSuspense();
        if (!transformationStarted) startTransformationMontage();
        startTitleTickSequence();
      }
    } else if (position >= TRACK_MUTE_AT_MS && soundtrackPhase === 'opening') {
      soundtrackPhase = 'muted';
      fadeSoundtrackTo(0, TRACK_FADE_MS);
      if (!suspenseShowing) showSuspense();
      translate(live, 'dominium.opening.final.silence');
      schedule(() => startTransformationMontage(), TRANSFORMATION_START_DELAY_MS);
    }

    if ((suspenseShowing || finalShowing) && progressBar) {
      progressBar.style.width = `${Math.min(100, (position / TRACK_END_MS) * 100)}%`;
    }
  };

  const confirmSoundtrackStarted = () => {
    if (soundtrackExpired || soundtrackStarted) {
      if (soundtrackExpired) {
        try { soundtrackWidget?.pause(); } catch (error) {}
      }
      return;
    }
    soundtrackStarted = true;
    soundtrackPhase = 'opening';
    window.clearTimeout(soundtrackStartFallback);
    setSoundtrackVolume(SOUNDTRACK_TARGET_VOLUME);
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
        soundtrackReady = true;
        soundtrackInitializationFailed = false;
        window.clearTimeout(soundtrackPrepareFallback);
        try { soundtrackWidget.setVolume(0); } catch (error) {}
        try { soundtrackWidget.seekTo(0); } catch (error) {}
        setStartAvailability(true);
        if (gateHint) translate(gateHint, 'dominium.opening.gate.hint');
      });
      if (events.PLAY) soundtrackWidget.bind(events.PLAY, confirmSoundtrackStarted);
      if (events.PLAY_PROGRESS) soundtrackWidget.bind(events.PLAY_PROGRESS, progress => {
        const position = Number(progress?.currentPosition);
        if (!Number.isFinite(position)) return;
        if (!soundtrackStarted && position > 0) confirmSoundtrackStarted();
        if (soundtrackStarted) applySoundtrackTimeline(position);
      });
      if (events.FINISH) soundtrackWidget.bind(events.FINISH, () => {
        if (suspenseShowing && !finalShowing) showFinal(false);
        releaseSoundtrack();
        if (!visualStarted) beginVisuals(true);
      });
      if (events.ERROR) soundtrackWidget.bind(events.ERROR, () => failSoundtrackPreparation());
      return true;
    } catch (error) {
      soundtrackWidget = null;
      soundtrackBound = false;
      return false;
    }
  };

  const startSoundtrack = () => {
    if (!soundtrackFrame?.dataset.soundtrackSrc || !soundtrackWidget || !soundtrackReady) {
      soundtrackUnavailable = true;
      beginVisuals(true);
      return;
    }
    try {
      setSoundtrackVolume(SOUNDTRACK_TARGET_VOLUME);
      soundtrackWidget.seekTo(0);
      soundtrackWidget.play();
    } catch (error) {
      soundtrackUnavailable = true;
      beginVisuals(true);
      return;
    }
    soundtrackStartFallback = window.setTimeout(() => {
      if (visualStarted) return;
      soundtrackExpired = true;
      soundtrackUnavailable = true;
      releaseSoundtrack();
      beginVisuals(true);
    }, 8000);
  };

  const prepareSoundtrack = () => {
    if (!soundtrackFrame?.dataset.soundtrackSrc) {
      soundtrackInitializationFailed = true;
      soundtrackUnavailable = true;
      setStartAvailability(true);
      if (gateHint) translate(gateHint, 'dominium.opening.audio.unavailable');
      return;
    }

    setStartAvailability(false);
    if (gateHint) translate(gateHint, 'dominium.opening.audio.preparing');
    soundtrackFrame.src = soundtrackFrame.dataset.soundtrackSrc;
    if (bindSoundtrack()) return;

    soundcloudApi?.addEventListener('load', bindSoundtrack, { once: true });
    const poll = window.setInterval(() => {
      if (bindSoundtrack()) window.clearInterval(poll);
    }, 200);
    soundtrackPrepareFallback = window.setTimeout(() => {
      window.clearInterval(poll);
      if (soundtrackReady) return;
      failSoundtrackPreparation();
    }, 10000);
  };

  function failSoundtrackPreparation() {
    if (soundtrackReady) return;
    soundtrackInitializationFailed = true;
    soundtrackUnavailable = true;
    window.clearTimeout(soundtrackPrepareFallback);
    setStartAvailability(true);
    if (gateHint) translate(gateHint, 'dominium.opening.audio.unavailable');
  }

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
    if (soundtrackFrame?.dataset.soundtrackSrc && !soundtrackReady && !soundtrackInitializationFailed) {
      if (gateHint) translate(gateHint, 'dominium.opening.audio.preparing');
      return;
    }
    userStarted = true;
    setStartAvailability(soundtrackReady);
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
    else if (suspenseShowing) showFinal(true);
    else if (!userStarted) startOpening();
  };

  document.body.classList.add('dominium-opening-active');
  prepareSoundtrack();
  startButton?.addEventListener('click', startOpening);
  enterButton?.addEventListener('click', dismissOpening);
  skipButton?.addEventListener('click', () => showFinal(true));
  document.addEventListener('keydown', handleKeydown);

  if (reduceMotion) showFinal(false);
})();
