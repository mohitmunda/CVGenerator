const $=id=>document.getElementById(id);
const iconPaths={
 location:'<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
 phone:'<path d="M6.5 3.5 9 3l2 5-2 1.5c1 2 2.5 3.5 4.5 4.5L15 12l5 2-0.5 2.5C19.2 18 18 19 16.5 19 9.6 18.7 5.3 14.4 5 7.5 5 6 6 4.8 6.5 3.5Z"/>',
 mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
 linkedin:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 10v6M8 7.5v.1M12 16v-6m0 2.5c.5-1.7 4-2.2 4 1V16"/>',
 github:'<path d="M12 3a9 9 0 0 0-3 17.5c.5.1.7-.2.7-.5v-2c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.5-.8 1.5-.8.1-.8.4-1.3.7-1.6-2.3-.3-4.7-1.1-4.7-5A3.9 3.9 0 0 1 5.3 5c-.1-.3-.6-1.4.1-2.9 0 0 .9-.3 3 1.1a10.5 10.5 0 0 1 7.2 0c2.1-1.4 3-1.1 3-1.1.7 1.5.2 2.6.1 2.9a3.9 3.9 0 0 1 1 2.8c0 3.9-2.4 4.7-4.7 5 .4.3.7 1 .7 2v2.9c0 .3.2.6.7.5A9 9 0 0 0 12 3Z"/>',
 user:'<circle cx="12" cy="8" r="3"/><path d="M5 20c.7-3.5 3-5 7-5s6.3 1.5 7 5"/>',
 skills:'<path d="m8 3-5 9 5 9M16 3l5 9-5 9M14 4l-4 16"/>',
 briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/>',
 education:'<path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M7 11v5c2.8 2.2 7.2 2.2 10 0v-5M21 9v6"/>',
 summary:'<path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/>',
 project:'<path d="M4 5h6l2 2h8v12H4z"/><path d="M8 12h8M8 15h6"/>',
 certificate:'<path d="M5 3h14v12H5zM8 7h8M8 10h5"/><path d="m9 15-2 6 5-2 5 2-2-6"/>',
 award:'<circle cx="12" cy="8" r="5"/><path d="m9 12-2 8 5-3 5 3-2-8"/>',
 heart:'<path d="M20 8c0 5-8 11-8 11S4 13 4 8a4 4 0 0 1 7-2 4 4 0 0 1 9 2Z"/>'
};
function svgIcon(name){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${iconPaths[name]||iconPaths.summary}</svg>`}
const defaults={exp:[{t:'Web Designer / Developer',c:'Example Digital Studio',d:'2022 – 2025',ex:'Designed responsive websites, maintained client projects and improved website usability.',custom:[{l:'Tools',v:'HTML, CSS, JavaScript, PHP'}]}],edu:[{q:'HIGH SCHOOL',i:'Example Public School',b:'Example Board',a:'78%',s:'',y:'2016',custom:[]},{q:'INTERMEDIATE',i:'Example College',b:'Example Board',a:'72%',s:'Science',y:'2018',custom:[]} ]};
const DEFAULT_SECTION_ORDER=['objective','personal','skills','experience','education','declaration','summary','projects','certs','achievements'];
const SECTION_META={
 objective:{label:'Career Objective',icon:'summary'},
 personal:{label:'Personal Information',icon:'user'},
 skills:{label:'Skills & Interests',icon:'skills'},
 experience:{label:'Experience',icon:'briefcase'},
 education:{label:'Educational Details',icon:'education'},
 summary:{label:'Professional Summary',icon:'summary'},
 projects:{label:'Projects',icon:'project'},
 certs:{label:'Certifications & Training',icon:'certificate'},
 achievements:{label:'Achievements',icon:'award'},
 declaration:{label:'Declaration',icon:'summary'}
};
let sectionOrder=DEFAULT_SECTION_ORDER.slice();
let declarationSignatureImageData='';

const v=id=>(($(id)?.value)||'').trim(); const ls=s=>s.split(/\r?\n/).map(x=>x.trim()).filter(Boolean); const node=(r,s)=>(r.querySelector(s)?.value||'').trim();
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function section(id,yes){$(id).style.display=yes?'':'none'}
function customRow(parent,d={}){const n=$('customTpl').content.cloneNode(true),r=n.querySelector('.custom-row');r.querySelector('.cl').value=d.l||'';r.querySelector('.cvv').value=d.v||'';r.querySelector('.remove').onclick=()=>{r.remove();update()};parent.appendChild(n);return r}
function readCustom(parent){return [...parent.querySelectorAll('.custom-row')].map(r=>({l:node(r,'.cl'),v:node(r,'.cvv')})).filter(x=>x.l||x.v)}
function addExp(d={}){let n=$('expTpl').content.cloneNode(true),r=n.querySelector('.repeat');r.querySelector('.et').value=d.t||'';r.querySelector('.ec').value=d.c||'';r.querySelector('.ed').value=d.d||'';r.querySelector('.ex').value=d.ex||'';const list=r.querySelector('.custom-list');(d.custom||[]).forEach(x=>customRow(list,x));r.querySelector('.add-custom').onclick=()=>customRow(list);r.querySelector('.remove').onclick=()=>{r.remove();update()};$('experience').appendChild(n)}
function addEdu(d={}){let n=$('eduTpl').content.cloneNode(true),r=n.querySelector('.repeat');r.querySelector('.eq').value=d.q||'';r.querySelector('.ei').value=d.i||'';r.querySelector('.eb').value=d.b||'';r.querySelector('.ea').value=d.a||'';r.querySelector('.es').value=d.s||'';r.querySelector('.ey').value=d.y||'';const list=r.querySelector('.custom-list');(d.custom||[]).forEach(x=>customRow(list,x));r.querySelector('.add-custom').onclick=()=>customRow(list);r.querySelector('.remove').onclick=()=>{r.remove();update()};$('education').appendChild(n)}
function addSection(d={}){let n=$('sectionTpl').content.cloneNode(true),r=n.querySelector('.custom-section-editor');const idx=$('customSections').children.length;r.dataset.orderKey=d.key||('custom-'+idx);r.querySelector('.st').value=d.t||'';r.querySelector('.sc').value=d.c||'';r.querySelector('.remove').onclick=()=>{r.remove();normalizeOrder();update()};$('customSections').appendChild(n)}
function bindTopCustom(target){document.querySelectorAll('.add-custom[data-target="'+target+'"]')[0].onclick=()=>customRow($(target));}
bindTopCustom('basicCustom');bindTopCustom('personalCustom');bindTopCustom('skillCustom');
defaults.exp.forEach(addExp);defaults.edu.forEach(addEdu);$('addExperience').onclick=()=>addExp();$('addEducation').onclick=()=>addEdu();$('addCustomSection').onclick=()=>addSection();
function sectionKeyLabel(key){
 if(SECTION_META[key]) return SECTION_META[key].label;
 if(key.startsWith('custom-')){const r=document.querySelector('#customSections .custom-section-editor[data-order-key="'+key+'"]');const t=r?.querySelector('.st')?.value.trim();return t||'Additional Section';}
 return key;
}
function currentSectionKeys(){
 const keys=DEFAULT_SECTION_ORDER.slice();
 document.querySelectorAll('#customSections .custom-section-editor').forEach((r,i)=>{if(!r.dataset.orderKey)r.dataset.orderKey='custom-'+i;keys.push(r.dataset.orderKey)});
 return keys;
}
function normalizeOrder(){
 const valid=currentSectionKeys();
 // Keep the user's chosen order intact. Only remove stale keys and add newly
 // available sections. Declaration starts below Education by default, but it
 // must remain movable in Arrange CV Sections.
 sectionOrder=sectionOrder.filter(k=>valid.includes(k));
 valid.forEach(k=>{
   if(!sectionOrder.includes(k)){
     if(k==='declaration'){
       const ei=sectionOrder.indexOf('education');
       sectionOrder.splice(ei>=0?ei+1:sectionOrder.length,0,k);
     }else sectionOrder.push(k);
   }
 });
}
function moveSection(key,delta){
 normalizeOrder();const i=sectionOrder.indexOf(key),j=i+delta;if(i<0||j<0||j>=sectionOrder.length)return;[sectionOrder[i],sectionOrder[j]]=[sectionOrder[j],sectionOrder[i]];update();
}
function renderSectionOrder(){
 normalizeOrder();const box=$('sectionOrder');if(!box)return;box.innerHTML='';
 sectionOrder.forEach((key,i)=>{
   const row=document.createElement('div');row.className='order-row';row.draggable=true;row.dataset.key=key;
   const meta=SECTION_META[key]||{icon:'summary'};
   row.innerHTML=`<span class="drag-handle" title="Drag to arrange">☷</span><span class="order-icon">${svgIcon(meta.icon)}</span><span class="order-name">${esc(sectionKeyLabel(key))}</span><span class="order-actions"><button type="button" class="order-btn" data-move="-1" ${i===0?'disabled':''}>↑</button><button type="button" class="order-btn" data-move="1" ${i===sectionOrder.length-1?'disabled':''}>↓</button></span>`;
   row.querySelectorAll('[data-move]').forEach(b=>b.onclick=()=>moveSection(key,Number(b.dataset.move)));
   row.addEventListener('dragstart',e=>{e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',key);row.classList.add('dragging')});
   row.addEventListener('dragend',()=>row.classList.remove('dragging'));
   row.addEventListener('dragover',e=>{e.preventDefault();row.classList.add('drag-over')});
   row.addEventListener('dragleave',()=>row.classList.remove('drag-over'));
   row.addEventListener('drop',e=>{e.preventDefault();row.classList.remove('drag-over');const from=e.dataTransfer.getData('text/plain');if(!from||from===key)return;normalizeOrder();const a=sectionOrder.indexOf(from),b=sectionOrder.indexOf(key);if(a<0||b<0)return;sectionOrder.splice(a,1);sectionOrder.splice(sectionOrder.indexOf(key),0,from);update()});
   box.appendChild(row);
 });
}
function applySectionOrder(){
 normalizeOrder();const cv=$('cv');const map={objective:'careerObjectivePreview',personal:'personalSec',skills:'skillsSec',experience:'experienceSec',education:'educationSec',summary:'summarySec',projects:'projectsSec',certs:'certsSec',achievements:'achievementsSec',declaration:'declarationPreview'};
 sectionOrder.forEach((key,i)=>{
   let el;
   if(map[key]) el=$(map[key]);
   else el=document.querySelector('#customSections .custom-section-editor[data-order-key="'+key+'"]')?.__preview;
   if(el){
     cv.appendChild(el);
     if(key==='declaration') el.classList.toggle('declaration-sorted-last',i===sectionOrder.length-1);
   }
 });
}
function renderContactLinks(){const box=$('contactLinks');box.innerHTML='';[['website','globe','Website'],['linkedin','linkedin','LinkedIn'],['github','github','GitHub']].forEach(([id,ic,label])=>{let x=v(id);if(!x)return;let d=document.createElement('span');d.className='contact-link';d.innerHTML=`<span class="svgico">${svgIcon(ic)}</span><span>${esc(x)}</span>`;box.appendChild(d)});box.style.display=box.children.length?'flex':'none'}
function updateIcons(){document.querySelectorAll('[data-icon]').forEach(el=>{el.innerHTML=svgIcon(el.dataset.icon)});$('cv').classList.toggle('icon-none',v('iconStyle')==='none');$('cv').classList.toggle('icon-solid',v('iconStyle')==='solid');$('cv').classList.toggle('icon-line',v('iconStyle')==='line')}
function renderDeclarationForUpdate(){
 const host=$('declarationPreview'); if(!host)return;
 const enabled=$('declarationEnabled')?.checked!==false;
 const text=v('declarationText'),place=v('declarationPlace'),date=v('declarationDate'),signature=v('declarationSignature');
 host.replaceChildren();
 const show=enabled && !!(text||place||date||signature);
 host.style.display=show?'':'none';
 if(!show)return;
 const h=document.createElement('h3');h.className='section-title';h.textContent='DECLARATION';host.appendChild(h);
 if(text){const p=document.createElement('div');p.className='declaration-text';p.textContent=text;host.appendChild(p)}
 if(place||date||signature){const meta=document.createElement('div');meta.className='declaration-meta-preview';[['Place',place],['Date',date],['Signature',signature]].forEach(([l,x])=>{if(x){const d=document.createElement('div');const b=document.createElement('strong');b.textContent=l+': ';d.append(b,document.createTextNode(x));meta.appendChild(d)}});host.appendChild(meta)}
}

function update(){
 $('pName').textContent=(v('name')||'YOUR NAME').toUpperCase();$('pAddress').textContent=v('address')||'Address';$('pPhone').textContent=v('phone')||'-';$('pEmail').textContent=v('email')||'-';$('phoneRow').style.display=v('phone')?'flex':'none';$('emailRow').style.display=v('email')?'flex':'none';renderContactLinks();
 const g=$('personalGrid');g.innerHTML='';const personal=[['DATE OF BIRTH','dob'],['AGE','age'],["FATHER’S NAME",'father'],["MOTHER’S NAME",'mother'],['GENDER','gender'],['MARITAL STATUS','marital'],['LANGUAGES SPOKEN','languages'],['NATIONALITY','nationality']];personal.forEach(([l,id])=>{let x=v(id);if(!x)return;let a=document.createElement('div'),b=document.createElement('div'),c=document.createElement('div');a.textContent=l;b.textContent=':';b.className='colon';c.textContent=x;g.append(a,b,c)});[...document.querySelectorAll('#personalCustom .custom-row')].forEach(r=>{let l=node(r,'.cl'),x=node(r,'.cvv');if(l||x){let a=document.createElement('div'),b=document.createElement('div'),c=document.createElement('div');a.textContent=l;b.textContent=':';b.className='colon';c.textContent=x;g.append(a,b,c)}});section('personalSec',g.children.length);
 let sk=$('pSkills');sk.innerHTML='';ls(v('skills')).forEach(x=>{let d=document.createElement('div');d.className='skill';d.textContent=x;sk.appendChild(d)});$('pSkillDetails').textContent=v('skillDetails');let skillCustom=readCustom($('skillCustom'));skillCustom.forEach(x=>{let d=document.createElement('div');d.className='skill';d.innerHTML=`<b>${esc(x.l)}:</b> ${esc(x.v)}`;$('pSkillDetails').appendChild(d)});section('skillsSec',sk.children.length||$('pSkillDetails').textContent.trim());
 let ex=$('pExperience');ex.innerHTML='';document.querySelectorAll('#experience .repeat').forEach(r=>{let t=node(r,'.et'),c=node(r,'.ec'),du=node(r,'.ed'),x=node(r,'.ex'),custom=readCustom(r.querySelector('.custom-list'));if(!(t||c||du||x||custom.length))return;let a=document.createElement('div');a.className='exp';a.innerHTML=`<div class="exp-title">${esc(t)}${t&&c?' — ':''}${esc(c)}${du?' ('+esc(du)+')':''}</div>${x?`<div>${esc(x)}</div>`:''}${custom.length?`<div class="exp-extra">${custom.map(z=>`<div><b>${esc(z.l)}:</b> ${esc(z.v)}</div>`).join('')}</div>`:''}`;ex.appendChild(a)});section('experienceSec',ex.children.length);
 let ed=$('pEducation');ed.innerHTML='';document.querySelectorAll('#education .repeat').forEach(r=>{let q=node(r,'.eq'),i=node(r,'.ei'),custom=readCustom(r.querySelector('.custom-list'));if(!(q||i||custom.length))return;let w=document.createElement('div');w.className='edu';w.innerHTML=`<div><b>${esc(q)}${q&&i?': ':''}</b>${esc(i)}</div>`;[['Board','.eb'],['Aggregate','.ea'],['Stream','.es'],['Passing Year','.ey']].forEach(([l,s])=>{let x=node(r,s);if(x)w.innerHTML+=`<div><b>${l}:</b> ${esc(x)}</div>`});if(custom.length)w.innerHTML+=`<div class="edu-extra">${custom.map(z=>`<div><b>${esc(z.l)}:</b> ${esc(z.v)}</div>`).join('')}</div>`;ed.appendChild(w)});section('educationSec',ed.children.length);
 const objText=v('careerObjective');const objExtra=v('careerObjectiveAdditional');const objEnabled=$('careerObjectiveEnabled')?.checked!==false;const objHost=$('careerObjectivePreview');if(objHost){objHost.style.display=objEnabled?'':'none';if(objEnabled){const po=$('pCareerObjective');po.innerHTML='';if(objText){const d=document.createElement('div');d.className='objective-text';d.textContent=objText;po.appendChild(d)}if(objExtra){const d=document.createElement('div');d.className='objective-extra';d.textContent=objExtra;po.appendChild(d)}}} $('pSummary').textContent=v('summary');section('summarySec',v('summary'));$('pProjects').textContent=v('projects');section('projectsSec',v('projects'));$('pCerts').textContent=v('certs');section('certsSec',v('certs'));$('pAchievements').textContent=v('achievements');section('achievementsSec',v('achievements'))
 const pc=$('pCustomSections');pc.innerHTML='';document.querySelectorAll('#customSections .custom-section-editor').forEach(r=>{let t=node(r,'.st'),c=node(r,'.sc');if(!t&&!c)return;let s=document.createElement('section');s.className='custom-cv-section';s.dataset.orderKey=r.dataset.orderKey;s.innerHTML=`<h2><span class="secico">${svgIcon('summary')}</span>${esc((t||'ADDITIONAL SECTION').toUpperCase())}</h2><div class="custom-content">${esc(c)}</div>`;r.__preview=s;pc.appendChild(s)});
 const cv=$('cv');cv.className='cv layout-'+(v('layout')||'reference');cv.classList.toggle('compact',$('compact').checked);cv.style.fontFamily=v('font')+',Arial,sans-serif';cv.style.setProperty('--accent',v('accent')||'#111');cv.classList.toggle('extended',v('layout')!=='reference'||!!(v('summary')||v('projects')||v('certs')||v('achievements')));
 renderDeclarationForUpdate();
 $('pPhoto').className='photo '+v('shape')+' '+v('photoSize');$('pPhoto').style.display=$('hidePhoto').checked?'none':'block';updateIcons();renderSectionOrder();applySectionOrder();saveLocal();if(window.__cvV19Refresh)setTimeout(window.__cvV19Refresh,0);
}
$('photo').onchange=e=>{let f=e.target.files[0];if(!f)return;let r=new FileReader();r.onload=()=>{$('pPhoto').src=r.result;update()};r.readAsDataURL(f)};
document.addEventListener('input',e=>{if(e.target.matches('input,textarea,select'))update()});document.addEventListener('change',e=>{if(e.target.matches('input,textarea,select'))update()});
function data(){return {name:v('name'),address:v('address'),phone:v('phone'),email:v('email'),website:v('website'),linkedin:v('linkedin'),github:v('github'),location:v('location'),nationality:v('nationality'),title:v('title'),dob:v('dob'),age:v('age'),father:v('father'),mother:v('mother'),gender:v('gender'),marital:v('marital'),languages:v('languages'),skills:v('skills'),skillDetails:v('skillDetails'),summary:v('summary'),projects:v('projects'),certs:v('certs'),achievements:v('achievements'),careerObjective:v('careerObjective'),careerObjectiveAdditional:v('careerObjectiveAdditional'),careerObjectiveEnabled:$('careerObjectiveEnabled')?.checked!==false,declarationEnabled:$('declarationEnabled')?.checked!==false,declarationText:v('declarationText'),declarationPlace:v('declarationPlace'),declarationDate:v('declarationDate'),declarationSignature:v('declarationSignature'),declarationSignatureImage:declarationSignatureImageData,layout:v('layout'),accent:v('accent'),shape:v('shape'),photoSize:v('photoSize'),font:v('font'),iconStyle:v('iconStyle'),compact:$('compact').checked,hidePhoto:$('hidePhoto').checked,basicCustom:readCustom($('basicCustom')),personalCustom:readCustom($('personalCustom')),skillCustom:readCustom($('skillCustom')),exp:[...document.querySelectorAll('#experience .repeat')].map(r=>({t:node(r,'.et'),c:node(r,'.ec'),d:node(r,'.ed'),ex:node(r,'.ex'),custom:readCustom(r.querySelector('.custom-list'))})),edu:[...document.querySelectorAll('#education .repeat')].map(r=>({q:node(r,'.eq'),i:node(r,'.ei'),b:node(r,'.eb'),a:node(r,'.ea'),s:node(r,'.es'),y:node(r,'.ey'),custom:readCustom(r.querySelector('.custom-list'))})),customSections:[...document.querySelectorAll('#customSections .custom-section-editor')].map(r=>({key:r.dataset.orderKey,t:node(r,'.st'),c:node(r,'.sc')})),sectionOrder:sectionOrder.slice()}}
function saveLocal(){try{localStorage.setItem('professionalCV',JSON.stringify(data()))}catch(e){}}
function apply(d){Object.entries(d).forEach(([k,x])=>{if($(k)&&!['exp','edu','basicCustom','personalCustom','skillCustom','customSections','sectionOrder'].includes(k))$(k).type==='checkbox'?$(k).checked=!!x:$(k).value=x??''});['basicCustom','personalCustom','skillCustom'].forEach(k=>{$(k).innerHTML='';(d[k]||[]).forEach(x=>customRow($(k),x))});$('experience').innerHTML='';$('education').innerHTML='';$('customSections').innerHTML='';sectionOrder=Array.isArray(d.sectionOrder)?d.sectionOrder.slice():DEFAULT_SECTION_ORDER.slice();declarationSignatureImageData=d.declarationSignatureImage||'';const sigFileRestore=$('declarationSignatureImage');if(sigFileRestore)sigFileRestore.value='';(d.exp||[]).forEach(addExp);(d.edu||[]).forEach(addEdu);(d.customSections||[]).forEach(addSection);normalizeOrder();update();}
$('resetOrder').onclick=()=>{sectionOrder=DEFAULT_SECTION_ORDER.slice();normalizeOrder();update()};
$('save').onclick=()=>{let b=new Blob([JSON.stringify(data(),null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='cv-data.json';a.click();URL.revokeObjectURL(a.href)};
$('load').onclick=()=>{let i=document.createElement('input');i.type='file';i.accept='.json';i.onchange=e=>{let r=new FileReader();r.onload=()=>{try{apply(JSON.parse(r.result))}catch(_){alert('Invalid CV data file.')}};r.readAsText(e.target.files[0])};i.click()};
$('print').onclick=()=>{update();window.print()};
try{let s=localStorage.getItem('professionalCV');if(s)apply(JSON.parse(s))}catch(e){}update();

/* ===== Version 7 layout controller ===== */
(function(){
  const select = document.getElementById('layout');
  const cv = document.querySelector('.cv');
  const cards = document.querySelectorAll('[data-layout-card]');
  if(!cv) return;
  const names = ['reference','classic','modern','executive','minimal','elegant','corporate'];
  function applyLayout(v){
    if(!names.includes(v)) v='reference';
    names.forEach(n=>cv.classList.remove('layout-'+n));
    cv.classList.add('layout-'+v);
    if(select && select.value!==v) select.value=v;
    cards.forEach(c=>c.classList.toggle('active',c.dataset.layoutCard===v));
    try{localStorage.setItem('cvgen-layout-v7',v)}catch(e){}
    document.dispatchEvent(new CustomEvent('cv-layout-change',{detail:v}));
  }
  if(select){
    select.addEventListener('change',()=>applyLayout(select.value));
  }
  cards.forEach(card=>card.addEventListener('click',()=>applyLayout(card.dataset.layoutCard)));
  let saved='reference';
  try{saved=localStorage.getItem('cvgen-layout-v7')||'reference'}catch(e){}
  applyLayout(saved);
})();

/* ===== Version 8 controller ===== */
(function(){
  const cv=document.querySelector('.cv');
  if(!cv) return;
  const q=id=>document.getElementById(id);
  const bind=(id, fn)=>{
    const el=q(id); if(!el) return;
    el.addEventListener('change',()=>{fn(el.checked); saveSettings();});
  };
  function saveSettings(){
    const ids=['autoFit','showPageNumbers','showWatermark','spellAssist','printBackground','compactMode','showQR','showLastUpdated'];
    const data={}; ids.forEach(id=>{const el=q(id); if(el)data[id]=el.checked});
    try{localStorage.setItem('cvgen-pro-settings-v8',JSON.stringify(data))}catch(e){}
  }
  function loadSettings(){
    let d={}; try{d=JSON.parse(localStorage.getItem('cvgen-pro-settings-v8')||'{}')}catch(e){}
    Object.keys(d).forEach(id=>{const el=q(id); if(el)el.checked=!!d[id]});
    apply();
  }
  function apply(){
    cv.classList.toggle('draft-watermark',!!q('showWatermark')?.checked);
    cv.classList.toggle('show-page-numbers',!!q('showPageNumbers')?.checked);
    cv.classList.toggle('compact-mode',!!q('compactMode')?.checked);
    cv.classList.toggle('show-last-updated',!!q('showLastUpdated')?.checked);
    document.documentElement.classList.toggle('print-backgrounds',!!q('printBackground')?.checked);
  }
  ['showWatermark','showPageNumbers','compactMode','showLastUpdated','printBackground'].forEach(id=>{
    const el=q(id); if(el)el.addEventListener('change',apply);
  });
  const toggle=q('toggleTools'), body=q('proToolsBody');
  if(toggle&&body) toggle.onclick=()=>{body.hidden=!body.hidden;toggle.textContent=body.hidden?'Show':'Hide'};
  const clear=q('clearDraft');
  if(clear) clear.onclick=()=>{
    if(confirm('Clear the saved browser draft and settings?')){
      try{localStorage.clear()}catch(e){}
      location.reload();
    }
  };
  const duplicate=q('duplicateCV');
  if(duplicate) duplicate.onclick=()=>{
    const name=prompt('Name this CV copy:','My CV Copy');
    if(!name)return;
    try{
      const current=JSON.parse(localStorage.getItem('cvgen-data')||'{}');
      const copies=JSON.parse(localStorage.getItem('cvgen-copies-v8')||'[]');
      copies.push({name,created:new Date().toISOString(),data:current});
      localStorage.setItem('cvgen-copies-v8',JSON.stringify(copies));
      alert('CV copy saved in this browser.');
    }catch(e){alert('Could not save the copy.');}
  };
  const exportHTML=q('exportHTML');
  if(exportHTML) exportHTML.onclick=()=>{
    const clone=document.documentElement.cloneNode(true);
    clone.querySelectorAll('script').forEach(s=>s.remove());
    const blob=new Blob(['<!doctype html>\\n'+clone.outerHTML],{type:'text/html'});
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='my-cv-standalone.html';a.click();
    setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  };
  loadSettings();
})();

/* ===== Version 9 font controller ===== */
(function(){
  const cv=document.querySelector('.cv');
  const select=document.getElementById('font');
  const cards=document.querySelectorAll('[data-font-card]');
  if(!cv) return;
  const fonts=['Arial','Helvetica','Calibri','Aptos','Inter','Roboto','Open Sans','Lato','Montserrat','Poppins','Raleway','Nunito Sans','Source Sans 3','Merriweather','Georgia','Times New Roman','Garamond','Trebuchet MS','Verdana','Tahoma'];
  function slug(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}
  function applyFont(v){
    if(!v) v='Arial';
    fonts.forEach(f=>cv.classList.remove('font-'+slug(f)));
    // Base fonts can be assigned directly; custom classes cover common choices.
    cv.style.fontFamily = ({
      Arial:'Arial, Helvetica, sans-serif',
      Helvetica:'Helvetica, Arial, sans-serif',
      Calibri:'Calibri, Arial, sans-serif',
      Aptos:'Aptos, Calibri, Arial, sans-serif',
      Inter:'Inter, Arial, sans-serif',
      Roboto:'Roboto, Arial, sans-serif',
      'Open Sans':'"Open Sans", Arial, sans-serif',
      Lato:'Lato, Arial, sans-serif',
      Montserrat:'Montserrat, Arial, sans-serif',
      Poppins:'Poppins, Arial, sans-serif',
      Raleway:'Raleway, Arial, sans-serif',
      'Nunito Sans':'"Nunito Sans", Arial, sans-serif',
      'Source Sans 3':'"Source Sans 3", Arial, sans-serif',
      Merriweather:'Merriweather, Georgia, serif',
      Georgia:'Georgia, serif',
      'Times New Roman':'"Times New Roman", serif',
      Garamond:'Garamond, Georgia, serif',
      'Trebuchet MS':'"Trebuchet MS", Arial, sans-serif',
      Verdana:'Verdana, Arial, sans-serif',
      Tahoma:'Tahoma, Arial, sans-serif'
    })[v] || v;
    if(select && select.value!==v) select.value=v;
    cards.forEach(card=>card.classList.toggle('active',card.dataset.fontCard===v));
    try{localStorage.setItem('cvgen-font-v9',v)}catch(e){}
  }
  if(select) select.addEventListener('change',()=>applyFont(select.value));
  cards.forEach(card=>card.addEventListener('click',()=>applyFont(card.dataset.fontCard)));
  let saved='Arial'; try{saved=localStorage.getItem('cvgen-font-v9')||'Arial'}catch(e){}
  applyFont(saved);
})();



/* ===== Version 12: Nationality + Declaration + stable final renderer ===== */
(function(){
  'use strict';
  const $ = id => document.getElementById(id);
  const cv = document.querySelector('.cv');

  function updateNationality(){
    const input = $('nationality');
    const value = input ? input.value.trim() : '';
    document.querySelectorAll('[data-field="nationality"]').forEach(el=>{
      el.textContent = value;
      const row = el.closest('.personal-item');
      if(row) row.style.display = value ? '' : 'none';
    });
  }
  const nat = $('nationality');
  if(nat){
    nat.addEventListener('input', updateNationality);
    nat.addEventListener('change', updateNationality);
  }
  updateNationality();

  function renderDeclaration(){
    const host = $('declarationPreview');
    if(!host) return;
    const enabled = $('declarationEnabled');
    const text = $('declarationText')?.value.trim() || '';
    const place = $('declarationPlace')?.value.trim() || '';
    const date = $('declarationDate')?.value.trim() || '';
    const signature = $('declarationSignature')?.value.trim() || '';

    host.replaceChildren();
    if(!enabled || !enabled.checked || (!text && !place && !date && !signature)){
      host.style.display = 'none';
      return;
    }
    host.style.display = '';

    const heading = document.createElement('h3');
    heading.className = 'section-title';
    heading.textContent = 'DECLARATION';
    host.appendChild(heading);

    if(text){
      const p = document.createElement('div');
      p.className = 'declaration-text';
      p.textContent = text;
      host.appendChild(p);
    }

    if(place || date || signature){
      const meta = document.createElement('div');
      meta.className = 'declaration-meta-preview';
      if(place){
        const x=document.createElement('div'); x.innerHTML='<strong>Place:</strong> '; x.appendChild(document.createTextNode(place)); meta.appendChild(x);
      }
      if(date){
        const x=document.createElement('div'); x.innerHTML='<strong>Date:</strong> '; x.appendChild(document.createTextNode(date)); meta.appendChild(x);
      }
      if(signature){
        const x=document.createElement('div'); x.innerHTML='<strong>Signature:</strong> '; x.appendChild(document.createTextNode(signature)); meta.appendChild(x);
      }
      host.appendChild(meta);
    }
  }

  ['declarationEnabled','declarationText','declarationPlace','declarationDate','declarationSignature'].forEach(id=>{
    const el=$(id);
    if(el){
      el.addEventListener('input', renderDeclaration);
      el.addEventListener('change', renderDeclaration);
    }
  });
  renderDeclaration();
})();

/* ===== Version 13: visible Nationality + bottom Declaration ===== */
(function(){
  'use strict';
  const $ = id => document.getElementById(id);
  const cv = document.querySelector('.cv');
  if(!cv) return;

  function updateNationality(){
    const input = $('nationality');
    const value = input ? input.value.trim() : '';
    document.querySelectorAll('[data-field="nationality"]').forEach(el=>{
      el.textContent = value;
      const row = el.closest('[data-nationality-row]');
      if(row) row.style.display = value ? 'grid' : 'none';
    });
  }

  function renderDeclaration(){
    const host = $('declarationPreview');
    if(!host) return;
    const enabled = $('declarationEnabled');
    const text = $('declarationText')?.value.trim() || '';
    const place = $('declarationPlace')?.value.trim() || '';
    const date = $('declarationDate')?.value.trim() || '';
    const signature = $('declarationSignature')?.value.trim() || '';

    host.replaceChildren();

    if(!enabled || !enabled.checked || (!text && !place && !date && !signature)){
      host.style.display='none';
      return;
    }

    host.style.display='';
    const title=document.createElement('h3');
    title.className='section-title';
    title.textContent='DECLARATION';
    host.appendChild(title);

    if(text){
      const body=document.createElement('div');
      body.className='declaration-text';
      body.textContent=text;
      host.appendChild(body);
    }

    if(declarationSignatureImageData){
      const wrap=document.createElement('div');
      wrap.className='declaration-signature-image-wrap';
      const img=document.createElement('img');
      img.className='declaration-signature-image';
      img.src=declarationSignatureImageData;
      img.alt='Signature';
      wrap.appendChild(img);
      host.appendChild(wrap);
    }

    if(place || date || signature){
      const meta=document.createElement('div');
      meta.className='declaration-meta-preview';

      [['Place',place],['Date',date],['Signature',signature]].forEach(([label,value])=>{
        if(value){
          const item=document.createElement('div');
          const strong=document.createElement('strong');
          strong.textContent=label+': ';
          item.appendChild(strong);
          item.appendChild(document.createTextNode(value));
          meta.appendChild(item);
        }
      });
      host.appendChild(meta);
    }
  }

  const nat=$('nationality');
  if(nat){
    nat.addEventListener('input',updateNationality);
    nat.addEventListener('change',updateNationality);
  }
  updateNationality();

  ['declarationEnabled','declarationText','declarationPlace','declarationDate','declarationSignature'].forEach(id=>{
    const el=$(id);
    if(el){
      el.addEventListener('input',renderDeclaration);
      el.addEventListener('change',renderDeclaration);
    }
  });
  const sigFile=$('declarationSignatureImage');
  if(sigFile){
    sigFile.addEventListener('change',()=>{
      const file=sigFile.files?.[0];
      if(!file){declarationSignatureImageData='';renderDeclaration();return;}
      if(!file.type.startsWith('image/')){sigFile.value='';return;}
      const reader=new FileReader();
      reader.onload=()=>{declarationSignatureImageData=String(reader.result||'');renderDeclaration();update();};
      reader.readAsDataURL(file);
    });
  }
  $('removeSignatureImage')?.addEventListener('click',()=>{
    declarationSignatureImageData='';
    if(sigFile)sigFile.value='';
    renderDeclaration();
    update();
  });
  renderDeclaration();
})();



/* ===== v19 focused fixes: Career Objective + A4 Auto Fit ===== */
(function(){
  'use strict';
  const q=id=>document.getElementById(id);
  const cv=q('cv');
  if(!cv)return;

  function renderCareerObjective(){
    const host=q('careerObjectivePreview'), body=q('pCareerObjective'), toggle=q('careerObjectiveEnabled');
    if(!host||!body)return;
    const enabled=!toggle || toggle.checked;
    const text=(q('careerObjective')?.value||'').trim();
    const extra=(q('careerObjectiveAdditional')?.value||'').trim();
    body.textContent='';
    if(!enabled){
      host.hidden=true;
      host.style.removeProperty('display');
      return;
    }
    host.hidden=false;
    host.style.setProperty('display','block','important');
    if(text){const d=document.createElement('div');d.className='objective-text';d.textContent=text;body.appendChild(d)}
    if(extra){const d=document.createElement('div');d.className='objective-extra';d.textContent=extra;body.appendChild(d)}
  }

  function fitA4(){
    const enabled=q('autoFit')?.checked;
    cv.style.removeProperty('zoom');
    cv.style.removeProperty('transform');
    cv.style.removeProperty('transform-origin');
    cv.style.removeProperty('height');
    cv.classList.remove('a4-auto-fitted');
    if(!enabled)return;

    // Measure the actual rendered content while allowing it to extend beyond A4.
    const oldOverflow=cv.style.overflow;
    const oldMinHeight=cv.style.minHeight;
    cv.style.overflow='visible';
    cv.style.minHeight='0';
    const pageWidth=cv.getBoundingClientRect().width || 794;
    const pageHeight=297/210*pageWidth;
    let bottom=0;
    cv.querySelectorAll(':scope > *').forEach(el=>{
      if(el.hidden || getComputedStyle(el).display==='none')return;
      const r=el.getBoundingClientRect();
      const cr=cv.getBoundingClientRect();
      bottom=Math.max(bottom,r.bottom-cr.top);
    });
    const naturalHeight=Math.max(bottom,cv.scrollHeight);
    const scale=Math.min(1,(pageHeight-2)/Math.max(pageHeight,naturalHeight));
    if(scale<0.999){
      cv.classList.add('a4-auto-fitted');
      cv.style.zoom=String(scale);
      cv.style.minHeight='297mm';
    }else{
      cv.style.minHeight='297mm';
    }
    cv.style.overflow=oldOverflow;
    if(oldMinHeight && scale>=0.999)cv.style.minHeight=oldMinHeight;
  }

  // These handlers run after the existing live-update handler, so the final
  // rendered state always wins.
  ['careerObjective','careerObjectiveAdditional','careerObjectiveEnabled'].forEach(id=>{
    const el=q(id); if(!el)return;
    el.addEventListener('input',()=>setTimeout(renderCareerObjective,0));
    el.addEventListener('change',()=>setTimeout(renderCareerObjective,0));
  });
  const af=q('autoFit');
  if(af){
    af.addEventListener('change',()=>setTimeout(fitA4,0));
    window.addEventListener('resize',()=>setTimeout(fitA4,100));
  }

  // Re-apply after every normal CV update without creating another global input loop.
  const originalUpdate=window.update;
  if(typeof originalUpdate==='function'){
    // update() is not exported by the original script, so use an observer for
    // the preview instead of replacing its internal function.
  }
  window.__cvV19Refresh=()=>{renderCareerObjective();fitA4()};
  setTimeout(()=>window.__cvV19Refresh(),0);
})();
