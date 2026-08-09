(function(){
  if(window.DD_ANALOG_MODE)return;
  document.body.classList.add('gallery-original-mode');
  document.querySelectorAll('.family-player,.tape-reels,.temporal-console').forEach(element=>element.remove());
  document.querySelectorAll('.family-lane').forEach(lane=>{const openLabel=lane.querySelector('.lane-open');if(openLabel)openLabel.textContent='ABRIR NÚCLEO →'});
  const intro=document.getElementById('gallery-intro');
  if(intro){
    intro.classList.add('original-opening');
    const code=intro.querySelector('.intro-code'),message=intro.querySelector('.intro-message'),enter=intro.querySelector('.intro-enter');
    if(code)code.textContent='ARQUIVO DE MEMÓRIAS // VIDAS PARALELAS';
    if(message)message.textContent='Estas memórias pertencem a pessoas que ainda não sabiam que aquela seria a última manhã de suas antigas vidas.';
    if(enter)enter.textContent='Abrir arquivo de memórias';
  }
  const style=document.createElement('style');
  style.textContent=`.gallery-original-mode .family-lane{border-radius:0;background:var(--panel);box-shadow:none}.gallery-original-mode .family-lane .lane-code::before,.gallery-original-mode .family-lane::after{content:none!important}.gallery-original-mode .lane-preview::after{content:'ABRIR ARQUIVO'}.gallery-original-mode .family-player,.gallery-original-mode .tape-reels,.gallery-original-mode .temporal-console{display:none!important}`;
  document.head.appendChild(style);
  const params=new URLSearchParams(location.search),family=params.get('familia'),themes={bradock:'familym.mp3',hanson:'familyhanson.mp3',jordan:'vidas-paralelas.mp3'};
  if(!family)return;
  const source=themes[family];
  if(!source)return;
  const music=new Audio(`audio/${source}`);music.loop=true;music.preload='auto';music.volume=.38;
  const play=()=>music.play().catch(()=>{});play();document.addEventListener('pointerdown',play,{once:true});document.addEventListener('keydown',play,{once:true});addEventListener('pagehide',()=>music.pause(),{once:true});
})();

