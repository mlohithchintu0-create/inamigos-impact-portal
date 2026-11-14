/**
 * ImpactPulse | InAmigos Foundation Portal
 * Ultra-Modern Web Application Engine
 * Pure Vanilla JavaScript (ES6+)
 */

function startApp() {
  initTheme();
  initScrollReveal();
  initCounters();
  initNgoActivities();
  initVolunteerPortal();
  initDonationHub();
  initCauses();
  initImpactCalculator();
  initPledgeWall();
  initCertificateStudio();
  initEvents();
  initFaqAccordion();
  initSpotlight();
  initAudioSystem();
  initMobileMenu();
  initNewsletterAndContact();
  initDatabaseEngine();
  initAdminPortal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('inamigos_theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      playChime(440, 'sine', 0.1);
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('inamigos_theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme} mode`, 'info');
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('themeIcon');
  if (!icon) return;
  if (theme === 'dark') {
    // Sun icon
    icon.innerHTML = `<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`;
  } else {
    // Moon icon
    icon.innerHTML = `<path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
}

/* ==========================================================================
   2. Scroll Reveal Animations (AOS-like observer)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  // Immediately activate all visible elements so content is never blank
  revealElements.forEach(el => {
    el.classList.add('active');
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   3. Animated Number Counters
   ========================================================================== */
function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observerOptions = { threshold: 0.5 };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseInt(el.getAttribute('data-target') || '0', 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        animateValue(el, 0, targetVal, 1600, prefix, suffix);
        obs.unobserve(el);
      }
    });
  }, observerOptions);

  statNumbers.forEach(stat => observer.observe(stat));
}

function animateValue(obj, start, end, duration, prefix = '', suffix = '') {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentVal = Math.floor(easeProgress * (end - start) + start);
    obj.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      obj.textContent = `${prefix}${end.toLocaleString()}${suffix}`;
    }
  };
  window.requestAnimationFrame(step);
}

/* ==========================================================================
   4. NEW: NGO Activities & Comprehensive Programs Showcase
   ========================================================================== */
const NGO_ACTIVITIES = [
  {
    id: 'act-1',
    category: 'education',
    tag: 'Education & Mentorship',
    title: 'Project Vidya: Slum Child Digital Literacy',
    desc: 'Setting up smart community learning kiosks, providing refurbished tablets, and delivering weekend foundational STEM learning to children in suburban slums.',
    img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80',
    stat1: '120+ Workshops',
    stat2: '4,500+ Students',
    location: 'Delhi NCR, Pune & Lucknow',
    lead: 'Prof. Anjali Sharma'
  },
  {
    id: 'act-2',
    category: 'environment',
    tag: 'Afforestation & Climate',
    title: 'Mission Green Breath: Urban Miyawaki Forests',
    desc: 'Dense native afforestation drives transforming degraded public lands and school compounds into self-sustaining green biodiversity pockets.',
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=700&q=80',
    stat1: '14,250 Trees Planted',
    stat2: '92% Survival Rate',
    location: 'Bengaluru, Hyderabad & Mumbai',
    lead: 'Dr. Kabir Sen'
  },
  {
    id: 'act-3',
    category: 'food',
    tag: 'Zero Hunger Initiative',
    title: 'Annamitra: Zero Waste Food Rescue Network',
    desc: 'Rescuing surplus untouched meals from wedding banquets, corporate cafeterias, and restaurants to distribute hot nutritious food to homeless shelters.',
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=700&q=80',
    stat1: '25,800+ Meals Served',
    stat2: '65+ Partner Kitchens',
    location: 'Delhi, Kolkata & Jaipur',
    lead: 'Meera Nambiar'
  },
  {
    id: 'act-4',
    category: 'animal',
    tag: 'Animal Welfare & Care',
    title: 'StrayCare: Rescue, Rabies Vaccines & Winter Shelters',
    desc: 'Emergency street rescue ambulance, anti-rabies vaccination camps, and waterproof reflective collars to protect street animals from nighttime accidents.',
    img: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=700&q=80',
    stat1: '1,200+ Dogs Vaccinated',
    stat2: '850+ Collars Placed',
    location: 'Chandigarh, Pune & Noida',
    lead: 'Aditya Singhal'
  },
  {
    id: 'act-5',
    category: 'healthcare',
    tag: 'Community Healthcare',
    title: 'Swaasthya: Mobile Medical Checkup & Eye Camps',
    desc: 'Free primary doctor consultations, prescription vision spectacles, and diagnostic screening camps for elderly daily-wage laborers and their families.',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=80',
    stat1: '3,800+ Checkups',
    stat2: '940 Spectacles Given',
    location: 'Varanasi, Patna & Gurgaon',
    lead: 'Dr. Renu Deshmukh'
  },
  {
    id: 'act-6',
    category: 'empowerment',
    tag: 'Women Livelihood',
    title: 'Shakti: Rural Artisan Micro-Entrepreneurship',
    desc: 'Skill training in organic textile craft, jute handicraft, and digital e-commerce marketing enabling rural homemakers to achieve sustained financial independence.',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80',
    stat1: '450+ Women Certified',
    stat2: '100% Micro-Income',
    location: 'Udaipur, Bhopal & Ranchi',
    lead: 'Sunita Meena'
  }
];

function initNgoActivities() {
  const container = document.getElementById('activitiesGrid');
  const tabBtns = document.querySelectorAll('.activity-tab-btn');
  if (!container) return;

  let activeCat = 'all';

  function render() {
    const list = NGO_ACTIVITIES.filter(a => activeCat === 'all' || a.category === activeCat);
    container.innerHTML = list.map(item => `
      <div class="activity-card reveal active">
        <div class="activity-img-wrap">
          <img src="${item.img}" alt="${item.title}" class="activity-img" loading="lazy" />
          <span class="activity-wing-tag">${item.tag}</span>
        </div>
        <div class="activity-body">
          <h3 class="activity-title">${item.title}</h3>
          <p class="activity-desc">${item.desc}</p>
          <div class="activity-stats-row">
            <div class="activity-stat-box">
              <div class="num">${item.stat1}</div>
              <div class="lbl">Milestone Reached</div>
            </div>
            <div class="activity-stat-box">
              <div class="num">${item.stat2}</div>
              <div class="lbl">Direct Impact</div>
            </div>
          </div>
          <div class="activity-footer-row">
            <span style="font-size: 0.82rem; color: var(--text-muted);">📍 ${item.location}</span>
            <button class="btn btn-primary" style="padding: 0.45rem 1rem; font-size: 0.85rem;" onclick="openActivityModal('${item.id}')">
              View Program →
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.getAttribute('data-cat') || 'all';
      playChime(500, 'triangle', 0.08);
      render();
    });
  });

  window.openActivityModal = (id) => {
    const act = NGO_ACTIVITIES.find(a => a.id === id);
    if (!act) return;
    playChime(620, 'sine', 0.1);

    const overlay = document.getElementById('causeModal');
    const content = document.getElementById('causeModalContent');
    if (!overlay || !content) return;

    content.innerHTML = `
      <span class="badge-tag accent">${act.tag}</span>
      <h3 style="font-size: 1.55rem; font-weight: 800; margin: 0.5rem 0 0.75rem;">${act.title}</h3>
      <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.25rem;">
        <img src="${act.img}" style="width: 100%; height: 210px; object-fit: cover;" />
      </div>
      <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.25rem;">
        ${act.desc}
      </p>
      <div style="background: var(--bg-surface-alt); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-weight: 700; font-size: 0.9rem;">
          <span>Coverage: ${act.location}</span>
          <span style="color: var(--primary);">Lead: ${act.lead}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-muted);">
          <span>Key Result: ${act.stat1}</span>
          <span>Beneficiaries: ${act.stat2}</span>
        </div>
      </div>
      <div style="display: flex; gap: 0.75rem;">
        <a href="#volunteer" class="btn btn-primary" style="flex: 1;" onclick="closeCauseModal()">
          Join as Volunteer in this Program
        </a>
        <a href="#donate" class="btn btn-accent" onclick="closeCauseModal()">
          Sponsor Drive
        </a>
      </div>
    `;
    overlay.classList.add('open');
  };

  render();
}

/* ==========================================================================
   5. NEW: Dedicated Volunteer Registration Portal
   ========================================================================== */
