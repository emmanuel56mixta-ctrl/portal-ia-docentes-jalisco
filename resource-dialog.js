(function(){
  var toolsInfo={
    "project-preescolar":{
      eyebrow:"Proyectos integradores",title:"Gema para Preescolar",type:"Gema de Gemini",
      image:"recursos-proyectos-integradores.jpg",
      description:"Te acompaña a diseñar proyectos integradores adecuados a experiencias lúdicas, exploración, lenguaje y contexto de niñas y niños de preescolar."
    },
    "project-primaria":{
      eyebrow:"Proyectos integradores",title:"Gema para Primaria",type:"Gema de Gemini",
      image:"recursos-proyectos-integradores.jpg",
      description:"Organiza proyectos vinculados con el contexto de primaria, con propósitos, actividades, productos y evidencias que puedes revisar y adaptar."
    },
    "project-secundaria":{
      eyebrow:"Proyectos integradores",title:"Gema para Secundaria",type:"Gema de Gemini",
      image:"recursos-proyectos-integradores.jpg",
      description:"Apoya la construcción de proyectos para secundaria que articulan contenidos, investigación, colaboración y productos relacionados con el entorno."
    },
    "project-primaria-multi":{
      eyebrow:"Proyectos integradores",title:"Gema para Primaria multigrado",type:"Gema de Gemini",
      image:"recursos-proyectos-integradores.jpg",
      description:"Propone proyectos comunes para grupos multigrado de primaria, con actividades compartidas y desafíos diferenciados por nivel."
    },
    "project-secundaria-multi":{
      eyebrow:"Proyectos integradores",title:"Gema para Secundaria multigrado",type:"Gema de Gemini",
      image:"recursos-proyectos-integradores.jpg",
      description:"Ayuda a planear proyectos para grupos multigrado de secundaria, articulando un propósito común con apoyos y productos diferenciados."
    },
    "programa-leo":{
      eyebrow:"Programa LEO",title:"Gema de lectura, escritura y oralidad",type:"Gema de Gemini",
      image:"recursos-programa-leo.jpg",
      description:"Genera propuestas para fortalecer la lectura, la producción escrita y la expresión oral mediante actividades contextualizadas para tu grupo."
    },
    "promate":{
      eyebrow:"Matemáticas",title:"PROMATE",type:"Actividad interactiva",
      image:"recursos-matematicas.jpg",
      description:"Abre un entorno con experiencias matemáticas apoyadas en GeoGebra para explorar, formular conjeturas, argumentar y resolver problemas."
    },
    "trazo":{
      eyebrow:"Matemáticas",title:"Trazo",type:"Actividad interactiva",
      image:"recursos-matematicas.jpg",
      description:"Accede a actividades para construir, visualizar y explicar ideas matemáticas paso a paso, favoreciendo el razonamiento y la comunicación."
    }
  };

  var overlay=document.getElementById("toolDialog");
  if(!overlay)return;
  var dialog=overlay.querySelector(".tool-dialog");
  var image=overlay.querySelector("#toolDialogImage");
  var type=overlay.querySelector("#toolDialogType");
  var eyebrow=overlay.querySelector("#toolDialogKicker");
  var title=overlay.querySelector("#toolDialogTitle");
  var description=overlay.querySelector("#toolDialogDescription");
  var openLink=overlay.querySelector("#toolDialogOpen");
  var cancel=overlay.querySelector("#toolDialogCancel");
  var closeButton=overlay.querySelector("#toolDialogClose");
  var lastTrigger=null;

  function openDialog(trigger){
    var info=toolsInfo[trigger.getAttribute("data-tool")];
    if(!info)return;
    lastTrigger=trigger;
    image.src=info.image;
    image.alt="";
    type.textContent=info.type;
    eyebrow.textContent=info.eyebrow;
    title.textContent=info.title;
    description.textContent=info.description;
    openLink.href=trigger.href;
    if(trigger.target){
      openLink.target=trigger.target;
      openLink.rel="noopener";
    }else{
      openLink.removeAttribute("target");
      openLink.removeAttribute("rel");
    }
    overlay.hidden=false;
    document.body.classList.add("dialog-open");
    requestAnimationFrame(function(){overlay.classList.add("open");cancel.focus();});
  }

  function closeDialog(){
    overlay.classList.remove("open");
    document.body.classList.remove("dialog-open");
    window.setTimeout(function(){
      overlay.hidden=true;
      if(lastTrigger)lastTrigger.focus();
    },210);
  }

  document.querySelectorAll(".tool-trigger").forEach(function(trigger){
    trigger.setAttribute("aria-haspopup","dialog");
    trigger.addEventListener("click",function(event){
      event.preventDefault();
      openDialog(trigger);
    });
  });
  cancel.addEventListener("click",closeDialog);
  closeButton.addEventListener("click",closeDialog);
  openLink.addEventListener("click",function(){window.setTimeout(closeDialog,80);});
  overlay.addEventListener("click",function(event){if(event.target===overlay)closeDialog();});
  document.addEventListener("keydown",function(event){
    if(overlay.hidden)return;
    if(event.key==="Escape"){event.preventDefault();closeDialog();return;}
    if(event.key!=="Tab")return;
    var focusable=Array.prototype.slice.call(dialog.querySelectorAll("a[href],button:not([disabled])"));
    if(!focusable.length)return;
    var first=focusable[0],last=focusable[focusable.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  });
})();
