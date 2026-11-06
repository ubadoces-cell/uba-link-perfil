/* UBA DOCES — camada visual do Link de Perfil. Sem alterar pedidos ou API. */
(()=>{
  'use strict';
  const nav=document.querySelector('.uba-profile-glass');
  if(!nav)return;
  const links=[...nav.querySelectorAll('a[href^="#"]')];
  const setActive=id=>{
    for(const link of links){
      const on=link.getAttribute('href')==='#'+id;
      link.classList.toggle('active',on);
      if(on)link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    }
  };
  for(const link of links)link.addEventListener('click',()=>{
    const id=link.getAttribute('href').slice(1);
    setActive(id);
  });
  if('IntersectionObserver' in window){
    const navigationObserver=new IntersectionObserver(entries=>{
      const eligible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
      if(eligible.length)setActive(eligible[0].target.id);
    },{rootMargin:'-22% 0px -48% 0px',threshold:[0,.1,.35]});
    for(const link of links){
      const el=document.getElementById(link.getAttribute('href').slice(1));
      if(el)navigationObserver.observe(el);
    }
  }
  const reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if(reduce||!('IntersectionObserver' in window))return;
  const selector='.sales-highlight,.logo-wrap,.hero h1,.hero p,.section h2,.section-intro,.card-link,.visual,.product-card,.trust,.review,.youtube';
  const targets=[...document.querySelectorAll(selector)];
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add('uba-reveal-visible');
      observer.unobserve(entry.target);
    });
  },{rootMargin:'0px 0px 38px 0px',threshold:.04});
  targets.forEach(element=>{
    element.classList.add('uba-reveal');
    observer.observe(element);
  });
  document.documentElement.classList.add('uba-motion-ready');
})();
