(function(){
  'use strict';

  var menu=document.getElementById('mobileMenu');
  var openers=Array.prototype.slice.call(document.querySelectorAll('.mobile-more-open'));
  var closer=menu&&menu.querySelector('.mobile-menu-close');
  var lastOpener=null;

  function focusable(){
    return menu?Array.prototype.slice.call(menu.querySelectorAll('a[href],button:not([disabled])')).filter(function(el){return !el.hidden;}):[];
  }
  function openMenu(event){
    if(!menu)return;
    lastOpener=event&&event.currentTarget;
    menu.hidden=false;
    document.body.classList.add('mobile-menu-open');
    window.requestAnimationFrame(function(){if(closer)closer.focus();});
  }
  function closeMenu(){
    if(!menu)return;
    menu.hidden=true;
    document.body.classList.remove('mobile-menu-open');
    if(lastOpener)lastOpener.focus();
  }
  openers.forEach(function(button){button.addEventListener('click',openMenu);});
  if(closer)closer.addEventListener('click',closeMenu);
  if(menu){
    menu.addEventListener('click',function(event){if(event.target===menu)closeMenu();});
    menu.addEventListener('keydown',function(event){
      if(event.key==='Escape'){event.preventDefault();closeMenu();return;}
      if(event.key!=='Tab')return;
      var items=focusable();
      if(!items.length)return;
      var first=items[0],last=items[items.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    });
  }

  /* Gesto de deslizamiento para el carrusel existente, sin reemplazar sus controles accesibles. */
  var hero=document.querySelector('.home-demo .hero');
  if(hero&&window.PointerEvent){
    var startX=0,startY=0;
    hero.addEventListener('pointerdown',function(event){startX=event.clientX;startY=event.clientY;},{passive:true});
    hero.addEventListener('pointerup',function(event){
      if(!window.matchMedia('(max-width:760px)').matches)return;
      var dx=event.clientX-startX,dy=event.clientY-startY;
      if(Math.abs(dx)<48||Math.abs(dx)<Math.abs(dy))return;
      var target=document.getElementById(dx<0?'next':'prev');
      if(target)target.click();
    },{passive:true});
  }

  /* Indica en qué familia está el usuario cuando recorre el Kit. */
  var sectionLinks=Array.prototype.slice.call(document.querySelectorAll('.mobile-section-nav a'));
  if(sectionLinks.length&&'IntersectionObserver' in window){
    var byId={};
    sectionLinks.forEach(function(link){byId[link.getAttribute('href').slice(1)]=link;});
    var observer=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting)return;
        sectionLinks.forEach(function(link){link.classList.remove('is-current');link.removeAttribute('aria-current');});
        var active=byId[entry.target.id];
        if(active){active.classList.add('is-current');active.setAttribute('aria-current','location');}
      });
    },{rootMargin:'-28% 0px -58% 0px',threshold:0});
    Object.keys(byId).forEach(function(id){var section=document.getElementById(id);if(section)observer.observe(section);});
  }
})();
