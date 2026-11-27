(() => {
  'use strict';

  const lock = document.getElementById('dominium-access-lock');
  const app = document.getElementById('dominium-app');
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

  const brand = document.querySelector('.dominium-brand');
  if (brand) {
    const brandTitle = brand.querySelector('strong');
    if (brandTitle) brandTitle.textContent = 'DOMINIUM';
    brand.setAttribute('aria-label', 'DOMINIUM');
  }

  document.querySelectorAll('.dominium-footer > span:first-child').forEach(identity => {
    if (identity.textContent.includes('PROJECT DOOM')) {
      identity.dataset.i18n = 'dominium.footer.identity';
      window.DoomsdayI18n?.apply(identity);
    }
  });

  const navigation = document.querySelector('.dominium-nav');
  const navigationItems = [
    { href: 'dominium.html', page: 'home', key: 'dominium.nav.overview' },
    { href: 'dominium-organization.html', page: 'organization', key: 'dominium.nav.organization' },
    { href: 'dominium-complex.html', page: 'complex', key: 'dominium.nav.facilities' },
    { href: 'dominium-research.html', page: 'research', key: 'dominium.nav.research' },
    { href: 'dominium-infected.html', page: 'infected', key: 'dominium.nav.infected' },
    { href: 'dominium-personnel.html', page: 'personnel', key: 'dominium.nav.personnel' },
    { href: 'dominium-archives.html', page: 'archives', key: 'dominium.nav.archives' }
  ];

  if (navigation) {
    navigation.setAttribute('aria-label', window.DoomsdayI18n?.t('dominium.nav.aria') || 'Dominium navigation');
    navigation.dataset.i18nAttr = 'aria-label:dominium.nav.aria';
    const currentPage = document.body.dataset.dominiumPage;
    const activePage = currentPage === 'hades' ? 'complex' : currentPage;
    navigation.replaceChildren(...navigationItems.map(item => {
      const link = document.createElement('a');
      link.href = item.href;
      link.dataset.i18n = item.key;
      if (item.page === activePage) link.setAttribute('aria-current', 'page');
      return link;
    }));
    window.DoomsdayI18n?.apply(navigation);
  }

  const infectionCells = [...document.querySelectorAll('[data-infection-cell]')];
  const infectionStages = [...document.querySelectorAll('[data-infection-stage]')];
  const infectionSelectedCell = document.getElementById('infection-selected-cell');
  const infectionStatus = document.getElementById('infection-protocol-status');
  const infectionAdvance = document.querySelector('[data-infection-advance]');
  const infectionReset = document.querySelector('[data-infection-reset]');
  const infectionImage = document.getElementById('infection-stage-image');
  const infectionCaption = document.getElementById('infection-stage-caption');
  const infectionStageViewer = document.querySelector('.infection-stage-viewer');
  const infectionChannels = [...document.querySelectorAll('[data-infection-channel]')];
  const infectionInspectionCount = document.getElementById('infection-inspection-count');
  const infectionInspectionStatus = document.getElementById('infection-inspection-status');
  const infectionProgress = new Map();
  const infectionChannelSelection = new Map();
  const infectionChannelReads = new Map();
  let infectionFeedTimer = 0;
  let activeInfectionCell = infectionCells.find(button => button.getAttribute('aria-pressed') === 'true') || infectionCells[0] || null;

  const infectionTranslation = (key, variables) => window.DoomsdayI18n?.t(key, variables) || key;
  const getInfectionState = cell => {
    if (!cell) return null;
    const key = cell.dataset.cellCode || cell.dataset.panelSelector;
    if (!infectionProgress.has(key)) infectionProgress.set(key, { unlocked: 1, current: 1 });
    return infectionProgress.get(key);
  };

  const getInfectionCellCode = cell => cell?.dataset.cellCode || '—';
  const getInspectionReads = cell => {
    const key = getInfectionCellCode(cell);
    if (!infectionChannelReads.has(key)) infectionChannelReads.set(key, new Set());
    return infectionChannelReads.get(key);
  };

  const renderInfectionInspection = () => {
    if (!activeInfectionCell) return;
    const cellCode = getInfectionCellCode(activeInfectionCell);
    const selection = infectionChannelSelection.get(cellCode);
    const reads = getInspectionReads(activeInfectionCell);
    infectionChannels.forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.infectionChannel === selection));
    });
    if (infectionInspectionCount) {
      infectionInspectionCount.textContent = infectionTranslation('dominium.infected.inspection.count', { read: reads.size, total: infectionChannels.length });
    }
    if (infectionInspectionStatus) {
      const selectedChannel = infectionChannels.find(button => button.dataset.infectionChannel === selection);
      const key = selectedChannel?.dataset.resultKey || 'dominium.infected.inspection.output.initial';
      infectionInspectionStatus.textContent = infectionTranslation(key, { cell: cellCode });
    }
  };

  const flashInfectionFeed = () => {
    if (!infectionStageViewer) return;
    window.clearTimeout(infectionFeedTimer);
    infectionStageViewer.classList.remove('is-transmitting');
    void infectionStageViewer.offsetWidth;
    infectionStageViewer.classList.add('is-transmitting');
    infectionFeedTimer = window.setTimeout(() => infectionStageViewer.classList.remove('is-transmitting'), 420);
  };

  const renderInfectionProgress = (withSignalCut = false) => {
    if (!activeInfectionCell || !infectionStages.length) return;
    const state = getInfectionState(activeInfectionCell);
    const currentStage = infectionStages.find(button => Number(button.dataset.stageIndex) === state.current) || infectionStages[0];
    const totalStages = infectionStages.length;
    const complete = state.unlocked >= totalStages;
    const cellCode = activeInfectionCell.dataset.cellCode || '—';

    infectionCells.forEach(button => {
      button.setAttribute('aria-pressed', String(button === activeInfectionCell));
    });
    if (infectionSelectedCell) infectionSelectedCell.textContent = cellCode;

    infectionStages.forEach(button => {
      const stageIndex = Number(button.dataset.stageIndex);
      const available = stageIndex <= state.unlocked;
      button.disabled = !available;
      button.setAttribute('aria-pressed', String(stageIndex === state.current));
      const stateLabel = button.querySelector('small');
      if (stateLabel) stateLabel.textContent = infectionTranslation(available ? 'dominium.infected.stage.access' : 'dominium.infected.stage.sealed');
    });

    if (infectionImage && currentStage) {
      infectionImage.src = currentStage.dataset.stageImage;
      infectionImage.alt = infectionTranslation(currentStage.dataset.stageAltKey);
    }
    if (infectionCaption && currentStage) infectionCaption.textContent = infectionTranslation(currentStage.dataset.stageTitleKey);
    if (infectionStatus) {
      infectionStatus.textContent = infectionTranslation(
        complete ? 'dominium.infected.protocol.status.complete' : 'dominium.infected.protocol.status.progress',
        {
          cell: cellCode,
          stage: String(state.current).padStart(2, '0'),
          unlocked: String(state.unlocked).padStart(2, '0'),
          total: String(totalStages).padStart(2, '0')
        }
      );
    }
    if (infectionAdvance) {
      infectionAdvance.disabled = complete;
      infectionAdvance.textContent = infectionTranslation(complete ? 'dominium.infected.protocol.complete' : 'dominium.infected.protocol.advance');
    }
    if (infectionReset) infectionReset.disabled = state.unlocked === 1 && state.current === 1;
    renderInfectionInspection();
    if (withSignalCut) flashInfectionFeed();
  };

  const selectInfectionCell = button => {
    if (!button) return;
    activeInfectionCell = button;
    getInfectionState(button);
    renderInfectionProgress(true);
  };

  infectionCells.forEach(button => button.addEventListener('click', () => selectInfectionCell(button)));
  infectionChannels.forEach(button => {
    button.addEventListener('click', () => {
      if (!activeInfectionCell) return;
      const cellCode = getInfectionCellCode(activeInfectionCell);
      infectionChannelSelection.set(cellCode, button.dataset.infectionChannel);
      getInspectionReads(activeInfectionCell).add(button.dataset.infectionChannel);
      renderInfectionInspection();
    });
  });
  if (infectionAdvance) {
    infectionAdvance.addEventListener('click', () => {
      const state = getInfectionState(activeInfectionCell);
      if (!state || state.unlocked >= infectionStages.length) return;
      state.unlocked += 1;
      state.current = state.unlocked;
      renderInfectionProgress(true);
    });
  }
  if (infectionReset) {
    infectionReset.addEventListener('click', () => {
      if (!activeInfectionCell) return;
      infectionProgress.set(activeInfectionCell.dataset.cellCode || activeInfectionCell.dataset.panelSelector, { unlocked: 1, current: 1 });
      renderInfectionProgress(true);
    });
  }
  infectionStages.forEach(button => {
    button.addEventListener('click', () => {
      const state = getInfectionState(activeInfectionCell);
      const selectedStage = Number(button.dataset.stageIndex);
      if (!state || selectedStage > state.unlocked) return;
      state.current = selectedStage;
      renderInfectionProgress(true);
    });
  });

  document.querySelectorAll('[data-dominium-locale]').forEach(button => {
    button.addEventListener('click', () => {
      window.DoomsdayI18n?.setLocale(button.dataset.dominiumLocale);
      renderInfectionProgress();
    });
  });

  document.querySelectorAll('[data-panel-selector]').forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.panelSelector;
      document.querySelectorAll('[data-panel-selector]').forEach(item => {
        item.setAttribute('aria-pressed', String(item === button));
      });
      document.querySelectorAll('[data-panel]').forEach(panel => {
        panel.hidden = panel.dataset.panel !== target;
      });
    });
  });

  document.querySelectorAll('[data-timeline-step]').forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.timelineStep;
      document.querySelectorAll('[data-timeline-step]').forEach(item => {
        item.setAttribute('aria-pressed', String(item === button));
      });
      document.querySelectorAll('[data-timeline-panel]').forEach(panel => {
        panel.hidden = panel.dataset.timelinePanel !== target;
      });
    });
  });

  const hadesEnter = document.querySelector('[data-hades-enter]');
  if (hadesEnter) {
    hadesEnter.addEventListener('click', () => {
      const arrival = document.getElementById('hades-arrival');
      const interior = document.getElementById('hades-interior');
      if (!arrival || !interior) return;
      arrival.classList.add('is-leaving');
      window.setTimeout(() => {
        arrival.hidden = true;
        interior.hidden = false;
        interior.focus();
      }, 520);
    });
  }

  const hadesSectorButtons = [...document.querySelectorAll('[data-hades-sector]')];
  const hadesSectorTitle = document.getElementById('hades-sector-title');
  const hadesSectorCopy = document.getElementById('hades-sector-copy');
  const hadesSectorOpen = document.getElementById('hades-sector-open');
  const hadesSectorReadout = document.getElementById('hades-sector-readout');
  const selectHadesSector = button => {
    if (!button || !hadesSectorTitle || !hadesSectorCopy || !hadesSectorOpen) return;
    hadesSectorButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    hadesSectorTitle.dataset.i18n = button.dataset.sectorTitle;
    hadesSectorCopy.dataset.i18n = button.dataset.sectorCopy;
    hadesSectorOpen.dataset.i18n = button.dataset.sectorAction;
    hadesSectorOpen.href = button.dataset.sectorHref;
    window.DoomsdayI18n?.apply(hadesSectorReadout || document);
  };

  hadesSectorButtons.forEach(button => {
    button.addEventListener('click', () => selectHadesSector(button));
  });
  selectHadesSector(hadesSectorButtons.find(button => button.getAttribute('aria-pressed') === 'true'));

  renderInfectionProgress();

})();
