(() => {
  'use strict';

  const opening = document.getElementById('dominium-opening');
  if (!opening) return;

  // Keep the DOOM access puzzle as the only way into this site.
  try {
    if (sessionStorage.getItem('dd_doom_site_access_v1') !== 'granted') return;
  } catch (error) {
    return;
  }

  const stage = document.getElementById('opening-stage');
  const stills = [
    document.getElementById('opening-still'),
    document.getElementById('opening-still-next')
  ].filter(Boolean);
  const video = document.getElementById('opening-video');
  const gate = document.getElementById('opening-gate');
  const startButton = document.getElementById('opening-start');
  const copy = document.getElementById('opening-copy');
  const kicker = document.getElementById('opening-kicker');
  const line = document.getElementById('opening-line');
  const emphasis = document.getElementById('opening-line-em');
  const caption = document.getElementById('opening-caption');
  const finalCard = document.getElementById('opening-final');
  const finalKicker = document.getElementById('opening-final-kicker');
  const finalTitle = document.getElementById('opening-final-title');
  const finalPrefix = document.getElementById('opening-final-prefix');
  const finalWord = document.getElementById('opening-final-word');
  const finalCopy = document.getElementById('opening-final-copy');
  const finalHint = document.getElementById('opening-final-hint');
  const enterButton = document.getElementById('opening-enter');
  const live = document.getElementById('opening-live');
  const skipButton = document.getElementById('opening-skip');
  const progressCount = document.getElementById('opening-progress-count');
  const progressBar = document.getElementById('opening-progress-bar');
  const soundtrackFrame = document.getElementById('dominium-soundtrack-player');
  const soundcloudApi = document.getElementById('soundcloud-widget-api');

  if (!stage || stills.length === 0 || !startButton) return;

  const TRACK = Object.freeze({
    muteAt: 98000,
    returnAt: 113000,
    fadeAt: 127150,
    endAt: 128000,
    volume: 70,
    fadeOut: 850,
    fadeIn: 1400
  });
  const TRANSFORMATION = Object.freeze({
    beginsAt: TRACK.muteAt + 1800,
    frameEvery: 1450,
    frames: [
      'img-dominus/intro/stills/intro-still-17-maverick-capsule.png',
      'img-dominus/intro/stills/intro-still-18-dual-pathogen-experiment.png',
      'img-dominus/intro/stills/intro-still-19-host-transformation-v2.png',
      'img-dominus/intro/stills/intro-still-20-transformation-form-v3.png',
      'img-dominus/intro/stills/intro-still-21-creature-free-v3.png'
    ]
  });
  const TRANSITION_MS = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 520;

  const frame = (name, at, effect) => ({
    at: at || 0,
    kicker: 'dominium.opening.scene.' + name + '.kicker',
    line: 'dominium.opening.scene.' + name + '.line',
    emphasis: 'dominium.opening.scene.' + name + '.emphasis',
    caption: 'dominium.opening.scene.' + name + '.caption',
    effect: effect || ''
  });

  // These durations lock the first 96.94 seconds to the approved soundtrack cues.
  const scenes = [
    {
      kind: 'video',
      startImmediately: true,
      src: 'video/dominium-intro/intro-entrada-leviathan.mp4',
      fallback: 'img-dominus/intro/video-keyframes/intro-video-frame-01-leviathan-approach.png',
      duration: 10030,
      frames: [frame('1a'), frame('1b', 0.58)]
    },
    {
      kind: 'image',
      src: 'img-dominus/intro/stills/intro-still-12-leviathan-arrival.png',
      duration: 4960,
      frames: [frame('arrival')]
    },
    {
      kind: 'video',
      src: 'video/dominium-intro/intro-entrada-equipe-leviathan.mp4',
      fallback: 'img-dominus/intro/stills/intro-still-13-leviathan-entry.png',
      duration: 10030,
      frames: [frame('entry')]
    },
    {
      kind: 'video',
      src: 'video/dominium-intro/equipe-interior-leviathan.mp4',
      fallback: 'img-dominus/intro/stills/intro-still-15-security-inside-leviathan.png',
      duration: 10000,
      frames: [frame('inside')]
    },
    {
      kind: 'image',
      src: 'img-dominus/intro/stills/intro-still-16-security-entering-elevator.png',
      duration: 4960,
      frames: [frame('elevator')]
    },
    {
      kind: 'title',
      duration: 4900,
      frames: [frame('welcome.pre'), frame('welcome', 0.5, 'hades-impact')]
    },
    {
      kind: 'video',
      src: 'video/dominium-intro/intro-interior.mp4',
      fallback: 'img-dominus/intro/video-keyframes/intro-video-frame-02-hades-corridor.png',
      duration: 9030,
      frames: [frame('3a'), frame('3b', 0.55)]
    },
    {
      kind: 'image',
      src: 'img-dominus/equipe-lab-1.png',
      duration: 4400,
      frames: [frame('team')]
    },
    {
      kind: 'image',
      src: 'img-dominus/intro/stills/intro-still-05-grey-daniel-lab.png',
      duration: 4400,
      frames: [frame('laboratory')]
    },
    {
      kind: 'image',
      src: 'img-dominus/intro/stills/intro-still-07-grey-frost-research.png',
      duration: 4400,
      frames: [frame('research')]
    },
    {
      kind: 'image',
      src: 'img-dominus/ala-de-testes.png',
      duration: 5000,
      frames: [frame('test-wing')]
    },
    {
      kind: 'video',
      src: 'video/dominium-intro/intro-corredor-escuro.mp4',
      fallback: 'img-dominus/ala-estagio-2.png',
      duration: 6000,
      effect: 'infected-wing',
      frames: [frame('infected-wing')]
    },
    {
      kind: 'video',
      src: 'video/dominium-intro/intro-malverik.mp4',
      fallback: 'img-dominus/intro/stills/intro-still-10-maverick-laboratory.png',
      duration: 9030,
      frames: [frame('4a'), frame('4b', 0.58)]
    },
    {
      kind: 'image',
      src: 'img-dominus/intro/stills/intro-still-10-maverick-laboratory.png',
      duration: 4800,
      frames: [frame('laboratory')]
    },
    {
      kind: 'image',
      src: 'img-dominus/intro/stills/intro-still-11-maverick-journal.png',
      duration: 5000,
      frames: [frame('journal')]
    }
  ];

  const preludeDuration = scenes.reduce((sum, scene) => sum + scene.duration, 0);
  const tickWords = ['D', 'DO', 'DOM', 'DOMI', 'DOMIN', 'DOMINI', 'DOMINIUM'];
  const imageCache = new Map();
  let activeStill = stills[0];
  let standbyStill = stills[1] || stills[0];
  let soundtrackWidget = null;
  let soundtrackReady = false;
  let soundtrackStarted = false;
  let soundtrackBound = false;
  let soundtrackRequested = false;
  let soundtrackVolume = TRACK.volume;
  let soundtrackCue = 'opening';
  let soundtrackFadeTimer = 0;
  let timelineTimer = 0;
  let startedAt = 0;
  let currentSceneIndex = -1;
  let currentFrameIndex = -1;
  let currentMontageIndex = -1;
  let currentTickIndex = -1;
  let playbackToken = 0;
  let suspenseEntered = false;
  let countdownEntered = false;
  let complete = false;
  let dismissed = false;
  let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const locale = () => document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'pt-BR';

  const translate = (element, key) => {
    if (!element || !key) return;
    element.dataset.i18n = key;
    const value = window.DD_I18N_DICTIONARIES?.[locale()]?.[key];
    if (value) element.textContent = value;
  };

  const forceVideoSilence = media => {
    if (!(media instanceof HTMLVideoElement)) return;
    media.defaultMuted = true;
    media.muted = true;
    media.volume = 0;
    media.setAttribute('muted', '');
    media.setAttribute('playsinline', '');
  };

  const preloadImage = source => {
    if (!source) return Promise.resolve(false);
    if (imageCache.has(source)) return imageCache.get(source);

    const loaded = new Promise(resolve => {
      const image = new Image();
      let settled = false;
      const finish = success => {
        if (settled) return;
        settled = true;
        resolve(success);
      };
      image.onload = () => {
        if (typeof image.decode === 'function') image.decode().then(() => finish(true), () => finish(true));
        else finish(true);
      };
      image.onerror = () => finish(false);
      image.src = source;
      if (image.complete) finish(image.naturalWidth > 0);
    });
    imageCache.set(source, loaded);
    return loaded;
  };

  const preloadOpeningImages = () => {
    scenes.forEach(scene => {
      if (scene.kind === 'image') void preloadImage(scene.src);
      if (scene.fallback) void preloadImage(scene.fallback);
    });
    TRANSFORMATION.frames.forEach(source => { void preloadImage(source); });
    void preloadImage('img-dominus/intro/stills/intro-still-03-containment-vessel.png');
  };

  const setBackdrop = source => {
    if (!source) return;
    const safeSource = new URL(source, document.baseURI).href.replace(/["\\\n]/g, '\\$&');
    stage.style.setProperty('--opening-backdrop-image', 'url("' + safeSource + '")');
  };

  const showStill = async (source, token) => {
    const ready = await preloadImage(source);
    if (!ready || token !== playbackToken || dismissed) return false;

    const outgoing = activeStill;
    const incoming = standbyStill || outgoing;
    incoming.src = source;
    incoming.hidden = false;
    incoming.classList.remove('is-visible');
    setBackdrop(source);

    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      if (token !== playbackToken || dismissed) return;
      incoming.classList.add('is-visible');
      if (outgoing && outgoing !== incoming) outgoing.classList.remove('is-visible');
      if (video) video.classList.remove('is-visible');
    }));

    activeStill = incoming;
    standbyStill = outgoing || incoming;
    window.setTimeout(() => {
      if (token !== playbackToken || dismissed) return;
      if (outgoing && outgoing !== incoming) outgoing.hidden = true;
      if (video) video.classList.remove('is-visible');
    }, TRANSITION_MS + 50);
    return true;
  };

  const stopVideo = () => {
    if (!video) return;
    forceVideoSilence(video);
    video.pause();
    video.onplaying = null;
    video.onerror = null;
    video.removeAttribute('src');
    video.hidden = true;
    video.classList.remove('is-visible');
    video.load();
  };

  const primeInitialVideo = () => {
    const firstScene = scenes[0];
    if (!video || firstScene?.kind !== 'video') return;
    forceVideoSilence(video);
    video.preload = 'auto';
    video.src = firstScene.src;
    video.load();
  };

  const showVideo = async (scene, token) => {
    if (!video || token !== playbackToken || dismissed) return;

    // The Leviathan approach is preloaded behind the gate and starts in the
    // click handler's call stack, instead of waiting for a still-image swap.
    if (!scene.startImmediately) {
      const fallbackReady = await showStill(scene.fallback, token);
      if (!fallbackReady || token !== playbackToken || dismissed) return;
    }

    forceVideoSilence(video);
    video.hidden = false;
    video.preload = 'auto';
    if (video.getAttribute('src') !== scene.src) {
      video.src = scene.src;
      video.load();
    }
    forceVideoSilence(video);
    video.onplaying = () => {
      if (token !== playbackToken || dismissed) return;
      forceVideoSilence(video);
      window.requestAnimationFrame(() => {
        if (token !== playbackToken || dismissed) return;
        video.classList.add('is-visible');
        if (scene.startImmediately && activeStill) {
          const outgoing = activeStill;
          outgoing.classList.remove('is-visible');
          window.setTimeout(() => {
            if (token === playbackToken && !dismissed) outgoing.hidden = true;
          }, TRANSITION_MS + 50);
        }
      });
    };
    video.onerror = () => {
      if (token !== playbackToken) return;
      video.pause();
      video.hidden = true;
      video.classList.remove('is-visible');
    };
    try {
      const result = video.play();
      if (result?.catch) result.catch(() => {
        if (token !== playbackToken) return;
        video.hidden = true;
        video.classList.remove('is-visible');
      });
    } catch (error) {
      video.hidden = true;
      video.classList.remove('is-visible');
    }
  };

  const sceneStartAt = index => {
    let elapsed = 0;
    for (let i = 0; i < index; i += 1) elapsed += scenes[i].duration;
    return elapsed;
  };

  const revealFrame = nextFrame => {
    if (!nextFrame) return;
    copy?.classList.remove('is-visible');
    opening.classList.toggle('is-hades-impact', nextFrame.effect === 'hades-impact');
    translate(kicker, nextFrame.kicker);
    translate(line, nextFrame.line);
    translate(emphasis, nextFrame.emphasis);
    translate(caption, nextFrame.caption);
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => copy?.classList.add('is-visible')));
  };

  const renderScene = index => {
    if (index < 0 || index >= scenes.length || dismissed || complete) return;
    const scene = scenes[index];
    const token = ++playbackToken;
    currentSceneIndex = index;
    currentFrameIndex = -1;
    const keepPrimedFirstVideo = index === 0 && video?.getAttribute('src') === scenes[0].src;
    if (!keepPrimedFirstVideo) stopVideo();

    opening.classList.remove('is-final', 'is-intertitle', 'is-suspense', 'is-dominium-reveal', 'is-tick-sequence', 'is-tick-pulse', 'is-transformation', 'is-hades-impact');
    opening.classList.add('is-cinematic');
    stage.classList.remove('is-final-image', 'is-intertitle', 'is-video', 'is-infected-wing');
    if (scene.kind === 'title') {
      opening.classList.add('is-intertitle');
      stage.classList.add('is-intertitle');
    }
    if (scene.kind === 'image') stage.classList.add('is-final-image');
    if (scene.kind === 'video') stage.classList.add('is-video');
    if (scene.effect === 'infected-wing') stage.classList.add('is-infected-wing');

    if (gate) gate.hidden = true;
    if (copy) copy.hidden = false;
    if (finalCard) finalCard.hidden = true;
    if (skipButton) skipButton.hidden = false;
    if (progressCount) {
      const label = window.DD_I18N_DICTIONARIES?.[locale()]?.['dominium.opening.progress.record'] || 'RECORD';
      progressCount.textContent = label + ' // ' + String(index + 1).padStart(2, '0') + ' / ' + String(scenes.length).padStart(2, '0');
    }

    const offset = performance.now() - startedAt - sceneStartAt(index);
    const selectedFrame = scene.frames.reduce((selected, item, frameIndex) => {
      return item.at * scene.duration <= offset ? frameIndex : selected;
    }, 0);
    currentFrameIndex = selectedFrame;
    revealFrame(scene.frames[selectedFrame]);

    if (scene.kind === 'image') void showStill(scene.src, token);
    if (scene.kind === 'video') void showVideo(scene, token);
  };

  const setSoundtrackVolume = value => {
    soundtrackVolume = Math.max(0, Math.min(100, value));
    try { soundtrackWidget?.setVolume(soundtrackVolume); } catch (error) {}
  };

  const fadeSoundtrackTo = (target, duration) => {
    window.clearInterval(soundtrackFadeTimer);
    if (!soundtrackWidget || duration <= 0) {
      setSoundtrackVolume(target);
      return;
    }
    const initial = soundtrackVolume;
    const steps = Math.max(1, Math.ceil(duration / 70));
    let step = 0;
    soundtrackFadeTimer = window.setInterval(() => {
      step += 1;
      setSoundtrackVolume(initial + ((target - initial) * step / steps));
      if (step >= steps) {
        window.clearInterval(soundtrackFadeTimer);
        soundtrackFadeTimer = 0;
      }
    }, duration / steps);
  };

  const targetVolumeAt = elapsed => {
    if (elapsed >= TRACK.fadeAt) return 0;
    if (elapsed >= TRACK.muteAt && elapsed < TRACK.returnAt) return 0;
    return TRACK.volume;
  };

  const attemptSoundtrackPlay = () => {
    soundtrackRequested = true;
    if (!soundtrackWidget) return;
    const elapsed = startedAt ? performance.now() - startedAt : 0;
    setSoundtrackVolume(targetVolumeAt(elapsed));
    try { soundtrackWidget.seekTo(0); } catch (error) {}
    // Issue playback in the click gesture; READY will retry if the widget was still loading.
    try { soundtrackWidget.play(); } catch (error) {}
  };

  const handleSoundtrackReady = () => {
    if (soundtrackReady) return;
    soundtrackReady = true;
    const elapsed = startedAt ? performance.now() - startedAt : 0;
    setSoundtrackVolume(targetVolumeAt(elapsed));
    if (soundtrackRequested && !soundtrackStarted) {
      try { soundtrackWidget.seekTo(0); } catch (error) {}
      try { soundtrackWidget.play(); } catch (error) {}
    }
  };

  const bindSoundtrack = () => {
    if (soundtrackBound || !soundtrackFrame || !window.SC?.Widget) return false;
    try {
      soundtrackWidget = window.SC.Widget(soundtrackFrame);
      soundtrackBound = true;
      const events = window.SC.Widget.Events;
      soundtrackWidget.bind(events.READY, handleSoundtrackReady);
      if (events.PLAY) soundtrackWidget.bind(events.PLAY, () => {
        soundtrackStarted = true;
        if (!soundtrackRequested) {
          try { soundtrackWidget.pause(); } catch (error) {}
        }
      });
      if (events.ERROR) soundtrackWidget.bind(events.ERROR, () => {});
      // Catch the case where the iframe became ready just before its READY listener was bound.
      try {
        soundtrackWidget.getDuration(duration => {
          if (Number.isFinite(Number(duration)) && Number(duration) > 0) handleSoundtrackReady();
        });
      } catch (error) {}
      return true;
    } catch (error) {
      soundtrackWidget = null;
      soundtrackBound = false;
      return false;
    }
  };

  const enterSuspense = () => {
    if (suspenseEntered || complete || dismissed) return;
    suspenseEntered = true;
    currentSceneIndex = scenes.length;
    currentFrameIndex = -1;
    const token = ++playbackToken;
    stopVideo();
    opening.classList.remove('is-cinematic', 'is-intertitle', 'is-hades-impact', 'is-dominium-reveal', 'is-tick-sequence', 'is-tick-pulse', 'is-transformation');
    opening.classList.add('is-final', 'is-suspense');
    stage.classList.remove('is-intertitle', 'is-video', 'is-connecting', 'is-infected-wing');
    stage.classList.add('is-final-image');
    if (copy) copy.hidden = true;
    if (finalCard) finalCard.hidden = false;
    if (finalTitle) finalTitle.hidden = true;
    if (finalPrefix) finalPrefix.hidden = true;
    if (finalWord) finalWord.textContent = '';
    if (enterButton) enterButton.hidden = true;
    if (finalHint) finalHint.hidden = true;
    if (skipButton) skipButton.hidden = false;
    translate(finalKicker, 'dominium.opening.final.suspense.kicker');
    translate(finalCopy, 'dominium.opening.final.suspense.copy');
    translate(live, 'dominium.opening.final.silence');
    void showStill('img-dominus/intro/stills/intro-still-03-containment-vessel.png', token);
  };

  const showTransformationFrame = index => {
    if (index < 0 || index >= TRANSFORMATION.frames.length || dismissed || complete) return;
    if (currentMontageIndex === index) return;
    currentMontageIndex = index;
    opening.classList.add('is-transformation');
    stage.classList.add('is-final-image');
    void showStill(TRANSFORMATION.frames[index], playbackToken);
  };

  const enterCountdown = () => {
    if (countdownEntered || complete || dismissed) return;
    countdownEntered = true;
    currentTickIndex = -1;
    if (finalCard) finalCard.hidden = false;
    if (finalTitle) finalTitle.hidden = false;
    if (finalPrefix) finalPrefix.hidden = true;
    translate(finalKicker, 'dominium.opening.final.countdown.kicker');
    translate(finalCopy, 'dominium.opening.final.countdown.copy');
    translate(live, 'dominium.opening.final.clock');
    opening.classList.add('is-tick-sequence');
  };

  const updateCountdown = elapsed => {
    const tickIndex = Math.min(tickWords.length - 1, Math.floor((elapsed - TRACK.returnAt) / 2000));
    if (tickIndex === currentTickIndex || tickIndex < 0) return;
    currentTickIndex = tickIndex;
    if (finalWord) {
      finalWord.textContent = tickWords[tickIndex];
      finalWord.classList.remove('is-tick-hit');
      void finalWord.offsetWidth;
      finalWord.classList.add('is-tick-hit');
    }
    opening.classList.remove('is-tick-pulse');
    void opening.offsetWidth;
    opening.classList.add('is-tick-pulse');
  };

  const stopSoundtrack = () => {
    window.clearInterval(soundtrackFadeTimer);
    soundtrackFadeTimer = 0;
    setSoundtrackVolume(0);
    try { soundtrackWidget?.pause(); } catch (error) {}
  };

  const finishOpening = () => {
    if (complete || dismissed) return;
    complete = true;
    window.clearInterval(timelineTimer);
    timelineTimer = 0;
    stopSoundtrack();
    stopVideo();
    opening.classList.remove('is-cinematic', 'is-intertitle', 'is-suspense', 'is-tick-sequence', 'is-tick-pulse', 'is-transformation', 'is-hades-impact');
    opening.classList.add('is-final', 'is-dominium-reveal');
    stage.classList.remove('is-intertitle', 'is-video', 'is-infected-wing');
    stage.classList.add('is-final-image');
    if (finalCard) finalCard.hidden = false;
    if (finalTitle) finalTitle.hidden = false;
    if (finalPrefix) {
      finalPrefix.hidden = false;
      translate(finalPrefix, 'dominium.opening.final.brand');
    }
    if (finalWord) finalWord.textContent = 'DOMINIUM';
    translate(finalKicker, 'dominium.opening.final.kicker');
    translate(finalCopy, 'dominium.opening.final.copy');
    translate(live, 'dominium.opening.final.status');
    if (enterButton) enterButton.hidden = false;
    if (finalHint) finalHint.hidden = false;
    if (skipButton) skipButton.hidden = true;
    if (!suspenseEntered) {
      const token = ++playbackToken;
      void showStill('img-dominus/intro/stills/intro-still-03-containment-vessel.png', token);
    }
    if (progressBar) progressBar.style.width = '100%';
  };

  const updateTimeline = () => {
    if (!startedAt || complete || dismissed) return;
    const elapsed = Math.max(0, performance.now() - startedAt);

    if (elapsed < preludeDuration) {
      let index = 0;
      while (index + 1 < scenes.length && elapsed >= sceneStartAt(index + 1)) index += 1;
      if (index !== currentSceneIndex) renderScene(index);
      const scene = scenes[index];
      const localElapsed = elapsed - sceneStartAt(index);
      const nextFrameIndex = scene.frames.reduce((selected, item, frameIndex) => {
        return item.at * scene.duration <= localElapsed ? frameIndex : selected;
      }, 0);
      if (nextFrameIndex !== currentFrameIndex) {
        currentFrameIndex = nextFrameIndex;
        revealFrame(scene.frames[nextFrameIndex]);
      }
    } else if (elapsed < TRACK.returnAt) {
      if (!suspenseEntered) enterSuspense();
      if (elapsed >= TRANSFORMATION.beginsAt) {
        const index = Math.floor((elapsed - TRANSFORMATION.beginsAt) / TRANSFORMATION.frameEvery);
        showTransformationFrame(Math.min(index, TRANSFORMATION.frames.length - 1));
      }
    } else if (elapsed < TRACK.endAt) {
      if (!suspenseEntered) enterSuspense();
      if (!countdownEntered) enterCountdown();
      updateCountdown(elapsed);
    } else {
      finishOpening();
    }

    if (elapsed >= TRACK.fadeAt && soundtrackCue !== 'ending') {
      soundtrackCue = 'ending';
      fadeSoundtrackTo(0, TRACK.fadeOut);
    } else if (elapsed >= TRACK.returnAt && soundtrackCue !== 'return') {
      soundtrackCue = 'return';
      fadeSoundtrackTo(TRACK.volume, TRACK.fadeIn);
    } else if (elapsed >= TRACK.muteAt && soundtrackCue !== 'muted') {
      soundtrackCue = 'muted';
      fadeSoundtrackTo(0, TRACK.fadeOut);
    }

    if (progressBar) progressBar.style.width = Math.min(100, elapsed / TRACK.endAt * 100) + '%';
  };

  const startOpening = () => {
    if (startedAt || complete || dismissed) return;
    startedAt = performance.now();
    opening.classList.remove('is-gate');
    opening.classList.add('is-cinematic');
    document.body.classList.add('dominium-opening-active');
    if (gate) gate.hidden = true;
    if (skipButton) skipButton.hidden = false;
    translate(live, 'dominium.opening.playing');

    // This is called synchronously from the visitor's click/Enter gesture.
    bindSoundtrack();
    attemptSoundtrackPlay();
    updateTimeline();
    timelineTimer = window.setInterval(updateTimeline, 80);
  };

  const finishEarly = () => {
    if (!startedAt || complete) return;
    finishOpening();
  };

  const dismissOpening = () => {
    if (dismissed) return;
    dismissed = true;
    window.clearInterval(timelineTimer);
    window.clearInterval(soundtrackFadeTimer);
    stopVideo();
    stopSoundtrack();
    document.body.classList.remove('dominium-opening-active');
    opening.classList.add('dismissed');
    window.setTimeout(() => opening.remove(), reducedMotion ? 0 : 650);
    document.querySelector('.dominium-topbar')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    document.querySelector('.dominium-brand')?.focus({ preventScroll: true });
  };

  const handleKeydown = event => {
    if (dismissed) return;
    if (event.key === 'Escape' && startedAt && !complete) {
      event.preventDefault();
      finishEarly();
      return;
    }
    if (event.key !== 'Enter' || event.target.closest?.('button,a,input,textarea,select,[contenteditable="true"]')) return;
    if (complete) {
      event.preventDefault();
      dismissOpening();
    } else if (!startedAt) {
      event.preventDefault();
      startOpening();
    }
  };

  const watchSoundcloudApi = () => {
    if (bindSoundtrack()) return;
    soundcloudApi?.addEventListener('load', bindSoundtrack, { once: true });
    const poll = window.setInterval(() => {
      if (bindSoundtrack()) window.clearInterval(poll);
    }, 250);
    window.setTimeout(() => window.clearInterval(poll), 20000);
  };

  // Preload the stills while the visitor reads the gate to avoid black transitions.
  preloadOpeningImages();
  primeInitialVideo();
  watchSoundcloudApi();
  document.body.classList.add('dominium-opening-active');
  startButton.addEventListener('click', startOpening);
  skipButton?.addEventListener('click', finishEarly);
  enterButton?.addEventListener('click', dismissOpening);
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') updateTimeline();
  });
})();