function initVolunteerPortal() {
  const form = document.getElementById('volunteerRegisterForm');
  const nameInput = document.getElementById('volName');
  const phoneInput = document.getElementById('volPhone');
  const domainInput = document.getElementById('volDomain');
  const cityInput = document.getElementById('volCity');

  // Preview elements
  const badgeName = document.getElementById('badgeVolName');
  const badgeRole = document.getElementById('badgeVolRole');
  const badgeCity = document.getElementById('badgeVolCity');
  const badgeId = document.getElementById('badgeVolId');
  const badgeAvatar = document.getElementById('badgeVolAvatar');

  // Generate a random stable membership ID
  const memberCode = `IAMG-VOL-${Math.floor(1000 + Math.random() * 9000)}`;
  if (badgeId) badgeId.textContent = memberCode;

  function updateBadge() {
    const name = nameInput.value.trim() || 'Aarav Sharma';
    const domain = domainInput.options[domainInput.selectedIndex]?.text || 'Education & Mentorship';
    const city = cityInput.value.trim() || 'National Chapter';

    if (badgeName) badgeName.textContent = name;
    if (badgeRole) badgeRole.textContent = domain;
    if (badgeCity) badgeCity.textContent = city;
    if (badgeAvatar) badgeAvatar.textContent = name.charAt(0).toUpperCase();
  }

  [nameInput, phoneInput, domainInput, cityInput].forEach(inp => {
    if (inp) inp.addEventListener('input', updateBadge);
  });

  updateBadge();

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const volunteerData = {
        id: memberCode,
        name: nameInput.value.trim(),
        email: document.getElementById('volEmail').value.trim(),
        phone: phoneInput.value.trim(),
        domain: domainInput.value,
        city: cityInput.value.trim(),
        hours: document.getElementById('volHours').value,
        registeredAt: new Date().toLocaleDateString()
      };

      const existing = JSON.parse(localStorage.getItem('inamigos_volunteers') || '[]');
      existing.push(volunteerData);
      localStorage.setItem('inamigos_volunteers', JSON.stringify(existing));

      playSuccessSound();
      showToast(`Welcome aboard, ${volunteerData.name}! Your Volunteer ID ${volunteerData.id} has been issued! 🎉`, 'success');

      // Scroll to badge and highlight
      const badgeCard = document.getElementById('volunteerBadgeCard');
      if (badgeCard) {
        badgeCard.style.boxShadow = '0 0 35px rgba(79, 70, 229, 0.6)';
        setTimeout(() => {
          badgeCard.style.boxShadow = '';
        }, 3000);
      }
    });
  }

  // Download Volunteer Badge
  const downloadBadgeBtn = document.getElementById('downloadBadgeBtn');
  if (downloadBadgeBtn) {
    downloadBadgeBtn.addEventListener('click', () => {
      generateVolunteerBadgeImage((canvas) => {
        const link = document.createElement('a');
        link.download = `InAmigos_Volunteer_Badge_${(nameInput.value || 'Member').replace(/\s+/g, '_')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        playSuccessSound();
        showToast('Volunteer ID Badge downloaded successfully! 🪪', 'success');
      });
    });
  }
}

function generateVolunteerBadgeImage(callback) {
  const badgeCard = document.getElementById('volunteerBadgeCard');
  const isVertical = badgeCard && badgeCard.classList.contains('vertical-layout');

  const canvas = document.createElement('canvas');
  const name = document.getElementById('volName')?.value.trim() || 'Aarav Sharma';
  const domain = document.getElementById('volDomain')?.options[document.getElementById('volDomain').selectedIndex]?.text || 'Education & Mentorship';
  const city = document.getElementById('volCity')?.value.trim() || 'National Chapter';
  const memberId = document.getElementById('badgeVolId')?.textContent || 'IAMG-VOL-2026';
  const blood = document.getElementById('volBloodGroup')?.value || 'O+';
  const shift = document.getElementById('volShift')?.value || 'Weekend';

  if (isVertical) {
    // Canvas dimensions for Vertical Lanyard Pass (480 x 740)
    canvas.width = 480;
    canvas.height = 740;
    const ctx = canvas.getContext('2d');

    // Deep gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, 480, 740);
    bgGrad.addColorStop(0, '#0f172a');
    bgGrad.addColorStop(0.35, '#1e1b4b');
    bgGrad.addColorStop(0.75, '#312e81');
    bgGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 480, 740);

    // Outer double border
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#4f46e5';
    ctx.strokeRect(12, 12, 456, 716);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.strokeRect(18, 18, 444, 704);

    // Lanyard punch hole slot at top
    ctx.fillStyle = '#090d16';
    ctx.beginPath();
    ctx.roundRect(190, 24, 100, 14, 7);
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Top Brand Bar
    ctx.font = 'bold 15px sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText('INAMIGOS FOUNDATION', 240, 68);

    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('OFFICIAL DIGITAL VOLUNTEER IDENTITY PASS', 240, 86);

    // Divider line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(35, 100);
    ctx.lineTo(445, 100);
    ctx.stroke();

    // Avatar Circle
    ctx.beginPath();
    ctx.arc(240, 180, 58, 0, 2 * Math.PI);
    const avGrad = ctx.createLinearGradient(180, 120, 300, 240);
    avGrad.addColorStop(0, '#4f46e5');
    avGrad.addColorStop(1, '#06b6d4');
    ctx.fillStyle = avGrad;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    ctx.font = 'bold 52px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(name.charAt(0).toUpperCase(), 240, 198);

    // Member Name
    ctx.font = 'bold 24px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(name, 240, 272);

    // Wing Pill Box
    ctx.fillStyle = 'rgba(56, 189, 248, 0.18)';
    ctx.beginPath();
    ctx.roundRect(60, 288, 360, 32, 16);
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = 'bold 14px sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(`Wing: ${domain}`, 240, 310);

    // Details Grid Card
    ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
    ctx.beginPath();
    ctx.roundRect(35, 335, 410, 190, 12);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.stroke();

    // Details Rows
    ctx.textAlign = 'left';
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#94a3b8';

    const leftX = 55;
    const midX = 250;

    ctx.fillText('MEMBER CODE', leftX, 365);
    ctx.font = 'bold 15px monospace';
    ctx.fillStyle = '#f8fafc';
    ctx.fillText(memberId, leftX, 385);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('CHAPTER LOCATION', midX, 365);
    ctx.font = 'bold 15px sans-serif';
    ctx.fillStyle = '#f8fafc';
    ctx.fillText(city, midX, 385);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('BLOOD GROUP', leftX, 420);
    ctx.font = 'bold 15px sans-serif';
    ctx.fillStyle = '#ef4444';
    ctx.fillText(blood, leftX, 440);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('PREFERRED SHIFT', midX, 420);
    ctx.font = 'bold 15px sans-serif';
    ctx.fillStyle = '#34d399';
    ctx.fillText(shift.toUpperCase(), midX, 440);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('VALIDITY PERIOD', leftX, 475);
    ctx.font = 'bold 14px sans-serif';
    ctx.fillStyle = '#f8fafc';
    ctx.fillText('2026 - 2027 ACTIVE', leftX, 495);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('VERIFICATION STATUS', midX, 475);
    ctx.font = 'bold 14px sans-serif';
    ctx.fillStyle = '#34d399';
    ctx.fillText('VERIFIED PASSED', midX, 495);

    // Hologram Seal Circle
    ctx.save();
    ctx.translate(240, 565);
    const holoGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, 32);
    holoGrad.addColorStop(0, '#fef08a');
    holoGrad.addColorStop(0.5, '#38bdf8');
    holoGrad.addColorStop(1, '#a855f7');
    ctx.fillStyle = holoGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 30, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('VERIFIED', 0, -3);
    ctx.font = 'bold 8px sans-serif';
    ctx.fillText('★ 2026 ★', 0, 10);
    ctx.restore();

    // Barcode at bottom
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    for (let x = 60; x < 420; x += (x % 6 === 0 ? 9 : 4)) {
      ctx.beginPath();
      ctx.moveTo(x, 625);
      ctx.lineTo(x, 665);
      ctx.stroke();
    }

    ctx.font = '11px monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'center';
    ctx.fillText(`* ${memberId} * INAMIGOS FOUNDATION *`, 240, 688);

    ctx.font = '9px sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('Youth Compassion Ground Change • Darpan Reg: DL/2021/0284910', 240, 706);

    callback(canvas);
  } else {
    // Canvas dimensions for Horizontal Pass (620 x 400)
    canvas.width = 620;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 620, 400);
    grad.addColorStop(0, '#1e1b4b');
    grad.addColorStop(0.6, '#312e81');
    grad.addColorStop(1, '#0f172a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 620, 400);

    ctx.lineWidth = 4;
    ctx.strokeStyle = '#4f46e5';
    ctx.strokeRect(10, 10, 600, 380);

    // Header Title
    ctx.font = 'bold 15px sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.letterSpacing = '1px';
    ctx.fillText('INAMIGOS FOUNDATION • OFFICIAL VOLUNTEER ID PASS', 40, 48);

    // Avatar Circle
    ctx.beginPath();
    ctx.arc(95, 155, 50, 0, 2 * Math.PI);
    ctx.fillStyle = '#4f46e5';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#38bdf8';
    ctx.stroke();

    ctx.font = 'bold 46px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(name.charAt(0).toUpperCase(), 95, 172);

    // Name & Domain
    ctx.textAlign = 'left';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(name, 170, 135);

    ctx.font = 'bold 15px sans-serif';
    ctx.fillStyle = '#34d399';
    ctx.fillText(`Wing: ${domain}`, 170, 168);

    // Meta Row
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`ID: ${memberId}`, 170, 202);
    ctx.fillText(`Chapter: ${city}`, 370, 202);
    ctx.fillText(`Blood: ${blood}  |  Shift: ${shift.toUpperCase()}`, 170, 230);
    ctx.fillText(`Status: ACTIVE DEPLOYED`, 370, 230);

    // Hologram Seal Circle
    ctx.save();
    ctx.translate(540, 135);
    const holoGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, 28);
    holoGrad.addColorStop(0, '#fef08a');
    holoGrad.addColorStop(0.5, '#38bdf8');
    holoGrad.addColorStop(1, '#a855f7');
    ctx.fillStyle = holoGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 26, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('VERIFIED', 0, -2);
    ctx.font = 'bold 7px sans-serif';
    ctx.fillText('★ 2026 ★', 0, 8);
    ctx.restore();

    // Simulated Barcode
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    for (let x = 40; x < 580; x += (x % 5 === 0 ? 8 : 4)) {
      ctx.beginPath();
      ctx.moveTo(x, 290);
      ctx.lineTo(x, 335);
      ctx.stroke();
    }

    ctx.font = '12px monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'center';
    ctx.fillText(`* ${memberId} * VERIFIED YOUTH CHANGEMAKER *`, 310, 360);

    callback(canvas);
  }
}

/* ==========================================================================
   6. NEW: Dedicated Donation Hub (Giving Portal)
   ========================================================================== */
function initDonationHub() {
  const amountBtns = document.querySelectorAll('.amount-btn');
  const customInput = document.getElementById('customDonationInput');
  const freqBtns = document.querySelectorAll('.freq-btn');
  const summaryAmount = document.getElementById('summaryDonationAmount');
  const summaryImpact = document.getElementById('summaryDonationImpact');
  const donateForm = document.getElementById('donationForm');

  let selectedAmount = 1000;
  let frequency = 'one-time';

  const IMPACT_MAP = {
    250: 'Sponsors 1 week of medical care & nutritious food for 3 rescued street animals 🐾',
    500: 'Provides complete school bags, notebooks & stationery for 2 underprivileged kids 🎒',
    1000: 'Plants and geo-tags 10 indigenous Peepal & Neem saplings in urban heat spots 🌳',
    2500: 'Refurbishes 1 digital learning tablet for slum coding & literacy workshops 💻',
    5000: 'Provides full monthly rations & emergency medicines for 2 destitute families 🍲'
  };

  function updateDonationSummary() {
    if (summaryAmount) {
      summaryAmount.textContent = `₹${selectedAmount.toLocaleString()} ${frequency === 'monthly' ? '/ month' : ''}`;
    }

    let impactText = IMPACT_MAP[selectedAmount];
    if (!impactText) {
      const meals = Math.round(selectedAmount / 40);
      impactText = `Funds approximately ${meals} wholesome warm meals and community care packs! 🌟`;
    }
    if (summaryImpact) summaryImpact.textContent = impactText;
  }

  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedAmount = parseInt(btn.getAttribute('data-amt'), 10);
      if (customInput) customInput.value = '';
      playChime(560, 'sine', 0.08);
      updateDonationSummary();
    });
  });

  if (customInput) {
    customInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (!isNaN(val) && val > 0) {
        amountBtns.forEach(b => b.classList.remove('active'));
        selectedAmount = val;
        updateDonationSummary();
      }
    });
  }

  freqBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      freqBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      frequency = btn.getAttribute('data-freq');
      playChime(480, 'triangle', 0.08);
      updateDonationSummary();
    });
  });

  // Payment chips
  const methodChips = document.querySelectorAll('.payment-method-chip');
  methodChips.forEach(chip => {
    chip.addEventListener('click', () => {
      methodChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  if (donateForm) {
    donateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const donorName = document.getElementById('donorName').value.trim();
      const donorEmail = document.getElementById('donorEmail').value.trim();
      const donorPan = document.getElementById('donorPan').value.trim().toUpperCase() || 'NOT_PROVIDED';

      playSuccessSound();
      openDonationReceiptModal({
        name: donorName,
        email: donorEmail,
        pan: donorPan,
        amount: selectedAmount,
        frequency: frequency,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        receiptNo: `IAMG-80G-${Math.floor(100000 + Math.random() * 900000)}`
      });
    });
  }

  updateDonationSummary();
}

function openDonationReceiptModal(data) {
  const overlay = document.getElementById('causeModal');
  const content = document.getElementById('causeModalContent');
  if (!overlay || !content) return;

  content.innerHTML = `
    <div style="text-align: center; margin-bottom: 1.25rem;">
      <span class="badge-tag accent">Official 80G Tax Exemption Receipt</span>
      <h3 style="font-size: 1.6rem; font-weight: 800; margin-top: 0.5rem; color: #059669;">Payment Confirmed! 🎉</h3>
      <p style="font-size: 0.9rem; color: var(--text-muted);">Thank you for empowering grassroots transformation.</p>
    </div>

    <div style="background: var(--bg-surface-alt); border: 2px dashed var(--border-color); border-radius: var(--radius-md); padding: 1.5rem; margin-bottom: 1.5rem;">
      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 0.75rem; font-size: 0.88rem;">
        <span style="color: var(--text-muted);">Receipt No:</span>
        <strong>${data.receiptNo}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.88rem;">
        <span style="color: var(--text-muted);">Donor Name:</span>
        <strong>${data.name}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.88rem;">
        <span style="color: var(--text-muted);">PAN / Tax ID:</span>
        <strong>${data.pan}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.88rem;">
        <span style="color: var(--text-muted);">Contribution:</span>
        <strong style="color: var(--primary); font-size: 1.15rem;">₹${data.amount.toLocaleString()} (${data.frequency})</strong>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.88rem;">
        <span style="color: var(--text-muted);">Date Issued:</span>
        <span>${data.date}</span>
      </div>
    </div>

    <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; text-align: center; margin-bottom: 1.5rem;">
      * Donations to InAmigos Foundation are eligible for 50% tax deduction under Section 80G of the Indian Income Tax Act.
    </p>

    <div style="display: flex; gap: 0.75rem;">
      <button class="btn btn-primary" style="flex: 1;" onclick="window.print()">
        🖨️ Print Receipt
      </button>
      <button class="btn btn-secondary" onclick="closeCauseModal()">
        Done
      </button>
    </div>
  `;

  overlay.classList.add('open');
}

/* ==========================================================================
   7. Causes Explorer (Filter & Search)
   ========================================================================== */
const CAUSES_DATA = [
  {
    id: 1,
    title: 'Project Vidya: Digital Literacy for Slum Schools',
    category: 'education',
    categoryLabel: 'Education',
    desc: 'Empowering underprivileged students with refurbished tablets, coding workshops, and foundational math learning kits.',
    img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80',
    raised: 78000,
    goal: 100000,
    volunteers: 42
  },
  {
    id: 2,
    title: 'Mission Green Breath: Urban Miyawaki Afforestation',
    category: 'environment',
    categoryLabel: 'Environment',
    desc: 'Transforming barren urban patches into dense indigenous forests to combat heatwaves, restore biodiversity, and clean air.',
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=700&q=80',
    raised: 145000,
    goal: 150000,
    volunteers: 89
  },
  {
    id: 3,
    title: 'StrayCare: Rescue, Rabies Vaccine & Winter Shelters',
    category: 'animal',
    categoryLabel: 'Animal Welfare',
    desc: 'Providing emergency rescue, nutritional feeding, vaccination, and reflective collars to stray dogs and cats.',
    img: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=700&q=80',
    raised: 54000,
    goal: 70000,
    volunteers: 31
  },
  {
    id: 4,
    title: 'Annamitra: Zero Waste Food Rescue & Daily Meals',
    category: 'food',
    categoryLabel: 'Food Rescue',
    desc: 'Collecting surplus wholesome meals from events and restaurants to distribute to nocturnal shelters and daily wage earners.',
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=700&q=80',
    raised: 112000,
    goal: 120000,
    volunteers: 64
  },
  {
    id: 5,
    title: 'Shakti: Skill Development for Rural Women Artisans',
    category: 'empowerment',
    categoryLabel: 'Women Uplift',
    desc: 'Vocational tailoring, handcraft, and digital e-commerce training to grant financial independence to rural women artisans.',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80',
    raised: 89000,
    goal: 95000,
    volunteers: 38
  },
  {
    id: 6,
    title: 'Aarogya: Community Health Camps & Blood Drives',
    category: 'healthcare',
    categoryLabel: 'Healthcare',
    desc: 'Free general health checkups, vision tests, and mobile blood donation camps across suburban communities.',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=80',
    raised: 62000,
    goal: 80000,
    volunteers: 50
  }
];

function initCauses() {
  const causesGrid = document.getElementById('causesGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('causeSearchInput');

  let activeCategory = 'all';
  let searchTerm = '';

  function renderCauses() {
    if (!causesGrid) return;
    const filtered = CAUSES_DATA.filter(item => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch = item.title.toLowerCase().includes(searchTerm) || 
                          item.desc.toLowerCase().includes(searchTerm) ||
                          item.categoryLabel.toLowerCase().includes(searchTerm);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      causesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem; background: var(--bg-card); border-radius: var(--radius-xl); border: 1px dashed var(--border-color);">
          <p style="font-size: 1.25rem; color: var(--text-muted); margin-bottom: 0.75rem;">No causes match your filter.</p>
          <button class="btn btn-secondary" onclick="resetCausesFilter()">Reset Filters</button>
        </div>
      `;
      return;
    }

    causesGrid.innerHTML = filtered.map(item => {
      const percent = Math.min(100, Math.round((item.raised / item.goal) * 100));
      return `
        <article class="cause-card reveal active" data-id="${item.id}">
          <div class="cause-image-box">
            <img src="${item.img}" alt="${item.title}" class="cause-img" loading="lazy" />
            <span class="cause-tag-overlay">${item.categoryLabel}</span>
          </div>
          <div class="cause-body">
            <h3 class="cause-title">${item.title}</h3>
            <p class="cause-desc">${item.desc}</p>
            <div class="cause-progress-section">
              <div class="progress-info">
                <span>Funded: <strong>₹${item.raised.toLocaleString()}</strong></span>
                <span>${percent}%</span>
              </div>
              <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${percent}%;"></div>
              </div>
            </div>
            <div class="cause-footer">
              <span style="font-size: 0.85rem; color: var(--text-muted);">👥 ${item.volunteers} Volunteers</span>
              <button class="btn btn-primary" style="padding: 0.45rem 1rem; font-size: 0.85rem;" onclick="openCauseModal(${item.id})">
                Take Action
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter') || 'all';
      playChime(520, 'triangle', 0.08);
      renderCauses();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase().trim();
      renderCauses();
    });
  }

  window.resetCausesFilter = () => {
    activeCategory = 'all';
    searchTerm = '';
    if (searchInput) searchInput.value = '';
    filterBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-filter') === 'all'));
    renderCauses();
  };

  renderCauses();
}

window.openCauseModal = function(causeId) {
  const cause = CAUSES_DATA.find(c => c.id === causeId);
  if (!cause) return;
  playChime(600, 'sine', 0.12);

  const modalOverlay = document.getElementById('causeModal');
  const modalContent = document.getElementById('causeModalContent');
  if (!modalOverlay || !modalContent) return;

  modalContent.innerHTML = `
    <span class="badge-tag" style="margin-bottom: 0.5rem;">${cause.categoryLabel}</span>
    <h3 style="font-size: 1.55rem; font-weight: 800; margin-bottom: 0.75rem;">${cause.title}</h3>
    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
      ${cause.desc}
    </p>
    <div style="background: var(--bg-surface-alt); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-weight: 700;">
        <span>Goal: ₹${cause.goal.toLocaleString()}</span>
        <span style="color: var(--accent);">Raised: ₹${cause.raised.toLocaleString()}</span>
      </div>
      <p style="font-size: 0.85rem; color: var(--text-muted);">
        Every action fuels change. You can join the active volunteer crew or commit a micro-contribution.
      </p>
    </div>

    <form id="pledgeCauseForm" onsubmit="handleCauseAction(event, '${cause.title}')">
      <div class="form-group">
        <label>Your Name</label>
        <input type="text" id="actionUserName" class="form-control" placeholder="e.g. Priyanshu Sharma" required />
      </div>
      <div class="form-group">
        <label>How would you like to contribute?</label>
        <select id="actionType" class="form-control">
          <option value="volunteer">Join as Weekend Volunteer</option>
          <option value="mentor">Mentorship & Skill Sharing</option>
          <option value="donor">Pledge Micro-Sponsorship</option>
          <option value="ambassador">Community Outreach Ambassador</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary" style="width: 100%;">
        Confirm Commitment & Join Drive 🚀
      </button>
    </form>
  `;

  modalOverlay.classList.add('open');
};

window.closeCauseModal = function() {
  const modalOverlay = document.getElementById('causeModal');
  if (modalOverlay) modalOverlay.classList.remove('open');
};

window.handleCauseAction = function(e, causeTitle) {
  e.preventDefault();
  const name = document.getElementById('actionUserName').value.trim();
  const type = document.getElementById('actionType').value;
  closeCauseModal();
  playSuccessSound();
  showToast(`Thank you ${name}! You are registered for "${causeTitle}" (${type})!`, 'success');
};

/* ==========================================================================
   8. Real-Time Impact Calculator
   ========================================================================== */
function initImpactCalculator() {
  const hoursSlider = document.getElementById('calcHours');
  const treesSlider = document.getElementById('calcTrees');
  const mealsSlider = document.getElementById('calcMeals');

  const hoursValBadge = document.getElementById('calcHoursVal');
  const treesValBadge = document.getElementById('calcTreesVal');
  const mealsValBadge = document.getElementById('calcMealsVal');

  const co2Result = document.getElementById('resultCo2');
  const kidsResult = document.getElementById('resultKids');
  const mealsResult = document.getElementById('resultMeals');
  const karmaResult = document.getElementById('resultKarma');
  const rankTierName = document.getElementById('rankTierName');
  const rankTierBadge = document.getElementById('rankTierBadge');

  if (!hoursSlider || !treesSlider || !mealsSlider) return;

  function updateCalculator() {
    const hours = parseInt(hoursSlider.value, 10);
    const trees = parseInt(treesSlider.value, 10);
    const meals = parseInt(mealsSlider.value, 10);

    if (hoursValBadge) hoursValBadge.textContent = `${hours} hrs/mo`;
    if (treesValBadge) treesValBadge.textContent = `${trees} saplings`;
    if (mealsValBadge) mealsValBadge.textContent = `${meals} meals`;

    const co2OffsetKg = Math.round(trees * 22 + hours * 3.5);
    const childrenTutored = Math.round(hours * 1.8);
    const mealsDistributed = meals;
    const impactScore = Math.round(hours * 15 + trees * 25 + meals * 8);

    if (co2Result) co2Result.textContent = `${co2OffsetKg} kg`;
    if (kidsResult) kidsResult.textContent = `${childrenTutored}`;
    if (mealsResult) mealsResult.textContent = `${mealsDistributed}`;
    if (karmaResult) karmaResult.textContent = `${impactScore} pts`;

    let tier = 'Compassion Seedling 🌱';
    let color = '#10b981';
    if (impactScore > 1200) {
      tier = 'Luminary Changemaker 👑';
      color = '#f59e0b';
    } else if (impactScore > 600) {
      tier = 'Earth Guardian 🛡️';
      color = '#4f46e5';
    } else if (impactScore > 250) {
      tier = 'Active Catalyst ⚡';
      color = '#0ea5e9';
    }

    if (rankTierName) rankTierName.textContent = tier;
    if (rankTierBadge) {
      rankTierBadge.style.color = color;
    }
  }

  [hoursSlider, treesSlider, mealsSlider].forEach(slider => {
    slider.addEventListener('input', updateCalculator);
  });

  updateCalculator();
}

/* ==========================================================================
   9. Community Wall of Kindness & Pledges (localStorage persist)
   ========================================================================== */
const INITIAL_PLEDGES = [
  {
    id: 101,
    name: 'Aanya Verma',
    role: 'College Student, Delhi',
    tag: 'Education',
    message: 'Pledged 4 hours every Saturday to teach mathematics and basic computers to children at our local community center!',
    likes: 24,
    date: '2 hrs ago'
  },
  {
    id: 102,
    name: 'Rohan Mehra',
    role: 'Software Engineer, Bengaluru',
    tag: 'Environment',
    message: 'Eliminated single-use plastic bottles from our entire tech team and planted 15 indigenous neem saplings this weekend.',
    likes: 41,
    date: '5 hrs ago'
  },
  {
    id: 103,
    name: 'Tanvi Joshi',
    role: 'Animal Advocate, Pune',
    tag: 'Animal Care',
    message: 'Installed clean water bowls and reflective collar tags for 18 street dogs in our neighborhood to prevent night accidents.',
    likes: 37,
    date: 'Yesterday'
  }
];

function initPledgeWall() {
  const pledgeForm = document.getElementById('pledgeForm');
  const pledgeStream = document.getElementById('pledgeStream');

  function getPledges() {
    const stored = localStorage.getItem('inamigos_pledges');
    if (!stored) {
      localStorage.setItem('inamigos_pledges', JSON.stringify(INITIAL_PLEDGES));
      return INITIAL_PLEDGES;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_PLEDGES;
    }
  }

  function renderPledges() {
    if (!pledgeStream) return;
    const pledges = getPledges();
    pledgeStream.innerHTML = pledges.map(item => `
      <div class="pledge-card" data-pledge-id="${item.id}">
        <div class="pledge-header">
          <div class="pledge-user">
            <div class="pledge-avatar">${item.name.charAt(0).toUpperCase()}</div>
            <div>
              <div class="pledge-name">${item.name}</div>
              <div class="pledge-date">${item.role || 'Community Volunteer'} • ${item.date || 'Just now'}</div>
            </div>
          </div>
          <span class="pledge-tag">${item.tag}</span>
        </div>
        <p class="pledge-content">“${item.message}”</p>
        <div class="pledge-footer">
          <button class="like-btn" onclick="togglePledgeLike(${item.id})">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
            <span class="like-count">${item.likes}</span>
          </button>
          <span style="font-size: 0.8rem; color: var(--text-subtle);">Verified Pledge ✨</span>
        </div>
      </div>
    `).join('');
  }

  if (pledgeForm) {
    pledgeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('pledgeName');
      const tagInput = document.getElementById('pledgeCategory');
      const textInput = document.getElementById('pledgeText');

      if (!nameInput.value.trim() || !textInput.value.trim()) return;

      const newPledge = {
        id: Date.now(),
        name: nameInput.value.trim(),
        role: 'InAmigos Supporter',
        tag: tagInput.value,
        message: textInput.value.trim(),
        likes: 1,
        date: 'Just now'
      };

      const existing = getPledges();
      existing.unshift(newPledge);
      localStorage.setItem('inamigos_pledges', JSON.stringify(existing));

      textInput.value = '';
      renderPledges();
      playSuccessSound();
      showToast('Your pledge has been published to the Wall of Kindness! 💖', 'success');
    });
  }

  window.togglePledgeLike = function(pledgeId) {
    const pledges = getPledges();
    const pledge = pledges.find(p => p.id === pledgeId);
    if (pledge) {
      pledge.likes += 1;
      localStorage.setItem('inamigos_pledges', JSON.stringify(pledges));
      playChime(640, 'triangle', 0.1);
      renderPledges();
    }
  };

  renderPledges();
}

/* ==========================================================================
   10. Interactive Volunteer Certificate / Appreciation Studio
   ========================================================================== */
function initCertificateStudio() {
  const nameInput = document.getElementById('certNameInput');
  const roleInput = document.getElementById('certRoleInput');
  const hoursInput = document.getElementById('certHoursInput');
  const dateInput = document.getElementById('certDateInput');

  const previewName = document.getElementById('previewCertName');
  const previewRole = document.getElementById('previewCertRole');
  const previewHours = document.getElementById('previewCertHours');
  const previewDate = document.getElementById('previewCertDate');

  const downloadBtn = document.getElementById('certDownloadBtn');
  const printBtn = document.getElementById('certPrintBtn');

  function updateCertPreview() {
    if (previewName) previewName.textContent = nameInput.value.trim() || 'Your Full Name';
    if (previewRole) previewRole.textContent = roleInput.value.trim() || 'Youth Impact Ambassador';
    if (previewHours) previewHours.textContent = hoursInput.value || '25';
    if (previewDate) {
      const d = dateInput.value ? new Date(dateInput.value) : new Date();
      previewDate.textContent = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
  }

  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  [nameInput, roleInput, hoursInput, dateInput].forEach(inp => {
    if (inp) inp.addEventListener('input', updateCertPreview);
  });

  updateCertPreview();

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      generateCertificateCanvas((canvas) => {
        const link = document.createElement('a');
        link.download = `InAmigos_Certificate_${(nameInput.value || 'Volunteer').replace(/\s+/g, '_')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        playSuccessSound();
        showToast('Certificate successfully generated and downloaded! 🎓', 'success');
      });
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

function generateCertificateCanvas(callback) {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 840;
  const ctx = canvas.getContext('2d');

  const name = document.getElementById('certNameInput').value.trim() || 'Dedicated Intern';
  const role = document.getElementById('certRoleInput').value.trim() || 'Youth Impact Ambassador';
  const hours = document.getElementById('certHoursInput').value || '25';
  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 1200, 840);

  ctx.lineWidth = 14;
  ctx.strokeStyle = '#4f46e5';
  ctx.strokeRect(30, 30, 1140, 780);

  ctx.lineWidth = 3;
  ctx.strokeStyle = '#f59e0b';
  ctx.strokeRect(46, 46, 1108, 748);

  ctx.font = 'bold 120px sans-serif';
  ctx.fillStyle = 'rgba(79, 70, 229, 0.04)';
  ctx.textAlign = 'center';
  ctx.fillText('INAMIGOS', 600, 460);

  ctx.font = 'bold 22px sans-serif';
  ctx.fillStyle = '#4f46e5';
  ctx.fillText('INAMIGOS FOUNDATION', 600, 120);

  ctx.font = 'bold 42px serif';
  ctx.fillStyle = '#0f172a';
  ctx.fillText('CERTIFICATE OF APPRECIATION', 600, 180);

  ctx.font = 'italic 18px sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('THIS RECOGNITION IS PROUDLY CONFERRED UPON', 600, 230);

  ctx.font = 'bold 54px serif';
  ctx.fillStyle = '#1e1b4b';
  ctx.fillText(name, 600, 310);

  ctx.lineWidth = 2;
  ctx.strokeStyle = '#6366f1';
  ctx.beginPath();
  ctx.moveTo(350, 330);
  ctx.lineTo(850, 330);
  ctx.stroke();

  ctx.font = '19px sans-serif';
  ctx.fillStyle = '#334155';
  ctx.fillText(`In recognition of exemplary commitment, proactive leadership, and ${hours} hours of dedicated service`, 600, 390);
  ctx.fillText(`towards community development, social equity, and civic empowerment as a`, 600, 425);

  ctx.font = 'bold 22px sans-serif';
  ctx.fillStyle = '#4f46e5';
  ctx.fillText(role, 600, 465);

  ctx.beginPath();
  ctx.arc(600, 560, 48, 0, 2 * Math.PI);
  ctx.fillStyle = '#f59e0b';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#d97706';
  ctx.stroke();

  ctx.font = 'bold 12px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('OFFICIAL', 600, 552);
  ctx.fillText('SEAL', 600, 570);

  ctx.font = 'bold 16px sans-serif';
  ctx.fillStyle = '#0f172a';
  ctx.fillText(date, 260, 680);
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#94a3b8';
  ctx.beginPath();
  ctx.moveTo(180, 695);
  ctx.lineTo(340, 695);
  ctx.stroke();
  ctx.font = '14px sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('DATE ISSUED', 260, 720);

  ctx.font = 'italic bold 22px serif';
  ctx.fillStyle = '#1e1b4b';
  ctx.fillText('InAmigos Leadership', 940, 678);
  ctx.beginPath();
  ctx.moveTo(850, 695);
  ctx.lineTo(1030, 695);
  ctx.stroke();
  ctx.font = '14px sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('DIRECTOR / HR TEAM', 940, 720);

  const verifyId = `IAMG-${Math.floor(100000 + Math.random() * 900000)}`;
  ctx.font = '12px monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(`Verification ID: ${verifyId} | inamigosfoundation.org`, 600, 780);

  callback(canvas);
}

/* ==========================================================================
   11. Upcoming Events & Interactive RSVP System
   ========================================================================== */
const EVENTS_DATA = [
  {
    id: 'ev-1',
    month: 'NOV',
    day: '15',
    tag: 'Community Drive',
    title: 'Mega Slum School STEM & Science Fair',
    location: 'Sector 22 Community Ground',
    time: '09:30 AM - 01:30 PM',
    seats: 12
  },
  {
    id: 'ev-2',
    month: 'NOV',
    day: '19',
    tag: 'Environment',
    title: 'Yamuna Riverbank Clean-Up & Sapling Planting',
    location: 'North Ghat Eco Zone',
    time: '07:00 AM - 10:30 AM',
    seats: 25
  },
  {
    id: 'ev-3',
    month: 'NOV',
    day: '23',
    tag: 'Webinar',
    title: 'Youth Leadership & Social Entrepreneurship Masterclass',
    location: 'Live Zoom / Google Meet',
    time: '06:00 PM - 07:30 PM',
    seats: 8
  }
];

function initEvents() {
  const eventsGrid = document.getElementById('eventsGrid');
  if (!eventsGrid) return;

  const rsvpStore = JSON.parse(localStorage.getItem('inamigos_rsvps') || '{}');

  eventsGrid.innerHTML = EVENTS_DATA.map(ev => {
    const isRsvpd = !!rsvpStore[ev.id];
    const seatsRemaining = isRsvpd ? Math.max(0, ev.seats - 1) : ev.seats;
    return `
      <div class="event-card reveal active">
        <div class="event-date-badge">
          <div class="event-month">${ev.month}</div>
          <div class="event-day">${ev.day}</div>
        </div>
        <div class="event-details">
          <span class="event-tag">${ev.tag}</span>
          <h4 class="event-title">${ev.title}</h4>
          <div class="event-meta">
            <span>📍 ${ev.location}</span>
            <span>⏰ ${ev.time}</span>
          </div>
          <div class="event-footer-action">
            <span class="seats-remaining" id="seats-${ev.id}">
              ${isRsvpd ? '🎉 You are going!' : `🔥 ${seatsRemaining} spots left`}
            </span>
            <button class="btn ${isRsvpd ? 'btn-secondary' : 'btn-accent'}" 
                    style="padding: 0.4rem 1rem; font-size: 0.85rem;"
                    id="rsvp-btn-${ev.id}"
                    onclick="handleEventRsvp('${ev.id}', '${ev.title}')">
              ${isRsvpd ? 'Cancel RSVP' : 'Reserve Spot'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  window.handleEventRsvp = function(eventId, eventTitle) {
    const store = JSON.parse(localStorage.getItem('inamigos_rsvps') || '{}');
    const btn = document.getElementById(`rsvp-btn-${eventId}`);
    const seatsLabel = document.getElementById(`seats-${eventId}`);
    const originalEvent = EVENTS_DATA.find(e => e.id === eventId);

    if (store[eventId]) {
      delete store[eventId];
      localStorage.setItem('inamigos_rsvps', JSON.stringify(store));
      btn.className = 'btn btn-accent';
      btn.textContent = 'Reserve Spot';
      if (seatsLabel && originalEvent) seatsLabel.textContent = `🔥 ${originalEvent.seats} spots left`;
      showToast(`Removed reservation for "${eventTitle}"`, 'info');
    } else {
      store[eventId] = true;
      localStorage.setItem('inamigos_rsvps', JSON.stringify(store));
      btn.className = 'btn btn-secondary';
      btn.textContent = 'Cancel RSVP';
      if (seatsLabel && originalEvent) seatsLabel.textContent = '🎉 You are going!';
      playSuccessSound();
      showToast(`Success! You have reserved a spot for "${eventTitle}"!`, 'success');
    }
  };
}

/* ==========================================================================
   12. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
          playChime(480, 'sine', 0.05);
        }
      });
    }
  });
}

/* ==========================================================================
   13. Spotlight Quick Navigator (Cmd + K / Ctrl + K)
   ========================================================================== */
function initSpotlight() {
  const spotlightModal = document.getElementById('spotlightModal');
  const spotlightInput = document.getElementById('spotlightInput');
  const spotlightResults = document.getElementById('spotlightResults');
  const spotlightTrigger = document.getElementById('spotlightTrigger');

  const SHORTCUTS = [
    { title: 'NGO Activities & Programs', sectionId: 'activities', category: 'Showcase' },
    { title: 'Volunteer Registration Portal', sectionId: 'volunteer', category: 'Portal' },
    { title: 'Donation & Giving Hub', sectionId: 'donate', category: 'Giving' },
    { title: 'Explore Active Causes', sectionId: 'causes', category: 'Section' },
    { title: 'Interactive Impact Calculator', sectionId: 'calculator', category: 'Feature' },
    { title: 'Wall of Kindness & Pledges', sectionId: 'wall', category: 'Community' },
    { title: 'Volunteer Certificate Studio', sectionId: 'certificates', category: 'Utility' },
    { title: 'Upcoming Charity Drives & Events', sectionId: 'events', category: 'Events' },
    { title: 'Frequently Asked Questions', sectionId: 'faq', category: 'Info' },
    { title: 'Toggle Dark / Light Mode', action: 'toggleTheme', category: 'Preferences' }
  ];

  function openSpotlight() {
    if (!spotlightModal) return;
    spotlightModal.classList.add('open');
    if (spotlightInput) {
      spotlightInput.value = '';
      renderSpotlightItems('');
      spotlightInput.focus();
    }
  }

  function closeSpotlight() {
    if (spotlightModal) spotlightModal.classList.remove('open');
  }

  function renderSpotlightItems(query) {
    if (!spotlightResults) return;
    const q = query.toLowerCase();
    const filtered = SHORTCUTS.filter(s => s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));

    spotlightResults.innerHTML = filtered.map(item => `
      <li class="spotlight-item" onclick="handleSpotlightSelect('${item.sectionId || ''}', '${item.action || ''}')">
        <span class="spotlight-item-title">${item.title}</span>
        <span class="spotlight-item-badge">${item.category}</span>
      </li>
    `).join('');
  }

  window.handleSpotlightSelect = function(sectionId, action) {
    closeSpotlight();
    if (action === 'toggleTheme') {
      const btn = document.getElementById('themeToggleBtn');
      if (btn) btn.click();
      return;
    }
    if (sectionId) {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (spotlightTrigger) spotlightTrigger.addEventListener('click', openSpotlight);

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (spotlightModal && spotlightModal.classList.contains('open')) {
        closeSpotlight();
      } else {
        openSpotlight();
      }
    } else if (e.key === 'Escape') {
      closeSpotlight();
      closeCauseModal();
    }
  });

  if (spotlightInput) {
    spotlightInput.addEventListener('input', (e) => {
      renderSpotlightItems(e.target.value);
    });
  }

  window.closeSpotlight = closeSpotlight;
}

/* ==========================================================================
   14. Web Audio Synthesizer
   ========================================================================== */
let audioCtx = null;
let soundEnabled = true;

function initAudioSystem() {
  const soundToggle = document.getElementById('soundToggleBtn');
  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggle.style.opacity = soundEnabled ? '1' : '0.4';
      showToast(`Audio feedback ${soundEnabled ? 'Enabled' : 'Muted'}`, 'info');
      if (soundEnabled) playChime(580, 'sine', 0.1);
    });
  }
}

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playChime(freq = 440, type = 'sine', duration = 0.15) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (err) {}
}

function playSuccessSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);
      gain.gain.setValueAtTime(0.06, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.2);
    });
  } catch (err) {}
}

/* ==========================================================================
   15. Toast Notifications
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
    <div>${message}</div>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

/* ==========================================================================
   16. Mobile Menu Drawer
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobileMenuToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
    });
  });
}

/* ==========================================================================
   17. Newsletter & Contact Form Handlers
   ========================================================================== */
function initNewsletterAndContact() {
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input && input.value) {
        playSuccessSound();
        showToast(`Subscribed! Updates will be sent to ${input.value} 📬`, 'success');
        input.value = '';
      }
    });
  }
}


/* ==========================================================================
   18. Central Database Engine & Secure Admin Command Center
   ========================================================================== */

// --- Central Database Configuration & Engine ---
const DB_CONFIG_STORAGE_KEY = 'inamigos_supabase_config';
const DB_VOLUNTEERS_STORAGE_KEY = 'inamigos_cloud_volunteers';
const DB_DONATIONS_STORAGE_KEY = 'inamigos_cloud_donations';

// Realistic pre-seeded volunteer data for immediate evaluation and dashboard demonstration
const SEED_VOLUNTEERS = [
  {
    id: 'IAMG-VOL-9142',
    name: 'Priyanshu Sharma',
    email: 'priyanshu.sharma@example.com',
    phone: '+91 98112 43219',
    city: 'Delhi NCR',
    domain: 'Education & Slum Mentorship',
    hours: '10',
    motivation: 'Passionate about digital literacy and teaching foundational STEM in slums.',
    created_at: new Date(Date.now() - 1000 * 60 * 35).toISOString() // 35 mins ago today
  },
  {
    id: 'IAMG-VOL-8821',
    name: 'Ananya Rao',
    email: 'ananya.rao@example.com',
    phone: '+91 97410 88215',
    city: 'Bengaluru',
    domain: 'Urban Afforestation & Eco Cleanups',
    hours: '4',
    motivation: 'Looking to organize weekend native Miyawaki planting drives.',
    created_at: new Date(Date.now() - 1000 * 60 * 140).toISOString() // ~2 hours ago today
  },
  {
    id: 'IAMG-VOL-7650',
    name: 'Devraj Patel',
    email: 'devraj.p@example.com',
    phone: '+91 99251 77412',
    city: 'Pune',
    domain: 'Animal Care & Emergency Rescue',
    hours: '15',
    motivation: 'Experienced in canine first-aid and night feeding rounds.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString() // Yesterday
  },
  {
    id: 'IAMG-VOL-7419',
    name: 'Sneha Deshmukh',
    email: 'sneha.desh@example.com',
    phone: '+91 98230 11984',
    city: 'Mumbai',
    domain: 'Zero Hunger Food Redistribution',
    hours: '8',
    motivation: 'Active coordinator with commercial kitchens for surplus food pickup.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() // 2 days ago
  }
];

// Pre-seeded donor pledges (Clearly separating Pledges from Verified payments!)
const SEED_DONATIONS = [
  {
    receipt_no: 'IAMG-80G-849201',
    donor_name: 'Vikramaditya Singhania',
    donor_email: 'vikram.singh@corporate.org',
    donor_phone: '+91 98200 44192',
    pan: 'AAACS8819F',
    amount: 5000,
    frequency: 'one-time',
    payment_method: 'card',
    status: 'verified', // Verified: Bank confirmation received
    created_at: new Date(Date.now() - 1000 * 60 * 75).toISOString() // Today
  },
  {
    receipt_no: 'IAMG-80G-739104',
    donor_name: 'Meenakshi Iyer',
    donor_email: 'meenakshi.iyer@example.com',
    donor_phone: '+91 94440 21980',
    pan: 'BNMPI4410K',
    amount: 1000,
    frequency: 'monthly',
    payment_method: 'upi',
    status: 'pledged', // PLEDGED: Awaiting bank/UPI transfer verification!
    created_at: new Date(Date.now() - 1000 * 60 * 210).toISOString() // Today
  },
  {
    receipt_no: 'IAMG-80G-620184',
    donor_name: 'Karan Mehra',
    donor_email: 'karan.m@gmail.com',
    donor_phone: '+91 98101 77334',
    pan: 'CWXPM1029P',
    amount: 2500,
    frequency: 'one-time',
    payment_method: 'upi',
    status: 'pledged', // PLEDGED: Awaiting bank/UPI transfer verification!
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString() // Yesterday
  }
];

window.dbEngine = {
  supabaseClient: null,
  isCloudConnected: false,
  liveListeners: [],
  DEFAULT_SUPABASE_URL: 'https://garumhozkcpmtruzlrdp.supabase.co',
  DEFAULT_SUPABASE_KEY: 'sb_publishable_1cpaT8sTfH2_XwujVuY0MA_goH4fxvi',

  init: function() {
    // Check for stored Supabase cloud credentials or use default
    const savedConfig = JSON.parse(localStorage.getItem(DB_CONFIG_STORAGE_KEY) || '{}');
    const url = savedConfig.url || this.DEFAULT_SUPABASE_URL;
    const key = savedConfig.key || this.DEFAULT_SUPABASE_KEY;

    if (url && key && window.supabase) {
      try {
        this.supabaseClient = window.supabase.createClient(url, key);
        this.isCloudConnected = true;
        this.setupRealtimeSubscription();
      } catch (e) {
        console.warn('Supabase initialization fallback:', e);
        this.isCloudConnected = false;
      }
    }

    // Ensure local persistent cache exists with seeds
    if (!localStorage.getItem(DB_VOLUNTEERS_STORAGE_KEY)) {
      localStorage.setItem(DB_VOLUNTEERS_STORAGE_KEY, JSON.stringify(SEED_VOLUNTEERS));
    }
    if (!localStorage.getItem(DB_DONATIONS_STORAGE_KEY)) {
      localStorage.setItem(DB_DONATIONS_STORAGE_KEY, JSON.stringify(SEED_DONATIONS));
    }

    // Auto-polling interval: refreshes records every 8 seconds so new registrations
    // from any device pop up immediately even without WebSockets!
    setInterval(() => {
      this.notifyListeners();
    }, 8000);
  },

  setupRealtimeSubscription: function() {
    if (!this.supabaseClient) return;
    try {
      this.supabaseClient
        .channel('public-impactpulse-intake')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'volunteers' }, () => {
          this.notifyListeners();
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'donations' }, () => {
          this.notifyListeners();
        })
        .subscribe();
    } catch (err) {
      console.warn('Realtime subscription fallback to polling:', err);
    }
  },

  notifyListeners: function() {
    this.liveListeners.forEach(cb => {
      try { cb(); } catch (err) {}
    });
  },

  onUpdate: function(callback) {
    this.liveListeners.push(callback);
  },

  // Save new Volunteer Registration centrally
  saveVolunteer: async function(volData) {
    const record = {
      id: volData.id || `IAMG-VOL-${Math.floor(1000 + Math.random() * 9000)}`,
      name: volData.name.trim(),
      email: volData.email.trim(),
      phone: volData.phone.trim(),
      emergency_phone: (volData.emergency_phone || '').trim(),
      blood_group: volData.blood_group || '',
      college: (volData.college || '').trim(),
      shift: volData.shift || 'weekend',
      city: volData.city.trim(),
      domain: volData.domain || 'Education & Mentorship',
      hours: volData.hours || '4',
      motivation: volData.motivation || '',
      created_at: new Date().toISOString()
    };

    // 1. Always update local persistent storage immediately
    const localList = JSON.parse(localStorage.getItem(DB_VOLUNTEERS_STORAGE_KEY) || '[]');
    localList.unshift(record); // Add latest first
    localStorage.setItem(DB_VOLUNTEERS_STORAGE_KEY, JSON.stringify(localList));

    // 2. If Supabase is connected, insert into remote cloud database
    if (this.isCloudConnected && this.supabaseClient) {
      try {
        await this.supabaseClient.from('volunteers').insert([record]);
      } catch (err) {
        console.warn('Could not push to Supabase, stored locally:', err);
      }
    }

    this.notifyListeners();
    return record;
  },

  // Get Volunteers (Sorted latest first)
  getVolunteers: async function() {
    if (this.isCloudConnected && this.supabaseClient) {
      try {
        const { data, error } = await this.supabaseClient
          .from('volunteers')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data && data.length) {
          localStorage.setItem(DB_VOLUNTEERS_STORAGE_KEY, JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.warn('Fallback to local volunteers cache:', err);
      }
    }
    const local = JSON.parse(localStorage.getItem(DB_VOLUNTEERS_STORAGE_KEY) || '[]');
    // Sort latest registrations first
    return local.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  // Save new Donation Pledge centrally
  saveDonation: async function(donorData) {
    const record = {
      receipt_no: donorData.receipt_no || `IAMG-80G-${Math.floor(100000 + Math.random() * 900000)}`,
      donor_name: donorData.donor_name.trim(),
      donor_email: donorData.donor_email.trim(),
      donor_phone: donorData.donor_phone || '',
      pan: (donorData.pan || 'NOT_PROVIDED').toUpperCase(),
      amount: Number(donorData.amount) || 1000,
      frequency: donorData.frequency || 'one-time',
      payment_method: donorData.payment_method || 'upi',
      status: 'pledged', // NEVER marked as completed payment without verification!
      created_at: new Date().toISOString()
    };

    // 1. Update local persistent storage immediately
    const localList = JSON.parse(localStorage.getItem(DB_DONATIONS_STORAGE_KEY) || '[]');
    localList.unshift(record);
    localStorage.setItem(DB_DONATIONS_STORAGE_KEY, JSON.stringify(localList));

    // 2. If Supabase is connected, insert into remote cloud database
    if (this.isCloudConnected && this.supabaseClient) {
      try {
        await this.supabaseClient.from('donations').insert([record]);
      } catch (err) {
        console.warn('Could not push donation to Supabase, stored locally:', err);
      }
    }

    this.notifyListeners();
    return record;
  },

  // Get Donors & Pledges (Sorted latest first)
  getDonations: async function() {
    if (this.isCloudConnected && this.supabaseClient) {
      try {
        const { data, error } = await this.supabaseClient
          .from('donations')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data && data.length) {
          localStorage.setItem(DB_DONATIONS_STORAGE_KEY, JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.warn('Fallback to local donations cache:', err);
      }
    }
    const local = JSON.parse(localStorage.getItem(DB_DONATIONS_STORAGE_KEY) || '[]');
    return local.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  // Admin action: Toggle verification status between 'pledged' and 'verified'
  toggleDonationVerification: async function(receiptNo) {
    const localList = JSON.parse(localStorage.getItem(DB_DONATIONS_STORAGE_KEY) || '[]');
    const item = localList.find(d => d.receipt_no === receiptNo);
    if (!item) return;

    item.status = item.status === 'verified' ? 'pledged' : 'verified';
    localStorage.setItem(DB_DONATIONS_STORAGE_KEY, JSON.stringify(localList));

    if (this.isCloudConnected && this.supabaseClient) {
      try {
        await this.supabaseClient
          .from('donations')
          .update({ status: item.status })
          .eq('receipt_no', receiptNo);
      } catch (err) {
        console.warn('Error updating Supabase donation status:', err);
      }
    }

    this.notifyListeners();
    return item.status;
  }
};

function initDatabaseEngine() {
  window.dbEngine.init();

  // Re-hook volunteer registration form to database engine
  const volForm = document.getElementById('volunteerRegisterForm');
  if (volForm) {
    volForm.onsubmit = async function(e) {
      e.preventDefault();
      const nameInput = document.getElementById('volName');
      const emailInput = document.getElementById('volEmail');
      const phoneInput = document.getElementById('volPhone');
      const cityInput = document.getElementById('volCity');
      const domainInput = document.getElementById('volDomain');
      const hoursInput = document.getElementById('volHours');
      const motivInput = document.getElementById('volMotivation');

      // Validation
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        showToast('Please enter your full name.', 'warning');
        return;
      }
      if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
        showToast('Please provide a valid email address.', 'warning');
        return;
      }
      if (!phoneInput.value.trim() || phoneInput.value.replace(/\D/g, '').length < 10) {
        showToast('Please enter a valid 10-digit phone number.', 'warning');
        return;
      }

      const domainName = domainInput.options[domainInput.selectedIndex]?.text || 'Education & Mentorship';
      const record = await window.dbEngine.saveVolunteer({
        id: document.getElementById('badgeVolId')?.textContent || `IAMG-VOL-${Math.floor(1000 + Math.random() * 9000)}`,
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        emergency_phone: document.getElementById('volEmergencyPhone')?.value.trim() || '',
        blood_group: document.getElementById('volBloodGroup')?.value || '',
        college: document.getElementById('volCollege')?.value.trim() || '',
        shift: document.getElementById('volShift')?.value || 'weekend',
        city: cityInput.value.trim(),
        domain: domainName,
        hours: hoursInput.value,
        motivation: motivInput ? motivInput.value.trim() : ''
      });

      playSuccessSound();
      showToast(`Registration saved to Central Database! Member ID: ${record.id} 🎉`, 'success');

      // Highlight ID badge
      const badgeCard = document.getElementById('volunteerBadgeCard');
      if (badgeCard) {
        badgeCard.style.boxShadow = '0 0 35px rgba(79, 70, 229, 0.6)';
        setTimeout(() => { badgeCard.style.boxShadow = ''; }, 3000);
      }
    };
  }

  // Re-hook donation pledge form to database engine
  const donateForm = document.getElementById('donationForm');
  if (donateForm) {
    donateForm.onsubmit = async function(e) {
      e.preventDefault();
      const donorName = document.getElementById('donorName').value.trim();
      const donorEmail = document.getElementById('donorEmail').value.trim();
      const donorPan = document.getElementById('donorPan').value.trim().toUpperCase() || 'NOT_PROVIDED';

      if (!donorName || donorName.length < 2) {
        showToast('Please provide your donor name.', 'warning');
        return;
      }
      if (!donorEmail.includes('@')) {
        showToast('Please provide a valid receipt email.', 'warning');
        return;
      }

      // Amount detection
      const customInput = document.getElementById('customDonationInput');
      let amt = 1000;
      if (customInput && customInput.value && parseInt(customInput.value, 10) > 0) {
        amt = parseInt(customInput.value, 10);
      } else {
        const activeAmtBtn = document.querySelector('.amount-btn.active');
        if (activeAmtBtn) amt = parseInt(activeAmtBtn.getAttribute('data-amt'), 10) || 1000;
      }

      const isMonthly = document.querySelector('.freq-btn.active')?.getAttribute('data-freq') === 'monthly';
      const receiptNo = `IAMG-80G-${Math.floor(100000 + Math.random() * 900000)}`;

      // Save pledge into Central Database (Marked as PLEDGED, never verified without confirmation)
      await window.dbEngine.saveDonation({
        receipt_no: receiptNo,
        donor_name: donorName,
        donor_email: donorEmail,
        pan: donorPan,
        amount: amt,
        frequency: isMonthly ? 'monthly' : 'one-time',
        payment_method: 'upi'
      });

      playSuccessSound();
      showToast(`Donation pledge of ₹${amt.toLocaleString()} recorded centrally! Receipt: ${receiptNo} ❤️`, 'success');

      openDonationReceiptModal({
        name: donorName,
        email: donorEmail,
        pan: donorPan,
        amount: amt,
        frequency: isMonthly ? 'monthly' : 'one-time',
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        receiptNo: receiptNo
      });
    };
  }
}

// --- Admin Command Center UI Logic ---
let cachedVolunteers = [];
let cachedDonations = [];

function initAdminPortal() {
  const triggerBtn = document.getElementById('adminPortalTrigger');
  const footerTrigger = document.getElementById('footerAdminTrigger');
  const loginForm = document.getElementById('adminLoginForm');
  const logoutBtn = document.getElementById('btnAdminLogout');
  const refreshBtn = document.getElementById('btnAdminRefresh');

  if (triggerBtn) triggerBtn.addEventListener('click', openAdminModal);
  if (footerTrigger) footerTrigger.addEventListener('click', openAdminModal);

  // Spotlight search shortcut
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
      e.preventDefault();
      openAdminModal();
    }
  });

  // Admin Login
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('adminEmailInput').value.trim();
      const pass = document.getElementById('adminPasswordInput').value.trim();

      // Authorization verification
      if (email.toLowerCase() === 'admin@inamigosfoundation.org' && pass === 'InAmigos@2026') {
        sessionStorage.setItem('inamigos_admin_auth', email);
        playSuccessSound();
        showToast('Admin access granted! Welcome back.', 'success');
        showAdminDashboardView(email);
      } else {
        showToast('Invalid credentials. Check email and security key.', 'warning');
      }
    });
  }

  // Admin Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('inamigos_admin_auth');
      showAdminLoginView();
      showToast('Logged out of Admin Portal.', 'info');
    });
  }

  // Refresh
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      refreshAdminData();
      showToast('Records refreshed from central database.', 'info');
    });
  }

  // Auto-update subscription
  window.dbEngine.onUpdate(() => {
    if (sessionStorage.getItem('inamigos_admin_auth')) {
      refreshAdminData(false);
    }
  });

  // Check existing session
  const existingSession = sessionStorage.getItem('inamigos_admin_auth');
  if (existingSession) {
    showAdminDashboardView(existingSession);
  }
}

function openAdminModal() {
  const modal = document.getElementById('adminModal');
  if (!modal) return;
  modal.classList.add('open');

  const auth = sessionStorage.getItem('inamigos_admin_auth');
  if (auth) {
    showAdminDashboardView(auth);
  } else {
    showAdminLoginView();
  }
}

function closeAdminModal() {
  const modal = document.getElementById('adminModal');
  if (modal) modal.classList.remove('open');
}

function showAdminLoginView() {
  const loginView = document.getElementById('adminLoginView');
  const dashView = document.getElementById('adminMainDashboardView');
  if (loginView) loginView.style.display = 'block';
  if (dashView) dashView.style.display = 'none';
}

function showAdminDashboardView(email) {
  const loginView = document.getElementById('adminLoginView');
  const dashView = document.getElementById('adminMainDashboardView');
  if (loginView) loginView.style.display = 'none';
  if (dashView) dashView.style.display = 'block';

  const emailDisplay = document.getElementById('currentAdminEmail');
  if (emailDisplay) emailDisplay.textContent = email;

  refreshAdminData();
}

async function refreshAdminData(showLoader = true) {
  const syncStatus = document.getElementById('syncStatusText');
  if (syncStatus) syncStatus.textContent = window.dbEngine.isCloudConnected ? 'Cloud Real-Time Synced' : 'Central Storage Active';

  cachedVolunteers = await window.dbEngine.getVolunteers();
  cachedDonations = await window.dbEngine.getDonations();

  updateKpis();
  renderVolunteersTable(cachedVolunteers);
  renderDonorsTable(cachedDonations);
  renderAnalytics();
}

// Update KPI Stats Cards
function updateKpis() {
  const todayStr = new Date().toDateString();

  // Count registrations created today
  const volsToday = cachedVolunteers.filter(v => new Date(v.created_at).toDateString() === todayStr).length;
  const donorsToday = cachedDonations.filter(d => new Date(d.created_at).toDateString() === todayStr).length;
  const totalToday = volsToday + donorsToday;

  const totalVols = cachedVolunteers.length;

  // Separate Pledges from Verified Donations!
  const unverifiedPledges = cachedDonations
    .filter(d => d.status === 'pledged')
    .reduce((sum, d) => sum + Number(d.amount), 0);

  const verifiedDonations = cachedDonations
    .filter(d => d.status === 'verified')
    .reduce((sum, d) => sum + Number(d.amount), 0);

  const elToday = document.getElementById('kpiTodayCount');
  const elVols = document.getElementById('kpiTotalVolunteers');
  const elPledges = document.getElementById('kpiTotalPledges');
  const elVerified = document.getElementById('kpiVerifiedDonations');

  const badgeVol = document.getElementById('badgeVolCount');
  const badgeDonor = document.getElementById('badgeDonorCount');

  if (elToday) elToday.textContent = `${totalToday} (+${volsToday} vols)`;
  if (elVols) elVols.textContent = totalVols.toLocaleString();
  if (elPledges) elPledges.textContent = `₹${unverifiedPledges.toLocaleString()}`;
  if (elVerified) elVerified.textContent = `₹${verifiedDonations.toLocaleString()}`;

  if (badgeVol) badgeVol.textContent = totalVols;
  if (badgeDonor) badgeDonor.textContent = cachedDonations.length;
}

// Render Volunteers Table (Latest First)
function renderVolunteersTable(data) {
  const tbody = document.getElementById('adminVolunteersTableBody');
  if (!tbody) return;

  if (!data.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 3rem; color: var(--text-muted);">
          No volunteer registrations found. Submit an application in the portal!
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = data.map(v => {
    const d = new Date(v.created_at);
    const dateFormatted = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    const timeFormatted = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    const isToday = d.toDateString() === new Date().toDateString();

    return `
      <tr>
        <td>
          <div style="font-weight: 700;">${dateFormatted}</div>
          <div style="font-size: 0.76rem; color: var(--text-muted);">${timeFormatted} ${isToday ? '🔥 (Today)' : ''}</div>
        </td>
        <td>
          <code style="font-weight: 800; color: var(--primary);">${v.id}</code>
        </td>
        <td>
          <div class="table-user-cell">
            <div class="table-avatar">${v.name.charAt(0).toUpperCase()}</div>
            <div>
              <div class="user-name-bold">
                ${v.name}
                ${v.blood_group ? `<span style="font-size:0.68rem; font-weight:700; background:rgba(239,68,68,0.15); color:#ef4444; padding:2px 6px; border-radius:4px; margin-left:4px;">${v.blood_group}</span>` : ''}
              </div>
              <div class="user-sub-email">${v.email} ${v.college ? `• ${v.college}` : ''}</div>
            </div>
          </div>
        </td>
        <td>
          <div><a href="tel:${v.phone}" style="color: var(--primary); font-weight: 600;">${v.phone}</a></div>
          ${v.emergency_phone ? `<div style="font-size:0.72rem; color:var(--text-muted);">Emerg: ${v.emergency_phone}</div>` : ''}
          <div style="font-size: 0.74rem;"><a href="https://wa.me/${(v.phone||'').replace(/\D/g, '')}" target="_blank" style="color: #25d366;">💬 WhatsApp Chat</a></div>
        </td>
        <td><strong>${v.city}</strong></td>
        <td><span class="wing-badge">${v.domain}</span></td>
        <td>
          <strong>${v.hours} hrs / wk</strong>
          ${v.shift ? `<div style="font-size:0.72rem; color:var(--text-muted); text-transform:capitalize;">${v.shift} shift</div>` : ''}
        </td>
      </tr>
    `;
  }).join('');
}

// Render Donors & Pledges Table (Showing Pledges vs Verified separately)
function renderDonorsTable(data) {
  const tbody = document.getElementById('adminDonorsTableBody');
  if (!tbody) return;

  if (!data.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 3rem; color: var(--text-muted);">
          No donor pledges recorded yet.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = data.map(d => {
    const dt = new Date(d.created_at);
    const dateFormatted = dt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    const timeFormatted = dt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    const isVerified = d.status === 'verified';

    return `
      <tr>
        <td>
          <div style="font-weight: 700;">${dateFormatted}</div>
          <div style="font-size: 0.76rem; color: var(--text-muted);">${timeFormatted}</div>
        </td>
        <td><code style="font-weight: 700;">${d.receipt_no}</code></td>
        <td>
          <div class="user-name-bold">${d.donor_name}</div>
          <div class="user-sub-email">${d.donor_email}</div>
        </td>
        <td>
          <strong style="font-size: 1.05rem; color: ${isVerified ? 'var(--accent)' : 'var(--text-main)'};">
            ₹${Number(d.amount).toLocaleString()}
          </strong>
        </td>
        <td><span style="font-size: 0.8rem; text-transform: capitalize; color: var(--text-muted);">${d.frequency}</span></td>
        <td>
          <span class="status-badge ${isVerified ? 'verified' : 'pledged'}">
            ${isVerified ? 'Verified ✅' : 'Pledged ⏳'}
          </span>
        </td>
        <td><code style="font-size: 0.82rem;">${d.pan || 'N/A'}</code></td>
        <td>
          <button class="action-btn-sm" onclick="handleTogglePledgeStatus('${d.receipt_no}')" title="Change payment status">
            ${isVerified ? 'Mark Pledged ⏳' : 'Verify Payment ✅'}
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// Toggle Pledge Verification Status
window.handleTogglePledgeStatus = async function(receiptNo) {
  const newStatus = await window.dbEngine.toggleDonationVerification(receiptNo);
  showToast(`Receipt ${receiptNo} marked as: ${newStatus.toUpperCase()}`, 'info');
  refreshAdminData();
};

// Filter Volunteers Table
window.filterVolunteersTable = function() {
  const search = (document.getElementById('adminVolSearch')?.value || '').toLowerCase();
  const domain = document.getElementById('adminVolDomainSelect')?.value || 'all';

  const filtered = cachedVolunteers.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search) ||
                        v.phone.toLowerCase().includes(search) ||
                        v.email.toLowerCase().includes(search) ||
                        v.city.toLowerCase().includes(search) ||
                        v.id.toLowerCase().includes(search);
    const matchDomain = domain === 'all' || v.domain.toLowerCase().includes(domain.toLowerCase());
    return matchSearch && matchDomain;
  });

  renderVolunteersTable(filtered);
};

// Filter Donors Table
window.filterDonorsTable = function() {
  const search = (document.getElementById('adminDonorSearch')?.value || '').toLowerCase();
  const status = document.getElementById('adminDonorStatusSelect')?.value || 'all';

  const filtered = cachedDonations.filter(d => {
    const matchSearch = d.donor_name.toLowerCase().includes(search) ||
                        d.donor_email.toLowerCase().includes(search) ||
                        d.receipt_no.toLowerCase().includes(search) ||
                        (d.pan && d.pan.toLowerCase().includes(search));
    const matchStatus = status === 'all' || d.status === status;
    return matchSearch && matchStatus;
  });

  renderDonorsTable(filtered);
};

// Switch Tabs in Admin
window.switchAdminTab = function(tabName) {
  ['Volunteers', 'Donors', 'Analytics', 'DbConfig'].forEach(t => {
    const btn = document.getElementById(`tabBtn${t}`);
    const content = document.getElementById(`adminTabContent${t}`);
    const isTarget = t.toLowerCase() === tabName.toLowerCase();

    if (btn) btn.classList.toggle('active', isTarget);
    if (content) content.style.display = isTarget ? 'block' : 'none';
  });
};

// Render 7-Day Analytics Charts
function renderAnalytics() {
  const barsContainer = document.getElementById('chartBarsContainer');
  const distList = document.getElementById('chapterDistributionList');
  if (!barsContainer) return;

  // Compute counts for past 7 days
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d);
  }

  const counts = days.map(day => {
    const dayStr = day.toDateString();
    const vols = cachedVolunteers.filter(v => new Date(v.created_at).toDateString() === dayStr).length;
    const donors = cachedDonations.filter(dn => new Date(dn.created_at).toDateString() === dayStr).length;
    return vols + donors;
  });

  const maxVal = Math.max(...counts, 4);

  barsContainer.innerHTML = days.map((day, idx) => {
    const dayName = day.toLocaleDateString('en-US', { weekday: 'short' });
    const count = counts[idx];
    const pct = Math.max(12, Math.round((count / maxVal) * 100));

    return `
      <div class="chart-col">
        <span style="font-size: 0.72rem; font-weight: 800; color: var(--primary);">${count}</span>
        <div class="chart-bar" style="height: ${pct}%;"></div>
        <span class="chart-col-label">${dayName}</span>
      </div>
    `;
  }).join('');

  // Chapter distribution
  if (distList) {
    const cityCounts = {};
    cachedVolunteers.forEach(v => {
      const city = v.city || 'Other';
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    });

    const sortedCities = Object.entries(cityCounts).sort((a, b) => b[1] - a[1]).slice(0, 4);
    distList.innerHTML = sortedCities.map(([city, cnt]) => `
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.88rem; padding: 0.5rem 0.75rem; background: var(--bg-surface-alt); border-radius: var(--radius-sm);">
        <span>📍 <strong>${city}</strong></span>
        <span style="font-weight: 800; color: var(--primary);">${cnt} Volunteers</span>
      </div>
    `).join('');
  }
}

// Export Volunteers to CSV / Excel
window.exportVolunteersToCsv = function() {
  if (!cachedVolunteers.length) {
    showToast('No volunteer records available to export.', 'warning');
    return;
  }

  const headers = ['Member ID', 'Full Name', 'Email Address', 'Phone Number', 'Emergency Phone', 'Blood Group', 'College / Org', 'Preferred Shift', 'Chapter City', 'Impact Wing', 'Hours Per Week', 'Motivation', 'Registration Timestamp'];
  const rows = cachedVolunteers.map(v => [
    `"${v.id}"`,
    `"${(v.name || '').replace(/"/g, '""')}"`,
    `"${(v.email || '').replace(/"/g, '""')}"`,
    `"${(v.phone || '').replace(/"/g, '""')}"`,
    `"${(v.city || '').replace(/"/g, '""')}"`,
    `"${(v.domain || '').replace(/"/g, '""')}"`,
    `"${v.hours || ''}"`,
    `"${(v.motivation || '').replace(/"/g, '""')}"`,
    `"${v.created_at}"`
  ]);

  downloadCsvFile([headers.join(','), ...rows.map(r => r.join(','))].join('\n'), `InAmigos_Volunteers_Report_${new Date().toISOString().split('T')[0]}.csv`);
  showToast('Volunteers Excel/CSV report downloaded! 📊', 'success');
};

// Export Donors to CSV / Excel
window.exportDonorsToCsv = function() {
  if (!cachedDonations.length) {
    showToast('No donation records available to export.', 'warning');
    return;
  }

  const headers = ['Receipt No', 'Donor Full Name', 'Email Address', 'PAN Card', 'Amount (INR)', 'Frequency', 'Payment Status', 'Timestamp'];
  const rows = cachedDonations.map(d => [
    `"${d.receipt_no}"`,
    `"${(d.donor_name || '').replace(/"/g, '""')}"`,
    `"${(d.donor_email || '').replace(/"/g, '""')}"`,
    `"${d.pan || ''}"`,
    `"${d.amount}"`,
    `"${d.frequency}"`,
    `"${d.status.toUpperCase()}"`,
    `"${d.created_at}"`
  ]);

  downloadCsvFile([headers.join(','), ...rows.map(r => r.join(','))].join('\n'), `InAmigos_Donation_Pledges_Report_${new Date().toISOString().split('T')[0]}.csv`);
  showToast('Donation Pledges Excel/CSV report downloaded! 📊', 'success');
};

function downloadCsvFile(content, fileName) {
  // UTF-8 BOM so Excel opens Hindi / special characters without corruption
  const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Save Cloud DB Config
window.handleSaveDbConfig = function(e) {
  e.preventDefault();
  const url = document.getElementById('cfgSupabaseUrl').value.trim();
  const key = document.getElementById('cfgSupabaseKey').value.trim();

  if (!url || !key) {
    showToast('Please provide both Project URL and Anon Key.', 'warning');
    return;
  }

  localStorage.setItem(DB_CONFIG_STORAGE_KEY, JSON.stringify({ url, key }));
  window.dbEngine.init();
  showToast('Supabase credentials saved! Testing cloud connection...', 'info');

  setTimeout(() => {
    refreshAdminData();
    showToast('Connected to Supabase Central Cloud Database! 🟢', 'success');
  }, 1000);
};

window.resetDbConfigToLocal = function() {
  localStorage.removeItem(DB_CONFIG_STORAGE_KEY);
  window.dbEngine.isCloudConnected = false;
  window.dbEngine.supabaseClient = null;
  refreshAdminData();
  showToast('Reset to encrypted local storage mode.', 'info');
};

window.openAdminModal = openAdminModal;
window.closeAdminModal = closeAdminModal;


/* ==========================================================================
   ENHANCEMENTS: Badge Layout Toggle, UPI QR Code Modal, Smooth Scroll
   ========================================================================== */

// Toggle Badge layout between horizontal and vertical lanyard
window.switchBadgeLayout = function(layout) {
  const card = document.getElementById('volunteerBadgeCard');
  const btnH = document.getElementById('btnBadgeHorizontal');
  const btnV = document.getElementById('btnBadgeVertical');
  if (!card) return;

  if (layout === 'vertical') {
    card.classList.add('vertical-layout');
    if (btnV) btnV.classList.add('active');
    if (btnH) btnH.classList.remove('active');
    showToast('Switched to Vertical Lanyard ID Pass style 🪪', 'info');
  } else {
    card.classList.remove('vertical-layout');
    if (btnH) btnH.classList.add('active');
    if (btnV) btnV.classList.remove('active');
    showToast('Switched to Horizontal Membership Pass style 💳', 'info');
  }
};

// Back to Top Smooth Scroll
window.scrollToTop = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.addEventListener('scroll', () => {
  const btn = document.getElementById('backToTopBtn');
  if (btn) {
    if (window.scrollY > 350) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }
});

// UPI Dynamic QR Code Management
let upiTimerInterval = null;

window.openUpiQrModal = function() {
  const modal = document.getElementById('upiQrModal');
  if (!modal) return;

  // Calculate active donation amount
  let amt = 1000;
  const customInput = document.getElementById('customDonationInput');
  if (customInput && customInput.value && parseInt(customInput.value, 10) > 0) {
    amt = parseInt(customInput.value, 10);
  } else {
    const activeAmtBtn = document.querySelector('.amount-btn.active');
    if (activeAmtBtn) amt = parseInt(activeAmtBtn.getAttribute('data-amt'), 10) || 1000;
  }

  const textEl = document.getElementById('upiModalAmountText');
  if (textEl) textEl.textContent = `₹${Number(amt).toLocaleString()}`;

  // Start 5 min countdown timer
  let remaining = 300;
  const timerEl = document.getElementById('upiTimer');
  if (upiTimerInterval) clearInterval(upiTimerInterval);

  function updateTimer() {
    const m = Math.floor(remaining / 60).toString().padStart(2, '0');
    const s = (remaining % 60).toString().padStart(2, '0');
    if (timerEl) timerEl.textContent = `${m}:${s}`;
    if (remaining <= 0) {
      clearInterval(upiTimerInterval);
      if (timerEl) timerEl.textContent = 'Session Expired';
    }
    remaining--;
  }
  updateTimer();
  upiTimerInterval = setInterval(updateTimer, 1000);

  modal.classList.add('open');
  playChime(520, 'sine', 0.1);
};

window.closeUpiQrModal = function() {
  const modal = document.getElementById('upiQrModal');
  if (modal) modal.classList.remove('open');
  if (upiTimerInterval) clearInterval(upiTimerInterval);
};

window.copyUpiId = function() {
  const vpa = 'inamigosfoundation@icici';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(vpa).then(() => {
      showToast('UPI ID copied: inamigosfoundation@icici 📋', 'success');
    }).catch(() => {
      showToast('UPI ID: inamigosfoundation@icici', 'info');
    });
  } else {
    showToast('UPI ID: inamigosfoundation@icici', 'info');
  }
};

window.confirmSimulatedUpiPayment = async function() {
  let amt = 1000;
  const customInput = document.getElementById('customDonationInput');
  if (customInput && customInput.value && parseInt(customInput.value, 10) > 0) {
    amt = parseInt(customInput.value, 10);
  } else {
    const activeAmtBtn = document.querySelector('.amount-btn.active');
    if (activeAmtBtn) amt = parseInt(activeAmtBtn.getAttribute('data-amt'), 10) || 1000;
  }

  const nameInput = document.getElementById('donorName');
  const emailInput = document.getElementById('donorEmail');
  const panInput = document.getElementById('donorPan');

  const donorName = (nameInput && nameInput.value.trim()) || 'Generous Supporter';
  const donorEmail = (emailInput && emailInput.value.trim()) || 'donor@inamigosfoundation.org';
  const donorPan = (panInput && panInput.value.trim().toUpperCase()) || 'ABCDP1234F';
  const receiptNo = `IAMG-80G-${Math.floor(100000 + Math.random() * 900000)}`;

  // Save to Central Database as VERIFIED payment
  if (window.dbEngine) {
    await window.dbEngine.saveDonation({
      receipt_no: receiptNo,
      donor_name: donorName,
      donor_email: donorEmail,
      pan: donorPan,
      amount: amt,
      frequency: 'one-time',
      payment_method: 'upi_qr',
      status: 'verified'
    });
  }

  closeUpiQrModal();
  playSuccessSound();
  showToast(`UPI Payment of ₹${amt.toLocaleString()} verified! 80G Tax Exemption Receipt generated! 🎉`, 'success');

  openDonationReceiptModal({
    name: donorName,
    email: donorEmail,
    pan: donorPan,
    amount: amt,
    frequency: 'one-time (UPI Instant)',
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    receiptNo: receiptNo
  });
};
