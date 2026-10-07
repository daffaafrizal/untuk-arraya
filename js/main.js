/* ======================================================================
   MAIN — titik awal: isi konten dari CONFIG lalu nyalakan semua fitur.
   Fungsi init...() masing-masing ada di file js/ lain sesuai namanya.
====================================================================== */
document.addEventListener('DOMContentLoaded', ()=>{

  // ---------- isi nama & tanggal dinamis ----------
  document.title = `Untuk ${CONFIG.girlfriendName.split(' ')[0]} 🌙`;
  document.getElementById('gateName').textContent = CONFIG.girlfriendName;

  // kalau nama cuma 2 kata, jangan sisain <br> kosong di baris kedua
  const nameParts = CONFIG.girlfriendName.split(' ');
  const nameLine1 = nameParts.slice(0,2).join(' ');
  const nameLine2 = nameParts.slice(2).join(' ');
  document.getElementById('heroName').innerHTML = nameLine2 ? `${nameLine1}<br>${nameLine2}` : nameLine1;

  document.getElementById('todayTag').textContent = new Date().toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' });

  // ---------- surat ----------
  const letterBody = document.getElementById('letterBody');
  CONFIG.letter.forEach(p=>{
    const el = document.createElement('p');
    el.textContent = p;
    letterBody.appendChild(el);
  });
  document.getElementById('signoff').textContent = CONFIG.signoff;
  initTypewriter(letterBody, document.getElementById('signoff'));

  // ---------- timeline ----------
  const tlHost = document.getElementById('timelineList');
  CONFIG.milestones.forEach(m=>{
    const item = document.createElement('div');
    item.className = 'tl-item reveal';
    item.innerHTML = `
      <div class="tl-dot"></div>
      ${m.date ? `<div class="tl-date">${m.date}</div>` : ''}
      <div class="tl-title">${m.title}</div>
      <div class="tl-desc">${m.desc}</div>
    `;
    tlHost.appendChild(item);
  });

  // ---------- flip reason cards ----------
  const reasonsHost = document.getElementById('reasonsGrid');
  CONFIG.reasons.forEach((r,i)=>{
    const card = document.createElement('div');
    card.className = 'flip-card reveal';
    card.innerHTML = `
      <div class="flip-inner">
        <div class="flip-front">
          <div class="num">0${i+1}</div>
          <div class="teaser">${r.teaser}</div>
          <div class="tap">ketuk untuk buka</div>
        </div>
        <div class="flip-back">${r.full}</div>
      </div>
    `;
    card.addEventListener('click', ()=> card.classList.toggle('flipped'));
    reasonsHost.appendChild(card);
  });

  // ---------- galeri carousel ----------
  const carousel = document.getElementById('carouselTrack');
  const dotsHost = document.getElementById('carouselDots');
  CONFIG.photos.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'polaroid';
    const imgHtml = p.src
      ? `<img class="frame" src="${p.src}" alt="${p.caption}">`
      : `<div class="frame placeholder">ganti dengan fotomu</div>`;
    card.innerHTML = `${imgHtml}<div class="cap">${p.caption}</div>`;
    carousel.appendChild(card);
  });

  // titik navigasi: cuma 2 "halaman" slide — awal & akhir
  const SLIDE_PAGES = 2;
  const maxScroll = ()=> Math.max(0, carousel.scrollWidth - carousel.clientWidth);
  const goSlide = i=> carousel.scrollTo({ left: maxScroll() * i/(SLIDE_PAGES-1), behavior:'smooth' });
  for(let i=0;i<SLIDE_PAGES;i++){
    const dot = document.createElement('span');
    if(i===0) dot.classList.add('active');
    dot.addEventListener('click', ()=> goSlide(i));
    dotsHost.appendChild(dot);
  }

  // tombol panah: "next" di kanan saat di slide 1, "back" di kiri saat di slide 2
  const prevArrow = document.getElementById('carouselPrev');
  const nextArrow = document.getElementById('carouselNext');
  prevArrow.addEventListener('click', ()=> goSlide(0));
  nextArrow.addEventListener('click', ()=> goSlide(SLIDE_PAGES-1));

  function updateCarouselNav(){
    const max = maxScroll();
    const page = max > 0 ? Math.round(carousel.scrollLeft / max * (SLIDE_PAGES-1)) : 0;
    [...dotsHost.children].forEach((d,i)=> d.classList.toggle('active', i===page));
    prevArrow.hidden = max === 0 || page === 0;
    nextArrow.hidden = max === 0 || page === SLIDE_PAGES-1;
  }
  carousel.addEventListener('scroll', updateCarouselNav);
  window.addEventListener('resize', updateCarouselNav);
  carousel.closest('.page').addEventListener('pageopen', updateCarouselNav);
  updateCarouselNav();

  // ---------- hari bersama + hitung mundur ultah ----------
  updateDayCounters();
  setInterval(updateDayCounters, 60*1000); // tetap benar kalau halaman dibiarkan terbuka lewat tengah malam

  // ---------- closing message ----------
  document.getElementById('closingMsg').textContent = CONFIG.closingMessage;

  // ---------- musik ----------
  const bgMusic = document.getElementById('bgMusic');
  bgMusic.src = CONFIG.musicFile;
  document.getElementById('musicTitle').textContent = CONFIG.musicTitle;

  bgMusic.addEventListener('error', ()=>{
    console.warn(
      `[musik] Gagal memuat "${CONFIG.musicFile}". ` +
      `Pastikan file itu benar-benar ada di folder yang sama dengan index.html, ` +
      `dan nama filenya persis sama (termasuk huruf besar/kecil dan ekstensi).`
    );
  });

  initEnvelope(bgMusic);
  initPlushies();
  initBook();
  initVideoPlayer(bgMusic);
  initSparkleCursor();
  initPetals();
  initStars();
  initWishJar();
  initCake(bgMusic);
});
