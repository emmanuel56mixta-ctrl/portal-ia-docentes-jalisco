const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {createModel} = require('../constructor-recorrido.js');
const root = path.join(__dirname,'..');
const context = {window:{},URL};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root,'constructor-gemas-config.js'),'utf8'),context);
const html = fs.readFileSync(path.join(root,'ruta-v2.html'),'utf8');
vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],context);
const catalog = context.window.ConstructorCatalog;
const model = createModel(catalog);
const base = {view:'work',section:'primaria',constructor:'docente',role:'',stage:1};

test('every catalog profile and stage has a recoverable URL and a valid existing Gem',()=>{
  let profiles=0;
  for(const section of model.leaves) for(const constructor of section.constructors){
    for(const role of constructor.kind==='management'?Object.keys(catalog.functions):['']){
      profiles++;
      for(let stage=0;stage<4;stage++){
        const state=model.normalize({view:'work',section:section.id,constructor:constructor.id,role,stage});
        assert.deepEqual(model.fromHash(model.hash(state)),state);
        const details=model.describe(state);
        assert.equal(details.stages.length,4);
        assert.ok(catalog.validGemUrl(details.url),`${section.id} ${constructor.id} ${role}`);
        assert.ok(model.prompt(state).includes(details.stage.name));
      }
    }
  }
  assert.equal(profiles,42);
});
test('institutional roles resolve to their own existing Gems',()=>{
  const urls=['direccion','supervision','sector'].map(role=>model.describe(model.normalize({...base,constructor:'gestion',role})).url);
  assert.equal(new Set(urls).size,3);
});
test('stored selection keeps review status but strips arbitrary text and data',()=>{
  const stored=model.saved(JSON.stringify({v:1,...base,reviewed:[0,0,2,9,'1'],openedStage:1,studentName:'PRIVATE',prompt:'PRIVATE'}));
  assert.deepEqual(stored.reviewed,[0,2]);
  assert.equal(stored.stage,1);
  assert.equal(stored.openedStage,1);
  assert.equal(JSON.stringify(stored).includes('PRIVATE'),false);
});
test('corrupt and incompatible saved data cannot prevent startup',()=>{
  for(const value of ['',null,'{','null','[]','{"v":2}','{"v":1,"view":"work","section":"__proto__"}']) assert.equal(model.saved(value),null);
});
test('invalid routes and roles never become an arbitrary destination',()=>{
  for(const hash of ['#trabajo/primaria/docente/99','#trabajo/%ZZ/docente/1','#trabajo/https://evil.example/docente/1','#trabajo/__proto__/docente/1']) assert.equal(model.fromHash(hash).view,'levels');
  assert.equal(model.fromHash('#trabajo/primaria/gestion/admin/1').view,'profiles');
  assert.equal(model.fromHash('#trabajo/primaria/inexistente/1').view,'profiles');
});
test('visited stages are not represented as reviewed without explicit acknowledgement',()=>{
  assert.deepEqual(model.fromHash('#trabajo/primaria/docente/4').reviewed,[]);
  assert.deepEqual(model.normalize({...base,view:'complete'}).reviewed,[]);
});
test('later stages request missing prior work instead of assuming portal context transfer',()=>{
  assert.ok(model.prompt(model.normalize(base)).includes('pídeme una síntesis'));
  assert.ok(!model.prompt(model.normalize({...base,stage:0})).includes('pídeme una síntesis'));
});
