const $=id=>document.getElementById(id);
const defaults={exp:[{ex:"Designed websites like :- sangeethub.com , predictmy11.com"},{ex:"Teaching & Typing Work"}],edu:[
{q:"HIGH SCHOOL",i:"Example Public School",b:"Example Board",a:"78%",s:"",y:"2016"},
{q:"INTERMEDIATE",i:"Example College",b:"Example Board",a:"72%",s:"Science",y:"2018"}]};
function addExp(d={}){let n=$("expTpl").content.cloneNode(true),r=n.querySelector(".repeat");r.querySelector(".et").value=d.t||"";r.querySelector(".ec").value=d.c||"";r.querySelector(".ed").value=d.d||"";r.querySelector(".ex").value=d.ex||"";r.querySelector(".remove").onclick=()=>{r.remove();update()};$("experience").appendChild(n)}
function addEdu(d={}){let n=$("eduTpl").content.cloneNode(true),r=n.querySelector(".repeat");r.querySelector(".eq").value=d.q||"";r.querySelector(".ei").value=d.i||"";r.querySelector(".eb").value=d.b||"";r.querySelector(".ea").value=d.a||"";r.querySelector(".es").value=d.s||"";r.querySelector(".ey").value=d.y||"";r.querySelector(".remove").onclick=()=>{r.remove();update()};$("education").appendChild(n)}
defaults.exp.forEach(addExp);defaults.edu.forEach(addEdu);
$("addExperience").onclick=()=>addExp();$("addEducation").onclick=()=>addEdu();
const v=id=>(($(id)?.value)||"").trim(), ls=s=>s.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function node(r,s){return (r.querySelector(s)?.value||"").trim()}
function section(id,yes){$(id).style.display=yes?"":"none"}
function update(){
$("pName").textContent=(v("name")||"YOUR NAME").toUpperCase();$("pAddress").textContent=v("address")||"Address";$("pPhone").textContent=v("phone")||"-";$("pEmail").textContent=v("email")||"-";
$("phoneRow").style.display=v("phone")?"flex":"none";$("emailRow").style.display=v("email")?"flex":"none";
const g=$("personalGrid");g.innerHTML="";
[["DATE OF BIRTH","dob"],["AGE","age"],["FATHER’S NAME","father"],["MOTHER’S NAME","mother"],["GENDER","gender"],["MARITAL STATUS","marital"],["LANGUAGES SPOKEN","languages"]].forEach(([l,id])=>{let x=v(id);if(!x)return;let a=document.createElement("div"),b=document.createElement("div"),c=document.createElement("div");a.textContent=l;b.textContent=":";b.className="colon";c.textContent=x;g.append(a,b,c)});
let sk=$("pSkills");sk.innerHTML="";ls(v("skills")).forEach(x=>{let d=document.createElement("div");d.className="skill";d.textContent=x;sk.appendChild(d)});section("skillsSec",sk.children.length);
let ex=$("pExperience");ex.innerHTML="";document.querySelectorAll("#experience .repeat").forEach(r=>{let t=node(r,".et"),c=node(r,".ec"),du=node(r,".ed"),x=node(r,".ex");if(!(t||c||du||x))return;let a=document.createElement("div");a.className="exp";a.innerHTML=`${t?`<b>${esc(t)}</b>`:""}${c?" — "+esc(c):""}${du?" ("+esc(du)+")":""}${x?`<br>${esc(x)}`:""}`;ex.appendChild(a)});section("experienceSec",ex.children.length);
let ed=$("pEducation");ed.innerHTML="";document.querySelectorAll("#education .repeat").forEach(r=>{let q=node(r,".eq"),i=node(r,".ei");if(!(q||i))return;let w=document.createElement("div");w.className="edu";w.innerHTML=`<div><b>${esc(q)}${q&&i?": ":""}</b>${esc(i)}</div>`;[["Board",".eb"],["Aggregate",".ea"],["Stream",".es"],["Passing Year",".ey"]].forEach(([l,s])=>{let x=node(r,s);if(x)w.innerHTML+=`<div><b>${l}:</b> ${esc(x)}</div>`});ed.appendChild(w)});section("educationSec",ed.children.length);
$("pSummary").textContent=v("summary");section("summarySec",v("summary"));$("pProjects").textContent=v("projects");section("projectsSec",v("projects"));$("pCerts").textContent=v("certs");section("certsSec",v("certs"));$("pAchievements").textContent=v("achievements");section("achievementsSec",v("achievements"));$("pHobbies").textContent=v("hobbies");section("hobbiesSec",v("hobbies"));
$("cv").classList.toggle("extended",v("mode")==="extended");
$("cv").style.fontFamily=v("font")+",Arial,sans-serif";
$("pPhoto").className="photo "+v("shape")+" "+v("photoSize");
$("pPhoto").style.display=$("hidePhoto").checked?"none":"block";
saveLocal();
}
$("photo").onchange=e=>{let f=e.target.files[0];if(!f)return;let r=new FileReader();r.onload=()=>{$("pPhoto").src=r.result;update()};r.readAsDataURL(f)};
document.querySelectorAll("input,textarea,select").forEach(x=>x.addEventListener("input",update));
document.querySelectorAll("input,textarea,select").forEach(x=>x.addEventListener("change",update));
function data(){return {name:v("name"),address:v("address"),phone:v("phone"),email:v("email"),dob:v("dob"),age:v("age"),father:v("father"),mother:v("mother"),gender:v("gender"),marital:v("marital"),languages:v("languages"),skills:v("skills"),summary:v("summary"),projects:v("projects"),certs:v("certs"),achievements:v("achievements"),hobbies:v("hobbies"),shape:v("shape"),photoSize:v("photoSize"),font:v("font"),mode:v("mode"),hidePhoto:$("hidePhoto").checked,exp:[...document.querySelectorAll("#experience .repeat")].map(r=>({t:node(r,".et"),c:node(r,".ec"),d:node(r,".ed"),ex:node(r,".ex")})),edu:[...document.querySelectorAll("#education .repeat")].map(r=>({q:node(r,".eq"),i:node(r,".ei"),b:node(r,".eb"),a:node(r,".ea"),s:node(r,".es"),y:node(r,".ey")}))}}
function saveLocal(){try{localStorage.setItem("exactCV",JSON.stringify(data()))}catch(e){}}
function apply(d){Object.entries(d).forEach(([k,x])=>{if($(k)&&!["exp","edu"].includes(k))$(k).type==="checkbox"?$(k).checked=!!x:$(k).value=x??""});$("experience").innerHTML="";$("education").innerHTML="";(d.exp||[]).forEach(addExp);(d.edu||[]).forEach(addEdu);update()}
$("save").onclick=()=>{let b=new Blob([JSON.stringify(data(),null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="cv-data.json";a.click()};
$("load").onclick=()=>{let i=document.createElement("input");i.type="file";i.accept=".json";i.onchange=e=>{let r=new FileReader();r.onload=()=>{try{apply(JSON.parse(r.result))}catch(_){alert("Invalid CV data file.")}};r.readAsText(e.target.files[0])};i.click()};
$("print").onclick=()=>{update();window.print()};
try{let s=localStorage.getItem("exactCV");if(s)apply(JSON.parse(s))}catch(e){}update();
