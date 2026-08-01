(function(){
  const t=(key,variables,fallback)=>{
    if(!window.DoomsdayI18n)return fallback||key;
    const value=window.DoomsdayI18n.t(key,variables);
    return value===key&&fallback?fallback:value;
  };
  document.body.classList.add('home-experience-transition');
  const reducedMotion=matchMedia('(prefers-reduced-motion:reduce)').matches;
  document.body.dataset.experienceEnterMs=reducedMotion?'1200':'4700';
  document.body.dataset.experienceExitMs=reducedMotion?'900':'2200';
  const transitionGuard=document.createElement('style');transitionGuard.textContent='.home-experience-transition.experience-changing::after{display:none!important}.experience-switch[aria-hidden="true"]{pointer-events:none}.restoring .home-mode-log i:nth-child(1){animation-delay:.3s}.restoring .home-mode-log i:nth-child(2){animation-delay:.6s}.restoring .home-mode-log i:nth-child(3){animation-delay:.9s}.restoring .home-mode-log i:nth-child(4){animation-delay:1.2s}.analog-experience body:not(.home-ready) .title-wrap{animation:none!important;transform:none!important}.analog-experience body:not(.home-ready) .analog-home-hud,.analog-experience body:not(.home-ready) .home-mode-status{opacity:0}';document.head.appendChild(transitionGuard);
  const transition=document.createElement('div');
  transition.className='home-mode-transition';
  transition.setAttribute('role','status');
  transition.setAttribute('aria-live','assertive');
  transition.innerHTML=`<i class="home-mode-transition__tear" style="--tear-y:18%;--tear-h:32px;--tear-x:-8%;--tear-delay:.4s"></i><i class="home-mode-transition__tear" style="--tear-y:54%;--tear-h:46px;--tear-x:11%;--tear-delay:1.1s"></i><i class="home-mode-transition__tear" style="--tear-y:78%;--tear-h:24px;--tear-x:-5%;--tear-delay:1.8s"></i><div class="home-mode-transition__panel"><span class="home-mode-transition__code">${t('home.mode.waiting')}</span><h2>${t('home.mode.corrupted')}</h2><p>${t('home.mode.initialCopy')}</p><div class="home-mode-log"><i>${t('home.mode.activateLog.1')}</i><i>${t('home.mode.activateLog.2')}</i><i>${t('home.mode.activateLog.3')}</i><i>${t('home.mode.activateLog.4')}</i></div><div class="home-mode-progress"><i></i></div></div><div class="home-mode-transition__flash"></div>`;
  document.body.appendChild(transition);

  document.addEventListener('dd:experience-changing',event=>{
    const activating=Boolean(event.detail?.analog),code=transition.querySelector('.home-mode-transition__code'),title=transition.querySelector('h2'),copy=transition.querySelector('p'),lines=transition.querySelectorAll('.home-mode-log i');
    transition.classList.remove('activating','restoring');transition.classList.add('active',activating?'activating':'restoring');
    code.textContent=t(activating?'home.mode.activateCode':'home.mode.restoreCode');
    title.textContent=t(activating?'home.mode.corrupted':'home.mode.restoring');
    copy.textContent=t(activating?'home.mode.activateCopy':'home.mode.restoreCopy');
    const logMode=activating?'activateLog':'restoreLog';
    lines.forEach((line,index)=>{line.textContent=t(`home.mode.${logMode}.${index+1}`)});
  });

  const analogLabels=[
    [document.querySelector('nav .logo'),'analogLabel','home.mode.mirrorFeed'],
    [document.querySelector('.title-wrap'),'analogLabel','home.mode.titleAltered'],
    [document.querySelector('.tagline'),'analogPrefix','home.mode.recoveredTranscript'],
    [document.querySelector('.presidential-broadcast'),'analogLabel','home.mode.signalCopy'],
    [document.querySelector('.address-meta'),'analogTail','home.mode.divertedFeed'],
    [document.querySelector('.last-transmission'),'analogWarning','home.mode.channelWarning']
  ];
  analogLabels.forEach(([element,dataKey,key])=>{if(element)element.dataset[dataKey]=t(key)});
  document.querySelectorAll('.eyebrow').forEach(element=>{element.dataset.analogIndex=t('home.mode.alternateIndex')});

  if(!window.DD_ANALOG_MODE)return;
  const hud=document.createElement('div');hud.className='analog-home-hud';hud.setAttribute('aria-hidden','true');hud.innerHTML=`<span class="ah-rec">${t('home.mode.hudRec')}</span><span class="ah-time"><b>00:00:00</b><br>${t('home.mode.hudCopy')}</span><span class="ah-source">${t('home.mode.hudSource')}</span>`;document.body.appendChild(hud);
  const status=document.createElement('div');status.className='home-mode-status';status.textContent=t('home.mode.status');document.body.appendChild(status);
  const tear=document.createElement('div');tear.className='home-signal-tear';tear.setAttribute('aria-hidden','true');document.body.appendChild(tear);
  const compact=matchMedia('(max-width:1180px)').matches,navLabels=[['historia.html','history'],['personagens.html','characters'],['ameaca.html','threat'],['projeto-doom.html','doom'],['galeria.html','gallery']];navLabels.forEach(([href,key])=>{const link=document.querySelector(`nav a[href="${href}"]`);if(link){const textKey=`home.mode.nav.${key}${compact?'Compact':''}`,labelKey=`home.mode.nav.${key}Label`;link.dataset.i18n=textKey;link.dataset.i18nAttr=`aria-label:${labelKey}`;link.textContent=t(textKey);link.setAttribute('aria-label',t(labelKey))}});
  let seconds=0,tearTimer=null;const counter=hud.querySelector('b');setInterval(()=>{seconds++;counter.textContent=`${String(Math.floor(seconds/3600)).padStart(2,'0')}:${String(Math.floor(seconds%3600/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`},1000);
  const scheduleTear=()=>{clearTimeout(tearTimer);tearTimer=setTimeout(()=>{if(!document.hidden&&!document.querySelector('[aria-modal="true"].open')&&document.body.style.overflow!=='hidden'){tear.style.top=`${18+Math.random()*64}%`;tear.classList.remove('visible');void tear.offsetWidth;tear.classList.add('visible')}scheduleTear()},7200+Math.random()*7400)};scheduleTear();addEventListener('pagehide',()=>clearTimeout(tearTimer),{once:true});
})();
