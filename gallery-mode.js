(function(){
  if(window.DD_ANALOG_MODE)return;
  document.body.classList.add('gallery-original-mode');
  document.querySelectorAll('.family-player,.tape-reels,.temporal-console').forEach(element=>element.remove());
  document.querySelectorAll('.family-lane').forEach(lane=>{const openLabel=lane.querySelector('.lane-open');if(openLabel)openLabel.textContent='ABRIR NÚCLEO →'});
  const style=document.createElement('style');
  style.textContent=`.gallery-original-mode .family-lane{border-radius:0;background:var(--panel);box-shadow:none}.gallery-original-mode .family-lane .lane-code::before,.gallery-original-mode .family-lane::after{content:none!important}.gallery-original-mode .lane-preview::after{content:'ABRIR ARQUIVO'}.gallery-original-mode .family-player,.gallery-original-mode .tape-reels,.gallery-original-mode .temporal-console{display:none!important}`;
  document.head.appendChild(style);
  const params=new URLSearchParams(location.search),family=params.get('familia'),themes={bradock:'familym.mp3',hanson:'familyhanson.mp3',jordan:'vidas-paralelas.mp3'},source=family?themes[family]:'vidas-paralelas.mp3';
  if(!source)return;
  const music=new Audio(`audio/${source}`);music.loop=true;music.preload='auto';music.volume=.38;
  const play=()=>music.play().catch(()=>{});play();document.addEventListener('pointerdown',play,{once:true});document.addEventListener('keydown',play,{once:true});addEventListener('pagehide',()=>music.pause(),{once:true});
})();
