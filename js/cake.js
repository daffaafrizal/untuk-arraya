// ---------- kue ulang tahun: tiup lilin -> lilin padam + lagu tiup lilin diputar ----------
// Lilin cuma bisa ditiup sekali. Lagu latar berhenti dan tidak diputar lagi otomatis.
function initCake(bgMusic){
  const cake = document.getElementById('cake');
  const btn = document.getElementById('blowBtn');
  const msgEl = document.getElementById('cakeMsg');
  const song = document.getElementById('cakeSong');
  const musicDock = document.getElementById('musicDock');
  const host = document.getElementById('burst');
  if(!cake) return;

  song.src = CONFIG.cakeSongFile;
  song.addEventListener('error', ()=>{
    console.warn(`[kue] Gagal memuat "${CONFIG.cakeSongFile}". Cek nama file-nya.`);
  });

  const candles = [...cake.querySelectorAll('.candle')];
  const rand = (a,b)=> a + Math.random()*(b-a);
  let blown = false;

  function spawn(el, ms){ host.appendChild(el); setTimeout(()=> el.remove(), ms); }

  // cahaya hangat yang mengembang pelan dari kue
  function glow(x, y){
    const g = document.createElement('div');
    g.className = 'cake-glow';
    g.style.left = x+'px'; g.style.top = y+'px';
    spawn(g, 1800);
  }

  // hati & kilau kecil melayang naik pelan, seperti lampion
  function floatHearts(x, y, n){
    const glyphs = ['♡','♡','♡','✦','·'];
    for(let i=0;i<n;i++){
      const p = document.createElement('div');
      p.className = 'cake-heart';
      p.textContent = glyphs[Math.floor(Math.random()*glyphs.length)];
      p.style.left = (x + rand(-100, 100))+'px';
      p.style.top = (y + rand(-10, 10))+'px';
      p.style.fontSize = rand(12, 22)+'px';
      p.style.setProperty('--rise', -rand(140, 260)+'px');
      p.style.setProperty('--drift', rand(-40, 40)+'px');
      const dur = rand(2.2, 3.4);
      p.style.animationDuration = dur+'s';
      p.style.animationDelay = rand(0, 0.6)+'s';
      spawn(p, (dur+0.7)*1000);
    }
  }

  // lilin cuma bisa ditiup sekali -> lagu tiup lilin cuma diputar sekali
  function blow(){
    if(blown) return;
    blown = true;

    // lilin padam satu per satu, keluar asap tipis
    candles.forEach((c,i)=> setTimeout(()=> c.classList.add('out'), i*180));
    cake.classList.add('blown');

    // lagu latar berhenti (dan tidak diputar lagi otomatis), lagu tiup lilin diputar
    bgMusic.pause();
    musicDock.classList.remove('playing');
    song.currentTime = 0;
    song.volume = 0.8;
    song.play().catch(err=> console.warn('[kue] Lagu tiup lilin gagal diputar.', err));

    setTimeout(()=>{
      const r = cake.getBoundingClientRect();
      const x = r.left + r.width/2, y = r.top + r.height*0.3;
      glow(x, y);
      floatHearts(x, y, 16);
    }, 450);

    msgEl.textContent = 'selamat ulang tahun, sayangku ♡ semoga semua harapanmu terkabul';
    msgEl.classList.add('show');
    btn.hidden = true;
    cake.style.cursor = 'default';
    if(navigator.vibrate) navigator.vibrate(30);
  }

  btn.addEventListener('click', blow);
  cake.addEventListener('click', blow);

  // kalau lagu latar dinyalakan manual (tombol ♪), lagu tiup lilin yang berhenti
  bgMusic.addEventListener('play', ()=>{ if(!song.paused) song.pause(); });
  // pindah halaman -> lagu tiup lilin berhenti
  const page = cake.closest('.page');
  if(page) page.addEventListener('pageleave', ()=> song.pause());
}
