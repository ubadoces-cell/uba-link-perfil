/* UBA DOCES — camada visual do Link de Perfil. Sem alterar pedidos ou API. */
(()=>{
  'use strict';
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
