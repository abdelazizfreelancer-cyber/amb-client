/* ===================== SUPABASE CLIENT ===================== */
const supabaseClient = window.supabase.createClient(
  window.APP_CONFIG.SUPABASE_URL,
  window.APP_CONFIG.SUPABASE_ANON_KEY
);

/* ===================== SITE CONTENT (المرحلة الجاية: هتتحول لجدول قابل للتعديل من الداش بورد) ===================== */
const SITE_CONTENT = {
  name: "عبدالعزيز تامر",
  role: "Junior Media Buyer",
  photo: "assets/profile.jpg",
  whatsappNumber: "201041249535", // بصيغة دولية بدون + أو أصفار زيادة
  bio: `أنا عبدالعزيز تامر، Junior Media Buyer مهتم بمجال الإعلانات الرقمية وصناعة الحملات الإعلانية المبنية على البيانات والتحليل.

بساعد أصحاب المشاريع والبراندات على الوصول للجمهور المناسب من خلال التخطيط للحملات الإعلانية، تحديد الـ Target Audience، متابعة أداء الإعلانات وتحليل النتائج، بهدف الوصول لأفضل استخدام ممكن للميزانية وتحقيق نتائج قابلة للقياس.

الإعلان الناجح مش مجرد إننا نعمل Ad ونشغله، لكن البداية الحقيقية بتكون من فهم البيزنس، المنتج، الجمهور، والهدف من الحملة.

وعشان كده، قبل ما نبدأ أي حملة إعلانية، بطلب منك تعبئة الـ Brief عشان أقدر أفهم مشروعك بشكل كامل وأبني استراتيجية إعلانية مناسبة لاحتياجاتك وأهدافك.`,
  briefWhat: `الـ Brief هو مجموعة من الأسئلة والمعلومات اللي بتساعدني أفهم مشروعك قبل ما نبدأ في أي حملة إعلانية.

من خلال الـ Brief هتعرفني على نشاطك، منتجاتك أو خدماتك، الجمهور المستهدف، أهدافك، ميزانيتك، المنافسين، والمعلومات المهمة اللي تخص البيزنس.

كل ما كانت المعلومات اللي بتقدمها أوضح وأدق، كل ما قدرت أفهم مشروعك بشكل أفضل وأحدد الاتجاه المناسب للحملة الإعلانية.

الـ Brief مش مجرد بيانات بنجمعها، هو نقطة البداية اللي بنبني عليها قراراتنا الإعلانية.`,
  briefWhy: `قبل ما نصرف جنيه واحد على الإعلانات، لازم نكون فاهمين إحنا بنعلن عن إيه، لمين، وليه.

الـ Brief بيساعدنا على: فهم البيزنس، تحديد الجمهور المستهدف، تحديد الهدف (مبيعات، Leads، رسائل، زيارات للموقع، Awareness أو غيره)، فهم المنافسين، تحديد الميزانية المناسبة، وتقليل التخمين — بدل ما نبدأ الحملة بشكل عشوائي، بنبدأ بناءً على معلومات واضحة.

باختصار: كل معلومة بتكتبها في الـ Brief بتساعدني أخد قرار إعلاني أفضل. حاول تجاوب بأكبر قدر ممكن من التفاصيل، لأن نجاح الحملة يبدأ من فهم المشروع بشكل صحيح.`
};

/* ===================== STATIC BRIEF CONFIG ===================== */
const SECTIONS_META = [
  {key:"s1", part:"PART 01 — DISCOVERY", num:"01", title:"نبذة عن البراند", desc:"الأساسيات اللي بنبني عليها كل حاجة تانية"},
  {key:"s2", part:"PART 01 — DISCOVERY", num:"02", title:"الوضع التشغيلي الحالي", desc:"إزاي البيزنس شغال دلوقتي على أرض الواقع"},
  {key:"s3", part:"PART 01 — DISCOVERY", num:"03", title:"المنتجات والتسعير", desc:"عشان نحدد إعلانات هتدفع على إيه بالظبط"},
  {key:"s4", part:"PART 01 — DISCOVERY", num:"04", title:"الجمهور المستهدف", desc:"مين بالظبط اللي بيشتري (أو المفروض يشتري)"},
  {key:"s5", part:"PART 01 — DISCOVERY", num:"05", title:"المنافسين والسوق", desc:"عشان نعرف نموضعكم صح جنبهم"},
  {key:"s6", part:"PART 01 — DISCOVERY", num:"06", title:"التجربة التسويقية السابقة", desc:"عشان نبني على اللي اتعمل، مش نبدأ من صفر"},
  {key:"s7", part:"PART 02 — GOALS & SETUP", num:"07", title:"الأهداف من التعاون", desc:"عشان نقيس النجاح صح من الأول"},
  {key:"s8", part:"PART 02 — GOALS & SETUP", num:"08", title:"الميزانية", desc:"رقم الإعلانات الفعلي، منفصل عن أتعاب الشغل"},
  {key:"s9", part:"PART 02 — GOALS & SETUP", num:"09", title:"المحل كجزء من الخطة", desc:"بما إن عندكم محل قائم، هنستغله صح في الحملات"},
  {key:"s10", part:"PART 02 — GOALS & SETUP", num:"10", title:"الأنظمة والدفع الإلكتروني", desc:"التفاصيل التقنية اللي هتوفر وقت بعد كده"},
  {key:"commercial", part:"PART 03 — COMMERCIALS", num:"—", title:"نتحاسب إزاي؟", desc:"هنراجعها مع بعض ونختار الأنسب لحجم شغلك", isCommercial:true}
];
// القيمتين دول fallback بس لو حصل خطأ في تحميلهم من القاعدة، الأصل إنهم يتحمّلوا ديناميك
let OPTIONS_INFO = [
  {tag:"OPTION A", title:"نسبة من المبيعات (Performance)", body:"نسبة من المبيعات الفعلية اللي بتيجي من الحملات، وغالبًا بتتحدد بحد أدنى شهري بسيط بالإضافة للنسبة.", fit:"لو عندكم تتبع مبيعات دقيق وواضح (بيكسل شغال، أونلاين بشكل أساسي)."},
  {tag:"OPTION B", title:"مبلغ ثابت + نسبة من المبيعات (مختلط)", body:"أتعاب شهرية أساسية ثابتة، بالإضافة لنسبة من 10% إلى 20% من المبيعات الفعلية اللي بتيجي من الحملات.", fit:"توازن بين استقرار الطرفين والتحفيز على تحقيق نتيجة فعلية — الأكتر شيوعًا."}
];
async function loadCommercialOptions(){
  const { data, error } = await supabaseClient
    .from('commercial_options')
    .select('tag, title, body, fit')
    .order('sort_order', { ascending: true });
  if(!error && data && data.length > 0){ OPTIONS_INFO = data; }
}
async function loadSiteSettings(){
  const { data, error } = await supabaseClient
    .from('site_settings')
    .select('key, value')
    .eq('key', 'about_photo_url')
    .maybeSingle();
  if(!error && data && data.value){ SITE_CONTENT.photo = data.value; }
}

