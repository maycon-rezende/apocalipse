(function(){
  const STORAGE_KEY='dd_experience_mode_v1';
  let storedMode='original';try{storedMode=localStorage.getItem(STORAGE_KEY)||'original'}catch(error){}
  const enabled=storedMode==='analog';
  window.DD_ANALOG_MODE=enabled;
  document.documentElement.classList.add(enabled?'analog-experience':'original-experience');

  function applyMode(next,reload=true){
    try{localStorage.setItem(STORAGE_KEY,next?'analog':'original')}catch(error){}
    window.DD_ANALOG_MODE=next;
    document.documentElement.classList.toggle('analog-experience',next);
    document.documentElement.classList.toggle('original-experience',!next);
    if(reload)location.reload();
  }

  function mountControls(){
    const pageName=location.pathname.split('/').pop().toLowerCase(),isOpeningPage=pageName==='home.html'||pageName==='index.html';
    if(!enabled){
      if(!isOpeningPage){document.body.style.overflow='';document.body.classList.remove('locked')}
      document.querySelectorAll('.personnel-intro,.personnel-hud,.personnel-alert,.subject-tape,.subject-hud,.subject-corruption,.gallery-intro,.family-entry,.memory-frame,.memory-tracking,.memory-hud,.memory-anomaly').forEach(element=>element.remove());
      ['gallery-intro-theme','parallel-theme'].forEach(id=>document.getElementById(id)?.pause());
    }
    const homeControl=document.getElementById('experience-switch');
    if(homeControl){
      homeControl.setAttribute('aria-pressed',String(enabled));
      homeControl.querySelector('[data-experience-title]').textContent=enabled?'TRANSMISSÃO CORROMPIDA ATIVA':'ACESSAR TRANSMISSÃO CORROMPIDA';
      homeControl.querySelector('[data-experience-copy]').textContent=enabled?'Retornar ao arquivo original':'Iniciar experiência Analog Horror';
      homeControl.addEventListener('click',()=>{
        const nextMode=!enabled;
        homeControl.disabled=true;homeControl.setAttribute('aria-busy','true');
        document.body.classList.add('experience-changing');
        document.dispatchEvent(new CustomEvent('dd:experience-changing',{detail:{analog:nextMode}}));
        const delay=nextMode?Number(document.body.dataset.experienceEnterMs)||650:Number(document.body.dataset.experienceExitMs)||650;
        setTimeout(()=>applyMode(nextMode),delay);
      });
    }

    if(pageName!=='home.html'&&pageName!=='index.html'&&pageName!==''){
      const toggle=document.createElement('button');
      toggle.type='button';
      toggle.className='experience-corner-toggle';
      toggle.setAttribute('aria-label',enabled?'Sair da experiência Analog Horror':'Ativar experiência Analog Horror');
      toggle.innerHTML=`<span>${enabled?'SINAL CORROMPIDO':'ARQUIVO ORIGINAL'}</span><b>${enabled?'DESATIVAR':'ATIVAR HORROR'}</b>`;
      toggle.addEventListener('click',()=>applyMode(!enabled));
      document.body.appendChild(toggle);
    }

    const transmissionStyle=document.createElement('style');
    transmissionStyle.textContent=`.global-corrupt-transmission{position:fixed;z-index:4900;left:50%;top:48%;width:min(720px,88vw);padding:.65rem 1rem;border-block:1px solid #742029;background:linear-gradient(90deg,transparent,rgba(3,3,3,.94) 12% 88%,transparent);color:#bfc0b8;text-align:center;opacity:0;visibility:hidden;pointer-events:none;transform:translate(-50%,-50%);text-shadow:2px 0 #451017,-2px 0 #123b40}.global-corrupt-transmission small,.global-corrupt-transmission strong,.global-corrupt-transmission span{display:block}.global-corrupt-transmission small{color:#8b353c;font:.78rem 'VT323',monospace;letter-spacing:.17em}.global-corrupt-transmission strong{margin:.2rem 0;color:#d6d4c9;font:clamp(1rem,2.6vw,1.35rem) 'VT323',monospace;letter-spacing:.12em}.global-corrupt-transmission span{color:#5e5e58;font:.7rem 'Courier Prime',monospace;letter-spacing:.16em}.global-corrupt-transmission.visible{visibility:visible;animation:corrupt-transmission 1.15s steps(2) forwards}.analog-experience .global-corrupt-transmission{border-color:#a51d29;filter:contrast(1.15)}@keyframes corrupt-transmission{0%{opacity:0;transform:translate(-52%,-50%) scaleY(.05)}8%{opacity:.92;transform:translate(-48%,-50%) scaleY(1)}15%{opacity:.3;clip-path:inset(18% 0 47% 0)}22%,72%{opacity:.94;clip-path:inset(0)}35%{transform:translate(-50%,-50%) skewX(-2deg)}48%{opacity:.55;clip-path:inset(61% 0 8% 0)}58%{opacity:.95;clip-path:inset(0)}82%{opacity:.75;transform:translate(-49%,-50%) scaleY(1)}100%{opacity:0;visibility:hidden;transform:translate(-50%,-50%) scaleY(.08)}}@media(prefers-reduced-motion:reduce){.global-corrupt-transmission.visible{animation:corrupt-transmission-reduced 2.8s ease forwards}@keyframes corrupt-transmission-reduced{0%,100%{opacity:0}15%,85%{opacity:.9}}}`;
    document.head.appendChild(transmissionStyle);
    const transmission=document.createElement('aside');
    transmission.className='global-corrupt-transmission';
    transmission.setAttribute('aria-live',enabled?'polite':'off');
    transmission.setAttribute('aria-atomic','true');
    transmission.innerHTML='<small>TRANSMISSÃO NÃO SOLICITADA // CANAL --</small><strong></strong><span>SINAL INSTÁVEL</span>';
    document.body.appendChild(transmission);
    const messages=enabled?['ESTA FITA NÃO CONSTAVA NO ARQUIVO ORIGINAL','ALGUÉM CONTINUA TRANSMITINDO DEPOIS DA QUEDA','O HORÁRIO DESTE REGISTRO FOI SOBRESCRITO','NÃO CONFIE EM TODAS AS IMAGENS RECUPERADAS','UM SINAL FOI DETECTADO ENTRE OS NÚCLEOS']:['INTERFERÊNCIA EXTERNA DETECTADA','FRAGMENTO DE TRANSMISSÃO NÃO IDENTIFICADO','O ARQUIVO ORIGINAL RECEBEU UM SINAL','ORIGEM DA MENSAGEM // DESCONHECIDA'];
    let messageIndex=Math.floor(Math.random()*messages.length),transmissionTimer=null;
    const showTransmission=()=>{if(document.body.classList.contains('locked')||document.body.style.overflow==='hidden'||document.querySelector('[aria-modal="true"].open'))return;transmission.querySelector('strong').textContent=messages[messageIndex++%messages.length];transmission.querySelector('small').textContent=`TRANSMISSÃO NÃO SOLICITADA // CANAL ${String(13+(messageIndex*7)%80).padStart(2,'0')}`;transmission.classList.remove('visible');void transmission.offsetWidth;transmission.classList.add('visible')};
    const scheduleTransmission=()=>{clearTimeout(transmissionTimer);const base=enabled?10500:19000,variation=enabled?7000:11000;transmissionTimer=setTimeout(()=>{showTransmission();scheduleTransmission()},base+Math.random()*variation)};
    scheduleTransmission();document.addEventListener('visibilitychange',()=>{if(document.hidden)clearTimeout(transmissionTimer);else scheduleTransmission()});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mountControls,{once:true});
  else mountControls();
  window.DoomsdayExperience={enabled,set:applyMode};
})();
