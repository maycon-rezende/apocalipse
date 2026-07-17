(() => {
  const overlay=document.createElement('div');
  overlay.className='page-tear';
  overlay.setAttribute('aria-hidden','true');
  overlay.innerHTML=`<div class="page-tear__dark"></div>
    <span class="page-tear__slash" style="--top:23%;--rot:-12deg;--delay:0s"></span>
    <span class="page-tear__slash" style="--top:43%;--rot:-9deg;--delay:.08s"></span>
    <span class="page-tear__slash" style="--top:63%;--rot:-15deg;--delay:.16s"></span>
    <span class="page-tear__label">ARQUIVO SENDO VIOLADO...</span>`;
  document.body.appendChild(overlay);

  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
  let navigating=false;
  document.addEventListener('click',event=>{
    const link=event.target.closest('a[href]');
    if(!link||navigating||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.target==='_blank'||link.hasAttribute('download'))return;
    const url=new URL(link.href,location.href);
    const isCharacterAccess=url.origin===location.origin&&(/\/personagens\.html$/.test(url.pathname)||/\/personagem\.html$/.test(url.pathname));
    if(!isCharacterAccess)return;
    event.preventDefault();
    navigating=true;
    overlay.classList.add('is-tearing');
    setTimeout(()=>location.href=url.href,reduceMotion.matches?180:900);
  });
  addEventListener('pageshow',()=>{navigating=false;overlay.classList.remove('is-tearing')});
})();
