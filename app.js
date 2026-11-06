import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// 1) مقادیر پروژه Supabase را در این دو خط قرار بده.
const SUPABASE_URL = "PASTE_YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_ANON_KEY = "PASTE_YOUR_SUPABASE_ANON_KEY";
const configured = SUPABASE_URL.startsWith("https://") && !SUPABASE_URL.includes("PASTE_") && !SUPABASE_ANON_KEY.includes("PASTE_");
const supabase = configured ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

const categories = [
  {id:"characters",title:"شخصیت‌ها",icon:"♟",desc:"اعضای گروه ون‌درلیند و چهره‌های دنیای بازی"},
  {id:"story",title:"داستان و مأموریت‌ها",icon:"▤",desc:"فصل‌ها، مأموریت‌های اصلی و فرعی"},
  {id:"weapons",title:"اسلحه‌ها",icon:"⌁",desc:"تفنگ‌ها، هفت‌تیرها، کمان و تجهیزات"},
  {id:"horses",title:"اسب‌ها",icon:"♞",desc:"نژادها، آمار و محل پیدا کردن اسب‌ها"},
  {id:"animals",title:"حیوانات",icon:"♧",desc:"حیات وحش، شکار و جانوران افسانه‌ای"},
  {id:"locations",title:"مکان‌ها و نقشه",icon:"⌖",desc:"شهرها، مناطق، ساختمان‌ها و نقاط مخفی"},
  {id:"outfits",title:"لباس‌ها",icon:"✧",desc:"لباس‌ها و ست‌های قابل بازکردن"},
  {id:"secrets",title:"رازها و ایستراگ‌ها",icon:"☠",desc:"اتفاقات عجیب، گنج‌ها و رازهای پنهان"},
  {id:"guides",title:"راهنما و ترفندها",icon:"✎",desc:"نکته‌ها، آموزش‌ها و راه‌های پیشرفت"}
];
const entries = [
  ["characters","آرتور مورگان","شخصیت اصلی بخش داستانی؛ عضو وفادار گروه داچ ون‌درلیند.","آرتور از کودکی در گروه داچ بزرگ شده و در طول داستان با انتخاب‌ها و پیامدهای آن‌ها روبه‌رو می‌شود."],
  ["characters","جان مارستون","یکی از اعضای قدیمی گروه و شخصیت اصلی بازی اول.","جان تلاش می‌کند گذشته‌اش را پشت سر بگذارد و برای خانواده‌اش زندگی تازه‌ای بسازد."],
  ["characters","داچ ون‌درلیند","رهبر گروه ون‌درلیند؛ سخنوری کاریزماتیک با رؤیاهای بزرگ.","داچ آزادی را آرمان گروه می‌داند، اما فشار اتفاقات رابطه اعضا را تغییر می‌دهد."],
  ["characters","سیدی ادلر","یکی از متحدان مهم آرتور در ادامه داستان.","سیدی پس از تجربه‌های تلخ، به مبارزی شجاع و مستقل تبدیل می‌شود."],
  ["weapons","Schofield Revolver","هفت‌تیر قدرتمند با دقت و آسیب مناسب.","یکی از هفت‌تیرهای محبوب بازی است. می‌توان آن را از فروشگاه اسلحه تهیه کرد."],
  ["weapons","Lancaster Repeater","تکرارکننده‌ای قابل اعتماد برای درگیری‌های میان‌برد.","ظرفیت خشاب و کنترل مناسب، آن را به گزینه‌ای کاربردی تبدیل می‌کند."],
  ["weapons","Springfield Rifle","تفنگ تک‌تیرانداز قدرتمند برای شکار و درگیری.","برای شکار حیوانات بزرگ با انتخاب مهمات مناسب کاربرد دارد."],
  ["horses","Arabian","نژادی سریع و چابک با جثه نسبتاً کوچک.","اسب Arabian سفید را می‌توان در طبیعت نزدیک Lake Isabella پیدا کرد."],
  ["horses","Missouri Fox Trotter","اسب چندمنظوره با سرعت و شتاب بالا.","این نژاد برای سفرهای طولانی و حرکت سریع انتخاب محبوبی است."],
  ["locations","Valentine","شهری در منطقه Heartlands از ایالت New Hanover.","در این شهر فروشگاه، اسلحه‌فروشی، اصطبل و مکان‌های خدماتی وجود دارد."],
  ["locations","Saint Denis","شهری بزرگ و صنعتی در منطقه Lemoyne.","خیابان‌های شلوغ و فضای شهری آن با دیگر مناطق بازی تفاوت زیادی دارد."],
  ["secrets","روح باتلاق","یکی از برخوردهای مرموز در منطقه Bayou Nwa.","در شب و اطراف باتلاق ممکن است با صداها و اتفاقات غیرعادی روبه‌رو شوی."],
  ["animals","Legendary Bear","خرس افسانه‌ای که شکارش نیازمند آمادگی است.","برای شکار حیوانات افسانه‌ای، سرنخ‌ها را دنبال کن و تجهیزات مناسب همراه داشته باش."],
  ["guides","سیستم Honor","رفتارهای بازیکن روی میزان Honor اثر می‌گذارند.","کمک به مردم و رفتارهای مثبت معمولاً Honor را افزایش می‌دهد؛ جرم و خشونت بی‌دلیل آن را کاهش می‌دهد."]
].map((e,i)=>({id:i+1,category:e[0],title:e[1],summary:e[2],body:e[3]}));