(function(){
  'use strict';

  const i18n=window.DoomsdayI18n;
  if(!i18n)return;
  const locale=i18n.locale;
  const isEnglish=locale==='en';
  const runtime=i18n.t('gallery.runtime.map')||{};
  const common=i18n.t('gallery.record.common')||{};
  const patterns=i18n.t('gallery.runtime.patterns')||{};
  const recordText=i18n.t('gallery.records')||[];
  const exact=new Map([...Object.entries(runtime),...Object.entries(common)]);

  if(isEnglish&&typeof records!=='undefined'&&Array.isArray(records)){
    records.forEach((record,index)=>{
      const translated=recordText[index];
      if(!translated)return;
      exact.set(record.title,translated[0]);
      exact.set(record.description,translated[1]);
    });
  }

  function format(template,values){
    return String(template||'').replace(/\{([\w.-]+)\}/g,(match,key)=>Object.prototype.hasOwnProperty.call(values,key)?values[key]:match);
  }

  function translateDynamic(value){
    if(!isEnglish||!value)return value;
    if(exact.has(value))return exact.get(value);
    let match;
    if((match=value.match(/^(\d+)\s+REGISTROS NO FILTRO$/i)))return format(patterns.records,{count:match[1]});
    if((match=value.match(/^(\d+)\s+RECUPERADOS$/i)))return format(patterns.recovered,{count:match[1]});
    if((match=value.match(/^(\d+)\s+FRAMES MARCADOS$/i)))return format(patterns.marked,{count:match[1]});
    if((match=value.match(/^(\d+)\s+registro\(s\) separado\(s\)\. Compare horários, pessoas ao fundo e sinais anteriores ao colapso\.$/i)))return format(patterns.separated,{count:match[1]});
    if((match=value.match(/^(\d+)\s+EVIDÊNCIAS CATALOGADAS\s*$/i)))return format(patterns.catalogedEvidence,{count:match[1]});
    if((match=value.match(/^(\d+)\s+LACUNAS CATALOGADAS\s*$/i)))return format(patterns.catalogedGaps,{count:match[1]});
    if((match=value.match(/^(\d+)\s+DETALHE\(S\) RECUPERADO\(S\)$/i)))return format(patterns.inspected,{count:match[1]});
    if((match=value.match(/^CONTAMINAÇÃO ENTRE FITAS \/\/ (\d+) FRAME\(S\) \/\/ (\d+) NÚCLEO\(S\) AFETADO\(S\)$/i)))return format(patterns.contaminated,{frames:match[1],families:match[2]});
    if((match=value.match(/^\/\/ (\d+) NÚCLEO\(S\) AFETADO\(S\)$/i)))return `// ${match[1]} FAMILY UNIT(S) AFFECTED`;
    if((match=value.match(/^EVIDÊNCIA (\d+) \/\/ NÃO SELECIONADA$/i)))return `EVIDENCE ${match[1]} // NOT SELECTED`;
    if((match=value.match(/^FRAMES CORROMPIDOS \/\/ (\d+\/3)$/i)))return `CORRUPTED FRAMES // ${match[1]}`;
    if((match=value.match(/^NÚCLEOS INSPECIONADOS \/\/ (\d+\/2)$/i)))return `FAMILY UNITS INSPECTED // ${match[1]}`;
    if((match=value.match(/^CORRELAÇÕES ARQUIVADAS \/\/ (\d+\/2)$/i)))return `CORRELATIONS ARCHIVED // ${match[1]}`;
    if((match=value.match(/^ANALISE OPTICA \/\/ (.+)$/i)))return `OPTICAL ANALYSIS // ${match[1]}`;
    if((match=value.match(/^Inspecao de (.+)$/i)))return `Inspection of ${exact.get(match[1])||match[1]}`;
    if((match=value.match(/^MEMÓRIA CONTAMINADA \/\/ (.+)$/i)))return `CONTAMINATED MEMORY // ${match[1]}`;
    if((match=value.match(/^(.+) \/\/ VERSÃO DIVERGENTE$/i)))return `${exact.get(match[1])||match[1]} // DIVERGENT VERSION`;
    if((match=value.match(/^(.+) \/\/ (ANTES DO DIA D|DIA D.*)$/i)))return `${exact.get(match[1])||match[1]} // ${translateDynamic(match[2])}`;
    if(value==='ANTES DO DIA D')return 'BEFORE D-DAY';
    if(value.startsWith('DIA D'))return value.replace(/^DIA D/,'D-DAY');
    if(value.includes('Família Jordan'))return value.replace(/Família Jordan/g,'Salazar Family');
    return value;
  }

  function translateValue(value){
    const leading=value.match(/^\s*/)?.[0]||'';
    const trailing=value.match(/\s*$/)?.[0]||'';
    const core=value.slice(leading.length,value.length-trailing.length);
    if(!core)return value;
    let translated=translateDynamic(core);
    if(translated===core&&isEnglish){
      for(const [source,target] of exact){
        if(source.length>8&&translated.includes(source))translated=translated.split(source).join(target);
      }
      translated=translated
        .replace(/DIA D/g,'D-DAY')
        .replace(/NÚCLEO\(S\)/g,'FAMILY UNIT(S)')
        .replace(/NÚCLEOS/g,'FAMILY UNITS')
        .replace(/EVIDÊNCIA/g,'EVIDENCE')
        .replace(/NÃO SELECIONADA/g,'NOT SELECTED');
    }
    return leading+translated+trailing;
  }

  const localizedAttributes=['alt','aria-label','title','data-state','data-tape'];
  function localizeElement(root){
    if(!isEnglish||!root)return;
    if(root.nodeType===Node.TEXT_NODE){
      if(root.parentElement?.closest('script,style,noscript'))return;
      const translated=translateValue(root.nodeValue||'');
      if(translated!==root.nodeValue)root.nodeValue=translated;
      return;
    }
    if(root.nodeType!==Node.ELEMENT_NODE&&root.nodeType!==Node.DOCUMENT_NODE)return;
    const elements=root.nodeType===Node.ELEMENT_NODE?[root,...root.querySelectorAll('*')]:[...root.querySelectorAll('*')];
    elements.forEach(element=>{
      if(element.matches('script,style,noscript')||element.closest('script,style,noscript'))return;
      localizedAttributes.forEach(attribute=>{
        if(!element.hasAttribute(attribute))return;
        const current=element.getAttribute(attribute),translated=translateValue(current);
        if(translated!==current)element.setAttribute(attribute,translated);
      });
      [...element.childNodes].filter(node=>node.nodeType===Node.TEXT_NODE).forEach(localizeElement);
    });
  }

  function localizedCss(){
    const cssValue=key=>JSON.stringify(String(i18n.t(key)));
    const style=document.createElement('style');
    style.id='gallery-i18n-css';
    style.textContent=`
      .record-open::after{content:${cssValue('gallery.css.analyze')}}
      .missing .record-open::after{content:${cssValue('gallery.css.awaiting')}}
      .family-lane.jordan::after{content:${cssValue('gallery.css.tapeMissing')}}
      .family-lane::after{content:${cssValue('gallery.css.homeVideo')}}
      .lane-preview::after{content:${cssValue(window.DD_ANALOG_MODE?'gallery.css.play':'gallery.css.openArchive')}}
      .gallery-original-mode .lane-preview::after{content:${cssValue('gallery.css.openArchive')}}
      .family-lane .lane-code::before{content:${cssValue('gallery.css.vhsPrefix')}}
    `;
    document.head.appendChild(style);
  }

  function applyTitles(){
    document.title=i18n.t('gallery.meta.title');
    const introTitle=document.getElementById('gallery-intro-title');
    const heroTitle=document.querySelector('.hero h1');
    if(isEnglish){
      if(introTitle)introTitle.innerHTML='Interrupted <span>Lives</span>';
      if(heroTitle)heroTitle.innerHTML='Parallel <span>Lives</span>';
    }
  }

  applyTitles();
  localizedCss();
  localizeElement(document);
  if(isEnglish){
    const observer=new MutationObserver(mutations=>mutations.forEach(mutation=>{
      if(mutation.type==='characterData')localizeElement(mutation.target);
      else if(mutation.type==='attributes'){
        const current=mutation.target.getAttribute(mutation.attributeName);
        if(current!==null){const translated=translateValue(current);if(translated!==current)mutation.target.setAttribute(mutation.attributeName,translated)}
      }else mutation.addedNodes.forEach(localizeElement);
    }));
    observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:localizedAttributes});
    addEventListener('pagehide',()=>observer.disconnect(),{once:true});
  }
})();
