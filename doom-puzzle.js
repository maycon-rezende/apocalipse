(()=>{
  const t=(key,variables,fallback)=>{if(!window.DoomsdayI18n)return fallback||key;const value=window.DoomsdayI18n.t(key,variables);return value===key&&fallback?fallback:value};
  const storageKey='dd_doom_fragments_v1';
  const page=location.pathname.split('/').pop().toLowerCase()||'home.html';
  const params=new URLSearchParams(location.search);
  const clues={
    'home.html':{id:'origin',fragment:'ANT',labelKey:'global.doom.originFragment',label:'Fragmento de origem',host:'.investigation-progress'},
    'personagens.html':{id:'integrity',fragment:'31',labelKey:'global.doom.integrityFragment',label:'Fragmento de integridade',host:'.dossier.featured'},
    'ameaca.html':{id:'risk',fragment:'OMEGA',labelKey:'global.doom.riskFragment',label:'Fragmento de risco',host:'.field-file'}
  };
  if(page==='personagem.html'){
    if(params.get('id')==='mick')clues[page]={id:'zero',fragment:'Z',labelKey:'global.doom.operationalFragment',label:'Fragmento operacional',host:'.warning'};
    if(params.get('id')==='mei')clues[page]={id:'sample',fragment:'00',labelKey:'global.doom.sampleFragment',label:'Fragmento de amostra',host:'.warning'};
  }
  const clue=clues[page];
  if(!clue)return;

  function read(){
    try{return JSON.parse(localStorage.getItem(storageKey)||'[]')}catch{return[]}
  }
  function write(items){
    try{localStorage.setItem(storageKey,JSON.stringify(items))}catch{}
  }
  const host=document.querySelector(clue.host);
  if(!host)return;
  host.classList.add('doom-clue-host');
  const button=document.createElement('button');
  button.type='button';
  button.className='doom-fragment';
  button.innerHTML='<span>⌬</span>';
  button.setAttribute('aria-label',t('global.doom.examine',null,'Examinar anomalia no arquivo'));
  button.title=t('global.doom.uncatalogued',null,'Sinal não catalogado');
  if(read().includes(clue.id))button.classList.add('collected');
  host.appendChild(button);

  const alert=document.createElement('div');
  alert.className='doom-fragment-alert';
  alert.setAttribute('role','status');
  alert.setAttribute('aria-live','polite');
  document.body.appendChild(alert);
  let alertTimer;
  button.addEventListener('click',()=>{
    const collected=read();
    if(!collected.includes(clue.id)){collected.push(clue.id);write(collected)}
    button.classList.add('collected');
    alert.textContent=t('global.doom.recovered',null,'SINAL DO PROJETO DOOM RECUPERADO');
    const fragment=document.createElement('strong');fragment.textContent=clue.fragment;alert.appendChild(fragment);
    alert.appendChild(document.createTextNode(t('global.doom.progress',{label:t(clue.labelKey,null,clue.label),count:Math.min(collected.length,5)},`${clue.label} // ${Math.min(collected.length,5)}/5 fragmentos localizados`)));
    alert.classList.add('visible');
    clearTimeout(alertTimer);
    alertTimer=setTimeout(()=>alert.classList.remove('visible'),4200);
  });
})();
