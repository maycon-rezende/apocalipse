(function(){
  document.body.classList.add('home-experience-transition');
  const reducedMotion=matchMedia('(prefers-reduced-motion:reduce)').matches;
  document.body.dataset.experienceEnterMs=reducedMotion?'1200':'4700';
  document.body.dataset.experienceExitMs=reducedMotion?'900':'2200';
  const transitionGuard=document.createElement('style');transitionGuard.textContent='.home-experience-transition.experience-changing::after{display:none!important}.experience-switch[aria-hidden="true"]{pointer-events:none}.restoring .home-mode-log i:nth-child(1){animation-delay:.3s}.restoring .home-mode-log i:nth-child(2){animation-delay:.6s}.restoring .home-mode-log i:nth-child(3){animation-delay:.9s}.restoring .home-mode-log i:nth-child(4){animation-delay:1.2s}.analog-experience body:not(.home-ready) .title-wrap{animation:none!important;transform:none!important}.analog-experience body:not(.home-ready) .analog-home-hud,.analog-experience body:not(.home-ready) .home-mode-status{opacity:0}';document.head.appendChild(transitionGuard);
  const transition=document.createElement('div');
  transition.className='home-mode-transition';
  transition.setAttribute('role','status');
  transition.setAttribute('aria-live','assertive');
  transition.innerHTML=`<i class="home-mode-transition__tear" style="--tear-y:18%;--tear-h:32px;--tear-x:-8%;--tear-delay:.4s"></i><i class="home-mode-transition__tear" style="--tear-y:54%;--tear-h:46px;--tear-x:11%;--tear-delay:1.1s"></i><i class="home-mode-transition__tear" style="--tear-y:78%;--tear-h:24px;--tear-x:-5%;--tear-delay:1.8s"></i><div class="home-mode-transition__panel"><span class="home-mode-transition__code">SINAL ALTERNATIVO // AGUARDANDO</span><h2>Transmissão corrompida</h2><p>O arquivo oficial será substituído temporariamente por uma cópia recuperada.</p><div class="home-mode-log"><i>&gt; INTERCEPTANDO FREQUÊNCIA NÃO CATALOGADA...</i><i>&gt; SOBRESCREVENDO ÍNDICE VISUAL...</i><i>&gt; SINCRONIZANDO REGISTROS INCOMPATÍVEIS...</i><i>&gt; NÃO CONFIE EM TODAS AS IMAGENS.</i></div><div class="home-mode-progress"><i></i></div></div><div class="home-mode-transition__flash"></div>`;
  document.body.appendChild(transition);

  document.addEventListener('dd:experience-changing',event=>{
    const activating=Boolean(event.detail?.analog),code=transition.querySelector('.home-mode-transition__code'),title=transition.querySelector('h2'),copy=transition.querySelector('p'),lines=transition.querySelectorAll('.home-mode-log i');
    transition.classList.remove('activating','restoring');transition.classList.add('active',activating?'activating':'restoring');
    code.textContent=activating?'SINAL ALTERNATIVO // INVASÃO EM CURSO':'ARQUIVO PRIMÁRIO // RESTAURAÇÃO EM CURSO';
    title.textContent=activating?'Transmissão corrompida':'Restaurando arquivo';
    copy.textContent=activating?'O arquivo oficial está sendo substituído por uma cópia recuperada.':'Removendo interferências e reconstruindo a versão oficial.';
    if(!activating){lines[0].textContent='> ISOLANDO FREQUÊNCIA ALTERNATIVA...';lines[1].textContent='> REMOVENDO CAMADAS CORROMPIDAS...';lines[2].textContent='> RESTAURANDO ÍNDICE VISUAL...';lines[3].textContent='> ARQUIVO ORIGINAL LOCALIZADO.'}
  });

  if(!window.DD_ANALOG_MODE)return;
  const hud=document.createElement('div');hud.className='analog-home-hud';hud.setAttribute('aria-hidden','true');hud.innerHTML='<span class="ah-rec">REC // MIRROR FEED</span><span class="ah-time"><b>00:00:00</b><br>DD-HOME // COPY 02</span><span class="ah-source">UNVERIFIED TRANSMISSION // SIGNAL 31%</span>';document.body.appendChild(hud);
  const status=document.createElement('div');status.className='home-mode-status';status.textContent='TRANSMISSÃO ALTERNATIVA SINCRONIZADA';document.body.appendChild(status);
  const tear=document.createElement('div');tear.className='home-signal-tear';tear.setAttribute('aria-hidden','true');document.body.appendChild(tear);
  const compact=matchMedia('(max-width:800px)').matches,navLabels=[['historia.html',compact?'01 // HISTÓRIA':'SETOR 01 // HISTÓRIA','História — setor 01'],['personagens.html',compact?'02 // PESSOAL':'SETOR 02 // PESSOAL','Personagens — setor 02'],['ameaca.html',compact?'03 // AMEAÇA':'SETOR 03 // AMEAÇA','Ameaça — setor 03'],['projeto-doom.html',compact?'?? // DOOM':'SETOR ?? // DOOM','Projeto DOOM — setor não identificado'],['galeria.html',compact?'04 // GALERIA':'SETOR 04 // GALERIA','Galeria — setor 04']];navLabels.forEach(([href,label,accessible])=>{const link=document.querySelector(`nav a[href="${href}"]`);if(link){link.textContent=label;link.setAttribute('aria-label',accessible)}});
  let seconds=0,tearTimer=null;const counter=hud.querySelector('b');setInterval(()=>{seconds++;counter.textContent=`${String(Math.floor(seconds/3600)).padStart(2,'0')}:${String(Math.floor(seconds%3600/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`},1000);
  const scheduleTear=()=>{clearTimeout(tearTimer);tearTimer=setTimeout(()=>{if(!document.hidden&&!document.querySelector('[aria-modal="true"].open')&&document.body.style.overflow!=='hidden'){tear.style.top=`${18+Math.random()*64}%`;tear.classList.remove('visible');void tear.offsetWidth;tear.classList.add('visible')}scheduleTear()},7200+Math.random()*7400)};scheduleTear();addEventListener('pagehide',()=>clearTimeout(tearTimer),{once:true});
})();