const $ = s => document.querySelector(s);
let currentUser = null, profile = null, currentView = "home", activeCategory = null, favorites = new Set();

function message(text){$("#auth-message").textContent=text}
function showAuth(tab="login"){
  $("#auth-screen").classList.remove("hidden");$("#app").classList.add("hidden");
  document.querySelectorAll("[data-auth-tab]").forEach(b=>b.classList.toggle("active",b.dataset.authTab===tab));
  $("#login-form").classList.toggle("hidden",tab!=="login");$("#signup-form").classList.toggle("hidden",tab!=="signup");
}
function showApp(){
  $("#auth-screen").classList.add("hidden");$("#app").classList.remove("hidden");
  $("#user-label").textContent=profile?.display_name || currentUser.email;
  document.querySelectorAll(".admin-only").forEach(x=>x.classList.toggle("hidden",profile?.role!=="admin"));
  renderHome();go("home");
}
function go(view){
  currentView=view;
  document.querySelectorAll(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
  $("#hero").classList.toggle("hidden",view!=="home");
  ["home-content","listing-content","detail-content","community-content","admin-content"].forEach(id=>$("#"+id).classList.add("hidden"));
  const titles={home:"دفترچه راهنمای غرب",categories:"دانشنامه",favorites:"علاقه‌مندی‌ها",community:"انجمن دوستان",admin:"پنل مدیریت"};
  $("#page-title").textContent=titles[view]||"دانشنامه";
  if(view==="home")$("#home-content").classList.remove("hidden");
  if(view==="categories"||view==="favorites"){ $("#listing-content").classList.remove("hidden");renderListing(view==="favorites"?entries.filter(e=>favorites.has(e.id)):entries); }
  if(view==="community"){ $("#community-content").classList.remove("hidden");renderCommunity(); }
  if(view==="admin"){ $("#admin-content").classList.remove("hidden");renderAdmin(); }
  $("#search-input").value="";
}
function renderHome(){
  $("#category-grid").innerHTML=categories.map(c=>`<article class="category-card" data-cat="${c.id}"><div class="cat-icon">${c.icon}</div><h3>${c.title}</h3><p>${c.desc}</p></article>`).join("");
}
function renderListing(list){
  const filtered=activeCategory?list.filter(e=>e.category===activeCategory):list;
  $("#listing-content").innerHTML=`${activeCategory?'<button class="back-btn" id="all-cats">← همه دسته‌ها</button>':''}<div class="item-grid">${filtered.map(e=>`<article class="item-card" data-entry="${e.id}"><span class="tag">${categories.find(c=>c.id===e.category)?.title||"دانشنامه"}</span><h3>${e.title}</h3><p>${e.summary}</p></article>`).join("")||"<p class='muted'>موردی پیدا نشد.</p>"}</div>`;
  $("#all-cats")?.addEventListener("click",()=>{activeCategory=null;go("categories")});
}
function openEntry(id){
  const e=entries.find(x=>x.id===Number(id));if(!e)return;
  $("#listing-content").classList.add("hidden");$("#detail-content").classList.remove("hidden");
  $("#detail-content").innerHTML=`<button class="back-btn" id="detail-back">← بازگشت</button><article class="detail-panel"><span class="tag">${categories.find(c=>c.id===e.category)?.title}</span><h2>${e.title}</h2><p>${e.summary}</p><p>${e.body}</p><div class="detail-actions"><button class="btn" id="fav-btn">${favorites.has(e.id)?"★ حذف از علاقه‌مندی‌ها":"☆ افزودن به علاقه‌مندی‌ها"}</button></div></article>`;
  $("#detail-back").onclick=()=>go(currentView==="favorites"?"favorites":"categories");
  $("#fav-btn").onclick=()=>{favorites.has(e.id)?favorites.delete(e.id):favorites.add(e.id);openEntry(e.id)};
}
async function renderCommunity(){
  const host=$("#community-content");host.innerHTML=`<div class="community-layout"><form id="comment-form" class="comment-form"><h3>پیام تازه</h3><p class="muted">نظرت را با دوستانت به اشتراک بگذار.</p><textarea name="body" maxlength="1000" required placeholder="از ماجراجویی‌ات بگو..."></textarea><button class="btn primary" type="submit">ارسال پیام</button><p id="comment-status" class="muted"></p></form><div><h3>گفت‌وگوی گروه</h3><div id="comments-list"><p class="muted">در حال دریافت پیام‌ها...</p></div></div></div>`;
  $("#comment-form").onsubmit=async ev=>{ev.preventDefault();const body=new FormData(ev.currentTarget).get("body").trim();const {error}=await supabase.from("comments").insert({user_id:currentUser.id,body});$("#comment-status").textContent=error?error.message:"پیام ارسال شد.";if(!error){ev.currentTarget.reset();loadComments()}};
  loadComments();
}
async function loadComments(){
  const {data,error}=await supabase.from("comments").select("id,body,created_at,profiles(display_name)").order("created_at",{ascending:false}).limit(50);
  $("#comments-list").innerHTML=error?`<p class="muted">${error.message}</p>`:(data?.map(c=>`<article class="comment"><strong>${escapeHtml(c.profiles?.display_name||"عضو گروه")}</strong><small class="muted"> · ${new Date(c.created_at).toLocaleString("fa-IR")}</small><p>${escapeHtml(c.body)}</p></article>`).join("")||"<p class='muted'>هنوز پیامی ثبت نشده است.</p>");
}
async function renderAdmin(){
  const host=$("#admin-content");host.innerHTML="<p class='muted'>در حال دریافت اعضا...</p>";
  const {data,error}=await supabase.from("profiles").select("id,display_name,role,approved,created_at").order("created_at",{ascending:false});
  if(error){host.innerHTML=`<p class="muted">${error.message}</p>`;return}
  host.innerHTML=`<h3>مدیریت اعضا</h3><p class="muted">حساب‌های تازه تا زمان تأیید تو اجازه دیدن محتوای سایت را ندارند.</p>${data.map(u=>`<div class="admin-user"><div><strong>${escapeHtml(u.display_name||"بدون نام")}</strong><small>${u.role==="admin"?"مدیر": "عضو"} · ${u.approved?"تأیید شده":"در انتظار تأیید"}</small></div>${u.role==="admin"?"":`<button class="btn" data-approve="${u.id}" data-state="${!u.approved}">${u.approved?"لغو دسترسی":"تأیید عضویت"}</button>`}</div>`).join("")}`;
  host.querySelectorAll("[data-approve]").forEach(btn=>btn.onclick=async()=>{const {error}=await supabase.from("profiles").update({approved:btn.dataset.state==="true"}).eq("id",btn.dataset.approve);if(error)alert(error.message);else renderAdmin()});
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}

document.querySelectorAll("[data-auth-tab]").forEach(b=>b.onclick=()=>showAuth(b.dataset.authTab));
document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>{activeCategory=null;go(b.dataset.view)}));
$("#category-grid").addEventListener("click",ev=>{const card=ev.target.closest("[data-cat]");if(card){activeCategory=card.dataset.cat;go("categories");renderListing(entries)}});
$("#listing-content").addEventListener("click",ev=>{const card=ev.target.closest("[data-entry]");if(card)openEntry(card.dataset.entry)});
$("#search-input").addEventListener("input",ev=>{const q=ev.target.value.trim().toLocaleLowerCase("fa");const matches=entries.filter(e=>(e.title+" "+e.summary+" "+e.body).toLocaleLowerCase("fa").includes(q));$("#home-content").classList.add("hidden");$("#listing-content").classList.remove("hidden");$("#detail-content").classList.add("hidden");renderListing(q?matches:entries)});
$("#logout-btn").onclick=async()=>{await supabase.auth.signOut();currentUser=null;profile=null;showAuth()};

