/**
 * ImpactPulse | InAmigos Foundation Portal
 * Ultra-Modern Web Application Engine
 * Pure Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
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
});

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

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

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
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 380;
  const ctx = canvas.getContext('2d');

  const name = document.getElementById('volName').value.trim() || 'Aarav Sharma';
  const domain = document.getElementById('volDomain').options[document.getElementById('volDomain').selectedIndex]?.text || 'Education & Mentorship';
  const city = document.getElementById('volCity').value.trim() || 'National Chapter';
  const memberId = document.getElementById('badgeVolId').textContent || 'IAMG-VOL-2026';

  // Gradient background
  const grad = ctx.createLinearGradient(0, 0, 600, 380);
  grad.addColorStop(0, '#1e1b4b');
  grad.addColorStop(0.6, '#312e81');
  grad.addColorStop(1, '#0f172a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 600, 380);

  // Borders
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#4f46e5';
  ctx.strokeRect(10, 10, 580, 360);

  // Header Title
  ctx.font = 'bold 16px sans-serif';
  ctx.fillStyle = '#38bdf8';
  ctx.letterSpacing = '2px';
  ctx.fillText('INAMIGOS FOUNDATION • OFFICIAL VOLUNTEER ID', 40, 50);

  // Avatar Circle
  ctx.beginPath();
  ctx.arc(90, 150, 48, 0, 2 * Math.PI);
  ctx.fillStyle = '#4f46e5';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#38bdf8';
  ctx.stroke();

  ctx.font = 'bold 44px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText(name.charAt(0).toUpperCase(), 90, 165);

  // Name & Domain
  ctx.textAlign = 'left';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(name, 165, 135);

  ctx.font = 'bold 16px sans-serif';
  ctx.fillStyle = '#34d399';
  ctx.fillText(`Wing: ${domain}`, 165, 170);

  // Meta Row
  ctx.font = '14px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(`ID: ${memberId}`, 165, 205);
  ctx.fillText(`Chapter: ${city}`, 340, 205);
  ctx.fillText(`Valid Thru: 12/2027`, 165, 235);
  ctx.fillText(`Status: ACTIVE DEPLOYED`, 340, 235);

  // Simulated Barcode
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 2;
  for (let x = 40; x < 560; x += (x % 5 === 0 ? 8 : 4)) {
    ctx.beginPath();
    ctx.moveTo(x, 280);
    ctx.lineTo(x, 320);
    ctx.stroke();
  }

  ctx.font = '12px monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'center';
  ctx.fillText(`* ${memberId} * VERIFIED YOUTH CHANGEMAKER *`, 300, 345);

  callback(canvas);
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
