const {test}=require('node:test');
const assert=require('node:assert/strict');
const {normalize,endpointFor,createTracker}=require('../constructor-uso.js');
function environment(config={enabled:true,endpoint:'/wp-json/docente-ia/v1/event'}) {
  const calls=[];let time=10000;
  return {calls,advance:()=>time+=2000,config,location:{href:'https://portal.example/constructor',origin:'https://portal.example',protocol:'https:'},navigator:{},now:()=>time,fetch:(...args)=>{calls.push(args);return Promise.resolve({ok:true});}};
}
test('Solo acepta dimensiones del catálogo y elimina texto libre',()=>{
 assert.equal(normalize({event:'gem_open',section:'primaria',constructor:'telesecundaria',stage:1}),null);
 assert.equal(normalize({event:'role_select',section:'primaria',constructor:'docente',stage:1}),null);
 const e=normalize({event:'constructor_open',section:'primaria',constructor:'docente',stage:2,role:'direccion',email:'private@example.com',prompt:'Texto privado'});
 assert.deepEqual(e,{event:'constructor_open',section:'primaria',constructor:'docente',stage:2,role:''});
});
test('No transmite al estar desactivado, fuera del origen o con señal de privacidad',()=>{
 const off=environment({enabled:false,endpoint:'/wp-json/docente-ia/v1/event'});assert.equal(createTracker(off).track({event:'page_view'}),false);assert.equal(off.calls.length,0);
 const env=environment();assert.equal(endpointFor({enabled:true,endpoint:'https://otro.example/wp-json/docente-ia/v1/event'},env.location),null);
 env.navigator.globalPrivacyControl=true;createTracker(env).track({event:'page_view'});assert.equal(env.calls.length,0);
});
test('Cuenta una visita por carga, limita dobles clics y omite credenciales y referente',()=>{
 const env=environment();const t=createTracker(env);assert.equal(t.track({event:'page_view'}),true);env.advance();assert.equal(t.track({event:'page_view'}),false);
 const ev={event:'gem_open',section:'secundaria',constructor:'gestion',stage:3,role:'supervision'};
 assert.equal(t.track(ev),true);assert.equal(t.track(ev),false);env.advance();assert.equal(t.track(ev),true);
 assert.equal(env.calls.length,3);assert.equal(env.calls[0][1].credentials,'omit');assert.equal(env.calls[0][1].referrerPolicy,'no-referrer');
});
test('Una falla del receptor no afecta la navegación ni genera reintentos',async()=>{
 const env=environment();env.fetch=()=>Promise.reject(new Error('offline'));const t=createTracker(env);t.track({event:'page_view'});await new Promise(resolve=>setImmediate(resolve));assert.equal(t.track({event:'section_open',section:'integral'}),false);
});