/* ===================== STATE ===================== */
let questions = [];
let steps = [];
let current = 0;
let session = null;      // supabase auth session
let authMode = "login";  // 'login' | 'signup'
let activeTab = "brief"; // 'brief' | 'contract' | 'meetings' | 'account'
let myResponse = null;   // آخر بريف اتبعت من المستخدم ده (لو موجود)
let myRequest = null;    // آخر طلب "بريف جديد" (لو موجود)
let avatarUrl = null;

const answers = { brandName:"", industry:"" };

function genRef(){ return "REF-" + Math.floor(100000 + Math.random()*900000); }
let refCode = genRef();

/* ===================== LOAD QUESTIONS (public) ===================== */
async function loadQuestions(){
  const { data, error } = await supabaseClient
    .from('questions')
    .select('id, section_key, label, type, multi, options, required')
    .order('created_at', { ascending: true });
  if(error){ console.error('load questions error', error); questions = []; return; }
  questions = (data || []).map(q => ({
    id: q.id, sectionKey: q.section_key, label: q.label, type: q.type,
    multi: q.multi, options: q.options, required: q.required
  }));
}
function rebuildSteps(){
  questions.forEach(q => { if(!(q.id in answers)) answers[q.id] = q.multi ? [] : ""; });
  steps = SECTIONS_META
    .map(meta => ({ meta, qs: questions.filter(q => q.sectionKey === meta.key) }))
    .filter(s => s.qs.length > 0);
}

/* ===================== ROOT ROUTER ===================== */
async function boot(){
  const { data } = await supabaseClient.auth.getSession();
  session = data.session;
  await loadQuestions();
  await loadCommercialOptions();
  await loadSiteSettings();
  rebuildSteps();
  if(session){ avatarUrl = (session.user.user_metadata||{}).avatar_url || null; await checkMyResponse(); await checkMyRequest(); }
  render();
  setupWhatsapp();

  // لو حصل تغيير في حالة تسجيل الدخول من تبويب تاني (مثلاً)، حدّث الواجهة تلقائيًا
  supabaseClient.auth.onAuthStateChange((_event, newSession) => {
    session = newSession;
  });
}
function render(){
  if(!session){ renderAbout(); return; }
  renderClientShell();
}

async function checkMyResponse(){
  const { data, error } = await supabaseClient
    .from('responses')
    .select('ref, submitted_at, answers')
    .eq('user_id', session.user.id)
    .order('submitted_at', { ascending:false })
    .limit(1);
  if(!error && data && data.length > 0){ myResponse = data[0]; }
  else { myResponse = null; }
}
async function checkMyRequest(){
  const { data, error } = await supabaseClient
    .from('brief_requests')
    .select('id, status, created_at')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending:false })
    .limit(1);
  if(!error && data && data.length > 0){ myRequest = data[0]; }
  else { myRequest = null; }
}

/* ===================== CLIENT DASHBOARD SHELL ===================== */
function renderClientShell(){
  const root = document.getElementById('appRoot');
  const meta = session.user.user_metadata || {};
  root.innerHTML = `
    <div class="user-bar">
      <span class="who">أهلاً <b>${meta.full_name || session.user.email}</b></span>
      <button class="mini-link" id="logoutBtn2">تسجيل خروج</button>
    </div>
    <div class="client-nav">
      <button class="client-nav-btn ${activeTab==='brief'?'active':''}" data-tab="brief">📋 البريف</button>
      <button class="client-nav-btn ${activeTab==='contract'?'active':''}" data-tab="contract">📄 العقد</button>
      <button class="client-nav-btn ${activeTab==='meetings'?'active':''}" data-tab="meetings">📅 مواعيد الميتينج</button>
      <button class="client-nav-btn ${activeTab==='account'?'active':''}" data-tab="account">👤 حسابي</button>
    </div>
    <div id="tabContent" class="formBody"></div>
    <div id="printArea" style="display:none;"></div>
  `;
  document.getElementById('logoutBtn2').addEventListener('click', logout);
  root.querySelectorAll('.client-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => { activeTab = btn.dataset.tab; renderClientShell(); });
  });
  renderActiveTab();
}

