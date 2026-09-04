/* =========================================================
   CLIENT APP - app.js (Updated & Fixed)
   ========================================================= */

// 1. إعادة بناء الخطوات والأسئلة لضمان ظهور كافة الأسئلة والأقسام
function rebuildSteps() {
  questions.forEach(q => { 
    if (!(q.id in answers)) answers[q.id] = q.multi ? [] : ""; 
  });

  steps = sections
    .map(meta => ({ 
      meta, 
      qs: questions.filter(q => q.sectionKey === meta.key) 
    }))
    .filter(s => s.qs.length > 0 || s.meta.isCommercial); // السماح بظهور الأقسام الاستعراضية/التجارية
}

// 2. عرض المواعيد المتاحة والحجوزات بشكل ديناميكي
async function renderMeetingsTab() {
  const container = document.getElementById('tabContent');
  if (!container) return;

  container.innerHTML = `<div class="load-msg">جاري التحميل...</div>`;
  if (typeof countdownTimer !== 'undefined' && countdownTimer) { 
    clearInterval(countdownTimer); 
    countdownTimer = null; 
  }

  // التأكد من حجز المستخدم الحالي
  const { data: myBooking } = await supabaseClient
    .from('meeting_bookings')
    .select('id, slot_id')
    .eq('user_id', session.user.id)
    .maybeSingle();

  if (myBooking) {
    const { data: slot } = await supabaseClient
      .from('meeting_slots')
      .select('start_time, end_time')
      .eq('id', myBooking.slot_id)
      .maybeSingle();
      
    if (slot && typeof renderMeetingBooked === 'function') { 
      renderMeetingBooked(slot.start_time, slot.end_time, myBooking.slot_id); 
      return; 
    }
  }

  // جلب كافة المواعيد المتاحة
  const { data: slots, error: slotErr } = await supabaseClient
    .from('meeting_slots')
    .select('id, start_time, end_time')
    .order('start_time', { ascending: true });

  const { data: bookings } = await supabaseClient
    .from('meeting_bookings')
    .select('slot_id');

  const bookedIds = new Set((bookings || []).map(b => b.slot_id));
  
  // تصفية المواعيد القادمة فقط
  const upcoming = (slots || []).filter(s => new Date(s.start_time).getTime() > Date.now());

  if (upcoming.length === 0) {
    container.innerHTML = `
      <div class="placeholder-panel">
        <div class="icon">📅</div>
        <h3>مفيش مواعيد متاحة دلوقتي</h3>
        <p>تواصل معايا عبر واتساب عشان نتفق على معاد.</p>
      </div>`;
    return;
  }

  const grouped = {};
  upcoming.forEach(s => {
    const key = new Date(s.start_time).toISOString().split('T')[0];
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(s);
  });

  const sortedDates = Object.keys(grouped).sort();
  if (typeof selectedMeetDay === 'undefined' || !selectedMeetDay || !grouped[selectedMeetDay]) {
    selectedMeetDay = sortedDates[0];
  }

  const WEEKDAY_NAMES = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  container.innerHTML = `
    <div class="section-head" style="margin-bottom:18px;">
      <div class="section-titles">
        <h2>احجز ميعاد الميتينج</h2>
        <p>اختار اليوم، وبعدين الوقت اللي يناسبك</p>
      </div>
    </div>
    <div class="meet-daytabs">
      ${sortedDates.map(d => {
        const dayName = WEEKDAY_NAMES[new Date(d).getDay()];
        return `<button class="meet-day-btn ${d === selectedMeetDay ? 'active' : ''}" data-day="${d}">${dayName} ${new Date(d).toLocaleDateString('ar-EG', { day: 'numeric', month: 'numeric' })}</button>`;
      }).join('')}
    </div>
    <div id="meetSlotsList"></div>
  `;

  container.querySelectorAll('.meet-day-btn').forEach(btn => {
    btn.addEventListener('click', () => { 
      selectedMeetDay = btn.dataset.day; 
      renderMeetingsTab(); 
    });
  });

  if (typeof renderMeetSlotsList === 'function') {
    renderMeetSlotsList(grouped[selectedMeetDay], bookedIds);
  }
}
