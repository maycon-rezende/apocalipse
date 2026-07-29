(function(){
  const theme=document.getElementById('history-theme');
  if(theme){
    theme.volume=.38;
    const playTheme=()=>theme.play().catch(()=>{});
    playTheme();
    document.addEventListener('pointerdown',playTheme,{once:true});
    document.addEventListener('keydown',playTheme,{once:true});
  }

  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems=[...document.querySelectorAll('.story-reveal')];
  if(reducedMotion||!('IntersectionObserver' in window)){
    revealItems.forEach(item=>item.classList.add('is-visible'));
  }else{
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
      });
    },{threshold:.06,rootMargin:'0px 0px -8%'});
    revealItems.forEach(item=>observer.observe(item));
  }

  const tabs=[...document.querySelectorAll('.perspective-tab')];
  const readers=[...document.querySelectorAll('.perspective-reader')];
  const selectPerspective=(key,{focus=false,scroll=false}={})=>{
    const tab=tabs.find(item=>item.dataset.perspective===key);
    const reader=readers.find(item=>item.dataset.reader===key);
    if(!tab||!reader)return;
    tabs.forEach(item=>{
      const selected=item===tab;
      item.classList.toggle('active',selected);
      item.setAttribute('aria-selected',String(selected));
      item.tabIndex=selected?0:-1;
    });
    readers.forEach(item=>{item.hidden=item!==reader});
    if(focus)tab.focus();
    if(scroll)document.getElementById('perspectivas')?.scrollIntoView({behavior:reducedMotion?'auto':'smooth',block:'start'});
    try{sessionStorage.setItem('dd_history_perspective',key)}catch(error){}
  };

  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>selectPerspective(tab.dataset.perspective));
    tab.addEventListener('keydown',event=>{
      let next=null;
      if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%tabs.length;
      if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+tabs.length)%tabs.length;
      if(event.key==='Home')next=0;
      if(event.key==='End')next=tabs.length-1;
      if(next===null)return;
      event.preventDefault();selectPerspective(tabs[next].dataset.perspective,{focus:true});
    });
  });

  document.querySelectorAll('[data-reader-toggle]').forEach(button=>{
    button.addEventListener('click',()=>{
      const target=document.getElementById(button.dataset.readerToggle);
      if(!target)return;
      const opening=target.hidden;
      target.hidden=!opening;
      button.setAttribute('aria-expanded',String(opening));
      button.classList.toggle('is-open',opening);
      button.querySelector('b').textContent=opening?'−':'+';
      button.querySelector('span').textContent=opening?'Recolher trecho':button.dataset.readerToggle.startsWith('hanson')?'Abrir registro da Avenida Taylor':'Continuar trecho disponível';
      if(opening&&!reducedMotion)target.animate([{opacity:0,transform:'translateY(-8px)'},{opacity:1,transform:'none'}],{duration:420,easing:'ease-out'});
    });
  });

  document.querySelectorAll('[data-open-perspective]').forEach(button=>{
    button.addEventListener('click',()=>selectPerspective(button.dataset.openPerspective,{scroll:true}));
  });

  try{
    const saved=sessionStorage.getItem('dd_history_perspective');
    if(saved&&tabs.some(tab=>tab.dataset.perspective===saved))selectPerspective(saved);
  }catch(error){}

  const clock=document.querySelector('.signal-clock');
  let seconds=0;
  let clockTimer=null;
  if(clock&&window.DD_ANALOG_MODE){
    clockTimer=setInterval(()=>{
      seconds+=1;
      const hh=String(Math.floor(seconds/3600)).padStart(2,'0');
      const mm=String(Math.floor(seconds%3600/60)).padStart(2,'0');
      const ss=String(seconds%60).padStart(2,'0');
      clock.textContent=`${hh}:${mm}:${ss}`;
    },1000);
  }

  const corruption=document.querySelector('.story-corruption');
  let corruptionTimer=null;
  if(corruption&&window.DD_ANALOG_MODE&&!reducedMotion){
    const messages=['O TERCEIRO RELÓGIO AINDA NÃO FOI RECUPERADO','ESTE CAPÍTULO TERMINA EM MAIS DE UM LUGAR','O ÁUDIO DA AVENIDA TAYLOR NÃO ESTAVA NO ARQUIVO','CINCO AERONAVES // UM ÚNICO TRAJETO','TRECHO SEGUINTE AINDA ESTÁ SENDO ESCRITO'];
    let index=0;
    const schedule=()=>{
      clearTimeout(corruptionTimer);
      corruptionTimer=setTimeout(()=>{
        if(!document.hidden&&document.body.style.overflow!=='hidden'){
          corruption.querySelector('strong').textContent=messages[index++%messages.length];
          corruption.classList.remove('visible');void corruption.offsetWidth;corruption.classList.add('visible');
        }
        schedule();
      },8500+Math.random()*6500);
    };
    schedule();
  }

  addEventListener('pagehide',()=>{clearInterval(clockTimer);clearTimeout(corruptionTimer)},{once:true});
})();