function renderActiveTab(){
  if(activeTab === 'brief') return renderBriefTab();
  if(activeTab === 'contract') return renderContractTab();
  if(activeTab === 'meetings') return renderMeetingsTab();
  if(activeTab === 'account') return renderAccountTab();
}

const WEEKDAY_NAMES = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
let selectedMeetDay = null;
let countdownTimer = null;

/* ===================== CONTRACT TAB ===================== */
async function renderContractTab(){
  const container = document.getElementById('tabContent');
  container.innerHTML = `<div class="load-msg">جاري التحميل...</div>`;

  const { data: contract, error } = await supabaseClient
    .from('contracts')
    .select('status, contract_text, signature_data_url, signed_at')
    .eq('user_id', session.user.id)
    .maybeSingle();

  if(error || !contract){
    container.innerHTML = `
      <div class="placeholder-panel">
        <div class="icon">📄</div>
        <h3>العقد لسه معملش</h3>
        <p>أول ما نتقابل في الميتينج ونتفق على كل حاجة، هبعتلك العقد هنا تقدر تراجعه، توقّعه، وتنزله أو تطبعه بضغطة زرار.</p>
      </div>
    `;
    return;
  }

  if(contract.status === 'signed'){
    container.innerHTML = `
      <div id="printableContract" class="contract-box">
        <pre>${contract.contract_text}</pre>
        <div style="margin-top:20px;border-top:1px dashed var(--line);padding-top:16px;">
          <div style="font-family:'Cairo';font-size:12px;color:var(--ink-dim);margin-bottom:8px;">توقيعك — بتاريخ ${new Date(contract.signed_at).toLocaleString('ar-EG')}</div>
          <img src="${contract.signature_data_url}" style="max-width:260px;border:1px solid var(--line);border-radius:6px;">
        </div>
      </div>
      <div class="actions" style="margin-top:16px;">
        <button class="btn primary" id="printContractBtn">تحميل / طباعة PDF</button>
      </div>
    `;
    document.getElementById('printContractBtn').addEventListener('click', () => window.print());
    return;
  }

  // ready_to_sign
  container.innerHTML = `
    <div class="contract-box">
      <pre>${contract.contract_text}</pre>
    </div>
    <div class="signature-pad-wrap">
      <label>وقّع هنا بإصبعك أو الماوس</label>
      <canvas id="signatureCanvas"></canvas>
      <div class="sig-actions">
        <button class="btn" id="clearSigBtn">مسح التوقيع</button>
        <button class="btn primary" id="submitSigBtn" disabled>توقيع وإرسال</button>
      </div>
      <div id="sigStatus" style="font-size:12px;color:var(--ink-dim);margin-top:8px;"></div>
    </div>
  `;
  setupSignaturePad();
}

function setupSignaturePad(){
  const canvas = document.getElementById('signatureCanvas');
  const ctx = canvas.getContext('2d');
  const submitBtn = document.getElementById('submitSigBtn');
  let drawing = false, hasDrawn = false;

  function resize(){
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width; canvas.height = rect.height;
    ctx.strokeStyle = '#143331'; ctx.lineWidth = 2.4; ctx.lineCap = 'round';
  }
  resize();

  function pos(e){
    const rect = canvas.getBoundingClientRect();
    const p = e.touches ? e.touches[0] : e;
    return { x: p.clientX - rect.left, y: p.clientY - rect.top };
  }
  function start(e){ drawing = true; hasDrawn = true; const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); submitBtn.disabled = false; e.preventDefault(); }
  function move(e){ if(!drawing) return; const p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); e.preventDefault(); }
  function end(){ drawing = false; }

  canvas.addEventListener('mousedown', start);
  canvas.addEventListener('mousemove', move);
  window.addEventListener('mouseup', end);
  canvas.addEventListener('touchstart', start);
  canvas.addEventListener('touchmove', move);
  canvas.addEventListener('touchend', end);

  document.getElementById('clearSigBtn').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasDrawn = false; submitBtn.disabled = true;
  });

  submitBtn.addEventListener('click', async () => {
    if(!hasDrawn) return;
    const statusEl = document.getElementById('sigStatus');
    submitBtn.disabled = true; submitBtn.textContent = "جاري الإرسال...";
    const dataUrl = canvas.toDataURL('image/png');
    try{
      const res = await fetch('/api/sign-contract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + session.access_token },
        body: JSON.stringify({ signatureDataUrl: dataUrl })
      });
      const json = await res.json();
      if(res.ok && json.ok){ renderContractTab(); }
      else{ statusEl.textContent = 'حصل خطأ: ' + (json.error || 'خطأ غير معروف'); submitBtn.disabled = false; submitBtn.textContent = "توقيع وإرسال"; }
    }catch(err){ statusEl.textContent = 'حصل خطأ في الاتصال'; submitBtn.disabled = false; submitBtn.textContent = "توقيع وإرسال"; }
  });
}

