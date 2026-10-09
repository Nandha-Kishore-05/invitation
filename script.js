/* ============================================================
   WEDDING INVITATION INTERACTIVE LOGIC & ANIMATIONS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // 1. OPEN INVITATION BUTTON SMOOTH TRANSITION
  const openInviteBtn = document.getElementById('openInviteBtn');
  const mainContent = document.getElementById('mainContent');

  if (openInviteBtn) {
    openInviteBtn.addEventListener('click', () => {
      // Gentle audio chime
      playPleasantChime();

      // Smooth scroll into ceremony details
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // 2. COUNTDOWN TIMER TO NOVEMBER 15, 2026, 11:00 AM IST
  // Bulletproof cross-browser date: Month is 0-indexed (10 = November)
  const targetDate = new Date(2026, 10, 15, 11, 0, 0).getTime();

  function updateCountdown() {
    const daysEl = document.getElementById('countDays');
    const hoursEl = document.getElementById('countHours');
    const minsEl = document.getElementById('countMinutes');
    const secsEl = document.getElementById('countSeconds');
    const heroDaysBadge = document.getElementById('heroCountdownBadge');

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    const now = new Date().getTime();
    let distance = targetDate - now;

    if (isNaN(distance) || distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      if (heroDaysBadge) heroDaysBadge.textContent = '🎉 Celebration Day!';
      return;
    }

    const totalSeconds = Math.floor(distance / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (n) => String(Math.max(0, n)).padStart(2, '0');

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minsEl.textContent = pad(minutes);
    secsEl.textContent = pad(seconds);

    if (heroDaysBadge) {
      heroDaysBadge.innerHTML = `<i class="fa-solid fa-hourglass-half"></i> <strong>${days} Days</strong> ${hours}h ${minutes}m ${seconds}s to go`;
    }
  }

  // Run immediately and then every second
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 3. FULLSCREEN MODAL FOR ORIGINAL INVITATION IMAGE
  const cardZoomTrigger = document.getElementById('cardZoomTrigger');
  const imageModal = document.getElementById('imageModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (cardZoomTrigger && imageModal && closeModalBtn) {
    cardZoomTrigger.addEventListener('click', () => {
      imageModal.classList.add('active');
    });

    closeModalBtn.addEventListener('click', () => {
      imageModal.classList.remove('active');
    });

    imageModal.addEventListener('click', (e) => {
      if (e.target === imageModal) {
        imageModal.classList.remove('active');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && imageModal.classList.contains('active')) {
        imageModal.classList.remove('active');
      }
    });
  }

  // 4. WHATSAPP SHARE BUTTON
  const whatsappShareBtn = document.getElementById('whatsappShareBtn');
  if (whatsappShareBtn) {
    whatsappShareBtn.addEventListener('click', () => {
      const shareText = `*Wedding Invitation* 💍\n\n` +
        `You are cordially invited to celebrate the Nikkah & Walimah of *J. Hafsa Fathima* & *M. Faizal Ahamed*.\n\n` +
        `🗓 *Date:* Sunday, 15th November 2026 (11:00 AM)\n` +
        `📍 *Venue:* H.M.O. Auditorium, Sirumugai Road, Mettupalayam\n\n` +
        `🗺 *Google Maps Location:* https://www.google.com/maps/search/?api=1&query=H.M.O.+Auditorium+Siraj+Nagar+Sirumugai+Road+Mettupalayam\n\n` +
        `Looking forward to your gracious presence & prayers! ✨`;

      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // 5. CANVAS PETALS & GOLD SPARKLES PARTICLE SYSTEM
  const canvas = document.getElementById('petalsCanvas');
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 38;

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 8 + 6;
      this.speedY = Math.random() * 1.2 + 0.6;
      this.speedX = Math.random() * 1 - 0.5;
      this.angle = Math.random() * Math.PI * 2;
      this.spinSpeed = Math.random() * 0.03 - 0.015;
      this.opacity = Math.random() * 0.5 + 0.35;
      // Alternate between soft gold and rose petal tones
      this.isGold = Math.random() > 0.45;
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.angle) * 0.8 + this.speedX;
      this.angle += this.spinSpeed;

      if (this.y > height + 25 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.globalAlpha = this.opacity;

      if (this.isGold) {
        // Gold Sparkle / Petal
        ctx.fillStyle = '#f0cf74';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Gentle Rose Petal
        ctx.fillStyle = '#e8617d';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size, -this.size, -this.size, this.size, 0, this.size * 1.5);
        ctx.bezierCurveTo(this.size, this.size, this.size, -this.size, 0, 0);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  // 6. SYNTHESIZED ROYAL AMBIENT MELODY / HARP CHIME (Web Audio API)
  let audioCtx = null;
  let isPlaying = false;
  let musicInterval = null;

  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const audioIcon = document.getElementById('audioIcon');
  const audioLabel = document.getElementById('audioLabel');

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playHarpNote(freq, delay = 0, duration = 2.2) {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + delay + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    } catch (e) {
      // Audio fallback
    }
  }

  function playPleasantChime() {
    // Play warm ascending notes
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, i) => {
      playHarpNote(freq, i * 0.12, 1.8);
    });
  }

  const peacefulRagaNotes = [
    261.63, 293.66, 329.63, 392.00, 440.00, 523.25, // C Major Pentatonic
    587.33, 659.25, 783.99
  ];

  function startAmbientBGM() {
    isPlaying = true;
    audioToggleBtn.classList.add('playing');
    audioIcon.className = 'fa-solid fa-volume-high';
    audioLabel.textContent = 'Playing';

    let step = 0;
    const melody = [0, 2, 4, 2, 5, 4, 2, 0, 3, 5, 7, 5, 4, 2, 0];

    function nextMelodyStep() {
      if (!isPlaying) return;
      const noteIdx = melody[step % melody.length];
      const freq = peacefulRagaNotes[noteIdx];
      playHarpNote(freq, 0, 2.5);
      step++;
    }

    nextMelodyStep();
    musicInterval = setInterval(nextMelodyStep, 800);
  }

  function stopAmbientBGM() {
    isPlaying = false;
    if (musicInterval) clearInterval(musicInterval);
    audioToggleBtn.classList.remove('playing');
    audioIcon.className = 'fa-solid fa-volume-xmark';
    audioLabel.textContent = 'Music';
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      if (!isPlaying) {
        startAmbientBGM();
      } else {
        stopAmbientBGM();
      }
    });
  }

});
