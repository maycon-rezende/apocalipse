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

  document.querySelectorAll('[data-dominium-locale]').forEach(button => {
    button.addEventListener('click', () => {
      window.DoomsdayI18n?.setLocale(button.dataset.dominiumLocale);
      const activeStage = document.querySelector('[data-infection-stage][aria-pressed="true"]');
      const stageImage = document.getElementById('infection-stage-image');
      const stageCaption = document.getElementById('infection-stage-caption');
      if (activeStage && stageImage && stageCaption) {
        stageImage.alt = window.DoomsdayI18n?.t(activeStage.dataset.stageAltKey) || stageImage.alt;
        stageCaption.textContent = window.DoomsdayI18n?.t(activeStage.dataset.stageTitleKey) || stageCaption.textContent;
      }
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

  document.querySelectorAll('[data-infection-stage]').forEach(button => {
    button.addEventListener('click', () => {
      const stageImage = document.getElementById('infection-stage-image');
      const stageCaption = document.getElementById('infection-stage-caption');
      if (!stageImage || !stageCaption) return;
      document.querySelectorAll('[data-infection-stage]').forEach(item => {
        item.setAttribute('aria-pressed', String(item === button));
      });
      stageImage.src = button.dataset.stageImage;
      stageImage.alt = window.DoomsdayI18n?.t(button.dataset.stageAltKey) || '';
      stageCaption.textContent = window.DoomsdayI18n?.t(button.dataset.stageTitleKey) || '';
    });
  });

})();