/* ===================== MEETINGS TAB ===================== */
async function renderMeetingsTab(){
  const container = document.getElementById('tabContent');
  container.innerHTML = `<div class="load-msg">جاري التحميل...</div>`;
  if(countdownTimer){ clearInterval(countdownTimer); countdownTimer = null; }

  const { data: myBooking } = await supabaseClient
    .from('meeting_bookings')
    .select('id, slot_id')
    .eq('user_id', session.user.id)
    .maybeSingle();

  if(myBooking){
    const { data: slot } = await supabaseClient.from('meeting_slots').select('start_time, end_time').eq('id', myBooking.slot_id).maybeSingle();
    if(slot){ renderMeetingBooked(slot.start_time, slot.end_time, myBooking.slot_id); return; }
  }

  const { data: slots } = await supabaseClient.from('meeting_slots').select('id, start_time, end_time').order('start_time', { ascending:true });
  const { data: bookings } = await supabaseClient.from('meeting_bookings').select('slot_id');
  const bookedIds = new Set((bookings||[]).map(b => b.slot_id));
  // الفترة تختفي لو انتهى وقتها (end_time فات)، سواء اليوم خلص أو الفترة نفسها عدت، حتى لو محدش حجزها
  const upcoming = (slots||[]).filter(s => new Date(s.end_time) > new Date());

  if(upcoming.length === 0){
    container.innerHTML = `<div class="placeholder-panel"><div class="icon">📅</div><h3>مفيش مواعيد متاحة دلوقتي</h3><p>تواصل معايا عبر واتساب عشان نتفق على معاد.</p></div>`;
    return;
  }

  const grouped = {};
  upcoming.forEach(s => {
    const key = new Date(s.start_time).toISOString().split('T')[0];
    if(!grouped[key]) grouped[key] = [];
    grouped[key].push(s);
  });
  const sortedDates = Object.keys(grouped).sort();
  if(!selectedMeetDay || !grouped[selectedMeetDay]) selectedMeetDay = sortedDates[0];

  container.innerHTML = `
    <div class="section-head" style="margin-bottom:18px;">
      <div class="section-titles"><h2>احجز ميعاد الميتينج</h2><p>اختار اليوم، وبعدين الوقت اللي يناسبك</p></div>
    </div>
    <div class="meet-daytabs">
      ${sortedDates.map(d => {
        const dayName = WEEKDAY_NAMES[new Date(d).getDay()];
        return `<button class="meet-day-btn ${d===selectedMeetDay?'active':''}" data-day="${d}">${dayName} ${new Date(d).toLocaleDateString('ar-EG',{day:'numeric',month:'numeric'})}</button>`;
      }).join('')}
    </div>
    <div id="meetSlotsList"></div>
  `;
  container.querySelectorAll('.meet-day-btn').forEach(btn => {
    btn.addEventListener('click', () => { selectedMeetDay = btn.dataset.day; renderMeetingsTab(); });
  });
  renderMeetSlotsList(grouped[selectedMeetDay], bookedIds);
}

function renderMeetSlotsList(daySlots, bookedIds){
  const list = document.getElementById('meetSlotsList');
  list.innerHTML = daySlots.map(s => {
    const isBooked = bookedIds.has(s.id);
    const start = new Date(s.start_time).toLocaleTimeString('ar-EG', { hour:'2-digit', minute:'2-digit' });
    const end = new Date(s.end_time).toLocaleTimeString('ar-EG', { hour:'2-digit', minute:'2-digit' });
    return `<button class="meet-slot-btn" data-id="${s.id}" ${isBooked?'disabled':''}>${start} — ${end} ${isBooked ? '— محجوز' : ''}</button>`;
  }).join('');
  list.querySelectorAll('.meet-slot-btn:not(:disabled)').forEach(btn => {
    btn.addEventListener('click', () => bookSlot(btn.dataset.id));
  });
}

async function bookSlot(slotId){
  const { error } = await supabaseClient.from('meeting_bookings').insert([{ slot_id: slotId, user_id: session.user.id }]);
  if(error){
    if(error.code === '23505'){ alert('المعاد ده اتحجز لتوه، اختار معاد تاني.'); }
    else{ alert('حصل خطأ، حاول تاني.'); console.error(error); }
    renderMeetingsTab();
    return;
  }
  renderMeetingsTab();
}

function renderMeetingBooked(startTime, endTime, slotId){
  const container = document.getElementById('tabContent');
  const startStr = new Date(startTime).toLocaleString('ar-EG');
  const endStr = new Date(endTime).toLocaleTimeString('ar-EG', { hour:'2-digit', minute:'2-digit' });
  container.innerHTML = `
    <div class="meet-booked-card">
      <div class="mark">✓</div>
      <h2 style="font-family:'Cairo';color:var(--green-900);">معادك محجوز</h2>
      <p style="color:var(--ink-dim);">${startStr} — ${endStr}</p>
      <div class="meet-countdown" id="countdownEl">--:--:--</div>
      <div id="meetLinkArea"></div>
    </div>
  `;
  updateCountdown(startTime, slotId);
  countdownTimer = setInterval(() => updateCountdown(startTime, slotId), 1000);
}