$("#login-form").onsubmit=async ev=>{ev.preventDefault();if(!supabase){message("ابتدا آدرس و کلید Supabase را در app.js وارد کن.");return}const f=new FormData(ev.currentTarget);const {data,error}=await supabase.auth.signInWithPassword({email:f.get("email"),password:f.get("password")});if(error){message(error.message);return}await loadProfile(data.user)};
$("#signup-form").onsubmit=async ev=>{ev.preventDefault();if(!supabase){message("ابتدا آدرس و کلید Supabase را در app.js وارد کن.");return}const f=new FormData(ev.currentTarget);const {data,error}=await supabase.auth.signUp({email:f.get("email"),password:f.get("password"),options:{data:{display_name:f.get("display_name")}}});if(error){message(error.message);return}if(data.session){await loadProfile(data.user)}else{message("حساب ساخته شد. ایمیلت را تأیید کن، سپس وارد شو. بعد از تأیید مدیر، دسترسی فعال می‌شود.")}};
async function loadProfile(user){
  currentUser=user;
  const {data,error}=await supabase.from("profiles").select("*").eq("id",user.id).single();
  if(error){message("ساخت پروفایل کامل نشده: "+error.message);await supabase.auth.signOut();return}
  profile=data;
  if(!profile.approved){await supabase.auth.signOut();currentUser=null;profile=null;message("حسابت ثبت شده، اما هنوز مدیر دسترسی را تأیید نکرده است.");return}
  showApp();
}
async function init(){
  renderHome();
  if(!configured){showAuth();message("برای فعال‌سازی ورود، Supabase را طبق راهنمای README وصل کن.");return}
  const {data:{session}}=await supabase.auth.getSession();
  if(session)await loadProfile(session.user);else showAuth();
  supabase.auth.onAuthStateChange(async(_event,session)=>{if(session&&!currentUser)await loadProfile(session.user)});
}
init();