let linkFetched = false;
async function updateCountdown(startTime, slotId){
  const diff = new Date(startTime).getTime() - Date.now();
  const el = document.getElementById('countdownEl');
  if(!el) return;

  if(diff <= 0){
    el.textContent = "الميتينج بدأ";
  } else {
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  if(diff <= 10*60*1000 && !linkFetched){
    linkFetched = true;
    const { data } = await supabaseClient.from('meeting_links').select('link').eq('slot_id', slotId).maybeSingle();
    const area = document.getElementById('meetLinkArea');
    if(data && data.link && area){
      area.innerHTML = `
        <div class="meet-ready">
          <p style="margin:0 0 10px;font-family:'Cairo';font-weight:700;color:var(--ok);">الميتينج قرّب — تقدر تدخل دلوقتي</p>
          <a href="${data.link}" target="_blank"><button class="btn primary">ادخل الميتينج ↗</button></a>
        </div>
      `;
    }
  }
}

function renderAccountTab(){
  const meta = session.user.user_metadata || {};
  document.getElementById('tabContent').innerHTML = `
    <div class="account-panel">
      <div class="avatar-upload-wrap">
        <div class="avatar-current avatar-placeholder" id="avatarWrap">
          ${avatarUrl ? `<img id="avatarImg" src="${avatarUrl}" alt="صورتك">` : `<span id="avatarImg" class="avatar-empty-icon">👤</span>`}
        </div>
        <div class="avatar-edit-btn" id="avatarEditBtn">✎</div>
        <input type="file" id="avatarInput" accept="image/*" style="display:none;">
      </div>
      <div id="avatarStatus" style="font-size:12px;color:var(--ink-dim);margin-bottom:16px;"></div>
      <div class="account-field"><label>الاسم</label><div class="val">${meta.full_name || '—'}</div></div>
      <div class="account-field"><label>رقم الهاتف</label><div class="val">${meta.phone || '—'}</div></div>
      <div class="account-field"><label>البريد الإلكتروني</label><div class="val">${session.user.email}</div></div>
    </div>
  `;
  document.getElementById('avatarEditBtn').addEventListener('click', () => document.getElementById('avatarInput').click());
  document.getElementById('avatarInput').addEventListener('change', handleAvatarUpload);
}

async function handleAvatarUpload(e){
  const file = e.target.files[0];
  if(!file) return;
  const statusEl = document.getElementById('avatarStatus');
  statusEl.textContent = "جاري الرفع...";
  const ext = file.name.split('.').pop();
  const path = `${session.user.id}/avatar.${ext}`;
  const { error: upErr } = await supabaseClient.storage.from('avatars').upload(path, file, { upsert: true });
  if(upErr){ statusEl.textContent = "حصل خطأ في الرفع، حاول تاني"; console.error(upErr); return; }
  const { data: pub } = supabaseClient.storage.from('avatars').getPublicUrl(path);
  const newUrl = pub.publicUrl + '?t=' + Date.now();
  const { error: updErr } = await supabaseClient.auth.updateUser({ data: { avatar_url: newUrl } });
  if(updErr){ statusEl.textContent = "اتحفظت الصورة بس حصل خطأ بسيط، جرب تحدّث الصفحة"; return; }
  avatarUrl = newUrl;
  document.getElementById('avatarWrap').innerHTML = `<img id="avatarImg" src="${newUrl}" alt="صورتك">`;
  statusEl.textContent = "تم تحديث الصورة ✓";
}

/* ===================== WHATSAPP ===================== */
function setupWhatsapp(){
  document.getElementById('whatsappBtn').addEventListener('click', () => {
    const msg = encodeURIComponent("أهلاً، حابب أتواصل معاك بخصوص حملة إعلانية.");
    window.open(`https://wa.me/${SITE_CONTENT.whatsappNumber}?text=${msg}`, '_blank');
  });
}

/* ===================== ABOUT PAGE ===================== */
function renderAbout(){
  const root = document.getElementById('appRoot');
  root.innerHTML = `
    <div class="about-page">
      <div class="about-inner">
        <div class="about-top">
          <span class="eyebrow-tag">ABDELAZIZ MEDIA BUYER</span>
          <span class="badge-pill">بريف اكتشاف عميل</span>
        </div>

        <div class="about-hero">
          <div class="about-photo-col">
            <img class="about-photo" src="${SITE_CONTENT.photo}" alt="${SITE_CONTENT.name}">
            <h2 class="about-name">${SITE_CONTENT.name}</h2>
            <p class="about-role">${SITE_CONTENT.role}</p>
          </div>
          <div class="about-copy">
            <div class="kicker">قبل ما نبدأ نشتغل مع بعض</div>
            <h1>كل اللي محتاجين نعرفه عشان نسوّق <span>براندك</span> صح</h1>
            <p class="about-bio">${SITE_CONTENT.bio}</p>
            <div class="about-stats">
              <div class="stat"><b>10</b><span>أقسام بريف اكتشاف</span></div>
              <div class="stat"><b>1:1</b><span>متابعة مباشرة معايا</span></div>
              <div class="stat"><b>100%</b><span>خطة مبنية على بياناتك</span></div>
            </div>
          </div>
        </div>

        <div class="brief-explain-grid">
          <div class="brief-explain-card">
            <h3>يعني إيه Brief؟</h3>
            <p>${SITE_CONTENT.briefWhat}</p>
          </div>
          <div class="brief-explain-card">
            <h3>ليه الـ Brief مهم؟</h3>
            <p>${SITE_CONTENT.briefWhy}</p>
          </div>
        </div>

        <div class="about-cta-row">
          <p>هذا المستند بيمثل الأجندة اللي هنمشي عليها في ميتينج الانطلاق. مفيش مشكلة لو بعض الإجابات مش جاهزة بالكامل.</p>
          <button class="start-btn" id="goAuthBtn">ابدأ البريف ←</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('goAuthBtn').addEventListener('click', () => { authMode = "signup"; renderAuth(); });
}

/* ===================== AUTH (LOGIN / SIGNUP) ===================== */
function renderAuth(){
  const root = document.getElementById('appRoot');
  const isSignup = authMode === "signup";
  root.innerHTML = `
    <div class="auth-wrap">
      <div class="auth-card">
        <h2>${isSignup ? 'إنشاء حساب' : 'تسجيل الدخول'}</h2>
        <p class="sub">${isSignup ? 'هتسجل مرة واحدة بس، وبعد كده هتدخل مباشرة من غير ما تكتب بياناتك تاني' : 'ادخل بياناتك اللي سجلت بيها'}</p>
        <div class="auth-err" id="authErr"></div>
        ${isSignup ? `
          <div class="auth-field"><label>الاسم</label><input type="text" id="af_name" placeholder="اسمك بالكامل"></div>
          <div class="auth-field"><label>رقم الهاتف</label><input type="tel" id="af_phone" placeholder="01xxxxxxxxx"></div>
        ` : ``}
        <div class="auth-field"><label>البريد الإلكتروني</label><input type="email" id="af_email" placeholder="example@email.com"></div>
        <div class="auth-field"><label>كلمة السر</label><input type="password" id="af_password" placeholder="8 أحرف على الأقل"></div>
        <button class="btn primary auth-submit" id="authSubmitBtn">${isSignup ? 'إنشاء الحساب والبدء' : 'دخول'}</button>
        <div class="auth-switch">
          ${isSignup
            ? `عندك حساب بالفعل؟ <button id="switchToLogin">سجّل دخول</button>`
            : `أول مرة تدخل؟ <button id="switchToSignup">اعمل حساب جديد</button>`}
        </div>
      </div>
    </div>
  `;
  const switchBtn = document.getElementById(isSignup ? 'switchToLogin' : 'switchToSignup');
  switchBtn.addEventListener('click', () => { authMode = isSignup ? "login" : "signup"; renderAuth(); });
  document.getElementById('authSubmitBtn').addEventListener('click', () => isSignup ? doSignup() : doLogin());
}

function showAuthError(msg){
  const el = document.getElementById('authErr');
  el.textContent = msg;
  el.classList.add('show');
}

async function doSignup(){
  const name = document.getElementById('af_name').value.trim();
  const phone = document.getElementById('af_phone').value.trim();
  const email = document.getElementById('af_email').value.trim();
  const password = document.getElementById('af_password').value;
  if(!name || !phone || !email || !password){ showAuthError('من فضلك املأ كل الحقول'); return; }
  if(password.length < 8){ showAuthError('كلمة السر لازم تكون 8 أحرف على الأقل'); return; }

  const btn = document.getElementById('authSubmitBtn');
  btn.disabled = true; btn.textContent = "جاري الإنشاء...";

  const { data, error } = await supabaseClient.auth.signUp({
    email, password,
    options: { data: { full_name: name, phone: phone } }
  });

  if(error){ showAuthError(mapAuthError(error.message)); btn.disabled = false; btn.textContent = "إنشاء الحساب والبدء"; return; }

  syncClientToSheet(name, phone, email);

  if(data.session){
    session = data.session;
    render();
  } else {
    showAuthError('تم إنشاء الحساب. لو مطلوب تأكيد الإيميل، افتح بريدك الإلكتروني وأكّده، وبعدين سجّل دخول.');
    btn.disabled = false; btn.textContent = "إنشاء الحساب والبدء";
  }
}

function syncClientToSheet(name, phone, email){
  if(!window.APP_CONFIG.GOOGLE_SHEET_SYNC_URL || !window.APP_CONFIG.GOOGLE_SHEET_SYNC_URL.startsWith('http')) return;
  fetch(window.APP_CONFIG.GOOGLE_SHEET_SYNC_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ name, phone, email, createdAt: new Date().toISOString() })
  }).catch(err => console.error('sheet sync error', err));
}

async function doLogin(){
  const email = document.getElementById('af_email').value.trim();
  const password = document.getElementById('af_password').value;
  if(!email || !password){ showAuthError('من فضلك اكتب الإيميل وكلمة السر'); return; }

  const btn = document.getElementById('authSubmitBtn');
  btn.disabled = true; btn.textContent = "جاري الدخول...";

  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if(error){ showAuthError(mapAuthError(error.message)); btn.disabled = false; btn.textContent = "دخول"; return; }

  session = data.session;
  render();
}

function mapAuthError(msg){
  if(msg.includes('Invalid login credentials')) return 'الإيميل أو كلمة السر غلط';
  if(msg.includes('already registered') || msg.includes('User already registered')) return 'الإيميل ده مسجل بالفعل، سجّل دخول بدل ما تعمل حساب جديد';
  if(msg.includes('Password should be')) return 'كلمة السر لازم تكون 8 أحرف على الأقل';
  return 'حصل خطأ، حاول تاني';
}

async function logout(){
  await supabaseClient.auth.signOut();
  session = null;
  current = 0;
  activeTab = "brief";
  myResponse = null;
  refCode = genRef();
  Object.keys(answers).forEach(k => { answers[k] = Array.isArray(answers[k]) ? [] : ""; });
  render();
}

/* ===================== BRIEF FORM ===================== */
function isFieldFilled(q){
  const v = answers[q.id];
  if(q.multi) return Array.isArray(v) && v.length > 0;
  return v !== undefined && v !== null && String(v).trim() !== "";
}
function isStepValid(qs){ return qs.every(q => !q.required || isFieldFilled(q)); }

function renderFieldHtml(q){
  const val = answers[q.id];
  let inner = "";
  if(q.type === "textarea"){
    inner = `<textarea data-key="${q.id}" placeholder="اكتب هنا...">${val||''}</textarea>`;
  } else if(q.type === "chips"){
    inner = `<div class="chip-group">` + (q.options||[]).map(opt => {
      const selected = q.multi ? val.includes(opt) : val === opt;
      return `<div class="chip ${selected?'selected':''}" data-key="${q.id}" data-multi="${!!q.multi}" data-val="${opt}">${opt}</div>`;
    }).join("") + `</div>`;
  } else if(q.type === "file"){
    const hasFile = !!val;
    const isVideo = hasFile && /\.(mp4|mov|webm|m4v)(\?|$)/i.test(val);
    inner = `
      <div class="file-upload-box ${hasFile?'has-file':''}" data-file-key="${q.id}">
        <label class="file-upload-label">${hasFile ? 'تم الرفع — دوس تاني عشان تغيّر الملف' : '📎 دوس هنا عشان ترفع صورة أو فيديو'}</label>
        <input type="file" accept="image/*,video/*" data-file-input="${q.id}">
        <div class="file-upload-progress" data-file-progress="${q.id}"></div>
        ${hasFile ? `<div class="file-upload-preview">${isVideo ? `🎬 <a href="${val}" target="_blank">عرض الفيديو</a>` : `<img src="${val}">`}</div>` : ``}
      </div>
    `;
  } else {
    inner = `<input type="${q.type}" data-key="${q.id}" value="${val||''}" placeholder="اكتب هنا...">`;
  }
  return `<div class="field"><label>${q.label}</label>${inner}</div>`;
}
function bindFieldEvents(container, onChange){
  container.querySelectorAll('input[data-key], textarea[data-key]').forEach(el => {
    el.addEventListener('input', e => { answers[e.target.dataset.key] = e.target.value; onChange(); });
  });
  container.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const key = chip.dataset.key, multi = chip.dataset.multi === "true", v = chip.dataset.val;
      if(multi){ const arr = answers[key]; const i = arr.indexOf(v); if(i>-1) arr.splice(i,1); else arr.push(v); }
      else{ answers[key] = (answers[key] === v) ? "" : v; }
      renderWizardStep();
    });
  });
  container.querySelectorAll('.file-upload-box').forEach(box => {
    box.addEventListener('click', (e) => {
      if(e.target.tagName === 'A') return;
      box.querySelector('input[type=file]').click();
    });
  });
  container.querySelectorAll('input[data-file-input]').forEach(el => {
    el.addEventListener('change', (e) => handleQuestionFileUpload(e, onChange));
  });
}

async function handleQuestionFileUpload(e, onChange){
  const file = e.target.files[0];
  const qId = e.target.dataset.fileInput;
  if(!file) return;
  const progressEl = document.querySelector(`[data-file-progress="${qId}"]`);
  progressEl.textContent = "جاري الرفع...";
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
  const path = `${session.user.id}/${qId}-${Date.now()}-${safeName}`;
  const { error: upErr } = await supabaseClient.storage.from('brief-uploads').upload(path, file);
  if(upErr){ progressEl.textContent = "حصل خطأ في الرفع، حاول تاني"; console.error(upErr); return; }
  const { data: pub } = supabaseClient.storage.from('brief-uploads').getPublicUrl(path);
  answers[qId] = pub.publicUrl;
  onChange();
  renderWizardStep();
}

/* ===================== BRIEF TAB (summary أو الويزارد) ===================== */
function renderBriefTab(){
  // معندوش بريف قبل كده → يبدأ الويزارد لأول مرة
  if(!myResponse){ current = 0; renderWizardStep(); return; }

  // عنده بريف قبل كده، بس فيه موافقة جديدة على "بريف تاني" بعد آخر بريف بعته
  const approvedAfterLastSubmit = myRequest && myRequest.status === 'approved' &&
    new Date(myRequest.created_at) > new Date(myResponse.submitted_at);
  if(approvedAfterLastSubmit){ current = 0; renderWizardStep(); return; }

  // فيه طلب لسه قيد المراجعة
  const pendingAfterLastSubmit = myRequest && myRequest.status === 'pending' &&
    new Date(myRequest.created_at) > new Date(myResponse.submitted_at);

  renderBriefSummary(pendingAfterLastSubmit);
}

function renderBriefSummary(isPending){
  const dateStr = new Date(myResponse.submitted_at).toLocaleString('ar-EG');
  document.getElementById('tabContent').innerHTML = `
    <div class="brief-summary">
      <div class="mark">✓</div>
      <h2>تم استلام البريف بتاعك</h2>
      <p>رقم المرجع: <b>${myResponse.ref}</b></p>
      <p>تاريخ الإرسال: ${dateStr}</p>
      <p style="font-size:13px;">هراجع البيانات ونتقابل ونتفق على الخطوة الجاية.</p>
      ${isPending
        ? `<div class="pending-note">طلبك لعمل بريف جديد قيد المراجعة، هتقدر تبدأ فور ما يتم الموافقة عليه.</div>`
        : `<div class="actions"><button class="btn" id="requestNewBtn">طلب بريف جديد</button></div>`
      }
    </div>
  `;
  const btn = document.getElementById('requestNewBtn');
  if(btn) btn.addEventListener('click', requestNewBrief);
}

async function requestNewBrief(){
  const { error } = await supabaseClient.from('brief_requests').insert([{ user_id: session.user.id, status: 'pending' }]);
  if(error){ alert('حصل خطأ، حاول تاني.'); console.error(error); return; }
  await checkMyRequest();
  renderBriefTab();
}

/* ===================== WIZARD ===================== */
function renderWizardStep(){
  const container = document.getElementById('tabContent');
  if(steps.length === 0){
    container.innerHTML = `<div class="admin-empty">مفيش أسئلة مضافة دلوقتي. تواصل معايا عبر واتساب.</div>`;
    return;
  }
  const stepData = steps[current];
  const isLast = current === steps.length - 1;
  const isCommercial = stepData.meta.isCommercial;

  container.innerHTML = `
    <div class="part-eyebrow">${stepData.meta.part}</div>
    <div class="progress-row">${steps.map((_,i)=>`<div class="progress-seg ${i<=current?'filled':''}"></div>`).join('')}</div>
    <div class="step-meta"><span>خطوة ${current+1} من ${steps.length}</span><span>${stepData.meta.title}</span></div>
    ${isCommercial ? `
      <div class="commercial-intro">${stepData.meta.title}</div>
      <p style="font-size:13px;color:var(--ink-dim);line-height:1.9;max-width:560px;margin:0 0 6px;">${stepData.meta.desc}</p>
      <div class="option-grid">
        ${OPTIONS_INFO.map(o => `
          <div class="option-card">
            <div class="opt-tag">${o.tag}</div><h4>${o.title}</h4><p>${o.body}</p>
            <div class="fit"><b>الأنسب لـ:</b> ${o.fit}</div>
          </div>`).join("")}
      </div>
      <div class="divider-dash" style="margin-right:0;"></div>
    ` : `
      <div class="section-head">
        <div class="badge-num">${stepData.meta.num}</div>
        <div class="section-titles"><h2>${stepData.meta.title}</h2><p>${stepData.meta.desc}</p></div>
      </div>
    `}
    ${current === 0 ? `
      <div class="field"><label>اسم البراند</label><input type="text" data-key="__brandName" value="${answers.brandName}" placeholder="اسم البراند"></div>
      <div class="field"><label>طبيعة النشاط</label><input type="text" data-key="__industry" value="${answers.industry}" placeholder="مثال: براند متوسط الحجم — عنده محل تجاري قائم وشغال"></div>
    ` : ``}
    ${stepData.qs.map(renderFieldHtml).join("")}
    <div class="nav-row">
      <button class="btn" id="prevBtn" ${current===0?'disabled':''}>السابق</button>
      <button class="btn primary" id="nextBtn">${isLast ? 'إرسال البريف' : 'التالي'}</button>
    </div>
  `;
  bindFieldEvents(container, () => updateNextBtn(stepData.qs));
  container.querySelectorAll('[data-key="__brandName"]').forEach(el => el.addEventListener('input', e => answers.brandName = e.target.value));
  container.querySelectorAll('[data-key="__industry"]').forEach(el => el.addEventListener('input', e => answers.industry = e.target.value));
  document.getElementById('prevBtn').addEventListener('click', goPrev);
  document.getElementById('nextBtn').addEventListener('click', () => isLast ? submitBrief() : goNext(stepData.qs));
  updateNextBtn(stepData.qs);
}
function updateNextBtn(qs){
  const btn = document.getElementById('nextBtn');
  if(!btn) return;
  btn.disabled = !isStepValid(qs);
}
function goPrev(){ if(current > 0){ current--; renderWizardStep(); } }
function goNext(qs){ if(!isStepValid(qs)) return; current++; renderWizardStep(); }

/* ===================== SUBMIT ===================== */
async function submitBrief(){
  const btn = document.getElementById('nextBtn');
  btn.disabled = true; btn.textContent = "جاري الإرسال...";
  const record = { ref: refCode, user_id: session.user.id, submitted_at: new Date().toISOString(), answers: answers };
  const { error } = await supabaseClient.from('responses').insert([record]);
  if(error){
    console.error('submit error', error);
    btn.disabled = false; btn.textContent = "إرسال البريف";
    alert('حصل خطأ أثناء الإرسال، حاول تاني.');
    return;
  }
  myResponse = record;
  renderBriefSummary();
}

/* ===================== INIT ===================== */
boot();
